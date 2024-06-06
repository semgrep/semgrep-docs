---
slug: notifications
append_help_link: true
title: Alerts and notifications
hide_title: true
toc_max_heading_level: 4
description: "Learn how to receive Slack or email alerts about findings and failures, how to receive merge or pull request comments in your CI/CD pipeline, or how to integrate using webhooks."
tags:
    - Semgrep AppSec Platform
    - Team & Enterprise Tier
---

# Alerts and notifications

Users with team or enterprise subscriptions can receive notifications from Semgrep AppSec Platform in the following channels:

- [Slack](/semgrep-appsec-platform/slack)
- [Email](/semgrep-appsec-platform/email)
- [Webhooks](/semgrep-appsec-platform/webhooks)

## Notification and alert de-duplication

Notifications are sent only the first time a given finding is detected.

When running a diff-aware scan, Semgrep doesn't notify you when a pull request has a finding that existed on the base branch already,
even if that line is moved or re-indented.

Semgrep also tracks notifications that have already been sent, so subsequent scans of the same changes in a pull request won't result in duplicate notifications.