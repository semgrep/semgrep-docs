---
slug: cli-oss
title: Local CLI scans
hide_title: true
displayed_sidebar: scanSidebar
description: Learn how to set up Semgrep, scan your codebase for security issues, and view your findings in the CLI.
tags:
  - Quickstart
  - Semgrep CE
---

import Install from "/src/components/procedure/_install-cli.mdx";
import Login from "/src/components/procedure/_login-activate.mdx";
import ExportAs from "/src/components/reference/_export-as.mdx";
import ScanRuleset from "/src/components/reference/_scan-ruleset.mdx";

# Local scans with Semgrep Community Edition (CE)

Learn how to set up Semgrep CE, scan your codebase for security issues, and view your findings in the CLI.

## Prerequisites

See [Prerequisites](/prerequisites) to ensure that your machine meets Semgrep's requirements.

## Set up Semgrep

<Install />

## Scan your codebase

<ExportAs />

### Scan your codebase with a specific ruleset

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
