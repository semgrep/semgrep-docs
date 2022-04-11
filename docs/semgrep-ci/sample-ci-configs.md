---
slug: sample-ci-configs
append_help_link: true
description: "The sample configuration files below run Semgrep CI on continuous integration platforms such as GitHub, GitLab, Jenkins, Buildkite, CircleCI, and other providers."
---

import MoreHelp from "/src/components/MoreHelp"

# Sample CI configurations

The sample configuration files below run Semgrep CI on various continuous integration providers.

## GitHub Actions

```yaml
name: Semgrep

on:
  # Scan changed files in PRs, block on new issues only (existing issues ignored)
  pull_request: {}

  # Scan all files on branches, block on any issues
  # push:
  #   branches: ["master", "main"]

  # Schedule this job to run at a certain time, using cron syntax
  # Note that * is a special character in YAML so you have to quote this string
  # schedule:
  #   - cron: '30 0 1,15 * *' # scheduled for 00:30 UTC on both the 1st and 15th of the month

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

        # Instead of `config:`, use rules set in Semgrep App.
        # Get your token from semgrep.dev/manage/settings.
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

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ automatic |
| **hyperlinks in Semgrep App** | ✅ automatic |
| **results in native dashboard**<br/><small>GitHub Advanced Security Dashboard</small> | ✅ available |
| **results in pull request comments** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |
| **automatic CI setup** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |

## GitLab CI

```yaml
semgrep:
  image: returntocorp/semgrep
  script: semgrep ci

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

  # Instead of `SEMGREP_RULES:`, use rules set in Semgrep App.
  # Get your token from semgrep.dev/manage/settings.
  #   SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN

  # Receive inline MR comments (requires Semgrep App account)
  # Setup instructions: https://semgrep.dev/docs/notifications/#gitlab-merge-request-comments
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

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ automatic |
| **hyperlinks in Semgrep App** | ✅ automatic |
| **results in native dashboard**<br/><small>GitLab SAST Dashboard</small> | ✅ available |
| **results in merge request comments** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

## Jenkins

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

    // Instead of `SEMGREP_RULES:`, use rules set in Semgrep App.
    // Get your token from semgrep.dev/manage/settings.
    //   SEMGREP_APP_TOKEN: credentials('SEMGREP_APP_TOKEN')
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
    stage('Semgrep CI') {
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

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](configuration-reference.md#diff-aware-scanning-semgrep_baseline_ref) |
| **hyperlinks in Semgrep App** | ✅ [configure manually](configuration-reference.md#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

## Buildkite

```yaml
- label: ":semgrep: Semgrep"
  command: semgrep ci
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep
        workdir: /<org_name>/<repo_name>
        environment:
          - "SEMGREP_RULES=p/security-audit p/secrets" # more at semgrep.dev/explore

        # == Optional settings in the `environment:` block

        # Instead of `SEMGREP_RULES:`, use rules set in Semgrep App.
        # Get your token from semgrep.dev/manage/settings.
        #   - "SEMGREP_APP_TOKEN=${SEMGREP_APP_TOKEN}"
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

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](configuration-reference.md#diff-aware-scanning-semgrep_baseline_ref)|
| **hyperlinks in Semgrep App** | ✅ [configure manually](configuration-reference.md#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

## CircleCI

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
    environment:
      SEMGREP_RULES: >- # more at semgrep.dev/explore
        p/security-audit
        p/secrets

      # Scan changed files in PRs, block on new issues only (existing issues ignored)
      SEMGREP_BASELINE_REF: << parameters.default_branch >>

    # == Optional settings in the `environment:` block

    # Instead of `SEMGREP_RULES:`, use rules set in Semgrep App.
    # Get your token from semgrep.dev/manage/settings.
    #   SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
    #   SEMGREP_REPO_NAME: << parameters.repo_path >>
    #   SEMGREP_REPO_URL: << pipeline.project.git_url >>
    #   SEMGREP_BRANCH: << pipeline.git.branch >>

    # Never fail the build due to findings.
    # Instead, just collect findings for semgrep.dev/manage/findings
    #   SEMGREP_AUDIT_ON: unknown

    # Change job timeout (default is 1800 seconds; set to 0 to disable)
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

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](configuration-reference.md#diff-aware-scanning-semgrep_baseline_ref) |
| **hyperlinks in Semgrep App** | ✅ [configure manually](configuration-reference.md#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ✅ [sign up for Semgrep App free](https://semgrep.dev/login) |
| **automatic CI setup** | ❌ not available |

## Other providers

To run Semgrep CI on any other provider, use the `returntocorp/semgrep` image, and run the `semgrep ci` command.

**Note**: If you need to use a different image than docker, install Semgrep CI by `pip install semgrep`.

Using the [configuration reference](../configuration-reference/), you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo
- Bitbucket Pipelines
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
