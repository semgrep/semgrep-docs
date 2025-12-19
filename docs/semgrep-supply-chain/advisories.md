---
slug: advisories
append_help_link: true
title: Advisories
hide_title: true
description: "View the advisories related to your organization and search for relevant findings."
tags:
  - Semgrep Supply Chain
  - Semgrep AppSec Platform
---

# View advisories and search for related findings

:::info Prerequisite
At least one project (a repository or subfolder in a monorepo) that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

The **Advisories** page allows you to view the vulnerability announcements relevant to your Semgrep organization. These are typically, but not always, associated with a [Common Vulnerabilities and Exposures (CVE)](https://www.cve.org/) number. This page also allows you to identify all of the findings related to a given advisory.

## View advisories

To see the advisories relevant to your Semgrep organization:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to [**Rules & Policies > Advisories**](https://semgrep.dev/orgs/-/advisories).

You can use the filters available to narrow down the results displayed:

| Filter | Description |
| - | - |
| Advisory | The title of the advisory or its associated CVE. |
| Language | The language for which the advisory is applicable. |
| Severity | The severity of the findings relevant to the advisory. |
| Analysis type | The reachability type of the findings relevant to the advisory. |

### Advisory details

For each advisory listed, you can click the entry to view additional details, including:

- A description
- Reference links
- The rule Semgrep uses to match your code
- Affected projects

Semgrep displays the number of relevant findings on each of the project's branches for each of the advisory's **affected projects**. Clicking the displayed number takes you to the **Findings** page, where you can see in-depth information about each issue.