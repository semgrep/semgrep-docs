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

# Semgrep release notes for December 2023

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

* Semgrep IDE integrations now cache information about the current repository so
  that it doesn't traverse the entire repository on every scan to determine if
  the files are valid targets for scanning; this improves scan times.
* Users can now ignore findings locally in Semgrep IDE Extensions. These changes
  persist between restarts, though they're not reported back to Semgrep and do
  not affect the remote repository or other users.
* The metrics collected now include more granular information to help
differentiate scans using different engine capabilities, such as intraprocedural
scans without secrets validation versus intraprocedural scans *with* secrets
validation.
* **CLI tool**: Added new `semgrep test` subcommand, which is an alias for
`semgrep scan --test`. **Note**: If the **name** of the directory you are
scanning is `test`, use `semgrep scan test` to avoid confusion with the new
`semgrep test` subcommand.

### Changed

* **OCaml**: Switched to a tree-sitter-based parser instead of the Menhir
  parser.
* **Rust**: Updated the parser used for Rust.

### Fixed

* Fixed an issue where webhooks stopped working.
* Fixed an issue so that clicking **Start Tour** now restarts the Getting Started
  tutorial.
* Fixed an issue where the **Members** page doesn't display a user's new role until
  the page reloads. <!--OS-1233-->
* Fixed an issue where users switching organizations would result in a 404.
  <!--OS-136-->
* Fixed the **Connect to** button under **Settings** > **Source Code Managers**
  so that it displays correctly based on whether the user can connect to a
  source code manager. <!-- https://github.com/semgrep/semgrep-app/pull/11812
  -->
* **CLI tool**: Updated CLI error message to clarify that users should log in
  before running either:
  * `semgrep ci`
  * `semgrep scan --config`
  
## 💻 Code

### Fixed

* Fixed an issue where Semgrep Code findings marked as **fixed** can be triaged through
  the rule group. Once a finding is fixed, its triage status can't be changed back
  to **ignored**.
  <!--FIND-1453-->
* Fixed an issue where the rule information card and the rule preview are missing
  for older findings; all findings now display this information.
  <!--FIND-1433-->
* Fixed an issue where the finding's severity displayed doesn't match the rule's
  severity once the rule has been updated. <!--FIND-1397-->

## ⛓️ Semgrep Supply Chain

### Changed

* Fixed an issue where empty tables in `pyproject.toml` files would fail to parse.

## 🤖 Assistant (beta)

### Added

* Added the **Analyze** button to Semgrep Cloud Platform's **Code** page, which
triggers all Assistant functions on selected findings, including autofix, autotriage, and component
tagging. After Assistant performs these functions, users
can see their results if they filter for findings based on **Recommendation** or
by **Component**. Additionally, users who choose **No Grouping** instead of
**Group by Rule** see false positive and true positive recommendations when
viewing their finding details pages. 

## 🔐 Secrets (beta)

### Added

* Added support for custom validator rules, which can be written using Semgrep's
  Rules Editor and run using `semgrep ci --allow-untrusted-validators`. Note
  that custom validator rules are private and can't be shared to Semgrep
  Registry.

### Fixed

* Fixed an issue where the **Ignore** button doesn't work when triaging Secrets.
  <!--SCRT-283-->

## 📝 Documentation and knowledge base

### Added

* Added [Quickstart](/docs/getting-started/quickstart/).
* Added [Privacy and legal considerations](/docs/semgrep-code/semgrep-assistant-code#privacy-and-legal-considerations) information for Semgrep Assistant.
* New knowledge base articles:
  * [Fix pattern parse errors when running rules](/docs/kb/rules/pattern-parse-error)
  * [How to scan a large monorepo](/docs/kb/semgrep-code/scanning-large-monorepo)
  * [Scanning a monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts)
  * [SSO Error: Signature validation failed. SAML Response rejected](/docs/kb/semgrep-cloud-platform/saml-bad-signature)
  * [Troubleshooting "You are seeing this because the engine was killed" on monorepos](/docs/kb/semgrep-code/scan-engine-kill)

### Changed

* Updated overview articles for [Semgrep Code](/semgrep-code/overview/) and
  [Semgrep Supply Chain](/docs/semgrep-supply-chain/overview/).
* Updated documentation on setting up pull request or merge request comments for
  [GitHub](/docs/semgrep-cloud-platform/github-pr-comments/),
  [GitLab](/docs/semgrep-cloud-platform/gitlab-mr-comments/), and
  [Bitbucket](/docs/semgrep-cloud-platform/bitbucket-pr-comments/) users.
* General improvements to API docs, including clarification of usage
  instructions for Supply Chain and Secrets endpoints.

### Fixed

* Minor corrections and updates to various articles.
