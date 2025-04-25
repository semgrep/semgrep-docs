---
slug: upgrade-guidance
title: Upgrade guidance
hide_title: true
description: Know if a vulnerable package or dependency can be easily and reliably upgraded to a fixed version.
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---

import ViewDetailsSsc from "/src/components/procedure/_view-details-ssc.md"
 
# Upgrade guidance

Know if you or your developers can safely and reliably update a vulnerable package or dependency to a fixed version. From there, choose to:

- Have Semgrep open a pull request (PR)
- Create a Jira ticket
- Set the finding's triage status as **To fix**

Semgrep's dependency upgrade guidance uses [Assistant](/semgrep-assistant/overview) to analyze if a finding can be **safely upgraded** or if upgrading the package can cause **breaking changes**. Semgrep can also create a PR to upgrade the package.

## Feature maturity

This feature is in **private beta**. To join the beta, reach out to the [Semgrep support team](/support).

## Supported languages and package managers

- **Python** codebases with the following package managers:
  - `pip`
  - `pip-tools`
  - `pipenv`
  - Poetry
- GitHub Cloud and GitHub Enterprise Server (self-hosted)
  - This **includes** projects added to Semgrep through Semgrep Managed Scans 

## Prerequisites

- At least one repository that [scans for dependencies through Semgrep Supply Chain](/semgrep-supply-chain/getting-started).
- Semgrep Assistant must be [enabled](/semgrep-assistant/getting-started).
- Your **private** GitHub Semgrep app must have [**Read and write** access on the **Contents** permission](#grant-read-and-write-access-to-a-private-github-semgrep-ap#grant-read-and-write-access-to-a-private-github-semgrep-appp).

### Grant **Read and write** access to a private GitHub Semgrep app

To change your Semgrep app's permission:

1. Navigate to the settings page of your private Semgrep GitHub app; refer to [<i class="fas fa-external-link fa-xs"></i> Changing the permissions of a GitHub app](https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration#changing-the-permissions-of-a-github-app) for instructions.
1. In the **Repository permissions** section, search for `Contents`.
1. Click the drop-down menu and select **Read and write**.

## How it works

After enabling dependency guidance, Semgrep performs post-scan analysis and marks applicable findings as **Safe to upgrade** or with **Breaking changes**.

- This analysis is performed every **two hours** on the latest **full scan**.
- Only findings whose dependencies have **fixed versions** that resolve the vulnerability are marked by Semgrep as **Safe to upgrade** or with **Breaking changes**.
- Findings without any fixed versions have no badge; instead they say **no patch available**.
  ![Finding with no fixed version available](/img/no-patch-available.png#md-width)
  _**Figure**. **Details** page for a finding that has no available fix._

The following chart shows the steps Semgrep performs from scanning to analysis and the actions you can take based on the advice it shows.

![Flowchart explaining how Semgrep provides upgrade guidance and possible actions to take based on its advice.](/img/upgrade-guidance-flowchart.png)

## Review a finding's upgrade guidance 

<ViewDetailsSsc />

![SSC details that provide upgrade guidance.](/img/vuln-panels-ssc.png)
_**Figure**. Useful details that provide upgrade guidance._
<dl>
<dt>A - Upgrade badge</dt>
<dd>Indicates if an upgrade is safe or may break your codebase.</dd>
<dt>B - The line of code (LOC) of the finding</dt>
<dd>This shows the LOC that caused the finding; this does <strong>not</strong> show the LOC where the breaking changes occur.</dd>
<dt>C - Link to change list drawer</dt>
<dd>Click this link to display the LOC where a breaking change may occur.</dd>
<dt>D - Open fix PR button</dt>
<dd>Click this button to open a PR with the code to upgrade the dependency to a safe version, if any.</dd>
</dl>

![Drawer showing all lines of code that must be changed](/img/upgrade-guidance-drawer.png#md-width)
_**Figure**. Drawer showing all the lines of code that must be changed or are safe._

## Create a pull request with fixes

1. Navigate to the **Details** page of the finding for which you want to make a pull request.
1. Click **Fix** > **Open fix PR**.

A pull request includes:

- The code change to upgrade the dependency
- The context necessary for developers to fix potentially breaking changes

The following context is included in the pull request description:

- Summary
  - Severity and reachability of the finding
  - The specific version of the dependency that the PR upgrades to
- Vulnerability details
  - A description of the vulnerability and links to its CVE references
- Upgrade guidance
  - All the pieces of code, typically functions, which make use of the dependency
  - Unchanged (safe) pieces of code
  - Potentially breaking pieces of code
- Dependency references
  - Release notes, changelogs, and commits of the dependency which may be useful to resolve the breaking changes

![PR comment with upgrade guidance](/img/upgrade-guidance-pr.png#md-width)
_**Figure**. PR comment with upgrade guidance._

## Troubleshooting

### The feature has been enabled, but you don't see any analysis

If you can't see any **Breaking changes** or **Safe to upgrade** badges or findings, this may be due to the following reasons:

- Your language or package ecosystem isn't supported
- Your source code manager isn't supported
- Your you have not set **Read and write** access for the **Contents** permission; see [Grant read and write access](#grant-read-and-write-access)
- Your findings don't have safe versions to upgrade to yet
- You have no findings within the supported scope of this feature
