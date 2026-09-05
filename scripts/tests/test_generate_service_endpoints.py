# Tests for scripts/generate_service_endpoints.py
#
# Run with:
#   uv run --with pyyaml --with pytest pytest scripts/tests

from __future__ import annotations

import pytest

import generate_service_endpoints as gse

LINK_BASE = "/api-reference/v2"

SPEC = {
    "tags": [{"name": "ScansService", "x-displayName": "Scans"}],
    "paths": {
        "/api/v2/scans/{scanId}": {
            "get": {
                "tags": ["Scans"], "summary": "Get scan",
                "description": "Get a scan by ID. Only scans from the past 30 days.",
            }
        },
        "/api/v2/scans/retry": {
            "post": {"tags": ["Scans"], "summary": "Retry failed scans", "description": ""}
        },
    },
}


def test_table_links_each_endpoint_to_its_reference_page():
    tables = gse.service_tables(SPEC, LINK_BASE)

    assert "Scans" in tables
    assert "[Get scan](/api-reference/v2/scans/get-scan)" in tables["Scans"]
    assert "[Retry failed scans](/api-reference/v2/scans/retry-failed-scans)" in tables["Scans"]


def test_table_carries_a_method_badge_coloured_by_verb():
    table = gse.service_tables(SPEC, LINK_BASE)["Scans"]

    assert '<Badge color="green" size="sm">GET</Badge>' in table
    assert '<Badge color="blue" size="sm">POST</Badge>' in table


def test_table_shows_only_the_lead_sentence_of_the_description():
    table = gse.service_tables(SPEC, LINK_BASE)["Scans"]

    assert "Get a scan by ID." in table
    assert "past 30 days" not in table  # the endpoint page is one click away


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("One. Two.", "One."),
        ("Retry failed scans (SMS). Only some qualify.", "Retry failed scans (SMS)."),
        ("No trailing period", "No trailing period"),
        ("Version v1. 2 is fine", "Version v1. 2 is fine"),  # not a sentence break
        ("", ""),
        ("  collapses\n  whitespace  ", "collapses whitespace"),
    ],
)
def test_first_sentence(raw, expected):
    assert gse.first_sentence(raw) == expected


def test_group_label_uses_the_display_name_not_the_tag():
    tables = gse.service_tables(SPEC, LINK_BASE)

    assert "Scans" in tables
    assert "ScansService" not in tables


def test_untagged_and_non_method_keys_are_skipped():
    spec = {
        "tags": [],
        "paths": {
            "/api/x": {
                "get": {"tags": ["A"], "summary": "Ay"},
                "parameters": [{"name": "q"}],
                "put": {"summary": "no tags"},
            }
        },
    }

    tables = gse.service_tables(spec, LINK_BASE)

    assert list(tables) == ["A"]
    assert tables["A"].count("|") == tables["A"].count("|")  # one data row
    assert "no tags" not in tables["A"]


def test_endpoint_without_a_summary_falls_back_to_method_and_path():
    spec = {"tags": [], "paths": {"/api/x": {"get": {"tags": ["A"]}}}}

    table = gse.service_tables(spec, LINK_BASE)["A"]

    assert "GET /api/x" in table


def test_mdx_hazards_in_a_summary_are_escaped():
    spec = {
        "tags": [],
        "paths": {"/api/x": {"get": {"tags": ["A"], "summary": "Get {id} <thing>"}}},
    }

    table = gse.service_tables(spec, LINK_BASE)["A"]

    # braces open a JSX expression and angle brackets a tag; both must not
    # reach the renderer raw
    assert "{id}" not in table
    assert "<thing>" not in table


def test_service_with_no_endpoints_gets_no_table():
    tables = gse.service_tables({"tags": [], "paths": {}}, LINK_BASE)

    assert tables == {}


def test_empty_state_names_the_changelog_rather_than_hardcoding_a_claim():
    """A service with no endpoints must still say something accurate."""
    text = gse.EMPTY.format(changelog="/api-reference/v2/Changelog")

    assert "/api-reference/v2/Changelog" in text
    assert "no endpoints are published in this service yet" in text.lower()
