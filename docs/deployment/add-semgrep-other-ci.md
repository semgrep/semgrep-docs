---
slug: add-semgrep-to-other-ci-providers
title: Add Semgrep to other CI providers
hide_title: true
description: "Set up your CI pipeline manually with Semgrep AppSec Platform for centralized rule and findings management."
tags:
  - Deployment
---

import NextStepsComments from "/src/components/concept/_next-steps-comments.mdx"

# Add Semgrep manually to CI providers

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs).
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
- Optionally, you have [set up SSO](/deployment/sso).
:::

This guide walks you through creating a Semgrep job for CI providers for which Semgrep AppSec Platform has no explicit guidance. Without explicit guidance, you must manually make a CI configuration file yourself.

Check [<i class="fa-regular fa-file-lines"></i> Add Semgrep to CI](/deployment/add-semgrep-to-ci/#guided-setup-for-ci-providers-in-semgrep-appsec-platform) first to ensure that this guide applies to your CI provider.

Skip this guide if you have already configured a CI job.

The steps provided here are known to work with the following CI providers:

* AppVeyor
* Bamboo
* Bitrise
* Buildbot
* Codeship
* Codefresh
* Drone CI
* Nomad
* TeamCity CI
* Travis CI

## General steps

The following steps provide an overview of the process. View the succeeding sections for detailed instructions.

1. Create a `SEMGREP_APP_TOKEN`.
1. Add this token as a credential, secret, or token into your CI provider.
1. Create a CI job that runs Semgrep; this step is typically achieved by committing a CI configuration file. The syntax of the configuration file depends on your CI provider..
1. The CI job can automatically start to run depending on your configuration. If the job does not start, run the job through the CI provider's interface or by committing code.
1. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep AppSec Platform for verification, and if verified, findings are sent to Semgrep AppSec Platform.
1. Define additional environment variables to enable other Semgrep AppSec Platform features. This is done last because it is easier to troubleshoot modifications to jobs after ensuring that the base CI job runs correctly.

The next sections go over these steps in detail.

### Create a SEMGREP_APP_TOKEN

To create a `SEMGREP_APP_TOKEN`, follow these steps:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Click **[<i class="fa-solid fa-gear"></i> Settings](https://semgrep.dev/orgs/-/settings/tokens)** > **Tokens**.
3. Click **Create new token**.
4. Copy the name and value, then click **Save**.
5. Store the token value into your CI provider. Tokens can also be referred to as `secrets`, `credentials`, or `secure variables`. The steps to do this vary depending on your CI provider.

### Create a Semgrep CI job

1. Add Semgrep to your CI pipeline. Do either of the following:
    1. Reference or add the [Semgrep Docker image](https://hub.docker.com/r/semgrep/semgrep). This is the recommended method.
    2. Add `pip install semgrep` into your configuration file as a step or command, depending on your CI provider's syntax.
2. Add `semgrep ci` as a step or command.
3. Set the `SEMGREP_APP_TOKEN` environment variable within your configuration file.

The following example is a `bitbucket-pipelines.yml` file that adds Semgrep through the Docker image:

<details>
  <summary>Add Semgrep through the Docker image.</summary>

```yaml
image: atlassian/default-image:latest

pipelines:
  default:
    - parallel:
      - step:
        name: 'Run Semgrep scan with current branch'
        deployment: dev
        # Reference the Semgrep Docker image:
        image: semgrep/semgrep
        script:
        # You need to set the token as an environment variable
        # (see Create a `SEMGREP_APP_TOKEN` section).
          - export $SEMGREP_APP_TOKEN
          # Run semgrep ci:
          - semgrep ci
```

</details>

The next example is a `Jenkinsfile` configuration that adds Semgrep by installing it:

<details>
  <summary>Add Semgrep by installing it.</summary>

```javascript
pipeline {
  agent any
  stages {
    stage('Semgrep-Scan') {
        environment {
          // You need to set the token as an environment variable
          // (see Create a `SEMGREP_APP_TOKEN` section).
          SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
        }
      steps {
        // Install and run Semgrep:
        sh 'pip3 install semgrep'
        sh 'semgrep ci'
      }
    }
  }
}
```

</details>

### Run the job

Depending on your CI provider and configuration, the job runs automatically. Otherwise, trigger the job by committing code or opening a PR or MR.

### Verify the connection

To verify that your Semgrep CI job is connected to Semgrep AppSec Platform:

1. Go to your Semgrep AppSec Platform [Projects page](https://semgrep.dev/orgs/-/projects).
2. Verify that your repository is listed on the Projects page and that Semgrep AppSec Platform is running a scan.

### Troubleshoot your CI job

Semgrep attempts to automatically detect certain CI values, such as your repository's name and URL. These values are used to provide context to findings in Semgrep AppSec Platform and hyperlinks to the code that generated the finding.

Refer to the following table for common issues and the corresponding environment variables you can set to fix them:

<table>
<thead>
    <tr>
        <th>Issue</th>
        <th>Environment variable to set</th>
        <th>Affected CI providers</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Can't establish a connection to Semgrep AppSec Platform.</td>
        <td><code>SEMGREP_APP_TOKEN</code></td>
        <td>Must be set for all CI providers.</td>
    </tr>
    <tr>
        <td>Semgrep doesn't scan your PRs or MRs.</td>
        <td><code>SEMGREP_BASELINE_REF</code></td>
        <td>Required for CI providers <strong>except</strong> GitHub Actions or GitLab CI/CD.</td>
    </tr>
        <td rowspan="6">Can't click hyperlinks to your repository from Semgrep AppSec Platform, nor can Semgrep AppSec Platform create PR or MR comments.</td>
        <td><code>SEMGREP_REPO_NAME</code></td>
        <td rowspan="5">Set these environment variables as needed to troubleshoot broken links for any CI provider <strong>except</strong> GitHub Actions and GitLab CI/CD.</td>
    <tr>
        <td><code>SEMGREP_REPO_URL</code></td>
    </tr>
    <tr>
        <td><code>SEMGREP_BRANCH</code></td>
    </tr>
    <tr>
        <td><code>SEMGREP_JOB_URL</code></td>
    </tr>
    <tr>
        <td><code>SEMGREP_COMMIT</code></td>
    </tr>
    <tr>
        <td><code>SEMGREP_PR_ID</code></td>
        <td>Required to enable hyperlinks for <strong>Azure Pipelines</strong>.</td>
    </tr>
</tbody>
</table>

## Data collected by Semgrep AppSec Platform

When running in CI, Semgrep runs fully in the CI build environment. Unless you have explicitly granted code access to Semgrep, your code is not sent anywhere.

- Semgrep AppSec Platform collects [findings data](/semgrep-ci/findings-ci), which includes the line number of the code match, but not the code. It is hashed using a one-way hashing function.
- Findings data is used to generate line-specific hyperlinks to your source code management system and support other Semgrep functions.

## Next steps

<NextStepsComments opening_phrase="Set up diff-aware scanning for"/>
