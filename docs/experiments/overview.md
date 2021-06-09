---
append_help_link: true
---

# Experiments

This document describes experimental features and how to try them. Have fun, [file bugs](https://github.com/returntocorp/semgrep/issues/new/choose), tweak the code, and most importantly share your thoughts! 

[TOC]

# Autofix

Hands down the best way to enforce a code standard is to just automatically fix it. Semgrep's rule format supports a `fix:` key that supports metavariable replacement, much like message fields. This allows for value capture and rewriting.

The autofix can be applied directly to the file using the `--autofix` flag, or you can use both the `--autofix` and `--dryrun` flags to test the autofix.

Example autofix (see in Playground [here](https://semgrep.dev/s/R6g)):

```yaml
rules:
- id: use-sys-exit
  languages:
  - python
  message: |
    Use `sys.exit` over the python shell `exit` built-in. `exit` is a helper
    for the interactive shell and is not be available on all Python implementations.
    https://stackoverflow.com/a/6501134
  pattern: exit($X)
  fix: sys.exit($X)
  severity: WARNING
```

## Autofix with regular expression replacement

A variant on the experimental `fix` key is `fix-regex`, which applies regular expression replacements (think `sed`) to matches found by Semgrep.

`fix-regex` has two required fields:

- `regex` specifies the regular expression to replace within the match found by Semgrep
- `replacement` specifies what to replace the regular expression with. 

`fix-regex` also takes an optional `count` field, which specifies how many occurrences of `regex` to replace with `replacement`, from left-to-right and top-to-bottom. By default, `fix-regex` will replace all occurrences of `regex`. If `regex` does not match anything, no replacements are made.

The replacement behavior is identical to the `re.sub` function in Python. See these [Python docs](https://docs.python.org/3/library/re.html#re.sub) for more information.

An example rule with `fix-regex` is shown below. `regex` uses a capture group to greedily capture everything up to the final parenthesis in the match found by Semgrep. `replacement` replaces this with everything in the capture group (`\1`), a comma, `timeout=30`, and a closing parenthesis. Effectively, this adds `timeout=30` to the end of every match.

```yaml
rules:
- id: python.requests.best-practice.use-timeout.use-timeout
  patterns:
  - pattern-not: requests.$W(..., timeout=$N, ...)
  - pattern-not: requests.$W(..., **$KWARGS)
  - pattern-either:
    - pattern: requests.request(...)
    - pattern: requests.get(...)
    - pattern: requests.post(...)
    - pattern: requests.put(...)
    - pattern: requests.delete(...)
    - pattern: requests.head(...)
    - pattern: requests.patch(...)
  fix-regex:
    regex: '(.*)\)'
    replacement: '\1, timeout=30)'
  message: |
    'requests' calls default to waiting until the connection is closed.
    This means a 'requests' call without a timeout will hang the program
    if a response is never received. Consider setting a timeout for all
    'requests'.
  languages: [python]
  severity: WARNING
```

<p align="center">
  <img src="https://web-assets.r2c.dev/inline-autofix-regex.gif" width="100%" alt="Apply Semgrep autofix direclty to a file"/>
</p>

# Equivalences

Equivalences enable defining equivalent code patterns (i.e. a commutative property: `$X + $Y <==> $Y + $X`). Equivalence rules use the `equivalences` top-level key and one `equivalence` key for each equivalence.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=jNnn" border="0" frameBorder="0" width="100%" height="435"></iframe>

# Data-flow analysis

Semgrep can perform intra-procedural flow-sensitive analyses. The data-flow engine still has several limitations, therefore expect both false positives and false negatives. False positives could be removed by using [pattern-not](../writing-rules/rule-syntax.md#pattern-not).

A non-exhaustive list of current limitations:

- The analyses are not aware of _aliasing_.
- The analyses do not track individual elements in data structures, although there is limited support for record fields.
- `break`, `continue`, and `switch` statements are not properly handled yet.
- `try-catch-finally` is only partially supported, not all possible execution paths are considered.

As of now, data-flow analysis is used for [taint tracking](#taint-tracking) and [constant propagation](#constant-propagation).

## Taint tracking

Semgrep supports intra-file [taint tracking](https://en.wikipedia.org/wiki/Taint_checking). Taint tracking rules must specify `mode: taint`. Additionally, the following operators are enabled:

- `pattern-sources` (required)
- `pattern-sinks` (required)
- `pattern-sanitizers` (optional)

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=2blB" border="0" frameBorder="0" width="100%" height="435"></iframe>

## Constant propagation

Semgrep supports intra-procedural constant propagation. This tracks whether a variable must carry a constant value at each point in the program.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=XLpw" border="0" frameBorder="0" width="100%" height="435"></iframe>

# Generic pattern matching

See [generic pattern matching](generic-pattern-matching.md).
