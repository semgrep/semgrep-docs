---
slug: triage-comment 
append_help_link: true
title: Triaging findings through comments
hide_title: true
description: "Triage your findings in GitHub using comments."
tags:
    - Semgrep App
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Triaging findings through comments

Triage findings through comments in GitHub to ignore blocking findings. To triage a finding, follow these steps:

1. Find a blocking comment created by Semgrep App in GitHub.
    TODO add a screenshot
2. In the blocking comment, respond with:
    ```
    /semgrep ignore <reason>
    ```

## Requirements

- Semgrep APP account
- GitHub repository with enabled Semgrep App comments



<MoreHelp />
