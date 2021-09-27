---
slug: rule-board
append_help_link: true
---

# Rule board

The rule board is a visual representation of the rules
that Semgrep uses to identify potential security issues.

Rules and rulesets are displayed as cards,
which you can drag and drop between columns.
When a Semgrep scan runs in CI,
the patterns it scans for
and the actions it takes in response to findings
are determined by where cards are placed on the rule board.

![Screenshot of the default state of the rule board](../img/rule-board.png)

## Columns

### Audit column

Findings from cards of this column are hidden from developers by default.
They will not block merging pull requests or be reported in the code review process.
You can [set these findings to notify you](#setting-up-notifications) via various channels.

:::tip

  To show results to developers in a non-blocking manner,
  you can set this column to notify via PR comments.

:::

### Block column

Findings from cards of this column are shown to developers as blocking in CI.
This means these findings need to be addressed before merging the PR.

### Gutter

The gutter on the right side of the board displays various kinds of cards that are inactive.

#### Registry search

Search the Semgrep Registry for rulesets via the search box at the top of the gutter.
Search results will show up in this column.

#### Recommended cards

Semgrep's rule recommendation engine will show ruleset cards in the gutter
when it finds technologies in your repositories with relevant rulesets available.

#### Disabled rules

If you removed a rule from an active ruleset,
you can find the rule card and restore it from here.

## Adding rules or rulesets

There are various ways to add cards to your rule board.

### Recommended rulesets

The gutter displays recommended rulesets for technologies in your repositories.
We suggest you add all these cards to the Audit column as they show up.

### Rulesets by name

Use the search box in the gutter column to find specific rulesets.
Rulesets are usually named after technologies and vulnerability classes.

:::tip

  If you're unsure about a ruleset,
  you can always expand it and drag just some of its rules onto the board.

:::

### Rules from the registry

As you explore the [Semgrep Registry](https://semgrep.dev/r),
you will see buttons named "Add these to Policy".
Click this button and select the "Rule board" option.
The new cards will show up on your board when you next open the page.

### Custom rules from the playground

When writing rules in [Semgrep Playground](https://semgrep.dev/editor),
you will see a button named "Add to Policy".
Click this button and select the "Rule board" option.
The new card will show up on your board when you next open the page.

## Removing rules or rulesets

### Rulesets

To remove a ruleset, just drag it to the gutter on the right.

### Rules

To disable just one rule from a ruleset,
expand the ruleset with the "rules" button.
You can then drag specific rules to the gutter on the right.
This will disable those rules but keep the rest of the ruleset enabled.

## Setting up notifications

To configure notifications,
click the bell button in the top right corner of a column.
