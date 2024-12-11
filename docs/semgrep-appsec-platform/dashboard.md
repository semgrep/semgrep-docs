---
slug: dashboard
title: Dashboard
hide_title: true
description: Use the Semgrep dashboard to gain an overview of your organization's security posture, including the deployment of guardrails.
tags:
  - Semgrep AppSec Platform
  - Secure guardrails
---

# Dashboard

The Semgrep dashboard is an overview of your organization’s security posture based on data aggregated within Semgrep AppSec Platform. It helps you:

- Evaluate your AppSec program, enabling you to know your current security risk.
- Assess the deployment and adoption of **[secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep)** to your organization.
- Become aware of trends and opportunities that you can use to improve your security posture.
- Quickly filter data granularly for all the charts on the page and view priority findings.
- Export the information as a report as a PDF or CSV file.

![Dashboard page](/img/dashboard-fold.png)
_**Figure**. The dashboard page. Hover over the charts to view data for that point in time._

## Dashboard overview

The dashboard is divided into several sections:

<table>
<thead>
<tr>
<td><b>Section</b></td>
<td><b>Description</b></td>
</tr>
</thead>
<tbody>
<tr>
  <td>Today's recommended priority findings</td>
  <td>Provides a count of [priority](#recommended-priority) findings for all of your Semgrep products. Clicking any of the values takes you to the product's Findings page with those filters applied.</td>
</tr>
<tr>
<td>Reporting summary top bar</td>
<td>
Sets the filters for all the data in the page **except** for **Today's recommended priority findings**.
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

## Export reports

To generate reports from the current dashboard view, click **Dashboard > <i class="fa-regular fa-download"></i> Download**.

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
  - Semgrep product or type of scan (SAST, SCA, or Secrets)
  - Project (repository)
  - [Recommended priority](#recommended-priority) toggle

:::info
- By default, the Dashboard displays data for projects you have access to. Admins can view findings from all the projects in the organization. See the [Teams documentation](/deployment/teams#teams-beta) for more information.
- It can take up to a day **(24 hours)** for the Dashboard to correctly update and remove findings if you have recently deleted a project.
:::

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
- Teams

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
| Total opened      | Findings set to **Open**, **Fixing**, or **Reviewing** during the time period that **remained** in any of those states until the end of the time period. |
| Total fixed    | Total number of **Fixed** findings during the time period that **remained** fixed until the end of the time period. |
| Total ignored  | Total number of **Ignored** findings during the time period that **remained** ignored until the end of the time period. |
| Total net new  | The number of new **Open**, **Fixing**, or **Reviewing** findings that were **not** fixed or ignored within the specified time period. Lower values are better. This is the difference between the number of **Open**, **Fixing**, or **Reviewing** findings at the beginning of the time period and the end of the time period. |

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
It is recommended to prioritize triage and remediation for the top projects listed in this table, especially if the priority filters are enabled.
:::

![Findings by project pane.](/img/dashboard-findings-by-project.png#sm-width)
_**Figure**. Findings by project; group them by product or severity._

## Median open age

![Median open age of a finding.](/img/dashboard-mean-time-remediate.png#sm-width)
_**Figure**. Median open age of a finding._

A chart displaying the median open age of a finding in **days** over the specified time period. Lower is better.

For a finding to be remediated, it must have any of the following statuses:

- Fixed
- Ignored
