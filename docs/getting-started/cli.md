---
slug: cli
title: CLI-only workflow 
hide_title: true
description: Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.
tags:
  - quickstart
  - cli
---

import MoreHelp from "/src/components/MoreHelp"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CLI-only workflow 

Learn how to set up Semgrep, scan your first project for security issues, and view your findings in the CLI.

## Prerequisites
You must have Python 3.8 or later installed on the machine where the Semgrep CLI is running.

## Set up Semgrep

<Tabs
    defaultValue="macOS"
    values={[
        {label: 'macOS', value: 'macOS'},
        {label: 'Linux', value: 'Linux'},
        {label: 'Windows Subsystem for Linux (WSL)', value: 'Windows Subsystem for Linux (WSL)'}
    ]}
>

<TabItem value='macOS'>

Install the Semgrep CLI and confirm the installation:

```console
# with homebrew
brew install semgrep

# with pip
python3 -m pip install semgrep

# confirm
semgrep --version
```

:::info
**Homebrew users:** ensure that you've [added Homebrew to your PATH](https://docs.brew.sh/FAQ#my-mac-apps-dont-find-homebrew-utilities).
:::

</TabItem>

<TabItem value='Linux'>

Install the Semgrep CLI and confirm the installation:

```console
# install
python3 -m pip install semgrep

# confirm
semgrep --version
```

</TabItem>

<TabItem value='Windows Subsystem for Linux (WSL)'>

:::info
Ensure that you have the [Windows Subsystem for Linux installed](https://learn.microsoft.com/en-us/windows/wsl/install) before proceeding.
:::

Using the WSL interface, install the Semgrep CLI and confirm the installation:

```console
#install
python3 -m pip install semgrep

# confirm
semgrep --version
```

</TabItem>

</Tabs>

## Log into your Semgrep account

1. Log into your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:

  ```console
  semgrep login
  ```

2. In the **Semgrep CLI login**, click **Activate** to proceed.

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

:::info
Use `--config auto` to automatically obtain rules tailored to this project.

When using `--config auto`, Semgrep uses your project URL to log into the Semgrep registry.
:::

To scan your project with a specific ruleset, either one that you write or one that you obtain from the [Semgrep Registry](https://semgrep.dev/explore), you can do so using the `--config` flag:

```console
# Scan with the rules defined in rules.yaml
semgrep ci --config rules.yaml
```

You can include as many configuration flags as necessary.

```console
# Scan with rules defined in two separate config files
semgrep ci --config rules.yaml --config more_rules.yaml
```

### Scan without sending results to Semgrep

To scan your project **without** sending data to Semgrep, use:

```console
semgrep ci --dry-run
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

## Log out

To log out of your Semgrep account:

```console
semgrep logout
```

<MoreHelp />
