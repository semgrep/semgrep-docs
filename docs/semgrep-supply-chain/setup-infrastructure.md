---
slug: setup-infrastructure
append_help_link: true
title: Infrastructure-specific configuration
hide_title: true
description: Refer to this section to set up Semgrep Supply Chain for your specific tooling or pipeline.
tags:
  - Semgrep Supply Chain
  - Team & Enterprise Tier
---



<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Set up Semgrep Supply Chain for your infrastructure

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs).
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
- Optionally, you have [set up SSO](/deployment/sso).
- You have successfully added a [Semgrep job](/deployment/add-semgrep-to-ci) to your CI workflow.
:::

Semgrep Supply Chain performs software composition analysis with reachability.

Scanning third-party code with Semgrep Supply Chain may require additional steps, such as generating a lock file that it can parse in continuous integration (CI).

The documents in this category describe how to set up Semgrep Supply Chain for specific lock files or CI providers, to ensure that your Semgrep Supply Chain deployment functions as intended.

| CI provider                 | Issue   | Solution |
| ----------                  | ------- | ------    |
| Jenkins UI using **[git plugin](https://plugins.jenkins.io/git/)** | Findings are not being sent to Semgrep AppSec Platform.  | Set the correct branch name by following the steps in [Setting up Semgrep Supply Chain with Jenkins UI](/docs/semgrep-supply-chain/setup-jenkins-ui)          |

| Package manager | Issue | Solution |
| ----------     | ------- | ------    |
| Maven | Semgrep Supply Chain requires a dependency tree to detect packages. | Generate a dependency tree using `mvn` by following the steps in [Setting up Semgrep Supply Chain with Apache Maven](/semgrep-supply-chain/setup-maven).  |
