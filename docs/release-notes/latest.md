---
slug: latest
append_help_link: true
title: Latest release notes
hide_title: true
description: Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for June 2024

## 🌐 Semgrep AppSec Platform

### Added

- The Semgrep **Jira integration** is now in **public beta**. Create Jira project tickets from Semgrep AppSec Platform and configure mappings from Semgrep fields to Jira fields. Read the [Jira integration documentation](/semgrep-appsec-platform/jira#enable-the-jira-integration) to learn more.
  - Assistant remediation guidance is now available in Jira tickets you create. <!-- 14994 -->
  - Added a red Jira ticket icon in the **Findings** page to make it clear when Jira ticket creation fails.  <!-- 14835 -->
- The onboarding checklist modal now expands automatically to show more items when you first sign in to Semgrep AppSec Platform. <!-- 14987 -->
- You can now sort projects by name and latest scan by navigating to the **Projects** page and clicking the arrow next to their respective headers. <!-- 14923 -->
![Arrows used to sort projects by name and latest scan.](/img/release-notes-project-sorting.png#bordered)
- **Playground**: Added the `fix` key to structure mode.
- Added a setup page for Semgrep Managed Scanning. New users are now able to create a source code manager when setting up managed scans for the first time.
- Added the ability [to define separate path ignores lists](/ignoring-files-folders-code#define-ignored-files-and-folders-in-semgrep-appsec-platform). Users can now define one for Semgrep Code and Supply Chain and another for Semgrep Secrets.
- Added two additional triage states for all Semgrep products:
  - Reviewing
  - Fixing

### Changed

- Updated the **Settings > Integrations** tab with the latest supported integration information. <!--15042 -->

### Fixed

- Previously, users whose access token had expired found themselves redirected back and forth between `/login` and `/orgs/-`, ultimately navigating them to `/login`. This issue has been fixed and the user is now properly redirected based on the state of the access token.

## 💻 Semgrep Code

### Added

- Added support for the `--subdir` command, which enables scanning monorepos in parts. `--subdir` accepts the path to a subdirectory, then runs Semgrep only on the specified subdirectory and ensures that the file links displayed in Semgrep AppSec Platform are correct.
- Added traces to help debug the performance of tainting. To send traces added in the PR, pass `--trace` and set the environment variable `SEMGREP_TRACE_LEVEL=trace`. To send traces to a local endpoint instead of Semgrep's default endpoint, use `--trace-endpoint`.

### Changed

- Removed URLs at the end of logs generated whenever `semgrep ci --dryrun` is run. Dry runs occur locally without results uploaded to Semgrep AppSec Platform, so the URL is unnecessary.

### Fixed

- Fixed an issue that caused findings to be flagged as **Untriaged** and display the message, "Untriaged by Semgrep because a related issue was untriaged."
- Fixed an issue with **last seen** scan dates when projects are scanned with individual products, such as Code and Supply Chain, not simultaneously.

## ⛓️  Semgrep Supply Chain

### Added

- You can now disable Supply Chain PR comments for reachable findings. Navigate to **Settings > Deployment**, and within the **Supply Chain** section, click the <i class="fa-solid fa-toggle-large-on"></i> **PR/MR Comments** toggle.

### Changed

- The Supply Chain > **Advisories** tab search box now allows you to search by CVE number, such as `CVE-2023-44487`, or GitHub Security Advisory (GHSA) ID.

### Fixed

- Clicking the **Clear filters** button in **Supply Chain > Vulnerabilities** now clears all filters correctly. <!-- 15004 -->

## 🤖 Semgrep Assistant

### Added

- Added the Assistant **Analyze** button to Semgrep Code's **Finding Details** page so that users do not have to return to the **Findings** page to trigger Assistant actions.
- Assistant features have been added to the Jira integration. See [Semgrep AppSec Platform](#-semgrep-appsec-platform) for more information.

### Fixed

- Fixed an issue with Assistant causing long wait times for analysis results.

## 🔐 Semgrep Secrets

### Added

- Added a pop-up confirmation in Semgrep AppSec Platform that enabling historical secrets results in longer scan times.

### Changed

- Changed the details page for Secrets findings to match findings identified by Semgrep Code and Semgrep Supply Chain.
- Changed Secrets findings to rely on the findings severity instead of rule severity, since a validator can override the latter value.

### Fixed

- Fixed an issue where Semgrep Code incorrectly ran alongside Semgrep Secrets. This occurred when there were files that:
  - Should be scanned by Semgrep Secrets but ignored by Semgrep Code, and
  - Contained Python functions with annotations ending in `endpoint`, `route`, `get`, `patch`, `post`, `put`, `delete`, `before_request`, or `after_request`

## 📝 Documentation and knowledge base

### Added

- Added the following new documents, articles and sections:
  - [Why didn't Semgrep ignore the files and folders in the Secrets Path ignores for this project?](http://localhost:3000/docs/kb/semgrep-secrets/per-product-ignore-not-working)
  - [How to paginate responses from the Semgrep API](/kb/integrations/pagination)
  - [The `semgrep login` command doesn't redirect to my Semgrep tenant site](/kb/semgrep-appsec-platform/semgrep-login-cli-tenant)
  - [What does "Act on your behalf" mean?](/kb/semgrep-appsec-platform/act-on-your-behalf)
- Various documentation presentation updates.
- Added a [list of default branch names](/semgrep-code/glossary#default-branch) that Semgrep uses to identify trunk or mainline branches.

### Changed

<!-- 15039 -->
- Revised the definitions for the following fields in the API documentation:
  - State
  - Status
  - Triage state
- Major updates have been made to the following documentation:
  - [Create Jira tickets](/semgrep-appsec-platform/jira)
  - [Pro rules](/semgrep-code/pro-rules)
  - [Notifications](/semgrep-appsec-platform/notifications)
- Updated [webhook samples](/semgrep-appsec-platform/webhooks#semgrep-findings-object).
- Site look and feel: minor cosmetic improvements.

### Fixed

- Fixed various broken links.
- Various troubleshooting documents have been restored and re-edited for clarity and quality.

## 🔧 Semgrep OSS Engine

The following versions of Semgrep OSS Engine were released in June 2024:

- [<i class="fas fa-external-link fa-xs"></i>1.75.0](https://github.com/semgrep/semgrep/releases/tag/v1.75.0)
- [<i class="fas fa-external-link fa-xs"></i>1.76.0](https://github.com/semgrep/semgrep/releases/tag/v1.76.0)
- [<i class="fas fa-external-link fa-xs"></i>1.77.0](https://github.com/semgrep/semgrep/releases/tag/v1.77.0)
- [<i class="fas fa-external-link fa-xs"></i>1.78.0](https://github.com/semgrep/semgrep/releases/tag/v1.78.0)
