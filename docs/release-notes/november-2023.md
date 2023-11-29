---
slug: november-2023
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: November 2023
tags:
  - Release notes
---

# November 2023 release notes

:::tip
- **Semgrep Pro Engine** is now generally available (GA). Team tier users and above can use the Pro Engine to perform **cross-file (interfile)** and **cross-function (intrafile)** analyses. To enable Semgrep Pro Engine:
    1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login)
    1. Click **Settings**.
    1. Click the **<i class="fa-solid fa-toggle-large-on"></i> Semgrep Pro Engine** toggle.
- See [<i class="fa-regular fa-file-lines"></i> Semgrep Pro Engine](/semgrep-code/semgrep-pro-engine-intro/) documentation for more information.
- The Semgrep command-line tool now requires **Python 3.8** or later.
:::

## 🔧 Semgrep OSS Engine

:::note
Starting from version 1.46.0, Semgrep is first released in the following ecosystems:
- `pypy`
- `brew`
- `returntocorp/semgrep:canary` (Docker)

If no issues are detected after a few days, the Semgrep team then promotes the `:canary` Docker tag to `:latest`.
:::

- The following versions of Semgrep OSS Engine were released in November 2023:
  - [<i class="fas fa-external-link fa-xs"></i> 1.47.0](https://github.com/returntocorp/semgrep/releases/tag/v1.47.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.48.0](https://github.com/returntocorp/semgrep/releases/tag/v1.48.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.49.0](https://github.com/returntocorp/semgrep/releases/tag/v1.49.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.50.0](https://github.com/returntocorp/semgrep/releases/tag/v1.50.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.51.0](https://github.com/returntocorp/semgrep/releases/tag/v1.51.0)


## 🌐 Semgrep Cloud Platform

### Added

- Semgrep now records the languages that invoked the Pro Engine. This enables the Semgrep team to measure the performance impact and error rates of new Pro Engine languages. **For scans that don't send metrics, there is no change.** See [<i class="fas fa-external-link fa-xs"></i> Semgrep Privacy Policy](https://github.com/semgrep/semgrep/blob/develop/PRIVACY.md) for more information.
- Added a link to the SSO documentation to help users set up SSO. <!-- 11485 -->
- **CLI tool:** Added `--config code` and `--config secrets` flags to the `semgrep scan` command. When using these flags, the environment variable SEMGREP_REPO_NAME must be set. For example,
    ```
    $ SEMGREP_REPO_NAME=test_repo semgrep --config secrets
    ```

### Changed

- Elixir language support now requires the Pro Engine. To scan Elixir codebases, enable the Pro Engine. <!-- 9308 -->
- The Semgrep CLI tool now correctly counts the rules that are run on a codebase. Previously, Semgrep counted the total rules in the user's Policies or rulesets, including rules that did **not** have valid targets, and therefore did not actually run. <!-- 9130  -->
- Updated instances of **returntocorp** to **Semgrep**. <!-- gh 112877 -->
- **Semgrep Editor:** Rules created in the editor are private by default. This means only members of  your organization are able to view rules you have created. To create a private rule visible only to you (an individual) ensure that you create the rule in your **individual account**. <!-- 11267 -->
- `semgrep scan --config <product>` now uses the same endpoint as the `semgrep ci` to fetch the scan configuration. <!-- todo effect of this change -->
- Improved error pages.


### Fixed

- **API:** Fixed an issue where the severities filter did not return the correct value. <!-- gh-11307 -->
- **CLI tool:**
    - The `--severity=[VALUE]` option, which can be added to a `semgrep scan` command, has been fixed. <!-- gh-9062 -->
    - The `--sarif` flag no longer crashes when Semgrep itself encounters errors.
- Semgrep now refuses to run incompatible versions of the Pro Engine, rather than crashing with a confusing error message. <!-- (gh-8873) -->
- Fixed an issue where the CI provider icons disappeared from the **Scan new project in CI** window. The icons now appear. <!-- 11228 -->
- Implemented minor fixes for the new onboarding flow. <!-- 11209, 11207 -->

## 💻 Semgrep Code

### Added

- **Findings details page:** For users that have granted Semgrep code access, you are now able to view **in-app code snippets** in Semgrep Cloud Platform.

<!-- todo add a screenshot -->

### Changed

- **Scanning timeout:** The timeout per-rule and per-file has increased from 2 seconds to 5 seconds.

### Fixed

- **Findings page:** Fixed an issue where filtering by repositories wasn't working. <!-- (11414) -->

## ⛓️ Semgrep Supply Chain

### Fixed

-  **Slack messages:**
    - Improved readability of Semgrep Supply Chain messages by adding newlines between sections. <!-- (11396) -->
    -  Fixed links that were not working. <!-- (11210) -->
- Fixed out of bounds list access error in `Cargo.lock` parser. <!-- (sc-1072) -->

## 🔐 Semgrep Secrets (beta)

### Added

- Added an optional `--no-secrets-validation` flag to skip secrets validation. To run a Secrets scan with no validation, use the command `semgrep ci --secrets --no-secrets-validation`.
- **Secrets and Secrets details page:** Added a **<i class="fa-solid fa-ticket"></i> ticket icon** to quickly inform users if a ticket has been created for the finding.

### Changed

- Semgrep Secrets now bypasses `.semgrepignore`. This means that files not typically part of a SAST or SCA scan scope, such as configuration files, are now scanned by Semgrep Secrets. By broadening the scope of Semgrep Secrets scans, it is likelier to find leaked secrets.
    - Previously, Semgrep Secrets excluded targets from `.semgrepignore`. Your findings count may increase with this change.
    - You can still define exclusions from Secrets scanning. To **exclude targets** from Secrets scanning, define files or paths for exclusion in Semgrep Cloud Platform:
        1. Click **Projects**.
        1. Click the Project's **<i class="fa-solid fa-gear"></i> icon**.
        1. You are able to add exclusions through the **Path ignores** text box. 
    - In the future, Semgrep will enable users to define ignores based on the type of scan, whether SAST, SCA, or Secrets. <!-- 9125 (https://github.com/semgrep/semgrep/pull/9125 -->

### Fixed

- Fixed an issue where the Secrets page could freeze due to too many findings. <!-- (11254) -->
- Fixed a bug where enabling the Secrets beta causes the default scan mode to be set to OSS Engine, even when the Pro flag is turned on in the web UI. <!-- (ea-248) -->
- Metadata overrides specified in validators were incorrectly applied on top of one another (on a per-rule basis), so that only the last was applied. Each update is now correctly applied independently to each finding based on the rule's validators. <!-- (scrt-231) -->

## 📝 Documentation and knowledge base

