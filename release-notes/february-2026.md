---
slug: february-2026
hide_title: true
description: >-
    Release notes include the changes, fixes, and additions in specific versions of Semgrep.
toc_max_heading_level: 3
title: February 2026
tags:
  - Release notes
---

<!-- Remember to update index page -->
 
 # Semgrep release notes for February 2026

The following updates were made to Semgrep in February 2026.

## 🌐 Semgrep AppSec Platform

### Added

- **CLI**:
  - Added the `--x-mem-policy` flag, which allows you to configure which OCaml garbage collector to use: **aggressive** (the default), which results in longer scan times but lower memory use, or **balanced**, which compromises on heap memory reclaiming while limiting how often the garbage collector runs. This flag is available only for Pro users.
- **MCP**: 
  - Hooks for both Claude Code and Cursor now pull custom rules from the Semgrep Registry.
  - Enabled DNS rebinding protection for the MCP server.

### Changed

- Improved the accuracy of taint tracking through assignments, which helps reduce the number of false positive findings.
- The **Network Broker** configuration screen now allows only one public key, preventing the addition of multiple keys, which Semgrep does not support.
- The CWE tooltip message on a finding's **Details** page now displays the CWE name associated with the finding instead of a generic CWE name.
- Improved the performance of **Findings** page filters.
- Minor cosmetic changes to the **Findings** page.
- **CLI**:
  - Bumped `glom` to version 23.3.
  - The CLI waits longer before retrying a request if it receives a HTTP `429` or `5xx` response from Semgrep.
  - Minor cosmetic changes to the **Scan Summary** section of the Semgrep CLI response.
  - Blocking findings are now labelled in the CLI response.

### Fixed
* Fixed an issue where claiming a license caused Semgrep AppSec Platform to crash.
- Fixed an issue where the **Projects** page didn't display findings counts if the previous scan failed.
- Fixed an issue where the Semgrep Editor crashed when viewing metadata for select rules.
- Fixed an issue where Semgrep returned more false negatives when the maximum number of fields to track per object was reached during scans.
- Fixed an issue where the author of a pull request or merge request could update project tags by changing the `.semgrepconfig.yml` file. Project tags can now be updated only on full scans.
- **CLI**: fixed an issue where Semgrep printed info log lines when `--trace` was passed, but not `--debug`.

## 💻 Semgrep Code

### Added

- Added experimental support for the OpenFGA authorization language.
- Added support for case-insensitive string comparisons using `lower()` and `upper()`:
  ```yaml
  - metavariable-comparison:
      metavariable: $VALUE
      comparison: upper(str($VALUE)) == "SEMGREP"
  ```
- Scala: added taint flow support for `for-yield`:
  ```scala
  def test(x: X) = {
    for {
      y <- foo(x)
      z <- bar(y)
    } yield {
      z
    }
  }
  ```

### Fixed

- Scala: fixed a parsing issue where subsequent calls in an implicit block weren't considered to be in the same scope:
  ```scala
  def f (a: t) =
    foo()
    bar()
  ```

## ⛓️ Semgrep Supply Chain

### Added

- You can now pass environmental variables to third-party package managers using `SEMGREP_LOCAL_BUILD_ENV`, which accepts a JSON object, as part of the dependency resolution process invoked by `--allow-local-builds`.

### Changed

- The **CVE links** on the Supply Chain **Findings** page now link to specific **Advisories** pages instead of a general NIST definition of the security issue.

### Fixed

- Fixed an issue where the **Enable Supply Chain** toggle didn't work.
- Fixed an issue where the **Dependency** filter on the Supply Chain **Findings** page did not return all results.

## 🤖 Semgrep Assistant

### Changed

- The feedback dialog for auto-triage now allows you to provide comments in addition to selecting whether you agree or disagree with the recommendation.

### Fixed

- Added the following missing values to the **Findings** pages' **Assistant file risk level** filter: `High risk > cryptography`, `Low risk > observability`, and `Low risk > sample code`.

## 🔐 Semgrep Secrets

### Fixed

- Fixed an issue where custom secrets couldn't be added to a policy if multiple policies are active.

## 📝 Documentation and knowledge base

### Added

- Added information:
  - [Managing and using Semgrep access tokens](https://semgrep.dev/docs/deployment/tokens)
  - [Re-running Semgrep Managed Scans](/kb/semgrep-appsec-platform/rerun-managed-scans)

### Changed

- Major updates to [Usage and billing](/usage-and-billing/overview).
- Reorganized the [Supported languages](/supported-languages) information.

## 🔧 OSS Engine

* The following versions of the OSS Engine were released in February 2026:
  * [<i class="fas fa-external-link fa-xs"></i>1.153.0](https://github.com/semgrep/semgrep/releases/tag/v1.153.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.152.0](https://github.com/semgrep/semgrep/releases/tag/v1.153.0)
  * [<i class="fas fa-external-link fa-xs"></i>1.151.0](https://github.com/semgrep/semgrep/releases/tag/v1.153.0)
