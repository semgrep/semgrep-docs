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

### Changed

- Switched from magenta to yellow when highlighting findings of medium or warning severity. Magenta is now used for findings with critical severity.

### Fixed

## 💻 Semgrep Code

### Added

- Docker: Semgrep ellipses `...` are now allowed in patterns for `HEALTHCHECK` commands.
- Terraform: added support for `.tfvars` files. <!-- SAF-1481 -->

### Changed

- Semgrep CLI's `--debug` flag no longer generates profiling information, including time and scan performance measurements. To obtain this information, use `--time`.

### Fixed

- Fixed an error with Julia list comprehensions. For example, the pattern `[$A for $B in $C]` matches `[x for y in z]` and result in three bindings `[$A/x,$B/y,$C/z]` instead of one `[$A/x]`.
- Fixed an issue resulting in deadlock when a scan has interfile analysis and tracing enabled and the number of subprocesses is greater than 1 (`j < 1`). <!-- SAF-1157 -->
- Fixed an issue where the number of files reported as scanned by Semgrep CLI was inflated due double-counting of generic and regex modes. <!-- SAF-507 -->
- `--debug` now generates fewer log entries. Additionally, when the number of ignored files, rules, or other entities is too large, Semgrep indicates this in the logs with `<SKIPPED DATA>` to keep the output minimal.

## ⛓️ Semgrep Supply Chain

### Added

- The Semgrep AppSec Platform now displays EPSS scores for all Supply Chain findings. The [exploit prediction scoring system (EPSS) probability](https://www.first.org/epss/) represents the likelihood that the vulnerability will be exploited in the wild in the next 30 days, where the higher the score, the greater the probability the vulnerability is exploited.

### Changed

- The link to the Supply Chain findings page in Semgrep AppSec Platform filters to the specific repository and `ref` on which the findings are detected.

### Fixed

## 🤖 Semgrep Assistant

### Added

- Added the ability for Semgrep Assistant users to use their own OpenAI API key instead of Semgrep's. This allows users to have complete control over how OpenAI handles their data.
- Added the ability to query for Assistant's remediation gudiance via the [Findings API](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues).

### Changed

### Fixed

## 🔐 Semgrep Secrets

### Added

### Changed

- The Secrets findings page in Semgrep AppSec Platform has been updated to match those for Semgrep Code and Semgrep Supply Chain.
- Secrets findings no longer display code snippets, even if the user has granted Semgrep code access.

### Fixed

- Fixed an issue that caused files ignored by Semgrep Code, but not Semgrep Secrets, failed to be scanned by Semgrep Secrets. <!-- SAF-1459 -->

## 📝 Documentation and knowledge base

### Added

### Changed

### Fixed

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in August 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.83.0](https://github.com/semgrep/semgrep/releases/tag/v1.83.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.84.0](https://github.com/semgrep/semgrep/releases/tag/v1.84.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.84.1](https://github.com/semgrep/semgrep/releases/tag/v1.84.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.85.0](https://github.com/semgrep/semgrep/releases/tag/v1.85.0)

