#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml"]
#
# [tool.uv]
# exclude-newer = "1 week"
# ///
#
# Mirror ReDoc vendor extensions into the Mintlify equivalents Mintlify
# actually reads.
#
# semgrep-app's specs are still shaped for ReDoc, which served the API
# reference before the Scalar/Mintlify moves. Mintlify ignores ReDoc's
# extensions entirely, so anything expressed only in them renders as nothing.
# Two cases exist today:
#
#   x-displayName  ->  x-group          nav group labels
#   x-badges       ->  x-mint           beta/experimental badges
#
# Without the first, nav groups fall back to raw tag names ("SlackService").
# Without the second, all 195 beta/experimental markers in v2 are invisible.
#
# Mintlify renders the standard OpenAPI `deprecated: true` flag natively as an
# orange pill, but has no native equivalent for vendor badges. Two `x-mint`
# fields cover it:
#
#   metadata.tag  -- a short label beside the endpoint in the sidebar
#   content       -- MDX injected above the generated page body
#
# The sidebar tag alone renders as accent-coloured text, which reads as *less*
# urgent than the deprecated pill next to it. So known badges also get a
# callout: <Warning> for experimental, <Note> for the milder beta. That also
# restores the red/blue distinction the x-badges colours encoded, which
# metadata.tag cannot express on its own.
#
# The ReDoc extensions are left in place. They stay upstream's source of truth,
# and keeping them means the next sync can re-derive everything from scratch.
#
# Runs in .github/workflows/update-openapi-specs.yml after the fetch and before
# the nav sort, which reads the x-group values this produces.

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import yaml

# Callout copy per badge name (lowercased). Badges missing from this table
# still get a sidebar tag -- they just get no callout, rather than being
# dropped or given wording that may not fit.
CALLOUTS = {
    "experimental": (
        "<Warning>This endpoint is **experimental**. It may change or be "
        "removed without notice, and is not covered by API stability "
        "guarantees.</Warning>"
    ),
    "beta": (
        "<Note>This endpoint is in **beta**. It may still change before it "
        "reaches general availability.</Note>"
    ),
}

BADGES_LINE = re.compile(r"^(?P<indent>\s*)x-badges:\s*(?P<value>\[.*\])\s*$")
DISPLAY_NAME_LINE = re.compile(r"^(?P<indent>\s*)x-displayName:(?P<value>.*)$")


def _indent_of(line: str) -> int:
    return len(line) - len(line.lstrip(" "))


def _split_lines(text: str) -> tuple[list[str], bool]:
    trailing_newline = text.endswith("\n")
    lines = text.split("\n")
    if trailing_newline:
        lines.pop()
    return lines, trailing_newline


def _join_lines(lines: list[str], trailing_newline: bool) -> str:
    return "\n".join(lines) + ("\n" if trailing_newline else "")


def _indent_step(lines: list[str]) -> int:
    """Infer the file's indent step from the first key under `paths:`.

    v1 is emitted with 2-space indentation and v2 with 4-space, so this can't
    be hardcoded.
    """
    for i, line in enumerate(lines):
        if line.rstrip() == "paths:":
            for following in lines[i + 1 :]:
                if following.strip():
                    return _indent_of(following) or 2
    return 2


def _top_level_region(lines: list[str], key: str) -> tuple[int, int] | None:
    """Return [start, end) line indices of the body of a top-level mapping key."""
    start = None
    for i, line in enumerate(lines):
        if _indent_of(line) == 0 and line.strip() == f"{key}:":
            start = i + 1
            break
    if start is None:
        return None
    for i in range(start, len(lines)):
        line = lines[i]
        # A block sequence may sit at indent 0 under its key -- v1 emits `tags:`
        # that way -- so a dash at column 0 is still inside the region, not the
        # next top-level key.
        if line.strip() and _indent_of(line) == 0 and not line.lstrip().startswith("- "):
            return start, i
    return start, len(lines)


def _mint_block(indent: str, step: int, badge_name: str) -> list[str]:
    pad = " " * step
    block = [
        f"{indent}x-mint:",
        f"{indent}{pad}metadata:",
        # json.dumps gives a correctly quoted scalar for names with punctuation.
        f"{indent}{pad}{pad}tag: {json.dumps(badge_name)}",
    ]
    callout = CALLOUTS.get(badge_name.lower())
    if callout:
        block.append(f"{indent}{pad}content: {json.dumps(callout)}")
    return block


def mirror_badges(text: str) -> str:
    """Add an `x-mint` sibling to every operation carrying a non-empty x-badges."""
    lines, trailing_newline = _split_lines(text)
    step = _indent_step(lines)
    out: list[str] = []

    for i, line in enumerate(lines):
        out.append(line)
        match = BADGES_LINE.match(line)
        if not match:
            continue
        try:
            badges = json.loads(match.group("value"))
        except json.JSONDecodeError:
            continue
        if not badges:
            continue
        # Already mirrored: the next line is the x-mint we would add.
        if i + 1 < len(lines) and lines[i + 1].strip().startswith("x-mint:"):
            continue
        name = badges[0].get("name")
        if name:
            out.extend(_mint_block(match.group("indent"), step, name))

    return _join_lines(out, trailing_newline)


def mirror_tag_groups(text: str) -> str:
    """Copy each tag's `x-displayName` into `x-group`, per tag.

    Replaces an inline perl one-liner that guarded on `grep -q x-group:` across
    the whole file -- meaning a spec where upstream emitted x-group for only
    some tags would have been skipped entirely.
    """
    lines, trailing_newline = _split_lines(text)
    region = _top_level_region(lines, "tags")
    if region is None:
        return text
    start, end = region

    body = [line for line in lines[start:end] if line.strip()]
    if not body:
        return text
    item_indent = _indent_of(body[0])

    # Group the region into one block per tag list item.
    blocks: list[list[str]] = []
    for line in lines[start:end]:
        if line.strip().startswith("- ") and _indent_of(line) == item_indent:
            blocks.append([line])
        elif blocks:
            blocks[-1].append(line)
        else:
            blocks.append([line])

    rebuilt: list[str] = []
    for block in blocks:
        rebuilt.extend(block)
        if any(line.strip().startswith("x-group:") for line in block):
            continue
        for offset, line in enumerate(block):
            match = DISPLAY_NAME_LINE.match(line)
            if not match:
                continue
            # Copy the raw scalar so quoting and punctuation survive verbatim.
            indent = match.group("indent")
            # A list item's first line is "- x-displayName: ..."; the mirrored
            # key has to align with the item's other keys, not the dash.
            if line.strip().startswith("- "):
                indent += "  "
            rebuilt.insert(
                len(rebuilt) - len(block) + offset + 1,
                f"{indent}x-group:{match.group('value')}",
            )
            break

    return _join_lines(lines[:start] + rebuilt + lines[end:], trailing_newline)


def mirror_extensions(text: str) -> str:
    """Apply every ReDoc -> Mintlify mirror pass."""
    return mirror_badges(mirror_tag_groups(text))


def main(argv: list[str] | None = None) -> int:
    specs = sys.argv[1:] if argv is None else argv
    if not specs:
        print(f"usage: {Path(__file__).name} SPEC [SPEC ...]", file=sys.stderr)
        return 2

    for name in specs:
        path = Path(name)
        original = path.read_text()
        mirrored = mirror_extensions(original)
        if mirrored == original:
            print(f"{path}: extensions already mirrored")
            continue
        # Parse before writing: a malformed insertion must never reach the docs.
        yaml.safe_load(mirrored)
        path.write_text(mirrored)
        added = len(mirrored.splitlines()) - len(original.splitlines())
        print(f"{path}: mirrored ReDoc extensions into x-group/x-mint (+{added} lines)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
