---
slug: october-2024
title: October 2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
tags:
  - Release notes
---

# Semgrep release notes for October 2024

## 🌐 Semgrep AppSec Platform

### Added

- Developers can now triage findings by replying to a GitHub PR comment from Semgrep, without the need to log in to Semgrep Cloud Platform. See [Triage findings through comments](/semgrep-code/triage-remediation#triage-findings-through-pr-and-mr-comments) for more information.
- Added a **Scan details** page and drawer for all completed scans. Use this page to troubleshoot or view information about individual scans. 
![Scan details drawer with the permalink icon indicated in a box.](/img/scan-details-permalink.png)
_**Figure**. Scan details drawer with the permalink icon indicated in a box._
- The **Dashboard** now provides a **Teams** filter, enabling you to create views based on a selection of [Teams](/deployment/teams#teams-beta) you are a part of. Click **Dashboard > Filters** to access the filter.
  - By default, the Dashboard now displays findings from teams you are a part of. Your finding count may differ from your colleagues based on your Teams.
- Jira API tk
- Bulk triage findings API endpoint tk
- Semgrep now supports [Move on Sui](https://docs.sui.io/concepts/sui-move-concepts), thanks to the contributions of the Sui team.

### Changed

- Various UI improvements to the **Settings > SCM** tab.
![Old SCM card](/img/old-scm-card.png) 
![Updated SCM card](/img/new-scm-card.png)
_**Figure**. Previous and current SCM card UI._
- **Semgrep Managed Scans**: scans now follow fail open behavior, consistent with how Semgrep in CI behaves. 
- The **Projects** page's **See findings** button is now a drop-down box, enabling you to select which product you want to view findings for.

### Fixed

## 💻 Semgrep Code

### Added

- Filter by triage reasons
- Taint analysis now has support for tracking sinks through callbacks.

### Changed

### Fixed

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain now provides reachability analysis for Kotlin, including support for Gradle and Maven.
- Improved support and flexibility to Python dependency parsing (public beta):
  - Semgrep now finds non-standard `requirements.txt` names and parses them for dependencies. 
  - Semgrep parses lockfiles in a `requirements` folder.

### Changed

- Improvements to the **Advisories** page UI. <!-- 16657 -->
- **Dependency search**: The **Ecosystem** filter has been replaced by a **Language** filter. Several languages can share the same ecosystem, such as Java and Kotlin both using Maven. For accurate filtering, the Dependencies page now uses a Language filter so that you can view that language's packages from any ecosystem supported by Semgrep for that language.

### Fixed

- Improved speed when fetching advisories.

## 🤖 Semgrep Assistant

### Added

- Users can now use Semgrep Assistant with their own OpenAI API key.
  - Enterprise users can also use the following API providers:
    - Azure OpenAI
    - AWS Bedrock
    - Google Gemini
 - See the [AI provider documentation](/semgrep-assistant/getting-started#use-your-ai-provider) for more details.
- PR comments made by Semgrep Assistant now reference the Git commits that it used to generate the fix. <!-- 17152 -->
![Semgrep Assistant referencing multiple commits](/img/semgrep-assistant-reference-commits.png)
_**Figure**. Semgrep Assistant referencing multiple commits._

## 🔐 Semgrep Secrets

### Added

## 📝 Documentation and knowledge base

### Added
