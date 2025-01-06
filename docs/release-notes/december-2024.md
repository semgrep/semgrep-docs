---
slug: december-2024
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: December 2024
tags:
  - Release notes
---

# Semgrep release notes for December 2024

<!-- Remember to update latest endpoint -->

:::info Important changes
- The Semgrep CLI tool requires a minimum version of **Python 3.9** as of Semgrep 1.100.0.
- Semgrep OSS is now **Semgrep Community Edition (CE)**. Read the [Semgrep CE section](#semgrep-community-edition-ce) for more details.
:::

## 🌐 Semgrep AppSec Platform

### Added

- **Policy management API** is now in private beta. This API enables you to add, update, and turn off rules for selected policies in your chosen mode.
- You can now export your findings in CSV format. Semgrep can export up to 10,000 most recent findings. For findings greater than 10,000, use the [<i class="fas fa-external-link fa-xs"></i> API](https://semgrep.dev/api/v1/docs/). See [Export findings](/semgrep-code/findings#export-findings) for more information.
  ![The download findings CSV button](/img/download-csv.png#md-width)
  _**Figure**. The download findings CSV button._
- Added new **Pro rules**:
  - 4 new rules for **Express.js** that cover SQL injection, object injection, and misconfiguration vulnerabilities.
  - 13 new rules for **NestJS** framework vulnerabilities that cover code injection, SQL injection, path traversal, log injection, XML external entity, and cross site scripting.

### Changed

- **Semgrep Managed Scans**: Cloning repositories is now faster. This improves the speed of the overall scan.

## 💻 Semgrep Code

- Support for field-sensitive taint tracking tk

## ⛓️ Semgrep Supply Chain

### Added

- Semgrep now supports reachability for **Swift**. For CLI users, ensure that you are using Semgrep **1.98.0 or higher**. Swift is the tenth language Semgrep supports with reachability analysis.
- **Dependency Path**, which displays how transitive dependencies are imported into your code, is now in public beta for Java Gradle and Maven package managers.
  - Dependency Path for Kotlin is in private beta.
  - To join in this beta, contact [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com).
- Semgrep can now scan your Java Gradle and Maven codebases without the need for a lockfile. This feature is in public beta for Java and private beta for Kotlin Gradle and Maven. See also [Scan a project without lockfiles](https://semgrep.dev/docs/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).
  - To participate in this beta, contact [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com).

## 🤖 Semgrep Assistant 

### Changed

- Semgrep Assistant is in the process of integrating its remediation guidelines into a single PR or MR comment. This means that you receive only one comment per finding, not including summary comments.
  - Previously, Semgrep Assistant would add an additional, separate comment on the thread after the first comment from Semgrep. With this change, **all Semgrep guidance** is in one comment for clarity.
  - This change is rolling out over the course of several weeks.

## 🔐 Semgrep Secrets

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

- Semgrep OSS has been renamed to **Semgrep Community Edition (CE)**. Semgrep CE remains free, with 2800+ rules and no login required.
- Rules authored and maintained by Semgrep, Inc. are now licensed under **Semgrep Rules License v.1.0**. These rules are available only for internal, non-competing, and non-SaaS contexts.
- As of Semgrep 1.100.0, certain JSON and SARIF export fields are available only for logged-in users. See the [JSON and SARIF reference](/semgrep-appsec-platform/json-and-sarif) for the list of fields.
- The following versions of Semgrep CE were released in December 2024:
  - [<i class="fas fa-external-link fa-xs"></i> 1.98.0](https://github.com/semgrep/semgrep/releases/tag/v1.98.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.99.0](https://github.com/semgrep/semgrep/releases/tag/v1.99.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.100.0](https://github.com/semgrep/semgrep/releases/tag/v1.100.0)
