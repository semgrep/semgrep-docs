---
slug: april-2025
title: April 2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
hide_table_of_contents: false
date: 2025-04-30T10:00
---

# Semgrep release notes for April 2025

<!-- Remember to update index page -->
<!-- Remember to truncate the previous month -->

The following updates were made to Semgrep in April 2025.

## 🌐 Semgrep AppSec Platform

### Added

- Added the following information in the Semgrep API:
  - Rule author information under the `registry_source` field in the Semgrep API. For example, if the source or author of the rule is Semgrep, the value returned is `semgrep`. <!-- 20189 -->
  - CWE information.
  - OWASP categories.
  - Technology values, such as `bash` or `curl`.
- Semgrep Managed Scans now run when a pull request or merge request is reopened.
  
### Changed

- Jira labels can now support special characters.

### Fixed

- Various fixes and improvements to Teams (role-based access control).

## 💻 Semgrep Code

### Added

- Added a new ruleset to detect **unauthorized** use of AI or LLM libraries, that is, the use of AI without going through security reviews or approval processes. This includes direct API calls, such as `api.openapi.com`, `api.anthropic.com` and libraries in code such as `langchain` and `transformers`. See the [<i class="fas fa-external-link fa-xs"></i> Semgrep Shadow AI](https://semgrep.dev/shadowAI) page to learn more.

## ⛓️ Semgrep Supply Chain

### Added

- [SBOM export through the Semgrep API](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/semgrep_app.products.sca.handlers.sbom.openapi_create_sbom_export) is now generally available.
- [Malicious dependency detection](/semgrep-supply-chain/malicious-dependencies) is now in **public beta**. Semgrep enables you to block pull requests (PRs) or merge requests (MRs) introducing these dependencies. You can also filter for malicious dependency findings, which assists in identifying and removing these dependencies.
- Added support for PR comments warning users that they may be adding malicious dependencies. <!-- 20447 -->
- **Upgrade guidance** and **click to fix** are now in **private beta** for users with Python projects hosted by GitHub.com and with Semgrep Assistant enabled. With upgrade guidance and click to fix, Supply Chain analyzes your project to surface breaking changes that you must fix as part of a version upgrade. Semgrep AppSec Platform provides you with a one-click option that opens a pull request to:
    1. Upgrade the dependency to a safe version.
    2. Lets the developer know if the upgrade is safe or if there are breaking changes and what those changes are.
- **Transitive reachability** is now in **private beta**. For JavaScript projects, Semgrep reachability now extends to transitive dependencies.

### Changed

- Increased the rate limit for SBOM exports through the Semgrep API.
- Improved Supply Chain PR comments by adding separate templates for conditionally reachable and always reachable findings, as well as manual review advice for conditionally reachable findings. <!-- 20446 -->
- Improved the user introduction to Supply Chain to focus on reachable findings. <!-- 20290 --> 
- Improved the **Supply Chain > Details** page. <!-- 20236 -->

## 🤖 Semgrep Assistant

### Added

- Semgrep Assistant now attempts to create a memory during triage if possible. If Semgrep creates a memory, you'll see a dialog appear, indicating that this has happened, along with a link to the list of your organization's memories for review.
- Assistant Memories v2 is now in **private beta**:
  - Managing memories in Semgrep AppSec Platform now occurs under **Policies**, not **Settings**.
  - Semgrep AppSec Platform displays data on the scope and impact of memories, including the number of findings affected and which findings affected
  - Assistant now provides **suggested memories**, which are those that Assistant has generated based on your past triage actions. You can view these memories at any time in Semgrep AppSec Platform by navigating to **Rules & Policies > Assistant Memories > Suggested**. For each suggestion, you can choose one of the following actions:
    - Activate the suggested memory to inform Assistant's future advice.
    - Edit the memory, then activate it.
    - Delete the memory.

## 🔐 Semgrep Secrets

### Fixed

- Fixed an issue where Semgrep AppSec Platform didn't display the correct number of Secrets findings in the navigation bar.

## 📝 Documentation and knowledge base

### Added

- Semgrep release notes are now available through RSS. You can subscribe to the:
  - [<i class="fa-solid fa-rss"></i> Semgrep release notes feed](https://semgrep.dev/docs/release-notes/rss.xml).
  - [<i class="fa-solid fa-rss"></i> Semgrep product updates feed](https://semgrep.dev/products/product-updates/rss/).
- Added information about:
  - Semgrep Assistant's model providers.
  - Code security measures for managed scans.
  - Supported languages for `metavariable-type` rules operator
  - `metavariable-name` operator.

### Changed

- Minor updates to the Supported Languages documentation.
- Minor fixes to the following product features:
  - Assistant auto-triage.
  - Dataflow analysis in Semgrep AppSec Platform.
  - Managed scans for Azure DevOps projects.
  - `.semgrepignore`.

### Fixed

- Minor typo fixes and UI updates.

## 🔧 OSS Engine

The following versions of the OSS Engine were released in April 2025:

* [<i class="fas fa-external-link fa-xs"></i>1.117.0](https://github.com/semgrep/semgrep/releases/tag/v1.117.0)
* [<i class="fas fa-external-link fa-xs"></i>1.118.0](https://github.com/semgrep/semgrep/releases/tag/v1.118.0)
* [<i class="fas fa-external-link fa-xs"></i>1.119.0](https://github.com/semgrep/semgrep/releases/tag/v1.119.0)
* [<i class="fas fa-external-link fa-xs"></i>1.120.0](https://github.com/semgrep/semgrep/releases/tag/v1.120.0)
