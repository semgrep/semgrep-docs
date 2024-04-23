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
<li>A manager role is restricted to the teams where they have been assigned as a manager. Users can be managers of some projects, but members for others. For more information, see [manager role]() tk add section.</li>
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
| Dashboard | Restricted | Restricted | Yes   | For members, scope is limited based on a member's teams and project access granted to those teams. |
| Projects  | Restricted | Restricted | Yes   | Projects assigned to teams are visible to members and managers of those teams. Admins can see all projects. |
| Findings  | Restricted | Restricted | Yes   | Members can perform all triage operations on Projects assigned to them. |
| Policies  | No         | No         | Yes   |       |
| Editor    | Read-only  | Read-only  | Yes   | Members can view all rules of an organization, but can't edit or create their own. They can create their own rules in their personal account.      |
| Settings  | No         | Restricted | Yes   |       |

| Capability              | Member | Manager | Admin | Notes |
| ----                    | ------ | ------- | ----- | ----- |
| Create projects         | No     | No      | Yes   |       |
| Assign roles            | No     | No      | Yes   |       |
| Create or edit teams    | No     | No      | Yes   |       |
| Create or edit subteams | No     | Yes     | Yes   |       |
| Delete teams            | No     | No      | Yes   |       |
| Delete subteams         | No     | Yes     | Yes   | A manager can delete the subteams they are a manager of, provided that there are no resources, such as projects, assigned to the subteam.      |
| API                     | No     | No      | Yes   |       |


## Configure your teams

- Members of a top-level team gain access to the projects of its subteams. They are indirect members of a subteam.
- Members of a subteam do not have access to the projects of teams or subteams above it.

In the following diagram, team 1 gains access to subteam 1b's projects, but team 1b does not gain access to projects from team 1.

tk add diagram
The members Alexis, Pam, and Raj have access to the following projects:
App
Microservices
Frontend
The members David, Sebas, and Phaedra have access to the following projects:
Frontend

### Tips for creating teams and subteams

:::info
The Semgrep team recommends that admins assign projects to one team only.
:::

Use flat teams: To grant access to central projects that are used by a broad group of developers, it is best to create a separate flat team, without any subteams, and grant the users access to foundational or central repositories from that team. For example, projects that all engineers commit to can be named the Engineering Team.
Use subteams: Create a top-level team for managers or security engineers in your organization who have broad access to a variety of repositories, then create subteams for members to grant them limited access to their specific department's repositories.

### The manager role

Use the manager role to delegate the assignment of projects across many users. Managers can speed up the deployment of Semgrep into your organization by creating subteams to grant members access to projects. 

Given a security engineer who is a manager for team A but member for team B, with both teams having the same projects:

The security engineer has manager access to the projects.
The security engineer can't create subteams for team B but can create subteams for team A.

Managers cannot remove themselves from their team. Only admins can remove managers.

### View your teams

You must be an admin or manager to view the teams tab.

To view your teams:

Sign in to your Semgrep Account.
Click ⚙️Settings > Access > teams.

### Create a team or subteam

To create a team:

Click New team. The Create New team form appears.
Enter a Name for the team.
The Projects tab opens. Click the ☑️ checkbox next to the name of the projects you want to give access to. You can also use the Search box or tags to help you find projects.
Click the Members tab, then click the ☑️ checkbox next to the name of the team members you want to add. You can also use the Search box to help you find members.
Optional: Appoint a manager. Under the Role column, click the drop-down box and select Manager. 
Click Create.

To create a subteam:

Click ➕ Add subteam next to the name of the top-level team you want to create a subteam for. The Create new subteam form appears.
Enter a Name for the subteam.
The Projects tab opens. Click the ☑️ checkbox next to the name of the projects you want to give access to. You can also use the Search box or tags to help you find projects.
Click the Members tab, then click the ☑️ checkbox next to the name of the team members you want to add. You can also use the Search box to help you find members.
Optional: Appoint a manager. Under the Role column, click the drop-down box and select Manager. 
Click Create.

:::info 
You must have at least one team before you can create a subteam.
In subteams, you can add members that are not part of the top-level team. 
:::

### Update an existing team or subteam

1. Click the ✏️edit icon on the row of the team or subteam you want to edit.
1. Make your changes.
1. Click Review > Save changes.

### Delete a team or subteam

1. If you are deleting a team, delete its subteams first.
1. Click on the 🇻 down arrow to show all subteams under a team, then follow steps 2-3.
1. Click the trash can icon.
1. Click Delete to confirm.

### Appoint a manager

To set a member as a manager for a subteam:

1. Click the ✏️edit icon on the row of the team or subteam you want to edit.
1. Click on the Members tab.
1. Under the Role column of the member you want to appoint, click the drop-down box and select Manager. Perform this step for all members you want to set as managers.
  tk screenshot
1. Click Review.
1. Click Save changes.

### Filter findings for a team's projects

Navigate to the Findings page.
Click the teams filter. This filter displays teams you have access to.
Select the teams you want to see findings for.

