---
slug: octoberzs-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# October 2021

## Version 0.70.0

### Additions

Experimental Bash support. ([#4081](https://github.com/semgrep/semgrep/pull/4081))

### Fixes

- Go: Ellipsis operator `(...)` is now supported in the import list. For example, import `(..."error"...)`. ([#4067](https://github.com/semgrep/semgrep/issues/4067))
- Java: Ellipsis operator in method chain calls can now match 0 elements. For example: o. ... .foo() now also matches o.foo(). ([#4082](https://github.com/semgrep/semgrep/issues/4082))
- Previously, Semgrep crashed when used with a YAML rule file that contained only comments. This bug is now fixed. As a result, Semgrep gracefully handles YAML rule files that contain only comments. ([#3773](https://github.com/semgrep/semgrep/issues/3773))

### Changes

- Resolution of rulesets uses the legacy registry instead of the cdn registry.
- The Benchmark suite is easier to modify.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.70.0).

## Version 0.69.1

### Fixes

- The --enable-metrics flag is now always a flag and does not optionally take an argument.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.69.1).

## Version 0.69.0

### Additions

- C: Semgrep now recognizes the sizeof() operator as valid C code. ([#4037](https://github.com/semgrep/semgrep/issues/4037))
- C: Semgrep recognizes declaration and function patterns in C code..
- Java: As of this update, Semgrep supports the @interface annotation type pattern. ([#4030](https://github.com/semgrep/semgrep/issues/4030))

### Fixes

- Previously, minified files have been excluded from Semgrep scans (see[the changelog for version 0.66.0](https://github.com/semgrep/semgrep/blob/develop/CHANGELOG.md#0660---09-22-2021)). As of this update, this change has been reverted and minified files are included in Semgrep scans.
- Java: Before this update, Semgrep returned incorrect findings for classes with import. With this update, the equality of metavariables bounded to imported classes was fixed and the problem no longer occurs. ([#3748](https://github.com/semgrep/semgrep/issues/3748))
- Python: The issue with matching tuples and parenthesized expressions has been fixed. ([#3832](https://github.com/semgrep/semgrep/issues/3832))
- C: With this update, the issue with the typedef reserved keyword inference has been fixed. ([#4054](https://github.com/semgrep/semgrep/pull/4054))
- Ruby: In Semgrep version 0.66.0, you could scan for both the hash rocket and regular hash in function calls with expressions similar to Oj.load(..., mode: :object, ...). The change implemented in Semgrep version 0.67.0 has changed this behavior. As a consequence, to scan for function calls with both the hash rocket and hash, the rule needed to be defined for both syntax patterns separately. With this update, the issue has been fixed and you can use the older syntax to search for both syntax patterns simultaneously. ([#3981](https://github.com/semgrep/semgrep/issues/3981))
- OCaml: Added body of functor in Abstract Syntax Tree (AST). ([#3821](https://github.com/semgrep/semgrep/issues/3821))

### Changes

- taint-mode: In version 0.68.0, sanitizers matching a source or a sink were automatically filtered out. This allowed a pattern sanitizer such as $F(...) to sanitize every other function without conflicting with neither sources nor sinks. As a consequence, other idioms used to specify sanitizers were broken. To resolve this issue, there are now two types of sanitizers:

- The default semantics of sanitizers is reverted to the state before version 0.68.0. By default, if a sanitizer matches a source or a sink, that source or sink becomes sanitized.
- A new type of sanitizer is now available. To prevent the sanitizer from overriding a source or a sink annotation when they match exactly, specify this sanitizer with a not_conflicting: true flag in the sanitizer declaration. This allows using sanitizer patterns such as $F(...) without the need to explicitly filter for sources and sinks from sanitization. ([#4033](https://github.com/semgrep/semgrep/pull/4033))

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.69.0).

## Version 0.68.2

### Fixes

- The --skip-unknown-extensions option now treats files with no extension as files with an unknown extension.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.68.2).

## Version 0.68.1

### Additions

- Added support for raise and throw statements in the dataflow engine and improved current support for the try and catch statements. ([#4006](https://github.com/semgrep/semgrep/pull/4006))

### Fixes

- Respect path filtering at the rule level.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.68.1).

## Version 0.68.0

### Additions

- Semgrep now enables you to scan input code from subshells. See the following example: `semgrep -e 'a' --lang js <(echo 'a')` ([#3966](https://github.com/semgrep/semgrep/pull/3966))

### Fixes

- Previously, Semgrep could not find empty try and catch statements with a wildcard matching in Java code. This issue has been fixed, and as a consequence, finding the empty try and catch statements works correctly. ([#4002](https://github.com/semgrep/semgrep/issues/4002))
- taint-mode: Previously, Semgrep did not report a tainted sink included in a specific argument of a function call. This issue has been fixed.
- PHP: You can now use more keywords as valid field names. ([#3954](https://github.com/semgrep/semgrep/issues/3954))

### Changes

- taint-mode: Sanitizers matching a source or a sink are filtered out. You can now use the following pattern: $F(...) As a result, it is possible to find other functions which are sanitizers.
- taint-mode: Previously, built-in source(...) and built-in sanitizer sanitize(...) could cause unexpected behavior in code, such as functions called source. In this update, both functions have been removed and the described issue no longer occurs.
- Improved Kotlin parsing from 77% to 90%.
- Resolution of Semgrep Registry rulesets (for example p/ci) uses a new rule content delivery network ( **CDN** ) and does client-side hydration.
- Set the Perl Compatible Regular Expressions (PCRE) recursion limit so it does not vary with different installations of the PCRE. Improved PCRE error handling in the Semgrep core.

### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.68.0).