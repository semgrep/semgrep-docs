---
slug: august-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: August 2025
tags:
 - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
 # Semgrep release notes for August 2025

The following updates were made to Semgrep in August 2025.

## 🌐 Semgrep AppSec Platform

### Changed

- **Jira:**
  - The labels `Malicious Dependency` and `Non-malicious Vulnerability` have been changed to `Malicious Dependency` and `Not Malicious`, respectively.
  - Jira tickets created for malicious dependency findings now include more prominent visuals, such as bolded rule messages, to help them stand out from other reachable findings.
  - The maximum number of findings associated with a specific Jira ticket has increased from 50 to 70.
- You can now connect to your GitHub repositories without needing to contact Semgrep Support, even if you don't use GitHub as your SSO provider with Semgrep.
- You can now view a project's details page even if the scan hasn't finished.

### Fixed

- Semgrep now maintains connectivity to repositories that you move from one GitHub organization to another.
- Bitbucket pull request comments from Semgrep now display with correct formatting.

## 💻 Semgrep Code

### Added

- Added support for interfile analysis for Scala projects.
- Added a timeout to Semgrep's internal HTTP requests to prevent remote endpoints from indefinitely hanging the Semgrep engine.
- Improved pre-filtering for interfile rules enables the Semgrep engine to detect and skip unnecessary interfile rules earlier in the scan process.
- When a segmentation fault is encountered, Semgrep now displays backtraces with function names, filenames, and line numbers when available.
- **PHP:**
  - When enabling the option `taint_assume_safe_booleans`, the return values of
`boolval`, `is_bool`, and `||` are considered safe.
  - When enabling `taint_assume_safe_numbers`, the return values of `intval`,
  `floatval`, `+`, `-`, `*`, `/`, and `%` are considered safe.

### Changed

- Semgrep scans no longer attempt to parse `tsconfig` files for non-TypeScript scans.
- **CLI**: the `--json` output of Semgrep's CLI now includes a `time` field or object with some profiling data.

### Fixed

- Fixed incorrect YAML parsing of strings like `nan`, where the strings were interpreted as a float instead of a string.
- Fixed a bug that prevented taint tracking through `new` in Java projects.
- Semgrep now substitutes metavariables for their values in a deterministic order to
ensure keys for match-based IDs are stable.
- Error messages are logged, but not displayed as pop-ups in IDEs.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain's reachability analysis now covers all high and critical severity CVEs from supported sources starting 2017 and onward for Python packages.
- Supply Chain policies now support the exclusion of conditions. For example, you can define a condition such as `When Reachability is not Always reachable`.

## 🤖 Semgrep Assistant

### Added

- Added support for the use of custom AWS Bedrock keys.

## 🔐 Semgrep Secrets

### Added

- Semgrep now logs the amount of time required for the HTTP request to complete when validating Secrets in the debug logs.

### Changed

- Semgrep Secrets no longer allows more than 256 outstanding validations at any given time.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in August 2025:
  * [<i class="fas fa-external-link fa-xs"></i>v1.134.0](https://github.com/semgrep/semgrep/releases/tag/v1.134.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.133.0](https://github.com/semgrep/semgrep/releases/tag/v1.133.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.132.0](https://github.com/semgrep/semgrep/releases/tag/v1.132.0)
