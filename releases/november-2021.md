---
slug: november-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# November 2021

## Version 0.75.0

### Fixes

#### Semgrep CI

In Semgrep CI, the option `--disable-nosem` now tags findings with the `is_ignored` option correctly. Previously, an optimization from version 0.74.0 left the field `None` when the described option has been used. The optimization has been reverted.

## Version v0.74.0

### Additions

#### Method chaining

Semgrep now supports method chaining patterns in Python, Go, Ruby, and C#. ([#4300](https://github.com/semgrep/semgrep/issues/4300))

#### Scala

Semgrep now translates infix operations as regular method calls, enabling patterns similar to: `$X.map($F)` to also match code written as `xs map f`. ([#4290](https://github.com/semgrep/semgrep/pull/4290))

#### PHP

Semgrep now supports parsing method patterns. ([#4262](https://github.com/semgrep/semgrep/issues/4262))

### **Changed**

#### Semgrep profiling improved

Semgrep is now more efficiently measuring its performance. The new `profiling_times` object in `--time --json` output enables better visibility of slowly performing Semgrep code.

#### Constant propagation

In constant propagation, Python strings are now evaluated as string literals. You can now match any kind of Python string (raw, byte, or unicode) by the `"..."` operator. ([#3881](https://github.com/semgrep/semgrep/issues/3881))

### Fixes

#### Ruby

Ruby blocks are now represented with an extra function call in Semgrep's generic abstract syntax tree (AST) so that both `f(...)` and `f($X)` correctly match `f(x)` in `f(x) { |n| puts n }`. ([#3880](https://github.com/semgrep/semgrep/issues/3880))

#### Generic filters exclude large and binary files

Generic filters exclude large files and binary files to 'generic' and 'regex' targets as it was already done for the other languages.

#### PHP

An issue with stack overflow when using `-filter_irrelevant_rules` has been fixed. ([#4305](https://github.com/semgrep/semgrep/issues/4305))

#### Dataflow no longer returns false positive results for switch statements

When a `switch` was not followed by another statement, and the last statement of the default case of the `switch` was a statement, such as `throw`, that could exit the execution of the current function. This caused unresolved `break` statements in the `switch` during the construction of the control flow graph (CFG). One of the possible consequences could be that constant propagation incorrectly flagged variables as constants. This issue has now been fixed. ([#4265](https://github.com/semgrep/semgrep/issues/4265))

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.72.0).

## Version 0.73.0

### Additions

#### C++ support improved

With this release, Semgrep has improved the C++ parsing rate from 72.9% to 94.6%. Parsing rate is calculated as the number of lines Semgrep successfully parses in a corpus of popular GitHub repos.

### Fixes

#### Semgrep CI no longer fails scan with binary files

Before this update, Semgrep sometimes reported `Pcre.Error(BadUTF8) error` when it tried to analyze PNG, TTF, EOT or WOFF, zip, tar, and other binary files. As a consequence, scans failed when binary files were present. With this update, the underlying issue has been fixed, and Semgrep skips binary files. ([#4258](https://github.com/semgrep/semgrep/issues/4258))

#### Constant propagation improvements

Previously, Semgrep's constant propagation handled specific corner cases by raising an "impossible" error. Constant propagation now handles corner cases more gracefully instead of raising errors.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.73.0).

## Version 0.72.0

### Additions

#### Dataflow support enhancements

Semgrep's Dataflow engine now tracks data flow through the following constructs:

- `synchronize` (Java) and `lock` (C#) blocks. ([#4150](https://github.com/semgrep/semgrep/issues/4150))
- `await` and `yield` expressions (for example JavaScript and Python).
- `&amp;` expression (for example C, C++, and Go).
- Other language constructs are represented by `OtherExpr` in the Generic Abstract Syntax Tree (AST).

#### JavaScript enhancements

- Field-definition-as-assignment equivalence allows matching expression patterns against field definitions. This functionality is disabled by default. Enable it with the following rule option: `flddef_assign: true` ([#4187](https://github.com/semgrep/semgrep/issues/4187))
- Arrows (short lambdas) patterns used to match also regular function definitions. This can now be disabled with rule options: `arrow_is_function: false` ([#4187](https://github.com/semgrep/semgrep/issues/4187))
- When a pattern contains the `var` keyword to match variable declarations, Semgrep also matches variables declared with `let` or `const`. With this update, you can disable the described functionality by the rule options: `let_is_var: false`. This rule allows you to scan for `var` keywords while not matching `let` or `const`.

### Fixes

#### Constant propagation improvement

Constant propagation now allows to recognize patterns such as the following for a method call:

```
x.f(y)
```

If `x` is a constant, it is correctly recognized.

#### Go improvements

This update includes various enhancements for the Go language. Semgrep is now able to:

- Correctly replace braces in composite literals for autofix.
- Correctly replace parenthesis in cast for autofix.
- Parse ellipsis in return type parameters.

#### Scala improvements

Parsing of Scala is improved with this update, because Semgrep is now able to parse:

- Case object within blocks.
- Typed patterns with variables that begin with an underscore: `case _x : Int => …`
- Unicode identifiers.
- Nullary constructors with no arguments in more positions.
- The `infix` type operators with tuple arguments.
- Nested comments.
- Case class within blocks.

#### Semgrep's pattern-regex now accepts unicode

Semgrep's pattern-regex now supports hexadecimal notation of Unicode code points and assumes UTF-8. For more information, see [Semgrep documentation](/writing-rules/rule-syntax/#pattern-regex). ([#4240](https://github.com/semgrep/semgrep/pull/4240))

#### Additional fixes and improvements in this version

Some of the new fixes with this version include the following:

- The semgrep-core accepts `sh` as an alias for Bash.
- Semgrep's metavariable-comparison is now able to detect when a metavariable binds to a code variable that is a constant, and use the constant value in the comparison. ([#3727](https://github.com/semgrep/semgrep/issues/3727))
- Expand `~` when resolving config paths.

### Changes

#### C support

C support is now generally available.

#### Command line interface (CLI) changes

When the semgrep-core results in a segmentation fault, Semgrep now only suggests increasing stack size.

Semgrep's CLI output no longer displays severity levels.

#### Scanning for executable scripts with shebang

Previously, Semgrep only scanned files that matched a file extension for the language that was scanned. Scripting languages are often written extensionless with the script interpreter in a shebang. Now, Semgrep scans executable scripts in which shebang interpreter directives match the language of the rule. ([#3986](https://github.com/semgrep/semgrep/pull/3986))

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.72.0).

## Version 0.71.0

### Additions

- In taint mode, you can now write rules that use the same metavariable in sources, sanitizers, and sinks. In addition, these metavariables correctly appear in matched messages. ([#4073](https://github.com/semgrep/semgrep/pull/4073))
- Experimental support for Bash as a new target language.
- Experimental support for C++ as a new target language.
- Increase soft stack limit when running semgrep-core. ([#4120](https://github.com/semgrep/semgrep/pull/4120))
- Semgrep `--validate` runs metachecks on the rule. ([#4170](https://github.com/semgrep/semgrep/pull/4170))

### Fixes

- The `text_wrapping` defaults to `MAX_TEXT_WIDTH` if `get_terminal_size` reports width smaller than 1. ([#4110](https://github.com/semgrep/semgrep/pull/4110))
- Metrics report the error type of semgrep core errors (for example Timeout, and MaxMemory). ([#4156](https://github.com/semgrep/semgrep/pull/4156))
- Missing or misformatted global settings files are no longer crashing Semgrep. ([#4164](https://github.com/semgrep/semgrep/pull/4164))
- Constant propagation: Previously an assignment as `[x,y] = f()` was not counted as an assignment to `x` or `y` by constant propagation. Now these types of assignments are recognized by both basic and dataflow based constant propagations. As a result, tuple, or array destructuring assignments now correctly prevent constant propagation. ([#4109](https://github.com/semgrep/semgrep/pull/4109))
- JS: Semgrep now correctly parses metavariables in template strings. ([#4139](https://github.com/semgrep/semgrep/pull/4139))
- Scala: Semgrep now parses underscore separators in number literals. In addition, Semgrep now parses long suffixes (`l` and `L`) on number literals. ([#4155](https://github.com/semgrep/semgrep/pull/4155))
- Scala: Semgrep parses name arguments in arbitrary function types, for example `(=> Int) => Int`. ([#4178](https://github.com/semgrep/semgrep/pull/4178))
- Bash: Various fixes and improvements.
- Kotlin: Ellipsis operator in class and body parameters are now supported. ([#4141](https://github.com/semgrep/semgrep/issues/4141))
- Go: Method interface pattern is now supported. ([#4172](https://github.com/semgrep/semgrep/issues/4172))

### Changes

- Report CI environment variable in metrics for better environment determination. ([#4108](https://github.com/semgrep/semgrep/pull/4108))
- Bash: A simple expression pattern can now match any command argument rather than having to match the whole command.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.71.0).