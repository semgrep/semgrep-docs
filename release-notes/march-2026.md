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

- AI-powered detection is now available as a beta feature. Organizations using Semgrep Multimodal have AI Detection enabled by default.
- Click to Fix has been renamed Autofix. Autofix is in beta, providing automatic, AI-generated pull requests (PRs) for Code and Supply Chain findings.
- Semgrep is now available as a Cursor and Claude Code plugin, providing automatic security scanning for Code, Supply Chain, and Secrets on every file.
- Added a **File path** filter on findings pages for Code, Supply Chain, and Secrets, with the matching path highlighted in the list.
- Added **Duplicate** as a triage reason for findings when multiple rules surface the same issue or when the same issue is tracked elsewhere.
- Added v2 deployment APIs to list and batch create, update, or delete rule scopes, so you can manage which projects or tags a rule applies to, with optional filtering by project or tag.
- Added SCIM directory provisioning controls in Admin settings and v1 APIs, with WorkOS-based setup, directory status visibility, and disconnect support for enabled SSO organizations.
- Added v1 APIs to link findings to an existing ticket URL or remove linked tickets when a ticketing integration is configured. Linking a ticket replaces any existing ticket associated with the selected findings.
- Exception request activity with the fields created, approved, and rejected now appears in the finding timeline for better audit visibility.

### Changed

- On the **Rules & Policies > Policies** page, the **Projects scanning** column now replaces the previous global on/off toggle. You can scope each rule to all projects, selected projects or tags, all projects with exceptions, or disable the rule for all projects. A drawer provides project search, filters, and bulk selection.
- **Billing & Usage** updates: 
  - When a deployment enforces AI credit limits, Semgrep AppSec Platform now shows alerts for low or exhausted credits and disables all AI features. If enforcement is off, these credit indicators stay hidden.
  - Contributor counts reflect the last 90 days of activity, instead of 30, with aligned usage cards and a loading state for AI credits.
  - When AI usage blocking is enabled for a deployment, AI-powered triage, Autofix, and AI-powered detection scans are checked before they run. 
  - Sandbox and proof-of-value deployments can be provisioned with no end date for subscriptions or AI credit
  - Billing timezones default to UTC for new organizations on usage-based billing.
  - Several improvements to the AI Billing section in the admin panel.
- The **Findings** page now loads code snippets after the main finding details. Slow or unavailable source code managers are less likely to block the page or cause timeouts.
- Simplified GitHub onboarding by requiring only a single GitHub App installation instead of two. Existing users can now uninstall the public GitHub App if previously installed.
- GitHub Cloud source code manager connections can now be added without requiring GitHub SSO login, and users can connect multiple GitHub organizations.
- Improved member invite emails so invitations clearly require authorization through your login methods.
- Improved exception request approval workflow to combine notes from both the requester and approver into the issue's triage note for better context.
- Package registry integration settings under **Settings > Integrations > Registry** now include an option to use the Semgrep Network Broker when a registry is only reachable through your private network.
- Improved load times for the **Projects** page, **Policies** registry search, and source code repository sync for large deployments.
- Reset SSO in the admin panel now shows the SSO portal link.
- Organizations without the Enterprise SSO plan entitlement can use SSO settings and provider setup when Semgrep explicitly enables that access for your deployment.

### Fixed

- Fixed minor security vulnerability in SAML login handling, application container run web services, and read-only permissions. 
- With RBAC enabled, read-only users can no longer trigger scans from the Semgrep AppSec Platform or API.
- Added server-side validation to enforce the 3,000-character limit for triage notes across all API endpoints.
- Fixed findings links across Semgrep products so shared URLs, bookmarks, dashboard shortcuts, and notification links preserve the correct branch and tab context.
- Fixed **Settings** page scroll behavior so top-level tabs stay visible after load.
- Fixed an issue where invalid webhook configurations would cause the **Integrations** page to become unusable.
- Fixed an issue where one broken or revoked ticketing connection could prevent all ticketing integrations from loading.
- The **Enable Secrets** button now links to the correct **Settings** page.
- Fixed an issue where custom policies with no rules assigned would cause the **Policies** page to load indefinitely.
- Fixed an issue where the **Policies** page would crash when rulesets contained soft-deleted rules.
- Fixed an issue where filtering by rule mode on the **Code Findings** page would break the project filter, causing findings from all projects to appear.
- Fixed **Findings** page scroll when nested lists were still collapsed.
- Fixed an issue where findings in **Reviewing** had no action to continue triage. **Mark as open** in the finding menu sets the finding to **Reopened**.
- Fixed an issue where OpenID Connect SSO login could fail after recent provider updates that require the `iss` parameter.
- Fixed an issue where Slack notifications were missing merge request hyperlinks for self-managed GitLab instances with custom domain names.
- Fixed an issue where API errors could incorrectly display the RBAC enablement screen for deployments that already had RBAC enabled.
- Fixed an issue where Azure DevOps Cloud was incorrectly classified as an on-premises source code manager, causing incorrect warnings and blocking setup for valid cloud configurations.
- Fixed an issue where automatically setting up the same repository in multiple Semgrep projects could trigger duplicate PR diff scans. Semgrep now auto-configures diff scans only for the first linked project; additional linked projects continue to receive automatic full scans, and diff scans can still be configured manually.
- Fixed an issue where bulk triage API requests with incorrect field names, such as `finding_ids` instead of `issue_ids`, would silently fail instead of returning a clear error message.
- Added validation to reject bulk triage API requests that provide neither `issue_ids` nor filter criteria, preventing accidental triage of all findings.
- Fixed an issue where bulk ignore required a comment before you could submit when changing **provisionally ignored** findings to **ignored**, even though a comment is optional for that action.
- Fixed several minor issues with AI credits billing and usage:
  -  AI credits could previously show as zero on **Billing & Usage** when active credit grants had been in place for a long time.
  - The same AI credits usage could previously be counted more than once for organizations with multiple active licenses.
  - AI credits could previously expire before the subscription ended on some prorated or multi-year plans.

## 🔁 Semgrep Workflows

### Added

- **Semgrep Workflows** (beta) is a new framework for automated code security pipelines across Semgrep Code, Supply Chain, Secrets, and Semgrep Multimodal, with pre-built and custom workflows on Semgrep-managed infrastructure. See [Workflows](https://semgrep.dev/docs/workflows/overview) for details.

## 💻 Semgrep Code

### Added
- The Code page now shows AI-powered detection findings and rule-based scan findings, with filters to help you view each type separately.

### Fixed
- Fixed finding details so the **Rule-defined fix** tab appears for rules that define a regex-based fix, not only rules that use a standard `fix` field.

## ⛓️ Semgrep Supply Chain

### Added

- Lockfileless dependency scanning for Java and Kotlin projects is now in public beta. Maven, Gradle, Artifactory, Nexus Cloud, and on-premises source code managers are supported.
- Added an admin-only API to re-run upgrade requirements analysis for Supply Chain findings. Each request can include up to 10 issues.

### Changed

- Supply Chain dependency search includes an **Exact match** option so you can use strict package-name matching or substring-style matching per filter.
- Added **Autofix** filters to the Supply Chain findings. Supply Chain Autofix PRs now display detailed PR descriptions.
- Supply Chain finding details show reachability in one place at the top of the page instead of repeating it next to remediation, where it could appear inconsistently.
- Simplified **Upgrade guidance** filters on Supply Chain findings. **Breaking** is now a single filter that matches any breaking-change type instead of four separate options.
- Supply Chain AI-powered upgrade guidance is now scheduled faster.
- Disabling Semgrep Multimodal turns off Supply Chain upgrade guidance, so it is not left enabled without model providers; dependency processing also skips starting upgrade-guidance work when no AI providers are configured.
- Supply Chain periodically refreshes cached dependency license metadata from upstream sources so license identifiers stay closer to current public SPDX data.

### Fixed

- Fixed cases where Supply Chain **Autofix** could select the wrong workflow when the ecosystem set from the browser did not match the ecosystem on the finding from the scan.
- Fixed an issue where the custom dependency exception modal would not accept version numbers without a patch component, for example `1.19`, blocking exceptions for packages that don't follow strict semantic versioning.
- Fixed an issue where searching for dependencies with special characters, like `:`, in their names would fail with an error.
- Fixed an issue where the **Safe** upgrade guidance filter would incorrectly include findings with no upgrade guidance available.
- Fixed a security issue in the Supply Chain upgrade requirements API by adding missing authorization checks.
- Fixed a security issue in the Supply Chain dependency path API.

## 🤖 Semgrep Multimodal

- Semgrep Assistant is now Semgrep Multimodal. The terminology has been updated throughout the interface to better reflect its AI-powered capabilities.

### Fixed

- Fixed **Suggested memories** failing to load for memories created from PR triage comments.

## 🔐 Semgrep Secrets

No product updates in this release.

## 📝 Documentation and knowledge base

### Changed

- The [v1 API reference](https://semgrep.dev/api/v1/docs/) now documents request bodies for **POST**, **PUT**, and **PATCH** operations instead of showing those inputs as query parameters. **GET** and **DELETE** behavior in the reference is unchanged.


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
