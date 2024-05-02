---
slug: tk
title: tk
hide_title: true
description: tk
tags:
  - tk
---

# Scan repositories with Semgrep Cloud Scanning

**Semgrep cloud scanning** enables you to add repositories to Semgrep in bulk without adding or changing your CI workflows, actions, or pipelines.

:::info Feature maturity
tk
:::

## Prerequisites

### Install the public Semgrep GitHub app

Note: If Semgrep Cloud Platform is already connected to GitHub, the public app may already be installed. If so, skip this step and proceed to the next section  - “Install the private Semgrep GitHub App”.

Sign in to Semgrep Cloud Platform, then click ⚙️ Settings > Source Code Managers. 
Click Connect to GitHub.
Follow the steps to connect to your GitHub organization.

### Install the private Semgrep GitHub app

Note: The private app must be installed by a GitHub organization administrator. If you are not a GitHub admin, share the installation link with your GitHub admin.

After you have first installed the public GitHub app, return to ⚙️ Settings > Source Code Managers.
Click Create App.

Follow the steps to install a private GitHub app in your org.Enter your exact GitHub organization name and the correct type of GitHub account, typically Organization. Click Register GitHub App.

Review the information in the confirmation dialog. If you are an admin on the GitHub organization, click Continue. Otherwise, share the provided link with your GitHub admin

Follow the prompts in GitHub to install the private app.
Onboarding
On the left navigation visit the 📂Projects page.
In the top right corner click Scan New Project.
Click Cloud / Semgrep Zero-config Scanning.

Select which repositories you want to scan with Semgrep Cloud Scanning from the list. Note: It will only show  repositories that are not yet scanning via another method (e.g. if you have a repo scanning in CI it will not show up in this list.) To migrate a repository that is already scanning with CI to Cloud Scanning, you must disable scanning on that repo first.
Click Enable Cloud Scanning. 


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
