---
slug: receiving-notifications-from-ssc
append_help_link: true
description: "Receive notifications about reachable findings from your Semgrep Supply Chain scans."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Receiving notifications from SSC scans
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

Developers can be notified of vulnerabilities in their GitHub or GitLab environment through pull request or merge request comments.

## Receiving SSC notifications through pull request (PR) or merge request (MR) comments

[TODO Add image]
Semgrep Supply Chain can send pull request (PR) or merge request (MR) comments to notify developers in their GitHub or GitLab environment of **third-party reachable vulnerabilities** detected by a Semgrep Supply Chain scan. The following information is provided:

<dl>
<dt>Risk</dt>
<dd>A description of the vulnerability, including the types of attack it is vulnerable to.</dd>
<dt>Fix</dt>
<dd>Indicates what versions to upgrade to, if any, that resolves or eliminates the vulnerability.</dd>
<dt>Reference</dt>
<dd>A link to additional information about the vulnerability from [GitHub Advisory Database](https://github.com/advisories) and the [National Vulnerability Database](https://nvd.nist.gov/vuln) (NVD), if available.</dd>
</dl>

TODO fix link

:::info

Pull or merge requests with vulnerabilities detected by SSC are **not** blocked from merging.

:::


### Enabling Semgrep Supply Chain to send PRs or MRs

When you add or onboard a repository to Semgrep App, you typically provide permissions enabling Semgrep Supply Chain to send PR or MR comments to your repository without additional steps. PR or MR comments simply appear after Semgrep scans your pull or merge request.

To ensure that you have enabled Semgrep App to send PR or MR comments, refer to the following documentation:

<table>
<tr>
    <td><strong>GitHub or GitLab plan</strong></td>
    <td><strong>Document</strong></td>
</tr>
<tr>
    <td>GitHub Free, Pro, Team, and Enterprise Cloud</td>
    <td><a href="https://semgrep.dev/docs/semgrep-app/notifications/#enabling-github-pull-request-comments">Enabling GitHub pull request comments</a></td>
</tr>
<tr>
    <td>GitHub Enterprise Server</td>
    <td><a href="https://semgrep.dev/docs/semgrep-app/scm/">Integrating Semgrep into self-hosted repositories</a></td>
</tr>
<tr>
    <td>GitLab SaaS</td>
    <td><a href="https://semgrep.dev/docs/semgrep-app/notifications/#enabling-gitlab-merge-request-comments">Enabling GitLab merge request comments</a></td>
</tr>
<tr>
    <td>GitLab Self-managed</td>
    <td><a href="https://semgrep.dev/docs/semgrep-app/scm/">Integrating Semgrep into self-hosted repositories</a></td>
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
