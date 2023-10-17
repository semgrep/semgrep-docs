---
slug: policies
append_help_link: true
title: Policies
hide_title: true
description: "The Policies page is a visual representation of the rules that Semgrep Code uses to scan code."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
    - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Policies

The Policies page displays a visual representation of the rules that Semgrep Code uses for scanning. By default, the same rules will run on all repositories. This is sufficient for most users and simpler for most teams to reason about.

## Multiple policies

:::tip Try the multiple policies feature (private beta)
Existing customers can try the **multiple policies** feature for free. To enable this feature, contact your Technical Account Manager, Account Executive, or email [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) and let them know you'd like to try multiple policies out.
:::

The multiple policies feature enables users to customize the rules that run on specific repositories. 

Users create different policies that repositories can **subscribe** to.

This feature makes use of a **Global Policy** that runs on **all** repositories. Repositories cannot unsubscribe from it.

You can create a policy, for example **Custom Coding Standards Policy** with some additional rules and add it to one or more repositories. During a scan, these repositories run all of the rules from the **Global Policy** as well as all the rules from **Custom Coding Standards Policy**.

### Resolving workflow actions in multiple policies

If a rule is in multiple policies, then the rule is deduplicated and Semgrep prioritizes the workflow action based on the rule's mode where precedence is as follows: 

1. Block
2. Comment
3. Monitor

For example, if an instance of `Rule A` is set to **Block**, then the scan blocks PRs for any findings from that rule, even if the same `Rule A` is set to **Monitor** in another policy applied to that repository.

## Policies page structure

![Screenshot of the default state of the Policies page](/img/policies.png)

The Policies page consists of a header and three main panes:

<dl>
    <dt>Policies header</dt>
        <dd>
            The top header consists of:
            <ul>
                <li><i class="fa-solid fa-gear"></i> <b>Rule Modes</b> button where you can view rule mode behavior and specify integrations for each rule mode. Modes define actions that occur when a rule detects a finding. The modes that you can edit are Monitor, Comment, Block. When you click the Rule Modes button, and then click <b>Edit</b> button of a mode, you can add integrations such as <a href="/semgrep-cloud-platform/email-notifications/">Email</a>, <a href="/semgrep-cloud-platform/slack-notifications/">Slack</a>, and <a href="/semgrep-cloud-platform/webhooks/">Webhook</a> for each of the modes. When an integration has been added to a mode, you are notified through the integration when a rule with the assigned mode detects a finding.</li>
                <li><b>Add rules</b> button that takes you to the <a href="https://semgrep.dev/explore">Semgrep Registry</a> where you can add rules to the Policies page and assign their initial modes.</li>
            </ul>
        </dd>
    <dt>Filter pane</dt>
        <dd>
            Left pane where you can use the following filters to display specific rules:
            <ul>
                <li>Category</li>
                <li>Mode</li>
                <li>Confidence</li>
                <li>Severities</li>
                <li>Source</li>
                <li>Ruleset</li>
                <li>Language</li>
            </ul>
            These filters are explained further below as they correspond to the Rule pane columns also.
        </dd>
    <dt>Rule pane</dt>
        <dd>
            The right pane displays a number of rules with the <b>Matching Rules</b> title. This pane visualizes the rules that are used in your Semgrep Cloud Platform organization and allows you to edit their assigned modes (Monitor, Comment, Block, and Disabled). You can make these edits either one by one or through bulk editing of many rules. You can also use the <b>Search for rule names or ids</b> search box. The individual columns are explained separately below in the <a href="#rule-pane-in-detail">Rule pane in detail</a> section.
        </dd>
</dl>

### Rule pane in detail

This section explains columns in the rule pane of the Policies page in detail:

- **Rule name**: Name of the rule that Semgrep Code uses for scanning.
- **Severity**: The higher the severity, the more critical the issues are that a rule detects. The Policies page displays the **high**, **medium**, and **low** severities.
- **Confidence**: Indicates confidence of the rule to detect true positives. There are rules with **high**, **medium**, and **low** confidence.
- **Source**: Indicates whether the rule is a **Pro**, **Community rule**, or a **Custom rule** .
    - **Pro**: Authored by Semgrep with cross-file (interfile), and cross-function (interprocedural) analysis capabilities providing you with enhanced scan accuracy. For more information, see [Pro rules](/semgrep-code/pro-rules/) documentation.
    - **Community**: Authored by Semgrep, Inc or external contributors such as Trail of Bits.
    - **Custom**: Rules created within your Semgrep organization. For more information, see [Private rules](/writing-rules/private-rules/) documentation.
- **Ruleset**: Rules are also organized in rulesets. Rulesets are groups of rules related through a programming language, OWASP category, or framework.
- **Mode**: Specifies what happens when a rule detects a finding (sometimes called matching - when a rule matches a code). The mode indicates how the findings for each rule are reported to you and your developers. There are the three following modes:
    - **Monitor**: Display findings only on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code.
    - **Comment**: Display findings on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code and create comments in merge requests (MR) or pull requests (PR).
    - **Block**: Display findings on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code, create comments in MR and PR, and fail the build to block merging where the finding was detected.
    - **Disabled**: Disabled rules do not scan your code or detect findings. This is helpful if rules are too noisy and detect many false positives that you otherwise need to ignore manually.

:::tip
To change assigned modes, select either the top **Matching Rules** checkbox to select all rules, or select individual checkboxes next to a rule, and then click **(<span className="placeholder">Number</span>) Edit** or click individual rules in the **Mode** column.
:::

:::info
All of these columns correspond to the filters in the filter pane.
:::

## Adding rules

To add rules, follow these steps:

1. On the [Policies](https://semgrep.dev/orgs/-/policies) page, click **Add Rules**.
1. You are redirected to the [Semgrep Registry](https://semgrep.dev/explore) page. Explore the page, open cards of individual rules, and then click **Add to Policy.
1. Specify the behavior of the rule that you are adding. Select either: 
    - **Monitor**: Display findings only on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code.
    - **Comment**: Display findings on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code and create comments in MRs or PRs.
    - **Block**: Display findings on the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page of Semgrep Code, create comments in MRs or PRs, and block PRs or MRs where the finding was detected.

## Disabling rules

To disable a rule, follow these steps:

1. On the **Policies** page, select either:
    - The top **<span className="placeholder">Number</span> Matching Rules** checkbox to select all rules.
    - Select individual checkboxes next to a rule to disable rules one by one.
1. Click **(<span className="placeholder">Number</span>) Edit**, and then click **Disabled**.

You can also select individual rules under the **Mode** column and disable them one by one.

<MoreHelp />
