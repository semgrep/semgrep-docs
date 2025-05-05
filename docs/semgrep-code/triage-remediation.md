---
slug: triage-remediation
append_help_link: true
title: Triage and remediation
hide_title: false
toc_max_heading_level: 2
description: Learn how about Semgrep Code's triage status for findings and how to triage and remediate findings.
tags:
    - Semgrep Code
    - Semgrep AppSec Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Triage and remediate findings

import TriageStatuses from "/src/components/reference/_triage-states.mdx"
import TriageReason from "/src/components/reference/_triage-reason.mdx"
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import IgnoreIndividualFindingNoGrouping from "/src/components/procedure/_ignore-individual-finding-no-grouping.mdx"


This article shows you how to triage and manage findings identified by Semgrep Code using Semgrep AppSec Platform, including:

- **Fixing the issue detected.** This is Semgrep's primary goal. If the rule produces a **true positive** finding, such as a security issue, developers must change or address the code so that the rule no longer matches it.
- **Removing the rule or code that generated the finding.** There are cases where Semgrep scans a file it should ignore or scans the file with an irrelevant rule. You can [disable the rule](/semgrep-code/policies#disable-rules) from the **Policies** page or [add the file to the ignore list](/ignoring-files-folders-code).
- **Triaging the finding.** Deprioritize a finding if it's not useful or important through triage. Triage actions include ignoring and reopening a finding that was previously ignored. Triaging a finding to **ignore** is one method to handle **false positives** without changing a rule or your code.
<!-- - **Create a Jira ticket from the finding (for Enterprise/Team Tier users.)** For findings that require more extensive refactoring, users can create a ticket in Jira through Semgrep AppSec Platform to track its resolution. -->

Additionally, if you have Semgrep Assistant enabled, you receive AI-powered security recommendations to help you review, triage, and remediate your Semgrep findings, including:

- [Remediation advice](/semgrep-assistant/overview#remediation) and autofixes, or suggested fixes, shown in Semgrep AppSec Platform.
- Remediation guidance with step-by-step instructions on how to remediate the finding identified by Semgrep Code in every pull request or merge request comment Semgrep pushes
- [Component tagging](/semgrep-assistant/overview#component-tags) to help identify high-priority issues.

Semgrep Assistant can also [auto-triage findings](/semgrep-assistant/overview#auto-triage), suggesting whether a finding can safely be ignored, and [filter out potential false positives](/semgrep-assistant/overview#noise-filtering-beta) to help increase developer velocity.

## Triage statuses

**Triage** is the prioritization of a finding based on policies or criteria set by your team or organization, such as severity, coding standards, business goals, and product goals.

Semgrep AppSec Platform uses the logic specified in the table below to automatically mark findings as either fixed or removed when a finding is no longer present in the code. You can also manually ignore findings in Semgrep AppSec Platform directly through **triage** or **bulk triage**.

The triage statuses are as follows:

<TriageStatuses />

## Manage findings

The following sections show you have to manage your findings by:

* Fixing the underlying code
* Disabling a rule or a ruleset
* Ignoring a finding
* Reopening a finding

Note that some actions, such as ignoring and reopening findings, require different steps based on whether you have chosen **Group by Rule** or **No Grouping** when viewing your results on the **Findings** page.

![Screenshot of Semgrep AppSec Platform triage menu](/img/app-findings-triage.png#md-width)

### Fix a finding

To **fix a finding**, update or refactor the code such that the Semgrep rule pattern no longer matches the code.

### Disable a ruleset or a rule

<RemoveRuleset />

### Ignore findings

One way to handle **false positives** without changing the rule or your code is to set the finding's triage status to **ignore**.

<details>
<summary>Ignore findings in <b>Group by Rule</b> view</summary>

To **ignore findings** in the **Group by Rule** view:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Open** status to see all open findings.
2. Perform one of these steps:
    - To select more findings from the same rule, click the **Triage** button on the card of the finding.
    - To select individual findings reported by a rule, fill in the checkboxes of the finding, and then click the **Triage** button on the card of the finding.
3. Optional: Write a reason to describe why the finding was ignored.
4. Click **Ignore**.

</details>

<details>
<summary>Ignore findings in <b> No grouping</b> view</summary>

To **ignore individual finding** in the **No grouping** view, follow these steps:

<IgnoreIndividualFindingNoGrouping />

To **ignore multiple findings** in the **No grouping** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Open** status to see all open findings.
2. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select more findings by clicking on their checkboxes.
3. Click the **Triage** button.
4. Optional: Select a reason of why you are ignoring a finding. Choose one of the following options: **False positive**, **Acceptable risk**, **No time to fix**.
5. Select **Ignored** from the dropdown menu.
6. Click **Save**.

</details>

### Reopen findings

You can **reopen** a finding that you previously marked as **ignore** at any time.

<details>
<summary>Reopen findings in <b>Group by Rule</b> view</summary>

To **reopen findings** in the **Group by Rule** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select the **Ignored** or **Fixed** status to see all ignored or fixed findings.
2. Perform one of these steps:
    - To select more findings from the same rule, click the **Triage** button on the card of the finding.
    - To select individual findings reported by a rule, fill in the checkboxes for the finding, and then click the **Triage** button on the finding card.
3. Optional: Write a reason to describe why the finding was ignored.
4. Click **Reopen**.

</details>

<details>
<summary>Reopen findings in <b>No grouping</b> view</summary>

To **reopen individual findings** in the No grouping view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Ignored** or **Fixed** status to see all ignored or fixed findings.
2. Next to a finding you want to ignore, click the **Reopen** <i class="fa-regular fa-chevron-down"></i>.
3. Optional: Add a note.
4. Click **Save**.

To **reopen multiple findings** in the **No grouping** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select the **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes.
1. Click the **Triage** button.
1. In the **Triage state** dropdown menu, select **Reopened**.
1. Click **Save**.

</details>

## Triage findings through PR and MR comments

Triage your Semgrep AppSec Platform findings displayed as comments in PRs and MRs by replying with another comment.

<Tabs
    defaultValue="gh"
    values={[
        {label: 'Azure DevOps', value: 'ado'},
        {label: 'Bitbucket', value: 'bb'},
        {label: 'GitHub', value: 'gh'},
        {label: 'GitLab', value: 'gl'}
    ]}
>

<TabItem value='ado'>

### Prerequisites

- You have one or more repositories hosted by Azure DevOps Cloud.
- You have completed a [Semgrep core deployment](/deployment/core-deployment).

### Enable triage through Azure DevOps PR comments

1. Sign in to Semgrep, and go to your organization's [Settings](https://semgrep.dev/orgs/-/settings) page.
2. Under **Code (SAST)**, click the **Triage via code review comments** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn on this feature.

### Triage a finding

1. Find an open comment created by Semgrep in your pull request:
    ![Azure DevOps PR comment with Semgrep triage options](/img/ado-pr-comment.png#md-width)
2. In a subsequent comment, reply with the action you want to take. You must provide a reason to help the reader understand why the finding has been triaged as ignored:
    <TriageReason />

Triaging a finding as **Ignored** through a comment in Azure DevOps changes the status of the finding to **Ignored** in Semgrep AppSec Platform. However, the Azure DevOps conversation itself is **not** automatically resolved by this process.

</TabItem>

<TabItem value='bb'>

<!-- tk -->

### Prerequisites

- You have one or more repositories hosted by Bitbucket Cloud Premium, or Bitbucket Data Center v8.8 or above.
- You have completed a [Semgrep core deployment](/deployment/core-deployment). Particularly, you must have a successful connection to Bitbucket.

### Enable triage through Bitbucket PR comments

1. Sign in to Semgrep, and go to your organization's [Settings](https://semgrep.dev/orgs/-/settings) page.
2. Under **Code (SAST)**, click the **Triage via code review comments** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn on this feature.

### Triage a finding

1. Find an open comment created by Semgrep AppSec Platform in your pull request:
    ![Semgrep AppSec Platform PR comment in Bitbucket](/img/bb-triage-by-pr.png#md-width)
2. In a subsequent comment, reply with the action you want to take. You must provide a reason to help the reader understand why the finding has been triaged as ignored:
    <TriageReason />

Triaging a finding as **Ignored** through a comment in Bitbucket changes the status of the finding to **Ignored** in Semgrep AppSec Platform. However, the Bitbucket conversation itself is **not** automatically resolved by this process.

</TabItem>

<TabItem value='gh'>

### Prerequisites
- A **private** GitHub Free or Team cloud-hosted repository or GitHub Enterprise repository. This feature is not enabled for public GitHub Cloud repositories.
- You have completed a [Semgrep core deployment](/deployment/core-deployment).

### Enable triage through GitHub PR comments:

1. In Semgrep AppSec Platform, go to your organization's [Settings](https://semgrep.dev/orgs/-/settings) page.
2. Under **Code (SAST)**, click the **Triage via code review comments** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn on this feature.

### Triage a finding

1. Find an open comment created by Semgrep AppSec Platform in your pull request or merge request:
    ![Screenshot of Semgrep AppSec Platform comment in GitHub](/img/semgrep-app-comment-github-beta.png#md-width)
2. In a subsequent comment, reply with the action you want to take. You must provide a **reason** to help the reader understand why the finding has been triaged as **ignored**:
    <TriageReason />

Semgrep supports older versions of this functionality that used the following commands:
- <code>/semgrep ignore <span className="placeholder">&lt;REASON&gt;</span></code> - triage a finding as **Ignored**.
- <code>/semgrep open <span className="placeholder">&lt;REASON&gt;</span></code> - reopen a finding that has been triaged as **Ignored**.

Triaging a finding as **Ignored** through a comment in GitHub changes the status of the finding to **Ignored** in Semgrep AppSec Platform. However, the GitHub conversation itself is **not** automatically resolved by this process.

</TabItem>
<TabItem value='gl'>

### Prerequisites
- A repository hosted by GitLab. Semgrep supports the use of both GitLab.com and GitLab self-managed plans.
- You have completed a [Semgrep core deployment](/deployment/core-deployment).

### Enable triage through GitLab MR comments

1. In Semgrep AppSec Platform, go to your organization's [Settings](https://semgrep.dev/orgs/-/settings) page.
2. Under **Code (SAST)**, click the **Triage via code review comments** <i class="fa-solid fa-toggle-large-on"></i> toggle to turn on this feature.

### Triage a finding

1. Find an open comment created by Semgrep AppSec Platform in your pull request or merge request:
    ![Screenshot of Semgrep AppSec Platform comment in GitLab](/img/semgrep-app-comment-gitlab.png#md-width)

2. In a subsequent comment, reply with the corresponds with the action you want to take. If necessary, ensure that you substitute the colored placeholder `<REASON>` with text to help the reader understand why the finding has been triaged as **ignored**:
    <TriageReason />

Triaging a finding as **Ignored** through a comment in GitLab changes the status of the finding to **Ignored** in Semgrep AppSec Platform. However, the GitLab conversation itself is **not** automatically resolved by this process.

</TabItem>
</Tabs>

## Triage findings in bulk through the Semgrep API

Semgrep provides an API endpoint you can use to triage findings in bulk, either by passing a list of `issue_ids` or filter query parameters to select findings. You must also specify an `issue_type`, such as `sast` or `sca`, and either  `new_triage_state` or `new_note`. Refer to [<i class="fas fa-external-link fa-xs"></i> Bulk triage API documentation](https://semgrep.dev/api/v1/docs/#tag/TriageService).

## Reduce the number of false positive findings

* One way to address false positives is to improve the rule. Create [test cases](/docs/writing-rules/testing-rules) to ensure that the rule performs as intended.
* If a rule authored by the Semgrep team, available on the Registry, is useful, but captures too many false positives, you can reach out to [Support](/support). This helps Semgrep's rule-writing efforts and improves the quality of rules that you run.
* You can report rules with a high false positive rate from your source code manager (SCM) if you [enable Semgrep AppSec Platform to leave comments in PRs or MRs](/category/pr-or-mr-comments). Semgrep AppSec Platform provides a link after each comment for users to indicate if the finding is a false positive.
* Semgrep Assistant's [noise filtering](/semgrep-assistant/overview#noise-filtering-beta) feature can minimize the number of false positives shown to developers.
