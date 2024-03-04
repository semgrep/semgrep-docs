---
slug: february-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: February 2024
tags:
  - Release notes
---

# Semgrep release notes for February 2024

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in February 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.X.Y](https://github.com/semgrep/semgrep/releases/tag/v1.X.Y)

## 🌐 Cloud Platform

### Added

### Changed

### Fixed

## 💻 Code

### Added

* Added new rules for Elixir and the Phoenix framework, covering a broad range of security and correctness issues. These are available in the `p/elixir` ruleset. <!-- Do we need to mention that this is for Pro users only? -->
* Added support for Python, with focus for the Flask ecosystem, to the Semgrep Pro Engine.

### Changed

### Fixed

## ⛓️ Supply Chain

### Added

### Changed

### Fixed

## 🤖 Assistant (beta)

### Added

### Changed

### Fixed

## 🔐 Secrets (beta)

### Added

- Added the following new rules:
  - Detection rules for Azure and AWS
  - Semantic secrets rules for Python, JavaScript, and TypeScript
  - Semantic rules for hard-coded credentials in bash for `curl` commands
- Added non-validator regex detection for databases, including MongoDB, Microsoft SQL Server, MySQL, Postgres, and Redis
- Added secrets rule management, which is accessible in Semgrep Cloud Platform by going to **Rules** > **Policies** > **Secrets**. This allows you to:
  - See all available rules
  - Set valid finding modes for the rules
  - Set invalid and error validation states modes across multiple rules

### Changed

### Fixed

## 📝 Documentation and knowledge base

### Added

### Changed

### Fixed
