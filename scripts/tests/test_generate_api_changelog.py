import json
import shutil
import subprocess
import textwrap
from pathlib import Path

import pytest

import generate_api_changelog as gac

FIXTURES = Path(__file__).parent / "fixtures"


def load_fixture(name):
    return json.loads((FIXTURES / name).read_text())


# --- snapshot listing -------------------------------------------------------


def test_list_snapshots_groups_by_date_keeping_newest_commit(monkeypatch):
    calls = []

    def fake_run(cmd, **kwargs):
        calls.append(cmd)
        stdout = (
            "aaa111 2026-08-13\n"
            "bbb222 2026-08-13\n"
            "ccc333 2026-08-07\n"
            "ddd444 2026-07-14\n"
        )
        return subprocess.CompletedProcess(cmd, 0, stdout=stdout, stderr="")

    monkeypatch.setattr(gac.subprocess, "run", fake_run)
    snapshots = gac.list_snapshots("docs/spec.yaml", Path("/repo"))

    # git log is newest-first; the first hash seen for a date is that day's
    # final state.
    assert snapshots == [
        gac.Snapshot("aaa111", "2026-08-13"),
        gac.Snapshot("ccc333", "2026-08-07"),
        gac.Snapshot("ddd444", "2026-07-14"),
    ]
    assert "--first-parent" in calls[0]


# --- date formatting --------------------------------------------------------


def test_format_date_is_locale_independent():
    assert gac.format_date("2026-08-07") == "August 7, 2026"
    assert gac.format_date("2026-12-25") == "December 25, 2026"


# --- MDX escaping -----------------------------------------------------------


def test_escape_mdx_preserves_code_spans_and_escapes_outside():
    text = "removed the required property `tags` from the response with the `200` status"
    assert gac.escape_mdx(text) == text

    assert (
        gac.escape_mdx("added {x} and <T> around `{'keep'}`")
        == "added &#123;x&#125; and &lt;T&gt; around `{'keep'}`"
    )


def test_escape_mdx_ampersand_first():
    assert gac.escape_mdx("a & b < c") == "a &amp; b &lt; c"


def test_escape_mdx_markdown_chars_outside_code_spans():
    assert gac.escape_mdx("a *b* [c] _d_") == r"a \*b\* \[c\] \_d\_"


def test_escape_mdx_unbalanced_backticks_escaped_literally():
    assert gac.escape_mdx("odd ` tick {x}") == "odd \\` tick &#123;x&#125;"


# --- endpoint page URLs ------------------------------------------------------
#
# Slug rules verified empirically against Mintlify-generated pages (all 243
# operations of both specs resolved with HTTP 200 on 2026-08-13).


def test_mintlify_slug_rules():
    assert gac.mintlify_slug("Create Fix Job") == "create-fix-job"
    assert gac.mintlify_slug("AiFixJobsService") == "aifixjobsservice"
    # apostrophes are stripped, not hyphenated
    assert gac.mintlify_slug("Get a Project's Managed Scan Settings") == "get-a-projects-managed-scan-settings"
    # commas collapse into the space hyphen; existing hyphens survive
    assert (
        gac.mintlify_slug("List Code, Supply Chain, or AI-powered Scan findings")
        == "list-code-supply-chain-or-ai-powered-scan-findings"
    )
    # underscores and square brackets are preserved
    assert gac.mintlify_slug("Get x managed_scan_settings") == "get-x-managed_scan_settings"
    assert (
        gac.mintlify_slug("[Beta] Get SMS VPC Bootstrap CloudFormation Template")
        == "[beta]-get-sms-vpc-bootstrap-cloudformation-template"
    )


LINKS_SPEC = {
    "paths": {
        "/api/v1/policies": {
            "post": {"tags": ["PoliciesService"], "summary": "Create Policy"},
            "parameters": [{"name": "x", "in": "query"}],  # non-method key ignored
        },
        "/api/agent/deployments/{deploymentId}/ignores": {
            # no summary: page title is derived from method + path, with
            # parameter segments becoming word breaks
            "get": {"tags": ["IgnoresService"]},
        },
        "/api/v1/untagged": {"get": {"summary": "No Tag"}},
    }
}


def test_endpoint_urls_from_spec():
    urls = gac.endpoint_urls(LINKS_SPEC, "/api-reference/v2")
    assert urls[("POST", "/api/v1/policies")] == "/api-reference/v2/policiesservice/create-policy"
    assert urls[("GET", "/api/agent/deployments/{deploymentId}/ignores")] == (
        "/api-reference/v2/ignoresservice/get-apiagentdeployments-ignores"
    )
    assert ("GET", "/api/v1/untagged") not in urls  # no tag -> no page URL


def test_endpoint_urls_percent_encode_brackets():
    spec = {"paths": {"/api/v1/bootstrap-sms-vpc": {"get": {
        "tags": ["MiscService"],
        "summary": "[Beta] Get SMS VPC Bootstrap CloudFormation Template",
    }}}}
    urls = gac.endpoint_urls(spec, "/api-reference/v1")
    assert urls[("GET", "/api/v1/bootstrap-sms-vpc")] == (
        "/api-reference/v1/miscservice/%5Bbeta%5D-get-sms-vpc-bootstrap-cloudformation-template"
    )


# --- coalescing repetitive changes ------------------------------------------


def enum_change(value, prop="errors/items/errorType", status="200", **overrides):
    change = {
        "id": "response-property-enum-value-added",
        "text": (
            f"added the new `{value}` enum value to the `{prop}` response "
            f"property for the response status `{status}`"
        ),
        "level": 2,
        "operation": "POST",
        "path": "/api/v1/jobs",
        "section": "paths",
    }
    change.update(overrides)
    return change


def test_coalesce_merges_enum_values_for_same_property():
    merged = gac.coalesce_changes(
        [enum_change("TYPE_B"), enum_change("TYPE_A"), enum_change("TYPE_C")]
    )
    assert len(merged) == 1
    assert merged[0]["text"] == (
        "added the new `TYPE_A`, `TYPE_B`, `TYPE_C` enum values to the "
        "`errors/items/errorType` response property for the response status `200`"
    )
    assert merged[0]["level"] == 2


def test_coalesce_keeps_distinct_properties_apart():
    merged = gac.coalesce_changes(
        [enum_change("A"), enum_change("A", prop="other/prop")]
    )
    assert len(merged) == 2


def test_coalesce_keeps_distinct_endpoints_apart():
    merged = gac.coalesce_changes(
        [enum_change("A"), enum_change("A", path="/api/v1/other")]
    )
    assert len(merged) == 2


def test_coalesce_singletons_and_unknown_ids_stay_verbatim():
    single = enum_change("ONLY_ONE")
    unknown = {
        "id": "endpoint-added", "text": "endpoint added", "level": 1,
        "operation": "POST", "path": "/api/v1/policies", "section": "paths",
    }
    merged = gac.coalesce_changes([single, unknown])
    assert merged == [single, unknown]


def test_coalesce_format_changes_by_old_new_pair():
    def fmt(prop, old="uint64"):
        return {
            "id": "request-property-type-changed",
            "text": f"the `{prop}` request property `format` changed from `{old}` to `int64`",
            "level": 3,
            "operation": "POST",
            "path": "/api/v1/deps",
            "section": "paths",
        }

    merged = gac.coalesce_changes([fmt("cursor"), fmt("deploymentId"), fmt("pageSize", old="uint32")])
    texts = sorted(c["text"] for c in merged)
    assert texts == [
        "the `format` of the request properties `cursor`, `deploymentId` changed from `uint64` to `int64`",
        "the `pageSize` request property `format` changed from `uint32` to `int64`",
    ]


def test_coalesce_unmatched_text_stays_verbatim():
    odd = enum_change("X")
    odd["text"] = "some future oasdiff wording we do not recognize"
    assert gac.coalesce_changes([odd, enum_change("Y")]) == [odd, enum_change("Y")]


# --- entry building ---------------------------------------------------------


def snapshots_for(*pairs):
    """pairs of (ref, date), newest first."""
    return [gac.Snapshot(ref, date) for ref, date in pairs]


def test_build_entries_diffs_consecutive_snapshots_newest_first():
    snaps = snapshots_for(
        ("ccc", "2026-08-07"), ("bbb", "2026-07-23"), ("aaa", "2026-07-14")
    )
    diffs = {
        ("aaa:spec.yaml", "bbb:spec.yaml"): load_fixture("changelog_info_only.json"),
        ("bbb:spec.yaml", "ccc:spec.yaml"): load_fixture("changelog_mixed_levels.json"),
    }
    entries = gac.build_entries(snaps, "spec.yaml", lambda b, r: diffs[(b, r)])

    assert [e.date for e in entries] == ["2026-08-07", "2026-07-23"]
    # oldest snapshot is the baseline: no entry for 2026-07-14


def test_build_entries_skips_empty_diffs_without_breaking_chain():
    snaps = snapshots_for(
        ("ccc", "2026-08-07"), ("bbb", "2026-07-23"), ("aaa", "2026-07-14")
    )
    seen = []

    def diff(base, rev):
        seen.append((base, rev))
        if rev == "bbb:spec.yaml":
            return []  # e.g. the nav-sort line permutation
        return load_fixture("changelog_info_only.json")

    entries = gac.build_entries(snaps, "spec.yaml", diff)

    assert [e.date for e in entries] == ["2026-08-07"]
    # bbb produced no entry but still becomes the next comparison base
    assert seen == [("aaa:spec.yaml", "bbb:spec.yaml"), ("bbb:spec.yaml", "ccc:spec.yaml")]


def test_build_entries_filters_excluded_sections():
    snaps = snapshots_for(("bbb", "2026-08-07"), ("aaa", "2026-07-14"))
    version_noise = [c for c in load_fixture("changelog_mixed_levels.json") if c["section"] == "info"]
    assert version_noise, "fixture must contain an info-section change"

    entries = gac.build_entries(snaps, "spec.yaml", lambda b, r: version_noise)

    assert entries == []  # a day with only excluded changes gets no entry


def test_build_entries_drops_unparseable_base_and_promotes_revision():
    snaps = snapshots_for(
        ("ccc", "2026-08-07"), ("bbb", "2026-07-23"), ("aaa", "2026-07-14")
    )

    def diff(base, rev):
        if base == "aaa:spec.yaml" and rev == "bbb:spec.yaml":
            return None  # pair fails
        if base == rev:  # self-diff: bbb parses fine -> aaa was the bad side
            return []
        assert (base, rev) == ("bbb:spec.yaml", "ccc:spec.yaml")
        return load_fixture("changelog_info_only.json")

    entries = gac.build_entries(snaps, "spec.yaml", diff)
    assert [e.date for e in entries] == ["2026-08-07"]


def test_build_entries_skips_unparseable_revision_keeping_base():
    snaps = snapshots_for(
        ("ccc", "2026-08-07"), ("bbb", "2026-07-23"), ("aaa", "2026-07-14")
    )

    def diff(base, rev):
        if rev == "bbb:spec.yaml":
            return None  # both the pair and the self-diff fail: bbb is bad
        assert (base, rev) == ("aaa:spec.yaml", "ccc:spec.yaml")
        return load_fixture("changelog_info_only.json")

    entries = gac.build_entries(snaps, "spec.yaml", diff)
    assert [e.date for e in entries] == ["2026-08-07"]


def test_build_entries_working_tree_snapshot_uses_plain_path():
    snaps = snapshots_for((None, "2026-08-13"), ("aaa", "2026-07-14"))
    seen = []

    def diff(base, rev):
        seen.append((base, rev))
        return load_fixture("changelog_info_only.json")

    gac.build_entries(snaps, "spec.yaml", diff)
    assert seen == [("aaa:spec.yaml", "spec.yaml")]


# --- rendering --------------------------------------------------------------

GOLDEN_PAGE = """\
---
title: "Changelog"
description: "Changes to the Semgrep API v1, generated from its OpenAPI specification."
rss: true
---

{/* Auto-generated by scripts/generate_api_changelog.py -- do not edit by hand. */}

Changes to the [Semgrep API v1](/api-reference/v1/Introduction), detected by
comparing successive versions of its OpenAPI specification. Breaking changes
are labeled; documentation-only edits are not listed.

<Update label="August 7, 2026" description="2 breaking · 1 potentially breaking · 3 other changes" tags={["Breaking"]}>
## Breaking changes

- <Badge color="green" size="sm">GET</Badge> `/api/v1/agents`: api path removed without deprecation
- <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects): removed the required property `tags` from the response with the `200` status

## Potentially breaking changes

- <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects): deleted the `query` request parameter `page_token`

## Changes

- <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects): added the new optional `query` request parameter `page_size`
- <Badge color="blue" size="sm">POST</Badge> [`/api/v1/policies`](/api-reference/v1/policiesservice/create-policy): endpoint added
- removed the schema `ProjectFilter`
</Update>

<Update label="July 23, 2026" description="1 change">
## Changes

- <Badge color="blue" size="sm">POST</Badge> [`/api/v1/policies`](/api-reference/v1/policiesservice/create-policy): endpoint added
</Update>
"""

GOLDEN_LINKS = {
    # /api/v1/agents deliberately absent: a removed endpoint has no page,
    # so its lead-in must stay a plain code span
    ("GET", "/api/v1/deployments/{deployment_id}/projects"): "/api-reference/v1/projectsservice/list-projects",
    ("POST", "/api/v1/policies"): "/api-reference/v1/policiesservice/create-policy",
}


def golden_entries():
    mixed = [c for c in load_fixture("changelog_mixed_levels.json") if c["section"] != "info"]
    return [
        gac.Entry("2026-08-07", mixed),
        gac.Entry("2026-07-23", load_fixture("changelog_info_only.json")),
    ]


def test_render_page_golden_list_style():
    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
        links=GOLDEN_LINKS,
        style="list",
    )
    assert page == GOLDEN_PAGE


GOLDEN_TABLE_BODY = """\
<Update label="August 7, 2026" description="2 breaking · 1 potentially breaking · 3 other changes" tags={["Breaking"]}>
## Breaking changes

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="red" size="sm">Removed</Badge> | api path removed without deprecation | <Badge color="green" size="sm">GET</Badge> `/api/v1/agents` |
| <Badge color="red" size="sm">Removed</Badge> | removed the required property `tags` from the response with the `200` status | <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects) |

## Potentially breaking changes

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="red" size="sm">Removed</Badge> | deleted the `query` request parameter `page_token` | <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects) |

## Changes

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="green" size="sm">Added</Badge> | added the new optional `query` request parameter `page_size` | <Badge color="green" size="sm">GET</Badge> [`/api/v1/deployments/{deployment_id}/projects`](/api-reference/v1/projectsservice/list-projects) |
| <Badge color="green" size="sm">Added</Badge> | endpoint added | <Badge color="blue" size="sm">POST</Badge> [`/api/v1/policies`](/api-reference/v1/policiesservice/create-policy) |
| <Badge color="red" size="sm">Removed</Badge> | removed the schema `ProjectFilter` | — |
</Update>

<Update label="July 23, 2026" description="1 change">
## Changes

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="green" size="sm">Added</Badge> | endpoint added | <Badge color="blue" size="sm">POST</Badge> [`/api/v1/policies`](/api-reference/v1/policiesservice/create-policy) |
</Update>
"""


def test_render_page_golden_table_style():
    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
        links=GOLDEN_LINKS,
        style="table",
    )
    assert page.endswith(GOLDEN_TABLE_BODY)
    assert page.startswith("---\ntitle: \"Changelog\"")


def test_change_verb_mapping():
    assert gac._change_verb({"id": "endpoint-added"}) == ("Added", "green")
    assert gac._change_verb({"id": "new-optional-request-parameter"}) == ("Added", "green")
    # "removed" wins over the "deprecation" in the same id
    assert gac._change_verb({"id": "api-path-removed-without-deprecation"}) == ("Removed", "red")
    assert gac._change_verb({"id": "endpoint-deprecated"}) == ("Deprecated", "yellow")
    assert gac._change_verb({"id": "request-property-type-changed"}) == ("Changed", "orange")
    assert gac._change_verb({"id": "request-parameter-property-type-specialized"}) == ("Changed", "orange")
    assert gac._change_verb({"id": "something-unrecognized"}) == ("Changed", "gray")


def test_table_cells_escape_pipes():
    changes = [{
        "id": "endpoint-added", "level": 1, "section": "paths",
        "operation": "GET", "path": "/api/v1/a",
        "text": "added enum `A|B` to x",
    }]
    rendered = gac._render_update(gac.Entry("2026-08-07", changes), links={}, style="table")
    assert r"`A\|B`" in rendered
    assert " | added enum " in rendered  # column separators intact


def test_render_page_breaking_tag_and_summary():
    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
    )
    assert (
        '<Update label="August 7, 2026" '
        'description="2 breaking · 1 potentially breaking · 3 other changes" '
        'tags={["Breaking"]}>'
    ) in page
    assert '<Update label="July 23, 2026" description="1 change">' in page


def test_render_update_nests_multiple_changes_per_endpoint():
    changes = [
        {
            "id": "request-property-removed", "level": 3, "section": "paths",
            "operation": "POST", "path": "/api/v1/deps",
            "text": "removed the request property `a`",
        },
        {
            "id": "request-property-removed", "level": 3, "section": "paths",
            "operation": "POST", "path": "/api/v1/deps",
            "text": "removed the request property `b`",
        },
    ]
    rendered = gac._render_update(gac.Entry("2026-08-07", changes), links={}, style="list")
    assert (
        '- <Badge color="blue" size="sm">POST</Badge> `/api/v1/deps`:\n'
        "  - removed the request property `a`\n"
        "  - removed the request property `b`"
    ) in rendered


def test_render_update_method_badge_colors():
    def change(operation, path):
        return {
            "id": "endpoint-added", "text": "endpoint added", "level": 1,
            "section": "paths", "operation": operation, "path": path,
        }

    rendered = gac._render_update(
        gac.Entry("2026-08-07", [change("DELETE", "/api/v1/a"), change("BREW", "/api/v1/b")]),
        links={},
        style="list",
    )
    assert '<Badge color="red" size="sm">DELETE</Badge>' in rendered
    assert '<Badge color="gray" size="sm">BREW</Badge>' in rendered  # unknown method


def test_render_update_links_nested_endpoint_lead_in():
    changes = [
        {
            "id": "request-property-removed", "level": 3, "section": "paths",
            "operation": "POST", "path": "/api/v1/deps",
            "text": "removed the request property `a`",
        },
        {
            "id": "request-property-removed", "level": 3, "section": "paths",
            "operation": "POST", "path": "/api/v1/deps",
            "text": "removed the request property `b`",
        },
    ]
    links = {("POST", "/api/v1/deps"): "/api-reference/v1/depsservice/create-dep"}
    rendered = gac._render_update(gac.Entry("2026-08-07", changes), links=links, style="list")
    assert (
        '- <Badge color="blue" size="sm">POST</Badge>'
        " [`/api/v1/deps`](/api-reference/v1/depsservice/create-dep):\n"
    ) in rendered


def test_render_page_without_entries_still_renders_shell():
    page = gac.render_page(
        api_name="Semgrep API v2",
        api_href=None,
        note="The v2 API is experimental; breaking changes are expected.",
        entries=[],
    )
    assert page.startswith("---\ntitle: \"Changelog\"")
    assert "rss: true" in page
    assert "Semgrep API v2" in page
    assert "The v2 API is experimental; breaking changes are expected." in page
    assert "<Update" not in page
    assert "No API changes recorded yet." in page


# --- main -------------------------------------------------------------------


@pytest.fixture
def wired_main(monkeypatch, tmp_path):
    """main() with git and oasdiff faked out; returns (run, out_path, state)."""
    state = {
        "snapshots": snapshots_for(("bbb", "2026-08-07"), ("aaa", "2026-07-14")),
        "dirty": False,
        "diffs": {("aaa:docs/spec.yaml", "bbb:docs/spec.yaml"): load_fixture("changelog_info_only.json")},
    }
    (tmp_path / "docs").mkdir()
    (tmp_path / "docs" / "spec.yaml").write_text("openapi: 3.0.3\n")

    monkeypatch.setattr(gac, "repo_root", lambda: tmp_path)
    monkeypatch.setattr(gac, "list_snapshots", lambda spec, cwd: list(state["snapshots"]))
    monkeypatch.setattr(gac, "working_tree_differs", lambda spec, cwd: state["dirty"])
    monkeypatch.setattr(
        gac, "run_oasdiff", lambda base, rev, oasdiff_bin, cwd: state["diffs"].get((base, rev))
    )

    out = tmp_path / "docs" / "Changelog.mdx"

    def run(*extra):
        return gac.main(
            [str(tmp_path / "docs" / "spec.yaml"), str(out), "--api-name", "Semgrep API v1", *extra]
        )

    return run, out, state


def test_main_writes_page(wired_main):
    run, out, _ = wired_main
    assert run() == 0
    content = out.read_text()
    assert 'label="August 7, 2026"' in content
    assert "endpoint added" in content


def test_main_is_idempotent(wired_main, capsys):
    run, out, _ = wired_main
    run()
    first = out.read_text()
    mtime = out.stat().st_mtime_ns

    assert run() == 0
    assert out.read_text() == first
    assert out.stat().st_mtime_ns == mtime  # not rewritten
    assert "unchanged" in capsys.readouterr().out


def test_main_working_tree_entry_merges_with_same_day_commit(wired_main):
    run, out, state = wired_main
    state["dirty"] = True
    state["diffs"] = {
        ("aaa:docs/spec.yaml", "docs/spec.yaml"): load_fixture("changelog_info_only.json")
    }
    assert run("--today", "2026-08-07") == 0
    content = out.read_text()
    # single merged Update for the day: worktree snapshot replaced commit bbb
    assert content.count("<Update") == 1
    assert 'label="August 7, 2026"' in content


def test_main_working_tree_entry_on_new_day(wired_main):
    run, out, state = wired_main
    state["dirty"] = True
    state["diffs"] = {
        ("aaa:docs/spec.yaml", "bbb:docs/spec.yaml"): load_fixture("changelog_info_only.json"),
        ("bbb:docs/spec.yaml", "docs/spec.yaml"): load_fixture("changelog_mixed_levels.json"),
    }
    assert run("--today", "2026-08-13") == 0
    content = out.read_text()
    assert content.count("<Update") == 2
    assert content.index('label="August 13, 2026"') < content.index('label="August 7, 2026"')


def test_main_no_working_tree_flag(wired_main):
    run, out, state = wired_main
    state["dirty"] = True  # would fail on a missing diff key if consulted
    assert run("--no-working-tree") == 0
    assert 'label="August 7, 2026"' in out.read_text()


def test_main_max_entries_keeps_newest(wired_main):
    run, out, state = wired_main
    state["snapshots"] = snapshots_for(
        ("ccc", "2026-08-07"), ("bbb", "2026-07-23"), ("aaa", "2026-07-14")
    )
    state["diffs"] = {
        ("aaa:docs/spec.yaml", "bbb:docs/spec.yaml"): load_fixture("changelog_info_only.json"),
        ("bbb:docs/spec.yaml", "ccc:docs/spec.yaml"): load_fixture("changelog_mixed_levels.json"),
    }
    assert run("--max-entries", "1") == 0
    content = out.read_text()
    assert content.count("<Update") == 1
    assert 'label="August 7, 2026"' in content


def test_main_link_base_links_endpoints(wired_main, tmp_path):
    run, out, _ = wired_main
    (tmp_path / "docs" / "spec.yaml").write_text(
        "openapi: 3.0.3\n"
        "paths:\n"
        "  /api/v1/policies:\n"
        "    post:\n"
        "      tags: [PoliciesService]\n"
        "      summary: Create Policy\n"
    )
    assert run("--link-base", "/api-reference/v1") == 0
    assert (
        '<Badge color="blue" size="sm">POST</Badge>'
        " [`/api/v1/policies`](/api-reference/v1/policiesservice/create-policy)"
        in out.read_text()
    )


def test_main_single_snapshot_renders_empty_shell(wired_main):
    run, out, state = wired_main
    state["snapshots"] = snapshots_for(("aaa", "2026-07-14"))
    assert run() == 0
    content = out.read_text()
    assert "<Update" not in content
    assert "No API changes recorded yet." in content


# --- integration (real binary, hermetic: plain file paths, no git) ----------

BASE_SPEC = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
      title: T
      version: 1.0.0
    paths:
      /widgets:
        get:
          operationId: listWidgets
          summary: List widgets
          responses:
            "200":
              description: OK
    """
)

REVISION_SPEC = BASE_SPEC.replace(
    '            "200":\n              description: OK\n',
    '            "200":\n              description: OK\n'
    "          parameters: []\n",
).replace("paths:\n  /widgets:", "paths:\n  /gadgets:")


@pytest.mark.skipif(shutil.which("oasdiff") is None, reason="oasdiff not installed")
def test_run_oasdiff_real_binary(tmp_path):
    base = tmp_path / "base.yaml"
    rev = tmp_path / "rev.yaml"
    base.write_text(BASE_SPEC)
    rev.write_text(REVISION_SPEC)

    changes = gac.run_oasdiff(str(base), str(rev), oasdiff_bin="oasdiff", cwd=tmp_path)
    assert changes is not None
    assert any(c["level"] == 3 and c["path"] == "/widgets" for c in changes)

    assert gac.run_oasdiff(str(base), str(base), oasdiff_bin="oasdiff", cwd=tmp_path) == []


@pytest.mark.skipif(shutil.which("oasdiff") is None, reason="oasdiff not installed")
def test_run_oasdiff_error_returns_none(tmp_path):
    bad = tmp_path / "bad.yaml"
    bad.write_text(":: not openapi ::")
    good = tmp_path / "good.yaml"
    good.write_text(BASE_SPEC)
    assert gac.run_oasdiff(str(bad), str(good), oasdiff_bin="oasdiff", cwd=tmp_path) is None
