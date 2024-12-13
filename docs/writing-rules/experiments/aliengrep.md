---
slug: aliengrep
append_help_link: true
description: "Aliengrep is a variant of the generic mode that is more configurable than spacegrep."
title: Aliengrep
hide_title: true
---



# Aliengrep

:::caution
This is an experimental matching mode for Semgrep Community Edition (CE). Many of the features described in this document are subject to change. Your feedback is important and helps us, the Semgrep team, to make desirable adjustments. You can file an issue in our [Semgrep CE GitHub repository](https://github.com/semgrep/semgrep/issues) or ask us anything in <a href="https://go.semgrep.dev/slack">Semgrep Community Slack group</a>.
:::

Aliengrep is an alternative to the [generic pattern-matching engine](/writing-rules/generic-pattern-matching) for analyzing files written in any language. The pattern syntax resembles the usual Semgrep pattern syntax. This document provides a reference to the syntactic features that Aliengrep supports.

## Minimal example

Specify that a rule uses the Aliengrep engine by setting `options.generic_engine: aliengrep`. See the Semgrep rule example below:

```yaml
rules:
- id: example
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
  message: "found the word 'hello'"
  pattern: "hello"
```

:::note
We are considering a dedicated field `analyzer: aliengrep` instead of `options.generic_engine: aliengrep`.
:::

## Pattern syntax

The following sections provide descriptions and examples of operators that Aliengrep uses in YAML rule files.

### Whitespace

The whitespace between lexical elements is ignored. By default, whitespace includes spaces, tabs, and newlines. The single-line mode restricts whitespace to only spaces and tabs (see [Single-line mode](#single-line-mode) section below).

Lexical elements in target input are:

* words (configurable)
* brace pairs (configurable)
* single non-word characters

### Metavariables

A metavariable captures a single word in the target input. By default, the set of word characters is `[A-Za-z_0-9]`. The pattern `$THING` matches a whole word such as `hello` or `world` if the target input is `hello, world.`.

```yaml
rules:
- id: example
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
  message: "found a word"
  pattern: "$THING"
```

Repeating a metavariable (back-reference) requires a match of the same sequence that was matched by the first occurrence of the metavariable. For example, the pattern `$A ... $A` matches `a x y a`, assigning `a` to the metavariable `A`. It does not match `a x b`.

### Ellipsis (`...`)

In Semgrep rule syntax, an ellipsis is a specific pattern written as three dots `...`. Ellipsis matches a sequence of any lexical elements. Matching ellipses is lazy or shortest-match-first. For example, the pattern `a ... b` matches `a x b` rather than `a x b b` if the target input is `a x b b c`.

Ellipses at the beginning or at the end of a pattern are anchored. For example, ellipses must match the beginning or the end of the target input, respectively. For example, `...` alone matches the whole input and `a ...` matches the whole input starting from the first occurrence of the word `a`.

### Ellipsis metavariable (capturing ellipsis)

An ellipsis metavariable `$...X` matches the same contents as an ordinary ellipsis `...` but additionally captures the contents and assigns them to the metavariable `X`.

Repeating a metavariable ellipsis such as in `$...A, $...A` requires the same contents to be matched by each repetition, including the same whitespace. This is an unfortunate limitation of the implementation. For example, `$...A, $...A` matches `1 2, 1 2` and `1   2, 1   2` but it doesn't match `1 2, 1   2`.

### Single-line mode

Se the single-line mode with `options.generic_multiline: false` in rule files:

```yaml
rules:
- id: single-line-example
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_multiline: false
  message: "found a password field"
  pattern: "password: ..."
```

Now instead of matching everything until the end of the target input file, the pattern `password: ...` stops the match at the end of the line. In single-line mode, a regular ellipsis `...` or its named variant `$...X` cannot span multiple lines.

Another feature of the single-line mode is that newlines in rule patterns must match literally. For example, the following YAML rule contains a two-line pattern:

```yaml
rules:
- id: single-line-example2
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_multiline: false
  message: "found a password field"
  pattern: "a\nb"
```

The pattern `"a\nb"` in the YAML rule file matches the following code:

```
x a
b x
```

The pattern does not match if there is another number of newlines between `a` and `b`. The single-line mode does not match the following target input:

```
x a b x
```

It does however match in the default multiline mode of Aliengrep.

:::caution
YAML syntax makes it easy to introduce significant newline characters in patterns without realizing it. When in doubt and for better clarity, use the quoted string syntax `"a\nb"` as we did in the preceding example. This ensures no trailing newline is added accidentally when using the single-line mode.
:::

### Long ellipsis (`....`)

A long ellipsis (written as four dots, `....`) and its capturing variant `$....X` matches a sequence of any lexical elements even in single-line mode. It's useful for skipping any number of lines in single-line mode.

In multiline mode, a regular ellipsis (three dots `...`) has the same behavior as a long ellipsis (four dots `....`).

:::note
We wonder if the visual difference between `...` and `....` is too subtle. Let us know if you have ideas for a better syntax than four dots `....`.
:::

### Additional word characters captured by metavariables

In the generic modes, a metavariable captures a word. The default pattern followed by a word is `[A-Za-z_0-9]+` (a sequence of one or more alphanumeric characters or underscores). The set of characters that comprise a word can be configured as an option in the Semgrep rule as follows:

```yaml
rules:
- id: custom-word-chars
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_extra_word_characters: ["+", "/", "="]
  message: "found something"
  pattern: "data = $DATA;"
```

The preceding example allows matching Base64-encoded data such as in the following target input:

```
data = bGlnaHQgd29yaw==;
```

There's currently no option to remove word characters from the default
set.

### Custom brackets

The Aliengrep engine performs brace matching as expected in English text. The default brace pairs are parentheses (`()`), square brackets (`[]`), and curly braces (`{}`). In single-line mode, ASCII single quotes and double quotes are also treated like brace pairs by default. The following rule demonstrates the addition of `<>` as an extra pair of braces by specifying `options.generic_extra_braces`:

```yaml
rules:
- id: edgy-brackets
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_extra_braces: [["<", ">"]]
  message: "found something"
  pattern: "x ... x"
```

This pattern matches the `x <x> x` in the following target input:
```
a x <x> x a
```

Without declaring `<>` as braces, the rule would match only `x <x`.

The set of brace pairs can be completely replaced by using the field `options.generic_braces` as follows:

```yaml
rules:
- id: edgy-brackets-only
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_braces: [["<", ">"]]
  message: "found something"
  pattern: "x ... x"
```

### Case-insensitive matching

Some languages are case-insensitive according to Unicode rules (UTF-8 encoding). To deal with this, Aliengrep offers an option for case-insensitive matching `options.generic_caseless: true`.

```yaml
rules:
- id: caseless
  severity: WARNING
  languages: [generic]
  options:
    generic_engine: aliengrep
    generic_multiline: false
    generic_caseless: true
  message: "found something"
  pattern: "Content-Type: $...CT"
```

This rule matches `Content-Type: text/html` but also `content-type: text/html` or `CONTENT-TyPe: text/HTML` among all the possible variants.

:::caution
Back-referencing a metavariable requires an exact repeat of the text captured by the metavariable, even in caseless mode. For example, `$X $X` matches `ab ab` and `AB AB` but not `ab AB`.
:::
