---
slug: view-triage
append_help_link: true
title: Triage and remediation
hide_title: true
description: Learn how to triage findings identified by Semgrep Secrets.
tags:
    - Semgrep Secrets
    - Semgrep AppSec Platform
---

# Triage secrets findings in Semgrep AppSec Platform

After each scan, your findings are displayed in Semgrep AppSec Platform's
**Secrets** page. The filters provided allow you to manage and triage your findings.

:::note Local scans
Findings from local scans are differentiated from their remote counterparts through their slugs. Remote repositories are identified as <span className="placeholder">  ACCOUNT_NAME/REPOSITORY_NAME</span>, while local repositories are identified as <span className="placeholder">local_scan/REPOSITORY_NAME</span>.
:::

## Default Secrets page view and branch logic

In Semgrep, a **single** finding may appear in several branches. These appearances are called **instances** of a finding. In Semgrep Secrets, the **latest instance**, or the finding from the most recent branch scanned, is displayed by default. This is because, if a Secrets finding is present in **any branch**, even a non-primary (default) branch, it is considered [valid](/semgrep-secrets/conceptual-overview#validate-secrets).

## Triage findings

You can triage secrets-related findings in Semgrep AppSec Platform on the **Secrets** page. By default, all findings are displayed. A common triage workflow includes the following tasks:

1. Filtering for a particular characteristic of a finding, such as its **Validation status**, **Repository or Branch**, or **Type**.
2. Analyzing if the findings are true or false positives.
3. Applying a **triage state** to the filtered findings based on the analysis in step 2.
    1. Setting a finding as **Ignored** means that no action is undertaken and the finding is closed. Subsequent scans won't include this finding.
    2. Setting or retaining a finding as **Open** means that the finding is a true positive and needs to be fixed or resolved.
        1. Optional: You can create a ticket for **Linear, Jira, or Asana** to assign a developer to fix **Open** findings.

When commits are added to the PR or MR, Semgrep re-scans the PR or MR and detects if a finding is fixed. The finding is resolved automatically upon scanning. Users do not need to set a finding as **Fixed** manually.

## Common filtering use cases

You can find and perform bulk operations through filtering; [all filter operations](/semgrep-secrets/getting-started#filter-findings) are available to you on the **Secrets** page.

| Task | Steps |
| ---- | ----- |
| Viewing valid findings | Under **Validation**, click **⚠️Confirmed valid**. |
| View findings in a specific project or branch |1. Under **Projects**, select a repository from the drop-down menu. <br /> 2. Under **Branches**, select a branch from the drop-down menu. |
| View findings of a specific type of secret, such as **personal token** or **password**. | Under **Type**, select a type of secret.
| View findings of a specific severity | Under **Severity**, select a value. |

![Secrets page and relevant triaging elements.](/img/secrets-triage.png#bordered)
**_Figure._** Secrets page and relevant triaging elements: (a) All available filters; (b) Bulk selection toggle; (c) Bulk triage button.

You can triage findings in bulk by performing the following steps:

1. Begin by ensuring that you display all **Open** findings.
2. Apply filters with as much specificity as possible. You may have to perform bulk triage several times. By starting with the most specific cases, and closing the findings from those specific cases, you are able to narrow down findings as you work from specific to broad filter criteria.
3. Click the bulk select check ox.
4. Click **Triage**, then your selected triage state, typically **Ignore**.
5. Optional: Repeat this procedure to triage all open findings.


## Receive findings in through PR and MR comments

In addition to viewing your results in Semgrep AppSec Platform, you can set up PR or MR comments from Semgrep, which allows you to view findings-related information directly in your pull requests and merge requests.

To receive PR or MR comments, ensure that:

* You have set up [comments](/category/pr-or-mr-comments) as part of your core deployment.
* You have defined which rules should be in Allow, Comment, or Block mode in the [Policies](/semgrep-secrets/policies) page.

![Semgrep Secrets finding in a PR comment](/img/secrets-pr-comment.png#bordered)
**_Figure._** Semgrep Secrets finding in a PR comment.

:::info
Define which rules should be in allow, comment, or block mode in the [Policies](/semgrep-secrets/policies) page.
:::

<!-- ## Create tickets

You can create tickets in Jira, Linear, or Asana for secrets-related findings. See [<i class="fa-regular fa-file-lines"></i> Ticketing](semgrep-appsec-platform/ticketing/). -->
