---
slug: running-semgrep-ci-with-semgrep-cloud-platform
append_help_link: true
description: "Set up your CI pipeline with Semgrep Cloud Platform for centralized rule and findings management."
tags:
    - Semgrep in CI
    - Community Tier
    - Team & Enterprise Tier
title: Running Semgrep in CI with Semgrep Cloud Platform
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import CiIgnoringFiles from "/src/components/reference/_ci-ignoring-files.mdx"
import DiffAwareScanning from "/src/components/reference/_diff-aware-scanning.mdx"
import RuleBoard from "/src/components/reference/_rule-board.md"
import ScmFeatureReference from "/src/components/reference/_scm-feature-reference.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Running Semgrep in continuous integration (CI) with Semgrep Cloud Platform

Run Semgrep in your continous integration (CI) pipeline to scan your repository for code vulnerabilities and other issues. Connect your CI pipeline with Semgrep Cloud Platform to:

* Block pull or merge requests (PRs or MRs) based on the rule that generated the finding.
* Scan many repositories and manage their findings in bulk.
* Ignore false-positive findings from noisy rules.
* Fork existing rules to create custom rules and add them to Semgrep Cloud Platform for scanning.

This guide explains how to connect your repository to Semgrep Cloud Platform (SCP) to scan continuously.

:::info
* This guide's configuration and feature support are specific to SCP-connected CI jobs. Refer to [Running Semgrep in CI without Semgrep Cloud Platform](../running-semgrep-ci-without-semgrep-cloud-platform) for stand-alone CI jobs.
* Semgrep 0.98.0 introduced changes to how certain CI providers fetch environment variables. Refer to the appendix at the end of this document for more information.
* Semgrep Cloud Platform creates a SAST (Static Application Security Testing) job by default. To run dependency scans exclusively, refer to [Sample CI configurations](semgrep-ci/sample-ci-configs).
:::

The following video walks you through setting Semgrep in your CI through Semgrep Cloud Platform.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/BqU7P84ZaUc" frameborder="0" allowfullscreen></iframe>

## Semgrep Cloud Platform feature support

Support for certain features of Semgrep Cloud Platform may depend on your CI provider, source code management tool (SCM), or both. The following table breaks down the features and their availability:

<ScmFeatureReference />

:::note
* Your code does not leave your environment and is not sent to Semgrep Cloud Platform servers.
* Semgrep Cloud Platform collects [**findings** data](/docs/managing-findings/#semgrep-ci), which includes the line number of the code match, **not the code**. It is hashed using a one-way hashing function. Findings data is used to generate hyperlinks and support other Semgrep functions.
:::

## Setting up the CI job and Semgrep Cloud Platform connection

![Steps to run Semgrep in CI without Semgrep Cloud Platform](/img/semgrep-ci-overview-app.png "Steps to integrate Semgrep in CI with Semgrep Cloud Platform")
*Figure 1.* Steps to run Semgrep in CI with Semgrep Cloud Platform.

The next sections provide guidance for specific CI providers.

### CI providers listed in Semgrep Cloud Platform

This section applies to the following providers:

* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite
* Azure Pipelines

**In-app providers** are explicitly listed in Semgrep Cloud Platform, and Semgrep Cloud Platform can generate CI configuration files to commit in your repository.

![Screenshot of Projects page CI provider modal list](/img/semgrep-app-new-project-providers.png "Screenshot of Projects page CI provider modal list")

:::note
GitHub, GitLab, and BitBucket SCMs are compatible with the above mentioned CI providers, but steps and feature enablement may vary for **on-premise, self-hosted, or virtual private cloud (VPC) deployments**, such as GitHub Enterprise Server.
:::

To set up the CI job and connect with Semgrep Cloud Platform:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login). See [Signing in to Semgrep Cloud Platform](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) for details on requested repository permissions and access.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)** > **Scan New Project** > **Run Scan in CI**.
3. Select your CI provider from the menu.
4. Optional: Some providers can ask you to select your organization if applicable to your SCM tool.
5. Follow the steps outlined in the page:
    1. Optional: Additional permissions may be requested for Semgrep Cloud Platform to perform certain actions in your SCM tool, such as GitHub. If you prefer not to grant these permissions, Semgrep Cloud Platform provides alternative instructions in the **Don't want to install the app?** section within the page itself.
    2. Click **Create new API token**. This is your `SEMGREP_APP_TOKEN` environment variable.
    3. Click **Copy snippet**, then paste and commit the snippet into your configuration file (the filename is indicated in the page).
    4. Click **Check connection**. Semgrep Cloud Platform starts the scan.
7. After verifying that Semgrep Cloud Platform is able to scan the repository, you can [customize the CI job or Semgrep Cloud Platform configuration](#configuring-the-semgrep-cloud-platform-ci-job).

#### Sample CI configuration snippets

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


#### Setting up security dashboards for GitHub and GitLab

Refer to the following sample configurations to set up security dashboards for GitHub and GitLab.

<details><summary>GitHub: Sample <code>semgrep.yml</code> configuration file </summary>

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep

on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}

jobs:
  semgrep:
    # User definable name of this GitHub Actions job:
    name: Scan
    # Only change the if you are self-hosting. See also:
    # If you are self-hosting, change the following `runs-on` value: 
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: returntocorp/semgrep

    # To skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      - uses: actions/checkout@v3
      - run: semgrep scan --sarif --output=semgrep.sarif --config=policy
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
      - name: Upload SARIF file for GitHub Advanced Security Dashboard
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: semgrep.sarif
        if: always()
```
</details>

<details><summary>GitLab: Sample <code>.gitlab-ci.yml</code> configuration snippet</summary>

```yaml
semgrep:
  # A Docker image with Semgrep installed.
  image: returntocorp/semgrep

  rules:
    # Scan changed files in MRs (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
    # Scan all files on the default branch and report any findings:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  variables:
    # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable. 
    SEMGREP_RULES: p/default # See more rules at semgrep.dev/explore.
    # Uncomment SEMGREP_TIMEOUT to set this job's timeout (in seconds):
    # Default timeout is 1800 seconds (30 minutes).
    # Set to 0 to disable the timeout.
    # SEMGREP_TIMEOUT: 300
    # Upload findings to GitLab SAST Dashboard
    SEMGREP_GITLAB_JSON: "1"
    script: semgrep ci --gitlab-sast > gl-sast-report.json || true
    artifacts:
      reports:
        sast: gl-sast-report.json

```

</details>

### Other CI providers (environment variables setup)

Other CI providers, such as **Drone CI** and **AppVeyor**, can run Semgrep continuously and connect to Semgrep Cloud Platform through the use of environment variables provided in this document. The general steps are:

1. Create a `SEMGREP_APP_TOKEN`.
2. Add this token as a credential, secret, or token into your CI provider and CI configuration file.
2. For GitHub repositories: Grant permissions for [Semgrep Cloud Platform](https://github.com/marketplace/semgrep-dev).
3. Create a CI job running Semgrep and commit the updated configuration file.
4. The CI job starts automatically depending on your configuration and CI provider. If the job does not start, run the job by committing code or creating a pull request (PR) or merge request (MR).
5. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep Cloud Platform for verification, and if verified, findings are sent to Semgrep Cloud Platform.
6. Define additional environment variables to enable other Semgrep Cloud Platform features. This is done last because it is easier to set up and troubleshoot CI jobs after ensuring that the CI job runs correctly.

The next sections go over these steps in detail.

#### Creating a SEMGREP_APP_TOKEN

To create a `SEMGREP_APP_TOKEN`, follow these steps:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Settings](https://semgrep.dev/orgs/-/settings/tokens)** > **Tokens**.
3. Click **Create new token**.
4. Copy the name and value, then click **Update**.
5. Store the token value into your CI provider. Tokens can also be referred to as `secrets`, `credentials`, or `secure variables`. The steps to do this vary depending on your CI provider.
6. Add the `SEMGREP_APP_TOKEN` environment variable into your Semgrep CI job. Refer to your CI provider's documentation for the correct syntax. You can also see the examples in [Create a CI job](#creating-a-ci-job-running-semgrep).

#### Granting permissions for Semgrep Cloud Platform (GitHub repositories only)

:::tip
Perform these steps before committing your CI job configuration to ensure that Semgrep Cloud Platform has the necessary permissions to scan your code.
:::

Follow these steps for GitHub permissions access:

1. Go to the [Semgrep application](https://github.com/marketplace/semgrep-dev) within GitHub Marketplace.
2. Click on **Install it for free**. Follow the instructions to begin the installation.
2. Once `semgrep-app` is installed, select what repositories `semgrep-app` can access. Select **All repositories** or **Only select repositories**.
![Screenshot of GitHub authorization page for Semgrep App](/img/semgrep-ci-github-access-repos.png "Screenshot of GitHub authorization page for Semgrep App")
4. Click **Install & Authorize** to finalize your installation.

#### Creating a CI job running Semgrep

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

#### Running the job

Depending on your CI provider and configuration, the job runs automatically. Otherwise, trigger the job by committing code or opening a PR or MR.

#### Verifying the connection between your CI job and Semgrep Cloud Platform 

To verify that your Semgrep CI job is connected to Semgrep Cloud Platform:

1. Go to your Semgrep Cloud Platform [Projects page](https://semgrep.dev/orgs/-/projects).
2. Verify that your repository is listed on the Projects page and that Semgrep Cloud Platform is running a scan.

Refer to the following section to set up additional environment variables.

## Configuring the Semgrep Cloud Platform CI job

### Diff-aware scanning

<DiffAwareScanning />

### Enabling hyperlinks to code

:::tip
Hyperlinks are automatically enabled for all [CI providers listed in Semgrep Cloud Platform](#ci-providers-listed-in-semgrep-cloud-platform).
:::

Hyperlinks enable you to view the code that generated the finding from within your repository.

![Screenshot of findings page snippet with no hyperlinks](/img/findings-no-hyperlinks.png "Screenshot of findings page snippet with no hyperlinks")
*Figure 2.* Partial screenshot of findings page with no hyperlinks.

![Screenshot of findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Screenshot of findings page snippet with hyperlinks")
*Figure 3.* Partial screenshot of findings page with hyperlinks.

To **enable hyperlinks**, additional environment variables must be added into your CI configuration file. The following example provides sample values that the environment variables accept. You can substitute these values with variables following your CI provider's syntax.

```sh
SEMGREP_REPO_NAME="foo/bar"
SEMGREP_REPO_URL="https://github.com/foo/bar"
SEMGREP_BRANCH="feature/add-new-bugs"
SEMGREP_JOB_URL="https://ci-server.com/jobs/1234"
SEMGREP_COMMIT="a52bc1ef"
SEMGREP_PR_ID="44"
```

### Receiving PR or MR comments

To receive PR or MR comments in your repository, follow the steps to enable hyperlinks. Verify that comments are sent by adding rules to your Rule Board's **Comment** or **Block** columns that can match code to generate a finding. To configure PR or MR comments, review [Alerts and notifications](/semgrep-code/notifications/) documentation.

:::info
Only rules in the **Comment** and **Block** columns of your [Rule board](https://semgrep.dev/orgs/-/board) create the PR or MR comments. Rules from the **Block** column also block the PR or MR pipeline. To unblock the pipeline, the detected code needs to be fixed.
:::

### Setting a custom timeout

By default, Semgrep times out after 30 minutes. To **set a custom timeout** for the Semgrep job, set the `SEMGREP_TIMEOUT` environment variable in seconds. For example:

```sh
SEMGREP_TIMEOUT="300"
```

### Customizing rules through the Rule Board

<RuleBoard />

### Setting a scan schedule

<CiScheduling />

### Ignoring files

<CiIgnoringFiles />

## Appendix

### Compatibility of environment variables

Starting from Semgrep 0.98.0, Semgrep Cloud Platform can fetch values of environment variables for [CI providers listed in Semgrep Cloud Platform](#ci-providers-listed-in-semgrep-cloud-platform). Therefore, not all CI providers need the same environment variables.

To help troubleshoot the features in this guide, ensure that you have updated your Semgrep installation.

<table>
<thead>
    <tr>
        <th>Environment variable</th>
        <th>Function</th>
        <th>Affected CI providers</th>
    </tr>
</thead>
<tbody>
    <tr><td><code>SEMGREP_APP_TOKEN</code></td>
        <td>Establishes a connection to Semgrep Cloud Platform.</td>
        <td>Required to enable Semgrep Cloud Platform for all CI providers.</td>
    </tr>
    <tr>
        <td><code>SEMGREP_BASELINE_REF</code></td>
        <td>Enable diff-aware scanning.</td>
        <td>Required to enable diff-aware scanning for CI providers <strong>except</strong> GitHub Actions or GitLab CI/CD.</td>
    </tr>
    <tr>
        <td><code>SEMGREP_TIMEOUT</code></td>
        <td>Set the Semgrep job's timeout.</td>
        <td>Optional for all CI providers.</td></tr>
    <tr>
        <td><code>SEMGREP_REPO_NAME</code></td>
        <td rowspan="6">Enables hyperlinks to your codebase from Semgrep Cloud Platform and the creation of PR or MR comments.</td>
        <td rowspan="5">Set these environment variables as needed to troubleshoot broken links for any CI provider <strong>except</strong> GitHub Actions and GitLab CI/CD.</td></tr>
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
        <td>Required to enable hyperlinks and PR or MR comments for Azure Pipelines.</td>
    </tr>
</tbody>
</table>

### Examples of other CI providers not listed in Semgrep Cloud Platform

The following CI providers have been tested by the community to run with Semgrep Cloud Platform:

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

<MoreHelp />
