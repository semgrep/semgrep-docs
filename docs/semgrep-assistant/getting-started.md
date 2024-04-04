# Enable Semgrep Assistant

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article walks you through enabling Semgrep Assistant for your deployment.

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

Semgrep Assistant extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitHub permissions in excess of the 
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Assistant requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through a private Semgrep GitHub app that you install during Assistant setup. This private Semgrep GitHub app:

* Is fully under your control so you can revoke access or specific permissions at any time by visiting **Settings > Applications** in GitHub.
* Only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* Can be configured to limit its scope to specific repositories. You do not need to give read access to all repositories in your GitHub organization. 

### Enable Semgrep Assistant

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/)**. 
3. In the **Assistant** section, click the **<i class="fa-solid fa-gear"></i> Allow code snippets in AI prompts** toggle.
![Screenshot of Semgrep Assistant setup button](/img/semgrep-assistant-setup.png#md-width)
   This launches the **Set up Semgrep Assistant** prompt.
1. Select a source code manager (SCM) by clicking **github.com**.
2. Semgrep provides you with information on why Assistant requires access to your source code. Click **Accept & Enable Assistant** to proceed.
3. You are redirected to the page where you can add the GitHub Private App that grants Semgrep read access to your code.
   1. Enter your GitHub information. Select whether you're installing the app on an **organization** or **Personal Account**, and provide its **Organization name**.
   2. Click **Review permissions** to see the permissions requested by Semgrep.
   3. Click **Register GitHub App** to proceed.
   4. When prompted, click **Continue** to allow redirection to GitHub to finalize app creation. Follow the instructions to finish creating and installing a private `semgrep-app`.
4. You are redirected to Semgrep Cloud Platform's **Source Code Managers** page. Navigate back to the **Deployment** page, and under the **Assistant** section, verify that all of the features are enabled.
    ![Screenshot of Semgrep Assistant toggle location](/img/semgrep-assistant-enable.png)

</TabItem>

<TabItem value='gitlab'>

Semgrep Assistant extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitLab permissions in excess of the 
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Assistant requires the **API scope** to run in both GitLab SaaS and GitLab self-managed instances. This can be specified at either the [project access token level](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) or [personal access token level](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). 

* You can revoke [project access tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#revoke-a-project-access-token) or [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#revoke-a-personal-access-token) at any time. 
* Semgrep Assistant only accesses source code repositories (projects) on a file-by-file basis; it does not need or request org-level access to your codebase.
* The token can be configured to limit its scope to specific projects or individuals. You do not need to give read access to all projects in your GitLab organization.

### Enable Semgrep Assistant

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

* [Suggesting autofix code snippets to resolve the finding](#suggest-autofix-code-snippets-to-resolve-the-finding)

:::caution Not receiving PR comments?
Semgrep Assistant messages only appear in your PR comments for rules that are set to Comment or Block mode in the Rule Management page. Ensure the following:

* Ensure that you have set rules to Comment or Block mode.
    ![Screenshot of Policies modes](/img/semgrep-assistant-comment.png)
* Ensure that you have selected PR/MR comments in **Semgrep Cloud Platform > Settings > Deployment** in the **Code** section.
:::

## Enable autofix 

To enable autofix by Semgrep Assistant, perform the following steps:

1. While logged in to Semgrep Cloud Platform, click **Settings > Deployment**.
2. In the Code section, click Autofix <i class="fa-solid fa-toggle-large-on"></i> if it is not yet enabled.
3. Click <i class="fa-solid fa-square-check"></i> **Also include Assistant-written autofixes**.
4. Optional: Select the **confidence level** on the drop-down box. The value determines the level of quality at which the autofix code appears as a suggestion. A lower confidence level means that Semgrep Assistant displays the autofix suggestion even when the code quality may be incorrect.

:::tip
A low confidence level is recommended, as even incorrect suggestions may be useful starting points.
:::

## View Assistant recommendations

You can [view all of Semgrep Assistant's recommendations](/semgrep-code/findings/#filter-findings) by going to Semgrep Cloud Platform's **Findings** page and filtering by **Recommendation** or **Component**.


## Use Semgrep Assistant to analyze findings

If you have [enabled Assistant](/semgrep-code/semgrep-assistant-code/#enable-semgrep-assistant),
you can use the **Analyze** button on the [Findings page](/semgrep-code/findings) to trigger all Assistant functions, including autofix, autotriage, and component tagging.

![Assistant Analyze button on Findings page](/img/scp-assistant.png#md-width)

After Assistant performs these functions, you can see your results on the **Findings** page using the **Recommendation** or **Component** filters.

To analyze your findings with Assistant:

1. On the [Findings](https://semgrep.dev/orgs/-/findings?tab=open) page, select the findings that you want Assistant to analyze.
1. Click **Analyze**.
2. In the confirmation window that appears, confirm that you want to analyze your findings with Assistant.

The amount of time required to analyze your findings varies, but SCP displays a notification that provides an estimated wait time.

When viewing your findings, you can see false positive and true positive recommendations when viewing the finding details pages if you choose **No Grouping** instead of **Group by Rule**.