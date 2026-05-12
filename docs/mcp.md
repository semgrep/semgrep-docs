---
slug: mcp
append_help_link: false
title: Semgrep Plugin
hide_title: true
description: Learn about the MCP server for using Semgrep to scan code for security vulnerabilities.
tags:
 - Semgrep Plugin
 - MCP
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep Plugin

Semgrep's plugin integrates natively with AI coding agents like Claude Code and Cursor to catch security issues before they ship. It bundles the Semgrep MCP server, Hooks, and Skills into a single install, and scans every file an agent generates using Semgrep Code, Supply Chain, and Secrets. When findings are detected, the agent is prompted to regenerate code until Semgrep returns clean results or you choose to dismiss them.

The plugin uses each IDE's native hook or MCP system: Claude Code [hooks](https://code.claude.com/docs/en/hooks) and [plugins](https://code.claude.com/docs/en/plugins), [Cursor hooks](https://cursor.com/docs/hooks), [Windsurf Cascade hooks](https://docs.windsurf.com/windsurf/cascade/hooks), [Codex MCP](https://developers.openai.com/codex/mcp), [VS Code MCP](https://code.visualstudio.com/docs/copilot/customization/mcp-servers), and [GitHub Copilot MCP](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp). This guide covers setup for each, but the plugin works with any MCP client.

## Prerequisites

* Python 3.10 or later
* Homebrew, [`pipx`](https://pipx.pypa.io/stable/how-to/install-pipx/), or [`uv`](https://docs.astral.sh/uv/) to install Semgrep
* A Semgrep account

## Installation

<Tabs
    defaultValue="claude"
    values={[
    {label: 'Claude Code', value: 'claude'},
    {label: 'Cursor', value: 'cursor'},
    {label: 'Windsurf', value: 'windsurf'},
    {label: 'Codex', value: 'codex'},
    {label: 'VS Code', value: 'vscode'},
    {label: 'GitHub Copilot', value: 'copilot'},
    {label: 'Other IDEs', value: 'other'},
    ]}
>

<TabItem value='claude'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
    ```
   
2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3.  Start a new Claude Code instance in the terminal:
    ```bash
    claude
    ```

4.  Open the plugin browser:
    ```bash
    /plugin
    ```

5.  Go to **Discover**, search for **Semgrep**, and click **Install**.

6.  Set up the Semgrep plugin by running the following skill. This also installs the Semgrep CLI:
    ```bash
    /setup-semgrep-plugin
    ```

The plugin registers a post-tool hook so Claude Code scans every file it writes. Learn more about [Claude Code plugins](https://code.claude.com/docs/en/plugins) and [hooks](https://code.claude.com/docs/en/hooks).

</TabItem>

<TabItem value='cursor'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
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

The plugin uses [Cursor hooks](https://cursor.com/docs/hooks) to scan code as the agent writes it, and exposes Semgrep tools through [Cursor MCP](https://cursor.com/docs/mcp).

</TabItem>

<TabItem value='windsurf'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
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

The `post_write_code` event fires after Cascade writes or modifies any file. Learn more about [Windsurf Cascade hooks](https://docs.windsurf.com/windsurf/cascade/hooks).

</TabItem>

<TabItem value='codex'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
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

5. Update your `~/.codex/config.toml` file and paste the following:

    ```toml
    [mcp_servers.semgrep]
    command = "semgrep"
    args = ["mcp"]
    ```

Codex does not expose a post-write hook, so Semgrep tools are surfaced through MCP and invoked when the agent calls them. Learn more about [Codex MCP configuration](https://developers.openai.com/codex/mcp).

</TabItem>

<TabItem value='vscode'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
    ```

2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3. Sign in to your Semgrep account, then install the Semgrep Pro engine:
    ```bash
    semgrep login && semgrep install-semgrep-pro
    ```

4. Add the Semgrep MCP server to VS Code. Create `.vscode/mcp.json` in your workspace (or open **MCP: Open User Configuration** from the Command Palette for a user-wide entry) and paste the following:

    ```json
    {
      "servers": {
        "semgrep": {
          "command": "semgrep",
          "args": ["mcp"]
        }
      }
    }
    ```

5. Reload VS Code. Semgrep tools become available in the Copilot Chat **Agent** mode.

VS Code does not expose a post-write hook today, so Semgrep tools are invoked when the agent calls them through MCP. Learn more about [adding and managing MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

</TabItem>

<TabItem value='copilot'>

Use this tab for GitHub Copilot in Visual Studio, JetBrains IDEs, Xcode, or Eclipse. (For Copilot in VS Code, use the **VS Code** tab.)

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
    ```

2. Verify that you've installed the [latest version](https://github.com/semgrep/semgrep/releases) of Semgrep by running the following:
    ```bash
    semgrep --version
    ```

3. Sign in to your Semgrep account, then install the Semgrep Pro engine:
    ```bash
    semgrep login && semgrep install-semgrep-pro
    ```

4. Register the Semgrep MCP server with your IDE's Copilot configuration. The JSON shape is the same across IDEs:

    ```json
    {
      "servers": {
        "semgrep": {
          "command": "semgrep",
          "args": ["mcp"]
        }
      }
    }
    ```

    Follow your IDE's instructions for *where* to put this entry: [Extending Copilot Chat with MCP servers](https://docs.github.com/en/copilot/customizing-copilot/extending-copilot-chat-with-mcp) covers Visual Studio, JetBrains, Xcode, and Eclipse.

5. Restart your IDE and open Copilot Chat. Semgrep tools become available in **Agent** mode.

Copilot does not expose a post-write hook, so Semgrep tools are invoked when the agent calls them through MCP.

</TabItem>

<TabItem value='other'>

1. Install Semgrep using Homebrew, pipx, or uv:
    ```bash
    # install using Homebrew
    brew install semgrep

    # or, install using pipx (https://pipx.pypa.io/stable/how-to/install-pipx/)
    pipx install semgrep

    # or, install using uv (https://docs.astral.sh/uv/)
    uv tool install semgrep
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

If your IDE supports a post-write or post-tool hook, point it at `semgrep mcp -k post-tool-cli-scan -a <ide-name>` to scan generated code automatically. The Windsurf tab above shows this pattern.

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
