---
slug: triage-and-remediation
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
    - Semgrep Supply Chain
    - Semgrep AppSec Platform
title: Triage and remediation
hide_title: true
---

<!-- vale off -->

import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"
import FindingsDefaultView from "/src/components/concept/_findings-default-view.mdx"

<!-- vale on -->

# Triage and remediate dependency findings

Perform triage and remediation on your open source dependencies through the **Supply Chain** page. This page displays relevant scan data through three tabs:

<dl>
  <dt>Vulnerabilities</dt>
  <dd>
    This tab enables you to:
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
  <dt>License configuration</dt>
  <dd>This tab allows you to explicitly allow or disallow (block) a package's use in your repository based on its license.</dd>
</dl>

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_Figure 1_. Semgrep Supply Chain Vulnerabilities page.

## Assess and triage dependency findings and usages

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

To view the latest Semgrep Supply Chain findings, click **Supply Chain**. You can view findings individually or grouped by the rule that identified the finding. A specific finding in the code is called a **usage**. Vulnerability entries are sorted as cards by severity from critical to low, then from oldest to newest.

![A single vulnerability entry in Semgrep Supply Chain](/img/sc-vuln-entry.png)
_Figure 2_. A single vulnerability entry in Semgrep Supply Chain.

You can also view the findings individually by clicking on the drop-down box on the header and clicking **No grouping**.

### Default Supply Chain > Vulnerabilities tab view

<!-- To be superseded after beta concludes -->

In Semgrep, a single finding may appear in several branches. These appearances are called **instances** of a finding. In the Vulnerabilities tab, the latest instance, or the finding from the most recent branch scanned, is displayed by default.

#### For primary branch beta participants

<FindingsDefaultView product_name="Supply Chain" />

### Assessment actions

To assess your findings, Semgrep Supply Chain provides the following methods:

<table>
  <thead>
    <tr>
      <th>Assessment action</th>
      <th>Method</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>View specific pattern matches in your codebase.</td>
      <td>Click the link provided in the vulnerability entry to see where the issue appears in the source code.</td>
    </tr>
    <tr>
      <td>View specific CVE entries in <a href="https://www.cve.org/">cve.org</a>.</td>
      <td>Click the vulnerability's <strong>CVE badge</strong>.</td>
    </tr>
    <tr>
      <td>View safe versions to upgrade your dependencies.</td>
      <td>Visible on the vulnerability entry.</td>
    </tr>
    <tr>
      <td>Filter vulnerabilities.</td>
      <td>Click any of the filters available. Refer to the following table for filtering information.</td>
    </tr>
  </tbody>
</table>

### Filters

Use filters to narrow down your results. The following criteria are available for filtering:

| Filter                 | Description  |
| ---------------------  | ------------ |
| **Projects and branches**           | Filter by repositories connected to your Semgrep account and by findings in different Git branches. |
| **Tags**               | Filter for findings based on the tags associated with the project. |
| **Status**             | Filter the triage state of a finding: <ul><li>**Open**: Findings for which there have been no triage or remediation action.</li><li>**Reviewing**: Findings that require more investigation to determine what the next steps should be.</li><li>**Fixing**: Findings for which you have decided to fix. Commonly used to indicate that these findings are tracked in Jira or assigned to developers for further work.</li><li>**Ignored**: Vulnerabilities that have been triaged as **Ignored** by the user. </li><li>**Fixed**: Vulnerabilities that are no longer detected after a scan. This typically means that the dependency containing the vulnerability has been updated. Semgrep Supply Chain automatically checks if the dependency has been updated and sets the vulnerability's status as **Fixed**.</li></ul>|
| **Severity**           | Filter by the severity of a finding. Filters are based on the severity of a vulnerability. Semgrep Supply Chain rules use severity values set by the GitHub Advisory Database.  |
| **Transitivity**       | Filter by the transitivity of the finding. <ul><li>**Direct**: Your project depends directly on the dependency.</li><li>**Transitive**: Your project's dependency depends on a vulnerable dependency.</li><li>**Undetermined**: Semgrep had no transitivity information for the dependency as it relates to your project.</li></ul> |
| **Reachability**       | Filter by exposure, or whether the finding is reachable or not. <ul><li>**Reachable**: A finding is reachable if there's a code pattern in the codebase that matches the vulnerability definition</li><li>**Always reachable**: A finding is always reachable if it's something Semgrep recommends fixing, regardless of what's in the code.</li><li>**Conditionally reachable**: A finding is conditionally reachable if Semgrep finds a way to reach it when scanning your code when certain conditions are met.</li><li>**No Reachability Analysis**: A finding that isn't scanned by Semgrep for reachability.</li><li>**Unreachable**: A finding is unreachable if you don't use the vulnerable piece of code of the imported library or package.</li></ul>|
| **Dependencies**         | Filter for findings based on the name of the dependency involved. |
| **Rules**                | Filter based on the rule that generated the finding. |

## Remediate true positives

Remediate (or resolve) true positives in Semgrep Supply Chain through the following methods:

* Update the dependency to a safe version that does not contain the vulnerability.
* Remove the dependency and refactor all usages in the codebase.

<!-- Feature has been disabled for the time being. See https://github.com/semgrep/semgrep-app/pull/10186

### Updating the dependency

Semgrep Supply Chain provides a snippet you can copy to update the dependency. Click on the **Upgrade** button to view and copy the snippet. When the pull or merge request is merged into the codebase, Semgrep Supply Chain detects that the finding is no longer present and updates the vulnerability's status to **Fixed**.
-->

### Remove the dependency and refactoring code

Another method to remediate vulnerabilities is to remove the dependency entirely and refactor code. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your lockfile, and updates the status to **Fixed**.

### Ignore findings

The **Vulnerabilities** tab allows you to identify the reachable, true positives so that you can fix or resolve the related issues. However, you can choose to ignore any false positives, acceptable risks, or deprioritized findings due to some factor. To do this:

1. Select one or more findings.
2. Click **Triage**.
3. Select **Ignore** and click **Continue**.
4. Select an **Ignore reason**, provide a optional comment, and click **Ignore**.

## View Semgrep Supply Chain's total CVE coverage

The **Advisories** tab displays all the CVEs that Semgrep Supply Chain can detect. Click the individual entry to see the code pattern that the Advisory detects. The Advisories tab displays both lockfile-only and reachability rules.

<AdmonitionSotCves />
