---
slug: github
append_help_link: true
title: GitHub
hide_title: true
description: Learn how to add a GitHub repository to Semgrep Managed Scans.
tags:
  - Beta
  - Deployment
  - Semgrep AppSec Platform
---

import ScanWithSms from "/src/components/procedure/_scan-with-sms.mdx"

# Add a GitHub repository to Semgrep Managed Scans

Add GitHub repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. 

## Permissions

To add a repository, you must create and register a public Semgrep GitHub app and a private Semgrep GitHub App.

- The public Semgrep GitHub app is required to easily add members of your GitHub org to your Semgrep org.
- The private Semgrep GitHub app is required to enable code access for Managed Scans.

If you haven't completed the installation of public and private Semgrep GitHub apps, Semgrep prompts you to do so when adding a repository.

See [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information about the permissions used by Semgrep.

## Add a repository

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
2. Click **Scan new project > Semgrep Managed Scan**.
3. If you haven't completed the installation of public and private Semgrep GitHub apps, you are redirected to the **Set up Managed Scans** page, which facilitates the creation of both.
    1. Follow the steps in the page to create and register both a public and private Semgrep GitHub app.
4. In the **Enable Managed Scans for repos** page, select the repositories you want to add to Semgrep Managed Scans.
    1. Optional: If you don't see the repository you want to add, click **Can't find your project?** and follow the troubleshooting steps provided.
5. Select the repositories you want to scan from the list.
6. Click **Enable Managed Scans**. The **Enable Managed Scans** dialog appears. By default, Semgrep runs both full and diff-aware scans.
7. Optional: Disable PR or MR diff-aware scans by turning off the **Enable PR/MR scans** toggle.
![Enable Managed Scans dialog](/img/sms-enable-pr-or-mr.png#sm-width)
1. Click **Enable**.
2. If you use the **Semgrep Network Broker**, you must edit your Broker configuration file; refer to [Use Semgrep Network Broker with Managed Scans](/semgrep-ci/network-broker#use-semgrep-network-broker-with-managed-scans).

<!-- vale on -->

You have finished setting up a Semgrep managed scan.

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

### Troubleshoot your Semgrep GitHub app installation

A complete installation is displayed in the Source Code Manager entry as follows:

![GitHub entry with public and private GitHub app connection](/img/zcs-code-access-enabled.png#md-width)
_**Figure**. **Semgrep AppSec Platform > <i class="fa-solid fa-gear"></i> Settings > Source Code Managers** displaying a completed Managed Scans set-up._

You can also confirm a complete installation through your GitHub settings page, which should have two Semgrep apps:

![GitHub settings page](/img/zcs-github-apps.png)
_**Figure**. **GitHub > Settings > Applications** displaying both Semgrep apps. The private Semgrep app follows the convention **Semgrep Code - <span className="placeholder">YOUR_ORG_NAME</span>**_.

### If the page doesn't display any repositories

1. Ensure you have provided access to **both** the private and public Semgrep GitHub to the repositories you want to scan by following the steps in [Permissions and synchronicity](#permissions-and-synchronicity).
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. If the page doesn't display the repository you want to add, click **Can't find your project? > Sync projects**.
1. If the page doesn't display any repositories, click **Sync projects**.
1. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

Repositories must be accessible to both the public Semgrep GitHub app and the private Semgrep GitHub app.

### Convert or migrate an existing Semgrep CI job

You can immediately add any existing project to Managed Scans.

1. Follow the steps in [Add a repository](#add-a-repository).
1. Delete the `/.github/workflows/semgrep.yml` file in your GitHub repository if appropriate.

If you plan to continue running some scans in GitHub Actions (for example, using Managed Scans to run weekly full scans but GitHub Actions for diff-aware scans) you can leave the workflow file in place, and edit it to reflect your desired configuration.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

<ScanWithSms />

## Revoke Semgrep's access to your repositories

### Remove the private app

The following steps revoke the code access you previously granted Semgrep for all repositories you selected.

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. On the entry of the SCM you want to remove, click **Remove app**.
1. Click **Remove** to confirm.

### Limit access to specific repositories

1. Navigate to your [<i class="fas fa-external-link fa-xs"></i> GitHub settings page](https://github.com/settings/installations/).
1. On the entry of your private Semgrep GitHub app, click **Configure**.
![GitHub settings page](/img/zcs-github-apps.png)
1. Under **Repository access**, de-select the repositories you no longer want to grant Semgrep access to.

## Appendices

### Permissions and synchronicity

Both the public and private Semgrep GitHub app must have access to the repositories you want to scan.

To **view** the repositories you have granted access to:

1. Navigate to your [<i class="fas fa-external-link fa-xs"></i> GitHub settings page](https://github.com/settings/installations/).
1. On the entry of your public Semgrep GitHub app, typically **semgrep-app**, Click **Configure**.
1. Review the repositories under repository access.
1. Perform steps 2 and 3 on the entry of your private Semgrep GitHub app.

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
