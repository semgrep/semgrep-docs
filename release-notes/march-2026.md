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

## 🌐 Semgrep AppSec Platform

### Added

- AI-powered detection scanning is now available as a public beta feature to all customers. Organizations using Semgrep Multimodal have AI Detection enabled automatically. To enable or disable AI Detection, use the toggle in Settings under **Code** (SAST).
- Semgrep is now available as a Cursor and Claude Code plugin, providing automatic security scanning for SAST, Supply Chain, and Secrets on every file modified by AI agents.
- Autofix is now in public beta, providing AI-generated fix suggestions and automated pull requests for SAST and Supply Chain findings. 
  - Code Autofix supports all languages on GitHub Cloud.  
  - Supply Chain Autofix supports Python and JavaScript on GitHub Cloud and GitLab Cloud.
- Added API endpoints to link findings to existing Jira tickets or remove existing links programmatically.
- Added file path filtering to findings pages.
- Added a **Duplicate** triage reason for findings when multiple rules surface the same issue, including overlapping AI-powered and rule-based results. 
- Exception request activity, created, approved, and rejected, now appears in the finding timeline for better audit visibility.
- Added exclusion support to automation scope configuration, allowing users to define automations that apply to all projects or tags except specified ones.


### Changed

  - Code and AI-powered detection findings appear in the Code tab.
  - Use filters to filter findings by AI-powered detection or rule-based detection. 
- Click to Fix has been renamed to Autofix across the product.
- Improved performance of the Projects page by optimizing how finding counts are loaded, resulting in faster load times for large deployments.
- Improved performance of the Findings page by optimizing how code snippets are loaded, ensuring the page loads quickly.
- Contributor counts on the **Billing & Usage** page now reflect the last 90 days of activity instead of 30 days.
- Sandbox and proof-of-value deployments can be provisioned with no end date for subscriptions or AI credits.
- Improved performance of registry search, resulting in faster load times for the **Policies** page and public registry.
- Simplified GitHub onboarding by requiring only a single GitHub App installation instead of two. Existing users can now uninstall the public GitHub App if previously installed.
- GitHub Cloud source code manager connections can now be added without requiring GitHub SSO login, and users can connect multiple GitHub.com organizations.
- Improved clarity in the member invite flow to better explain that invitations do not grant access automatically and users still need authorization through configured login methods.
- Member invite emails now link directly to the join flow with the target organization pre-filled.
- Redesigned the Automations form: compact layout, multiselect condition values, and streamlined action configuration.
- Improved exception request approval workflow to combine both the requester's and approver's notes into the issue's triage note for better context and audit visibility.
- Improved page load performance for deployments with customized saved views.
- Usage settings links for users without appropriate permissions are now hidden.
- Improved the workflow selector on **Admin > Workflows** with search by workflow name and description and a scrollable dropdown for long lists.
- ==The **AI Billing** admin panel now shows cached billing block status and includes an action to invalidate billing cache entries for a deployment.==

### Fixed

- Fixed an issue where team onboarding could fail when soft-deleted users were incorrectly included in team membership.
- Fixed an issue where long filter dropdown menus could not be scrolled to view all available options.
- Fixed an issue where the BatchGetRules API endpoint could return rules from all deployments a user belonged to instead of only the requested deployment.
- Fixed an issue where the Invite users action remained enabled for personal GitHub App installations, where organization member invites are not supported.
- ==Added server-side validation to enforce the 3,000 character limit for triage notes across all API endpoints, ensuring consistency with the frontend limit==.
- Fixed an issue where Slack notifications were missing merge request hyperlinks for self-managed GitLab instances with custom domain names.
- Fixed an issue where OpenID Connect SSO login could fail after recent provider updates that require the `iss` parameter.
- Fixed a scrolling issue in the Add condition dropdown in the Automations form.
- ==Fixed a security issue where users with read-only permissions could bypass restrictions by uploading scan results via the CLI==.
- Added validation to limit exception request notes to 1,250 characters to ensure combined approval triage notes remain within display limits.
- Fixed an issue where the "Retry setup" button could incorrectly appear for repositories that already had scans in progress or completed.
- Fixed an issue where bulk triage API requests with incorrect field names, such as `finding_ids` instead of `issue_ids`, would silently fail instead of returning a clear error message.
- ==Fixed a security vulnerability in SAML login handling that could allow cross-site scripting (XSS) attacks==.
- Added validation to reject bulk triage API requests that provide neither `issue_ids` nor filter criteria, preventing accidental triage of all findings.
- Fixed an issue where bulk ignore required a comment before you could submit when changing **provisionally ignored** findings to **ignored**, even though a comment is optional for that action.
- Fixed an issue where filtering by rule mode on the Code findings page would break the project filter, causing findings from all projects to appear.
- Fixed an issue where custom policies with no rules assigned would cause the **Policies** page to load indefinitely.
- Fixed an issue where tooltips would not appear when hovering over info icons next to toggle switches on the **Reporting** and **Playground** pages.
- Fixed an issue where invalid webhook configurations would cause the **Integrations** page to become unusable.
- Fixed an issue where Azure DevOps Cloud was incorrectly classified as an on-premises source code manager, causing incorrect warnings and blocking setup for valid cloud configurations.
- Fixed an issue where API errors could incorrectly display the RBAC enablement screen for deployments that already had RBAC enabled.
- Fixed an issue where the custom rule editor would display stale information in the header and policy UI after saving rule changes until the page was manually refreshed.
- Fixed an issue where the **Policies** page would crash when rulesets contained soft-deleted rules.
- Fixed an issue where the "Enable Secrets" button linked to a 404 page instead of the correct Settings page.
- Fixed an issue where findings marked with the "duplicate" tag were not being counted correctly in the Ignored findings view.
- Fixed an issue where linking the same source code repository to multiple Semgrep projects triggered redundant diff scans on pull requests during automatic setup. Only the first linked project receives an automatic diff scan configuration; automatic full scan setup for additional linked projects is unchanged. You can still configure diff scans manually when needed.
- Fixed intermittent scan processing failures caused by database deadlocks when concurrent workers updated related issue records.
- Fixed sync error messages.

## 💻 Semgrep Code

### Fixed

- Fixed finding details so the **Rule-defined fix** tab appears for rules that define a regex-based fix, not only rules that use a standard `fix` field.

## ⛓️ Semgrep Supply Chain

### Added

- Lockfileless dependency scanning for Java and Kotlin projects is now in public beta. Maven, Gradle, Artifactory, Nexus Cloud, and on-premises source code managers are supported.
- Added an admin-only API to re-run upgrade requirements analysis for Supply Chain findings. Each request can include up to 10 issues.

### Changed

- Supply Chain Autofix pull requests now display detailed PR descriptions.
- Simplified **upgrade guidance** filters on Supply Chain findings: **Breaking** is now a single filter that matches any breaking-change type instead of four separate options. **Safe** is unchanged.

### Fixed

- Fixed an issue where the custom dependency exception modal would not accept version numbers without a patch component, for example `1.19`, blocking exceptions for packages that don't follow strict semantic versioning.
- Fixed an issue where searching for dependencies with special characters, like colons, in their names would fail with an error.
- Fixed an issue where the "Safe" upgrade guidance filter would incorrectly include findings with no upgrade guidance available or error states.
- Fixed a security issue in the Supply Chain upgrade requirements API by adding missing authorization checks.

## 🤖 Semgrep Multimodal
- Semgrep Assistant is now Semgrep Multimodal. The terminology has been updated throughout the interface to better reflect its AI-powered capabilities.
### Fixed

## 🔐 Semgrep Secrets

### Fixed


## 📝 Documentation and knowledge base

## 🔧 OSS Engine

### Added

- Improved scan performance through compiler-level optimizations, with notable improvements for both diff and full scans.
- Added PowerShell language support (beta), including parsing and pattern matching capabilities.
- Added support for agentic hooks in Windsurf IDE.
- Improved Pro taint tracking through lambda calls, cross-file tracking for globals, and better Scala type and call resolution.

### Changed

- Updated Kotlin tree-sitter parser to the latest grammar.
- Supply Chain analysis of npm package lock files now uses a proprietary parser and is available only to Semgrep Pro users.
- Semgrep secret validation now times out after 30 seconds instead of 15 minutes. This timeout is configurable via the `--secrets-timeout` flag. 

### Fixed

- Fixed path filtering when scanning single files to correctly match project-relative patterns like `/src/test/**/*.java`.
- Fixed `requirements.txt` parser silently dropping pinned dependencies that followed unpinned package names.
- Improved error reporting by surfacing target file discovery errors as warnings instead of silently ignoring them.
- Fixed various parsing issues in Rust, Python, and Kotlin.

* The following versions of the OSS Engine were released in March 2026:
  * [<i class="fas fa-external-link fa-xs"></i>v1.155.0](https://github.com/semgrep/semgrep/releases/tag/v1.155.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.156.0](https://github.com/semgrep/semgrep/releases/tag/v1.156.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.157.0](https://github.com/semgrep/semgrep/releases/tag/v1.157.0)
