---
slug: teams
append_help_link: true
title: Manage access to projects
hide_title: true
description: Use the Teams feature to manage access to resources.
tags:
  - Semgrep Cloud Platform
---

# Manage access to projects

Use the **Teams** feature to manage access to resources, such as findings in your projects.

![The Teams tab within the Settings page](/img/access-teams.png)
**Figure**. The **<i class="fa-solid fa-gear"></i> Settings > Access > Teams** tab displays both top-level teams and subteams.

The **Teams** feature enables admins to grant or limit access to specific projects in Semgrep Cloud Platform (SCP). **Projects** are repositories or codebases you have added to SCP for scanning. You can quickly assign projects to large groups of members by assigning teams and subteams to members of your organization.

This feature helps security engineers and developers in large organizations focus on the projects that are relevant to their specific department or team.

When you limit a member's access to a subset of your projects, their Dashboard and Findings pages all reflect that change. For example, their total finding count is based on the total number of findings of the projects they can access.

This document walks you through the following:

- How to approach team management and project access in Semgrep
- How to create, view, update, and delete teams and subteams
- How to assign or unassign projects to teams

## Roles and visibility

A user is any person who has been added to your organization in Semgrep. Users can be administrators (admins), managers, or members.

<dl>
<dt>Admin</dt>
<ul><li>A user who has access to all features, resources, and projects of their Semgrep deployment. Admins can also change the role of members and managers.</li>
<li>By definition, an admin does not need to be assigned to a team to have access to the resources of a project. As such, an admin can't be removed from a team.</li>
<li>An org admin can change the role of any other admin or user, including a fellow admin.</li></ul>
<dt>Manager</dt>
<ul>
<li>A user who can grant access to projects by creating subteams and assigning members to these subteams.</li>
<li>A manager role is restricted to the teams where they have been assigned as a manager. Users can be managers of some projects, but members for others. For more information, see the <a href="#the-manager-role">manager role</a>.</li>
</ul>
<dt>Member</dt>
<ul>
<li>A user who has access to some features, resources, and projects of their Semgrep deployment.</li>
<li>By default, a member starts out with no access to any project.</li>
<li>To grant members access to a project and its findings, you must add a member to a team, and that team must be assigned projects.</li>
<li>Members can scan their local or personal repositories through a personal account.</li>
</ul>
</dl>

tk add figure

Figure. A member's view of the Projects page. It displays Projects that are assigned to the Team they are a member of, but they cannot edit a project nor can they scan new Projects in their organizational account.

| Page      | Member     | Manager    | Admin | Notes |
| ----      | ------     | -------    | ----- | ----- |
| Dashboard | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | For members, scope is limited based on a member's teams and project access granted to those teams. |
| Projects  | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | Projects assigned to teams are visible to members and managers of those teams. Admins can see all projects. |
| Findings  | ⚠️&nbsp;Restricted | ⚠️&nbsp;Restricted | ✅ Yes   | Members can perform all triage operations on Projects assigned to them. |
| Policies  | ❌ No         | ❌ No         | ✅ Yes   |       |
| Editor    | 👁️&nbsp;Read-only  | 👁️&nbsp;Read-only  | ✅ Yes   | Members can view all rules of an organization, but can't edit or create their own. They can create their own rules in their personal account.      |
| Settings  | ❌ No         | ⚠️&nbsp;Restricted | ✅ Yes   |       |

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
- Members of a subteam do not have access to the projects of teams or subteams above it.

In the following diagram, team 1 gains access to subteam 1b's projects, but team 1b does not gain access to projects from team 1.

tk add diagram
- The members Alexis, Pam, and Raj have access to the following projects:
    - App
    - Microservices
    - Frontend
- The members David, Sebas, and Phaedra have access to the following projects:
    - Frontend

### The manager role

Use the **manager role** to delegate the assignment of projects across many users. Managers can speed up the deployment of Semgrep into your organization by creating subteams to grant members access to projects.

Given a security engineer who is a manager for **team A** but member for **team B**, with both teams having the same projects:

- The security engineer has manager **access** to the projects.
- The security engineer can't create subteams for team B but can create subteams for team A.

Additionally, the manager role is able to perform the following:

- Scan new projects through the **Projects** page.
- Edit projects that their team is assigned to.

Managers cannot remove themselves from their team. Only admins can remove managers.

tk add fig
**Figure**. A manager's view of the Projects page. They are able to scan new projects and edit the settings for Projects assigned to Teams they are managers of.

## Tips for creating teams and subteams

:::info
The Semgrep team recommends that admins assign projects to one team only.
:::

- **Use subteams to grant access to a specific department's repositories**: Create a top-level team for managers or security engineers in your organization who have broad access to a variety of repositories, then create subteams for members to grant them limited access to their specific department's repositories.
- **Use flat teams to grant access to central projects that are used by a broad group of developers**: It is best to create a separate flat team, without any subteams, and grant the users access to foundational or central repositories from that team. For example, projects that all engineers commit to can be named the Engineering Team.


## Configure your teams

### View your teams

You must be an admin or manager to view the teams tab.

To view your teams:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
1. Click **[<i class="fa-solid fa-gear"></i> Settings > Access > Teams](https://semgrep.dev/orgs/-/settings/access/teams)**.

### Create a team

1. Click **New team**. The **Create New Team** form appears.
1. Enter a **Name** for the team.
1. The **Projects** tab opens. Click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the projects you want to give access to. You can also use the **Search** box or **tags** to help you find projects.
1. Click the **Members** tab, then click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the team members you want to add. You can also use the **Search** box to help you find members.
1. Optional: Appoint a manager. Under the **Role** column, click the drop-down box and select **Manager**.
1. Click **Create**.

### Create a subteam

1. Click **<i class="fa-solid fa-plus"></i> Add subteam** next to the name of the top-level team you want to create a subteam for. The **Create new subteam** form appears.
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

1. Click the **<i class="fa-solid fa-pen-to-square"></i> edit** icon on the row of the team or subteam you want to edit.
1. Make your changes.
1. Click **Review > Save changes**.

### Delete a team or subteam

1. If you are deleting a team, delete its subteams first.
    1. Click on the **<i class="fa-solid fa-chevron-down"></i> down arrow** to show all subteams under a team, then follow steps 2-3.
1. Click the **<i class="fa-solid fa-trash"></i> trash can** icon.
1. Click **Delete** to confirm.

### Appoint a manager

To set a member as a manager for a subteam:

1. Click the **<i class="fa-solid fa-pen-to-square"></i> edit** icon on the row of the team or subteam you want to edit.
1. Click on the **Members** tab.
1. Under the Role column of the member you want to appoint, click the drop-down box and select **Manager**. Perform this step for all members you want to set as managers.
  tk screenshot
1. Click **Review**.
1. Click **Save changes**.

### Filter findings for a team's projects

1. Navigate to the **Findings** page.
1. Click the **Teams** filter. This filter displays teams you have access to.
1. Select the teams you want to see findings for.
