---
slug: triage-and-remediation
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
title: Triage and remediate
hide_title: true
---

# Triage and remediate Supply Chain findings

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Once Semgrep Supply Chain successfully scans your repository and you've [viewed your results](/semgrep-supply-chain/view-export), you can triage and remediate the findings presented in Semgrep AppSec Platform using the **Supply Chain** page.

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_**Figure**. Semgrep Supply Chain Vulnerabilities page._

## Triage and remediate findings

Once you have viewed the Supply Chain findings, you can triage them for further work by your AppSec team, including remediation. Semgrep Supply Chain provides the following methods to help you assess your findings:

<table>
 <thead>
 <tr>
 <th>Assessment action</th>
 <th>Method</th>
 </tr>
 </thead>
 <tbody>
<tr>
 <td>View the [dependency paths for a transitive dependency](/semgrep-supply-chain/dependency-search#dependency-paths-beta).</td>
 <td>Visible on the vulnerability entry.</td>
 </tr>
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

### Remediate true positives

Remediate (or resolve) true positives in Semgrep Supply Chain through the following methods:

* Update the dependency to a safe version that does not contain the vulnerability.
* Remove the dependency and refactor all usages in the codebase.

<!-- Feature has been disabled for the time being. See https://github.com/semgrep/semgrep-app/pull/10186

### Updating the dependency

Semgrep Supply Chain provides a snippet you can copy to update the dependency. Click on the **Upgrade** button to view and copy the snippet. When the pull or merge request is merged into the codebase, Semgrep Supply Chain detects that the finding is no longer present and updates the vulnerability's status to **Fixed**.
-->

#### Remove the dependency and refactor the code

Removing the dependency and refactoring the code is another method to remediate vulnerabilities. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your manifest file or lockfile, and updates the status to **Fixed**.

### Ignore findings

The **Vulnerabilities** tab allows you to identify the reachable, true positives so that you can fix or resolve the related issues. However, you can ignore any false positives, acceptable risks, or deprioritized findings due to some factor. To do this:

1. Select one or more findings.
2. Click **Triage**.
3. Select **Ignore** and click **Continue**.
4. Select an **Ignore reason**, provide a optional comment, and click **Ignore**.

## Block pull or merge requests

To block or leave comments on pull or merge requests, see the [Supply Chain Policies](/semgrep-supply-chain/policies) document.
