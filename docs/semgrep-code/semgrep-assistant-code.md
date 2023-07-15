---
slug: semgrep-assistant-code
append_help_link: true
title: Semgrep Assistant 
hide_title: true
description: Enable Semgrep Assistant (beta) in your PR comments to provide tips for triage and remediation of Semgrep findings. 
tags:
  - Semgrep Code
---

import MoreHelp from "/src/components/MoreHelp"

# Semgrep Assistant for Semgrep Code

Receive GPT-4-powered security recommendations designed to reduce the time spent when reviewing Semgrep Code findings. Semgrep Assistant can leave comments in pull requests (PRs) and Slack notifications. These comments provide recommendations for triage and code remediation, such as assessing if a finding is a true or false positive.

![Screenshot of Semgrep Assistant message in GitHub](/img/semgrep-assistant-github.png)
*Figure 1*. Semgrep Assistant detecting a false positive.

This document provides an overview of the following:

* Feature availability, support, and maturity
* Privacy and legal aspects
* How to enable Semgrep Assistant
* How to receive notifications or comments from Semgrep Assistant

:::info Feature maturity 
* This feature is in **public beta**.
* You or your developers may encounter rough edges. This includes inaccurate recommendations or broken text. Please leave feedback on the PR comments from Semgrep Assistant to help the Semgrep team improve Semgrep Assistant.
::: 

## Feature support and availability

### Source code management

* This feature is available only to users of GitHub Cloud. Semgrep Assistant does not support GitHub Enterprise Server (self-hosted).

### Semgrep products

* Semgrep Assistant is available for any Semgrep Cloud Platform user. This includes users who are using Semgrep Cloud Platform for **free**.
* Semgrep Assistant is not available on Semgrep CLI.
* Semgrep Assistant works exclusively on Semgrep Code findings.

### Language support

Semgrep Assistant supports all the same languages as Semgrep Code. See [Supported languages](/supported-languages) for more information.

## Privacy and legal considerations

Semgrep gets API permissions to access code on your pre-selected GitHub repositories.

* Semgrep Inc. logs and stores the GPT prompts and responses for the sake of performance evaluation, which include source code snippets.
* Semgrep Inc. sends relevant lines of code to OpenAI's API, where currently, the "relevant lines of code" means lines that are part of the Semgrep finding, plus 10 lines of context on each side. Semgrep Inc. is likely to expand this, potentially to the entire file as we learn how to pass more useful context.
* Semgrep Inc stores and retains these code snippets for up to 6 months. Semgrep Inc. will update you with at least a 30-day notice, if we make any changes to the retention policy.
* Semgrep Inc is a paying customer of OpenAI and has a Data Protection Agreement signed with them (provided upon request by contacting [support@semgrep.com](mailto:support@semgrep.com). The code snippets we upload will be persisted by OpenAI temporarily, following their data usage policies at [Open AI API data Usage Policies](https://openai.com/policies/api-data-usage-policies).
* For more details, see the [Semgrep Assistant FAQ](https://get.semgrep.dev/assistant).

## Enabling Semgrep Assistant

:::info Prerequisites
* Semgrep Assistant can only be enabled through Semgrep Cloud Platform (SCP). Create an account to set up Semgrep Assistant.
* To receive PR comments and Slack notifications, ensure that you have accomplished the following:
    * You have added or onboarded a project (repository) to Semgrep Cloud Platform for scanning.
    * Ensure that you have set rules to **Comment** or **Block** mode in [Policies](/semgrep-code/policies).
:::

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Settings](https://semgrep.dev/orgs/-/settings/)**. 
3. In the **Products** section, on the **Assistant** entry, click **Set up**.
![Screenshot of Semgrep Assistant setup button](/img/semgrep-assistant-setup.png#md-width)
4. Approve the Semgrep Assistant terms of service.
5. Provide the GitHub namespace to install Semgrep Assistant to. This is usually your account or organization name.
6. You are redirected to the Semgrep Assistant installation page. The steps are as follows:
    1. You must create a private `semgrep-app` in GitHub if you do not have one already. Click **Create app** under step 3 to do this.
    2. You are redirected to GitHub. Follow the instructions to create a private `semgrep-app`.
    3. You are redirected back to Semgrep Cloud Platform. Click **Install**.
7. In the **Code** section, Click **Auto-triage with Semgrep Assistant** <i class="fa-solid fa-toggle-large-on"></i>.
    ![Screenshot of Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)
8. Check <i class="fa-solid fa-square-check"></i> **PR/MR Comments** to receive comments.
9. Check <i class="fa-solid fa-square-check"></i> **Slack notifications** to receive Slack notifications.

![Screenshot of Semgrep Assistant in a Slack notification](/img/semgrep-assistant-slack.png)
*Figure 2*. Screenshot of Semgrep Assistant in a Slack notification.

Semgrep Assistant is now enabled and appears in future PRs. To further customize Semgrep Assistant, see:

* [Suggesting autofix code snippets to resolve the finding](#suggesting-autofix-code-snippets-to-resolve-the-finding)

:::caution Not receiving PR comments?
Semgrep Assistant messages only appear in your PR comments for rules that are set to Comment or Block mode in the Rule Management page. Ensure the following:

* Ensure that you have set rules to Comment or Block mode.
    ![Screenshot of Policies modes](/img/semgrep-assistant-comment.png)
* Ensure that you have selected PR/MR comments in **Semgrep Cloud Platform > Settings > Deployment** in the **Code** section.
:::

## Types of recommendations from Semgrep Assistant

The following are recommendations users can receive from Semgrep Assistant.

### Analyzing if a finding is a true or false positive

Semgrep Assistant can analyze if your finding is a true or false positive. The accuracy of its recommendations is roughly 60% and varies based on the language and framework you are using. This is its default use-case.

### Suggesting autofix code snippets to resolve the finding

Semgrep Assistant can suggest [autofix](/writing-rules/autofix/) code snippets for Semgrep rules which do not have human-written autofix suggestions.

To enable autofix by Semgrep Assistant, perform the following steps:

1. While logged-in to Semgrep Cloud Platform, click **Settings > Deployment**.
2. In the Code section, click Autofix <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Click <i class="fa-solid fa-square-check"></i> **Also include Assistant-written autofixes**.
4. Optional: Select the **confidence level** on the drop-down box. The value determines at what level of quality autofix code appears as suggestions. A lower confidence level means that Semgrep Assistant displays the autofix suggestion even when the code quality may be incorrect.

:::tip
A low confidence level is recommended as even incorrect suggestions may be useful starting points.
:::

![ Screenshot of Semgrep Assistant generating a potential fix](/img/semgrep-assistant-autofix.png)
*Figure 3*. Screenshot of Semgrep Assistant generating a potential fix.

<MoreHelp />
