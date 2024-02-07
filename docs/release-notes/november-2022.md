---
slug: november-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# November 2022

## Semgrep Supply Chain

### Additions

- Added Supply Chain support for `requirements.txt` lockfiles (requires `requirement.in` manifest files).
- Added support for Yarn 2 and Yarn 3 lockfiles.

### Changes

- Reachable Supply Chain findings no longer block pull requests when using `semgrep ci`. **Note**: Unreachable findings are non-blocking already.
- Previously, Semgrep Supply Chain rescanned projects automatically every week. Now, newly added projects to Semgrep Supply Chain that use GitHub Actions are by default rescanned every day. This update only affects newly added projects.

## Semgrep App

### Additions

- When you triage a finding, Semgrep App now displays a form that asks whether the finding was a **False positive**, **Acceptable risk**, or you had **No time to fix**. For more information, see [Managing finding status](/semgrep-code/findings/#managing-finding-status). ![Screenshot of Semgrep App triage menu](/img/app-findings-triage.png)
- When ignoring an individual finding, you can now ignore similar future findings by selecting one of the following options: **Just this file**, **This directory**, or **Parent directory**. These options specify which files and directories Semgrep App ignores. In addition, you can now remove a rule when you triage a single finding without having to go to the Rule board. To ignore a rule while triaging a finding, enable the **Remove this rule from Rule board** when triaging an individual finding. See [Ignoring individual findings](/semgrep-code/findings/#ignoring-individual-findings).

### Changes

- The toggle to enable **Autofix** functionality has been moved from the project settings page to the global organization [Settings](https://semgrep.dev/orgs/-/settings) page.
- Previously, Semgrep App rescanned projects automatically every week. Now, newly added projects to Semgrep App that use GitHub Actions are by default rescanned every day. This update only affects newly added projects.
- Many bug fixes and performance improvements were introduced to make your experience with Semgrep App much more pleasant.

## Semgrep CLI

These release notes include upgrades for versions ranging between 0.120.0 and 0.123.0. Version 0.119.0 of Semgrep was intentionally skipped. Version 0.120.0 immediately follows version 0.118.0.

### Additions

- DeepSemgrep: Added installation path for DeepSemgrep on M1 machines.
- Fail gracefully and print an error message when running in unsupported Linux aarch64 or arm64 environment.

### Changes

- taint-mode: Semgrep’s taint analysis now provides basic field sensitivity support. See [Field sensitivity](/writing-rules/data-flow/taint-mode/#field-sensitivity) section for more details. 

## Semgrep in CI

### Changes

- Previously, Semgrep overrode user-defined environment variables with values it detected from the CI provider. Now, user-defined environment variables take precedence (override) Semgrep's detected values. By enabling you to override CI variables, you are able to troubleshoot issues such as hyperlinks to code in the Findings page and receiving comments in pull or merge requests.
  - This change affects the following CI providers:
    - Buildkite
    - CircleCI
  - This change affects the following variables:
    - SEMGREP_REPO_NAME
    - SEMGREP_REPO_URL
    - SEMGREP_BRANCH
    - SEMGREP_JOB_URL
    - SEMGREP_COMMIT

  **Note**: Previous month, this update already affected Azure Pipelines, BitBucket Pipelines, Jenkins, and Travis CI.

## Documentation updates

### Additions

#### General documentation additions

- The [Contributing rules](/contributing/contributing-to-semgrep-rules-repository/) documentation now provides sections with [General rule requirements](/contributing/contributing-to-semgrep-rules-repository/#general-rule-requirements), [Semgrep registry rule requirements](/contributing/contributing-to-semgrep-rules-repository/#semgrep-registry-rule-requirements), and [Including fields required by security category](/contributing/contributing-to-semgrep-rules-repository/#including-fields-required-by-security-category).
- You may now also log in to Semgrep App from the documentation website. The **Login** button is available next to the docs search bar.

#### Semgrep App

- The [Tagging projects](/semgrep-cloud-platform/tags/) document explains how to use tags in projects added to Semgrep App.

#### Semgrep CLI

- The [Experiments](/writing-rules/experiments/introduction/) category now provides an introduction, in addition, the [Deprecated experiments](/writing-rules/experiments/deprecated-experiments/) section is now an independent document.
- Added [Field sensitivity](/writing-rules/data-flow/taint-mode/#field-sensitivity) section to taint analysis documentation.

### Changes

- The following CI documents have been updated to reflect the latest environment variable:
  - [Running Semgrep in continuous integration (CI) with Semgrep App](/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/)
  - [Running Semgrep in continuous integration (CI) without Semgrep App](/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/)
  - [Sample continuous integration (CI) configurations](/semgrep-ci/sample-ci-configs/)
- Updated [Usage and billing](/usage-and-billing/) page. [Semgrep Supply Chain supported languages](/supported-languages/#semgrep-supply-chain) are now part of Pricing and billing document.
- The `SEMGREP_TIMEOUT ` information has been updated. See [`SEMGREP_TIMEOUT`](/semgrep-ci/configuration-reference/#semgrep_timeout) documentation for more details.
- Collapsible items in the documentation sidebar now take you to overview pages for a given category or lead to introductory pages. Overview pages also provide an updated description for displayed cards that represent individual documents. For example: [Semgrep command-line interface (CLI)](/category/semgrep-cli/), [Semgrep in continuous integration (CI)](/category/semgrep-in-ci/), [Data-flow analysis engine overview](/writing-rules/data-flow/data-flow-overview/)
- Release notes that you are now reading have been split into one document for each month the Release notes category now has its own dedicated right sidebar. This change makes it easier to find changes that happened over the span of a month.
- The [Experiments](/writing-rules/experiments/introduction/) category now falls under **Writing custom rules** section on our left sidenav.
- Updated [Managing findings in Semgrep App](/semgrep-code/findings/) document, especially [Managing finding status](/semgrep-code/findings/#managing-finding-status) section to inform about the latest triage workflow updates.
- Updated information about enabling the autofix feature in various occurrences in our docs. For example: [Enabling autofix in Semgrep App](/writing-rules/testing-rules/#enabling-autofix-in-semgrep-code)
- Updated [Defining ignored files and folders in Semgrep App](/writing-rules/testing-rules/#enabling-autofix-in-semgrep-code) to inform about how you can ignore files from the Findings page of Semgrep App.
- Many fixed links, typos, and other necessary improvements for great docs experience.
