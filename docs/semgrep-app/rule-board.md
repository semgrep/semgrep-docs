---
slug: rule-board
append_help_link: true
description: "The Rule Board is a visual representation of the rules that Semgrep App uses to scan code. Rules are cards, and are grouped into columns representing the actions undertaken (whether to block, comment, or silently monitor) when a finding surfaces."
---

import MoreHelp from "/src/components/MoreHelp"

# Rule board


The Rule Board is a visual representation of the rules that Semgrep App uses to scan code. Rules can be organized in rulesets. Rulesets are rules related through a programming language, OWASP category, or framework.

Rules and rulesets are displayed as **cards**. Group cards by dragging and dropping cards into the columns. Columns represent the actions undertaken in response to findings from that rule or ruleset.

The columns and their corresonding actions are:

<dl>
    <dt>Monitor</dt>
    <dd>Rules that display findings only on Semgrep App.</dd>
    <dt>Comment</dt>
    <dd>Rules that display findings to developers through PR or MRs.</dd>
    <dt>Block</dt>
    <dd>Rules that block merges and commits, in addition to showing findings in Semgrep App and PRs or MRs.</dd>
</dl>

![Screenshot of the default state of the rule board](/img/rule-board.png)

Semgrep App is  pre-configured to use the `default` ruleset. The `default` ruleset scans for security vulnerabilities in common programming languages and frameworks.

Semgrep App detects the framework and language when scanning a project and only runs rules relevant for that framework and language.

## Adding rules or rulesets

### Through the search bar

1. Click **Add rules**. A drawer appears.
2. Search for rules by entering a relevant search term, such as your programming language, OWASP category, or framework in the search bar.
3. Optional: Display the rules within a ruleset by clicking on the **Expand** icon beside the name of the ruleset.
4. Optional: Display the rule definition by clicking on the **View in Playground** icon beside the name of the rule.
5. Drag the card and drop it on the relevant column.
6. Once you are done adding rules and rulesets, click **Save changes**.

:::tip
Discover suggested rulesets based on your projects's frameworks and technologies through **rule recommendations**. These recommendations appear when opening the drawer, enabling the user to choose from a curated list. Only rulesets explicitly added to a column will be included in a scan. To view these **rule recommendations**, see [Running a scan](../getting-started-with-semgrep-app/#running-a-scan).
:::

### From Semgrep Registry

1. Click a rule or ruleset in [Semgrep Registry](https://semgrep.dev/r).
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

## Removing rules or rulesets

To remove a rule or ruleset:

1. Click the **garbage can** icon.
2. Click **Remove**.
3. Click **Save changes**.

:::info

Individual rules within rulesets can only be disabled, not deleted.
:::

## Configuring notifications

[Notifications](../integrations) enable you to keep track of Semgrep scans within your preferred environment, such as email or Slack. They are configured for each column.

Prerequisites:

* An existing notification channel

1. Click the gear icon of the column to add a notification for.
2. Click the notifications to add for that column.

<MoreHelp />
