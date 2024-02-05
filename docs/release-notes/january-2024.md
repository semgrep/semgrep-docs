---
slug: january-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: January 2024
tags:
  - Release notes
---

# Semgrep release notes for January 2024

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in January 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.55.1](https://github.com/semgrep/semgrep/releases/tag/v1.55.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.55.2](https://github.com/semgrep/semgrep/releases/tag/v1.55.2)
  * [<i class="fas fa-external-link fa-xs"></i>1.56.0](https://github.com/semgrep/semgrep/releases/tag/v1.56.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.57.0](https://github.com/semgrep/semgrep/releases/tag/v1.57.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.58.0](https://github.com/semgrep/semgrep/releases/tag/v1.58.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.59.0](https://github.com/semgrep/semgrep/releases/tag/v1.59.0)

## 🌐 Cloud Platform

### Added

* Semgrep's Visual Studio Code extension now runs natively on Windows machines.
* Added ability to test the connection to their source code manager by going to
  **Settings** > **Source Code Managers**.
* Added ability to manually create custom dependency exceptions under **Supply
  Chain** > **Settings**. This helps prevent blocking a pull request or merge
  request due to licensing issues. For example, if `bitwarden/cli@2023.9.0`,
  which has a GPL-3.0 license, is on the allowlist, setting a custom dependency
  exception means that the exclusion won't fail when upgrading to
  `bitwarden/cli@2023.9.1`.
* Projects are removed from SCP when the corresponding GitHub repository is
  archived.
* **CLI tool**: 
  * Added color-coded severity icons, such as `❯❯❱`, to the CLI
  output for findings of known severity.
  * Metrics sent from the CLI to Semgrep now include a breakdown of
  the number of findings per product.
  * Rules stored under a hidden directory, such as
  `dir/.hidden/myrule.yml`, are now processed when scanning with the `--config`
  flag.

### Changed

- Improved loading times for **Dashboard** and **Findings** pages.
* Renamed the **Upgrade** page to **Usage & billing**.
* Redesigned the **Settings** > **Source Code Managers** page; changes include:
  * Renamed the **Remove SCM config** button to **Disconnect**.
  * Set the **Remove app** button to only show up for registered GitHub apps.
* Improved the page load times for the **Settings** > **Source Code Managers**
  page, especially for organizations with many source code managers connected.
* The **Findings** page now displays issues present on multiple branches,
  regardless of which branch is used as a filter. 
* Temporarily removed support for writing rules using Jsonnet.

### Fixed

* Fixed an issue where the number of **Open** findings displayed in the
  navigation bar next to the **Code** link differed from the number displayed in
  the **Open** status filter.
* Fixed an issue where leaving a note on a finding also triaged the issue; users
  can now leave notes without changing the finding's triage state.
* Fixed an issue where paid subscribers couldn't submit support cases through
  the **Help** page.
* Fixed an issue where hovering over the Assistant's **Analyze** button caused
  the window to jitter.
* **CLI tool**: 
  * Fixed an issue where multi-line comments in Dockerfiles weren't
  parsed correctly.
  * Fixed an issue where Semgrep used `/tmp` instead of the path set
    in the `TMPDIR` environment variable for the Semgrep cache.
  * Fixed an issue where Semgrep would error on reading a
    `nosemgrep` comment with multiple rule IDs.
  * Fixed a bug where `Gemfile.lock` files with multiple `GEM`
    sections weren't parsed correctly.

## 💻 Code

### Added

### Changed

### Fixed

## ⛓️ Supply Chain

### Fixed

* Fixed an issue where Semgrep couldn't parse a Pipfile correctly if it had a
  `[dev-packages]` section.

## 🤖 Assistant (beta)

### Added

### Changed

### Fixed

## 📝 Documentation and knowledge base

### Added

### Changed

### Fixed