#!/usr/bin/env python3

import subprocess
import json
from dataclasses import dataclass


@dataclass
class Replace:
    dst_file: str
    find: str
    replace: str


def replace_in_file(rep: Replace):
    src_file = rep.dst_file + ".template"
    with open(src_file) as f:
        in_data = f.read()

    out_data = in_data.replace(rep.find, rep.replace)

    with open(rep.dst_file,"w") as f:
        f.write(out_data)


DEFAULT_SEMGREPIGNORE = subprocess.run(["curl","https://raw.githubusercontent.com/semgrep/semgrep/develop/cli/src/semgrep/templates/.semgrepignore"],capture_output=True).stdout.decode("utf-8")
RELEASE_NAME = json.loads(subprocess.run(["curl","https://api.github.com/repos/semgrep/semgrep/releases/latest"], capture_output=True).stdout)["tag_name"]


## List of text replacements to occur when building the docs
## {"file":FILE,"find":FIND,"replace":REPLACE} will find the text FIND in FILE and replace it with REPLACE
replacements = [
    Replace(
        dst_file="docs/cli-reference.md",
        find="DEFAULT_SEMGREPIGNORE_TEXT",
        replace=DEFAULT_SEMGREPIGNORE,
    ),
    Replace(
        dst_file="docs/ignoring-files-folders-code.md",
        find="DEFAULT_SEMGREPIGNORE_TEXT",
        replace=DEFAULT_SEMGREPIGNORE,
    ),
    Replace(
        dst_file="docs/extensions/overview.md",
        find="SEMGREP_VERSION_LATEST",
        replace=RELEASE_NAME,
    ),
]

for replacement in replacements:
    replace_in_file(replacement)
