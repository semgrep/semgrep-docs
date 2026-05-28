#!/usr/bin/env python3
#
# Inject Semgrep version info and other variable data into Mintlify documentation.
#
# Template naming:
#   docs/foo.mdx       <- docs/foo.md.template.mdx
#   docs/foo.md        <- docs/foo.md.template
#

from __future__ import annotations

import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent

# (destination page, placeholder, template is derived from destination)
GENERATED_PAGES = (
    {
        "dst": REPO_ROOT / "docs/extensions/pre-commit.mdx",
        "placeholder": "SEMGREP_VERSION_LATEST",
    },
)

RELEASES_API_URL = "https://api.github.com/repos/semgrep/semgrep/releases/latest"


@dataclass
class Replace:
    """A search-and-replace query."""

    dst_file: Path
    find: str
    replace: str


def template_path_for(dst_file: Path) -> Path:
    name = dst_file.name
    if name.endswith(".mdx"):
        # pre-commit.mdx <- pre-commit.md.template.mdx
        return dst_file.with_name(name.replace(".mdx", ".md.template.mdx"))
    if name.endswith(".md"):
        return dst_file.with_name(f"{name}.template")
    raise ValueError(f"Unsupported file type: {dst_file}")


def replace_in_file(rep: Replace) -> None:
    src_file = template_path_for(rep.dst_file)
    if not src_file.is_file():
        print(f"::error::Missing template file: {src_file}", file=sys.stderr)
        sys.exit(1)

    in_data = src_file.read_text()
    out_data = in_data.replace(rep.find, rep.replace)
    rep.dst_file.write_text(out_data)


def fetch_url(url: str) -> str:
    result = subprocess.run(["curl", "-sS", url], capture_output=True)
    if result.returncode != 0:
        return ""
    return result.stdout.decode("utf-8")


release_data_raw = fetch_url(RELEASES_API_URL)
try:
    release_data = json.loads(release_data_raw) if release_data_raw else {}
except json.JSONDecodeError:
    release_data = {}

RELEASE_NAME = release_data.get("tag_name", "latest")

replacements = [
    Replace(
        dst_file=page["dst"],
        find=page["placeholder"],
        replace=RELEASE_NAME,
    )
    for page in GENERATED_PAGES
]

for replacement in replacements:
    replace_in_file(replacement)
