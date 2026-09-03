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


def test_apply_level_override_demotes_response_enum_additions():
    change = {"id": "response-property-enum-value-added", "level": 2, "text": "added"}

    assert gac.apply_level_override(change)["level"] == 1
    assert change["level"] == 2  # override does not mutate its input


def test_apply_level_override_leaves_other_checks_alone():
    for check_id, level in (
        ("api-path-removed-without-deprecation", 3),
        ("request-parameter-removed", 2),
        ("endpoint-added", 1),
    ):
        change = {"id": check_id, "level": level}
        assert gac.apply_level_override(change) is change


def test_build_entries_demotes_response_enum_additions_out_of_breaking_sections():
    snaps = snapshots_for(("bbb", "2026-08-07"), ("aaa", "2026-07-14"))
    enum_addition = [
        {
            "id": "response-property-enum-value-added",
            "level": 2,
            "section": "paths",
            "operation": "GET",
            "path": "/api/v1/deployments",
            "text": "added the new `X` enum value to the `status` response property",
        }
    ]

    entries = gac.build_entries(snaps, "spec.yaml", lambda b, r: enum_addition)

    assert [c["level"] for c in entries[0].changes] == [1]


@pytest.mark.parametrize(
    "raw,expected",
    [
        # the reported case: a described $ref wrapped in a single-element allOf
        (
            "filters/allOf[#/components/schemas/protos.projects.v1.RepoFilters]/latestScanStatus",
            "filters.latestScanStatus",
        ),
        # array elements fold into the parent, allOf drops out mid-path
        (
            "automations/items/filters/allOf[#/components/schemas/protos.automations.v1.Filters]"
            "/conditions/items/type",
            "automations[].filters.conditions[].type",
        ),
        # an array of scalars leaves a trailing `items` that would dangle
        ("dependencyFilter/repositoryId/items/", "dependencyFilter.repositoryId[]"),
        ("errors/items/errorType", "errors[].errorType"),
        # snake_case fields keep their spelling -- the endpoint accepts that key
        ("scans/items/is_partial_scan", "scans[].is_partial_scan"),
        # already clean, and non-paths
        ("filters/latestScanStatus", "filters.latestScanStatus"),
        ("latestScanStatus", "latestScanStatus"),
    ],
)
def test_humanize_property_path(raw, expected):
    assert gac.humanize_property_path(raw) == expected


def test_humanize_change_text_rewrites_only_code_spans():
    change = {
        "text": "added the new optional request property "
        "`filters/allOf[#/components/schemas/protos.projects.v1.RepoFilters]/latestScanStatus`",
    }

    assert gac.humanize_change_text(change)["text"] == (
        "added the new optional request property `filters.latestScanStatus`"
    )
    assert "allOf" in change["text"]  # input not mutated


def test_humanize_change_text_leaves_url_paths_and_plain_spans_alone():
    for text in (
        "removed the endpoint `/api/v1/deployments`",   # leading slash: a URL
        "the response status `200` was added",
        "added the new `SCAN_STATUS_CANCELLED` enum value",
        "unbalanced ` backtick with a/b path",
    ):
        assert gac.humanize_change_text({"text": text})["text"] == text


def test_humanize_runs_before_coalescing_so_paths_merge():
    changes = [
        {
            "id": "response-property-enum-value-added",
            "level": 1,
            "operation": "GET",
            "path": "/x",
            "text": "added the new `A` enum value to the "
            "`f/allOf[#/components/schemas/protos.a.v1.T]/g` response property"
            " for the response status `200`",
        },
        {
            "id": "response-property-enum-value-added",
            "level": 1,
            "operation": "GET",
            "path": "/x",
            "text": "added the new `B` enum value to the `f/g` response property"
            " for the response status `200`",
        },
    ]

    merged = gac.coalesce_changes([gac.humanize_change_text(c) for c in changes])

    assert len(merged) == 1  # identical paths after humanizing, so they fold
    assert "`A`, `B`" in merged[0]["text"]
    assert "allOf" not in merged[0]["text"]


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

<Update label="August 7, 2026" description="2 breaking · 1 potentially breaking · 3 other changes" tags={["Breaking"]} rss={{ title: "Semgrep API v1 — August 7, 2026", description: "2 breaking, 1 potentially breaking, and 3 other changes across 3 endpoints." }}>
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

<Update label="July 23, 2026" description="1 change" rss={{ title: "Semgrep API v1 — July 23, 2026", description: "1 change across 1 endpoint." }}>
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
<Update label="August 7, 2026" description="2 breaking · 1 potentially breaking · 3 other changes" tags={["Breaking"]} rss={{ title: "Semgrep API v1 — August 7, 2026", description: "2 breaking, 1 potentially breaking, and 3 other changes across 3 endpoints." }}>
## Breaking changes

<div className="api-changelog-table">

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="red" size="sm">Removed</Badge> | api path removed without deprecation | <Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/agents</Badge> |
| <Badge color="red" size="sm">Removed</Badge> | removed the required property `tags` from the response with the `200` status | <a href="/api-reference/v1/projectsservice/list-projects" style={{ textDecoration: "none", borderBottom: "none" }}><Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/deployments<wbr/>/&#123;deployment_id&#125;<wbr/>/projects</Badge></a> |

</div>

## Potentially breaking changes

<div className="api-changelog-table">

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="red" size="sm">Removed</Badge> | deleted the `query` request parameter `page_token` | <a href="/api-reference/v1/projectsservice/list-projects" style={{ textDecoration: "none", borderBottom: "none" }}><Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/deployments<wbr/>/&#123;deployment_id&#125;<wbr/>/projects</Badge></a> |

</div>

## Changes

<div className="api-changelog-table">

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="green" size="sm">Added</Badge> | added the new optional `query` request parameter `page_size` | <a href="/api-reference/v1/projectsservice/list-projects" style={{ textDecoration: "none", borderBottom: "none" }}><Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/deployments<wbr/>/&#123;deployment_id&#125;<wbr/>/projects</Badge></a> |
| <Badge color="green" size="sm">Added</Badge> | endpoint added | <a href="/api-reference/v1/policiesservice/create-policy" style={{ textDecoration: "none", borderBottom: "none" }}><Badge color="blue" size="sm">POST /api<wbr/>/v1<wbr/>/policies</Badge></a> |
| <Badge color="red" size="sm">Removed</Badge> | removed the schema `ProjectFilter` | — |

</div>
</Update>

<Update label="July 23, 2026" description="1 change" rss={{ title: "Semgrep API v1 — July 23, 2026", description: "1 change across 1 endpoint." }}>
## Changes

<div className="api-changelog-table">

| Change | Description | Endpoint |
|---|---|---|
| <Badge color="green" size="sm">Added</Badge> | endpoint added | <a href="/api-reference/v1/policiesservice/create-policy" style={{ textDecoration: "none", borderBottom: "none" }}><Badge color="blue" size="sm">POST /api<wbr/>/v1<wbr/>/policies</Badge></a> |

</div>
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
        'tags={["Breaking"]} rss='
    ) in page
    assert '<Update label="July 23, 2026" description="1 change" rss=' in page


def test_render_update_emits_one_rss_prop_per_day():
    """Without it Mintlify emits one feed entry per Markdown heading."""
    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
    )

    assert (
        'rss={{ title: "Semgrep API v1 — August 7, 2026", description: '
        '"2 breaking, 1 potentially breaking, and 3 other changes across 3 endpoints." }}'
    ) in page
    # a day with only additive changes is not described as "1 other change"
    assert (
        'rss={{ title: "Semgrep API v1 — July 23, 2026", '
        'description: "1 change across 1 endpoint." }}'
    ) in page
    assert page.count("rss={{") == 2  # one per Update, not one per heading


def test_render_update_rss_title_falls_back_to_the_date():
    rendered = gac._render_update(
        gac.Entry("2026-08-07", [
            {"id": "endpoint-added", "level": 1, "section": "paths",
             "operation": "GET", "path": "/api/v1/a", "text": "endpoint added"},
        ]),
        links={},
    )

    assert 'rss={{ title: "August 7, 2026"' in rendered


def test_jsx_string_escapes_quotes_and_backslashes():
    assert gac._jsx_string('a "b"') == 'a \\"b\\"'
    assert gac._jsx_string("a\\b") == "a\\\\b"


def test_render_page_emits_subscribe_instructions_when_given_a_feed_url():
    url = "https://docs.semgrep.dev/api-reference/v1/Changelog/rss.xml"

    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
        rss_url=url,
    )

    assert f"[`{url}`]({url})" in page
    assert f"/feed subscribe {url}" in page
    # sits above the entries, not buried under them
    assert page.index("<Note>") < page.index("<Update ")


def test_render_page_omits_subscribe_instructions_without_a_feed_url():
    page = gac.render_page(
        api_name="Semgrep API v1",
        api_href="/api-reference/v1/Introduction",
        note=None,
        entries=golden_entries(),
    )

    assert "<Note>" not in page
    assert "rss.xml" not in page


@pytest.mark.parametrize(
    "levels,summary,rss",
    [
        # a breaking-only day still gets its noun
        ([3], "1 breaking change", "1 breaking change across 1 endpoint."),
        ([3, 3], "2 breaking changes", "2 breaking changes across 1 endpoint."),
        # "other" is not qualified when it stands alone
        ([1], "1 change", "1 change across 1 endpoint."),
        ([1, 1, 1], "3 changes", "3 changes across 1 endpoint."),
        # mixed: noun lands on the final part only
        ([3, 2, 1], "1 breaking · 1 potentially breaking · 1 other change",
         "1 breaking, 1 potentially breaking, and 1 other change across 1 endpoint."),
        ([3, 3, 1, 1], "2 breaking · 2 other changes",
         "2 breaking and 2 other changes across 1 endpoint."),
    ],
)
def test_summary_and_rss_description_agree_and_read_as_phrases(levels, summary, rss):
    changes = [
        {"id": "x", "level": lv, "section": "paths",
         "operation": "GET", "path": "/api/v1/a", "text": f"change {i}"}
        for i, lv in enumerate(levels)
    ]

    assert gac._summary(changes) == summary
    assert gac._rss_description(changes) == rss


def test_rss_description_omits_endpoint_scope_when_no_endpoint():
    changes = [{"id": "api-schema-removed", "level": 1, "section": "components",
                "text": "removed the schema `X`"}]

    assert gac._rss_description(changes) == "1 change."


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


def test_endpoint_pill_escapes_braces_and_marks_wrap_points():
    key = (0, "/api/v1/deps/{depId}/files", "GET")
    links = {("GET", "/api/v1/deps/{depId}/files"): "/api-reference/v1/depsservice/list-files"}
    pill = gac._endpoint_pill(key, links)
    # entire pill is the link: raw anchor (markdown links keep Mintlify's
    # underline border), underline suppressed, JSX-hazardous braces as
    # entities, <wbr/> wrap opportunities after each path segment
    assert pill == (
        '<a href="/api-reference/v1/depsservice/list-files"'
        ' style={{ textDecoration: "none", borderBottom: "none" }}>'
        '<Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/deps'
        "<wbr/>/&#123;depId&#125;<wbr/>/files</Badge></a>"
    )
    assert gac._endpoint_pill(key, {}) == (
        '<Badge color="green" size="sm">GET /api<wbr/>/v1<wbr/>/deps'
        "<wbr/>/&#123;depId&#125;<wbr/>/files</Badge>"
    )


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
    assert '<Badge color="red" size="sm">DELETE</Badge>' in rendered  # list style keeps split pill
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
        '<a href="/api-reference/v1/policiesservice/create-policy"'
        ' style={{ textDecoration: "none", borderBottom: "none" }}>'
        '<Badge color="blue" size="sm">POST /api<wbr/>/v1<wbr/>/policies</Badge></a>'
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
