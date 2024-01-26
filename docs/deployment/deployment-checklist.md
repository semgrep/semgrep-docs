---
slug: checklist
append_help_link: true
title: Pre-deployment checklist
description: tk
tags:
  - Deployment
---



Before starting the deployment setup, use this checklist to ensure that:

- You and your organization agree on the **scope** of the deployment.
- You are aware of **permissions** that Semgrep needs to provide certain functions.
- You have **access** to the resources needed to carry out the deployment.

:::tip
Check out [How to introduce Semgrep to your organization](https://blog.trailofbits.com/2024/01/12/how-to-introduce-semgrep-to-your-organization/) from Trail of Bits for tips on how to evaluate and deploy Semgrep for your org.
:::


Ensure that your deployment meets all the [<i class="fa-regular fa-file-lines"></i> Prerequisites](/getting-started/prerequisites) for Semgrep.

## Stakeholders and deployment team

Semgrep integrates deeply and early in the development process. For medium-to-large teams, typically of more than 10 developers, coordinating before the deployment with other departments is crucial to a speedy roll-out.

Here are some teams or departments that may be responsible for parts of your Semgrep deployment:

| Department | Tasks related to deployment  |
| -------  | ------ |
| Infrastructure         | SSO, CI/CD, and SCM configuration        |
| Engineering | Repository ownership, displaying findings to developers in PRs or MRs |
| IT | Firewall or VPN configuration (for self-hosted repositories) |

## Scope 

Scope refers to the breadth of deployment integration within your organization. The more users and repositories you onboard to Semgrep, the more crucial training becomes for **security champions** within your organization.

| Ensure that all stakeholders agree on: | Done |
| -------  | ------ |
| Which users and departments will use Semgrep. |  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    |
| Which repositories you will scan with Semgrep. | |
| How frequently you run Semgrep scans, such as daily or weekly, and at what time. This may affect other processes, such as PR approvals. | |
| A timeframe for deployment. You may divide this into phases. | |

**Deployment times** vary greatly depending on your processes and size.

:::tip On scheduling scans
Monorepos may take longer to finish scanning. Semgrep provides several options, including piecemeal scanning of the monorepo. See [<i class="fa-regular fa-file-lines"></i> Scan a large monorepo](/kb/semgrep-code/scanning-large-monorepo/) for more information.
:::

## Roles

Semgrep provides two roles: `admin` and `member`. At the minimum: Establish the administrators (`admins`) that own the Semgrep deployment. For single-user deployments, you are the sole `admin` of your deployment.

| Task | Done |
| -------  | ------ |
| Decide on `admin` users. |      |
| Establish `user` headcount and ensure they have a means of authentication. | |

## Permissions and access 

The following checklist breaks down permissions required by Semgrep features.

### Semgrep in CI

| Feature | Permission required | Granted |
| -------  | -------  | ------ |
| Enables Semgrep to run continuously in your CI workflow. | Add or make changes to CI jobs. This includes **committing configuration files** for each repository you want to scan.         |        |
 |   | Define environment variables and storing secrets.         |        |

### Source code managers

#### GitHub

| Feature | Permission required | Granted |
| --- | -------   -------  | ------ |
| Create CI jobs for repositories in bulk | Install GitHub apps.         |        |
| Pull request (PR) comments. |  For GitHub Enterprise Server: Add a personal access token (PAT) with [assigned scopes](/deployment/connect-scm/#connect-to-on-premise-github-or-gitlab-orgs).          |        |
| GPT-assisted triage and recommendations. | Code access. |  |

[<i class="fas fa-external-link fa-xs"></i> GitHub guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

#### GitLab

| Feature | Permission required | Granted |
| ------- |   -------  | ------ |
| Merge request (MR) comments. | Create personal access tokens. |  |
| GPT-assisted triage and recommendations. | Create personal or project-level access tokens. |  |
| GPT-assisted triage and recommendations. | Code access. |  |

[<i class="fas fa-external-link fa-xs"></i> GitLab guide](https://docs.gitlab.com/ee/ci/secrets/)

#### Bitbucket 

| Feature  | Permission | Granted |
| -------  | -------  | ------ |
| Pull request (PR) comments.  | Able to create **repository variables**. | 

### VPN

This section is for self-hosted repositories.

| Feature  | Permission | Granted |
| -------  | -------  | ------ |
| Send pull or merge requests to your SCM.  | Edit firewall or VPN's allowlist. | 

### SSO

- For SSO: View and edit SSO configurations.

### Notifications

- For notifications: Set up channels in your chosen notification method (Slack, email, or webhooks).

## Appendices

### Permissions

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

Bitbucket - repository variables

## Semgrep versions

Many improvements to the Semgrep Cloud Platform experience only work with up-to-date Semgrep CLI versions. As such, Semgrep Cloud Platform only supports the 10 most recent minor versions of Semgrep CLI. For example, if the latest release was 0.114.0, all versions greater than 0.104.0 are supported, while earlier versions, such as 0.103.0, can be deprecated or can result in failures.

See [Updating Semgrep](/upgrading/) for information on how to upgrade.

Docker users: use [the **latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure you are up-to-date.

Required access tokens

