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
 
# Semgrep release notes for October 2025

The following updates were made to Semgrep in October 2025.

<!-- truncate -->

## 🌐 Semgrep AppSec Platform

### Added

- Semgrep Managed Scanning is now generally available. With Managed Scans, you can add repositories to your Semgrep organization in bulk without changing your existing CI workflows, and integrate Semgrep into developer workflows through PR or MR comments.
- Added a **Remember my email** checkbox to the SSO login page.
- Added the ability to change the name of **Teams**.
- The Semgrep CLI is now compatible with machines running Python 3.14.

### Changed

- The **Scan details** page now updates the URL with a permalink for easier sharing when viewed.
- Semgrep's Docker image base has been upgraded from Alpine Linux 3.21 to 3.22.
- `semgrep/semgrep` images now ship with Go 1.24.
- Improved performance by preventing unnecessary data fetches when scan details aren’t needed.

### Fixed

- Fixed an issue where filtering findings using project tags doesn't return results.
- Invalid CLI tokens now produce a clear error instead of a malformed success message. 

## 💻 Semgrep Code

### Added

- Semgrep Code findings now show Assistant's true or false positive analyses more prominently, along with which memories Assisted used during analysis. The findings also present the threat model for specific security issues in the context of the code, along with a summary of each issue.
- The `/setup_semgrep_mcp` command now supports Claude Code.

### Changed

- Temporary files created for rule checks are cleaned up after scans.
- The rule validation check now includes a language check to ensure that only valid languages are used, preventing invalid rules from being added to policies.

### Fixed

- Fixed an issue where some scans terminated with exit code 7.
- MCP:
  - Fixed tool calls failing for some models, such as GPT-5.
  - Fixed a bug where resource closure errors occurred when trying to use the MCP with the `streamable-http` transport method.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain's reachability analysis now covers all high-severity CVEs from supported sources starting from 2017 for Go packages.

### Fixed

- Supply Chain subproject resolution table is now shown in the CLI output after a scan, even when no subprojects were successfully resolved.
- UV lockfiles that include editable and local dependencies without versions are now parsed correctly. The unversioned dependencies are ignored. 
- Failures to parse UV lockfiles are now correctly reported as **Failed** rather than **Unsupported**.

## 🤖 Semgrep Assistant

### Added

- Added a new filter for AI component tags with **No decision**, allowing users to find findings analyzed by the Assistant, but not classified as **low** or **high** risk.

### Changed

- Assistant's rule generation functionality in Semgrep AppSec Platform has been deprecated.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in October 2025:
  * [<i class="fas fa-external-link fa-xs"></i>v1.142.0](https://github.com/semgrep/semgrep/releases/tag/v1.142.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.141.0](https://github.com/semgrep/semgrep/releases/tag/v1.141.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.140.0](https://github.com/semgrep/semgrep/releases/tag/v1.140.0)
