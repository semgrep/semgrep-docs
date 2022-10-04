---
slug: scanning-open-source-dependencies
append_help_link: true
description: "Scan your codebase's open source dependencies with Semgrep Supply Chain's high-signal rules that determine a vulnerability's reachability."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Scanning open source dependencies
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import SscIntro from "/src/components/concept/_ssc-intro.md"
import AdmonitionSscLicense from "/src/components/reference/_admonition-ssc-license.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Scanning open source dependencies

<SscIntro />

<AdmonitionSscLicense />

![Semgrep Supply chain overview page](/img/sc-overview.png)
_Figure 1_. Semgrep Supply Chain overview page.

Semgrep Supply Chain parses lockfiles for a list of dependencies, then scans your codebase using **rules **written with Semgrep's pattern syntax. Supply Chain rules specify the following:

* The range of versions that contain the dependency's vulnerability.
* A pattern for vulnerable code, such as passing in unsanitized data.
* The severity of the vulnerability.

Semgrep Supply Chain generates a **finding **when it detects a match. If the dependency's version is within the range and finds the matching code within your codebase, the finding is **reachable**.

A finding is **unreachable** if the dependency contains a known vulnerability, but the vulnerable matching code is not used in your codebase.

Within Semgrep App, specific findings of a dependency and code match are called **usages**. Usages are grouped by their **vulnerability**. Vulnerabilities in Semgrep Supply Chain typically have a CVE number corresponding to the record in the [CVE Program](https://www.cve.org/About/Overview).

The following diagram displays the relationship between a Supply Chain rule, the lockfile, and the codebase being scanned:

![Relationship between a Supply Chain rule, lockfile, CVE record, and codebase](/img/sc-reachability-analysis.png)
_Figure 2_. Relationship between a Supply Chain rule, lockfile, CVE record, and codebase.

## Semgrep and Semgrep Supply Chain

The following table displays differences between Semgrep and Semgrep Supply Chain.

<table>
<thead><tr>
   <th>Feature</th>
   <th>Semgrep</th>
   <th>Semgrep Supply Chain</th>
</tr></thead>
<tbody><tr>
   <td>Type of tool</td>
   <td>Static application security testing (SAST)</td>
   <td>Software composition analysis (SCA)</td>
  </tr>
  <tr>
   <td>Scan target
   </td>
   <td>First-party code (your codebase or repository)
   </td>
   <td>Open source dependencies 
   </td>
  </tr>
  <tr>
   <td>Triage workflow
   </td>
   <td>Findings can be categorized as:
<ul>
<li>Ignored (to triage false positives)</li>
<li>Closed (resolved) by refactoring code</li>
<li>Removed</li>
</ul>
   </td>
   <td>Findings can be categorized as:
<ul>
<li>New</li>
<li>In progress</li>
<li>Fixed</li>
<li>Ignored</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Remediation workflow
   </td>
   <td>Code refactoring
   </td>
   <td>Upgrading or removing the dependency, code refactoring
   </td>
  </tr>
  <tr>
   <td>Notification channels
   </td>
   <td>Jira, Slack, Email, Webhooks
   </td>
   <td>Slack and email
   </td>
  </tr></tbody>
</table>

## Language support

Refer to [Supported languages](/docs/semgrep-sc/supply-chain-supported-languages) to see all languages supported by Semgrep Supply Chain.

## Limitations of Semgrep Supply Chain scans

* Semgrep Supply Chain supports scanning for transitive or indirect dependencies for all of its supported languages **except Java**. Findings are collected and displayed in **Semgrep App > Supply Chain**.
* Semgrep Supply Chain detects transitivity only for **Python and JavaScript **languages.
* Semgrep Supply Chain generates reachable findings only for direct dependencies.

## Scanning a repository with Semgrep Supply Chain

:::note
Semgrep Supply Chain **supports monorepositories (monorepos)** by treating each subdirectory as its own repository. Findings are grouped under these repositories based on the lockfile or manifest file present in the subdirectory.
:::

You can run a dependency scan within Semgrep App.

### Scanning with Supply Chain rules through Semgrep App

:::tip
This is the preferred method to enable and run Semgrep Supply Chain.
:::

**Prerequisites:** To run Semgrep Supply Chain, you need the following:

* A Semgrep App account. See [Signing in to Semgrep App](/docs/semgrep-app/getting-started-with-semgrep-app/#signing-in-to-semgrep-app).
* A project (repository) with a lockfile to scan. The repository must have at least one **lockfile**. See [Scanning a new project](/docs/semgrep-app/getting-started-with-semgrep-app/#scanning-a-new-project).

To enable and run a Supply Chain (dependency) scan in Semgrep App:

1. Sign in to your Semgrep App account.
2. Click **Projects > Gear icon** of the repository on which to run Supply Chain rules.
3. Click **SSC toggle**. Semgrep Supply Chain rules are included in your next scan, that occurs based on your CI set up, such as schedules and events configuration (push, pull, and merge requests).
4. Optional: To start a dependency scan immediately, go to your CI provider's interface and manually begin the Semgrep workflow or job.

The scan finishes and displays findings in the **Supply Chain** tab for further triage and remediation. See [Triaging and remediating dependency findings](/docs/semgrep-sc/triaging-and-remediating-vulnerabilities).

:::note
If the scan is triggered by a pull request or merge request (PR or MR) and detects any reachable finding, the PR or MR is **blocked** from merging.
:::

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

* Reachable findings block a pull or merge request.
* Unreachable findings **do not** block a pull or merge request.

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

## Additional references

* [Software supply chain security is hard](https://r2c.dev/blog/2022/software-supply-chain-security-is-hard/)
* [The best free, open-source supply-chain security tool? The lockfile](https://r2c.dev/blog/2022/the-best-free-open-source-supply-chain-tool-the-lockfile/)

<MoreHelp />
