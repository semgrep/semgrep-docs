---
slug: triage-and-remediation 
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Triage and remediation 
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Triaging and remediating dependency findings

Perform triage and remediation on your open source dependencies through the **Supply chain** page. This page displays relevant scan data through three tabs:

<dl>
<dt>Vulnerabilities</dt>
    <dd>This tab enables you to:
    <ul>
        <li>View reachable vulnerabilities in your repositories through links to specific lines of code.</li>
        <li>Filter vulnerabilities by severity, reachability, status, transitivity, and other attributes.</li>
        <li>Understand how to remediate vulnerabilities by providing versions to upgrade to.</li>
        <li>Track the process of resolving vulnerabilities by adding links to Jira issues and pull requests.</li>
    </ul>
</dd>
<dt>Advisories</dt>
<dd>This tab displays the latest <strong>Common Vulnerabilities and Exposures (CVEs)</strong> that are covered by Semgrep Supply Chain rules. Use this tab to see the CVEs that Semgrep Supply Chain can detect.</dd>
<dt>Dependencies</dt>
<dd>This tab displays information about all of your dependencies across all onboarded repositories.</dd>
</dl>

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulnerabilities.png)
_Figure 1_. Semgrep Supply Chain Vulnerabilities page.

## Assessing and triaging dependency findings and usages

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Getting started with Semgrep Supply Chain](/semgrep-supply-chain/getting-started).
:::

To view the latest findings of Semgrep Supply Chain, click Supply Chain.

Findings are displayed under their respective repositories. Findings are grouped by **vulnerability**. A specific finding in the code is called a **usage**. Vulnerability entries are sorted as cards from newest to oldest then by severity from critical to low.

<div class="bordered">

![A single vulnerability entry in Semgrep Supply Chain](/img/sc-ignore-reasons.png)

</div>

_Figure 2_. A single vulnerability entry in Semgrep Supply Chain.

Within the **Vulnerabilities** tab, you can determine reachable, true positives and the necessary effort to fix or resolve findings. After assessment, Semgrep Supply Chain assists users to decide between two triage actions:

* **Ignore the vulnerabilities. **Vulnerabilities that are **ignored** are false positives, acceptable risks, or deprioritized findings due to some factor, such as time.
* **Remediate or resolve the vulnerability.** These vulnerabilities are true positives that are prioritized due to factors such as reachability and severity.


### Assessment actions

To assess your findings, Semgrep Supply Chain provides the following methods:

<table>
  <thead><tr>
   <th>Assessment action</th>
   <th>Method</th>
  </tr></thead>
  <tbody><tr>
   <td>View specific pattern matches in your codebase.
   </td>
   <td>Click links provided under <strong>Reachable via N usages</strong> within the vulnerability's entry.
   </td>
  </tr>
  <tr>
   <td>View specific CVE entries in <a href="https://www.cve.org/">cve.org</a>.
   </td>
   <td>Click the vulnerability's <strong>CVE badge</strong>.
   </td>
  </tr>
  <tr>
   <td>View safe versions to upgrade your dependencies.
   </td>
   <td>Visible on the vulnerability entry.
   </td>
  </tr>
  <tr>
   <td>Filter vulnerabilities.
   </td>
   <td>Click any of the filters available. Refer to the following table for filtering information.
   </td>
  </tr></tbody>
</table>

### Filters

The following **filters** are provided:

<table>
  <thead><tr>
   <th>Filter</th>
   <th>Description</th>
  </tr></thead>
  <tbody><tr>
   <td>Exposure
   </td>
   <td>Filters are based on the <a href="/docs/semgrep-supply-chain/glossary">reachability</a> of a vulnerability. The <strong>Reachable</strong> filter is selected by default.
   </td>
  </tr>
  <tr>
   <td>Severity
   </td>
   <td>Filters are based on the severity of a vulnerability. Semgrep Supply Chain rules use severity values set by the GitHub Advisory Database. <strong>All severities</strong> are selected by default.
   </td>
  </tr>
  <tr>
   <td>Status
   </td>
   <td>Filters are based on the status of a vulnerability. The <strong>New</strong> filter is selected by default.
   </td>
  </tr>
  <tr>
   <td>Transitivity
   </td>
   <td>Filters are based on the transitivity of a vulnerability. <strong>All transitivities</strong> are selected by default.
   </td>
  </tr>
  </tbody>
</table>

#### Exposure filters

The following **exposure filters** are provided:


<table>
  <thead><tr>
   <th>Exposure filter</th>
   <th>Description</th>
  </tr></thead>
  <tbody><tr>
   <td>Reachable
   </td>
   <td>Semgrep detected that there is a usage of the vulnerability from the dependency in your codebase. Some vulnerabilities are considered always reachable because they can be exploited regardless of their usage in your codebase. Others may require manual review and provide criteria to evaluate, such as whether the server running the vulnerable code is internet-accessible.
   </td>
  </tr>
  <tr>
   <td>Unreachable
   </td>
   <td>Semgrep determined that there is no usage of the vulnerability from the dependency in your codebase.
   </td>
  </tr>
  <tr>
   <td>Undetermined
   </td>
   <td>Semgrep does not scan for the reachability of this vulnerability.
   </td>
  </tr></tbody>
</table>

#### Status filters

The following **status filters** are provided:

<table>
  <thead><tr>
   <th>Status filter</th>
   <th>Description</th>
  </tr></thead>
  <tbody><tr>
   <td>New
   </td>
   <td>Vulnerabilities that have not undertaken triage or remediation action.
   </td>
  </tr>
  <tr>
   <td>Fixed
   </td>
   <td>Vulnerabilities that are no longer detected after a scan. This typically means that the dependency containing the vulnerability has been updated. Semgrep Supply Chain automatically checks if the dependency has been updated and sets the vulnerability's status as <strong>Fixed</strong>.
   </td>
  </tr>
  <tr>
   <td>Ignored
   </td>
   <td>Vulnerabilities that have been triaged as ignored by the user. Semgrep Supply Chain provides the following options for developers to select:
    <ul>
    <li>False positive</li>
    <li>Acceptable risk</li>
    <li>No time to fix</li>
    </ul>
   </td>
  </tr></tbody>
</table>



## Remediating true positives

Remediate (or resolve) true positives in Semgrep Supply Chain through the following methods:

* Update the dependency to a safe version that does not contain the vulnerability.
* Remove the dependency and refactor all usages in the codebase.

### Updating the dependency

Semgrep Supply Chain provides a snippet you can copy to update the dependency. Click on the **Upgrade** button to view and copy the snippet. When the pull or merge request is merged into the codebase, Semgrep Supply Chain detects that the finding is no longer present and updates the vulnerability's status to **Fixed**.

### Removing the dependency and refactoring code

Another method to remediate vulnerabilities is to remove the dependency entirely and refactor code. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your lockfile, and updates the status to **Fixed**.

## Ignoring vulnerabilities

To ignore a vulnerability:

1. **Optional:** Filter vulnerabilities to apply criteria for a group of findings to ignore.
2. Click on the vulnerability's **Ignore **button. A drop-down menu appears.
3. Click the reason for ignoring. 

### Viewing Semgrep Supply Chain's total CVE coverage

The **Advisories** tab displays all the CVEs that Semgrep Supply Chain can detect. Click the individual entry to see the code pattern that the Advisory detects. The Advisories tab displays both lockfile-only and reachability rules.

<AdmonitionSotCves />

<MoreHelp />
