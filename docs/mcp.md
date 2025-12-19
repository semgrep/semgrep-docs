---
slug: mcp
append_help_link: false
title: MCP Server
hide_title: true
description: Learn about the MCP server for using Semgrep to scan code for security vulnerabilities.
tags:
 - MCP
 - Semgrep Code
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep MCP Server (beta)

Semgrep's open source [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server scans AI-generated code for security vulnerabilities using Semgrep Code, Supply Chain, and Secrets. The IDE re-generates code until Semgrep returns no findings or the user prompts the IDE to ignore Semgrep's findings.

This article includes instructions for setting up the MCP server with Cursor and Claude Code, but it also works with any IDE-based MCP client.

## Prerequisites

* Python 3.10 or later
* Homebrew or Pip to install Semgrep
* A Semgrep account

## Installation 

<Tabs
    defaultValue="cursor"
    values={[
    {label: 'Cursor', value: 'cursor'},
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

2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3. [Add Semgrep to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=semgrep&config=eyJjb21tYW5kIjoic2VtZ3JlcCBtY3AifQ%3D%3D). Review the prefilled information and click **Install** to proceed.

4. Open Cursor's **AI Pane** window and run `/semgrep/setup_semgrep_mcp` to begin the initial setup process. Follow the on-screen prompts and run the suggested commands. When done, you'll see a confirmation message that begins with **Semgrep MCP setup complete**.

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

3. Sign in to your Semgrep account. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:
    ```bash
    semgrep login
    ```
    In the **Semgrep CLI login**, click **Activate** to proceed.

4. Return to the CLI, and install the Semgrep Pro engine:
    ```bash
    semgrep install-semgrep-pro
    ```

5. Add the Semgrep MCP Server to Claude:
    ```bash
    claude mcp add --scope user semgrep semgrep mcp
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

5. Add the Semgrep MCP Server to your IDE. Semgrep provides [sample configuration information](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp#integrations) that you can use as a starting point for your configuration. Refer to your IDE’s documentation for specific details on where to add the MCP server configuration information.

</TabItem>
</Tabs>

## Scan your code

1. Open up your IDE's AI chat window.
2. Ensure that you're in the correct context to use Semgrep.
3. Prompt your IDE to scan with Semgrep.

By default, the MCP Server runs all three Semgrep products: Code, Supply Chain, and Secrets.

## Additional resources

* Semgrep's `#mcp` [Slack community](https://go.semgrep.dev/slack)
* The [Semgrep MCP server repo on GitHub](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp)
