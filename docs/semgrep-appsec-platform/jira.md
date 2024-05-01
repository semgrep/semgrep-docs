---
slug: jira 
append_help_link: true
title: Jira
hide_title: true
description: "Send Semgrep findings to your Jira project."
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

# Create Jira tickets

<!-- It's Jira, not JIRA :) -->

The Semgrep Jira integration allows you to create Jira tickets based on your Semgrep Code, Supply Chain, and Secrets findings.

## Prerequisites

* This feature is in a **closed beta**. To request access:
  1. Fill out the [Request access to the Semgrep Jira integration closed beta](https://get.semgrep.dev/Jira-asana-linear-private-beta.html) form.
  2. Contact your Technical Account Manager or Account Executive and let them know you'd like to try the Jira integration.
* You must have a **Jira Cloud** plan. Jira Data Center (self-managed or on-prem) is not supported. 

## Enable the Jira integration

To enable the Jira integration, follow these steps:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login). 
2. Navigate to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
3. If this is your first integration, click **Setup First Integration**. Otherwise, click **Add integration**. In the drop-down menu that appears, select **Jira**.
4. Follow the on-screen instructions to grant Semgrep the necessary permissions and set up the integration.
5. Select the Jira instance you want to connect to when prompted. Choose one instance from the **Use app on** drop-down menu if you have multiple Jira instances.
   * **For deployments that have used a previous version of the Jira integration**: Ensure you're connecting to the same Jira instance you previously connected to. Please get in touch with Semgrep if you want to connect to a different Jira instance.

## Configure the integration

Once you have enabled the Jira integration, you must complete the following steps on Semgrep AppSec Platform's **Integrations** page:

1. Confirm the subdomain for your Jira instance
2. Select the **Default project** where Jira will add the tickets
3. Select the **Issue type** of the tickets to be created

Click **Save changes** to proceed.

![Jira configuration screen](/img/jira-subdomain.png)
**_Figure._** The Jira configuration screen.

### Create mappings

Optionally, you can customize the Jira field data mappings and indicate which Semgrep fields they should be populated with. Currently, Semgrep supports the mapping of the following issue types:

* Short texts
* Paragraphs
* Drop-down menus
* Checkboxes

![Jira configuration screen for field data mappings](/img/jira-configure-defaults.png)
**_Figure._** The Jira configuration screen for field data mappings.

Semgrep also supports the use of custom issue types and custom fields.

To create a mapping:

* Select the Semgrep product for which the mapping is valid: **Code**, **Supply Chain**, or **Secrets**.
* Click **Add mapping**.
* Provide the **Jira field** name to which the Semgrep data should be mapped.
* Select the **Semgrep field** that holds the data to be mapped.

Repeat these steps for each mapping you want to create. When done, click **Save changes** to proceed.

:::note
Ensure a 1:1 mapping between the Jira issue type field values and the Semgrep values. 
:::

### Sample mappings

Semgrep's **Severity** field can have the following values: `Low`, `Medium`, `High`, `Critical`. The following Jira field setups would work for capturing this information:

* A short text issue type field
* A paragraph issue type field
* A drop-down issue type field with the following options: `Low`, `Medium`, `High`, `Critical`
* A checkbox issue type field with the following options: `Low`, `Medium`, `High`, `Critical`

If you opt for a drop-down or a checkbox issue type field, verify that:

* There are no misspellings
* No valid options are missing. If your drop-down or checkbox issue type is missing the `Medium` option, Jira cannot create tickets for medium-severity findings.

## Create tickets

### Code

To create tickets for one or more Code findings, you can use the triage button:

* On the **Findings** page
* On an individual finding's **Details** page.

When working on the **Findings** page, you can select and create tickets for individual findings or all findings for a given rule.

:::note
Creating tickets for many findings at once may take some time. Tickets that take longer than 10 seconds to create are shown in the UI once you refresh the page.
:::

![Create Jira ticket - Code](/img/jira-code-findings.png)
***Figure.*** Code triage flow

Once a ticket has been created, a link appears on the right side of the **Findings** page and along the top of an individual finding's details page.

![Jira ticket created - Code](/img/jira-code-ticketed.png)
***Figure.*** Code ticket created

### Supply Chain

The Supply Chain triage flow creates tickets for all usages of a given vulnerability. Usages can not be selected individually.

To create tickets for one or more Supply Chain findings, you can use the triage button on the:

* **Supply Chain > Vulnerabilities** page
* Individual finding's **Details** page.

![Create Jira ticket - Supply Chain](/img/jira-ssc-findings.png)
***Figure*.** Supply Chain triage flow

![Jira ticket created - Supply Chain](/img/jira-ssc-ticketed.png)
***Figure*.** Supply Chain ticket created

:::caution Limitations
Tickets can only be created for Supply Chain findings with reachable usages. They cannot be created for **Always reachable** or **Unreachable** findings.
:::

### Secrets

After selecting one or more findings, you can use the triage button on the **Secrets** page to create tickets for them.

![Create a Jira ticket for a Semgrep Secrets finding](/img/secrets-jira.png)
***Figure*.** Secrets triage flow

## Remove your Jira integration

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
2. Navigate to the **Jira Cloud** section and click **Remove integration**.

Note that deleting the integration:

* **Does not** delete any tickets created by Semgrep
* **Removes** the link between Jira tickets and Semgrep findings, even if you re-add the integration in the future.

<MoreHelp />
