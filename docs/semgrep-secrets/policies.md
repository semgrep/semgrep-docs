---
slug: policies
append_help_link: true
title: Policies
hide_title: true
description: The Policies page is a visual representation of the rules that Semgrep Secrets uses to scan code
tags:
  - Semgrep Secrets
---

# Policies

The **Policies** page visually represents the rules Semgrep Secrets uses for scanning. 

![Overview of Semgrep Secrets policies view](/img/secrets-rules-management.png)

To access the policies page for Semgrep Secrets:

1. Log in to Semgrep Cloud Platform and navigate to **Rules** > **Policies**.
2. Click **Secrets**.

## Policies page structure

The Policies page consists of the following elements:

<dl>
    <dt>Policies header</dt>
        <dd>
            The top header contains the <strong>Validation State Policies</strong> button, which lets you define how Semgrep handles findings that it categorizes as invalid or results in a validation error.
        </dd>
    <dt>Filter pane</dt>
        <dd>
           Displays filters to select and perform operations on rules in bulk quickly. See <a href="#filters">Filters</a> for more information.
        </dd>
    <dt>Rules pane</dt>
        <dd>
            The rules pane displays the rules that Semgrep scans use to detect leaked secrets
             and allows you to edit their assigned rule modes. You can make these edits either one by one or through the bulk editing of many rules. You can also use the <strong>Search for rule names or ids</strong> box. See <a href="#filters">Filters</a> for more information.
        </dd>
</dl>

## Filters

The filter pane displays filters to select and perform operations on rules in bulk. The following filters are available:

| Filter | Description |
| - | - |
| Modes | Filter by the workflow action Semgrep performs when a rule detects a finding. An additional filter, **Disabled**, is provided for rules you have turned off and are no longer included for scanning. |
| Validation | Filter by whether the rule includes a validator or not. |
| Type | Filter by the type of secret the rule addresses. Examples: AWS, Adobe, DigitalOcean, GitHub, GitLab. |
| Source | Filter by Pro rules (authored by Semgrep) or by Custom rules (rules created by your organization) |
| Severities | Filter by the severity level of the secret: <ul><li>**Low**: low privilege; for example, write-only access like a webhook</li><li>**Medium**: may have read and write access depending on what scope the account has</li><li>**High**: has access to critical resources or full account access</li></ul> |
| Analysis method | Filter based on whether Semgrep used **Semantic** or **Generic** analysis |

## Rule entry reference

This section defines the columns of the rule entries in the Policies page:

| Filter | Description |
| -------  | ------ |
| Rule name  | Name of the rule Semgrep Secret uses for scanning. |
| Labels  | Metadata describing the rule, including the service for which the rule is applicable. |
| Open findings  | The number of open findings the rule detected across all scans.  |
| Fix rate  | The percentage of findings that are fixed.  |
| Severity  | The higher the severity, the more critical the issues that a rule detects.      |
| Confidence  | Indicates confidence of the rule to detect true positives.      |
| Source  | Indicates the origin of a rule. | <ul><li><strong>Pro:</strong> Authored by Semgrep. Custom:</strong> Rules created within your Semgrep organization. |
| Ruleset  | The name of the ruleset the rule belongs to. |
| Mode  | Specifies what workflow action Semgrep performs when a rule detects a finding. An additional filter, **Disabled**, is provided for rules you have turned off and are no longer included for scanning. | See [Rule modes](#rule-modes) documentation. |

## Rule modes

Semgrep Secrets provides three rule modes. These can be used to trigger **workflow options** whenever Semgrep Secrets identifies a finding based on the rule:

| Rule mode | Description |
| -------   | ------ |
| Monitor   | Rules in **Monitor mode** display findings only in: <ul><li>Semgrep Cloud Platform</li><li>User-defined notifications</li></ul>Set rules to this mode to evaluate their true positive rate and other criteria you may have. By keeping rules in Monitor, developers do not receive potentially noisy findings in their PRs or MRs.  |
| Comment   | Rules in **Comment mode** display findings in:<ul><li>Developers' PRs or MRs</li><li>Semgrep Cloud Platform</li><li>User-defined notifications</li></ul>Set rules that have met your performance criteria to this mode when you are ready to display findings to developers.     |
| Block     | Rules in **Block mode** cause the scan job to fail with an exit code of `1` if Semgrep Secrets detects a finding from these rules. You can use this result to enforce a block on the PR or MR. For example, GitHub users can enable branch protection and set the PR to fail if the Semgrep step fails. <br />These rules display findings in:<ul><li>Developers' PRs or MRs</li><li>Semgrep Cloud Platform</li><li>User-defined notifications</li></ul>These are typically high-confidence, high-severity rules. |

## Validation state policies

You can define how Semgrep handles findings that it categorizes as invalid or results in a validation error.

- **Invalid findings**: include secrets that, during validation, were identified as revoked, or were never functional.
- **Validation errors**: occur when there are difficulties reaching the secrets provider or when Semgrep receives an unexpected response from the API.

To set the rule mode for invalid findings and validation errors:

1. Log in to Semgrep Cloud Platform, and navigate to **Rules** > **Policies**.
2. Switch to the **Secrets** page.
3. Click **Validation State Policies**.
4. Set the [rule mode](#rule-modes) for **Invalid findings** and **Validation errors** by choosing the option you'd like from the drop-down menu on the right.

## Block a PR or MR through rule modes

Semgrep enables you to set a **workflow action** based on the presence of a finding. Workflow actions include:

* Failing a CI job. Semgrep returns exit code `1`, and you can use this result to set up additional checks to enforce a block on a PR or MR.
* Leaving a [PR or MR comment](/category/pr-or-mr-comments/).
* [Notifying select channels](/semgrep-cloud-platform/notifications/), such as private Slack channels or webhooks.

You can trigger these actions based on the [rule mode](#rule-modes) set for the rule.

<!-- Custom rules aren't ready yet
## Add custom rules

To add custom rules, use the Semgrep Editor. See [<i class="fa-regular fa-file-lines"></i> Setting code standards with the Policies page](/semgrep-code/editor/#setting-code-standards-with-the-policies-page).
 -->

## Disable rules

To disable rules:

1. On the **Policies** page, select either:
    - The top **<span className="placeholder">Number</span> Matching Rules** checkbox to select all rules.
    - Select individual checkboxes next to a rule to disable rules one by one.
2. Click **Change modes(<span className="placeholder">Number</span>)**, and then click **Disabled**.

You can also select individual rules under the **Mode** column and disable them individually.
