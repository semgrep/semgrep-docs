---
slug: findings
append_help_link: true
title: Findings
description: "The Findings page allows users to view, manage, and triage Findings."
---

import MoreHelp from "/src/components/MoreHelp"

# Managing findings in Semgrep App


![Screenshot of Semgrep App Findings page ](../img/app-findings-overview.png)<br />

A **finding** is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code.

A finding can be categorized **based on the issue or code it detects**:

* anti-patterns
* security vulnerabilities (such as dangerous function usage)
* business or logic bugs
* matches based on your own custom rules (such as organization-specific authentication logic)

Semgrep rules provide a metadata schema to identify common categories such as the above. Semgrep findings include a `message` field that describes the security issue or bug that must be resolved. Findings may also provide a `fix` field that fixes the issue by creating a suggestion within your source code management (SCM) tool, such as GitHub or GitLab.

Another way of categorizing findings is **based on the validity of of the match**:

<dl>
    <dt>True positive</dt>
    <dd>Rules are written to match a certain code pattern. A true positive is a genuine match. The rule is capturing code as intended.</dd>
    <dt>False positive</dt>
    <dd>A false positive is a mismatch between the intended purpose of the rule and the code it matched. A finding is generated but does not meet the rule's intended need. Rules with a high false positivity rate are said to be <strong>noisy</strong>.</dd>
    <dt>False negative</dt>
    <dd>A false negative is a finding that should have been found by a rule, but was not. This can happen for two reasons:
    <ul>
        <li>A flaw in the rule's logic. See <a href="../release-notes/#additions-1"><code>semgrep shouldafound</code></a>.</li>
        <li>A bug within semgrep itself.</li>
    </ul>
    </dd>
</dl>

## Working with findings

After a finding is generated, developers can:

* **Fix the issue detected by the finding.** This is Semgrep's primary goal. In this case, the rule produces a **true positive** finding (such as a security issue) as intended and developers must refactor or address the code such that the rule no longer matches it.
* **View the Semgrep rule and the matching code.** For developers aiming to understand their team's security posture, Semgrep provides a top-level report view through the Dashboard and a list view of findings in the Findings page that can be filtered by repository, rule, branch, or triage action.
* **Triage the finding.** If the finding is not useful or important, it can be deprioritized through triaging. Triage actions include ignoring and reopening. Triaging a finding to ignore it is one method to handle **false positives** without changing the rule or code.
* **Remove the rule or code that generated the finding**. There are cases where Semgrep scans a file not meant for scanning or when a rule is irrelevant. You can remove the rule from the Rule board or add the file to the ignore list.
* **Create a Jira ticket from the finding (for Enterprise/Team Tier users.)** For findings that require more extensive refactoring, a ticket can be created in Jira to track its resolution.

:::tip
* An additional method to address false positives is to improve the rule. Create [test cases](../writing-rules/testing-rules) to ensure that the rule performs as intended.
* If a rule from Semgrep Registry is useful but also captures too many false positives, you can reach out to support@semgrep.dev. This will assist rule-writing efforts and improve the quality of rules that you run. 
:::

### Understanding retention periods

The Semgrep App Finding page displays findings across all projects connected to Semgrep App. It is updated after every scan. Scans are initiated through your CI/CD pipeline, such as GitHub actions. The retention period of these findings varies based on your organization’s tier:

| Retention period | Tier availability |
| ---------------  | ----------------- |
| 30-day findings retention | Community (Free) |
| 1-year findings retention | Team/Enterprise |

## Viewing data on the Findings page

### Navigating to the Findings page

1. Sign in to Semgrep App.
2. The **Findings** page can be found on the left sidebar.

### Understanding the Findings page

The Findings page displays the following fields:

| Field       | Description  |
| ----------  | ------------ |
| **Severity**    | The impact of a finding. Possible values: <ul><li>Low</li><li>Medium</li><li>High </li><li>Critical</li></ul> |
| **Finding**     | The file, line, and branch of the match in the code. Clicking this field brings you to the exact location in the codebase. |
| **Project**     | The name of the repository where the finding was found. Clicking this field brings you to the project’s URL. |
| **Rule**        | The name of the rule that  matched with the code. Clicking this field brings you to the rule’s entry in the [Rule Registry](https://semgrep.dev/r). |
| **Introduced**  | The time when this finding was first found. Clicking the header row sorts the table by latest or earliest findings. |
| **Status**      | Refers to a finding’s triage state. Refer to the following table to understand triage states. |

## Triaging findings

**Triaging** means prioritizing a finding based on a policy or criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

Semgrep App assists in the triage process through the use of **comments** and **triage states**:

| Triage state | Description |
| -----------  | ------------ |
| **Open** | Open findings require action, such as rewriting the code for vulnerabilities, or refactoring the code. Findings are open by default. |
| **Ignored** | Findings that are ignored will not be acted upon. This may be a false positive or deprioritized issue. Findings can be ignored through Semgrep App (see [Managing triage states](#managing-triage-states-bulk-triage)). There are two types of ignored findings: <dl><dt>Ignored - App</dt><dd>The ignore status was set within Semgrep App.</dd><dt>Ignored - Code</dt><dd>The ignore status was set from the code itself. Using a `nosemgrep` annotation within the code falls under this type.</dd></dl> |
| **Fixed** | Fixed findings are findings that were detected in a previous scan but no longer trigger a match in the most recent scan. The rule that detected the finding and the code that triggered the match must both be active in the most recent scan. |

Findings can also be **removed**. A removed finding does not count towards a fix rate or the total number of findings. A finding is considered removed if it is not found in the most recent scan due to either of the following conditions:

* You removed the rule from the Rule Board.
* You deleted the file containing the code.
* The file is included in a `.semgrepignore` file.

### Filtering findings

Filtering allows you to easily isolate groups of findings for ease in triaging and identifying related groups of issues. The following criteria are available for filtering:

| Filter criteria | Description |
| -----------  | ------------ |
| **Project** | Filter by repositories connected to Semgrep App. |
| **Rules** | Filter by rules or rulesets that are included in your Rule Board or Policies page. More than one rule can be selected for filtering. |
| **Refs** | Filter by branches in your codebase. More than one branch can be selected for filtering. |
| **Actions** | Filter by monitoring, commenting, or blocking rules in your Rule Board or Policies page. Only one action can be selected for filtering. |
| **Severities** | Filter by the severity of a finding. More than one severity can be selected. |

To filter through all findings:

1. Click on the filter criteria’s drop-down box.
2. Select the value by which the findings are filtered.
3. The page then refreshes to reflect the additional criteria.
4. Additional values may be selected to further refine your filter.

### Sorting findings

* Findings may be sorted by their respective fields (see **Fields** table above).
* To sort a finding, click on the desired **row header**.

### Managing triage states (bulk triage)

Bulk triage can be performed by filtering through the findings, and then you can select which findings to be:

* Opened
* Ignored

![Screenshot of Semgrep App triage menu](../img/app-findings-triage.png)<br />

To **ignore findings**:

1. Click **Open** to see all open findings.
2. After the findings are filtered, perform one of these steps:
    - Select all of the results by clicking on the header row checkbox. You can navigate to succeeding pages and add to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes individually.
3. Click the **Triage** button.
4. Click **Ignore**.
5. Optional: Include a **comment** explaining the action.

To **open findings**:

1. Click **Ignored** to see all ignored findings.
2. After the findings are filtered, perform one of these steps:
    - Select all of the results by clicking on the header row checkbox. You can navigate to succeeding pages and add to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes individually.
3. Click the **Triage** button.
4. Click **Open**.
5. Optional: Include a **comment** explaining the action.

To **fix a finding**, update, or refactor the code such that the Semgrep rule pattern no longer matches the code.

To **remove a rule** from the Rule Board:

1. Click **Rule Board**.
2. Click the ruleset that contains the rule.
3. Click the garbage can icon next to the rule you're deleting.

To **view comments**:

* Click the **speech balloon** next to the finding’s status.

## Creating Jira tickets from findings

Semgrep supports the creation of Jira tickets from a finding. This enables developers and project managers to create relevant issues within their own project or bug tracking environment. This feature is available to Team/Enterprise Tier users.

To **create a ticket**:

1. Set up a Jira integration through the [Integrations](https://semgrep.dev/docs/semgrep-app/integrations/) guide.
2. Click on the **three-dot icon** of the entry.
3. Click **Create issue with Jira**.

## Deduplicating findings

Semgrep App scans are performed on both mainline (trunk) and non-mainline branches. Findings are generated on a per-branch basis. Duplicate findings arise due to scans occurring on the same code in different branches.

There are two types of scans:

<dl>
    <dt>Full scan</dt>
    <dd>Scans the repository in its entirety. It is recommended to perform full scans on mainline branches, such as `master` or `main`. This scan is performed on a scheduled basis.</dd>
    <dt>Diff-aware scan</dt>
    <dd>Diff-aware scans are performed on non-mainline branches, such as in pull requests and merge requests. Diff scans traverse the repository's files based on the commit where the branch diverged from the mainline branch (or diverged from the last commit that was fully scanned?)</dd>
</dl>

If a finding is fixed in one branch (such as `main`) but open in another (such as `production`), and the code fixes are present in both branches, initiate a scan on the branch(es) with open findings to mark the findings as fixed.

## See also

* [Integrations](integrations.md)
* [Rule Board](rule-board.md)
* [Ignoring files, folders, or code](../ignoring-files-folders-code.md)

## Additional references

* [Writing Semgrep rules: a methodology](https://r2c.dev/blog/2020/writing-semgrep-rules-a-methodology/)

<MoreHelp />
