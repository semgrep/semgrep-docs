---
slug: running-semgrep-ci-with-semgrep-app
append_help_link: true
description: "Run Semgrep CI with Semgrep App to manage findings and rules from a centralized dashboard as well as receive notifications in various channels."
title: Running Semgrep in CI with Semgrep App
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import CiScheduling from "/src/components/CiScheduling.mdx"
import CiIgnoringFiles from "/src/components/CiIgnoringFiles.mdx"
import DiffAwareScanning from "/src/components/DiffAwareScanning.mdx"

# Running Semgrep in continuous integration (CI) with Semgrep App

Run Semgrep in your continous integration (CI) pipeline to scan your repository for code vulnerabilities and other issues. Connect your CI pipeline with Semgrep App to:

* Block pull or merge requests (PRs or MRs) based on the rule that generated the finding.
* Scan many repositories and manage their findings in bulk.
* Ignore false-positive findings from noisy rules.
* Fork existing rules to create custom rules and add them to Semgrep App for scanning.

This guide explains how to connect your repository to Semgrep App to scan continuously.

:::info
* This guide's configuration and feature support are specific to Semgrep-App-connected CI jobs. Refer to [Running Semgrep in CI without Semgrep App](../running-semgrep-ci-without-semgrep-app) for stand-alone CI jobs.
* Semgrep 0.98.0 introduced changes to how certain CI providers fetch environment variables. Refer to the appendix at the end of this document for more information.
:::

The following video walks you through setting Semgrep in your CI through Semgrep App.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/ukIUM3j0gZY" frameborder="0" allowfullscreen></iframe>

## Feature support

Support for certain features of Semgrep App depend on your CI provider or source code management tool (SCM). The following table breaks down the features and their availability:

| Feature | GitHub | GitLab | BitBucket | CI provider support |
| ------- | -------- | ------- | -------- | ---------------- |
| **Diff-aware scanning** | ✅ Yes | ✅ Yes | ✅ Yes  | ✅ Available (may need additional set up) | 
| **Hyperlinks** | ✅ Yes | ✅ Yes | ✅ Yes  |  ✅ Available (may need additional set up) |
| **SCM security dashboard** |  ✅ GitHub Advanced Security Dashboard |  ✅ GitLab Security Dashboard | ❌ No | ❗ Only GitHub Actions and GitLab CI/CD |
| **PR or MR comments** |  ✅ Yes | ✅ Yes | ❌ No | ✅ CI provider agnostic; feature support is dependent on SCM |
*Table 1.* List of features and supported SCMs and CI providers.

<dl>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep App can scan only changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast and reduces finding duplication.</dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-app/notifications/#enabling-github-pull-request-comments">PR or MR comments</a> from Semgrep App on the lines of code that generated a finding.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep App collects findings in a Findings page. In this page, you can click on a finding to return to your SCM (Github, GitLab, or Bitbucket) to view the lines of code in your repository that generated the finding.</dd>
    <dt>SCM security dashboard</dt>
    <dd>Send Semgrep findings to your SCM's security dashboard.</dd>
</dl>

:::note
* Your code does not leave your environment and is not sent to Semgrep App servers.
* Semgrep App collects [**findings** data](docs/managing-findings/#semgrep-ci), which includes the line number of the code match, **not the code**. It is hashed using a one-way hashing function. Findings data is used to generate hyperlinks and support other Semgrep functions.
:::

## Setting up the CI job and Semgrep App connection

![Steps to run Semgrep in CI without Semgrep App](/img/semgrep-ci-overview-app.png "Steps to integrate Semgrep in CI with Semgrep App")

*Figure 1.* Steps to run Semgrep in CI with Semgrep App.

Refer to the succeeding sections for guidance specific to your CI provider.

### CI providers listed within Semgrep App (such as GitHub Actions, GitLab CI/CD, Jenkins)

This section applies to the following providers:

* GitHub Actions
* GitLab CI/CD
* Jenkins
* Bitbucket Pipelines
* CircleCI
* Buildkite
* Azure Pipelines

**In-app providers** are explicitly listed in Semgrep App, and Semgrep App is able to generate CI configuration files for you to commit into your repository.

![Screenshot of Projects page CI provider modal list](/img/semgrep-app-new-project-providers.png "Screenshot of Projects page CI provider modal list")

:::note
GitHub, GitLab, and BitBucket SCMs are compatible with the above CI providers, but steps and feature enablement may vary for **on-premise, self-hosted, or virtual private cloud (VPC) deployments**, such as GitHub Enterprise Server.
:::

To set up the CI job and connect with Semgrep App:

1. Sign in to [Semgrep App](https://semgrep.dev/login). See [Signing in to Semgrep App](/docs/semgrep-app/getting-started-with-semgrep-app/#signing-in-to-semgrep-app) for details on requested repository permissions and access.
2. Click **Projects > Scan New Project > Run Scan in CI**.
3. Select your provider from the menu.
4. Optional: Some providers may ask you to select your organization if applicable to your SCM tool.
5. Follow the steps outlined in the page:
    1. Optional: Additional permissions may be requested for Semgrep App to perform certain actions in your SCM tool, such as GitHub. If you prefer not to grant these permissions, Semgrep App provides alternative instructions in the **Don't want to install the app?** section within the page itself.
    2. Click **Create new API token**. This is your `SEMGREP_APP_TOKEN` environment variable.
    3. Click **Copy snippet**, then paste and commit the snippet into your configuration file (the filename is indicated in the page).
    4. Click **Check connection**. Semgrep App starts the scan.
7. After verifying that Semgrep App is able to scan the repository, you can [customize the CI job or Semgrep App configuration](#refining-the-semgrep-app-configuration).

#### Sample CI configuration snippets

Refer to the following table for links to sample CI configuration snippets:

| In-app CI provider   | Sample CI configuration snippet |
| :------------------- | :-----------------------------  |
| GitHub Actions       | 
| GitLab CI/CD         |
| Jenkins              |
| Bitbucket Pipelines  |
| CircleCI             |
| Buildkite            |
| Azure Pipelines      |


#### Setting up security dashboards for GitHub and GitLab

TODO
Refer to these sample configuration files to set up security dashboards for GitHub and GitLab.

<details><summary>GitHub: Sample `semgrep.yml` configuration file </summary>

</details>

<details><summary>GitLab: Sample `semgrep.yml` configuration file </summary>

</details>

### Other CI providers (environment variables setup)

Other CI providers, such as **Drone CI** and **AppVeyor**, can run Semgrep continuously and connect to Semgrep App through the use of environment variables provided in this document. The general steps are:

1. Create a CI job running Semgrep.
2. Create a `SEMGREP_APP_TOKEN` and add it as a credential, secret, or token into your CI provider and CI configuration file.
3. For GitHub repositories: Grant permissions for Semgrep App.
4. If the job does not start automatically, run the job by committing code or creating a PR or MR.
5. Semgrep detects the `SEMGREP_APP_TOKEN`, sends it to Semgrep App for verification, and if verified, findings are sent to Semgrep App.
6. Define additional environment variables to enable other Semgrep App features. This is done last because it is easier to set up and troubleshoot and CI jobs after verifying the CI job and connection to Semgrep App.

The next sections go over these steps in detail.

#### Create a CI job running Semgrep

There are two methods to adding Semgrep to your CI pipeline:

1. Add Semgrep to your CI pipeline. Do either of the following:
    1. Reference or add the [Semgrep Docker image](https://hub.docker.com/r/returntocorp/semgrep). This is the recommended method.
    2. Add `pip install semgrep` into your configuration file as a step or command, depending on your CI provider's syntax.
2. After adding Semgrep to your CI job, add `semgrep ci` as a step or command.

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

#### Create a `SEMGREP_APP_TOKEN` and set the environment variable in your CI configuration file

To create a `SEMGREP_APP_TOKEN`:
1. Sign in to Semgrep App.
2. Click **Settings > Tokens**.
3. Click **Create new token**.
4. Copy the name and value, then click **Update**.
5. Store the token value into your CI provider. Tokens can also be referred to as `secrets`, `credentials`, or `secure variables`. The steps to do this vary depending on your CI provider.
6. Add the `SEMGREP_APP_TOKEN` environment variable into your Semgrep CI job. Refer to your CI provider's documentation. You can also see the examples in [Create a CI job](#create-a-ci-job-running-semgrep).

#### Grant permissions for Semgrep App (GitHub repositories only)

Follow these steps for GitHub permissions access:

#### Run the job

Run the job by committing code if it does not start automatically.

#### Set the environment variables

Refer to the following section to set up environment variables.

## Refining the Semgrep App configuration

### Diff-aware scanning

:::tip
Diff-aware scanning is automatically enabled for all [CI providers listed in Semgrep App](#in-app-providers-such-as-github-actions-gitlab-cicd-jenkins).
:::

<DiffAwareScanning />

### Enabling hyperlinks to code

:::tip
Hyperlinks are automatically enabled for all [CI providers listed in Semgrep App](#in-app-providers-such-as-github-actions-gitlab-cicd-jenkins).
:::

Hyperlinks enable you to view the code that generated the finding from within your repository.

![Screenshot of findings page snippet with no hyperlinks](/img/findings-no-hyperlinks.png "Screenshot of findings page snippet with no hyperlinks")
*Figure 2.* Partial screenshot of findings page with no hyperlinks.

![Screenshot of findings page snippet with hyperlinks](/img/findings-with-hyperlinks.png "Screenshot of findings page snippet with hyperlinks")
*Figure 3.* Partial screenshot of findings page with hyperlinks.

To **enable hyperlinks**, the following environment variables must be added into your CI configuration file:

TODO make better examples
```
SEMGREP_REPO_NAME="foo/bar"
SEMGREP_REPO_URL="https://github.com/foo/bar"
SEMGREP_BRANCH="feature/add-new-bugs"
SEMGREP_JOB_URL="https://ci-server.com/jobs/1234"
SEMGREP_COMMIT="a52bc1ef"
SEMGREP_PR_ID="44"
```

### Receiving PR or MR comments

:::note
* Semgrep App does not support PR comments within BitBucket repositories.
:::

To receive PR or MR comments in your repository, follow the steps to enable hyperlinks. Verify that comments are sent by adding rules to your Rule Board's **Comment** column that can match code to generate a finding.

### Setting a timeout
To **set a timeout** for the Semgrep job, set the following: TODO

```
SEMGREP_TIMEOUT
```

### Customizing rules through the Rule Board

The Rule Board enables you to:

* Add or remove rules and rulesets that are used to scan your code.
* Block PRs or MRs, leave comments on code, or monitor findings silently.

### Setting a scan schedule

<CiScheduling />

### Ignoring files

<CiIgnoringFiles />

## Appendix: Compatibility of environment variables

Starting from Semgrep 0.98.0, Semgrep App can fetch values of environment variables for [In-App providers](#in-app-providers-such-as-github-actions-gitlab-cicd-jenkins). Therefore, not all CI providers need the same environment variables.

To help troubleshoot the features in this guide, ensure that you have updated your Semgrep installation and removed all unnecessary variables in your configuration file.

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
        <td>Establishes a connection to Semgrep App.</td>
        <td>Required to enable Semgrep App for all CI providers.</td>
    </tr>
    <tr>
        <td><code>SEMGREP_BASELINE_REF</code></td>
        <td>Enable diff-aware scanning.</td>
        <td>Required to enable diff-aware scanning for CI providers <em>except</em> GitHub Actions or GitLab CI/CD.</td>
    </tr>
    <tr>
        <td><code>SEMGREP_TIMEOUT</code></td>
        <td>Set the Semgrep job's timeout.</td>
        <td>Optional for all CI providers.</td></tr>
    <tr>
        <td><code>SEMGREP_REPO_NAME</code></td>
        <td rowspan="6">Enables hyperlinks and PR or MR comments.</td>
        <td rowspan="6">Required to enable hyperlinks and PR or MR comments for other CI providers not listed in Semgrep App.</td></tr>
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
    </tr>
</tbody>
</table>

## Appendix: Examples of other CI providers not listed in Semgrep App

The following CI providers have been texted by the community to run with Semgrep App:

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
