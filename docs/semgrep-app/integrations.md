---
slug: integrations
append_help_link: true
description: "Semgrep App contains 3rd party integrations to allow users to add data from Semgrep to other tools that are part of their workflows."
---

import MoreHelp from "/src/components/MoreHelp"

# Integrations

Semgrep App contains 3rd party integrations to allow users to add data from Semgrep to other tools that are part of their workflows.

Currently, Semgrep App integrates with the following tools:

| Tool | Tier availability |
| ---- | ---------------- |
| Slack | Community |
| Email | Community |
| Jira | Team |
| Amazon S3 | Team |
| Webhook | Team |

## Where are integrations found?

[Add: steps to find integrations]

## Slack

- [ ] screenshots complete
- [ ] secret keys blurred out

Integrating with Slack allows Semgrep to post messages about various security findings to a channel on your Slack workspace. [Add: Benefits of enabling Slack integration]

[Add: screenshot showing slack integration catching something useful.]

To set it up, you'll need to create an app within Slack and enable Slack's `Incoming Webhooks` feature. By creating a webhook, you'll have a URL which serves as Semgrep's endpoint to your Slack workplace. The guide below will walk you through those steps.

1. Make sure that you're logged into your Slack account. You can enter your login details [here.](https://slack.com/workspace-signin)
2. Follow this [link](https://api.slack.com/apps?new_app=1) to create an app in your Slack workplace. Select `From scratch` and fill in the fields for your app's name and workspace.
   [insert photo here]
3. You will be redirected to your new app's settings page. Alternatively, you can find this page by viewing your apps [here](https://api.slack.com/apps) and selecting your integration app from the menu.
   [insert photo here]
4. Click on `Incoming Webhooks` on the left menu, then enable the toggle.
   [insert photo here]
5. Once you've enabled `Incoming Webhooks`, you'll either be able to generate a `Webhook URL` or request one from a workspace owner.
   [insert photo here]
6. After you've obtained the URL, copy-paste it into Semgrep's integration form. You can then test and select which channel you'd like Semgrep to start posting to, then save the final configuration.
   [insert photo here]


----


(1) Make an app
(2) Enable webhooks

### References and useful links
* https://api.slack.com/apps
* https://api.slack.com/messaging/webhooks#enable_webhooks

See also: Notifications -> Slack

## Email

Proposed outline:
1. Introduction, functionality: "Email integration allows you..."
2. How to set it up (with screenshots)
3. What it looks like in an email client (such as Gmail)

See also: Notifcations -> Email

## Jira

The Jira integration allows you to create tickets directly from the Findings page with relevant info about a particular finding.

![Setting up the Jira integration](../img/jira-integrations-page.png)
![Creating a Jira ticket from the Findings page](../img/jira-findings-page.png)
![Output of Jira integration](../img/jira-template.png)


## Amazon S3

(See above for proposed ouline)

## Webhooks

See also: Notifcations -> Webhooks


<MoreHelp />
