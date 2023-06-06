---
slug: demo-project 
append_help_link: true
title: Learning Semgrep Code 
hide_title: true
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
description: "Try Semgrep Code workflows, triage findings and work with rules and rulesets without any setup necessary. See what Semgrep detects in OWASP Juice Shop."
---

import MoreHelp from "/src/components/MoreHelp"
import Tags from "/src/components/Tags"
import DemoProjectIntro from "/src/components/concept/_demo-project-introduction.mdx"
import AddDemoProject from "/src/components/procedure/_add-demo-project.mdx"
import RemoveDemoProject from "/src/components/procedure/_remove-demo-project.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Learning Semgrep Code with a demo project

<DemoProjectIntro />

## Adding a demo project

<AddDemoProject />

## Removing a demo project

<RemoveDemoProject />

<MoreHelp />
