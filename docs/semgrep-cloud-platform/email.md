---
slug: email-notifications 
append_help_link: true
title: Email 
hide_title: true
description: "Receive Semgrep findings via email"
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Receiving Email notifications

:::info Prerequisites
* Email notifications can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up Slack notifications.
* To receive alerts and notifications, you must [add or onboard the project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

Receive Semgrep findings via email.

To set up email integration:

1. In **Integrations,** click **Add Integration.**
2. Click on **Email**.
3. Enter a **Name** for the integration.
4. Enter the **Email address** that will receive Semgrep findings.
5. Click **Save.**
6. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear** icon, and then click the <i class="fa-solid fa-toggle-large-on"></i> **toggle** next to the name of the integration.

![Screenshot of Semgrep Cloud Platform email with findings](/img/integrations-email-findings.png#bordered)
*Figure 2.* Sample of an email sent from Semgrep with findings.

:::note Number of emails
On each scan that has at least one finding, you will receive **one email** from Semgrep with a summary of all of the findings from that scan.
:::

