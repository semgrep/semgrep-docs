---
slug: search-specific-findings
title: Search for specific findings
hide_title: true
description: Learn to retrieve a rule ID and apply it to filter for findings from a specific rule across all your projects.
tags:
  - Semgrep Supply Chain
  - Semgrep Secrets
---

# Search for specific findings by rule or CVE

Semgrep provides a variety of filters through which you can narrow down your search for specific findings. In some cases, you may want to search by rule for Semgrep Code or CVE for Supply Chain.

This guide walks you through finding the specific rule ID in Semgrep, then applying it as a filter. You can then combine this filter with other facets, such as **Projects** or **Status**.

This method can be used for Semgrep Code and Supply Chain.

## Retrieve the Rule ID

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Navigate to either the **Code** or **Supply Chain** page depending on your intended finding.
    1. For Semgrep Code findings, the Rule ID is the heading of each group of findings. Copy this value.
    ![Rule ID and Rule filter placement.](/img/code-ruleID.png)
    1. For Semgrep Supply Chain findings, the **CVE** or **MAL** id is indicated on the upper-right heading of each group of findings. Copy this value. Add a dash between the prefix, such as MAL or CVE, and the numerical value.
    ![Rule ID and Rules filter placement.](/img/sca-ruleid.png)
1. Enter the value in the **Rule** filter for Semgrep Code, or **Rules** filter for Semgrep Supply Chain. This narrows down the findings to that specific rule.
1. You can continue adding values to the rules filter. The rules filter includes findings from **any** of the values indicated.

From there, you can apply any other filters as necessary.
