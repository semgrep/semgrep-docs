#!/usr/bin/env python3

import subprocess

FILE = "docs/cli-usage.md"
DEFAULT = subprocess.run(["curl","https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep/semgrep/templates/.semgrepignore"],capture_output=True).stdout.decode("utf-8")

with open(FILE) as file:
    filedata = file.read()
    
filedata = filedata.replace("DEFAULT_SEMGREPIGNORE_TEXT",DEFAULT)

with open(FILE,"w") as file:
    file.write(filedata)