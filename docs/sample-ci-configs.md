---
append_help_link: true
---

# Sample CI configurations

The sample configuration files below
run [Semgrep CI](https://github.com/returntocorp/semgrep-action)
on various continuous integration providers.

These samples all connect to a [Semgrep App](https://semgrep.dev/manage) account.
The configurations refer to `SEMGREP_DEPLOYMENT_ID` and `SEMGREP_APP_TOKEN`,
which are essentially a username and a password.
You can find the correct values for these variables
on the [Dashboard > Settings](https://semgrep.dev/manage/settings) page.

If you don't want to use an online account,
you can remove the usages of these variables,
and instead use the `--config` flag
to set which rules to scan with.

<!-- prettier-ignore-start -->
!!! danger
    `SEMGREP_APP_TOKEN` is a secret value: **do not hardcode it and leak credentials!**
Use your CI provider's secret or environment variable management feature to store it.
<!-- prettier-ignore-end -->

[TOC]

# GitHub Actions

Semgrep CI will [auto-detect CI context](semgrep-ci.md#features)
when running in GitHub Actions.
Scans on pull requests are diff-aware and will report only newly added findings.

The easiest way to set up Semgrep CI integration in GitHub Actions
is via [Dashboard > Projects](https://semgrep.dev/manage/projects) in Semgrep App.
The app can generate and commit a workflow YAML file
to your project based on the settings you select.
You can also copy the file contents
and commit them to `.github/workflows/semgrep.yml` manually,
or write your own workflow file based on this sample:

<p>

```yaml
name: Semgrep

on:
  # Run on all pull requests. Returns the results introduced by the PR.
  pull_request: {}

  # Run on merges. Returns all results.
  #push:
  #    branches: ["master", "main"]

jobs:
  semgrep:
    name: Scan
    runs-on: ubuntu-latest
    steps:
      # Checkout project source
      - uses: actions/checkout@v2

      # Scan code using project's configuration on https://semgrep.dev/manage
      - uses: returntocorp/semgrep-action@v1

        # Optionally configure job timeout (default is 1800 seconds; set to 0 to disable)
        #env:
        #  SEMGREP_TIMEOUT: 300

        with:
          publishToken: ${{ secrets.SEMGREP_APP_TOKEN }}
          publishDeployment: ${{ secrets.SEMGREP_DEPLOYMENT_ID }}

          # Never fail the build due to findings on pushes, but collect findings data
          #auditOn: push

          # Generate a SARIF file for GitHub's code scanning feature. See the next step.
          #generateSarif: "1"

      # Upload SARIF file generated in previous step
      #- name: Upload SARIF file
      #  uses: github/codeql-action/upload-sarif@v1
      #  with:
      #    sarif_file: semgrep.sarif
      #  if: always()
```

</p>

# GitLab CI

Semgrep CI will [auto-detect CI context](semgrep-ci.md#features)
when running in GitLab CI.
Scans on merge requests are diff-aware and will report only newly added findings.

The [`template` used in this sample](https://docs.gitlab.com/ee/ci/yaml/#workflowrules-templates) configuration
will run Semgrep on pushes to merge requests, your default branch, and tags.
Feel free to replace this with another set of events you'd like to run on.

<!-- TODO: change INPUT_CONFIG to SEMGREP_RULES -->

```yaml
semgrep:
  image: returntocorp/semgrep-agent:v1
  script: semgrep-agent
  variables:
    INPUT_CONFIG: >- # more at semgrep.dev/explore
      p/security-audit
      p/secrets
  rules:
  # scan merge requests for new issues only (existing issues ignored)
  - if: $CI_MERGE_REQUEST_IID
  # scan pushes to default branch for all issues
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Connecting to Semgrep App

To log in to Semgrep App and use centrally managed policies,
update the `script:` command to:

```yaml
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

# Buildkite

<p>

```yaml
- label: ":semgrep: Semgrep"
  command: semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
  plugins:
    - docker#v3.7.0:
        image: returntocorp/semgrep-agent:v1
        workdir: /<org_name>/<repo_name>
        environment:
          - "SEMGREP_JOB_URL=${BUILDKITE_BUILD_URL}"
          - "SEMGREP_BRANCH=${BUILDKITE_BRANCH}"
          - "SEMGREP_REPO_NAME=<org_name>/<repo_name>"
          - "SEMGREP_REPO_URL=<github_url>"
```

</p>

# CircleCI

<p>

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
        default: *my deployment id*
    environment:
      SEMGREP_REPO_NAME: << parameters.repo_path >>
      SEMGREP_REPO_URL: << pipeline.project.git_url >>
      SEMGREP_BRANCH: << pipeline.git.branch >>
    docker:
      - image: returntocorp/semgrep-agent:v1
    steps:
      - checkout
      - run:
          name: "Semgrep scan"
          command: |
            semgrep-agent \
              --publish-deployment << parameters.semgrep_deployment_id >> \
              --publish-token $SEMGREP_APP_TOKEN \
              --baseline-ref << parameters.default_branch >>
workflows:
  main:
    jobs:
      - semgrep-scan
```

</p>

# Jenkins

With diff-scan trigger only for jobs, use webhooks to integrate to Github

<p>
  
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

    // secrets for Semgrep org ID and auth token
    SEMGREP_APP_TOKEN     = credentials('SEMGREP_APP_TOKEN')
    SEMGREP_DEPLOYMENT_ID = credentials('SEMGREP_DEPLOYMENT_ID')

    // environment variables for semgrep_agent (for findings / analytics page)
    // remove .git at the end
    SEMGREP_REPO_URL = env.GIT_URL.replaceFirst(/^(.*).git$/,'$1')
    SEMGREP_BRANCH = "${CHANGE_BRANCH}"
    SEMGREP_JOB_URL = "${BUILD_URL}"
    // remove SCM URL + .git at the end
    SEMGREP_REPO_NAME = env.GIT_URL.replaceFirst(/^https:\/\/github.com\/(.*).git$/, '$1')

    SEMGREP_COMMIT = "${GIT_COMMIT}"
    SEMGREP_PR_ID = "${env.CHANGE_ID}"
    BASELINE_BRANCH = "${env.CHANGE_TARGET}"

}

stages {
stage('Semgrep_agent') {
when {
expression { env.CHANGE_ID && env.BRANCH_NAME.startsWith("PR-") }
}
steps{
sh 'env && git fetch origin $BASELINE_BRANCH && python -m semgrep_agent --baseline-ref origin/$BASELINE_BRANCH --publish-token $SEMGREP_APP_TOKEN --publish-deployment $SEMGREP_DEPLOYMENT_ID'
}
}
}
}

````

</p>

# Other providers

To run Semgrep CI on any other provider,
use the [`returntocorp/semgrep-agent:v1` Docker image](semgrep-ci.md#packaging),
and run this command in your Docker container:

```sh
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
````

To get [CI context awareness](semgrep-ci.md#features),
you can optionally provide the following environment variables:

<p>

```sh
# Set additional environment variables
SEMGREP_BRANCH=mybranch
SEMGREP_COMMIT=abcd1234  # commit SHA being scanned
SEMGREP_JOB_URL=https://example.com/me/myjob  # URL to CI logs
SEMGREP_REPO_NAME=myorg/myrepository  # project name to show on Semgrep App
SEMGREP_REPO_URL=https://gitwebsite.com/myrepository
SEMGREP_PR_ID=123
SEMGREP_PR_TITLE="Added four new bugs"  # shown in Slack notifications if set
SEMGREP_TIMEOUT=1800  # Maximum Semgrep run time in seconds, or 0 to disable timeouts

# Run semgrep_agent
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>

For [diff-aware scans](semgrep-ci.md#features), set the `--baseline-ref` flag
to the git ref (branch name, tag, or commit hash) to use as a baseline.
For example, to report findings newly added
since branching off from your `main` branch, run

```sh
semgrep-agent --baseline-ref main
```

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
- Jenkins
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).
