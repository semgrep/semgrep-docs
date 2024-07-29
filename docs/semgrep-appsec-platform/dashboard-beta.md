---
slug: dashboard-beta
title: Dashboard (beta)
hide_title: true
description: Use the Semgrep dashboard (beta) to gain an overview of your organization's security posture, including the deployment of guardrails.
tags:
  - Semgrep AppSec Platform
  - Secure guardrails
---

# Dashboard (beta)

The Semgrep dashboard (beta) is an overview of your organization’s security posture from data aggregated within Semgrep AppSec Platform. It helps you achieve the following goals:

- Evaluation of the success of your AppSec program, enabling you to know your current security risk.
  - This includes assessing the deployment of secure guardrails to your organization.
- Awareness of trends and opportunities that you can use to improve your security posture.
  - You are able to view **recurring security issues**, consequently taking action on them.

<!--
The dashboard provides the following features:

- Filters that enable you to track key metrics over a period of time, per Semgrep product, and per project.
-->

:::note
This feature is in a **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the dashboard beta.
:::


![Dashboard (beta) page](/img/dashboard-fold.png)
_**Figure**. The dashboard (beta_) page._

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

- [High confidence](/contributing/contributing-to-semgrep-rules-repository#confidence) - if the finding is from Semgrep Code.
- [Reachable](/semgrep-supply-chain/triage-and-remediation#filters) - if the finding is from Semgrep Supply Chain.
- [Valid](/semgrep-secrets/getting-started#validation) - if the finding is from Semgrep Secrets.

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

This provides an overview of how secure guardrails in **PR or MR comments** are used in your organization. Other guardrail interfaces, such as the IDE or `pre-commit`, are not counted in this section.

![Secure guardrails pane](/img/dashboard-guardrails.png)
_**Figure**. Secure guardrails pane._

### Key metrics

<!-- vale off -->
| Key metrics    | Description |
| -------------- | ------ |
| Findings shown to devs      | Percentage of findings shown to developers in PR or MR comments against the total findings count. An upward or stable trend is better. |
| Findings fixed before backlog      | Displays the percentage of findings that were fixed before they could be detected in a default branch or production backlog against the total findings count in the specified time period. An upward or stable trend is better. |

<!-- vale on -->

### Charts

| Chart | Description |
| -------  | ------ |
| Secure guardrails adoption  | Percent of new findings shown to developers over the specified time period. An upward or stable trend is better. |
| Guardrails activity | This chart displays a breakdown of the status of findings shown to developers; whether they were ignored, fixed, or remained open. A greater **Fixed** value is better. |

## Most findings by project

A table providing a breakdown of findings for each project, grouped by product or severity. Lower values are better.

![Findings by project pane.](/img/dashboard-findings-by-project.png#sm-width-noborder)
_**Figure**. Findings by project; group them by product or severity._

## Mean time to remediate

<!-- check if title changes -->

![Mean time to remediate a finding.]/img/dashboard-mean-time-remediate.png)
_**Figure**. Mean time to remediate a finding._

A chart displaying the mean time to remediate a finding over the specified time period. Lower is better.

For a finding to be remediated, it must have any of the following statuses:

- Fixed
- Ignored
- Fixing
- Reviewing
