---
id: extract-mode
append_help_link: true
description: "Extract mode allows for easier handling of files containing more than one language."
---

# Extract mode

Extract mode enables the ability to run existing rules on subsections of files
where the rule language is different than the language of the file. For
example, running a Javascript rule on code contained inside of script tags in
an HTML document.

## Example

Without extract mode, writing rules to validate template, markdown or
configuration files which contain code in another language can be burdensome
and require significant rule duplication.

Let's take the following bash rule as an example (a simplified version of [this
rule](https://github.com/returntocorp/semgrep-rules/blob/release/bash/curl/security/curl-eval.yaml)):

```yaml
rules:
  - id: curl-eval
    severity: WARNING
    languages:
      - bash
    message: Evaluating data from a `curl` command is unsafe.
    mode: taint
    pattern-sources:
      - pattern: |
          $(curl ...)
      - pattern: |
          `curl ...`
    pattern-sinks:
      - pattern: eval ...
```

Naïvely this rule would only be run against bash files. However, our project
might contain Dockerfiles or Python scripts which invoke bash
commands&mdash;this rule won't currently be any bash contained in those files.

We can change that by using extract mode! With extract mode we can supplement
our bash rule with instructions on how to extract any bash commands we might be
using in a Docker `RUN` instruction or via Python's `os.system` standard
library function.

```yaml
rules:
  - id: extract-docker-run-to-bash
    mode: extract
    languages:
      - dockerfile
    pattern: RUN $...CMD
    extract: $...CMD
    dest-language: bash
  - id: extract-python-os-system-to-bash
    mode: extract
    languages:
      - python
    pattern: os.system("$CMD")
    extract: $CMD
    dest-language: bash
```

With the addition of these extract rules, a Python file like

```python
from os import system

if system('eval `curl -s "http://www.very-secure-website.net"`'):
    print("Command failed!")
else:
    print("Success")
```

or a Dockerfile such as

```dockerfile
FROM fedora
RUN dnf install -y unzip zip curl which
RUN eval `curl -s "http://www.very-secure-website.net"`
```

will produce a match with the `curl-eval` rule against the contained bash.

## Rule Schema

Like "normal" (i.e., search mode) rules, extract mode rules require the fields
`id`, `languages`, and one of `pattern`, `patterns`, `pattern-either` or
`pattern-regex`. Extract mode rules also have two additional required fields:
`extract` and `dest-language`.

### `extract`

The `extract` key is required when in extract mode. The value must be a
metavariable appearing in your pattern(s), and the value bound to that
metavariable will be extracted.

### `dest-language`

The `dest-language` key is required in extract mode. The value must be a
[language tag](../../writing-rules/rule-syntax/#language-extensions-and-tags)
other than `generic`.

## Limitations

Currently, extract mode does not support additional processing for the extracted
text, such as unescaping strings, which might be useful for some applications
like Jupyter Notebooks.

While extract mode can help enable rules which try and track taint across a
language boundary within a file, taint rules cannot have a source and sink
split across the original file and extracted text. 
