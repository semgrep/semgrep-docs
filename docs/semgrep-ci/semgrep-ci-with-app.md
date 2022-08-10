---
slug: semgrep-ci-with-app
append_help_link: true
description: ""
title: Running Semgrep in CI with Semgrep App
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

## Feature support

Certain features of Semgrep App are dependent on your SCM and CI provider.

Features dependent on your CI provider include:
<dl>
    <dt>Diff-aware scanning.</dt>
    <dt>Hyperlinks to code that generated the finding.</dt>
    <dt>SCM security dashboard.</dt>
</dl>



TODO table summarizing support

| Feature | Level of support |
| ------- | -------- |
| Diff-aware scanning | Available | 
| Hyperlinks | Available |
| SCM security dashboard | Available |
*Table 1. Features and support levels for GitHub Actions and GitLab CI/CD*

## Setting up the CI job and Semgrep App connection

The following video walks you through setting Semgrep in your CI through Semgrep App.

[TODO embed video]

Refer to the remaining sections for guidance specific to your CI provider.

### In-App Providers (such as GitHub Actions, GitLab CI/CD, Jenkins)

This section applies to the following providers:

* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite

These providers are explicitly listed in Semgrep App, and Semgrep App is able to generate CI configuration files for you to commit into your repository.

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

Other CI providers can run Semgrep continuously and connect to Semgrep App through the use of environment variables provided in this document. The general steps are:

1. Create a CI job running Semgrep.
2. Create a `SEMGREP_APP_TOKEN` and add it as a credential, secret, or token into your CI provider.
3. Grant permissions for Semgrep App from your source code management (SCM) tool, such as GitHub or GitLab.
4. Run the job. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep App for verification, and if verified, findings are sent to Semgrep App.
5. Optional: Define additional environment variables to enable other Semgrep App features, such as hyperlinks to the code that generated the finding. This is done last because it is easier to set up and troubleshoot and CI jobs after verifying the CI job and connection to Semgrep App.

#### Step 1: Create a CI job running Semgrep

There are two methods to adding Semgrep to your CI pipeline:

1. Add Semgrep to your CI pipeline. Do either of the following:
    1. Reference or add the [Semgrep Docker image](https://hub.docker.com/r/returntocorp/semgrep). This is the recommended method.
    2. Add `pip install semgrep` into your configuration file as a step or command, depending on your CI provider's syntax.
2. After adding Semgrep to your CI job, add `semgrep ci` as a step or command.

The following example is a `bitbucket-pipelines.yml` file that adds Semgrep through the Docker image:

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
          - semgrep ci
```

The next example is a `Jenkinsfile` configuration that adds Semgrep by installing it:

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

#### Step 2: Create a `SEMGREP_APP_TOKEN`

#### Step 3: Grant permissions for Semgrep App from your SCM (GitHub or GitLab)

GitHub and GitLab can receive PR or MR comments from Semgrep App. To do this, Semgrep App must have certain permissions within your SCM. 



#### Step 4: Run the job


## Refining the CI job 

The following 

## Refining the Semgrep App configuration

### Blocking PRs or MRs through the Rule board

### Setting a scan schedule

<CiScheduling />

### Customizing rules and rulesets

### Ignoring files



