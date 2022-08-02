---
slug: manual-ci-setup
append_help_link: true
title: Manually integrating Semgrep in various CI providers
description: ""
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

# Manually integrating Semgrep in various Continuous Integration providers

Run Semgrep in your CI pipeline to scan your repository for code vulnerabilities and other issues.

There are two general steps to setting up Semgrep in your CI pipeline manually:

1. Set up the CI job or action to scan with Semgrep and receive an exit code.
2. Refine the CI job's parameters.

<!-- ![Steps to integrate Semgrep in CI manually](images/image1.png "image_tooltip") -->
*Figure 1. Steps to integrate Semgrep in CI manually.*

This guide defines a job or CI job as a script executed within a certain environment and managed by a CI provider.

By refining a job's parameters, you are able to achieve the following goals:

* **Run Semgrep on a schedule.** Run full scans on mainline branches at the least intrusive time on developer teams.
* **Run Semgrep with custom rules.** Apply rules specific to your organization's business goals and coding conventions.
* **Run Semgrep when an event triggers.** Run Semgrep when a pull or merge request (PR or MR) is created. These event triggers or event hooks are dependent on your CI provider. 
* **Run Semgrep on relevant files and blocks of code.** Configure Semgrep to ignore files and folders such as test files, configuration files, and files from other vendors.
* **Pass a Semgrep CI job even when scans report findings.** By default, manual configurations fail when any finding is detected. Configure Semgrep to pass CI jobs even when findings are reported (a **fail open** state).

## Limitations of manually configured Semgrep CI scans 

* Findings are not tiered based on severity and actions cannot be undertaken based on severity. This means that either any finding will cause the job to fail, or any finding still allows the job to pass.
* Findings are dumped to a log and are not tracked over time, so there is no record of a finding's state, such as opened, closed, or ignored.

## Setting up the CI job

### Introduction

 `semgrep ci` is the command used to run Semgrep in a CI environment. In most cases, this is the recommended command to run in the CI job. It is a subset of the `semgrep scan` command. Features of this command include:
 
 * `semgrep ci` is git-aware. This means it is able to detect branches and git states. 
 * `semgrep ci` makes use of environment variables to configure its behavior. 
 * `semgrep ci` performs a diff-aware scan by default. This means it only scans changes in files when run on a pull or merge request.
 * `semgrep ci` can be run on a local `.git` repository at any time to test its behavior before running it within a CI environment.

:::note
An alternative method of running Semgrep in your CI is to run the `semgrep scan` command, passing rules to scan, for example `semgrep scan --config auto` which performs a full scan of the repository every time the job is run.
:::

### GitHub Actions

To add Semgrep into your GitHub Actions pipeline, do the following steps.

1. Create a `semgrep.yaml` configuration file to add a Semgrep command as part of your GithubActions pipeline. Refer to the [GitHub Actions code snippet](#github-actions-code-snippet).
2. Optional: You can also review the [GitHub Actions workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) to help with editing the configuration file.
3. Commit the configuration file into the `./github/workflows` folder within the target repository. The Semgrep job starts automatically upon detecting the `semgrep.yaml` commit in the previous step
4. Optional: Re-run or view the job from the GitHub Actions interface.
5. Customize the job's behavior, such as its rules to scan and files to ignore.

:::note
If you are self-hosting your repository, you must [use a self-hosted runner](https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job#choosing-self-hosted-runners).
:::

#### GitHub Actions code snippet

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep

on:

  # Scan pull requests.
  pull_request: {}

  # Scan all files on branches, report any findings.
  push:
    branches: ["master", "main"]

  # Schedule CI job to run at a certain time, using cron syntax.
  schedule:
    - cron: '30 0 1,15 * *' # scheduled for 00:30 UTC on both the 1st and 15th of the month

jobs:
  semgrep:

    # User definable name of this GitHub Actions job.
    name: Scan

    # Only change the `runs-on` value if you are self-hosting. 
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Don't change this.
      image: returntocorp/semgrep

    # Skip any PR created by dependabot to avoid permission issues
    if: (github.actor != 'dependabot[bot]')

    steps:

      # Fetch project source with GitHub Actions Checkout.
      - uses: actions/checkout@v3

      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci
        env:
          SEMGREP_RULES: p/default # more at semgrep.dev/explore
```

### GitLab CI/CD

To add Semgrep into your GitLab CI/CD pipeline:

1. Create or edit a `.gitlab-ci.yml` configuration file to add a Semgrep
   command as part of your pipeline. Refer to the [GitLab CI/CD code
   snippet](#gitlab-cicd-code-snippet).
2. Optional: You can also review the [GitLab configuration guide](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html) to help with editing the configuration file. 
3. Commit the configuration file into the root folder within the target repository. The Semgrep job starts automatically upon detecting the `.gitlab-ci.yml` commit in the previous step.
4. Optional: Re-run or view the job from your GitLab project's **CI/CD > Pipelines page**.
5. Customize the job's behavior, such as its rules to scan and files to ignore.

:::note
If you are already running [GitLab SAST](https://docs.gitlab.com/ee/user/application_security/sast/) by including the template `Security/SAST.gitlab-ci.yml` in your CI/CD configuration, you can still include and customize Semgrep's CI integration. GitLab SAST, including its `semgrep-sast` analyzer, will continue to run normally. Refer to the [GitLab CI/CD with GitLab SAST snippet](#gitlab-cicd-with-gitlab-sast-snippet).
:::

#### GitLab CI/CD code snippet

```yaml
semgrep:

  # A Docker image with Semgrep installed.
  image: returntocorp/semgrep

  # Run the "semgrep ci" command on the command line of the docker image.
  script: semgrep ci

  rules:
    # Scan changed files in MRs, only report new findings (existing findings ignored)
    - if: $CI_MERGE_REQUEST_IID
    # Scan all files on the default branch, report any findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  variables:

    # Define rules through the SEMGREP_RULES environment variable. 
    SEMGREP_RULES: p/default

    # Change job timeout (value in seconds; default is 1800 seconds. Set to 0 to disable)
    #   SEMGREP_TIMEOUT: 300
```

#### GitLab CI/CD code snipppet with GitLab SAST

```yaml
semgrep:

  # A Docker image with Semgrep installed.
  image: returntocorp/semgrep

  rules:

    # Scan changed files in MRs, only report new findings (existing findings ignored)
    - if: $CI_MERGE_REQUEST_IID
  
    # Scan all files on the default branch, report any findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  variables:

    # Define rules through the SEMGREP_RULES environment variable. 
    SEMGREP_RULES: p/default # See more at semgrep.dev/explore.

    # Change job timeout (value in seconds; default is 1800 seconds. Set to 0 to disable)
    # SEMGREP_TIMEOUT: 300
  
    # Upload findings to GitLab SAST Dashboard
    SEMGREP_GITLAB_JSON: "1"
    script: semgrep ci --gitlab-sast > gl-sast-report.json || true
    artifacts:
      reports:
        sast: gl-sast-report.json
```

### Jenkins

To add Semgrep into your Jenkins pipeline, do the following steps. Your UI may vary depending on your Jenkins installation. These steps use a Classic UI Jenkins interface.

1. Edit or create your `Jenkinsfile` configuration file to add a Semgrep `step` as part of your Pipeline. Refer to the [Jenkins CI code snippet](#jenkins-ci-code-snippet). You can edit your `Jenkinsfile` from Jenkins's interface.
2. Optional: You can also review [`Jenkinsfile` usage](https://www.jenkins.io/doc/book/pipeline/jenkinsfile/) to help with editing the configuration file.
3. If you are using Jenkins Classic UI, [save your `Jenkinsfile`](https://www.jenkins.io/doc/book/pipeline/getting-started/#through-the-classic-ui) within the Jenkins interface. Otherwise, commit the configuration file into the root folder within the target repository. The Semgrep job starts automatically upon detecting the `Jenkinsfile` commit in the previous step. 
4. Optional: Re-run the stage from [Jenkins's interface](https://www.jenkins.io/doc/book/pipeline/running-pipelines/#restarting-from-the-classic-ui).
6. Customize the job's behavior, such as its rules to scan and files to ignore.

#### Jenkins CI code snippet

This code snippet uses Jenkins declarative syntax.

```javascript
pipeline {
  agent any
    stages {
      stage('Semgrep-Scan') {
	      environment { 
          SEMGREP_RULES = 'p/default'
        } 
        steps {
          sh 'pip3 install semgrep'
          sh 'semgrep ci'
      }
    }
  }
}
```

### BitBucket Pipelines

To add Semgrep into your GitLab CI/CD pipeline, do the following steps.

1. Create or edit a `bitbucket-pipelines.yml` configuration file to add
   a Semgrep `step` as part of your pipeline. Refer to the [BitBucket Pipelines code snippet](#bitbucket-pipelines-code-snippet).
2. Optional: You can also review the [Bitbucket guidelines guide](https://support.atlassian.com/bitbucket-cloud/docs/configure-bitbucket-pipelinesyml/) to help with editing the configuration file.
3. Commit the configuration file into the root folder within the target repository. The Semgrep job starts automatically upon detecting the `bitbucket-pipelines.yml` commit in the previous step.
4. Optional: Re-run or view the Pipeline by clicking from **your repository > Pipelines**.
5. Customize the job's behavior, such as its rules to scan and files to ignore.

:::note
These steps can also be performed through BitBucket's UI wizard. This UI wizard can be accessed through **BitBucket > your repository > Pipelines > Create your first pipeline**.
:::

#### BitBucket Pipelines code snippet

```yaml
image: atlassian/default-image:latest

pipelines:
  default:
    - parallel:
      - step:
          name: 'Run Semgrep scan with current branch'
          deployment: dev
          image: returntocorp/semgrep
          script:
            - export SEMGREP_RULES="p/default" 
            - semgrep ci
```

### CircleCI

To add Semgrep into your CircleCI pipeline, do the following steps.

1. Create or edit a `config.yml` configuration file to add a Semgrep command as
   part of your CircleCI workflow. Refer to the [CircleCI code snippet](#circleci-code-snippet).
2. Optional: You can also review the [CirclCI YAML introduction](https://circleci.com/docs/introduction-to-yaml-configurations) to help with editing the configuration file.
3. Commit the configuration file into the `/.circleci` folder within the target
   repository.
4. The Semgrep job starts automatically upon detecting the `config.yml` commit in the previous step.
5. Customize the job's behavior, such as its rules to scan and files to ignore.

#### CircleCI code snippet

```yaml
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      repo_path:
        type: string
        # Change this to your repository path. (confirm with Holden)
        default: myorg/semgrep-test-repo
      default_branch:
        type: string
        default: main
    environment:
      # Scan changed files in PRs, only report new findings (existing findings ignored)
      SEMGREP_BASELINE_REF: << parameters.default_branch >>
      SEMGREP_RULES: p/default
	
    # Change job timeout (in seconds; default is 1800 seconds. Set to 0 to disable)
    #   SEMGREP_TIMEOUT: 300

    docker:
      - image: returntocorp/semgrep
    steps:
      - checkout
      - run:
          name: "Semgrep scan"
          command: semgrep ci
workflows:
  main:
    jobs:
      - semgrep-scan
```

### Buildkite

To add Semgrep into your CircleCI pipeline, do the following steps.

1. Create or edit a `pipelines.yml` configuration file to add a Semgrep command as part of your pipeline. Refer to the [BuildKite code snippet](#buildkite-code-snippet). This configuration file can also be stored within Buildkite.
2. Optional: You can also review the [Buildkite steps definition](https://buildkite.com/docs/pipelines/defining-steps) to help with editing the configuration file.
3. If you are using Buildkite to store the configuration, save the file. Otherwise, commit the configuration file into the `/.buildkite` folder within the target repository.
4. The Semgrep job starts automatically upon detecting the `pipelines.yml` commit in the previous step.
5. Customize the job's behavior, such as its rules to scan and files to ignore.

:::note
From Buildkite's main page, click **Pipelines > ➕ button** to perform these steps within Buildkite's UI.
:::

#### Buildkite code snippet

```yaml
- label: ":semgrep: Semgrep"
  commands:
    - export SEMGREP_RULES='p/default' 
    - semgrep ci 
  
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep
```

### Running Semgrep in CI with other CI providers

Do one of the following methods to run Semgrep in CI with other CI providers.

#### Direct docker usage 

Reference or add the [returntocorp/semgrep](https://hub.docker.com/r/returntocorp/semgrep) Docker image directly. The method to add the Docker image varies based on the CI provider.

#### Install `semgrep`

If you cannot use the Semgrep docker image, do the following steps.

1. Run `pip install semgrep` inside the container or CI environment
2. Run `semgrep ci --config auto`.

Your customization options with other CI providers vary depending on working environment variables.

## Refining the CI job

The following sections describe methods to customize your CI job.

### Passing the CI job 

By default, Semgrep CI exits with exit code 1 if the scan returns any findings. This causes the job to fail.

Semgrep provides a **fail open** option. This enables you to suppress findings or internal Semgrep errors that block your pipeline.  Use any of the following commands:

<dl>
	<dt><code>semgrep ci</code></dt>
	<dd>The Semgrep CI job <strong>fails</strong> on blocking findings or on internal errors.</dd>
	<dt><code>semgrep ci || [ $? != 1 ]</code></dt>
	<dd><strong>Fail</strong> on blocking findings, but <strong>passes</strong> on internal errors. </dd>
	<dt><code>semgrep ci || true</code></dt>
	<dd><strong>Pass</strong> on blocking findings and on internal errors. </dd>
</dl>

Refer to [Semgrep exit codes](../cli-reference/#exit-codes) to understand various internal issues that cause Semgrep to fail.

### Setting a scan schedule

The following table is a summary of methods and resources to set up schedules for different CI providers.

TODO

### Customizing rules and rulesets

#### Exploring Semgrep Registry for useful rulesets

`semgrep ci` accepts a list of rules and rulesets to run on each scan. The list is delimited by a space (` `) if the variable is exported from a command or script block, such as in the BitBucket Pipeline example. The list can also be delimited by a newline if the `SEMGREP_RULES` variable is declared through YAML syntax.


Example snippet for space-delimited list using `export SEMGREP_RULES`:

Example snippet for newline-delimited list using `SEMGREP_RULES` YAML syntax:


#### Writing your own rules

Write custom rules to enforce your team's coding standards and security practices. Rules can be forked from existing community-written rules.

See [Writing rules](https://semgrep.dev/docs/writing-rules/overview/) to learn how to write custom rules.

TODO


### Ignoring files

By default Semgrep CI skips files and directories such as tests/, node_modules/, and vendor/. It uses the same default .semgrepignore as the CLI, which can be found in the [CLI Reference](https://semgrep.dev/docs/cli-reference/#ignoring-files). This is used by Semgrep CI when no explicit .semgrepignore file is found in the root of your project.

Use a `.semgrepignore` file to exclude files and directories from a scan. The `.semgrepignore` file follows `.gitignore` syntax. You can exclude vendored code and code for tests through this feature.

For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

:::caution
`.semgrepignore` is only used by Semgrep CI and the Semgrep command line tool. Integrations such as [GitLab's Semgrep SAST Analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep) do not use it.
:::

For information on ignoring individual findings in code, see the [Ignoring findings page](https://semgrep.dev/docs/ignoring-findings/).

## Migrating to Semgrep App from a manual CI setup

Migrate to Semgrep App to:

* **View and manage findings in a centralized location**. False positives can be ignored.
* **Configure rules and actions to undertake when a finding is generated by the rule.** The following actions can be undertaken:
    * Audit the rule. This means that findings are kept within Semgrep's Findings page and are not surfaced to your team's SCM.
    * Show the finding to your team through the use of PR and MR comments.
    * Block the pull or merge request.

TODO

