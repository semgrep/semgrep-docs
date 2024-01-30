---
slug: usage-limits
append_help_link: true
hide_title: true
description: >-
  Frequently asked questions about Semgrep, comparisons to similar tools,
  rule licensing, technical support, and more.
---

import MoreHelp from "/src/components/MoreHelp"

# Usage limits

This section describes usage limits.

:::caution important dates
* The Semgrep Community tier has been sunsetted. All Community Tier accounts have been moved to the Team tier.
* The new usage limits come into effect starting on July 31, 2023.
:::

### What is changing about Semgrep tiers?

The Community tier was sunsetted on June 6, 2023. Semgrep, Inc now offers the Team tier for free to all users up to the usage limit of 10 contributors scanning on private repositories. A contributor is defined as someone who contributed code to a private repository scanned by Semgrep.

You can now access the Team tier features of Semgrep Supply Chain, Semgrep Code, and Semgrep Cloud Platform features such as:

* [SSO, RBAC, and other account management tools](/semgrep-cloud-platform/user-management/)
* [Semgrep Pro Engine](/semgrep-code/semgrep-pro-engine-intro/)
* [Semgrep Pro rules](/semgrep-code/pro-rules/)
* [Semgrep API](https://semgrep.dev/api/v1/docs/)

If the number of contributors exceeds the usage limit, you must purchase licensing for the 11th contributor onward.

The Enterprise tier remains unaffected.


### What happens when the usage limit is exceeded?


### When will usage limits be enforced?

Usage limits have been enforced since July 31, 2023.

### What if the first Semgrep scan exceeds the contributor usage limit?


### How is the cost calculated for the Team tier?

The 11th contributor and onwards are charged. 

### Is the command `semgrep scan` subject to the usage limit?

Yes, but only if the scan is by a logged-in/authenticated contributor or user. Semgrep computes contributor counts for any logged-in scan command (for example, `semgrep ci`, `semgrep scan`, etc.) when the Pro Engine, Supply Chain, or Pro rules are used.
