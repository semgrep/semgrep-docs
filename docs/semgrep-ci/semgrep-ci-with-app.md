---
slug: semgrep-ci-with-app
append_help_link: true
description: ""
title: Running Semgrep in CI with Semgrep App
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import CiScheduling from "/src/components/CiScheduling.mdx"

# Running Semgrep in continuous integration (CI) with Semgrep App

Run Semgrep in your continous integration (CI) pipeline to scan your repository for code vulnerabilities and other issues. Connect your CI pipeline with Semgrep App to:

* Block pull or merge requests (PRs or MRs) based on the rule that generated the finding.
* Scan many repositories and manage their findings in bulk.
* Triage (ignore) false-positive findings from low-performing rules.
* Fork existing rules to create custom rules and add them to Semgrep App for scanning.

This guide explains how to connect your repository to Semgrep App to scan continuously.

![Steps to run Semgrep in CI without Semgrep App](/img/semgrep-ci-overview-app.png "Steps to integrate Semgrep in CI with Semgrep App")
*Figure 1. Steps to run Semgrep in CI with Semgrep App.*

## Feature support

Support for certain features of Semgrep App depend on your CI provider or source code management tool (SCM). Some of these features may be supported automatically or require more configuration. The following tables break down the features and their availability depending on CI provider or SCM.

<dl>
    <dt>Diff-aware scanning</dt>
    <dd></dd>
    <dt>Hyperlinks to code that generated the finding</dt>
    <dd></dd>
    <dt>SCM security dashboard</dt>
    <dd></dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd></dd>
</dl>

| Feature | GitHub | GitLab | BitBucket | CI Provider support |
| ------- | -------- | ------- | -------- | ---------------- |
| **Diff-aware scanning** | ✅ Yes | ✅ Yes | ✅ Yes  | ✅ Available (may need additional set up) | 
| **Hyperlinks** | ✅ Yes | ✅ Yes | ✅ Yes  |  ✅ Available (may need additional set up) |
| **SCM security dashboard** |  ✅ GitHub Advanced Security Dashboard |  ✅ GitLab SAST Dashboard | ❌ No | ❗ Only GitHub Actions and GitLab CI/CD |
| **PR or MR comments** |  ✅ Yes | ✅ Yes | ❌ No | ✅ CI provider agnostic; feature support is dependent on SCM |
*Table 1. List of features and supported SCMs and CI providers.*


## Setting up the CI job and Semgrep App connection

The following video walks you through setting Semgrep in your CI through Semgrep App.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/ukIUM3j0gZY" frameborder="0" allowfullscreen></iframe>

Refer to the succeeding sections for guidance specific to your CI provider.

### In-App Providers (such as GitHub Actions, GitLab CI/CD, Jenkins)

This section applies to the following providers:

* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite

These providers are explicitly listed in Semgrep App, and Semgrep App is able to generate CI configuration files for you to commit into your repository.

:::note
Any SCM (such as GitHub or GitLab) should work with the above CI providers, but steps and feature enablement may vary for on-premise or virtual private cloud (VPC) deployments.
:::


To set up the CI job and connect with Semgrep App:

1. Sign in to [Semgrep App](https://semgrep.dev/login). See [Signing in to Semgrep App](/docs/semgrep-app/getting-started-with-semgrep-app/#signing-in-to-semgrep-app) for details on requested permissions and repository access.
2. Click **Projects > Scan New Project > Run Scan in CI**.
3. Select your provider from the menu.
4. Optional: Some providers may ask you to select your organization within your source code management (SCM) tool.
5. Follow the steps outlined in the page:
    1. Optional: Additional permissions may be requested for Semgrep App to perform certain actions in your SCM tool, such as GitHub. If you prefer not to grant these permissions, Semgrep App provides alternative instructions in the **Don't want to install the app?** section within the page itself.
    2. Click **Create new API token**. This is your `SEMGREP_APP_TOKEN` environment variable.
    3. Click **Copy snippet**, then paste and commit the snippet into your configuration file (the filename is indicated in the page).
    4. Click **Check connection**. Semgrep App starts the scan.
7. After verifying that Semgrep App is able to scan the repository, you can customize the CI job or Semgrep App configuration.


### Other CI providers (supported through environment variables)

Other CI providers, such as **Drone CI** and **AppVeyor**, can run Semgrep continuously and connect to Semgrep App through the use of environment variables provided in this document. The general steps are:

1. Create a CI job running Semgrep.
2. Create a `SEMGREP_APP_TOKEN` and add it as a credential, secret, or token into your CI provider.
3. Grant permissions for Semgrep App from your source code management (SCM) tool, such as GitHub or GitLab.
4. Run the job by pushing (merging) a file or creating a PR or MR. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep App for verification, and if verified, findings are sent to Semgrep App.
5. Optional: Define additional environment variables to enable other Semgrep App features, such as hyperlinks to the code that generated the finding. This is done last because it is easier to set up and troubleshoot and CI jobs after verifying the CI job and connection to Semgrep App.

#### Create a CI job running Semgrep

There are two methods to adding Semgrep to your CI pipeline:

1. Add Semgrep to your CI pipeline. Do either of the following:
    1. Reference or add the [Semgrep Docker image](https://hub.docker.com/r/returntocorp/semgrep). This is the recommended method.
    2. Add `pip install semgrep` into your configuration file as a step or command, depending on your CI provider's syntax.
2. After adding Semgrep to your CI job, add `semgrep ci` as a step or command.

The following example is a `bitbucket-pipelines.yml` file that adds Semgrep through the Docker image:

<details><summary>Add Semgrep through the Docker image</summary>

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
          - export $SEMGREP_APP_TOKEN
          # Run semgrep ci:
          - semgrep ci
```

</details>

The next example is a `Jenkinsfile` configuration that adds Semgrep by installing it:

<details><summary>Add Semgrep by installing it</summary>

```javascript
pipeline {
  agent any
  stages {
    stage('Semgrep-Scan') {
        environment { 
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

#### Create a `SEMGREP_APP_TOKEN`

1. Sign in to Semgrep App.
2. Click Settings > Tokens.
3. 

#### Grant permissions for Semgrep App from your SCM (GitHub or GitLab)

GitHub and GitLab can receive PR or MR comments from Semgrep App. To do this, Semgrep App must have certain permissions within your SCM. 

1.

#### Run the job



## Refining the CI job 

The following 

## Refining the Semgrep App configuration

### Blocking PRs or MRs through the Rule board

### Setting a scan schedule

<CiScheduling />

### Customizing rules and rulesets

### Ignoring files

## Appendix: Compatibility of environment variables

Semgrep App can fetch values of environment variables for [In-App providers](#in-app-providers-such-as-github-actions-gitlab-cicd-jenkins). For this reason, not all CI providers make use of the same environment variables.

| Environment variable |
| -------- |
| 



