#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml"]
#
# [tool.uv]
# exclude-newer = "1 week"
# ///
#
# Give the OpenAPI specs a `servers:` block so Mintlify's API playground knows
# where to send requests.
#
# Why this exists: `servers` is the only lever Mintlify exposes for the base
# URL of an OpenAPI-generated page. There is no docs.json equivalent --
# `api.mdx.server` looks like one but governs hand-authored MDX API pages, not
# generated ones. semgrep-app emits neither spec with a `servers` block, so
# Mintlify substitutes the placeholder https://api.example.com into every code
# sample and drops the playground into a "simple mode" that cannot send
# requests at all. Both v1 and v2 are affected, on every endpoint page.
#
# The URL is the bare origin. Both specs carry their own prefix in the path
# (/api/v1/... for v1, /api/... for v2), so anything more specific would be
# duplicated into the rendered URL.
#
# The specs are overwritten every weekday by .github/workflows/update-openapi-
# specs.yml, so this runs there as a post-fetch normalization step rather than
# being applied by hand -- an edit committed straight to the YAML would be
# reverted by the next sync.
#
# A spec that already declares top-level `servers` is left alone. That makes
# this a no-op the day semgrep-app starts emitting its own, at which point the
# workflow step and this script can be deleted rather than reconciled.

from __future__ import annotations

import sys
from pathlib import Path

import yaml

SERVER = {
    "url": "https://semgrep.dev",
    "description": "Semgrep AppSec Platform",
}


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


def _top_level_index(lines: list[str], key: str) -> int | None:
    """Index of the top-level `key:` line, or None.

    Anchored at indent 0 so an operation-level `servers:` -- a legal OpenAPI
    per-path override -- is never mistaken for the document-level one.
    """
    for i, line in enumerate(lines):
        if _indent_of(line) == 0 and line.strip().split(":")[0] == key:
            return i
    return None


def _servers_block(step: int) -> list[str]:
    item = " " * step
    # Sibling keys align with `url`, past the two columns the "- " occupies.
    key = item + "  "
    return [
        "servers:",
        f"{item}- url: {SERVER['url']}",
        f"{key}description: {SERVER['description']}",
    ]


def add_servers(text: str) -> str:
    """Insert a top-level `servers:` block ahead of `paths:`, if absent."""
    lines, trailing_newline = _split_lines(text)

    if _top_level_index(lines, "servers") is not None:
        return text

    # `paths:` is the one top-level key guaranteed present in both specs, and
    # sits after `info:` in v2 and after `openapi:` in v1 -- upstream key order
    # differs, so anchoring to it is what keeps one rule working for both.
    anchor = _top_level_index(lines, "paths")
    if anchor is None:
        return text

    block = _servers_block(_indent_step(lines))
    return _join_lines(lines[:anchor] + block + lines[anchor:], trailing_newline)


def main(argv: list[str] | None = None) -> int:
    specs = sys.argv[1:] if argv is None else argv
    if not specs:
        print(f"usage: {Path(__file__).name} SPEC [SPEC ...]", file=sys.stderr)
        return 2

    for name in specs:
        path = Path(name)
        original = path.read_text()
        updated = add_servers(original)
        if updated == original:
            print(f"{path}: servers already present")
            continue
        # Parse before writing: a malformed insertion must never reach the docs.
        yaml.safe_load(updated)
        path.write_text(updated)
        print(f"{path}: added servers -> {SERVER['url']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
