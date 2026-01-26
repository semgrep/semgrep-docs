---
slug: usage-and-billing
append_help_link: true
title: Usage and billing
description: Learn about usage computation and other aspects of your Semgrep licenses.
displayed_sidebar: aboutSidebar
tags:
  - Support
  - Semgrep AppSec Platform
hide_title: true
---

# Usage and billing

[TODO]

This document is intended for users with paid licenses for Semgrep Code, Supply Chain, or Secrets, regardless of whether they use Semgrep AppSec Platform or not.

There are no usage limits for Semgrep Community Edition (CE).

:::tip
See [Semgrep AppSec Platform versus Semgrep Community Edition](/semgrep-pro-vs-oss) for information about the differences between these two Semgrep products.
:::

## Contributor definition

A **contributor** is someone who has made at least **one** commit to a Semgrep-scanned **private** repository within the last 90 days, starting from the **date of license purchase** if a license was purchased, or the date of account creation, for accounts using Semgrep within usage limits.

Any type of Semgrep AppSec Platform scan counts towards the contributor total. This includes:

- Scanning with Semgrep Code, Secrets, or Supply Chain
- Full scans on a repository or partial scans on a pull request or merge request

Semgrep computes contributor counts for any scan initated by a logged-in user running `semgrep ci` or `semgrep scan`. The `semgrep scan` command is subject to the usage limit if the scan is invoked by a logged-in contributor.

### Contributor counts

Semgrep calculates contributors using information from the `git log` over the past 90 days (a rolling interval). The start date is either:

- The date of your license purchase
- The date of your account creation, if you and your team are within usage limits

**Bots** and other automations are excluded from the contributor count.

#### Small teams and startup licensing

If you are a small team, you may be eligible for Semgrep's discounted startup pricing. Fill out the [<i class="fas fa-external-link fa-xs"></i> startup pricing](https://semgrep.dev/contact/contact-us-startups) form to apply.

### Contributor usage across multiple Semgrep organizations

If your company creates multiple Semgrep organizations, the contributor limit applies across all of your organizations. For example, if your company creates three Semgrep organizations, each with the following number of contributors:

- Organization 1 has 8 contributors
- Organization 2 has 9 contributors
- Organization 3 has 10 contributors

Your company has 27 contributors across three organizations, so you require licenses for 27 contributors.

## AI credits

Each Semgrep license comes with a number of AI credits. These credits can be used for different AI features:

| Feature | Credits required |
| - | - |
| Triage | 1 credit |
| Full scan | X credits |
| Autofix | Y credits |

For the duration of your contract, which is usually an annual contract, AI credits convert to a pool. For example, if you buy 10 Team licenses on January 1, you will have 2400 credits for the year: 10 licenses * 20 credits * 12 months = 2400 credits.

You can purchase additional AI credits in increments of 50,000 credits. Semgrep does not offer bulk discounts for credits.

Credits that you purchase roll over at the end of the year. Entitlement credits, or the credits that come with your Semgrep licenses, do not roll over at the end of the year.

### Assistant actions

[TODO]

## How to determine your plan needs

Within your team or organization, assess the number of **contributors**. Contributors are members of your organization that make commits. That determines the number of **licenses** needed for the plan purchase.

For example, if a project has 4 unique contributors who create commits during the billing period while Semgrep is scanning their repositories, only 4 licenses are required even if the organization has a total of 10 members. Contributors are counted only once even if they commit to many projects within the same organization, so no additional licenses are required.

All members of the organization, regardless of contributor (license) status, have access to paid features for the chosen tier. This means that project managers and other non-programming roles can still view the Semgrep AppSec Platform dashboard.

### Determine AI credit requirements

Contact Semgrep if you would like assistance determining the number of credits your organization needs in a year.

## Excess usage

Semgrep scans stop if you exceed your usage limit. You can resume scanning by:

- Purchasing additional licenses. See [Additional usage and reconciliation of licenses] for additional information on how these purchases affect your account.
- Waiting for the next billing cycle, which is when your usage limits reset.

If you're using a free license, Semgrep automatically starts a free trial for you if it is the first time that you exceed your usage limits. 

There are no contributor limits on public projects.
