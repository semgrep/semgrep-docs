---
slug: october-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: October 2025
tags:
  - Release notes
---
 
<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for October 2025

The following updates were made to Semgrep in October 2025.

## 🌐 Semgrep AppSec Platform

### Added
- Added a “Remember email” checkbox to the SSO login screen.
- The Global Navigation menu now remembers its collapsed or expanded state between page loads.
- Improved taint handling of `match` expressions in Scala. This change results in fewer false negatives when untrusted data is unpacked via pattern matching.
- Partial case patterns are now supported for Scala. You can match individual case clauses within a `match` expression (e.g., case 1 => …).
- Added Python 3.14 support.
- MCP: The `/setup_semgrep_mcp` slash command now supports Claude Code.
- The deployment selector now prioritizes exact matches at the top of the list for faster and more accurate selection.

### Changed
- Viewing scan details now updates the URL with a permalink for easier sharing.
- Semgrep's Docker image base has been upgraded from Alpine Linux 3.21 to 3.22 (docker-version)
- Improved performance by preventing unnecessary data fetches when scan details aren’t needed.

### Fixed

- UV lockfiles that include editable and local dependencies without versions are now parsed correctly. The unversioned dependencies will be ignored. 
- Failures in parsing UV lockfiles are now correctly reported as "Failed" rather than "Unsupported" 
- `build.gradle.kts` files now resolve correctly when `--allow-local-builds` is passed.
- Rule parsing in 1.139.0 was switched to happen solely in semgrep-core. This change has been reverted because it caused some users to exit with code 7.
- Improved detection of implicitly returned expressions (e.g., Ruby, Scala). String interpolation and similar expressions are now correctly identified as returns. More expressions, such as string interpolation, are now correctly identified as implicitly returned. 
- Scala parser now Aaccepts `$MVAR` as a pattern alias with `@` (e.g., case $X @ ... => ...).
- Fixed an issue where `CamlinternalLazy.Undefined` would occur while using the eio multicore.
- Java/Rust: Float/double literals with type suffixes now parse correctly, enabling metavariable comparisons and pattern matches (e.g., Java 0.5f, 1.0d; Rust 0.5f32, 1.0f64). 
- Invalid CLI tokens now produce a clear error instead of a malformed success message. 
- New `semgrep/semgrep` images now ship with Go 1.24 (previously 1.23). 
- Rules validation: Temporary files created for rule checks are cleaned up after scans. 
- MCP
    - Tool-call failures for some models (e.g., GPT-5) are resolved. 
    - Fixed a bug where resource closure errors would occur when trying to use the MCP with the streamable-http tranport method.


## 💻 Semgrep Code

## ⛓️ Semgrep Supply Chain

- Supply Chain subproject resolution table is now shown even when no subprojects were successfully resolved

## 🤖 Semgrep Assistant
- AI Rule Generation in the UI has been deprecated.
- Added a new filter for AI component tags with “No decision”, allowing users to easily find findings analyzed by the Assistant but not classified as low or high risk.


## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in October 2025:
  * [<i class="fas fa-external-link fa-xs"></i>VERSION](https://github.com/semgrep/semgrep/releases/tag/VERSION)

