---
slug: ticketing
append_help_link: true
title: Ticketing Integrations
hide_title: true
toc_max_heading_level: 4
description: "Learn how to create tickets based on Semgrep findings in third-party ticketing systems."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"


<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Ticketing integrations

Send tickets to third-party ticketing systems through Semgrep Cloud Platform. 

Semgrep Cloud Platform can create tickets in the following systems:

* [Asana](/semgrep-cloud-platform/asana)
* [Jira](/semgrep-cloud-platform/jira)
* [Linear](/semgrep-cloud-platform/linear)

:::info
* Ticketing integrations can only be enabled through Semgrep Cloud Platform (SCP). [Sign up or sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
* To receive alerts and notifications, you must [add or onboard the project](/semgrep-code/getting-started/) (repository) to Semgrep Cloud Platform for scanning.
:::