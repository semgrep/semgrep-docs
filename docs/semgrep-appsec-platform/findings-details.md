---
displayed_sidebar: scanSidebar
slug: details-page
title: Details page v2
hide_title: true
description: Each finding in Semgrep has its own details page which provides you with the information and tools to analyze and triage the finding.
tags:
  - Semgrep AppSec Platform
---

# Details page for findings v2

:::info
This document describes the **findings details page v2**, a feature which is in **private beta**. This feature supercedes the current findings details page, hereafter referred to as v1.

Refer to this document to understand changes between the two versions. 
:::

Analyze and triage complex findings by reviewing the finding's specific details page, which contains the following information:

- Critical data about the finding's severity that may affect triage actions and remediation. This includes its reachability if it is a Supply Chain finding, or if it is a validated secret for Semgrep Secrets findings.
- Any activity performed on the finding: when it was opened, triaged, reopened, or fixed as well as the user responsible for the activity.
- Information about the vulnerability detected by the finding, such as its OWASP category, CWE or CVE, or severity.
- Details about the relevant lines of code, including data flow traces.

## Differences between the v1 and v2 details pages

### Added to v2

- **Alert boxes** now appear at the top of the page. If a finding is reachable, if Semgrep Assistant thinks a finding is false positive, or if a secret finding is validated, Semgrep immediately places this information at the top of the page.
- An **Analyze** button provides you with the option to generate an Assistant fix if one doesn't exist.
- The following fields have been added to **Rule details**:
    - CWE or CVE
    - OWASP categories

### Changed or moved

- The details page has been unified for all Semgrep products.
- Various elements have been moved.
    - **Rule details** are now at the right-side column and provide additional information, such as the **CWE or CVE**.
    - **Finding details** are now at the right-side column. 
    - The **Activity** panel, which tracks all actions the finding has undergone, has been moved to the bottom of the page.
- **References**, situated below the description, are now collapsible.
- **Your code** and **Data flow** panels are now combined. These were previously separate tabs.
- The code committer's **name** has been moved to the commit hash. 
- Semgrep Assistant's component tags have been moved to the **Finding details** panel.
- **Branch or ref** information is now visible in **Findings details**.

![Findings details page v1](/img/findings-details-v1.png)
_**Figure**. Findings details page v1 (old)._
![Findings details page v2](/img/findings-details-v2.png)
_**Figure**. Findings details page v2 (new)._

<dl>
<dt>A - Alert boxes display critical triage information.</dt>
<dd></dd>
<dt>B - Rule details and finding details </dt>
<dd>These details are now presented at the right sidebar and provide additional metadata.</dd>
<dt>C - Your code and dataflow panels</dt>
<dd>The relevant lines of code of the match and the dataflow graph are now presented side-by-side. The rule pattern tab has been removed and Rule metadata is presented as part of the rule or finding details rather than as a YAML snippet.</dd>
<dt>D - Assistant generated fix</dt>
<dd>Generate and view a Semgrep Assistant fix. You can also customize the fix provided by the Assistant.</dd>
<dt>E - Activity</dt>
<dd>All triage activity pertaining to the finding.</dd>
</dl>


### Removed from v2

- Rule pattern information. Previously, the **Pattern** tab in the code snippets panel provided the full rule pattern.
- Rule metadata as a YAML snippet. Certain metadata fields, such as its `cwe` and `owasp` categories have been added to the **Rule details** panel.
