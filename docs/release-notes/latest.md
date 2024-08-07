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

# Semgrep release notes for July 2024

## 🌐 Semgrep AppSec Platform

### Added

- A new **dashboard** focused on secure guardrails adoption is now in private beta. Find out what percent of findings are fixed before they enter your default or primary branch. To join the private beta, reach out to your Technical Account Manager or Account Executive. See the [Dashboard beta documentation](/semgrep-appsec-platform/dashboard-beta) for more information.
  ![Dashboard (beta) page](/img/dashboard-fold.png)
- Added support for the following source code managers (SCMs):
  - Azure DevOps
  - Bitbucket Cloud
  - Bitbucket Data Center
  With these changes, it is easier for you to add repositories from these SCMs to Semgrep.
- Semgrep Managed Scans:
  - You can now view your most recent scan log.
  - You can enable or disable diff-aware scans for PRs and MRs.
- Semgrep API:
  - There is a new public endpoint `/v1/scan/:id`, which returns the metadata from `first_seen_scan`. <!-- 15178 -->
  - Added `ecosystem` field to public findings API response. It is under `found_dependency`. <!-- 15284 -->

### Changed

- Improved the new user onboarding experience for GitHub users. Changes to the onboarding flow include copy fixes to the instructions and the faster addition of Semgrep to your repository's CI pipeline. <!-- 15330 -->
- Updated the **findings details** page. <!-- 15573 -->
- Updated GHA sample workflows to use `setup-node@v4`.  <!-- 15707 -->
- Various performance improvements to Semgrep Managed Scans.
- Projects on Semgrep Managed Scans now use the `managed-scan` tag instead of `autoscan`. <!-- 15450 -->
- Improvements to API documentation.

### Fixed

- Fixed an issue in the Editor or Playground in which Turbo mode could return an `undefined` object. <!-- 15619 -->
- Fixed an issue in which **Add other GitHub organization** wouldn't redirect to the correct URL. <!-- Semgrep 15419 -->
- Minor type fixes to the Policies page. <!-- 15299 -->

## 💻 Semgrep Code

### Added

- Added the `--exclude-minified-files` flag to enable skipping minified files and the `--no-exclude-minified-files` flag to include minified files during scans triggered by running `semgrep ci` and `semgrep scan`. By default, Semgrep scans minified files.
- Added `as-metavariable`, a new rule-writing feature that allows rule writers to bind arbitrary matches to a name and then use it with autofixes.
- **Python**: Added support for [Flask](https://semgrep.dev/p/flask), [Django](https://semgrep.dev/p/django), and [FastAPI](https://semgrep.dev/p/fastapi).
- Added community support for [Move](https://aptos.dev/en/build/smart-contracts).
- <!-- vale off --> Added community support for [Circom](https://docs.circom.io/circom-language/signals/).<!-- vale on -->

### Changed

- Improved module resolution for Python scans so that imports like `from a.b import c`, where `c` is a module, resolve correctly.
- Improved error handling for rules with invalid patterns so that scans still complete and findings from other rules are reported.
- **CLI**:
  - Users must sign in before running `semgrep scan --pro`. Scans will not begin until the user signs in.
  - The `--debug` option now displays logging information incrementally instead of waiting for the scan to complete.

### Fixed

- Fixed an issue where Semgrep Managed Scanning would occasionally hang.
- Fixed an issue where users couldn't pass in the `--junit-xml-output` flag.
- Fixed an issue with the `--pro-intrafile` flag that caused Semgrep to confuse parameters
with top-level functions with no arguments when both share a name:
  ```js
  def foo
    taint
  end

  def bar(foo)
    sink(foo) # no more false positive here
  end
  ```
- Semgrep is stricter when unifying identifiers. For example, this pattern doesn't work because the `foo` methods in classes `A` and `B` aren't the same. As such, their IDs aren't unifiable through `$F`:
  ```yaml
  patterns:
    - pattern-inside: |
        class A:
          ...
          def $F(...):
            ...
          ...
        ...
    - pattern-inside: |
        class B:
          ...
          def $F(...):
            ...
          ...
        ...
  ```
  should be rewritten as follows:
  ```yaml
  patterns:
    - pattern-inside: |
        class A:
          ...
          def $F1(...):
            ...
          ...
        ...
    - pattern-inside: |
        class B:
          ...
          def $F2(...):
            ...
          ...
        ...
    - metavariable-comparison:
        comparison: str($F1) == str($F2)
  ```
- Fixed an issue where code snippets from GitLab-hosted repositories weren't loading.
- **C++**: Fixed an issue so that scanning a project with header files no longer causes spurious warnings that the file is being skipped or isn't being analyzed.
- **CLI**:
  - Fixed an issue where autofix previews weren't displayed with appropriate spacing.
  - Fixed an issue where rules served to the CLI weren't filtered by minimum and maximum versions supported, causing errors.

## ⛓️ Semgrep Supply Chain

### Added

- Added support for comparing Go pseudo-versions against other pseudo-versions and strict core versions.
- Added support for uploading and parsing large npm repositories.
- Added the ability for Supply Chain to retrieve and display CVE data.
- Added a filter to support filtering by reachability rule, CVE, or GHSA information.

### Changed

- SBOMs generated by Semgrep now contain time zone information.

### Fixed

- Fixed an issue where `package-lock.json` parser incorrectly assumed that all paths in the `packages` component of `package-lock.json` started with `node_modules/`. This is incorrect, since a dependency can be installed anywhere. The parser can now recognize alternative locations.
- Fixed an issue where users couldn't create Jira tickets for Supply Chain findings with the severity filter active.
- Fixed an issue where CVE information was labeled as CWE information.

## 🤖 Semgrep Assistant

### Added

* **Assistant Memories** is now in public beta. [Assistant Memories](/semgrep-assistant/overview#memories-beta) allows users to tailor Assistant's remediation guidance on a per-project, per-rule basis.

### Fixed

- Fixed various UI issues when analyzing findings.

## 🔐 Semgrep Secrets

### Added

- Added the **Open in Editor** button to the findings detail page for findings identified by Secrets.
- Added the ability to filter for Secrets findings with the status of **Ignored**.
- Added the ability to triage Secrets using the **Reviewing** and **Fixing** statuses.

### Fixed

- Fixed an issue where Slack webhooks weren't included in historical scan findings.

## 📝 Documentation and knowledge base

### Added

- Added the following new documents, articles and sections:
  - [Secure guardrails in Semgrep](/secure-guardrails/secure-guardrails-in-semgrep) - an overview of secure guardrails and how to use Semgrep features to implement guardrails.
    - [Secure defaults](/secure-guardrails/secure-defaults) - a definition of secure defaults and reference towards creating your own.
  - Added sections about connecting the following SCMs to Semgrep:
    - [Azure DevOps Cloud](/deployment/connect-scm#azure-devops-cloud)
    - [Bitbucket Cloud](/deployment/connect-scm#bitbucket-cloud) <!-- vale off -->
    - [Bitbucket Data Center](/deployment/connect-scm#bitbucket-data-center)
    <!-- vale on -->
  - Added documentation about setting up PR comments for Azure and Bitbucket:
    - [Azure PR comments](/semgrep-appsec-platform/azure-pr-comments)
    - [Bitbucket PR comments](/category/bitbucket-pr-comments)
  - Added a section about Assistant Memories (beta).
- Added the `semgrep ci` help output into the CLI reference documentation.

### Changed

- Updated the [Semgrep Network Broker](/semgrep-ci/network-broker) documentation to work with Semgrep Managed Scans and Bitbucket.
- Updated instructions for connecting [Semgrep with GitHub Enterprise](/deployment/connect-scm#github-enterprise-server).
- Updated the [Scan monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts) knowledge base article to use the new Semgrep `--subdir` option.
- Updated Semgrep Pro rules documentation.
- Updated Semgrep rule syntax with the following:
  - [Metavariable unification](/writing-rules/pattern-syntax#metavariable-unification)
  - [Anonymous metavariables](/writing-rules/pattern-syntax#anonymous-metavariables)
  - [`decorators_order_matters`](/writing-rules/rule-syntax#options)

### Fixed

- Various broken links have been updated.

### Removed

- Removed the Semgrep vim extension from the documentation due to the lack of activity on the extension itself.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in July 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.79.0](https://github.com/semgrep/semgrep/releases/tag/v1.79.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.80.0](https://github.com/semgrep/semgrep/releases/tag/v1.80.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.81.0](https://github.com/semgrep/semgrep/releases/tag/v1.81.0)
