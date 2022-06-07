---
slug: role-based-access-control
append_help_link: true
title: Managing users and roles 
description: "Learn about roles, user management, and how to implement role-based access control in Semgrep App."
---

import MoreHelp from "/src/components/MoreHelp"


# Managing users and roles

## Controlling access through roles

![Screenshot of role-based access control ](../img/rbac-overview.png)<br />

Access control in Semgrep App determines the resources and features that are available to users based on their role. This **role-based access control (RBAC)** feature is available for organizations on **Team/Enterprise tiers**.

## Setting up RBAC

Semgrep App divides users into two roles:

* `admin`
* `member`

:::info
Users in organizations without RBAC enabled are `admin` by default.
:::
:::info
Community-tier (Free) users are `admin` by default.
:::

The following table displays features available to each role:

| Feature               | `member`  | `admin`   | Additional notes                                                                   |
| ---------             | --------- | --------- | ---------                                                                          |
| Overview              | yes       | yes       |                                                                                    |
| Projects              | no        | yes       | Only `admin` can manage projects.                                                   |
| Rule Board (Policies) | no        | yes       | Only `admin` can manage policies and rules.                                        |
| Findings              | yes       | yes       | Both `admin` and `member` roles can sort, filter, comment on, and triage findings. |
| Analytics             | no        | yes       |                                                                                    |
| Settings              | no        | yes       |                                                                                    |
| Community             | yes       | yes       |                                                                                    |
| Registry              | yes       | yes       |                                                                                    |
| Playground            | yes       | yes       |                                                                                    |
| Docs                  | yes       | yes       |                                                                                    |

To enable RBAC, please contact r2c at [support@r2c.dev](mailto:support@r2c.dev).

Upon enabling RBAC for the first time, current members of the organization are `admins`. New members added thereafter are automatically `members`.

## Changing a user's role

**Prerequisites**:

* You must be an `admin` to perform this operation.
* You may need to log out and log back in after enabling RBAC for your organization.

To **change a user's role**:

1. On Semgrep App's sidebar, click Settings.
2. Click on the Members tab.
3. Search for the member whose role will be changed.
4. Click on the member's current role, under the role header. A drop-down box appears.
5. Select the new role for the member.

:::info
You cannot change your own role.
:::


<MoreHelp />
