---
description: Learn why the count of findings differs in the API and Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Secrets
 - Semgrep Supply Chain
---

# Why are my findings counts different between the Findings page, the Projects page, the Dashboard, and my scan history?

Depending on the filters that are applied, either by default or by you when working in Semgrep AppSec Platform, there are different findings and findings counts shown on the Findings page, the Projects page, the Dashboard, and the scan history.

For example, the **Dashboard** has the **Recommended priority** filter, which returns any finding that is **Critical** or **High** severity in addition to being:

- **High confidence** - if the finding is from Semgrep Code.
- **Reachable** - if the finding is from Semgrep Supply Chain.
- **Valid** - if the finding is from Semgrep Secrets.

The use of this filter can result in a different number of findings and findings count shown on the Dashboard compared to elsewhere on Semgrep AppSec Platform.

By default, **Recommended priority** filters are enabled. If you choose to turn off recommended priority filters, all findings are displayed.

Another filter that can result in large changes in the number of findings and the findings count shown is the **Time period** filter. Verify that the time filter, if enabled, is accurate. For example, the **Projects > Project details** page filters for data based on **Time period** -- any findings identified outside of the specified time period is hidden.

## How to solve this issue

If you see different findings and findings counts listed in separate areas of Semgrep AppSec Platform, review the filters that are applied for each set of findings. Change either set of filters to match the other, and verify that the findings and finding counts now match.
