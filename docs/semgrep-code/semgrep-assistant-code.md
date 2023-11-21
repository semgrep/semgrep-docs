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
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep Assistant for Semgrep Code

Receive GPT-4-powered security recommendations designed to reduce the time spent when reviewing Semgrep Code findings. Semgrep Assistant can leave comments in pull requests (PRs) and Slack notifications. These comments provide recommendations for triage and code remediation, such as assessing if a finding is a true or false positive.

![Screenshot of Semgrep Assistant message in GitHub](/img/semgrep-assistant-github.png)
*Figure*. Semgrep Assistant detecting a false positive.

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

* This feature is available to users of the following source code managers (SCMs):
    * GitHub Cloud
    * GitLab Free
    * GitLab Premium
    * GitLab Ultimate
* Semgrep Assistant does not support GitHub Enterprise Server (self-hosted).

### Semgrep products

* Semgrep Assistant is available for any Semgrep Cloud Platform user. This includes users who are using Semgrep Cloud Platform for **free**.
* Semgrep Assistant is not available on Semgrep CLI.
* Semgrep Assistant works exclusively on Semgrep Code findings.

### Language support

Semgrep Assistant supports all the same languages as Semgrep Code. See [Supported languages](/supported-languages) for more information.

## Privacy and legal considerations

Semgrep gets API permissions to access code on your pre-selected GitHub or GitLab repositories.

* Semgrep Inc. logs and stores the GPT prompts and responses for the sake of performance evaluation, which include source code snippets.
* Semgrep Inc. sends relevant lines of code to OpenAI's API, where currently, the "relevant lines of code" means lines that are part of the Semgrep finding, plus 10 lines of context on each side. Semgrep Inc. is likely to expand this, potentially to the entire file as we learn how to pass more useful context.
* Semgrep Inc stores and retains these code snippets for up to 6 months. Semgrep Inc. will update you with at least a 30-day notice, if we make any changes to the retention policy.
* Semgrep Inc is a paying customer of OpenAI and has a Data Protection Agreement signed with them (provided upon request by contacting [support@semgrep.com](mailto:support@semgrep.com). The code snippets we upload will be persisted by OpenAI temporarily, following their data usage policies at [Open AI API data Usage Policies](https://openai.com/policies/api-data-usage-policies).
* For more details, see the [Semgrep Assistant FAQ](https://get.semgrep.dev/assistant).

## Required GitHub or GitLab repository permissions

Semgrep Assistant requires the same permissions that Semgrep needs to integrate with GitHub or GitLab such as permissions that allow Semgrep to run CI jobs and post comments to PRs or MRs. See [<i class="fa-regular fa-file-lines"></i> Requested permissions for GitHub and GitLab](/semgrep-cloud-platform/getting-started/#requested-permissions-for-github-and-gitlab) for a list of permissions.

Assistant extends normal Semgrep functionality by providing contextually aware AI-generated suggestions. In order to build that context, it requires extra permissions in GitHub and GitLab.

<Tabs
    defaultValue="github"
    values={[
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>

<TabItem value='github'>

Semgrep Assistant requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through installation of a private Semgrep GitHub app that you install during Assistant setup. This private Semgrep GitHub app:

* Is fully under your control so you can revoke access or specific permissions at any time by visiting **Settings > Applications** in GitHub.
* Only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* Can be configured to limit its scope to specific repositories. You do not need to give read access to all repositories in your GitHub organization. 

</TabItem>

<TabItem value='gitlab'>

Semgrep Assistant requires the **API scope** to run in GitLab or self-managed GitLab. This can be specified at either the [project access token level](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) or [personal access token level](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). 

* You can revoke [project level access tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#revoke-a-project-access-token) or [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#revoke-a-personal-access-token) at any time. 
* Semgrep Assistant only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* The token can be configured to limit its scope to specific projects or individuals. You do not need to give read access to all repositories in your GitLab organization).

</TabItem>
</Tabs>

## Enabling Semgrep Assistant

<Tabs
    defaultValue="github"
    values={[
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>

<TabItem value='github'>

:::info Prerequisites
* Semgrep Assistant can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](https://semgrep.dev/login) to set up Semgrep Assistant.
* You have added or onboarded at least one project (repository) to Semgrep Cloud Platform for scanning. See [Starting a SAST and SCA scan on a remote repository](/semgrep-cloud-platform/getting-started/#starting-a-sast-and-sca-scan-on-a-remote-repository).
* You have connected your SCM to ensure that you can receive PR comments from Semgrep. 
    * To connect your SCM, navigate to the the **[<i class="fa-solid fa-gear"></i> Settings page](https://semgrep.dev/orgs/-/settings/)**, click **Source code managers > Connect to GitHub**.
* You have set rules to **Comment** or **Block** mode in your [<i class="fas fa-external-link fa-sm"></i> Policies page](https://semgrep.dev/orgs/-/policies).
:::

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/)**. 
3. In the **Products** section, on the **Assistant** entry, click **Set up**.
![Screenshot of Semgrep Assistant setup button](/img/semgrep-assistant-setup.png#md-width)
4. Approve the Semgrep Assistant terms of service.
5. Provide the GitHub namespace to install Semgrep Assistant to. This is usually your account or organization name.
6. You are redirected to the Semgrep Assistant installation page. The steps are as follows:
    1. You must create a private `semgrep-app` in GitHub if you do not have one already. Click **Create app** under step 3 to do this.
    2. You are redirected to GitHub. Follow the instructions to create a private `semgrep-app`.
    3. You are redirected back to Semgrep Cloud Platform. Click **Install**.
7. You are redirected to the **Settings** page. In the **Code** section, Click **Auto-triage with Semgrep Assistant** <i class="fa-solid fa-toggle-large-on"></i>.
    ![Screenshot of Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)
8. Click <i class="fa-solid fa-square-check"></i> **PR/MR Comments** to receive comments.
9. Click <i class="fa-solid fa-square-check"></i> **Slack notifications** to receive Slack notifications.

Semgrep Assistant is now enabled and appears in future PRs. 
</TabItem>

<TabItem value='gitlab'>

:::info Prerequisites
* Semgrep Assistant can only be enabled through Semgrep Cloud Platform (SCP). [<i class="fas fa-external-link fa-xs"></i> Create an account](https://semgrep.dev/login) to set up Semgrep Assistant.
* You have added or onboarded at least one project (repository) to Semgrep Cloud Platform for scanning. See [Starting a SAST and SCA scan on a remote repository](/semgrep-cloud-platform/getting-started/#starting-a-sast-and-sca-scan-on-a-remote-repository).
* You have successfully set up your GitLab repository to receive MR comments from Semgrep.
    * To set up MR comments, perform the steps in [GitLab MR comments documentation](/semgrep-cloud-platform/gitlab-mr-comments). 
* You have set rules to **Comment** or **Block** mode in your [<i class="fas fa-external-link fa-sm"></i> Policies page](https://semgrep.dev/orgs/-/policies).
:::

1. Sign in to [Semgrep Cloud Platform <i class="fas fa-external-link fa-xs"></i>](https://semgrep.dev/login) using your GitLab account.
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/)**. 
3. In the **Products** section, on the **Assistant** entry, click the **toggle <i class="fa-solid fa-toggle-large-on"></i>**.
![Screenshot of Semgrep Assistant setup button](/img/semgrep-assistant-gl-setup.png#md-width)
4. Click **Accept & enable Assistant** to accept the Semgrep Assistant terms of service.
5. In the **Code** section, Click **Auto-triage with Semgrep Assistant** <i class="fa-solid fa-toggle-large-on"></i>.
    ![Screenshot of Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)
8. Click <i class="fa-solid fa-square-check"></i> **PR/MR Comments** to receive comments.
9. Click <i class="fa-solid fa-square-check"></i> **Slack notifications** to receive Slack notifications.

You have successfully enabled Semgrep Assistant for cloud-hosted GitLab plans.
![MR comment from Semgrep Assistant in GitLab](/img/assistant-gl-comment.png#md-width)
*Figure*. MR comment from Semgrep Assistant in GitLab.

</TabItem>
</Tabs>

![Screenshot of Semgrep Assistant in a Slack notification](/img/semgrep-assistant-slack.png)
*Figure*. Semgrep Assistant in a Slack notification.

To further customize Semgrep Assistant, see:

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
*Figure*. Semgrep Assistant generating a potential fix.

<MoreHelp />
