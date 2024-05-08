---
slug: cloud-scanning
title: Add repositories to Semgrep in bulk (beta)
hide_title: true
description: Semgrep cloud scanning provides an alternative to CI-based workflows. It enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Add repositories to Semgrep in bulk

**Semgrep cloud scanning** enables you to add repositories to your Semgrep org in bulk without adding or changing your CI workflows.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.

## Feature maturity and support

- Cloud scanning is in **public beta**.
- Cloud scanning supports hosted GitHub (GitHub.com) and GitHub Enterprise Server plans.
- Please leave feedback by either reaching out to your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.

## Requirements

Cloud scanning requires **[<i class="fas fa-external-link fa-xs"></i> read access](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28)** to your code in GitHub for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

The access to your code is facilitated by a **private Semgrep GitHub app** that you create and register in your GitHub organization.

- You are in control of the app and can [revoke access to repositories](#remove-the-private-app) at any time.
- You can [limit access to specific repositories](#limit-access-to-specific-repositories).

## Prerequisites

### Install the public Semgrep GitHub app

If you have already installed the public Semgrep GitHub app, skip this step and proceed to [Install the private Semgrep GitHub app](#install-the-private-semgrep-github-app).

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Connect to GitHub**.
1. Follow the steps to connect to your GitHub organization. Ensure that you grant access to the repositories you want to scan.

### Install the private Semgrep GitHub app

The private app must be installed by a **GitHub organization administrator**. If you are not a GitHub admin, an installation link is provided for you to share with your GitHub admin.

1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Register App**.
![GitHub entry with public GitHub app connection](/img/scm-create-private-app.png)
1. Follow the steps to install a private GitHub app in your org. Ensure that you enter your exact GitHub organization name and the correct type of GitHub account, typically **Organization**.
1. Click **Register GitHub App**.
1. If you are an admin on the GitHub organization, click **Continue**. Otherwise, share the provided link with your GitHub administrator.
![Continue to SCM dialog](/img/scm-confirm-private-app.png#sm-width-noborder)
1. Follow the prompts in GitHub to install the private app. Ensure that you grant access to the repositories you want to scan.

A complete installation is displayed in the Source Code Manager entry as follows:

![GitHub entry with public and private GitHub app connection](/img/zcs-code-access-enabled.png#md-width)

## Add a repository

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Click **Scan New Project > Semgrep Cloud Scan**.
1. Optional: If you can't find the repository you want to add, click **Can't find your project? > Sync projects**.
1. Select the repositories you want to scan from the list.
1. Click **Enable Cloud Scanning**.

After enabling cloud scanning, a full scan starts immediately on all the repositories you have added. <!-- may be false, initial scan may start up to 6 days after, will double check -->

Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings and scan metadata of that repository.

### If the page doesn't display any repositories

1. Ensure you have provided access to **both** the private and public Semgrep GitHub to the repositories you want to scan by following the steps in [Permissions and synchronicity](#permissions-and-synchronicity).
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. If the page doesn't display the repository you want to add, click **Can't find your project? > Sync projects**.
1. If the page doesn't display any repositories, click **Sync projects**.
1. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

### How cloud scanning detects repositories

- Repositories with **existing** Semgrep CI jobs are **excluded** from the list. See the following section to convert your existing Semgrep CI jobs to cloud scanning.
- Repositories must be accessible to both the public Semgrep GitHub app and the private Semgrep GitHub app.

<!-- This next section is totally unverified. Sara should probably test this out -->

### Convert an existing Semgrep CI job

If you'd like to convert a large number of Semgrep CI jobs to cloud scanning, you can reach out to your technical account manager (TAM) for assistance.

1. Delete the project (link-tk)
1. Follow the steps in [Add a repository](#add-a-repository). The repository should be available on the list.

:::warning
Deleting a project also deletes all of its associated history, findings and scan metadata. When you re-add the repository, it is treated as a new project.
:::

<!-- For SME reviewer - is the "treated as a new project" intentional? I tested this functionality out and that's what happened in my case." I think that's to be expected because it's a different way of scanning, right?-->

## Default configuration

By default, repositories onboarded to Cloud Scanning are configured with:

- **Weekly full scans** of the entire repository at a random day and time. <!-- clarify how this randomness works, it's the same time and day every week -->
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
1. Click the toggle for diff-aware scans (beta)

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

### Load management

When you add a large number of repositories (100+), they are ...

### Scan logs and statistics

Scan statistics, such as how many of your repositories are being scanned, the scan success rate, and so on, can be provided once a week upon request. Contact your Semgrep account manager to request scan statistics.
