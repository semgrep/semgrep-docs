---
slug: getting-started
title: Analyze with Assistant
hide_title: true
description: Learn how to enable and use all of Assistant's features.
tags:
  - Deployment
  - Semgrep Assistant
---

# Enable and use Semgrep Assistant

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article walks you through enabling Semgrep Assistant for your deployment and using its features.

:::info Prerequisites
* You have completed a [Semgrep core deployment](/deployment/core-deployment).
* You have set rules to **Comment** or **Block** mode in your [<i class="fas fa-external-link fa-sm"></i> Policies page](https://semgrep.dev/orgs/-/policies).
:::

<Tabs
    defaultValue="github"
    values={[
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>

<TabItem value='github'>

Semgrep Assistant extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitHub permissions in addition to the
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Assistant requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through a private Semgrep GitHub app that you install during Assistant setup. This private Semgrep GitHub app:

* Is fully under your control so you can revoke access or specific permissions at any time by visiting **Settings > Applications** in GitHub.
* Only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* Can be configured to limit its scope to specific repositories. You do not need to give read access to all repositories in your GitHub organization.

## Enable Assistant

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/)**.
3. In the **Assistant** section, click the **<i class="fa-solid fa-gear"></i> Allow code snippets in AI prompts** toggle.
![Semgrep Assistant setup button](/img/semgrep-assistant-setup.png#md-width)
   This launches the **Set up Semgrep Assistant** prompt.
1. Select a source code manager (SCM) by clicking **github.com**.
2. Semgrep provides you with information on why Assistant requires access to your source code. Click **Accept & Enable Assistant** to proceed.
3. You are redirected to the page where you can add a GitHub Private App that grants Semgrep read access to your code.
   1. Enter your GitHub information. Select whether you're installing the app on an **organization** or **Personal Account**, and provide its name.
   2. Click **Review permissions** to see the permissions requested by Semgrep.
   3. Click **Register GitHub App** to proceed.
   4. When prompted, click **Continue** to allow redirection to GitHub to finalize app creation. Follow the instructions to finish creating and installing a private `semgrep-app`.
4. You are redirected to Semgrep AppSec Platform's **Source Code Managers** page. Navigate back to the **Deployment** page. Under the **Assistant** section, verify that all of the features are enabled:
   1. **Allow code snippets in AI prompts**: Required for Semgrep to auto-triage findings, provide AI remediation guidance, and tag findings with code context.
   2. **Autofix suggestions for Code**: Enable autofix suggestions in comments from Assistant. You can also set the minimum confidence level for Assistant-written fixes if the Semgrep rule doesn't include a human-written autofix.
   3. **Auto-triage for Code**: Enable notifications whenever Assistant suggests that a finding may be safe to ignore. You can include notifications in your PR and MR comments, or you can receive them through Slack notifications.
    ![Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)

</TabItem>

<TabItem value='gitlab'>

Semgrep Assistant extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitLab permissions in addition to the
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Assistant requires the **API scope** to run in both GitLab SaaS and GitLab self-managed instances. This can be specified at either the [project access token level](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) or [personal access token level](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

* You can revoke [project access tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#revoke-a-project-access-token) or [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#revoke-a-personal-access-token) at any time.
* Semgrep Assistant only accesses source code repositories (projects) on a file-by-file basis; it does not need or request org-level access to your codebase.
* The token can be configured to limit its scope to specific projects or individuals. You do not need to give read access to all projects in your GitLab organization.

<h2>Enable Assistant</h2>

1. Sign in to [Semgrep AppSec Platform <i class="fas fa-external-link fa-xs"></i>](https://semgrep.dev/login) using your GitLab account.
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/)**.
3. In the **Assistant** section, click the **<i class="fa-solid fa-gear"></i> Allow code snippets in AI prompts** toggle.
![Semgrep Assistant setup button](/img/semgrep-assistant-setup.png#md-width)
   This launches the **Set up Semgrep Assistant** prompt.
1. Follow the on-screen instructions to complete the setup process.
2. Navigate back to the **Deployment** page. Under the **Assistant** section, verify that all of the features are enabled:
   1. **Allow code snippets in AI prompts**: Required for Semgrep to auto-triage findings, provide AI remediation guidance, and tag findings with code context.
   2. **Autofix suggestions for Code**: Enable autofix suggestions in comments from Assistant. You can also set the minimum confidence level for Assistant-written fixes if the Semgrep rule doesn't include a human-written autofix.
   3. **Auto-triage for Code**: Enable notifications whenever Assistant suggests that a finding may be safe to ignore. You can include notifications in your PR and MR comments, or you can receive them through Slack notifications.
   4. **Weekly priority emails**: Get weekly emails with information on your top backlog tasks according to Assistant. Semgrep sends these emails to organization admins every Monday.
    ![Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)

</TabItem>
</Tabs>

### Enable autofix suggestions

Autofix allows you to receive code snippets to remediate true positives. Perform the following to enable it:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Autofix suggestions for Code** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. *Optional*: Select a **confidence level** in the drop-down box. This value determines the level of quality at which the autofix code appears as a suggestion. A lower confidence level means that Semgrep Assistant displays the autofix suggestion even when the code quality may be incorrect.
    :::tip
    Semgrep recommends setting a low confidence level since even incorrect suggestions may be useful starting points for triage and remediation.
    :::

### Enable auto-triage

If [auto-triage](/semgrep-assistant/overview/#auto-triage), which allows you to get notifications whenever Assistant indicates a finding may be safe to ignore, isn't enabled for your deployment, you can do so as follows:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Auto-triage for Code** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Select whether you want alerts included in your **PR/MR comments** and **Slack notifications**.

![MR comment from Semgrep Assistant in GitLab](/img/assistant-gl-comment.png#md-width)
*Figure*. MR comment from Semgrep Assistant in GitLab.

#### Missing PR and comments
Semgrep Assistant messages only appear in your PR comments for rules that are set to Comment or Block mode on the Rule Management page. Ensure that:

* You have set rules to Comment or Block mode.
  ![ Policies modes](/img/semgrep-assistant-comment.png)
* You have selected PR/MR comments in **Semgrep AppSec Platform > Settings > Deployment** in the **Code** section.

### Enable priority inbox

If [priority inbox](/semgrep-assistant/overview/#priority-inbox), which allows organization admins to receive information on top backlog tasks according to Assistant, isn't enabled for your deployment, you can do so as follows:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Weekly priority emails** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.

## Analyze findings

Once you've enabled Assistant, you can use the **Analyze** button on the [Findings page](/semgrep-code/findings) to trigger all Assistant functions, including autofix, auto-triage, and component tagging, on existing findings.

![Assistant Analyze button on Findings page](/img/scp-assistant.png#md-width)

To analyze your findings with Assistant:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, select the findings that you want Assistant to analyze.
2. Click **Analyze**.
3. In the confirmation window that appears, confirm that you want to analyze your findings with Assistant.

After Assistant performs these functions, you can see your results on the **Findings** page using the **Recommendation** or **Component** filters. When viewing your findings, you can see false positive and true positive recommendations when viewing the finding details pages if you choose **No Grouping** instead of **Group by Rule**.

The amount of time required to analyze your findings varies, but the UI displays a notification that provides an estimated wait time.

:::info
There is a cap of 250 Assistant runs per month using the **Analyze** button. Assistant runs against pull requests and merge requests do not count against this limit.
:::

## View recommendations

You can [view all of Semgrep Assistant's recommendations](/semgrep-code/findings/#filter-findings) by going to the Semgrep **Findings** page and filtering by **Recommendation** or **Component**.

## Write custom rules (beta)

Semgrep Assistant can help you write custom rules to find issues specific to your codebase.

To do so:

1. Sign in to Semgrep AppSec Platform.
2. Navigate to **Rules > Editor**.
3. Click the **plus** button, and under **Generate with AI**, click **...with Semgrep Assistant**.
   ![The plus button to open up the custom rules editor](/img/assistant-launch-rules-editor.png#md-width)
4. In the **Generate rule with Semgrep Assistant** pop-up window:
   1. Select the language of your codebase.
   2. Provide a prompt describing what you want the rule to do in English.
   3. Optional: provide an example of bad code.
   4. Optional: provide an example of good code.
   ![Custom rule sample plus test window](/img/assistant-write-custom-rule.png#md-width)
5. Click **Generate** to proceed. You'll be redirected to a screen where you can view and copy your rule and test it against the sample bad code snippet you provided.
   ![Dialog box for custom rule parameters](/img/assistant-view-rule.png#md-width)
