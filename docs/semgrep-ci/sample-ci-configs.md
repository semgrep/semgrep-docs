---
slug: sample-ci-configs
append_help_link: true
description: "The sample configuration files below run Semgrep CI on continuous integration platforms such as GitHub, GitLab, Jenkins, Buildkite, CircleCI, and other providers."
title: Sample CI configurations
hide_title: true
tags:
    - Semgrep in CI
    - Community Tier
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sample continuous integration (CI) configurations

This document provides sample configuration snippets to run Semgrep CI on various continuous integration (CI) providers.

## Feature support

Support for certain features of Semgrep App depend on your CI provider or source code management tool (SCM). The following table breaks down the features and their availability:

| Feature | GitHub | GitLab | BitBucket | CI Provider support |
| ------- | -------- | ------- | -------- | ---------------- |
| **Diff-aware scanning** | ✅ Yes | ✅ Yes | ✅ Yes  | ✅ Available (may need additional set up) | 
| **Hyperlinks** | ✅ Yes | ✅ Yes | ✅ Yes  |  ✅ Available (may need additional set up) |
| **SCM security dashboard** |  ✅ GitHub Advanced Security Dashboard |  ✅ GitLab SAST Dashboard | ❌ No | ❗ Only GitHub Actions and GitLab CI/CD |
| **PR or MR comments in Semgrep App** |  ✅ Yes | ✅ Yes | ❌ No | ✅ CI provider agnostic; feature support is dependent on SCM |

*Table 1.* List of features and supported SCMs and CI providers.

<dl>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep can scan changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast and reduces finding duplication.</dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-app/notifications/#enabling-github-pull-request-comments">PR or MR comments</a> from Semgrep App on the lines of code that generated a finding.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep App collects findings in a Findings page. In this page, you can click on a finding to view the lines of code in your repository that generated the finding.</dd>
    <dt>SCM security dashboard</dt>
    <dd>Send Semgrep findings to your SCM's security dashboard.</dd>
</dl>

## GitHub Actions

To add a Semgrep configuration file in your GitHub Actions pipeline:

1. Create a `semgrep.yaml` file within `.github/workflows` in the repository you want to scan.
2. Copy the relevant configuration file from the tabs provided and commit the file.
3. The Semgrep job starts automatically upon detecting the `semgrep.yml` file. You can also start the job from the GitHub Actions interface.

<Tabs
    defaultValue="gha-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'gha-semgrep'},
    {label: 'Stand-alone CI job', value: 'gha-standalone'},
    ]}
>
<TabItem value='gha-semgrep'>

  ```yaml
  # Name of this GitHub Actions workflow.
  name: Semgrep
  
  on:
    # Scan changed files in PRs (diff-aware scanning):
    pull_request: {}
    # Scan mainline branches and report all findings:
    push:
      branches: ["master", "main"]
    # Schedule the CI job (this method uses cron syntax):
    schedule:
      - cron: '30 0 1,15 * *' # scheduled for 00:30 UTC on both the 1st and 15th of the month
  
  jobs:
    semgrep:
      # User definable name of this GitHub Actions job.
      name: Scan
      # If you are self-hosting, change the following `runs-on` value: 
      runs-on: ubuntu-latest
  
      container:
        # A Docker image with Semgrep installed. Do not change this.
        image: returntocorp/semgrep
  
      # Skip any PR created by dependabot to avoid permission issues:
      if: (github.actor != 'dependabot[bot]')
  
      steps:
        # Fetch project source with GitHub Actions Checkout.
        - uses: actions/checkout@v3
        # Run the "semgrep ci" command on the command line of the docker image.
        - run: semgrep ci
          env:
            # Connect to Semgrep App through your SEMGREP_APP_TOKEN.
            # Make sure you have generated a token from Semgrep App > Settings
            # and you have added it to your GitHub secrets.
            SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
  
            # Uncomment SEMGREP_TIMEOUT to set this job's timeout (in seconds):
            # Default timeout is 1800 seconds (30 minutes).
            # Set to 0 to disable the timeout.
            # SEMGREP_TIMEOUT: 300
  ```

</TabItem>

<TabItem value='gha-standalone'>

  ```yaml
  # Name of this GitHub Actions workflow.
  name: Semgrep
  
  on:
    # Scan changed files in PRs (diff-aware scanning):
    pull_request: {}
    # Scan mainline branches and report all findings: 
    push:
      branches: ["master", "main"]
    # Schedule the CI job (this method uses cron syntax):
    schedule:
      - cron: '30 0 1,15 * *' # Scheduled for 00:30 UTC on both the 1st and 15th of the month
  
  jobs:
    semgrep:
      # User-definable name of this GitHub Actions job:
      name: Scan
      # If you are self-hosting, change the following `runs-on` value: 
      runs-on: ubuntu-latest
  
      container:
        # A Docker image with Semgrep installed. Do not change this.
        image: returntocorp/semgrep
  
      # Skip any PR created by dependabot to avoid permission issues:
      if: (github.actor != 'dependabot[bot]')
  
      steps:
        # Fetch project source with GitHub Actions Checkout.
        - uses: actions/checkout@v3
        # Run the "semgrep ci" command on the command line of the docker image.
        - run: semgrep ci
          env:
             # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable. 
             SEMGREP_RULES: p/default # more at semgrep.dev/explore

             # Uncomment SEMGREP_TIMEOUT to set this job's timeout (in seconds):
             # Default timeout is 1800 seconds (30 minutes).
             # Set to 0 to disable the timeout.
             # SEMGREP_TIMEOUT: 300
  ```
</TabItem>
</Tabs>

<details><summary>Alternate job that uploads findings to GitHub Advanced Security Dashboard</summary>

<Tabs
    defaultValue="gha-semgrep-dash"
    values={[
    {label: 'CI with Semgrep App', value: 'gha-semgrep-dash'},
    {label: 'Stand-alone CI job', value: 'gha-standalone-dash'},
    ]}
>

<TabItem value='gha-semgrep-dash'>

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep

on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}
  # Scan mainline branches and report all findings:
  push:
    branches: ["master", "main"]
  # Schedule the CI job (this method uses cron syntax):
  schedule:
    - cron: '30 0 1,15 * *' # scheduled for 00:30 UTC on both the 1st and 15th of the month

jobs:
  semgrep:
    # User definable name of this GitHub Actions job.
    name: Scan
    # If you are self-hosting, change the following `runs-on` value: 
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: returntocorp/semgrep

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      # Fetch project source with GitHub Actions Checkout.
      - uses: actions/checkout@v3
      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci
        env:
          # Connect to Semgrep App through your SEMGREP_APP_TOKEN.
          # Make sure you have generated a token from Semgrep App > Settings
          # and you have added it to your GitHub secrets.
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}

          # Uncomment SEMGREP_TIMEOUT to set this job's timeout (in seconds):
          # Default timeout is 1800 seconds (30 minutes).
          # Set to 0 to disable the timeout.
          # SEMGREP_TIMEOUT: 300

      - name: Upload SARIF file for GitHub Advanced Security Dashboard
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: semgrep.sarif
        if: always()
```

</TabItem>
<TabItem value='gha-standalone-dash'>

  ```yaml
  # Name of this GitHub Actions workflow.
  name: Semgrep
  
  on:
    # Scan changed files in PRs (diff-aware scanning):
    pull_request: {}
    # Scan mainline branches and report all findings: 
    push:
      branches: ["master", "main"]
    # Schedule the CI job (this method uses cron syntax):
    schedule:
      - cron: '30 0 1,15 * *' # Scheduled for 00:30 UTC on both the 1st and 15th of the month
  
  jobs:
    semgrep:
      # User-definable name of this GitHub Actions job:
      name: Scan
      # If you are self-hosting, change the following `runs-on` value: 
      runs-on: ubuntu-latest
  
      container:
        # A Docker image with Semgrep installed. Do not change this.
        image: returntocorp/semgrep
  
      # Skip any PR created by dependabot to avoid permission issues:
      if: (github.actor != 'dependabot[bot]')
  
      steps:
        # Fetch project source with GitHub Actions Checkout.
        - uses: actions/checkout@v3
        # Run the "semgrep ci" command on the command line of the docker image.
        - run: semgrep ci
          env:
             # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable. 
             SEMGREP_RULES: p/default # more at semgrep.dev/explore

             # Uncomment SEMGREP_TIMEOUT to set this job's timeout (in seconds):
             # Default timeout is 1800 seconds (30 minutes).
             # Set to 0 to disable the timeout.
             # SEMGREP_TIMEOUT: 300
        - name: Upload SARIF file for GitHub Advanced Security Dashboard
          uses: github/codeql-action/upload-sarif@v2
          with:
            sarif_file: semgrep.sarif
          if: always()
  ```

</TabItem>
</Tabs>

</details>

## GitLab CI/CD

<!--
<Tabs
    defaultValue="glcicd-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'glcicd-semgrep'},
    {label: 'Stand-alone CI job', value: 'glcicd-standalone'},
    ]}
>

<TabItem value='glcicd-semgrep'>

test

</TabItem>

</Tabs> -->

## GitLab CI/CD

```yaml
semgrep:
  # A Docker image with Semgrep installed.
  image: returntocorp/semgrep
  # Run the "semgrep ci" command on the command line of the docker image.
  script: semgrep ci

  rules:
  # Determine when you want Semgrep to scan your code.
  # Use as many of the following options as you want.
  #
  # [Option 1] Scan changed files in MRs, only report new findings (existing
  # findings ignored).
  - if: $CI_MERGE_REQUEST_IID

  # [Option 2] Scan all files on the default branch, report any findings.
  # - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  # [Option 3] Schedule CI job to run at a certain time, using cron syntax. 
  # Instructions for setting this up are here: 
  # https://docs.gitlab.com/ee/ci/pipelines/schedules.html
  # As an initial setup, we recommend scanning your whole project on 1st and 
  # 15th of the month, in addition to running Option 1.

  variables:
    # Select rules for your scan with one of these two options:
    #
    # [Option 1] Scan with rules set in Semgrep App's rule board
    # Get your token at semgrep.dev/orgs/-/settings/tokens.
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
    # [Option 2] set hard-coded rulesets, viewable in logs.
    # SEMGREP_RULES: p/default # See more at semgrep.dev/explore.

  # == Other optional settings in the `variables:` block ==

  # Receive inline MR comments (requires Semgrep App account)
  # Setup instructions: https://semgrep.dev/docs/semgrep-app/notifications/#enabling-gitlab-merge-request-comments
  #   GITLAB_TOKEN: $PAT

  # Never fail the build due to findings on pushes.
  # Instead, just collect findings for semgrep.dev/manage/findings
  #   SEMGREP_AUDIT_ON: push

  # Upload findings to GitLab SAST Dashboard [step 1/2]
  # See also the next step.
  #   SEMGREP_GITLAB_JSON: "1"

  # Change job timeout (default is 1800 seconds; set to 0 to disable)
  #   SEMGREP_TIMEOUT: 300

  # Upload findings to GitLab SAST Dashboard (remove `script:` line above) [step 2/2]
  # script: semgrep ci --gitlab-sast > gl-sast-report.json || true
  # artifacts:
  #   reports:
  #     sast: gl-sast-report.json
```


## Jenkins

Use webhooks and the below snippet to integrate with GitHub.

```Groovy
pipeline {
  agent any
    // environment {
      // SEMGREP_BASELINE_REF = "main"

      // SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
      // SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
      // SEMGREP_BRANCH = "${GIT_BRANCH}"
      // SEMGREP_JOB_URL = "${BUILD_URL}"
      // SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')
      // SEMGREP_COMMIT = "${GIT_COMMIT}"
      // SEMGREP_PR_ID = "${env.CHANGE_ID}"

      // SEMGREP_TIMEOUT = "300"
    // }
    stages {
      stage('Semgrep-Scan') {
        steps {
          sh 'pip3 install semgrep'
          sh 'semgrep ci --config auto'
      }
    }
  }
}
```


## Buildkite

```
- label: ":semgrep: Semgrep"
  commands:
    - export SEMGREP_REPO_URL="$(echo "$BUILDKITE_REPO" | sed -e 's#.\{4\}$##')"
    - export SEMGREP_BRANCH=${BUILDKITE_BRANCH}
    - export SEMGREP_COMMIT=${BUILDKITE_COMMIT}
    - export SEMGREP_PR_ID=${BUILDKITE_PULL_REQUEST}
    - echo "$BUILDKITE_REPO" | sed 's#https://github.com/##' | sed 's#.git##'
    - export SEMGREP_REPO_NAME="$(echo "$BUILDKITE_REPO" | sed -e 's#https://github.com/##' | sed -e 's#.git##')"
    - semgrep ci 
  
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep
        environment:
          # Scan with rules set in Semgrep App's rule board
          # Make a token at semgrep.dev/orgs/-/settings/tokens
          - "SEMGREP_APP_TOKEN"
```


## CircleCI

```
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      default_branch:
        type: string
        default: main
    environment:
    # Scan changed files in PRs, only report new findings (existing findings ignored)
      SEMGREP_BASELINE_REF: << parameters.default_branch >>

    # == Optional settings in the `environment:` block

    # Instead of `SEMGREP_APP_TOKEN:`, set hard-coded rulesets, 
    # viewable in logs.
    #   SEMGREP_RULES: p/default # See more at semgrep.dev/explore.

    # These variables should be set to provide information to the Semgrep App.
      SEMGREP_REPO_NAME: '$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME'
      SEMGREP_REPO_URL: << pipeline.project.git_url >>
      SEMGREP_BRANCH: << pipeline.git.branch >>


    # Change job timeout (default is 1800 seconds; set to 0 to disable)
    #   SEMGREP_TIMEOUT: 300

    docker:
      - image: returntocorp/semgrep
    steps:
      - checkout
      # - run:
      #     name: "Set environment variables" # for PR comments and  in-app hyperlinks to findings
      #     command: |
      #         echo 'export SEMGREP_COMMIT=$CIRCLE_SHA1' >> $BASH_ENV
      #         echo 'export SEMGREP_PR_ID=${CIRCLE_PULL_REQUEST##*/}' >> $BASH_ENV
      #         echo 'export SEMGREP_JOB_URL=$CIRCLE_BUILD_URL' >> $BASH_ENV
      - run:
          name: "Semgrep scan"
          command: semgrep ci
workflows:
  main:
    jobs:
      - semgrep-scan
```

## Bitbucket Pipelines

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
            # Set SEMGREP Variables
            # - export SEMGREP_REPO_URL=$BITBUCKET_GIT_HTTP_ORIGIN
            # - export SEMGREP_REPO_NAME=$BITBUCKET_REPO_FULL_NAME
            # - export SEMGREP_BRANCH=$BITBUCKET_BRANCH
            # - export SEMGREP_JOB_URL="${SEMGREP_REPO_URL}/addon/pipelines/home#!/results/${BITBUCKET_PIPELINE_UUID}"
            # - export SEMGREP_COMMIT=$BITBUCKET_COMMIT
            # - export SEMGREP_PR_ID=$BITBUCKET_PR_ID
            # - export $SEMGREP_APP_TOKEN
            - semgrep ci --config auto
```

## Azure Pipelines

```yaml
# trigger:
#  - master

pool:
  vmImage: ubuntu-latest
# variables:
# - group: Semgrep app token group

steps: 

- script: |
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci --config auto
  env: 
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
```

## Other providers

To run Semgrep CI on any other provider, use the `returntocorp/semgrep` image, and run the `semgrep ci` command with SEMGREP_BASELINE_REF set for diff-aware scanning.

**Note**: If you need to use a different image than docker, install Semgrep CI by `pip install semgrep`.

Using the [configuration reference](../configuration-reference/), you can run Semgrep in the following CI providers:

- AppVeyor
- Azure [(sample configuration)](#azure)
- Bamboo 
- Bitbucket Pipelines [(sample configuration)](#bitbucket)
- Bitrise
- Buildbot
- Buildkite [(sample configuration)](#buildkite)
- CircleCI [(sample configuration)](#circleci)
- Codeship
- Codefresh
- Jenkins [(sample configuration)](#jenkins)
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

<MoreHelp />
