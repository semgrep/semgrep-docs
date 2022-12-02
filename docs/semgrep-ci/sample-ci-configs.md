---
slug: sample-ci-configs
append_help_link: true
description: "View sample configuration files to run Semgrep with various CI/CD providers such as GitHub, GitLab, Jenkins, Buildkite, CircleCI, and more."
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

<!-- Import code snippets.
Read /src/components/code_snippets/readme to understand modular code snippet imports. -->

<!-- GHA -->
import GhaSemgrepAppSast from "/src/components/code_snippets/_gha-semgrep-app-sast.mdx"
import GhaSemgrepAppStandalone from "/src/components/code_snippets/_gha-semgrep-app-standalone.mdx"
import GhaSemgrepAppSastDash from "/src/components/code_snippets/_gha-semgrep-app-sast-dash.mdx"
import GhaSemgrepAppStandaloneDash from "/src/components/code_snippets/_gha-semgrep-app-standalone-dash.mdx"
import GhaSemgrepAppSsc from "/src/components/code_snippets/_gha-semgrep-app-ssc.mdx"


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

1. Create a `semgrep.yml` file in `.github/workflows` in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample GitHub Actions configuration file](#sample-github-actions-configuration-file).
3. Paste the relevant code snippet to `semgrep.yml` file. This is your Semgrep configuration file for GitHub Actions.
4. Commit the configuration file under <code><span className="placeholder">/REPOSITORY-ROOT-DIRECTORY/.github/workflows/semgrep.yml</span></code>.
5. The Semgrep job starts automatically upon detecting the committed `semgrep.yml` file. You can also start the job from the GitHub Actions interface.

### Sample GitHub Actions configuration file

<Tabs
    defaultValue="gha-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'gha-semgrep'},
    {label: 'Stand-alone CI job', value: 'gha-standalone'},
    ]}
>

<TabItem value='gha-semgrep'>

<GhaSemgrepAppSast />

</TabItem>

<TabItem value='gha-standalone'>

<GhaSemgrepAppStandalone />

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

<GhaSemgrepAppSastDash />

</TabItem>

<TabItem value='gha-standalone-dash'>

<GhaSemgrepAppStandaloneDash />

</TabItem>
</Tabs>

</details>

## GitLab CI/CD

To add a Semgrep configuration snippet in your GitLab CI/CD pipeline:

1. Create or edit your `.gitlab-ci.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample GitLab CI/CD configuration snippet](#sample-gitlab-cicd-configuration-snippet), and then paste it to your `.gitlab-ci.yml` file.
3. Commit the updated `.gitlab-ci.yml` file.
4. The Semgrep job starts automatically upon detecting the committed `.gitlab-ci.yml` file. You can also view the job from your GitLab project's **CI/CD > Pipelines** page. 

### Sample GitLab CI/CD configuration snippet

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

1. Create or edit your `Jenkinsfile` configuration file in the repository you want to scan. You can also edit your `Jenkinsfile` from Jenkins's interface.
2. Copy the relevant code snippet provided in [Sample Jenkins configuration snippet](#sample-jenkins-configuration-snippet).
3. Paste the code to your `Jenkinsfile`, and then commit the file.
4. The Semgrep job starts automatically upon detecting the `Jenkinsfile` update.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

### Sample Jenkins configuration snippet

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
        // The following variable is required for a Semgrep App-connected scan:
        SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
  
        // Uncomment the following line to scan changed 
        // files in PRs or MRs (diff-aware scanning): 
        // SEMGREP_BASELINE_REF = "main"

        // Troubleshooting:

        // Uncomment the following lines if Semgrep App > Findings Page does not create links
        // to the code that generated a finding or if you are not receiving PR or MR comments.
        // SEMGREP_JOB_URL = "${BUILD_URL}"
        // SEMGREP_COMMIT = "${GIT_COMMIT}"
        // SEMGREP_BRANCH = "${GIT_BRANCH}"
        // SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')
        // SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
        // SEMGREP_PR_ID = "${env.CHANGE_ID}"
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

To add a Semgrep configuration snippet into BitBucket Pipelines:

1. Create or edit your `bitbucket-pipelines.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample BitBucket Pipelines configuration snippet](#sample-bitbucket-pipelines-configuration-snippet), and then paste it to your `bitbucket-pipelines.yml`.
3. Commit the updated `bitbucket-pipelines.yml` configuration file.
4. The Semgrep job starts automatically upon detecting the committed `bitbucket-pipelines.yml` file. You can also view the job through BitBucket's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can also be performed through BitBucket's UI wizard. This UI wizard can be accessed through **BitBucket > your repository > Pipelines > Create your first pipeline**.
:::

### Sample BitBucket Pipelines configuration snippet

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
              # to the code that generated a finding or if you are not receiving PR or MR comments.
              # - export SEMGREP_JOB_URL="${SEMGREP_REPO_URL}/addon/pipelines/home#!/results/${BITBUCKET_PIPELINE_UUID}"
              # - export SEMGREP_COMMIT=$BITBUCKET_COMMIT
              # - export SEMGREP_PR_ID=$BITBUCKET_PR_ID
              # - export SEMGREP_BRANCH=$BITBUCKET_BRANCH
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

To add Semgrep into your Buildkite pipeline:

1. Create or edit a `pipeline.yml` configuration file to add a Semgrep command as part of your pipeline. Refer to the [BuildKite code snippet](#buildkite-code-snippet). This configuration file can also be stored within Buildkite.
2. Copy the relevant code snippet provided in [Sample Buildkite configuration snippet](#sample-buildkite-configuration-snippet).
3. If you are using Buildkite to store the configuration, save the updated file. Otherwise, commit the updated configuration file into the `/.buildkite` folder within the target repository.
4. The Semgrep job starts automatically upon detecting the committed `pipeline.yml` file. You can also view the job through BitBucket's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

### Sample Buildkite configuration snippet

<Tabs
    defaultValue="buildkite-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'buildkite-semgrep'},
    {label: 'Stand-alone CI job', value: 'buildkite-standalone'},
    ]}
>

<TabItem value='buildkite-semgrep'>

```yaml
- label: ":semgrep: Semgrep"
  commands:

    # Uncomment the following line to scan changed 
    # files in PRs or MRs (diff-aware scanning): 
    # - export SEMGREP_BASELINE_REF = "main"
    
    # Troubleshooting:

    # Uncomment the following lines if Semgrep App > Findings Page does not create links
    # to the code that generated a finding or if you are not receiving PR or MR comments.
    # - export SEMGREP_COMMIT=${BUILDKITE_COMMIT}
    # - export SEMGREP_PR_ID=${BUILDKITE_PULL_REQUEST}
    # - export SEMGREP_BRANCH=${BUILDKITE_BRANCH}
    # - export SEMGREP_REPO_URL="$(echo "$BUILDKITE_REPO" | sed -e 's#.\{4\}$##')"
    # - echo "$BUILDKITE_REPO" | sed 's#https://github.com/##' | sed 's#.git##'
    # - export SEMGREP_REPO_NAME="$(echo "$BUILDKITE_REPO" | sed -e 's#https://github.com/##' | sed -e 's#.git##')"
    
    - semgrep ci 
  
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep
        environment:
          # The following variable is required for a Semgrep App-connected scan:
          - "SEMGREP_APP_TOKEN"
```

</TabItem>

<TabItem value='buildkite-standalone'>

```yaml
- label: ":semgrep: Semgrep"
  commands:
    # Define rules to scan with by setting the SEMGREP_RULES environment variable. 
    - export SEMGREP_RULES="p/default"

    # To scan changed files in PRs or MRs (diff-aware scanning):
    # - export SEMGREP_BASELINE_REF=${BUILDKITE_BRANCH}

    - semgrep ci 
  
  plugins:
    - docker#v3.7.0:
      image: returntocorp/semgrep
```
</TabItem>

</Tabs>

## CircleCI

To add Semgrep into your CircleCI pipeline:

1. Create or edit your `config.yml` configuration file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample CircleCI configuration snippet](#sample-circleci-configuration-snippet).
3. Commit the updated `config.yml` configuration file into the `/.circleci` folder in the target repository.
4. The Semgrep job starts automatically upon detecting the `config.yml` update.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided in the code snippet.

<!-- 

Note: CircleCI snippet does NOT set the SEMGREP_APP_TOKEN in the config file.
From CSE: 
It gets set from in the UI in the repository settings and automatically 
gets put into the pipeline at runtime.

-->

### Sample CircleCI configuration snippet

<Tabs
    defaultValue="circleci-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'circleci-semgrep'},
    {label: 'Stand-alone CI job', value: 'circleci-standalone'},
    ]}
>

<TabItem value='circleci-semgrep'>

```yaml
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      default_branch:
        type: string
        default: main
    environment:
      # Uncomment the following line to scan changed 
      # files in PRs or MRs (diff-aware scanning): 
      # - export SEMGREP_BASELINE_REF = "origin/main"
      # - git fetch origin "+refs/heads/*:refs/remotes/origin/*"
      # SEMGREP_BASELINE_REF: << parameters.default_branch >>

      # Troubleshooting:

      # Uncomment the following lines if Semgrep App > Findings Page does not create links
      # to the code that generated a finding or if you are not receiving PR or MR comments.
      # SEMGREP_REPO_NAME: '$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME'
      # SEMGREP_REPO_URL: << pipeline.project.git_url >>
      # SEMGREP_BRANCH: << pipeline.git.branch >>

    docker:
      - image: returntocorp/semgrep
    steps:
      - checkout

      # Uncomment the following lines if Semgrep App > Findings Page does not create links
      # to the code that generated a finding or if you are not receiving PR or MR comments.
      # - run:
      #     name: "Manually set environment variables"
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

</TabItem>
<TabItem value='circleci-standalone'>

```yaml
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      default_branch:
        type: string
        default: main
    environment:
      SEMGREP_RULES: p/default

      # Uncomment the following line to scan changed 
      # files in PRs or MRs (diff-aware scanning): 
      # - export SEMGREP_BASELINE_REF = "origin/main"
      # - git fetch origin "+refs/heads/*:refs/remotes/origin/*"
      # SEMGREP_BASELINE_REF: << parameters.default_branch >>

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

</TabItem>

</Tabs>

## Azure Pipelines

To add Semgrep into Azure Pipelines:

1. Access the YAML pipeline editor within Azure Pipelines by following the [YAML pipeline editor](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/yaml-pipeline-editor?view=azure-devops#edit-a-yaml-pipeline) guide.
2. Copy the relevant code snippet provided in [Sample Azure Pipelines configuration snippet](#sample-azure-pipelines-configuration-snippet) into the Azure Pipelines YAML editor.
3. Save the code snippet.
4. Set [environment variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables).
5. Group the environment variables as a [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=classic).
6. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-4 and and adding `SEMGREP_BASELINE_REF` as an environment variable. 

### Sample Azure Pipelines configuration snippet

<Tabs
    defaultValue="azure-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'azure-semgrep'},
    {label: 'Stand-alone CI job', value: 'azure-standalone'},
    ]}
>

<TabItem value='azure-semgrep'>


```yaml
# trigger:
#  - master

pool:
  vmImage: ubuntu-latest
variables:
- group: Semgrep app token group

steps: 

- script: |
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci
  env: 
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
```

### Setting environment variables in Azure Pipelines

Set these variables within Azure Pipelines UI following the steps in [Environment variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables):

* `SEMGREP_APP_TOKEN`

Set these environment variables to troubleshoot the links to the code that generated a finding or if you are not receiving PR or MR comments:

* `SEMGREP_JOB_URL`
* `SEMGREP_COMMIT`
* `SEMGREP_BRANCH`
* `SEMGREP_REPO_URL`
* `SEMGREP_REPO_NAME`

Set this environment variable for diff-aware scanning:

* `SEMGREP_BASELINE_REF`. Its value is typically your trunkline branch, such as `main` or `master`.

</TabItem>

<TabItem value='azure-standalone'>


```yaml
# trigger:
#  - master

pool:
  vmImage: ubuntu-latest

steps: 

- script: |
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci
  env: 
    SEMGREP_RULES: p/default
```

</TabItem>

</Tabs>

## Other providers

To run Semgrep CI on any other provider, use the `returntocorp/semgrep` image, and run the `semgrep ci` command with `SEMGREP_BASELINE_REF` set for diff-aware scanning.

**Note**: If you need to use a different image than docker, install Semgrep CI by `pip install semgrep`.

Using the [configuration reference](../configuration-reference/), you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo 
- Bitrise
- Buildbot
- Codeship
- Codefresh
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

<MoreHelp />
