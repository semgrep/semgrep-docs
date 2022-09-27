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
import FindingsHistory from "/src/components/procedure/_app-findings-history.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li className='tag__badge-item'>{value}</li> )
}
</ul>

# Triaging findings through comments

Triage Semgrep App findings are displayed as comments in GitHub pull request (PR) by replying with another comment. 

## Requirements

- Semgrep APP account. For more information, see [Getting started with Semgrep App](/semgrep-app/getting-started-with-semgrep-app.md).
- GitHub repository with enabled Semgrep App comments. For more information, see [Enabling GitHub pull request comments](/semgrep-app/notifications/#enabling-github-pull-request-comments).

## Ignoring findings through comments

To triage a finding in GitHub, follow these steps:

1. Find an open comment created by Semgrep App in GitHub PR:
    ![Screenshot of Semgrep App comment in GitHub](/img/semgrep-app-comment-github.png)<br />
    *Figure 1.* Screenshot of Semgrep App comment in GitHub.
2. In the blocking comment, reply with:
    <pre><code>
    /semgrep ignore <span className="placeholder">&lt;reason&gt;</span>
    </code></pre>
3. Substitute the colored placeholder <code><span className="placeholder">&lt;reason&gt;</span></code> with any text that can help to understand why the status of a comment is ignored.

:::info
Ignoring a finding through a comment in GitHub changes the status of the finding to **ignored** in the Semgrep App. See [Findings](/semgrep-app/findings.md) page documentation for more details. The GitHub conversation itself is not automatically resolved by this process.
:::

:::tip
You can also reopen a finding that was previously ignored. To do so, in step 2. of the procedure above, use <code>/semgrep open</code>.
:::

## Accessing history of a finding

To access the history of a finding, go to the Semgrep App [Findings page](https://semgrep.dev/orgs/-/findings), and then follow these steps:

<FindingsHistory />

<MoreHelp />
