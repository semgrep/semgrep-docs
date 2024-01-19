---
slug: email-notifications 
append_help_link: true
title: Email 
hide_title: true
description: "Receive Semgrep findings via email."
tags:
    - Semgrep Cloud Platform
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

# Receiving email notifications

:::info Prerequisites
* Email notifications can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/) to set up Slack notifications.
* To receive alerts and notifications, you must [add or onboard the project](/semgrep-code/getting-started/) (repository) to Semgrep Cloud Platform for scanning.
:::

Receive Semgrep findings through email.

Perform these steps in Semgrep Cloud Platform to create an email integration and receive notifications:

1. Create an email integration:
    1. On the navigation menu, click **<i class="fa-solid fa-gear"></i> Settings > Integrations > Add Integration.**
    2. Click on **Email**.
    3. Enter a **Name** for the integration.
    4. Enter the **Email address** to receive Semgrep findings.
    5. Click **Save.**
2. Turn notifications on:
    1. Click **Rules > Policies > <i class="fa-solid fa-gear"></i> Rule Modes**.
    2. Click the **Edit** button of the Rule Mode for which you want to receive email notifications. For example, if you want to be notified of all blocking findings through email, click the **Edit** button of the **Block** mode.
    3. Repeat the previous step for all Rule Modes that you want to receive notifications for.
   
![Screenshot of Semgrep Cloud Platform email with findings](/img/integrations-email-findings.png#bordered)
**Figure** Sample of an email sent from Semgrep with findings.

:::note Number of emails
On each scan that has at least one finding, you will receive **one email** from Semgrep with a summary of all of the findings from that scan.
:::

<MoreHelp />
