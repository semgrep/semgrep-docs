---
slug: getting-started
title: Getting Started
hide_title: true
toc_max_heading_level: 2
description: Learn how to enable Semgrep Multimodal.
tags:
  - Deployment
  - Semgrep Multimodal
---

# Enable Semgrep Multimodal

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This article walks you through enabling Semgrep Multimodal for your deployment.

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

Semgrep Multimodal extends standard Semgrep capabilities by providing contextually aware AI-generated suggestions. Building that context requires Azure DevOps permissions, specifically code access granted through an access token you generate through Azure DevOps. Ensure that the token has the following scopes:

- `Code: Read & write`
- `Pull Request Threads: Read & write`

You can provide this token to Semgrep by adding [Azure DevOps as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs).

Semgrep recommends using a service account, not a personal account, to [generate the personal access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) provided to Semgrep. Regardless of whether you use a personal or service account, the account must be assigned the **Owner** or **Project Collection Administrator** role for the organization.

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Assistant** dialog appears. Click **Accept & Enable Semgrep Assistant** to proceed.
4. Once you've enabled Semgrep Assistant, you can change the **AI provider** used and enable additional features, including:
   1. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   2. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   3. **Suggested fix**: Enable Multimodal-generated autofix suggestions in comments from Multimodal. You can also set the minimum confidence level for Multimodal-written fixes if the Semgrep rule doesn't include a human-written autofix.
   4. **Upgrade Guidance & Autofix**: Enable analysis of dependency upgrades for breaking changes. Semgrep displays safe-to-upgrade and breaking-change indicators on Supply Chain findings when enabled.

</TabItem>

<TabItem value='bitbucket'>

Semgrep Multimodal extends standard Semgrep capabilities by providing contextually aware AI-generated suggestions. Building that context requires Bitbucket permissions, specifically code access granted through an access token you generate through Bitbucket. Your token must be a [Workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/workspace-access-tokens/), which are available to users with a Bitbucket Cloud Premium plan or higher. The token must have the following scopes:

- `Projects: Read`
- `Repositories: Read`
- `Pull requests: Read & Write`
- `Webhooks: Read and write`

You can provide this token to Semgrep by [adding Bitbucket as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs).

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Assistant** dialog appears. Click **Accept & Enable Semgrep Assistant** to proceed.
4. Once you've enabled Semgrep Assistant, you can change the **AI provider** used and enable additional features, including:
   1. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   2. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   3. **Suggested fix**: Enable Multimodal-generated autofix suggestions in comments from Multimodal. You can also set the minimum confidence level for Multimodal-written fixes if the Semgrep rule doesn't include a human-written autofix.
   4. **Upgrade Guidance & Autofix**: Enable analysis of dependency upgrades for breaking changes. Semgrep displays safe-to-upgrade and breaking-change indicators on Supply Chain findings when enabled.

</TabItem>

<TabItem value='github'>

Semgrep Multimodal extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, it requires GitHub permissions in addition to the
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions).

Semgrep Multimodal requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through a private Semgrep GitHub app that you install. This private Semgrep GitHub app:

* Is fully under your control so you can revoke access or specific permissions at any time by visiting **Settings > Applications** in GitHub.
* Only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* Can be configured to limit its scope to specific repositories. You do not need to give read access to all repositories in your GitHub organization.

To verify that you have the private app installed:

1. In Semgrep AppSec Platform, go to **Settings > Source Code Managers**.
2. Find the entry for GitHub. If you have the **Private app** installed, Semgrep displays a message underneath this label that reads **Enables Autotriage, Managed Scans, and Auto-scan**. 
3. If you *don't* have the **Private app** installed, the **Install** button is shown to you. To install the private app:
   1. Click **Install** to launch the **Add GitHub App** page.
   2. Review the information provided, and click **Register GitHub App** to proceed.
   3. The **Continue to SCM** dialog appears, since you must finish installing the app with GitHub. Click **Continue** to proceed.
   4. Follow the prompts provided by GitHub to finish creating the app.
   5. When done, GitHubs redirect you back to Semgrep AppSec Platform.

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Global**, and click the **Semgrep Assistant** toggle to enable.
3. The **Set up Semgrep Assistant** dialog appears. Click **Accept & Enable Semgrep Assistant** to proceed.
4. Once you've enabled Semgrep Assistant, you can change the **AI provider** used and enable additional features, including:
   1. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   2. **Autofix PR**: Enable the creation of AI-generated pull requests (PR) that fix findings.
   3. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   4. **Suggested fix**: Enable Multimodal-generated autofix suggestions in comments from Multimodal. You can also set the minimum confidence level for Multimodal-written fixes if the Semgrep rule doesn't include a human-written autofix.
   5. **Upgrade Guidance & Autofix**: Enable analysis of dependency upgrades for breaking changes. Semgrep displays safe-to-upgrade and breaking-change indicators on Supply Chain findings when enabled.

</TabItem>

<TabItem value='gitlab'>

Semgrep Multimodal extends normal Semgrep capabilities by providing contextually aware AI-generated suggestions. In order to build that context, Semgrep Multimodal requires the **API scope** to run in both GitLab SaaS and GitLab self-managed instances. This can be specified at either the [project access token level](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) or [personal access token level](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

* You can revoke [project access tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#revoke-a-project-access-token) or [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#revoke-a-personal-access-token) at any time.
* Semgrep Multimodal only accesses source code repositories (projects) on a file-by-file basis; it does not need or request org-level access to your codebase.
* The token can be configured to limit its scope to specific projects or individuals. You do not need to give read access to all projects in your GitLab organization.

<h2>Enable Multimodal</h2>

1. Sign in to [Semgrep AppSec Platform <i class="fas fa-external-link fa-xs"></i>](https://semgrep.dev/login) using your GitLab account.
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Assistant** dialog appears. Click **Accept & Enable Semgrep Assistant** to proceed.
4. Once you've enabled Semgrep Assistant, you can change the **AI provider** used and enable additional features, including:
   1. **Weekly priority emails**: Enable weekly emails to all organization admins with information on Assistant's top three backlog tasks across all findings.
   2. **Noise filter for Code PR/MR comments**: Enable the filtering of findings flagged as false positives. You can choose to suppress any PR or MR comments Semgrep might push, or you can choose to show developers information regarding false positives using PR or MR comments.
   3. **Suggested fix**: Enable Multimodal-generated autofix suggestions in comments from Multimodal. You can also set the minimum confidence level for Multimodal-written fixes if the Semgrep rule doesn't include a human-written autofix.
   4. **Upgrade Guidance & Autofix**: Enable analysis of dependency upgrades for breaking changes. Semgrep displays safe-to-upgrade and breaking-change indicators on Supply Chain findings when enabled.

</TabItem>
</Tabs>
