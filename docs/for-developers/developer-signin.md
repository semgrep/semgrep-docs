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

# Sign in and install Semgrep

Signing in to Semgrep enables you to use your organization's custom Semgrep rules and configurations when you perform local scans with Semgrep. This ensures that everyone in the organization uses the same rules and analyses.

Additionally, when you sign in to the Semgrep AppSec Platform web app, you can also view findings for projects (repositories) that have been assigned to you.

## Semgrep in multiple environments

If you have not yet created a Semgrep account, it is **recommended** to first sign in to the Semgrep web app. The web app creates a **personal** account. You can then join your organization's Semgrep account, thus giving you access to your organization's Semgrep configuration.

If you use Semgrep in your CLI or IDE, you must sign in those environments as well. It is recommended to sign in from these interfaces **after** you have signed in to your organization account in the web app.

## Signing in to the web app

In a typical Semgrep deployment, your security or infrastructure team will invite you to sign in to the Semgrep web app using either GitHub, GitLab, or SSO:

 <JoinAnOrg />

After signing in to your org's account, you can now sign in from other environments, such as your CLI or IDE.

## Set up Semgrep in the CLI

#### Prerequisites

Before proceeding, see [Prerequisites](/prerequisites) to ensure that your machine meets Semgrep's requirements.

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

For Visual Studio Code (VS Code) users:

1. Navigate to the [<i class="fas fa-external-link fa-xs"></i> Semgrep VS Code extension page](https://marketplace.visualstudio.com/items?itemName=Semgrep.semgrep).
1. Click **Install**. Enter <kbd>Ctrl+⇧Shift+P</kbd> or <kbd>⌘Command+⇧Shift+P</kbd> (macOS) to launch the Command Palette, and run the following to sign in:
```
Semgrep: Sign in
```

For Semgrep IntelliJ users:

1. Navigate to the [<i class="fas fa-external-link fa-xs"></i> Semgrep IntelliJ extension page](https://plugins.jetbrains.com/plugin/22622-semgrep).
1. Click **Get**.
1. Click the latest version compatible with your machine.


