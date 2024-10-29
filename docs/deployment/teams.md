---
slug: teams
append_help_link: true
title: Teams and user management
hide_title: true
description: Manage user access to projects through Teams.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Manage user access to projects

Use the **Access** page to manage access to Semgrep resources, such as scans, projects, and findings. **Projects** are repositories or codebases you have added to SCP for scanning.

## User roles and access

Accounts enable you to manage access to Semgrep resources, such as scans, projects, and findings, with varying levels of collaboration and visibility. Basic access control is managed through the **Members** tab.

![Role-based access control](/img/rbac-overview.png)<br />

A user is any person who has been added to your organization in Semgrep.

Semgrep primarily divides users into two roles:

* `admin`
* `member`

Optionally, you can appoint members to a third role: the **manager** role. Managers are a subset of members with some additional capabilities and scopes. In particular, they are able to assign specific projects to members through the creation of [teams](#teams-beta).

:::info
* Users are assigned a role based on your [organization's default](#set-a-default-role). New organizations are created with a default role of `admin`.
:::

### Member permissions and visibility

Admins have full permissions, scopes, and visibility into all aspects of Semgrep.

Members can edit the following page:

- **Findings**. They can view **all projects** in the Findings page, and can sort and triage findings.

Members can view the following pages:

- **Dashboard**. They are able to see the total count of findings for all projects in the org.
- **Editor**. They can view an org's rules, but they can't write rules for the org. They can still write rules for their personal Semgrep orgs.
- **Registry**. They can view, but not add, rules and rule packs.
- **Docs**. Anyone can view the docs.

Members can't view or perform any actions in the following pages:

- Policies
- Projects
- Settings

### Change a user's role

You must be an `admin` to perform this operation.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Members**.
3. Search for the member whose role will be changed.
4. Click on the member's current role, under the role header. A drop-down box appears.
5. Select the new role for the member.

:::note
You cannot change your own role.
:::

### Set a default role

Organizations start with a default role of `admin`.

To change this, perform the following steps:

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings**.
2. Click **Access > Defaults**.

![Default user role](/img/default-user-role.png#md-width)
_**Figure**. Default user role._

## Teams (beta)

The **Teams (beta)** feature enables admins to grant or limit access to **specific projects** in Semgrep AppSec Platform (SCP). This provides more granular control than the [**Members** feature](#member-permissions-and-visibility).

You can quickly assign projects to large groups of members by first assigning members to teams and subteams within your organization.

![The Teams tab within the Settings page](/img/access-teams.png)
_**Figure**. The **<i class="fa-solid fa-gear"></i> Settings > Access > Teams** tab displays both top-level teams and subteams._

This feature helps security engineers and developers in large organizations focus on the projects that are relevant to their specific department or team.

When you limit a member's access to a subset of your projects, their **Dashboard** and **Findings** pages all reflect that change. For example, their total finding count is based on the total number of findings of the projects they can access.

This document walks you through the following:

- How to approach team management and project access in Semgrep
- How to create, view, update, and delete teams and subteams
- How to assign or unassign projects to teams

## Roles and visibility

The Teams feature extends the existing roles defined in the **Members** tab.

<dl>
<dt>Admin</dt>
<ul><li>A user who has access to all features, resources, and projects of their Semgrep deployment. Admins can also change the role of members and managers.</li>
<li>When creating teams, admins are automatically included in all teams and can't be removed from any team. The access of an admin cannot be restricted except by making them a member.</li>
<li>An org admin can change the role of any other user, including a fellow admin.</li></ul>
<dt>Member</dt>
<ul>
<li>A user who has access to some features, resources, and projects of their Semgrep deployment.</li>
<li>To grant members access to a project and its findings, you must add the members to a team, and that team must be assigned to the project.</li>
<li>Members can scan their local or personal repositories through a personal account.</li>
<li>Members can also be assigned as <strong>Managers</strong> within a team.</li>
</ul>
</dl>

A third role, **the manager**, can be assigned within the context of a team. Managers are a subset of members:

<dl>
<dt>Manager</dt>
<ul>
<li>A member who can grant access to projects by creating subteams and assigning members to these subteams.</li>
<li>A manager role is restricted to the teams where they have been assigned as a manager. Users can be managers of some projects, but members for others. For more information, see the <a href="#the-manager-role">manager role</a>.</li>
</ul>
</dl>

![A member's view of the Projects page.](/img/access-member-view.png)
_**Figure**. A member's view of the Projects page. It displays projects that are assigned to the team they are a member of, but they cannot edit a project nor can they scan new projects in their organizational account._

### Page visibility per role

| Page      | Member     | Manager    | Admin | Notes |
| ----      | ------     | -------    | ----- | ----- |
| Dashboard | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | For members, scope is limited based on their teams and the project access granted to those teams. |
| Projects  | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | Projects assigned to teams are visible to members and managers of those teams. Admins can see all projects. |
| Findings  | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | Members can perform all triage operations on Projects assigned to them. |
| Policies  | ❌ No         | ❌ No         | ✅ Yes   |       |
| Editor    | 👁️&nbsp;Read-only  | 👁️&nbsp;Read-only  | ✅ Yes   | Members can view all rules of an organization, but can't edit or create their own. They can create their own rules in their personal account.      |
| Settings  | ❌ No         | ⚠️&nbsp;Restricted | ✅ Yes   | Managers can see the **Access** and **Account** subpages. In the **Access** page, they can make edits to subteams they are managers of.    |

### Operations permitted per role

| Capability              | Member | Manager | Admin | Notes |
| ----                    | ------ | ------- | ----- | ----- |
| Create projects         | ❌ No     | ❌ No      | ✅ Yes   |       |
| Assign roles            | ❌ No     | ❌ No      | ✅ Yes   |       |
| Create or edit teams    | ❌ No     | ❌ No      | ✅ Yes   |       |
| Create or edit subteams | ❌ No     | ✅ Yes     | ✅ Yes   |       |
| Delete teams            | ❌ No     | ❌ No      | ✅ Yes   |       |
| Delete subteams         | ❌ No     | ✅ Yes     | ✅ Yes   | A manager can delete the subteams they are a manager of, provided that there are no resources, such as projects, assigned to the subteam.      |
| API                     | ❌ No     | ❌ No      | ✅ Yes   |       |

## How team access works

- Members of a top-level team gain access to the projects of its subteams. They are indirect members of a subteam.
<!-- vale off -->
- Members of a subteam do not have access to the projects of teams or subteams above it.
<!-- vale on -->

In the following diagram, team 1 gains access to subteam 1b's projects, but team 1b does not gain access to projects from team 1.


![Team scopes diagram](/img/access-diagram.png#md-width)

- The members Alexis, Pam, and Raj have access to the following projects:
    - App
    - Microservices
    - Frontend
- The members David, Sebas, and Phaedra have access to the following projects:
    - Frontend

### The manager role

Use the **manager role** to delegate the assignment of projects across many users. Managers can speed up the deployment of Semgrep into your organization by creating subteams to grant members access to projects.

Given a security engineer who is a manager of **team A** but a member of **team B**, with both teams having the same projects:

- The security engineer has manager **access** to the projects.
- The security engineer can create subteams for team A but can't create subteams for team B.

Additionally, the manager role is able to perform the following:

- Scan new projects through the **Projects** page.
- Edit projects that their team is assigned to.

Managers cannot remove themselves from their team. Admins and co-managers of the same team or subteam can remove other managers.

![A manager's view of the Projects page.](/img/access-manager-view.png)
**Figure**. A manager's view of the Projects page. They are able to scan new projects and edit the settings for Projects assigned to Teams they are managers of.

## Enable teams

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[<i class="fa-solid fa-gear"></i> Settings > Access > Teams](https://semgrep.dev/orgs/-/settings/access/teams)**.
1. Optional: Click **<i class="fa-solid fa-square-check"></i> Yes, add new users to the default team** if you want new members and projects to be added to the default team.
1. Click **Enable**.
1. Read the dialog box to ensure that your settings are correct, then click **Enable beta**.

When you have enabled teams for the first time, a team is automatically created with the name of your deployment. This preserves the settings you previously had using the **Members** feature; all current members retain their existing projects.

## Tips for creating teams and subteams

:::info
The Semgrep team recommends that admins assign projects to one team only.
:::

- **Use subteams to grant access to a specific department's repositories**: Create a top-level team for managers or security engineers in your organization who have broad access to a variety of repositories, then create subteams for members to grant them limited access to their specific department's repositories.
- **Use flat teams to grant access to central projects that are used by a broad group of developers**: It is best to create a separate flat team, without any subteams, and grant the users access to foundational or central repositories from that team. For example, projects that all engineers commit to can be named the Engineering Team.

## Configure your teams

### View your teams

You must be an admin or manager to view the **Teams** tab.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[<i class="fa-solid fa-gear"></i> Settings > Access > Teams](https://semgrep.dev/orgs/-/settings/access/teams)**.

### Create a team

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click **New team**. The **Create New Team** form appears.
1. Enter a **Name** for the team.
1. The **Projects** tab opens. Click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the projects you want to give access to. You can also use the **Search** box or **tags** to help you find projects.
1. Click the **Members** tab, then click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the team members you want to add. You can also use the **Search** box to help you find members.
1. Optional: Appoint a manager. Under the **Role** column, click the drop-down box and select **Manager**.
1. Click **Create**.

### Create a subteam

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click **<i class="fa-solid fa-plus"></i> Add subteam** next to the name of the top-level team you want to create a subteam for. The **Create new subteam** form appears.
1. Enter a **Name** for the subteam.
1. The **Projects** tab opens. Click the **<i class="fa-solid fa-square-check"></i> checkbox** next to the name of the projects you want to give access to. You can also use the **Search** box or **tags** to help you find projects.
1. Click the **Members** tab, then click the **<i class="fa-solid fa-square-check"></i> checkbox** next to the name of the team members you want to add. You can also use the Search box to help you find members.
1. Optional: Appoint a manager. Under the Role column, click the drop-down box and select **Manager**.
1. Click **Create**.

:::info
- You must have at least one team before you can create a subteam.
- In subteams, you can add members that are not part of the top-level team.
:::

### Update an existing team or subteam

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click the **<i class="fa-solid fa-pen-to-square"></i> edit** icon on the row of the team or subteam you want to edit.
1. Make your changes.
1. Click **Review > Save changes**.

### Delete a team or subteam

1. If you are deleting a team, delete its subteams first.
    1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click the **<i class="fa-solid fa-chevron-down"></i> down arrow** to show all subteams under a team, then follow steps 2-3.
1. Click the **<i class="fa-solid fa-trash"></i> trash can** icon.
1. Click **Delete** to confirm.

### Appoint a manager

To set a member as a manager for a subteam:

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click the **<i class="fa-solid fa-pen-to-square"></i> edit** icon on the row of the team or subteam you want to edit.
1. Click on the **Members** tab.
1. Under the Role column of the member you want to appoint, click the drop-down box and select **Manager**. Perform this step for all members you want to set as managers.
![Add a manager](/img/access-add-manager.png#md-width)
1. Click **Review**.
1. Click **Save changes**.

### Filter findings for a team's projects

1. Navigate to the **Findings** page.
1. Click the **Teams** filter. This filter displays teams you have access to.
1. Select the teams you want to see findings for.

## Appendices

### Member-scoped access tokens

Both members and admins can log in through the command-line interface (CLI) by entering the following command:

```
semgrep login
```

This generates a unique token that is used to identify a member or admin. When logged in, members can run scans on their local machine through the `semgrep ci` command and publish a rule. This sends findings data to Semgrep AppSec Platform.

Only admin users can view member tokens in the **Settings > Tokens** tab. A token's access cannot be escalated to an admin-level token. A user must first obtain the admin role and then create a new token as an admin. See the section on [Changing a user's role](#change-a-users-role).

### Token scopes

Token scopes enable you to limit or grant permissions as necessary. Tokens can also be generated with appropriate scopes by Semgrep AppSec Platform when onboarding (adding) a repository.

The following table displays token scopes and their permissions:

| Token scope | Send findings from a remote repository | Send findings from a local repository |  Send PR or MR comments | Connect to Semgrep API |
| ----------- | ------- | --- | --| -- |
| Agent (CI)  |   ✔️  Yes    |  ✔️ Yes  | ✔️  Yes | ❌ No |
| Web API     |  ❌ No    |  ❌ No | ✔️  Yes  | ✔️ Yes  |
| Member      |    ❌ No   |  ✔️ Yes  | ❌ No |❌ No |

The following table displays typical uses for token scopes:

| Token scope |Typical uses |
| ----------- | ----------- |
| Agent (CI)  | Generated by Semgrep AppSec Platform when onboarding (adding) a repository to Semgrep AppSec Platform. For non-GitHub Actions users, you may have to copy and paste the token value into your CI provider's interface. |
| Web API     | Used to access Semgrep's API. |
| Member      | Auto-generated by Semgrep CLI when a member is logging in through Semgrep CLI. Use this scope to scan your code locally using your organization's configured Policies, including private rules. The permissions of these tokens cannot be escalated. |
