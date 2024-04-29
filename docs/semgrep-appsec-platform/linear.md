---
slug: linear 
append_help_link: true
title: Linear
hide_title: true
description: "Send Semgrep findings to your Linear project."
tags:
    - Semgrep AppSec Platform
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

# Create Linear tickets

:::note
This feature is in a **closed beta**. To request access:
1. Fill out the following form: [Request access to the Semgrep Linear integration closed beta](https://get.semgrep.dev/Jira-asana-linear-private-beta.html).
2. Contact your Technical Account Manager or your Account Executive and let them know you'd like to try the Linear integration out.
:::

The Semgrep Linear integration allows you to create Linear tickets based on your Semgrep Code or Supply Chain findings.

## Enable your Linear integration

:::info Prerequisites
* Your Linear user must be able to approve an OAuth integration with admin level privileges.
:::

To integrate Linear, follow these steps:

1. In [Semgrep AppSec Platform](https://semgrep.dev/login), go to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
2. On the **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, click **Add Integration** (or **Setup First Integration** if this is your first integration), and then select **Ticketing > Linear**.
3. Follow the on-screen instructions to integrate Linear.

## Configure your default project and team

Use the drop-down lists to select the default project and team. These settings can be changed later from the integrations page.

![Linear configuration modal](/img/linear-configure-defaults.png)

**Figure** A sample Linear integration

## Create tickets

### Code

:::note
Creating tickets for many findings at once may take some time. Tickets that take longer than 10 seconds to create will be shown in the UI once the page is refreshed.
:::

To create tickets for one or more Code findings, use the triage button from the Code findings page or from an individual finding's details page. Findings can be individually selected, or you can create tickets for all findings for a given rule. 

Once a ticket has been created, a link will be present on the right side of the findings page and along the top of an individual finding's details page.

![Create Linear ticket - Code](/img/linear-code-findings.png)
**Figure** Code triage flow

![Linear ticket created - Code](/img/linear-code-ticketed.png)
**Figure** Code ticket created

### Supply Chain

:::caution Limitations
Tickets can only be created for Supply Chain findings with reachable usages. They cannot be created for **Always reachable** or **Unreachable** findings.
:::

The Supply Chain triage flow creates tickets for all usages of a given vulnerability. Usages can not be selected individually. 

![Create Linear ticket - Supply Chain](/img/linear-ssc-findings.png)
**Figure** Supply Chain triage flow

![Linear ticket created - Supply Chain](/img/linear-ssc-ticketed.png)
**Figure** Supply Chain ticket created

## Remove your Linear integration

On the **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, find Linear, click **Edit Configuration** and the **Delete**

* This **does not** delete any tickets created by Semgrep.
* This **removes** the link between Linear tickets and Semgrep findings, even if the integration is re-added in the future.

<MoreHelp />
