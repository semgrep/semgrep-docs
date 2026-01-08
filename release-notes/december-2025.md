---
slug: december-2025
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: December 2025
tags:
  - Release notes
---

<!-- Remember to add previous month's under-the-cut behavior --> 
<!-- Remember to update index page -->
 
# Semgrep release notes for December 2025

The following updates were made to Semgrep in December 2025.

## 🌐 Semgrep AppSec Platform

### Added
- New **Priority** tab on **Findings** page to surface high-priority findings. Each product has default priority categories, and Semgrep admins can customize the **Priority** tab to control which findings appear.
- New **Provisionally ignored** finding state. Findings marked as unreachable, invalid, or Assistant false positives move out of your default open list while remaining available for review.
- You can now link directly to a specific tab in the Admin panel, making it faster to navigate to settings.
- New automation conditions for rules and rulesets. Automations can now trigger based on specific rule IDs or ruleset IDs, giving you more precise control over when automations run.
- Commit author emails now appear in findings. When available, findings show the commit author’s email to help you identify the right owner more quickly.
- Admins can now save Priority tab filters for all users. Admins can save filter presets that control which findings appear in the Priority tab across the organization, making it easier to align teams on what matters most.

### Changed
- Updated the **Findings** page with redesigned filters, improved navigation, and more intuitive links. The code path now opens the finding's **Details** page, and an in-product tour introduces the new layout.
- On the **Projects** page, project names now link directly to project details, making it easier to jump to scan information from the project list.
- Easier access to ticketing integration settings. When no ticketing integration is configured, the app now links directly to the relevant settings page, making it easier to get set up.
- The triage-by-comment setting is now available in the global settings section, making it easier to manage across products.
- Improved SSO provisioning behavior. Newly created users who sign in with SSO are now added only to the default deployment, reducing unintended access in multi-deployment organizations.
- Improved visibility for social authentication after SSO setup. When SSO is enabled, the app now shows warnings for social authentication in **Settings > Access > Login** methods and highlights users using social auth in **Settings > Users**, helping admins identify and reduce security risks.
- Updated **Settings** page layout. The **Settings** page has been reorganized to highlight commonly used features and make it easier to find what you need.
- Clearer messages when managing authentication providers. Activating or deactivating SSO and other authentication providers now shows more user-friendly success and partial-failure messages.
- The **Today** section on the **Reporting** page now uses the same priority definitions as the **Findings** page, including any custom priority settings.
- Updated **Guardrails** chart to reflect provisionally ignored findings. The **Guardrails** chart now shows Provisionally ignored findings instead of the previous **Filtered by Assistant** field, providing a more complete view of findings excluded from the default open list.
- Simplified user search on the **Manage users** page. You can now search by email, username, or ID using a single search field, without selecting the search type first.
- ==Improved SSO login handling for migrated identity providers. For migrated SAML and OpenID providers, Semgrep now routes logins through WorkOS, improving reliability while falling back to the existing login flow when needed.==
- Improved performance and accuracy of Findings filters.

### Fixed
- Fixed IdP-initiated SAML login issues. You can now sign in successfully using IdP-initiated SAML.
- Fixed incorrect tab selection during navigation. The correct tab is now highlighted when viewing pages under the project path.
- Fixed source code manager configuration updates to return the updated settings on validation errors.
- Fixed Assistant triage actions for read-only users. Read-only users can no longer record agreement with Assistant analysis, and the activity timeline now reflects only actions taken by users with triage permissions.
- Fixed GitHub Enterprise connection setup. The Connect button now works correctly when adding a GitHub Enterprise integration.
- Fixed filter action buttons appearing when no changes were made. The Save and Reset buttons now appear only when you’ve modified filters or have saved views to manage.
- Fixed several issues with Findings filters and saved views. Saving and resetting filters now works correctly, time-based filters persist as expected, permissions to save filters are enforced correctly, and the Priority tab count stays accurate when saved filters change.
- Fixed CNAPP visibility for non-admin users. Users with access to findings can now see CNAPP integration status, ensuring CNAPP filters and descriptions display correctly.
- Fixed an issue where the **Users** page did not reset when changing the search query.
- Fixed an issue where the **Teams** search bar was unusable when adding users or projects.
- Fixed an issue preventing custom OpenAI API keys from being saved.
- When a scan is running, the **Analyze** button on the finding's **Details** page is now disabled with an explanatory tooltip.
- Fixed team filter visibility in the **Findings** page. Team filters now appear only when RBAC is enabled, ensuring filters reflect your deployment’s access controls.

## 💻 Semgrep Code

### Changed
- Git LFS objects are excluded from baseline scans. Files tracked with Git LFS are no longer scanned during baseline runs, avoiding large or binary files that are not supported by Semgrep.

### Fixed
- Improved timeout handling. Fixed a rare issue where timeouts could be mishandled, which could lead to inconsistent warnings or scan behavior.
- Fixed validation failures for certain valid rules. Rules that include emoji in messages now validate correctly.
- Fixed an interfile scan timeout regression. Restored the previous default job behavior to prevent unexpected timeout changes.
- Fixed incorrect “Fixed” statuses for files that failed to scan. Findings in files that time out or fail to scan are no longer marked as fixed, ensuring scan results more accurately reflect what was actually analyzed.
- Fixed duplicate scans triggered by GitHub pull request updates. Semgrep now processes pull request update events only once, preventing duplicate scans for the same change.


## ⛓️ Semgrep Supply Chain

### Added
- Expanded Maven reachability coverage. New High severity reachability rules improve vulnerability detection for Java, Kotlin, and Scala projects.
- Symbol analysis support for Supply Chain–only scans when calling `semgrep ci`.
- Advisories now show impacted projects and branches. Click an advisory to see affected projects and branches, and use quick links to jump directly to filtered findings.

### Changed
- Filter dependencies by multiple license policy outcomes. The **Dependencies** page license filter now supports multi-select, so you can view dependencies that are Allowed, Blocked, or Commented at the same time. 


### Fixed
- Fixed project filtering on the **Dependencies** page. Filtering by multiple projects now works as expected; the search field clears correctly after you select a project.
- Fixed symbol analysis to analyze only relevant language files per ecosystem during Supply Chain scans.
- Fixed CVE filter chip labeling for shared rules. Filter chips now show all applicable CVEs instead of only the first.
- Fixed missing findings in advisory filters. Advisory filters now correctly show all existing findings, including those created by parity rules, even after reachability rules are published.
- Fixed project selection in Supply Chain filters. You can now select multiple projects as expected when filtering Supply Chain results.

## 🤖 Semgrep Assistant

### Added
- Cursor post-generation hook support. New MCP flags let Semgrep integrate with Cursor post-code-generation workflows.
- AI memories now include links to the PR or MR comments where triage decisions were made, improving traceability back to the original discussion.


### Changed
- ==Pull request comments for Semgrep rules now include AI-generated explanations to help developers understand findings. The summary replaces the rule message, with more details available when expanded.==
- ==Findings now include AI-generated explanations to help clarify why a rule flagged your code, with a concise summary available when applicable.== (Double check if this is just for AI detection findings)
- Clearer error messages for Assistant analysis. Assistant notifications now show more specific error messages, helping you understand why an analysis could not run.
- Improved rule clarity in the AI SAST memories view. When multiple rules share the same name, the full rule path is now shown to distinguish them, and rules are sorted to make them easier to find.


### Fixed

## 🔐 Semgrep Secrets

### Added

### Changed

- Semgrep Secrets findings are now assigned **Critical** severity. This applies to Secrets findings in scans performed after November 2025. Any existing findings from those rules will update to Critical after the project's next full scan.

### Fixed
- Fixed a crash when configuring Slack notifications for Secrets policies. Selecting a Slack channel no longer causes the page to crash, and configurations now save successfully.

## 📝 Documentation and knowledge base

### Added
- Improved API documentation for Ruleboards and Policies. Updated the API docs to correctly display request parameters in the request body and hide path parameters, making it easier to understand and use these endpoints.
## 🔧 OSS Engine

### Changed
- ==Semgrep’s Docker image now uses Alpine Linux 3.23==

* The following versions of the OSS Engine were released in December 2025:
  * 
* The following versions of the OSS Engine were released in November 2025:
  * [<i class="fas fa-external-link fa-xs"></i> 1.145.0](https://github.com/semgrep/semgrep/releases/tag/v1.145.0)
    * [<i class="fas fa-external-link fa-xs"></i> 1.146.0](https://github.com/semgrep/semgrep/releases/tag/v1.146.0)