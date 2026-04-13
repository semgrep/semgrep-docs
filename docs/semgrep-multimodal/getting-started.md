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

Semgrep Multimodal extends standard Semgrep capabilities by providing contextually aware AI-powered vulnerability detection and remediation suggestions.

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

Building context for Semgrep Multimodal requires Azure DevOps permissions, specifically code access granted through an access token you generate through Azure DevOps. Ensure that the token has the following scopes:

- `Code: Read & write`
- `Pull Request Threads: Read & write`

You can provide this token to Semgrep by adding [Azure DevOps as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs).

Semgrep recommends using a service account, not a personal account, to [generate the personal access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) provided to Semgrep. Regardless of whether you use a personal or service account, the account must be assigned the **Owner** or **Project Collection Administrator** role for the organization.

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Multimodal** dialog appears. Click **Accept & Enable Semgrep Multimodal** to proceed.

After enabling Semgrep Multimodal, you can configure the [AI provider](https://semgrep.dev/orgs/-/settings/general/global) and enable additional features:
- **[Scan with AI-powered detection](/semgrep-code/ai-powered-detection-concepts)**: Run AI-powered scans to identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization issues. Enabling Semgrep Multimodal does not automatically run AI-powered scans. 
- **[Weekly priority emails](/semgrep-code/ai-powered-detection-concepts)**: Send weekly summary emails to organization admins highlighting the top three backlog priorities across all findings.
- **[Noise filter for Code PR/MR comments](/semgrep-appsec-platform/github-pr-comments#configure-comments-for-semgrep-code)**: Filter out findings identified as false positives. You can choose to suppress PR or MR comments entirely or display informational comments indicating that a finding is a false positive.
- **[Suggested fix](/semgrep-multimodal/customize#remediation)**: Enable Multimodal-generated autofix suggestions in PR and MR comments. You can also set a minimum confidence threshold for AI-generated fixes when a rule does not include a human-authored autofix.



</TabItem>

<TabItem value='bitbucket'>

Building context for Semgrep Multimodal requires additional Bitbucket permissions, specifically code access granted through an access token you generate through Bitbucket. Your token must be a [Workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/workspace-access-tokens/), which are available to users with a Bitbucket Cloud Premium plan or higher. The token must have the following scopes:

- `Projects: Read`
- `Repositories: Read`
- `Pull requests: Read & Write`
- `Webhooks: Read and write`

You can provide this token to Semgrep by [adding Bitbucket as a source code manager](/deployment/connect-scm#connect-to-cloud-hosted-orgs).

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Multimodal** dialog appears. Click **Accept & Enable Semgrep Multimodal** to proceed.

After enabling Semgrep Multimodal, you can configure the [AI provider](https://semgrep.dev/orgs/-/settings/general/global) and enable additional features:
- **[Scan with AI-powered detection](/semgrep-code/ai-powered-detection-concepts)**: Run AI-powered scans to identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization issues. Enabling Semgrep Multimodal does not automatically run AI-powered scans. 
- **[Weekly priority emails](/semgrep-code/ai-powered-detection-concepts)**: Send weekly summary emails to organization admins highlighting the top three backlog priorities across all findings.
- **[Noise filter for Code PR/MR comments](/semgrep-appsec-platform/github-pr-comments#configure-comments-for-semgrep-code)**: Filter out findings identified as false positives. You can choose to suppress PR or MR comments entirely or display informational comments indicating that a finding is a false positive.
- **[Suggested fix](/semgrep-multimodal/customize#remediation)**: Enable Multimodal-generated autofix suggestions in PR and MR comments. You can also set a minimum confidence threshold for AI-generated fixes when a rule does not include a human-authored autofix.


</TabItem>

<TabItem value='github'>

In addition to the
[<i class="fa-regular fa-file-lines"></i> standard permissions required for Semgrep](/deployment/checklist/#permissions), Semgrep Multimodal requires [read access to your code in GitHub](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps?apiVersion=2022-11-28). This is done through a **private Semgrep GitHub app** that you install. 


The private Semgrep GitHub app:

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
   5. When done, GitHub redirects you back to Semgrep AppSec Platform.

### Enable Multimodal

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Go to **[Settings > Global](https://semgrep.dev/orgs/-/settings/general/global)**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Multimodal** dialog appears. Click **Accept & Enable Semgrep Multimodal** to proceed.


After enabling Semgrep Multimodal, you can configure the [AI provider](https://semgrep.dev/orgs/-/settings/general/global) and enable additional features:
- **[Scan with AI-powered detection](/semgrep-code/ai-powered-detection-concepts)**: Run AI-powered scans to identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization issues. Enabling Semgrep Multimodal does not automatically run AI-powered scans. 
- **[Weekly priority emails](/semgrep-code/ai-powered-detection-concepts)**: Send weekly summary emails to organization admins highlighting the top three backlog priorities across all findings.
- **[Autofix PR](/semgrep-code/triage-remediation/autofix)**: Automatically create AI-generated pull requests (PRs) to remediate findings.
- **[Noise filter for Code PR/MR comments](/semgrep-appsec-platform/github-pr-comments#configure-comments-for-semgrep-code)**: Filter out findings identified as false positives. You can choose to suppress PR or MR comments entirely or display informational comments indicating that a finding is a false positive.
- **[Suggested fix](/semgrep-multimodal/customize#remediation)**: Enable Multimodal-generated autofix suggestions in PR and MR comments. You can also set a minimum confidence threshold for AI-generated fixes when a rule does not include a human-authored autofix.
**[Upgrade Guidance & Autofix](/semgrep-supply-chain/triage-and-remediation#upgrade-guidance-and-autofix-beta)**: Analyze dependency upgrades for potential breaking changes. When enabled, Semgrep displays indicators for safe upgrades and potential breaking changes in Supply Chain findings.

</TabItem>

<TabItem value='gitlab'>

To build context for Semgrep Multimodal, **API scope** must be enabled on both GitLab SaaS and self-managed instances. This can be specified at either the [project access token level](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html) or [personal access token level](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

* You can revoke [project access tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html#revoke-a-project-access-token) or [personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#revoke-a-personal-access-token) at any time.
* Semgrep Multimodal only accesses source code repositories (projects) on a file-by-file basis; it does not need or request org-level access to your codebase.
* The token can be configured to limit its scope to specific projects or individuals. You do not need to give read access to all projects in your GitLab organization.

<h2>Enable Multimodal</h2>

1. Sign in to [Semgrep AppSec Platform <i class="fas fa-external-link fa-xs"></i>](https://semgrep.dev/login) using your GitLab account.
2. Go to **Settings > Global**, and click the **Semgrep Multimodal** toggle to enable.
3. The **Set up Semgrep Multimodal** dialog appears. Click **Accept & Enable Semgrep Multimodal** to proceed.

After enabling Semgrep Multimodal, you can configure the [AI provider](https://semgrep.dev/orgs/-/settings/general/global) and enable additional features:
- **[Scan with AI-powered detection](/semgrep-code/ai-powered-detection-concepts)**: Run AI-powered scans to identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization issues. Enabling Semgrep Multimodal does not automatically run AI-powered scans. 
- **[Weekly priority emails](/semgrep-code/ai-powered-detection-concepts)**: Send weekly summary emails to organization admins highlighting the top three backlog priorities across all findings.
- **[Autofix PR](/semgrep-code/triage-remediation/autofix)**: Automatically create AI-generated pull requests (PRs) to remediate findings.
- **[Noise filter for Code PR/MR comments](/semgrep-appsec-platform/github-pr-comments#configure-comments-for-semgrep-code)**: Filter out findings identified as false positives. You can choose to suppress PR or MR comments entirely or display informational comments indicating that a finding is a false positive.
- **[Suggested fix](/semgrep-multimodal/customize#remediation)**: Enable Multimodal-generated autofix suggestions in PR and MR comments. You can also set a minimum confidence threshold for AI-generated fixes when a rule does not include a human-authored autofix.
**[Upgrade Guidance & Autofix](/semgrep-supply-chain/triage-and-remediation#upgrade-guidance-and-autofix-beta)**: Analyze dependency upgrades for potential breaking changes. When enabled, Semgrep displays indicators for safe upgrades and potential breaking changes in Supply Chain findings.

</TabItem>
</Tabs>
