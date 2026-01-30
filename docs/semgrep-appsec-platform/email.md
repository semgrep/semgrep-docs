---
slug: email-notifications
append_help_link: true
title: Email
hide_title: true
description: "Receive Semgrep findings through email."
tags:
    - Semgrep AppSec Platform
---

import Notifications from "/src/components/concept/_notification-deduplication.mdx"

# Receive email notifications

You can receive emails from Semgrep regarding **new findings** and **failed scans**.

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


<Notifications />

### Number of emails
 
Emails about new findings are triggered only once. These emails also include a **summary** of current open findings.
