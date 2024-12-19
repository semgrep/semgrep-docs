---
slug: developer-signin
title: Sign in to Semgrep
hide_title: true
description: Sign in to Semgrep to run scans following your organization's Semgrep deployment.
tags:
  - Guides for developers
---

import JoinAnOrg from "/src/components/procedure/_join-an-org.md"
import Install from "/src/components/procedure/_install-cli.mdx";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign in and install Semgrep

Signing in to Semgrep enables you to use your organization's custom Semgrep rules and configurations when you perform local scans with Semgrep. This ensures that everyone in the organization uses the same rules and analyses.

When you sign in to the [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform web app](https://semgrep.dev/login), you can also view findings for projects (repositories) that have been assigned to you.

## Semgrep in multiple environments

If you have not yet created a Semgrep account, it is **recommended** to first sign in to the Semgrep web app. This process creates a creates a **personal** account, after which you can then **join** your organization's Semgrep account, which grants you access to your organization's Semgrep configuration.

If you use Semgrep in your CLI or IDE, you must sign in from those environments as well. It is recommended to sign in from these interfaces **after** you have signed in to your organization account in the web app.

## Prerequisites

- Confirm with your security team that there is an existing organization account for you to join.
- For CLI and IDE scans, see [Prerequisites > Command line tool](/prerequisites#semgrep-command-line-tool) to ensure that your machine meets Semgrep's requirements.

## Signing in to the web app

In a typical Semgrep deployment, your security or infrastructure team will invite you to sign in to the Semgrep web app using either GitHub, GitLab, or SSO:

 <JoinAnOrg />

After signing in to your org's account, you can now sign in from other environments, such as your CLI or IDE.

## Set up Semgrep in the CLI

#### Prerequisites


<Install />

To sign in to Semgrep:

1. Ensure that you are signed in to your **org account** in the Semgrep web app.
1. Enter the following command in your CLI:
    ```bash
    semgrep login
    ``` 
1. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed.
1. In the Semgrep CLI login dialog, click **Activate** to proceed.

You are now ready to run local scans with your org's Semgrep configuration.

## Set up a Semgrep IDE extension

<Tabs
    defaultValue="vs-code"
    values={[
    {label: 'Visual Studio Code (VS Code)', value: 'vs-code'},
    {label: 'IntelliJ', value: 'intellij'},
    ]}
>

<TabItem value='vs-code'>

For Microsoft VS Code users:

1. Navigate to the [<i class="fas fa-external-link fa-xs"></i> Semgrep VS Code extension page](https://marketplace.visualstudio.com/items?itemName=Semgrep.semgrep).
1. Click **Install**. Enter <kbd>Ctrl+⇧Shift+P</kbd> or <kbd>⌘Command+⇧Shift+P</kbd> (macOS) to launch the Command Palette, and run the following to sign in:
```
Semgrep: Sign in
```

A Semgrep scan starts automatically after signing in.

</TabItem>

<TabItem value='intellij'>

For JetBrains IntelliJ users:

1. Navigate to the [<i class="fas fa-external-link fa-xs"></i> Semgrep IntelliJ extension page](https://plugins.jetbrains.com/plugin/22622-semgrep).
1. Click **Get**.
1. Click the latest version compatible with your machine.
1. Install the plugin from your IntelliJ IDE by navigating to **Settings/Preferences > Plugins > ⚙️ > Install plugin from disk**.
1. Sign in: Enter <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and sign in to Semgrep AppSec Platform by selecting the following command:
   ```
   Sign in with Semgrep
   ```
3. Test the extension by entering <kbd>Ctrl+⇧Shift+A</kbd> (Windows) or <kbd>⌘Command+⇧Shift+A</kbd> (macOS) and run the following command:
   ```
   Scan workspace with Semgrep
   ```

</TabItem>
</Tabs>


