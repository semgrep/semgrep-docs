---
slug: triage-and-remediation
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
    - Semgrep Supply Chain
    - Semgrep AppSec Platform
title: Triage and remediate dependency findings
hide_title: true
---

# Triage and remediate dependency findings

Once you have viewed the dependency findings identified by Semgrep Supply Chain, you can triage them for further work by your AppSec team, including remediation.

Semgrep Supply Chain provides the following methods to help you assess your findings:

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

## Remediate true positives

Remediate (or resolve) true positives in Semgrep Supply Chain through the following methods:

* Update the dependency to a safe version that does not contain the vulnerability.
* Remove the dependency and refactor all usages in the codebase.

<!-- Feature has been disabled for the time being. See https://github.com/semgrep/semgrep-app/pull/10186

### Updating the dependency

Semgrep Supply Chain provides a snippet you can copy to update the dependency. Click on the **Upgrade** button to view and copy the snippet. When the pull or merge request is merged into the codebase, Semgrep Supply Chain detects that the finding is no longer present and updates the vulnerability's status to **Fixed**.
-->

### Remove the dependency and refactor the code

Another method to remediate vulnerabilities is to remove the dependency entirely and refactor code. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your lockfile, and updates the status to **Fixed**.

### Ignore findings

The **Vulnerabilities** tab allows you to identify the reachable, true positives so that you can fix or resolve the related issues. However, you can choose to ignore any false positives, acceptable risks, or deprioritized findings due to some factor. To do this:

1. Select one or more findings.
2. Click **Triage**.
3. Select **Ignore** and click **Continue**.
4. Select an **Ignore reason**, provide a optional comment, and click **Ignore**.
