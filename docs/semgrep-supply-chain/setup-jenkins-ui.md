---
slug: setup-jenkins-ui
append_help_link: true
title: Jenkins UI
hide_title: true
description: Configure Jenkins to send the correct branch name to Semgrep Cloud Platform.
tags:
  - Semgrep Supply Chain
  - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Setting up Semgrep Supply Chain with Jenkins UI

When running a CI job, the Jenkins UI Git plugin creates a detached `HEAD` ref by default. This causes Semgrep Supply Chain (SSC) to send a repository's branch name as `HEAD` to Semgrep Cloud Platform (SCP), instead of using the actual branch name. As a result, the Supply Chain findings may not display by default. This document explains how to set up Jenkins to fix this behavior for users of the **Jenkins UI Git plugin**.

## Verifying that there are findings to send to SCP

These steps are optional, but it is recommended to perform the following procedure to verify that there are findings that Semgrep Cloud Platform is not displaying from your Jenkins job.

1. Sign into Jenkins.
2. Select the project that runs Semgrep Supply Chain scans.
3. Click **Build Now**. A new job appears in your Project page.
4. Click the queue number of the new job. This takes you to the **Console Output** page, displaying a log of your job.
5. Take note of the total number of Supply Chain findings. Note that Supply Chain findings in the log are divided into Reachable and Unreachable findings.
5. In Semgrep Cloud Platform, click **Supply Chain**.
6. In the search bar, enter the name of the project or repository you scanned. This ensures that you see only findings for the scanned repository.
7. Ensure that you see the total number of findings by selecting all checkboxes for **Exposure** and **Transitivity**. Note any discrepancy in findings.

Refer to the following section after verifying discrepancies between your CI job log and Semgrep Cloud Platform findings.

## Setting up SSC with Jenkins UI

To set up SSC with Jenkins UI, perform the following steps:

1. Select the project that runs Semgrep Supply Chain scans.
1. Click **Configure**.
1. Under **Source Code Management**, ensure that **Git** is selected.
1. Under **Git > Additional behaviors** click **Add**.
1. From the drop-down box, click **Check out to specific local branch**.
1. Enter the name of repository's mainline or trunk branch, such as `master`. 
![Location of specific local branch text box](/img/jenkins-specific-local-branch.png#bordered)
1. Click **Save**.
1. Optional: Click **Build Now** to test that your job can now send findings to Semgrep Cloud Platform.

You have successfully set up your Jenkins UI job to send findings to Semgrep Cloud Platform.

<MoreHelp />
