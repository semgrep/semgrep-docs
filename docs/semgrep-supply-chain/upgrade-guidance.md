---
slug: upgrade-guidance
title: Upgrade guidance
hide_title: true
description: Know if a vulnerable package or dependency can be easily and reliably upgraded to a fixed version.
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---
 
# Upgrade guidance

Know if you or your developers can safely and reliably update a vulnerable package or dependency to a fixed version. From there, choose to:

- Have Semgrep open a pull request
- Create a Jira ticket
- Set the finding's triage status as **To fix**

Semgrep's dependency upgrade guidance uses AI to analyze if a finding can be **safely upgraded** or if upgrading the package can cause **breaking changes**. Semgrep can also create a PR to upgrade the package.

## Feature maturity

This feature is in **private beta**. TK: How do users join? Will we have a settings toggle?

## Supported languages and package managers

- **Python** codebases with the following package managers:
  - `pip`
  - `pip-tools`
  - `pipenv`
  - Poetry

Semgrep supports the following source code managers:

- GitHub Cloud and GitHub Enterprise Server (self-hosted)
  - This **includes** projects added to Semgrep through Semgrep Managed Scans 

## Prerequisites

- At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
- Semgrep Assistant must be [enabled](/semgrep-assistant/getting-started).
- Your **private** GitHub Semgrep app must have **Read and write** access on the **Contents** permission. Refer to the following section for steps.

### Grant **Read and write** access

To change your Semgrep app's permission:

1. Navigate to the settings page of your private Semgrep GitHub app; refer to [<i class="fas fa-external-link fa-xs"></i> Changing the permissions of a GitHub app](https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration#changing-the-permissions-of-a-github-app) for steps.
1. In the **Repository permissions** section, search for `Contents`.
1. Click the drop-down menu and select **Read and write**.

## How it works

After enabling dependency guidance, Semgrep performs post-scan analysis and marks applicable findings as **Safe to upgrade** or with **Breaking changes**.

- Frequency: this analysis is performed every **two hours** on the latest **full scan**.
- Only findings **with fixed versions** are marked by Semgrep as **Safe to upgrade** or with **Breaking changes**.
![Finding with a fixed version that is safe to upgrade](/img/safe-click-to-fix.png)
- Findings without any fixed versions have no badge; instead they say **no patch available**.
![Finding with no fixed version available](/img/no-patch-available.png)

The following chart shows the steps Semgrep performs from scanning to analysis and the actions you can take based on the advice it shows.

![Flowchart explaining how Semgrep provides upgrade guidance and possible actions to take based on its advice.](/img/upgrade-guidance-flowchart.png)

## Details provided by upgrade guidance

tk these are the PR comments

- Safe to upgrade
-

## Remediate or triage the finding

TK

### Multiple pull requests

- TK:Does Semgrep make 1 PR per finding? If so, won't the code file have plenty of pull requests?

## Troubleshooting

### The feature has been enabled, but you don't see any analysis

If you can't see any **Breaking changes** or **Safe to upgrade** badges or findings, this may be due to the following reasons:

- Your language or package ecosystem isn't supported
- Your source code manager isn't supported
- Your you have not set **Read and write** access for the **Contents** permission; see [Grant read and write access](#grant-read-and-write-access)
- Your findings don't have safe versions to upgrade to yet
- You have no findings within the supported scope of this feature
