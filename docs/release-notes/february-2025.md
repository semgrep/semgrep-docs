---
slug: february-2025
title: February 2025
hide_title: true
description: >-
 Release notes include the changes, fixes, and additions in specific versions of Semgrep.
tags:
 - Release notes
---

# Semgrep release notes for February 2025

## 🌐 Semgrep AppSec Platform

### Added

- Semgrep Managed Scans for repositories hosted by **Bitbucket Cloud** is now in public beta.
- You can now manage enrollment in Semgrep Managed Scans through the Semgrep API's `/project` and `/project/managed-scan` endpoints.

### Changed

- The Semgrep AppSec Platform-specific metadata fields `semgrep.dev:` and `semgrep.policy:` are now filtered from the JSON output if you aren't signed into your Semgrep account. See [Semgrep JSON and SARIF fields](https://semgrep.dev/docs/semgrep-appsec-platform/json-and-sarif#json) for more information.
- The Semgrep Docker image has been updated to use Python 3.12 and OCaml 5.2.1.
- **CLI**: The output generated from running `semgrep ci --help` no longer includes information about experimental features and flags.
- **Jira**: Jira tickets for Supply Chain findings now display recommended versions of packages in the description.

### Fixed

- Fixed an issue in Semgrep Editor's Structure Mode where some of the larger language icons overlapped due to limited space.
- Fixed an issue where the instruction links for adding a CI job all lead to GitHub-specific instructions.
- Fixed an issue where the Median Open Age chart didn't display all relevant findings.
- Fixed an issue where Semgrep scans did not complete if there were failures involving `git worktree remove`; instead of erring out, Semgrep completes the scan, but logs the error.

## 💻 Semgrep Code

### Added

- Added support for **Critical** severity level to denote the highest level of severity for a Code finding. You can now filter by Critical severity level in Semgrep AppSec Platform, and you can identify rules that generate critical severity findings by the red circle <i class="fa-solid fa-circle"></i> badge. 

### Changed

### Fixed

## ⛓️ Semgrep Supply Chain

### Added

### Changed

### Fixed

## 🤖 Semgrep Assistant

### Added

- Semgrep Assistant is now available for users with repositories hosted by Bitbucket Cloud and Azure DevOps.

### Changed

- Extended the amount of time for which the error message is shown if Assistant can't parse or save a memory you provide. This error message includes a link to edit the memory.

### Fixed

- Fixed an issue with the Assistant Analyze button on Semgrep Code's Findings page hiding after analysis.
- Fixed an issue where remediation guidance included secret key values if present in the source code.

## 🔐 Semgrep Secrets

### Added

- Added support for **Critical** severity level to denote the highest level of severity for a Secrets finding. You can now filter by Critical severity level in Semgrep AppSec Platform, and you can identify rules that generate critical severity findings by the red circle <i class="fa-solid fa-circle"></i> badge. 

### Changed

### Fixed

## 📝 Documentation and knowledge base

### Added

- Added the following new documents, articles, and sections:
    - [View Semgrep findings in Wiz's Security Graph](/kb/integrations/wiz).
    - [JavaScript frameworks and analyses](/languages/javascript).
    - [Triage findings through PR comments with repositories hosted by Azure DevOps and Bitbucket Cloud](/semgrep-code/triage-remediation#triage-findings-through-pr-and-mr-comments).

### Changed

- Major updates to [Contributing documentation](/contributing/contributing) and information about the [Semgrep Registry](/semgrep-code/glossary#registry-semgrep-registry).
- Minor clarifications involving:
  - Network Broker usage.
  - Required scopes for Managed Scans of Azure DevOps repositories.
  - Semgrep's Jira integration.
  - Supported languages.
- Reorganization of Semgrep Assistant documentation.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in February 2025:
  * [<i class="fas fa-external-link fa-xs"></i>v1.107.0](https://github.com/semgrep/semgrep/releases/tag/v1.107.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.108.0](https://github.com/semgrep/semgrep/releases/tag/v1.108.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.109.0](https://github.com/semgrep/semgrep/releases/tag/v1.109.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.110.0](https://github.com/semgrep/semgrep/releases/tag/v1.110.0)
