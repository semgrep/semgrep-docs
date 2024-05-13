---
slug: august-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# August 2022

## Semgrep App

### Additions

- Azure Pipelines CI configuration is now available when adding a new repository to Semgrep App for scanning. Users can select **Azure Pipelines** from within the App, and Semgrep generates a code snippet that users can copy and commit to their configuration file to set up their CI job.
- Users can now delete projects in bulk (also known as batch delete) from Semgrep App's interface. To do this, sign in to **Semgrep App** > **Projects**, and click **Edit Projects**.
- Users can now see usage limits in **Semgrep App** > **Settings**.

## Semgrep CLI

These release notes include upgrades for versions ranging between 0.108.0 and 0.111.0.

### Additions

- Semgrep now provides experimental support for the **Swift** language. See all languages that Semgrep supports in [Supported languages](/supported-languages).
- Add configuration options for using the tree-sitter library installed anywhere on the system.
- Metrics now include language-aggregated parse rates (files, bytes). The purpose of this is to continue with parsing improvements. See [Semgrep privacy policy](/metrics.md) for more details.
- Semgrep CI now accepts more formats of Git URLs for metadata that are sent to semgrep.dev. This work in progress functionality enables working links from the Semgrep App Findings page. The user provides a fallback for repository name (`SEMGREP_REPO_NAME`) and repository URL (`SEMGREP_REPO_URL`) if these values are undefined by the CI job. We appreciate any bug reports or suggestions as this feature is still in development.

### Changes

- Previously, the following error message appeared when metrics have not been uploaded within the set timeout timeframe:
  ```
  Error in send: HTTPSConnectionPool(host='metrics.semgrep.dev', port=443): Read timed out. (read timeout=3)
  ```
  As this caused confusion when running the CLI, this message is now displayed for development and debugging purposes only. Note that metrics are still successfully uploaded, but the success status is not sent in time for the current timeout set.

- `semgrep ci` now defaults to fail open on internal errors and always exits with exit code 0, which is equivalent to passing `--suppress-errors`. To disable this behavior, you can pass `--no-suppress-errors`, surfacing all exit codes to the CI provider. See [Configuring blocking findings and errors](/semgrep-ci/configuring-blocking-and-errors-in-ci) for more information.

#### Additional information

Minor bug fixes are not included in the release notes unless they are potentially breaking your workflow. To see the complete change notes for Semgrep CLI and CI that include fixes, visit the [Semgrep changelog](https://github.com/semgrep/semgrep/releases/).

## Documentation updates

- Consistent and exhaustive documentation about continuous integration (CI) both with and without Semgrep App:
  - [Running Semgrep in continuous integration (CI) with Semgrep App](/deployment/core-deployment)
  - [Running Semgrep in continuous integration (CI) without Semgrep App](/deployment/oss-deployment)
- Experimental taint propagators allow you to specify additional structures through which taint propagates. See how to use them in the [Propagators](/writing-rules/data-flow/taint-mode#propagators-pro) section.
- Updated [Generic pattern matching](/writing-rules/generic-pattern-matching) documentation, rewritten examples, and added new sections, including a new [Handling line-based input](/writing-rules/generic-pattern-matching/#handling-line-based-input) section.
- Introduced interface and color changes to fit new [semgrep.dev](https://semgrep.dev/) website design.
- Report vulnerabilities that Semgrep should have found, but did not. You can report these false negatives directly from your command-line using a built-in Semgrep flag. See [Reporting false negatives with shouldafound](/reporting-false-negatives) article.
- Contribution documentation now provides [Adding python packages to `semgrep`](/contributing/semgrep-contributing/#adding-python-packages-to-semgrep) section.
- Updated and rewritten [Diff-aware scanning (SEMGREP_BASELINE_REF)](/semgrep-ci/ci-environment-variables#SEMGREP_BASELINE_REF) section.
- Updated fail open CI documentation in [Configuring blocking findings and errors](/semgrep-ci/configuring-blocking-and-errors-in-ci) section.
- Added section about [`patterns` operator evaluation strategy](/writing-rules/rule-syntax/#patterns-operator-evaluation-strategy).
- Updated adding [Slack notifications section in Notifications](/semgrep-appsec-platform/slack-notifications) article, and updated **Integrating Semgrep App with third-party tools**
- Many other updates and fixes have been introduced to the documentation website.
