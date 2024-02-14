---
slug: cli
title: Local CLI scans
hide_title: true
description: Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.
tags:
  - quickstart
  - cli
---

import MoreHelp from "/src/components/MoreHelp";
import Install from "/src/components/procedure/_install-cli.mdx";
import Login from "/src/components/procedure/_login-activate.mdx";

# Local scans with Semgrep Pro Engine

Learn how to set up Semgrep, scan your project for security issues using Semgrep's Pro Engine, and view your findings in the CLI.

:::info
Semgrep provides two commands that you can choose from when you start a scan from the CLI:

- `semgrep scan` - This is the recommended command for scanning local codebases and writing and testing custom rules.
- `semgrep ci` - This is the recommended command if you are scanning repositories with Semgrep as part of an organization with custom rules and policies. `semgrep ci` fetches your organization's scan configurations from Semgrep Cloud Platform.
:::

## Prerequisites

Before proceeding:

* See [Prerequisites](/prerequisites/) to ensure that your machine meets Semgrep's requirements.
* For scans using `semgrep ci`:
    * Ensure that you have and are logged in to your [Semgrep Account](https://semgrep.dev/login).
    * Ensure that you've enabled the **Pro Engine** <i class="fa-solid fa-toggle-large-on"></i> toggle on Semgrep Cloud Platform's [Settings](https://semgrep.dev/orgs/-/settings) page.

## Set up Semgrep

<Install />

## Log in to your Semgrep account

<Login />

You must log in to your Semgrep account before proceeding. Otherwise, you can't use `semgrep ci`.

## Scan your project

Navigate to the root of your repository, and run your first scan. The specific command you use depends on how you want to view the results.

To view the results in the CLI:

```console
semgrep ci
```

To export the results to a plain text file:

```console
semgrep ci --text --output=semgrep.txt
```

To export the results to a SARIF file:

```console
semgrep ci --sarif --output=semgrep.sarif
```

To export the results to a JSON file:

```console
semgrep ci --json --output=semgrep.json
```

### Scan your project with a specific ruleset

You can scan your project using `--config auto` to automatically obtain rules tailored to your project:

```console
semgrep scan --config auto --pro
```

:::info
Semgrep collects pseudonymous metrics when you use rules from the Registry. You can turn this off with `--metrics=off`.
:::

To scan your project with a specific ruleset, either one that you write or one that you obtain from the [Semgrep Registry](https://semgrep.dev/explore), you can do so using the `--config` flag:

```console
# Scan with the rules defined in rules.yaml
semgrep scan --config rules.yaml
```

You can include as many configuration flags as necessary.

```console
# Scan with rules defined in two separate config files
semgrep scan --config rules.yaml --config more_rules.yaml
```

#### Test custom rules

Semgrep includes functionality to [test the custom rules that you write](/writing-rules/testing-rules/):

```console
semgrep scan --test
```

#### Publish custom rules

To share your rules by adding them to the Semgrep Registry:

```console
semgrep publish <path/to/rules>
```

### Scan without sending results to Semgrep

To scan your project using the configuration you've set up in Semgrep Cloud Platform **without** sending scan results to Semgrep, use:

```console
semgrep ci --dry-run
```

This can be helpful to verify the results of a specific ruleset or to see how your findings change based on the rulesets you choose for your scans.

### Scan using Semgrep's OSS engine

To scan your project with Semgrep's OSS Engine, even though you have the Pro Engine enabled in Semgrep Cloud Platform:

```console
semgrep ci --oss-only
```

:::info
See [Semgrep Pro versus Semgrep OSS](/semgrep-pro-vs-oss) for information on the differences between Semgrep Pro and OSS Engines.
:::

## Scan using specific Semgrep Products

When you run `semgrep ci`, you scan your project with any product that is enabled in Semgrep Cloud Platform. To scan your project with just one product, run:

```console
# scan with Semgrep Code
semgrep ci --code

# scan with Semgrep Supply Chain
semgrep ci --supply-chain

# scan with Semgrep Secrets
semgrep ci --secrets
```

## Extend timeout thresholds

Depending on the file sizes in your project, you may need to increase the timeout threshold so that Semgrep doesn't time out before the scan completes. You can control this value using the `--timeout-threshold` flag, which refers to the maximum amount of time Semgrep spends scanning a single file. The default value is 30 seconds. Semgrep attempts to scan each file with this timeout value three times.

```console
# increase timeout to 45 seconds
semgrep ci --timeout 30
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

The CLI commands `semgrep ci` and `semgrep scan` finish with exit code `0` as long as the scan completes, regardless of whether there were findings. To finish with exit code `1` when there are findings, pass in the `--error` flag.

## Log out

To log out of your Semgrep account:

```console
semgrep logout
```

<MoreHelp />
