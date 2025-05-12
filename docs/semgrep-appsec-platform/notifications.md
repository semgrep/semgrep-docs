---
slug: notifications
append_help_link: true
title: Alerts and notifications
hide_title: true
toc_max_heading_level: 4
description: "Learn how to receive Slack, webhook, or email notifications about findings."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

import RuleModes from "/src/components/reference/_rule-modes.md"

# Alerts and notifications

You can receive notifications for Semgrep Code and Supply Chain findings in the following channels:

- [Slack](/semgrep-appsec-platform/slack-notifications)
- [Email](/semgrep-appsec-platform/email-notifications)
- [Webhooks](/semgrep-appsec-platform/webhooks)


Setting up notifications involves the following steps:

1. Integrating the notification channel, such as Slack, with Semgrep.
2. Customizing the conditions under which a notification is sent to that channel. Available conditions and how they are set up varies depending on the Semgrep product; see the following table.

<table>
<thead>
<tr>
<th>Channel</th>
<th>Semgrep Code</th>
<th>Semgrep Supply Chain</th>
</tr>
</thead>
<tbody>
<tr>
<td>Slack</td>
<td rowspan="3">Customize through rule modes in [Policies page](/semgrep-code/policies)</td>
<td>Limited customizability; configured by default to send notifications on <strong>reachable</strong> findings</td>
</tr>
<tr>
<td>Email</td>
<td>Not available</td>
</tr>
<tr>
<td>Webhooks</td>
<td>Not available</td>
</tr>
</tbody>
</table>

Semgrep Code **rule modes** define workflow actions (**Monitor**, **Comment**, or **Block**) that Semgrep Code performs when a rule detects a finding. In addition to these workflow actions, you can also configure Semgrep to send notifications on any rule mode.

<details>
<summary>Click to expand table of rule modes</summary>

<RuleModes />

</details>

## View integrations 

To view all integrations available to you in Semgrep AppSec Platform, follow these steps:

1. Sign in to your [Semgrep AppSec Platform ](https://semgrep.dev/orgs/-/settings/integrations) account.
1. Click **Settings > Integrations**.
    ![Integrations page while adding the first integration.](/img/integrations.png#md-width)
    _**Figure**_. The integrations available in Semgrep AppSec Platform.

## Next steps

Refer to the specific documentation page for the notification channel you want to set up.
