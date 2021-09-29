---
slug: rule-board
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Rule board

The rule board is a visual representation of the rules
that Semgrep App uses to scan code in CI.

Rules and rulesets are displayed as cards,
which you can drag and drop between columns.
The placement of cards in columns determines the Semgrep rules that run in CI and the actions taken in response to findings.

![Screenshot of the default state of the rule board](../img/rule-board.png)

## Columns

### Audit column

Findings from cards placed in this column are hidden from developers by default.
They will not block merging of pull requests or be reported in the code review process.
You can [set these findings to notify you](#setting-up-notifications) via various channels.

:::tip

  To show results to developers in a non-blocking manner,
  you can set this column to notify via PR comments.

:::

### Block column

Findings from cards placed in this column are shown to developers as blocking in CI.
These findings need to be addressed before merging the PR.

### Side column

The side column on the right of the board displays various kinds of cards that are inactive.

#### Registry search

Search the Semgrep Registry for rulesets via the search box at the top of the side column.
Search results will appear in this column.

#### Recommended cards

Semgrep will recommend relevant rulesets based on technologies it finds in your repositories and show them here.

#### Disabled rules

Find and restore rules previously removed from active rulesets here.

## Adding rules or rulesets

There are various ways to add cards to your rule board.

### Recommended rulesets

The side column displays recommended rulesets for technologies in your repositories.
Try adding all these cards to the Audit column as they appear.

### Rulesets by name

Use the search in the side column to find specific rulesets.
Rulesets are usually named after technologies and vulnerability classes.

:::tip

  If you're unsure about a ruleset,
  try expanding it and dragging just some of its rules onto the board.

:::

### Rules from the registry

As you explore the [Semgrep Registry](https://semgrep.dev/r),
you will see buttons named "Add these to Policy".
Click this button and select the "Rule board" option.
The new cards will appear on your board when you next open the page.

### Custom rules from the playground

When writing rules in [Semgrep Playground](https://semgrep.dev/editor),
you will see a button named "Add to Policy".
Click this button and select the "Rule board" option.
The new card will appear on your board when you next open the page.

## Removing rules or rulesets

### Rulesets

To remove a ruleset, just drag it to the side column on the right.

### Rules

To disable just one rule from a ruleset,
expand the ruleset with the "rules" button.
Then drag specific rules to the side column on the right.
This will disable those rules but keep the rest of the ruleset enabled.

## Configuring notifications

To configure notifications,
click the bell button in the top right corner of a column.

You can enable [third-party notifications](../notifications/)
and [inline pull request comments](../notifications/#pull-request-comments)
on a per-column basis in the resulting panel.

<MoreHelp />
