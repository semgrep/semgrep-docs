---
slug: email-notifications
append_help_link: true
title: Email
hide_title: true
description: "Receive Semgrep findings via email."
tags:
    - Semgrep AppSec Platform
---

import Notifications from "/src/components/concept/_notification-deduplication.mdx"

# Receive email notifications

You can choose to receive notifications from Semgrep regarding new findings through email.

Perform these steps in Semgrep AppSec Platform to create an email integration and receive notifications:

1. Create an email integration:
    1. On the navigation menu, click **<i class="fa-solid fa-gear"></i> Settings > Integrations > Add**.
    2. Click on **Email**.
    3. Enter a **Name** for the integration.
    4. Enter the **Email** address to receive Semgrep findings.
    5. Click **Subscribe**.
2. Turn notifications on:
    1. Click **Rules > Policies > <i class="fa-solid fa-gear"></i> Rule Modes**.
    2. Click the **Edit** button of the Rule Mode for which you want to receive email notifications. For example, if you want to be notified of all blocking findings through email, click the **Edit** button of the **Block** mode.
    3. Repeat the previous step for all Rule Modes that you want to receive notifications for.

![Screenshot of Semgrep AppSec Platform email with findings](/img/integrations-email-findings.png)
**Figure** Sample of an email sent from Semgrep with findings.

<Notifications />

### Number of emails

While emails are triggered only when Semgrep identifies a new finding, the emails you receive also include a summary of all findings.
