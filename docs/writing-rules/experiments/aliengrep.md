---
slug: aliengrep
append_help_link: true
description: "Aliengrep is a variant of the generic mode that is more
configurable than spacegrep."
---

:::caution
This is an experimental matching mode for Semgrep.
Many of the features described here are subject to change.
Your feedback is important and will help us make desirable adjustments.
:::

Aliengrep [TODO: suggest a more evocative name] is an alternative generic
pattern-matching engine for analyzing files written in any
language. The pattern syntax resembles the usual Semgrep pattern
syntax. Here, we give a reference of the features supported by
Aliengrep.

## Minimal example

Selecting the aliengrep engine is done by setting
`options.generic_engine: aliengrep` [TODO: use a dedicated field
`analyzer: aliengrep`?].

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

## Pattern syntax

### Whitespace

Whitespace between lexical elements is ignored. By default, whitespace
includes spaces, tabs, and newlines. The single-line mode restricts
whitespace to only spaces and tabs (see later section).

Lexical elements in target input are:

* words (configurable)
* brace pairs (configurable)
* single non-word characters

### Metavariables

A metavariable captures a single word in the target input. By default,
the set of word characters is `[A-Za-z_0-9]`. The pattern `$THING`
matches a whole word such as `hello` or `world` if the input is
`hello, world.`.

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

Repeating a metavariable (back-reference) requires a match of the same
sequence that was matched by the first occurrence of the metavariable.
For example, the pattern `$A ... $A` matches `a x y a`, assigning `a`
to the metavariable `A`. It does not match `a x b`.

### Ellipsis

An ellipsis is a pattern written `...` that matches a sequence of any
lexical elements. Matching ellipses is lazy or shortest-match-first
i.e. the pattern `a ... b` will match `a x b` rather than `a x b b` if
the target input is `a x b b c`.

Ellipses at the beginning or at the end of a pattern are anchored
i.e. they must match the beginning or the end of input, respectively.
For example, `...` alone matches the whole input and `a ...` matches
the whole input starting from the first occurrence of the word `a`.

### Capturing ellipsis (metavariable-ellipsis)

[TODO: use the same term as elsewhere to refer to this syntax]

A capturing ellipsis `$...X` matches the same contents as an ordinary
ellipsis `...` but additionally captures the contents and assigns it
to the metavariable `X`.

Repeating a capturing ellipsis such as in `$...A, $...A` requires the same
exact contents to be matched, including the same whitespace. This is
an unfortunate limitation of the implementation. For example,
`$...A, $...A` matches `1 2, 1 2` and `1   2, 1   2`
but unfortunately doesn't match `1 2, 1   2`.

### Single-line mode

The single-line mode is set with `options.generic_multiline: false`:

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

Now instead of matching everything until the end of the input file,
the pattern `password: ...` will stop the match at the end of the
line. In single-line mode, a regular ellipsis `...` or its named
variant `$...X` cannot span multiple lines.

Another feature of the single-line mode it that newlines occurring in
patterns must match literally. For example, the following YAML rule
contains a two-line pattern:

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

The YAML/JSON pattern `"a\nb"` will match the following input:

```
x a
b x
```

It will not match if there's a wrong number of newlines between `a`
and `b`. The following input won't match in single-line mode:

```
x a b x
```

It does however match in the default, multiline mode.

:::caution
YAML syntax makes it easy to introduce significant newline characters
in patterns without realizing it. In doubt and for better clarity, use
the quoted string syntax `"a\nb"` like we did above. This ensures no
trailing newline is added accidentally when using the single-line mode.
:::

### Long ellipsis (`....`)

[TODO: ideas for a better syntax?]

A long ellipsis `....` and its capturing variant `$....X` will match a
sequence of any lexical elements even in single-line mode. It's useful
for skipping any number of lines in single-line mode.

In multiline mode, a regular ellipsis has the same behavior as a
long ellipsis.

### Additional word characters captured my metavariables

In the generic modes, a metavariable captures a word. The default
pattern followed by a word is `[A-Za-z_0-9]+` (a sequence of one of more
alphanumeric characters or underscores). The set of characters that
make up a word can be configured as an option in the Semgrep rule as follows:

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

The example above allows matching Base64-encoded data such as in the
following input:
```
data = bGlnaHQgd29yaw==;
```

There's currently no option to remove word characters from the default
set.

### Custom brackets

The aliengrep engine performs brace matching as expected in English
text. The default brace pairs are parentheses (`()`), square brackets
(`[]`), and curly braces (`{}`). In single-line mode, ASCII single
quotes and double quotes are also treated like brace pairs by default.
The following rule demonstrates the addition of `<>` as an extra pair
of braces by specifying `options.generic_extra_braces`:

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

This will match the `x <x> x` in the following target:
```
a x <x> x a
```

Without declaring `<>` as braces, the rule would match only `x <x`.

The set of brace pairs can be completely replaced by using the field
`options.generic_braces` as follows:

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

### Caseless matching

Some languages are case-insensitive according to Unicode rules (UTF-8
encoding).
To deal with this, aliengrep offers an option for case-insensitive matching
`options.generic_caseless: true`.

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

This rule will match on `Content-Type: text/html` but also on
`content-type: text/html` or `CONTENT-TyPe: text/HTML` among all the
possible variants.

:::caution
Back-referencing a metavariable requires an exact repeat of the text
captured by the metavariable, even in caseless mode.
For example, `$X $X` will match `ab ab` and `AB AB` but
not `ab AB`.
:::
