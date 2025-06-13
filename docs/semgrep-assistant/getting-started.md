---
slug: getting-started
title: Getting Started
hide_title: true
toc_max_heading_level: 2
description: Learn how to enable Semgrep Assistant..
tags:
  - Deployment
  - Semgrep Assistant
---

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
    {label: 'Azure DevOps Cloud', value: 'ado'},
    {label: 'Bitbucket Cloud', value: 'bitbucket'},
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>

<TabItem value='ado'>

Semgrep Assistant extends standard Semgrep capabilities by providing contextually aware AI-generated suggestions. Building that context requires Azure DevOps permissions, specifically code access granted through an access token you generate through Azure DevOps. Ensure that the token has the following scopes:

- `Code: Read & write`
- `Pull Request Threads: Read & write`

You can provide this token to Semgrep by adding [Azure DevOps as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs).

Semgrep recommends using a service account, not a personal account, to [generate the personal access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) provided to Semgrep. Regardless of whether you use a personal or service account, the account must be assigned the **Owner** or **Project Collection Administrator** role for the organization.

</TabItem>

<TabItem value='bitbucket'>

Semgrep Assistant extends standard Semgrep capabilities by providing contextually aware AI-generated suggestions. Building that context requires Bitbucket permissions, specifically code access granted through an access token you generate through Bitbucket. Your token must be a [Workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/workspace-access-tokens/), which are available to users with a Bitbucket Cloud Premium plan or higher. The token must have the following scopes:

- `Projects: Read`
- `Repositories: Read`
- `Pull requests: Read & Write`
- `Webhooks: Read and write`

You can provide this token to Semgrep by [adding Bitbucket as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs). 

</TabItem>

<TabItem value='github'>

Semgrep Assistant extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitHub permissions in addition to the
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Assistant requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through a private Semgrep GitHub app that you install during Assistant setup. This private Semgrep GitHub app:

* Is fully under your control so you can revoke access or specific permissions at any time by visiting **Settings > Applications** in GitHub.
* Only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* Can be configured to limit its scope to specific repositories. You do not need to give read access to all repositories in your GitHub organization.

### Enable Assistant

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
4. You are redirected to Semgrep AppSec Platform's **Source Code Managers** page. Navigate back to the **General > Assistant** page. Verify that all of the features are enabled:
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

Once you have enabled Semgrep Assistant, you can [customize your deployment by enabling or disabling the Assistant features](/semgrep-assistant/customize) that best fit your software development lifecycle.
