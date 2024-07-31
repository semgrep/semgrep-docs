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

The Semgrep dashboard (beta) is an overview of your organization’s security posture based on data aggregated within Semgrep AppSec Platform. It helps you:

- Evaluate your AppSec program, enabling you to know your current security risk.
  - The dashboard beta includes assessing the deployment and adoption of **[secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep)** to your organization.
- Become aware of trends and opportunities that you can use to improve your security posture.
- Quickly filter data granularly for all the charts on the page and view priority findings.

:::note
This feature is in **private beta**. To request access, contact your Technical Account Manager or your Account Executive and let them know you'd like to join the dashboard beta.

Beta-exclusive features include:

- Improved filtering, including a [recommended priority](#recommended-priority) set of filters to bring to your attention the most important findings quickly.
- Graphs and charts that track:
    - Developer engagement through secure guardrails.
    - Changes in the number of open findings in the production backlog, which lets you know if your team is addressing findings or if the number of new findings is decreasing over time.
    - The average time it takes to close a finding.
:::


![Dashboard (beta) page](/img/dashboard-fold.png)
_**Figure**. The dashboard (beta) page. Hover over the charts to view data for that point in time._

## Dashboard overview

The dashboard is divided into several panes:

<table>
<thead>
<tr>
<td>Pane</td>
<td><b>Description</b></td>
</tr>
</thead>
<tbody>
<tr>
  <td>Today's recommended priority findings</td>
  <td>Provides a count of [priority](#recommended-priority) findings for all of your Semgrep products. Clicking any of the values takes you to the product's Findings page with those filters applied.</td>
</tr>
<tr>
<td>Filters and configuration</td>
<td>
Sets the filters for all the data in the page except for the **Today's recommended priority findings** pane.
</td>
</tr>
<tr>
<td>Production backlog</td>
<td>
Displays data about all the findings detected in your primary or default branch and helps you answer the following questions:
- How is my security posture doing over time?
- Is my backlog decreasing or increasing?
- Is the team addressing findings faster than new findings are coming in?
</td>
</tr>
<tr>
<td>[Secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep)</td>
<td>
Displays data relevant to the deployment and adoption of secure guardrails. It helps address the following:
- How many vulnerabilities did Semgrep prevent from entering production over time?
- Am I effectively introducing guardrails to my developers?
- Of the issues shown to developers, are they being fixed, or are they being ignored?
</td>
</tr>
<tr>
<td>Most findings by project</td>
<td>
Lists projects arranged by most open findings to least, grouped by **product** or **severity**. Helps answer the following:
- Which of my projects have the most findings in a particular product area?
- Which of my projects have the most findings for a particular severity?
</td>
</tr>
<tr>
<td>Median open age</td>
<td>
A graph showing the middle age of all Open findings, grouped by product or severity. Half of the open findings are older than this age, and half are newer. Helps you answer:
- What is the amount of time a finding remains open, by product or by severity?
</td>
</tr>
</tbody>
</table>

:::tip
Use the **filters** to quickly generate views for a single Semgrep product or all products.

When viewing data for a single Semgrep product, you can't group by product in **Most findings by project** and **Median open age**.
:::
## Triage states

The following triage states are displayed:

- Open
- Ignored
- Fixed

Additional triage states, such as **Fixing** or **Reviewing**, are considered **Open**.

## Filters and configuration

Use the filters to gain a top-level view or zoom in to a single product, specific period of time, or other slice of data. Create quarterly overviews or recent incident statements for various AppSec stakeholders.

Configurations set here apply to the entire page.

The following quick filters are visible on the page:
  - Time period
  - Project (repository)
  - Semgrep product or type of scan (SAST, SCA, or Secrets)
  - [Recommended priority](#recommended-priority) toggle

To access **all** filters:

1. Click **All filters** to open the filter drawer.
1. Turn off the **<i class="fa-solid fa-toggle-large-on"></i> Recommended priority** toggle.

This displays the following filters in the filter drawer:

- [Severity](/writing-rules/rule-syntax#required)
- [Confidence](/contributing/contributing-to-semgrep-rules-repository#confidence)
- [Reachability](/semgrep-supply-chain/triage-and-remediation#filters)
- [Validation](/semgrep-secrets/getting-started#validation)
- Time period
- Product
- Project
- Tags

### Recommended priority

This refers to any finding that is **Critical** or **High** severity in **addition** to being:

- [High confidence](/contributing/contributing-to-semgrep-rules-repository#confidence) - if the finding is from Semgrep Code.
- [Reachable](/semgrep-supply-chain/triage-and-remediation#filters) - if the finding is from Semgrep Supply Chain.
- [Valid](/semgrep-secrets/getting-started#validation) - if the finding is from Semgrep Secrets.

By default, **<i class="fa-solid fa-toggle-large-on"></i> Recommended priority** filters are enabled.

If you choose to turn off recommended priority filters, **all** findings are displayed.

## Production backlog

This pane displays analytics related to findings detected in your **primary or default branch**. This typically means that the finding, usually a security issue, has made it to production environments.

### Key metrics

| Key metrics    | Description |
| -------------- | ------ |
| Total new      | New **Open**, **Fixing**, or **Reviewing** findings, including findings that were fixed or ignored within the time period. |
| Total fixed    | Total **Fixed** findings. |
| Total ignored  | Total **Ignored** findings. |
| Total net new  | New **Open**, **Fixing**, or **Reviewing** findings that were **not** fixed or ignored within the specified time period. Lower values are better. |

:::tip
A low or 0 value for **Total net new** is ideal as it indicates that findings are being triaged or resolved within the time period.
:::
### Charts

| Chart | Description |
| -------  | ------ |
| Open backlog         | This tracks the total findings from each scan and displays them. Lower values are better. |
| Backlog activity | Displays the number of new, net new, fixed, and ignored findings. A greater **Fixed** value is better. |

## Secure guardrails

This provides an overview of how secure guardrails in **PR or MR comments** are used in your organization. Other guardrail interfaces, such as the IDE or `pre-commit`, are not counted in this section.

![Secure guardrails pane](/img/dashboard-guardrails.png)
_**Figure**. Secure guardrails pane. Hover over the charts to view data for that point in time._

### Key metrics

<!-- vale off -->
| Key metrics    | Description |
| -------------- | ------ |
| Findings shown to devs      | Number of findings shown to developers in PR or MR comments (the numerator) against the total findings count (denominator). An upward or stable trend is better. |
| Findings fixed before backlog      | Number of findings that were fixed before they could be detected in a default branch or production backlog (numerator) against the total findings count in the specified time period. An upward or stable trend is better. |

<!-- vale on -->

### Charts

| Chart | Description |
| -------  | ------ |
| Secure guardrails adoption  | Percent of new findings shown to developers over the specified time period. An upward or stable trend is better. |
| Guardrails activity | This chart displays a breakdown of the status of findings shown to developers; whether they were ignored, fixed, or remained open. A greater **Fixed** value is better. |

## Most findings by project

A table listing projects from most open findings to least, grouped by product or severity. Lower values are better.

:::tip
It is recommended to prioritize triage and remediation on the top projects listed in this table, especially if the priority filters are enabled.
:::

![Findings by project pane.](/img/dashboard-findings-by-project.png#sm-width-noborder)
_**Figure**. Findings by project; group them by product or severity._

## Median open age

![Median open age of a finding.](/img/dashboard-mean-time-remediate.png#sm-width-noborder)
_**Figure**. Median open age of a finding._

A chart displaying the median open age of a finding in **days** over the specified time period. Lower is better.

For a finding to be remediated, it must have any of the following statuses:

- Fixed
- Ignored
