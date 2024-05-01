---
slug: April-2024
hide_title: true
title: April 2024
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for April 2024

## 🌐 Semgrep AppSec Platform

<!-- Sara -->

### Added

- The **Teams** feature is now in public beta. This feature enables you to assign members to teams, and then grant those teams access to specific projects (repositories added to Semgrep).
    - Teams are crucial to large organizations with hundreds of members and projects. See [<i class="fa-regular fa-file-lines"></i> Manage user access to projects](/deployment/team).
- The Dashboard now displays the Assistant **priority inbox**, a list of essential tasks that Semgrep Assistant prepares for you each time you log in. <!-- 13768 -->
- CLI token activation page <!--13660 -->

### Changed

- **Editor and playground**: Structure mode has replaced simple mode. Try it out in the [<i class="fas fa-external-link fa-xs"></i> Playground](https://semgrep.dev/playground/new).
- Semgrep Cloud Platform has been renamed to Semgrep AppSec Platform.
- The Dashboard now has several UX improvements.
- The default Bitbucket YAML configuration file has been updated with options for full, diff, and on-demand scans.
- Improved the process of creating a GitHub Enterprise private Semgrep app. <!-- 13675 -->
- **Settings**: The Semgrep Pro Engine toggle has been renamed to <i class="fa-solid fa-toggle-large-on"></i> Cross-file.

### Fixed

## 💻 Code

<!--
- Made cross file (intrafile) default for Semgrep Code  -->

### Added

- Added support for the QL language, which is used by CodeQL.
- Added ability to specify multiple output flags, which allows users to write output to multiple files in multiple formats.

### Changed

- Switched regex engines; some rules may need to be updated, since Semgrep's new regex engine is stricter.

### Fixed

- Fixed SARIF output obtained from the CLI so that it includes dataflow traces.
- The `LOG_LEVEL` and `PYTEST_LOG_LEVEL` environment variables are no longer used by Semgrep to determine the log level. Semgrep only considers `SEMGREP_LOG_LEVEL`, as well as `PYTEST_SEMGREP_LOG_LEVEL` in Semgrep's Pytest tests.
- Fixed ecosystem used for Elixir from Mix to Hex.
- Fixed an issue with interfile diff scans where the removal of pre-existing findings
didn't work properly when adding a new file or renaming an existing file.
- **Extensions**: Semgrep waits longer for users to log in from the IDE.
- Upon completion `semgrep ci` sends a message to Semgrep AppSec Platform to mark the scan as completed.
- Fixed issue where `semgrep ci --oss-only` crashed when Semgrep Secrets was enabled.
- Fixed an issue where findings reopen after it was initially removed when findings metadata was changed.

## ⛓️  Supply Chain

### Added

- Added a new **Finding details** page. In Semgrep AppSec Platform, click on **Supply Chain > Details** on the specific finding's card. The finding details page displays an all triage activity, in-depth description of the vulnerability, remediation, and the rule pattern that generated the finding.  <!-- 13780 -->
-

### Changed

<!-- should we include the new UI for SCA  -->

- The Supply Chain page UX has been redesigned. Improvements include:
    - You can now filter by project, dependency, and CVE.
    - Updated reachability categories.
    - Vulnerabilities are now grouped by the rule that detected them.
    - Triage multiple vulnerabilities at once by clicking multiple <i class="fa-solid fa-square-check"></i> checkboxes. You can <kbd>Shift + click</kbd> to select a range.
    - Within the projects page, the count of reachable vulnerabilities counts only Always reachable <!-- 13645 -->

### Fixed

- Fixed an issue where tooltips for conditionally reachable vulnerabilities were not being displayed. <!-- 13775 -->


## 🤖 Semgrep Assistant


## 🔐 Semgrep Secrets

<!--
For Katie's draft
- Superseded rules
- Historical scans
- Custom rule-writing
-->

### Added

- Added ability to scan Git commits for leaked credentials.

### Fixed

- Fixed an issue where the **Secrets** page filters disappeared after users selected a single filter.
- Fixed an issue where users without access to Secrets could view Secrets policies.

## 📝 Documentation and knowledge base

### Added

- Added the following new documents:
    - [<i class="fa-regular fa-file-lines"></i> Semantic detection in Java](/semgrep-code/java) - describes how Semgrep reduces false positives through its understanding of the Java language.
    - [<i class="fa-regular fa-file-lines"></i> How to scan your Git history (beta)](/semgrep-secrets/historical-scanning).
    - [<i class="fa-regular fa-file-lines"></i> Write custom validators](/semgrep-secrets/validators)
    - Added two additional glossaries:
        - Static analysis and rule writing glossary
        - Semgrep Code glossary
- Added a new section for user management on **[Teams (beta)](/deployment/teams)**, an access control feature that enables administrators or managers to assign projects to specific team members.
- Expanded the documentation on [Semgrep Assistant's new features](/semgrep-assistant/overview).

### Changed

- Renamed occurrences of Semgrep Cloud Platform to Semgrep AppSec Platform.
- Edited the [Semgrep FAQ](/faq) for clarity and correctness.
- Renamed instances of Pro Engine to cross-file or interfile analysis.
- Rearranged documents under Semgrep Code to better reflect the user journey.
- Updated documentation on how Semgrep differentiates between **Fixed** and **Removed** statuses.
- Updated the sample [Bitbucket Pipelines CI configuration](/semgrep-ci/sample-ci-configs#bitbucket-pipelines) file
- Minor additions and updates:
    - How Semgrep computes [user limits across multiple orgs](/usage-and-billing).
    - Findings retention policy.
- The following knowledge base articles have been updated:
    - [Scan a monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts)
    - [Failed to run a Git command during a pull or merge request scan](/kb/semgrep-ci/git-command-errors)

### Fixed

- Fixed some broken links to redirect to the correct doc.
- Standardized the disuse of trailing slashes in docs URLs.

## 🔧 OSS Engine

The following versions of the OSS Engine were released in April 2024:

- [<i class="fas fa-external-link fa-xs"></i>1.68.0](https://github.com/semgrep/semgrep/releases/tag/v1.68.0)
- [<i class="fas fa-external-link fa-xs"></i>1.69.0](https://github.com/semgrep/semgrep/releases/tag/v1.69.0)
- [<i class="fas fa-external-link fa-xs"></i>1.70.0](https://github.com/semgrep/semgrep/releases/tag/v1.70.0)
