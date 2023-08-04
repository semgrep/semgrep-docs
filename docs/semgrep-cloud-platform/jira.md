---
slug: jira 
append_help_link: true
title: Jira
hide_title: true
description: "Send Semgrep findings to your Jira project."
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

# Creating Jira tickets

<!-- It's Jira, not JIRA :) -->

:::tip Try our Jira integration (beta)
* Existing customers can try our Jira integration for free. To enable this feature:
    1. Fill out the following form: [Request access to the Semgrep Jira integration private beta](https://get.semgrep.dev/Jira-private-beta.html).
    2. Contact your Technical Account Manager or your Account Executive and let them know you'd like to try the Jira integration out.
:::

The Semgrep Jira integration allows you to create Jira tickets based on your Semgrep Code or Supply Chain findings.

## Enabling your Jira integration

:::info Prerequisites
* You must have a **Jira Cloud** plan. Jira Data Center (self-managed, or on-prem) is not supported. 
* Your Jira user must be able to create a Jira API key with admin level privileges.
* Jira can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up your Jira integration.
* To create tickets, you must [add or onboard the project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

To integrate Jira, follow these steps:

1. In [Semgrep Cloud Platform](https://semgrep.dev/login), go to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
2. On the **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, click **Add Integration** (or **Setup First Integration** if this is your first integration), and then select **Ticketing > Jira**.
3. Follow the on-screen instructions to add your Jira API key.

## Configuring your default project and ticket type

Use the drop-down lists to select the default project and ticket type. These settings can be changed later from the integrations page.

![Jira configuration modal](/img/jira-configure-defaults.png) 

**Figure** A sample Jira integration

## Creating tickets

### Code

:::note
Creating tickets for many findings at once may take some time. Tickets that take longer than 10 seconds to create will be shown in the UI once the page is refreshed.
:::

To create tickets for one or more Code findings, use the triage button from the Code findings page or from an individual finding's details page. Findings can be individually selected, or you can create tickets for all findings for a given rule. 

Once a ticket has been created, a link will be present on the right side of the findings page and along the top of an individual finding's details page.

![Create Jira ticket - Code](/img/jira-code-findings.png)
**Figure** Code triage flow

![Jira ticket created - Code](/img/jira-code-ticketed.png)
**Figure** Code ticket created

### Supply Chain

:::caution Limitations
Tickets can only be created for Supply Chain findings with reachable usages. They cannot be created for **Always reachable** or **Unreachable** findings.
:::

The Supply Chain triage flow creates tickets for all usages of a given vulnerability. Usages can not be selected individually. 

![Create Jira ticket - Supply Chain](/img/jira-ssc-findings.png)
**Figure** Supply Chain triage flow

![Jira ticket created - Supply Chain](/img/jira-ssc-ticketed.png)
**Figure** Supply Chain ticket created

## Removing your Jira integration

On the **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, find Jira, click **Edit Configuration** and the **Delete**

* This **does not** delete any tickets created by Semgrep.
* This **removes** the link between Jira tickets and Semgrep findings, even if the integration is re-added in the future.

<MoreHelp />
