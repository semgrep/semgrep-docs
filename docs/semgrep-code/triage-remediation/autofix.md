---
title: Autofix (beta)
description: Use Semgrep Autofix to automatically generate a fix PR for Semgrep Code findings.
tags:
  - Semgrep Code
  - Semgrep AppSec Platform
---

import GithubAppReadWritePermissions from "/src/components/procedure/_github-app-read-write-permissions.mdx"

# Autofix for Semgrep Code (beta)

Semgrep’s Autofix feature uses AI to generate proposed code changes for Semgrep Code findings. 

Autofix creates a GitHub branch, applies the changes, and opens a draft pull request (PR). You remain in full control over reviewing and merging the PR.

:::info
Autofix is different from [Rule-defined fix](/writing-rules/rule-defined-fix) and [Semgrep Multimodal's Suggested fix](/docs/semgrep-multimodal/overview#suggested-fix). These are separate features with different behaviors and use cases.
:::

## Prerequisites

:::note
Autofix is available only for GitHub Cloud repositories.
:::

To use Autofix, you must meet the following requirements:

* [Enable Semgrep Multimodal](/semgrep-multimodal/getting-started).  
* Accept AWS Bedrock or Anthropic's Claude models.  
  * During beta, Semgrep Code does not respect AI model selection.
* Have at least one GitHub Cloud repository with new or existing Semgrep Code findings.  
* Ensure the Semgrep private GitHub App is installed.
  - The app is installed when you [add GitHub repositories to Semgrep Managed Scans](/deployment/managed-scanning/github#permissions).
  - Verify that the app is connected by navigating to **[Semgrep AppSec Platform > Settings > Source code managers](https://semgrep.dev/orgs/-/settings/source-code)**.
* Ensure that your GitHub App has `Contents: Read and write` permissions configured.
  - Note that the `Contents: Read and write` repository permission is separate from the permissions shown on the GitHub App overview page. You must explicitly set **%%Repository|repository%% permissions > Contents** under **Developer Settings > GitHub Apps**. This setting is **not** enabled automatically by the other read/write permissions listed for the app.

<GithubAppReadWritePermissions />


## Use Autofix

1. Log in to [Semgrep AppSec Platform](https://semgrep.dev/orgs/-)
1. Click **Code** to view all SAST findings.
1. Identify the finding you want to Autofix and click the hyperlink on the card to navigate to the finding’s **Details** page.
1. From the **Fix** drop-down, select **Open Autofix PR**.
1. You will see the following message:
> Starting to generate Autofix PR. Semgrep is generating an Autofix PR for this finding. A new notification will appear here when the PR is ready.  
1. In **2 to 10 minutes**, Semgrep generates a proposed fix and opens a draft PR in GitHub.  
  * This action is recorded in the **Activity** section at the bottom of the finding’s **Details** page.  
1. Click **View Autofix PR** in the **FIX DETAILS** section to review the newly created PR in GitHub.

### PR details

* The pull request is opened as a **draft**.  
* Semgrep provides an AI-generated description of the changes in the pull request.  
* The pull request is authored by the **Semgrep GitHub App**.  
* If your GitHub account is connected to Semgrep, you are automatically **mentioned** in the pull request.

### Findings with open PRs on Semgrep AppSec Platform

You can filter for findings with Autofix PRs directly from the **Code** page in Semgrep AppSec Platform. Click the **To fix** drop-down and select **To fix** to do so. 

This filter shows findings that have Autofix PRs. It may also include findings that were manually marked as **To fix**.


## Disable Autofix

If you use Semgrep Multimodal, Autofix is enabled by default. To adjust settings:
1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login)
2. Navigate to **Settings > General > Code**
3. Set the Autofix toggle to enabled or disabled

## How Autofix PRs are generated

Autofix generates a proposed change specifically for the PR workflow. This process uses the detected pattern and surrounding code context to produce the fix. 

### Use of remediation guidance

Autofix PRs are generated independently of Semgrep Multimodal's Suggested fixes. When Multimodal remediation guidance exists for a finding, the descriptive guidance is used to generate the code changes included in the PR.

Because the code changes displayed on findings and PRs are generated separately, the exact changes in an Autofix PR may differ from Multimodal's suggested fix displayed on the finding.

### How memories affect PR generation

At this time, Semgrep Memories do not directly influence Autofix PR generation.

Memories may affect PRs indirectly through remediation guidance. If general remediation guidance has been generated and includes information derived from memories, that guidance is passed into the PR generation process. However, memories themselves are not currently sent as direct input when generating the PR.




