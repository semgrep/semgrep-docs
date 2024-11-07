---
slug: latest
append_help_link: true
title: Latest release notes
hide_title: true
description: Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for October 2024

## 🌐 Semgrep AppSec Platform

### Added

- Added a **Scan details** page and pane for all completed scans. Use this to troubleshoot or view information about individual scans. 
![Scan details pane with the permalink icon indicated in a box.](/img/scan-details-permalink.png)
_**Figure**. Scan details pane with the permalink icon indicated in a box._
- The **Dashboard** now provides a **Teams** filter, enabling you to create views based on a selection of [Teams](/deployment/teams#teams-beta) you are a part of. Click **Dashboard > Filters** to access the filter.
  - By default, the Dashboard now displays findings from teams you are a part of. Your finding count may differ from your colleagues based on your Teams.
- Added a Jira API endpoint to create Jira tickets, either by passing a list of `issue_ids` or filter query parameters to select findings. Refer to the [<i class="fas fa-external-link fa-xs"></i> Jira API documentation](https://semgrep.dev/api/v1/docs/#tag/TicketingService/operation/semgrep_app.core_exp.notifications.ticketing.handlers.openapi_create_tickets).
- Semgrep now supports [Move on Sui](https://docs.sui.io/concepts/sui-move-concepts), thanks to the contributions of the Sui team.

### Changed

- Various UI improvements to the **Settings > SCM** tab.
![Old SCM card](/img/old-scm-card.png) 
![Updated SCM card](/img/new-scm-card.png)
_**Figure**. Previous and current SCM card UI._
- **Semgrep Managed Scans**: scans now follow fail open behavior, consistent with how Semgrep in CI behaves. Failing open means that Semgrep scans with internal errors do not result in a failed job.
- The **Project details** page's **See findings** button is now a drop-down box, enabling you to select which product you want to view findings for.

### Fixed

- When a scan runs into an exception, Semgrep AppSec Platform displays information about the failure. Previously, within the AppSec Platform UI, it would appear to the user that the scan is still in progress.
- Fixed a bug where Semgrep would crash if `--trace` was passed.

## 💻 Semgrep Code

### Added

- Updated the C# parser to support all versions of the language up to 13.0 (.NET 9).
- Developers can now triage findings by replying to a GitHub PR comment from Semgrep, without the need to log in to Semgrep Cloud Platform. See [Triage findings through comments](/semgrep-code/triage-remediation#triage-findings-through-pr-and-mr-comments) for more information.
- Added an API endpoint you can use to triage findings in bulk, either by passing a list of `issue_ids` or filter query parameters to select findings. Refer to [<i class="fas fa-external-link fa-xs"></i> Bulk triage API documentation](https://semgrep.dev/api/v1/docs/#tag/TriageService).
- Taint analysis now supports tracking sinks through callbacks for all applicable Semgrep-supported languages. For example:
  ```javascript
  function unsafe_callback(x) {
    sink(x); // Semgrep detects a finding here now!
  }
  
  function withCallback(val, callback) {
    callback(val);
  }
  
  withCallback(taint, unsafe_callback)
  ```

### Removed

- Removed support for Vue. The `tree-sitter` grammar has not been updated in 3 years and no community rules have been added. In theory, extract mode could be a good substitute to parse Vue files.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain now provides reachability analysis for Kotlin, including support for Gradle and Maven.
- Improved support and flexibility to Python dependency parsing (public beta):
  - Semgrep now finds non-standard `requirements.txt` names and parses them for dependencies. 
  - Semgrep parses lockfiles in a `/requirements` folder.
- `cargo.lock` parser can now associate dependencies with lockfile line numbers.

### Changed

- Improvements to the **Advisories** page UI. <!-- 16657 -->
- **Dependency search**: the **Ecosystem** filter has been replaced by a **Language** filter. Several languages can share the same ecosystem, such as Java and Kotlin both using Maven. For accurate filtering, the **Dependencies** page now uses a **Language** filter so that you can view that language's packages from any ecosystem supported by Semgrep for that language.

### Fixed

- **Advisories** page: improved speed when fetching advisories.

## 🤖 Semgrep Assistant

### Added

- Users can now use Semgrep Assistant with their own OpenAI API key.
  - Enterprise users can also use the following API providers:
    - Azure OpenAI
    - AWS Bedrock
    - Google Gemini
 See the [AI provider documentation](/semgrep-assistant/getting-started#use-your-ai-provider) for more details.
- PR comments made by Semgrep Assistant now reference the Git commits that it used to generate the fix. <!-- 17152 -->
![Semgrep Assistant referencing multiple commits](/img/semgrep-assistant-reference-commits.png)
_**Figure**. Semgrep Assistant referencing multiple commits._

## 🔐 Semgrep Secrets

- `semgrep ci` output now includes a list of all Secrets rules which generated at least one blocking finding. This behavior is consistent with that of Semgrep Code.

## 📝 Documentation and knowledge base

### Added

- Documented new triage workflows.
- Improvements to the **[Network broker documentation](/semgrep-ci/network-broker)**.
- Updated [Supported languages](/supported-languages) with new languages and features.
- Added new sections in [Semgrep AppSec Platform vs Semgrep OSS](/semgrep-pro-vs-oss).
- Added a new knowledge base article: [FedRAMP Authorization Guidance](/kb/semgrep-appsec-platform/fedramp-with-semgrep)

### Changed

- Reorganized and clarified the following:
  - [Semgrep Supply Chain](/semgrep-supply-chain/overview) documentation
  - [How Semgrep's [**Block** mode works](/semgrep-ci/configuring-blocking-and-errors-in-c)
  - [GitLab SCM connections](/deployment/connect-scm#gitlab-self-managed-plans) and MR comments
- Broadened language around Semgrep Assistant AI now that Assistant supports various LLMs.

### Fixed

- Various fixes to mobile UI.

## 🔧 OSS Engine

- The following versions of the OSS Engine were released in October 2024:
  - [<i class="fas fa-external-link fa-xs"></i> 1.91.0](https://github.com/semgrep/semgrep/releases/tag/v1.91.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.92.0](https://github.com/semgrep/semgrep/releases/tag/v1.92.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.93.0](https://github.com/semgrep/semgrep/releases/tag/v1.93.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.94.0](https://github.com/semgrep/semgrep/releases/tag/v1.94.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.95.0](https://github.com/semgrep/semgrep/releases/tag/v1.95.0)
