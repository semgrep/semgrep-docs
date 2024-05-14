---
slug: managed-scanning
title: Add repositories to Semgrep in bulk (beta)
hide_title: true
description: Semgrep managed scanning provides an alternative to CI-based workflows. It enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Add repositories to Semgrep in bulk

**Semgrep managed scanning** enables you to add repositories to your Semgrep org in bulk without adding or changing your existing CI workflows. Similar to Semgrep CI workflows, managed scanning also integrates into developer workflows through PR comments.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.

## Feature maturity and support

- Managed scanning is in **public beta** for all existing Semgrep AppSec Platform users.
- Managed scanning supports hosted GitHub (GitHub.com) and GitHub Enterprise Server plans.
    - This guide provides self-service enablement steps for **hosted GitHub plans**.
    - To enable managed scanning on GitHub Enterprise Server, contact your technical account manager (TAM).
- Please leave feedback by either contacting your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep AppSec Platform's navigation bar.
- Managed scanning is available for all Semgrep products you have purchased, including:
    - Semgrep Code
    - Semgrep Supply Chain
    - Semgrep Secrets
- Managed scanning performs both full scans and diff-aware scans when a developer creates a pull request.

:::info
- To receive Supply Chain findings, you must have a supported lockfile in your repository. Managed scanning does **not** support lockfile generation.
- For existing Semgrep projects, custom `semgrep.yml` configurations are not copied or detected when you use managed scanning. If you have additional build steps when scanning, use [Semgrep in CI instead](/deployment/add-semgrep-to-ci).
:::

## Security

Managed scanning requires **[<i class="fas fa-external-link fa-xs"></i> read access](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28#repository-permissions-for-projects)** to your code in GitHub for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

The access to your code is facilitated by a **private Semgrep GitHub app** that you create and register in your GitHub organization.

- You are in control of the app and can [revoke access to repositories](#remove-the-private-app) at any time.
- You can [limit access to specific repositories](#limit-access-to-specific-repositories).

Managed scanning is specifically designed to limit the amount of time that code remains on our infrastructure.

### Life cycle of a managed scan

1. When a scan begins, Semgrep creates an ephemeral container and clones the repository into it.
1. Semgrep runs the scan from that container. Diff-aware scans typically take seconds, while full scans can take minutes to hours to complete.
1. The ephemeral container is immediately and automatically destroyed post-scan along with all contents in it.

## Prerequisites

Managed scanning requires both the public Semgrep GitHub app and a private Semgrep GitHub app that you register and create yourself.

- The public Semgrep GitHub app is required to easily add members of your GitHub org to your Semgrep org.
- The private Semgrep GitHub app is required to enable code access for managed scanning.

To view all permissions, see [Pre-deployment checklist > Permissions](/deployment/checklist#permissions) for more information.

### Install the public Semgrep GitHub app

If you have already installed the public Semgrep GitHub app, skip this step and proceed to [Install the private Semgrep GitHub app](#install-the-private-semgrep-github-app).

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Connect to GitHub**.
1. Follow the steps to connect to your GitHub organization. Ensure that you grant access to the repositories you want to scan.

### Install the private Semgrep GitHub app

The private app must be installed by a **GitHub organization administrator**. If you are not an admin, an installation link is provided for you to share with your GitHub admin.

1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Register App**.
![GitHub entry with public GitHub app connection](/img/scm-create-private-app.png)
1. Follow the steps to install a private GitHub app in your org. Ensure that you enter your exact GitHub organization name and the correct type of GitHub account, typically **Organization**.
1. Click **Register GitHub App**.
1. If you are an admin on the GitHub organization, click **Continue**. Otherwise, share the provided link with your GitHub administrator.
![Continue to SCM dialog](/img/scm-confirm-private-app.png#sm-width-noborder)
1. Follow the prompts in GitHub to install the private app. Ensure that you grant access to the repositories you want to scan.

:::caution Running into a 404?
If you are brought to a GitHub 404 page, return to your [<i class="fas fa-external-link fa-xs"></i> GitHub Applications](https://github.com/settings/installations) page.
:::

### Completed installation

A complete installation is displayed in the Source Code Manager entry as follows:

![GitHub entry with public and private GitHub app connection](/img/zcs-code-access-enabled.png#md-width)
_**Figure**. **Semgrep AppSec Platform > <i class="fa-solid fa-gear"></i> Settings > Source Code Managers** displaying a completed managed scanning set-up._

You can also confirm a complete installation through your GitHub settings page, which should have two Semgrep apps:

![GitHub settings page](/img/zcs-github-apps.png#bordered)
_**Figure**. **GitHub > Settings > Applications** displaying both Semgrep apps. The private Semgrep app follows the convention **Semgrep Code - <span className="placeholder">YOUR_ORG_NAME</span>**_.

## Add a repository

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. Click **Scan New Project > Semgrep Managed Scan**.
1. Optional: If you can't find the repository you want to add, click **Can't find your project? > Sync projects**.
1. Select the repositories you want to scan from the list.
1. Click **Enable managed scanning**.

- After enabling managed scanning, Semgrep performs a full scan in batches on all the repositories.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through managed scanning are tagged with `autoscan`.

### If the page doesn't display any repositories

1. Ensure you have provided access to **both** the private and public Semgrep GitHub to the repositories you want to scan by following the steps in [Permissions and synchronicity](#permissions-and-synchronicity).
1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. If the page doesn't display the repository you want to add, click **Can't find your project? > Sync projects**.
1. If the page doesn't display any repositories, click **Sync projects**.
1. Optional: Perform a hard refresh (<kbd>Ctrl</kbd>+<kbd>F5</kbd> or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>).

Repositories must be accessible to both the public Semgrep GitHub app and the private Semgrep GitHub app.

### Convert or migrate an existing Semgrep CI job

You can immediately add any existing project to managed scanning.

1. Follow the steps in [Add a repository](#add-a-repository).
1. Delete the `/.github/workflows/semgrep.yml` file in your GitHub repository.

:::tip
Semgrep preserves your findings, scans, and triage history.
:::

## Default configuration

By default, projects on managed scanning are configured with:

- **Weekly full scans** of the entire repository. When a project is first added to managed scanning, the AppSec Platform performs an initial scan and then sets a random time up to 6 days after to perform a weekly full scan. Each weekly scan occurs on that same day and time.
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

Scan statistics, such as how many of your repositories are being scanned, the scan success rate, and so on, can be provided once a week upon request. Contact your Semgrep account manager to request scan statistics.
