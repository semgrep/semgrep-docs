# Tests for scripts/generate_api_nav.py
#
# Run with:
#   uv run --with pyyaml --with pytest pytest scripts/tests

from __future__ import annotations

import json

import pytest

import generate_api_nav as nav


def spec(*, tags, paths):
    return {"tags": tags, "paths": paths}


ISSUES_SPEC = spec(
    tags=[{"name": "IssuesService", "x-displayName": "Issues"}],
    paths={
        "/api/issues": {
            "get": {"tags": ["Issues"], "summary": "List issues"},
            "post": {"tags": ["Issues"], "summary": "Create issue"},
        }
    },
)


def test_group_carries_endpoints_in_spec_order(tmp_path):
    groups = nav.service_groups(ISSUES_SPEC, tmp_path, "public_v2.openapi.yaml", "svc")

    assert len(groups) == 1
    assert groups[0]["pages"] == ["GET /api/issues", "POST /api/issues"]
    assert groups[0]["openapi"] == "public_v2.openapi.yaml"


def test_root_is_set_when_a_landing_page_exists(tmp_path):
    (tmp_path / "svc").mkdir()
    (tmp_path / "svc" / "issues.mdx").write_text("landing")

    groups = nav.service_groups(ISSUES_SPEC, tmp_path, "s.yaml", "svc")

    assert groups[0]["root"] == "svc/issues"


def test_root_is_omitted_when_no_landing_page_exists(tmp_path):
    groups = nav.service_groups(ISSUES_SPEC, tmp_path, "s.yaml", "svc")

    assert "root" not in groups[0]
    assert groups[0]["pages"]  # the group still works, it just opens an endpoint


@pytest.mark.parametrize(
    "display,slug",
    [
        ("Issues", "issues"),
        ("Supply Chain", "supply-chain"),
        ("Agentic Workflows", "agentic-workflows"),
        ("Workflow issues", "workflow-issues"),
        ("Issues (Agentic Workflows)", "issues-agentic-workflows"),
    ],
)
def test_landing_page_is_matched_by_slugged_display_name(tmp_path, display, slug):
    (tmp_path / "svc").mkdir()
    (tmp_path / "svc" / f"{slug}.mdx").write_text("landing")
    s = spec(
        tags=[{"name": "SomeService", "x-displayName": display}],
        paths={"/api/x": {"get": {"tags": [display]}}},
    )

    groups = nav.service_groups(s, tmp_path, "s.yaml", "svc")

    assert groups[0]["group"] == display
    assert groups[0]["root"] == f"svc/{slug}"


def test_group_label_falls_back_to_the_tag_name(tmp_path):
    s = spec(tags=[], paths={"/api/x": {"get": {"tags": ["RawTag"]}}})

    assert nav.service_groups(s, tmp_path, "s.yaml", "svc")[0]["group"] == "RawTag"


def test_untagged_and_non_method_keys_are_skipped(tmp_path):
    s = spec(
        tags=[],
        paths={
            "/api/x": {
                "get": {"tags": ["A"]},
                "parameters": [{"name": "q"}],   # not an HTTP method
                "put": {"summary": "no tags"},   # untagged
            }
        },
    )

    groups = nav.service_groups(s, tmp_path, "s.yaml", "svc")

    assert len(groups) == 1
    assert groups[0]["pages"] == ["GET /api/x"]


def test_replace_groups_keeps_named_groups_and_drops_the_rest():
    docs = {
        "navigation": {
            "tabs": [
                {
                    "tab": "API",
                    "dropdowns": [
                        {
                            "dropdown": "v2",
                            "groups": [
                                {"group": "Overview", "pages": ["intro"]},
                                {"group": "Services", "pages": ["svc/issues"]},
                                {"group": "Endpoints", "openapi": {"source": "s.yaml"}},
                            ],
                        }
                    ],
                }
            ]
        }
    }

    out = nav.replace_groups(docs, "v2", [{"group": "Issues", "pages": ["GET /x"]}],
                             keep=("Overview",))

    groups = out["navigation"]["tabs"][0]["dropdowns"][0]["groups"]
    assert [g["group"] for g in groups] == ["Overview", "Issues"]


def test_replace_groups_leaves_other_dropdowns_untouched():
    docs = {
        "navigation": {
            "tabs": [
                {
                    "tab": "API",
                    "dropdowns": [
                        {"dropdown": "v1", "groups": [{"group": "Endpoints"}]},
                        {"dropdown": "v2", "groups": [{"group": "Endpoints"}]},
                    ],
                }
            ]
        }
    }

    out = nav.replace_groups(docs, "v2", [{"group": "Issues", "pages": []}], keep=())

    v1 = out["navigation"]["tabs"][0]["dropdowns"][0]
    assert v1["groups"] == [{"group": "Endpoints"}]


def test_output_is_valid_json_and_stable(tmp_path):
    """Two runs over the same inputs produce the same file."""
    s = ISSUES_SPEC
    groups = nav.service_groups(s, tmp_path, "s.yaml", "svc")
    once = json.dumps(groups, indent=2)
    twice = json.dumps(nav.service_groups(s, tmp_path, "s.yaml", "svc"), indent=2)

    assert once == twice
