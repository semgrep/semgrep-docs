#!/usr/bin/env python3

import requests

FILE = "docs/cli-usage.md"
DEFAULT = requests.get("https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep/semgrep/templates/.semgrepignore")

with open(FILE) as file:
    filedata = file.read()
    
filedata = filedata.replace("DEFAULT_SEMGREPIGNORE_TEXT",DEFAULT.text)

with open(FILE,"w") as file:
    file.write(filedata)