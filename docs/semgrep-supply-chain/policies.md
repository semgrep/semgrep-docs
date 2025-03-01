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
1. Click **Supply Chain**. This takes you to the Supply Chain policies tab. Your policies are arranged as cards.

![Policies > Semgrep Supply Chain](/img/ssc-policies-card.png#md-width)
_**Figure**. The Semgrep Supply Chain Policies page._

- To view and edit an existing policy, click its **name**.
- You can view a popup of a policy's conditions and values by clicking on its **summary**, next to the list of project tags.
- Click the projects tag count to view the list of project tags, if any. Project tags are a quick way to group projects affected by a policy.

## Create a policy

1. From the Supply Chain policies tab, Click **<i class="fa-solid fa-plus"></i> Create policy**.
1. Provide a **Policy name**.
1. Define the scope of the policy:
    1. Click the drop-down box to select between **All Projects**, **Project**, or **Project tag**.
    1. For **Project** or **Project tag** values, a second drop-down box appears. Choose the **projects** or **project tags** to finish defining the scope.
1. Define the conditions of the policy. See the Policy conditions section for more information. You can create more than one condition.
    - For each condition, you can select multiple **values**. The policy is applied when **any** of those values are met (`OR`).
    - Each additional condition is additive. The policy is applied when **all** conditions are met (`AND`).
    - tk add screenshot
1. Define the actions of the policy. You can choose to **Leave a comment** or **Block and leave a comment**.
1. Click **Save**. This brings you back to the Supply Chain policies tab.

After creating a policy, it is automatically **enabled** and will be applied to subsequent scans.

## Common use cases for policies

- Blocking reachable findings with upgradeable dependencies. This is a reasonable policy as it provides a path to unblock the user, as Semgrep can leave a comment with the upgrade instructions.
- Leaving a comment for:
  - Reachable findings without upgradeable dependencies, to make the developer aware of the risk.
  - Reachable, yet transitive findings; depending on your organization's policies, these may need to be flagged for risk.

## Policy conditions

The following table lists available conditions and their values.

| Condition | Values|
| -------  | ------ |
| Reachability      | <ul><li>Always reachable</li><li>Reachable</li><li>Conditionally reachable</li> <li>Unreachable</li> </ul>       |
| Severity         | <ul><li>Critical</li><li>High</li><li>Medium</li><li>Low</li>  </ul>      |
| Upgrade availability         | <ul> <li>Upgrade available</li> <li>Upgrade unavailable</li> </ul>       |
| Transitivity  | <ul><li>Direct</li> <li>Transitive</li></ul> |
| EPSS probability  | <ul> <li>High</li><li>Medium</li><li>Low</li><li>None</li> </ul>   |

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

Note that: 

- This does not remove comments from existing PRs or MRs with findings.
- If a policy is the **sole culprit** for blocking a PR, deleting it **and** re-running a scan unblocks the PR or MR.
