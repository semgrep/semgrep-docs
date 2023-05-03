---
slug: rule-board
append_help_link: true
title: Rule board
hide_title: true
description: "The Rule Board is a visual representation of the rules that Semgrep Cloud Platform uses to scan code. Rules are cards, and are grouped into columns representing the actions undertaken (whether to block, comment, or silently monitor) when a finding surfaces."
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
    - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import DisableRule from "/src/components/procedure/_disable-rule.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Rule board

The Rule Board is a visual representation of the rules that Semgrep Code uses for scanning. Rules can be organized in rulesets. Rulesets are rules related through a programming language, OWASP category, or framework.

Rules and rulesets are displayed as **cards** in Semgrep Cloud Platform. Group cards by dragging and dropping cards into the columns. Columns represent the actions undertaken in response to findings from that rule or ruleset.

The columns and their corresponding actions are:

<dl>
    <dt>Monitor</dt>
    <dd>Rules that display findings only in Semgrep Cloud Platform.</dd>
    <dt>Comment</dt>
    <dd>Rules that display findings to developers through PR or MRs.</dd>
    <dt>Block</dt>
    <dd>Rules that block merges and commits, in addition to showing findings in Semgrep Cloud Platform and PRs or MRs.</dd>
</dl>

![Screenshot of the default state of the rule board](/img/rule-board.png)

Semgrep Code is pre-configured to use the `default` ruleset. The `default` ruleset scans for security vulnerabilities in common programming languages and frameworks.

Semgrep Code detects the framework and language when scanning a project and only runs rules relevant for that framework and language.

## Adding rules or rulesets

### Through the search bar

1. Click **Add rules**. A drawer appears.
2. Search for rules by entering a relevant search term, such as your programming language, OWASP category, or framework in the search bar.
3. Optional: Display the rules within a ruleset by clicking on the **Expand** icon beside the name of the ruleset.
4. Optional: Display the rule definition by clicking on the **View in Playground** icon beside the name of the rule.
5. Drag the card and drop it on the relevant column.
6. Once you are done adding rules and rulesets, click **Save changes**.

### From Semgrep Registry

1. Click a rule or ruleset in [Semgrep Registry](https://semgrep.dev/r/).
2. Click **Add these to Rule Board** or **Add to Rule Board**.
3. Select which column to place the rule or ruleset in. 
4. The new card appears on your Rule Board.

### From Semgrep Playground

1. Enter a name and save your rule.
2. Click **Add to Rule Board**.
3. Select which column to place the rule or ruleset in. 
4. The new card appears on your Rule Board.

### From the in-app Editor

1. From the **Library** pane, click the rule to add to the Rule Board. The rule appears on the code pane.
2. Click **Add to Rule Board**.
3. Select which column to place the rule or ruleset in. 
4. The new card appears on your Rule Board.

## Disabling rules

<DisableRule />

## Removing rulesets

<RemoveRuleset />

## Configuring notifications

[Notifications](/semgrep-cloud-platform/notifications) enable you to keep track of Semgrep scans within your preferred environment, such as email or Slack. They are configured for each column.

1. Click the <i class="fa-solid fa-gear"></i> **gear** icon of the column to add a notification.
2. Click **Manage Integrations** link.

For more information, follow guidelines for specific notification channel in [Notifications](semgrep-cloud-platform/notifications) documentation.

<MoreHelp />
