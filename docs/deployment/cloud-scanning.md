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

This is an alternative method to [adding Semgrep in CI](/deployment/add-semgrep-to-ci). Instead of adding a Semgrep job or workflow to your CI/CD pipeline, repositories are instead added to Semgrep AppSec Platform.

## Feature maturity

- Cloud scanning is in **public beta**.
- tk how to leave feedback

## Requirements

- Cloud scanning **requires code access**.
- Only GitHub.com (hosted GitHub accounts) tk

## Prerequisites

### Install the public Semgrep GitHub app

If you have already installed the public Semgrep GitHub app, skip this step and proceed to Install the private Semgrep GitHub app.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Connect to GitHub**.
1. Follow the steps to connect to your GitHub organization.

### Install the private Semgrep GitHub app

:::note
The private app must be installed by a **GitHub organization administrator**. If you are not a GitHub admin, an installation link is provided for you to share with your GitHub admin.
:::

1. Click **<i class="fa-solid fa-gear"></i> Settings > Source Code Managers**.
1. Click **Create App**.
1. Follow the steps to install a private GitHub app in your org. Ensure that you enter your exact GitHub organization name and the correct type of GitHub account, typically Organization.
1. Click **Register GitHub App**.
1. If you are an admin on the GitHub organization, click **Continue**. Otherwise, share the provided link with your GitHub administrator.
1. Follow the prompts in GitHub to install the private app.

## Add a repository

1. On the left navigation visit the 📂Projects page.
1. Click **Scan New Project > Semgrep Cloud Scan**.
1. Select which repositories you want to scan with Semgrep Cloud Scanning from the list.



Note: It will only show  repositories that are not yet scanning via another method (e.g. if you have a repo scanning in CI it will not show up in this list.) To migrate a repository that is already scanning with CI to Cloud Scanning, you must disable scanning on that repo first.
Click Enable Cloud Scanning.

## Default configuration

By default, repositories onboarded to Cloud Scanning are configured with:

Weekly full scans of the entire repository at a random day and time.
Diff scans on Pull Requests that run on every PR. These diff scans follow the rule modes set in your policies so developers  are only notified in cases where you want them to through the Comment rule mode.
Scan management and configuration
Manually run a full scan
Click 📂 Projects.
Search for your repository name.
Click the ⚙️ gear icon to access the settings page for that repository.
Click Run a new scan.

Disable diff scans on PRs
Click 📂 Projects.
Search for your repository name.
Click the ⚙️ gear icon to access the settings page for that repository.
At the top of the page, disable the toggle AutoScan diff scans (beta)

Offboard a repository
Click 📂  Projects.
Search for your repository name.
Click the ⚙️ gear icon to access the settings page for that repository.
Click the dropdown at the top right of the page and click Delete project.
