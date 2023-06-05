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
import RemoveRuleset from "/src/components/procedure/_remove-ruleset.mdx"
import DisableRule from "/src/components/procedure/_disable-rule.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Policies

The Policies page displays a visual representation of the rules that Semgrep Code uses for scanning. Rules can be categorized into various groups. The Policies page uses the following categorization criteria:

- **Rule name**: Name of the rule that Semgrep Code uses for scanning.
- **Severity**: The higher the severity, the more critical issues can a rule potentially detect. There are rules with **high**, **medium**, and **low** severity.
- **Confidence**: Indicates confidence of the rule to detect true positives. There are rules with **high**, **medium**, and **low** confidence.
- 


Rules can be organized in rulesets. Rulesets are rules related through a programming language, OWASP category, or framework.

Rules and rulesets are displayed as **cards** in Semgrep Cloud Platform. Group cards by dragging and dropping cards into the columns. Columns represent the actions undertaken in response to findings from that rule or ruleset.

The columns and their corresponding actions are:

![Screenshot of the default state of the Policies page](/img/policies.png)

## Policies page structure

## Adding rules

## Disabling rules

## Filtering options

<MoreHelp />
