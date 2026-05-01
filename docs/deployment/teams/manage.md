---
slug: manage
append_help_link: true
title: Manage teams and users
hide_title: true
description: Learn how to manage user access to projects through teams.
tags:
  - Deployment
  - Semgrep AppSec Platform
---

# Manage teams and roles

Semgrep allows you to manage user membership and access to Semgrep resources, such as scans, findings, and repositories or codebases you have added to Semgrep. 
To configure those settings, go to **[Settings > Access](https://semgrep.dev/orgs/-/settings/access)** in Semgrep AppSec Platform.

## Invite a user through email

You can add new users to your organization by sending them an email. This email contains instructions for them to join your org through the same auth provider configured for your account. The invitation only facilitates access for users who are already provisioned in the configured auth provider.

You must be an **admin** to perform this operation.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> Settings > Access**. This brings you to the **Users** tab.
1. Click **Invite users**.
1. In the dialog, enter your team members' email addresses. You can invite up to 20 users at a time. Separate each email address with a <kbd>Space</kbd> or <kbd>Tab</kbd> key. You can also paste a comma-separated list of email addresses.
1. Click **Send invites**.

## Set a default role for the organization

Users are assigned a role based on your organization's default. New organizations are created with the default role set to **admin**. To change this setting, perform the following steps:

1. In Semgrep AppSec Platform, click **<i class="fa-solid fa-gear"></i> Settings**.
2. Click **Access > Defaults**.

## Change a user's role

You must be an **admin** to perform this operation.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Access**.
3. Search for the user whose role will be changed.
4. Click on the user's current role, under the role header. A drop-down box appears.
5. Select the new role for the user.

:::note
You cannot change your own role.
:::

## Enable teams

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[<i class="fa-solid fa-gear"></i> Settings > Access > Teams](https://semgrep.dev/orgs/-/settings/access/teams)**.
1. Optional: Click **<i class="fa-solid fa-square-check"></i> Yes, add new users to the default team** if you want new members and projects to be added to the default team.
1. Click **Enable**.
1. Read the dialog box to ensure that your settings are correct, then click **Enable beta**.

When you have enabled teams for the first time, a team is automatically created with the name of your deployment. This preserves the settings you previously had using the **Users** feature; all current members retain their existing projects.

## View your teams

You must be an admin or manager to view the **Teams** tab.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[<i class="fa-solid fa-gear"></i> Settings > Access > Teams](https://semgrep.dev/orgs/-/settings/access/teams)**.

## Create a team

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click **New team**. The **Create New Team** form appears.
1. Enter a **Name** for the team.
1. The **Projects** tab opens. Click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the projects you want to give access to. You can also use the **Search** box or **tags** to help you find projects.
1. Click the **Users** tab, then click the <i class="fa-solid fa-square-check"></i> checkbox next to the name of the team members you want to add. You can also use the **Search** box to help you find members.
1. Optional: Appoint a manager. Under the **Role** column, click the drop-down box and select **Manager**.
1. Click **Create**.

### Create a subteam

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click **<i class="fa-solid fa-plus"></i> Add subteam** next to the name of the top-level team you want to create a subteam for. The **Create new subteam** form appears.
1. Enter a **Name** for the subteam.
1. The **Projects** tab opens. Click the **<i class="fa-solid fa-square-check"></i> checkbox** next to the name of the projects you want to give access to. You can also use the **Search** box or **tags** to help you find projects.
1. Click the **Users** tab, then click the **<i class="fa-solid fa-square-check"></i> checkbox** next to the name of the team members you want to add. You can also use the Search box to help you find members.
1. Optional: Appoint a manager. Under the Role column, click the drop-down box and select **Manager**.
1. Click **Create**.

:::info
- You must have at least one team before you can create a subteam.
- In subteams, you can add members that are not part of the top-level team.
:::

## Manage your teams

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
1. Click on the **Users** tab.
1. Under the Role column of the member you want to appoint, click the drop-down box and select **Manager**. Perform this step for all members you want to set as managers.
1. Click **Review**.
1. Click **Save changes**.

#### View and edit subteams

:::info
This feature is currently in invite-only beta. Please contact [Semgrep Support](/support) for more information.
:::

1. In the [<i class="fas fa-external-link fa-xs"></i> **Teams** tab](https://semgrep.dev/orgs/-/settings/access/teams), click the **<i class="fa-solid fa-pen-to-square"></i> edit** icon on the row of the team or subteam you want to edit.
1. Find the team to which the subteam should be added. Click **Add subteam**.
2. Provide a **Team name**. Click **Add projects**.
3. Select one or more projects to add to the subteam. Click **Add members**.
4. Select one or more users to add to the subteam. Click **Review**.
5. Review the changes you have made. If this looks correct, click **Create team** to proceed.

Managers can view their subteams by going to the **Settings > Access > Teams** tab. Within this tab, they are also able to assign any of the projects they manage from one subteam to another.

Note that this feature allows managers to view **all projects** in the **Edit teams** panel, including projects they are not assigned to. However, they cannot perform admin-level actions on those projects, such as assigning projects they are not designated to manage.

### Filter findings for a team's projects

1. Navigate to the **Findings** page.
1. Click the **Teams** filter. This filter displays teams you have access to.
1. Select the teams you want to see findings for.
