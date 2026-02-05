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

[Jenkins' Git plugin](https://plugins.jenkins.io/git/) creates a detached `HEAD` ref by default when running a CI job. This results in Semgrep Supply Chain (SSC) sending `HEAD` to Semgrep AppSec Platform instead of the branch's actual name. As a result, Supply Chain findings may not appear in Semgrep AppSec Platform. This document explains how to configure Jenkins so that findings appear, even for users of Jenkins' Git plugin.

## Verify that there are findings to send to Semgrep AppSec Platform

The following steps in this section are optional, but Semgrep recommends performing the following procedure to verify that there are findings that Semgrep AppSec Platform is not displaying from your Jenkins job.

1. Sign into Jenkins.
2. Select the project that runs your Supply Chain scans.
3. Click **Build Now**. A new job appears in your Project page.
4. Click the queue number of the new job. This takes you to the **Console** output page.
5. Review the output, and identify the total number of Supply Chain findings.
6. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), and go to **Supply Chain**.
7. Switch to the **All** tab, and use the **Projects** filter to narrow the results displayed to only those for the project that you scanned.
8. Note any discrepancy in the number of findings. If there are, continue with the following sections of this document to ensure that Semgrep AppSec Platform displays all of your Supply Chain findings.

## Set up Supply Chain with Jenkins

To set up SSC with Jenkins UI, perform the following steps:

1. Sign into Jenkins.
2. Open the project that runs Supply Chain scans.
3. Click **Configure**.
4. In **Source Code Management**, select **Git**.
5. In **Git > Additional Behaviours**, click **Add**.
6. From the drop-down box, click **Check out to specific local branch**.
7. Enter the name of repository's mainline or trunk branch, such as `main`.
8. Click **Save**.

At this point, you should see Supply Chain findings in Semgrep AppSec Platform after your next scan.
