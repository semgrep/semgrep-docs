---
description: Learn why the count of findings differs across various pages in Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# Why are my findings counts different across Semgrep AppSec Platform pages?

You may see different findings counts across the Findings, Projects, Dashboard, and Scan History pages in Semgrep AppSec Platform. This is due to the filtering criteria used to display the findings. 

## The Projects page displays a different findings count than the product-specific Findings page

Semgrep computes the findings count displayed on the **Projects** page as follows:

- For Semgrep Code and Semgrep Supply Chain, the findings count is computed using the **primary branch**.
- For Semgrep Secrets, the findings count is computed from deduplicated findings across all branches.

This means that the count of findings in your Semgrep Code, Secrets, or Supply Chain **Findings** page may differ from the counts in your Projects page. The product-specific **Findings** pages display findings as follows:

- Semgrep Code: displays findings from the primary branches of all repositories. Only shows **Open** findings.
- Semgrep Supply Chain: displays findings from the primary branches of all repositories. Only shows findings with the following statuses: **Open**, **Reachable**, **Needs review**.
- Semgrep Secrets: displays the latest instance, or the finding from the most recent branch scanned. The finding must also be **Open** and not flagged as **Confirmed invalid**.

## The Projects page displays a different findings count than the Scans pages

The **Projects** page counts the findings identified in the **primary branch**, while the **Projects > Project Details > Scans** page counts the findings in the branch that Semgrep scanned. Furthermore, the **Projects** page counts findings with a status of **Open**, while the **Scans** page displays all findings, regardless of status value.

## The Dashboard page displays a different findings count than the Findings pages

The finding counts on the **Dashboard** page and the **Findings** page may differ. The finding counts on the **Dashboard** show historical changes and the state of findings during a specific period, while the **Findings** page reflects the current state of findings. More specifically:
- The **Dashboard** page includes the **Total fixed** and **Total ignored** finding counts in the **Production backlog** section. These numbers include all findings that you triaged as ignored or fixed during the selected period, even if the findings' statuses have changed since then. This is different from the findings count displayed on the **Findings** page, which only counts findings that are currently triaged as **Ignored**.
Similarly, the **Total opened** number counts the number of findings that were opened and reopened during the selected period. This differs from the **Findings** page, which displays a count of the findings that are currently open. 

## The Dashboard page has the Recommended Priority filter set

The **Dashboard** page features the **Recommended priority** filter, which returns any finding that is **Critical** or **High** severity in addition to being:

- **High confidence** - if the finding is from Semgrep Code.
- **Reachable** - if the finding is from Semgrep Supply Chain.
- **Valid** - if the finding is from Semgrep Secrets.

The use of this filter can result in a different number of findings and a different findings count being shown on the **Dashboard** page compared to elsewhere on Semgrep AppSec Platform.

By default, **Recommended priority** filters are enabled. If you choose to turn off recommended priority filters, all findings are displayed.

## The Time period filters differ

Another filter that can result in significant changes to the number of findings and the findings count displayed is the **Time period** filter. Verify that the time filter, if enabled, is accurate and functioning correctly. For example, the **Projects > Project details** page filters data based on **Time period**; any findings identified outside of the specified period are hidden.
