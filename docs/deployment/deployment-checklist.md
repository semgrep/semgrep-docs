---
slug: checklist
append_help_link: true
title: Pre-deployment checklist
description: Use this checklist to ensure a smooth deployment of Semgrep in your organization.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IpAddresses from "/src/components/concept/_ip_addresses.mdx"

Before starting the deployment setup, use this checklist to ensure that:

- You and your organization agree on the **scope** of the deployment.
- You are aware of **permissions** that Semgrep needs to provide certain functions.
- You have **access** to the resources needed to carry out the deployment.

:::info
Ensure that your infrastructure meets all the [<i class="fa-regular fa-file-lines"></i> Prerequisites](/prerequisites) to run Semgrep.
:::

## Stakeholders and deployment team

For medium-to-large teams, typically with more than 10 developers, coordinating with other departments before starting the deployment is crucial to an efficient roll-out. A complete deployment ensures that your licenses are fully used.

Here are some teams or departments that may be responsible for parts of your Semgrep deployment:

| Department | Tasks related to deployment  |
| -------  | ------ |
| Infrastructure         | SSO, CI/CD, and source code manager (SCM) configuration.        |
| Engineering | Repository ownership, displaying findings to developers in PRs or MRs. |
| IT | Firewall or VPN configuration. |

## Scope

Scope refers to the breadth of deployment integration within your organization. The more users and repositories you onboard to Semgrep, the more crucial training becomes for **security champions** within your organization.

Ensure that all stakeholders agree on:

- Which users and departments will use Semgrep.
- Which repositories you will scan with Semgrep.
- How frequently you run Semgrep scans, such as daily or weekly, and at what time. This may affect other processes, such as PR approvals.
-  A timeframe for deployment. You may divide this into phases.

**Deployment times** vary greatly depending on your processes and size.

:::tip On scheduling scans
Monorepos may take longer to finish scanning. Semgrep provides several options to improve performance, including piecemeal scanning of the monorepo. See [<i class="fa-regular fa-file-lines"></i> Scanning a monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts) for more information.
:::

## Roles

Semgrep provides two primary roles: **admin** and **member**.

Deployments can also enable a third role, **manager**, through the [Teams](/deployment/teams) feature, which provides project-level role-based access control.

For **single-user deployments**, you are the sole **admin** of your deployment.

For **multi-user deployments**, determine the following:

- The administrators (**admins**) that own the Semgrep deployment.
- For `members`, ensure that they have a sign-in method:
    - SSO
    - GitHub Cloud
    - GitLab Cloud

## Required permissions and access

The following checklist breaks down permissions required by Semgrep features.

<table>
<thead>
<tr>
<th>Feature</th>
<th>Permission required</th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">Run Semgrep continuously in your CI workflows.</td>
<td>Adding or making changes to CI jobs. This includes committing configuration files for each repository.</td>
</tr>
<tr>
<td>Defining environment variables and storing secrets.</td>
</tr>
<tr>
<td>Run Semgrep continuously <strong>without</strong> changing your CI workflows.</td>
<td>Read access to user-selected repositories.</td>
</tr>
<tr>
<td>Manage user authentication with SSO.</td>
<td>Viewing and editing of SSO configurations.</td>
</tr>
<tr>
<td>Receive Slack notifications.</td>
<td>Being a <strong>Slack workspace owner</strong>; alternatively, coordinate with the team responsible.</td>
</tr>
<tr>
<td>Send pull or merge requests to your SCM.</td>
<td>Editing firewall or VPN allowlist for self-hosted repositories.</td>
</tr>
</tbody>
</table>


### SCM-specific required permissions

<Tabs
    defaultValue="gh"
    values={[
    {label: 'Azure DevOps', value: 'az'},
    {label: 'Bitbucket', value: 'bb'},
    {label: 'GitHub', value: 'gh'},
    {label: 'GitLab', value: 'gl'}
    ]}
>

<TabItem value='gh'>

#### GitHub

| Feature | Permission required |
| --- | -------  |
| Create CI jobs for repositories in bulk and detect GitHub repositories automatically. | Installing GitHub apps.         |
| AI-assisted triage and recommendations. | Code access. |

</TabItem>

<TabItem value='gl'>

#### GitLab

<table>
<thead>
<tr>
<th>Feature</th>
<th>Permission required</th>
</tr>
</thead>
<tbody>
<tr>
<td>Merge request (MR) comments.</td>
<td>Create personal access tokens.</td>
</tr>
<tr>
<td rowspan="2">AI-assisted triage and recommendations.</td>
<td>Create personal or project-level access tokens.</td>
</tr>
<tr>
<td>Read access to user-selected repositories.</td>
</tr>
</tbody>
</table>


</TabItem>

<TabItem value='bb'>

#### Bitbucket

| Feature  | Permission |
| -------  | -------  |
| Pull request (PR) comments.  | Able to create **repository variables**. |

</TabItem>

<TabItem value='az'>

#### Azure DevOps

| Feature  | Permission |
| -------  | -------  |
| Pull request (PR) comments.  | Able to create [user personal access tokens](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate). |

</TabItem>

</Tabs>

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

This section explains Semgrep AppSec Platform permissions that are requested in two different events:

* When you first sign in through GitHub.
* When you first add, integrate, or onboard your repositories to Semgrep AppSec Platform.

##### Permissions when signing in with GitHub

Semgrep AppSec Platform requests the following standard permissions set by GitHub when you first sign in. However, not all permissions are used by Semgrep AppSec Platform.

<details>

<summary>Click to review how Semgrep AppSec Platform uses permissions when signing in.</summary>

<dl>
    <dt>Verify your GitHub identity</dt>
    <dd>Enables Semgrep AppSec Platform to read your GitHub profile data, such as your username.</dd>
    <dt>Know which resources you can access</dt>
    <dd>Semgrep does not use or access any resources when first logging in. However, you can choose to share resources at a later point to add repositories into Semgrep AppSec Platform.</dd>
    <dt>Act on your behalf</dt>
    <dd>Enables Semgrep AppSec Platform to perform certain tasks <strong>only on resources that you choose to share with Semgrep AppSec Platform</strong>. Semgrep AppSec Platform never uses this permission and never performs any actions on your behalf, even after you have installed <code>semgrep-app</code>. See <a href ="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/authorizing-github-apps">When does a GitHub App act on your behalf?</a> in GitHub documentation.</dd>
</dl>

</details>

##### Permissions when adding members or repositories into Semgrep AppSec Platform

The public GitHub integration app is called [`semgrep-app`](https://github.com/apps/semgrep-app). This app is used to integrate Semgrep into user-selected GitHub repositories.

<details>

<summary>Click to review how Semgrep AppSec Platform uses permissions when adding members or repositories.</summary>

<dl>
    <dt>Reading metadata of the repositories you select</dt>
    <dd>Enables Semgrep AppSec Platform to list repository names on the project setup page.</dd>
    <dt>Reading the list of organization members</dt>
    <dd>Enables Semgrep AppSec Platform to determine who can manage your Semgrep organization based on your GitHub organization's members list.</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Enables Semgrep AppSec Platform to comment about findings on pull requests.</dd>
    <dt>Reading and writing actions</dt>
    <dd>Enables Semgrep AppSec Platform to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
    <dt>Reading <a href="https://docs.github.com/en/rest/reference/checks">GitHub Checks</a></dt>
    <dd>Facilitates debugging of Semgrep AppSec Platform when configured out of <a href="https://docs.github.com/en/actions">GitHub Actions</a>.</dd>
    <dt>Reading and writing security events</dt>
    <dd>Enables integration with GitHub Advanced Security (for example, to show Semgrep results).</dd>
    <dt>Reading and writing secrets</dt>
    <dd>Enables automatically adding of the Semgrep AppSec Platform Token to your repository secrets when onboarding projects. Note: Semgrep cannot read the values of your existing or future secrets (only the names).</dd>
    <dt>Reading and writing 2 files</dt>
    <dd>Enables Semgrep AppSec Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code> and <code>.semgrepignore</code> files.</dd>
    <dt>Reading and writing workflows</dt>
    <dd>Enables Semgrep AppSec Platform to configure itself to run in CI by writing to <code>.github/workflows/semgrep.yml</code>. GitHub allows writing to files within <code>.github/workflows/</code> directory only if this permission is granted along with "Writing a single file."</dd>
    <dt>Reading and writing pull requests</dt>
    <dd>Write permissions allow Semgrep AppSec Platform to leave pull request comments about findings. Read permissions allow Semgrep AppSec Platform to automatically remove findings when the pull request that introduced them is closed without merging.</dd>
</dl>

</details>


##### Permissions when adding repositories into Semgrep AppSec Platform through managed scanning or using AI features

You can optionally create a private GitHub app, which follows the naming convention **Semgrep Code - <span className="placeholder">YOUR_ORG_NAME</span>**. This private app is used for the following features:

- To add repositories to Semgrep AppSec Platform without changing your existing CI workflows. To learn more, see [<i class="fa-regular fa-file-lines"></i> Managed scanning](/deployment/managed-scanning/overview).
- To integrate AI-asssisted features into your Semgrep organization. To learn more, see [<i class="fa-regular fa-file-lines"></i> Semgrep Assistant overview](/semgrep-assistant/overview).

:::info
These features require **read access** to your code.
:::

<details>

<summary>Click to review how Semgrep AppSec Platform uses permissions when adding repositories through <strong>managed scanning</strong>.</summary>

<dl>
<dt>Reading metadata of the repositories you select</dt>
<dd>Lets Semgrep list their names on the project setup page.</dd>
<dt>Reading the list of organization members</dt>
<dd>Lets Semgrep determine who can manage your Semgrep organization based on your GitHub organization's members list.</dd>
<dt>Writing (and reading) pull requests</dt>
<dd>Lets Semgrep comment about findings on pull requests.</dd>
<dt>Writing (and reading) actions</dt>
<dd>Allows Semgrep AppSec Platform to cancel stuck jobs, rerun jobs, pull logs from jobs, and perform on-demand scanning.</dd>
<dt>Reading checks</dt>
<dd>Facilitates debugging of Semgrep AppSec Platform when configured out of GitHub Actions</dd>
<dt>Writing (and reading) security events.</dt>
<dd>Enables integration with GitHub Advanced Security (for example, to show Semgrep results)</dd>
<dt>Writing (and reading) secrets</dt>
<dd>Enables automatic adding of the Semgrep AppSec Platform Token to your repository secrets when onboarding projects. Note: We cannot read the values of your existing or future secrets (only the names).</dd>
<dt>Writing (and reading) 2 files</dt>
<dd>Lets Semgrep configure itself to run in CI by writing to .github/workflows/semgrep.yml and .semgrepignore.</dd>
<dt>Writing (and reading) workflows</dt>
<dd>Lets Semgrep configure itself to run in CI by writing to .github/workflows/semgrep.yml. GitHub allows writing to files within .github/workflows/ only if this permission is granted along with "Writing a single file."</dd>
<dt>Read source code of the repositories you select</dt>
<dd>Allows Semgrep Assistant to fetch source code files on-demand to construct AI prompts.</dd>

</dl>

</details>

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

### IP addresses

<IpAddresses />

#### Allowlists when using Semgrep Network Broker

The [Semgrep Network Broker](/docs/semgrep-ci/network-broker) facilities secure access with Semgrep, and its use can replace the allowlisting of the IP addresses required for ingress. The Network Broker, however, only facilitates requests from Semgrep to your network and *doesn't* assist with requests originating from your network, including those from your network to Semgrep.

In other words, the only address you would have to allow inbound is `wireguard.semgrep.dev` on UDP port `51820`, but depending on how restrictive your network is, you may need to add to your allowlist all of the egress IP addresses provided in [IP addresses](#ip-addresses).

#### Features that require inbound network connectivity

- [Source code manager connections](/docs/deployment/connect-scm#connect-to-on-premise-orgs-and-projects)
- [PR and MR comments](/category/pr-or-mr-comments)
- [Semgrep Managed Scans](/deployment/managed-scanning/overview)
- [Semgrep Assistant](/semgrep-assistant/getting-started)

### Semgrep versions

Many improvements to the Semgrep AppSec Platform experience only work with up-to-date Semgrep CLI versions. As such, Semgrep AppSec Platform only supports the 10 most recent minor versions of Semgrep CLI. For example, if the latest release was 1.60.0, all versions greater than 1.50.0 are supported, while earlier versions, such as 1.49.0, can be deprecated or can result in failures.

To update Semgrep, see [Update Semgrep](/update).

Docker users: use [the **latest** tag](https://hub.docker.com/r/semgrep/semgrep/tags?page=1&name=latest) to ensure you are up to date.

### Semgrep AppSec Platform session details

- The time before you need to reauthenticate to Semgrep AppSec Platform is 7 days.
- A Semgrep AppSec Platform session token is valid for 7 days.
- This session timeout is not configurable.
- Semgrep AppSec Platform does not use cookies; instead it uses `localStorage` to store access tokens. The data in `localStorage` expires every 7 days.

## Additional resources

Check out [<i class="fas fa-external-link fa-xs"></i> How to introduce Semgrep to your organization](https://blog.trailofbits.com/2024/01/12/how-to-introduce-semgrep-to-your-organization/) from Trail of Bits for tips on how to evaluate and deploy Semgrep for your org.
