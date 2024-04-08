---
slug: historical-scanning
append_help_link: true
title: Scan your git history
hide_title: true
description: Detect valid, leaked secrets in previous git commits through a historical scan.
tags:
  - Semgrep Secrets
---

# Scan your git history

Detect valid, leaked secrets in previous git commits through a **historical scan**.

You can perform one-time historical scans or enable historical scanning for all Secrets scans. Detecting valid secrets in your git history is a first step to reducing your repository's attack surface.

:::info Feature maturity
- This feature is in **public beta**. See [Limitations](#limitations) for more information.
- Please leave feedback by either reaching out to your technical account manager (TAM) or through the **<i class="fa-solid fa-bullhorn"></i> Feedback** form in Semgrep Cloud Platform's navigation bar.
:::

## Run historical scans

You can enable historical scanning for all of your future secret scans or run a dedicated CI job for one-time scans.

### Enable historical scanning for all Secrets scans

1. Sign in to Semgrep Cloud Platform.
1. Click **<i class="fa-solid fa-gear"></i> Settings**.
1. Under Deployment, click the **<i class="fa-solid fa-toggle-large-on"></i> Historical scanning** toggle.

tk add screenshot

Your next Semgrep full scan now includes historical scanning.

### Run a one-off historical scan

To run a one-off or on-demand historical scan, you can create a specific CI job and then manually start the job as needed.

The general steps to do this are:

1. Copy your current full scan CI job configuration file.
1. Look for the `semgrep ci` command.
1. Append the `--historical-secrets` flag:
    `semgrep ci --historical secrets`
1. Depending on your CI provider, you may have to perform additional steps to enable the job to run manually. For example, GitHub Actions requires the `workflow_dispatch` line to be added.



### Test a historical scan locally

## How it works

### Size of commit history

- Semgrep Secrets scans up to **5 GB** of previous commits in a single repository. This ranges from around **10,000 to 50,000** commits depending on the average size of the commit.
- For repositories with more than 5 GB of history, Semgrep Secrets is still able to complete the scan, but the scan scope will not cover the older commits beyond 5 GB.
-

## Limitations

tk
tk
### Speed

### Triage process
