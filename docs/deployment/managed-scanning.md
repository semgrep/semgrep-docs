---
slug: managed-scanning
title: Managed Scans (beta)
hide_title: true
description: Semgrep Managed Scans provides an alternative to CI-based workflows. It enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - Beta
  - Deployment
  - Semgrep AppSec Platform
---

import InstallPrivateGitHubApp from "/src/components/procedure/_install-private-github-app.mdx"

# Semgrep Managed Scans

Add repositories to your Semgrep organization in bulk without adding or changing your existing CI workflows through **Managed Scans**. Similar to CI workflows, Managed Scans also integrates into developer workflows through PR comments.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.

## Feature maturity and support

- Managed Scans is in **public beta** for all existing Semgrep AppSec Platform users.
- It supports hosted GitHub (GitHub.com) and GitHub Enterprise Server plans.
- Please leave feedback by either contacting your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.
- Managed Scans is available for all Semgrep products you have purchased, including:
    - Semgrep Code
    - Semgrep Supply Chain
    - Semgrep Secrets
- Semgrep performs both full and diff-aware managed scans when a developer creates a pull request.

:::info
- To receive Supply Chain findings, you must have a supported lockfile in your repository. Managed Scans does **not** support lockfile generation.
- For existing Semgrep projects, custom `semgrep.yml` configurations are not copied or detected when you use Managed Scans. If you have additional build steps when scanning, use [Semgrep in CI instead](/deployment/add-semgrep-to-ci).
:::

## Security

Managed Scans require **[<i class="fas fa-external-link fa-xs"></i> read access](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-projects)** to your code in GitHub for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

The access to your code is facilitated by a **private Semgrep GitHub app** that you create and register in your GitHub organization.

- You are in control of the app and can [revoke access to repositories](#remove-the-private-app) at any time.
- You can [limit access to specific repositories](#limit-access-to-specific-repositories).

Managed scans are specifically designed to limit the amount of time that code remains within Semgrep infrastructure.

### Life cycle of a managed scan

1. When a scan begins, Semgrep creates an ephemeral container and clones the repository into it.
1. Semgrep runs the scan from that container. Diff-aware scans typically take seconds, while full scans can take minutes to hours to complete.
1. The ephemeral container is immediately and automatically destroyed post-scan along with all contents in it.

## Add a repository to Semgrep Managed Scans

Part of the process of adding a repository includes creating and registering a public Semgrep GitHub app and a private Semgrep GitHub App.

- The public Semgrep GitHub app is required to easily add members of your GitHub org to your Semgrep org.
- The private Semgrep GitHub app is required to enable code access for Managed Scans.

To view all permissions, see [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information.

<!-- vale off -->
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Click **Scan new project > Semgrep Managed Scan**.
1. If you haven't completed the installation of public and private Semgrep GitHub apps, you are redirected to the **Set up Managed Scans** page, which facilitates the creation of both.
    1. Follow the steps in the page to create and register both a public and private Semgrep GitHub app.
1. In the **Enable Managed Scans for GitHub repos** page, select the repositories you want to add to Semgrep Managed Scans.
    1. Optional: If you don't see the repository you want to add, click **Sync projects** or click **Check GitHub Access Configuration** to ensure that you've granted Semgrep access to at least one repository.
1. Select the repositories you want to scan from the list.
1. Click **Enable Managed Scans**. The **Enable Managed Scans** dialog appears. By default, Semgrep runs both full and diff-aware scans.
1. Optional: Disable PR or MR diff-aware scans by turning off the **Enable PR/MR scans** toggle.
![Enable Managed Scans dialog](/img/sms-enable-pr-or-mr.png#sm-width-bordered)
1. Click **Enable**.
1. If you use the **Semgrep Network Broker**, must edit you Broker configuration file; refer to [Use Semgrep Network Broker with Managed Scans](/semgrep-ci/network-broker#use-semgrep-network-broker-with-managed-scans).

<!-- vale on -->

You have finished setting up a Semgrep managed scan.

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan `.


### Troubleshoot your Semgrep GitHub app installation

A complete installation is displayed in the Source Code Manager entry as follows:

![GitHub entry with public and private GitHub app connection](/img/zcs-code-access-enabled.png#md-width)
_**Figure**. **Semgrep AppSec Platform > <i class="fa-solid fa-gear"></i> Settings > Source Code Managers** displaying a completed Managed Scans set-up._

You can also confirm a complete installation through your GitHub settings page, which should have two Semgrep apps:

![GitHub settings page](/img/zcs-github-apps.png#bordered)
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
1. Delete the `/.github/workflows/semgrep.yml` file in your GitHub repository.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

## Default configuration

By default, projects on Managed Scans are configured with:

- **Weekly full scans** of the entire repository. When a project is first added to Managed Scans, the AppSec Platform performs an initial scan and then sets a random time up to 6 days after to perform a weekly full scan. Each weekly scan occurs on that same day and time.
- **Diff-aware scans** on pull requests that run on every PR. These diff-aware scans follow the **rule modes** set in your Policies, ensuring that developers are only notified of findings from high-signal rules you place in Comment or Block mode.

## Scan management and configuration

### Manually run a full scan

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Search for your repository's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that repository.
1. Click **Run a new scan**.

### Disable diff-aware scans on PRs

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Search for your repository's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that repository.
1. Click the toggle for diff-aware scans.

### Remove a repository

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Search for your repository's name.
1. Click the **<i class="fa-solid fa-gear"></i> gear icon** to access the settings page for that repository.
1. Click the dropdown at the header and click **Delete project**.

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

### Scan logs and statistics

You can view logs for your most recent scan by clicking **Projects > the project's latest scan time** under **Scan status**.

![Click the project's latest scan to view the log](/img/sms-logs.png)
_**Figure**. The Projects page. Click the project's latest scan (underlined) to view the log._

:::info
It can take a few minutes for your latest scan's logs to appear. However, if the logs do not update 15 minutes after the scan, there may be issues with the scan itself.
:::

**Scan statistics**, such as how many of your repositories are being scanned, the scan success rate, and so on, can be provided once a week upon request. Contact your Semgrep account manager to request scan statistics.
