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
import AdmonitionSscLicense from "/src/components/reference/_admonition-ssc-license.md"
import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep Cloud Platform

Semgrep Cloud Platform (SCP) enables you and your team to run SAST (Static Application Security Testing) and SCA (Software Composition Analysis) scans continuously on multiple repositories by integrating with your GitHub, GitLab, or BitBucket SaaS repositories.

Semgrep Cloud Platform can receive findings from the following sources:

* Local command-line interfaces (CLI). [TODO] add a section for this
* GitHub, GitLab, BitBucket, and Azure Repos through continuous integration (CI).

This document describes the following: 

- Signing in to Semgrep Cloud Platform.
- Steps for admins configuring SCP for team or individual use through organization (org) accounts.
- Steps for team members to join an org in SCP.
- Scanning from different sources and sending findings to SCP.

<!-- [TODO] find another place for this
![Diagram of Semgrep Cloud Platform flow](/img/semgrep-app-diagram.png "Diagram of Semgrep Cloud Platform flow") -->

<AdmonitionSscLicense />

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

If you are an **administrator** setting up Semgrep for your team, see Adding an organization.

If you are a **team member joining an existing organization**, see Joining an organization.

If you are a **personal user**, or simply want to run scans, see Running scans.

## Adding an organization

## Joining an organization

:::info Prerequisites
- Your admin or inviter should have an existing organization (org) in Semgrep that is connected to the org in either GitHub or GitLab.
- You must be a member of the GitHub or GitLab org that is connected to Semgrep.
:::

For users that have been invited to join an organization or team, perform the following steps to be added to the org:

1. Sign in to Semgrep Cloud Platform. A **Welcome to Semgrep** dialog box appears.
2. Check that the organization under the **Join an organization** button is the correct org to join. If there is more than 1 org, select the org to join.
3. Click **Join an organization**.

### Running scans

## Sending scan results from Semgrep CLI to Semgrep Cloud Platform

:::info
Many improvements to the Semgrep Cloud Platform experience only work with up-to-date Semgrep CLI versions. For this reason, Semgrep Cloud Platform only supports the 10 most recent minor versions of Semgrep CLI. For example, if the latest release was 0.114.0, all versions greater than 0.104.0 are supported while earlier versions, such as 0.103.0 can be deprecated or can result in failures.

For Docker users: Use the [**latest** tag](https://hub.docker.com/r/returntocorp/semgrep/tags?page=1&name=latest) to ensure you are up-to-date.
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


### Semgrep Cloud Platform session details

- The time before you need to reauthenticate to Semgrep Cloud Platform is 7 days.
- A Semgrep Cloud Platform session token is valid for 7 days.
- This session timeout is not configurable.
- Semgrep Cloud Platform does not use cookies; instead it uses `localStorage` to store access tokens. The data in `localStorage` expires every 7 days. 

<MoreHelp />
