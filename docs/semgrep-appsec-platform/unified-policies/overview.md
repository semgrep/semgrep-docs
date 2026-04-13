---
slug: overview
title: Overview
hide_title: true
description: Learn how to get started and manage unified policies.
tags:
  - policies
---

# Unified policies (beta)

Unified policies allow you to choose the rules and rulesets used for Semgrep scans and define what happens to a finding after identification, such as whether a finding is monitored, generates a pull request (PR) or merge request (MR) comment, or blocks a PR or MR. With unified policies, there are two types of policy definitions available to you:

- **Detection policies**, which determine what rules are used to scan your project.
- **Remediation policies**, which determine what happens to the findings identified by Semgrep. These actions can include leaving PR/MR comments, blocking the PRs/MRs, creating Jira tickets, sending Slack notifications, and more.

## A comparison of legacy behavior versus the new behavior

Previously, you were able to [define Policies](/semgrep-code/policies) for each Semgrep product on a rule-by-rule basis. For each rule, you could determine whether findings identified based on that rule would be **monitored**, where the findings are only sent to Semgrep AppSec Platform for review, **generate a PR or MR comment**, or **block a PR or MR from being merged**:

<table>
    <tr>
        <td><b>Rule A</b></td>
        <td>Monitor</td>
    </tr>
    <tr>
        <td><b>Rule B</b></td>
        <td>Comment</td>
    </tr>
    <tr>
        <td><b>Rule C</b></td>
        <td>Block</td>
    </tr>
    <tr>
        <td><b>Rule D</b></td>
        <td>Block</td>
    </tr>
</table>

With unified policies, your definitions are now split into detection and remediation policies. The following tables show the detection policy enabling the rules for all projects and the remediation policy defining the actions that occur when the specified rules generate findings:

<table>
<thead>
  <tr>
    <th colspan="3">Detection policy</th>
  </tr></thead>
    <tr>
        <td><b>Rule A</b></td>
        <td>Enabled. <br />Scope: All projects</td>
    </tr>
    <tr>
        <td><b>Rule B</b></td>
        <td>Enabled. <br />Scope: All projects</td>
    </tr>
    <tr>
        <td><b>Rule C</b></td>
        <td>Enabled. <br />Scope: All projects</td>
    </tr>
    <tr>
        <td><b>Rule D</b></td>
        <td>Enabled. <br />Scope: All projects</td>
    </tr>
</table>

<table><thead>
  <tr>
    <th colspan="3">Remediation policy</th>
  </tr></thead>
<tbody>
  <tr>
    <td rowspan="4"><b>Automation 1</b></td>
    <td><i>Name</i></td>
    <td>Comment on PR or MR with findings</td>
  </tr>
  <tr>
    <td><i>Scope</i></td>
    <td>All projects</td>
  </tr>
  <tr>
    <td><i>Conditions</i></td>
    <td>Rule is one of:<br /><ul><li>Rule B</li></ul></td>
  </tr>
  <tr>
    <td><i>Actions</i></td>
    <td>Comment on the PR or MR</td>
  </tr>
  <tr>
    <td rowspan="4"><b>Automation 2</b></td>
    <td><i>Name</i></td>
    <td>Block PR or MR merges with findings</td>
  </tr>
  <tr>
    <td><i>Scope</i></td>
    <td>All projects</td>
  </tr>
  <tr>
    <td><i>Conditions</i></td>
    <td>Rule is one of: <br /><ul><li>Rule C</li><li>Rule D</li></ul></td>
  </tr>
  <tr>
    <td><i>Actions</i></td>
    <td>Block PR or MR</td>
  </tr>
</tbody>
</table>

## Next steps

- [Get started with unified policies](/semgrep-appsec-platform/unified-policies/get-started).