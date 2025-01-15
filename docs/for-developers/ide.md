---
slug: /for-developers/ide
title: Run IDE scans
hide_title: true
description: Set up and run Semgrep scans within your IDE 
tags:
  - Developer education
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdeList from "/src/components/reference/_ide-list.md"
import IdeLimitations from "/src/components/reference/_ide-limitations.md"

# Run IDE scans

Semgrep supports the following IDE extensions:

<IdeList />

## Quickstart

Select your IDE in the following tabs and follow the instructions to set up your first Semgrep IDE scan. 

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

## Scan scope and limitations

<IdeLimitations />
