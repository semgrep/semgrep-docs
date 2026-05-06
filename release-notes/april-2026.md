---
slug: april-2026
description: >-
  Release notes include the changes, fixes, and additions in Semgrep and its components.
title: April 2026
hide_title: true
displayed_sidebar: releasenotesSidebar
tags:
 - Release notes
---

# Semgrep release notes for April 2026

The following updates were made to Semgrep in April 2026.

## 🌐 Semgrep AppSec Platform

### Added

* Users who sign in using GitHub or GitLab when their organization has corporate SSO configured now see an message prompting them to log in with their corporate SSO credentials instead. <!-- source: [PR #27402](https://github.com/semgrep/semgrep-app/pull/27402) -->
* Added workflow execution usage information to the [AI credits dashboard](https://semgrep.dev/orgs/-/settings/usage) so users can see workflow runs alongside scans, triage actions, and fixes. <!-- source: [PR #28123](https://github.com/semgrep/semgrep-app/pull/28123) -->
* Added the ability to download contributor usage information from **Settings > Usage & Billing**. <!-- source: [PR #28186](https://github.com/semgrep/semgrep-app/pull/28186) -->
* Added AI-powered detection findings to the findings API endpoint (`GET /api/v1/deployments/{slug}/findings`).
* Added Jira ticketing support for AI-powered detection findings. <!-- source: [PR #27471](https://github.com/semgrep/semgrep-app/pull/27471) -->
**Semgrep Plugin**: added support for a Supply Chain hook.

### Changed

* The interfile analysis engine has been redesigned to improve performance. These improvements introduce a change in how findings are generated, which might result in additional true positives and fewer false positives.
* Contributor seat limit alerts now explain that scans continue as a courtesy when an organization exceeds its seat limit, replacing the previous inaccurate "scans will be paused" text. <!-- source: [PR #27894](https://github.com/semgrep/semgrep-app/pull/27894) -->
* Removed the **Fixed in** time filter option from all **Findings** pages. <!-- source: [PR #27324](https://github.com/semgrep/semgrep-app/pull/27324) -->

### Fixed

* Fixed an issue where invalid configurations caused the **Integrations** page to not load. Semgrep now displays a meaningful error and allows you to edit or delete the configuration. <!-- source: [PR #27292](https://github.com/semgrep/semgrep-app/pull/27292) -->
* Fixed an issue where Semgrep did not save changes when Gradle or Maven registry integration credentials were updated. <!-- source: [PR #27803](https://github.com/semgrep/semgrep-app/pull/27803) -->
* Fixed an issue where the **Settings > Usage** panel incorrectly showed a subset of seats when a deployment had multiple active licenses for the same product instead of the correct combined total. <!-- source: [PR #27261](https://github.com/semgrep/semgrep-app/pull/27261) -->
* Fixed an issue where the **Remove user from organization** button was available to **Managers**, allowing them to remove Admin users. <!-- source: [PR #27367](https://github.com/semgrep/semgrep-app/pull/27367) -->
* Fixed an issue where read-only users could upload CLI scan results and overwrite findings by setting `SEMGREP_REPO_DISPLAY_NAME`. CLI scan endpoints now enforce scan permissions. <!-- source: [PR #27501](https://github.com/semgrep/semgrep-app/pull/27501) -->
* Fixed an issue where CSV findings exports failed with `IndexError: list index out of range` for some users when a paginated batch returned an empty list. <!-- source: [PR #27585](https://github.com/semgrep/semgrep-app/pull/27585) -->
* Fixed the `repos` filter on the findings and issues API endpoints to use case-insensitive matching. <!-- source: [PR #27997](https://github.com/semgrep/semgrep-app/pull/27997) -->
* Fixed an issue where the **provisionally ignored** filter for the public findings API endpoints returned all findings. <!-- source: [PR #27834](https://github.com/semgrep/semgrep-app/pull/27834) -->
* Fixed an issue where the Jira integration failed to load for deployments that saved their Jira configuration before support for AI-detection findings support was added. <!-- source: [PR #27777](https://github.com/semgrep/semgrep-app/pull/27777) -->
* Fixed an issue with the SARIF trace output for taint mode so that it now uses the correct file URI and includes the sink call trace in `codeFlows`.
* **IDE**: fixed an issue where network errors occuring during token verification resulted in saved tokens being cleared.
* Minor UI fixes.

## 💻 Semgrep Code

### Added

* The **finding details** page now displays information on why a finding was ignored at the top of the page. Users no longer need to go to the **Activity** section to see this information. <!-- source: [PR #27901](https://github.com/semgrep/semgrep-app/pull/27901) -->
* Added the findings count and a link to view findings to the AI-powered detection scan progress timeline when a scan completes. <!-- source: [PR #27392](https://github.com/semgrep/semgrep-app/pull/27392) -->
* Added AI-powered detection findings to the Findings CSV export file. <!-- source: [PR #27286](https://github.com/semgrep/semgrep-app/pull/27286) -->
* Improved support for variadic functions in taint-tracking mode.
* **Scala**: added `tree-sitter` parser to improve parsing accuracy.

### Fixed

* Fixed an issue where the AI-powered detection scan time estimate was grossly inflated. <!-- source: [PR #27785](https://github.com/semgrep/semgrep-app/pull/27785) -->
* Fixed an issue where Autofix wasn't able to create a GitHub pull request due to the Semgrep GitHub app requesting insufficient permissions. <!-- source: [PR #27832](https://github.com/semgrep/semgrep-app/pull/27832) -->
* Fixed an issue where Autofix features were unavailable to organization **members**, as well as **admins**. <!-- source: [PR #28148](https://github.com/semgrep/semgrep-app/pull/28148) -->
* Fixed an issue where Autofix displayed a suggested fix for Supply Chain findings. Autofix is only applicable to Code findings. <!-- source: [PR #27446](https://github.com/semgrep/semgrep-app/pull/27446) -->
* Fixed an issue where Autofix errored out when attempting to open pull requests for Azure DevOps repositories. Semgrep now rejects these requests since Azure DevOps isn't supported. <!-- source: [PR #27444](https://github.com/semgrep/semgrep-app/pull/27444) -->
* Fixed an issue where Autofix errored out when handling requests involving archived repositories. Semgrep now rejects these requests and displays an error message accordingly. <!-- source: [PR #27483](https://github.com/semgrep/semgrep-app/pull/27483) -->
* Fixed an issue where some GitHub Enterprise users stopped seeing Autofix pull requests. <!-- source: [PR #27972](https://github.com/semgrep/semgrep-app/pull/27972) -->
* Fixed an issue where provisionally ignored findings couldn't be triaged without a comment provided. <!-- source: [PR #27379](https://github.com/semgrep/semgrep-app/pull/27379) -->
* Fixed Autofix pull request descriptions so that they properly display the user's GitHub user name. <!-- source: [PR #27156](https://github.com/semgrep/semgrep-app/pull/27156) -->
* Fixed an issue with GitHub App permission checks, which had been using app manifest permissions, or what the app declares, instead of installation-level permissions, or what was actually granted, causing the **Autofix** button to be incorrectly hidden or shown. <!-- review: may not be customer-facing — delete if not relevant --> <!-- source: [PR #27513](https://github.com/semgrep/semgrep-app/pull/27513) -->
* Fixed performance issues during the parsing of Semgrep rules containing non-BMP unicode characters
* **Scala**: 
  * Fixed an issue with trait parameters in versions 3.4.x and later so that they are now parsed correctly.
  * Fixed an issue where Semgrep failed silently instead of returning an error when target file discovery fails.

## ⛓️ Semgrep Supply Chain

### Added

Supply Chain advisories now have dedicated detail pages, replacing the previously used drawers. <!-- source: [PR #27685](https://github.com/semgrep/semgrep-app/pull/27685) -->

### Fixed

* Fixed an issue with legacy Supply Chain findings URLs that resulted in the findings page showing zero results. <!-- source: [PR #27522](https://github.com/semgrep/semgrep-app/pull/27522) -->
* Fixed the **Dependencies** filter on the **Findings** page so that exact matches rank above all other matches. <!-- source: [PR #27877](https://github.com/semgrep/semgrep-app/pull/27877) -->
* Fixed the advisory ID search so that it is case insensitive. <!-- source: [PR #28031](https://github.com/semgrep/semgrep-app/pull/28031) -->
* Fixed an issue where the Autofix API endpoints accepted pull requests for issues that were already fixed, removed, or ignored. <!-- source: [PR #27672](https://github.com/semgrep/semgrep-app/pull/27672) -->

## 🤖 Semgrep Multimodal

### Added

* Added IAM role-assumption authentication mode for AWS Bedrock BYOK. In addition to static access keys, you can now configure an IAM role ARN and grant Semgrep cross-account access using the generated external ID. <!-- source: [PR #28110](https://github.com/semgrep/semgrep-app/pull/28110) -->

### Changed

* Findings of **critical** or **high** severity with **high** or **medium confidence** identified during diff-aware scans are now included in autotriage analysis. <!-- source: [PR #27633](https://github.com/semgrep/semgrep-app/pull/27633) -->
* The memory creation dialog now prompts you to create specific, named memories, such as "`ConfigService` is an internal backend service" instead of generic, conditional memories. <!-- source: [PR #27899](https://github.com/semgrep/semgrep-app/pull/27899) -->

### Fixed

* Fixed an issue with pull request comment URL construction for tag-scoped and deployment-wide memories that previously resulted in no pull request comments posting. <!-- source: [PR #27891](https://github.com/semgrep/semgrep-app/pull/27891) -->

## 🔧 OSS Engine

- The following versions of the OSS Engine were released in April 2026:

  - [<i class="fas fa-external-link fa-xs"></i>1.161.0](https://github.com/semgrep/semgrep/releases/tag/v1.161.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.160.0](https://github.com/semgrep/semgrep/releases/tag/v1.160.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.159.0](https://github.com/semgrep/semgrep/releases/tag/v1.159.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.158.0](https://github.com/semgrep/semgrep/releases/tag/v1.158.0)
  - [<i class="fas fa-external-link fa-xs"></i>1.157.0](https://github.com/semgrep/semgrep/releases/tag/v1.157.0)
