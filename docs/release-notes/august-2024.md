---
slug: august-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: August 2024
tags:
  - Release notes
---

# Semgrep release notes for August 2024

## 🌐 Semgrep AppSec Platform

### Added

- A new **primary branch** feature is now generally available (GA)! This feature lets you set your repository's default branch; typically Semgrep deployments perform full scans only on default branches. Previously, Semgrep automatically detected primary branches through a list of common names, such as `main` or `master`, but now you can set it to any unique name your organization may use, such as `prod-1`. [Read the documentation](/deployment/primary-branch).
- **Semgrep Managed Scans and Semgrep in CI**: You can now view logs of all scans by going to the project's **Details** page. <!-- 15974 -->
- **Jira**:
  - Added multi-label support when creating Jira tickets. Use a comma to delineate labels.
  - Added Jira ticket information to information returned from the Findings API.
- Added initial page state for **Project > Details > Scans** tab. <!-- 15805 -->

### Changed

- Various improvements and updates to the Semgrep pricing page. <!-- 16210 -->
- Improvements to tooltips, help text, and icons in the **Projects** and **Findings** pages. <!-- 16246, 16186, 16058 -->
- **Semgrep Managed Scans**: Improved error messages to users when clicking **Run a new scan** from the **Projects > Details** page. Now you are better equipped to troubleshoot issues with managed scans. <!-- 16025 -->
- Updated the Buildkite CI configuration template. <!-- 15932 -->
- **Code search**: YAML is now validated in the search step and invalid YAML is caught when viewing results. <!-- 15886 -->

### Fixed

- **Jira**: Fixed a bug which prevented error messages from appearing in tooltips when Jira tickets failed to be created. Now, you can see detailed error messages letting you know what went wrong when a Jira ticket is not successfully created through Semgrep. <!-- 16259 -->
- Fixed a regression in which clicking outside of the **Findings** page filter component did not clear all filters.
- Various copy edits to the Dashboard (beta) page. <!-- 16176 -->
- Fixed an issue in which untriaged findings could be marked as reopened when creating Jira tickets from the **Finding details** page. <!-- 15969 -->
- Fixed a bug in which the **Dashboard** did not display the correct number of findings. <!-- 15935-->

## 💻 Semgrep Code

### Added

- **Docker**: Semgrep ellipses `...` are now allowed in patterns for `HEALTHCHECK` commands.
- **Terraform**: Added support for `.tfvars` files. <!-- SAF-1481 -->

### Changed

- Semgrep CLI's `--debug` flag no longer generates profiling information, including time and scan performance measurements. To obtain this information, use `--time`.

### Fixed

- Fixed an error with Julia list comprehensions. For example, the pattern `[$A for $B in $C]` matches `[x for y in z]` and result in three bindings `[$A/x,$B/y,$C/z]` instead of one `[$A/x]`.
- Fixed an issue resulting in deadlock when a scan has interfile analysis and tracing enabled and the number of subprocesses is greater than 1 (`j < 1`). <!-- SAF-1157 -->
- Fixed an issue where the number of files reported as scanned by Semgrep CLI was inflated due double-counting of generic and regex modes. <!-- SAF-507 -->
- `--debug` now generates fewer log entries. Additionally, when the number of ignored files, rules, or other entities is too large, Semgrep indicates this in the logs with `<SKIPPED DATA>` to keep the output minimal.

## ⛓️ Semgrep Supply Chain

### Added

- You can now filter and view EPSS scores for your Supply Chain findings.

### Changed

- The link to the Supply Chain findings page in Semgrep AppSec Platform filters to the specific repository and `ref` on which the findings are detected.

### Fixed

- Fixed an issue where Supply Chain's Findings Detail pages weren't showing detailed error information.

## 🤖 Semgrep Assistant

### Added

- Assistant Memories is now in **public beta**. Assistant Memories allows you to tailor Assistant's remediation guidance to your organization's standards and defaults on a per-project, per-rule basis.
- Added the ability for you to use your own OpenAI API key instead of Semgrep's. This allows you to have complete control over how OpenAI handles your data.
- Added the ability to query for Assistant's remediation guidance via the [Findings API](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues).

## 🔐 Semgrep Secrets

### Changed

- The Secrets findings page in Semgrep AppSec Platform has been updated to match those for Semgrep Code and Semgrep Supply Chain.
- Secrets findings no longer display code snippets, even if the user has granted Semgrep code access.
- Secrets is no longer self serve. To access Semgrep Secrets, you can contact your Semgrep account executive for a trial license.

### Fixed

- Fixed an issue that caused files ignored by Semgrep Code, but not Semgrep Secrets, fail to be scanned by Semgrep Secrets. <!-- SAF-1459 -->

## 📝 Documentation and knowledge base

### Added

- Documentation for providing your [own OpenAI API key](/semgrep-assistant/getting-started#use-your-own-openai-api-key) for use with Semgrep Assistant.
- EPSS documentation.
- Sections for various source code manager additions, such as:
  - Support for multiple GitHub Enterprise Server organizations.
  - MR comments for multiple GitLab groups.
- Documentation specifying which features make use of the [IP addresses](/deployment/checklist#ip-addresses) that you must add to your allowlist when you deploy Semgrep.

### Changed

- Various improvements to the **[Network broker documentation](/semgrep-ci/network-broker)**, such as:
  - Improved logging guidance.
  - Clarified variable names and placeholder values that users should replace.
- Various updates to [Editor documentation](https://semgrep.dev/docs/semgrep-code/editor) as a whole.
- Various updates to [Semgrep Assistant](/semgrep-assistant/overview) documentation.
- Updated Semgrep Supply Chain documentation to reflect the latest product UI/UX state.

### Fixed

- Updated and fixed various broken links.
- Minor typographical fixes.

### Removed

- Removed the Ticketing page; Semgrep supports Jira exclusively. Other ticketing integration betas have been closed. Semgrep may reopen beta programs for future ticketing integrations.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in August 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.83.0](https://github.com/semgrep/semgrep/releases/tag/v1.83.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.84.0](https://github.com/semgrep/semgrep/releases/tag/v1.84.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.84.1](https://github.com/semgrep/semgrep/releases/tag/v1.84.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.85.0](https://github.com/semgrep/semgrep/releases/tag/v1.85.0)
