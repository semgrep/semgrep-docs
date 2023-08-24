---
slug: getting-started
append_help_link: true
title: Semgrep Cloud Platform
hide_title: true
description: "Get started with Semgrep Cloud Platform to scan for security vulnerabilities on both local and remote repositories hosted on GitHub and GitLab."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import ScanTargets from "/src/components/reference/_scan-targets.mdx"
import SscIntro from "/src/components/concept/_ssc-intro.md"
import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep Cloud Platform

Semgrep Cloud Platform (SCP) enables you to run scans continuously on multiple repositories by integrating with your GitHub, GitLab, or BitBucket SaaS repositories.

<SemgrepScan />

Semgrep Cloud Platform can scan the following targets: 

<ScanTargets />

:::info
Many improvements to the Semgrep Cloud Platform experience only work with up-to-date Semgrep CLI versions. For this reason, Semgrep Cloud Platform only supports the 10 most recent minor versions of Semgrep CLI. For example, if the latest release was 0.114.0, all versions greater than 0.104.0 are supported while earlier versions, such as 0.103.0 can be deprecated or can result in failures.

For Docker users: Use the [**latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure you are up-to-date.
:::

Semgrep Cloud Platform supports code scanning from:

* Local command-line interfaces (CLI).
* GitHub, GitLab, and BitBucket through continuous integration (CI).

![Diagram of Semgrep Cloud Platform flow](/img/semgrep-app-diagram.png "Diagram of Semgrep Cloud Platform flow")

## Benefits of using Semgrep Cloud Platform

### Semgrep Cloud Platform with Semgrep Code

Semgrep Code, a SAST tool, enables you to scan your first-party code through the use of rules. Many rules are available from [Semgrep Registry](https://semgrep.dev/explore), an open-source, community-driven repository of rules. You can also write your own rules to customize Semgrep for your team's specific practices, or publish rules for the community. You can use Semgrep Code from your CLI or with Semgrep Cloud Platform.

Using Semgrep Code with Semgrep Cloud Platform provides you with [Policies](/semgrep-code/policies), where you can determine which rules Semgrep uses and what action Semgrep undertakes when it generates a finding from that rule. Policies can block pull requests (PRs) or merge requests (MRs) from merging until findings are resolved. This behavior helps to prevent vulnerable code from shipping to widely-accessible environments, such as production or staging servers.

Semgrep Cloud Platform enables you to deploy, configure, and manage Semgrep in your continuous integration (CI) environment. Semgrep Cloud Platform supports the upload of findings from CLI scans as well. For more information, see [Getting started with Semgrep OSS Engine](/getting-started/).

### Semgrep Cloud Platform with Semgrep Supply Chain

Semgrep Supply Chain, an SCA (Software Composition Analysis) tool, enables you to scan third-party code (also known as dependency scanning), detecting vulnerabilities through the use of reachability analysis. Semgrep's security research team regularly writes rules for emerging vulnerabilities. You can use Semgrep Supply Chain from your CLI or with Semgrep Cloud Platform.

Using Semgrep Supply Chain with Semgrep Cloud Platform provides users with the Vulnerabilities page, wherein users can easily view, triage, and remediate vulnerabilities. Users are also kept up-to-date with the most recent rules through the Advisory page.

## Signing in to Semgrep Cloud Platform

<PlatformSigninIntro />

<Tabs
    defaultValue="signin-github"
    values={[
    {label: 'Sign in with GitHub', value: 'signin-github'},
    {label: 'Sign in with GitLab', value: 'signin-gitlab'},
    ]}
>

<TabItem value='signin-github'>

<PlatformSigninGithub />

</TabItem>

<TabItem value='signin-gitlab'>

<PlatformSigninGitlab />

</TabItem>

</Tabs>

### Requested permissions for GitHub and GitLab

<Tabs
    defaultValue="permissions-github"
    values={[
    {label: 'Permissions for GitHub', value: 'permissions-github'},
    {label: 'Permissions for GitLab', value: 'permissions-gitlab'},
    ]}
>

<TabItem value='permissions-github'>

#### Permissions for GitHub

This section explains Semgrep Cloud Platform permissions that are requested in two different events:

* When you first sign in through GitHub.
* When you first add, integrate, or onboard your repositories to Semgrep Cloud Platform.

##### Permissions when signing in with GitHub

Semgrep Cloud Platform requests the following standard permissions set by GitHub when you first sign in. However, not all permissions are used by Semgrep Cloud Platform. Read the following list to see how Semgrep Cloud Platform uses permissions when signing in:

<dl>
    <dt>Verify your GitHub identity</dt>
    <dd>Enables Semgrep Cloud Platform to read your GitHub profile data, such as your username.</dd>
    <dt>Know which resources you can access</dt>
    <dd>Semgrep does not use or access any resources when first logging in. However, you can choose to share resources at a later point in order to add repositories into Semgrep Cloud Platform.</dd>
    <dt>Act on your behalf</dt>
    <dd>Enables Semgrep Cloud Platform to perform certain tasks <strong>only on resources that you choose to share with Semgrep Cloud Platform</strong>. Semgrep Cloud Platform never uses this permission and never performs any actions on your behalf, even after you have installed <code>semgrep-app</code>. See <a href ="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-github-apps">When does a GitHub App act on your behalf?</a> in GitHub documentation.</dd>
</dl>

##### Permissions when adding your repositories into Semgrep Cloud Platform

The GitHub integration app is called [`semgrep-app`](https://github.com/apps/semgrep-app). This app is used to integrate Semgrep into user-selected GitHub repositories. It requires the following permissions:

<dl>
    <dt>Reading metadata of the repositories you select</dt>
    <dd>Enables Semgrep Cloud Platform to list repository names on the project setup page.</dd>
    <dt>Reading the list of organization members</dt>
    <dd>Enables Semgrep Cloud Platform to determine who can manage your Semgrep organization based on your GitHub organization's members list.</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Enables Semgrep Cloud Platform to comment about findings on pull requests.</dd>
    <dt>Reading and writing actions</dt>
    <dd>Enables Semgrep Cloud Platform to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
    <dt>Reading <a href="https://docs.github.com/en/rest/reference/checks">GitHub Checks</a></dt>
    <dd>Facilitates debugging of Semgrep Cloud Platform when configured out of <a href="https://docs.github.com/en/actions">GitHub Actions</a>.</dd>
    <dt>Reading and writing security events</dt>
    <dd>Enables integration with GitHub Advanced Security (for example, to show Semgrep results).</dd>
    <dt>Reading and writing secrets</dt>
    <dd>Enables automatically adding of the Semgrep Cloud Platform Token to your repository secrets when onboarding projects. Note: We cannot read the values of your existing or future secrets (only the names).</dd>
    <dt>Reading and writing 2 files</dt>
    <dd>Enables Semgrep Cloud Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code> and <code>.semgrepignore</code> files.</dd>
    <dt>Reading and writing workflows</dt>
    <dd>Enables Semgrep Cloud Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code>. GitHub allows writing to files within <code>.github/workflows/</code> directory only if this permission is granted along with "Writing a single file".</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Write permissions allow Semgrep Cloud Platform to leave pull request comments about findings. Read permissions allow Semgrep Cloud Platform to automatically remove findings when the pull request that introduced them is closed without merging.</dd>
</dl>

</TabItem>

<TabItem value='permissions-gitlab'>

#### Permissions for GitLab

Semgrep requires the following permissions (scopes) to enable the authentication of a session:

* `openid`
* `email`
* `profile`
* `API`

</TabItem>
</Tabs>

## Next steps

### Starting a SAST scan with Semgrep Code

To start a SAST scan on your codebase, see [Getting started with Semgrep Code](/semgrep-code/getting-started). Semgrep Code is free for up to 10 developers.

### Starting an SCA scan with Semgrep Supply Chain

To start an SCA scan for your third-party dependencies, see [Getting started with Semgrep Supply Chain](/semgrep-supply-chain/getting-started). Semgrep Supply Chain is free for up to 10 developers.

## Additional resources

### Semgrep Cloud Platform session details

- The time before you need to reauthenticate to Semgrep Cloud Platform is 7 days.
- A Semgrep Cloud Platform session token is valid for 7 days.
- This session timeout is not configurable.
- Semgrep Cloud Platform does not use cookies; instead it uses `localStorage` to store access tokens. The data in `localStorage` expires every 7 days. 

<MoreHelp />
