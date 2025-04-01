---
slug: march-2023
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for March 2025

<!-- Remember to update latest endpoint -->
<!-- Remember to update index page -->


## 🌐 Semgrep AppSec Platform

### Added

- Added the capability to delete projects through the Semgrep API. Deleting a project also deletes all of its findings. Refer to the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_delete_project).
- You can now view the `cwe_names` and `owasp_names` for findings fetched through the Semgrep API. See the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues)
- Added `external_discussion_id` and `external_note_id` to findings returned by the Semgrep API. Use these fields to build links, put together dashboards, or other functionalities.
- Various performance enhancements around full scans performed by Semgrep Managed Scans. <!-- tk check proper name -->
- **Teams**: Members are able to view the **Project details** page. This enables them to view the scan logs for diff-aware scans. <!-- FS1564 -->
- Added a warning notification when you disable **all** rules. Disabling all rules means no findings will be detected in subsequent scans. <!-- This is true for Code and Secrets, so broadly including it in AppSec Platform -->
- Added a tooltip explaining the reason for why checkboxes for certain findings cannot be selected. Typically this is because the finding has been fixed.
![Tooltip for findings in off state](/img/tooltip-disabled-finding.png)
- Added a **Use Network Broker** toggle <i class="fa-solid fa-toggle-large-on"></i> within the webhook integration dialog. This enables you to control access to the network broker on a per-webhook basis.
- Dataflow traces now provide cross-file code snippets, centralizing context from several files into the dataflow graph. <!-- SEC-1534 -->
- The **Finding details** page now has a new triage button with options to ignore, fix, and reopen findings.
- Added [<i class="fas fa-external-link fa-xs"></i> `llms.txt`](https://semgrep.dev/llms.txt).

### Changed

- When findings are specifically ignored through a `nosemgrep` comment, Semgrep now informs the user why. Previously, there was no context provided when ignoring through a comment.  <!-- SEC2877 -->
- Improved pagination performance.
- Improved performance when fetching data for large teams.

## 💻 Semgrep Code

- Updates in Semgrep AppSec Platform regarding findings and rules also apply to Semgrep Code.

## ⛓️ Semgrep Supply Chain

### Added

### Changed

### Fixed

- Improved how Semgrep handles policies when projects or tags associated with the policy have been deleted. Semgrep now displays a warning when all projects or tags associated with a policy have been deleted:
![Warning message when projects or tags in a policy have been deleted](/img/policy-zero-project-state.png)

## 🤖 Semgrep Assistant 

## 📝 Documentation and knowledge base

- Added the following new documents, articles and sections:
  - DOCUMENT_NAME
  - KB_ARTICLE_NAME
- Minor additions and updates:

- Major updates have been made to the following documentation:
- Updated how the docs are organized (minor changes).
- Various documentation presentation updates.
- Minor documentation updates.

## 🔧 Semgrep Community Edition (CE)

* The following versions of Semgrep CE were released in March 2025:

