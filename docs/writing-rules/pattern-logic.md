# Rule syntax

This document provides a reference for Semgrep YAML rule syntax.

[TOC]

## Schema

### Required

All required fields must be present at the top-level of a rule, immediately underneath `rules`.

| Field                                                   | Type     | Description                                                                                       |
| :------------------------------------------------------ | :------- | :------------------------------------------------------------------------------------------------ |
| `id`                                                    | `string` | Unique, descriptive identifier, e.g., `no-unused-variable`                                        |
| `message`                                               | `string` | Message highlighting why this rule fired and how to remediate the issue                          |
| `severity`                                              | `string` | One of: `WARNING`, `ERROR`                                                                        |
| `languages`                                             | `array`  | Any of: `go`, `java`, `javascript`, `python`, `typescript`                                      |
| [`pattern`](#pattern)_\*_               | `string` | Find code matching this expression                                                                |
| [`patterns`](#patterns)_\*_             | `array`  | Logical AND of multiple patterns                                                                  |
| [`pattern-either`](#pattern-either)_\*_ | `array`  | Logical OR of multiple patterns                                                                   |
| [`pattern-regex`](#pattern-regex)_\*_   | `string` | Search files for [Python `re`](https://docs.python.org/3/library/re.html) compatible expressions  |


!!! info
    Only one of `pattern`, `patterns`, `pattern-either`, or `pattern-regex` is required.

### Optional

| Field                                   | Type     | Description                                                                              |
| :-------------------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| [`fix`](#fix)           | `object` | Simple search-and-replace autofix functionality                                         |
| [`metadata`](#metadata) | `object` | Arbitrary user-provided data; attach data to rules without affecting Semgrep’s behavior |
| [`paths`](#paths)       | `object` | Paths to include or exclude when running this rule                                     |

The below optional fields must reside underneath a `patterns` or `pattern-either` field.

| Field                                                           | Type     | Description                                                                                                              |
| :-------------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------- |
| [`metavariable-regex`](#metavariable-regex)     | `map`    | Search metavariables for [Python `re`](https://docs.python.org/3/library/re.html#re.match) compatible expressions |
| [`pattern-not`](#pattern-not)                   | `string` | Logical NOT - remove findings matching this expression                                                                  |
| [`pattern-inside`](#pattern-inside)             | `string` | Keep findings that lie inside this pattern                                                                              |
| [`pattern-not-inside`](#pattern-not-inside)     | `string` | Keep findings that do not lie inside this pattern                                                                       |
| [`pattern-where-python`](#pattern-where-python) | `string` | Remove findings matching this Python expression                                                                         |

## Operators

### `pattern`

The `pattern` operator looks for code matching its expression. This can be basic expressions like `$X == $X` or unwanted things like `crypto.md5(...)`.


### `patterns`

The `patterns` operator performs a logical AND operation on one or more child patterns. This is useful for chaining multiple patterns together that all must be true.

Example:

```yaml
rules:
  - id: eqeq-always-true
    patterns:
      - pattern: $X == $X
      - pattern-not: 0 == 0
    message: "$X == $X is always true"
    languages: [python]
    severity: ERROR
```

Checking if `0 == 0` is often used to quickly enable and disable blocks of code. It can easily be changed to `0 == 1` to disable functionality. We can remove these debugging false positives with `patterns`.

### `pattern-either`

The `pattern-either` operator performs a logical OR operation on one or more child patterns. This is useful for chaining multiple patterns together where any may be true.

Example:

```yaml
rules:
  - id: insecure-crypto-usage
    pattern-either:
      - pattern: hashlib.md5(...)
      - pattern: hashlib.sha1(...)
    message: "insecure cryptography hashing function"
    languages: [python]
    severity: ERROR
```

This rule looks for usage of the Python standard library functions `hashlib.md5` or `hashlib.sha1`. Depending on their usage, these hashing functions are [considered insecure](https://shattered.io/).

### `pattern-regex`

The `pattern-regex` operator searches files for a [Python `re`](https://docs.python.org/3/library/re.html) compatible expression. This is useful for migrating existing regular expression code search functionality to Semgrep.

Example:

The `pattern-regex` operator can be combined with other pattern operators:

```yaml
rules:
  - id: boto-client-ip
    patterns:
      - pattern-inside: boto3.client(host="...")
      - pattern-regex: '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
    message: "boto client using IP address"
    languages: [python]
    severity: ERROR
```

It can also be used as a standalone, top-level operator:

```yaml
rules:
  - id: legacy-eval-search
    pattern-regex: 'eval\('
    message: "insecure code execution"
    languages: [javascript]
    severity: ERROR
```

!!! note
    Single (`'`) and double (`"`) quotes [behave differently](https://docs.octoprint.org/en/master/configuration/yaml.html#scalars) in YAML syntax. Single quotes are typically preferred when using backslashes (`\`) with `pattern-regex`.

### `metavariable-regex`

The `metavariable-regex` operator searches metavariables for a [Python `re`](https://docs.python.org/3/library/re.html#re.match) compatible expression. This is useful for filtering results based on a [metavariable’s](pattern-syntax.md#metavariables) value. It requires the `metavariable` and `regex` keys and can be combined with other pattern operators.

Example:


```yaml
rules:
  - id: insecure-methods
    patterns:
      - pattern: module.$METHOD(...)
      - metavariable-regex:
          metavariable: "$METHOD"
          regex: "(insecure1|insecure2|insecure3)"
    message: "module using insecure method call"
    languages: [python]
    severity: ERROR
```

### `pattern-not`

The `pattern-not` operator is the opposite of the `pattern` operator. It finds code that does not match its expression. This is useful for eliminating common false positives.

Example: see the [`patterns`](#patterns) example above.

### `pattern-inside`

The `pattern-inside` operator keeps matched findings that reside within its expression. This is useful for finding code inside other pieces of code like functions or if blocks.

Example:

```yaml
rules:
  - id: return-in-init
    patterns:
      - pattern: return ...
      - pattern-inside: |
          class $CLASS(...):
              ...
              def __init__(...):
                  ...
    message: "return should never appear inside a class __init__ function"
    languages: [python]
    severity: ERROR
```

The above example fires on the following code:

```python
class Cls(object):
    def __init__(self):
        return None
```

### `pattern-not-inside`

The `pattern-not-inside` operator keeps matched findings that do not reside within its expression. It is the opposite of `pattern-inside`. This is useful for finding code that’s missing a corresponding cleanup action like disconnect, close, or shutdown. It’s also useful for finding problematic code that isn't inside code that mitigates the issue.

Example:

```yaml
rules:
  - id: open-never-closed
    patterns:
      - pattern: $F = open(...)
      - pattern-not-inside: |
          $F = open(...)
          ...
          $F.close()
    message: "file object opened without corresponding close"
    languages: [python]
    severity: ERROR
```

The above rule looks for files that are opened but never closed, possibly leading to resource exhaustion. It looks for the `open(...)` pattern _and not_ a following `close()` pattern.

The `$FILE` metavariable ensures that the same variable name is used in the `open` and `close` calls. The ellipsis operator allows for any arguments to be passed to `open` and any sequence of code statements in-between the `open` and `close` calls. The rule ignores how `open` is called or what happens up to a `close` call &mdash; it only needs to make sure `close` is called.

### `pattern-where-python`

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

## Metavariable matching

Metavariable matching operates differently for logical AND (`patterns`) and logical OR (`pattern-either`) parent operators. Behavior is consistent across all child operators: `pattern`, `pattern-not`, `pattern-regex`, `pattern-inside`, `pattern-not-inside`.

### Metavariables in logical ANDs

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

### Metavariables in logical ORs

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

### Metavariables in complex logic

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

## `fix`

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

## `metadata`

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

## `paths`

### Excluding a rule in paths

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

### Limiting a rule to paths

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

## Other examples

This section contains more complex rules that perform advanced code searching.

### Complete useless comparison

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

## Full specification

The [full configuration-file format](https://github.com/returntocorp/semgrep/blob/develop/semgrep/semgrep/rule_schema.yaml) is defined as
a [jsonschema](http://json-schema.org/specification.html) object.
