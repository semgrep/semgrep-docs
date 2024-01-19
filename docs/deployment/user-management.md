---
slug: user-management 
append_help_link: true
title: Setting up roles 
hide_title: true
description: "Learn about roles, user management, and how to implement role-based access control in Semgrep Cloud Platform."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"

# User management, accounts, and roles 

Accounts enable you to manage access to Semgrep resources, such as scans and findings, with varying levels of collaboration and visibility.

Semgrep Cloud Platform has two types of accounts:

<dl>
    <dt>Personal account</dt>
    <dd>Every person who signs into Semgrep Cloud Platform is first signed in to a <strong>personal account</strong>. In a personal account, your findings, projects, private rules, and scans are visible only to you.</dd>
    <dt>Organization (Org) account</dt>
    <dd>To collaborate with others, create an <strong>organization account</strong>. An organization account in Semgrep Cloud Platform connects to an existing organization on GitHub or GitLab. Creating this type of account integrates Semgrep Cloud Platform with your SCM (source code management) organization. A user can be part of many Semgrep Cloud Platform organization accounts, provided that they are a member of that organization in their SCM tool, such as GitHub or GitLab. Semgrep Cloud Platform can also detect the organization's repositories available for scanning.</dd>
</dl>

In organization accounts, collaborators can collectively manage Semgrep Cloud Platform. By default, users can:

* Add projects to scan.
* View and triage findings.
* Determine what rules to run and set up actions that Semgrep Cloud Platform will perform.
* Manage tokens and other settings.
* View an organization's private rules.

Semgrep Cloud Platform can restrict features based on user roles. See [Controlling access through roles](#controlling-access-through-roles).

## Setting up a Semgrep organization account

By setting up an organization account, teams can collaborate on rule writing and the management of repositories. Teams with organization accounts can enforce organization-wide standards and secure their repositories at scale. Perform the steps outlined in the following subsections to set up an organization account.

### Creating a Semgrep organization account

:::note
Semgrep supports the integration of organization accounts with GitHub or GitLab only.
:::

To create an organization account:

1. Sign in to Semgrep Cloud Platform.
2. On the sidebar, click **your account name > Add org**.
3. Choose **Create an organization**.
4. Enter the **Organization Display Name**. Typically the organization display name matches the name of the organization in your SCM, but this is not required.
5. Click **Create**.

You have successfully created a Semgrep organization that you can now connect to GitHub or GitLab.

### Connecting a Semgrep organization account to your SCM

This step connects your Semgrep organization account to a source code manager, such as GitHub. Linking a source code manager allows the Semgrep org's membership to be managed by GitHub or GitLab. After connecting your Semgrep org to GitHub or GitLab, members from GitHub or GitLab are able to join the Semgrep organization you created and connected.

You can only connect your Semgrep organization to the source code manager that you originally logged in with. For example, if you logged in to Semgrep Cloud Platform with GitHub, you do not see the **Connect to GitLab** option. If your organization uses both GitHub and GitLab to manage source code, log in with the source code manager that you would prefer to use to manage Semgrep org membership. You can still scan repositories from other sources.

:::info Connecting to GitHub
When connecting to GitHub, Semgrep prompts you to install the Semgrep GitHub app for your organization. If you don't have permission to install apps on your GitHub organization, you won't be able to complete the connection. Identify a GitHub organization admin or owner who has permissions to install or approve the app before proceeding.
:::

1. Sign in to Semgrep Cloud Platform.
2. On the sidebar, click **your account name** > **the organization account** you created.
3. Click **Settings** > **Source Code Managers**.
4. Click on your Source code manager, for example, **Connect to GitHub**.
5. Follow the prompts in the Cloud Platform and select an organization or group to link.
6. After a successful link, you are signed out of Semgrep Cloud Platform automatically, as your credentials have changed after linking an organization.
7. Sign back in to Semgrep Cloud Platform.

You have successfully connected an org in Semgrep Cloud Platform with an organization in your source code management tool.

### Joining a Semgrep organization

If a Semgrep organization has been connected to GitHub or GitLab, members of the org in GitHub or GitLab can join the Semgrep organization. To join a Semgrep org account, perform the following steps:

1. Sign in to Semgrep Cloud Platform.
2. On the sidebar, click **your account name > Add org**.
3. Choose **Join an organization**. A list of possible orgs to join appears.
4. Click the organization you want to join. You are signed out of Semgrep Cloud Platform automatically as your credentials change after linking an organization.
6. Sign back in to Semgrep Cloud Platform.

You have successfully joined an org in Semgrep Cloud Platform.

## Controlling access through roles 

Access control in Semgrep Cloud Platform determines the resources and features that are available to users based on their role.

![Screenshot of role-based access control](/img/rbac-overview.png)<br />

Semgrep Cloud Platform divides users into two roles:

* `admin`
* `member`

:::info
* Users are assigned a role based on your [organization's default role](#setting-a-default-role). New organizations are created with a default role of `admin`.
:::

The following table displays features available to each role:

| Feature    | `member`  | `admin`   | Additional notes                                                                                                                   |
| ---------  | --------- | --------- | ---------                                                                                                                          |
| Dashboard  | yes       | yes       |                                                                                                                                    |
| Projects   | no        | yes       | Only `admin` can manage projects.                                                                                                  |
| Policies   | no        | yes       | Only `admin` can manage policies and rules.                                                                                        |
| Findings   | yes       | yes       | Both `admin` and `member` roles can sort, filter, comment on, and triage findings.                                                 |
| Editor     | yes       | yes       | `member` access is read-only within their organization. Users with a `member` role can use their personal account to write a rule. |
| Settings   | no        | yes       |                                                                                                                                    |
| Registry   | yes       | yes       |                                                                                                                                    |
| Playground | yes       | yes       |                                                                                                                                    |
| Docs       | yes       | yes       |                                                                                                                                    |

### Member-scoped access tokens

Both members and admins can log in through the command-line interface (CLI) by entering the following command:

```
semgrep login
```

This generates a unique token that is used to identify a member or admin. When logged in, members can run scans on their local machine through the `semgrep ci` command and publish a rule. This sends findings data to Semgrep Cloud Platform.

Only admin users can view member tokens in the **Settings > Tokens** tab. A token's access cannot be escalated to an admin-level token. A user must first obtain the admin role and then create a new token as an admin. See the following section on [Changing a user's role](/semgrep-cloud-platform/user-management/#changing-a-users-role).

Additionally, only admin users can make changes to the [Policies](/semgrep-code/policies).

![Screenshot of member tokens list](/img/member-tokens-table.png#md-width)<br />

## Changing a user's role

:::info Prerequisites
You must be an `admin` to perform this operation.
:::

To **change a user's role**:

1. On Semgrep Cloud Platform's sidebar, click Settings.
2. Click on the Members tab.
3. Search for the member whose role will be changed.
4. Click on the member's current role, under the role header. A drop-down box appears.
5. Select the new role for the member.

:::info
You cannot change your own role.
:::

## Setting a default role

Organizations start with a default role of `admin`.

To change this, perform the following steps:

1. On Semgrep Cloud Platform's sidebar, click Settings.
2. Click **Access > Defaults**.

![Screenshot of default user role](/img/default-user-role.png#md-width)<br />

## Appendix: Token scopes

Token scopes enable you to limit or grant permissions as necessary. Tokens can also be generated with appropriate scopes by Semgrep Cloud Platform when onboarding (adding) a repository. 

The following table displays token scopes and their permissions:

| Token scope | Send findings from a remote repository | Send findings from a local repository |  Send PR or MR comments | Connect to Semgrep API |
| ----------- | ------- | --- | --| -- |
| Agent (CI)  |   ✔️  Yes    |  ✔️ Yes  | ✔️  Yes | ❌ No |
| Web API     |  ❌ No    |  ❌ No | ✔️  Yes  | ✔️ Yes  |
| Member      |    ❌ No   |  ✔️ Yes  | ❌ No |❌ No |

The following table displays typical uses for token scopes:

| Token scope |Typical uses |
| ----------- | ----------- |
| Agent (CI)  | Generated by Semgrep Cloud Platform when onboarding (adding) a repository to Semgrep Cloud Platform. For non-GitHub-Actions users, you may have to copy and paste the token value into your CI provider's interface. |
| Web API     | Used to access Semgrep's API. | 
| Member      | Autogenerated by Semgrep CLI when a member is logging in through Semgrep CLI. Use this scope to scan your code locally using your organization's private rule and rulesets. The permissions of these tokens cannot be escalated. |

<MoreHelp />
