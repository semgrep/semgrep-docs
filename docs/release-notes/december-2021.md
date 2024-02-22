---
slug: december-2021
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# December 2021

## Version 0.77.0

### Highlights

#### Semgrep CLI and Semgrep CI now ignore the same patterns

With this update, Semgrep CLI now ignores the same patterns as the Semgrep CI by default. Find [the default .semgrepignore on GitHub](https://github.com/semgrep/semgrep/blob/develop/cli/src/semgrep/templates/.semgrepignore). If you want to return to Semgrep’s previous behavior, create an empty `.semgrepignore` file. However, creating a new `.semgrepignore` overrides the default setup.

#### Autofix improvement

An autofix improvement from [https://github.com/chair6](https://github.com/chair6) from Hashicorp! Big shoutout to them. Fixes several issues (auto fixing multiple things in the same set of lines). This change addresses several issues related to autofix by adding per-file line and column offset tracking, and uses those offsets when making edits to files. The improvement addresses several edge cases in the existing autofix implementation that Semgrep did not handle correctly previously. The addressed issues are the following: [#4428](https://github.com/semgrep/semgrep/issues/4428), [#3577](https://github.com/semgrep/semgrep/issues/3577), [#3388](https://github.com/semgrep/semgrep/issues/3388).

### Additions

#### Scala

Semgrep now correctly matches patterns as `List(...)`.

#### `.semgrepignore`

Default set of `.semgrepignore` patterns (in `semgrep/templates/.semgrepignore`) is now used by default. You can override the default behavior by creating your own `.semgrepignore` file.

#### Java

You can now use ellipsis metavariables for parameters. ([#4420](https://github.com/semgrep/semgrep/issues/4420))

### Fixes

The fixed section now remains only as changelog notes. To see the changelog notes, visit [Semgrep changelog](https://github.com/semgrep/semgrep/releases/tag/v0.77.0).

### Changes

#### Constant propagation

Constant propagation is now fully a must analysis, if a variable is undefined in some path then it is considered as a non-constant.

#### Dataflow

Dataflow now considers only reachable nodes, which prevents some false-positive or false-negative findings.

#### The `--time` option now includes time spent on processing

With this update, Semgrep's `--time` option output includes the time spent on getting the configs, running the matching engine, and processing of ignores.

#### semgrep-core improvement

The semgrep-core logs a warning when a worker process is consuming above 400 MiB of memory or reaches 80% of the specified memory limit. This change is made to help diagnose out of memory (OOM) related crashes.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.77.0).

## Version 0.76.2

### Additions

#### Support for Solidity

Semgrep now provides experimental support for the Solidity programming language.

### Fixes

#### Python

Comprehension variables now have the correct scope, which means that a pattern like `[$X for $X in $ITERATOR]` now correctly matches `[v for v in foo()]`. ([#4260](https://github.com/semgrep/semgrep/issues/4260))

#### Semgrep reports relative file paths with `.semgrepignore`

Previously, when you used Semgrep with `.semgrepignore` file, Semgrep reported targets with absolute instead of relative file paths. This issue has now been fixed. ([#4402](https://github.com/semgrep/semgrep/pull/4402))

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.76.2).

## Version 0.76.1

### Fixes

#### `.semgrepignore`

Previously, when you used Semgrep with a `.semgrepignore` file, Semgrep failed to run on files that were not subpaths of the directory where Semgrep was used.

## Version 0.76.0

### Additions

#### Improved filtering of rules

Semgrep now has improved filtering of rules based on file content, resulting in notable speedup for NodeJsScan rules.

#### Semgrep CLI

Semgrep CLI now respects `.semgrepignore` files. For more information about ignoring files, see [Semgrep documentation](/cli-reference/#ignoring-files).

#### Java support improvement

Semgrep now supports ellipsis in generics, for example: `class Foo<...>` ([#4335](https://github.com/semgrep/semgrep/issues/4335))

### Fixes

#### Java

When you use Semgrep to search for patterns that do not specify generics, Semgrep now also matches classes that are using generics. For example: `class $X {...}` which is not specifying generics, now matches `class Foo<T> { }`. ([#4335](https://github.com/semgrep/semgrep/issues/4335))

#### TypeScript

Semgrep now correctly parses TypeScript type definitions. ([#4330](https://github.com/semgrep/semgrep/issues/4330))

#### taint-mode

Semgrep taint-mode now reports findings when the Left Hand Side (LHS) operand of an access operator is a sink (for example as in `$SINK->method`), and the LHS operand is a tainted variable. ([#4320](https://github.com/semgrep/semgrep/issues/4320))

#### metavariable-comparison

Semgrep metavariable-comparison does not return a `NotHandled` error anymore. ([#4328](https://github.com/semgrep/semgrep/issues/4328))

#### semgrep-core

Fix a segmentation fault on Apple M1 processors when using `-filter_irrelevant_rules` on rules with very large pattern-either fields. ([#4305](https://github.com/semgrep/semgrep/issues/4305))

#### Python

Generate correct lexical exn for unbalanced braces. ([#4310](https://github.com/semgrep/semgrep/issues/4310))

#### YAML

Fix off-by-one error in location of arrays.

### Changes

#### semgrep-core

Log messages are now tagged with the process id.

#### Given `--output` Semgrep no longer prints search results to stdout

When using `--output` parameter, Semgrep no longer prints findings to standard output (stdout), but it only saves or posts those findings to the specified file or URL.

#### Additional information

To view the original release information, see [the changelog of this release on GitHub](https://github.com/semgrep/semgrep/releases/tag/v0.76.0).