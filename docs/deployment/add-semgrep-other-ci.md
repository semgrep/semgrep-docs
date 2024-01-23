---
slug: add-semgrep-to-other-ci-providers
title: Add Semgrep to other CI providers
hide_title: true
description: "Set up your CI pipeline manually with Semgrep Cloud Platform for centralized rule and findings management."
tags:
  - Deployment
---

import NextStepsComments from "/src/components/concept/_next-steps-comments.mdx"

# Add Semgrep to other CI providers

:::note Your deployment journey
- You have [<i class="fa-regular fa-file-lines"></i> created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [<i class="fa-regular fa-file-lines"></i> connected your source code manager](/deployment/connect-scm).
- Optionally, you have [<i class="fa-regular fa-file-lines"></i> set up SSO](/deployment/sso).
:::

This guide walks you through creating a Semgrep job for CI providers that are **not** listed in Semgrep Cloud Platform (SCP). Skip this guide if you have already configured a CI job.

This method is known to work with the following CI providers:

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

The general steps are:

1. Create a `SEMGREP_APP_TOKEN`.
1. Add this token as a credential, secret, or token into your CI provider and CI configuration file.
1. For GitHub repositories: Grant permissions for [Semgrep Cloud Platform](https://github.com/marketplace/semgrep-dev).
1. Create a CI job running Semgrep and commit the updated configuration file.
1. The CI job starts automatically depending on your configuration and CI provider. If the job does not start, run the job by committing code or creating a pull request (PR) or merge request (MR).
1. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep Cloud Platform for verification, and if verified, findings are sent to Semgrep Cloud Platform.
1. Define additional environment variables to enable other Semgrep Cloud Platform features. This is done last because it is easier to set up and troubleshoot CI jobs after ensuring that the CI job runs correctly.

The next sections go over these steps in detail.

### Create a SEMGREP_APP_TOKEN

To create a `SEMGREP_APP_TOKEN`, follow these steps:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Settings](https://semgrep.dev/orgs/-/settings/tokens)** > **Tokens**.
3. Click **Create new token**.
4. Copy the name and value, then click **Update**.
5. Store the token value into your CI provider. Tokens can also be referred to as `secrets`, `credentials`, or `secure variables`. The steps to do this vary depending on your CI provider.
6. Add the `SEMGREP_APP_TOKEN` environment variable into your Semgrep CI job. Refer to your CI provider's documentation for the correct syntax. You can also see the examples in [Create a CI job](#creating-a-ci-job-running-semgrep).

### GitHub repositories: Grant permissions for SCP

:::tip
Perform these steps before committing your CI job configuration to ensure that Semgrep Cloud Platform has the necessary permissions to scan your code.
:::

Follow these steps for GitHub permissions access:

1. Go to the [Semgrep application](https://github.com/marketplace/semgrep-dev) within GitHub Marketplace.
2. Click on **Install it for free**. Follow the instructions to begin the installation.
2. Once `semgrep-app` is installed, select what repositories `semgrep-app` can access. Select **All repositories** or **Only select repositories**.
![Screenshot of GitHub authorization page for Semgrep App](/img/semgrep-ci-github-access-repos.png "Screenshot of GitHub authorization page for Semgrep App")
4. Click **Install & Authorize** to finalize your installation.

### Create a Semgrep CI job

1. Add Semgrep to your CI pipeline. Do either of the following:
    1. Reference or add the [Semgrep Docker image](https://hub.docker.com/r/returntocorp/semgrep). This is the recommended method.
    2. Add `pip install semgrep` into your configuration file as a step or command, depending on your CI provider's syntax.
2. Add `semgrep ci` as a step or command.
3. Set the `SEMGREP_APP_TOKEN` environment variable within your configuration file.

The following example is a `bitbucket-pipelines.yml` file that adds Semgrep through the Docker image:

<details><summary>Add Semgrep through the Docker image.</summary>

```yaml
image: atlassian/default-image:latest

pipelines:
  default:
    - parallel:
      - step:
        name: 'Run Semgrep scan with current branch'
        deployment: dev
        # Reference the Semgrep Docker image:
        image: returntocorp/semgrep
        script:
        # You need to set the token as an environment variable 
        # (see Create a `SEMGREP_APP_TOKEN` section).
          - export $SEMGREP_APP_TOKEN
          # Run semgrep ci:
          - semgrep ci
```

</details>

The next example is a `Jenkinsfile` configuration that adds Semgrep by installing it:

<details><summary>Add Semgrep by installing it.</summary>

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

To verify that your Semgrep CI job is connected to Semgrep Cloud Platform:

1. Go to your Semgrep Cloud Platform [Projects page](https://semgrep.dev/orgs/-/projects).
2. Verify that your repository is listed on the Projects page and that Semgrep Cloud Platform is running a scan.

## Next steps

<NextStepsComments />
