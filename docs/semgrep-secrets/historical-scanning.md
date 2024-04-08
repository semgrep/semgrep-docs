---
slug: tk
append_help_link: true
title: tk
hide_title: true
description: tk
tags:
  - tk
---

# Scan your git history

Detect valid, leaked secrets in previous git commits through a **historical scan**.

You can perform one-time historical scans or enable historical scanning for all Secrets scans. Detecting valid secrets in your git history is a first step to reducing your repository's attack surface.

:::Feature maturity
This feature is in **public beta**. You may encounter some rough edges. tk feedback
:::

## Enable historical scanning

You can enable historical scanning for all of your future secret scans or run a dedicated CI job for one-time scans.

### Enable historical scanning for all Secrets scans

1. Sign in to Semgrep Cloud Platform.
1. Click **<i class="fa-solid fa-gear"></i> Settings**.
1. Under Deployment, click the **<i class="fa-solid fa-toggle-large-on"></i> Historical scanning** toggle.

tk add screenshot

Your next Semgrep full scan now includes historical scanning.

### Run a one-off historical scan

To run a one-off historical scan, you can create a specific CI job

### Test a historical scan locally

## How it works

### Size of commit history

## Limitations

### Speed

### Triage process
