---
slug: bitbucket
append_help_link: true
title: Bitbucket
hide_title: true
description: Learn how to add a Bitbucket repository to Semgrep Managed Scans.
tags:
 - Beta
 - Deployment
 - Semgrep AppSec Platform
---

import ScanWithSms from "/src/components/procedure/_scan-with-sms.mdx"
import TurnOffSms from "/src/components/procedure/_turn-off-sms-in-semgrep-appsec-platform.mdx"

# Add a Bitbucket repository to Semgrep Managed Scans

Add Bitbucket repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. 

## Prerequisites and permissions

Semgrep Managed Scanning requires one of the following plans:

- Bitbucket Cloud Premium
- Bitbucket Server/Data Center (see details below)

### Bitbucket Cloud

You must provide a Bitbucket [workspace access token](https://support.atlassian.com/bitbucket-cloud/docs/workspace-access-tokens/) to Semgrep, which can be created by a user with the `Product Admin` role. Once you have Managed Scanning fully configured, you can update the token provided to Semgrep to one that's more restrictive. The scopes you must assign to the token include:

- `webhook (read and write)`
- `repository (read and write)`
- `pullrequest (read and write)`
- `project (admin)`
- `account (read)`

See [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information about the permissions used by Semgrep.

### Bitbucket Data Center

- Version 7.17+ Supported
- Server/Data Center 8.8+: Project-level webhooks available
- Server/Data Center less than 8.8: Repository-level webhook support is in BETA

For Bitbucket Server/Data Center less than 7.18, you must provide a [Personal Access Token](https://confluence.atlassian.com/bitbucketserver0717/personal-access-tokens-1087535496.html) to Semgrep, with 'PROJECT_ADMIN' permissions.

For Bitbucket Server/Data Center 7.18+, you must provide a Bitbucket [HTTP access token](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html) to Semgrep, which can be created by a user with the `Product Admin` role. This access token must be created with with `PROJECT_ADMIN` permissions.


See [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information about the permissions used by Semgrep.

## Enable Managed Scanning and scan your first repository

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Click **Scan new project > Semgrep Managed Scan**.
1. Click **Manage Connections** and then **+ Connect more**.
1. Select **Bitbucket**.
1. In the **Set up Managed Scans** page that appears, provide the information needed by Semgrep to connect to your Bitbucket project:
   1. Select **Bitbucket** or **Bitbucket Data Center**.
   1. Provide your **Access token**.
   1. Provide the name of your **Bitbucket workspace**.
   1. *For Bitbucket Data Center users only*: provide the **Bitbucket Data Center URL**.
   1. Click **Connect**.
1. Repeat the steps above for each additional Bitbucket workspace you'd like added to Semgrep.
<!-- vale on -->

You have finished setting up a Semgrep managed scan.

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories in the workspace.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

## Add additional Bitbucket projects

You can enable managed scanning for additional repositories after onboarding using the following steps:

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. Click **Scan new project > Semgrep Managed Scan**.
3. In the **Enable Managed Scans for repos** page, select the repositories you want to add to Semgrep Managed Scans.
    1. Optional: If you don't see the repository you want to add, click **Can't find your project?** and follow the troubleshooting steps provided.
4. Select the repositories you want to scan from the list.
5. Click **Enable Managed Scans**. The **Enable Managed Scans** dialog appears. By default, Semgrep runs both full and diff-aware scans.
6. Optional: Disable PR or MR diff-aware scans by turning off the **Enable PR/MR scans** toggle.
![Enable Managed Scans dialog](/img/sms-enable-pr-or-mr.png#sm-width)
7. Click **Enable**.
<!-- vale on -->

### If the page doesn't display any repositories

1. Ensure that you've connected your Bitbucket account by following the steps in [Connect a source code manager](/deployment/connect-scm) and confirm the workspace access token is created with the required scopes listed above with the `Product Admin` role.
2. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
3. If the page doesn't display the repository you want to add, click **Can't find your project? > Sync projects**.
4. If the page doesn't display any repositories, click **Sync projects**.
5. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

### Convert or migrate an existing Semgrep CI job

You can immediately add any existing project to Managed Scans.

1. Follow the steps in [Enable managed scanning](#enable-managed-scanning-and-scan-your-first-repository).
1. Delete the `bitbucket-pipelines.yml` file in your Bitbucket repository if appropriate.

If you plan to continue running some scans in Bitbucket CI/CD Pipelines (for example, using Managed Scans to run weekly full scans but Bitbucket CI/CD Pipelines for diff-aware scans) you can leave the workflow file in place, and edit it to reflect your desired configuration.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

<ScanWithSms />

## Disable webhooks

Managed scanning of Bitbucket projects requires webhooks. The webhooks are enabled by default when you add Bitbucket as a source code manager when setting up Managed Scanning. You can disable webhooks at any time by following these steps:

1. In Semgrep AppSec Platform, go to [Settings > Source code managers](https://semgrep.dev/orgs/-/settings/source-code).
2. Find your Bitbucket connection, and click the <i class="fa-solid fa-toggle-large-on"></i> toggle to disable **Incoming webhooks**.

## Revoke Semgrep's access to your repositories

The following steps revoke the code access you previously granted Semgrep for all repositories you selected.

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. On the entry of the SCM you want to remove, click **Remove app**.
1. Click **Remove** to confirm.

## Turn off Managed Scans for specific repositories in Semgrep AppSec Platform

<TurnOffSms />

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
