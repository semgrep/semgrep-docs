---
slug: setup-jenkins-ui
append_help_link: true
title: Jenkins UI
hide_title: true
description: Configure Jenkins to send the correct branch name to Semgrep AppSec Platform.
tags:
  - Deployment
  - Semgrep Supply Chain
---

# Set up Semgrep Supply Chain with Jenkins UI

When running a CI job, the Jenkins UI Git plugin creates a detached `HEAD` ref by default. This causes Semgrep Supply Chain (SSC) to send a repository's branch name as `HEAD` to Semgrep AppSec Platform, instead of using the actual branch name. As a result, the Supply Chain findings may not display by default. This document explains how to set up Jenkins to fix this behavior for users of the **Jenkins UI Git plugin**.

## Verify that there are findings to send to Semgrep AppSec Platform

These steps are optional, but it is recommended to perform the following procedure to verify that there are findings that Semgrep AppSec Platform is not displaying from your Jenkins job.

1. Sign into Jenkins.
2. Select the project that runs Semgrep Supply Chain scans.
3. Click **Build Now**. A new job appears in your Project page.
4. Click the queue number of the new job. This takes you to the **Console Output** page, displaying a log of your job.
5. Take note of the total number of Supply Chain findings. Note that Supply Chain findings in the log are divided into Reachable and Unreachable findings.
5. In Semgrep AppSec Platform, click **Supply Chain**.
6. In the search bar, enter the name of the project or repository you scanned. This ensures that you see only findings for the scanned repository.
7. Ensure that you see the total number of findings by selecting all checkboxes for **Exposure** and **Transitivity**. Note any discrepancy in findings.

Refer to the following section after verifying discrepancies between your CI job log and Semgrep AppSec Platform findings.

## Set up SSC with Jenkins UI

To set up SSC with Jenkins UI, perform the following steps:

1. Select the project that runs Semgrep Supply Chain scans.
1. Click **Configure**.
1. Under **Source Code Management**, ensure that **Git** is selected.
1. Under **Git > Additional behaviors** click **Add**.
1. From the drop-down box, click **Check out to specific local branch**.
1. Enter the name of repository's mainline or trunk branch, such as `master`.
![Location of specific local branch text box](/img/jenkins-specific-local-branch.png#bordered)
1. Click **Save**.
1. Optional: Click **Build Now** to test that your job can now send findings to Semgrep AppSec Platform.

You have successfully set up your Jenkins UI job to send findings to Semgrep AppSec Platform.
