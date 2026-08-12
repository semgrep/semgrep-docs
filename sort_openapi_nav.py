#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml"]
#
# [tool.uv]
# exclude-newer = "1 week"
# ///
#
# Reorder the `paths:` section of an OpenAPI spec so Mintlify renders the API
# reference navigation alphabetically.
#
# Why this exists: Mintlify ignores the spec's `tags:` array when it
# auto-generates nav from an `openapi` group (see the `openapi` blocks in
# docs/docs.json). It walks `paths:` top to bottom and opens a nav group the
# first time it meets each tag, so sidebar order is inherited from the order
# semgrep-app happens to emit paths in — which is alphabetical by URL, putting
# "Other" first because /api/v1/bootstrap-sms-vpc sorts first. Mintlify has no
# sort option; reordering the spec is the only lever.
#
# The specs are overwritten every weekday by .github/workflows/update-openapi-
# specs.yml, so this runs there as a post-fetch normalization step rather than
# being applied by hand.
#
# Ordering produced:
#   * groups alphabetically by display name (x-group / x-displayName / name),
#     with catch-all groups ("Other", "Misc") forced last
#   * operations alphabetically by summary within each group
#
# One caveat is inherent to YAML: operations sharing a URL live under a single
# mapping key and cannot be separated. A path item is therefore placed at its
# alphabetically-first operation and its methods sorted among themselves, so
# same-URL operations stay adjacent instead of scattering across the group.
#
# Lines are moved verbatim and never rewritten -- the output is always a
# permutation of the input lines. That keeps sync diffs reviewable and avoids
# re-wrapping the folded scalars that descriptions are stored in.

from __future__ import annotations

import sys
from pathlib import Path

import yaml

METHODS = frozenset(
    ("get", "post", "put", "patch", "delete", "options", "head", "trace")
)

# Catch-all buckets read as leftovers, so they belong at the end of the nav
# regardless of where the alphabet would put them.
CATCH_ALL_GROUPS = frozenset(("other", "misc", "miscellaneous"))


def _indent_of(line: str) -> int:
    return len(line) - len(line.lstrip(" "))


def _key_of(line: str) -> str:
    """Return the mapping key a line opens, without quotes or trailing colon."""
    return line.strip().rstrip(":").strip().strip("\"'")


def _display_names(doc: dict) -> dict[str, str]:
    """Map tag name -> the label Mintlify shows in the sidebar."""
    return {
        tag["name"]: (tag.get("x-group") or tag.get("x-displayName") or tag["name"])
        for tag in doc.get("tags", [])
        if isinstance(tag, dict) and "name" in tag
    }


def _group_key(display: str) -> tuple[int, str]:
    return (1 if display.lower() in CATCH_ALL_GROUPS else 0, display.lower())


def _operation_label(operation: dict) -> str:
    """Sort key for a single operation, falling back when summary is absent."""
    return (operation.get("summary") or operation.get("operationId") or "").lower()


def _find_paths_region(lines: list[str]) -> tuple[int, int]:
    """Return [start, end) line indices of the body of the top-level `paths:`."""
    start = None
    for i, line in enumerate(lines):
        if _indent_of(line) == 0 and _key_of(line) == "paths" and line.rstrip().endswith(":"):
            start = i + 1
            break
    if start is None:
        raise ValueError("no top-level 'paths:' key found")

    for i in range(start, len(lines)):
        line = lines[i]
        if line.strip() and _indent_of(line) == 0:
            return start, i
    return start, len(lines)


def _split_blocks(lines: list[str], indent: int) -> list[list[str]]:
    """Split lines into blocks, each starting at a key at `indent`.

    Blank lines attach to the block above them so spacing travels with the
    block it belongs to.
    """
    blocks: list[list[str]] = []
    for line in lines:
        starts_block = line.strip() and _indent_of(line) == indent
        if starts_block or not blocks:
            blocks.append([line])
        else:
            blocks[-1].append(line)
    return blocks


def _sort_path_item(block: list[str], operations: dict[str, dict]) -> list[str]:
    """Sort the method sub-blocks inside one path item by summary."""
    header, rest = block[0], block[1:]
    body = [line for line in rest if line.strip()]
    if not body:
        return block

    sub_indent = _indent_of(body[0])
    sub_blocks = _split_blocks(rest, sub_indent)

    methods, others = [], []
    for sub in sub_blocks:
        key = _key_of(sub[0]).lower()
        (methods if key in METHODS else others).append(sub)

    methods.sort(key=lambda sub: _operation_label(operations.get(_key_of(sub[0]).lower(), {})))

    out = [header]
    for sub in others + methods:
        out.extend(sub)
    return out


def sort_spec(text: str) -> str:
    """Reorder `paths:` so Mintlify renders the nav alphabetically."""
    doc = yaml.safe_load(text)
    display = _display_names(doc)
    paths = doc.get("paths") or {}

    trailing_newline = text.endswith("\n")
    lines = text.split("\n")
    if trailing_newline:
        lines.pop()

    start, end = _find_paths_region(lines)
    region = lines[start:end]
    body = [line for line in region if line.strip()]
    if not body:
        return text

    path_indent = _indent_of(body[0])
    blocks = _split_blocks(region, path_indent)

    def sort_key(block: list[str]) -> tuple[int, str, str]:
        path = _key_of(block[0])
        item = paths.get(path) or {}
        operations = {m: o for m, o in item.items() if m in METHODS}
        if not operations:
            # Keep untagged/degenerate entries together at the end of the file.
            return (2, "", path.lower())
        first = min(operations.values(), key=_operation_label)
        tag = (first.get("tags") or ["<untagged>"])[0]
        group, alpha = _group_key(display.get(tag, tag))
        return (group, alpha, _operation_label(first))

    sorted_blocks = [
        _sort_path_item(
            block,
            {m: o for m, o in (paths.get(_key_of(block[0])) or {}).items() if m in METHODS},
        )
        for block in sorted(blocks, key=sort_key)
    ]

    out = lines[:start] + [line for block in sorted_blocks for line in block] + lines[end:]
    return "\n".join(out) + ("\n" if trailing_newline else "")


def main(argv: list[str]) -> int:
    if not argv:
        print(f"usage: {Path(__file__).name} SPEC [SPEC ...]", file=sys.stderr)
        return 2

    for name in argv:
        path = Path(name)
        original = path.read_text()
        sorted_text = sort_spec(original)
        if sorted_text == original:
            print(f"{path}: already ordered")
            continue
        path.write_text(sorted_text)
        print(f"{path}: reordered API navigation")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
