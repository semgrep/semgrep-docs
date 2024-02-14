---
slug: findings2
append_help_link: true
title: Findings, v2
hide_title: true
description: Learn how to use Semgrep Code's Findings page in Semgrep Cloud Platform to manage your scan results.
tags:
  ## Semgrep Cloud Platform
  ## Semgrep Code
---

Semgrep Cloud Platform's **Findings** page displays all findings identified by Semgrep Code.

## View findings

To access the Findings page, [log into Semgrep Cloud Platform](https://semgrep.dev/login) and click **[Code](https://semgrep.dev/orgs/-/findings)**.

## Group findings

By default, Semgrep displays all findings ungrouped. To group all of the findings by the rule Semgrep used to match the code, toggle to **Group by Rule** using the drop-down menu in the header.

## Filter for findings

Semgrep offers multiple filters you can use to identify groups of findings for ease in triaging and identifying related groups of issues. The following criteria are available for filtering:

| Filter                 | Description  |
| ---------------------  | ------------ |
| **Projects**           | Filter by codebases connected to Semgrep Cloud Platform. |
| **Status**             | Filter the triage state of a finding. Refer to the [following table](#triaging-findings) to understand triage states. |
| **Category**           |  Filter by rule categories, such as `security`, `correctness`, and `maintainability`. You can select more than one category at a time. |
| **Severity**           | Filter by the severity of a finding. Possible values: <ul><li>Low</li><li>Medium</li><li>High</li></ul> |
| **Component**          | Filter by Semgrep Assistant component tags. Semgrep Assistant uses GPT-4 to categorize a finding based on its function, such as payments, user authentication, and infrastructure. |
| **Confidence**         | Filter by the likelihood of the rule to detect true positives. The higher the confidence the more true positives the rule may detect. |
| **Recommendation**     | Filter by recommendation offered by Semgrep Assistant's auto-triage feature. Possible values: <ul><li>Fix</li><li>Ignore</li></ul> |
| **Action**             | Filter by monitoring, commenting, or blocking rules in your Policies. |
| **Rule**               | Filter by rules that are included in your Policies page. You can select more than one rule or ruleset at a time for filtering. |
| **Ruleset**            | Filter by name of the ruleset where rules that matched the code belong. More than one rule or ruleset can be selected for filtering. |
| **Branch**             | Filter by findings in different Git branches. |

:::tip
You can identify findings categorized under **Security** by its badge.
![Screenshot of security badge](/img/findings-security-badge.png)
:::


## View a specific finding

## Semgrep Assistant

## Triage findings

## Deduplication

## Useful information (retention periods, etc.)

  ### Additional references