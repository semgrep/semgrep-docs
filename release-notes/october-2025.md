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

- **Semgrep Managed Scanning** is now generally available. With Managed Scans, you can add repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows and integrate Semgrep into developer workflows through PR or MR comments.
- Added a **Remember email** checkbox to the SSO login screen.

### Changed

- Viewing a scan's **Details** page now updates the URL with a permalink for easier sharing.
- Semgrep's Docker image base has been upgraded from Alpine Linux 3.21 to 3.22.
- Improved performance by preventing unnecessary data fetches when scan details aren’t needed.

### Fixed


## 💻 Semgrep Code

### Added

- The Semgrep CLI is now compatible with machines running Python 3.14.
- **Scala**: 
  - Improved taint handling of `match` expressions, resulting in fewer false negatives when untrusted data is unpacked via pattern matching.
  - Partial case patterns are now supported. You can match individual case clauses within a `match` expression, such as `case 1 => ...`.
  - `$MVAR` is now accepted as a pattern alias with `@`, for example, `case $X @ ... => ...`.
  - Added `http4s`-specific support for `$M -> ... / $X / ...` patterns.
- The `/setup_semgrep_mcp` command now supports Claude Code.
- New `semgrep/semgrep` images now ship with Go 1.24. 
- MCP
  - Fixed tool calls failing for some models, such as GPT-5.
  - Fixed a bug where resource closure errors occurred when trying to use the MCP with the `streamable-http` transport method.

### Changed

- Temporary files created for rule checks are cleaned up after scans. 

### Fixed

- Fixed an issue where some scans exited with code 7.
- Improved detection of implicitly returned expressions for languages like Ruby and Scala, so that string interpolation and similar expressions are now correctly identified as returns. More expressions, such as string interpolation, are now correctly identified as implicitly returned.
- Float and double literals with type suffixes in Java and Rust projects now parse correctly, enabling metavariable comparisons and pattern matches. 
- Invalid CLI tokens now produce a clear error instead of a malformed success message. 

## ⛓️ Semgrep Supply Chain

## Added

- Supply Chain's reachability analysis now covers all high severity CVEs from supported sources starting from 2017 for **Go** packages.

## Fixed

- Supply Chain subproject resolution table is now shown in CLI output after a scan, even when no subprojects were successfully resolved.
- UV lockfiles that include editable and local dependencies without versions are now parsed correctly. The unversioned dependencies are ignored. 
- Failures to parse UV lockfiles are now correctly reported as **Failed** rather than **Unsupported**.

## 🤖 Semgrep Assistant

## Added

- Added a new filter for AI component tags with **No decision**, allowing users to find findings analyzed by the Assistant, but not classified as **low** or **high** risk.

## Changed

- Semgrep Code findings now show Assistant's true or false positive analyses more prominently, along with which memories Assisted used during analysis. The findings also show the threat model of specific security issues in the context of the code present, along with a summary of the issue.
- Assistant's rule generation functionality in Semgrep AppSec Platform has been deprecated.

## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in October 2025:
  * [<i class="fas fa-external-link fa-xs"></i>v1.142.0](https://github.com/semgrep/semgrep/releases/tag/v1.142.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.141.0](https://github.com/semgrep/semgrep/releases/tag/v1.141.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.140.0](https://github.com/semgrep/semgrep/releases/tag/v1.140.0)
