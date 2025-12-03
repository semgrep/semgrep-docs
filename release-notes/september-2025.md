---
slug: september-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: September 2025
tags:
 - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
 # Semgrep release notes for September 2025

The following updates were made to Semgrep in September 2025.

<!-- truncate -->

## 🌐 Semgrep AppSec Platform

### Added

- Added the ability to filter Secrets findings by branch.
- Added a confirmation pop-up when switching between the **Production** and **Pre-production** views.

### Changed

- **Jira**: the Semgrep Jira integration now automatically creates Jira tickets for Semgrep Code and Semgrep Secrets findings with a **critical** severity level.

### Fixed

- **Jira**: Team information now loads when the user attempts to map to the **Team** custom field.
- Supply Chain's **Advisories** filter now filters based on the correct field.
- Fixed the handling of invalid GitHub refresh tokens. If a user's GitHub refresh token is invalid, Semgrep prompts the user to log in again.
- Minor UI fixes.

## 💻 Semgrep Code

### Added

- Added the `semgrep mcp` subcommand to the Semgrep CLI tool, which runs the Semgrep MCP server. 
- Improved pre-filtering for taint rules, primarily when taint labels are used.
- **Scala**: Added support for method dispatching through traits.
- **TypeScript**: improved name resolution for destructuring parameters.

### Changed

- The Semgrep MCP server repository has been moved from [semgrep/mcp](https://github.com/semgrep/mcp) to [semgrep/semgrep](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp).
- Updated `semgrep-interfaces` to accept only valid language keys for rules in Semgrep Editor.
- Semgrep now filters `SEMGREP_APP_TOKEN` from any request made to non-Semgrep URLs passed to `-f/-c/--config` when fetching configurations and rules.
- **Python**: Fixed an issue involving the resolution of implicit namespace modules.
- **TypeScript**: 
  - Fixed an issue where the pattern `var $X = $FUNC($REQ, $RES, ...) {...}` didn't parse correctly.
  - Improved the performance of `tsconfig.json` matching for TypeScript projects that contain multiple `tsconfig.json` files.

### Fixed

- Glob patterns containing `\#` or `\` in `.semgrepignore` and included `.gitignore` files are now interpreted correctly.
- Updated `opentelemetry-*` packages to remove `pkg_resources is deprecated` warnings.
- **Dart**: Fixed an issue in language processing to return better results.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain's reachability analysis now covers all high severity CVEs from supported sources starting from 2017 for **JavaScript** packages.

## 🔐 Semgrep Secrets

### Added

- [Slack notifications for Semgrep Secrets](/semgrep-appsec-platform/slack-notifications#secrets) is now publicly available.

## 📝 Documentation and knowledge base

### Added

- Added instructions for [connecting Semgrep to GitHub Enterprise Cloud with data residency](/deployment/connect-scm#github-enterprise-cloud-with-data-residency).
- Added the following knowledge base articles:
  - [Why can't I access my Semgrep organization after logging in with GitHub?](/kb/semgrep-appsec-platform/cannot-access-semgrep-after-github-login)
  - [Why are my projects showing a status of "Not yet started" after I enable Managed Scans?](/kb/semgrep-appsec-platform/projects-not-yet-started-sms)
  - [Remove users from your Semgrep AppSec Platform organization](/kb/semgrep-appsec-platform/remove-users)

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in September 2025:
  * [<i class="fas fa-external-link fa-xs"></i>1.135.0](https://github.com/semgrep/semgrep/releases/tag/v1.135.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.136.0](https://github.com/semgrep/semgrep/releases/tag/v1.136.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.137.0](https://github.com/semgrep/semgrep/releases/tag/v1.137.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.138.0](https://github.com/semgrep/semgrep/releases/tag/v1.138.0)
