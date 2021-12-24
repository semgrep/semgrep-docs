---
slug: release-notes
append_help_link: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 2
---

# Release notes

Welcome to Semgrep release notes. This document provides an overview of the changes, additions, and fixes made in different versions.

## December 2021

### Version 0.77.0

#### Highlights

##### Semgrep CLI and Semgrep CI now ignore the same patterns

With this update, Semgrep CLI now ignores the same patterns as the Semgrep CI by default. Find [the default .semgrepignore on GitHub](https://github.com/returntocorp/semgrep/blob/develop/semgrep/semgrep/templates/.semgrepignore). If you want to return to Semgrep’s previous behavior, create an empty `.semgrepignore` file. However, creating a new `.semgrepignore` overrides the default setup.

##### Autofix improvement

An autofix improvement from [https://github.com/chair6](https://github.com/chair6) from Hashicorp! Big shoutout to them. Fixes several issues (auto fixing multiple things in the same set of lines). This change addresses several issues related to autofix by adding per-file line and column offset tracking, and uses those offsets when making edits to files. The improvement addresses several edge cases in the existing autofix implementation that Semgrep did not handle correctly previously. The addressed issues are the following: [#4428](https://github.com/returntocorp/semgrep/issues/4428), [#3577](https://github.com/returntocorp/semgrep/issues/3577), [#3388](https://github.com/returntocorp/semgrep/issues/3388).

#### Additions

##### Scala

Semgrep now correctly matches patterns as `List(...)`.

##### `semgrepignore.`

Default set of `.semgrepignore` patterns (in `semgrep/templates/.semgrepignore`) is now used by default. You can override the default behavior by creating your own `.semgrepignore` file.

##### Java

You can now use ellipsis metavariables for parameters. ([#4420](https://github.com/returntocorp/semgrep/issues/4420))

#### Fixes

The fixed section now remains only as changelog notes. To see the changelog notes, visit [Semgrep changelog](https://github.com/returntocorp/semgrep/releases/tag/v0.77.0).

#### Changes

##### Constant propagation

Constant propagation is now fully a must analysis, if a variable is undefined in some path then it is considered as a non-constant.

##### Dataflow

Dataflow now considers only reachable nodes, which prevents some false-positive or false-negative findings.

##### The `--time` option now includes time spent on processing

With this update, Semgrep's `--time` option output includes the time spent on getting the configs, running the matching engine, and processing of ignores.

##### semgrep-core improvement

The semgrep-core logs a warning when a worker process is consuming above 400 MiB of memory or reaches 80% of the specified memory limit. This change is made to help diagnose out of memory (OOM) related crashes.

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.77.0).

### Version 0.76.2

#### Additions

##### Support for Solidity

Semgrep now provides experimental support for the Solidity programming language.

#### Fixes

##### Python

Comprehension variables now have the correct scope, which means that a pattern like `[$X for $X in $ITERATOR]` now correctly matches `[v for v in foo()]`. ([#4260](https://github.com/returntocorp/semgrep/issues/4260))

##### Semgrep reports relative file paths with `.semgrepignore`

Previously, when you used Semgrep with `.semgrepignore` file, Semgrep reported targets with absolute instead of relative file paths. This issue has now been fixed. ([#4402](https://github.com/returntocorp/semgrep/pull/4402))

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.76.2).

### Version 0.76.1

#### Fixes

##### `.semgrepignore`

Previously, when you used Semgrep with a `.semgrepignore` file, Semgrep failed to run on files that were not subpaths of the directory where Semgrep was used.

### Version 0.76.0

#### Additions

##### Improved filtering of rules

Semgrep now has improved filtering of rules based on file content, resulting in notable speedup for NodeJsScan rules.

##### Semgrep CLI

Semgrep CLI now respects `.semgrepignore` files. For more information about ignoring files, see [Semgrep documentation](https://semgrep.dev/docs/cli-usage/#ignoring-files).

##### Java support improvement

Semgrep now supports ellipsis in generics, for example: `class Foo\&lt;...\&gt;` ([#4335](https://github.com/returntocorp/semgrep/issues/4335))

#### Fixes

##### Java

When you use Semgrep to search for patterns that do not specify generics, Semgrep now also matches classes that are using generics. For example: `class $X {...}` which is not specifying generics, now matches `class Foo\&lt;T\&gt; { }`. ([#4335](https://github.com/returntocorp/semgrep/issues/4335))

##### TypeScript

Semgrep now correctly parses TypeScript type definitions. ([#4330](https://github.com/returntocorp/semgrep/issues/4330))

##### taint-mode

Semgrep taint-mode now reports findings when the Left Hand Side (LHS) operand of an access operator is a sink (for example as in `$SINK-\&gt;method`), and the LHS operand is a tainted variable. ([#4320](https://github.com/returntocorp/semgrep/issues/4320))

##### metavariable-comparison

Semgrep metavariable-comparison does not return a `NotHandled` error anymore. ([#4328](https://github.com/returntocorp/semgrep/issues/4328))

##### semgrep-core

Fix a segmentation fault on Apple M1 processors when using `-filter_irrelevant_rules` on rules with very large pattern-either fields. ([#4305](https://github.com/returntocorp/semgrep/issues/4305))

##### Python

Generate correct lexical exn for unbalanced braces. ([#4310](https://github.com/returntocorp/semgrep/issues/4310))

##### YAML

Fix off-by-one error in location of arrays.

#### Changes

##### semgrep-core

Log messages are now tagged with the process id.

##### Given `--output` Semgrep no longer prints search results to stdout

When using `--output` parameter, Semgrep no longer prints findings to standard output (stdout), but it only saves or posts those findings to the specified file or URL.

##### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.76.0).

## November 2021

### Version 0.75.0

#### Fixes

##### Semgrep CI

In Semgrep CI, the option `--disable-nosem` now tags findings with the `is_ignored` option correctly. Previously, an optimization from version 0.74.0 left the field `None` when the described option has been used. The optimization has been reverted.

### Version v0.74.0

#### Additions

##### Method chaining

Semgrep now supports method chaining patterns in Python, Golang, Ruby, and C#. ([#4300](https://github.com/returntocorp/semgrep/issues/4300))

##### Scala

Semgrep now translates infix operations as regular method calls, enabling patterns similar to: `$X.map($F)` to also match code written as `xs map f`. ([#4290](https://github.com/returntocorp/semgrep/pull/4290))

##### PHP

Semgrep now supports parsing method patterns. ([#4262](https://github.com/returntocorp/semgrep/issues/4262))

#### **Changed**

##### Semgrep profiling improved

Semgrep is now more efficiently measuring its performance. The new `profiling_times` object in `--time --json` output enables better visibility of slowly performing Semgrep code.

##### Constant propagation

In constant propagation, Python strings are now evaluated as string literals. You can now match any kind of Python string (raw, byte, or unicode) by the `&quot;...&quot;` operator. ([#3881](https://github.com/returntocorp/semgrep/issues/3881))

#### Fixes

##### Ruby

Ruby blocks are now represented with an extra function call in Semgrep&#39;s generic abstract syntax tree (AST) so that both `f(...)` and `f($X)` correctly match `f(x)` in `f(x) { |n| puts n }`. ([#3880](https://github.com/returntocorp/semgrep/issues/3880))

##### Generic filters exclude large and binary files

Generic filters exclude large files and binary files to &#39;generic&#39; and &#39;regex&#39; targets as it was already done for the other languages.

##### PHP

An issue with stack overflow when using `-filter_irrelevant_rules` has been fixed. ([#4305](https://github.com/returntocorp/semgrep/issues/4305))

##### Dataflow no longer returns false positive results for switch statements

When a `switch` was not followed by another statement, and the last statement of the default case of the `switch` was a statement, such as `throw`, that could exit the execution of the current function. This caused unresolved `break` statements in the `switch` during the construction of the control flow graph (CFG). One of the possible consequences could be that constant propagation incorrectly flagged variables as constants. This issue has now been fixed. ([#4265](https://github.com/returntocorp/semgrep/issues/4265))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.72.0).

### Version 0.73.0

#### Additions

##### C++ support improved

With this release, Semgrep has improved the C++ parsing rate from 72.9% to 94.6%. Parsing rate is calculated as the number of lines Semgrep successfully parses in a corpus of popular GitHub repos.

#### Fixes

##### Semgrep CI no longer fails scan with binary files

Before this update, Semgrep sometimes reported `Pcre.Error(BadUTF8) error` when it tried to analyze PNG, TTF, EOT or WOFF, zip, tar, and other binary files. As a consequence, scans failed when binary files were present. With this update, the underlying issue has been fixed, and Semgrep skips binary files. ([#4258](https://github.com/returntocorp/semgrep/issues/4258))

##### Constant propagation improvements

Previously, Semgrep's constant propagation handled specific corner cases by raising an &quot;impossible&quot; error. Constant propagation now handles corner cases more gracefully instead of raising errors.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.73.0).

### Version 0.72.0

#### Additions

##### Dataflow support enhancements

Semgrep's Dataflow engine now tracks data flow through the following constructs:

- `synchronize` (Java) and `lock` (C#) blocks. ([#4150](https://github.com/returntocorp/semgrep/issues/4150))
- `await` and `yield` expressions (for example JavaScript and Python).
- `&amp;` expression (for example C, C++, and Go).
- Other language constructs are represented by `OtherExpr` in the Generic Abstract Syntax Tree (AST).

##### JavaScript enhancements

- Field-definition-as-assignment equivalence allows matching expression patterns against field definitions. This functionality is disabled by default. Enable it with the following rule option: `flddef_assign: true` ([#4187](https://github.com/returntocorp/semgrep/issues/4187))
- Arrows (short lambdas) patterns used to match also regular function definitions. This can now be disabled with rule options: `arrow_is_function: false` ([#4187](https://github.com/returntocorp/semgrep/issues/4187))
- When a pattern contains the `var` keyword to match variable declarations, Semgrep also matches variables declared with `let` or `const`. With this update, you can disable the described functionality by the rule options: `let_is_var: false`. This rule allows you to scan for `var` keywords while not matching `let` or `const`.

#### Fixes

##### Constant propagation improvement

Constant propagation now allows to recognize patterns such as the following for a method call:

```
x.f(y)
```

If `x` is a constant, it is correctly recognized.

##### Go improvements

This update includes various enhancements for the Go language. Semgrep is now able to:

- Correctly replace braces in composite literals for autofix.
- Correctly replace parenthesis in cast for autofix.
- Parse ellipsis in return type parameters.

##### Scala improvements

Parsing of Scala is improved with this update, because Semgrep is now able to parse:

- Case object within blocks.
- Typed patterns with variables that begin with an underscore: `case _x : Int =\&gt; …`
- Unicode identifiers.
- Nullary constructors with no arguments in more positions.
- The `infix` type operators with tuple arguments.
- Nested comments.
- Case class within blocks.

##### Semgrep's pattern-regex now accepts unicode

Semgrep's pattern-regex now supports hexadecimal notation of Unicode code points and assumes UTF-8. For more information, see [Semgrep documentation](https://semgrep.dev/docs/writing-rules/rule-syntax/#pattern-regex). ([#4240](https://github.com/returntocorp/semgrep/pull/4240))

##### Additional fixes and improvements in this version

Some of the new fixes with this version include the following:

- The semgrep-core accepts `sh` as an alias for Bash.
- Semgrep's metavariable-comparison is now able to detect when a metavariable binds to a code variable that is a constant, and use the constant value in the comparison. ([#3727](https://github.com/returntocorp/semgrep/issues/3727))
- Expand `~` when resolving config paths.

#### Changes

##### C# support

C# support is now generally available.

##### Command line interface (CLI) changes

When the semgrep-core results in a segmentation fault, Semgrep now only suggests increasing stack size.

Semgrep's CLI output no longer displays severity levels.

##### Scanning for executable scripts with shebang

Previously, Semgrep only scanned files that matched a file extension for the language that was scanned. Scripting languages are often written extensionless with the script interpreter in a shebang. Now, Semgrep now scans executable scripts in which shebang interpreter directives match the language of the rule. ([#3986](https://github.com/returntocorp/semgrep/pull/3986))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.72.0).

### Version 0.71.0

#### Additions

- In taint mode, you can now write rules that use the same metavariable in sources, sanitizers, and sinks. In addition, these metavariables correctly appear in matched messages. ([#4073](https://github.com/returntocorp/semgrep/pull/4073))
- Experimental support for Bash as a new target language.
- Experimental support for C++ as a new target language.
- Increase soft stack limit when running semgrep-core. ([#4120](https://github.com/returntocorp/semgrep/pull/4120))
- Semgrep `--validate` runs metachecks on the rule. ([#4170](https://github.com/returntocorp/semgrep/pull/4170))

#### Fixes

- The `text_wrapping` defaults to `MAX_TEXT_WIDTH` if `get_terminal_size` reports width smaller than 1. ([#4110](https://github.com/returntocorp/semgrep/pull/4110))
- Metrics report the error type of semgrep core errors (for example Timeout, and MaxMemory). ([#4156](https://github.com/returntocorp/semgrep/pull/4156))
- Missing or misformatted global settings files are no longer crashing Semgrep. ([#4164](https://github.com/returntocorp/semgrep/pull/4164))
- Constant propagation: Previously an assignment as `[x,y] = f()` was not counted as an assignment to `x` or `y` by constant propagation. Now these types of assignments are recognized by both basic and dataflow based constant propagations. As a result, tuple, or array destructuring assignments now correctly prevent constant propagation. ([#4109](https://github.com/returntocorp/semgrep/pull/4109))
- JS: Semgrep now correctly parses metavariables in template strings. ([#4139](https://github.com/returntocorp/semgrep/pull/4139))
- Scala: Semgrep now parses underscore separators in number literals. In addition, Semgrep now parses long suffixes (`l` and `L`) on number literals. ([#4155](https://github.com/returntocorp/semgrep/pull/4155))
- Scala: Semgrep parses name arguments in arbitrary function types, for example `(=\&gt; Int) =\&gt; Int`. ([#4178](https://github.com/returntocorp/semgrep/pull/4178))
- Bash: Various fixes and improvements.
- Kotlin: Ellipsis operator in class and body parameters are now supported. ([#4141](https://github.com/returntocorp/semgrep/issues/4141))
- Go: Method interface pattern is now supported. ([#4172](https://github.com/returntocorp/semgrep/issues/4172))

#### Changes

- Report CI environment variable in metrics for better environment determination. ([#4108](https://github.com/returntocorp/semgrep/pull/4108))
- Bash: A simple expression pattern can now match any command argument rather than having to match the whole command.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.71.0).

## October 2021

### Version 0.70.0

#### Additions

Experimental Bash support. ([#4081](https://github.com/returntocorp/semgrep/pull/4081))

#### Fixes

- Go: Ellipsis operator `(...)` is now supported in the import list. For example, import `(... &quot;error&quot; ...)`. ([#4067](https://github.com/returntocorp/semgrep/issues/4067))
- Java: Ellipsis operator in method chain calls can now match 0 elements. For example: o. ... .foo() now also matches o.foo(). ([#4082](https://github.com/returntocorp/semgrep/issues/4082))
- Previously, Semgrep crashed when used with a YAML rule file that contained only comments. This bug is now fixed. As a result, Semgrep gracefully handles YAML rule files that contain only comments. ([#3773](https://github.com/returntocorp/semgrep/issues/3773))

#### Changes

- Resolution of rulesets uses the legacy registry instead of the cdn registry.
- The Benchmark suite is easier to modify.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.70.0).

### Version 0.69.1

#### Fixes

- The --enable-metrics flag is now always a flag and does not optionally take an argument.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.1).

### Version 0.69.0

#### Additions

- C: Semgrep now recognizes the sizeof() operator as valid C code. ([#4037](https://github.com/returntocorp/semgrep/issues/4037))
- C: Semgrep recognizes declaration and function patterns in C code..
- Java: As of this update, Semgrep supports the @interface annotation type pattern. ([#4030](https://github.com/returntocorp/semgrep/issues/4030))

#### Fixes

- Previously, minified files have been excluded from Semgrep scans (see[the changelog for version 0.66.0](https://github.com/returntocorp/semgrep/blob/develop/CHANGELOG.md#0660---09-22-2021)). As of this update, this change has been reverted and minified files are included in Semgrep scans.
- Java: Before this update, Semgrep returned incorrect findings for classes with import. With this update, the equality of metavariables bounded to imported classes was fixed and the problem no longer occurs. ([#3748](https://github.com/returntocorp/semgrep/issues/3748))
- Python: The issue with matching tuples and parenthesized expressions has been fixed. ([#3832](https://github.com/returntocorp/semgrep/issues/3832))
- C: With this update, the issue with the typedef reserved keyword inference has been fixed. ([#4054](https://github.com/returntocorp/semgrep/pull/4054))
- Ruby: In Semgrep version 0.66.0, you could scan for both the hash rocket and regular hash in function calls with expressions similar to Oj.load(..., mode: :object, ...). The change implemented in Semgrep version 0.67.0 has changed this behavior. As a consequence, to scan for function calls with both the hash rocket and hash, the rule needed to be defined for both syntax patterns separately. With this update, the issue has been fixed and you can use the older syntax to search for both syntax patterns simultaneously. ([#3981](https://github.com/returntocorp/semgrep/issues/3981))
- OCaml: Added body of functor in Abstract Syntax Tree (AST). ([#3821](https://github.com/returntocorp/semgrep/issues/3821))

#### Changes

- taint-mode: In version 0.68.0, sanitizers matching a source or a sink were automatically filtered out. This allowed a pattern sanitizer such as $F(...) to sanitize every other function without conflicting with neither sources nor sinks. As a consequence, other idioms used to specify sanitizers were broken. To resolve this issue, there are now two types of sanitizers:

- The default semantics of sanitizers is reverted to the state before version 0.68.0. By default, if a sanitizer matches a source or a sink, that source or sink becomes sanitized.
- A new type of sanitizer is now available. To prevent the sanitizer from overriding a source or a sink annotation when they match exactly, specify this sanitizer with a not\_conflicting: true flag in the sanitizer declaration. This allows using sanitizer patterns such as $F(...) without the need to explicitly filter for sources and sinks from sanitization. ([#4033](https://github.com/returntocorp/semgrep/pull/4033))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.0).

### Version 0.68.2

#### Fixes

- The --skip-unknown-extensions option now treats files with no extension as files with an unknown extension.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.2).

### Version 0.68.1

#### Additions

- Added support for raise and throw statements in the dataflow engine and improved current support for the try and catch statements. ([#4006](https://github.com/returntocorp/semgrep/pull/4006))

#### Fixes

- Respect path filtering at the rule level.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.1).

### Version 0.68.0

#### Additions

- Semgrep now enables you to scan input code from subshells. See the following example: semgrep -e 'a' --lang js \&lt;(echo 'a'). ([#3966](https://github.com/returntocorp/semgrep/pull/3966))

#### Fixes

- Previously, Semgrep could not find empty try and catch statements with a wildcard matching in Java code. This issue has been fixed, and as a consequence, finding the empty try and catch statements works correctly. ([#4002](https://github.com/returntocorp/semgrep/issues/4002))
- taint-mode: Previously, Semgrep did not report a tainted sink included in a specific argument of a function call. This issue has been fixed.
- PHP: You can now use more keywords as valid field names. ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

#### Changes

- taint-mode: Sanitizers matching a source or a sink are filtered out. You can now use the following pattern: $F(...) As a result, it is possible to find other functions which are sanitizers.
- taint-mode: Previously, built-in source(...) and built-in sanitizer sanitize(...) could cause unexpected behavior in code, such as functions called source. In this update, both functions have been removed and the described issue no longer occurs.
- Improved Kotlin parsing from 77% to 90%.
- Resolution of Semgrep Registry rulesets (for example p/ci) uses a new rule content delivery network ( **CDN** ) and does client-side hydration.
- Set the Perl Compatible Regular Expressions (PCRE) recursion limit so it does not vary with different installations of the PCRE. Improved PCRE error handling in the Semgrep core.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.0).

## September 2021

### Version 0.67.0

#### Additions

- Support for break and continue in the dataflow engine
- Support for switch statements in the dataflow engine

#### Fixes

- Fix CFG dummy nodes to always connect to exit node
- Deep ellipsis \&lt;... x ...\&gt; now matches sub-expressions of statements
- Ruby: treat 'foo' as a function call when alone on its line ([#3811](https://github.com/returntocorp/semgrep/issues/3811))
- Fixed bug in semgrep-core's -filter\_irrelevant\_rules causing Semgrep to incorrectly skip a file ([#3755](https://github.com/returntocorp/semgrep/issues/3755))
- PHP: allows more keywords as valid field names ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

#### Changes

- Taint no longer analyzes dead/unreachable code
- Improve error message for segmentation faults/stack overflows
- Attribute-expression equivalence that allows matching expression patterns against attributes, it is enabled by default but can be disabled via rule options: with attr\_expr: false ([#3489](https://github.com/returntocorp/semgrep/issues/3489))
- Improved Kotlin parsing from 35% to 77% on our Kotlin corpus

### Version 0.66.0

#### Additions

- HCL (a.k.a Terraform) experimental support (see[this Terraform ruleset](https://semgrep.dev/p/terraform))

#### Fixes

- Dataflow: Recognize &quot;concat&quot; method and interpret it in a language-dependent manner ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- PHP: allows certain keywords as valid field names ([#3907](https://github.com/returntocorp/semgrep/issues/3907))

#### Changes

- Constant propagation now assumes that void methods may update the callee ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- Add rule message to emacs output ([#3851](https://github.com/returntocorp/semgrep/pull/3851))
- Show stack trace on fatal errors ([#3876](https://github.com/returntocorp/semgrep/pull/3876))
- Various changes to error messages ([#3827](https://github.com/returntocorp/semgrep/pull/3827))

### Version 0.65.0

#### Additions

- Allow autofix using the command line rather than only with the fix: YAML key

#### Fixes

- Taint detection with ternary ifs ([#3778](https://github.com/returntocorp/semgrep/issues/3778))
- Fixed corner-case crash affecting the pattern: $X optimization (&quot;empty And; no positive terms in And&quot;)
- PHP: Added support for parsing labels and goto ([#3592](https://github.com/returntocorp/semgrep/issues/3592))
- PHP: Parse correctly constants named PUBLIC or DEFAULT ([#3589](https://github.com/returntocorp/semgrep/issues/3589))
- Go: Added type inference for struct literals ([#3622](https://github.com/returntocorp/semgrep/issues/3622))
- Fix semgrep-core crash when a cache file exceeds the file size limit
- Sped up Semgrep interface with tree-sitter parsing

#### Changes

- Grouped semgrep CLI options and added constraints when useful (e.g., cannot use --vim and --emacs at the same time)

### Version 0.64.0

#### Additions

- Enable associative matching for string concatenation ([#3741](https://github.com/returntocorp/semgrep/issues/3741))

#### Fixes

- Java: separate import static from regular imports during matching ([#3772](https://github.com/returntocorp/semgrep/issues/3772))
- Taint mode will now benefit from semgrep-core's -filter\_irrelevant\_rules
- Taint mode should no longer report duplicate matches ([#3742](https://github.com/returntocorp/semgrep/issues/3742))
- Only change source directory when running in docker context ([#3732](https://github.com/returntocorp/semgrep/pull/3732))

#### Changes

- Add logging on failure to git ls-files ([#3777](https://github.com/returntocorp/semgrep/pull/3777))

## August 2021

### Version 0.63.0

#### Additions

- C#: support ellipsis in declarations ([#3720](https://github.com/returntocorp/semgrep/pull/3720))

#### Fixes

- Hack: improved support for metavariables ([#3716](https://github.com/returntocorp/semgrep/pull/3716))
- Dataflow: Disregard type arguments but not the entire instruction

#### Changes

- Optimize ending ... in pattern-insides to simply match anything left

### Version 0.62.0

#### Additions

- OCaml: support module aliasing, so looking for List.map will also find code that renamed List as L via module L = List.
- Add help text to sarif formatter output if defined in metadata field.
- Update shortDescription in SARIF formatter output if defined in metadata field.
- Add tags as defined in metadata field in addition to the existing tags.

#### Fixes

- core: fix parsing of numeric literals in rule files
- Java: fix the range and autofix of Cast expressions ([#3669](https://github.com/returntocorp/semgrep/issues/3669))
- Generic mode scanner no longer tries to open submodule folders as files ([#3701](https://github.com/returntocorp/semgrep/pull/3701))
- pattern-regex with completely empty files ([#3705](https://github.com/returntocorp/semgrep/issues/3705))
- --sarif exit code with suppressed findings ([#3680](https://github.com/returntocorp/semgrep/issues/3680))
- Fixed fatal errors when a pattern results in a large number of matches
- Better error message when rule contains empty pattern

#### Changes

- Add backtrace to fatal errors reported by semgrep-core
- Report errors during rule evaluation to the user
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster

## July 2021

### Version 0.60.0

#### Additions

- Detect duplicate keys in YAML dictionaries in Semgrep rules when parsing a rule (for example detect multiple metavariable inside one metavariable-regex).

#### Fixes

C/C++: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))

- JavaScript: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))
- JavaScript: Detect numeric object keys 1 and 0x1 as equal ([#3579](https://github.com/returntocorp/semgrep/issues/3579))
- OCaml: improved parsing stats by using tree-sitter-ocaml (from 25% to 88%)
- taint-mode: Check nested functions
- taint-mode: foo.x is now detected as tainted if foo is a source of taint
- taint-mode: Do not crash when it is not possible to compute range info
- Rust: recognize ellipsis in macro calls patterns ([#3600](https://github.com/returntocorp/semgrep/issues/3600))
- Ruby: correctly represent a.(b) in the AST ([#3603](https://github.com/returntocorp/semgrep/issues/3603))

#### Changes

- Added precise error location for the Semgrep metachecker, for example to detect duplicate patterns in a rule.

### Version 0.58.2

#### Additions

- New iteration of taint-mode that allows to specify sources/sanitizers/sinks using arbitrary pattern formulas. This provides plenty of flexibility. Note that we breaks compatibility with the previous taint-mode format, e.g., - source(...) must now be written as - pattern: source(...).
- Experimental support for HTML. This does not rely on the generic mode but instead parses the HTML using tree-sitter-html. This allows some semantic matching (e.g., matching attributes in any order).
- js alpha support ([#1751](https://github.com/returntocorp/semgrep/issues/1751))
- New matching option implicit\_ellipsis that allows disabling the implicit ... that are added to record patterns, plus allow matching &quot;spread fields&quot; (JS ...x) at any position ([#3120](https://github.com/returntocorp/semgrep/issues/3120))
- Support globstar (\*\*) syntax in path include/exclude ([#3173](https://github.com/returntocorp/semgrep/pull/3173))

#### Fixes

- Apple M1: Semgrep installed from Homebrew no longer hangs ([#2432](https://github.com/returntocorp/semgrep/issues/2432))
- Ruby command shells are distinguished from strings ([#3343](https://github.com/returntocorp/semgrep/issues/3343))
- Java varargs are now correctly matched ([#3455](https://github.com/returntocorp/semgrep/issues/3455))
- Support for partial statements (e.g., try { ... }) for Java ([#3417](https://github.com/returntocorp/semgrep/issues/3417))
- Java generics are now correctly stored in the AST ([#3505](https://github.com/returntocorp/semgrep/pull/3505))
- Constant propagation now works inside Python with statements ([#3402](https://github.com/returntocorp/semgrep/issues/3402))
- Metavariable value replacement in message/autofix no longer mixes up short and long names like $X vs $X2 ([#3458](https://github.com/returntocorp/semgrep/issues/3458))
- Fixed metavariable name collision during interpolation of message / autofix ([#3483](https://github.com/returntocorp/semgrep/pull/3483)) Thanks to[@Justin Timmons](https://r2c-community.slack.com/team/U026SUZKJ8Z) for the fix!
- Revert pattern: $X optimization ([#3476](https://github.com/returntocorp/semgrep/issues/3476))
- metavariable-pattern: Allow filtering using a single pattern or pattern-regex
- Dataflow: Translate call chains into IL

#### Changes

- Significant speed improvements (noted above)
- The size of the semgrep-core the binary is now 95 MB (was 170 MB in v0.58.0) and a smaller Docker image (from 95 MB to 40 MB)
- The --debug option now displays which files are currently processed incrementally; it will not wait until semgrep-core completely finishes.
- Switch from OCaml 4.10.0 to OCaml 4.12.0
- Faster matching times for generic mode

- Better error message when rule contains empty pattern

## June 2021

### Version 0.57.0

#### Additions

- New options: field in a YAML rule to enable/disable certain features (e.g., constant propagation) (See[https://github.com/returntocorp/semgrep/blob/develop/semgrep-core/src/core/Config\_semgrep.atd](https://github.com/returntocorp/semgrep/blob/develop/semgrep-core/src/core/Config_semgrep.atd) for the list of available features one can enable/disable)
- Capture groups in pattern-regex: in $1, $2, etc. ([#3356](https://github.com/returntocorp/semgrep/issues/3356))
- Support metavariables inside atoms (e.g., foo(:$ATOM))
- Support metavariables and ellipsis inside regexp literals (e.g., foo(/.../))
- Associative-commutative matching for bitwise OR, AND, and XOR operations
- Add support for $...MVAR in generic patterns
- Add support for $...MVAR in generic patterns
- metavariable-pattern: Add support for nested Spacegrep/regex/Comby patterns
- C#: support ellipsis in method parameters ([#3289](https://github.com/returntocorp/semgrep/issues/3289))

#### Fixes

- C#: parse \_\_makeref, \_\_reftype, \_\_refvalue ([#3364](https://github.com/returntocorp/semgrep/pull/3364))
- Java: parsing of dots inside function annotations with brackets ([#3389](https://github.com/returntocorp/semgrep/pull/3389))
- Do not pretend that short-circuit Boolean AND and OR operators are commutative ([#3399](https://github.com/returntocorp/semgrep/issues/3399))
- metavariable-pattern: Fix crash when nesting a non-generic pattern within a generic rule
- metavariable-pattern: Fix parse info when matching content of a metavariable under a different language
- generic mode on Markdown files with very long lines will now work ([#2987](https://github.com/returntocorp/semgrep/issues/2987))

#### Changes

- generic mode: files that don&#39;t look like nicely-indented programs are no longer ignored, which may cause accidental slowdowns in setups where excessively large files are not excluded explicitly ([#3418](https://github.com/returntocorp/semgrep/pull/3418))
- metavariable-comparison: Fix crash when comparing integers and floats
- Do not filter findings with the same range but different metavariable bindings ([#3310](https://github.com/returntocorp/semgrep/pull/3310))
- Set parsing\_state.have\_timeout when a timeout occurs ([#3438](https://github.com/returntocorp/semgrep/pull/3438))
- Set a timeout of 10s per file ([#3434](https://github.com/returntocorp/semgrep/pull/3434))
- Improvements to contributing documentation ([#3353](https://github.com/returntocorp/semgrep/pull/3353))
- Memoize getting ranges to speed up rules with large ranges
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster

### Version 0.56.0

#### Additions

- Associative-commutative matching for Boolean AND and OR operations ([#3198](https://github.com/returntocorp/semgrep/issues/3198))
- Support metavariables inside strings (e.g., foo(&quot;$VAR&quot;))
- Support metavariables inside atoms (e.g., foo(:$ATOM))
- metavariable-pattern: allow matching the content of a metavariable under a different language

#### Fixes

- C#: Parse attributes for local functions ([#3348](https://github.com/returntocorp/semgrep/issues/3348))
- Go: Recognize other common package naming conventions ([#2424](https://github.com/returntocorp/semgrep/issues/2424))

#### Changes

- Upgraded TypeScript parser ([#3102](https://github.com/returntocorp/semgrep/issues/3102))

### Version 0.55.1

#### Additions

- Added new metavariable-pattern operator (available only via --optimizations), thanks to Kai Zhong for the feature request ([#3257](https://github.com/returntocorp/semgrep/issues/3257))
- Add helpUri to SARIF output if rule source metadata is defined

#### Fixes

- C#: Support unsafe block syntax ([#3283](https://github.com/returntocorp/semgrep/pull/3283))
- Generic mode: fixed wrong line numbers for multi-lines match ([#3315](https://github.com/returntocorp/semgrep/issues/3315))
- JavaScript: support partial field definitions pattern, like in JSON
- JSON: handle correctly metavariables as field ([#3279](https://github.com/returntocorp/semgrep/issues/3279))
- PHP: Support ellipsis in include/require and echo ([#3191](https://github.com/returntocorp/semgrep/issues/3191),[#3245](https://github.com/returntocorp/semgrep/issues/3245))
- PHP: Prefer expression patterns over statement patterns ([#3191](https://github.com/returntocorp/semgrep/issues/3191))
- Python: support ellipsis in try-except ([#3233](https://github.com/returntocorp/semgrep/pull/3233))
- Scala: correctly parse symbol literals and interpolated strings containing double dollars ([#3271](https://github.com/returntocorp/semgrep/pull/3271))
- Taint mode: Allow statement-patterns when these are represented as statement-expressions in the Generic AST ([#3191](https://github.com/returntocorp/semgrep/issues/3191))
- Dataflow: Analyze foreach body even if we do not handle the pattern yet (#3155)
- Correctly handle ellipsis inside function types ([#3119](https://github.com/returntocorp/semgrep/issues/3119))
- Fall back to no optimizations when using unsupported features: pattern-where-python, taint rules, and --debugging-json ([#3265](https://github.com/returntocorp/semgrep/pull/3265))
- Handle regexp parse errors gracefully when using optimizations ([#3266](https://github.com/returntocorp/semgrep/pull/3266))
- Support equivalences when using optimizations ([#3259](https://github.com/returntocorp/semgrep/pull/3259))

#### Changes

- Run rules in semgrep-core (rather than patterns) by default (these are the optimizations described above)

### Version 0.54.0

This version includes release notes for Semgrep version 0.53.0 as well.

#### Additions

- Alpha support for Scala
- Metrics collection of project\_hash in cases where git is not available
- Taint mode now also analyzes top-level statements
- Per rule parse times and per rule-file parse and match times added to opt-in metrics
- $...MVAR can now match a list of statements (not just a list of arguments) ([#3170](https://github.com/returntocorp/semgrep/issues/3170))

#### Fixes

- JavaScript parsing: Support decorators on properties
- JavaScript parsing: Allow default export for any declaration
- Metavariables in messages are filled in when using --optimizations all
- Respect --timeout-threshold option in --optimizations all mode
- Python: class variables are matched in any order ([#3212](https://github.com/returntocorp/semgrep/issues/3212))
- Running with --strict will now return results if there are nosem mismatches. Semgrep will report a nonzero exit code if --strict is set and there are nosem mismatches ([#3099](https://github.com/returntocorp/semgrep/issues/3099))
- PHP: parsing correctly ... and metavariables in parameters
- PHP: parsing correctly functions with a single statement in their body
- Evaluate interpolated strings during constant propagation ([#3127](https://github.com/returntocorp/semgrep/issues/3127))
- Semgrep will report an InvalidRuleSchemaError for dictionaries with duplicate key names ([#3084](https://github.com/returntocorp/semgrep/issues/3084))
- Basic type inference also for implicit variable declarations (Python, Ruby, PHP, and JavaScript)
- JavaScript/TypeScript: differentiating tagged template literals in the AST ([#3187](https://github.com/returntocorp/semgrep/issues/3187))
- Ruby: storing parenthesis in function calls in the AST ([#3178](https://github.com/returntocorp/semgrep/issues/3178))

#### Changes

- Moved some debug logging to verbose logging
- $...ARGS can now match an empty list of arguments, just like ... ([#3177](https://github.com/returntocorp/semgrep/issues/3177))
- JSON and SARIF outputs sort keys for predictable results

## May 2021

### Version 0.52.0

This version also includes release notes for Semgrep version 0.53.0.

#### Additions

- Alpha support for C#
- Metavariables match both a constant variable occurrence and that same constant value ([#3058](https://github.com/returntocorp/semgrep/pull/3058))

#### Fixes

- OCaml: fix useless-else false positives by generating appropriate AST for if without an else.
- JavaScript/TypeScript: Propagate constant definitions without declaration

### Version 0.51.0

#### Additions

- Keep track of and report rule parse time in addition to file parse time
- v0 of opt-in, anonymous aggregate metrics

#### Fixes

- JavaScript/TypeScript: allow the deep expression operator `\&lt;... ...\&gt;` in expression statement position, for example:

```

$ARG = [$V];

...

\&lt;... $O[$ARG] ...\&gt;; // this works now

```

- PHP arrays with dots inside parse
- Propagate constants in nested lvalues such as y in x[y]
- Experimental support for C#

#### Changes

- Show log messages from semgrep-core when running semgrep with --debug
- By default, targets larger than 1 MB are now excluded from Semgrep scans. The new option --max-target-bytes 0 restores the previous behavior.
- Report relative path instead of absolute when using --time

### Version 0.50.1

#### Additions

- JS/TS: Infer global constants even if the const qualifier is missing ([#2978](https://github.com/returntocorp/semgrep/pull/2978))
- PHP: Resolve names and infer global constants in the same way as for Python

#### Fixes

- Empty yaml files do not crash
- Autofix does not insert newline characters for patterns from semgrep.live ([#3045](https://github.com/returntocorp/semgrep/pull/3045))
- Autofix printout is grouped with its own finding rather than the one below it ([#3046](https://github.com/returntocorp/semgrep/pull/3046))
- Do not assign constant values to assigned variables ([#2805](https://github.com/returntocorp/semgrep/issues/2805))
- A --time flag instead of --json-time which shows a summary of the timing information when invoked with normal output and adds a time field to the json output when --json is also present

#### Changes

- Moved some debug logging to verbose logging
- $...ARGS can now match an empty list of arguments, just like ... ([#3177](https://github.com/returntocorp/semgrep/issues/3177))
- JSON and SARIF outputs sort keys for predictable results
- .git/ directories are ignored when scanning
- External Python API (semgrep\_main.invoke\_semgrep) now takes an optional OutputSettings argument for controlling output
- json\_time has moved to OutputSettings.output\_time, this and many other OutputSettings arguments have been made optional

#### Removed

- --json-time flag in favor of --json + --time

## April 2021

### Version 0.49.0

#### Additions

- Support for matching multiple arguments with a metavariable ([#3009](https://github.com/returntocorp/semgrep/issues/3009)). This is done with a &quot;spread metavariable&quot; operator that looks like $...ARGS. This used to be available only for JavaScript and TypeScript, and is now available for the other languages (Python, Java, Go, C, Ruby, PHP, and OCaml).
- A new --optimizations [STR] command-line flag to turn on/off some optimizations. Use &quot;none&quot; to turn off everything and &quot;all&quot; to turn on everything. Just using --optimizations is equivalent to --optimizations all, and not using --optimizations is equivalent to --optimizations none.
- JavaScript/TypeScript: Support ... inside JSX text to match any text, as in \&lt;a href=&quot;foo&quot;\&gt;...\&lt;/a\&gt; ([#2963](https://github.com/returntocorp/semgrep/issues/2963))
- JavaScript/TypeScript: Support metavariables for JSX attribute values, as in \&lt;a href=$X\&gt;some text\&lt;/a\&gt; ([#2964](https://github.com/returntocorp/semgrep/issues/2964))

#### Fixes

- Python: correctly parsing fstring with multiple colons
- Ruby: better matching for interpolated strings ([#2826](https://github.com/returntocorp/semgrep/issues/2826) and[#2949](https://github.com/returntocorp/semgrep/issues/2949))
- Ruby: correctly matching numbers

#### Changes

- Add required executionSuccessful attribute to SARIF output ([#2983](https://github.com/returntocorp/semgrep/pull/2983)). Thanks to[Simon Engledew](https://github.com/simon-engledew)!
- Remove jsx and tsx from languages, instead just use javascript or typescript ([#3000](https://github.com/returntocorp/semgrep/pull/3000))
- Add limit max characters in the output line (#2958) and add a flag to control maximum characters (defaults to 160). Thanks to[Ankush Menat](https://github.com/ankush)!

### Version 0.48.0

#### Additions

- Taint mode: Basic cross-function analysis ([#2913](https://github.com/returntocorp/semgrep/pull/2913))
- Support for the new Java record extension and Java symbols with accented characters ([#2704](https://github.com/returntocorp/semgrep/issues/2704))

#### Fixes

- Capturing functions when used as both expressions and statements in JavaScript ([#1007](https://github.com/returntocorp/semgrep/issues/1007))
- Literal for ocaml tree sitter ([#2885](https://github.com/returntocorp/semgrep/issues/2885))

#### Changes

- The extra lines data is now consistent across scan types (e.g., semgrep-core, spacegrep, pattern-regex)

### Version 0.47.0

#### Additions

- Java: support of for(...)
- Rust: Semgrep patterns now support top-level statements ([#2910](https://github.com/returntocorp/semgrep/pull/2910))
- Support for UTF-8 code with non-ASCII chars ([#2944](https://github.com/returntocorp/semgrep/pull/2944))

#### Fixes

- Single field pattern in JSON, allowing $FLD: { ... } pattern
- Config detection in files with many suffix delimiters, like this.that.check.yaml. More concretely: configs end with .yaml, YAML language tests end with .test.yaml, and everything else is handled by its respective language extension (e.g., .py).
- Single array field in YAML in a pattern is parsed as a field, not a one element array

### Version 0.46.0

#### Additions

- YAML language support to --test

#### Fixes

- SARIF output now nests invocations inside runs
- Go backslashed carets in regexes can be parsed

#### Changes

- Deep expression matches (\&lt;... foo ...\&gt;) now match within the bodies of anonymous functions (a.k.a. lambda-expressions) and arbitrary language-specific statements (e.g., the Golang go statement)

### Version 0.45.0

#### Additions

- --experimental flag for passing rules directly to semgrep-core ([#2836](https://github.com/returntocorp/semgrep/pull/2836))

#### Fixes

- Ellipses in template strings don&#39;t match string literals ([#2780](https://github.com/returntocorp/semgrep/issues/2780))
- Go: correctly parse select/switch clauses like in tree-sitter ([#2847](https://github.com/returntocorp/semgrep/issues/2847))
- Go: parse correctly &#39;for ...&#39; header in Go patterns ([#2838](https://github.com/returntocorp/semgrep/issues/2838))

## Finding remaining release notes

This document encompasses only a limited number of release notes. See the changelog that includes descriptions of older versions than displayed in this document: [Semgrep GitHub changelog](https://github.com/returntocorp/semgrep/releases)

