---
description: Why are my projects showing a status of "Not yet started" after I enable Managed Scans?
tags:
 - Semgrep AppSec Platform
 - Troubleshooting
---

# Why are my projects showing a status of "Not yet started" after I enable Managed Scans?

When onboarding a large number of projects to Semgrep Managed Scans (SMS), users may notice that many of them show a **Not yet started** status, even after enabling Managed Scans. This is because Semgrep doesn't trigger scans for all projects at once. Instead, Semgrep assigns each repository a specific time during the first week for the initial scan to manage system resources effectively.

If you need immediate results for specific projects, you can manually trigger a scan:

1. In Semgrep AppSec Platform, navigate to **Projects**.
2. Find the project you want to scan, then click the project's **<i class="far fa-window-restore"></i> window icon** under the **Details** column.

After the initial scan, Semgrep automatically scans each repository every week.

:::warning
If projects remain in **Not yet started** status for longer than a week, or if manually triggered scans don't start, this could indicate an issue with the:

- Repository permissions
- SCM access token
- Network connectivity

In such cases, [contact Semgrep Support](/support) for assistance.
:::