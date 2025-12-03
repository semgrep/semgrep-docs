---
slug: customize-semgrep-ce
title: Customize scans
hide_title: true
displayed_sidebar: scanSidebar
description: Learn how to customize your Semgrep CE scans.
tags:
  - Semgrep CE
---

import ExportAs from "/src/components/reference/_export-as.mdx";
import ScanRuleset from "/src/components/reference/_scan-ruleset.mdx";

# Customize Semgrep Community Edition (CE) scans

This article shows you how to customize your local scans with Semgrep Community Edition (CE). Before proceeding with this article, ensure that you are familiar with [scanning a project using Semgrep CE](/getting-started/quickstart-ce).

## Scan your codebase and export results

<ExportAs />

## Scan your codebase with a specific ruleset

You can scan your codebase using `--config auto` to run Semgrep with rules that apply to your programming languages and frameworks:

```console
semgrep scan --config auto
```

<ScanRuleset />

#### Test custom rules

Semgrep includes features to [test the custom rules that you write](/writing-rules/testing-rules):

```console
semgrep scan --test
```

## Improve performance for large codebases

You can set the number of subprocesses Semgrep uses to run checks in parallel:

```console
semgrep scan -j NUMBER_OF_SUBPROCESSES
```

By default, the number of jobs Semgrep uses is equivalent to the number of cores detected on the system.

> Semgrep doesn't currently support parallelism on Windows.

## Set log levels

Semgrep provides three levels of logging:

| **Log level** | **Flag** | **Description** |
| - | - | - |
| Default | None | Prints scan progress, findings information, warnings, and errors. |
| Verbose | `-v` or `--verbose` | Includes everything printed when using the default logging level, adding a list of rules and details such as skipped files. |
| Debug | `--debug` | Logs the entire scan process at a high level of detail. |

### Example usage

To set the logging level for a scan, include the flag when scanning your project:

```console
# run a scan and get debug logs
semgrep scan --debug
```

## Exit codes

The command `semgrep scan` finishes with exit code `0` as long as the scan completes, regardless of whether there were findings. To finish with exit code `1` when there are findings, pass in the `--error` flag.
