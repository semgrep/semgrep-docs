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
import TriageStatuses from "/src/components/reference/_triage-states.mdx"
import RemoveRule from "/src/components/procedure/_remove-rule.mdx"
import IgnoreIndividualFindings from "/src/components/procedure/_ignore-individual-findings.mdx"

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
- **Triage the finding.** If the finding is not useful or important, deprioritize it through triage. Triage actions include ignoring and reopening. Triaging a finding to ignore it is one method to handle **false positives** without changing the rule or code. To triage a finding, see [Managing finding status](#managing-finding-status)
- **Remove the rule or code that generated the finding.** There are cases where Semgrep scans a file not meant for scanning or when a rule is irrelevant. You can remove the rule from the Rule board or add the file to the ignore list. To remove a rule, see [Removing rules or rulesets](/semgrep-app/rule-board/#removing-rules-or-rulesets).
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

Semgrep App uses the logic specified in the table below to automatically mark findings as either fixed or removed when a finding is no longer present in the code. You can also ignore findings in Semgrep App directly through **triage** or **bulk triage**.

The triage statuses are as follows:

<TriageStatuses />

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

### Managing finding status

To manage, change, open or ignore findings, follow the the triage processes described below.
![Screenshot of Semgrep App triage menu](/img/app-findings-triage.png)<br />
*Figure 3.* Findings page triage menu.

#### Ignoring findings

##### Ignoring multiple findings

To **ignore multiple findings**, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Open** status to see all open findings.
1. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select more findings by clicking on their checkboxes.
1. Click the **Triage** button.
1. Optional: Select a reason of why you are ignoring a finding. Choose either: **False positive**, **Acceptable risk**, **No time to fix**
1. Select **Ignored** from the dropdown menu.
1. Click **Save**.

##### Ignoring individual findings

To **ignore individual findings**, follow these steps:

<IgnoreIndividualFindings />

:::note
If you ignore all findings in **Just this file**, **This directory**, or **Parent directory** in the fifth step of the procedure above, these files or directories are added to `.semgrepignore` file. For more information, see [Ignoring files, folders, or parts of code](/ignoring-files-folders-code/).
:::

#### Reopening findings

##### Reopening multiple findings

To **open findings**, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Perform one of these steps:
    - Select all findings by clicking on the header row checkbox that states **Showing X open findings**. You can navigate to succeeding pages and add other results to the current selection.
    - Select relevant findings one by one by clicking on their checkboxes.
1. Click the **Triage** button.
1. In the **Triage state** dropdown menu, select **Reopened**.
1. Click **Save**.

##### Reopening individual findings

To **open individual findings**, follow these steps:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, click the **Status** filter, and then select **Ignored** or **Fixed** status to see all ignored or fixed findings.
1. Next to a finding you want to ignore, click the **Reopen** <i class="fa-regular fa-chevron-down"></i>.
1. Optional: Add a note.
1. Click **Save**.

#### Fixing a finding

To **fix a finding**:

1. Update, or refactor the code such that the Semgrep rule pattern no longer matches the code.

#### Removing a rule

<RemoveRule />

#### Viewing and adding comments to finding's history

To **view and add comments** to history of a finding:

1. Click the <i className="fa-regular fa-arrow-up-right-from-square inline_svg"></i> **Finding details** icon next to the finding’s status.
2. Find the comments in the **History** section.
    ![Semgrep App finding details page](/img/app-finding-details.png)<br />
    *Figure 4.* Findings details page.

### Ignoring findings through comments

Triage your Semgrep App findings displayed as comments in GitHub PRs by replying with another comment.

:::info Prerequisites
- A **private** GitHub.com repository. This feature is not enabled for public GitHub.com repositories or Github Enterprise public and private repositories.
- GitHub Semgrep App installed in the repository that is also added as a project in Semgrep App. For more information, see [Getting started with Semgrep in continuous integration (CI)](/semgrep-ci/overview/).
:::

To enable triage through comments, follow these steps:

1. In Semgrep App, go to your organization's [Settings](https://semgrep.dev/orgs/-/projects/-/repo-to-scan) page.
2. Enable the **Triage via comment** <i class="fa-solid fa-toggle-large-on"></i> toggle.

To triage a finding in GitHub, follow these steps:

1. Find an open comment created by Semgrep App in GitHub PR:
    ![Screenshot of Semgrep App comment in GitHub](/img/semgrep-app-comment-github.png)<br />
    *Figure 5.* Screenshot of Semgrep App comment in GitHub.
2. In the comment, reply with:
    <pre><code>
    /semgrep ignore <span className="placeholder">&lt;reason&gt;</span>
    </code></pre>
3. Substitute the colored placeholder <code><span className="placeholder">&lt;reason&gt;</span></code> with any text that can help to understand why the status of a comment is ignored.

:::info
Ignoring a finding through a comment in GitHub changes the status of the finding to **ignored** in the Semgrep App. See [Findings](/semgrep-app/findings.md) page documentation for more details. The GitHub conversation itself is not automatically resolved by this process.
:::

:::tip
You can also reopen a finding that was previously ignored. To do so, in step 2. of the procedure above, use `/semgrep open`. For `/semgrep open` the reason field is optional.
:::

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
* [Ignoring files, folders, or code](/ignoring-files-folders-code/)

## Additional references

* [Writing Semgrep rules: a methodology](https://r2c.dev/blog/2020/writing-semgrep-rules-a-methodology/)

<MoreHelp />
