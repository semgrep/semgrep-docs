---
slug: cli
title: CLI-only workflow 
hide_title: true
description: Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.
tags:
  - quickstart
  - cli
---

import MoreHelp from "/src/components/MoreHelp";
import Install from "/src/components/procedure/_install-cli.mdx";
import Login from "/src/components/procedure/_login-activate.mdx";

# CLI-only workflow

Learn how to set up Semgrep, scan your first project for security issues using Semgrep's Pro Engine, and view your findings in the CLI.

## Prerequisites

Before proceeding:

* See [Prerequisites](/prerequisites/) to ensure that your machine meets Semgrep's requirements.
* Ensure that you have and are logged into your [Semgrep Account](https://semgrep.dev/login).
* Ensure that you've enabled the **Pro Engine** <i class="fa-solid fa-toggle-large-on"></i> toggle on Semgrep Cloud Platform's [Settings](https://semgrep.dev/orgs/-/settings) page.

## Set up Semgrep

<Install />

## Log into your Semgrep account

<Login />

You must login to your Semgrep account before proceeding. Otherwise, you can't use `semgrep ci`.

## Scan your project

Navigate to the root of your repository, and run your first scan. The specific command you use depends on how you want to view the results.

To view the results in the CLI:

```console
semgrep ci
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
semgrep scan --config auto .
```

:::info
When using `--config auto`, Semgrep uses your project URL to log into the Semgrep registry.
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

### Scan without sending results to Semgrep

To scan your project **without** sending data to Semgrep, use:

```console
semgrep ci --dry-run
```

### Scan using Semgrep's OSS engine

To scan your project with Semgrep's OSS Engine, even though you have the Pro Engine enabled in Semgrep Cloud Platform:

```console
semgrep ci --oss-only
```

## Scan using selected Semgrep Products

When you run `semgrep ci`, you're scanning your project with Semgrep Code, Semgrep Supply Chain, and Semgrep Secrets. To scan your project with just one product, run:

```console
# scan with Semgrep Code
semgrep ci --code

# scan with Semgrep Supply Chain
semgrep ci --supply chain

# scan with Semgrep Secrets
semgrep ci --secrets
```

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
