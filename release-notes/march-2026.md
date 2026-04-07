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

- AI-powered detection scanning is now available as a public beta feature. Organizations using Semgrep Multimodal have AI Detection enabled by default.
- Autofix is now in public beta, providing automated AI-generated pull requests for Code and Supply Chain findings. 
  - Code Autofix supports all languages on GitHub Cloud.  
  - Supply Chain Autofix supports Python and JavaScript on GitHub Cloud and GitLab Cloud.
- Semgrep is now available as a Cursor and Claude Code plugin, providing automatic security scanning for Code, Supply Chain, and Secrets on every file.
- ==**Linear** is available as a ticketing integration under **Settings > Integrations**.==
- ==**SCIM** directory provisioning through WorkOS can be enabled or disabled from the admin experience or **v1** API endpoints. Enablement requires SSO entitlement and an active SSO identity provider, returns the WorkOS directory sync portal URL for setup, and Semgrep updates directory status when WorkOS activates or removes sync; disabling removes connected directories==.
- Added **v1** API endpoints to link findings to an existing ticket URL or remove ticket links when a ticketing integration is configured. Linking replaces any ticket already associated with the selected findings.
- Added **v2** deployment APIs to list and batch create, update, or delete **rule scopes** (which projects or tags a rule applies to), with optional filters by project or tag.
- Added a **File path** filter on findings pages for Code, Supply Chain, and Secrets, with the matching path highlighted in the list and a tooltip when the path is truncated.
- Added a **Duplicate** triage reason for findings when multiple rules surface the same issue or the same problem is already tracked elsewhere, including overlapping AI-powered and rule-based results.
- Exception request activity, created, approved, and rejected, now appears in the finding timeline for better audit visibility.
- Added exclusion support to automation scope configuration, allowing users to define automations that apply to all projects or tags except specified ones.

### Changed

- On the **Policies** page, the **Projects scanning** column replaces the previous global on/off toggle and lets you scope each rule to all projects, selected projects or tags, all projects with exceptions, or disable the rule for all projects. A drawer provides project search, filters, and bulk selection.
- When **AI** usage blocking is enabled for a deployment, **AI-powered triage** and **Autofix** are checked before they run, consistent with **AI Detection** scans. **Autofix** returns an explicit credits-exhausted error when blocked instead of starting a job that cannot complete.
- When a deployment enforces **AI** credit limits, the app shows navigation and in-context alerts for low or exhausted credits and disables **AI Detection** scans, **Semgrep Multimodal**, **AI-powered triage**, and **Autofix** with clear tooltips. If enforcement is off, these credit indicators stay hidden.
- **Billing & Usage**: contributor counts reflect the last **90** days of activity (instead of 30), with aligned usage cards and a loading state for **AI credits**; sandbox and proof-of-value deployments can be provisioned with no end date for subscriptions or AI credits; new organizations on usage-based billing default to **UTC** for the billing time zone.
- The **Findings** page loads code snippets after the main finding details, with placeholders in between. Slow or unavailable source code managers are less likely to block the page or cause timeouts.
- Click to Fix has been renamed to Autofix across the product.
- **Autofix** pull request filters include **No associated PR** for findings that have not had an Autofix pull request opened.
- Code and AI-powered detection findings appear in the Code tab. Use filters to filter findings by AI-powered detection or rule-based detection.
- Redesigned the **Automations** form (compact layout, multiselect condition values, validation when conditions conflict) and introduced **action cards**—one card per action—with type-specific settings, per-action validation, refresh where Semgrep loads destinations from your integrations, and a searchable menu to add actions.
- **Automations** condition builder now groups AI tags by **High risk** and **Low risk** in the tag dropdown instead of a single flat list.
- **Migrate to Automations** now uses a step-by-step flow; closing it returns you to **Policies**.
- Simplified GitHub onboarding by requiring only a single GitHub App installation instead of two. Existing users can now uninstall the public GitHub App if previously installed.
- GitHub Cloud source code manager connections can now be added without requiring GitHub SSO login, and users can connect multiple GitHub.com organizations.
- **GitHub App** integrations refresh cached installation tokens and retry after authentication errors, improving resilience when tokens are invalid before their normal expiry.
- Improved member invite emails and copy so invitations clearly require authorization through your login methods, and invite links open the join flow with the organization pre-filled.
- Improved exception request approval workflow to combine both the requester's and approver's notes into the issue's triage note for better context and audit visibility.
- Package registry integration settings include an option to use the **Semgrep Network Broker** when a registry is only reachable through your private network.
- Improved load times for the **Projects** page, **Policies** registry search, and source code repository sync for large deployments.
- ==The **AI Billing** admin panel now shows richer **AI credits** information, including usage versus limits, purchased credits and expiration, and billing-block context, plus cached block status and an action to invalidate billing cache entries for a deployment.==
- **Reset SSO** in the admin panel now shows the SSO portal link and warns that it expires in five minutes.
- ==Organizations without the Enterprise SSO plan entitlement can use **SSO** settings and provider setup when Semgrep enables that access for your deployment.==

### Fixed

- ==Fixed a security vulnerability in SAML login handling that could allow cross-site scripting (XSS) attacks.==
- ==Fixed a security issue where users with read-only permissions could bypass restrictions by uploading scan results via the CLI.==
- Fixed a security issue where the application container ran the web service as the root user; it now runs as a non-root user.
- With **RBAC** enabled, read-only users can no longer trigger scans from the UI or API, including **Run a new scan** and Semgrep Managed Scans.
- ==Added server-side validation to enforce the 3,000 character limit for triage notes across all API endpoints, ensuring consistency with the frontend limit.==
- Fixed **Findings** links across **Code**, **Supply Chain**, **Secrets**, and **AI Detection** so shared URLs, bookmarks, and dashboard shortcuts keep branch and tab context—including **All** vs **Priority**, **Open** defaults for **Code** from a project’s **See findings** flow, and ref forms common in notifications.
- Fixed **Settings** page scroll behavior so top-level tabs stay visible after load and when opening deep links to a subsection.
- Fixed an issue where invalid webhook configurations would cause the **Integrations** page to become unusable.
- Fixed an issue where one broken or revoked ticketing connection could prevent all ticketing integrations from loading; each connection is listed on its own so you can remove or reconnect it.
- Fixed an issue where the "Enable Secrets" button linked to a 404 page instead of the correct Settings page.
- Fixed an issue where custom policies with no rules assigned would cause the **Policies** page to load indefinitely.
- Fixed an issue where the **Policies** page would crash when rulesets contained soft-deleted rules.
- Fixed an issue where filtering by rule mode on the Code findings page would break the project filter, causing findings from all projects to appear.
- Fixed **Findings** page scroll getting trapped when nested lists were still collapsed.
- Fixed an issue where findings in **Reviewing** had no in-app action to continue triage. **Mark as open** in the finding menu sets the finding to **Reopened**.
- Fixed an issue where OpenID Connect SSO login could fail after recent provider updates that require the `iss` parameter.
- Fixed an issue where Slack notifications were missing merge request hyperlinks for self-managed GitLab instances with custom domain names.
- Fixed an issue where API errors could incorrectly display the RBAC enablement screen for deployments that already had RBAC enabled.
- Fixed an issue where Azure DevOps Cloud was incorrectly classified as an on-premises source code manager, causing incorrect warnings and blocking setup for valid cloud configurations.
- Fixed an issue where linking the same source code repository to multiple Semgrep projects triggered redundant diff scans on pull requests during automatic setup. Only the first linked project receives an automatic diff scan configuration; automatic full scan setup for additional linked projects is unchanged. You can still configure diff scans manually when needed.
- Added validation to limit exception request notes to 1,250 characters to ensure combined approval triage notes remain within display limits.
- Fixed an issue where bulk triage API requests with incorrect field names, such as `finding_ids` instead of `issue_ids`, would silently fail instead of returning a clear error message.
- Added validation to reject bulk triage API requests that provide neither `issue_ids` nor filter criteria, preventing accidental triage of all findings.
- Fixed an issue where bulk ignore required a comment before you could submit when changing **provisionally ignored** findings to **ignored**, even though a comment is optional for that action.
- ==Fixed an issue where **AI credits** could show as zero on **Billing & Usage** when active credit grants had been in place for a long time.==
- Fixed an issue where the same **AI credits** usage could be counted more than once for organizations with multiple active licenses.
- Fixed **Billing & Usage** for sandbox and proof-of-value deployments that have a paid plan but no SAST, Supply Chain, or Secrets licenses, so usage, AI credits, and contributor counts appear correctly.
- Fixed an issue where **AI credits** could expire before the subscription ended on some prorated or multi-year plans; credit periods now align with the subscription end date.

## 🔁 Semgrep Workflows

### Added

- **Semgrep Workflows** (beta) is a new framework for automated code security pipelines across Semgrep Code, Supply Chain, Secrets, and Semgrep Multimodal, with pre-built and custom workflows on Semgrep-managed infrastructure. See the [Workflows overview](https://semgrep.dev/docs/workflows/overview) and contact Semgrep to get started.

### Changed

- **Admin > Workflows**: the trigger form is ordered **Deployment**, **Workflow**, **Target repository**, and **Git ref** with updated labels; the workflow picker shows each workflow’s name and description with search and a scrollable list; trigger failures surface clear errors and missing workflow names; workflow runs tied to pull requests show the pull request ID.

## 💻 Semgrep Code

### Fixed

- Fixed finding details so the **Rule-defined fix** tab appears for rules that define a regex-based fix, not only rules that use a standard `fix` field.

## ⛓️ Semgrep Supply Chain

### Added

- Lockfileless dependency scanning for Java and Kotlin projects is now in public beta. Maven, Gradle, Artifactory, Nexus Cloud, and on-premises source code managers are supported.
- Added an admin-only API to re-run upgrade requirements analysis for Supply Chain findings. Each request can include up to 10 issues.

### Changed

- **Supply Chain** dependency search includes an **Exact match** option so you can use strict package-name matching or substring-style matching per filter.
- Added **Autofix** filters to the Supply Chain findings. Supply Chain Autofix pull requests now display detailed PR descriptions.
- **Supply Chain** finding details show reachability in one place at the top of the page instead of repeating it next to remediation, where it could appear inconsistently.
- Simplified **upgrade guidance** filters on Supply Chain findings: **Breaking** is now a single filter that matches any breaking-change type instead of four separate options. **Safe** is unchanged.
- **Supply Chain** periodically refreshes cached dependency license metadata from upstream sources so license identifiers stay closer to current public SPDX data.
- **Supply Chain** LLM-powered upgrade guidance is now scheduled faster.
- Disabling **Semgrep Multimodal** turns off **Supply Chain** LLM-powered **upgrade guidance** so it is not left enabled without model providers; dependency processing also skips starting upgrade-guidance work when no AI providers are configured.

### Fixed

- ==Fixed cases where **Supply Chain Autofix** could select the wrong workflow when the ecosystem sent from the browser did not match the ecosystem on the finding from the scan; selection now uses the scan-derived value.==
- Fixed an issue where shadow scans showed zero vulnerabilities even when the report included vulnerability findings; counts now match the report.
- Fixed an issue where the custom dependency exception modal would not accept version numbers without a patch component, for example `1.19`, blocking exceptions for packages that don't follow strict semantic versioning.
- Fixed an issue where searching for dependencies with special characters, like colons, in their names would fail with an error.
- Fixed an issue where the "Safe" upgrade guidance filter would incorrectly include findings with no upgrade guidance available or error states.
- Fixed a security issue in the Supply Chain upgrade requirements API by adding missing authorization checks.
- Fixed a security issue in the Supply Chain dependency path API that could allow cross-organization access; deployment and repository checks are now enforced.

## 🤖 Semgrep Multimodal

- Semgrep Assistant is now Semgrep Multimodal. The terminology has been updated throughout the interface to better reflect its AI-powered capabilities.

### Fixed

- Fixed **Suggested memories** failing to load for memories created from pull request triage comments.

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
