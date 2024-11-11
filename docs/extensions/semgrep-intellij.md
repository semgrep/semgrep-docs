---
slug: semgrep-intellij
append_help_link: true
description: "Learn how to install and use Semgrep's extension for IntelliJ."
tags:
    - Extensions
---

# Semgrep IntelliJ extension

[Semgrep](https://semgrep.dev/) swiftly scans code and package dependencies for known issues, software vulnerabilities, and detected secrets. Run Semgrep in your developer environment with the IntelliJ extension to catch code issues as you type. By default, the Semgrep IntelliJ extension scans code whenever you change or open files.

:::info Prerequisites

The Semgrep IntelliJ extension communicates with Semgrep command-line interface (CLI) to run scans. Install Semgrep CLI before you can use the extension. To install Semgrep CLI:

```sh
# For macOS
$ brew install semgrep

# For Ubuntu/WSL/Linux/macOS
$ python3 -m pip install semgrep
```
:::

## Quick start

1. Install the Semgrep extension:
   -  Visit [Semgrep's page on the JetBrains Marketplace](https://plugins.jetbrains.com/plugin/22622-semgrep).
   -  In IntelliJ: **Settings/Preferences > Plugins > Marketplace > Search for `semgrep-intellij` > Install**. You may need to restart IntelliJ for the Semgrep extension to be installed.

2. Sign in: Press <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and sign in to Semgrep AppSec Platform by selecting the following command:
   ```
   Sign in with Semgrep
   ```
3. Test the extension by pressing <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and run the following command:
   ```
   Scan workspace with Semgrep
   ```
4. See Semgrep findings: Hold the pointer over the code that has the red underline.

:::info Feature maturity
Semgrep's IntelliJ extensions are in **public beta**. Currently, the IntelliJ extension only supports Semgrep OSS - it doesn't support Semgrep Supply Chain, Secrets, Pro rules, or Pro Engine. Please join the [Semgrep community Slack workspace](http://go.semgrep.dev/slack) and let the Semgrep team know if you encounter any issues.
:::

## Supported Jet Brains products

Semgrep's IDE extension is available in many Jet Brains products:

- AppCode
- Aqua
- CLion
- DataSpell
- DataGrip
- GoLand
- IntelliJ IDEA Ultimate
- PhpStorm
- PyCharm Professional
- Rider
- RubyMine
- RustRover
- WebStorm

:::caution

IntelliJ extension does not support:
- IntelliJ IDEA Community Edition. 

Semgrep does not offer an IDE integration with IntelliJ Community Edition because [this version lacks support for the Language Server Protocol (LSP)](https://plugins.jetbrains.com/docs/intellij/language-server-protocol.html#supported-ides), which is essential for enabling Semgrep’s code scanning features. IntelliJ Ultimate, which includes LSP support, is required to use Semgrep's IDE integration.

:::

## Commands

Run Semgrep extension commands through the IntelliJ Command Palette. You can access the Command Palette by pressing <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) on your keyboard.

- `Sign in with Semgrep`: Sign up or log in to the Semgrep AppSec Platform (this command opens a new window in your browser). Alternatively, you can log in through your command-line interface by running `semgrep login`.
- `Sign out of Semgrep`: Log out of Semgrep AppSec Platform. If you are logged out, you lose access to Semgrep Supply Chain and Semgrep Secrets. Alternatively, you can sign out through your command-line interface by running `semgrep logout`.
- `Scan workspace with Semgrep`: Scan files that have been changed since the last commit in your current workspace.
- `Scan workspace with Semgrep (Including Unmodified Files)`: Scan all files in the current workspace.

:::tip
You can also click the Semgrep icon in the IntelliJ toolbar to quickly access all available commands.
:::

## Features

### Automatic scanning

When you open a file, Semgrep scans it right away.

### Rule Quick Links

Hover over a match and click the link.

## Support

If you need our support, join the [Semgrep community Slack workspace](http://go.semgrep.dev/slack) and tell us about any problems you encountered.

## Limitations

IDE scans use the Semgrep OSS engine for speed. Scans are thus limited to single file analysis. You can still perform cross file (interfile) scans in your machine through the CLI:

```bash
semgrep ci --pro
```
