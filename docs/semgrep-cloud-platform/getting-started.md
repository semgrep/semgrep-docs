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

## Signing into Semgrep Cloud Platform

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

## Organizations

Organization accounts in Semgrep allow users to share custom rules and view the scans of their colleagues. If you are the Semgrep administrator, you must create an organization before your colleagues can join. If you're an individual contributor, you can join an existing organization or create your own.

### Add an organization

If you are an administrator setting up Semgrep for your team, or you are a new Semgrep user, you can create an organization account and connect it to your source code manager as follows:

1. [Sign in](https://semgrep.dev/login/) to Semgrep.
2. If this is your first time logging in, Semgrep automatically prompts you to create an organization. Otherwise, click on the name of your deployment in the top-left of Semgrep Cloud Platform, then select **Add Org** to launch the dialog window.
   ![Create an organization dialog box](/img/create-an-org.png#md-width)
3. Provide the **Organization display name** you'd like to use, then click **Create new organization**. 
4. Semgrep redirects you to the **Scan a project on your machine** page; click **Skip setup** at the bottom to go directly to **Dashboard**.
5. Go to **Settings** > **Source Code Managers**.
   ![Source code manager tab](/img/source-code-manager.png#md-width)
6. Select the source code manager containing the org you want to connect to Semgrep Cloud Platform; follow the on-screen prompts to proceed. You can review permissions needed by Semgrep in [Requested permissions for GitHub and GitLab](#requested-permissions-for-github-and-gitlab).
7. *Optional:* [Configure SSO](/semgrep-cloud-platform/sso/) for your organization.

### Join an organization

You can join an existing Semgrep organization set up by your administrator if you are a member of the GitHub/GitLab organization that they have connected to Semgrep. To do so:

1. [Sign in](https://semgrep.dev/login/) to Semgrep Cloud Platform. If your administrator has configured SSO, select **Use SSO**; otherwise, log in with your GitHub/GitLab credentials.
2. Verify that the organization listed in the **Join an organization** box is correct. If there is more than one organization shown, select the one you want to join.
  ![Join an org dialog box](/img/join-an-org.png#md-width)
3. Click **Join an organization** to proceed.

## Scan a repository

Semgrep Cloud Platform displays findings after you've scanned your repository by running [Semgrep Code](/semgrep-code/getting-started) (SAST) and [Semgrep Supply Chain](/semgrep-supply-chain/getting-started) (SCA).

### Scan remote repository

<PlatformAddRepo />

#### Detect GitHub repositories

<PlatformDetectGhRepos />

### Scan a local repository

You can send scan results from a local repository to Semgrep Cloud Platform. The local repository is a separate **Project** from its remote counterpart.

:::caution
**If you have a personal Semgrep account *and* an account associated with an organization:** when logging into Semgrep via the CLI using `semgrep login`, ensure that you sign into SCP using your personal account. This prevents Semgrep from sending your local repository scan results to the organization account. See [Project separation between local and remote repositories](#project-separation-between-local-and-remote-repositories).
:::

To scan a local repository and send findings to SCP:

1. Log in to your Semgrep account via the CLI. Running this command launches a browser window, but you can also use the link that's returned in the CLI to proceed:
    ```console
    semgrep login
    ```
2. Follow the on-screen prompts.
3. Navigate to the root of your repository and start a scan by running:
    ```console
    semgrep ci
    ```

:::info
Ensure that you are using a version of the Semgrep CLI that is no more than 10 minor versions behind SCP. For example, if the latest release of SCP is 0.114.0, the earliest version of Semgrep CLI that you should use is 0.104.0. Otherwise, you may encounter deprecated features or see scan errors.

Docker users: use the [**latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure the Semgrep CLI is up-to-date.
:::

### Project separation between local and remote repositories

Semgrep uses different naming conventions for project slugs depending on whether the repository scanned is local or remote:

* Local repository: `repository-name`
* Remote repository: `account-name/repository-name`.

The following image shows how SCP shows remote and local projects to a user.

![Projects view with local and remote counterparts of the same repository.](/img/projects-remote-local-slugs.png)

* **For personal accounts:** A local repository scan does not overwrite the findings records of its remote counterpart. They are two separate Semgrep Projects. Personal accounts only have one user: you.
* **For organization accounts**: A local repository scan does **not** overwrite findings records of its remote counterpart. However, if two or more members send local repository findings to SCP, one set of findings may overwrite others. This is because organization accounts can have multiple team members, and the CLI sends all local scan findings to the same project slug.

## Requested permissions for GitHub and GitLab

<Tabs
    defaultValue="permissions-github"
    values={[
    {label: 'GitHub', value: 'permissions-github'},
    {label: 'GitLab', value: 'permissions-gitlab'},
    ]}
>

<TabItem value='permissions-github'>

Semgrep requests the following permissions to your GitHub account when you: 

* Sign in for the first time
* Add your repositories to Semgrep Cloud Platform

### Permissions for sign-in

Semgrep Cloud Platform requests the standard permissions set by GitHub when you first sign in, though it does not use all the permissions. The following list explains how SCP uses the permissions you grant when you sign in for the first time:

<dl>
    <dt>Verify your GitHub identity</dt>
    <dd>Enables SCP to read your GitHub profile data, such as your username.</dd>
    <dt>Know which resources you can access</dt>
    <dd>SCP does not use or access any resources when you first log in, but you can choose to share resources at a later point to add repositories to SCP.</dd>
    <dt>Act on your behalf</dt>
    <dd>Enables SCP to perform tasks <strong>only on resources that you choose to share with SCP</strong>. SCP never uses this permission to perform actions on your behalf, even if you have <code>semgrep-app</code> installed. See <a href ="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-github-apps">When does a GitHub App act on your behalf?</a> for more information.</dd>
</dl>

### Permissions to add repositories to Semgrep Cloud Platform

With [`semgrep-app`](https://github.com/apps/semgrep-app), you can integrate Semgrep into your GitHub repositories. The app requires the following permissions:

<dl>
    <dt>Reading metadata of the repositories you select</dt>
    <dd>Enables SCP to list repository names on the project setup page.</dd>
    <dt>Reading the list of organization members</dt>
    <dd>Enables SCP to determine who can manage your Semgrep organization based on your GitHub organization's members list.</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Enables SCP to push comments about findings on pull requests.</dd>
    <dt>Reading and writing actions</dt>
    <dd>Enables SCP to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
    <dt>Reading <a href="https://docs.github.com/en/rest/reference/checks">GitHub Checks</a></dt>
    <dd>Facilitates debugging of SCP when configured using <a href="https://docs.github.com/en/actions">GitHub Actions</a>.</dd>
    <dt>Reading and writing security events</dt>
    <dd>Enables integration with GitHub Advanced Security (for example, to show Semgrep results).</dd>
    <dt>Reading and writing secrets</dt>
    <dd>Enables the automatic addition of the SCP token to your repository secrets when onboarding projects. Note: Semgrep cannot read the values of your existing or future secrets (only the names).</dd>
    <dt>Reading and writing 2 files</dt>
    <dd>Enables SCP to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code> and <code>.semgrepignore</code> .</dd>
    <dt>Reading and writing workflows</dt>
    <dd>Enables SCP to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code>. GitHub allows writing to files within the <code>.github/workflows/</code> directory only if this permission is granted along with the permission to "Writing a single file."</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Enables SCP to comment about findings on pull requests. Read permissions allow SCP to automatically remove findings when the pull request that introduced them is closed without merging.</dd>
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

## Session details

- A Semgrep Cloud Platform session token is valid for seven days, so you must reauthenticate every seven days.
- The session timeout value is not configurable.
- Semgrep Cloud Platform does not use cookies; it uses `localStorage` to store access tokens. The data in `localStorage` expires every seven days. 

<MoreHelp />
