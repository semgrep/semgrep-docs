---
slug: december-2022
append_help_link: true
hide_title: true
description: >-
  Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
---

# December 2022

## Semgrep Supply Chain

### Additions

- Semgrep Supply chain now supports PR or MR comments within GitHub and GitLab repositories. This feature is enabled by default and sends comments to both GitHub and GitLab users when Semgrep Supply Chain detects **reachable vulnerabilities**.
- Improved load time for the Supply Chain > Vulnerabilities page for users with many vulnerabilities.
- Vulnerabilities are now automatically marked as fixed if a `semgrep ci` scan detects that the lockfile or reachable usages were fixed.
- Vulnerability cards (records that appear in **Supply Chain** > **Vulnerabilities**) now link to the source rule or advisory that detected the vulnerability. To view the source rule from the record, click the `</>` icon:
    ![Screenshot of the source rule option](/img/release-notes-see-source-rule.png)

### Changes

- Fixing a vulnerability’s reachable usages now causes the original vulnerability card to be marked as fixed, and a separate card will appear for unreachable usages which can be triaged separately.
- Improved responsiveness of search bars within Supply Chain > Vulnerabilities and Supply Chain > Advisories.

## Semgrep App

### Additions

On the [Findings](https://semgrep.dev/orgs/-/findings/) page, you can now filter by rule category and rule confidence level.

## Semgrep CLI

These release notes include upgrades for versions ranging between 1.0.0 and 1.2.1.

### Additions

- JSON output: Added a `max_memory_bytes` field to the output of the  `semgrep --json --time` which corresponds to the amount of memory allocated during the OCaml phase of Semgrep. This is useful for telemetry purposes.
- DeepSemgrep: If you have a Team tier account in Semgrep App, and you enable the DeepSemgrep setting, then `semgrep ci` automatically runs the DeepSemgrep engine instead of the regular Semgrep CLI engine on full scans (but not in PR scans). See the [DeepSemgrep](/semgrep-code/semgrep-pro-engine-intro) documentation for installation details.

### Changes

- Semgrep CLI does not print a summary of blocking rules unless it is invoked with `semgrep ci` subcommand. (Issue [#6651](https://github.com/semgrep/semgrep/pull/6651))

## Documentation updates

### Additions

- Added a new section to Semgrep App > Single sign-on (SSO) configuration to configure Semgrep with [Microsoft Entra ID](/semgrep-appsec-platform/sso/#setting-up-saml-sso-with-microsoft-entra-id).
- Added a new document **Learning Semgrep App with a demo project**.
- Added section [Disabling rules](/semgrep-code/policies/#disabling-rules).
- Added [Licensing document](/licensing) which provides an overview of licenses used by different Semgrep, Inc products.

### Changes

- Updated [Getting started with Semgrep App](/deployment/core-deployment) to clarify how permissions are used by Semgrep, such as what files are read and what features are enabled by certain permissions.
- Separated referential introductions from [Getting started with Semgrep Supply Chain](/semgrep-supply-chain/getting-started) into a separate document, [Overview of Semgrep Supply Chain](/semgrep-supply-chain/overview).
- Updated [Installing DeepSemgrep](/semgrep-code/semgrep-pro-engine-intro) section.
- Updated [Filtering findings](/semgrep-code/findings/#filter-findings) section with information about new filtering options.
- The following documents have been moved out of the Experiments section as they are now considered GA:
    - [Autofix](/writing-rules/autofix)
    - [Generic pattern matching](/writing-rules/generic-pattern-matching)
    - [Metavariable analysis](/writing-rules/metavariable-analysis)
    - Taint propagators - moved to [Taint tracking](/writing-rules/data-flow/taint-mode#propagators-pro) documentation
- Updated screenshots in Semgrep App documentation. Many additional improvements and fixes were made.
