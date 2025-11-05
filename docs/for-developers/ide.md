---
slug: /for-developers/ide
title: Run IDE scans
hide_title: true
description: Set up and run Semgrep scans within your IDE 
tags:
  - Developer education
  - Extensions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IdeList from "/src/components/reference/_ide-list.md"
import IdeLimitations from "/src/components/reference/_ide-limitations.md"
import QuickstartVSCode from "/src/components/procedure/_quickstart-vscode.md" 
import QuickstartIntelliJ from "/src/components/procedure/_quickstart-intellij.md"

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

<QuickstartVSCode /> 

</TabItem>

<TabItem value='intellij'>

For JetBrains IntelliJ users:

<QuickstartIntelliJ />

</TabItem>
</Tabs>

## Scan scope and limitations

<IdeLimitations />
