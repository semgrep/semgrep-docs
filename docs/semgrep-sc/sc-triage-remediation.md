---
slug: triaging-and-remediating-vulnerabilities
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Triaging and remediating dependency findings
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import AdmonitionSscLicense from "/src/components/reference/_admonition-ssc-license.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Triaging and remediating dependency findings

TODO add screenshot

<AdmonitionSscLicense />

Perform triage and remediation on your open-source dependencies through the **Supply chain** page. This page displays relevant scan data through three tabs:

<dl>
<dt>Overview</dt>
    <dd>This tab displays the most recently discovered reachable vulnerabilities, advisories, and charts presenting historical data of vulnerabilities discovered in all repositories in which Supply Chain is enabled. The red badge displaying a number is your total count of <strong>reachable vulnerabilities</strong>.</dd>
<dt>Vulnerabilities</dt>
    <dd>This tab enables you to:
    <ul>
        <li>Filter findings.</li>
        <li>View vulnerabilities in your repositories by providing links to specific lines of code.</li>
        <li>Triage many findings at once (bulk triage).</li>
        <li>Remediate findings by adding links to Jira issues and pull requests.</li>
    </ul>
</dd>
<dt>Advisories</dt>
<dd>This tab displays the latest <strong>Common Vulnerabilities and Exposures (CVEs)</strong> that are covered by Semgrep Supply Chain rules. This means that the CVEs listed in Advisories can be detected by a Semgrep Supply Chain scan.</dd>
</dl>

## Assessing and triaging dependency findings and usages

**Prerequisite:** At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scanning open-source dependencies](https://docs.google.com/document/d/1siR-6uNSPtV056HQoNLNU8WG1TmkBM5rDyenwVZG2TM/edit#heading=h.bmpe6pqb1e4c).

The latest findings are visible in **Supply chain > Overview**. Clicking **Triage** opens the **Vulnerabilities** tab.

Findings are grouped together by **vulnerability**. A specific finding in the code is called a **usage**. Usages are grouped under their respective vulnerabilities. Vulnerability entries are sorted as cards from newest to oldest then by severity from critical to low.

TODO Add screenshot

By assessing your vulnerabilities, you are able to determine reachable, true positives and the necessary effort to fix or resolve findings. After assessment, users typically decide between two actions:

* **To ignore the vulnerabilities. **Vulnerabilities that are **ignored** are false positives, acceptable risks, or deprioritized findings due to some factor, such as time.
* **To remediate or resolve the vulnerability.** These vulnerabilities are true positives that are prioritized due to factors such as reachability and severity. Possible remediation solutions include updating the dependency or removing the dependency and refactoring the code.

To assess your findings, Semgrep Supply Chain provides the following methods:

<table>
  <thead><tr>
   <th>Assessment action</th>
   <th>Method</th>
  </tr></thead>
  <tbody><tr>
   <td>View specific code instance in your codebase.
   </td>
   <td>Click the links provided under <strong>Reachable via N usages</strong> within the vulnerability's entry.
   </td>
  </tr>
  <tr>
   <td>View specific CVE entry in <a href="https://www.cve.org/">cve.org</a>.
   </td>
   <td>Click the vulnerability's <strong>CVE badge</strong>.
   </td>
  </tr>
  <tr>
   <td>View safe version to upgrade your dependency to.
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

The following **filters** are provided:

<table>
  <thead><tr>
   <th>Filter</th>
   <th>Description</th>
  </tr></thead>
  <tbody><tr>
   <td>Exposure
   </td>
   <td>Filters based on the <a href="https://docs.google.com/document/d/1u8J9klICqDr7NS0x-_nf2paROEOL3XRc9nRkG8Pchs8/edit#">reachability</a> of a vulnerability. <strong>Reachable findings</strong> are displayed by default.
   </td>
  </tr>
  <tr>
   <td>Severity
   </td>
   <td>Filters based on the severity of a vulnerability. Semgrep Supply Chain rules use severity values set by GitHub Advisory Database.
   </td>
  </tr>
  <tr>
   <td>Status
   </td>
   <td>Filters based on the status of a vulnerability.
   </td>
  </tr></tbody>
</table>

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
   <td>In progress 
   </td>
   <td>Vulnerabilities with an attached Jira issue tracker or pull or merge request link.
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


### Updating the dependency

Semgrep Supply Chain provides an update snippet you can copy and use to create a pull or merge request. Click on the **Upgrade** button to view and copy the snippet. When the pull or merge request is merged into the codebase, Semgrep Supply Chain detects that the finding is no longer present and updates the vulnerability's status to **Fixed**.


### Tracking the remediation process

Semgrep Supply Chain enables you to track the progress of your remediation by providing fields for the following:



* **Jira issue tracker**. This is the **card icon** seen in the vulnerability's entry.
* **Pull or merge request (PR or MR) link**. This is the **merge icon** seen in the vulnerability's entry.

Copy the PR or MR link or Jira issue link to the corresponding field. This changes the vulnerability's status to **In progress**.


### Removing the dependency and refactoring code

Another method to remediate vulnerabilities is to remove the dependency entirely and refactor code. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your lockfile, and updates the status to **Fixed**.


## Ignoring vulnerabilities

To ignore a vulnerability:

1. **Optional:** Filter vulnerabilities to apply criteria for a group findings to ignore.
2. Click on the vulnerability's **Ignore **button. A drop-down menu appears.
3. Click the reason for ignoring. 

## Appendix: Other helpful data points

### Viewing historical scan data

The **Overview** tab displays two charts to assist you in understanding historical scan data:

<dl>
<dt>Inbox size over time</dt>
<dd>This is the amount of <strong>reachable vulnerabilities</strong> across all repositories that run Semgrep Supply Chain scans. The Y-axis goes down as triage actions are undertaken.</dd>
<dt>New vulnerabilities over time</dt>
<dd>This is the amount of <strong>reachable and unreachable vulnerabilities</strong> over time across all repositories that run Semgrep Supply Chain scans. The chart generates a new bar every time a scan runs.</dd>
</dl>


### Viewing the latest advisories

The **Advisories** tab displays the newest CVEs that Semgrep Supply Chain can detect. Click the individual entry to see the code pattern that the Advisory detects. 

<MoreHelp />
