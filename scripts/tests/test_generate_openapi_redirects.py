# Tests for scripts/generate_openapi_redirects.py
#
# Run with:
#   uv run --with pyyaml --with pytest pytest scripts/tests

from __future__ import annotations

import json

import pytest

import generate_openapi_redirects as gor

LINK_BASE = "/api-reference/v2"


def spec(tag: str, summary: str = "Get identity", path: str = "/api/agent/identity") -> dict:
    return {"paths": {path: {"get": {"tags": [tag], "summary": summary}}}}


def docs_json(redirects: list[dict]) -> str:
    """docs.json in the repo's own formatting, which the patcher edits textually."""
    body = ",\n".join(
        f'    {{\n      "source": "{r["source"]}",\n'
        f'      "destination": "{r["destination"]}"\n    }}'
        for r in redirects
    )
    body = body + "\n" if body else ""
    return '{\n  "name": "Semgrep",\n  "redirects": [\n' + body + "  ]\n}\n"


def test_moved_endpoints_reports_a_tag_change():
    moves = gor.moved_endpoints(spec("MiscService"), spec("Deployments"), LINK_BASE)

    assert moves == [
        ("/api-reference/v2/miscservice/get-identity",
         "/api-reference/v2/deployments/get-identity")
    ]


def test_moved_endpoints_ignores_an_unchanged_tag():
    assert gor.moved_endpoints(spec("MiscService"), spec("MiscService"), LINK_BASE) == []


@pytest.mark.parametrize(
    "before,after",
    [
        # added: no old URL to redirect from
        ({"paths": {}}, spec("Deployments")),
        # removed: nowhere to redirect to, and the page is gone
        (spec("MiscService"), {"paths": {}}),
    ],
)
def test_moved_endpoints_skips_additions_and_removals(before, after):
    assert gor.moved_endpoints(before, after, LINK_BASE) == []


def test_moved_endpoints_follows_a_renamed_summary():
    """The page slug comes from the summary too, so a retitle moves the page."""
    moves = gor.moved_endpoints(
        spec("Deployments", summary="Get identity"),
        spec("Deployments", summary="Get token identity"),
        LINK_BASE,
    )

    assert moves == [
        ("/api-reference/v2/deployments/get-identity",
         "/api-reference/v2/deployments/get-token-identity")
    ]


def test_apply_moves_appends_a_redirect_and_keeps_json_valid():
    text, added, repointed = gor.apply_moves(docs_json([]), [("/old", "/new")])

    assert (added, repointed) == (1, 0)
    assert json.loads(text)["redirects"] == [{"source": "/old", "destination": "/new"}]


def test_apply_moves_preserves_existing_redirects():
    start = docs_json([{"source": "/release-notes", "destination": "/release-notes/latest"}])

    text, _, _ = gor.apply_moves(start, [("/old", "/new")])

    assert {"source": "/release-notes", "destination": "/release-notes/latest"} in json.loads(text)["redirects"]


def test_apply_moves_collapses_a_chain_rather_than_dangling():
    """A -> B then B -> C must leave A -> C, not A -> B pointing at a 404."""
    start = docs_json([{"source": "/a", "destination": "/b"}])

    text, added, repointed = gor.apply_moves(start, [("/b", "/c")])

    entries = {r["source"]: r["destination"] for r in json.loads(text)["redirects"]}
    assert entries["/a"] == "/c"
    assert entries["/b"] == "/c"
    assert (added, repointed) == (1, 1)


def test_apply_moves_is_idempotent():
    once, _, _ = gor.apply_moves(docs_json([]), [("/old", "/new")])
    twice, added, _ = gor.apply_moves(once, [("/old", "/new")])

    assert added == 0
    assert json.loads(twice)["redirects"] == json.loads(once)["redirects"]


def test_apply_moves_noop_without_moves():
    start = docs_json([])

    assert gor.apply_moves(start, []) == (start, 0, 0)
