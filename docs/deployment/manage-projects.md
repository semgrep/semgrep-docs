---
slug: manage-projects
title: Manage projects
hide_title: true
description: View projects, detailed logs and information for any scan.
tags:
    - Deployment
    - Semgrep AppSec Platform
---

# Manage projects

View, filter, and tag your projects through the **Projects** page. A **project** is any repository that you have scanned with Semgrep AppSec Platform through either CI or Semgrep Managed Scans, and includes that repository's findings and metadata.

Each project has its own **Project detail** page, where you can configure its settings and view detailed logs for each scan that has been run.

tk add screenshot

Use the **Project detail** page to:

- View trends over time, such as longer or shorter scan durations.
- Share information when troubleshooting scans through the **Scans** tab.
- Update a project's tags, primary branch, and path ignores through the **Settings** tab.

## View and filter projects

View all projects by navigating to [Semgrep AppSec Platform](https://semgrep.dev/login) and clicking **<i class="fa-solid fa-folder-open"></i> Projects**.

The following filters are available:

- **Time period**: 7 days or 1 month
- **Scan type**: Full or diff-aware scans
- **Status**: Running, completed, error, or never finished
- **Duration**: You can set the amount of hours or minutes

:::note
Scan details, such as logs, are available for scans run in the past **1 month**.
:::

## View scan details and logs

To view the latest scan's details from the Projects page:

1. Hover over the project's latest scan status. This displays the **<i class="fa-solid fa-sidebar-flip"></i> Drawer icon**.
![DESCRIPTION-tk](/img/projects-view-scan-details.png)
1. Click the **<i class="fa-solid fa-sidebar-flip"></i> icon** to view the scan details drawer. This drawer displays both an overview of the scan and CI or Managed Scan logs. Local scans do not have a **Logs** tab. 

## Configure project settings

tk
