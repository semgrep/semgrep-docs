#!/usr/bin/env python3

from jinja2 import Environment, FileSystemLoader, select_autoescape
import json
from pathlib import Path

MATURITIES = ["ga", "beta", "alpha"]

# Languages to remove from display
OVERRIDE_REMOVE_LANGS = {"regex", "python2", "python3", "generic"}

# Languages to manually add
OVERRIDE_ADD_LANGS = [
    {"maturity": "alpha", "name": "Generic (ERB, Jinja, etc.)"}
]

env = Environment(
    loader=FileSystemLoader(str(Path(__file__).parent / "src" / "templates")),
    autoescape=select_autoescape()
)

with (Path(__file__).parent / "src" / "semgrep-langs" / "lang.json").open() as fd:
    data = json.load(fd)

langs = {}

for maturity in MATURITIES:
    langs[maturity] = sorted([
        l["name"]
        for l in data
        if l["maturity"] == maturity
        and l["id"] not in OVERRIDE_REMOVE_LANGS
    ])

for add in OVERRIDE_ADD_LANGS:
    langs[add["maturity"]].append(add["name"])

row_data = []

for m, l in langs.items():
    for ix, ll in enumerate(l):
        if len(row_data) <= ix:
            row_data.append({})
        row_data[ix][m] = ll

rows = [
    f"|{r.get('ga', '')}|{r.get('beta', '')}|{r.get('alpha', '')}|"
    for r in row_data
]

template = env.get_template('supported-languages.md.j2')

with (Path(__file__).parent / "docs" / "supported-languages.md").open("w") as fd:
    fd.write(template.render(supported_langs="\n".join(rows)))
