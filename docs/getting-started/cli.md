---
slug: cli
title: Local CLI scans
hide_title: true
description: Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.
tags:
  - quickstart
---


import Install from "/src/components/procedure/_install-cli.mdx";
import Login from "/src/components/procedure/_login-activate.mdx";
import ScanRuleset from "/src/components/reference/_scan-ruleset.mdx"

# Local scans with Semgrep

Learn how to set up Semgrep, scan your project for security issues using Semgrep Code's interfile analysis, and view your findings in the CLI.

## Prerequisites

Before proceeding, see [Prerequisites](/prerequisites) to ensure that your machine meets Semgrep's requirements.

## Set up Semgrep

<Install />

## Log in to your Semgrep account

<Login />

:::warning
Semgrep scans triggered using `semgrep ci` fail if you aren't signed in to your Semgrep account.
:::

## Enable cross-file analysis

To enable [cross-file analysis](/semgrep-code/semgrep-pro-engine-intro), which allows you to detect vulnerabilities across files and folders:

1. [Sign in to Semgrep AppSec Platform](https://semgrep.dev/login) if you haven't already.
2. Navigate to [Settings > Deployment](https://semgrep.dev/orgs/-/settings).
3. Click the **Cross-file analysis** <i class="fa-solid fa-toggle-large-on"></i> toggle to enable cross-file analysis.

## Scan your project

Semgrep provides two commands that you can use to start a scan from the CLI:

- `semgrep scan` - This is the recommended command for [scanning local codebases or scanning a project when you don't have a Semgrep account](/getting-started/cli-oss). It is also recommended for [writing and testing custom rules](#scan-your-project-with-a-specific-ruleset).
- `semgrep ci` - This is the recommended command if you are scanning Git repositories with Semgrep as part of an organization with custom rules and policies. `semgrep ci` fetches your organization's scan configurations from Semgrep AppSec Platform.

Navigate to the root of your codebase, and run your first scan. The specific command you use depends on how you want to view the results.

To view the results in the CLI:

```console
semgrep ci
```

To export the results to a plain text file:

```console
semgrep ci --text --text-output=semgrep.txt
```

To export the results to a SARIF file:

```console
semgrep ci --sarif --sarif-output=semgrep.sarif
```

To export the results to a JSON file:

```console
semgrep ci --json --json-output=semgrep.json
```

> The JSON schema for Semgrep's CLI output can be found in [semgrep/semgrep-interfaces](https://github.com/semgrep/semgrep-interfaces/blob/main/semgrep_output_v1.jsonschema).

In addition to the `--text`, `--json`, and `--sarif` flags, which set the primary output formats, and the `--output=<value>` flag that saves the results to a file or posts to a URL, you can append `--<format>-output=<file>` to obtain additional output streams:

```console
# prints findings in SARIF format to standard output and writes in JSON format to `findings.json`.
semgrep ci --sarif --json-output=findings.json

# prints findings in text to standard out and writes JSON output to `findings.json`.
semgrep ci --json-output=findings.json

# prints text output to `findings.txt` and writes in SARIF to `findings.sarif`.
semgrep ci --output=findings.txt --sarif-output=findings.sarif

# writes text to `semgrep.txt`, JSON to `semgrep.json`, and SARIF to `semgrep.sarif`.
semgrep ci --text --output=semgrep.txt --json-output=semgrep.json --sarif-output=semgrep.sarif
```

Accepted values for `<format>`: `text`, `json`, `sarif`, `gitlab-sast`, `gitlab-secrets`, `junit-xml`, `emacs`, `vim`

### Scan your project with a specific ruleset

<ScanRuleset />

#### Test custom rules

Semgrep includes features to [test the custom rules that you write](/writing-rules/testing-rules):

```console
semgrep scan --test
```

#### Publish custom rules

To share your rules by adding them to the Semgrep Registry:

```console
semgrep publish <path/to/rules>
```

### Scan without sending results to Semgrep

To scan your project using the configuration you've set up in Semgrep AppSec Platform **without** sending scan results to Semgrep, use:

```console
semgrep ci --dry-run
```

This can be helpful to verify the results of a specific ruleset or to see how your findings change based on the rulesets you choose for your scans.

### Scan using OSS-only analysis (single-function)

To scan your project using exclusively open source Semgrep, even though you have proprietary cross-file analysis enabled in Semgrep AppSec Platform:

```console
semgrep ci --oss-only
```

:::info
See [Semgrep Pro versus Semgrep OSS](/semgrep-pro-vs-oss) for information on the differences between Semgrep's proprietary and open source analyses.
:::

## Scan using specific Semgrep Products

When you run `semgrep ci`, you scan your project with any product that is enabled in Semgrep AppSec Platform. To scan your project with just one product, run:

```console
# scan with Semgrep Code
semgrep ci --code

# scan with Semgrep Supply Chain
semgrep ci --supply-chain

# scan with Semgrep Secrets
semgrep ci --secrets
```

## Extend timeout thresholds

Depending on the file sizes in your project, you may need to increase the timeout threshold so that Semgrep doesn't time out before the scan completes. You can control this value using the `--timeout` flag, which refers to the maximum amount of time Semgrep spends scanning a single file. The default value is 5 seconds. Semgrep attempts to scan each file with this timeout value three times, but you can change this using the `--timeout-threshold` flag:

```console
# increase timeout to 45 seconds, try only 2 times
semgrep ci --timeout 30 --timeout-threshold 2
```

## Improve performance for large codebases

You can set the number of subprocesses Semgrep uses to run checks in parallel:

```console
semgrep scan -j NUMBER_OF_SUBPROCESSES
```

By default, the number of jobs Semgrep uses is equivalent to the number of cores detected on the system, but `-j = 1` if you're passing in `--pro`. For additional information, see [Parallelization](/kb/semgrep-code/scan-engine-kill).

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
semgrep ci --debug
```

## Exit codes

The CLI commands `semgrep ci` and `semgrep scan` finish with exit code `0` as long as the scan completes, regardless of whether there were findings. To finish with exit code `1` when there are findings:

* [Configure blocking rules](/semgrep-code/policies/#block-a-pr-or-mr-through-rule-modes)
* Pass in the `--error` flag when running `semgrep scan`.

When you run `semgrep ci`, you can pass in the `--no-suppress-errors` if you don't want [internal errors suppressed](/cli-reference/#exit-codes).

## Log out

To log out of your Semgrep account:

```console
semgrep logout
```
