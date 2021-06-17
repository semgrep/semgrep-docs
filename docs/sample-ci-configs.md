---
append_help_link: true
---

# Sample CI configurations

The sample configuration files below
run [Semgrep CI](https://github.com/returntocorp/semgrep-action)
on various continuous integration providers.

[TOC]

# GitHub Actions

```yaml
name: Semgrep

on:
  # Scan changed files in PRs, block on new issues only (existing issues ignored)
  pull_request: {}

  # Scan all files on branches, block on any issues
  # push:
  #   branches: ["master", "main"]

jobs:
  semgrep:
    name: Scan
    runs-on: ubuntu-latest
    # Skip any PR created by dependabot to avoid permission issues
    if: (github.actor != 'dependabot[bot]')
    steps:
      # Fetch project source
      - uses: actions/checkout@v2

      - uses: returntocorp/semgrep-action@v1
        with:
          config: >- # more at semgrep.dev/explore
            p/security-audit
            p/secrets

        # == Optional settings in the `with:` block

        # Instead of `config:`, use rules set in Semgrep Cloud.
        # Get your credentials from semgrep.dev/manage/settings.
        #   publishDeployment: ${{ secrets.SEMGREP_DEPLOYMENT_ID }}
        #   publishToken: ${{ secrets.SEMGREP_APP_TOKEN }}

        # Never fail the build due to findings on pushes.
        # Instead, just collect findings for semgrep.dev/manage/findings
        #   auditOn: push

        # Upload findings to GitHub Advanced Security Dashboard [step 1/2]
        # See also the next step.
        #   generateSarif: "1"

        # Change job timeout (default is 1800 seconds; set to 0 to disable)
        # env:
        #   SEMGREP_TIMEOUT: 300

      # Upload findings to GitHub Advanced Security Dashboard [step 2/2]
      # - name: Upload SARIF file for GitHub Advanced Security Dashboard
      #   uses: github/codeql-action/upload-sarif@v1
      #   with:
      #     sarif_file: semgrep.sarif
      #   if: always()
```

**Feature support**

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ automatic |
| **hyperlinks in Semgrep Cloud** | ✅ automatic |
| **results in native dashboard**<br/><small>GitHub Advanced Security Dashboard</small> | ✅ available |
| **results in pull request comments** | ✅ [sign up for Semgrep Cloud free](https://semgrep.dev/login) |
| **automatic CI setup** | ✅ [sign up for Semgrep Cloud free](https://semgrep.dev/login) |

# GitLab CI

```yaml
semgrep:
  image: returntocorp/semgrep-agent:v1
  script: semgrep-agent

  rules:
  # Scan changed files in MRs, block on new issues only (existing issues ignored)
  - if: $CI_MERGE_REQUEST_IID
  # Scan all files on default branch, block on any issues
  # - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

  variables:
    SEMGREP_RULES: >- # more at semgrep.dev/explore
      p/security-audit
      p/secrets

  # == Optional settings in the `variables:` block

  # Instead of `SEMGREP_RULES:`, use rules set in Semgrep Cloud.
  # Get your credentials from semgrep.dev/manage/settings.
  #   SEMGREP_CLOUD_DEPLOYMENT_ID: $SEMGREP_CLOUD_DEPLOYMENT_ID
  #   SEMGREP_CLOUD_TOKEN: $SEMGREP_CLOUD_TOKEN

  # Never fail the build due to findings on pushes.
  # Instead, just collect findings for semgrep.dev/manage/findings
  #   SEMGREP_AUDIT_ON: push

  # Upload findings to GitLab SAST Dashboard [step 1/2]
  # See also the next step.
  #   SEMGREP_GITLAB_JSON: "1"

  # Change job timeout (default is 1800 seconds; set to 0 to disable)
  #   SEMGREP_TIMEOUT: 300

  # Upload findings to GitLab SAST Dashboard (remove `script:` line above)
  # script: semgrep-agent --gitlab-json > gl-sast-report.json || true
  # artifacts:
  #   reports:
  #   - gl-sast-report.json
```

**Feature support**

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ automatic |
| **hyperlinks in Semgrep Cloud** | ✅ automatic |
| **results in native dashboard**<br/><small>GitLab SAST Dashboard</small> | ✅ available |
| **results in merge request comments** | ✅ [sign up for beta access](https://go.r2c.dev/join-gitlab-beta) |
| **automatic CI setup** | ❌ not available |

# Jenkins

Use webhooks and the below snippet to integrate with GitHub.

```Groovy
pipeline {
  agent {
    kubernetes {
      yaml """
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: semgrep
            image: 'returntocorp/semgrep-agent:v1'
            command:
            - cat
            tty: true
        """
      defaultContainer 'semgrep'
    }
  }

environment {
    SEMGREP_RULES = "p/security-audit p/secrets" // more at semgrep.dev/explore
    SEMGREP_BASELINE_REF = "origin/${env.CHANGE_TARGET}"

    // == Optional settings in the `environment {}` block

    // Instead of `SEMGREP_RULES:`, use rules set in Semgrep Cloud.
    // Get your credentials from semgrep.dev/manage/settings.
    //   SEMGREP_CLOUD_DEPLOYMENT_ID: credentials('SEMGREP_CLOUD_DEPLOYMENT_ID')
    //   SEMGREP_CLOUD_TOKEN: credentials('SEMGREP_CLOUD_TOKEN')
    //   SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
    //   SEMGREP_BRANCH = "${CHANGE_BRANCH}"
    //   SEMGREP_JOB_URL = "${BUILD_URL}"
    //   SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')
    //   SEMGREP_COMMIT = "${GIT_COMMIT}"
    //   SEMGREP_PR_ID = "${env.CHANGE_ID}"

    // Never fail the build due to findings.
    // Instead, just collect findings for semgrep.dev/manage/findings
    //   SEMGREP_AUDIT_ON = "unknown"

    // Change job timeout (default is 1800 seconds; set to 0 to disable)
    //   SEMGREP_TIMEOUT = "300"
  }

  stages {
    stage('Semgrep_agent') {
      when {
        // Scan changed files in PRs, block on new issues only (existing issues ignored)
        expression { env.CHANGE_ID && env.BRANCH_NAME.startsWith("PR-") }
      }
      steps {
        sh 'git fetch origin ${SEMGREP_BASELINE_REF#origin/} && semgrep-agent'
      }
    }
  }
}
```

**Feature support**

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](#diff-aware-scanning-semgrep_baseline_ref) |
| **hyperlinks in Semgrep Cloud** | ✅ [configure manually](#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep Cloud free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

# Buildkite

```yaml
- label: ":semgrep: Semgrep"
  command: semgrep-agent
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep-agent:v1
        workdir: /<org_name>/<repo_name>
        environment:
          - "SEMGREP_RULES=p/security-audit p/secrets" # more at semgrep.dev/explore

        # == Optional settings in the `environment:` block

        # Instead of `SEMGREP_RULES:`, use rules set in Semgrep Cloud.
        # Get your credentials from semgrep.dev/manage/settings.
        #   - "SEMGREP_CLOUD_DEPLOYMENT_ID=${SEMGREP_CLOUD_DEPLOYMENT_ID}"
        #   - "SEMGREP_CLOUD_TOKEN=${SEMGREP_CLOUD_TOKEN}"
        #   - "SEMGREP_JOB_URL=${BUILDKITE_BUILD_URL}"
        #   - "SEMGREP_BRANCH=${BUILDKITE_BRANCH}"
        #   - "SEMGREP_REPO_NAME=<org_name>/<repo_name>"
        #   - "SEMGREP_REPO_URL=<github_url>"

        # Never fail the build due to findings.
        # Instead, just collect findings for semgrep.dev/manage/findings
        #   - "SEMGREP_AUDIT_ON=unknown"

        # Change job timeout (default is 1800 seconds; set to 0 to disable)
        #   - "SEMGREP_TIMEOUT=300"
```

**Feature support**

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](#diff-aware-scanning-semgrep_baseline_ref)|
| **hyperlinks in Semgrep Cloud** | ✅ [configure manually](#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep Cloud free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

# CircleCI

```yaml
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      repo_path:
        type: string
        default: myorg/semgrep-test-repo
      default_branch:
        type: string
        default: main
      semgrep_deployment_id:
        type: integer
        default: <my-deployment-id>
    environment:
      SEMGREP_RULES: >- # more at semgrep.dev/explore
        p/security-audit
        p/secrets

      # Scan changed files in PRs, block on new issues only (existing issues ignored)
      SEMGREP_BASELINE_REF: << parameters.default_branch >>

    # == Optional settings in the `environment:` block

    # Instead of `SEMGREP_RULES:`, use rules set in Semgrep Cloud.
    # Get your credentials from semgrep.dev/manage/settings.
    #   SEMGREP_CLOUD_DEPLOYMENT_ID: << parameters.semgrep_deployment_id >>
    #   SEMGREP_CLOUD_TOKEN: $SEMGREP_CLOUD_TOKEN
    #   SEMGREP_REPO_NAME: << parameters.repo_path >>
    #   SEMGREP_REPO_URL: << pipeline.project.git_url >>
    #   SEMGREP_BRANCH: << pipeline.git.branch >>

    # Never fail the build due to findings.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: unknown

    # Change job timeout (default is 1800 seconds; set to 0 to disable)
    #   SEMGREP_TIMEOUT: 300

    docker:
      - image: returntocorp/semgrep-agent:v1
    steps:
      - checkout
      - run:
          name: "Semgrep scan"
          command: semgrep-agent
workflows:
  main:
    jobs:
      - semgrep-scan
```

**Feature support**

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](#diff-aware-scanning-semgrep_baseline_ref) |
| **hyperlinks in Semgrep Cloud** | ✅ [configure manually](#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep Cloud free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

# Other providers

To run Semgrep CI on any other provider,
use the `returntocorp/semgrep-agent:v1` Docker image,
and run the `semgrep-agent` command.
Configure via environment variables as below.

Using these instructions, you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo
- Bitbucket Pipelines
- Bitrise
- Buildbot
- Buildkite [(sample configuration)](#buildkite)
- CircleCI [(sample configuration)](#circleci)
- Codeship
- Codefresh
- GitHub Actions [(sample configuration)](#github-actions)
- GitLab CI [(sample configuration)](#gitlab-ci)
- Jenkins [(sample configuration)](#jenkins)
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

# Environment variables reference

## Select rules to scan with (`SEMGREP_RULES`)

```sh
SEMGREP_RULES="p/security-audit p/secrets"
```

## Diff-aware scanning (`SEMGREP_BASELINE_REF`)

For [diff-aware scans](semgrep-ci.md#features), set this variable
to the git ref (branch name, tag, or commit hash) to use as a baseline.
For example, to report findings newly added
since branching off from your `main` branch, set

```sh
SEMGREP_BASELINE_REF=main
```

## Connect to Semgrep Cloud (`SEMGREP_CLOUD_TOKEN`)

Instead of `SEMGREP_RULES`, you can use rules set in Semgrep Cloud.
Get your credentials from [Semgrep Cloud > Settings](https://semgrep.dev/manage/settings).

```
SEMGREP_CLOUD_DEPLOYMENT_ID=0
SEMGREP_CLOUD_TOKEN=secret
```

## Get hyperlinks in Semgrep Cloud

Set these variables to hyperlink to the correct repositories, files, and PRs
in the Semgrep Cloud UI & notifications.

```sh
SEMGREP_REPO_URL="https://github.com/foo/bar"
SEMGREP_BRANCH="feature/add-new-bugs"
SEMGREP_JOB_URL="https://ci-server.com/jobs/1234"
SEMGREP_REPO_NAME="foo/bar"
SEMGREP_COMMIT="a52bc1ef"
SEMGREP_PR_ID="44"
```

## Collect findings silently (`SEMGREP_AUDIT_ON`)

Set this to never fail the build due to findings when scanning.
Instead, just collect findings for [Semgrep Cloud > Findings](https://semgrep.dev/manage/findings).

```
SEMGREP_AUDIT_ON="unknown"
```

## Configure a job timeout (`SEMGREP_TIMEOUT`)

To change the job timeout from the default of 1800 seconds. Set to 0 to disable job timeout.

```sh
SEMGREP_TIMEOUT="300"
```
