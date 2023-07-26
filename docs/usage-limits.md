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

You can now access the Team tier features of Semgrep Supply Chain, Semgrep Code, and Semgrep Cloud Platform features such as SSO.

If the number of contributors exceeds the usage limit, you must purchase licensing for the 11th contributor onward.

The Enterprise tier remains unaffected.

### What is the usage limit?

The usage limit is 10 contributors. A contributor is someone who has made at least one commit to a Semgrep scanned private repository within the last 30 days.

### How are contributors calculated?

Contributors are calculated using `git log` over the past 30 days.

### What happens when the usage limit is exceeded?

Semgrep scans stop when the usage limit is exceeded. You can resume scanning through the following:

* A one-time 30-day free trial that starts automatically when the usage limit is exceeded for the first time.
* By purchasing additional licenses.
* By waiting for the next billing cycle.

### When will usage limits be enforced?

Usage limits have been enforced since July 31, 2023.

### What if the first Semgrep scan exceeds the contributor usage limit?

Semgrep will complete the first scan and a one-time 30-day free trial will automatically start. After the trial concludes, if scans are run on private repositories that exceed the usage limit, scans will not run until additional licenses are purchased.

### How is the cost calculated for the Team tier?

The 11th contributor and onwards are charged. For example, an engineering team with 20 contributing developers will only pay for 10 licenses.

### Can a single product be purchased?

Yes, you can buy a single product. Products can also be disabled from the [Settings page](https://semgrep.dev/orgs/-/settings).

### Can I purchase a different number of licenses per product?

No. For example, you cannot purchase 4 licenses of Semgrep Supply Chain and 9 licenses of Semgrep Code. You must purchase an equal number of licenses for both products.

### Do public projects have the same contribution limits?

No, public projects have no limits on contributors.

### Is the command `semgrep scan` subject to the usage limit?

Yes, but only if the scan is by a logged-in/authenticated contributor or user. Semgrep computes contributor counts for any logged-in scan command (for example, `semgrep ci`, `semgrep scan`, etc.) when the Pro Engine, Supply Chain, or Pro rules are used.
