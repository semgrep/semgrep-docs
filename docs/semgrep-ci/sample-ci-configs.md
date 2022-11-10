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

1. Create a `semgrep.yml` file within `.github/workflows` in the repository you want to scan.
2. Copy the relevant code snippet provided after these instructions.
3. Commit the configuration file.
4. The Semgrep job starts automatically upon detecting the committed `semgrep.yml` file. You can also start the job from the GitHub Actions interface.

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
            # Generate a token from Semgrep App > Settings
            # and add it to your GitHub secrets.
            SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}

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
        - run: semgrep ci --sarif --output=semgrep.sarif
          env:
            # Connect to Semgrep App through your SEMGREP_APP_TOKEN.
            # Generate a token from Semgrep App > Settings
            # and add it to your GitHub secrets.
            SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
  
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
        - run: semgrep ci --sarif --output=semgrep.sarif
          env:
             # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable. 
             SEMGREP_RULES: p/default # more at semgrep.dev/explore

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

To add a Semgrep configuration snippet in your GitLab CI/CD pipeline:

1. Create or edit your `.gitlab-ci.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided after these instructions.
3. Commit the configuration file.
4. The Semgrep job starts automatically upon detecting the committed `.gitlab-ci.yml` file. You can also view the job from your GitLab project's **CI/CD > Pipelines** page. 

<Tabs
    defaultValue="glcicd-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'glcicd-semgrep'},
    {label: 'Stand-alone CI job', value: 'glcicd-standalone'},
    ]}
>

<TabItem value='glcicd-semgrep'>

  ```yaml
  semgrep:
    # A Docker image with Semgrep installed.
    image: returntocorp/semgrep
    # Run the "semgrep ci" command on the command line of the docker image.
    script: semgrep ci
  
    rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
  
    # Scan mainline (default) branches and report all findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  
    variables:
      # Connect to Semgrep App through your SEMGREP_APP_TOKEN.
      # Generate a token from Semgrep App > Settings
      # and add it as a variable in your GitLab CI/CD project settings.
      SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
  
    # Other optional settings in the `variables` block:

    # Never fail the build due to findings on pushes.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: push
  
    # Receive inline MR comments (requires Semgrep App account)
    # Setup instructions: 
    # https://semgrep.dev/docs/semgrep-app/notifications/#enabling-gitlab-merge-request-comments
    #   GITLAB_TOKEN: $PAT
  ```

</TabItem>

<TabItem value='glcicd-standalone'>

  ```yaml
  semgrep:
    # A Docker image with Semgrep installed.
    image: returntocorp/semgrep
    # Run the "semgrep ci" command on the command line of the docker image.
    script: semgrep ci
  
    rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
  
    # Scan mainline (default) branches and report all findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  
    variables:
      # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable.
      SEMGREP_RULES: p/default # See more at semgrep.dev/explore.
  
    # Other optional settings in the `variables` block:

    # Never fail the build due to findings on pushes.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: push
  ```

</TabItem>
</Tabs>

<details><summary>Alternate job that uploads findings to GitLab SAST Dashboard</summary>

<Tabs
    defaultValue="glcicd-semgrep-dash"
    values={[
    {label: 'CI with Semgrep App', value: 'glcicd-semgrep-dash'},
    {label: 'Stand-alone CI job', value: 'glcicd-standalone-dash'},
    ]}
>

<TabItem value='glcicd-semgrep-dash'>

  ```yaml
  semgrep:
    # A Docker image with Semgrep installed.
    image: returntocorp/semgrep
  
    rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
  
    # Scan mainline (default) branches and report all findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  
    variables:
      # Connect to Semgrep App through your SEMGREP_APP_TOKEN.
      # Generate a token from Semgrep App > Settings
      # and add it as a variable in your GitLab CI/CD project settings.
      SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
  
      # Upload findings to GitLab SAST Dashboard:
      SEMGREP_GITLAB_JSON: "1"

    # Other optional settings in the `variables` block:

    # Never fail the build due to findings on pushes.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: push
  
    # Receive inline MR comments (requires Semgrep App account)
    # Setup instructions: 
    # https://semgrep.dev/docs/semgrep-app/notifications/#enabling-gitlab-merge-request-comments
    #   GITLAB_TOKEN: $PAT

    # Run the "semgrep ci" command on the command line of the docker image and send findings
    # to GitLab SAST.
    script: semgrep ci --gitlab-sast > gl-sast-report.json || true
    artifacts:
      reports:
        sast: gl-sast-report.json

  ```

</TabItem>

<TabItem value='glcicd-standalone-dash'>

  ```yaml
  semgrep:
    # A Docker image with Semgrep installed.
    image: returntocorp/semgrep
  
    rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID
  
    # Scan mainline (default) branches and report all findings.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  
    variables:
      # Add the rules that Semgrep uses by setting the SEMGREP_RULES environment variable.
      SEMGREP_RULES: p/default # See more at semgrep.dev/explore.

      # Upload findings to GitLab SAST Dashboard:
      SEMGREP_GITLAB_JSON: "1"

    # Other optional settings in the `variables` block:

    # Never fail the build due to findings on pushes.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: push
  
    # Run the "semgrep ci" command on the command line of the docker image and send findings
    # to GitLab SAST.
    script: semgrep ci --gitlab-sast > gl-sast-report.json || true
    artifacts:
      reports:
        sast: gl-sast-report.json

  ```
</TabItem>
</Tabs>

</details>

## Jenkins

To add a Semgrep configuration snippet in your Jenkins pipeline:

1. Edit or create your `Jenkinsfile` configuration file in the repository you want to scan. You can also edit your `Jenkinsfile` from Jenkins's interface.
2. Copy the relevant code snippet provided after these instructions.
3. Commit the configuration file.
4. The Semgrep job starts automatically upon detecting the `Jenkinsfile` update.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

<Tabs
    defaultValue="jenkins-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'jenkins-semgrep'},
    {label: 'Stand-alone CI job', value: 'jenkins-standalone'},
    ]}
>

<TabItem value='jenkins-semgrep'>

This code snippet uses Jenkins declarative syntax.

  ```javascript
  pipeline {
    agent any
      environment {
        // The following variables are required for a Semgrep App-connected scan:
        SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
  
        // Uncomment the following line to scan changed 
        // files in PRs or MRs (diff-aware scanning): 
        // SEMGREP_BASELINE_REF = "main"

        // Troubleshooting:

        // Uncomment the following lines if Semgrep App > Findings Page does not create links
        // to the code that generated a finding.
        // SEMGREP_JOB_URL = "${BUILD_URL}"
        // SEMGREP_COMMIT = "${GIT_COMMIT}"
        // SEMGREP_PR_ID = "${env.CHANGE_ID}"
        // SEMGREP_BRANCH = "${GIT_BRANCH}"
        
        // Uncomment the following lines if Semgrep App > Findings Page does not create links
        // to the code that generated a finding.
        // (Any Semgrep version.)
        // SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')
        // SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
      }
      stages {
        stage('Semgrep-Scan') {
          steps {
            sh 'pip3 install semgrep'
            sh 'semgrep ci'
        }
      }
    }
  }
  ```

</TabItem>

<TabItem value='jenkins-standalone'>

This code snippet uses Jenkins declarative syntax.

  ```javascript
  pipeline {
    agent any
      environment {
        SEMGREP_RULES = "p/default" 
        SEMGREP_BRANCH = "${GIT_BRANCH}"
  
        // Uncomment the following line to scan changed 
        // files in PRs or MRs (diff-aware scanning): 
        // SEMGREP_BASELINE_REF = "main"
      }
      stages {
        stage('Semgrep-Scan') {
          steps {
            sh 'pip3 install semgrep'
            sh 'semgrep ci'
        }
      }
    }
  }
  ```

</TabItem>
</Tabs>

## Bitbucket Pipelines

To add a Semgrep configuration snippet into your BitBucket Pipeline:

1. Create or edit your `bitbucket-pipelines.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided after these instructions.
3. Commit the configuration file.
4. The Semgrep job starts automatically upon detecting the committed `bitbucket-pipelines.yml` file. You can also view the job through BitBucket's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can also be performed through BitBucket's UI wizard. This UI wizard can be accessed through **BitBucket > your repository > Pipelines > Create your first pipeline**.
:::


<Tabs
    defaultValue="bitbucket-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'bitbucket-semgrep'},
    {label: 'Stand-alone CI job', value: 'bitbucket-standalone'},
    ]}
>

<TabItem value='bitbucket-semgrep'>

  ```yaml
  image: atlassian/default-image:latest
  
  pipelines:
    default:
      - parallel:
        - step:
            name: 'Run Semgrep scan with current branch'
            deployment: dev # https://support.atlassian.com/bitbucket-cloud/docs/set-up-and-monitor-deployments/
            image: returntocorp/semgrep
            script:
              # The following variables are required to set up a Semgrep App-connected scan:
              - export $SEMGREP_APP_TOKEN

              # Uncomment the following line to scan changed 
              # files in PRs or MRs (diff-aware scanning): 
              # - export SEMGREP_BASELINE_REF = "origin/main"
              # - git fetch origin "+refs/heads/*:refs/remotes/origin/*"

              # Troubleshooting:

              # Uncomment the following lines if Semgrep App > Findings Page does not create links
              # to the code that generated a finding.
              # (For Semgrep versions before 0.98.0)
              # - export SEMGREP_JOB_URL="${SEMGREP_REPO_URL}/addon/pipelines/home#!/results/${BITBUCKET_PIPELINE_UUID}"
              # - export SEMGREP_COMMIT=$BITBUCKET_COMMIT
              # - export SEMGREP_PR_ID=$BITBUCKET_PR_ID
              # - export SEMGREP_BRANCH=$BITBUCKET_BRANCH

              # Uncomment the following lines if Semgrep App > Findings Page does not create links
              # to the code that generated a finding.
              # (Any Semgrep version.)
              # - export SEMGREP_REPO_URL=$BITBUCKET_GIT_HTTP_ORIGIN
              # - export SEMGREP_REPO_NAME=$BITBUCKET_REPO_FULL_NAME

              - semgrep ci
  ```

</TabItem>


<TabItem value='bitbucket-standalone'>

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
              - export SEMGREP_RULES = "p/default"

              # Uncomment the following line to scan changed 
              # files in PRs or MRs (diff-aware scanning): 
              # - export SEMGREP_BASELINE_REF = "main"

              - semgrep ci
  ```

</TabItem>
</Tabs>


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

    # Optional settings in the `environment:` block

    # Instead of `SEMGREP_APP_TOKEN:`, set hard-coded rulesets, 
    # viewable in logs.
    #   SEMGREP_RULES: p/default # See more at semgrep.dev/explore.

    # These variables should be set to provide information to the Semgrep App.
      SEMGREP_REPO_NAME: '$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME'
      SEMGREP_REPO_URL: << pipeline.project.git_url >>
      SEMGREP_BRANCH: << pipeline.git.branch >>

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
