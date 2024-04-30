---
slug: April-2024
hide_title: true
title: April 2024
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
tags:
  - Release notes
---

# Semgrep release notes for April 2024

## 🌐 Semgrep AppSec Platform

<!-- Sara -->
- **Editor and playground**: Structure mode has replaced simple mode.
- Semgrep Cloud Platform has been renamed to Semgrep AppSec Platform.
- Dashboard UX improvements
- The default Bitbucket YAML configuration file has been updated with options for full, diff, and on-demand scans.

### Added

### Changed

### Fixed

## 💻 Code

### Added

### Changed

### Fixed

## ⛓️  Supply Chain

<!-- should we include the new UI for SCA  -->

## 🤖 Semgrep Assistant


## 🔐 Semgrep Secrets

<!--
For Katie's draft
- Superseded rules
- Historical scans
- Custom rule-writing
-->


## 📝 Documentation and knowledge base

### Added

- Added the following new documents:
    - [<i class="fa-regular fa-file-lines"></i> Semantic detection in Java](/semgrep-code/java) - describes how Semgrep reduces false positives through its understanding of the Java language.
    - [<i class="fa-regular fa-file-lines"></i> How to scan your Git history (beta)](/semgrep-secrets/historical-scanning).
    - [<i class="fa-regular fa-file-lines"></i> Write custom validators](/semgrep-secrets/validators)
    - Added two additional glossaries:
        - Static analysis and rule writing glossary
        - Semgrep Code glossary
- Added a new section for user management on **[Teams (beta)](/deployment/teams)**, an access control feature that enables administrators or managers to assign projects to specific team members.
- Expanded the documentation on [Semgrep Assistant's new features](/semgrep-assistant/overview).

### Changed

- Renamed occurrences of Semgrep Cloud Platform to Semgrep AppSec Platform.
- Edited the [Semgrep FAQ](/faq) for clarity and correctness.
- Renamed instances of Pro Engine to cross-file or interfile analysis.
- Rearranged documents under Semgrep Code to better reflect the user journey.
- Updated documentation on how Semgrep differentiates between **Fixed** and **Removed** statuses.
- Updated the sample [Bitbucket Pipelines CI configuration](/semgrep-ci/sample-ci-configs#bitbucket-pipelines) file
- Minor additions and updates:
    - How Semgrep computes [user limits across multiple orgs](/usage-and-billing).
    - Findings retention policy.
- The following knowledge base articles have been updated:
    - [Scan a monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts)
    - [Failed to run a Git command during a pull or merge request scan](/kb/semgrep-ci/git-command-errors)

### Fixed

- Fixed some broken links to redirect to the correct doc.
- Standardized the disuse of trailing slashes in docs URLs.

## 🔧 OSS Engine

The following versions of the OSS Engine were released in April 2024:
