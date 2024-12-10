---
slug: november-2024
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: November 2024
tags:
  - Release notes
---
# Semgrep release notes for November 2024

## 🌐 Semgrep AppSec Platform

### Added

- Added the ability to filter all findings by **Last fixed** and **Last triaged** dates in Semgrep AppSec Platform.
  ![Time period and status filters](/img/findings-filters.png#sm-width)
  _**Figure**. Time period and status filters._
- **Dashboard**:
  - You can now view **trends**, comparing the previous time period to the current one, in the following charts:
    - Production backlog
    - Secure guardrails
    - Median open finding age
  - You can now export the Dashboard as a PDF. Click **Dashboard > Download > Download as PDF (report)**.

<!--  NOT AVAILABLE
  - You can now view findings **Filtered by Assistant** under the **Guardrails activity** chart These are findings that Assistant did not display to developers, to prevent noise from findings it thinks are false positives. -->


### Changed

- **API**: The `GET /deployments/DEPLOYMENT_ID/policies` endpoint now displays all policies for a given deployment for all Semgrep products.
- **Teams**: You can now change roles in bulk:
  1. Click **Settings > Teams**, then the **name of the team** you want to edit.
  1. Select the target users, then click **Bulk Edit**.
  1. In the drop-down box, select the new role for those users. <!-- 17549 -->


### Fixed

- Various improvements and fixes to Semgrep Managed Scans (SMS).

## 💻 Semgrep Code

### Added

- **C**: Semgrep cross-file analysis now handles duplicate function names properly. When Semgrep finds duplicate functions, it assumes that any of them could be called. For example, if the function `foo` is defined in two files, Semgrep reports taint errors for both instances:
    ```c
    // "a/test.h"
    void foo(int x) {
        //deepruleid: dup-symbols
        sink(x);
    }

    // "b/test.h"
    void foo(int x) {
        //deepruleid: dup-symbols
        sink(x);
    }

    // "main.c"
    #ifdef HEADER_A
        #include "a/test.h"
    #else
        #include "b/test.h"
    #endif

    int main() {
        int x = source();
        foo(x);
    }
    ```
- **JavaScript and TypeScript**:
  - Added Pro rules for JavaScript and TypeScript, including:
    - Code injection rules for the `vm`, `vm2`, and puppeteer libraries
    - NoSQL injection rules for `mongodb` and `mongoose` libraries
    - SQL injection rules for the `knex`, `mysql`, `pg`, `sequelize`, and `sqlite` libraries
    - Path traversal rules for `fs` and `fs-extra`
  - Improved existing rules to have more precise sources and sinks.
  - Improved JavaScript and TypeScript imports resolution.
  - Added support for JavaScript callbacks.

### Changed

- The **Findings** page's **Projects and branches** filter now pins selected options to the top of the list for easy reference.
- Cross-file analysis now resolves method invocations on abstract classes, enhancing dataflow tracking accuracy for dynamic method invocations.
- Improved memory usage and time for scans with many findings due to reduced memory allocations by Semgrep while processing `nosemgrep` comments.
- **TypeScript**: improved logic for interfile analysis for projects using [project references](https://www.typescriptlang.org/docs/handbook/project-references.html).

### Fixed

- Cross-file taint analysis has been optimized to scale better when there are many matched sources, propagators, sanitizers, and sinks within a function.
- Semgrep now scans files containing special characters, as determined by Git, correctly instead of ignoring them. 
- Semgrep no longer freezes when running on a machine with a low memory limit with tracking enabled.
- Fixed an issue with regex parsing during ReDoS analysis when Semgrep encountered a character class starting with `[:`, such as `[:a-z]`.
- Fixed an issue with `semgrep scan` where anchored `semgrepignore` patterns for folders such as `/tests` weren't honored. Previously, these patterns didn't affect target file filtering.
- Fixed an issue where exceptions thrown during target processing caused the scan to fail. The scan now returns exit code `0` instead of `2`, unless the scan was invoked with the `--strict` flag.
- Fixed an issue where input containing multiple unclosed braces on the same line resulted in exponential parsing time, causing the scan to time out.
- Improved error handling for networking errors.
- Fixed an issue where autofix and `nosemgrep` didn't work in Semgrep Editor.
- **Swift**: Ellipses and metavariable ellipses can now be used as function parameters in patterns.

## ⛓️ Semgrep Supply Chain

### Added

- Supply Chain now provides reachability analysis for **Scala** and **Swift**.

### Changed

- Parsers for `poetry.lock` and `pyproject.toml` now handle multi-line strings.

### Fixed

- Fixed an issue where the Gradle parser failed to parse the lockfile if it didn't start with a specific block comment. Semgrep now ignores the comment, allowing any or no comment to exist.

## 🤖 Semgrep Assistant

### Added

- Added Assistant-generated component tags for Semgrep Supply Chain and Semgrep Secrets findings.
- Added support for Google Gemini.

## 🔐 Semgrep Secrets

### Added

- Added the ability to validate temporary AWS tokens.

## 📝 Documentation and knowledge base

### Added

- Added the following new documents, articles, and sections:
  - A [section about **time period filters**](/semgrep-code/findings#time-period-and-triage), which you can apply to narrow down findings in the **Code**, **Supply Chain**, and **Secrets** pages. 
  - [How to exclude a Semgrep Supply Chain rule](/kb/semgrep-supply-chain/exclude-rule)
  - [How to set up SMS with GitLab](/deployment/managed-scanning/gitlab)
  - [Why do new rules keep appearing in Comment or Block mode?](/kb/rules/ruleset-default-mode)
- Added the following sections in the docs homepage:
  - A summary of the latest release notes
  - A summary of supported languages for all Semgrep products

### Changed

- Updated the following documents and sections:
  - [Support documentation](/support)
  - [How findings are distinguishes new and duplicate findings](/semgrep-code/remove-duplicates)
  - [Troubleshooting if a scan "never finished"](/troubleshooting/semgrep-app)
- Clarified default behavior and options for how Semgrep handles exit codes.
- Clarified the relationship between ingress and egress IP addresses and the Semgrep Network Broker.
- Updated the wording in [Semgrep Assistant > Privacy and legal considerations](/semgrep-assistant/privacy) to include other large language models (LLMs). 

### Fixed

- Improved site readability in mobile devices.

### Removed

- Removed `pattern-not` versus `pattern-not-inside` video.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in November 2024:
  * [<i class="fas fa-external-link fa-xs"></i>1.97.0](https://github.com/semgrep/semgrep/releases/tag/v1.97.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.96.0](https://github.com/semgrep/semgrep/releases/tag/v1.96.0)
