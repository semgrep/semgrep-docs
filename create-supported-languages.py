#!/usr/bin/env python3

from jinja2 import Environment, FileSystemLoader, select_autoescape
import json
from pathlib import Path

# Only these maturities will be displayed
MATURITIES = ["ga", "beta", "alpha"]

# Languages to remove from display
OVERRIDE_REMOVE_LANGS = {"regex", "python2", "python3", "generic"}

# Languages to manually add
OVERRIDE_ADD_LANGS = [{"maturity": "alpha", "name": "Generic (ERB, Jinja, etc.)"}]

# This tells jinja where to find template files
env = Environment(
    loader=FileSystemLoader(str(Path(__file__).parent / "src" / "templates")),
    autoescape=select_autoescape(),
)

# This loads the semgrep-langs lang.json file
with (Path(__file__).parent / "src" / "semgrep-langs" / "lang.json").open() as fd:
    data = json.load(fd)

# Get all languages, by maturity, sorted, skipping any "removed" languages
langs = {
    maturity: sorted(
        [
            l["name"]
            for l in data
            if l["maturity"] == maturity and l["id"] not in OVERRIDE_REMOVE_LANGS
        ]
    )
    for maturity in MATURITIES
}

# Add in manually named languages (these always go at the end)
for add in OVERRIDE_ADD_LANGS:
    langs[add["maturity"]].append(add["name"])

# Create the actual Markdown rows, adding empty cells if there are no more languages left
# for a given maturity
row_data = []
for m, l in langs.items():
    for ix, ll in enumerate(l):
        if len(row_data) <= ix:
            row_data.append({})
        row_data[ix][m] = ll
rows = [
    f"|{r.get('ga', '')}|{r.get('beta', '')}|{r.get('alpha', '')}|" for r in row_data
]

# Generate the supported languages file
template = env.get_template("supported-languages.md.j2")
with (Path(__file__).parent / "docs" / "supported-languages.md").open("w") as fd:
    fd.write(template.render(supported_langs="\n".join(rows)))
