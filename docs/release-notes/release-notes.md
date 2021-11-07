---
slug: release-notes
append_help_link: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
---

# Release notes

## Version 0.70.0

### Additions

Experimental Bash support. ([#4081](https://github.com/returntocorp/semgrep/pull/4081))

### Fixes

- Go: Ellipsis operator `(...)` is now supported in the import list. For example, import `(... &quot;error&quot; ...)`. ([#4067](https://github.com/returntocorp/semgrep/issues/4067))
- Java: Ellipsis operator in method chain calls can now match 0 elements. For example: o. ... .foo() now also matches o.foo(). ([#4082](https://github.com/returntocorp/semgrep/issues/4082))
- Previously, Semgrep crashed when used with a YAML rule file that contained only comments. This bug is now fixed. As a result, Semgrep gracefully handles YAML rule files that contain only comments. ([#3773](https://github.com/returntocorp/semgrep/issues/3773))

### Changes

- Resolution of rulesets uses the legacy registry instead of the cdn registry.
- The Benchmark suite is easier to modify.

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.70.0).

## Version 0.69.1

### Fixes

- The --enable-metrics flag is now always a flag and does not optionally take an argument.

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.1).

## Version 0.69.0

### Additions

- C: Semgrep now recognizes the sizeof() operator as valid C code. ([#4037](https://github.com/returntocorp/semgrep/issues/4037))
- C: Semgrep recognizes declaration and function patterns in C code..
- Java: As of this update, Semgrep supports the @interface annotation type pattern. ([#4030](https://github.com/returntocorp/semgrep/issues/4030))

### Fixes

- Previously, minified files have been excluded from Semgrep scans (see[the changelog for version 0.66.0](https://github.com/returntocorp/semgrep/blob/develop/CHANGELOG.md#0660---09-22-2021)). As of this update, this change has been reverted and minified files are included in Semgrep scans.
- Java: Before this update, Semgrep returned incorrect findings for classes with import. With this update, the equality of metavariables bounded to imported classes was fixed and the problem no longer occurs. ([#3748](https://github.com/returntocorp/semgrep/issues/3748))
- Python: The issue with matching tuples and parenthesized expressions has been fixed. ([#3832](https://github.com/returntocorp/semgrep/issues/3832))
- C: With this update, the issue with the typedef reserved keyword inference has been fixed. ([#4054](https://github.com/returntocorp/semgrep/pull/4054))
- Ruby: In Semgrep version 0.66.0, you could scan for both the hash rocket and regular hash in function calls with expressions similar to Oj.load(..., mode: :object, ...). The change implemented in Semgrep version 0.67.0 has changed this behavior. As a consequence, to scan for function calls with both the hash rocket and hash, the rule needed to be defined for both syntax patterns separately. With this update, the issue has been fixed and you can use the older syntax to search for both syntax patterns simultaneously. ([#3981](https://github.com/returntocorp/semgrep/issues/3981))
- OCaml: Added body of functor in Abstract Syntax Tree (AST). ([#3821](https://github.com/returntocorp/semgrep/issues/3821))

### Changes

- taint-mode: In version 0.68.0, sanitizers matching a source or a sink were automatically filtered out. This allowed a pattern sanitizer such as $F(...) to sanitize every other function without conflicting with neither sources nor sinks. As a consequence, other idioms used to specify sanitizers were broken. To resolve this issue, there are now two types of sanitizers:

- The default semantics of sanitizers is reverted to the state before version 0.68.0. By default, if a sanitizer matches a source or a sink, that source or sink becomes sanitized.
- A new type of sanitizer is now available. To prevent the sanitizer from overriding a source or a sink annotation when they match exactly, specify this sanitizer with a not\_conflicting: true flag in the sanitizer declaration. This allows using sanitizer patterns such as $F(...) without the need to explicitly filter for sources and sinks from sanitization. ([#4033](https://github.com/returntocorp/semgrep/pull/4033))

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.69.0).

## Version 0.68.2

### Fixes

- The --skip-unknown-extensions option now treats files with no extension as files with an unknown extension.

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.2).

## Version 0.68.1

### Additions

- Added support for raise and throw statements in the dataflow engine and improved current support for the try and catch statements. ([#4006](https://github.com/returntocorp/semgrep/pull/4006))

### Fixes

- Respect path filtering at the rule level.

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.1).

## Version 0.68.0

### Additions

- Semgrep now enables you to scan input code from subshells. See the following example: semgrep -e &#39;a&#39; --lang js \&lt;(echo &#39;a&#39;). ([#3966](https://github.com/returntocorp/semgrep/pull/3966))

### Fixes

- Previously, Semgrep could not find empty try and catch statements with a wildcard matching in Java code. This issue has been fixed, and as a consequence, finding the empty try and catch statements works correctly. ([#4002](https://github.com/returntocorp/semgrep/issues/4002))
- taint-mode: Previously, Semgrep did not report a tainted sink included in a specific argument of a function call. This issue has been fixed.
- PHP: You can now use more keywords as valid field names. ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

### Changes

- taint-mode: Sanitizers matching a source or a sink are filtered out. You can now use the following pattern: $F(...) As a result, it is possible to find other functions which are sanitizers.
- taint-mode: Previously, built-in source(...) and built-in sanitizer sanitize(...) could cause unexpected behavior in code, such as functions called source. In this update, both functions have been removed and the described issue no longer occurs.
- Improved Kotlin parsing from 77% to 90%.
- Resolution of Semgrep Registry rulesets (for example p/ci) uses a new rule content delivery network ( **CDN** ) and does client-side hydration.
- Set the Perl Compatible Regular Expressions (PCRE) recursion limit so it does not vary with different installations of the PCRE. Improved PCRE error handling in the Semgrep core.

### Additional information

To view the original release information, see [this release on GitHub](https://github.com/returntocorp/semgrep/releases/tag/v0.68.0).

## Version 0.67.0

### Additions

- Support for break and continue in the dataflow engine
- Support for switch statements in the dataflow engine

### Fixes

- Fix CFG dummy nodes to always connect to exit node
- Deep ellipsis \&lt;... x ...\&gt; now matches sub-expressions of statements
- Ruby: treat &#39;foo&#39; as a function call when alone on its line ([#3811](https://github.com/returntocorp/semgrep/issues/3811))
- Fixed bug in semgrep-core&#39;s -filter\_irrelevant\_rules causing Semgrep to incorrectly skip a file ([#3755](https://github.com/returntocorp/semgrep/issues/3755))
- PHP: allows more keywords as valid field names ([#3954](https://github.com/returntocorp/semgrep/issues/3954))

### Changes

- Taint no longer analyzes dead/unreachable code
- Improve error message for segmentation faults/stack overflows
- Attribute-expression equivalence that allows matching expression patterns against attributes, it is enabled by default but can be disabled via rule options: with attr\_expr: false ([#3489](https://github.com/returntocorp/semgrep/issues/3489))
- Improved Kotlin parsing from 35% to 77% on our Kotlin corpus

## Version 0.66.0

### Additions

- HCL (a.k.a Terraform) experimental support (see[this Terraform ruleset](https://semgrep.dev/p/terraform))

### Fixes

- Dataflow: Recognize &quot;concat&quot; method and interpret it in a language-dependent manner ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- PHP: allows certain keywords as valid field names ([#3907](https://github.com/returntocorp/semgrep/issues/3907))

### Changes

- Constant propagation now assumes that void methods may update the callee ([#3316](https://github.com/returntocorp/semgrep/issues/3316))
- Add rule message to emacs output ([#3851](https://github.com/returntocorp/semgrep/pull/3851))
- Show stack trace on fatal errors ([#3876](https://github.com/returntocorp/semgrep/pull/3876))
- Various changes to error messages ([#3827](https://github.com/returntocorp/semgrep/pull/3827))

## Version 0.65.0

### Additions

- Allow autofix using the command line rather than only with the fix: YAML key

### Fixes

- Taint detection with ternary ifs ([#3778](https://github.com/returntocorp/semgrep/issues/3778))
- Fixed corner-case crash affecting the pattern: $X optimization (&quot;empty And; no positive terms in And&quot;)
- PHP: Added support for parsing labels and goto ([#3592](https://github.com/returntocorp/semgrep/issues/3592))
- PHP: Parse correctly constants named PUBLIC or DEFAULT ([#3589](https://github.com/returntocorp/semgrep/issues/3589))
- Go: Added type inference for struct literals ([#3622](https://github.com/returntocorp/semgrep/issues/3622))
- Fix semgrep-core crash when a cache file exceeds the file size limit
- Sped up Semgrep interface with tree-sitter parsing

### Changes

- Grouped semgrep CLI options and added constraints when useful (e.g., cannot use --vim and --emacs at the same time)

## Version 0.64.0

### Additions

- Enable associative matching for string concatenation ([#3741](https://github.com/returntocorp/semgrep/issues/3741))

### Fixes

- Java: separate import static from regular imports during matching ([#3772](https://github.com/returntocorp/semgrep/issues/3772))
- Taint mode will now benefit from semgrep-core&#39;s -filter\_irrelevant\_rules
- Taint mode should no longer report duplicate matches ([#3742](https://github.com/returntocorp/semgrep/issues/3742))
- Only change source directory when running in docker context ([#3732](https://github.com/returntocorp/semgrep/pull/3732))

### Changes

- Add logging on failure to git ls-files ([#3777](https://github.com/returntocorp/semgrep/pull/3777))

## Version 0.63.0

### Additions

- C#: support ellipsis in declarations ([#3720](https://github.com/returntocorp/semgrep/pull/3720))

### Fixes

- Hack: improved support for metavariables ([#3716](https://github.com/returntocorp/semgrep/pull/3716))
- Dataflow: Disregard type arguments but not the entire instruction

### Changes

- Optimize ending ... in pattern-insides to simply match anything left

## Version 0.62.0

### Additions

- OCaml: support module aliasing, so looking for List.map will also find code that renamed List as L via module L = List.
- Add help text to sarif formatter output if defined in metadata field.
- Update shortDescription in SARIF formatter output if defined in metadata field.
- Add tags as defined in metadata field in addition to the existing tags.

### Fixes

- core: fix parsing of numeric literals in rule files
- Java: fix the range and autofix of Cast expressions ([#3669](https://github.com/returntocorp/semgrep/issues/3669))
- Generic mode scanner no longer tries to open submodule folders as files ([#3701](https://github.com/returntocorp/semgrep/pull/3701))
- pattern-regex with completely empty files ([#3705](https://github.com/returntocorp/semgrep/issues/3705))
- --sarif exit code with suppressed findings ([#3680](https://github.com/returntocorp/semgrep/issues/3680))
- Fixed fatal errors when a pattern results in a large number of matches
- Better error message when rule contains empty pattern

### Changes

- Add backtrace to fatal errors reported by semgrep-core
- Report errors during rule evaluation to the user
- When and-ed with other patterns, pattern: $X will not be evaluated on its own, but will look at the context and find $X within the metavariables bound, which should be significantly faster

## Version 0.60.0

### Additions

- Detect duplicate keys in YAML dictionaries in Semgrep rules when parsing a rule (for example detect multiple metavariable inside one metavariable-regex).

### Fixes

C/C++: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))

- JavaScript: Fixed stack overflows (segmentation faults) when processing very large files ([#3538](https://github.com/returntocorp/semgrep/issues/3538))
- JavaScript: Detect numeric object keys 1 and 0x1 as equal ([#3579](https://github.com/returntocorp/semgrep/issues/3579))
- OCaml: improved parsing stats by using tree-sitter-ocaml (from 25% to 88%)
- taint-mode: Check nested functions
- taint-mode: foo.x is now detected as tainted if foo is a source of taint
- taint-mode: Do not crash when it is not possible to compute range info
- Rust: recognize ellipsis in macro calls patterns ([#3600](https://github.com/returntocorp/semgrep/issues/3600))
- Ruby: correctly represent a.(b) in the AST ([#3603](https://github.com/returntocorp/semgrep/issues/3603))

### Changes

- Added precise error location for the Semgrep metachecker, for example to detect duplicate patterns in a rule.

## Finding remaining release notes

This document encompesses only a limit number of release notes for the purpose of clarity. To see all release notes, including older versions than displayed in this document, see [GitHub releases](https://github.com/returntocorp/semgrep/releases).