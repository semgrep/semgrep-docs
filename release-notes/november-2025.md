---
slug: november-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: November 2025
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for November 2025

The following updates were made to Semgrep in November 2025.

## 🌐 Semgrep AppSec Platform

### Added
- **Cortex** and **Sysdig** integrations are now generally available. Semgrep now uses deployment status and, for Cortex, internet-exposure data from these CNAPP providers to better prioritize findings.
- The **Settings > General** tab now displays all Semgrep product settings on a single page.
- Added the ability for non-admin users to complete the Semgrep GitHub App installation process using an install-request link. This ensures that private GitHub App installations can proceed, even when the initiating user lacks org admin permissions.
- Added a new **Validate** button and improved **connection status visibility** for CNAPP integrations. You can now see the validation state, last successful sync time, and clearer error conditions directly in Semgrep AppSec Platform.
- You can now update and delete customizable and saved views using the API. The endpoint returns a 404 if the view does not exist.
- Added support for filtering projects by status, including `setup`, `uninitialized`, and `archived`, in the Projects API endpoints, enabling more precise control when retrieving project lists.
- Added support for filtering projects by status, including `setup`, `uninitialized`, and `archived`, in the Projects API endpoints, enabling more precise control when retrieving project lists.
- Added missing fields `commit` and `enabled_products` to the `GetScan` v2 API response to achieve parity with v1 and ensure you receive complete scan metadata.
- Added support for updating a project's **primary branch** through the Public API v2, enabling parity with the v1 Projects API endpoint.
- Added support to the Public API for mutating project tags, enabling automated workflows to add, remove, or update tags on projects.

### Changed

- The **API tokens** and **CLI tokens** tabs under *Settings → Tokens* are now paginated, significantly improving page load speed for teams with many tokens.


### Fixed

- Fixed several issues with RBAC team-based filtering that caused you to see incorrect repository or findings access in certain deployments. You should now see correct repository and findings access based on their team permissions.
- Fixed an issue where the self-service checkout flow failed with an "Unrecognized enum value" error when starting a billing upgrade. You can now successfully initiate checkout sessions again.
- Fixed an issue where Jira automations persisted after deleting the Jira integration. Automations are now deleted when the integration is removed.
- Fixed an issue with the **Settings** pages where some searches resulted in no results on later pages.
- Fixed an issue where organization admins could not see projects without team assignments when RBAC was enabled. All projects now correctly appear in the **Projects** page for admins.
- Fixed an authorization issue in Network Broker key management.
- Fixed an issue where GitLab merge-base requests were serialized incorrectly, causing errors or inconsistent diff detection for GitLab users.
- Fixed an issue where rule descriptions on the **Findings** page used a fixed width. Descriptions now scale responsively again.
- Fixed an issue where GitHub SSO orgs using personal GitHub accounts made unnecessary calls to GitHub during user sync.
- Fixed an issue where new CNAPP integrations displayed an incorrect error state in Semgrep AppSec Platform.
- Fixed an issue where opening the scan's **Details** reset existing URL filters. Semgrep now preserves all active filters when you navigate to the **Details** page.
- Removed the ability for users to remove their own access in **Access Control**.
- You can no longer click the *Run a new scan* buttons on the **Projects** list and **Project Details** pages if you disable Managed Scans for the project.

## 💻 Semgrep Code

### Added

- MCP: added the `-k` / `--hook` flag to enable Semgrep scans from Claude Code Agent post-tool hooks.
- **Go**: enabled taint tracking across goroutines, improving detection accuracy in Go projects.

### Changed

- Semgrep now uses your source code manager to determine changes between branches during a scan. If you're using Network Broker, you must upgrade to benefit from this improvement if you are on **GitLab self-managed v0.36.0 or earlier** or **GitHub Enterprise v0.31.0 or earlier**.

### Fixed

- The progress bar for `semgrep scan` and `semgrep ci` now consistently reaches 100%.
- **Rust**: Fixed missing type alias translations so that Semgrep can correctly match the `()` type in type declarations.
- **Scala**: Fixed several issues with Scala match-expression handling in dataflow analysis, improving accuracy.

## ⛓️ Semgrep Supply Chain

### Added

- Malicious dependency detection is now generally available. Semgrep detects malicious packages, including malware, typosquatting, and credential-stealing dependencies, using over 80,000 rules.
- Added a toggle in **Supply Chain settings** that allows you to disable malicious dependency rules. This provides an opt-out for teams who prefer not to run these rules or who encounter performance issues.
- Added a new checkbox in the Jira "Customize ticket creation" wizard that allows teams to automatically create tickets for malicious dependency findings on any branch.

### Fixed

- The Semgrep AppSec Platform now displays the correct severity for Supply Chain findings, resolving a mismatch with automations and the CLI. Some existing findings may show updated severities, but policies and Jira workflows are unaffected.
- Fixed an issue that caused Supply Chain scans to fail when encountering newer manifest types.
- Fixed an issue where searches for dependencies only filtered the first page of results. Dependency filters now correctly return complete, accurate results.
- Fixed inaccurate dependency and lockfile counts in Supply Chain pages.

## 🤖 Semgrep Assistant

### Added
- You can now see rule and analysis explanations on the finding’s Details page. When a finding is classified as a true or false positive, an alert appears, and a detailed explanation is available in the Finding description tab. For true positives, it includes code context and threat-model rationale; for false positives, it includes reasoning only. You can provide feedback with Agree or Disagree.
- You can now manually create new memories for AI Detection issues from the "Create Memory" modal.

### Changed

- Assistant now automatically analyzes all new **Critical** and **High** severity findings with **Medium** or **High** confidence in full scans, removing the previous 10-issue limit.

### Fixed

- AI Detection memories now correctly display their finding counts. A UI rendering issue with suggested memories has been resolved.
- Removed outdated warning text from the Assistant autofix.
- Fixed an issue where agreeing with an auto-triage verdict incorrectly marked findings as ignored. Findings are now only auto-ignored when user assigns it as a **False Positive**.


## 📝 Documentation and knowledge base

### Added

- Added the following knowledge base articles:
  - [Semgrep Managed Scans doesn't run for pull requests in GitHub merge queues](/kb/semgrep-appsec-platform/no-runs-in-github-merge-queues)
  - [Why does the Projects page display a different dependency count from the Dependencies page?](/kb/semgrep-appsec-platform/dependency-count-differ-platform)

## 🔧 OSS Engine

### Added

* The following versions of the OSS Engine were released in November 2025:
  * [<i class="fas fa-external-link fa-xs"></i> 1.143.0](https://github.com/semgrep/semgrep/releases/tag/v1.143.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.144.0](https://github.com/semgrep/semgrep/releases/tag/v1.144.0)