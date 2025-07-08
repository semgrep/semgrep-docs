---
description: Learn how to search for, filter for, and sort findings in Semgrep AppSec Platform.
tags:
 - Semgrep AppSec Platform
 - Semgrep Code
 - Semgrep Supply Chain
 - Semgrep Secrets
---

# Search for, filter for, and sort findings in Semgrep AppSec Platform

Semgrep AppSec Platform provides you with an overview of the findings identified by Semgrep Code, Supply Chain, and Secrets. Each product-specific page provides you with filters to narrow down the list of findings shown to you. For example, you can filter for Semgrep Code findings that are flagged as false positives, or you can filter for Semgrep Supply Chain findings based on CVE.

Learn more about the filters Semgrep offers using the following articles:

- [Semgrep Code filters](/semgrep-code/findings#filter-findings)
- [Supply Chain filters](/semgrep-supply-chain/view-export#filter-findings)
- [Secrets filters](/semgrep-secrets/view-triage#default-secrets-page-view-and-branch-logic)

The following sections of this article explain how you can use filters to identify a specific subset of findings.

## Semgrep Code

### Identify findings flagged as false positives

Log in to Semgrep AppSec Platform, and navigate to **Code**. You can view findings with a status of **Ignored > False positive** from either the default **Production backlog** view or the **Pre-production** view. The **Production backlog** displays all Semgrep Code findings, while **Pre-production** displays the findings about which Semgrep left comments.

### Identify findings flagged by Assistant as false positives

Log in to Semgrep AppSec Platform, and navigate to **Code**. Find the **Assistant autotriage** filter, and click **False positive**. 

## Supply Chain

### Filter for findings by CVE

Log in to Semgrep AppSec Platform, and navigate to **Supply Chain**. Find the **Rules** filter, and enter the CVE value in which you're interested. Click the rule related to the CVE to see only the related findings.
