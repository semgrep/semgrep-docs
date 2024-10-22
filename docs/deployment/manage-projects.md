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

View, sort, and tag your projects through the **Projects** page. A **project** is any repository that you have scanned with Semgrep AppSec Platform through CI or Semgrep Managed Scans, and includes that repository's findings and metadata.

Refer to this page to **manage** and **troubleshoot** thousands of repositories by identifying scan issues or scans with a high finding count.

Each project has its own **Project detail** page, where you can filter scans, configure settings, and view detailed logs for each scan that has been run. 

![Semgrep AppSec Platform > Projects page](/img/projects-page.png)
_**Figure**. Semgrep AppSec Platform > Projects page._

Use the **Project detail** page to:

- View trends over time, such as longer or shorter scan durations.
- Share information when troubleshooting scans through the **Scans** tab.
- Update a project's tags, primary branch, and path ignores through the **Settings** tab.

Additionally, the Semgrep API enables you to filter tags for additional workflows and integrations into your own systems. Create tags based on engineering or department teams, external-facing or internal codebases, and so on. See [Tags](/semgrep-appsec-platform/tags) for more information.

## Sort projects

View all projects by navigating to [Semgrep AppSec Platform](https://semgrep.dev/login) and clicking **<i class="fa-solid fa-folder-open"></i> Projects**.

To sort projects, click the attribute you want to sort by on the header row. You can only sort by one attribute.

Sort by the following attributes:

- **Project**: Click to toggle between sorting project names alphabetically in ascending or descending order. 
- **Last scan**: Click to toggle between sorting the projects' latest scans in ascending or descending order.

## Filter a project's scans

1. Navigate to [Semgrep AppSec Platform](https://semgrep.dev/login) and click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. In the row of the project you want to view, click the project's **<i class="far fa-window-restore"></i> window icon** under the **Details** column.

The following filters are available:

- **Time period**: 7 days or 1 month
- **Scan type**: Full or diff-aware scans
- **Status**: Running, completed, error, or never finished
- **Duration**: The amount of time the scan took to complete in hours or minutes

:::note
Scan details, such as logs, are available for scans run in the past **1 month**.
:::

## Scan details and logs

To view the latest scan's details from the Projects page:

1. Hover over the project's latest scan status. This displays the **<i class="fa-solid fa-sidebar-flip"></i> Drawer icon**.
![The drawer icon revealed.](/img/projects-view-scan-details.png)
1. Click the **<i class="fa-solid fa-sidebar-flip"></i> icon** to view the scan details drawer. This drawer displays both an **overview** of the scan and **CI or Managed Scan logs**. Local scans do not have a **Logs** tab. 

### Permalinks to scan details

You can link to a specific scan's details to send to your colleagues for collaboration or troubleshooting. Click the **<i class="fa-solid fa-link"></i> link icon** on the header to copy the permalink.

![Scan details drawer with the permalink icon indicated in a box.](/img/scan-details-permalink.png)
_**Figure**. Scan details drawer with the permalink icon indicated in a box._

## Configure project settings

You can configure a project's settings by going to the **Project details** page and clicking on the **Settings** tab.

See the following pages for more information:

- [Configure Semgrep AppSec Platform to ignore certain file paths](/ignoring-files-folders-code).
- For Semgrep Managed Scans users: [configure your scans](/deployment/managed-scanning#scan-management-and-configuration).
- [Set a primary branch](/deployment/primary-branch).
- [Set tags](/semgrep-appsec-platform/tags).
