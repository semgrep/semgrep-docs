---
slug: december-2023
append_help_link: true
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: December 2023
tags:
  - Release notes
---

# December 2023 release notes

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in December 2023:

  * [<i class="fas fa-external-link fa-xs"></i>
    1.52.0](https://github.com/returntocorp/semgrep/releases/tag/v1.52.0)
  * [<i class="fas fa-external-link fa-xs"></i>
    1.53.0](https://github.com/returntocorp/semgrep/releases/tag/v1.53.0)
  * [<i class="fas fa-external-link fa-xs"></i>
    1.54.0](https://github.com/returntocorp/semgrep/releases/tag/v1.54.0)
  * [<i class="fas fa-external-link fa-xs"></i>
    1.54.1](https://github.com/returntocorp/semgrep/releases/tag/v1.54.1)

## 🌐 Cloud Platform

### Added

* Semgrep IDE integrations now cache information about the repository so that it
  does not traverse the entire repository on every scan to determine if the
  files are valid targets for scanning; this improves scan times.
* Users can now ignore findings locally in Semgrep IDE Extensions. These changes
  persist between restarts.
* Added authentication provider information for each user under **Settings** >
  **Access** > **Members** to help distinguish between users who log in with
  multiple methods.
* The metrics collected now include more granular information to help
differentiate scans using different engine capabilities, such as intraprocedural
scans without secrets validation versus intraprocedural scans *with* secrets
validation.
* **CLI tool**: Added new `semgrep test` subcommand, which is an alias for `semgrep scan
--test`. **Note**: When running Semgrep on a test directory, use `semgrep
scan test` to avoid confusion with the new `semgrep test` subcommand.

### Changed

* Improved the speed with which Semgrep Cloud Platform's **Dashboard** and **Findings**
  pages load.
* Fixed issue where empty tables in `pyproject.toml` files would fail to parse.
* **OCaml**: Switched to a tree-sitter-based parser instead of the Menhir parser.
* **Rust**: Updated the parser used for Rust.

### Fixed

* Fixed issue where webhooks stopped working.
* Fixed issue so that clicking **Start Tour** now restarts the Getting Started
  tutorial.
* Fixed issue where the **Members** page doesn't display a user's new role until
  the page reloads. <!--OS-1233-->
* Fixed issue where users switching organizations would result in a 404.
  <!--OS-136-->
* Fixed the **Connect to** button under **Settings** > **Source Code Managers**
  so that it displays correctly based on whether the user can connect to a
  source code manager. <!-- https://github.com/semgrep/semgrep-app/pull/11812
  -->
* **CLI tool**: Updated CLI error message to clarify that users should log in before running
  either:
  * `semgrep ci`
  * `semgrep scan` then `semgrep scan --config`
  
## 💻 Code

### Fixed

* Fixed issue where Semgrep Code findings marked as **fixed** can be triaged via the rule
  group. If the first finding in the list of findings is fixed, the rest
  are also fixed; as such, the rule checkboxes are now disabled.
  <!--FIND-1453-->
* Fixed issue where the rule information card and the rule preview are missing
  for older findings; all findings now display this information.
  <!--FIND-1433-->
* Fixed issue where the finding's severity displayed doesn't match the rule's
  severity once the rule has been updated. <!--FIND-1397-->

## ⛓️ Supply Chain

## 🤖 Assistant (beta)

### Added

* Added the **Analyze** button, which triggers all Assistant functions, including autofix,
autotriage, and component tagging, on selected findings. After Assistant performs these functions, users can see their results if they filter for findings based on **Recommendation** or by **Component**. Additionally, users that choose **No Grouping** instead of **Group by Rule** see false positive and true positive recommendations when viewing their finding details pages. 

## 🔐 Secrets (beta)

### Added

* Added support for custom validator rules.

### Changed

* Disabled the **Add to Policy** button when writing custom validator rules for
  Semgrep Secrets using the rules editor.  Custom validator rules are private
  and can't be shared to Semgrep Registry. <!--SCRT-292-->

### Fixed

* Fixed issue where the **Ignore** button doesn't work when triaging Secrets.
  <!--SCRT-283-->

## 📝 Documentation and knowledge base

* General improvements to API docs, including clarification of usage instructions for Supply Chain and Secrets endpoints.
