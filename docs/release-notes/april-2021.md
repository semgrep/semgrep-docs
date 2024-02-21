---
slug: april-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# April 2021

## Version 0.49.0

### Additions

- Support for matching multiple arguments with a metavariable ([#3009](https://github.com/semgrep/semgrep/issues/3009)). This is done with a "spread metavariable" operator that looks like $...ARGS. This used to be available only for JavaScript and TypeScript, and is now available for the other languages (Python, Java, Go, C, Ruby, PHP, and OCaml).
- A new --optimizations [STR] command-line flag to turn on or off some optimizations. Use "none" to turn off everything and "all" to turn on everything. Just using `--optimizations` is equivalent to `--optimizations` all, and not using `--optimizations` is equivalent to `--optimizations` none.
- JavaScript/TypeScript: Support `...` inside JSX text to match any text, as in `<a href="foo">...</a>`. ([#2963](https://github.com/semgrep/semgrep/issues/2963))
- JavaScript/TypeScript: Support metavariables for JSX attribute values, as in `<a href=$X>some text</a>`. ([#2964](https://github.com/semgrep/semgrep/issues/2964))

### Fixes

- Python: correctly parsing fstring with multiple colons
- Ruby: better matching for interpolated strings ([#2826](https://github.com/semgrep/semgrep/issues/2826) and[#2949](https://github.com/semgrep/semgrep/issues/2949))
- Ruby: correctly matching numbers

### Changes

- Add required executionSuccessful attribute to SARIF output ([#2983](https://github.com/semgrep/semgrep/pull/2983)). Thanks to[Simon Engledew](https://github.com/simon-engledew)!
- Remove jsx and tsx from languages, instead just use javascript or typescript ([#3000](https://github.com/semgrep/semgrep/pull/3000))
- Add limit max characters in the output line (#2958) and add a flag to control maximum characters (defaults to 160). Thanks to[Ankush Menat](https://github.com/ankush)!

## Version 0.48.0

### Additions

- Taint mode: Basic cross-function analysis ([#2913](https://github.com/semgrep/semgrep/pull/2913))
- Support for the new Java record extension and Java symbols with accented characters ([#2704](https://github.com/semgrep/semgrep/issues/2704))

### Fixes

- Capturing functions when used as both expressions and statements in JavaScript ([#1007](https://github.com/semgrep/semgrep/issues/1007))
- Literal for ocaml tree sitter ([#2885](https://github.com/semgrep/semgrep/issues/2885))

### Changes

- The extra lines data is now consistent across scan types (e.g., semgrep-core, spacegrep, pattern-regex)

## Version 0.47.0

### Additions

- Java: support of for(...)
- Rust: Semgrep patterns now support top-level statements ([#2910](https://github.com/semgrep/semgrep/pull/2910))
- Support for UTF-8 code with non-ASCII chars ([#2944](https://github.com/semgrep/semgrep/pull/2944))

### Fixes

- Single field pattern in JSON, allowing $FLD: { ... } pattern
- Config detection in files with many suffix delimiters, like this.that.check.yaml. More concretely: configs end with .yaml, YAML language tests end with .test.yaml, and everything else is handled by its respective language extension (e.g., .py).
- Single array field in YAML in a pattern is parsed as a field, not a one element array

## Version 0.46.0

### Additions

- YAML language support to --test

### Fixes

- SARIF output now nests invocations inside runs
- Go backslashed carets in regexes can be parsed

### Changes

- Deep expression matches (<... foo ...>) now match within the bodies of anonymous functions (a.k.a. lambda-expressions) and arbitrary language-specific statements (e.g., the Golang go statement)

## Version 0.45.0

### Additions

- --experimental flag for passing rules directly to semgrep-core ([#2836](https://github.com/semgrep/semgrep/pull/2836))

### Fixes

- Ellipses in template strings don't match string literals ([#2780](https://github.com/semgrep/semgrep/issues/2780))
- Go: correctly parse select/switch clauses like in tree-sitter ([#2847](https://github.com/semgrep/semgrep/issues/2847))
- Go: parse correctly 'for ...' header in Go patterns ([#2838](https://github.com/semgrep/semgrep/issues/2838))