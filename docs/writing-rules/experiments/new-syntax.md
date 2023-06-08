---
append_help_link: true
slug: new-rule-syntax
description: "This document describes Semgrep’s YAML rule syntax including required and optional fields. Just getting started with Semgrep rule writing? Check out the Semgrep Tutorial at https://semgrep.dev/learn"
---

# New rule syntax

Tip: Getting started with rule writing? Try the [Semgrep Tutorial](https://semgrep.dev/learn) 🎓

This document describes Semgrep’s new YAML rule syntax.

## Schema

### Required

All required fields must be present at the top-level of a rule, immediately under the `rules` key.

|     Field     |   Type   | Description |
| :------------ | :------- | :---------- |
| `id`          | `string` | Unique, descriptive identifier, for example: `no-unused-variable`        |
| `message`     | `string` | Message that includes why Semgrep matched this pattern and how to remediate it. See also [Rule messages](/contributing/contributing-to-semgrep-rules-repository/#rule-messages). |
| `severity`    | `string` | One of: `INFO`, `WARNING`, or `ERROR` |
| `languages`   | `array`  | See [language extensions and tags](/writing-rules/rule-syntax/#language-extensions-and-tags) |
| [`match`](#match)_\*_     | `pattern` | Find code matching this pattern |

#### Language extensions and tags

The following table includes languages supported by Semgrep, accepted file extensions for test files that accompany rules, and valid values that Semgrep rules require in the `languages` key.

| Language                            | Extensions                           | `languages` key values                |
|:------------------------------------|:-------------------------------------|:--------------------------------------|
| Apex (only in Semgrep Pro Engine)   | `.cls`                               | `apex`                                | 
| Bash                                | `.bash`, `.sh`                       | `bash`, `sh`                          |
| C                                   | `.c`                                 | `c`                                   |
| Cairo                               | `.cairo`                             | `cairo`                               |
| Clojure                             | `.clj`, `.cljs`, `.cljc`, `.edn`     | `clojure`                             |
| C++                                 | `.cc`, `.cpp`                        | `cpp`, `c++`                          |
| C#                                  | `.cs`                                | `csharp`, `c#`                        |
| Dart                                | `.dart`                              | `dart`                                |
| Dockerfile                          | `.dockerfile`, `.Dockerfile`         | `dockerfile`, `docker`                |
| Elixir                              | `.ex`, `.exs`                        | `ex`, `elixir`                        |
| Generic                             |                                      | `generic`                             |
| Go                                  | `.go`                                | `go`, `golang`                        |
| HTML                                | `.htm`, `.html`                      | `html`                                |
| Java                                | `.java`                              | `java`                                |
| JavaScript                          | `.js`, `.jsx`                        | `js`, `javascript`                    |
| JSON                                | `.json`, `.ipynb`                    | `json`                                |
| Jsonnet                             | `.jsonnet`, `.libsonnet`             | `jsonnet`                             |
| JSX                                 | `.js`, `.jsx`                        | `js`, `javascript`                    |
| Julia                               | `.jl`                                | `julia`                               |
| Kotlin                              |  `.kt`, `.kts`, `.ktm`               | `kt`, `kotlin`                        |
| Lisp                                | `.lisp`, `.cl`, `.el`                | `lisp`                                |
| Lua                                 | `.lua`                               | `lua`                                 |
| OCaml                               | `.ml`, `.mli`                        | `ocaml`                               |
| PHP                                 | `.php`, `.tpl`                       | `php`                                 |
| Python                              | `.py`, `.pyi`                        | `python`, `python2`, `python3`, `py`  |
| R                                   | `.r`, `.R`                           | `r`                                   |
| Ruby                                | `.rb`                                | `ruby`                                |
| Rust                                | `.rs`                                | `rust`                                |
| Scala                               | `.scala`                             | `scala`                               |
| Scheme                              | `.scm`, `.ss`                        | `scheme`                              |
| Solidity                            | `.sol`                               | `solidity`, `sol`                     |
| Swift                               | `.swift`                             | `swift`                               |
| Terraform                           | `.tf`, `.hcl`                        | `tf`, `hcl`, `terraform`              |
| TypeScript                          | `.ts`, `.tsx`                        | `ts`, `typescript`                    |
| TSX                                 | `.ts`, `.tsx`                        | `ts`, `typescript`                    |
| YAML                                | `.yml`, `.yaml`                      | `yaml`                                |
| XML                                 |  `.xml`                              | `xml`                                 |

:::info
To see the maturity level of each supported language, see the following sections in [Supported languages](/supported-languages/) document:
- [Semgrep OSS Engine](/supported-languages/#semgrep-oss-engine)
- [Semgrep Pro Engine](/supported-languages/#semgrep-pro-engine)
:::

### Optional

| Field      | Type     | Description                         |
| :--------- | :------- | :---------------------------------- |
| [`options`](#options)   | `object` | Options object to enable/disable certain matching features |
| [`fix`](#fix)           | `object` | Simple search-and-replace autofix functionality  |
| [`metadata`](#metadata) | `object` | Arbitrary user-provided data; attach data to rules without affecting Semgrep’s behavior |
| [`paths`](#paths)       | `object` | Paths to include or exclude when running this rule |

## Patterns 

There are six core patterns that are key to composing and manipulating searches over a program. These are `pattern`, `any`, `all`, `not`, `regex`, and `inside`.

| Pattern            | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| [`pattern`](#pattern)_\*_     | `string` | Find code matching this expression |
| [`all`](#all)_\*_   | `array`  | Logical AND of multiple patterns |
| [`any`](#any)_\*_ | `array`  | Logical OR of multiple patterns |
| [`regex`](#regex)_\*_   | `string` | Find code matching this [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html)-compatible pattern in multiline mode |
| [`inside`](#-inside)             | `pattern` | Keep findings that lie inside this pattern                                                                              |
| [`not`](#not) | `pattern` | Logical NOT - remove findings matching this pattern |


### `pattern`

The `pattern` operator looks for code matching its expression. This can be basic expressions like `$X == $X` or unwanted function calls like `hashlib.md5(...)`.

<iframe src="https://semgrep.dev/embed/editor?snippet=XY5B" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
Although you _can_ write `pattern`, you don't have to! Anywhere `pattern: <pat>` is valid syntax, omitting the `pattern:` and just writing your pattern string 
`<pat>` is permitted.

<iframe src="https://semgrep.dev/embed/editor?snippet=1A0G" border="0" frameBorder="0" width="100%" height="432"></iframe>
:::

### `all`

The `all` pattern performs a logical AND operation on one or more child patterns. This is useful for chaining multiple patterns together that all must be true. You 
can read it as "match _all_ of these patterns".

<iframe src="https://semgrep.dev/embed/editor?snippet=2BZL" border="0" frameBorder="0" width="100%" height="432"></iframe>

#### `all` pattern evaluation strategy

Note that the order in which the child patterns are declared in an `all` pattern has no effect on the final result. An `all` pattern is always evaluated in the same way:

1. Semgrep evaluates all _positive_ patterns, that is [`inside`](#inside)s, [`pattern`](#pattern)s, [`regex`](#regex)es, [`any`](#any), and [`all`](#patterns)s. Each range matched by each one of these patterns is intersected with the ranges matched by the other patterns. The result is a set of _positive_ ranges. The positive ranges carry _metavariable bindings_. For example, in one range `$X` can be bound to the function call `foo()`, and in another range `$X` can be bound to the expression `a + b`.
2. Semgrep evaluates all _negative_ patterns, that is any [`not`](#not) pattern. This gives a set of _negative ranges_ which are used to filter the positive ranges. This results in a strict subset of the positive ranges computed in the previous step.
3. Semgrep evaluates all [`metavariable`](#metavariable) conditions. These conditional patterns can only examine the metavariables bound in the positive ranges in step 1, that passed through the filter of negative patterns in step 2. Note that metavariables bound by negative patterns are _not_ available here.
4. Semgrep applies all [`focus`](#focus)es, by computing the intersection of each positive range with the range of the metavariable on which we want to focus. Again, the only metavariables available to focus on are those bound by positive patterns.

<!-- TODO: Add example to illustrate all of the above -->

### `any`

The `any` pattern performs a logical OR operation on one or more child patterns. This is useful for chaining multiple patterns together where any may be true. You
can read it as "match _any_ of these patterns".

<iframe src="https://semgrep.dev/embed/editor?snippet=NGby" border="0" frameBorder="0" width="100%" height="432"></iframe>

This rule looks for usage of the Python standard library functions `hashlib.md5` or `hashlib.sha1`. Depending on their usage, these hashing functions are [considered insecure](https://shattered.io/).

### `regex`

The `regex` pattern searches files for substrings matching the given [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) pattern. This is useful for migrating existing regular expression code search functionality to Semgrep. PCRE "Perl-Compatible Regular Expressions" is a full-featured regex library that is widely compatible with Perl of course, but also with the respective regex libraries of Python, JavaScript, Go, Ruby, and Java. Patterns are compiled in multiline mode, i.e. `^` and `$` matches at the beginning and end of lines respectively in addition to the beginning and end of input (since Semgrep 0.95.0).

⚠️ PCRE supports only a [limited number of Unicode character properties](https://www.pcre.org/original/doc/html/pcrepattern.html#uniextseq). For example, `\p{Egyptian_Hieroglyphs}` is supported but `\p{Bidi_Control}` isn't.

The `regex` pattern can be combined with other patterns:

<iframe src="https://semgrep.dev/embed/editor?snippet=kExP" border="0" frameBorder="0" width="100%" height="432"></iframe>

It can also be used as a standalone, top-level pattern (though still under a `match` key):

<iframe src="https://semgrep.dev/embed/editor?snippet=wEdA" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
Single (`'`) and double (`"`) quotes [behave differently](https://docs.octoprint.org/en/master/configuration/yaml.html#scalars) in YAML syntax. Single quotes are typically preferred when using backslashes (`\`) with `regex`.
:::

Note that if the regex uses groups, the metavariables such as `$1`, `$2`, and so on, are bound to the content of the captured group.

<iframe src="https://semgrep.dev/embed/editor?snippet=xE8L" border="0" frameBorder="0" width="100%" height="432"></iframe>

### `not`

The `not` pattern is the opposite of `pattern`. It finds code that does not match its expression. This is useful for eliminating common false positives.

<iframe src="https://semgrep.dev/embed/editor?snippet=ORrL" border="0" frameBorder="0" width="100%" height="432"></iframe>

### `inside`

The `inside` pattern keeps matched findings that reside within its expression. This is useful for finding code inside other pieces of code like functions or if blocks.

<iframe src="https://semgrep.dev/embed/editor?snippet=vE8Y" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
A common use case for `inside` is in conjunction with `not`, to only keep findings
which do not reside within some expression. This is useful for finding code that’s missing a corresponding cleanup action like disconnect, close, or shutdown. It’s also useful for finding problematic code that isn't inside code that mitigates the issue.

<iframe src="https://semgrep.dev/embed/editor?snippet=db8E" border="0" frameBorder="0" width="100%" height="432"></iframe>

The above rule looks for files that are opened but never closed, possibly leading to resource exhaustion. It looks for the `open(...)` pattern _and not_ a following `close()` pattern.

The `$F` metavariable ensures that the same variable name is used in the `open` and `close` calls. The ellipsis operator allows for any arguments to be passed to `open` and any sequence of code statements in-between the `open` and `close` calls. The rule ignores how `open` is called or what happens up to a `close` call &mdash; it only needs to make sure `close` is called.
:::

<!--
### `pattern-not-regex`

The `pattern-not-regex` operator filters results using a [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) regular expression in multiline mode. This is most useful when combined with regular-expression only rules, providing an easy way to filter findings without having to use negative lookaheads. `pattern-not-regex` works with regular `pattern` clauses, too.

The syntax for this operator is the same as `pattern-regex`.

This operator filters findings that have _any overlap_ with the supplied regular expression. For example, if you use `pattern-regex` to detect `Foo==1.1.1` and it also detects `Foo-Bar==3.0.8` and `Bar-Foo==3.0.8`, you can use `pattern-not-regex` to filter the unwanted findings.

<iframe src="https://semgrep.dev/embed/editor?snippet=8n5Q" border="0" frameBorder="0" width="100%" height="432"></iframe>
-->

## Pattern Modifiers

In addition to the six core patterns, there are a couple of _modifiers_ that act upon the ranges defined by existing patterns. They serve to either filter those ranges out, or refine them to a more specific sub-section. 

The below optional modifier smust reside underneath a `where` clause.

| Modifiers            | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| [`metavariable`](#metavariable-filters)         | `string` | Filter range based on condition for metavariable. Must be accompanied by a filter. 
| [`focus`](#focus)         | `string` | Specify range to be instead that of a metavariable within it. 

### Where Clauses

Due to the way that modifiers act upon ranges, rather than defining ranges themselves, they are syntactically separated from patterns. Instead, they are located in "`where` clauses", which are located physically adjacent to a pattern.

For instance, take the following pattern:
```
pattern: "foo"
```

A `where` clause can be defined by placing a `where` key on the same indentation level as the pattern, and specifying a list of modifiers after it.

```
pattern: foo($X)
where:
  - focus: $X
```

:::info
This applies for any kind of pattern! So you could also write:
```
all:
  - any:
      - foo($X)
      - bar($X)
    where:
      - focus: $X
  - inside: |
      def $FUNC(...):
        ...
```
for the pattern which contains a sub-pattern, the `any`, which is modified by
the `where` clause.
:::

### `focus`

The `focus` modifier puts the focus, or _zooms in_, on the code region matched by a single metavariable or a list of metavariables. For example, to find all functions arguments annotated with the type `bad` you may write the following pattern:

```yaml
pattern: |
  def $FUNC(..., $ARG : bad, ...):
    ...
```

This works but it matches the entire function definition. Sometimes, this is not desirable. If the definition spans hundreds of lines they are all matched. In particular, if you are using [Semgrep App](https://semgrep.dev/login) and you have triaged a finding generated by this pattern, the same finding shows up again as new if you make any change to the definition of the function!

To specify that you are only interested in the code matched by a particular metavariable, in our example `$ARG`, use `focus`.

<iframe src="https://semgrep.dev/embed/editor?snippet=Zoqw" border="0" frameBorder="0" width="100%" height="432"></iframe>

Note that `focus: $ARG` is not the same as `pattern: $ARG`! Using `pattern: $ARG` finds all the uses of the parameter `x` which is not what we want! (Note that `pattern: $ARG` does not match the formal parameter declaration, because in this context `$ARG` only matches expressions.)

<iframe src="https://semgrep.dev/embed/editor?snippet=EbwN" border="0" frameBorder="0" width="100%" height="432"></iframe>

In short, `focus: $X` is not a pattern in itself, it does not perform any matching, it only focuses the matching on the code already bound to `$X` by other patterns. Whereas `pattern: $X` matches `$X` against your code (and in this context, `$X` only matches expressions)!

#### Including multiple `focus` metavariables using set intersection semantics

Include more `focus` keys with different metavariables under the `pattern` to match results **only** for the overlapping region of all the focused code:

```yaml
    pattern: foo($X, ..., $Y)
    where:
      - focus: $X
      - focus: $Y
```

See the following example:
<iframe src="https://semgrep.dev/embed/editor?snippet=7qK2" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
To make a list of multiple `focus` metavariables using set union semantics that matches the metavariables regardless of their position in code, see [Including multiple focus metavariables using set union semantics](/writing-rules/experiments/multiple-focus-metavariables) documentation.
:::

### `metavariable` Filters 

The `metavariable` key denotes several possibilities of filters which can be placed upon a range, depending on if a condition holds of a metavariable within it. These conditions must all be paired with a key denoting the metavariable that it is supposed to hold of.

#### Metavariable `regex` Filter:

The `regex` filter searches metavariables for a [PCRE](https://www.pcre.org/original/doc/html/pcrepattern.html) regular expression. This is useful for filtering results based on a [metavariable’s](pattern-syntax.mdx#metavariables) value. It requires the `metavariable` and `regex` keys and can be combined with other patterns.

<iframe src="https://semgrep.dev/embed/editor?snippet=gwx0"  border="0" frameBorder="0" width="100%" height="432"></iframe>

Regex matching is **unanchored**. For anchored matching, use `\A` for start-of-string anchoring and `\Z` for end-of-string anchoring. The next example, using the same expression as above but anchored, finds no matches:

<iframe src="https://semgrep.dev/embed/editor?snippet=QBrZ"  border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
Include quotes in your regular expression when using the `regex` filter to search string literals. See [this snippet](https://semgrep.dev/s/mschwager:include-quotes) for more details. [String matching](pattern-syntax.mdx#string-matching) functionality can also be used to search string literals.
:::

### Metavariable Pattern Filter 

You can also match a metavariable with an arbitrary pattern formula. This is useful for filtering results based on a [metavariable’s](pattern-syntax.mdx#metavariables) value. It requires the `metavariable` key, and exactly one key of `pattern`, `all`, `any`, or `regex`. This filter can be nested as well as combined with other filters and patterns.

For example, it can be used to filter out matches that do _not_ match certain criteria:

<iframe src="https://semgrep.dev/embed/editor?snippet=3DqK" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
In this case it is possible to start an `all` AND operation with a `not`, because there is an implicit `pattern: ...` that matches the content of the metavariable.
:::

It is also useful in combination with `any`:

<iframe src="https://semgrep.dev/embed/editor?snippet=4Wb5" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::tip
It is possible to nest a pattern filter inside a pattern filter!
:::

:::info
The metavariable should be bound to an expression, a statement, or a list of statements, for this test to be meaningful. A metavariable bound to a list of function arguments, a type, or a pattern, always evaluate to false.
:::

#### Metavariable pattern filters with nested language

If the metavariable's content is a string, then it is possible to use a pattern filter to match this string as code by specifying the target language via the `language` key.

For example, we can match JavaScript code inside HTML:

<iframe src="https://semgrep.dev/embed/editor?snippet=PAez" border="0" frameBorder="0" width="100%" height="432"></iframe>

We can also use this feature to filter regex matches:

<iframe src="https://semgrep.dev/embed/editor?snippet=J4Dy" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Metavariable Comparison Filters 

The `comparison` filter compares metavariables against a basic [Python comparison](https://docs.python.org/3/reference/expressions.html#comparisons) expression. This is useful for filtering results based on a [metavariable's](../writing-rules/pattern-syntax.mdx#metavariables) numeric value.

The `comparison` filter is a mapping which requires only a `comparison` key -- you don't need to specify the `metavaraible`. It can be combined with other patterns:

<iframe src="https://semgrep.dev/embed/editor?snippet=50r0" border="0" frameBorder="0" width="100%" height="432"></iframe>

This matches code such as `set_port(80)` or `set_port(443)`, but not `set_port(8080)`.

Comparison expressions support simple arithmetic as well as composition with [boolean operators](https://docs.python.org/3/reference/expressions.html#boolean-operations) to allow for more complex matching. This is particularly useful for checking that metavariables are divisible by particular values, such as enforcing that a particular value is even or odd:

<iframe src="https://semgrep.dev/embed/editor?snippet=Gkdq" border="0" frameBorder="0" width="100%" height="432"></iframe>

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
- Otherwise the code bound to the `$MVAR` is kept unevvaluated, and its string representation can be obtainer using the `str()` function, as in `str($MVAR)`. For example, if `$MVAR` binds to the code variable `x`, `str($MVAR)` evaluates to the string literal `"x"`.

#### Legacy `comparison` keys

:::info
You can avoid the use of the legacy keys described below (`base: int` and `strip: bool`) by using the `int()` function, as in `int($ARG) > 0o600` or `int($ARG) > 2147483647`.
:::

The `comparison` filter also takes optional `base: int` and `strip: bool` keys. These keys set the integer base the metavariable value should be interpreted as and remove quotes from the metavariable value, respectively.

For example, `base`:

<iframe src="https://semgrep.dev/embed/editor?snippet=RDeq" border="0" frameBorder="0" width="100%" height="432"></iframe>

This interprets metavariable values found in code as octal. As a result, Semgrep detects `0700`, but it does **not** detect `0400`.

For example, `strip`:

<!-- TODO PORT THIS -->
<iframe src="https://semgrep.dev/embed/editor?snippet=AlqB" border="0" frameBorder="0" width="100%" height="432"></iframe>

This removes quotes (`'`, `"`, and `` ` ``) from both ends of the metavariable content. As a result, Semgrep detects `"2147483648"`, but it does **not** detect `"2147483646"`. This is useful when you expect strings to contain integer or float data.

<!--
### `pattern-where-python`

:::danger
This feature was deprecated in Semgrep v0.61.0.
:::

The `pattern-where-python` is the most flexible operator. It allows for writing custom Python logic to filter findings. This is useful when none of the other operators provide the functionality needed to create a rule.

:::danger
Use caution with this operator. It allows for arbitrary Python code execution.

As a defensive measure, the `--dangerously-allow-arbitrary-code-execution-from-rules` flag must be passed to use rules containing `pattern-where-python`.
:::

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

-->

## Metavariable matching

Metavariable matching operates differently for logical AND (`all`) and logical OR (`any`) parent patterns. Behavior is consistent across all child patterns: `pattern`, `not`, `regex`, and `inside`.

### Metavariables in logical ANDs

Metavariable values must be identical across sub-patterns when performing logical AND operations with the `all` pattern.

Example:

```yaml
rules:
  - id: function-args-to-open
    match:
      all:
        - inside: |
            def $F($X):
                ...
        - open($X)
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

Metavariable matching does not affect the matching of logical OR operations with the `any` pattern.

Example:

```yaml
rules:
  - id: insecure-function-call
    match:
      any:
        - insecure_func1($X)
        - insecure_func2($X)
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
all:
  - inside: |
      def $F($X):
        ...
  - any:
      - bar($X)
      - baz($X)
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
| `ac_matching`          | `true`  | [Matching modulo associativity and commutativity](./pattern-syntax.mdx#associative-and-commutative-operators), treat Boolean AND/OR as associative, and bitwise AND/OR/XOR as both associative and commutative. |
| `attr_expr`            | `true`  | Expression patterns (for example: `f($X)`) matches attributes (for example: `@f(a)`). |
| `commutative_boolop`   | `false` | Treat Boolean AND/OR as commutative even if not semantically accurate. |
| `constant_propagation` | `true`  | [Constant propagation](./pattern-syntax.mdx#constants), including [intra-procedural flow-sensitive constant propagation](../data-flow/constant-propagation/). |
| `generic_comment_style` | none   | In generic mode, assume that comments follow the specified syntax. They are then ignored for matching purposes. Allowed values for comment styles are: <ul><li>`c` for traditional C-style comments (`/* ... */`). </li><li> `cpp` for modern C or C++ comments (`// ...` or `/* ... */`). </li><li> `shell` for shell-style comments (`# ...`). </li></ul> By default, the generic mode does not recognize any comments. Available since Semgrep version 0.96. For more information about generic mode, see [Generic pattern matching](/writing-rules/generic-pattern-matching/) documentation. |
| `generic_ellipsis_max_span` | `10` | In generic mode, this is the maximum number of newlines that an ellipsis operator `...` can match or equivalently, the maximum number of lines covered by the match minus one. The default value is `10` (newlines) for performance reasons. Increase it with caution. Note that the same effect as `20` can be achieved without changing this setting and by writing `... ...` in the pattern instead of `...`. Setting it to `0` is useful with line-oriented languages (for example [INI](https://en.wikipedia.org/wiki/INI_file) or key-value pairs in general) to force a match to not extend to the next line of code. Available since Semgrep 0.96. For more information about generic mode, see [Generic pattern matching](/writing-rules/generic-pattern-matching/) documentation. |
| `taint_assume_safe_functions` | `false` | Experimental option which will be subject to future changes. Used in taint analysis. Assume that function calls do **not** propagate taint from their arguments to their output. Otherwise, Semgrep always assumes that functions may propagate taint. Can replace **not-conflicting** sanitizers added in v0.69.0 in the future. |
| `taint_assume_safe_indexes` | `false` | Used in taint analysis. Assume that an array-access expression is safe even if the index expression is tainted. Otherwise Semgrep assumes that for example: `a[i]` is tainted if `i` is tainted, even if `a` is not. Enabling this option is recommended for high-signal rules, whereas disabling is preferred for audit rules. Currently, it is disabled by default to attain backwards compatibility, but this can change in the near future after some evaluation. |
| `vardef_assign`        | `true`  | Assignment patterns (for example `$X = $E`) match variable declarations (for example `var x = 1;`). |
| `xml_attrs_implicit_ellipsis` | `true` | Any XML/JSX/HTML element patterns have implicit ellipsis for attributes (for example: `<div />` matches `<div foo="1">`. |

The full list of available options can be consulted [here](https://github.com/returntocorp/semgrep/blob/develop/interfaces/Config_semgrep.atd). Note that options not included in the table above are considered experimental, and they may change or be removed without notice.

## `fix`

The `fix` top-level key allows for simple autofixing of a pattern by suggesting an autofix for each match. Run `semgrep` with `--autofix` to apply the changes to the files.

Example:

```yaml
rules:
  - id: use-dict-get
    match: $DICT[$KEY]
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
    match:
      all:
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

To ignore a specific rule on specific files, set the `paths:` key with one or more filters.

Example:

```yaml
rules:
  - id: eqeq-is-bad
    match: $X == $X
    paths:
      exclude:
        - "*.jinja2"
        - "*_test.go"
        - "project/tests"
        - project/static/*.js
```

When invoked with `semgrep -f rule.yaml project/`, the above rule runes on files inside `project/`, but no results are returned for:

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
    match: $X == $X
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
    match:
      all:
      - not: 
          inside:
            any: 
              - | 
                def __eq__(...):
                    ...
              - assert(...)
              - assertTrue(...)
              - assertFalse(...)
      - any:
          - $X == $X
          - $X != $X
          - all:
              - inside: |
                  def __init__(...):
                       ...
              - self.$X == self.$X
      - not: 1 == 1
    message: "useless comparison operation `$X == $X` or `$X != $X`"
```

The above rule makes use of many patterns. It uses `any`, `all`, `pattern`, and `inside` to carefully consider different cases, and uses `not` to whitelist certain useless comparisons.

## Full specification

The [full configuration-file format](https://github.com/returntocorp/semgrep-interfaces/blob/main/rule_schema_v1.yaml) is defined as
a [jsonschema](http://json-schema.org/specification.html) object.

Find what you needed in this doc? Join the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack group</a> to ask the maintainers and the community if you need help.