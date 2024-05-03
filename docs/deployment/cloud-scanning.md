---
slug: cloud-scanning
title: Add repositories to Semgrep in bulk (beta)
hide_title: true
description: Semgrep cloud scanning enables you to add repositories to your Semgrep org in bulk without changing your CI workflows.
tags:
  - tk
---

# Add repositories to Semgrep in bulk

**Semgrep cloud scanning** enables you to add repositories to your Semgrep org in bulk without adding or changing your CI workflows.

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are added to Semgrep AppSec Platform.

## Feature maturity and support

- Cloud scanning is in **public beta**.
- tk how to leave feedback
- Cloud scanning supports hosted GitHub (GitHub.com) and GitHub Enterprise Server plans.

## Requirements

Cloud scanning requires **[<i class="fas fa-external-link fa-xs"></i> read access](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps?apiVersion=2022-11-28)** to your code in GitHub for the repositories you choose to scan. Semgrep clones your repository at the beginning of every scan. Once the scan completes, the clone is destroyed and is not persisted anywhere.

The access to your code is facilitated by a private Semgrep GitHub app that you create and register in your GitHub organization.

- You are in control of the app and can revoke access to any repository at any time.
- You can limit access to specific repositories.

<!-- Sara to provide steps on how to do both -->

## Prerequisites

### Install the public Semgrep GitHub app

If you have already installed the public Semgrep GitHub app, skip this step and proceed to Install the private Semgrep GitHub app.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Connect to GitHub**.
1. Follow the steps to connect to your GitHub organization.

### Install the private Semgrep GitHub app

The private app must be installed by a **GitHub organization administrator**. If you are not a GitHub admin, an installation link is provided for you to share with your GitHub admin.

1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Create App**.
![DESCRIPTION-tk](/img/scm-create-private-app.png)
1. Follow the steps to install a private GitHub app in your org. Ensure that you enter your exact GitHub organization name and the correct type of GitHub account, typically Organization.
1. Click **Register GitHub App**.
1. If you are an admin on the GitHub organization, click **Continue**. Otherwise, share the provided link with your GitHub administrator.
![DESCRIPTION-tk](/img/scm-confirm-private-app.png#sm-width-noborder)
1. Follow the prompts in GitHub to install the private app.

## Add a repository

1. On the left navigation visit the 📂Projects page.
1. Click **Scan New Project > Semgrep Cloud Scan**.
1. Select the repositories you want to scan from the list.
1. Click **Enable Cloud Scanning**.

After enabling cloud scanning, a full scan starts immediately on all the repositories you have added.

Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings and scan metadata of that repository.

Repositories with **existing** Semgrep CI jobs are **excluded** from the list. See the following section to convert your existing Semgrep CI jobs to cloud scanning.

<!-- This next section is totally unverified. Sara should probably test this out -->

### Convert an existing Semgrep CI job

If you'd like to convert a large number of Semgrep CI jobs to cloud scanning, you can reach out to your technical account manager (TAM) for assistance.

1. Delete the project (link-tk)
1. Delete its configuration file, typically named `semgrep.yml`, from your CI pipeline.
1. Follow the steps in [Add a repository](#add-a-repository). The repository should be available on the list.

:::warning
Deleting a project also deletes all of its associated history, findings and scan metadata. When you re-add the repository, it is treated as a new project.
:::

## Default configuration

By default, repositories onboarded to Cloud Scanning are configured with:

- Weekly full scans of the entire repository at a random day and time.
- Diff scans on Pull Requests that run on every PR. These diff scans follow the rule modes set in your policies so developers  are only notified in cases where you want them to through the Comment rule mode.

## Scan management and configuration

### Manually run a full scan

1. Click 📂 Projects.
1. Search for your repository name.
1. Click the ⚙️ gear icon to access the settings page for that repository.
1. Click Run a new scan.

Disable diff scans on PRs
Click 📂 Projects.
Search for your repository name.
Click the ⚙️ gear icon to access the settings page for that repository.
At the top of the page, disable the toggle AutoScan diff scans (beta)

Remove a repository
Click 📂  Projects.
Search for your repository name.
Click the ⚙️ gear icon to access the settings page for that repository.
Click the dropdown at the top right of the page and click Delete project.


## Appendix

### Load management

When you add a large number of repositories (100+), they are ...

### Scan logs and statistics
