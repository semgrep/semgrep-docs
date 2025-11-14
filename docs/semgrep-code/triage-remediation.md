---
slug: triage-remediation
append_help_link: true
title: Triage and remediation
hide_title: false
toc_max_heading_level: 2
description: Learn about Semgrep Code's triage status for findings and how to triage and remediate findings.
tags:
    - Semgrep Code
    - Semgrep AppSec Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Triage and remediate findings

import TriageStatuses from "/src/components/reference/_triage-states.mdx"
import TriageReason from "/src/components/reference/_triage-reason.mdx"

This article shows you how to manage and triage identified by Semgrep Code using Semgrep AppSec Platform. The specific actions available to you when managing your findings include:

- **Fixing the issue detected.** This is Semgrep's primary goal. If the rule produces a **true positive** finding, such as a security issue, developers must change or address the code so that the rule no longer matches it.
- **Triaging the finding.** Deprioritize a finding if it's not helpful or important through triage. Triage actions include ignoring and reopening a previously ignored finding. Triaging a finding to **ignore** is one method to handle **false positives** without changing a rule or your code.
- **Removing the rule or code that generated the finding.** There are cases where Semgrep scans a file it should ignore or scans the file with an irrelevant rule. You can [disable the rule](/semgrep-code/policies#disable-rules) from the **Policies** page or [add the file to the ignore list](/ignoring-files-folders-code).
<!-- - **Create a Jira ticket from the finding (for Enterprise/Team Tier users.)** For findings that require more extensive refactoring, users can create a ticket in Jira through Semgrep AppSec Platform to track its resolution. -->

### Semgrep Assistant

If you have Semgrep Assistant enabled, you receive AI-powered security recommendations to help you review, triage, and remediate your Semgrep findings:

- [Remediation advice](/semgrep-assistant/overview#remediation) shown in Semgrep AppSec Platform, including:
  - [Guidance](/semgrep-assistant/overview#guidance) with step-by-step instructions on how to remediate the finding identified by Semgrep Code in every pull request or merge request comment Semgrep pushes
  - [Autofixes](/semgrep-assistant/overview#autofix), or suggested code fixes
- [Component tagging](/semgrep-assistant/overview#component-tags) to help identify high-priority issues

Semgrep Assistant can also [auto-triage findings](/semgrep-assistant/overview#auto-triage), suggest whether a finding can safely be ignored, and [filter out potential false positives](/semgrep-assistant/overview#noise-filtering-beta) to help increase developer velocity.

## Triage statuses

**Triage** is the prioritization of a finding based on policies or criteria set by your team or organization, such as severity, coding standards, business goals, and product goals.

Semgrep AppSec Platform uses the logic specified in the table below to automatically mark findings as either fixed or removed when they are no longer present in the code. You can also manually **Ignore** findings or set them as **To fix** or **Reviewing** in Semgrep AppSec Platform directly through **triage** or **bulk triage** actions.

The triage statuses are as follows:

<TriageStatuses />

## Triage and remediation

The following sections show you how to manage your findings by:

* Fixing the underlying code
* Disabling a rule or a ruleset
* Ignoring a finding
* Reopening a finding

Note that some actions, such as ignoring and reopening findings, require different steps based on whether you have chosen **Group by Rule** or **No Grouping** when viewing your results on the **Findings** page.

### Fix a finding

To **fix a finding**, update or refactor the code so that the Semgrep rule pattern no longer matches it.

### Ignore findings

To handle **false positives** without changing the rule or your code, set the finding's triage status to **ignore**.

<details>
<summary>Ignore findings in <b>Group by Rule</b> view</summary>

To **ignore findings** in the **Group by Rule** view:

1. Go to [**Code > All**](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Open** findings.
2. Perform one of these steps:
    - To select all findings for the same rule, select the first checkbox on the finding's card, then click **Triage > Ignored** .
    - To select individual findings reported by a rule, fill in the checkboxes of the finding, and then click **Triage > Ignored**.
3. Select **Ignore reason**, and optionally, provide **Comments** to describe why the finding was ignored.
4. Click **Submit**.

</details>

<details>
<summary>Ignore findings in <b> No grouping</b> view</summary>

To **ignore individual finding** in the **No grouping** view, follow these steps:

1. Go to [Code > All](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Open** findings.
2. Select the checkbox next to a finding you want to ignore, and click **Triage > Ignored**.
3. Select **Ignore reason**, and optionally, provide **Comments** to describe why the finding was ignored.
4. Click **Submit**.

To **ignore multiple findings** in the **No grouping** view, follow these steps:

1. Go to [Code > All](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Open** findings.
2. Perform one of these steps:
    - Select all findings on the page displayed by clicking on the header row checkbox that states **X matching findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select all findings of interest by clicking on their checkboxes.
3. Click **Triage > Ignored**.
4. Select **Ignore reason**, and optionally, provide **Comments** to describe why the findings were ignored.
6. Click **Submit**.

</details>

### Reopen findings

You can **reopen** a finding that you previously marked as **ignore** at any time.

<details>
<summary>Reopen findings in <b>Group by Rule</b> view</summary>

To **reopen findings** in the **Group by Rule** view, follow these steps:

1. Go to [Code > All](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Ignored** findings.
2. Perform one of these steps:
    - To select all findings for the same rule, select the first checkbox on the finding's card, then click **Triage > Open** .
    - To select individual findings reported by a rule, fill in the checkboxes of the finding, and then click **Triage > Open**.
3. Optional: Write a reason to describe why the finding was reopened.
4. Click **Submit**.

</details>

<details>
<summary>Reopen findings in <b>No grouping</b> view</summary>

To **reopen individual findings** in the No grouping view, follow these steps:

1. Go to [Code > All](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Ignored** findings.
2. Select the checkbox next to a finding you want to reopen. Click **Triage > Open**.
3. Optional: Write a reason to describe why the finding was reopened.
4. Click **Submit**.

To **reopen multiple findings** in the **No grouping** view, follow these steps:

1. Go to [Code > All](https://semgrep.dev/orgs/-/findings?tab=open), and ensure that your filters are set to display all **Ignored** findings.
1. Perform one of these steps:
    - Select all findings on the page displayed by clicking on the header row checkbox that states **X matching findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select all findings of interest by clicking on their checkboxes.
1. Click **Triage > Open**.
1. Optional: Write a reason to describe why the finding was reopened.
1. Click **Submit**.

</details>

### Turn off a ruleset or a rule

You can turn off a specific rule or ruleset to prevent Semgrep Code from using it when scanning your codebase.

:::info
When you turn off a rule, existing findings from that rule remain open until you re-scan your code.
:::

<details>
<summary>Disable rules and rulesets</summary>

To disable a **rule**:

1. Go to the [**Policies** page](https://semgrep.dev/orgs/-/policies) and select either:
    - The top **<span className="placeholder">Number</span> Matching Rules** checkbox to select all rules.
    - Individual checkboxes next to a rule to turn off rules one by one.
2. Click **(<span className="placeholder">Number</span>) Change modes**, then click **Disabled**.

You can also set the state in the **Mode** column to **Disabled** for individual rules.

To turn off a **ruleset** using the Policies page:

1. Go to the [**Policies** page](https://semgrep.dev/orgs/-/policies), .
2. Use the **Ruleset** filter's drop-down box to find and click the ruleset to remove.
3. Click <i class="fas fa-check-square"></i> **Matching rules**.
4. Click **Change modes > Disabled**.

</details>

## Triage findings through PR and MR comments

You can triage your Semgrep AppSec Platform findings displayed as comments in PRs and MRs by replying with another comment.

Before proceeding, ensure that you have:
 - One or more repositories hosted by a [Semgrep-supported source code manager (SCM)](/getting-started/scm-support).
 - Configured [PR or MR comments](/category/pr-or-mr-comments) for your SCM.

To triage a finding:

1. Find an open comment created by Semgrep in your pull request or merge request.
2. In a subsequent comment, reply with the action you want to take. You must provide a reason to help the reader understand why the finding has been triaged as ignored:
 <TriageReason />
 Semgrep attempts to reply to your comment if it successfully triages the finding.

Triaging a finding as **Ignored** through a comment changes the status of the finding to **Ignored** in Semgrep AppSec Platform. However, the pull request or merge request conversation itself is **not** automatically resolved by this process.

:::info Legacy commands
Semgrep supports older versions of this feature that used the following commands:
- <code>/semgrep ignore <span className="placeholder">&lt;REASON&gt;</span></code> - triage a finding as **Ignored**.
- <code>/semgrep open <span className="placeholder">&lt;REASON&gt;</span></code> - reopen a finding that has been triaged as **Ignored**.
:::

## Triage findings in bulk through the Semgrep API

Semgrep provides an API endpoint you can use to triage findings in bulk, either by passing a list of `issue_ids` or filter query parameters to select findings. You must also specify an `issue_type`, such as `sast` or `sca`, and either  `new_triage_state` or `new_note`. Refer to [<i class="fas fa-external-link fa-xs"></i> Bulk triage API documentation](https://semgrep.dev/api/v1/docs/#tag/TriageService).
