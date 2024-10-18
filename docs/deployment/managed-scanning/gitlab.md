---
slug: gitlab
append_help_link: true
title: GitLab
hide_title: true
description: Learn how to add a GitLab repository to Semgrep Managed Scans.
tags:
  - Beta
  - Deployment
  - Semgrep AppSec Platform
---

import ScanWithSms from "/src/components/procedure/_scan-with-sms.mdx"

# Add a GitLab repository to Semgrep Managed Scans

Add GitLab repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. 

## Permissions

Before you can add a GitLab repository to Semgrep Managed Scans, you must create a GitLab personal access token (PAT) and provide it to Semgrep. To do so, follow the instructions that apply to you:

- [Connect a source code manager: GitLab Cloud](/deployment/connect-scm#gitlab-cloud)
- [Connect a source code manager: GitLab self-managed plans](/deployment/connect-scm#gitlab-self-managed-plans)

Once you've added GitLab as a source code manager, enable incoming GitLab webhooks:

1. In Semgrep AppSec Platform, go to [Settings > Source code managers](https://semgrep.dev/orgs/-/settings/source-code).
2. Find your GitLab connection, and click the <i class="fa-solid fa-toggle-large-on"></i> toggle to **Receive incoming webhooks from this GitLab Group**.

See [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information about the permissions used by Semgrep.

## Add a repository

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
8. If you use the **Semgrep Network Broker**, you must edit your Broker configuration file; refer to [Use Semgrep Network Broker with Managed Scans](/semgrep-ci/network-broker#use-semgrep-network-broker-with-managed-scans).
<!-- vale on -->

You have finished setting up a Semgrep managed scan.

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

### If the page doesn't display any repositories

1. Ensure that you've connected your GitLab account by following the steps in [Connect a source code manager](/deployment/connect-scm) and confirm the PAT is created with the required `API` scope and [a role of, at minimum, Reporter](https://docs.gitlab.com/ee/user/permissions.html#roles).
2. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
3. If the page doesn't display the repository you want to add, click **Can't find your project? > Sync projects**.
4. If the page doesn't display any repositories, click **Sync projects**.
5. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

### Convert or migrate an existing Semgrep CI job

You can immediately add any existing project to Managed Scans.

1. Follow the steps in [Add a repository](#add-a-repository).
1. Delete the `.gitlab-ci.yml` file in your GitLab repository if appropriate.

If you plan to continue running some scans in GitLab CI/CD Pipelines (for example, using Managed Scans to run weekly full scans but GitLab CI/CD Pipelines for diff-aware scans) you can leave the workflow file in place, and edit it to reflect your desired configuration.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

<ScanWithSms />

## Revoke Semgrep's access to your repositories

The following steps revoke the code access you previously granted Semgrep for all repositories you selected.

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. On the entry of the SCM you want to remove, click **Remove app**.
1. Click **Remove** to confirm.

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
