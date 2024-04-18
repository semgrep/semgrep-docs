---
slug: view-triage
append_help_link: true
title: View and triage secrets findings
hide_title: true
description: Learn how to view and triage findings identified by Semgrep Secrets.
tags:
    - Semgrep Secrets
---

# View and triage secrets in Semgrep Cloud Platform

After each scan, your findings are displayed in Semgrep Cloud Platform's
**Secrets** page.


:::note Local scans
Findings from local scans are differentiated from their remote counterparts through their slugs. Remote repositories are identified as <span className="placeholder">  ACCOUNT_NAME/REPOSITORY_NAME</span>, while local repositories are identified as <span className="placeholder">local_scan/REPOSITORY_NAME</span>.
:::

## View your findings

Semgrep Cloud Platform offers a variety of filters to help you narrow down the
list of findings. The following sections describe what filters are available to
you.

### Triage status

| Status | Description |
| -----------  | ------------ |
| **Open** | Findings are open by default. A finding is open if it was present the last time Semgrep scanned the code and it has not been ignored. An open finding represents a match between the code and a rule that is enabled in the repository. Open findings require action, such as rewriting the code to eliminate the detected vulnerability. |
| **Ignored** | Findings that are ignored are present in the code, but have been labeled as unimportant. Ignore findings that are false positives or deprioritized issues. |
| **Fixed** | Fixed findings were detected in a previous scan, but are no longer detected in the most recent scan of that same branch due to changes in the code. |

### Severity

Severity is assigned based on how sensitive or crucial the exposed web service is. Possible values include:

* High
* Medium
* Low

### Validation

Refers to whether or not a secret is active and can be used to grant resources or authentication, or if a secret is inactive.

| Validation | Description |
| -----------  | ------------ |
| Confirmed valid | Semgrep made an API call using the secret and it returned an HTTP response of 200 or similar and granted authentication. |
| Confirmed invalid | Semgrep made an API call using the secret and it returned an HTTP response of 403 or similar. |
| Validation error | Semgrep made an API call but it returned and HTTP response of 400 or similar; a server error, such as a timeout, occurred. The Semgrep Team recommends manually reviewing the finding. |
| No validator | Semgrep does not perform any validation on this finding. You must manually review the finding. |

### Repository visibility

Refers to whether or not the repository is a public repository or private. This is detected through your source code manager.

:::info
Semgrep supports visibility detection only for GitHub repositories of any plan.
:::

| Repository visibility | Description | 
| -----------  | ------------ |
| Public | Repository access doesn't require authentication; at a minimum, it can be viewed by anyone. |
| Private | Repository access requires authentication. |
| Unknown | Semgrep Secrets is unable to detect your repository visibility. This is typically assigned to: <ul><li>Scans from local developer machines.</li><li>Scans from any non-GitHub source code manager, such as GitLab.</li></ul> |

### Type

Refers to the type of secret, such as **private key**, or the web service that makes use of the secret, such as **Sendgrid** or **Stripe**.

### Project

A repository that's been onboarded to Semgrep for scanning.

### Branch

A branch of any Project.

## Triage findings

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


## Receive findings in through PR and MR comments

In addition to viewing your results in Semgrep Cloud Platform, you can set up PR or MR comments from Semgrep, which allows you to view findings-related information directly in your pull requests and merge requests.

To receive PR or MR comments, ensure that:

* You have set up [comments](/category/pr-or-mr-comments/) as part of your core deployment.
* You have defined which rules should be in Allow, Comment, or Block mode in the [Policies](/semgrep-secrets/policies) page.

![Semgrep Secrets finding in a PR comment](/img/secrets-pr-comment.png#bordered)
**_Figure._** Semgrep Secrets finding in a PR comment.

:::info
Define which rules should be in allow, comment, or block mode in the [Policies](/semgrep-secrets/policies) page.
:::

<!-- ## Create tickets

You can create tickets in Jira, Linear, or Asana for secrets-related findings. See [<i class="fa-regular fa-file-lines"></i> Ticketing](semgrep-cloud-platform/ticketing/). -->
