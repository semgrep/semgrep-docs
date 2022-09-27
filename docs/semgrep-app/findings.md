---
slug: findings
append_help_link: true
title: Findings
description: "The Findings page allows users to view, manage, and triage Findings."
hide_title: true
tags:
    - Semgrep App
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import FindingsHistory from "/src/components/procedure/_app-findings-history.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Managing findings in Semgrep App

A **finding** is the core result of Semgrep analysis. Findings are generated when a Semgrep rule matches a piece of code.

![Semgrep App Findings page](/img/app-findings-overview.png)<br />
*Figure 1.* Screenshot of findings page.

A finding can be categorized in two ways:

1. **Finding categorization based on the issue or code it detects**:
    - Anti-patterns
    - Security vulnerabilities (such as dangerous function usage)
    - Business or logic bugs
    - Matches based on your own custom rules (such as organization-specific authentication logic)

    Semgrep rules provide a metadata schema to identify common categories such as the above. Semgrep findings include a `message` field that describes the security issue or bug found in matching code. Additionally, findings can provide a `fix` field that fixes the issue by creating a suggestion within your source code management (SCM) tool, such as GitHub or GitLab.
2. **Finding categorization based on the validity of the match**:
    <dl>
        <dt>True positive</dt>
        <dd>Rules are written to match a certain code pattern. A true positive is a genuine match. The rule is capturing the code as intended.</dd>
        <dt>False positive</dt>
        <dd>A false positive is a mismatch between the intended purpose of the rule and the code it matched. A finding is generated but does not meet the rule's intended need. Rules with a high false positivity rate are said to be <strong>noisy</strong>.</dd>
        <dt>False negative</dt>
        <dd>A false negative is a finding that should have been found by a rule, but was not. This can happen for two reasons:
        <ul>
            <li>A flaw in the rule's logic. See <a href="/docs/reporting-false-negatives"><code>semgrep shouldafound</code></a>.</li>
            <li>A bug within Semgrep itself. See the list of <a href="https://github.com/returntocorp/semgrep/issues">Semgrep issues</a> to file a bug report.</li>
        </ul>
        </dd>
    </dl>

## Working with findings

After a finding is generated, developers can:

- **Fix the issue detected by the finding.** This is Semgrep's primary goal. In this case, the rule produces a **true positive** finding (such as a security issue) as intended and developers must change or address the code such that the rule no longer matches it.
- **View the Semgrep rule and the matching code.** For developers aiming to understand their team's security posture, Semgrep provides a top-level report view through the Dashboard and a list view of findings in the Findings page that can be filtered by repository, rule, branch, or triage action.
- **Triage the finding.** If the finding is not useful or important, deprioritize it through triage. Triage actions include ignoring and reopening. Triaging a finding to ignore it is one method to handle **false positives** without changing the rule or code.
- **Remove the rule or code that generated the finding.** There are cases where Semgrep scans a file not meant for scanning or when a rule is irrelevant. You can remove the rule from the Rule board or add the file to the ignore list. To remove a rule, see [Managing triage states](../findings/#managing-triage-states-bulk-triage).
- **Create a Jira ticket from the finding (for Enterprise/Team Tier users.)** For findings that require more extensive refactoring, users can create a ticket in Jira through Semgrep App to track its resolution.

:::tip
* An additional method to address false positives is to improve the rule. Create [test cases](/docs/writing-rules/testing-rules) to ensure that the rule performs as intended.
* If a rule from Semgrep Registry is useful but also captures too many false positives, you can reach out to support@semgrep.dev. This helps rule-writing efforts and improves the quality of rules that you run. 
* Additionally, you can report rules with a high false positive rate from your SCM if you have enabled Semgrep App to leave comments in PRs. Semgrep App provides a link after each comment for users to indicate if the finding is a false positive.
:::

### Understanding retention periods

The Semgrep App Finding page displays findings across all projects connected to Semgrep App. It is updated after every scan. Scans are initiated through your CI/CD pipeline, such as GitHub actions. The retention period of these findings varies based on your organization’s tier:

| Retention period | Tier availability |
| ---------------  | ----------------- |
| 30-day findings retention | Community (Free) |
|     5 years retention      | Team/Enterprise  |

## Viewing data on the Findings page

### Navigating to the Findings page

1. Sign in to Semgrep App.
2. Click **Findings** on the left sidebar.

### Understanding the Findings page

The Findings page consists of:

- **Findings filter panel**: Panel which lets you filter for different findings.
- **Findings information**: Gives you details about findings. Each finding in the list includes rule name, Rule Board action column description, link to findings detail page, rule message, repository name, link to Git branch name, link to the reported file, and reported line of code.
    ![Findings information panel](/img/app-findings.png)<br />
    *Figure 2.* Findings information panel.

## Triaging findings

**Triaging** means prioritizing a finding based on a policy or criteria set by your team or organization. While severity is a factor in triage, your organization may define additional criteria based on coding standards, business, or product goals.

Semgrep App assists in the triage process through the use of **comments** and **triage states**:

| Triage state | Description |
| -----------  | ------------ |
| **Open** | Open findings require action, such as rewriting the code for vulnerabilities or refactoring the code. Findings are open by default. |
| **Ignored** | Findings that are ignored are not acted upon. This can be a false positive or deprioritized issue. Findings can be ignored through Semgrep App (see [Managing triage states](#managing-triage-states-bulk-triage)). There are two types of ignored findings: <dl><dt>Ignored - App</dt><dd>The ignored status was set within Semgrep App.</dd><dt>Ignored - Code</dt><dd>The ignored status was set from the code itself. Using a `nosemgrep` annotation within the code falls under this type.</dd></dl> |
| **Fixed** | <p>Fixed findings were detected in a previous scan of a particular branch, but no longer trigger a match in the most recent scan of that same branch. The Semgrep rule that matched the finding and the code that triggered the match must both be active in the most recent scan. </p> <p> Change the triage status of a finding to **fixed** by: <ol type="a"><li>Fixing the code so the rule cannot match it.</li><li>Editing the Semgrep rule so it no longer matches the code.</li></ol></p> |

Findings can also be **removed**. A removed finding does not count towards a fix rate or the total number of findings. A finding is considered removed if it is not found in the most recent scan of the branch where the finding was detected due to any of the following conditions:

* You removed the rule from the Rule Board.
* You deleted the file containing the code.
* The file is included in a `.semgrepignore` file.

### Filtering findings

Filtering allows you to easily isolate groups of findings for ease in triaging and identifying related groups of issues. The following criteria are available for filtering:

| Filter      | Description  |
| ----------  | ------------ |
| **Status**       | Filter for different findings triage states. Refer to the [following table](#triaging-findings) to understand triage states. |
| **Projects**     | Filter by repositories connected to Semgrep App. |
| **Branches**     | Filter by findings in different branches. |
| **Rules**        | Filter by rules or rulesets that are included in your Rule Board. More than one rule can be selected for filtering. |
| **Rulesets**     | Filter by name of the ruleset where rules that matched the code belong. |
| **Actions**     | Filter by monitoring, commenting, or blocking rules in your Rule Board. |
| **Severity**    | Filter by the severity of a finding. Possible values: <ul><li>Low</li><li>Medium</li><li>High</li></ul> |

To filter through all findings:

1. Click the filter criteria drop-down box.
2. Enable displayed checkbox or write in a field value by which the findings are filtered.
3. The page then refreshes to reflect the additional criteria.
4. Additional values may be selected to further refine your filter.

### Managing triage states (bulk triage)

Perform bulk triage by filtering through the findings, and then you can select which findings are:
- Opened
- Ignored
![Screenshot of Semgrep App triage menu](/img/app-findings-triage.png)<br />
*Figure 3.* Findings page triage menu.

To **ignore findings**:

1. Click the **Status** filter, and then select **Open** toggle to see all open findings.
1. After the findings are selected, perform one of these steps:
    - Select all of the results by clicking on the header row checkbox. You can navigate to succeeding pages and add to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes individually.
2. Click the **Triage** button.
3. Click **Ignore**.

To **open findings**:

1. Click the **Status** filter, and then select **Ignored** or **Fixed** toggle to see all ignored or fixed findings.
2. After the findings are filtered, perform one of these steps:
    - Select all of the results by clicking on the header row checkbox. You can navigate to succeeding pages and add to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes individually.
3. Click the **Triage** button.
4. Click **Open**.

To **fix a finding**, update, or refactor the code such that the Semgrep rule pattern no longer matches the code.

To **remove a rule** from the Rule Board:

1. Click **Rule Board**.
2. Click the ruleset that contains the rule.
3. Click the <i className="fa-solid fa-trash-can inline_svg"></i> **Remove rule** icon next to the rule you're deleting.
4. Click **Save**.
5. Manually initiate a Semgrep scan from your CI job or SCM tool to immediately remove findings generated by the removed rule.

<FindingsHistory />
&emsp;&emsp;<i>Figure 4.</i> Findings details page.

## Creating Jira tickets from findings

Semgrep supports the creation of Jira tickets from a finding. This enables developers and project managers to create relevant issues within their project or bug-tracking environment. This feature is available to Team/Enterprise Tier users.

To **create a ticket**:

1. Set up a Jira integration through the [Integrations](https://semgrep.dev/docs/semgrep-app/integrations/) guide.
2. Click the **three-dot icon** of the entry.
3. Click **Create issue with Jira**.

## Deduplicating findings

Semgrep App scans are performed on both mainline (trunk) and non-mainline branches. Semgrep App generates findings on a per-branch basis. Duplicate findings arise due to scans occurring on the same code in different branches.

There are two types of scans:

<dl>
    <dt>Full scan</dt>
    <dd>Scans the repository in its entirety. It is recommended to perform full scans on mainline branches, such as `master` or `main`. This scan is performed on a scheduled basis.</dd>
    <dt>Diff-aware scan</dt>
    <dd>Diff-aware scans are performed on non-mainline branches, such as in pull requests and merge requests. Diff scans traverse the repository's files based on the commit where the branch diverged from the mainline branch (or diverged from the last commit that was fully scanned?)</dd>
</dl>

If a finding is fixed in one branch (such as `main`) but open in another (such as `production`), and the code fixes are present in both branches, initiate a scan through your CI job or SCM tool on the branch(es) with open findings to have Semgrep mark the findings as fixed.

## See also

* [Integrations](integrations.md)
* [Rule Board](rule-board.md)
* [Ignoring files, folders, or code](../ignoring-files-folders-code.md)

## Additional references

* [Writing Semgrep rules: a methodology](https://r2c.dev/blog/2020/writing-semgrep-rules-a-methodology/)

<MoreHelp />
