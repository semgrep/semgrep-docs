---
slug: details-page
title: Details page v2
hide_title: true
description: Each finding in Semgrep has its own details page which provides you with the information and tools to analyze and triage the finding.
tags:
  - Semgrep AppSec Platform
---

# Details page for findings v2

:::info
This document describes the **details page v2**, a feature which is in **private beta**. This feature supercedes the current findings details page, hereafter referred to as v1.

Refer to this document to understand changes between the two versions. 
:::

Each finding in Semgrep has its own details page, which provides the following information:

- tk

## Differences between the v1 and v2 details page

### Added to v2

- **Alert boxes** now appear at the top of the page. If a finding is reachable, or if Semgrep Assistant thinks a finding is false positive, or if a secret finding is validated, Semgrep immediately places this information at the top of the page.
- An **Analyze** button provides you with the option to generate an Assistant fix if one doesn't exist.
- The following fields have been added to **Rule details**:
    - 

### Changed or moved

- Various elements have been moved.
    - **Rule details** are now at the right-side column and provide additional information, such as the **CWE or CVE**.
    - **Finding details** are now at the right-side column. 
    - The **Activity** panel, which tracks all actions the finding has undergone, has been moved to the bottom of the page.
- **References**, situated below the description, are now collapsible.
- **Your code** and **Data flow** panels are now visible side-by-side. These were previously separate tabs.
- The code committer's **name** has been moved to the code snippets panel. 
- Semgrep Assistant's component tags have been moved to the **Finding details** panel.

### Removed from v2

- Rule pattern information. Previously, the **Pattern** tab in the code snippets panel provided the full rule pattern.
- Rule metadata as a YAML snippet. Certain metadata fields, such as its `cwe` and `owasp` categories have been added to the **Rule details** panel.
- **Branches**. 
