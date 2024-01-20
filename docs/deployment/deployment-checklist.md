---
slug: checklist
append_help_link: true
title: Pre-deployment checklist
description: tk
tags:
  - Deployment
---
<!--
Q: Why do we have a deployment checklist that is separate from prerequisites?

A: Because there are org and code access needs unique to rolling out Semgrep
A: WRT information in 2 places, they are updated in 1 file and cascaded, so it should be ok

-->
Before starting the deployment setup, use this checklist to ensure that:

- You and your organization agree on the **scope** of the deployment.
- You are aware of **permissions** that Semgrep needs to provide certain functions.
- You have **access** to the resources needed to carry out the deployment.

## Permissions and access 

Ensure that you and your deployment team have sufficient permissions to:

- Add or make changes to CI jobs.
- Create access tokens, such as CI/CD secrets, in your source code manager.
- Commit files to all repositories you want Semgrep to scan.
- For GitHub: Install GitHub apps.
- For self-hosted repositories:
    - Edit your firewall or VPN configuration's allowlist.
    - Add CI/CD secrets into your SCM.
        - [<i class="fas fa-external-link fa-xs"></i> GitHub guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
        - [<i class="fas fa-external-link fa-xs"></i> GitLab guide](https://docs.gitlab.com/ee/ci/secrets/)
- For SSO: View and edit SSO configurations.
- For notifications: Set up channels in your chosen notification method (Slack, email, or webhooks).

tk to edit in
For GitHub or GitLab SaaS users: A GitHub or GitLab SaaS repository associated with your account.
For BitBucket SaaS users: A BitBucket repository and sufficient permissions to edit a BitBucket Pipeline and add repository variables.

## Resources

Ensure that you have met all the [<i class="fa-regular fa-file-lines"></i> Prerequisites](/getting-started/prerequisites) for Semgrep.

Ensure that you and your deployment team agree on:

- What roles or departments will use Semgrep.
- The number of repositories you will scan with Semgrep.


## Processes

Determine the following:

- When you want to run a scan; common options include:
    - On a recurring schedule, such as daily or weekly. It is recommended to run Semgrep daily.
    - On certain events, such as a pull or merge request.
- On what branches you want to run a scan:
    - Feature branches.
    - Main or trunk branches.

## Roles

- Establish the administrators (admins) that own the Semgrep deployment.

## Permissions

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


