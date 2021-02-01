# Experiments

This document describes experimental features and how to try them. Have fun, [file bugs](https://github.com/returntocorp/semgrep/issues/new/choose), tweak the code, and most importantly share your thoughts! 

[TOC]

# Autofix

Hands down the best way to enforce a code standard is to just automatically fix it. Semgrep's rule format supports a `fix:` key that supports metavariable replacement, much like message fields. This allows for value capture and rewriting.

The autofix can be applied directly to the file using the `--autofix` flag, or you can use both the `--autofix` and `--dryrun` flags to test the autofix.

Example autofix (see in editor [here](https://semgrep.dev/s/R6g)):

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

Equivalences allows equivalent code patterns to be defined (i.e. a commutative property:  `$X + $Y <==> $Y + $X`).

Use the `equivalences` top-level key and one `- equivalence:` key for each equivalence. 

For example (see in editor [here](https://semgrep.dev/s/AEL)):

```yaml
rules:
  - id: open-redirect
    languages: [python]
    equivalences:
      - equivalence: request.$W.get(...) ==> request.$W(...)
    patterns:
      - pattern-inside: |
          def $FUNC(...):
            ...
      - pattern-not-inside: |
          def $FUNC(...):
            ...
            django.utils.http.is_safe_url(...)
            ...
      - pattern-not-inside: |
          if <... django.utils.http.is_safe_url(...) ...>:
            ...
          ...
      - pattern-either:
        - pattern: django.shortcuts.redirect(..., request.$W.get(...), ...)
        - pattern: django.shortcuts.redirect(..., $S.format(..., request.$W.get(...), ...), ...)
        - pattern: django.shortcuts.redirect(..., $S % request.$W.get(...), ...)
        - pattern: django.shortcuts.redirect(..., f"...{request.$W.get(...)}...", ...)
    message: "Open redirect detected."
    severity: WARNING
```

# Data-flow analysis

Semgrep can perform intra-procedural flow-sensitive analyses. The data-flow engine still has several limitations, therefore expect both false positives and false negatives. False positives could be removed by using [pattern-not](../writing-rules/rule-syntax.md#pattern-not).

A non-exhaustive list of current limitations:

- The analyses are not aware of _aliasing_.
- The analyses do not track individual elements in data structures, although there is limited support for record fields.
- `break`, `continue`, and `switch` statements are not properly handled yet.
- `try-catch-finally` is only partially supported, not all possible execution paths are considered.

As of now, data-flow analysis is used for [taint tracking](#taint-tracking) and [constant propagation](#constant-propagation).

## Taint tracking

The Python CLI has support for within (intra) file taint tracking. A taint-tracking rule uses the `mode: taint` key-value pair and replaces the typical [top-level pattern keys](../writing-rules/rule-syntax.md#schema) with `pattern-sources` and `pattern-sinks` (required) and `pattern-sanitizers` (optional). For example:

```yaml
- id: rule_id
  mode: taint
  pattern-sources:
    - source(...)
    - source1(...)
  pattern-sinks:
    - sink(...)
    - sink1(...)
    - eval(...)
  pattern-sanitizers:
    - sanitize(...)
    - sanitize1(...)
  message: A user input source() went into a dangerous sink()
  languages: [python]
  severity: WARNING
```

A file containing the rule shown above can be found [in the Semgrep repo](https://github.com/returntocorp/semgrep/blob/develop/semgrep-core/data/basic_tainting.yml). To see this taint-tracking example in action, run the above Semgrep rule on the taint test. Assuming you are in the Semgrep project’s root working directory:

```yaml
semgrep --config https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep-core/data/basic_tainting.yml ./semgrep-core/tests/OTHER/TAINTING/tainting.py
```

## Constant propagation

Constant propagation is intra-procedural and tracks whether a variable *must* carry a constant value at each point in the program.

For example, we can find calls to `eval` on arbitrary strings in Python as follows:

```yaml
rules:
- id: eval_arbitrary
  patterns:
    - pattern-either:
      - pattern: |
          eval($X)
    - pattern-not: |
        eval("...")
  message: |
    eval() on arbitrary non-constant string
  severity: WARNING
```

In the following code, Semgrep will only warn about `eval(x)`. Variable `x` is not a constant because it may take the value of the input `arg`. Variable `y` is known to be a constant despite we do not know its exact value, it may be either `"1"` or `"2"`. Pattern `eval("...")` matches `eval(y)`, but neither pattern `eval("1")` nor `eval("2")` will match `eval(y)`. Finally, variable `z` is a constant and it is known to be `"a"`, both patterns `eval("...")` and `eval("a")` match `eval(z)`.

```python
def test(arg):
   if arg is not None:
      x = arg
      y = "1"
      z = "a"
   else:
      x = "v2"
      y = "2"
      z = "a"
   # ruleid: eval_arbitrary
   eval(x)
   # OK
   eval(y)
   # OK
   eval(z)
```

# `metavariable-comparison`

The `metavariable-comparison` operator compares metavariables against a basic [Python comparison](https://docs.python.org/3/reference/expressions.html#comparisons)
expression. This is useful for filtering results based on a [metavariable's](../writing-rules/pattern-syntax.md#metavariables) numeric value.

Example:

The `metavariable-comparison` operator is a mapping which requires the
`metavariable` and `comparison` keys. It can be combined with other pattern operators:

```yaml
rules:
  - id: superuser-port
    patterns:
      - pattern: set_port($ARG)
      - metavariable-comparison:
          metavariable: '$ARG'
          comparison: '$ARG < 1024'
    message: "module setting superuser port"
    languages: [python]
    severity: ERROR
```

This will catch code like `set_port(80)` or `set_port(443)`, but not `set_port(8080)`.

The `metavariable-comparison` operator also takes optional `base: int` and
`strip: bool` keys. These keys set the integer base the metavariable value
should be interpreted as and remove quotes from the metavariable value,
respectively.

For example, `base`:

```
- pattern: set_permissions($ARG)
- metavariable-comparison:
    metavariable: '$ARG'
    comparison: '$ARG > 0o600'
    base: 8
```

This will interpret metavariable values found in code as octal, so `0700`
will be detected, but `0500` will not.

For example, `strip`:

```
- pattern: to_integer($ARG)
- metavariable-comparison:
    metavariable: '$ARG'
    comparison: '$ARG > 2147483647'
    strip: true
```

This will remove quotes (`'`, `"`, and `` ` ``) from both ends of the
metavariable content. So `"2147483648"` will be detected but `"2147483646"`
will not. This is useful when you expect strings to contain integer or float
data.

# Generic pattern matching

See [generic pattern matching](generic-pattern-matching.md).
