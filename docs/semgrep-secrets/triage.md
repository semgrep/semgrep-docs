---
slug: triage
append_help_link: true
title: Triage secrets findings
hide_title: true
description: Learn how to triage findings identified by Semgrep Secrets.
tags:
    - Semgrep Secrets
---

# Triage secrets in Semgrep Cloud Platform

You can triage secrets-related findings in Semgrep Cloud Platform on the **Secrets** page. By default, all findings are displayed. A common triage workflow includes the following tasks:

1. Filtering for a particular characteristic of a finding, such as its **Validation status**, **Repository or Branch**, or **Type**.
2. Analyzing if the findings are true or false positives.
3. Applying a **triage state** to the filtered findings based on the analysis in step 2.
    1. Setting a finding as **Ignored** means that no action is undertaken and the finding is closed. Subsequent scans won't include this finding.
    2. Setting or retaining a finding as **Open** means that the finding is a true positive and needs to be fixed or resolved.
        1. Optional: You can create a ticket for **Linear, Jira, or Asana** to assign a developer to fix **Open** findings.

When commits are added to the PR or MR, Semgrep re-scans the PR or MR and detects if a finding is fixed. The finding is resolved automatically upon scanning. Users do not need to set a finding as **Fixed** manually.

## Common filtering use cases

You can find and perform bulk operations through filtering; all filter operations are available to you on the **Secrets** page.

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
