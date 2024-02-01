---
slug: add-semgrep-to-ci
title: Add Semgrep to CI/CD
hide_title: true
description: "Set up your CI pipeline with Semgrep Cloud Platform for centralized rule and findings management."
tags:
  - Deployment
---

import MoreHelp from "/src/components/MoreHelp"

import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"
import PlatformDetectGhRepos from "/src/components/procedure/_platform-detect-ghrepos.md"
import NextStepsComments from "/src/components/concept/_next-steps-comments.mdx"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add Semgrep to CI

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
- Optionally, you have [set up SSO](/deployment/sso).
:::

Semgrep is integrated into CI environments by creating a **job** that is run by the CI provider. After a scan, findings are sent to Semgrep Cloud Platform (SCP) for triage and remediation. 

This guide walks you through creating a Semgrep job in the following **CI providers**:

- GitHub Actions
- GitLab CI/CD
- Jenkins
- Bitbucket
- CircleCI
- Buildkite
- Azure Pipelines

These CI providers are explicitly supported in Semgrep Cloud Platform:

![CI providers explicitly supported in SCP.](/img/in-app-providers.png#bordered)

If your provider is **not** on this list, you can still integrate Semgrep into your CI workflows by following the steps in [<i class="fa-regular fa-file-lines"></i> Add Semgrep to other CI providers](/deployment/add-semgrep-to-other-ci-providers).

## Projects

Adding a Semgrep job to your CI provider also adds the repository's records, including findings, as a **project** in Semgrep Cloud Platform. Each Project can be individually configured to send notifications or tickets. 

![Semgrep Cloud Platform Projects page](/img/projects-page.png)
**Figure.** Semgrep Cloud Platform Projects page. This displays all the repositories you have successfully added a Semgrep job to.

## Add Semgrep to CI through Semgrep Cloud Platform

<Tabs
    defaultValue="gha"
    values={[
    {label: 'GitHub Actions', value: 'gha'},
    {label: 'Other in-app providers', value: 'other'},
    ]}
>

<TabItem value='gha'>

To add a CI job to GitHub Actions:

1. Ensure you are signed in to Semgrep Cloud Platform.
1. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
1. Click **Scan new project > CI/CD**.
1. Click **GitHub Actions**.
1. A list of repositories appears. Select all the repositories you want to add a Semgrep job to.
1. If you do not see the repository you want to add, adjust [<i class="fas fa-external-link fa-xs"></i> GitHub Application's Repository Access](https://github.com/settings/installations) configuration. See [Detecting GitHub repositories](#detecting-github-repositories) for more information.
1. Click **Add CI job**. You are taken to the Add CI job page.
1. Optional: Click **Review CI config** to see Semgrep's default YAML configuration file. 
1. Click **Commit file**.

You have now added a Semgrep job to GitHub Actions. A scan begins automatically after adding a new repository. Its findings are sent to Semgrep Cloud Platform for triage and remediation.

### Detecting GitHub repositories

<PlatformDetectGhRepos />

</TabItem>

<TabItem value="other">

<PlatformAddRepo />

</TabItem>
</Tabs>

:::tip
You can edit your configuration files to send findings to **GitHub Advanced Security Dashboard (GHAS)** and **GitLab SAST Dashboard**. Refer to the following samples:
- [GitHub Advanced Security Dashboard](/semgrep-ci/sample-ci-configs/#github-actions)
- [GitLab SAST Dashboard](/semgrep-ci/sample-ci-configs/#gitlab-cicd)
:::

### Sample CI configuration snippets

Refer to the following table for links to sample CI configuration snippets:

| In-app CI provider   | Sample CI configuration snippet |
| :------------------- | :-----------------------------  |
| GitHub Actions       |  [`semgrep.yml`](/semgrep-ci/sample-ci-configs/#github-actions) |
| GitLab CI/CD         | [`.gitlab-ci.yml`](/semgrep-ci/sample-ci-configs/#gitlab-cicd) |
| Jenkins              | [`Jenkinsfile`](/semgrep-ci/sample-ci-configs/#jenkins) |
| Bitbucket Pipelines  | [`bitbucket-pipelines.yml`](/semgrep-ci/sample-ci-configs/#bitbucket-pipelines) |
| CircleCI             | [`config.yml`](/semgrep-ci/sample-ci-configs/#circleci) |
| Buildkite            | [`pipelines.yml`](/semgrep-ci/sample-ci-configs/#buildkite) |
| Azure Pipelines      | [`azure-pipelines.yml`](/semgrep-ci/sample-ci-configs/#azure-pipelines) |

## Next steps

<NextStepsComments />

<!-- After setting up PR comments:

1. (If applicable) Configure SCA scans
-> Core deployment is done at this point

2. Enterprise stuff
3. Other deployment environments
4. Set up notifications, ticketing, API, Devex
-->

<!--  Outline of other docs

2. GitHub actions branch protection
3. Other CI providers (environment variables set up) -->

<!-- Changes to existing

https://semgrep.dev/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#compatibility-of-environment-variables
-> maybe place these into sample CI configs? or separate thing entirely

-->
