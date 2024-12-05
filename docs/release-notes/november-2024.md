---
slug: november-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: November 2024
tags:
  - Release notes
---
# Semgrep release notes for November 2024

## 🌐 Semgrep AppSec Platform

### Added

### Changed

### Fixed

## 💻 Semgrep Code

### Added

- Added the ability to filter Semgrep Code findings by **Last fixed** and **Last triaged** dates in Semgrep AppSec Platform.
- **C**: Semgrep Pro Engine now handles duplicate function names properly. When Semgrep finds duplicate functions, it assumes that any of them could be called. For example, if the function `foo` is defined in two files, Semgrep reports taint errors for both instances:
    ```c
    // "a/test.h"
    void foo(int x) {
        //deepruleid: dup-symbols
        sink(x);
    }

    // "b/test.h"
    void foo(int x) {
        //deepruleid: dup-symbols
        sink(x);
    }

    // "main.c"
    #ifdef HEADER_A
        #include "a/test.h"
    #else
        #include "b/test.h"
    #endif

    int main() {
        int x = source();
        foo(x);
    }
    ```
- **JavaScript and TypeScript**:
  - Added Pro rules for JavaScript and TypeScript, including:
    - Code injection rules for the `vm`, `vm2`, and puppeteer libraries
    - NoSQL injection rules for `mongodb` and `mongoose` libraries
    - SQL injection rules for the `knex`, `mysql`, `pg`, `sequelize`, and `sqlite` libraries
    - Path traversal rules for `fs` and `fs-extra`
  - Improved existing rules to have more precise sources and sinks.
  - Improved JavaScript and TypeScript imports resolution.
  - Added support for JavaScript callbacks.

### Changed

- The **Findings** page's **Projects and branches** filter now pins selected options to the top of the list for easy reference.
- Semgrep Pro Engine now resolves method invocations on abstract classes, enhancing dataflow tracking accuracy for dynamic method invocations.
- Improved memory usage and time for scans with many findings due to reduced memory allocations by Semgrep while processing `nosemgrep` comments.
- **TypeScript**: improved logic for interfile analysis for projects using [project references](https://www.typescriptlang.org/docs/handbook/project-references.html).

### Fixed

- Semgrep Pro Engine's taint mode has been optimized to scale better when there are many matched sources, propagators, sanitizers, and sinks within a function.
- Semgrep now scans files containing special characters, as determined by Git, correctly instead of ignoring them. 
- Semgrep no longer freezes when running on a machine with a low memory limit with tracking enabled.
- Fixed an issue with regex parsing during ReDoS analysis when Semgrep encountered a character class starting with `[:`, such as `[:a-z]`.
- Fixed an issue with `semgrep scan` where anchored `semgrepignore` patterns for folders such as `/tests` weren't honored. Previously, these patterns didn't affect target file filtering.
- Fixed an issue where exceptions thrown during target processing caused the scan to fail. The scan now returns exit code `0` instead of `2`, unless the scan was invoked with the `--strict` flag.
- Fixed an issue where input containing multiple unclosed braces on the same line resulted in exponential parsing time, causing the scan to time out.
- Improved error handling for networking errors.
- Fixed an issue where autofix and `nosemgrep` didn't work in Semgrep Editor.
- **Swift**: Ellipses and metavariable ellipses can now be used as function parameters in patterns.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain now provides reachability analysis for **Scala** and **Swift**.

### Changed

- Parsers for `poetry.lock` and `pyproject.toml` now handle multi-line strings.

### Fixed

- Fixed an issue where the Gradle parser failed to parse the lockfile if it didn't start with a specific block comment. Semgrep now ignores the comment, allowing any or no comment to exist.

## 🤖 Semgrep Assistant

### Added

- Added Assistant-generated component tags for Semgrep Supply Chain and Semgrep Secrets findings.
- Added support for Google's Gemini.

## 🔐 Semgrep Secrets

### Added

- Added the ability to validate temporary AWS tokens.

## 📝 Documentation and knowledge base

### Added

### Changed

### Fixed

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in November 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.97.0](https://github.com/semgrep/semgrep/releases/tag/v1.97.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.96.0](https://github.com/semgrep/semgrep/releases/tag/v1.96.0)
