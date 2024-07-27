---
slug: dashboard-beta
title: Dashboard (beta)
hide_title: true
description: Dashboard (beta)
tags:
  - Semgrep AppSec Platform
---

# Dashboard (beta)

The Semgrep dashboard (beta) is an overview of your organization’s security posture from data aggregated within Semgrep AppSec Platform. It helps you achieve the following goals:

- Evaluation of the success of your AppSec program, enabling you to know your current security risk.
  - This includes assessing the deployment of secure guardrails to your organization.
- Awareness of trends and opportunities that you can use to improve your security posture.
  - You are able to view **recurring security issues**, consequently taking action on them.

The dashboard provides the following features:

- Filters that enable you to track metrics over a period of time, per Semgrep product, and per project.
- Insights

:::note
This feature is in a **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the dashboard beta.
:::

tk-screenshot

The dashboard is divided into several panes:

<dl>
<dt>Filters and configuration</dt>
<dd>Sets the time period, product, and project scope of the <strong>production backlog</strong> and <strong>secure guardrails</strong> charts in the page.</dd>
<dt>Production backlog</dt>
<dd>Displays data about all the findings detected in your primary or default branch.</dd>
<dt>Secure guardrails</dt>
<dd>Displays data relevant to the deployment of secure guardrails.</dd>
<dt>Most findings by project</dt>
<dd>Lists findings by project, grouped by **product** or **severity**.</dd>
<dt>Mean time to remediate</dt><!-- Median open finding age -->
<dd>A graph showing the time to remediate over the given time period.</dd>
</dl>

## Filters and configuration

Use the filters to gain a top-level view or zoom in to a specific period of time. Create quarterly overviews or recent incident statements for various AppSec stakeholders by specifying the following filters:

- Time period
- Project (repository)
- Semgrep product or type of scan (SAST, SCA, or Secrets)

Configurations set here apply to the following panes:

- Production backlog
- Secure guardrails

### Recommended priority filters

By default, **<i class="fa-solid fa-toggle-large-on"></i> Recommended priority** filters are enabled. These filters display any finding that is **Critical** or **High** severity in **addition** to being:

- High confidence - if the finding is from Semgrep Code.
- Reachable - if the finding is from Semgrep Supply Chain.
- Valid - if the finding is from Secrets.

tk add links to definitions

## Production backlog

This pane displays analytics related to findings detected in your primary or default branch. This typically means that the finding, usually a security issue, has made it to production environments.

### Key metrics 

| Key metrics    | Description |
| -------------- | ------ |
| Total new      | |
| Total fixed    | |
| Total ignored  | |
| Total net new  | |

### Charts

| Chart | Description |
| -------  | ------ |
| Open backlog         | Open findings over the chosen time period. This tracks the total findings from each scan and displays them. Lower values are better. |
| Backlog activity | Displays the number of new, net new, fixed, and ignored findings. A greater **Fixed** value is better. |

## Secure guardrails

This provides an overview of how secure guardrails are used in your organization.

### Key metrics


| Key metrics    | Description |
| -------------- | ------ |
| Findings shown to devs      | Displayed as a fractional amount with the denominator being the total . An upward or stable trend is better. |
| Findings fixed before backlog      | |

### Charts

| Chart | Description |
| -------  | ------ |
| Open backlog         | Open findings over the chosen time period. This tracks the total findings from each scan and displays them. Lower values are better. |
| Backlog activity | Displays the number of new, net new, fixed, and ignored findings. A greater **Fixed** value is better. |

## Most findings by project

## Mean time to remediate

<!-- check if title changes -->
