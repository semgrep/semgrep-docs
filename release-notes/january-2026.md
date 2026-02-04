---
slug: january-2026
hide_title: true
description: >-
    Release notes include changes, fixes, and additions for specific Semgrep versions.
toc_max_heading_level: 3
title: January 2026
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
 # Semgrep release notes for January 2026

The following updates were made to Semgrep in January 2026.

## 🌐 Semgrep AppSec Platform

### Added

- You must now authenticate through OAuth when connecting to the MCP server using Streamable HTTP.
- **CLI**:
  - Improved the performance of scan planning by reducing the cost of re-hashing `Target` objects. Semgrep's performance improvement on scans of large projects is proportional to the number of files in the project.
  - In `--debug` mode, Semgrep warns you if you attempt to run a parallel scan with a larger value for `-j`/`--jobs` than the number of CPUs Semgrep has detected as available for use.
  - Semgrep now provides a suggested starting value for `-j`/`--jobs`.
  - `semgrep login` now supports the use of `--force`, which ignores existing tokens and starts a new login session.

### Changed

- Semgrep AppSec Platform's **Findings** page displays more descriptive rule group names, and the **Finding Details** page displays more descriptive rule names. For example, `sequelize-express` is now `SQL injection in Sequelize with Express`.
- The MCP server no longer supports SSE transport.
- **CLI**:
  - Semgrep's CLI tool now uses `uv` instead of `pipenv` for package management.
  - `semgrep ci` no longer applies autofixes to local projects, even if the **Suggest autofixes** toggle in Semgrep AppSec Platform is turned on.

### Fixed

- Fixed an issue where time filters didn't return the correct findings.
- Fixed an issue where Semgrep didn't consistently select the same findings across scans when deduplicating findings. Previously, the selected findings were always equivalent, but they weren't guaranteed to be identical. For example, the findings' metavariable bindings could differ. Depending on the rule used and the target code, this behavior could cause the fingerprints of findings to change from one scan to another.
- Fixed an issue where email addresses used for SSO were case sensitive.
- Fixed an issue where Semgrep AppSec Platform displayed non-shared GitLab projects for the group.

## 💻 Semgrep Code

### Fixed

- Improved the handling of parsing errors during interfile analysis. These errors are now reported to you and included in the JSON output.
- Fix an issue resulting in `bad file descriptor` errors when performing Git operations on Windows machines.
- **Java**: improved virtual method resolution.
- **Python**: Dataflow analysis now accounts for `for/else` and `while/else` loops.
- **Scala**: improved virtual method resolution.

## ⛓️ Semgrep Supply Chain

### Added

- Semgrep’s reachability analysis now covers all critical and high severity CVEs from supported sources starting in 2017 across **all** supported languages.
- Diff-aware scans are now faster because Git-untracked files no longer slow down subproject discovery.
- Added support for Gradle lockfiles of the form `gradle*.lockfile`. Previously, only files with the exact name `gradle.lockfile` were supported.

### Changed

- Dependency search now allows you to search for one or more packages using:
  - The name of the package
  - An exact version number
  - A range of version numbers

### Fixed

- Improved the performance of Supply Chain scans by reducing pre-computation when printing scan status information. Note that less information is displayed if there are no rules to run.
- Fixed an issue with version range matching for `npm` packages where the version number contained a pre-release identifier, such as `-alpha` in `1.2.3-alpha`.

## 🤖 Semgrep Assistant

### Added

- Members can now create suggested memories for Assistant when triaging findings in Semgrep AppSec Platform. Previously, only admins could do so.

### Fixed

- Fixed an issue where code suggestions that included removing code didn't render in the diff correctly.

## 📝 Documentation and knowledge base

- Minor updates and fixes.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in January 2026:
  * [<i class="fas fa-external-link fa-xs"></i>v1.147.0](https://github.com/semgrep/semgrep/releases/tag/v1.147.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.148.0](https://github.com/semgrep/semgrep/releases/tag/v1.148.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.149.0](https://github.com/semgrep/semgrep/releases/tag/v1.149.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.150.0](https://github.com/semgrep/semgrep/releases/tag/v1.150.0)
