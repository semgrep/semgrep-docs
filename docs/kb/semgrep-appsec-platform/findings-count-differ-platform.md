---
description: Learn why the count of findings differs across various pages in Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# Why are findings counts different across Semgrep AppSec Platform pages?

You may see different findings counts across the [Dashboard](https://semgrep.dev/docs/semgrep-appsec-platform/dashboard), [Projects](https://semgrep.dev/docs/deployment/manage-projects), [Scans](https://semgrep.dev/docs/deployment/manage-projects#scan-details-and-logs), and Findings pages in Semgrep AppSec Platform. This is typically due to the filtering criteria used to display the findings.

## The Projects page displays a different findings count from the Findings pages

Semgrep AppSec Platform computes the findings count displayed on the **Projects** page as follows:

- For Semgrep Code and Semgrep Supply Chain, the findings count is computed using the [**primary branch**](https://semgrep.dev/docs/deployment/primary-branch). The Projects page displays **Open** findings. This does not currently include findings in the **To Fix** or **Fixing** statuses.
- For Semgrep Secrets, the findings count is computed from [deduplicated findings across all branches](https://semgrep.dev/docs/semgrep-secrets/view-triage#default-secrets-page-view-and-branch-logic).

The product-specific **Findings** pages display findings as follows:

- [Semgrep Code](https://semgrep.dev/docs/semgrep-code/findings): displays findings from the primary branches of all repositories. Shows **Open** findings by default.
- [Semgrep Supply Chain](https://semgrep.dev/docs/semgrep-supply-chain/view-export): displays vulnerability findings from the primary branches of all repositories. Shows **Open** findings that are **Reachable** or **Needs review** by default.
- [Semgrep Secrets](https://semgrep.dev/docs/semgrep-secrets/view-triage): displays the instance of a finding from the most recent branch scanned. Shows **Open** that are not **Confirmed invalid** by default.

## The Projects page displays a different dependency count from the Dependencies page

The **Projects** page displays the count of individual dependency entries in the latest full scan for the project. The **Dependencies** page shows only unique entries for a dependency, taking into account its lockfile and transitivity status. Dependencies that appear more than once indicate their line locations on hover.

The **Dependencies** page also [loads only the first ten dependency sources](/docs/semgrep-supply-chain/dependency-search#view-additional-manifest-files-or-lockfiles) by default. Load additional dependency sources to see the full count.

## The Projects page displays a different findings count from the Scans page

The **Projects** page counts the **Open** findings identified in the **primary branch**, while the **Projects > Project Details > Scans** page lists each scan individually, with a count of the findings identified on the branch that Semgrep scanned. The **Scans** page entry for a scan displays all findings that were identified in that scan, regardless of their current status.

## The Dashboard page displays a different findings count from the Findings pages

The finding counts on the **Dashboard** show historical changes and the state of findings during a specific period, while the **Findings** pages reflect the current state of findings. More specifically:

- The **Dashboard** page includes the **Total fixed** and **Total ignored** finding counts in the **Production backlog** section. These numbers include all findings that you fixed or triaged as ignored during the selected period, even if the findings' statuses have changed since then. This is different from the findings count displayed on the **Findings** page, which only counts findings that are currently triaged as **Ignored**.
- Similarly, the **Total opened** number counts the number of findings that were opened or reopened during the selected period. This differs from the **Findings** page, which displays a count of the findings that are currently open.

### The Recommended priority filter

The **Dashboard** page also features the **Recommended priority** filter. When this filter is enabled, the page includes findings that are **Critical** or **High** severity in addition to being:

- **High confidence** - if the finding is from Semgrep Code.
- **Reachable** in code - if the finding is from Semgrep Supply Chain.
- **Valid** and non-historical - if the finding is from Semgrep Secrets.

By default, **Recommended priority** filters are enabled. If you choose to turn off **Recommended priority** filters, the additional filters are removed, but the **Dashboard** page still displays historical information over the time period.

## The Time period filter

The **Time period** filter that is active on a page can also significantly affect what data is shown. The **Projects** page does not have a time period filter; it always displays currently open findings.

* The **Dashboard** page defaults to a time period of 3 months, and can display time periods between 7 days and 1 year.
* The **Findings** pages default to **All time**. The **Time period** filters on these pages allow selection between **Opened**, **Triaged**, and **Fixed** options, and between 1 day and all time (as long as the organization has been running Semgrep scans). For example, you can view findings that have been **Triaged** in the last 7 days.
* The **Projects > Project Details > Scans** page displays individual scans from the last month by default, and can display either 7 days of scans or 1 month of scans. Any scans outside of the specified time period are not shown.
