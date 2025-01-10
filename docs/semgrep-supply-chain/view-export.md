---
slug: view-export
append_help_link: true
description: View and export Semgrep Supply Chain Findings."
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
title: View and export findings
hide_title: true
---

import FindingsDefaultView from "/src/components/concept/_findings-default-view.mdx"
import ExportFindingsCsv from "/src/components/procedure/_export-findings-csv.md"

# View and export Supply Chain findings

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Once Semgrep Supply Chain successfully scans your repository, you can view and export information regarding the findings presented in Semgrep AppSec Platform using the **Supply Chain** page.

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_**Figure**. Semgrep Supply Chain Vulnerabilities page._


The **Supply Chain** page displays relevant scan data using four tabs:
- The **Vulnerabilities** tab enables you to:
    - View reachable vulnerabilities in your repositories through links to specific lines of code.
    - Filter vulnerabilities by severity, reachability, status, transitivity, and other attributes.
    - Understand how to remediate vulnerabilities by providing versions to upgrade to.
    - Track the process of resolving vulnerabilities by adding links to Jira issues and pull requests.
- The **Advisories** tab displays the latest **Common Vulnerabilities and Exposures (CVEs)** covered by Semgrep Supply Chain rules. Use this tab to see all the CVEs that Semgrep Supply Chain can detect and view the code pattern that the Advisory detects. The Advisories tab displays all rules, regardless of whether they support reachability analysis.
- The **Dependencies** tab displays information about your dependencies across all onboarded repositories.
- The **License configuration** tab allows you to explicitly allow or disallow (block) a package's use in your repository based on its license.

## View findings

To view the latest Semgrep Supply Chain findings, click **Supply Chain**. You can view findings individually or grouped by the rule that identified the finding. A specific finding in the code is called a **usage**. Vulnerability entries are sorted as cards by severity from critical to low, then from oldest to newest.

![A single vulnerability entry in Semgrep Supply Chain](/img/sc-vuln-entry.png)
_**Figure**. A single vulnerability entry in Semgrep Supply Chain._

You can also view the findings individually by clicking the drop-down box on the header and clicking **No grouping**.

<FindingsDefaultView product_name="Supply Chain" />

## Filter findings

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

## Export findings

<ExportFindingsCsv />