---
slug: notifications
append_help_link: true
description: "Receive notifications about reachable findings from your Semgrep Supply Chain scans."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Alerts and notifications 
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

Semgrep Supply Chain can post GitHub pull request (PR) or GitLab merge request (MR) comments to notify developers of **third-party reachable vulnerabilities** with a severity of **High or greater**. The following information is provided:

<dl>
<dt>Risk</dt>
<dd>A description of the vulnerability, including the types of attack it is vulnerable to.</dd>
<dt>Fix</dt>
<dd>Indicates what versions to upgrade to, if any, that resolves or eliminates the vulnerability.</dd>
<dt>Reference</dt>
<dd>A link to additional information about the vulnerability from <a href="https://github.com/advisories">GitHub Advisory Database</a> and the <a href="https://nvd.nist.gov/vuln">National Vulnerability Database (NVD)</a>, if available.</dd>
</dl>

:::info
Pull or merge requests with vulnerabilities detected by SSC are **not** blocked from merging.
:::


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
    <td><a href="/docs/semgrep-cloud-platform/scm/">Integrating Semgrep into self-hosted repositories</a></td>
</tr>
<tr>
    <td>GitLab SaaS</td>
    <td><a href="/docs/semgrep-cloud-platform/gitlab-mr-comments">Enabling GitLab merge request comments</a></td>
</tr>
<tr>
    <td>GitLab Self-managed</td>
    <td><a href="/docs/semgrep-cloud-platform/scm/">Integrating Semgrep into self-hosted repositories</a></td>
</tr>
</table>

### Prevent or block developers from merging a PR or MR when a reachable vulnerability has been detected

Both GitHub and GitLab provide features to prevent or block a PR or MR from merging based on certain conditions. Refer to the links below to prevent PRs or MRs from merging when a reachable finding is detected:

<table>
<tr>
    <td>GitHub</td>
    <td><a href="https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches#require-conversation-resolution-before-merging">Require conversation resolution before merging</a></td>
</tr>
<tr>
    <td>GitLab</td>
    <td><a href="https://docs.gitlab.com/ee/user/discussions/#prevent-merge-unless-all-threads-are-resolved">Prevent merge unless all threads are resolved</a></td>
</tr>
</table>

<MoreHelp />
