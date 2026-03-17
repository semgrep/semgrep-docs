---
slug: mcp
append_help_link: false
title: Semgrep Plugin
hide_title: true
description: Learn about the MCP server for using Semgrep to scan code for security vulnerabilities.
tags:
 - Semgrep Plugin
 - MCP
 - Semgrep Multimodal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep Plugin

Semgrep's plugin integrates natively with AI coding agents like Cursor, Claude Code, and Windsurf to catch security issues before they ship. It bundles the Semgrep MCP server, Hooks, and Skills into a single install, and scans every file an agent generates using Semgrep Code, Supply Chain, and Secrets. When findings are detected, the agent is prompted to regenerate code until Semgrep returns clean results or you choose to dismiss them.

This guide covers setup for Cursor, Windsurf, and Claude Code, but the plugin works with any MCP client.

## Prerequisites

* Python 3.10 or later
* Homebrew or Pip to install Semgrep
* A Semgrep account

## Installation

<Tabs
    defaultValue="cursor"
    values={[
    {label: 'Cursor', value: 'cursor'},
    {label: 'Windsurf', value: 'windsurf'},
    {label: 'Claude Code', value: 'claude'},
    {label: 'Other IDEs', value: 'other'},
    ]}
>

<TabItem value='cursor'>

1. Install Semgrep:
    ```bash
    # install through homebrew
    brew install semgrep

    # install through pip
    python3 -m pip install semgrep
    ```

1. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

1. Log in to Semgrep and install Semgrep Pro:

    ```
    semgrep login && semgrep install-semgrep-pro
    ```

1. Find Semgrep in the [Cursor Plugin Marketplace](https://cursor.com/marketplace/semgrep), or open **Cursor > ⌘⇧J > Plugins**. Search "Semgrep" and click **Add to Cursor**.

1. Restart Cursor to apply configuration.

</TabItem>

<TabItem value='windsurf'>

1. Install Semgrep:
    ```bash
    # install through homebrew
    brew install semgrep

    # install through pip
    python3 -m pip install semgrep
    ```

1. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

1. Log in to Semgrep and install Semgrep Pro:

    ```
    semgrep login && semgrep install-semgrep-pro
    ```

1. Create a `hooks.json` file at `~/.codeium/windsurf/hooks.json` and paste the following configuration:

    ```json
    {
      "hooks": {
        "post_write_code": [
          {
            "command": "semgrep mcp -k post-tool-cli-scan -a windsurf",
            "show_output": true
          }
        ]
      }
    }
    ```

1. Restart Windsurf to apply hook configuration.

</TabItem>

<TabItem value='claude'>

1. Install Semgrep:
    ```bash
    # install through homebrew
    brew install semgrep

    # install through pip
    python3 -m pip install semgrep
    ```

2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3.  Start a new Claude Code instance in the terminal:
    ```bash
    claude
    ```

4.  Install the Semgrep plugin from the [Claude plugin marketplace](https://claude.ai/marketplace):
    ```bash
    /plugin install semgrep-plugin
    ```

5.  Set up the Semgrep plugin:
    ```bash
    /semgrep-plugin:setup_semgrep_plugin
    ```

</TabItem>

<TabItem value='other'>

1. Install Semgrep:
    ```bash
    # install through homebrew
    brew install semgrep

    # install through pip
    python3 -m pip install semgrep
    ```

2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3. Sign in to your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:
    ```bash
    semgrep login
    ```
    In the **Semgrep CLI login**, click **Activate** to proceed.

4. Return to the CLI, and install the Semgrep Pro engine:
    ```bash
    semgrep install-semgrep-pro
    ```

5. Add the Semgrep MCP Server to your IDE. Semgrep provides [sample configuration information](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp#integrations) that you can use as a starting point for your configuration. Refer to your IDE's documentation for specific details on where to add the MCP server configuration information.

</TabItem>
</Tabs>

## Scan your code

1. Open up your IDE's AI chat window.
2. Ensure that you're in the correct context to use Semgrep.
3. Prompt your IDE to scan with Semgrep.

By default, the MCP Server runs all three Semgrep products: Multimodal, Supply Chain, and Secrets.

## Additional resources

* Semgrep's `#mcp` [Slack community](https://go.semgrep.dev/slack)
* The [Semgrep MCP server repo on GitHub](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp)
