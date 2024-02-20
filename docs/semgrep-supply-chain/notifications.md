---
slug: notifications
append_help_link: true
description: "Receive notifications about reachable findings from your Semgrep Supply Chain scans."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Alerts and notifications (deprecate me)
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Receiving notifications from Semgrep Supply Chain (SSC) scans

Developers can be notified of vulnerabilities in their GitHub or GitLab environment through pull request (PR) or merge request (MR) comments.

## Receiving SSC notifications through PR or merge request MR comments

![Semgrep Supply Chain PR comment](/img/ssc-pr-comment.png#bordered)
_Figure 1_. Screenshot of a PR comment from SSC in a GitHub repository.

Semgrep Supply Chain can post GitHub pull request (PR) or GitLab merge request (MR) comments to notify developers of **third-party [reachable](/docs/semgrep-supply-chain/glossary/#reachability) vulnerabilities**. The following information is provided:



### Enabling Semgrep Supply Chain to send PRs or MRs

Receiving PR or MR comments for reachable findings, if any, is enabled by default. Comments appear after a Semgrep Supply Chain scan.

#### Custom Semgrep setups

:::note
This section provides documentation if PR or MR comments do not appear for custom Semgrep setups, such as self-hosted repositories. You may require additional permissions or an access token to receive PR or MR comments.
:::

To ensure that you have enabled Semgrep Cloud Platform to send PR or MR comments, refer to the following documentation:

<table>
<tr>
    <td><strong>GitHub or GitLab plan</strong></td>
    <td><strong>Document</strong></td>
</tr>
<tr>
    <td>GitHub Free, Pro, Team, and Enterprise Cloud</td>
    <td><a href="/docs/semgrep-cloud-platform/github-pr-comments">Enabling GitHub pull request comments</a></td>
</tr>
<tr>
    <td>GitHub Enterprise Server</td>
    <td><a href="/deployment/connect-scm/#connect-to-on-premise-github-or-gitlab-orgs">Integrating Semgrep into self-hosted repositories</a></td>
</tr>
<tr>
    <td>GitLab SaaS</td>
    <td><a href="/docs/semgrep-cloud-platform/gitlab-mr-comments">Enabling GitLab merge request comments</a></td>
</tr>
<tr>
    <td>GitLab Self-managed</td>
    <td><a href="/deployment/connect-scm/#connect-to-on-premise-github-or-gitlab-orgs">Integrating Semgrep into self-hosted repositories</a></td>
</tr>
</table>


<MoreHelp />
