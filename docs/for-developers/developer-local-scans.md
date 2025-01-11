---
slug: /for-developers/local-scans
title: Local Semgrep scans
hide_title: true
description: Scan with Semgrep
tags:
  - Semgrep AppSec Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Local Semgrep scans 

## Run local CLI scans

It's best to run the following command for local scans:

```bash
semgrep ci --dry-run
```

- The command `semgrep ci` tells Semgrep to use your organization's chosen analyses and rules for the scan.
- The `--dry-run` flag ensures that your scans are not uploaded to the Semgrep web app. This is recommended because your code could be a work in progress, subject to change, whereas code uploaded as a PR or MR usually indicates the code is ready for review. 

When Semgrep performs a CLI or IDE scan, it presents findings from **all rules** that your AppSec team uses. For this reason, you may encounter **more false positive or low severity findings** that you can ignore.

### Common Semgrep commands

#### `semgrep scan`

The following command runs a local scan with Semgrep Community Edition (CE) using pre-selected rules for a variety of languages:

```bash
semgrep scan
```
- `semgrep scan` does not take into account your organization's settings
- You do **not** need to be logged in to run a scan.
- It only runs SAST analyses. It does not run other Semgrep products, such as Secrets or Supply Chain. 

You can run `semgrep scan` to test a custom rule on a folder, codebase, or repository:

```bash
semgrep scan --config [CUSTOM_RULE].yaml
```

Replace `CUSTOM_RULE.yaml` with the name of your custom rule.

#### `semgrep ci`

The `semgrep ci` command, without any flags, sends the results of your scan to Semgrep AppSec Platform with the slug `local-scan/PROJECT_NAME`. When using this command in a team setting, ensure that you are aware of its risks and that your team members are aware.

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
