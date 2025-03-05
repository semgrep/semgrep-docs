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
- A new **My teams** view for managers is now in private beta. To join this beta, reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com). This view enables managers to view all the teams they are a manager of.

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
  - Semgrep Pro rules, which are included in p/default, have been updated to use this new severity level.
- New rules for JavaScript and TypeScript have been added to Semgrep's default ruleset, `p/default`. The new rules cover the OWASP Top 10 and the most popular server-side frameworks, like Express, NestJS, Hapi, and Koa.
-  Cross-file (interfile) analysis now processes JavaScript and TypeScript files together, so that dataflow can be tracked across both languages.

### Changed

- Improved detection for JavaScript and TypeScript dependency injection, import resolution, and dataflow through callbacks.
- Upgrade from OCaml 4.14.0 to OCaml 5.2.1 for Semgrep PyPI and Homebrew distributions. Note that Docker images have been built with OCaml 5.2.1 since Semgrep 1.107.0.

### Fixed

## ⛓️ Semgrep Supply Chain

### Added

- You can now [configure policies](/semgrep-supply-chain/policies) for Supply Chain findings. These policies let you set certain conditions by which developers are notified of findings through a PR or MR comment, or potentially blocked from merging a PR or MR.
    - For example, you can create a policy to block a PR or MR from merging when a reachable finding with an available fix (upgrade) is detected.
    - Policies can have different scopes, which are the projects or project tags the policies are applied to.
- Updated `Package.swift` parser to support:
  - The url value in a `.package` entry doesn't have to end with `.git`
  - You can have an exact field that looks like `exact: "1.0.0"` instead of `.exact("1.0.0")`
  - The exact version can be an object like `Version(1,2,3)` instead of a string
  - You can have `.package` values with no URL, like this: `.package(name: "package", path: "foo/bar")`
- Semgrep can now dynamically resolve dependencies for Python projects using pip, allowing it to determine transitive dependencies automatically. 
- Various parser updates for SwiftPM and Yarn.
      
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
    - [View Semgrep findings in Wiz's Security Graph](/semgrep-appsec-platform/wiz).
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
