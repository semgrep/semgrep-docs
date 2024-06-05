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

# Create Jira tickets

<!-- It's Jira, not JIRA :) -->

The Semgrep Jira integration allows you to create Jira tickets based on your Semgrep Code, Supply Chain, and Secrets findings.

## Prerequisites

* This feature is in a **closed beta**. To request access:
  1. Fill out the [Request access to the Semgrep Jira integration closed beta](https://get.semgrep.dev/Jira-asana-linear-private-beta.html) form.
  2. Contact your Technical Account Manager or Account Executive and let them know you want to try the Jira integration.
* You must have a **Jira Cloud** plan. Jira Data Center (self-managed or on-premise) is not supported.

## Enable the Jira integration

To enable the Jira integration, follow these steps:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [**Settings** > **Integrations**](https://semgrep.dev/orgs/-/settings/integrations).
3. If this is your first integration, click **Set up First Integration**. Otherwise, click **Add integration**. In the drop-down menu that appears, select **Jira**.
4. Follow the on-screen instructions to grant Semgrep the necessary permissions and set up the integration.
5. When prompted, select the Jira instance you want to connect to. If you have multiple Jira instances, choose one instance from the **Use app on** drop-down menu.
   * **For deployments that have used a previous version of the Jira integration**: Ensure you're connecting to the same Jira instance you previously connected to. Please contact Semgrep if you want to connect to a different Jira instance.

## Configure the integration

Once you have enabled the Jira integration, you must complete the following steps on Semgrep AppSec Platform's **Integrations** page:

1. Select the **Subdomain** for the Jira instance you want to use.
2. Select the **Default project** where the Jira tickets will be created.
3. Select the **Issue type** you want created with your Semgrep findings.
4. If you'd like to see an example of the content Semgrep populates your Jira ticket with, click **See preview**.
5. Click **Save changes** to proceed.

![Jira configuration screen](/img/jira-subdomain.png#md-width)
**_Figure._** The Jira configuration screen.

### Create mappings

Optionally, you can customize the Jira field mappings and indicate which Semgrep fields they should be populated with. Currently, Semgrep supports the mapping of the following issue types:

* Short texts
* Paragraphs
* Drop-down menus
* Checkboxes

![Jira configuration screen for field data mappings](/img/jira-configure-defaults.png#md-width)
**_Figure._** The Jira configuration screen for field data mappings.

> Click **Field mapping help** to see a list of the Semgrep fields available for mapping.

The integration supports the use of custom Jira issue types and custom fields.

To create a mapping:

1. Select the Semgrep product for which the mapping is valid: **Code**, **Supply Chain**, or **Secrets**.
2. Click **Add mapping**.
3. Select the **Jira field** to which the Semgrep data should be mapped. You can [create a new field](https://support.atlassian.com/jira-cloud-administration/docs/create-a-custom-field/) if necessary. If you opt not to add Semgrep values to your Jira fields, you can create [automation to map to your field values](https://www.atlassian.com/software/jira/guides/automation/overview#what-is-automation).
4. Select the **Semgrep field** that holds the data to be mapped.

Repeat these steps for each mapping you want to create. When done, click **Save changes** to proceed.

:::warning
Ensure a 1:1 mapping between the Jira issue type field values and the Semgrep values.
:::

### Example mapping

Semgrep's **Severity** field can have the following values: `Low`, `Medium`, `High`, and `Critical`. The following Jira field setups would work for capturing this information:

* A short text issue type field
* A paragraph issue type field
* A drop-down issue type field with the following options: `Low`, `Medium`, `High`, `Critical`
* A checkbox issue type field with the following options: `Low`, `Medium`, `High`, `Critical`

If you opt for a drop-down or a checkbox issue type field, verify that:

* There are no misspellings
* No valid options are missing. If your drop-down or checkbox issue type is missing the `Medium` option, Jira cannot create tickets for medium-severity findings.

## Create tickets

### Code

You can create tickets for Code findings using the **Triage** button on the:

* [**Findings**](https://semgrep.dev/orgs/-/findings) page
* Individual finding's **Details** page

To create tickets:

1. If you're on the [**Findings**](https://semgrep.dev/orgs/-/findings) page, select the findings for which you want tickets created; you can select and create tickets for individual findings or all findings for a given rule. Otherwise, proceed to step two.
2. Click **Triage**.
3. Set the status to **Fixing**, and select the **Create <span className="placeholder">NUMBER_OF_TICKETS</span> JIRA tickets in <span className="placeholder">PROJECT_NAME</span>** box that appears.
4. Click **Change status** to proceed.

:::note
Creating tickets for many findings at once may take some time. Tickets that take longer than 10 seconds to create are shown in Semgrep once you refresh the page.
:::

![Create Jira ticket - Code](/img/jira-code-findings.png#md-width)
***Figure.*** Code triage flow

Once a ticket has been created, a link appears on the **Findings** page and along the top of an individual finding's details page.

![Jira ticket created - Code](/img/jira-code-ticketed.png#md-width)
***Figure.*** Code ticket created

### Supply Chain

You can create tickets for Supply Chain findings using the **Triage** button on the:

* [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities) page
* Individual finding's **Details** page

To create tickets:

1. If you're on the [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities) page, select the findings for which you want tickets created. Otherwise, proceed to step two.
2. Click **Triage**.
3. Set the status to **Fixing**, and select the **Create <span className="placeholder">NUMBER_OF_TICKETS</span> JIRA tickets in <span className="placeholder">PROJECT_NAME</span>** box that appears.
4. Click **Change status** to proceed.

![Create Jira ticket - Supply Chain](/img/jira-ssc-findings.png#md-width)
***Figure*.** Supply Chain triage flow

![Jira ticket created - Supply Chain](/img/jira-ssc-ticketed.png#md-width)
***Figure*.** Supply Chain ticket created

### Secrets

To create tickets for findings generated by Semgrep Secrets:

1. Select one or more findings listed in Secrets.
2. Click **Triage**.
3. Select **Create <span className="placeholder">NUMBER_OF_TICKETS</span> JIRA tickets**.
4. Click **Continue** to proceed.

![Create a Jira ticket for a Semgrep Secrets finding](/img/secrets-jira.png#md-width)
***Figure*.** Secrets triage flow

![Jira ticket created - Semgrep Secrets](/img/jira-secrets-ticketed.png#md-width)
***Figure*.** Secrets ticket created

## Remove the Jira integration

To remove the Jira integration from your Semgrep organization:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
2. Navigate to the **Jira Cloud** section and click **Remove integration**.

Note that deleting the integration:

* **Does not** delete any tickets created by Semgrep
* **Removes** the link between Jira tickets and Semgrep findings, even if you re-add the integration in the future
