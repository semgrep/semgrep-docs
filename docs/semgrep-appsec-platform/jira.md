---
slug: jira
append_help_link: true
title: Jira
hide_title: true
description: "Send Semgrep findings to your Jira project."
tags:
    - Beta
    - Semgrep AppSec Platform
---

# Create Jira tickets

The Semgrep Jira integration allows you to create Jira tickets based on your Semgrep Code, Supply Chain, and Secrets findings.

## Prerequisites

- The Jira integration is in **public beta** for all existing Semgrep AppSec Platform users.
- You must have a **Jira Cloud** plan. Jira Data Center (self-managed or on-premise) is not supported.
- You must have at least one Jira project to set as the default location where tickets will be created.

## Features

The Semgrep Jira integration provides the following capabilities:

- You can create tickets for findings from Semgrep Code, Supply Chain, and Secrets.
- You can create a single ticket for multiple findings (up to 50) that were detected by a single rule in the same project, or create individual tickets per finding.
- You can automate the creation of tickets for high severity, high confidence findings in your [default branch](/deployment/add-semgrep-to-ci#default-branch-names).
  - Automated ticket creation can be configured on a per-product setting.
  - For Supply Chain findings, tickets are created for reachable findings.
- Tickets can be created in **multiple Jira projects** if manually specified at ticket creation time.


## Limitations

- You can create only **one Jira integration** per Semgrep account or deployment.
- You can only use **one subdomain** per Jira integration.
- The Semgrep Jira integration does not support bi-directional or two-way status syncing.

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
1. Select the **Default project** where the Jira tickets will be created.
1. Select the **Issue type** you want created with your Semgrep findings.
1. Optional: To see an example of the content Semgrep populates your Jira ticket with, click **See preview**.
1. Optional: Click **Customize ticket creation**, then select **<i class="fa-solid fa-square-check"></i> Automatically create tickets for high severity, high confidence findings on the default branch** to allow Semgrep to automatically create tickets.
1. Click **Save changes** to proceed.

![Jira configuration screen](/img/jira-subdomain.png#md-width)
_**Figure.** The Jira configuration screen._

:::tip
- Tickets are created only for **high severity, high confidence findings** only. This ensures that the noise is kept to a minimum.
- For Supply Chain findings, tickets are created for **reachable findings**.
- Automated ticket creation can be configured on a per-product setting.
:::

### Automatic detection of other Jira projects

The Jira integration automatically detects other Jira projects in your subdomain under the following conditions:

- The projects and Issue types are **company-managed**, not team-managed. See the Jira documentation about [<i class="fas fa-external-link fa-xs"></i> Team-managed and company-managed projects](https://support.atlassian.com/jira-software-cloud/docs/what-are-team-managed-and-company-managed-projects/)
- Those projects have the same **Issue type** as the default project. [When you triage a finding](#code), you can choose which project to create the tickets in.

:::caution Same name, different ID
Issue types may have the same name, but a different Issue type ID. If you can't view or select other Jira projects when creating tickets, check that your Issue type ID is the same across Jira projects. See the [<i class="fas fa-external-link fa-xs"></i> Jira documentation](https://confluence.atlassian.com/jirasoftwarecloud/finding-the-issue-type-id-in-jira-cloud-1333825937.html) for details.
:::

### Create mappings

Optionally, you can customize the Jira field mappings and indicate which values they should be populated with. Semgrep can map from Jira fields to either Semgrep fields or static Jira fields. Currently, Semgrep supports the mapping of the following field types:

* Short texts
* Paragraphs
* Drop-down menus
* Checkboxes
* Labels
* Components (including Compass components)

![Jira configuration screen for field data mappings](/img/jira-configure-defaults.png#md-width)
_**Figure.** The Jira configuration screen for field data mappings._

> Click **Field mapping help** to see a list of the Semgrep fields available for mapping.

The integration supports the use of custom Jira issue types and custom fields. However, it does not support field types other than those listed above. If you have a required field of a different type in your project, it will not be possible for Semgrep to map a value to that field, and issue creation will fail.

To create a field mapping:

1. Select the Semgrep product for which the mapping is valid: **Code**, **Supply Chain**, or **Secrets**.
2. Click **Add mapping**.
3. Select the **Jira field** to which the Semgrep data should be mapped. You can [create a new field](https://support.atlassian.com/jira-cloud-administration/docs/create-a-custom-field/) if necessary. If you opt not to add Semgrep values to your Jira fields, you can create an [automation to map to your field values](https://www.atlassian.com/software/jira/guides/automation/overview#what-is-automation).
4. Select the **Semgrep field** that holds the data to be mapped.

Repeat these steps for each mapping you want to create. When done, click **Save changes** to proceed.

:::warning
Ensure a 1:1 mapping between the Jira issue type field values and the Semgrep values.
:::

### Example mapping

Semgrep's **Severity** field can have the following values: `Low`, `Medium`, `High`, and `Critical`. The following Jira field setups can be used to capture this information:

* A short text issue type field
* A paragraph issue type field
* A drop-down issue type field with the following options: `Low`, `Medium`, `High`, `Critical`
* A checkbox issue type field with the following options: `Low`, `Medium`, `High`, `Critical`

If you opt for a drop-down or a checkbox issue type field, verify that:

* There are no misspellings.
* No valid options are missing. If your drop-down or checkbox issue type is missing the `Medium` option, Jira cannot create tickets for medium-severity findings.

## Create tickets

After setting up your Jira integration, you're now ready to create Jira tickets. Jira tickets can be created from findings in Semgrep Code, Supply Chain, and Secrets.

### Component Mappings

If you've created a custom field mapping for a component field type, be aware that if you choose to create tickets in a Jira project other than your default Jira project as configured in your integration settings, you must ensure that project has access to the component you selected for your mapping.

If your default project uses [**Jira Components**](https://support.atlassian.com/jira-software-cloud/docs/what-are-jira-components/) and you create a component field mapping in your integration settings, **you cannot create tickets in another project** because Jira components are always project-scoped.

If your default project uses [**Compass Components**](https://support.atlassian.com/jira-software-cloud/docs/what-are-compass-components/) and you create a component field mapping in your integration settings, you can create tickets in another project **only if your selected component is available in that project**. You can configure which components are available in each project in your Compass settings.

### Code

You can create tickets for Code findings using the **Triage** button on the:

* [**Findings**](https://semgrep.dev/orgs/-/findings) page
* Individual finding's **Details** page

To create tickets:

<!-- vale off-->
1. If you're on the [**Findings**](https://semgrep.dev/orgs/-/findings) page, select the findings for which you want tickets created; you can select and create tickets for individual findings or all findings for a given rule. Otherwise, proceed to step 2.
1. Click **Triage**.
1. Set the status to **Open**, **Fixing**, or **Reviewing**. Select **Fixing** if it is a known issue that needs to be fixed or **Reviewing** if the finding needs more investigation.
1. Select the **Create tickets...** checkbox.
    1. Optional: Click the first drop-down list to choose between making a ticket for **groups of findings** or an individual ticket for **each finding**.
    1. Optional: Click the **JIRA project** drop-down list to select which Jira project to add the findings to. You can choose any project that is associated with the issue type configured in your integration settings.
1. Optional: You can add **Comments** in the text box.
1. Click **Submit** to proceed.
<!-- vale on -->

:::info
- Creating tickets for many findings at once may take some time. Tickets that take longer than 10 seconds to create are shown in Semgrep once you refresh the page.
- If ticket creation **fails**, Semgrep automatically retries several times over the next day to provide robustness against outages and down time in third-party services.
:::

![Create Jira ticket - Code](/img/jira-code-findings.png#md-width)
_**Figure.** Code triage flow._

Once a ticket has been created, a link appears on the **Findings** page and along the top of an individual finding's details page.

![Jira ticket created - Code](/img/jira-code-ticketed.png#md-width)
_**Figure.** Code ticket created._

### Supply Chain

You can create tickets for Supply Chain findings using the **Triage** button on the:

* [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities) page
* Individual finding's **Details** page

To create tickets:

<!-- vale off-->
1. If you're on the [**Supply Chain > Vulnerabilities**](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities) page, select the findings for which you want tickets created. Otherwise, proceed to step 2.
1. Click **Triage**.
1. Set the status to **Open**, **Fixing**, or **Reviewing**. Select **Fixing** if it is a known issue that needs to be fixed or **Reviewing** if the finding needs more investigation.
1. Select the **Create tickets...** checkbox.
    1. Optional: Click the first drop-down list to choose between making a ticket for **groups of findings** or an individual ticket for **each finding**.
    1. Optional: Click the **JIRA project** drop-down list to select which Jira project to add the findings to.
1. Optional: You can add **Comments** in the text box.
1. Click **Submit** to proceed.
<!-- vale on -->

![Create Jira ticket - Supply Chain](/img/jira-ssc-findings.png#md-width)
_**Figure.** Supply Chain triage flow._

![Jira ticket created - Supply Chain](/img/jira-ssc-ticketed.png#md-width)
_**Figure.** Supply Chain ticket created._

### Secrets

To create tickets:

<!-- vale off -->

1. Select one or more findings listed in Secrets.
2. Click **Triage**.
3. Select **Create <span className="placeholder">NUMBER_OF_TICKETS</span> JIRA tickets**.
4. Click **Creat ticket** to proceed.

<!-- vale on -->

![Create a Jira ticket for a Semgrep Secrets finding](/img/secrets-jira.png#md-width)
_**Figure.** Secrets triage flow._

![Jira ticket created - Semgrep Secrets](/img/jira-secrets-ticketed.png#md-width)
_**Figure.** Secrets ticket created._

## Remove the Jira integration

To remove the Jira integration from your Semgrep organization:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**.
2. Navigate to the **Jira Cloud** section and click **Remove integration**.

Note that deleting the integration:

* **Does not** delete any tickets created by Semgrep
* **Removes** the link between Jira tickets and Semgrep findings, even if you re-add the integration in the future
