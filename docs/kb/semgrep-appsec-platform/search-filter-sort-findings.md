---
description: Learn how to search for, filter for, and sort findings in Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Supply Chain
 - Semgrep Secrets
---

# Search, filter, and sort findings in Semgrep AppSec Platform

Semgrep AppSec Platform provides you with an overview of the findings identified by Semgrep Code, Supply Chain, and Secrets. Each product-specific page provides you with filters to narrow down the list of findings shown to you. For example, you can filter for Semgrep Code findings that are flagged as false positives, or you can filter for Semgrep Supply Chain findings based on CVE.

Learn more about the filters Semgrep offers using the following articles:

- [Semgrep Code filters](/semgrep-code/findings#filter-findings)
- [Supply Chain filters](/semgrep-supply-chain/findings#filter-findings)
- [Secrets filters](/semgrep-secrets/view-triage#default-secrets-page-view-and-branch-logic)

The following sections of this article explain how you can use filters to identify a specific subset of findings.

## Identify Semgrep Code findings flagged as false positives

Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), and navigate to **Code**. You can view findings with a status of **Ignored > False positive** from either the default **Production backlog** view or the **Pre-production** view. The **Production backlog** displays all Semgrep Code findings, while **Pre-production** displays the findings about which Semgrep left comments.

## Identify Semgrep Code findings flagged by Assistant as false positives

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Navigate to **Code**.
1. Find the **Assistant autotriage** filter, and click **False positive**. 

## Search for specific findings by rule or CVE

This guide walks you through finding the specific rule ID in Semgrep, then applying it as a filter. You can then combine this filter with other filters, such as **Projects** or **Status**.

This method can be used for Semgrep Code and Supply Chain.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to either the **Code** or **Supply Chain** page depending on which type of finding you're looking for.
    1. For Semgrep Code findings, the Rule ID is the heading of each group of findings. Copy this value.
    ![Rule ID and Rule filter placement.](/img/code-ruleID.png#md-width)
    _**Figure**. Rule ID and Rule filter placement._
    2. For Semgrep Supply Chain findings, the **CVE** or **MAL** ID is shown on the upper-right heading of each group of findings. Copy this value. Add a dash between the prefix, such as MAL or CVE, and the numerical value.
    ![Rule ID and Rules filter placement.](/img/sca-ruleid.png#md-width)
    _**Figure**. Rule ID and Rules filter placement._
3. Enter the value you copied in the **Rule** filter for Semgrep Code or **Rules** filter for Semgrep Supply Chain. This narrows down the findings to that specific rule or CVE.
4. You can continue adding values to the rules filter. The rules filter includes findings from **any** of the values indicated.

From there, you can apply any other filters as necessary.
