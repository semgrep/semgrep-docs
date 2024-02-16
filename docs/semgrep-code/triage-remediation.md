---
slug: triage-remediation
append_help_link: true
title: Triage and remediate Semgrep Code findings
hide_title: true
description: Learn how to triage and remediate Semgrep Code findings.
tags:
  - Semgrep Cloud Platform
  - Semgrep Code
---

# Triage and remediate Semgrep Code findings

import TriageStatuses from "/src/components/reference/_triage-states.mdx"
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import IgnoreIndividualFindingNoGrouping from "/src/components/procedure/_ignore-individual-finding-no-grouping.mdx"
import MoreHelp from "/src/components/MoreHelp"

Semgrep Code generates a finding when a rule matches a piece of code in your codebase. You can view your results in Semgrep Cloud Platform on the [**Findings** page](https://semgrep.dev/orgs/-/findings), and with that information, you can:

- **Fix the issue detected by the finding.** This is Semgrep's primary goal. In this case, the rule produces a **true positive** finding (such as a security issue) as intended and developers must change or address the code such that the rule no longer matches it.
- **View the Semgrep rule and the matching code.** For developers aiming to understand their team's security posture, Semgrep provides a top-level report view through the Dashboard and a list view of findings in the Findings page that can be filtered by repository, rule, branch, or triage action.
- **Triage the finding.** If the finding is not useful or important, deprioritize it through triage. Triage actions include ignoring and reopening. Triaging a finding to ignore it is one method to handle **false positives** without changing the rule or code. To triage a finding, see [Managing finding status](#managing-finding-status)
- **Remove the rule or code that generated the finding.** There are cases where Semgrep scans a file not meant for scanning or when a rule is irrelevant. You can disable the rule from the Policies page or add the file to the ignore list. To disable a rule, see [Disabling rules](/semgrep-code/policies/#disabling-rules).
<!-- - **Create a Jira ticket from the finding (for Enterprise/Team Tier users.)** For findings that require more extensive refactoring, users can create a ticket in Jira through Semgrep Cloud Platform to track its resolution. -->

:::tip
* An additional method to address false positives is to improve the rule. Create [test cases](/docs/writing-rules/testing-rules) to ensure that the rule performs as intended.
* If a rule from Semgrep Registry is useful but also captures too many false positives, you can reach out to support@semgrep.dev. This helps rule-writing efforts and improves the quality of rules that you run. 
* Additionally, you can report rules with a high false positive rate from your SCM if you have enabled Semgrep Cloud Platform to leave comments in PRs. Semgrep Cloud Platform provides a link after each comment for users to indicate if the finding is a false positive.
:::

## Triage findings

**Triaging** means prioritizing a finding based on a policy or criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

Semgrep Cloud Platform uses the logic specified in the table below to automatically mark findings as either fixed or removed when a finding is no longer present in the code. You can also ignore findings in Semgrep Cloud Platform directly through **triage** or **bulk triage**.

The triage statuses are as follows:

<TriageStatuses />

## Manage finding status

To manage, change, open, or ignore findings, follow the triage processes described below.
![Screenshot of Semgrep Cloud Platform triage menu](/img/app-findings-triage.png)<br />
*Figure 5* Findings page triage menu.

### Ignore findings

#### Ignore findings in the Group by Rule view

To **ignore findings** in the **Group by Rule** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Open** status to see all open findings.
1. Perform one of these steps:
    - To select more findings from the same rule, click the **Triage** button on the card of the finding.
    - To select individual findings reported by a rule, fill in the checkboxes of the finding, and then click the **Triage** button on the card of the finding.
1. Optional: Write a reason to describe why the finding was ignored.
1. Click **Ignore**.

#### Ignore findings in the No grouping view

To **ignore multiple findings** in the **No grouping** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Open** status to see all open findings.
1. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select more findings by clicking on their checkboxes.
1. Click the **Triage** button.
1. Optional: Select a reason of why you are ignoring a finding. Choose either: **False positive**, **Acceptable risk**, **No time to fix**
1. Select **Ignored** from the dropdown menu.
1. Click **Save**.

#### Ignore individual findings in the No grouping view

To **ignore individual finding** in the **No grouping** view, follow these steps:

<IgnoreIndividualFindingNoGrouping />

### Reopen findings

#### Reopen findings in the Group by Rule view

To **reopen findings** in the **Group by Rule** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select the **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Perform one of these steps:
    - To select more findings from the same rule, click the **Triage** button on the card of the finding.
    - To select individual findings reported by a rule, fill in the checkboxes of the finding, and then click the **Triage** button on the card of the finding.
1. Optional: Write a reason to describe why the finding was ignored.
1. Click **Reopen**.

#### Reopen multiple findings in the No grouping view

To **reopen findings** in the **No grouping** view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select the **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes.
1. Click the **Triage** button.
1. In the **Triage state** dropdown menu, select **Reopened**.
1. Click **Save**.

#### Reopen individual findings in the No grouping view

To **reopen individual findings** in the No grouping view, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Next to a finding you want to ignore, click the **Reopen** <i class="fa-regular fa-chevron-down"></i>.
1. Optional: Add a note.
1. Click **Save**.

### Fix a finding

To **fix a finding**:

1. Update, or refactor the code such that the Semgrep rule pattern no longer matches the code.

### Removing rulesets

<RemoveRuleset />

## Ignore findings through GitHub PR comments

Triage your Semgrep Cloud Platform findings displayed as comments in GitHub PRs by replying with another comment.

:::info Prerequisites
- A **private** GitHub.com repository. This feature is not enabled for public GitHub.com repositories or GitHub Enterprise public and private repositories.
- GitHub Semgrep Cloud Platform installed in the repository that is also added as a project in Semgrep Cloud Platform. For more information, see [Getting started with Semgrep in continuous integration (CI)](/semgrep-ci/overview/).
:::

To enable triage through comments, follow these steps:

1. In Semgrep Cloud Platform, go to your organization's [Settings](https://semgrep.dev/orgs/-/projects/-/repo-to-scan) page.
2. Enable the **Triage via comment** <i class="fa-solid fa-toggle-large-on"></i> toggle.

To triage a finding in GitHub, follow these steps:

1. Find an open comment created by Semgrep Cloud Platform in GitHub PR:
    ![Screenshot of Semgrep Cloud Platform comment in GitHub](/img/semgrep-app-comment-github.png)<br />
    *Figure 7.* Screenshot of Semgrep Cloud Platform comment in GitHub.
2. In the comment, reply with:
    <pre><code>
    /semgrep ignore <span className="placeholder">&lt;reason&gt;</span>
    </code></pre>
3. Substitute the colored placeholder <code><span className="placeholder">&lt;reason&gt;</span></code> with any text that can help to understand why the status of a comment is ignored.

:::info
Ignoring a finding through a comment in GitHub changes the status of the finding to **ignored** in the Semgrep Cloud Platform. See [Findings](/semgrep-code/findings) page documentation for more details. The GitHub conversation itself is not automatically resolved by this process.
:::

:::tip
You can also reopen a finding that was previously ignored. To do so, in step 2. of the preceding procedure, use `/semgrep open`. For `/semgrep open` the reason field is optional.
:::

<!--
## Creating Jira tickets from findings

Semgrep supports the creation of Jira tickets from a finding. This enables developers and project managers to create relevant issues within their project or bug-tracking environment. This feature is available to Team/Enterprise Tier users.

To **create a ticket**:

1. Set up a Jira integration through the [Notifications](/semgrep-app/notifications) guide.
2. Click the **three-dot icon** of the entry.
3. Click **Create issue with Jira**.
-->
