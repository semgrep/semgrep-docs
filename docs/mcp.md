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

# Semgrep MCP Server (beta)

Semgrep's open source [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server scans AI-generated code for security vulnerabilities using Semgrep Code, Supply Chain, and Secrets. The IDE re-generates code until Semgrep returns no findings or the user prompts the IDE to ignore Semgrep's findings.

This article includes instructions for setting up the MCP server with Cursor and Claude Code, but it also works with any IDE-based MCP client.

## Prerequisites

* Python 3.10 or later
* Homebrew or Pip to install Semgrep
* A Semgrep account

## Installation

### Cursor

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

1. [Add Semgrep to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=semgrep&config=eyJjb21tYW5kIjoic2VtZ3JlcCBtY3AifQ%3D%3D). Review the prefilled information and click **Install** to proceed.

1. Create a `hooks.json` file in your project's `.cursor` directory and paste the following configuration:

    ```
    {
    "version": 1,
    "hooks": {
        "stop": [
        {
            "command": "semgrep mcp -k stop-cli-scan -a cursor"
        }
        ],
        "afterFileEdit": [
        {
            "command": "semgrep mcp -k record-file-edit -a cursor"
        }
        ]
    }
    }
    ```
1. Restart Cursor to apply hook configuration.

### Claude Code

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

4.  Add the Semgrep marketplace to Claude:
    ```bash
    /plugin marketplace add semgrep/mcp-marketplace
    ```

5.  Install the Semgrep plugin:
    ```bash
    /plugin install semgrep-plugin@semgrep
    ```

6.  Set up the Semgrep plugin:
    ```bash
    /semgrep-plugin:setup_semgrep_plugin

    # if the preceding command doesn't work, try:
    /plugin enable semgrep-plugin@semgrep
    ```

### Other IDEs

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

## Scan your code

1. Open up your IDE's AI chat window.
2. Ensure that you're in the correct context to use Semgrep.
3. Prompt your IDE to scan with Semgrep.

By default, the MCP Server runs all three Semgrep products: Code, Supply Chain, and Secrets.

## Additional resources

* Semgrep's `#mcp` [Slack community](https://go.semgrep.dev/slack)
* The [Semgrep MCP server repo on GitHub](https://github.com/semgrep/semgrep/tree/develop/cli/src/semgrep/mcp)
