---
slug: august-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: August 2024
tags:
  - Release notes
---

# Semgrep release notes for August 2024

## 🌐 Semgrep AppSec Platform

### Added

- A new **primary branch** feature is now generally available (GA)! This feature enables you to set your repository's default branch. Previously, Semgrep automatically detected primary branches through a list of common names, such as `main` or `master`, but now you can set it to any unique name your organization may use, such as `prod-1`. [Read the documentation](/deployment/primary-branch).
- **Semgrep Managed Scans**: You can now view logs of all scans by going to the project's **Details** page.
- **Projects > Details page**: For projects using Semgrep in CI, you are now able to view the job log for a particular scan <!-- 15974 -->
- Automatic Jira ticket creation is now available to all Jira beta participants <!-- 16182 -->
- Added initial page state for **Project > Details > Scans** tab. <!-- 15805 -->

### Changed

- Various improvements and updates to the Semgrep pricing page. <!-- 16210 -->
- Improvements to tooltips, help text, and icons in the **Projects** and **Findings** pages. <!-- 16246, 16186, 16058 -->
- **Semgrep Managed Scans**: Improved error messages to users when clicking **Run a new scan** from the **Projects > Details** page. Now users are better equipped to troubleshoot issues with managed scans. <!-- 16025 -->

### Fixed

- Fixed a bug which prevented error messages from appearing in tooltips when Jira tickets failed to be created. Now, users can see detailed error messages letting them know what went wrong when a Jira ticket is not successfully created through Semgrep. <!-- 16259 -->
- Fixed a regression in which clicking outside of the **Findings** page filter component did not clear all filters.
- Various copy edits to the Dashboard (beta) page. <!-- 16176 -->

## 💻 Semgrep Code

### Added

### Changed

### Fixed

## ⛓️ Semgrep Supply Chain

### Added
- EPSS scores

### Changed

### Fixed


## 🤖 Semgrep Assistant

### Added

- Assistant Memories
- BYO API key
- Assistant remediation in API

### Changed

### Fixed

## 🔐 Semgrep Secrets

### Added

New UI
Secrets is no longer self serve

### Changed

- no longer display file snippets

### Fixed

## 📝 Documentation and knowledge base

### Added

- Documentation for providing your own OpenAI API key.
- EPSS documentation.
- Sections for various source code manager improvements, such as:
  - Support for multiple GitHub Enterprise Server organizations.
  - MR comments for multiple GitLab groups.
- Documentation specifying which features make use of the IP addresses that you must add to your allowlist when you deploy Semgrep.

### Changed

- Various improvements to the Network broker documentation, such as:
  - Improved logging documentation.
  - Clarified variable names and placeholder values that users should replace.
- Various updates to Editor documentation as a whole.
- Various updates to Semgrep Assistant documentation.
- Updated Semgrep Supply Chain documentation to reflect the latest product UI/UX state.

### Fixed

- Updated and fixed various broken links.
- Minor typographical fixes.

### Removed

- Removed the Ticketing page; Semgrep supports Jira exclusively and other ticketing integration betas have been closed. Semgrep may reopen betas for future ticketing integrations.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in August 2024:
  * [<i class="fas fa-external-link fa-xs"></i>VERSION](https://github.com/semgrep/semgrep/releases/tag/VERSION)
