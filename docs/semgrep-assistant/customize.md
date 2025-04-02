---
slug: customize
title: Customize Assistant
hide_title: true
description: Learn how to enable and configure Assistant's features.
tags:
  - Deployment
  - Semgrep Assistant
---

# Customize Semgrep Assistant

You can customize Semgrep Assistant by enabling and using the features detailed on this page.

## Remediation

Assistant remediation allows you to receive AI-generated code snippets for true positives. Perform the following to enable it:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Remediation** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. *Optional*: Select a **confidence level** in the drop-down box. This value determines the level of quality at which the autofix code appears as a suggestion. A lower confidence level means that Semgrep Assistant displays the autofix suggestion even when the code quality may be incorrect.

:::tip
Semgrep recommends setting a low confidence level since even incorrect suggestions may be useful starting points for triage and remediation.
:::

## Auto-triage

[Auto-triage](/semgrep-assistant/overview/#auto-triage) allows you to get notifications whenever Assistant indicates a finding may be safe to ignore. You can enable auto-triage, if it isn't already, as follows:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Auto-triage for Code** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Select whether you want alerts included in your **PR/MR comments** and **Slack notifications**.

![MR comment from Semgrep Assistant in GitLab](/img/assistant-gl-comment.png#md-width)
*Figure*. MR comment from Semgrep Assistant in GitLab.

### Missing PR and comments

Semgrep Assistant messages only appear in your PR comments for rules that are set to Comment or Block mode on the Rule Management page. Ensure that:

* You have set rules to Comment or Block mode.
  ![Policies modes](/img/semgrep-assistant-comment.png#md-width)
* You have selected **PR/MR comments** in **Semgrep AppSec Platform > Settings > Deployment** in the **Code** section.

## Weekly priority emails

[Weekly priority emails](/semgrep-assistant/overview/#weekly-priority-emails) allows organization admins to receive information on top backlog tasks according to Assistant. If this feature isn't enabled for your deployment, you can do so as follows:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Weekly priority emails** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.

## Noise filtering

Assistant is [over 95% accurate in categorizing Semgrep Code findings as false positives](/semgrep-assistant/metrics.md), so you can minimize the number of findings shown by enabling **Noise filter for Code PR/MR comments**. To do so:

1. Sign in to Semgrep AppSec Platform, and navigate to **Settings > Deployment**.
2. In the **Assistant** section, click the **Noise filter for Code PR/MR comments** <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Select whether you want to enable PR or MR comments:
   1. **Don’t leave a PR/MR comment**: Hide Semgrep’s comments on findings that are likely to be false positives. These findings are available for security review on the [**Code > Pre-production backlog** page](https://semgrep.dev/orgs/-/findings?tab=open&last_opened=All+time&backlog=preprod). Comments still appear for rules in [**Block** mode](/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes).
   2. **Include a notification in the PR/MR comment**: Show developers likely false positive findings in PR/MR comments, but include a note explaining why Assistant thinks the finding may be safe to ignore.

Findings filtered out by Assistant can be reviewed at any time in Semgrep by going to the [**Code > Pre-production backlog** page](https://semgrep.dev/orgs/-/findings?tab=open&last_opened=All+time&backlog=preprod). Semgrep also allows you to agree with the filtering to close the finding or disagree to reopen.

## Add Memories (beta)

Assistant Memories allows admins to tailor Assistant's remediation guidance to their organization's standards and defaults on a per-project, per-rule basis. You can provide feedback by adding custom instructions whenever Assistant gives a suggested fix.

Memories are enabled by default for all organizations with Assistant enabled.

### Add a memory based on Assistant's suggested fix

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

When you identify findings that are safe to ignore and provide reasoning for your actions, Semgrep Assistant determines whether your changes should be stored as a memory. If Assistant creates a new memory, which is used to assess if similar findings should be shown to developers, it then reanalyzes similar findings in your backlog and suggests issues that may be safe to close.

To triage and create a memory (Semgrep automatically attempts to create a memory during triage if possible):

1. Identify the specific finding you want to modify, and open up its finding details page.
2. Click **Ignore**, select an **Ignore reason**, and provide **Comments** on why you're triaging the finding as **Ignore**.
3. Click **Ignore**. Assistant attempts to create a memory with the information you provide. If Assistant successfully creates a memory for you, you'll see a link to the list of memories for your organization in the dialog that appears.

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

## Use your AI provider

By default, Semgrep Assistant uses OpenAI with Semgrep's API key. You can, however, opt to:

- Use OpenAI with your own API key
- Use Azure OpenAI
- Use Google Gemini.

If you would like to use AWS Bedrock with your Semgrep organization, contact [Support](/support) to request access.

![Semgrep Assistant settings](/img/assistant-api-keys.png#md-width)
_**Figure**. Semgrep Assistant settings featuring the option to change the API provider._

### OpenAI API with your own key

If you want complete control over how OpenAI handles your data, you can use your OpenAI API key instead of Semgrep's. To provide your OpenAI API key:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
3. Select **Your OpenAI API key**, and provide your API key.

Click **Save** to proceed.

By switching from Semgrep's key to your key, note that you lose access to the following:

- Semgrep’s fine-tuned models that can increase the quality of results.
- Semgrep's [Zero Data Retention agreement](/semgrep-assistant/privacy) that prevents OpenAI from saving input or output data.
- Semgrep paying for the cost of your AI usage.

### Google Gemini

To use Google Gemini with Semgrep Assistant:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
3. Select **Google Gemini**.
4. Paste in your API key.
5. Click **Save** to proceed.

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
