#!/usr/bin/env python3
#
# Tests for mirror_openapi.py.
#
# Run with:
#   uv run --with pyyaml --with pytest pytest scripts/tests

from __future__ import annotations

import textwrap

import pytest
import yaml

from mirror_openapi import mirror_badges, mirror_extensions, mirror_tag_groups

METHODS = ("get", "post", "put", "patch", "delete")


def operations(text: str) -> dict:
    doc = yaml.safe_load(text)
    return {
        op.get("operationId"): op
        for item in doc["paths"].values()
        for method, op in item.items()
        if method in METHODS
    }


SPEC_TWO_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths:
      /experimental:
        get:
          operationId: Svc_Experimental
          summary: An experimental endpoint
          x-badges: [{"name": "Experimental", "position": "after", "color": "red"}]
      /beta:
        get:
          operationId: Svc_Beta
          summary: A beta endpoint
          x-badges: [{"name": "Beta", "position": "after", "color": "blue"}]
      /empty:
        get:
          operationId: Svc_Empty
          summary: An endpoint with no badges
          x-badges: []
      /plain:
        get:
          operationId: Svc_Plain
          summary: An endpoint with no x-badges key at all
    """
)

SPEC_FOUR_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths:
        /experimental:
            get:
                operationId: Svc_Experimental
                summary: An experimental endpoint
                x-badges: [{"name": "Experimental", "position": "after", "color": "red"}]
        /plain:
            get:
                operationId: Svc_Plain
                summary: A plain endpoint
    """
)

SPEC_UNKNOWN_BADGE = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths:
      /odd:
        get:
          operationId: Svc_Odd
          summary: Carries a badge we have no callout copy for
          x-badges: [{"name": "Internal", "position": "after", "color": "gray"}]
    """
)


def test_experimental_badge_becomes_a_mint_tag():
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    assert ops["Svc_Experimental"]["x-mint"]["metadata"]["tag"] == "Experimental"


def test_beta_badge_becomes_a_mint_tag():
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    assert ops["Svc_Beta"]["x-mint"]["metadata"]["tag"] == "Beta"


def test_experimental_gets_a_warning_callout():
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    content = ops["Svc_Experimental"]["x-mint"]["content"]
    assert content.startswith("<Warning>") and "experimental" in content.lower()


def test_beta_gets_a_note_callout():
    """Beta is less severe than experimental, so it uses the softer callout."""
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    content = ops["Svc_Beta"]["x-mint"]["content"]
    assert content.startswith("<Note>") and "beta" in content.lower()


def test_empty_badge_list_is_skipped():
    """v1 carries 27 of these; they must not produce an empty badge."""
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    assert "x-mint" not in ops["Svc_Empty"]


def test_operation_without_badges_is_untouched():
    ops = operations(mirror_badges(SPEC_TWO_SPACE))
    assert "x-mint" not in ops["Svc_Plain"]


def test_unknown_badge_name_gets_a_tag_but_no_callout():
    """Unrecognised badges still label the sidebar rather than being dropped."""
    ops = operations(mirror_badges(SPEC_UNKNOWN_BADGE))
    mint = ops["Svc_Odd"]["x-mint"]
    assert mint["metadata"]["tag"] == "Internal"
    assert "content" not in mint


def test_four_space_indentation_nests_correctly():
    ops = operations(mirror_badges(SPEC_FOUR_SPACE))
    assert ops["Svc_Experimental"]["x-mint"]["metadata"]["tag"] == "Experimental"
    assert "x-mint" not in ops["Svc_Plain"]


@pytest.mark.parametrize("spec", [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_UNKNOWN_BADGE])
def test_original_badges_are_preserved(spec):
    """We add a Mintlify equivalent; we do not remove the ReDoc source of truth."""
    before, after = operations(spec), operations(mirror_badges(spec))
    for op_id, op in before.items():
        if "x-badges" in op:
            assert after[op_id]["x-badges"] == op["x-badges"]


@pytest.mark.parametrize("spec", [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_UNKNOWN_BADGE])
def test_nothing_else_about_the_operation_changes(spec):
    before, after = operations(spec), operations(mirror_badges(spec))
    assert before.keys() == after.keys()
    for op_id, op in before.items():
        stripped = {k: v for k, v in after[op_id].items() if k != "x-mint"}
        assert stripped == op


@pytest.mark.parametrize("spec", [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_UNKNOWN_BADGE])
def test_is_idempotent(spec):
    once = mirror_badges(spec)
    assert mirror_badges(once) == once


# --------------------------------------------------------------------------
# x-displayName -> x-group
#
# This replaces the inline perl one-liner the sync workflow used to run. That
# version guarded with `grep -q x-group:` over the whole file, so a spec where
# upstream emitted x-group for only some tags would be skipped entirely. These
# tests pin the per-tag behaviour instead.
# --------------------------------------------------------------------------

TAGS_MISSING_GROUP = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths: {}
    tags:
    - name: StoreService
      description: Buy things
      x-displayName: Store
    - name: ZooService
      x-displayName: Zoo
    """
)

TAGS_MIXED = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths: {}
    tags:
    - name: StoreService
      x-displayName: Store
      x-group: Store
    - name: ZooService
      x-displayName: Zoo
    - name: SlackService
    """
)

TAGS_FOUR_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    paths: {}
    tags:
        - name: StoreService
          x-displayName: Supply Chain - SMS Package Manager Configurations
    """
)


def tags_of(text: str) -> dict:
    return {t["name"]: t for t in yaml.safe_load(text).get("tags", [])}


def test_display_name_is_mirrored_into_group():
    tags = tags_of(mirror_tag_groups(TAGS_MISSING_GROUP))
    assert tags["StoreService"]["x-group"] == "Store"
    assert tags["ZooService"]["x-group"] == "Zoo"


def test_existing_group_is_left_alone():
    tags = tags_of(mirror_tag_groups(TAGS_MIXED))
    assert tags["StoreService"]["x-group"] == "Store"


def test_only_the_tags_missing_a_group_are_filled_in():
    """The old perl guard skipped the whole file if any x-group existed."""
    tags = tags_of(mirror_tag_groups(TAGS_MIXED))
    assert tags["ZooService"]["x-group"] == "Zoo"


def test_tag_without_a_display_name_gets_no_group_invented():
    """v2's SlackService has neither; we must not fabricate a label."""
    tags = tags_of(mirror_tag_groups(TAGS_MIXED))
    assert "x-group" not in tags["SlackService"]


def test_display_name_value_is_copied_verbatim():
    tags = tags_of(mirror_tag_groups(TAGS_FOUR_SPACE))
    assert (
        tags["StoreService"]["x-group"]
        == "Supply Chain - SMS Package Manager Configurations"
    )


def test_description_and_other_tag_fields_survive():
    tags = tags_of(mirror_tag_groups(TAGS_MISSING_GROUP))
    assert tags["StoreService"]["description"] == "Buy things"


@pytest.mark.parametrize("spec", [TAGS_MISSING_GROUP, TAGS_MIXED, TAGS_FOUR_SPACE])
def test_tag_group_mirroring_is_idempotent(spec):
    once = mirror_tag_groups(spec)
    assert mirror_tag_groups(once) == once


def test_mirror_extensions_applies_both_passes():
    spec = textwrap.dedent(
        """\
        openapi: 3.0.3
        paths:
          /experimental:
            get:
              operationId: Svc_Experimental
              summary: An experimental endpoint
              tags:
              - StoreService
              x-badges: [{"name": "Experimental", "position": "after", "color": "red"}]
        tags:
        - name: StoreService
          x-displayName: Store
        """
    )
    out = mirror_extensions(spec)
    assert tags_of(out)["StoreService"]["x-group"] == "Store"
    assert operations(out)["Svc_Experimental"]["x-mint"]["metadata"]["tag"] == "Experimental"


def test_mirror_extensions_is_idempotent():
    spec = TAGS_MIXED
    once = mirror_extensions(spec)
    assert mirror_extensions(once) == once
