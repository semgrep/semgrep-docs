---
slug: march-2024
hide_title: true
title: March 2024
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for March 2024

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in September 2023:
  * [<i class="fas fa-external-link fa-xs"></i>1.64.0](https://github.com/semgrep/semgrep/releases/tag/v1.64.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.65.0](https://github.com/semgrep/semgrep/releases/tag/v1.65.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.66.0](https://github.com/semgrep/semgrep/releases/tag/v1.66.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.66.1](https://github.com/semgrep/semgrep/releases/tag/v1.66.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.66.2](https://github.com/semgrep/semgrep/releases/tag/v1.66.2)
  * [<i class="fas fa-external-link fa-xs"></i>1.67.0](https://github.com/semgrep/semgrep/releases/tag/v1.67.0)

## 🌐 Cloud Platform

### Added

### Changed

### Fixed

- Visual Studio Code extension: fixed an issue where rules weren't downloaded, leading to no scan results.

## 💻 Code

### Added

- Added support for Python's `yield` keyword, enabling the detection of taint findings from taint sources returned by `yield`.
- Added ability for users to copy file paths displayed in Semgrep Cloud Platform's **Findings** page if they aren't links.
- Added the ability for users to see if there's a version of a rule they're currently using that supports interfile analysis.
- **API**: added ability to get rules metadata from the API.

### Changed

- Code analysis started by logged-in users running `semgrep ci` now includes cross-file (interfile) analysis.
- `.phtml` files are now processed as PHP files and analyzed using PHP rules.
- Updated PR comments to include links to specific findings in Semgrep Cloud Platform.
- Users can see all projects, even if they don't have any identified findings, in Semgrep Cloud Platform.
- Semgrep Code now distinguishes between findings resolved by rule changes and findings resolved due to code modifications. This change applies only to new findings.
  - Only findings fixed due to code modifications are marked as fixed.
    - The fix rate calculated by Semgrep Code now includes only such findings.
  - Findings fixed due to rule changes are marked as resolved.
- **CLI**: Semgrep clones the repository into the current working directory instead of a `tmp` folder when using the `-- remote` flag.

### Fixed

- Kotlin: Fixed a parsing error when a newline appears between the class name and the primary constructor.
- Fixed an issue where autofix on variable definitions could not handle semicolons for Java, C++, C#, Rust, Cairo, Solidity, and Dart.
- Fixed an issue with autofix application on lines with multi-byte characters.
- Fixed issue where credentials were inadvertently included in a project URL when publishing a custom rule using `semgrep publish`. Running `semgrep publish` generates a `rule-origin-note`, which includes the project URL in the metadata. When this process occurs in a GitLab CI job, GitLab includes the CI job tokens in the project URL. Semgrep now removes the credential from the metadata.
- Fixed an issue where reachability rules were deleted from Semgrep Registry.
- Fixed an issue where the timestamp on the findings didn't correspond to the timestamp used by the filter; now, both use the `relevant_since` filter, which provides information about when findings were last reopened.

## ⛓️ Supply Chain

### Added

- Supply Chain now offers lockfile-only support for Swift projects.
- Added a tour of Supply Chain features in Semgrep Cloud Platform for first-time users, as well as a tour for returning users.

### Changed

- Findings with a critical severity now display in Semgrep Cloud Platform with a darker red color to help distinguish them from high-severity findings.
- Findings are now displayed in Semgrep Cloud Platform with readable names, such as `git-url-parse: Inefficient Regular Expression Complexity` instead of `lodash.defaultsdeep: Improper Input Validation`.
- Added additional reachability filter values to Semgrep Cloud Platform. Users can now search using the following values: **Reachable**, **Always Reachable**, **Conditionally Reachable**, **Unreachable**, **Unknown**.

### Fixed

- Fixed an issue where reachable findings were labeled **Unreachable** in Semgrep Cloud Platform.
- Fixed an issue where bulk triage didn't work in Semgrep Cloud Platform for Supply Chain findings.
- Fixed an issue where Supply Chain rules and findings erroneously display a confidence label.

## 🤖 Assistant

Semgrep Assistant is now generally available. Read the docs and the blog post.

### Added


### Changed

### Fixed

## 🔐 Secrets

Semgrep Secrets is no longer beta. It is now generally available.

### Added

- Historical scanning is now available as a public beta feature. Historical scanning allows users to find valid secrets in their Git commit history. To enable this feature:
    1. Log in to Semgrep Cloud Platform.
    2. Navigate to **Settings** > **Deployments**.
    3. Under **Secrets**, toggle on **Historical scanning**.
  Users can also include the `--historical-secrets` flag when running `semgrep ci` in the CLI.
- Added the ability to view a Secrets rule if there's one that supersedes a Semgrep Code rule with similar functionality.

### Changed

- Moved the **Settings** page for Secrets from its **Findings** page to **Settings** > **Deployment**.

### Fixed

- Fixed an issue where some Secrets findings were labeled as Code findings.
- **CLI**: Fixed an issue where there were no warnings if Secrets is enabled, but users have no Secrets rules configured.

## 📝 Documentation and knowledge base

### Added

### Changed

### Fixed
