#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["pyyaml"]
#
# [tool.uv]
# exclude-newer = "1 week"
# ///
#
# Keep docs.json redirects in step with endpoints that change OpenAPI tag.
#
# Why this exists: Mintlify builds an endpoint's page URL from its first tag,
# so `/api-reference/v2/<tag-slug>/<summary-slug>`. Regrouping the public API
# into its new services changes tags without touching a path, a request or a
# response -- but every affected page moves, and the old URL 404s for anyone
# who bookmarked it, linked it, or found it in search.
#
# The move is derivable rather than something anyone should hand-maintain:
# diff the committed spec against the working tree, compute both URLs with the
# same slug rules the changelog uses, and emit a redirect for each difference.
# Runs in update-openapi-specs.yml alongside the changelog regeneration, so a
# tag change and its redirect land in the same PR.
#
# Chains are collapsed rather than accumulated. If an endpoint moves A -> B and
# later B -> C, the existing A -> B entry is repointed to C instead of leaving
# a redirect to a URL that no longer resolves.
#
# Requires the spec to be tracked in git; the first commit that adds a spec has
# nothing to diff against and is a no-op.

from __future__ import annotations

import argparse
import json
import pathlib
import subprocess
import sys
from typing import Optional

import yaml

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from generate_api_changelog import endpoint_urls  # noqa: E402


def committed_spec(spec_rel: str, cwd: pathlib.Path) -> Optional[dict]:
    """The spec as of HEAD, or None if it is not tracked there yet."""
    out = subprocess.run(
        ["git", "show", f"HEAD:{spec_rel}"], capture_output=True, text=True, cwd=cwd
    )
    if out.returncode != 0:
        return None
    return yaml.safe_load(out.stdout)


def moved_endpoints(before: dict, after: dict, link_base: str) -> list[tuple[str, str]]:
    """(old_url, new_url) for every operation whose page URL changed.

    Keyed by (method, path), which is the endpoint's identity: a tag change
    moves the page but not the endpoint, so the key is stable across the move.
    Endpoints added or removed outright are not redirects and are skipped.
    """
    old_urls = endpoint_urls(before, link_base)
    new_urls = endpoint_urls(after, link_base)
    moves = []
    for key, old in sorted(old_urls.items()):
        new = new_urls.get(key)
        if new is not None and new != old:
            moves.append((old, new))
    return moves


def apply_moves(docs_json: str, moves: list[tuple[str, str]]) -> tuple[str, int, int]:
    """Patch the redirects array textually. Returns (text, added, repointed).

    Textual rather than a json round-trip: re-serialising docs.json reflows the
    whole file and buries a two-line change in a whole-file diff.
    """
    if not moves:
        return docs_json, 0, 0

    existing = {r["source"]: r["destination"] for r in json.loads(docs_json).get("redirects", [])}
    added = repointed = 0
    new_entries = []

    for old, new in moves:
        # An earlier move already points somewhere; send it to the new home.
        for source, destination in list(existing.items()):
            if destination == old:
                docs_json = docs_json.replace(
                    f'"source": "{source}",\n      "destination": "{destination}"',
                    f'"source": "{source}",\n      "destination": "{new}"',
                )
                existing[source] = new
                repointed += 1
        if old in existing:
            continue  # already redirected; the loop above kept it current
        new_entries.append((old, new))
        existing[old] = new
        added += 1

    if new_entries:
        block = ",\n".join(
            f'    {{\n      "source": "{old}",\n      "destination": "{new}"\n    }}'
            for old, new in new_entries
        )
        marker = '  "redirects": [\n'
        assert marker in docs_json, "redirects array not found in docs.json"
        cut = docs_json.index(marker) + len(marker)
        rest = docs_json[cut:]
        # An empty array closes immediately, so the block must not end in a
        # comma; otherwise it is separated from the entries that follow.
        separator = "\n" if rest.lstrip().startswith("]") else ",\n"
        docs_json = docs_json[:cut] + block + separator + rest

    return docs_json, added, repointed


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Add docs.json redirects for endpoints whose OpenAPI tag changed."
    )
    parser.add_argument("spec", help="path to the OpenAPI spec (tracked in git)")
    parser.add_argument("docs_json", help="path to docs.json")
    parser.add_argument(
        "--link-base", required=True, help="URL prefix of the generated endpoint pages"
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="report the moves without writing"
    )
    args = parser.parse_args(argv)

    root = pathlib.Path(
        subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True, text=True, check=True,
        ).stdout.strip()
    )
    spec_rel = pathlib.Path(args.spec).resolve().relative_to(root).as_posix()

    before = committed_spec(spec_rel, root)
    if before is None:
        print(f"{spec_rel}: not tracked at HEAD, nothing to diff")
        return 0
    after = yaml.safe_load(pathlib.Path(args.spec).read_text())

    moves = moved_endpoints(before, after, args.link_base)
    if not moves:
        print(f"{spec_rel}: no endpoint changed page URL")
        return 0

    for old, new in moves:
        print(f"  {old} -> {new}")
    if args.dry_run:
        print(f"{spec_rel}: {len(moves)} moved (dry run, nothing written)")
        return 0

    path = pathlib.Path(args.docs_json)
    patched, added, repointed = apply_moves(path.read_text(), moves)
    json.loads(patched)  # fail loudly rather than write invalid JSON
    path.write_text(patched)
    print(f"{path}: {added} redirect(s) added, {repointed} repointed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
