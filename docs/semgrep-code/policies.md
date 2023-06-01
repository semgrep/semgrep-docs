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

## Policies page structure

## Adding rules

## Disabling rules

## Filtering options

<MoreHelp />
