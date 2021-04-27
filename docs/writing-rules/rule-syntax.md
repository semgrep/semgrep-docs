# Rule syntax

!!! info
    Getting started with rule writing? Try the [Semgrep Tutorial](https://semgrep.dev/learn) 🎓

This document describes Semgrep's YAML rule syntax.

[TOC]

# Schema

## Required

All required fields must be present at the top-level of a rule, immediately underneath `rules`.

| Field                                                   | Type     | Description                                                                                       |
| :------------------------------------------------------ | :------- | :------------------------------------------------------------------------------------------------ |
| `id`                                                    | `string` | Unique, descriptive identifier, e.g., `no-unused-variable`                                        |
| `message`                                               | `string` | Message highlighting why this rule fired and how to remediate the issue                           |
| `severity`                                              | `string` | One of: `INFO`, `WARNING`, or `ERROR`                                                             |
| `languages`                                             | `array`  | See [supported languages](https://semgrep.dev/docs/status/)                                       |
| [`pattern`](#pattern)_\*_               | `string` | Find code matching this expression                                                                |
| [`patterns`](#patterns)_\*_             | `array`  | Logical AND of multiple patterns                                                                  |
| [`pattern-either`](#pattern-either)_\*_ | `array`  | Logical OR of multiple patterns                                                                   |
| [`pattern-regex`](#pattern-regex)_\*_   | `string` | Search files for [Python `re`](https://docs.python.org/3/library/re.html) compatible expressions  |


!!! info
    Only one of `pattern`, `patterns`, `pattern-either`, or `pattern-regex` is required.

## Optional

| Field                                   | Type     | Description                                                                              |
| :-------------------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| [`fix`](#fix)           | `object` | Simple search-and-replace autofix functionality                                         |
| [`metadata`](#metadata) | `object` | Arbitrary user-provided data; attach data to rules without affecting Semgrep’s behavior |
| [`paths`](#paths)       | `object` | Paths to include or exclude when running this rule                                     |

The below optional fields must reside underneath a `patterns` or `pattern-either` field.

| Field                                                           | Type     | Description                                                                                                              |
| :-------------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------- |
| [`metavariable-regex`](#metavariable-regex)     | `map`    | Search metavariables for [Python `re`](https://docs.python.org/3/library/re.html#re.match) compatible expressions |
| [`metavariable-comparison`](#metavariable-comparison)     | `map`    | Compare metavariables against basic [Python expressions](https://docs.python.org/3/reference/expressions.html#comparisons) |
| [`pattern-not`](#pattern-not)                   | `string` | Logical NOT - remove findings matching this expression                                                                  |
| [`pattern-inside`](#pattern-inside)             | `string` | Keep findings that lie inside this pattern                                                                              |
| [`pattern-not-inside`](#pattern-not-inside)     | `string` | Keep findings that do not lie inside this pattern                                                                       |
| [`pattern-not-regex`](#pattern-not-regex)   | `string` | Filter results using [Python `re`](https://docs.python.org/3/library/re.html) compatible expressions  |
| [`pattern-where-python`](#pattern-where-python) | `string` | Remove findings matching this Python expression                                                                         |

# Operators

## `pattern`

The `pattern` operator looks for code matching its expression. This can be basic expressions like `$X == $X` or unwanted function calls like `hashlib.md5(...)`.

<iframe src="https://semgrep.dev/embed/editor?snippet=gJo5" border="0" frameBorder="0" width="100%" height="435"></iframe>

## `patterns`

The `patterns` operator performs a logical AND operation on one or more child patterns. This is useful for chaining multiple patterns together that all must be true.

<iframe src="https://semgrep.dev/embed/editor?snippet=Q83q" border="0" frameBorder="0" width="100%" height="435"></iframe>

## `pattern-either`

The `pattern-either` operator performs a logical OR operation on one or more child patterns. This is useful for chaining multiple patterns together where any may be true.

<iframe src="https://semgrep.dev/embed/editor?snippet=4yX9" border="0" frameBorder="0" width="100%" height="435"></iframe>

This rule looks for usage of the Python standard library functions `hashlib.md5` or `hashlib.sha1`. Depending on their usage, these hashing functions are [considered insecure](https://shattered.io/).

## `pattern-regex`

The `pattern-regex` operator searches files for a [Python `re`](https://docs.python.org/3/library/re.html) compatible expression. This is useful for migrating existing regular expression code search functionality to Semgrep.

The `pattern-regex` operator can be combined with other pattern operators:

<iframe src="https://semgrep.dev/embed/editor?snippet=Ppvv" border="0" frameBorder="0" width="100%" height="435"></iframe>

It can also be used as a standalone, top-level operator:

<iframe src="https://semgrep.dev/embed/editor?snippet=J3vP" border="0" frameBorder="0" width="100%" height="435"></iframe>

!!! note
    Single (`'`) and double (`"`) quotes [behave differently](https://docs.octoprint.org/en/master/configuration/yaml.html#scalars) in YAML syntax. Single quotes are typically preferred when using backslashes (`\`) with `pattern-regex`.

## `pattern-not-regex`

The `pattern-not-regex` operator filters results using a [Python `re`](https://docs.python.org/3/library/re.html) regular expression. This is most useful when combined with regular-expression only rules, providing an easy way to filter findings without having to use negative lookaheads. `pattern-not-regex` will work with regular `pattern` clauses, too.

The syntax for this operator is the same as `pattern-regex`.

This operator will filter findings that have _any overlap_ with the supplied regular expression. For example, if you use `pattern-regex` to detect `Foo==1.1.1` and it also detects `Foo-Bar==3.0.8` and `Bar-Foo==3.0.8`, you can use `pattern-not-regex` to filter the unwanted findings.

<iframe src="https://semgrep.dev/embed/editor?snippet=8n5Q" border="0" frameBorder="0" width="100%" height="435"></iframe>

## `metavariable-regex`

The `metavariable-regex` operator searches metavariables for a [Python `re`](https://docs.python.org/3/library/re.html#re.match) compatible expression. This is useful for filtering results based on a [metavariable’s](pattern-syntax.md#metavariables) value. It requires the `metavariable` and `regex` keys and can be combined with other pattern operators.

<iframe src="https://semgrep.dev/embed/editor?snippet=584j" border="0" frameBorder="0" width="100%" height="435"></iframe>

!!! note
    Include quotes in your regular expression when using `metavariable-regex` to search string literals. See [this snippet](https://semgrep.dev/s/mschwager:include-quotes) for more details. [String matching](pattern-syntax.md#string-matching) functionality can also be used to search string literals.

## `metavariable-comparison`

The `metavariable-comparison` operator compares metavariables against a basic [Python comparison](https://docs.python.org/3/reference/expressions.html#comparisons) expression. This is useful for filtering results based on a [metavariable's](../writing-rules/pattern-syntax.md#metavariables) numeric value.

The `metavariable-comparison` operator is a mapping which requires the `metavariable` and `comparison` keys. It can be combined with other pattern operators:

<iframe src="https://semgrep.dev/embed/editor?snippet=GWv6" border="0" frameBorder="0" width="100%" height="435"></iframe>

This will catch code like `set_port(80)` or `set_port(443)`, but not `set_port(8080)`.

The `metavariable-comparison` operator also takes optional `base: int` and `strip: bool` keys. These keys set the integer base the metavariable value should be interpreted as and remove quotes from the metavariable value, respectively.

For example, `base`:

<iframe src="https://semgrep.dev/embed/editor?snippet=R8vN" border="0" frameBorder="0" width="100%" height="435"></iframe>

This will interpret metavariable values found in code as octal, so `0700` will be detected, but `0400` will not.

For example, `strip`:

<iframe src="https://semgrep.dev/embed/editor?snippet=AlqB" border="0" frameBorder="0" width="100%" height="435"></iframe>

This will remove quotes (`'`, `"`, and `` ` ``) from both ends of the metavariable content. So `"2147483648"` will be detected but `"2147483646"` will not. This is useful when you expect strings to contain integer or float data.

## `pattern-not`

The `pattern-not` operator is the opposite of the `pattern` operator. It finds code that does not match its expression. This is useful for eliminating common false positives.

<iframe src="https://semgrep.dev/embed/editor?snippet=Q83q" border="0" frameBorder="0" width="100%" height="435"></iframe>

## `pattern-inside`

The `pattern-inside` operator keeps matched findings that reside within its expression. This is useful for finding code inside other pieces of code like functions or if blocks.

<iframe src="https://semgrep.dev/embed/editor?snippet=B4lR" border="0" frameBorder="0" width="100%" height="435"></iframe>

## `pattern-not-inside`

The `pattern-not-inside` operator keeps matched findings that do not reside within its expression. It is the opposite of `pattern-inside`. This is useful for finding code that’s missing a corresponding cleanup action like disconnect, close, or shutdown. It’s also useful for finding problematic code that isn't inside code that mitigates the issue.

<iframe src="https://semgrep.dev/embed/editor?snippet=DJ6G" border="0" frameBorder="0" width="100%" height="435"></iframe>

The above rule looks for files that are opened but never closed, possibly leading to resource exhaustion. It looks for the `open(...)` pattern _and not_ a following `close()` pattern.

The `$F` metavariable ensures that the same variable name is used in the `open` and `close` calls. The ellipsis operator allows for any arguments to be passed to `open` and any sequence of code statements in-between the `open` and `close` calls. The rule ignores how `open` is called or what happens up to a `close` call &mdash; it only needs to make sure `close` is called.

## `pattern-where-python`

The `pattern-where-python` is the most flexible operator. It allows for writing custom Python logic to filter findings. This is useful when none of the other operators provide the functionality needed to create a rule.

!!! danger
    Use caution with this operator. It allows for arbitrary Python code execution.

    As a defensive measure, the `--dangerously-allow-arbitrary-code-execution-from-rules` flag must be passed to use rules containing `pattern-where-python`.

Example:

```yaml
rules:
  - id: use-decimalfield-for-money
    patterns:
      - pattern: $FIELD = django.db.models.FloatField(...)
      - pattern-inside: |
          class $CLASS(...):
              ...
      - pattern-where-python: "'price' in vars['$FIELD'] or 'salary' in vars['$FIELD']"
    message: "use DecimalField for currency fields to avoid float-rounding errors"
    languages: [python]
    severity: ERROR
```

The above rule looks for use of Django’s [`FloatField`](https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.FloatField) model when storing currency information. `FloatField` can lead to rounding errors and should be avoided in favor of [`DecimalField`](https://docs.djangoproject.com/en/3.0/ref/models/fields/#django.db.models.DecimalField) when dealing with currency. Here the `pattern-where-python` operator allows us to utilize the Python `in` statement to filter findings that look like currency.

# Metavariable matching

Metavariable matching operates differently for logical AND (`patterns`) and logical OR (`pattern-either`) parent operators. Behavior is consistent across all child operators: `pattern`, `pattern-not`, `pattern-regex`, `pattern-inside`, `pattern-not-inside`.

## Metavariables in logical ANDs

Metavariable values must be identical across sub-patterns when performing logical AND operations with the `patterns` operator.

Example:

```yaml
rules:
  - id: function-args-to-open
    patterns:
      - pattern-inside: |
          def $F($X):
              ...
      - pattern: open($X)
    message: "Function argument passed to open() builtin"
    languages: [python]
    severity: ERROR
```

This rule matches the following code:

```python
def foo(path):
    open(path)
```

The example rule doesn’t match this code:

```python
def foo(path):
    open(something_else)
```

## Metavariables in logical ORs

Metavariable matching does not affect the matching of logical OR operations with the `pattern-either` operator.

Example:

```yaml
rules:
  - id: insecure-function-call
    pattern-either:
      - pattern: insecure_func1($X)
      - pattern: insecure_func2($X)
    message: "Insecure function use"
    languages: [python]
    severity: ERROR
```

The above rule matches both examples below:

```python
insecure_func1(something)
insecure_func2(something)
```

```python
insecure_func1(something)
insecure_func2(something_else)
```

## Metavariables in complex logic

Metavariable matching still affects subsequent logical ORs if the parent is a logical AND.

Example:

```yaml
patterns:
  - pattern-inside: |
      def $F($X):
        ...
  - pattern-either:
      - pattern: bar($X)
      - pattern: baz($X)
```

The above rule matches both examples below:

```python
def foo(something):
    bar(something)
```

```python
def foo(something):
    baz(something)
```

The example rule doesn’t match this code:

```python
def foo(something):
    bar(something_else)
```

# `fix`

The `fix` top-level key allows for simple autofixing of a pattern by suggesting an autofix for each match. Run `semgrep` with `--autofix` to apply the changes to the files.

Example:

```yaml
rules:
  - id: use-dict-get
    patterns:
      - pattern: $DICT[$KEY]
    fix: $DICT.get($KEY)
    message: "Use `.get()` method to avoid a KeyNotFound error"
    languages: [python]
    severity: ERROR
```

# `metadata`

To note extra information on a rule, such as a related CVE or the name of the security engineer who wrote the rule, use the `metadata:` key.

Example:

```yaml
rules:
  - id: eqeq-is-bad
    patterns:
      - [...]
    message: "useless comparison operation `$X == $X` or `$X != $X`"
    metadata:
      cve: CVE-2077-1234
      discovered-by: Ikwa L'equale
```

The metadata will also be shown in Semgrep’s output if you’re running it with `--json`.

# `paths`

## Excluding a rule in paths

To ignore a specific rule on specific files, set the `paths:` key with one or more filters.

Example:

```yaml
rules:
  - id: eqeq-is-bad
    pattern: $X == $X
    paths:
      exclude:
        - "*.jinja2"
        - "*_test.go"
        - "project/tests"
        - project/static/*.js
```

When invoked with `semgrep -f rule.yaml project/`, the above rule will run on files inside `project/`, but no results will be returned for:

- any file with a `.jinja2` file extension
- any file whose name ends in `_test.go`, such as `project/backend/server_test.go`
- any file inside `project/tests` or its subdirectories
- any file matching the `project/static/*.js` glob pattern

!!! note
    The glob syntax is from [Python's `pathlib`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.match) and is used to match against the given file and all its parent directories.

## Limiting a rule to paths

Conversely, to run a rule _only_ on specific files, set a `paths:` key with one or more of these filters:

```yaml
rules:
  - id: eqeq-is-bad
    pattern: $X == $X
    paths:
      include:
        - "*_test.go"
        - "project/server"
        - "project/schemata"
        - "project/static/*.js"
```

When invoked with `semgrep -f rule.yaml project/`, this rule will run on files inside `project/`, but results will be returned only for:

- files whose name ends in `_test.go`, such as `project/backend/server_test.go`
- files inside `project/server`, `project/schemata`, or their subdirectories
- files matching the `project/static/*.js` glob pattern

!!! note
    When mixing inclusion and exclusion filters, the exclusion ones take precedence.

Example:

```yaml
paths:
  include: "project/schemata"
  exclude: "*_internal.py"
```

The above rule returns results from `project/schemata/scan.py` but not from `project/schemata/scan_internal.py`.

# Other examples

This section contains more complex rules that perform advanced code searching.

## Complete useless comparison

```yaml
rules:
  - id: eqeq-is-bad
    patterns:
      - pattern-not-inside: |
          def __eq__(...):
              ...
      - pattern-not-inside: assert(...)
      - pattern-not-inside: assertTrue(...)
      - pattern-not-inside: assertFalse(...)
      - pattern-either:
          - pattern: $X == $X
          - pattern: $X != $X
          - patterns:
              - pattern-inside: |
                  def __init__(...):
                       ...
              - pattern: self.$X == self.$X
      - pattern-not: 1 == 1
    message: "useless comparison operation `$X == $X` or `$X != $X`"
```

The above rule makes use of many operators. It uses `pattern-either`, `patterns`, `pattern`, and `pattern-inside` to carefully consider different cases, and uses `pattern-not-inside` and `pattern-not` to whitelist certain useless comparisons.

# Full specification

The [full configuration-file format](https://github.com/returntocorp/semgrep/blob/develop/semgrep/semgrep/rule_schema.yaml) is defined as
a [jsonschema](http://json-schema.org/specification.html) object.
