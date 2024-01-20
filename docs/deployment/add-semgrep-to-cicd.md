---
slug: add-semgrep-to-cicd
title: Add Semgrep to CI/CD
hide_title: true
description: tk
tags:
  - Deployment
---

import MoreHelp from "/src/components/MoreHelp"
import PlatformAddRepo from "/src/components/procedure/_platform-add-repo.md"
import PlatformDetectGhRepos from "/src/components/procedure/_platform-detect-ghrepos.md"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Add Semgrep to CI

:::note Your deployment journey
- You have [<i class="fa-regular fa-file-lines"></i> created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [<i class="fa-regular fa-file-lines"></i> connected your source code manager](/deployment/connect-scm).
- Optionally, you have [<i class="fa-regular fa-file-lines"></i> set up SSO](/deployment/sso).
:::

Semgrep is integrated into CI environments by creating a **job** (also known as an **action** for some CI providers) that is run by the CI provider. After a scan, findings are sent to Semgrep Cloud Platform for triage and remediation. 

This guide walks you through creating a Semgrep job in the following CI providers:

- GitHub Actions
- GitLab CI/CD
- Jenkins
- Bitbucket
- CircleCI
- Buildkite
- Azure Pipelines

If your provider is not on this list, you can still integrate Semgrep into your CI workflows by following the steps in [<i class="fa-regular fa-file-lines"></i> ] Add Semgrep to other CI providers tk link.

## Projects

Adding a Semgrep job to your CI provider also adds the repository's records, including findings, as a **project** in Semgrep Cloud Platform. Each Project can be individually configured to send notifications or tickets. 

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

You have now added a Semgrep job to your CI provider. A scan begins automatically after adding a new repository. Its findings are sent to Semgrep Cloud Platform for triage and remediation.

### Detecting GitHub repositories

<PlatformDetectGhRepos />

</TabItem>

<TabItem value="other">

<PlatformAddRepo />

</TabItem>
</Tabs>

## Sample CI configuration snippets

## Configuring your CI job

### Diff-aware scanning

Diff-aware scanning definition tk

#### Automatically enabled


- GitHub Actions
- GitLab CI/CD
- Bitbucket
- CircleCI
- Buildkite

#### Requires set up

- Azure Pipelines
- Jenkins

### Setting a scan schedule

### Setting a custom timeout



## Next steps

Set up PR comments

<!-- After setting up PR comments:

1. (If applicable) Configure SCA scans
-> Core deployment is done at this point

2. Enterprise stuff
3. Other deployment environments
4. Set up notifications, ticketing, API, Devex
-->

<!--  Outline of other docs

1. This doc - steps through Semgrep Cloud Platform, including: 
    - intro to diff-aware scanning,
    - adding timeout
    - setting a schedule
    (For all CI providers listed in the app)
2. GitHub actions branch protection
3. Other CI providers (environment variables set up) -->

<!-- Changes to existing

https://semgrep.dev/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#compatibility-of-environment-variables
-> maybe place these into sample CI configs? or separate thing entirely

-->
