---
append_help_link: true
slug: rule-syntax
description: "This document describes Semgrep’s YAML rule syntax including required and optional fields. Just getting started with Semgrep rule writing? Check out the Semgrep Tutorial at https://semgrep.dev/learn"
---

import MoreHelp from "/src/components/MoreHelp"
import LanguageExtensionsTags from '/src/components/reference/_language-extensions-tags.mdx'
import RequiredRuleFields from "/src/components/reference/_required-rule-fields.mdx"

# Rule syntax

:::tip
Getting started with rule writing? Try the [Semgrep Tutorial](https://semgrep.dev/learn) 🎓
:::

This document describes Semgrep’s YAML rule syntax.

## Schema

### Required

<RequiredRuleFields />

#### Language extensions and languages key values

<LanguageExtensionsTags />

### Optional

| Field      | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| [`options`](#options)   | `object` | Options object to enable/disable certain matching features |
| [`fix`](#fix)           | `object` | Simple search-and-replace autofix functionality  |
| [`metadata`](#metadata) | `object` | Arbitrary user-provided data; attach data to rules without affecting Semgrep’s behavior |
| [`paths`](#paths)       | `object` | Paths to include or exclude when running this rule |

The below optional fields must reside underneath a `patterns` or `pattern-either` field.

| Field                | Type     | Description              |
| :------------------- | :------- | :----------------------- |
| [`pattern-inside`](#pattern-inside)             | `string` | Keep findings that lie inside this pattern                                                                              |

The below optional fields must reside underneath a `patterns` field.

| Field            | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| [`metavariable-regex`](#metavariable-regex)         | `map` | Search metavariables for [Python `re`](https://docs.python.org/3/library/re.html#re.match) compatible expressions; regex matching is **unanchored** |
| [`metavariable-pattern`](#metavariable-pattern)     | `map` | Matches metavariables with a pattern formula  |
| [`metavariable-comparison`](#metavariable-comparison) | `map` | Compare metavariables against basic [Python expressions](https://docs.python.org/3/reference/expressions.html#comparisons) |
| [`pattern-not`](#pattern-not) | `string` | Logical NOT - remove findings matching this expression |
| [`pattern-not-inside`](#pattern-not-inside)     | `string` | Keep findings that do not lie inside this pattern |
| [`pattern-not-regex`](#pattern-not-regex)   | `string` | Filter results using a [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html)-compatible pattern in multiline mode |

## Operators

### `pattern`

The `pattern` operator looks for code matching its expression. This can be basic expressions like `$X == $X` or unwanted function calls like `hashlib.md5(...)`.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/gJo5). 
:::

### `patterns`

The `patterns` operator performs a logical AND operation on one or more child patterns. This is useful for chaining multiple patterns together that all must be true.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/Q83q).
:::

#### `patterns` operator evaluation strategy

Note that the order in which the child patterns are declared in a `patterns` operator has no effect on the final result. A `patterns` operator is always evaluated in the same way:

1. Semgrep evaluates all _positive_ patterns, that is [`pattern-inside`](#pattern-inside)s, [`pattern`](#pattern)s, [`pattern-regex`](#pattern-regex)es, and [`pattern-either`](#pattern-either)s. Each range matched by each one of these patterns is intersected with the ranges matched by the other operators. The result is a set of _positive_ ranges. The positive ranges carry _metavariable bindings_. For example, in one range `$X` can be bound to the function call `foo()`, and in another range `$X` can be bound to the expression `a + b`.
2. Semgrep evaluates all _negative_ patterns, that is [`pattern-not-inside`](#pattern-not-inside)s, [`pattern-not`](#pattern-not)s, and [`pattern-not-regex`](#pattern-not-regex)es. This gives a set of _negative ranges_ which are used to filter the positive ranges. This results in a strict subset of the positive ranges computed in the previous step.
3. Semgrep evaluates all _conditionals_, that is [`metavariable-regex`](#metavariable-regex)es, [`metavariable-pattern`](#metavariable-pattern)s, and [`metavariable-comparison`](#metavariable-comparison)s. These conditional operators can only examine the metavariables bound in the positive ranges in step 1, that passed through the filter of negative patterns in step 2. Note that metavariables bound by negative patterns are _not_ available here.
4. Semgrep applies all [`focus-metavariable`](#focus-metavariable)s, by computing the intersection of each positive range with the range of the metavariable on which we want to focus. Again, the only metavariables available to focus on are those bound by positive patterns.

<!-- TODO: Add example to illustrate all of the above -->

### `pattern-either`

The `pattern-either` operator performs a logical OR operation on one or more child patterns. This is useful for chaining multiple patterns together where any may be true.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/4yX9).
:::

This rule looks for usage of the Python standard library functions `hashlib.md5` or `hashlib.sha1`. Depending on their usage, these hashing functions are [considered insecure](https://shattered.io/).

### `pattern-regex`

The `pattern-regex` operator searches files for substrings matching the given [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) pattern. This is useful for migrating existing regular expression code search functionality to Semgrep. Perl-Compatible Regular Expressions (PCRE) is a full-featured regex library that is widely compatible with Perl, but also with the respective regex libraries of Python, JavaScript, Go, Ruby, and Java. Patterns are compiled in multiline mode, for example `^` and `$` matches at the beginning and end of lines respectively in addition to the beginning and end of input.

:::caution
PCRE supports only a [limited number of Unicode character properties](https://www.pcre.org/original/doc/html/pcrepattern.html#uniextseq). For example, `\p{Egyptian_Hieroglyphs}` is supported but `\p{Bidi_Control}` isn't.
:::

:::note Examples of the `pattern-regex` operator
- `pattern-regex` combined with other pattern operators: [Semgrep Playground example](https://semgrep.dev/s/Ppvv)
- `pattern-regex` used as a standalone, top-level operator: [Semgrep Playground example](https://semgrep.dev/s/J3vP)
:::

:::info
Single (`'`) and double (`"`) quotes [behave differently](https://docs.octoprint.org/en/master/configuration/yaml.html#scalars) in YAML syntax. Single quotes are typically preferred when using backslashes (`\`) with `pattern-regex`.
:::

Note that you may bind a section of a regular expression to a metavariable, by using [named capturing groups](https://www.regular-expressions.info/named.html). In 
this case, the name of the capturing group must be a valid metavariable name.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/p8OL).
:::

### `pattern-not-regex`

The `pattern-not-regex` operator filters results using a [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) regular expression in multiline mode. This is most useful when combined with regular-expression only rules, providing an easy way to filter findings without having to use negative lookaheads. `pattern-not-regex` works with regular `pattern` clauses, too.

The syntax for this operator is the same as `pattern-regex`.

This operator filters findings that have _any overlap_ with the supplied regular expression. For example, if you use `pattern-regex` to detect `Foo==1.1.1` and it also detects `Foo-Bar==3.0.8` and `Bar-Foo==3.0.8`, you can use `pattern-not-regex` to filter the unwanted findings.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/8n5Q).
:::

### `focus-metavariable`

The `focus-metavariable` operator puts the focus, or _zooms in_, on the code region matched by a single metavariable or a list of metavariables. For example, to find all functions arguments annotated with the type `bad` you may write the following pattern:

```yaml
pattern: |
  def $FUNC(..., $ARG : bad, ...):
    ...
```

This works but it matches the entire function definition. Sometimes, this is not desirable. If the definition spans hundreds of lines they are all matched. In particular, if you are using [Semgrep Cloud Platform](https://semgrep.dev/login) and you have triaged a finding generated by this pattern, the same finding shows up again as new if you make any change to the definition of the function!

To specify that you are only interested in the code matched by a particular metavariable, in our example `$ARG`, use `focus-metavariable`.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/4kk8).
:::

Note that `focus-metavariable: $ARG` is not the same as `pattern: $ARG`! Using `pattern: $ARG` finds all the uses of the parameter `x` which is not what we want! (Note that `pattern: $ARG` does not match the formal parameter declaration, because in this context `$ARG` only matches expressions.)

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/PPPe).
:::

In short, `focus-metavariable: $X` is not a pattern in itself, it does not perform any matching, it only focuses the matching on the code already bound to `$X` by other patterns. Whereas `pattern: $X` matches `$X` against your code (and in this context, `$X` only matches expressions)!

#### Including multiple focus metavariables using set intersection semantics

Include more `focus-metavariable` keys with different metavariables under the `pattern` to match results **only** for the overlapping region of all the focused code:

```yaml
    patterns:
      - pattern: foo($X, ..., $Y)
      - focus-metavariable:
        - $X
        - $Y
```

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/AqJw).
:::

:::info
To make a list of multiple focus metavariables using set union semantics that matches the metavariables regardless of their position in code, see [Including multiple focus metavariables using set union semantics](/writing-rules/experiments/multiple-focus-metavariables) documentation.
:::

### `metavariable-regex`

The `metavariable-regex` operator searches metavariables for a [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) regular expression. This is useful for filtering results based on a [metavariable’s](pattern-syntax.mdx#metavariables) value. It requires the `metavariable` and `regex` keys and can be combined with other pattern operators.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/Oyrw).
:::

Regex matching is **unanchored**. For anchored matching, use `\A` for start-of-string anchoring and `\Z` for end-of-string anchoring. The next example, using the same expression as above but anchored, finds no matches:

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/ved8).
:::

:::info
Include quotes in your regular expression when using `metavariable-regex` to search string literals. See [this snippet](https://semgrep.dev/s/mschwager:include-quotes) for more details. [String matching](pattern-syntax.mdx#string-matching) functionality can also be used to search string literals.
:::

### `metavariable-pattern`

The `metavariable-pattern` operator matches metavariables with a pattern formula. This is useful for filtering results based on a [metavariable’s](pattern-syntax.mdx#metavariables) value. It requires the `metavariable` key, and exactly one key of `pattern`, `patterns`, `pattern-either`, or `pattern-regex`. This operator can be nested as well as combined with other operators.

For example, the `metavariable-pattern` can be used to filter out matches that do **not** match certain criteria:

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/DwbP).
:::

:::info
In this case it is possible to start a `patterns` AND operation with a `pattern-not`, because there is an implicit `pattern: ...` that matches the content of the metavariable.
:::

The `metavariable-pattern` is also useful in combination with `pattern-either`:

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/Aw88).
:::

:::tip
It is possible to nest `metavariable-pattern` inside `metavariable-pattern`!
:::

:::info
The metavariable should be bound to an expression, a statement, or a list of statements, for this test to be meaningful. A metavariable bound to a list of function arguments, a type, or a pattern, always evaluate to false.
:::

#### `metavariable-pattern` with nested language

If the metavariable's content is a string, then it is possible to use `metavariable-pattern` to match this string as code by specifying the target language via the `language` key. See the following examples of `metavariable-pattern`:

:::note Examples of `metavariable-pattern`
- Match JavaScript code inside HTML in the following [Semgrep Playground](https://semgrep.dev/s/z95k) example.
- Filter regex matches in the following [Semgrep Playground](https://semgrep.dev/s/pkNk) example.
:::

### `metavariable-comparison`

The `metavariable-comparison` operator compares metavariables against a basic [Python comparison](https://docs.python.org/3/reference/expressions.html#comparisons) expression. This is useful for filtering results based on a [metavariable's](/writing-rules/pattern-syntax/#metavariables) numeric value.

The `metavariable-comparison` operator is a mapping which requires the `metavariable` and `comparison` keys. It can be combined with other pattern operators in the following [Semgrep Playground](https://semgrep.dev/s/GWv6) example.

This matches code such as `set_port(80)` or `set_port(443)`, but not `set_port(8080)`.

Comparison expressions support simple arithmetic as well as composition with [boolean operators](https://docs.python.org/3/reference/expressions.html#boolean-operations) to allow for more complex matching. This is particularly useful for checking that metavariables are divisible by particular values, such as enforcing that a particular value is even or odd.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/qq9R).
:::

Building on the previous example, this still matches code such as `set_port(80)` but it no longer matches `set_port(443)` or `set_port(8080)`.

The `comparison` key accepts Python expression using:

- Boolean, string, integer, and float literals.
- Boolean operators `not`, `or`, and `and`.
- Arithmetic operators `+`, `-`, `*`, `/`, and `%`.
- Comparison operators `==`, `!=`, `<`, `<=`, `>`, and `>=`.
- Function `int()` to convert strings into integers.
- Function `str()` to convert numbers into strings.
- Lists, together with the `in`, and `not in` infix operators.
- Function `re.match()` to match a regular expression (without the optional `flags` argument).

You can use Semgrep metavariables such as `$MVAR`, which Semgrep evaluates as follows:

- If `$MVAR` binds to a literal, then that literal is the value assigned to `$MVAR`.
- If `$MVAR` binds to a code variable that is a constant, and constant propagation is enabled (as it is by default), then that constant is the value assigned to `$MVAR`.
- Otherwise the code bound to the `$MVAR` is kept unevaluated, and its string representation can be obtained using the `str()` function, as in `str($MVAR)`. For example, if `$MVAR` binds to the code variable `x`, `str($MVAR)` evaluates to the string literal `"x"`.

#### Legacy `metavariable-comparison` keys

:::info
You can avoid the use of the legacy keys described below (`base: int` and `strip: bool`) by using the `int()` function, as in `int($ARG) > 0o600` or `int($ARG) > 2147483647`.
:::

The `metavariable-comparison` operator also takes optional `base: int` and `strip: bool` keys. These keys set the integer base the metavariable value should be interpreted as and remove quotes from the metavariable value, respectively.

:::note Example of `metavariable-comparison` with `base`
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/R8vN).
:::

This interprets metavariable values found in code as octal. As a result, Semgrep detects `0700`, but it does **not** detect `0400`.

:::note Example of `metavariable-comparison` with `strip`
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/AlqB).
:::

This removes quotes (`'`, `"`, and `` ` ``) from both ends of the metavariable content. As a result, Semgrep detects `"2147483648"`, but it does **not** detect `"2147483646"`. This is useful when you expect strings to contain integer or float data.

### `pattern-not`

The `pattern-not` operator is the opposite of the `pattern` operator. It finds code that does not match its expression. This is useful for eliminating common false positives.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/Q83q).
:::

### `pattern-inside`

The `pattern-inside` operator keeps matched findings that reside within its expression. This is useful for finding code inside other pieces of code like functions or if blocks.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/Z8Dw).
:::

### `pattern-not-inside`

The `pattern-not-inside` operator keeps matched findings that do not reside within its expression. It is the opposite of `pattern-inside`. This is useful for finding code that’s missing a corresponding cleanup action like disconnect, close, or shutdown. It’s also useful for finding problematic code that isn't inside code that mitigates the issue.

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/s/DJ6G).
:::

The above rule looks for files that are opened but never closed, possibly leading to resource exhaustion. It looks for the `open(...)` pattern _and not_ a following `close()` pattern.

The `$F` metavariable ensures that the same variable name is used in the `open` and `close` calls. The ellipsis operator allows for any arguments to be passed to `open` and any sequence of code statements in-between the `open` and `close` calls. The rule ignores how `open` is called or what happens up to a `close` call &mdash; it only needs to make sure `close` is called.

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

## `options`

Enable, disable, or modify the following matching features:

<!-- Options are sorted alphabetically -->

| Option                 | Default | Description                                                            |
| :--------------------- | :------ | :--------------------------------------------------------------------- |
| `ac_matching`          | `true`  | [Matching modulo associativity and commutativity](/writing-rules/pattern-syntax.mdx#associative-and-commutative-operators), treat Boolean AND/OR as associative, and bitwise AND/OR/XOR as both associative and commutative. |
| `attr_expr`            | `true`  | Expression patterns (for example: `f($X)`) matches attributes (for example: `@f(a)`). |
| `commutative_boolop`   | `false` | Treat Boolean AND/OR as commutative even if not semantically accurate. |
| `constant_propagation` | `true`  | [Constant propagation](/writing-rules/pattern-syntax/#constants), including [intra-procedural flow-sensitive constant propagation](/writing-rules/data-flow/constant-propagation/). |
| `generic_comment_style` | none   | In generic mode, assume that comments follow the specified syntax. They are then ignored for matching purposes. Allowed values for comment styles are: <ul><li>`c` for traditional C-style comments (`/* ... */`). </li><li> `cpp` for modern C or C++ comments (`// ...` or `/* ... */`). </li><li> `shell` for shell-style comments (`# ...`). </li></ul> By default, the generic mode does not recognize any comments. Available since Semgrep version 0.96. For more information about generic mode, see [Generic pattern matching](/writing-rules/generic-pattern-matching/) documentation. |
| `generic_ellipsis_max_span` | `10` | In generic mode, this is the maximum number of newlines that an ellipsis operator `...` can match or equivalently, the maximum number of lines covered by the match minus one. The default value is `10` (newlines) for performance reasons. Increase it with caution. Note that the same effect as `20` can be achieved without changing this setting and by writing `... ...` in the pattern instead of `...`. Setting it to `0` is useful with line-oriented languages (for example [INI](https://en.wikipedia.org/wiki/INI_file) or key-value pairs in general) to force a match to not extend to the next line of code. Available since Semgrep 0.96. For more information about generic mode, see [Generic pattern matching](/writing-rules/generic-pattern-matching/) documentation. |
| `taint_assume_safe_functions` | `false` | Experimental option which will be subject to future changes. Used in taint analysis. Assume that function calls do **not** propagate taint from their arguments to their output. Otherwise, Semgrep always assumes that functions may propagate taint. Can replace **not-conflicting** sanitizers added in v0.69.0 in the future. |
| `taint_assume_safe_indexes` | `false` | Used in taint analysis. Assume that an array-access expression is safe even if the index expression is tainted. Otherwise Semgrep assumes that for example: `a[i]` is tainted if `i` is tainted, even if `a` is not. Enabling this option is recommended for high-signal rules, whereas disabling is preferred for audit rules. Currently, it is disabled by default to attain backwards compatibility, but this can change in the near future after some evaluation. |
| `vardef_assign`        | `true`  | Assignment patterns (for example `$X = $E`) match variable declarations (for example `var x = 1;`). |
| `xml_attrs_implicit_ellipsis` | `true` | Any XML/JSX/HTML element patterns have implicit ellipsis for attributes (for example: `<div />` matches `<div foo="1">`. |

The full list of available options can be consulted in the [Semgrep matching engine configuration](https://github.com/returntocorp/semgrep/blob/develop/interfaces/Config_semgrep.atd) module. Note that options not included in the table above are considered experimental, and they may change or be removed without notice.

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

For more information about `fix` and `--autofix` see [Autofix](/writing-rules/autofix) documentation.

## `metadata`

Provide additional information for a rule with the `metadata:` key, such as a related CWE, likelihood, OWASP.

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

The metadata are also displayed in Semgrep’s output if you’re running it with `--json`.
Rules with `category: security` have additional metadata requirements. See [Including fields required by security category](/contributing/contributing-to-semgrep-rules-repository/#including-fields-required-by-security-category) for more information.

## `category`

Provide a category for users of the rule. For example: `best-practice`, `correctness`, `maintainability`. For more information, see [Semgrep registry rule requirements](/contributing/contributing-to-semgrep-rules-repository/#semgrep-registry-rule-requirements).

## `paths`

### Excluding a rule in paths

To ignore a specific rule on specific files, set the `paths:` key with one or more filters. Paths are relative to the root directory of the scanned project.


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

When invoked with `semgrep -f rule.yaml project/`, the above rule runs on files inside `project/`, but no results are returned for:

- any file with a `.jinja2` file extension
- any file whose name ends in `_test.go`, such as `project/backend/server_test.go`
- any file inside `project/tests` or its subdirectories
- any file matching the `project/static/*.js` glob pattern

:::note
The glob syntax is from [Python's `wcmatch`](https://pypi.org/project/wcmatch/) and is used to match against the given file and all its parent directories.
:::

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
        - "tests/**/*.js"
```

When invoked with `semgrep -f rule.yaml project/`, this rule runs on files inside `project/`, but results are returned only for:

- files whose name ends in `_test.go`, such as `project/backend/server_test.go`
- files inside `project/server`, `project/schemata`, or their subdirectories
- files matching the `project/static/*.js` glob pattern
- all files with the `.js` extension, arbitrary depth inside the tests folder

If you are writing tests for your rules, add any test file or directory to the included paths as well.

:::note
When mixing inclusion and exclusion filters, the exclusion ones take precedence.
:::

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

The [full configuration-file format](https://github.com/returntocorp/semgrep-interfaces/blob/main/rule_schema_v1.yaml) is defined as
a [jsonschema](http://json-schema.org/specification.html) object.

<MoreHelp />
