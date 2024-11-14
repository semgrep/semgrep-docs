---
slug: triage-and-remediation
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
title: View, triage, and remediate
hide_title: true
---

import FindingsDefaultView from "/src/components/concept/_findings-default-view.mdx"

# View, triage, and remediate Supply Chain findings

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Once Semgrep Supply Chain successfully scans your repository, you can view, triage, and remediate the findings presented in Semgrep AppSec Platform using the **Supply Chain** page.

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_**Figure**. Semgrep Supply Chain Vulnerabilities page._

The **Supply Chain** page displays relevant scan data using four tabs:
- The **Vulnerabilities** tab enables you to:
    - View reachable vulnerabilities in your repositories through links to specific lines of code.
    - Filter vulnerabilities by severity, reachability, status, transitivity, and other attributes.
    - Understand how to remediate vulnerabilities by providing versions to upgrade to.
    - Track the process of resolving vulnerabilities by adding links to Jira issues and pull requests.
- The **Advisories** tab displays the latest **Common Vulnerabilities and Exposures (CVEs)** covered by Semgrep Supply Chain rules. Use this tab to see all the CVEs that Semgrep Supply Chain can detect and view the code pattern that the Advisory detects. The Advisories tab displays both lockfile-only and reachability rules.
- The **Dependencies** tab displays information about your dependencies across all onboarded repositories.
- The **License configuration** tab allows you to explicitly allow or disallow (block) a package's use in your repository based on its license.

## View the latest findings

To view the latest Semgrep Supply Chain findings, click **Supply Chain**. You can view findings individually or grouped by the rule that identified the finding. A specific finding in the code is called a **usage**. Vulnerability entries are sorted as cards by severity from critical to low, then from oldest to newest.

![A single vulnerability entry in Semgrep Supply Chain](/img/sc-vuln-entry.png)
_**Figure**. A single vulnerability entry in Semgrep Supply Chain._

You can also view the findings individually by clicking the drop-down box on the header and clicking **No grouping**.

<FindingsDefaultView product_name="Supply Chain" />

## Filter your findings

Use filters to narrow down your results. The following criteria are available for filtering:

| Filter | Description  |
| -  | - |
| **Projects and branches** | The repositories connected to your Semgrep account and findings in different Git branches. |
| **Tags** | The tags associated with the project. |
| [**Status**](#status) | The triage state of a finding. |
| **Severity** | The severity of a finding. Filters are based on the severity of a vulnerability. Semgrep Supply Chain rules use severity values set by the [GitHub Advisory Database](https://github.com/advisories).  |
| [**Transitivity**](#transitivity) | The transitivity of the finding. |
| [**EPSS probability**](#epss-probability) | The finding's [Exploit prediction scoring system (EPSS) probability](https://www.first.org/epss/). |
| [**Reachability**](#reachability) | The finding's exposure, or whether it is reachable. |
| **Component**          | Filter by [Semgrep Assistant component tags](/semgrep-assistant/overview#component-tags). Semgrep Assistant uses AI to categorize the file where the finding was identified based on its function, such as payments, user authentication, and infrastructure. Available only for findings that are reachable. |
| **Dependencies** | The name of the dependency involved. |
| **Rules** | The rule that generated the finding. |

### Status

The triage state of the finding:

* **Open**: Findings for which there have been no triage or remediation action.
* **Reviewing**: Findings that require more investigation to determine what the next steps should be.
* **Fixing**: Findings for which you have decided to fix. Commonly used to indicate that these findings are tracked in Jira or assigned to developers for further work.
* **Ignored**: Vulnerabilities that have been triaged as **Ignored** by the user. You can filter findings with a status of **Ignored** further by reason: **False positive**, **Acceptable risk**, **No time to fix**, or **No triage reason**.
* **Fixed**: Vulnerabilities that are no longer detected after a scan. This typically means that the dependency containing the vulnerability has been updated. Semgrep Supply Chain automatically checks if the dependency has been updated and sets the vulnerability's status as **Fixed**.

> You can set the **Fixing** and **Reviewing** statuses only if you are a [Jira beta](https://semgrep.dev/docs/semgrep-appsec-platform/jira) participant.

### Transitivity

The transitivity of the finding: 

* **Direct**: Your project depends directly on the dependency.
* **Transitive**: Your project's dependency depends on a vulnerable dependency.
* **Undetermined**: Semgrep had no transitivity information for the dependency as it relates to your project.

### EPSS probability

The [Exploit prediction scoring system (EPSS) probability](https://www.first.org/epss/) represents the likelihood that the vulnerability will be exploited in the wild in the next 30 days. Its values range from 0% to 100%. The higher the score, the greater the probability the vulnerability will be exploited. Semgrep groups probabilities as follows:

* <b>High</b>: 50 - 100%
* <b>Medium</b>: 10 - &#60;50%
* <b>Low</b>: &#60;10%

### Reachability

The finding's exposure to potential attacks, or whether it is reachable.

* **Reachable**: A finding is reachable if there's a code pattern in the codebase that matches the vulnerability definition.
* **Always reachable**: A finding is always reachable if it's something Semgrep recommends fixing, regardless of what's in the code.
* **Conditionally reachable**: A finding is conditionally reachable if Semgrep finds a way to reach it when scanning your code when certain conditions are met.
* **No Reachability Analysis**: A finding that Semgrep doesn't scan for reachability.
* **Unreachable**: A finding is unreachable if you don't use the vulnerable piece of code of the imported library or package.

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

Removing the dependency and refactoring the code is another method to remediate vulnerabilities. Upon merging any dependency removals, Semgrep Supply Chain scans the PR or MR, detects the changes in your lockfile, and updates the status to **Fixed**.

### Ignore findings

The **Vulnerabilities** tab allows you to identify the reachable, true positives so that you can fix or resolve the related issues. However, you can ignore any false positives, acceptable risks, or deprioritized findings due to some factor. To do this:

1. Select one or more findings.
2. Click **Triage**.
3. Select **Ignore** and click **Continue**.
4. Select an **Ignore reason**, provide a optional comment, and click **Ignore**.
