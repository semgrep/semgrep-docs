#!/usr/bin/env python3
#
# Tests for sort_openapi_nav.py.
#
# Run with:
#   uv run --with pyyaml --with pytest pytest test_sort_openapi_nav.py

from __future__ import annotations

import textwrap

import pytest
import yaml

from sort_openapi_nav import sort_spec

METHODS = ("get", "post", "put", "patch", "delete", "options", "head")


def nav_order(text: str) -> list[tuple[str, list[str]]]:
    """Reproduce the sidebar order Mintlify renders for a spec.

    Mintlify ignores the `tags:` array and walks `paths:` top to bottom,
    opening a nav group the first time it meets each tag. Asserting against
    this keeps the tests pinned to rendered behaviour rather than to how
    sort_spec happens to shuffle the file.
    """
    doc = yaml.safe_load(text)
    display = {
        t["name"]: (t.get("x-group") or t.get("x-displayName") or t["name"])
        for t in doc.get("tags", [])
    }
    order: list[tuple[str, list[str]]] = []
    index: dict[str, list[str]] = {}
    for path_item in doc["paths"].values():
        for method, op in path_item.items():
            if method not in METHODS:
                continue
            for tag in op.get("tags", ["<untagged>"]):
                name = display.get(tag, tag)
                if name not in index:
                    index[name] = []
                    order.append((name, index[name]))
                index[name].append(op.get("summary", ""))
    return order


def groups_of(text: str) -> list[str]:
    return [name for name, _ in nav_order(text)]


def endpoints_of(text: str, group: str) -> list[str]:
    return next(summaries for name, summaries in nav_order(text) if name == group)


SPEC_TWO_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
      title: Test
      version: "1"
    paths:
      /zebra:
        get:
          operationId: Zoo_GetZebra
          summary: Show a zebra
          tags:
          - ZooService
      /apple:
        post:
          operationId: Store_BuyApple
          summary: Buy an apple
          tags:
          - StoreService
    tags:
    - name: StoreService
      x-displayName: Store
      x-group: Store
    - name: ZooService
      x-displayName: Zoo
      x-group: Zoo
    """
)

SPEC_FOUR_SPACE = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
        title: Test
        version: "1"
    paths:
        /zebra:
            get:
                operationId: Zoo_GetZebra
                summary: Show a zebra
                tags:
                    - ZooService
        /apple:
            post:
                operationId: Store_BuyApple
                summary: Buy an apple
                tags:
                    - StoreService
    tags:
        - name: StoreService
          x-group: Store
        - name: ZooService
          x-group: Zoo
    """
)

SPEC_WITH_OTHER = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
      title: Test
      version: "1"
    paths:
      /ping:
        get:
          operationId: Misc_Ping
          summary: Ping
          tags:
          - MiscService
      /apple:
        post:
          operationId: Store_BuyApple
          summary: Buy an apple
          tags:
          - StoreService
    tags:
    - name: MiscService
      x-group: Other
    - name: StoreService
      x-group: Store
    """
)

SPEC_MULTI_METHOD = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
      title: Test
      version: "1"
    paths:
      /widgets/{id}:
        put:
          operationId: Store_UpdateWidget
          summary: Update a widget
          tags:
          - StoreService
        delete:
          operationId: Store_DeleteWidget
          summary: Delete a widget
          tags:
          - StoreService
      /widgets:
        get:
          operationId: Store_ListWidgets
          summary: List widgets
          tags:
          - StoreService
    tags:
    - name: StoreService
      x-group: Store
    """
)

SPEC_UNNAMED_TAG = textwrap.dedent(
    """\
    openapi: 3.0.3
    info:
      title: Test
      version: "1"
    paths:
      /zebra:
        get:
          operationId: Zoo_GetZebra
          summary: Show a zebra
          tags:
          - ZooService
      /slack:
        get:
          operationId: Slack_Get
          summary: Get Slack config
          tags:
          - SlackService
    tags:
    - name: SlackService
    - name: ZooService
      x-group: Zoo
    """
)


def test_groups_render_alphabetically_by_display_name():
    assert groups_of(SPEC_TWO_SPACE) == ["Zoo", "Store"]  # before: document order
    assert groups_of(sort_spec(SPEC_TWO_SPACE)) == ["Store", "Zoo"]


def test_other_group_sorts_last_despite_alphabet():
    # "Other" sorts before "Store" alphabetically, but belongs at the end.
    assert groups_of(sort_spec(SPEC_WITH_OTHER)) == ["Store", "Other"]


def test_operations_within_a_group_sort_by_summary():
    out = sort_spec(SPEC_MULTI_METHOD)
    assert endpoints_of(out, "Store") == [
        "Delete a widget",
        "Update a widget",
        "List widgets",
    ]


def test_methods_within_one_path_item_sort_by_summary():
    out = sort_spec(SPEC_MULTI_METHOD)
    doc = yaml.safe_load(out)
    methods = [m for m in doc["paths"]["/widgets/{id}"] if m in METHODS]
    assert methods == ["delete", "put"]


def test_four_space_indentation_is_supported():
    assert groups_of(sort_spec(SPEC_FOUR_SPACE)) == ["Store", "Zoo"]


def test_tag_without_display_name_falls_back_to_tag_name():
    assert groups_of(sort_spec(SPEC_UNNAMED_TAG)) == ["SlackService", "Zoo"]


@pytest.mark.parametrize(
    "spec",
    [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_WITH_OTHER, SPEC_MULTI_METHOD, SPEC_UNNAMED_TAG],
)
def test_output_is_a_permutation_of_input_lines(spec):
    """The strongest safety net: sorting may move lines but never edit them."""
    assert sorted(sort_spec(spec).splitlines()) == sorted(spec.splitlines())


@pytest.mark.parametrize(
    "spec",
    [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_WITH_OTHER, SPEC_MULTI_METHOD, SPEC_UNNAMED_TAG],
)
def test_sorting_is_idempotent(spec):
    once = sort_spec(spec)
    assert sort_spec(once) == once


@pytest.mark.parametrize(
    "spec",
    [SPEC_TWO_SPACE, SPEC_FOUR_SPACE, SPEC_WITH_OTHER, SPEC_MULTI_METHOD, SPEC_UNNAMED_TAG],
)
def test_no_operation_is_dropped_or_altered(spec):
    def operations(text):
        doc = yaml.safe_load(text)
        return {
            op["operationId"]: (path, method, op.get("summary"))
            for path, item in doc["paths"].items()
            for method, op in item.items()
            if method in METHODS
        }

    assert operations(sort_spec(spec)) == operations(spec)


def test_non_paths_sections_are_untouched():
    out = sort_spec(SPEC_TWO_SPACE)
    before, after = yaml.safe_load(SPEC_TWO_SPACE), yaml.safe_load(out)
    assert before["info"] == after["info"]
    assert before["tags"] == after["tags"]
    assert before["openapi"] == after["openapi"]
