---
slug: pattern-syntax
title: Pattern syntax (Experimental)
hide_title: true
description: Learn how to use Semgrep's experimental pattern syntax to search code for a specific code pattern.
tags:
  - Rules
  - Semgrep Code
---


## Pattern syntax (experimental)

Patterns are the expressions Semgrep uses to match code when it scans for vulnerabilities. This article describes the new syntax for Semgrep pattern operators. See [Pattern syntax](/writing-rules/pattern-syntax) for information on the existing pattern syntax.

There is often a one-to-one translation from the existing syntax to the experimental syntax. These changes are marked with <i class= "fa-solid fa-diamond"></i>. However, some changes are quite different. These changes are marked with <i class="fa-solid fa-exclamation"></i>

:::warning
* These patterns are **experimental** and subject to change.
* You can't mix and match existing pattern syntax with the experimental syntax.
:::

## <i class="fa-solid fa-exclamation"></i> `pattern`

The `pattern` operator looks for code matching its expression in the existing syntax. However, `pattern` is no longer required when using the experimental syntax. For example, you can use `...` wherever `pattern: "...``` appears. For example, you can omit `pattern` and write the following:

```yaml
any:
  - "badthing1"
  - "badthing2"
  - "badthing3"
```

or, for multi-line patterns

```yaml
any:
  - |
      manylines(
        badthinghere($A)
      )
  - |
      orshort()
```

You don't need double quotes for a single-line pattern when omitting the `pattern` key, but note that this can cause YAML parsing issues.

As an example, the following YAML parses:

```yaml
any:
  - "def foo(): ..."
```

This, however, causes problems since `:` is also used to denote a YAML dictionary:

```yaml
any:
  - def foo(): ...
```

### <i class="fa-solid fa-diamond"></i> `any`

Replaces [pattern-either](/writing-rules/rule-syntax/#pattern-either). Matches any of the patterns specified.

```yaml
any:
  - <pat1>
  - <pat2> 
    ...
  - <patn>
```

### <i class="fa-solid fa-diamond"></i> `all`

Replaces [patterns](/writing-rules/rule-syntax/#patterns). Matches all of the patterns specified.

```yaml
all:
  - <pat1>
  - <pat2> 
    ...
  - <patn>
```

### <i class="fa-solid fa-diamond"></i> `inside`

Replaces [pattern-inside](/writing-rules/rule-syntax/#pattern-inside). Match any of the sub-patterns inside of the primary pattern.

```yaml
inside: 
  any: 
    - <pat1> 
    - <pat2>
```

Alternatively:

```yaml
any:
  - inside: <pat1>
  - inside: <pat2>
```

### <i class="fa-solid fa-diamond"></i> `not`

Replaces [pattern-not](/writing-rules/rule-syntax/#pattern-not). Accepts any pattern and does **not** match on those patterns.

```yaml
not:
  any:
    - <pat1>
    - <pat2>
```

Alternatively:

```yaml
all:
  - not: <pat1>
  - not: <pat2>
```

### <i class="fa-solid fa-diamond"></i> `regex`

Replaces [pattern-regex](/writing-rules/rule-syntax/#pattern-regex) Matches based on the regex provided.

```yaml
regex: "(.*)"
```

## Metavariables

Metavariables are an abstraction to match code when you don't know the value or contents beforehand. They're similar to [capture groups](https://regexone.com/lesson/capturing_groups) in regular expressions and can track values across a specific code scope. This
includes variables, functions, arguments, classes, object methods, imports,
exceptions, and more.

Metavariables begin with a `$` and can only contain uppercase characters, `_`, or digits. Names like `$x` or `$some_value` are invalid. Examples of valid metavariables include `$X`, `$WIDGET`, or `$USERS_2`.

### <i class="fa-solid fa-exclamation"></i> `where`

Unlike Semgrep's existing pattern syntax, the following no longer occur under `pattern` or `all`: `metavariable-pattern`, `metavariable-regex`, `metavariable-comparison`, `metavariable-analysis`, and `focus-metavariable`. These must occur within a `where` clause.

A `where` clause is a companion to a pattern. It indicates that Semgrep should match based on the pattern if all the conditions are true.

As an example, take a look at the following example:

```yaml
all:
  - inside: |
      def $FUNC(...):
        ...
  - |
      eval($X)
where:
  - <condition>
```

Because the `where` clause is on the same indentation level as `all`, Semgrep understands that everything under `where` must be paired with the entire `all` pattern. As such, the results of the ranges matched by the `all` pattern are modified by the `where` pattern, and the output includes some final set of ranges that are matched.

### <i class="fa-solid fa-diamond"></i> `metavariable`

Replaces [metavariable-regex](/writing-rules/rule-syntax/#metavariable-regex), [metavariable-pattern](/writing-rules/rule-syntax/#metavariable-pattern), and [metavariable-analysis](/writing-rules/metavariable-analysis/). This operator looks inside the metavariable for a match.

```yaml
...
where:
  - metavariable: $A
    regex: "(.*)
  - metavariable: $B
    patterns: |
      - "foo($C)"
  - metavariable: $D
    analyzer: entropy
```

### <i class="fa-solid fa-diamond"></i> `comparison`

Replaces [metavariable-comparison](/writing-rules/rule-syntax/#metavariable-comparison). Compares metavariables against a basic [Python comparison](https://docs.python.org/3/reference/expressions.html#comparisons) expression. 

```yaml
...
where:
  - comparison: $A == $B
```

### <i class="fa-solid fa-diamond"></i> `focus`

Replaces [focus-metavariable](/writing-rules/rule-syntax/#focus-metavariable). Puts focus on the code region matched by a single metavariable or a list of metavariables.

```yaml
...
where:
  - focus: $A
```

## <i class="fa-solid fa-exclamation"></i> Syntax search mode

New syntax search mode rules must be nested underneath a top-level `match` key. For example:

```yaml
rules:
  - id: find-bad-stuff
    severity: ERROR
    languages: [python]
    message: |
      Don't put bad stuff!
    match:
      any:
        - |
            eval(input())
        - all:
            - inside: |
                def $FUNC(..., $X, ...):
                  ...
            - |
                eval($X)
```

## <i class="fa-solid fa-exclamation"></i> Taint mode

The new syntax supports taint mode, and such roles no longer require `mode: taint` in the rule. Instead, everything must be nested under a top-level `taint` key.

```yaml
rules:
  - id: find-bad-stuff
    severity: ERROR
    languages: [python]
    message: |
      Don't put bad stuff!
    taint:
      sources:
        - input()
      sinks:
        - eval(...)
      propagators:
        - pattern: |
            $X = $Y
          from: $Y
          to: $X
      sanitizers:
        - magiccleanfunction(...)
```

### <i class="fa-solid fa-diamond"></i> Taint mode key names

The key names for the new syntax taint rules are as follows:

- `pattern-sources` --> sources
- `pattern-sinks` --> sinks
- `pattern-propagators` --> propagators
- `pattern-sanitizers` --> sanitizers
