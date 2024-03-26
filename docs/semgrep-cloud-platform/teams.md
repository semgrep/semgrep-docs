---
slug: tk
append_help_link: true
title: tk
hide_title: true
description: tk
tags:
  - tk
---

# Manage access to projects

Use the **Teams** feature to manage access to resources, such as findings in your projects. 

tk add screenshot
Figure. The Settings > Access > Teams tab displays both top-level Teams and Subteams.

The **Teams** feature enables admins to grant or limit access to specific projects in Semgrep Cloud Platform (SCP). **Projects** are repositories or codebases you have added to SCP for scanning. You can quickly assign projects to large groups of members by assigning teams and subteams to members of your organization.

This feature helps security engineers and developers in large organizations focus on the projects that are relevant to their specific department or team.

When you limit a member's access to a subset of your projects, their Dashboard and Findings pages all reflect that change. For example, their total finding count is based on the total number of findings of the projects they can access.

This document walks you through the following:

- How to approach Team management and Project access in Semgrep
- How to create, view, update, and delete Teams and Subteams
- How to assign or unassign Projects to Teams

## Roles and visibility

A user is any person who has been added to your organization in Semgrep. Users can be administrators (admins), managers, or members.

Admin
A user who has access to all features, resources, and Projects of their Semgrep deployment. Admins can also change the role of members and managers.
By definition, an admin does not need to be assigned to a Team to have access to the resources of a Project. As such, an admin can't be removed from a Team, either. 
An org admin can change the role of any other admin or user, including a fellow admin.

Manager
A user who can grant access to Projects by creating Subteams and assigning members to these Subteams.
A manager role is restricted to the Teams where they have been assigned as a manager. Users can be managers of some Projects, but members for others. For more information, see The manager role section.

Member
A user who has access to some features, resources, and Projects of their Semgrep deployment.
By default, a member starts out with no access to any Project.
To grant members access to a Project and its findings, you must add a member to a Team, and that Team must be assigned Projects.

| Page | Member | Manager | Admin | Notes |
| ---- | ------ | ------- | ----- | ----- |
| Dashboard | | | | |
| Projects  | | | | |
| Findings  | | | | |
| Policies  | | | | |
| Editor    | | | | |
| Settings  | | | | |

| Capability | Member | Manager | Admin | Notes |
| ---- | ------ | ------- | ----- | ----- |
| | | | | |


## Configure your Teams

Members of a top-level Team gain access to the Projects of its Subteams. They are indirect members of a Subteam.
Members of a Subteam do not have access to the Projects of Team or Subteams above it.

In the following diagram, Team 1 gains access to Subteam 1b's Projects, but Team 1b does not gain access to Projects from Team 1.

tk add diagram
The members Alexis, Pam, and Raj have access to the following Projects:
App
Microservices
Frontend
The members David, Sebas, and Phaedra have access to the following Projects:
Frontend

### Tips for creating Teams and Subteams

:::info
The Semgrep team recommends that admins assign Projects to one team only.
:::

Use flat Teams: To grant access to central Projects that are used by a broad group of developers, it is best to create a separate flat Team, without any Subteams, and grant the users access to foundational or central repositories from that Team. For example, Projects that all engineers commit to can be named the Engineering Team.
Use Subteams: Create a top-level Team for managers or security engineers in your organization who have broad access to a variety of repositories, then create Subteams for members to grant them limited access to their specific department's repositories.

### The manager role

Use the manager role to delegate the assignment of Projects across many users. Managers can speed up the deployment of Semgrep into your organization by creating Subteams to grant members access to Projects. 

Given a security engineer who is a manager for team A but member for team B, with both teams having the same projects:

The security engineer has manager access to the projects.
The security engineer can't create Subteams for team B but can create subteams for team A.

Managers cannot remove themselves from their Team. Only admins can remove managers.

### View your Teams

You must be an admin or manager to view the Teams tab.

To view your Teams:

Sign in to your Semgrep Account.
Click ⚙️Settings > Access > Teams.

### Create a Team or Subteam

To create a Team:

Click New team. The Create New Team form appears.
Enter a Name for the Team.
The Projects tab opens. Click the ☑️ checkbox next to the name of the Projects you want to give access to. You can also use the Search box or tags to help you find Projects.
Click the Members tab, then click the ☑️ checkbox next to the name of the team members you want to add. You can also use the Search box to help you find members.
Optional: Appoint a manager. Under the Role column, click the drop-down box and select Manager. 
Click Create.

To create a Subteam:

Click ➕ Add subteam next to the name of the top-level Team you want to create a Subteam for. The Create new subteam form appears.
Enter a Name for the Subteam.
The Projects tab opens.Click the ☑️ checkbox next to the name of the Projects you want to give access to. You can also use the Search box or tags to help you find Projects.
Click the Members tab, then click the ☑️ checkbox next to the name of the team members you want to add. You can also use the Search box to help you find members.
Optional: Appoint a manager. Under the Role column, click the drop-down box and select Manager. 
Click Create.

:::info 
You must have at least one Team before you can create a Subteam.
In Subteams, you can add members that are not part of the top-level team. 
:::

### Update an existing Team or Subteam

1. Click the ✏️edit icon on the row of the Team or Subteam you want to edit.
1. Make your changes.
1. Click Review > Save changes.

###Delete a Team or Subteam

1. If you are deleting a team, delete its subteams first.
1. Click on the 🇻 down arrow to show all Subteams under a team, then follow steps 2-3.
1. Click the trash can icon.
1. Click Delete to confirm.

### Appoint a manager

To set a member as a manager for a subteam:

1. Click the ✏️edit icon on the row of the Team or Subteam you want to edit.
1. Click on the Members tab.
1. Under the Role column of the member you want to appoint, click the drop-down box and select Manager. Perform this step for all members you want to set as managers.
  tk screenshot
1. Click Review.
1. Click Save changes.

### Filter findings for a team's projects

Navigate to the Findings page.
Click the Teams filter. This filter displays teams you have access to.
Select the Teams you want to see findings for.

