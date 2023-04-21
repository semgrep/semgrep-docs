---
slug: github-pr-comments 
append_help_link: true
title: GitHub PR comments 
hide_title: true
description: "Enable pull request (PR) comments in your GitHub repositories to display Semgrep findings to developers."
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Enabling GitHub pull request comments

:::info Prerequisites
* Pull request (PR) comments can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up Slack notifications.
* To receive alerts and notifications, you must [add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

Pull request comments are created when:

1. Semgrep finds a result in CI.
2. The Semgrep GitHub App has permissions to post inline PR comments.

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/semgrep-pull-request.png#bordered)
*Figure 3.* An inline GitHub pull request comment.

[Semgrep Cloud Platform](https://semgrep.dev/manage) uses the permissions requested by [the Semgrep GitHub App](https://github.com/marketplace/semgrep-dev) to leave PR comments. You can verify that you have granted these permissions by visiting either `https://github.com/organizations/<your_org_name>/settings/installations` or `https://github.com/organizations/<your_org_name>/<your_repo_name>/settings/installations`.

If you are using GitHub Actions to run Semgrep, no extra changes are needed to get PR comments. If you are using another CI provider, in addition to the environment variables you set after following [sample CI configurations](/semgrep-ci/sample-ci-configs/) you need to ensure that the following environment variables are correctly defined:

- `SEMGREP_PR_ID` is set to the PR number of the pull request on Github (for example, `2901`)
- `SEMGREP_REPO_NAME` is set to the repo name (for example, `returntocorp/semgrep`)
- `SEMGREP_REPO_URL` is set to the repository URL where your project is viewable online (for example, `https://github.com/returntocorp/semgrep`)

:::info
Only rules in the **Comment** and **Block** columns of your [Rule board](https://semgrep.dev/orgs/-/board) create PR comments.
:::

<MoreHelp />
