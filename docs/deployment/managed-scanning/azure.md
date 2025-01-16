---
slug: azure
append_help_link: true
title: Azure DevOps
hide_title: true
description: Learn how to add an Azure DevOps repository to Semgrep Managed Scans.
tags:
  - Beta
  - Deployment
  - Semgrep AppSec Platform
---

import ScanWithSms from "/src/components/procedure/_scan-with-sms.mdx"

# Add an Azure DevOps repository to Semgrep Managed Scans

Add Azure DevOps repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. 


## Prerequisites and permissions

Semgrep Managed Scanning requires one of the following plans:

//TODO

You must provide the following tokens with the specified scopes...

//TODO

## Enable Managed Scanning and scan your first repository

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. Click **Scan new project > Semgrep Managed Scan**.
3. Select **Azure Devops** as your source code manager.
4. On the **Add to Azure DevOps Pipeline** page, provide the following information, then click **Connect** to proceed:
   1. Your **Access token**. See [User personal access tokens](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) for information on generating a token. Ensure that you set the Azure DevOps SCM name in the form of `organization_name/project_name`.
   2. The name of your **Azure DevOps Project**.
<!-- vale on -->

You have finished setting up a Semgrep managed scan.

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

## Add additional Azure DevOps projects

You can enabled managed scanning for additional repositories after onboarding using the following steps:

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. Click **Scan new project > Semgrep Managed Scan**.
3. On the **Enable Managed Scans for repos** page, select the repositories you want to add to Semgrep Managed Scans.
    1. Optional: If you don't see the repository you want to add, click **Sync projects**.
4. Select the repositories you want to scan from the list.
5. Click **Enable Managed Scans**. The **Enable Managed Scans** dialog appears. By default, Semgrep runs both full and diff-aware scans.
6. Optional: Disable PR or MR diff-aware scans by turning off the **Enable PR/MR scans** toggle.
7. Click **Enable**.
<!-- vale on -->

### If the page doesn't display any repositories

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. If the page doesn't display the repository you want to add, click **Sync projects**.
3. If the page doesn't display any repositories, click **Sync projects**.
4. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

### Convert or migrate an existing Semgrep CI job

You can immediately add any existing project to Managed Scans.

1. Follow the steps in [Add additional Azure DevOps projects](#add-additional-azure-devops-projects).
2. Delete the existing pipeline configuration file in your repository if appropriate.

If you plan to continue running some scans in Azure DevOps Pipelines (for example, using Managed Scans to run weekly full scans but Pipelines for diff-aware scans) you can leave the workflow file in place, and edit it to reflect your desired configuration.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

<ScanWithSms />

## Disable webhooks

Managed scanning of Azure DevOps projects require webhooks. The webhooks are enabled by default when you add Azure DevOps as a source code manager when setting up Managed Scanning. You can disable webhooks at any time by following these steps:

1. In Semgrep AppSec Platform, go to [Settings > Source code managers](https://semgrep.dev/orgs/-/settings/source-code).
2. Find your Azure DevOps connection, and click the <i class="fa-solid fa-toggle-large-on"></i> toggle to disable **Incoming webhooks**.

## Revoke Semgrep's access to your repositories

The following steps revoke the code access you previously granted Semgrep for all repositories you selected.

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
2. Find the Azure DevOps entry on the list of **Source code managers** and click **Remove**.
3. Click **Remove** to confirm.

## Appendices

### Scan logs

#### Most recent scan

You can view logs for your most recent scan by clicking **Projects > the project's latest scan time** under **Scan status**.

![Click the project's latest scan to view the log](/img/sms-logs.png)
_**Figure**. The Projects page. Click the project's latest scan (underlined) to view the log._

:::info
It can take a few minutes for your latest scan's logs to appear. However, if the logs do not update 15 minutes after the scan, there may be issues with the scan itself.
:::

#### All scans

1. Click the project's **Details** page > **Scans** tab. 
1. Click the **<i class="fas fa-scroll"></i>** scroll icon under **Logs** to view the log for the particular entry. 

### Scan statistics

**Scan statistics**, such as how many of your repositories are being scanned, the scan success rate, and so on, can be provided once a week upon request. Contact your Semgrep account manager to request scan statistics.
