---
title: Autofix
description: Use Semgrep Autofix to automatically generate a fix PR for Semgrep Code findings.
tags:
  - Semgrep Code
  - Semgrep AppSec Platform
---

import GithubAppReadWritePermissions from "/src/components/procedure/_github-app-read-write-permissions.mdx"

# Autofix for Semgrep Code (beta)

Semgrep’s Autofix feature uses AI to automatically generate proposed code changes for Semgrep Code findings. 

Autofix creates a GitHub branch, applies the changes, and opens a draft pull request (PR). You remain in full control over reviewing and merging the PR.

## Prerequisites

To use Autofix, you must meet the following requirements:

* Have at least one GitHub Cloud repository with new or existing Semgrep Code findings.  
* Enable Semgrep Assistant.  
* Install the Semgrep private GitHub App, with `Contents: Read and write` permissions configured. See the [GitHub Permissions section](/docs/semgrep-code/triage-remediation/autofix#grant-read-and-write-access-to-a-private-github-semgrep-app) below.  
* Accept AWS Bedrock/Claude (Anthropic) models.  
  * During beta, Semgrep Code does not respect AI model selection.

## Enable or disable Autofix
If you use Semgrep Assistant, Autofix is enabled by default. To adjust settings:
1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login)
2. Navigate to **Settings > General > Code**
3. Set the Autofix toggle to enabled or disabled

## Quickstart

* Navigate to the finding’s **Details** page.  
* From the **Fix** drop-down, select **Open Autofix PR**.  
* Semgrep generates a proposed fix and opens a draft PR in GitHub.  
  * This action is recorded in the **Activity** section at the bottom of the finding’s Details page.  
  * PR creation can take **2–10 minutes**, depending on the size of the change.  
* Click **View Autofix PR** in the **FIX DETAILS** section to review the newly created PR.

### PR details

* The pull request is opened as a **draft**.  
* Semgrep provides an AI generated description commit message for the changes in the PR.  
* The pull request is created and requested by the **Semgrep GitHub App**.  
* ==If your GitHub account is connected to Semgrep, you are automatically **mentioned** in the pull request==.

### Findings with open PRs on Semgrep AppSec Platform

You can filter for findings with Autofix PRs directly from the **Code** page in Semgrep AppSec Platform. Click the **To fix** drop-down and select **To fix**.


## Grant **Read and write** access to a private GitHub Semgrep app
<GithubAppReadWritePermissions />

## How Autofix PRs are generated

Autofix generates a proposed change specifically for the PR workflow. This process uses the detected pattern and surrounding code context to produce the fix. 

### Use of remediation guidance

Autofix PRs are generated independently of Semgrep Assistant's Suggested fixes. When Assistant remediation guidance exists for a finding, the descriptive guidance is used to generate the code changes included in the PR.

Because the code changes displayed on findings and PRs are generated separately, the exact changes in an Autofix PR may differ from Assistant's suggested fix displayed on the finding.

### How memories affect PR generation
At this time, Semgrep Assistant memories do not directly influence Autofix PR generation.

Memories may affect PRs indirectly through remediation guidance. If general remediation guidance has been generated and includes information derived from memories, that guidance is passed into the PR generation process. However, memories themselves are not currently sent as direct input when generating the PR.

Support for deeper use of memories in PR generation is planned for future iterations.



## Autofix vs other fixes

Autofix is separate from [Rule-defined fix](/writing-rules/autofix) and Semgrep Assistant's Suggested fix.
