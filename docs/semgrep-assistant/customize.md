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

## Add Memories

Assistant Memories allows admins to tailor Assistant's remediation guidance to their organization's standards and defaults on a per-project, per-rule basis. You can provide feedback by adding custom instructions whenever Assistant gives a suggested fix.

Memories are enabled by default for all organizations with Assistant enabled.

### Add a memory

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [<i class="fa-solid fa-gear"></i> **Rules & Policies > Assistant Memories**](https://semgrep.dev/orgs/-/memories).
3. Click **New Memory**.
4. In **Memory**, enter your preferred remediation approach and secure default.
5. Select the **Projects** and the **Rules** to which the memory should be applied.
6. Click **Add memory** to save your changes and proceed.

### Add a memory based on Assistant's suggested fix

To add a memory based on a suggested fix presented by Assistant:

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

Memories are scoped to remediation guidance on a per-project and per-rule basis. A saved memory only affects future guidance for findings triggered by the same rule in the same project.

### Add memory during triage and receive memory suggestions from Assistant

When you identify findings that are safe to ignore and provide reasoning for your actions, Semgrep Assistant can use this triage feedback to suggest memories. It can start suggesting memories from the very first triage feedback it receives, or it may suggest memories from multiple pieces of feedback, depending on the level of detail in the feedback and the finding's unique context. If Assistant creates a new memory, it will use the memory to assess if similar findings are safe to ignore and hide from developers.

To triage and create a memory (Semgrep automatically attempts to create a memory during triage if possible):

1. Identify the specific finding you want to modify, and open up its finding details page.
2. Click **Ignore**, select an **Ignore reason**, and provide **Comments** on why you're triaging the finding as **Ignore**.
3. Click **Ignore**. Assistant attempts to create a memory using the information you provide. If Assistant successfully creates a memory for you, you'll see a link to the list of memories for your organization in the dialog that appears.

Permissions:

- Automatic generation of memories: if you are an **admin** user, Assistant immediately tries to generate **active** memories from your triage feedback.
- If you are a non-admin user, such as a manager, Assistant creates a **suggested** memory that needs an admin to activate it. 

### View and edit memories

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [<i class="fa-solid fa-gear"></i> **Rules & Policies > Assistant Memories**](https://semgrep.dev/orgs/-/memories).

![Assistant Memories overview in Semgrep AppSec Platform](/img/assistant-memories.png)
_**Figure**. Assistant Memories overview in Semgrep AppSec Platform._

There are two tabs on the **Assistant Memories** page for your review:

- The **Active** tab displays a list of memories that Assistant is actively using to generate triage advice
- The **Suggested** tab displays a list of memories Assistant has generated based on your past triage actions and developer feedback. For each suggestion, you can:
  - Activate the suggested memory to inform Assistant's advice on current and future findings
  - Edit the memory, then activate it
  - Delete the suggested memory

Note that only users assigned the `admin` role in Semgrep can activate suggested memories.

### Remove memories

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [<i class="fa-solid fa-gear"></i> **Rules * Policies > Assistant Memories**](https://semgrep.dev/orgs/-/memories).
3. Identify the memory you would like to delete, then click the <i class="fa-solid fa-trash"></i> **icon** to remove the memory.

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

## Select your AI provider

By default, Semgrep Assistant uses OpenAI and AWS Bedrock with Semgrep's API keys. You can, however, opt to:

- Use OpenAI with your own API key
- Use Azure OpenAI
- Use Google Gemini.
- Use xAI.

Additionally, Semgrep Assistant supports the use of multiple AI models.

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
As of May 2025, the best model for noise filtering is `o3-mini`, which performs better than `o4-mini`. The best model for other Semgrep Assistant features is `gpt-4.1`. You cannot have multiple Azure OpenAI models active at a given time, but you can switch to a different one by repeating these configuration steps using the Target URI and API key for the new model.
:::

### Google Gemini

To use Google Gemini with Semgrep Assistant:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
3. Select **Google Gemini**.
4. Paste in your API key.
5. Click **Save** to proceed.

> Semgrep Assistant only supports Google Gemini with Google AI Studio, not Vertex AI.

### xAI

To use xAI with Semgrep Assistant, you must retrieve the endpoint URL and API key from xAI, then provide it to Semgrep.

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects) and navigate to [<i class="fa-solid fa-gear"></i> **Settings > Deployment**](https://semgrep.dev/orgs/-/settings).
2. In the **Assistant** section, click the <i class="fa-solid fa-gear"></i> **icon** next to **AI provider**.
3. Select **xAI**.
4. Paste in your API key and API endpoint.
5. Click **Save** to proceed.
