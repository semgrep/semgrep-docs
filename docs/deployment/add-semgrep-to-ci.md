---
slug: add-semgrep-to-ci
title: Add Semgrep to CI/CD
hide_title: true
description: "Set up your CI pipeline with Semgrep AppSec Platform for centralized rule and findings management."
tags:
  - Deployment
  - Semgrep AppSec Platform
---

import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"
import PlatformDetectGhRepos from "/src/components/procedure/_platform-detect-ghrepos.md"
import NextStepsComments from "/src/components/concept/_next-steps-comments.mdx"
import DiffAwareScanning from "/src/components/reference/_diff-aware-scanning.mdx"
import DefaultBranches from "/src/components/reference/_default-branches.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DeleteAProject from "/src/components/procedure/_delete-a-project.md"

# Add Semgrep to CI

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs).
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
- Optionally, you have [set up SSO](/deployment/sso).
:::

Semgrep is integrated into CI environments by creating a **job** that is run by the CI provider. After a scan, findings are sent to Semgrep AppSec Platform for triage and remediation.

By integrating Semgrep into your CI environment, your development cycle benefits from the automated scanning of repositories at various events, such as:

- Push events
- Pull or merge requests (PRs or MRs)
- User-initiated events (such as GitHub Action's `workflow_dispatch`)

## Guided setup for CI providers in Semgrep AppSec Platform

This guide walks you through creating a Semgrep job in the following CI providers, which are explicitly supported in Semgrep AppSec Platform:

- GitHub Actions
- GitLab CI/CD
- Jenkins
- Bitbucket
- CircleCI
- Buildkite
- Azure Pipelines

![CI providers explicitly supported in Semgrep AppSec Platform.](/img/in-app-providers.png#md-width)
_**Figure**. Semgrep AppSec Platform provides steps and configuration files to easily set up a Semgrep job for popular CI providers._

If your provider is **not** on this list, you can still integrate Semgrep into your CI workflows by following the steps in [<i class="fa-regular fa-file-lines"></i> Add Semgrep to other CI providers](/deployment/add-semgrep-to-other-ci-providers).

## Projects

Adding a Semgrep job to your CI provider also adds the repository's records, including findings, as a **project** in Semgrep AppSec Platform. Each Project can be individually configured to send notifications or tickets.

![Semgrep Projects page](/img/projects-page.png)
_**Figure.** Semgrep **Projects** page. This displays all the repositories you have successfully added a Semgrep job to._

## Add Semgrep to CI

<Tabs
    defaultValue="other"
    values={[
    {label: 'Supported CI providers', value: 'other'},
    {label: 'GitHub Actions', value: 'gha'},
    ]}
>

<TabItem value='gha'>

To add a CI job to GitHub Actions:

1. Ensure you are signed in to Semgrep AppSec Platform.
1. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
1. Click **Scan new project > CI/CD**.
1. Click **GitHub Actions**.
1. A list of repositories appears. Select all the repositories you want to add a Semgrep job to.
1. If you do not see the repository you want to add, adjust [<i class="fas fa-external-link fa-xs"></i> GitHub Application's Repository Access](https://github.com/settings/installations) configuration. See [Detecting GitHub repositories](#detecting-github-repositories) for more information.
1. Click **Add CI job**. You are taken to the Add CI job page.
1. Optional: Click **Review CI config** to see Semgrep's default YAML configuration file.
1. Click **Commit file**.

You have now added a Semgrep job to GitHub Actions. A **full scan** begins automatically after adding a new repository. Its findings are sent to Semgrep AppSec Platform for triage and remediation.

### Detecting GitHub repositories

<PlatformDetectGhRepos />

</TabItem>

<TabItem value="other">

<PlatformAddRepo />

</TabItem>
</Tabs>

:::tip
You can edit your configuration files to send findings to **GitHub Advanced Security Dashboard (GHAS)** and **GitLab SAST Dashboard**. Refer to the following samples:
- [GitHub Advanced Security Dashboard](/semgrep-ci/sample-ci-configs/#upload-findings-to-github-advanced-security-dashboard)
- [GitLab SAST Dashboard](/semgrep-ci/sample-ci-configs/#upload-findings-to-gitlab-security-dashboard)
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

### Data collected by Semgrep

When running in CI, Semgrep runs fully in the CI build environment. Unless you have explicitly granted code access to Semgrep, your code is not sent anywhere.

- Semgrep collects [findings data](/semgrep-ci/findings-ci), which includes the line number of the code match, but not the code. It is hashed using a one-way hashing function.
- Findings data is used to generate line-specific hyperlinks to your source code management system and support other Semgrep functions.

### Delete a project

Deleting a project removes all of its findings, metadata, and other records from Semgrep AppSec Platform.

<DeleteAProject />

## Scan scope

<DiffAwareScanning />

### Default branch names

Branches with the following names are recognized as **default branch** names (also known as mainline or trunk branches). When you add a Semgrep CI job to your repository for the first time, Semgrep performs a full scan on these default branches.

Within Semgrep, default branches are also known as **primary** branches.

<DefaultBranches />

You can also [set the primary branch name](/deployment/primary-branch). This is useful for repositories with unique names. This lets Semgrep know what branch to prioritize and perform full scans on.

## Next steps

<NextStepsComments opening_phrase="For Jenkins users: Set up a separate CI job for diff-aware scans for"/>

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

https://semgrep.dev/docs/semgrep-ci/running-semgrep-ci-with-semgrep-appsec-platform/#compatibility-of-environment-variables
-> maybe place these into sample CI configs? or separate thing entirely

-->
