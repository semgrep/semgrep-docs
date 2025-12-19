---
slug: manage-projects
title: Manage projects
hide_title: true
description: View projects, detailed logs, and information for any scan.
tags:
 - Deployment
 - Semgrep AppSec Platform
---

# Manage projects

View, sort, and tag your projects through the **Projects** page. Refer to this page to manage and troubleshoot thousands of repositories by identifying scan issues or scans with a high number of findings.

:::note What is a project?
A **project** is a repository, or part of a repository, that you scan through Semgrep AppSec Platform, either using CI or Semgrep Managed Scans. This also includes local CLI scans whose results you have sent for viewing on Semgrep AppSec Platform. A project's scans can be viewed on the **Project details** page, and its findings can be viewed on the individual Semgrep products' **Findings** pages.
:::

The **Projects** page features two tabs:

- The **Scanning** tab lists all projects that have been provisioned or scanned by Semgrep, regardless of whether the project is actively being scanned. If the project's repository has been archived in the source code manager, it is listed under **Not scanning**.
- The **Not scanning** tab lists projects that are associated with [source code manager (SCM) connections that you've added](/deployment/connect-scm), but these projects aren't actively being scanned by Semgrep. The **Not scanning** page also lists projects where you've archived the corresponding GitHub repositories.



## Sort projects

View all projects by navigating to [Semgrep AppSec Platform](https://semgrep.dev/login) and clicking **<i class="fa-solid fa-folder-open"></i> Projects**.

To sort projects, click the attribute you want to sort by on the header row. You can only sort by one attribute.

Sort by the following attributes:

- **Project**: Click to toggle between sorting project names alphabetically in ascending or descending order. 
- **Last scan**: Click to toggle between sorting the projects' latest scans in ascending or descending order. The sorting is based on when the last scan **started**, regardless of its status. For this reason, you may see that scans with statuses such as **Not started** or **Never finished** are not necessarily grouped together.

## Filter a project's scans

1. Navigate to [Semgrep AppSec Platform](https://semgrep.dev/login) and click **<i class="fa-solid fa-folder-open"></i> Projects**.
1. In the row of the project you want to view, click the project's **<i class="far fa-window-restore"></i> window icon** under the **Details** column.

The following filters are available:

- **Time period**: 7 days or 1 month
- **Scan type**: Full or diff-aware scans
- **Status**: Running, completed, error, or never finished
- **Duration**: The amount of time the scan took to complete in hours or minutes

:::note
Scan details, such as logs, are available for scans run in the past **1 month**. Semgrep AppSec Platform does not display scan details older than 30 days, since this introduces performance issues due to the increased volume of stored scan data.
:::

## Run scans in bulk

You can scan multiple projects at once from the **Projects** page. This is useful when you want to rescan multiple projects after changing your ruleset or configuration.

To run scans in bulk, select all the projects of interest and click **Scan**.

## Scan details and logs

To view the latest scan's details from the **Projects** page:

1. Hover over the project's latest scan status. This displays the **<i class="fa-solid fa-sidebar-flip"></i> Drawer icon**.
![The drawer icon revealed.](/img/projects-view-scan-details.png)
1. Click the **<i class="fa-solid fa-sidebar-flip"></i> icon** to view the scan details drawer. This drawer displays both an **overview** of the scan and **CI or Managed Scan logs**. Local scans do not have a **Logs** tab. 

### Permalinks to scan details

You can link to a specific scan's details to send to your colleagues for collaboration or troubleshooting. Click the **<i class="fa-solid fa-link"></i> link icon** on the header to copy the permalink.

![Scan details drawer with the permalink icon indicated in a box.](/img/scan-details-permalink.png)
_**Figure**. Scan details drawer with the permalink icon indicated in a box._

## Project details page

Each project listed on the **Projects** page has its own **Project detail** page, which you can access by clicking the **<i class="far fa-window-restore"></i> window icon** under the **Details** column. The **Project detail** page is where you can filter scans, configure settings, and view detailed logs for each scan that has been run. Use the **Project detail** page to:

- View trends over time, such as longer or shorter scan durations.
- Share information when troubleshooting scans through the **Scans** tab.
- Update a project's tags, primary branch, and path ignores through the **Settings** tab.

Additionally, the Semgrep API allows you to filter tags for use in additional workflows and integrations within your own systems. Create tags based on engineering or department teams, external-facing or internal codebases, and so on. See [Tags](/semgrep-appsec-platform/tags) for more information.

### Configure project settings

You can configure a project's settings by going to the **Project details** page and clicking the **Settings** tab.

See the following pages for more information:

- [Configure Semgrep AppSec Platform to ignore specific file paths](/ignoring-files-folders-code).
- For Semgrep Managed Scans users: [configure your scans](/deployment/managed-scanning/overview).
- [Set a primary branch](/deployment/primary-branch).
- [Set tags](/semgrep-appsec-platform/tags).
