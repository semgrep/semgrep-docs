---
slug: integrations
append_help_link: true
title: Integrations
hide_title: true
description: "Semgrep App contains 3rd party integrations to allow users to add data from Semgrep to other tools that are part of their workflows."
tags:
    - Semgrep App
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import ProcedureIntegrateSlack from "/src/components/procedure/_integrate-slack.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Integrating Semgrep App with third-party tools

Semgrep App contains third-party integrations to allow you to add data from Semgrep to other tools that are part of your workflows.

Currently, Semgrep App integrates with the following tools:

| Tool | Tier availability |
| ---- | ---------------- |
| Slack | Community (Free) |
| Email | Community (Free) |
| Jira | Team/Enterprise |
| Webhook | Team/Enterprise |

## Finding available integrations

To find available [integrations for Semgrep App](https://semgrep.dev/orgs/-/settings/integrations), follow these steps:

1. Sign in to your [Semgrep App account](https://semgrep.dev/).
2. Click **Settings**.
3. Click **Integrations**.
    ![Screenshot of Semgrep's "Create New Integration Channel" menu](/img/integration-firstview.png)
4. Click **Add Integration** (or **Setup First Integration** if this is your first integration).
    ![Screenshot of Integrations page while adding the first integration.](/img/integrations.png)<br />

## Managing integrations

To view, add, remove, disable, or enable your saved integration channels:

1. In the **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, explore the options available for specific integration.
2. In the **[Rule board](https://semgrep.dev/orgs/-/board)**, click the <i class="fa-solid fa-gear"></i> **gear** icon to enable or disable an integration.
    ![Screenshot of Semgrep's Rule board integration modal](/img/rule-board-integrations.png)

## Integrating various third-party tools

This section describes how to integrate Semgrep App into particular third-party tools.

### Slack

<ProcedureIntegrateSlack />

#### Additional resources

* https://api.slack.com/apps
* https://api.slack.com/messaging/webhooks#enable_webhooks

#### See also

[Notifications -> Slack](notifications.md/#slack)

### Email

Receive Semgrep findings in an email address of your choice with email integration.

To set up email integration:

1. In **Integrations,** click **Add Integration.**
2. Click on **Email**.
3. Enter a **Name** for the integration.
4. Enter the **Email address** that will receive Semgrep findings.
5. Click **Save.**
6. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear icon**, then clicking on the **toggle** next to the name of the integration.

Here is a sample of an email sent from Semgrep with findings:

![Screenshot of Semgrep email with findings ](/img/integrations-email-findings.png)<br />

#### See also
[Notifcations -> Email](notifications.md/#email)

### Jira

Jira integration is a feature available in Semgrep's Team tier and above.

This integration allows you to create Jira tickets directly from the **Findings** page with relevant information about a particular finding.

To set up Jira integration:

1. In **Integrations,** click **Add Integration**.
2. Click on **Jira.**
3. Enter a **Name** for the integration.
4. Enter the **email address** used for the Atlassian account.
5. Enter your Atlassian **domain URL**.
6. Enter your **Project key**. This is the prefix for tasks created within a project. Semgrep will create issues to the project identified here.
7. Enter the **Issue type.** This is the type of issue for Semgrep findings, for example, *Bug.*
8. Enter the **API Token**. Tokens are generated through this link: [Manage API Tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account).
9. Click **Save.**

To create a Jira ticket from Semgrep:

1. In **Findings**, click on the **three-dot icon** of the entry to create a Jira ticket for the finding.
![Creating a Jira ticket from the Findings page](/img/jira-findings-page.png)<br />
2. Select **Create issue with `[YOUR_INTEGRATION_NAME]`**.
![Output of Jira integration](/img/jira-template.png)


### Webhooks

Webhooks are a feature available in Semgrep's Team tier and above.

Webhooks are a generic method for Semgrep to post JSON-formatted findings after each scan to your URL endpoint. To set up a webhook:

1. Go to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**, and then click **Add Integration**.
2. Click **Webhook**.
3. Enter a **Name** for the integration.
4. Enter the **Webhook URL**.
5. To ensure that Semgrep can post to your URL, click **Test**. 
![Successful webhook integration test](/img/webhook-successful-test.png)<br />
6. Click **Save.**
7. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear icon**, then clicking on the **toggle** next to the name of the integration.

Here is a sample of a webhook sent from Semgrep with findings:

![Screenshot of Semgrep webhook JSON with findings](/img/integrations-webhook-findings.png)<br />


## See also

* [Notifications -> Webhooks](notifications.md/#webhooks)

<!---
### Amazon S3

1. In **Integrations,** click **Add Integration**.
2. Click **AWS S3**.
3. Enter the AWS 3 **Channel name**. This is where Semgrep will post findings.
4. Optional: Select the **Inventory** check box to receive notifications about Code Asset Inventory findings.
5. To ensure that Semgrep can post to your channel, click **Test**.
6. Click **Save.**
7. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear icon**, then clicking on the toggle next to the name of the integration.
--->

<MoreHelp />
