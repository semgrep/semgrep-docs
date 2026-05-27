#!/usr/bin/env python3
#
# Inject Semgrep version info and other variable data into Mintlify documentation.
#
# 'foo.mdx.template' becomes 'foo.mdx' which is ready to publish.
#

import json
import subprocess
from dataclasses import dataclass


@dataclass
class Replace:
    """A search-and-replace query.
    The output file is 'dst_file'.
    The input file has an extra ".template" extension before the final extension.
    """

    dst_file: str
    find: str
    replace: str


def replace_in_file(rep: Replace):
    if rep.dst_file.endswith(".mdx"):
        # e.g. pre-commit.mdx <- pre-commit.md.template.mdx
        src_file = rep.dst_file.replace(".mdx", ".md.template.mdx")
    elif rep.dst_file.endswith(".md"):
        src_file = rep.dst_file + ".template"
    else:
        raise ValueError(f"Unsupported file type: {rep.dst_file}")

    with open(src_file) as f:
        in_data = f.read()

    out_data = in_data.replace(rep.find, rep.replace)

    with open(rep.dst_file, "w") as f:
        f.write(out_data)


RELEASES_API_URL = "https://api.github.com/repos/semgrep/semgrep/releases/latest"


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
        dst_file="docs/extensions/pre-commit.mdx",
        find="SEMGREP_VERSION_LATEST",
        replace=RELEASE_NAME,
    ),
]

for replacement in replacements:
    replace_in_file(replacement)
