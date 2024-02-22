---
slug: latest
append_help_link: true
title: Latest release notes
hide_title: true
description: Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
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
* Added ability for organizations to test connections to GitHub and GitLab by going to
  **Settings** > **Source Code Managers**.
* Projects are now moved from the **Scanning** to **Not scanning** tab when the
  corresponding GitHub repository is archived.
* **CLI tool**: 
  * Added color-coded severity icons, such as `❯❯❱`, to the CLI
  output for findings of known severity.
  * Metrics sent from the CLI and collected by Semgrep now include a breakdown of the number
  of findings per product.
  * Rules stored under a hidden directory, such as
  `dir/.hidden/myrule.yml`, are now processed when scanning with the `--config`
  flag.

### Changed

* Renamed the **Upgrade** page to **Usage & billing**.
* Redesigned the **Settings** > **Source Code Managers** page; changes include:
  * Renamed the **Remove SCM config** button to **Disconnect**.
  * Set the **Remove app** button to only show up for registered GitHub apps.
* Improved the page load times for the **Settings** > **Source Code Managers**
  page, especially for organizations with many source code managers connected.
* Updated de-duplication logic for users with multiple source code managers. <!-- 12409, 12418 -->

### Fixed

* Fixed an issue where paid subscribers couldn't submit support cases through
  the **Help** page.
* **CLI tool**: 
  * Fixed an issue where multi-line comments in Dockerfiles weren't
  parsed correctly.
  * Fixed an issue where Semgrep used `/tmp` instead of the path set
    in the `TMPDIR` environment variable for the Semgrep cache.
  * Fixed an issue where Semgrep would error on reading a
    `nosemgrep` comment with multiple rule IDs.

## 💻 Code

### Added

- **Swift**: Now supports typed metavariables, such as `($X : ty)`.
- **Java**: You can now use metavariable ellipses properly in function arguments, as statements, and as expressions. <!-- (gh-9260)-->For instance, you may write the pattern:
    ```
    public $F($...ARGS) { ... }
    ``` 
- **C++ with Semgrep Pro Engine**: Improved translation of delete expressions to the dataflow so that
recently added at-exit sinks work on them. Previously, delete expression at "exit" positions were not being properly recognized as such. <!-- (pa-3339) -->

## 🔐 Secrets (beta)

- Improved loading times for **Dashboard** and **Findings** pages.
- Redesigned the **Findings** page to display issues present on multiple branches,
  regardless of which branch is used as a filter.

### Fixed

- **Editor**: Fixed a bug where the editor could crash due to rules having more than one metadata subcategory.
- Fixed a bug in which **open** findings were counted differently between the **Code** and **Dashboard** pages in Semgrep Cloud Platform. The counts now match.  <!-- 12319 -->
- **Findings** page:
    - Fixed a bug in which leaving a note automatically triaged a finding. Now, the state of the finding does not change when a user leaves a note. <!-- 12051 -->
    - Fixed a bug in which **fixed** findings were triagable despite their already fixed state through the rule group checkbox. Now these findings are not triagable. <!-- 11919 -->
    - Fixed an issue where hovering over the Assistant's **Analyze** button caused the window to jitter.

## ⛓️ Supply Chain

### Added

* Added ability to manually create custom dependency exceptions under **Supply
  Chain** > **Settings**. This helps prevent blocking a pull request or merge
  request due to licensing issues. For example, if `bitwarden/cli@2023.9.0`,
  which has a GPL-3.0 license, is on the allowlist, setting a custom dependency
  exception means that the exclusion won't fail when upgrading to
  `bitwarden/cli@2023.9.1`.

### Changed 

- **Vulnerabilities page**: Improved filtering performance. <!-- 12162 -->
- Software bill of materials (SBOM) generation is now generally available (GA). <!-- 11956 -->
- The **Dependencies** tab is now GA.

### Fixed

* Fixed an issue where Semgrep couldn't parse a Pipfile correctly if it had a
  `[dev-packages]` section.
* Fixed a bug where `Gemfile.lock` files with multiple `GEM` sections weren't parsed correctly.

## 🔐 Secrets (beta)

### Fixed

- Fixed a bug with custom secrets rules in which rule visibility could be set to `unlisted`. Now, to protect the privacy of secrets rules, users cannot set Secrets rules to any other visibility except for **private**. <!-- 12039, 12040, 12025 -->

## 📝 Documentation and knowledge base

### Added

- Added [legal information](/semgrep-code/semgrep-assistant-code/#privacy-and-legal-considerations) about Semgrep Assistant. <!-- 1308 -->
- Added documentation about Semgrep Assistant's Component and Recommendation filters. <!-- 1324 -->
- Knowledge base articles:
    - Troubleshoot why [SAML stops working](/kb/semgrep-cloud-platform/saml-stops-working/) <!-- 1330 -->
    - [Troubleshooting "You are seeing this because the engine was killed" on monorepos](/kb/semgrep-code/scan-engine-kill/) <!-- 1310 -->
- Added guidance on running Semgrep Supply Chain scans [in the CLI](/semgrep-supply-chain/getting-started/#run-a-scan-using-the-cli ). <!-- 1334 -->

### Changed

<!-- - Updated API docs to use the term `teams`. The use of the term `groups` is deprecated. -->
- Updated the Semgrep Supply Chain [languages table](/supported-languages/#semgrep-supply-chain) to clarify that **lockfile-only** languages do not have reachable rules.
- Updated documentation on event triggers for diff-aware and full scans. <!-- 1316 -->
- Updated [Licensing](/licensing) documentation for Semgrep Supply Chain and Semgrep Secrets.
- Updated the [Findings](/docs/semgrep-code/findings/) documentation page.
