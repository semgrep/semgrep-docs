---
slug: march-2026
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: March 2026
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for March 2026


The following updates were made to Semgrep in March 2026.

<!-- truncate -->

## 🌐 Semgrep AppSec Platform

### Added

- AI-powered detection is now available as a beta feature. Organizations using Semgrep Multimodal have AI-powered detection enabled by default.
- Autofix is now in beta for Semgrep Code, extending AI-generated draft pull requests (PRs) to Code findings in addition to Supply Chain findings.
- Semgrep is now available as a Cursor and Claude Code plugin, providing automatic security scanning for Code, Supply Chain, and Secrets on every file.
- Added **Duplicate** as a triage reason for findings when multiple rules identify the same issue or when the same issue is tracked elsewhere.
- Findings can be linked to an existing ticket URL or have linked tickets removed when a ticketing integration is configured. Linking a ticket replaces any existing ticket associated with the selected findings.

### Changed
- Click to Fix has been renamed Autofix.
- On the **Rules & Policies > Policies** page, the **Projects scanning** column now replaces the previous global on/off toggle. You can scope each rule to all projects, selected projects or tags, all projects with exceptions, or disable the rule for all projects. A drawer provides project search, filters, and bulk selection.
- **Billing & Usage** updates: 
  - When a deployment enforces AI credit limits, Semgrep AppSec Platform now shows alerts for low or exhausted credits and disables all AI features. If enforcement is off, these credit indicators stay hidden.
  - Contributor counts reflect the last 90 days of activity, instead of 30.
  - Billing timezones default to UTC for new organizations on usage-based billing.
- The **Findings** page now loads code snippets after the main finding details. Slow or unavailable source code managers are less likely to block the page or cause timeouts.
- Simplified GitHub onboarding by requiring only a single GitHub App installation instead of two. Existing users can now uninstall the public GitHub App if previously installed.
- GitHub.com source code manager connections can now be added without requiring GitHub SSO login, and users can connect multiple GitHub organizations.
- Improved member invite emails so invitations clearly require authorization through your login methods.
- Package registry integration settings under **Settings > Integrations > Registry** now include an option to use the Semgrep Network Broker when a registry is only reachable through your private network.
- Improved load times for the **Projects** page, **Policies** registry search, and source code repository sync for large deployments.
- Added support for agentic hooks in Windsurf IDE.

### Fixed

- Fixed a security vulnerability in SAML login handling, application container run web services, and read-only permissions. 
- With RBAC enabled, read-only users can no longer trigger scans from the Semgrep AppSec Platform or API.
- Added server-side validation to enforce the 3,000-character limit for triage notes across all API endpoints.
- Fixed findings links across Semgrep products so shared URLs, bookmarks, dashboard shortcuts, and notification links preserve the correct branch and tab context.
- Fixed **Settings** page scroll behavior so top-level tabs stay visible after load.
- Fixed an issue where invalid webhook configurations would cause the **Integrations** page to become unusable.
- The **Enable Secrets** button now links to the correct **Settings** page.
- Fixed an issue where custom policies with no rules assigned would cause the **Policies** page to load indefinitely.
- Fixed an issue where the **Policies** page would crash when rulesets contained soft-deleted rules.
- Fixed an issue where filtering by rule mode on the **Code Findings** page would break the project filter, causing findings from all projects to appear.
- Fixed **Findings** page scroll when nested lists were still collapsed.
- Fixed an issue where findings with the status **Reviewing** had no action to continue triage. **Mark as open** in the finding menu sets the finding to **Reopened**.
- Fixed an issue where OpenID Connect SSO login could fail after recent provider updates that require the `iss` parameter.
- Fixed an issue where Slack notifications were missing merge request hyperlinks for self-managed GitLab instances with custom domain names.
- Fixed an issue where API errors could lead to the RBAC enablement screen incorrectly being displayed for deployments that already had RBAC enabled.
- Fixed an issue where Azure DevOps Cloud was incorrectly classified as an on-premise source code manager, causing incorrect warnings and blocking setup for valid cloud configurations.
- Fixed an issue where automatically setting up the same repository in multiple Semgrep projects could trigger duplicate diff-aware scans. Semgrep now auto-configures diff-aware scans only for the first linked project. Additional linked projects continue to receive automatic full scans, and diff-aware scans can still be configured manually.
- Fixed an issue where bulk ignore required a comment when changing **provisionally ignored** findings to **ignored**, even though a comment is optional.
- Added validation to reject bulk triage API requests that provide neither `issue_ids` nor filter criteria, preventing accidental triage of all findings.
- Fixed an issue where bulk ignore required a comment before you could submit when changing **provisionally ignored** findings to **ignored**, even though a comment is optional for that action.
- Fixed several issues with AI credits billing and usage:
  - AI credits no longer show as zero on **Billing & Usage** when there are active credit grants.
  -AI credits are no longer counted more than once for organizations with multiple licenses.
  - AI credits no longer expire before the subscription ends for prorated or multi-year plans.


## 💻 Semgrep Code

### Added
- The **Code** page now shows AI-powered detection findings and rule-based scan findings, with filters to help you view each type separately.
- Added beta support for PowerShell.

### Changed

- Updated Kotlin tree-sitter parser to the latest grammar.
- **Scala**: improved taint tracking through lambda calls and cross-file tracking for globals, and improved type and call resolution.

### Fixed
- Fixed the finding's **Details** page so the **Rule-defined fix** tab also appears for rules that define a regex-based fix, not only rules that use a standard `fix` field.
- Fixed path filtering when scanning single files to correctly match project-relative patterns like `/src/test/**/*.java`.
- Fixed various parsing issues in Rust, Python, and Kotlin.
- Improved error reporting by reporting target file discovery errors as warnings instead of silently ignoring them.

## ⛓️ Semgrep Supply Chain

### Added

- Dependency scanning for Java and Kotlin projects **without lockfiles** is now in public beta. Maven, Gradle, Artifactory, Nexus Cloud, and on-premises source code managers are supported.
- Added an admin-only API endpoint that allows you to re-run upgrade requirements analysis for Supply Chain findings. Each request can include up to 10 issues.

### Changed

- Supply Chain dependency search includes an **Exact match** option so you can use strict package-name matching or substring-style matching.
- Added **Autofix** filters to the Supply Chain findings. Supply Chain Autofix PRs and MRs now display detailed descriptions.
- Supply Chain finding **Details** pages now show reachability in only one place instead of twice.
- Simplified **Upgrade Guidance** filters on Supply Chain findings. **Breaking** is now a single filter that matches any breaking-change type.
- Disabling Semgrep Multimodal turns off Supply Chain Upgrade Guidance, so it is not left enabled without model providers; dependency processing also skips starting Upgrade Guidance when no AI providers are configured.
- Supply Chain periodically refreshes cached dependency license metadata from upstream sources so license identifiers stay closer to current System Package Data Exchange (SPDX) data.
- Supply Chain analysis of npm package lock files now uses a proprietary parser and is available only to Semgrep Pro users.

### Fixed

- Fixed an issue where Supply Chain **Autofix** selected the wrong workflow when the ecosystem set from the browser did not match the ecosystem on the finding from the scan.
- Fixed an issue where the custom dependency exception modal would not accept version numbers without a patch component, for example `1.19`, blocking exceptions for packages that don't follow strict semantic versioning.
- Fixed an issue where searching for dependencies with special characters, like `:`, in their names would fail with an error.
- Fixed an issue where the **Safe** Upgrade Guidance filter would incorrectly include findings with no Upgrade Guidance available.
- Fixed a security issue with the Supply Chain upgrade requirements API endpoint.
- Fixed a security issue in the Supply Chain dependency path API endpoint.
- Fixed `requirements.txt` parser silently dropping pinned dependencies that followed unpinned package names.

## 🤖 Semgrep Multimodal

- Semgrep Assistant is now Semgrep Multimodal. The terminology has been updated throughout the interface to better reflect its AI-powered capabilities.

### Fixed

- Fixed **Suggested memories** failing to load for memories created from PR and MR triage comments.

## 🔐 Semgrep Secrets

### Changed

- Semgrep secret validation now times out after 30 seconds instead of 15 minutes. This timeout is configurable via the `--secrets-timeout` flag.

## 📝 Documentation and knowledge base

### Changed

- The [v1 API reference](https://semgrep.dev/api/v1/docs/) now documents request bodies for **POST**, **PUT**, and **PATCH** operations instead of showing those inputs as query parameters. **GET** and **DELETE** behavior in the reference is unchanged.

## 🔧 OSS Engine

- The following versions of the OSS Engine were released in March 2026:
  - [<i class="fas fa-external-link fa-xs"></i>1.155.0](https://github.com/semgrep/semgrep/releases/tag/v1.155.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.156.0](https://github.com/semgrep/semgrep/releases/tag/v1.156.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.157.0](https://github.com/semgrep/semgrep/releases/tag/v1.157.0)
