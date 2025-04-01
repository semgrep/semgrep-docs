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

- You can now delete projects through the Semgrep API. Deleting a project also deletes all of its findings. Refer to the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_delete_project).
- You can now view the `cwe_names` and `owasp_names` for findings fetched through the Semgrep API. See the [<i class="fas fa-external-link fa-xs"></i> API documentation](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues)
- Various performance enhancements around full scans performed by Semgrep Managed Scans. <!-- tk check proper name -->
- **Teams**: Members are able to view the **Project details** page. This enables them to view the scan logs for diff-aware scans. <!-- FS1564 -->

### Changed

### Fixed



## 💻 Semgrep Code

### Added

### Changed

### Fixed

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

