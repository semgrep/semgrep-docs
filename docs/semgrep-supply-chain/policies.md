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

Once you are ready to notify developers through a **comment**, or potentially **block** them from merging a pull request or merge request (PR or MR), define a **Supply Chain policy**. This feature helps you manage noise and ensures that developers are only notified or potentially blocked based on the conditions you set.

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
    _**Figure**. A single card within the Semgrep Supply Chain Policies page._

- To view and edit an existing policy, click its **name** or **the three-dot ellipsis (<i class="fas fa-ellipsis-h"></i>) > Edit policy**.
- View a popup of a policy's **scope** (affected projects or tags) or a summary of its **actions and conditions** by clicking on the two summary links beside the policy name.

## Create a policy

1. From the Supply Chain policies tab, Click **<i class="fa-solid fa-plus"></i> Create policy**.
1. Provide a **Policy name**.
1. Define the scope of the policy:
    1. Click the drop-down box to select between **All Projects**, **Project**, or **Project tag**. Note that you can only select either a scope based on projects or tags, but not both.
    1. For **Project** or **Project tag** values, a second drop-down box appears. Choose the **projects** or **project tags** to finish defining the scope.
1. Define the conditions of the policy. See the [Policy conditions](#policy-conditions) section for more information. You can create more than one condition by clicking **Add condition**.
    - For each condition, you can select multiple values by clicking on the **plus sign (<i class="fa-solid fa-plus"></i>)** on the same row. The policy is applied when **any** of those values are met (`OR`).
    - Each additional condition is additive. The policy is applied when **all** conditions are met (`AND`).
      ![Policies > Semgrep Supply Chain](/img/ssc-policies-many-conditions.png)
1. Define the actions of the policy. You can choose to **Leave a comment** or **Block and leave a comment**.
1. Click **Save**. This brings you back to the Supply Chain policies tab.
1. After creating a policy, it is **not** automatically enabled. Click the **<i class="fa-solid fa-toggle-large-on"></i> toggle** to enable a policy. This applies the policy to future scans.

## Common use cases for policies

Use the following recommendations to help you create policies. These guidelines help ensure your policies align with your business and organizational needs.

### Recommended conditions for blocking PRs or MRs

- **Always reachable and reachable findings with upgradeable dependencies**. This provides a path to unblock the user, as Semgrep can leave a comment with the upgrade instructions.

### Recommended conditions for leaving a comment

- **Reachable findings without upgradeable dependencies**. This makes the developer aware of the risk.
- **Reachable, yet transitive findings**. Depending on your organization's policies, these may need to be flagged for risk.
- **Conditionally reachable findings**. The decision to show developers conditionally reachable findings may depend on weighing your compliance policies against showing developers more findings. Conditionally reachable findings typically require further investigation, manual triage, and ticketing.
- **Critical and high EPSS probability**. There is a chance of these findings being exploited regardless of reachability.

## Policy scopes

A policy's scope can consist of tags or projects, but not both. If you need to create a policy with both tags and projects, simply make another policy.

If a project or project tag that's included in a policy scope gets deleted, it is **removed from the policy scope**. If all projects or all project tags are deleted for a given policy, you must edit the policy for it to be applied to a valid scope.

## Policy conditions

The following table lists available conditions and their values:

| Condition | Values|
| -------  | ------ |
| [Reachability](/semgrep-supply-chain/glossary#reachability)      | <ul><li>Always reachable</li><li>Reachable</li><li>Conditionally reachable</li> <li>Unreachable</li> <li>No reachability analysis</li> </ul>       |
| Severity         | <ul><li>Critical</li><li>High</li><li>Medium</li><li>Low</li>  </ul>      |
| Upgrade availability         | <ul> <li>Upgrade available</li> <li>Upgrade unavailable</li> </ul>       |
| [Transitivity](/semgrep-supply-chain/glossary#transitivity)  | <ul><li>Direct</li> <li>Transitive</li></ul> |
| [EPSS probability](/semgrep-supply-chain/glossary#epss-probability)  | <ul> <li>High</li><li>Medium</li><li>Low</li><li>None</li> </ul>   |

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
