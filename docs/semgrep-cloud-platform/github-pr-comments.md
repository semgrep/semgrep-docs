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

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Enabling GitHub pull request comments

:::info Prerequisites
* Pull request (PR) comments can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up PR comments.
* To receive alerts and notifications, you must [add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

Pull request comments are created when:

1. Semgrep finds a result in CI.
2. The Semgrep GitHub App has permissions to post inline PR comments.

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/semgrep-pull-request.png#bordered)
**Figure** An inline GitHub pull request comment.

[Semgrep Cloud Platform](https://semgrep.dev/manage) uses the permissions requested by [the Semgrep GitHub App](https://github.com/marketplace/semgrep-dev) to leave PR comments. You can verify that you have granted these permissions by visiting either `https://github.com/organizations/<your_org_name>/settings/installations` or `https://github.com/organizations/<your_org_name>/<your_repo_name>/settings/installations`.

If you are using GitHub Actions to run Semgrep, no extra changes are needed to get PR comments. If you are using another CI provider, in addition to the environment variables you set after following [sample CI configurations](/semgrep-ci/sample-ci-configs/) you need to ensure that the following environment variables are correctly defined:

- `SEMGREP_PR_ID` is set to the PR number of the pull request on GitHub (for example, `2901`)
- `SEMGREP_REPO_NAME` is set to the repository name (for example, `returntocorp/semgrep`)
- `SEMGREP_REPO_URL` is set to the repository URL where your project is viewable online (for example, `https://github.com/returntocorp/semgrep`)

:::info
Only rules in the **Comment** and **Block** columns of your [Policies](https://semgrep.dev/orgs/-/board) create PR comments.
:::

## Enabling autofix in GitHub repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

## Dataflow traces in PR comments

![Screenshot of a GitHub PR comment with dataflow traces](/img/dataflow-traces-pr-comments.png#bordered)
**Figure** An inline GitHub pull request comment with dataflow traces.

<DisplayTaintedDataIntro />

### Viewing the path of tainted data in PR comments

To enable dataflow traces feature in your CI pipeline, fulfill the following prerequisites:

:::info Prerequisites
- Enable GitHub pull request Semgrep comments, as described on this page.
- To obtain meaningful results of dataflow traces in PR comments, use Semgrep Pro Engine while scanning your repositories to display cross-file (interfile) findings. To enable Semgrep Pro Engine, see [Semgrep Pro Engine overview](/semgrep-code/semgrep-pro-engine-intro/).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset that does, such as the **default ruleset**, added in your **[Policies](https://semgrep.dev/orgs/-/board)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policies**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::

<MoreHelp />
