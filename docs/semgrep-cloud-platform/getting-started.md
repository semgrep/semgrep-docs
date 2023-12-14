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
import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"
import PlatformDetectGhRepos from "/src/components/procedure/_platform-detect-ghrepos.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep Cloud Platform

Semgrep Cloud Platform (SCP) is used to manage and orchestra Semgrep Code, Semgrep Supply Chain, and Semgrep Secrets.

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

If you are an **administrator** setting up Semgrep for your team, see [Adding an organization](#adding-an-organization).


If you are a **team member joining an existing organization**, see [Joining an organization](#joining-an-organization).

If you are a **personal user**, or simply want to run scans, see [Running scans](#running-scans).

## Organizations

Organization accounts in Semgrep allow users to share custom rules and view the scans of their colleagues. If you are the Semgrep administrator, you must create an organization before your colleagues can join.

### Add an organization

If you are an administrator setting up Semgrep for your team, you can create an organization account and connect it to your source code manager as follows:

1. [Sign in](https://semgrep.dev/login/) to Semgrep.
2. If this is your first time logging in, Semgrep automatically prompts you to create an organization. Otherwise, click on the name of your deployment in the top-left of Semgrep Cloud Platform, then select **Add Org** to launch the dialog window.
   ![Create an organization dialog box](/img/create-an-org.png#md-width)
3. Provide the **Organization display name** you'd like to use, then click **Create new organization**. 
4. Semgrep redirects you to the **Scan a project on your machine** page; click **Skip setup** at the bottom to go directly to **Dashboard**.
5. Go to **Settings** > **Source Code Managers**.
   ![Source code manager tab](/img/source-code-manager.png#md-width)
6. Select the source code manager containing the org you'd like to connect to Semgrep Cloud Platform; follow the on-screen prompts to proceed. You can review permissions needed by Semgrep in [Requested permissions for GitHub and GitLab](#requested-permissions-for-github-and-gitlab).
7. *Optional:* [Configure SSO](/semgrep-cloud-platform/sso/) for your organization.

### Join an organization

You can join an existing Semgrep organization set up by your administrator if you are a member of the GitHub/GitLab organization that they have connected to Semgrep. To do so:

1. [Sign in](https://semgrep.dev/login/) to Semgrep Cloud Platform. If your administrator has configured SSO, select **Use SSO**; otherwise, log in with your GitHub/GitLab credentials.
2. Verify that the organization listed in the **Join an organization** box is correct. If there is more than one organization shown, select the one you want to join.
  ![Join an org dialog box](/img/join-an-org.png#md-width)
3. Click **Join an organization** to proceed.

## Running scans

### Starting a SAST and SCA scan on a remote repository

<PlatformAddRepo />

#### Detecting GitHub repositories

<PlatformDetectGhRepos />

:::tip Product-specific information
* To learn more about SAST scans on your codebase, see [Getting started with Semgrep Code](/semgrep-code/getting-started).
* To learn more about SCA scans for your third-party dependencies, see [Getting started with Semgrep Supply Chain](/semgrep-supply-chain/getting-started).
* Both products are **free for up to 10 contributors**. See [Usage limits](/usage-limits) to learn more about contributors and usage limits.
:::

### Starting a local repository scan and sending findings to SCP

You can send scan results from a local repository to Semgrep Cloud Platform. The local repository is a separate **Project** from its remote counterpart.

:::caution
For team members of an organization, it is **not** recommended to send local repository scan results to the organization account. When logging in to Semgrep from the CLI through `semgrep login`, ensure that you are signed in SCP as your **personal account**. See [Project separation between local and remote repositories](#project-separation-between-local-and-remote-repositories).
:::

To send findings from a local repository, perform the following steps:

1. Ensure that you are signed into Semgrep Cloud Platform in the account you want to send findings to. It is recommended to send local repository findings to your **personal** account.
2. Log in to Semgrep:
```
semgrep login
```
2. Click the login URL provided, or copy and paste it into your browser's address bar. Your are taken to your web browser to complete the login process.
3. Follow any additional steps.
4. After logging in, start a scan in your CLI:
```
semgrep ci
```

#### Project separation between local and remote repositories

The Project slug for a **remote repository** takes the form `account-name/repository-name`.

The Project slug for a **local repository** takes the form `repository-name`.

Refer to the following image for an example of both remote and local Projects in a single personal account.

![Projects view with local and remote counterparts of the same repository.](/img/projects-remote-local-slugs.png)

* **For personal accounts:** A local repository scan does not overwrite the findings records of its remote counterpart. They are two separate Projects. Personal accounts only have one team member or user: you.
* **For organization accounts**: A local repository scan does **not** overwrite findings records of its remote counterpart. For locally scanned Projects or repositories, if two members both send local repository findings, one set of findings may overwrite other unintentionally. This is because org accounts can have more than one team member, but all local scans are sent to the same Project slug.

:::info
Many improvements to the Semgrep Cloud Platform experience only work with up-to-date Semgrep CLI versions. For this reason, Semgrep Cloud Platform only supports the 10 most recent minor versions of Semgrep CLI. For example, if the latest release was 0.114.0, all versions greater than 0.104.0 are supported, while earlier versions, such as 0.103.0, can be deprecated or can result in failures.

For Docker users: use the [**latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure you are up-to-date.
:::

## Appendices

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
    <dd>Semgrep does not use or access any resources when first logging in. However, you can choose to share resources at a later point to add repositories into Semgrep Cloud Platform.</dd>
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
    <dd>Enables automatically adding of the Semgrep Cloud Platform Token to your repository secrets when onboarding projects. Note: Semgrep cannot read the values of your existing or future secrets (only the names).</dd>
    <dt>Reading and writing 2 files</dt>
    <dd>Enables Semgrep Cloud Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code> and <code>.semgrepignore</code> files.</dd>
    <dt>Reading and writing workflows</dt>
    <dd>Enables Semgrep Cloud Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code>. GitHub allows writing to files within <code>.github/workflows/</code> directory only if this permission is granted along with "Writing a single file."</dd>
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

### Semgrep Cloud Platform session details

- The time before you need to reauthenticate to Semgrep Cloud Platform is 7 days.
- A Semgrep Cloud Platform session token is valid for 7 days.
- This session timeout is not configurable.
- Semgrep Cloud Platform does not use cookies; instead it uses `localStorage` to store access tokens. The data in `localStorage` expires every 7 days. 

<MoreHelp />
