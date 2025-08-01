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
import TurnOffSms from "/src/components/procedure/_turn-off-sms-in-semgrep-appsec-platform.mdx"
import FailOpen from "/src/components/procedure/_fail-open.mdx"


# Add an Azure DevOps repository to Semgrep Managed Scans

Add Azure DevOps repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. 

## Prerequisites and permissions

- Semgrep Managed Scanning requires repositories hosted by Azure DevOps Services. It doesn't support Azure DevOps Server.
- Semgrep recommends setting up and configuring Semgrep Managed Scanning with an Azure DevOps service account, not a personal account. Regardless of whether you use a personal or service account, the account must be assigned the **Owner** or **Project Collection Administrator** role for the organization.
- During setup and configuration, you must provide a personal access token generated by the account. This token must be authorized with **Full access**.
  - Once you have Managed Scanning fully configured, you can update the token provided to Semgrep to one that's more restrictive. The scopes you must assign to the token include:
    - `Code: Read`
    - `Code: Status`
    - `Member Entitlement Management: Read`
    - `Project and Team: Read & write`
    - `Pull Request Threads: Read & write`

## Enable Managed Scans and scan your first repository

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. Click **Scan new project > Semgrep Managed Scan**.
3. Select **Azure Devops** as your source code manager.
4. On the **Add to Azure DevOps Pipeline** page, provide the following information:
   1. Your **Access token**. See [User personal access tokens](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) for token generation information. Ensure you set the Azure DevOps SCM name to `organization_name/project_name`.
   2. The name of your **Azure DevOps Project**.
5. Click **Connect** to proceed.
<!-- vale on -->

You have finished setting up a Semgrep managed scan. Click **Back to Managed Scans** to see your projects.

- After enabling Managed Scans, Semgrep performs a full scan on all the repositories in batches.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A Semgrep AppSec Platform project includes all the repository's findings, history, and scan metadata.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

## Add additional Azure DevOps projects

You can enable managed scanning for additional repositories after onboarding using the following steps:

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

<FailOpen />

## Disable webhooks

Managed scanning of Azure DevOps projects requires webhooks. The webhooks are enabled by default when you add Azure DevOps as a source code manager when setting up Managed Scanning. Webhooks are required for diff-aware scans and triaging by PR or MR comments.

You can turn off webhooks at any time by following these steps:

1. In Semgrep AppSec Platform, go to [Settings > Source code managers](https://semgrep.dev/orgs/-/settings/source-code).
2. Find your Azure DevOps connection, and click the <i class="fa-solid fa-toggle-large-on"></i> toggle to turn off **Incoming webhooks**.

## Revoke Semgrep's access to your repositories

The following steps revoke the code access you previously granted Semgrep for all repositories you selected.

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
2. Find the Azure DevOps entry on the list of **Source code managers** and click **Remove**.
3. Click **Remove** to confirm.

## Turn off Managed Scans for specific repositories in Semgrep AppSec Platform

<TurnOffSms />

## Enable status checks

To protect branches whose repositories are automatically scanned by Semgrep, enable Azure DevOps status checks:

1. Sign in to Azure DevOps and navigate to the Azure DevOps project you've connected to Semgrep.
2. Go to **Repos > Branches**. 
3. Find the branch to which the status check should be applied, and click the <i class="fa-solid fa-ellipsis-vertical"></i> three vertical dots to open up the **More options** dialog.
4. Select **Branch policies**.
4. Ensure that the branch to which you want the status check applied is selected. Navigate to **Status Checks**, and click the **Add +** button to proceed.
   ![Configure status checks for a branch in Azure DevOps](/img/ado-status-checks-setup.png#md-width)
    _**Figure**. Configure status checks for a branch in Azure DevOps._
5. In the dialog that appears:
   1. Leave the **Status to check** box blank, since this value is auto-populated as you provide values in subsequent steps.
   2. Select the **Enter genre/name separately** box. Provide the following values:
      1. **Genre**: `security`
      2. **Name**: `semgrep-cloud-platform/scan`
      
      Once you provide the **Genre** and **Name**, Azure DevOps auto-populates **Status to check**. 
   3. Choose whether the status check needs to succeed or not to complete pull requests. Selecting **Required** means that a status of `succeeded` is necessary to complete pull requests. Selecting **Optional** means that a status of `failed` will not block the completion of pull requests.
   ![Add status policy dialog in Azure DevOps.](/img/ado-add-status-policy.png#md-width)
   _**Figure**. Add status policy dialog in Azure DevOps._
6. Click **Save** to proceed.

At this point, all subsequent pull requests opened against this branch are subject to the status check you created.

![PR notification after a status check passes.](/img/ado-status-checks.png#md-width)
_**Figure**. PR notification after a status check passes.._

See [Configure a branch policy for an external service](https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops) for additional information about status checks.

## Troubleshooting: multiple projects

If you currently scan Azure DevOps repositories in your CI pipeline, you may see findings assigned to two separate projects once you enable Semgrep Managed Scanning. For example, findings from Managed Scanning go to the `semgrep/frontend/webpage` project, while findings from CI scans go to the `frontend/webpage` project. If this is the case, Semgrep AppSec Platform flags these findings with **Possible duplicate**. Please [contact support](/support) for addition assistance.

## Appendices

<details>
<summary>Scan logs and statistics</summary>

### Scan logs

#### Most recent scan

You can view logs for your most recent scan by clicking **Projects > the project's latest scan time** under **Scan status**.

![Click the project's latest scan to view the log](/img/sms-logs.png)
_**Figure**. The Projects page. Click the project's latest scan (underlined) to view the log._

:::info
It can take a few minutes for your latest scan logs to appear. However, if the logs do not update 15 minutes after the scan, there may be issues with the scan itself.
:::

#### All scans

1. Click the project's **Details** page > **Scans** tab. 
1. Click the **<i class="fas fa-scroll"></i>** scroll icon under **Logs** to view the log for the particular entry. 

### Scan statistics

**Scan statistics**, such as how many of your repositories are being scanned, the scan success rate, and so on, can be provided once a week upon request. Contact your Semgrep account manager to request scan statistics.

</details>