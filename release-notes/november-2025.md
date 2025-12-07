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

- **AI-Powered Detection** is now available in **private beta**, bringing 
  expanded AI-driven pattern detection capabilities to Semgrep users. Join the [private beta waitlist](https://semgrep.dev/contact/product-join-ai-detection-beta/).
- The General tab in **Settings** is now scrollable to different product settings.  
  Users can scroll through all of the settings instead of clicking on 
  individual sections per product.
- ==Added Click-to-Fix progress tracking for SAST issues, including activity 
  history entries and notifications when PRs are requested, opened, or fail. 
  This brings SAST to feature parity with SCA Click-to-Fix.==
- ==Added additional scan lifecycle events (running, processing, finished) to 
  improve accuracy of scan progress tracking and analytics.==
- Added support for non-admin users to complete GitHub App onboarding by 
  generating a shareable install-request link for an organization admin. 
  This ensures private GitHub App installations can proceed even when the 
  initiating user lacks org admin permissions.
- Added a new **Validate** button and improved **connection status 
  visibility** for CNAPP integrations. Users can now see validation state, 
  last successful sync time, and clearer error conditions directly in the UI.
- You can now update and delete customizable/saved views via the API. The endpoint 
  returns a 404 if the view does not exist.
- Added support for filtering projects by status (`setup`, `uninitialized`, 
  `archived`) in the Projects API, enabling more precise control when 
  retrieving project lists.
- Added a new **`ListScans` endpoint** to the Public API v2, bringing 
  functional parity with the v1 scans listing API. This allows users to 
  retrieve and filter scans using the updated API version.
- Added missing fields (`commit`, `enabled_products`) to the `GetScan` v2 
  API response to achieve parity with v1 and ensure clients receive complete 
  scan metadata.
- Added support for updating a project's **primary branch** through the 
  Public API v2, enabling parity with the v1 Projects API.
- Added support in the Public API for mutating project tags, enabling 
  automated workflows to add, remove, or update tags on projects.

### Changed

- Provisionally ignored findings now behave like open findings in 
  Branch-New-Git-Diff mode, ensuring they correctly trigger blocking and PR 
  comments when matching active rules.
- ==Improved user experience by adding a tooltip explaining why the **Scan** 
  button is disabled when no repositories have managed scans enabled.==
- Updated the **Findings detail page**: combined rule description and AI 
  description into a single tabbed component for better readability.
- Improved the Project Settings page by adding a dynamic cloud context card 
  that updates based on integration status. The page now shows tailored 
  guidance depending on whether repositories have data, an integration exists 
  without data, or no integration is configured.
- Streamlined GitHub onboarding flow for new users by reducing the number of 
  steps required to connect Semgrep to GitHub.
- The **API tokens** and **CLI tokens** tabs under *Settings → Tokens* are 
  now paginated, significantly improving page load speed for teams with many 
  tokens.
- ==Activity history now shows when a Click-to-Fix PR is merged, improving 
  visibility into automated fixes==.

### Fixed

- Fixed several issues with RBAC team-based filtering that caused users to 
  see incorrect repository or findings access in certain deployments. Users 
  should now see correct repository and findings access based on their team 
  permissions.
- Fixed an issue where the self-service checkout flow failed with an 
  "Unrecognized enum value" error when starting a billing upgrade. Users can 
  now successfully initiate checkout sessions again.
- Fixed an issue where Jira automations could continue to run for deployments 
  with no ticketing instances. Automations and actions are now properly 
  deleted when removing a ticketing instanc
- Fixed an issue in the Settings pages where searching did not reset the page 
  index, resulting in empty results when users were on later pages.
- Fixed inconsistent priority filtering between dashboards and product tabs. 
  Priority counts now match across views, and a tooltip has been added to 
  clarify how priority is defined.
- Fixed an issue where organization admins could not see projects without 
  team assignments when RBAC was enabled. All projects now correctly appear 
  in the Projects UI for admins.
- Fixed an authorization issue in Broker key management where endpoints only 
  validated read permissions. Uploading or deleting Broker public keys now 
  correctly requires write-level permissions.
- Fixed an issue where GitLab merge-base requests were serialized 
  incorrectly, causing errors or inconsistent diff detection for GitLab 
  users.
- Fixed a UI regression that caused rule descriptions on the Findings page to 
  use a fixed width. Descriptions now scale responsively again.
- Fixed an issue where GitHub SSO orgs using personal GitHub accounts would 
  make unnecessary calls to GitHub during user sync.
- Fixed an issue where new CNAPP integrations displayed an incorrect error 
  state in the connection status pill.
- Fixed an issue where opening scan details would reset existing URL filters. 
  The UI now preserves all active filters when navigating into scan details.
- Improved project page guidance by removing disabled scan tooltips when no 
  repositories are selected and adding clearer messaging for projects that 
  previously used managed scanning.
- Prevent users from accidentally removing their own access in the Access 
  Control settings. The UI now correctly disables the self-removal action to 
  avoid breaking user access.
- Disabling Semgrep Managed Scans now correctly disables the *Run a new scan* 
  button on both the project list and project details pages. A helpful 
  tooltip appears on the disabled button to explain why scanning is 
  unavailable.

## 💻 Semgrep Code

### Added

- Multicore scanning is now enabled by default, switching parallel scans to a 
  faster and more efficient shared-memory model.
- Interfile scans now automatically use multiple CPU cores based on system 
  capacity, improving scan performance compared to the previous default of 
  single-threaded execution.
- Added the `-k` / `--hook` flag to enable Semgrep scans from Claude Code 
  Agent post-tool hooks.
- Enabled taint tracking across Goroutines, improving detection accuracy in 
  Go projects.
- Expanded JavaScript support with reachability analysis for 
  projects using `yarn` and `pnpm` is now available in **private beta**.

### Changed

- Semgrep now uses your code hosting platform, like GitHub and GitLab, to 
  determine changes between branches during a scan. Customers using Network Broker 
  must upgrade to benefit from this improvement if they are on **GitLab 
  self-managed v0.36.0 or earlier** or **GitHub Enterprise v0.31.0 or 
  earlier**.
- Users with multiple associated emails will now see Semgrep-domain emails 
  listed first for consistency.

### Fixed

- The progress bar for `semgrep scan` and `semgrep ci` now consistently 
  reaches 100%.
- Fixed missing Rust type alias translation so Semgrep can correctly match 
  the `()` type in type declarations.
- Fixed several issues with Scala match-expression handling in dataflow 
  analysis, improving accuracy for Pro users.

## ⛓️ Semgrep Supply Chain

### Added

- Malicious dependency detection is now generally available. Semgrep now 
  detects malicious packages, including malware, typosquatting, and 
  credential-stealing dependencies. This feature is powered by an expanded set of more than 80,000 SCA rules with significantly improved performance. It is available in the API and integrates with Policies to automatically block malicious packages, and supports Jira integration.
- **Cortex** and **Sysdig** integrations are now generally available. Semgrep 
  now uses deployment status and (for Cortex) internet-exposure data from 
  these CNAPP providers to better prioritize findings.
- Semgrep's reachability analysis now supports 
  **transitive dependencies in Python** across all Python package managers. This is currently in **private beta**.
- Added Deployment Status and Internet Exposure filters to the Supply Chain 
  findings page, enabling more precise prioritization of SCA issues.
- Added a toggle in **Supply Chain settings** that allows users to disable 
  malicious dependency rules. This provides an opt-out for teams 
  who prefer not to run these rules or who encounter performance issues.
- Added a new checkbox in the Jira "Customize ticket creation" wizard that 
  allows teams to automatically create tickets for malicious dependency 
  findings on any branch.
- **Added support for enabling Transitive Reachability (TR) scanning 
  per-repository.** Teams can now selectively enable TR for specific repos 
  using prefab configuration, allowing more granular rollout instead of 
  requiring org-wide activation.

### Changed

- Improved performance of dependency lookups, especially for large 
  deployments.

### Fixed

- The web app now displays the correct severity for Supply Chain findings, 
  resolving a mismatch with automations and the CLI. Some existing findings 
  may show updated severities, but policies and Jira workflows are 
  unaffected.
- Fixed an issue that caused SCA scans to fail with 400 errors when 
  encountering newer manifest types.
- Fixed an issue where CNAPP-based filters (Deployment Status and Internet 
  Exposure) appeared even for deployments without CNAPP installed. CNAPP 
  filters now correctly display only when at least one CNAPP installation is 
  present.
- Fixed an issue where searching dependencies only filtered the first page of 
  results. Dependency filters now correctly return complete, accurate search 
  results.
- Fixed inaccurate dependency and lockfile counts in Supply Chain views by 
  refactoring how dependency data is fetched and cached. Dependency 
  hovercards and repo-level dependency summaries now display consistent, 
  complete counts with smoother infinite scrolling performance.

## 🤖 Semgrep Assistant

### Added

- AI Detection issues now support Assistant memories, bringing them to 
  feature parity with standard SAST findings. You can add memories from the 
  Assistant Memories tab, and triaging an AI Detection finding as Ignored 
  with a note will create a memory when applicable.
- You can now manually create new memories for AI Detection issues from the 
  "Create Memory" modal.

### Changed

- Assistant now automatically analyzes **all new Critical and High-severity 
  findings** with **Medium or High confidence** in full scans, removing the 
  previous 10-issue limit. This increases coverage and reduces the need for 
  manual backfill analysis.
- Improved performance of the rule search in the "Create Memory" modal, 
  reducing first-keystroke lag and improving responsiveness when handling 
  large rule sets.

### Fixed

- ==AI Detection memories now correctly display their finding counts. A UI 
  rendering issue with suggested memories has been resolved.== 
- Removed outdated warning text from the Assistant autofix.
- Fixed an issue where agreeing with an auto-triage verdict incorrectly 
  marked findings as ignored. Findings are now only auto-ignored when user assigns it as a **False Positive**.

## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

### Added

- Added the following knowledge base articles:
  - [Semgrep Managed Scans doesn't run for pull requests in GitHub merge queues](/kb/semgrep-appsec-platform/no-runs-in-github-merge-queues)
  - [Why does the Projects page display a different dependency count from the Dependencies page?](/kb/semgrep-appsec-platform/dependency-count-differ-platform)

## 🔧 OSS Engine

### Added

- Semgrep Community Edition Fall 2025 release is now live, delivering **3× 
  faster scans on large repositories**.
- Native Windows support with no WSL required, expanding Semgrep's reach to 
  500M+ additional machines worldwide.

* The following versions of the OSS Engine were released in November 2025:
  * [<i class="fas fa-external-link fa-xs"></i> 1.143.0](https://github.com/semgrep/semgrep/releases/tag/v1.143.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.144.0](https://github.com/semgrep/semgrep/releases/tag/v1.144.0)