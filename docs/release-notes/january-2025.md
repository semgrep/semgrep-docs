---
slug: january-2025
title: January 2025
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
tags:
  - Release notes
---

# Semgrep release notes for January 2025

<!-- Remember to update latest endpoint -->
<!-- Remember to update index page -->


## 🌐 Semgrep AppSec Platform

- Links to the project settings & scans pages will now use project IDs rather than names
- ADO SMS public beta
- Email link to join org
- Policy management API

## 💻 Semgrep Code

## ⛓️ Semgrep Supply Chain

### Added

- [Dependency Paths](/semgrep-supply-chain/dependency-search#view-the-dependency-path) are now available for the following languages and package managers:
  - JavaScript: All package managers supported by Semgrep.
  - Python: Only Poetry is supported.
- Semgrep can now scan C# Nuget codebases without the need for a lockfile. This feature is in **private beta**. See also [Scan a project without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta). Reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) to join the beta program.
- Semgrep Supply Chain now ingests CVE information from [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable). This information is used to generate rules that can detect if you're affected by CVEs from this source.

### Changed

- [Policies](/supply-chain/policies) are now in public beta.

## 🤖 Semgrep Assistant 

## 🔐 Semgrep Secrets

## 📝 Documentation and knowledge base

- Added the following new documents, articles and sections:
  - [Semgrep for developers](/for-developers/overviews) is a new series of documents that aims to:
    - Help AppSec engineers educate developers about Semgrep and secure coding.
    - Inform developers of how to resolve Semgrep findings in various environments, such as their pull requests or merge requests.
  - KB_ARTICLE_NAME
- Minor additions and updates:
  - tk
- Major updates have been made to the following documentation:
  - Supported languages
- Thanks to savq for their improvements to Semgrep's contributing documentation.

## 🔧 Semgrep Community Edition (CE)

* The following versions of Semgrep CE were released in January 2025:

  - [<i class="fas fa-external-link fa-xs"></i> 1.102.0](https://github.com/semgrep/semgrep/releases/tag/v1.102.0) 
  - [<i class="fas fa-external-link fa-xs"></i> 1.103.0](https://github.com/semgrep/semgrep/releases/tag/v1.103.0)
  - [<i class="fas fa-external-link fa-xs"></i> 1.104.0](https://github.com/semgrep/semgrep/releases/tag/v1.104.0)
