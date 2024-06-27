---
slug: github-pr-comments
append_help_link: true
title: GitHub PR comments
hide_title: true
description: "Enable pull request (PR) comments in your GitHub repositories to display Semgrep findings to developers."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

<!-- vale off -->

import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import DefineConnectionVariables from "/src/components/reference/_define-connection-variables.mdx"
import ReceiveCommentsScm from "/src/components/procedure/_receive-comments-scm.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import DisableComments from "/src/components/procedure/_disable_ssc_pr_mr_comments.mdx"

<!-- vale on -->

# Set up GitHub pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your GitHub repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/gh-pr-comment.png#md-width)
**Figure** An inline GitHub pull request comment.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Steps to set up PR comments

### Prerequisites

In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.

### Confirm your Semgrep account's connection

Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your GitHub org exists and is correct.

### Confirm repository access

Ensure that Semgrep's GitHub app (`semgrep-app`) has sufficient permissions to post PR comments:

1. Navigate to your `semgrep-app` settings:
	1. For personal accounts, navigate to the following URL `https://github.com/settings/installations`.
	2. For organization accounts, navigate to the following URL, substituting YOUR_ORG_NAME with the name of your account: `https://github.com/organizations/YOUR_ORG_NAME/settings/installations`.
2. On the `semgrep-app` row, click **Configure**.
3. Check that you have granted the following permission: `Read and write access to actions, pull requests, secrets, security events, and workflows`.
4. Under **Repository access**, check that you have included the repositories that you added to Semgrep AppSec Platform. Review the following examples:

![Semgrep GitHub app permissions: all repositories](/img/gh-app-permissions-all.png#bordered)
**Figure** Permissions for all repositories.

![Semgrep GitHub app permissions - select repositories](/img/gh-app-permissions-select.png#bordered)
**Figure** Permissions for select repositories. Ensure the repositories you have onboarded to Semgrep AppSec Platform are selected.

For GitHub Actions users, no further steps need to be undertaken. Continue setting up Semgrep Code PR comments by [setting rules to Comment or Block mode](#set-rules-to-comment-or-block-mode).

### Required environment variables

<DefineConnectionVariables name="GitHub Actions" comment_type="PR"/>

### Configure comments for Semgrep Code

<PrCommentsInSast name="GitHub" comment_type="PR" />

If you are using **GitHub Actions** to run Semgrep, no extra changes are needed to receive PR comments.

### Receive comments in your VPN or on-premise SCM

<ReceiveCommentsScm />

You've set up PR comments! Enable optional features provided in the following sections, or see [Next steps](#next-steps).

## Optional features

### Enable autofix in GitHub repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

### Dataflow traces in PR comments

![Screenshot of a GitHub PR comment with dataflow traces](/img/dataflow-traces-pr-comments.png#bordered)
**Figure** An inline GitHub pull request comment with dataflow traces.

<DisplayTaintedDataIntro />

#### View the path of tainted data in PR comments

To enable dataflow traces feature in your CI pipeline, fulfill the following prerequisites:

:::info Prerequisites
- Set up Semgrep to post GitHub PR comments, as described on this page.
- To obtain meaningful results of dataflow traces in PR comments, use cross-file analysis while scanning your repositories. To enable cross-file analysis, see [<i class="fa-regular fa-file-lines"></i> Perform cross-file analysis](/semgrep-code/semgrep-pro-engine-intro).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset that does, such as the **default ruleset**, added in your **[Policies](https://semgrep.dev/orgs/-/policies)**. To add this ruleset, navigate to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policies**.
- You can add additional rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::

### Prevent developers from merging a PR with a reachable vulnerability

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

## Disable PR comments for Supply Chain findings

<DisableComments />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
