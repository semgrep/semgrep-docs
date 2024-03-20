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

# Semgrep release notes for February 2024

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in February 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.59.1](https://github.com/semgrep/semgrep/releases/tag/v1.59.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.60.0](https://github.com/semgrep/semgrep/releases/tag/v1.60.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.60.1](https://github.com/semgrep/semgrep/releases/tag/v1.60.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.61.1](https://github.com/semgrep/semgrep/releases/tag/v1.61.1)
  * [<i class="fas fa-external-link fa-xs"></i>1.62.0](https://github.com/semgrep/semgrep/releases/tag/v1.62.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.63.0](https://github.com/semgrep/semgrep/releases/tag/v1.63.0)

## 🌐 Cloud Platform

### Added

- [<i class="fas fa-external-link fa-xs"></i> API](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues): Added a `rule` object under `findings` with the following fields: 
    - `name`
    - `message`
    - `confidence`
    - `category`
    - `subcategories`
    - `technologies`
    - `vulnerability_classes`
    - `cwe_names`
    - `owasp_names` <!-- 12868 --> 
- Added distinction between Pro engine and OSS findings in the Playground and Editor. <!-- 12275 -->
- Added support for the `linux-arm64` platform when you download Semgrep Pro Engine. <!-- 12430 -->

### Changed

- Updated the Semgrep Cloud Platform (SCP) login page. <!-- 12744 -->
- Updated the login process from the CLI to SCP. This change affects new users. <!-- 12531 -->
- Updated the Semgrep installation instructions for Docker. <!-- 12531 -->
- Improved performance of Semgrep Playground and Editor. <!-- 12461 -->

### Fixed

- Fixed a bug where the navigation sidebar covered the entire mobile screen and could not be collapsed. <!-- 12876 -->
- Scan summary links printed after users run `semgrep ci` now reflect a
  custom `SEMGREP_APP_URL` if set.

## 💻 Code

### Added

* Support for C and C++ is now generally available (GA), including cross-file and cross-function analysis.
* Added new Pro rules for Elixir and the Phoenix framework, covering various security and correctness issues. These are available in the `p/elixir`
  ruleset.
* Added support for Python, with a focus on the Flask ecosystem, to the Semgrep
  Pro Engine.
* Added support for nested record patterns on the left-hand side of an
  assignment during dataflow analysis. For example, given `{ body: { param } } =
  tainted`, Semgrep correctly marks `param` as tainted.
* The `metavariable-regex` operator can now match on metavariables of interpolated strings
  that use variables with known values.
* **Taint analysis**:
  * Added support for Python constructors.
  * Added support for index sensitivity. Semgrep tracks taint on individual
    indexes of a data structure when these are constant values, either integers
    or strings, and the code uses the built-in syntax for array indexing.
  * Added `exact: false` as a `pattern-sources` sub-key so you can specify that anything inside a code region is a sink:
    ```yaml
        pattern-sources:
          - exact: false
            pattern: ...
    ```
  * When `exact: true` and `taint_assume_safe_functions: true`, Semgrep now
    considers that, if the specified formula isn't a `patterns` with a
    `focus-metavariable`, it must look for taint in the function call's arguments. For example:
    ```yaml
    ...
    options:
      taint_assume_safe_functions: true
    pattern-sources:
      - exact: false
        pattern: ...
    ```

### Changed

* Improved error handling during interfile analysis so Semgrep Code doesn't crash.
* **CLI**: If there are multiple errors resulting from the user running Pro
  rules without a license, the CLI groups all errors and reports a
  single warning.
* The project name for repositories scanned locally is `local_scan/<repo_name>`
  instead of `<repo_name>`.
* The **View Results** URL displayed for findings now includes the repository
  and branch names.

### Fixed

* Fixed an issue with incorrect autofix application where multiple fixes were
  applied to the same line.
* Fixed issue where tokens for type parameter brackets weren't stored correctly.
  They're now stored in the generic AST, allowing Semgrep to autofix
  these constructs correctly.
* Fixed an issue where Semgrep doesn't support multiple labels for taint
  traces. Now, Semgrep looks at the `requires` of the sink, and if it has the
  shape `A and ...`, it picks `A` as the preferred label and reports the
  trace.
* Fixed issue where taint signatures don't capture changes to parameter fields.

## ⛓️ Supply Chain

### Added

* Added support for parsing Swift Package Manager manifest files and lock files.
* Added the ability to filter for dependencies that Semgrep has commented on.
  <!-- https://github.com/semgrep/semgrep-app/pull/12898 -->
* Added manual review advice to GitHub PR comments. Certain Semgrep Supply Chain (SSC) findings require **manual review** to verify if the finding is reachable or not. <!-- 12907 -->

### Fixed

* Fixed issues with trailing newline parsing in `pyproject.toml` and
  `poetry.lock` files.

## 🔐 Secrets

### Added

- Added the following new rules:
  - Detection rules for Azure and AWS
  - Semantic secrets rules for Python, JavaScript, and TypeScript
  - Semantic rules for hard-coded credentials in bash for `curl` commands
- Added non-validator regex detection for databases, including MongoDB,
  Microsoft SQL Server, MySQL, Postgres, and Redis
- Added secrets rule management, which is accessible in Semgrep Cloud Platform
  by going to **Rules** > **Policies** > **Secrets**. This allows you to:
  - See all available rules
  - Set valid finding modes for the rules
  - Set invalid and error validation state modes across multiple rules

### Fixed

- Fixed an issue where the **Analysis method** filter in Semgrep Cloud Platform
  wasn't filtering correctly.

## 📝 Documentation and knowledge base

### Added

- The Semgrep docs sidebar has been reorganized to help users browse through the docs.
- Added a [series of guides](/deployment/core-deployment/) to setting up Semgrep as part of a security program for your organization.
- Added a guide to setting up a [network broker](/semgrep-ci/network-broker/) that facilitates secure access between Semgrep and your private network.
- Added [Experimental rules](/writing-rules/experiments/pattern-syntax/) syntax reference.
- Added the following knowledge base articles:
    - [GitLab "Job's log exceeded limit" error](/kb/semgrep-ci/collect-gitlab-logs)
    - [Set up Jenkins pipeline projects for Bitbucket repositories](/kb/semgrep-ci/bitbuket-jenkins-pipeline-projects/)
    
### Changed

- Updated the links within the [GitLab CI/CD config file](/semgrep-ci/sample-ci-configs/#sample-gitlab-cicd-configuration-snippet).
- Removed phone support from the docs.
- Updated the [Semgrep-Slack integration docs](/semgrep-cloud-platform/slack-notifications/) to clarify requirements for posting to private channels.
- Updated the [sample GHA config file](/writing-rules/private-rules/)for a CI job that publishes private Semgrep rules. 
- Clarified the Semgrep Assistant [privacy policy](/semgrep-code/semgrep-assistant-code/) on what data is stored.
- Updated [Semgrep Pro versus OSS](/docs/semgrep-pro-vs-oss/) docs. <!-- 1338 -->

### Fixed

- Fixed formatting on GitHub PR comments documentation. Thank you to [parsiya](https://github.com/parsiya) for the fix.
- Various link fixes and Docker image updates.

