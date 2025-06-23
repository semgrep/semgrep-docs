---
description: Learn why the count of findings differs in the API and Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# Why are my findings counts different between the Findings page, the Projects page, the Dashboard, and my scan history?

Depending on the filters applied, either by default or by you when working in Semgrep AppSec Platform, different findings and finding counts are displayed on the Findings page, the Projects page, the Dashboard, and the scan history.

For example, the **Dashboard** has the **Recommended priority** filter, which returns any finding that is **Critical** or **High** severity in addition to being:

- **High confidence** - if the finding is from Semgrep Code.
- **Reachable** - if the finding is from Semgrep Supply Chain.
- **Valid** - if the finding is from Semgrep Secrets.

The use of this filter can result in a different number of findings and a different findings count being shown on the Dashboard compared to elsewhere on Semgrep AppSec Platform.

By default, **Recommended priority** filters are enabled. If you choose to turn off recommended priority filters, all findings are displayed.

Another filter that can result in significant changes to the number of findings and the findings count displayed is the **Time period** filter. Verify that the time filter, if enabled, is accurate and functioning correctly. For example, the **Projects > Project details** page filters for data based on **Time period** -- any findings identified outside of the specified period are hidden.

## How to solve this issue

If you see different findings and finding counts listed in separate areas of Semgrep AppSec Platform, review the filters applied for each set of findings. Change either set of filters to match the other, and verify that the findings and finding counts now match.
