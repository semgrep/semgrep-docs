---
slug: github-pr-comments 
append_help_link: true
title: GitHub PR comments 
hide_title: true
description: "Enable pull request (PR) comments in your GitHub repositories to display Semgrep findings to developers."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import DefineConnectionVariables from "/src/components/reference/_define-connection-variables.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Set up GitHub pull request comments

<!--  The entire process of setting up the GH comment is more than just "enabling it", ie. turning it on. Users have to set up the rules. So I changed the verb. -->

Semgrep can create **pull request (PR) comments** in your GitHub repository. These comments inform your developers of **findings**, such as security issues, in their PRs. Semgrep can also provide remediation tips or code fixes that your developers can click to **commit** into their code directly.

:::info Prerequisites
- Pull request (PR) comments can only be set up through Semgrep Cloud Platform (SCP). [<i class="fas fa-external-link fa-xs"></i> Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up PR comments.
- You must connect your GitHub organization (org) to Semgrep.
    - For **GitHub Cloud**: See [<i class="fa-regular fa-file-lines"></i> Adding an organization](/semgrep-cloud-platform/getting-started/#adding-an-organization).
    - For **GitHub Enterprise Server**: [<i class="fa-regular fa-file-lines"></i> Integrate Semgrep with GitHub Enterprise](/semgrep-cloud-platform/scm/#integrating-semgrep-cloud-platform-with-github-enterprise-or-gitlab-self-managed) and if you have a VPN or firewall, [set up your allowlists](/semgrep-cloud-platform/scm/#receiving-pr-or-mr-comments-in-your-vpn-or-on-premise-scm).
- You must add or onboard a Semgrep project (repository) to SCP and it must complete at least one full scan on your default branch successfully.
:::
## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/semgrep-pull-request.png#bordered)
**Figure** An inline GitHub pull request comment.

## Confirm account connection and access

### Confirm your Semgrep account's connection to GitHub

Confirm that you have the correct connection and access:

1. In your SCP account, click **Settings > Source code managers**.
2. Check that an entry for your GitHub org exists and is correct.

### Confirm repository access

Ensure that Semgrep's GitHub app (`semgrep-app`) has sufficient permissions to post PR comments:

1. Navigate to your `semgrep-app` settings:
	1. For personal accounts, navigate to the following URL `https://github.com/settings/installations`.
	2. For organization accounts, navigate to the following URL, substituting YOUR_ORG_NAME with the name of your account: `https://github.com/organizations/YOUR_ORG_NAME/settings/installations`.
2. On the `semgrep-app` row, click **Configure**.
3. Check that you have granted the following permission: `Read and write access to actions, pull requests, secrets, security events, and workflows`.
4. Under **Repository access**, check that you have included the repositories that you added to Semgrep Cloud Platform.

For GitHub Actions users, no further steps need to be undertaken. Continue setting up Semgrep Code PR comments by [setting rules to Comment or Block mode](#set-rules-to-comment-or-block-mode).

<DefineConnectionVariables name="GitHub Actions" comment_type="PR"/>

<PrCommentsInSast name="GitHub" comment_type="PR" />

If you are using **GitHub Actions** to run Semgrep, no extra changes are needed to receive PR comments.

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
- To obtain meaningful results of dataflow traces in PR comments, use Semgrep Pro Engine while scanning your repositories to display cross-file (interfile) findings. To enable Semgrep Pro Engine, see [Semgrep Pro Engine overview](/semgrep-code/semgrep-pro-engine-intro/).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset that does, such as the **default ruleset**, added in your **[Policies](https://semgrep.dev/orgs/-/policies)**. To add this ruleset, navigate to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policies**.
- You can add additional rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::


## Additional references 

<TroubleshootingPrLinks />

<MoreHelp />
