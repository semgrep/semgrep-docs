---
slug: policies
title: Manage rules and policies
hide_title: true
toc_max_heading_level: 4
description: The Policies page is a visual representation of the rules that Semgrep Secrets uses to scan code.
tags:
  - Semgrep Secrets
  - Semgrep AppSec Platform
---

import RuleModes from "/src/components/reference/_rule-modes.md"

# Manage Semgrep Secrets rules using the policies page

To access the policies page for Semgrep Secrets, sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) and navigate to **Rules & policies > Policies > Secrets**.

## Validation state policies

Validation state policies allow you to define the rules Semgrep Secrets uses to scan your code, how to handle invalid findings, including those that have been revoked or were never functional, and how to handle validation errors when attempting to determine if a secret is a legitimate credential that can be used to access a resource.

Findings in different validation states may also have different severities, based on the risk associated with valid credentials as compared with invalid credentials. See [Secrets findings: severity](/semgrep-secrets/findings#severity) for more detail on this behavior.

### Global rule behavior

The **Global rule behavior** tab allows you to view and manage the rules Semgrep Secrets uses for scanning. This page consists of the following elements:

- The **Filters** pane displays the filters you can use to select and perform operations on rules in bulk. See [Filters](#filters) for more information.
- The **Rules** pane displays the rules that Semgrep scans use to detect leaked secrets and allows you to edit their assigned rule modes. You can make these edits on individual rules or through the bulk editing of many rules. You can also use the <strong>Search for rule names or ids</strong> box. See [Rules list](#rules-list) for more information.

#### Filters

The **Filters** pane displays the filters you can use to select and perform operations on rules in bulk.

<details>
<summary>Available filters</summary>
| **Filter** | **Description** |
| - | - |
| **Modes** | Filter by the workflow action Semgrep performs when a rule detects a finding. An additional filter, **Disabled**, is provided for rules you have turned off and are no longer included for scanning. |
| **Validation** | Filter by whether the rule includes a validator or not. |
| **Type** | Filter by the type of secret the rule addresses. Examples: AWS, Adobe, DigitalOcean, GitHub, GitLab. |
| **Severities** | Filter by the severity level of the secret: <ul><li>**Low**: low privilege; for example, write-only access like a webhook</li><li>**Medium**: may have read and write access depending on what scope the account has</li><li>**High** and **Critical**: has access to critical resources or full account access</li></ul> |
| **Confidence** | The confidence of the rule to detect true positives. |
| **Source** | Filter by Pro rules (authored by Semgrep) or by custom rules (rules created by your organization). |
| **Analysis method** | Filter based on whether Semgrep used **Semantic** or **Generic** analysis. |
| **Ruleset**  | The name of the ruleset the rule belongs to. |
| **Language** | The project language for which the Secret can be used. |
</details>

#### Rules list

The following columns appear on the rule entries list:

<details>
<summary>Rules list columns</summary>
| **Column** | **Description** |
| -  | - |
| **Rule name** | Name of the rule Semgrep Secret uses for scanning. |
| **Labels** | Metadata describing the rule, including the service for which the rule is applicable. |
| **Open findings** | The number of open findings the rule detected across all scans.  |
| **Fix rate** | The percentage of findings that are fixed through changes to the code.  |
| **Severity** | The higher the severity, the more critical the issues that a rule detects.      |
| **Confidence** | Indicates confidence of the rule to detect true positives.      |
| **Source** | Indicates the origin of a rule. <ul><li>**Pro:** Authored by Semgrep.</li><li>**Custom:** Rules created within your Semgrep organization.</li></ul> |
| **Ruleset** | The name of the ruleset the rule belongs to. |
| **Mode** | Specifies what workflow action Semgrep performs when a rule detects a finding. An additional filter, **Disabled**, is provided for rules you have turned off and are no longer included for scanning. See [Rule modes](#rule-modes). |
</details>

#### Rule modes

Semgrep Secrets provides three rule modes. These can be used to trigger **workflow options** whenever Semgrep Secrets identifies a finding based on the rule.

<RuleModes />

#### Manage rules

##### Turn off rules

1. In Semgrep AppSec Platform, go to **Rules & policies > Policies > Secrets**.
2. Select either:
    - The top **<span className="placeholder">Number</span> Matching Rules** checkbox to select all rules.
    - Individual checkboxes next to rules.
3. Click **Change modes(<span className="placeholder">Number</span>)**, then click **Disabled**.

You can also select individual rules under the **Mode** column and turn them off individually.

##### Add custom rules

To add custom rules, use the Semgrep Editor. See [<i class="fa-regular fa-file-lines"></i> Semgrep Secrets rule structure and sample](/semgrep-secrets/rules).

### Invalid findings

You can define how Semgrep handles findings that it categorizes as invalid. Invalid findings include secrets that, during validation, were identified as revoked or were never functional.

When Semgrep identifies an invalid finding, you can choose to view the finding in Semgrep AppSec Platform, have Semgrep leave a comment in the pull request or merge request, or have the Semgrep scan fail with an exit code of `1`.

See [Rule modes](#rule-modes) for more information on the modes available.

### Validation errors

You can define how Semgrep handles validation errors that occur when there are difficulties reaching the secrets provider or when Semgrep receives an unexpected response from the API.

When Semgrep encounters a validation error, you can choose to view the associated finding in Semgrep AppSec Platform, have Semgrep leave a comment in the pull request or merge request, or have the Semgrep scan fail with an exit code of `1`.

See [Rule modes](#rule-modes) for more information on the modes available.

## Slack notification policies

If you are an **admin** for your Semgrep organization, you can view, create, edit, or delete Slack notification policies. These policies allow you to notify developers of Secrets findings on Slack while managing noise and ensuring that developers are only notified based on the conditions you set. You can configure the following:

- **Scope**: These are the projects (repositories) that are affected by the policy.
- **Conditions**: The conditions under which **actions** are performed. These conditions are typically attributes of a finding, such as severity or validation.
- **Actions**: Actions that are performed on the defined scope when conditions are met.

You can create as many policies as necessary.

:::note Prerequisites
This feature requires either the:
- `semgrep:latest` Docker image
- Semgrep CLI version 1.101.0 and later
:::

### Create a policy

1. In Semgrep AppSec Platform, go to **Rules & policies > Policies > Secrets**.
1. Click **<i class="fa-solid fa-plus"></i> Create policy**.
2. Provide a **Policy name**.
3. Define the **Scope** of the policy:
    1. Click the drop-down box to select between **All Projects**, **Project**, or **Project tag**.
    2. If you select **Project** or **Project tag**, a second drop-down box appears. Choose the **projects** or **project tags** to finish defining the scope.
4. Define the conditions of the policy. See [Policy conditions](#policy-conditions) for more information. You can create more than one condition by clicking **Add condition**.
    - For each condition, you can select multiple values by clicking on the **plus sign (<i class="fa-solid fa-plus"></i>)** on the same row. The policy is applied when **any** of those values are met (`OR`).
    - Each additional condition is additive. The policy is applied when **all** conditions are met (`AND`).
5. Define the actions of the policy, and select which channels should receive notifications when the policy is triggered. This list is populated by the channels you have subscribed to. To change this list, follow the steps listed in [Receive Slack notifications](/semgrep-appsec-platform/slack-notifications#secrets).
6. Click **Create**.
7. Enable the policy by clicking the **<i class="fa-solid fa-toggle-large-on"></i> toggle** to enable a policy. This applies the policy to future scans.

#### Policy scopes

A policy's scope can consist of tags or projects, but not both. If you need to create a policy with both tags and projects, you must make another policy.

If a project or project tag that's included in a policy scope gets deleted, it is **removed from the policy scope**. If all projects or all project tags are deleted for a given policy, you must edit the policy for it to be applied to a valid scope.

#### Policy conditions

The following table lists available conditions and their values:

| Condition | Values|
| -------  | ------ |
| Severity      | <ul><li>Critical</li><li>High</li><li>Medium</li> <li>Low</li> </ul>       |
| [Validation](/semgrep-secrets/glossary#validation-state)         | <ul><li>Confirmed valid</li><li>Confirmed invalid</li><li>Validation error</li><li>No validator</li>  </ul>      |
| Repository visibility         | <ul> <li>Public</li> <li>Private</li> <li>Unknown</li> </ul> Note: Repository visibility is only available for GitHub repositories. |
| Secret type | Manually provide a Secret type or choose from a list of values. The values listed are generated from findings identified by Semgrep Secrets. |

### View your policy

1. In Semgrep AppSec Platform, go to **Rules & policies > Policies > Secrets**.
2. Under **Slack notification policies**, click the **name** of your policy or **the three-dot ellipsis (<i class="fas fa-ellipsis-h"></i>) > Edit policy** to see additional details.

You can also view a dialog showing a policy's **scope**, or the projects and tags affected by the policy, and a summary of its **actions and conditions** by clicking on the two summary links beside the policy name.

### Edit a policy

1. Go to [**Rules & Policies > Policies > Secrets**](https://semgrep.dev/orgs/-/policies/secrets), and find the policy you want to edit.
2. Click the **three-dot (...) button > Edit policy** for the policy. This takes you to the policy definition page.
3. Make your changes.
4. Click **Save**.

### Turn on or off a policy

1. Go to [**Rules & Policies > Policies > Secrets**](https://semgrep.dev/orgs/-/policies/secrets), and find the policy you want to turn on or off.
1. Turn off or on the **Enable policy** toggle.
2. Click **Save**.

### Delete a policy

1. Go to [**Rules & Policies > Policies > Secrets**](https://semgrep.dev/orgs/-/policies/secrets), and find the policy you want to delete.
2. Click the **three-dot (...) button > Delete policy**.
3. Click **Remove** to confirm..

Note: deleting a policy does not remove existing notifications.

## Block a pull request or merge request through rule modes

Semgrep enables you to set a **workflow action** based on the presence of a finding. Workflow actions include:

* Failing a CI job. Semgrep returns exit code `1`, and you can use this result to set up additional checks to enforce a block on a pull request (PR) or merge request (MR).
* Leaving a [PR or MR comment](/category/pr-or-mr-comments).
* [Notifying select channels](/semgrep-appsec-platform/notifications), such as private Slack channels or webhooks.

You can trigger these actions based on the [rule mode](#rule-modes) set for the rule.

<details>
<summary>Troubleshooting: no pull request or merge request comments for Semgrep Secrets</summary>

If you're encountering issues getting PR comments for Semgrep Secrets:

* Make sure the rule is in **Comment** or **Block** mode
* Review the [PR or MR comments guide for your SCM](/category/pr-or-mr-comments)
* Explore [other reasons you may not see PR or MR comments](/kb/semgrep-appsec-platform/missing-pr-comments)
</details>
