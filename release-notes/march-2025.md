---
slug: march-2025
title: March 2025
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
hide_table_of_contents: false
date: 2025-03-30T10:00
---

# Semgrep release notes for March 2025

<!-- Remember to update latest endpoint -->
<!-- Remember to update index page -->

The following updates were made to Semgrep in March 2025.

## 🌐 Semgrep AppSec Platform

### Added

- Added the capability to delete projects through the Semgrep API. Deleting a project also deletes all of its findings. Refer to the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_delete_project).
- You can now view the `cwe_names` and `owasp_names` for findings fetched through the Semgrep API. See the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues).
- Added `external_discussion_id` and `external_note_id` to findings returned by the Semgrep API. Use these fields to build links, put together dashboards, or other functionalities.
- Various performance enhancements around full scans performed by Semgrep Managed Scans.
- **Teams**: Members are able to view the **Project details** page. This enables them to view the scan logs for diff-aware scans. <!-- FS1564 -->
- Added a warning notification when you disable **all** rules. Disabling all rules means no findings will be detected in subsequent scans. <!-- This is true for Code and Secrets, so broadly including it in AppSec Platform -->
- Added a tooltip explaining the reason for why checkboxes for certain findings cannot be selected. Typically this is because the finding has been fixed.
![Tooltip for findings in off state](/img/tooltip-disabled-finding.png#sm-width)
- Added a **Use Network Broker** toggle <i class="fa-solid fa-toggle-large-on"></i> within the webhook integration dialog. This enables you to control access to the network broker on a per-webhook basis.
- Dataflow traces now provide cross-file code snippets, centralizing context from several files into the dataflow graph. <!-- SEC-1534 -->
- The **Finding details** page now has a new triage button with options to ignore, fix, and reopen findings.
- Added [<i class="fas fa-external-link fa-xs"></i> `llms.txt`](https://semgrep.dev/llms.txt).
- Added an [integration with Wiz](/semgrep-appsec-platform/wiz) that enables you to view Semgrep Code findings in Wiz's Security Graph.
- Added the ability to [define the files and folders Semgrep ignores](/ignoring-files-folders-code#define-files-and-folders-for-all-projects-of-an-organization) during scans at the organization level.

### Changed

- When findings are specifically ignored through a `nosemgrep` comment, Semgrep now informs the user why. Previously, there was no context provided when ignoring through a comment.  <!-- SEC2877 -->
- Improved pagination performance.
- Improved performance when fetching data for large teams.

## 💻 Semgrep Code

- Updates in Semgrep AppSec Platform regarding findings and rules also apply to Semgrep Code.

## ⛓️ Semgrep Supply Chain

### Added

- Added the ability to use transitivity and EPSS score as conditions when creating block and comment policies for Supply Chain.
- Added [dependency path support](/semgrep-supply-chain/dependency-search#dependency-paths-beta) for the following Python package managers: `pip`, `pip-tools`, and `pipenv`.
- Added the ability to [download SBOM exports using the Semgrep API](https://semgrep.dev/api/v1/ui/#/Beta/semgrep_app.products.sca.handlers.sbom.openapi_create_sbom_export).

### Fixed

- Improved how Semgrep handles policies when projects or tags associated with the policy have been deleted. Semgrep now displays a warning when all projects or tags associated with a policy have been deleted:
![Warning message when projects or tags in a policy have been deleted](/img/policy-zero-project-state.png)

## 🤖 Semgrep Assistant 

### Added

- **Auto-memories**: If you triage a finding as **Ignored** and provide an explanation of why you change the finding's status to **Ignored**, Assistant automatically determines if it should [create a memory](/semgrep-assistant/customize#add-memory-during-triage) for you. Assistant uses memories to tailor its remediation guidance for your projects.
- Added the ability to select multiple AI providers.

## 🔐 Semgrep Secrets

### Fixed

- Fixed the JSON produced by the `--gitlab-secrets` flag so that it is parsed correctly by GitLab.

## 📝 Documentation and knowledge base

### Added
- Added new documents, articles and sections on the following topics:
  - Global path ignores: Applying path ignores to all projects in an organization
- Minor additions include:
  - Semgrep Assistant features permitted based on roles
  - Semgrep Managed Scans: Bitbucket support
- Added CVE-2025-29783 to trophy case.

### Changed

- The **Supported languages > Semgrep Supply Chain** section has been reorganized for clarity. Product features and supported package managers have been separated into discrete tables.
- Expanded on PR comments in Semgrep Secrets, particularly validation state policies.
- Documentation about Semgrep Supply Chain's ignore behavior has been updated.
- Clarified various procedures regarding:
  - How to remove a Slack integration
  - How triage behaves across different refs or branches
- Various redirects have been updated.

### Fixed

- Various section links have been fixed.
- Minor acronym and product terminology fixes.

## 🔧 Semgrep Community Edition (CE)

* The following versions of Semgrep CE were released in March 2025:

  * [<i class="fas fa-external-link fa-xs"></i>v1.111.0](https://github.com/semgrep/semgrep/releases/tag/v1.111.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.112.0](https://github.com/semgrep/semgrep/releases/tag/v1.112.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.113.0](https://github.com/semgrep/semgrep/releases/tag/v1.113.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.114.0](https://github.com/semgrep/semgrep/releases/tag/v1.114.0)
  * [<i class="fas fa-external-link fa-xs"></i>v1.116.0](https://github.com/semgrep/semgrep/releases/tag/v1.116.0)
