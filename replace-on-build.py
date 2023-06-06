#!/usr/bin/env python3

import subprocess
import json
def replace_in_file(file,find,replace):
    with open(file) as f:
        filedata = f.read()

    filedata = filedata.replace(find,replace)

    with open(file,"w") as f:
        f.write(filedata)


DEFAULT_SEMGREPIGNORE = subprocess.run(["curl","https://raw.githubusercontent.com/returntocorp/semgrep/develop/cli/src/semgrep/templates/.semgrepignore"],capture_output=True).stdout.decode("utf-8")
RELEASE_NAME = json.loads(subprocess.run(["curl","https://api.github.com/repos/returntocorp/semgrep/releases/latest"], capture_output=True).stdout)["tag_name"]


## List of text replacements to occur when building the docs
## {"file":FILE,"find":FIND,"replace":REPLACE} will find the text FIND in FILE and replace it with REPLACE
replacements = [
    {"file":"docs/cli-reference.md", "find":"DEFAULT_SEMGREPIGNORE_TEXT", "replace":DEFAULT_SEMGREPIGNORE},
    {"file":"docs/ignoring-files-folders-code.md", "find":"DEFAULT_SEMGREPIGNORE_TEXT", "replace":DEFAULT_SEMGREPIGNORE},
    {"file":"docs/extensions/overview.md", "find":"SEMGREP_VERSION_LATEST", "replace":RELEASE_NAME},
]

for args in replacements:
    replace_in_file(**args)
