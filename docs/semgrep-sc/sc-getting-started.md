---
slug: scanning-open-source-dependencies
append_help_link: true
description: "Scan your codebase's open source dependencies with Semgrep Supply Chain's high-signal rules that determine a vulnerability's reachability."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Getting started with Semgrep Supply Chain
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

# Scanning open source dependencies 

Semgrep Supply chain scans can be triggered from the Semgrep App interface.

:::note
Semgrep Supply Chain **supports monorepositories (monorepos)** by treating each subdirectory as its own repository. Findings are grouped under these repositories based on the lockfile or manifest file present in the subdirectory.
:::

## Scanning with Semgrep Supply Chain through Semgrep App

:::tip
This is the preferred method to enable and run Semgrep Supply Chain.
:::

Perform the following steps to create an account in Semgrep App and add (onboard) a repository for scanning. By adding a repository to Semgrep App, you are able to set up Semgrep Supply Chain scans and receive findings for vulnerabilities which you can triage and remediate.

Read [Step 3](#step-3-enabling-semgrep-supply-chain-scans-from-within-semgrep-app) if you have already created an account in Semgrep App and added a repository.

### Step 1: Creating an account in Semgrep App

### Step 2: Adding projects to Semgrep App

### Step 3: Enabling Semgrep Supply Chain scans from within Semgrep App

To enable and run a Supply Chain (open source dependency) scan in Semgrep App:

1. Sign in to your Semgrep App account, and then go to **Projects** page.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)**, and then click <i class="fa-solid fa-gear"></i> **gear** icon of the repository on which to run Supply Chain rules.
3. Click <i class="fa-solid fa-toggle-large-on"></i> **SSC toggle**. Semgrep Supply Chain rules are included in your next scan, that occurs based on your CI set up, such as schedules and events configuration (push, pull, and merge requests).
4. Optional: To start a dependency scan immediately, go to your CI provider's interface and manually begin the Semgrep workflow or job.

The scan finishes and displays findings in the **Supply Chain** tab for further triage and remediation. See [Triaging and remediating dependency findings](/docs/semgrep-sc/triaging-and-remediating-vulnerabilities).

#### Events that trigger a Supply Chain dependency scan

Dependency scans can be triggered by the following, depending on your CI set up:

<table>
  <tr>
   <td><strong>Event</strong>
   </td>
   <td><strong>Scope of scan</strong>
   </td>
   <td><strong>Dependency rule set</strong>
   </td>
  </tr>
  <tr>
   <td>Pull or merge request
   </td>
   <td>diff-aware scan
   </td>
   <td>All dependency rules
   </td>
  </tr>
  <tr>
   <td>Push or scheduled event, such as a cron job
   </td>
   <td>full scan
   </td>
   <td>All dependency rules
   </td>
  </tr>
</table>

For more information on diff-aware and full scans, see [Diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-app/#diff-aware-scanning).

#### Blocking a PR or MR

Both reachable and unreachable findings of Semgrep Supply Chain do **not** block a pull request or merge request.

_Updated Nov 22nd, 2022: Old versions (Semgrep v0.122.0 and below) used to block reachable findings._

## Ignoring dependency findings through `semgrepignore`

See [Ignoring dependency findings](/docs/semgrep-sc/ignoring-lockfiles-dependencies).

## Triaging and remediating dependency findings

Semgrep Supply Chain enables developers to perform triage and remediation through the **Dependencies** page. On this page you can perform the following:

* View specific **reachable** vulnerable lines of code in your codebase. This helps to evaluate the threat.
* View specific lines of code where your dependency is being declared.
* Triage a dependency finding.
* Attach a PR or MR, or Jira ticket to the finding.
* Upgrade the dependency that generated the finding to a safe version. A safe version is any newer version of the dependency that does not contain the vulnerability. This resolves the finding.

For more information, see [Triaging and remediating findings](/docs/semgrep-sc/triaging-and-remediating-vulnerabilities).

<MoreHelp />
