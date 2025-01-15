---
slug: getting-started
title: Enable and customize
hide_title: true
description: Learn how to enable and configure Assistant's features.
tags:
  - Deployment
  - Semgrep Assistant
---

# Enable and customize Semgrep Assistant

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
   2. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   3. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   4. **Remediation**: Enable Assistant-generated autofix suggestions in comments from Assistant. You can also set the minimum confidence level for Assistant-written fixes if the Semgrep rule doesn't include a human-written autofix.

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
   2. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   3. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   4. **Remediation**: Enable Assistant-generated autofix suggestions in comments from Assistant. You can also set the minimum confidence level for Assistant-written fixes if the Semgrep rule doesn't include a human-written autofix.

</TabItem>
</Tabs>

### Enable remediation

Assistant remediation allows you to receive AI-generated code snippets for true positives. Perform the following to enable it:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Remediation** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
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
  ![ Policies modes](/img/semgrep-assistant-comment.png#md-width)
* You have selected PR/MR comments in **Semgrep AppSec Platform > Settings > Deployment** in the **Code** section.

### Enable noise filtering

Assistant is [over 95% accurate in categorizing Semgrep Code findings as false positives](/semgrep-assistant/assistant-metrics.md), so you can minimize the number of findings shown by enabling **Noise filter for Code PR/MR comments**. To do so:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Noise filter for Code PR/MR comments** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Select whether you want to enable PR or MR comments:
   1. **Don’t leave a PR/MR comment**: Hide Semgrep’s comments on findings that are likely to be false positives. These findings are available for security review on the [**Code > Pre-production backlog** page](https://semgrep.dev/orgs/-/findings?tab=open&last_opened=All+time&backlog=preprod). Comments still appear for rules in [**Block** mode](/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes).
   2. **Include a notification in the PR/MR comment**: Show developers likely false positive findings in PR/MR comments, but include a note explaining why Assistant thinks the finding may be safe to ignore.

Findings filtered out by Assistant can be reviewed at any time in Semgrep by going to the [**Code > Pre-production backlog** page](https://semgrep.dev/orgs/-/findings?tab=open&last_opened=All+time&backlog=preprod). Semgrep also allows you to agree with the filtering to close the finding or disagree to reopen.

### Enable weekly priority emails

If [weekly priority emails](/semgrep-assistant/overview/#weekly-priority-emails), which allows organization admins to receive information on top backlog tasks according to Assistant, isn't enabled for your deployment, you can do so as follows:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Weekly priority emails** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.

## Add Memories (beta)

Assistant Memories allows admins to tailor Assistant's remediation guidance to their organization's standards and defaults on a per-project, per-rule basis. You can provide feedback by adding custom instructions whenever Assistant gives a suggested fix.

Memories are enabled by default for all organizations with Assistant enabled.

### Add memory based on Assistant's suggested fix

To add a memory modifying a suggested fix presented by Assistant:

1. Identify the specific instance of **Assistant's suggested fix** that you want to modify. These can be found on the finding details page or in the PR or MR comment.
2. Click **Customize fix** to open an input box, and enter your preferred remediation approaches and secure defaults for the project. Your suggestion can be as general as "Use AWS Secrets Manager to manage secrets."
   ![Assistant’s suggested fix for a hardcoded secret in the user’s code](/img/memories-3.png#md-width)
   ***Figure***. Assistant’s suggested fix for a hardcoded secret in the user’s code.
3. Click **Save and regenerate**.
   ![User-provided custom instruction that Assistant uses to improve future guidance.](/img/memories-2.png#md-width)
   ***Figure***. User-provided custom instruction that Assistant uses to improve future guidance.
4. Assistant regenerates the suggested fix to reflect the instructions you provided.
   ![Regenerated Assistant fix using the user-provided instructions.](/img/memories-1.png#md-width)
   ***Figure***. Regenerated Assistant fix using the user-provided instructions.

While Assistant Memories is in **public beta**, memories are scoped to remediation guidance on a per-project and per-rule basis. A saved memory only affects future guidance for findings triggered by the same rule in the same project.

### Add memory during triage

If you identify findings that are safe to ignore and write triage notes indicating why this is so, Assistant can store this information as a memory and use it when assessing whether a similar finding should be shown to developers in the future. Assistant also takes that memory, reanalyzes similar findings in your backlog, and suggests issues that may be safe to close.

To add a memory during triage:

1. Identify the specific finding you want to modify, and open up its finding details page.
2. Change the status of the finding to **Ignored**, and optionally, select an **Ignore reason** and provide **Comments** on why you're changing the finding's status as **Ignored**.
3. Click **Ignore & add memory**. 
4. In the **Create memory** pop-up window:
   1. In **Memory**, provide the organization-specific reason why the finding is a false positive. If you provided a comment when setting the status of the finding, Semgrep copies the comment into this field. Your suggestion can be as general as "When there's a function that sanitizes user input, SQL injection is mitigated and developers shouldn't see the finding." Note that Assistant may modify the Memory's text for clarity after you save your changes.
   2. Provide the **Projects** to which this memory should be applied.
   3. Provide the **Rules** to which this memory should be applied.
   4. Select the **Apply to <span className="placeholder">X</span> existing findings in scope** box if you would like Semgrep to apply this memory to any existing findings automatically.
   5. Click **Add memory** to save your changes.
   ![User-provided instructions for generating a memory during the triage process.](/img/triage-memories.png#md-width)
   ***Figure***. User-provided instructions for generating a memory during the triage process.

### View Memories

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **Customize with memories**. This opens a list of your organization's Memories for review.

### Remove Memories

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **Customize with memories**.
3. Click the <i class="fa-solid fa-trash"></i> **icon** to remove the memory.

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

## Use your own OpenAI API key

If you want complete control over how OpenAI handles your data, you can use your OpenAI API key instead of Semgrep's. To provide your OpenAI API key:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
3. Select **Your OpenAI API key**, and provide your API key.

Click **Save** to proceed.

By switching from Semgrep's key to your key, note that you lose access to the following:

- Semgrep’s fine-tuned models that can increase the quality of results.
- Semgrep's [Zero Data Retention agreement](/semgrep-assistant/privacy) that prevents OpenAI from saving input or output data.
- Semgrep paying for the cost of your AI usage.

## Use your AI provider

If you would like access to the following AI providers for use with your Semgrep organization, click the <i class="fa-regular fa-envelope"></i> **icon** next to the AI provider of your choice to request access:

- Azure OpenAI
- AWS Bedrock
- Google Gemini

### Azure OpenAI

To use Azure OpenAI with Semgrep Assistant, you must retrieve the endpoint URL and API key for your model from Azure, then provide it to Semgrep.

1. To retrieve the endpoint URL and API key from Azure:
   1. Log in to Azure OpenAI Studio.
   2. Navigate to **Deployments**, and select the deployment you want to use.
   3. In **Endpoint**, find and copy both the **Target URI** and the **API key**. You will provide both values to Semgrep.
2. To configure Semgrep to use Azure OpenAI:
   1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
   2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
   3. Select **Azure OpenAI**.
   4. Paste the **Target URI** you copied from Azure into **Your Azure OpenAI Endpoint**.
   5. Paste the API key you copied from Azure into **Your Azure OpenAI API key**.
   6. Click **Save** to proceed.

Your Azure OpenAI model is now configured for use in Semgrep.

:::note
You can switch to a different Azure OpenAI model any time by repeating these configuration steps using the Target URI and API key for the new model.
:::

#### Troubleshoot issues with Azure OpenAI

If you see **Error 429 - Max Tokens Exceeded**:

1. Go to **Azure OpenAI Studio > Deployments** and select your active deployment.
1. Under **Details**, click **Edit** and increase the **Tokens per Minute Rate Limit** to the maximum value.
1. If the error persists, contact Microsoft Azure support to request a quota upgrade.

If you can't save the endpoint and API key when configuring Semgrep, Semgrep cannot establish a connection with Azure OpenAI.

1. Ensure that the endpoint URL is correctly formatted. It should look something like `https://<YOUR_DEPLOYMENT_NAME>.openai.azure.com/openai/deployments/mymodel/chat/completions?api-version=2023-05-06-preview`.
1. Verify that your API key is correct.
