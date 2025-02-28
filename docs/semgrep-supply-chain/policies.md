---
slug: policies
title: Manage policies
hide_title: true
description: Use policies to define the conditions in which developers are notified of a finding or potentially blocked from merging their PR or MR.
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---

# Manage policies

By default, Semgrep AppSec Platform collects Supply Chain findings without notifying developers, similar to the [**Monitor** mode](/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes) in Semgrep Code. This prevents developers from receiving notifications while you evaluate the tool.

Once you are ready to notify developers through a **comment**, or potentially **block** them from merging a pull or merge request (PR or MR), define a **Supply Chain policy**. This feature helps you manage noise and ensures that developers are only notified or potentially blocked based on the conditions you set.

This feature enables you to configure the following:

- **Scope**: These are the projects (repositories) that are affected by the policy.
- **Conditions**: The conditions under which **actions** are performed. These conditions are typically attributes of a finding such as severity or reachability. 
- **Actions**: Actions that are performed on the defined scope when conditions are met.

You can create as many policies as you need.

## Prerequisites

This feature requires the `semgrep:latest` Docker image or at least version 1.101.0 of the Semgrep CLI tool.

## View your policies

Only **admins** can view, create, edit, or delete policies.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. From the navigation menu, click **Rules** to expand the drop-down box, then click **Policies**.
1. Click **Supply Chain**. This takes you to the Supply Chain policies tab.

## Create a policy

1. From the Supply Chain policies tab, Click **Create policy**.
1. Provide a **Policy name**.
1. Define the scope of the policy:
    1. Click the drop-down box to select between **All Projects**, **Project**, or **Project tag**.
    1. For **Project** or **Project tag** values, a second drop-down box appears. Choose the **projects** or **project tags** to finish defining the scope.
1. Define the conditions of the policy. See the Policy conditions section for more information. You can create more than one condition.
    - Within a condition, you can select multiple **values**. The policy is applied when **any** of those values are met.
    - Each additional condition is additive (`AND`). The policy is applied when **all** conditions are met.
1. Define the actions of the policy. You can choose to **Leave a comment** or **Block and leave a comment**.
1. Click **Save**. This brings you back to the Supply Chain policies tab.

After creating a policy, it is automatically **enabled** and will be applied to subsequent scans.

## Policy conditions

| Condition | Values|
| -------  | ------ |
| Reachability         | <ul><li>Always reachable</li><li>Reachable</li><li>Conditionally reachable</li> </ul>       |
| Severity         | <ul><li>Critical</li><li>High</li><li>Medium</li><li>Low</li>  </ul>      |
| Upgrade availability         | <ul> <li>Upgrade available</li> <li>Upgrade unavailable</li> </ul>       |
| Transitivity  | <ul><li>Direct</li> <li>Transitive</li></ul> |
| EPSS probability  | <ul> <li>High</li><li>Medium</li><li>Low</li><li>None</li> </ul>   |

 by selecting either **Reachable** or **Critical or high severity, reachable, upgrades available**. Selecting **Reachable** typically results in more findings shown to developers.


## Other operations

### Edit a policy

1. From the Supply Chain policies tab, click the **three-dot (...) button > Edit policy** for the policy you want to edit. This takes you to the specific policy page.
1. Make your changes.
1. Click **Save**.

### Disable or enable a policy

From the Supply Chain policies tab, click the toggle for the policy you want to edit.

You can also disable or enable a policy from the policy's page:

1. From the Supply Chain policies tab, click the **three-dot (...) button > Edit policy**.
1. Turn off or on the **Enable policy** toggle.
1. Click **Save**.

### Delete a policy

From the Supply Chain policies tab, click the **three dot (...) button > Delete policy**, then click **Remove**.
