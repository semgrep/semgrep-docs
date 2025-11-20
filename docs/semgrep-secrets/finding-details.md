---
slug: finding-details
title: View finding details
description: "The finding's details page allows users to view in-depth information for findings identified by Semgrep Secrets."
hide_title: true
tags:
    - Semgrep Secrets
    - Semgrep AppSec Platform
---

# View findings' details

The finding's details page displays in-depth information about the finding, including:

- A detailed description of the finding
- Rule details, including the rule pattern itself
- Finding details, such as whether the secret has been confirmed to be valid, when the finding was identified, the project and branch name, and commit ID where the issue was introduced
- The code snippet where the issue was identified, along with a link to the source code where Semgrep identified the issue
- The validator used to test whether the credential can be used
- Activity history for the finding, including status changes to the finding, notes written by other Semgrep users specifically about this finding, and more

## View a finding's details

1. Log in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. In the **Navigation bar**, click **[Secrets](https://semgrep.dev/orgs/-/secrets)**.
3. Identify the finding whose details you want to view:
   - If the default **Group by Rule** is enabled, click the <i class="fa-regular fa-window-restore"></i> **Details** icon on the card of the finding.
   - If the **No grouping** view is enabled, click the **header hyperlink** on the card of the finding.

## Available actions on the finding details' page

Click on the **kebab** icon to see the menu that includes the following options:

- **Mark as reviewing** to change its status to **Reviewing** and flag the finding as one that is under further manual review 
- **Copy file path** of the source code where Semgrep identified the issue
- **Copy link** to the finding's details page

### Ignore the finding

Click **Ignore...** to ignore the finding. Provide an **Ignore reason**, and add **Comments** on why you think that this finding should be ignored.

If the file for the finding in question is a test file or something similar, you can choose the **Ignore files in future scans...** option, then select the file. Semgrep ignores the file in subsequent scans.

Click **Ignore** to proceed.

### Fix the finding

Click **Fix** see the menu that includes the following options:

- View the associated Jira ticket, if available
- Open a PR that fixes the issue, if possible
- Change the status of the issue as **To fix**, indicating that you plan to return to the finding in the future

Note that Semgrep automatically marks findings as fixed when they're no longer detected in subsequent scans.

### Add notes to findings

To **add notes** to the activity history of a finding:

1. Select a finding where you want to view details or add notes, and then do one of the following actions:
   - If the default **Group by Rule** is enabled, click <i class="fa-regular fa-window-restore"></i> **Details** icon on the card of the finding.
   - If **No grouping** view is enabled, click the **header hyperlink** on the card of the finding. In the example screenshot below, the link is labeled **detected-generic-api-key**.
2. Go to the **Activity** section, then click **New note**.
