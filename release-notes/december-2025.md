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
- Added a new **Priority** tab on **Findings** page to surface high-priority findings. Each product has default priority categories, and Semgrep admins can customize the **Priority** tab to control which findings appear. Admins can save Priority tab filters for all users.
- Added a new **Provisionally ignored** finding status.
- Commit author emails now appear in the finding's **Details** when available.

### Changed
- The **Findings** page now has improved navigation and more intuitive links. The code path now opens the finding's **Details** page, and an in-product tour introduces the new layout.
- On the **Projects** page, project names now link directly to project details, making it easier to access scan information from the project list.
- On the finding **Details** page, when no ticketing integration is configured, the Fix drop-down now includes a prominent link to the relevant **Integration** settings page.
- Updated **Settings** page layout. The **Settings** page has been reorganized to highlight commonly used features and make it easier to find what you need.
- The triage-by-comment setting is now available in the **Settings > Global** section, making it easier to manage across products.
- When SSO is enabled, the Semgrep AppSec Platform now shows warnings for social authentication in **Settings > Access > Login methods** and highlights users using social auth in **Settings > Users**, helping admins identify and reduce security risks.
- Newly created users who sign in with SSO are now added only to the default deployment, reducing unintended access in multi-deployment organizations.
- Activating or deactivating SSO and other authentication providers now shows more user-friendly success and partial-failure messages.
- The **Today** section on the **Reporting** page now uses the same priority definitions as the **Findings** page, including any custom priority settings.
- The **Guardrails** chart now shows provisionally ignored findings instead of the previous **Filtered by Assistant** field, providing a more complete view of findings excluded from the default list of **Open** findings.
- User search on the **Manage users** page has been simplified. You can now search by email, username, or ID using a single search field, without selecting the search type first.

### Fixed
- Fixed incorrect tab selection during navigation so the correct tab is now highlighted when viewing pages under the project path.
- Fixed IdP-initiated SAML login issues. You can now sign in successfully using IdP-initiated SAML.
- Fixed Assistant triage actions for read-only users. Read-only users can no longer record agreement with Assistant analysis, and the activity timeline now reflects only actions taken by users with triage permissions.
- Fixed an issue where the **Connect** button remains disabled when adding a new GitHub Enterprise connection.
- Fixed an issue where the **Save** and **Reset** buttons appear only when you’ve modified filters or have saved views to manage.
- Fixed CNAPP visibility for non-admin users. Users with access to findings can now see CNAPP integration status, ensuring CNAPP filters and descriptions display correctly.
- Fixed an issue where the **Users** page did not reset when changing the search query.
- Fixed an issue where the **Teams** search bar was unusable when adding users or projects.
- Fixed an issue preventing custom OpenAI API keys from being saved.
- When a scan is running, the **Analyze** button on the finding's **Details** page is now disabled and displays an explanatory tooltip on why this is the case.
- Fixed several issues with Findings page filters:
  - The Save and Reset buttons only appear when you've modified the filters or have saved views to manage.
  - Time-based filters persist
  - Only admins can save changes to the Priority page filters
  - The Priority tab count stays accurate when saved filters change
  - Team filters now appear only when RBAC is enabled, ensuring filters reflect your deployment’s access controls.


## 💻 Semgrep Code

### Changed
- Git Large File Storage (LFS) objects are excluded from baseline scans. Files tracked with Git LFS are no longer scanned during baseline runs, avoiding large or binary files that are not supported by Semgrep.

### Fixed
- Fixed an issue where findings in files that time out or fail to scan were set to a status of **Fixed**, ensuring scan results more accurately reflect what was actually analyzed.
- Fixed validation failures for valid rules. Rules that include emoji in the `message` field now validate correctly.
- Fixed an interfile scan timeout regression, restoring the previous default job behavior to prevent unexpected timeout changes.
- Fixed an issue with duplicate scans triggered by GitHub pull request updates. Semgrep now processes pull request update events only once, preventing duplicate scans for the same change.


## ⛓️ Semgrep Supply Chain

### Added
- The **Advisories** page now shows impacted projects and branches. You can now click on an advisory to see affected projects and branches and use quick links to go directly to relevant findings.
- Added new **High severity** reachability rules to improve vulnerability detection for Java, Kotlin, and Scala projects that use Maven.
- Added symbol analysis support for Supply Chain–only scans when calling `semgrep ci`.

### Changed
- The **Dependencies** page's **License** filter now supports the section of multiple license types,  so you can view dependencies that are **Allowed**, **Blocked**, and **Commented** at the same time. 


### Fixed
- Fixed project filtering on the **Dependencies** page such that filtering by multiple projects now works as expected, and the search field clears correctly after you select a project.
- Fixed symbol analysis to analyze only relevant language files per ecosystem during Supply Chain scans.
- Fixed CVE filter chip labeling for shared rules such that filter chips now show all applicable CVEs instead of only the first.
- Fixed missing findings in advisory filters. Advisory filters now correctly show all existing findings.
- Fixed project selection in Supply Chain filters, allowing you to select multiple projects as expected when filtering results.

## 🤖 Semgrep Assistant

### Added
- Added support for Cursor post-generation hooks, enabling Semgrep to integrate with Cursor workflows after code generation.
- Assistant memories now include links to the pull request or merge request comments where triage decisions were made, improving traceability back to the original source.


### Changed
- Pull request comments for findings generated using Semgrep-authored rules now include Assistant-generated explanations to help developers understand the findings. The summary message can be expanded to show additional details.
- Findings in Semgrep AppSec Platform now include Assistant-generated explanations to clarify why a rule matched your code and a concise summary, if available.
- Assistant notifications now show more specific error messages, helping you understand why an analysis could not run.
- When multiple rules share the same name, the full rule path is now shown in Semgrep AppSec Platform to help distinguish them.

### Fixed

## 🔐 Semgrep Secrets

### Changed

- Semgrep Secrets findings are now assigned a severity of **Critical**. This applies to Secrets findings from scans performed after November 2025. Any existing findings from those rules will be updated to **Critical** after the project's next full scan.

### Fixed
- Fixed an issue with configuring Slack notifications for Secrets policies. Selecting a Slack channel no longer causes the page to crash, and configurations now save successfully.

## 📝 Documentation and knowledge base

### Added
- Improved API documentation for Ruleboards and Policies. The API docs have been updated to correctly display request parameters in the request body and hide path parameters, making it easier to understand and use these endpoints.

## 🔧 OSS Engine

### Changed
- Semgrep’s Docker image now uses Alpine Linux 3.23

* The following versions of the OSS Engine were released in December 2025:
  * [<i class="fas fa-external-link fa-xs"></i> 1.145.0](https://github.com/semgrep/semgrep/releases/tag/v1.145.0)
  * [<i class="fas fa-external-link fa-xs"></i> 1.146.0](https://github.com/semgrep/semgrep/releases/tag/v1.146.0)