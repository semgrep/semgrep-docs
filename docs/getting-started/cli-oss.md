---
slug: cli
title: CLI-only workflow (OSS)
hide_title: true
description: Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.
tags:
  - quickstart
  - cli
---

import MoreHelp from "/src/components/MoreHelp";
import Install from "/src/components/procedure/_install-cli.mdx";
import Login from "/src/components/procedure/_login-activate.mdx";

# CLI-only workflow with Semgrep's OSS Engine

Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.

## Prerequisites

See [Prerequisites](/prerequisites/) to ensure that your machine meets Semgrep's requirements.

## Set up Semgrep

<Install />

## Scan your project

# Semgrep OSS

Navigate to the root of your codebase, and run your first scan. The specific command you use depends on how you want to view the results.

To view the results in the CLI:

```console
semgrep scan
```

To export the results to a SARIF file:

```console
semgrep scan --sarif --output=semgrep.sarif
```

To export the results to a JSON file:

```console
semgrep scan --json --output=semgrep.json
```

### Scan your project with a specific ruleset

You can scan your project using `--config auto` to run Semgrep with rules that apply to your to your codebase:

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

<MoreHelp />
