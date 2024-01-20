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

# Add Semgrep to CI/CD

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

If your provider is not on this list, you can still integrate Semgrep into your CI by following the steps in [<i class="fa-regular fa-file-lines"></i> ] Add Semgrep to other CI providers tk link.

## Add a Semgrep job through Semgrep Cloud Platform

<PlatformAddRepo />

#### Detecting GitHub repositories

<PlatformDetectGhRepos />


## Next steps

Set up PR comments

<!-- After setting up PR comments:

1. Configure SCA scans
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
