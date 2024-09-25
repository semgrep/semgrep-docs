---
slug: ci-environment-variables
description: "Configure Semgrep in CI by setting various environment variables. Enable diff-aware scanning, connect to Semgrep AppSec Platform, and more."
tags:
    - Deployment
title: CI environment variables
hide_title: true
---

import BlockFindingsErrorsConfigs from '/src/components/reference/_block-findings-errors-configs.mdx'

# Continuous integration (CI) environment variables

Use this reference to configure Semgrep's behavior in CI environments by setting environment variables. You can set these variables within a CI configuration file or your CI provider's interface. Refer to your CI provider's documentation for the correct syntax. Examples are written for a Bash environment unless otherwise stated.

:::tip Test environment variables locally
- Semgrep attempts to autodetect CI environment variables necessary to run CI scans. You can override these values by setting variables explicitly.
- You can also set many of these environment variables within your local development environment. Set these variables in your command line then run `semgrep ci` while logged in Semgrep CLI to test these environment variables locally.
:::

## Environment variables for configuring scan behavior

These environment variables configure various aspects of your CI job, such as a job's timeout or source of rules.

### `SEMGREP_APP_TOKEN`

:::info Prerequisites
* You must have a Semgrep AppSec Platform account to use this environment variable.
* You must have a Semgrep AppSec Platform token. To generate a token, see [Creating a `SEMGREP_APP_TOKEN`](/deployment/add-semgrep-to-other-ci-providers#create-a-semgrep_app_token).
:::

Set `SEMGREP_APP_TOKEN` to send findings to Semgrep AppSec Platform and use rules from the Policies page. `SEMGREP_APP_TOKEN` is incompatible with `SEMGREP_RULES`.

Example:

```bash
export SEMGREP_APP_TOKEN="038846a866f19972ba435754cab85d6bd926ca51107029249eb88441271341ad"
```
:::caution
Do not set `SEMGREP_RULES` environment variable within the same CI job as `SEMGREP_APP_TOKEN`.
:::


### `SEMGREP_BASELINE_REF`

Set `SEMGREP_BASELINE_REF` to enable **[diff-aware scanning](/deployment/customize-ci-jobs#set-up-diff-aware-scans)** for CI providers that are **not** GitHub Actions or GitLab CI/CD. `SEMGREP_BASELINE_REF` typically is set to your codebase's default or trunk branch, such as `main` or `master`.

Example:

```bash
export SEMGREP_BASELINE_REF="main"
```
:::info
`SEMGREP_BASELINE_REF` is superseded by `SEMGREP_BASELINE_COMMIT`.
:::

### `SEMGREP_BASELINE_COMMIT`

Set `SEMGREP_BASELINE_COMMIT` to a commit hash to only show results that are **not** found in that hash. Generally this is used to enable **[diff-aware scanning](/deployment/customize-ci-jobs#set-up-diff-aware-scans)** for CI providers that are **not** GitHub Actions or GitLab CI/CD. 

This environment variable doesn't work if you are not currently in a Git directory, there are unstaged changes, or the given baseline hash doesn't exist or is not available in the CI environment.

If you set `SEMGREP_BASELINE_COMMIT` in CI to enable diff-aware scanning, the ideal value is the git merge-base between the branch being scanned and the target branch that the code will be merged into. For example:

```bash
export SEMGREP_BASELINE_COMMIT=$(git merge-base main feature-brach)
```
To avoid harcoding the branch names, check your CI provider's documentation for available variables that provide the correct values for every CI job. For example, in a Jenkins environment:

```
SEMGREP_BASELINE_REF=$(git merge-base $GIT_BRANCH $CHANGE_TARGET)
```

:::info
The value of `SEMGREP_BASELINE_COMMIT` is superseded when the option `--baseline-commit` is set as part of the scan command.
:::

### `SEMGREP_ENABLE_VERSION_CHECK`

Set `SEMGREP_ENABLE_VERSION_CHECK` to 0 to **disable** version checks when running `semgrep ci`. By default, Semgrep checks for new versions.

Example:

```bash
# Disable version checks when running semgrep ci:
export SEMGREP_ENABLE_VERSION_CHECK="0"
```

### `SEMGREP_GHA_MIN_FETCH_DEPTH`

:::tip
Only set `SEMGREP_GHA_MIN_FETCH_DEPTH` if you are encountering findings duplication within your diff-aware scans.
:::

Set `SEMGREP_GHA_MIN_FETCH_DEPTH` to configure the **minimum** number of commits `semgrep ci` fetches from `remote` when calculating the merge-base in GitHub Actions. For optimal performance, set `SEMGREP_GHA_MIN_FETCH_DEPTH` with a higher number of commits. Having more commits available helps Semgrep determine what changes came from the current pull request, fixing issues where Semgrep would otherwise report findings that were not touched in a given pull request. This value is set to 0 by default.

Example:

```bash
export SEMGREP_GHA_MIN_FETCH_DEPTH="10"
```

### `SEMGREP_GIT_COMMAND_TIMEOUT`

Set `SEMGREP_GIT_COMMAND_TIMEOUT` to set a timeout for each individual Git command that Semgrep runs. The value is in seconds. The default value is 300 seconds (5 minutes).

Example:

```bash
# Set each Git command that Semgrep runs to timeout in 3 minutes:
export SEMGREP_GIT_COMMAND_TIMEOUT="180"
```

### `SEMGREP_RULES`

Set `SEMGREP_RULES` to define rules and rulesets for your scan. Findings are logged within your CI environment. `SEMGREP_RULES` is incompatible with `SEMGREP_APP_TOKEN`.

Examples:

```bash
# Define a single ruleset:
export SEMGREP_RULES="p/default"

# Define multiple rule sources, delimited by a space:
export SEMGREP_RULES="p/default no-exec.yml"
```

:::caution
Do not set `SEMGREP_APP_TOKEN` environment variable within the same CI job as `SEMGREP_RULES`.
:::

### `SEMGREP_TIMEOUT`

Set `SEMGREP_TIMEOUT` to define a custom timeout. The value must be in seconds. The default value is 5 seconds. This timeout refers to the maximum amount of time Semgrep spends running a single rule on a single file. By default, it attempts to scan each rule/file combination with this timeout three times; you can control this using `--timeout-threshold`.

Example:

```bash
export SEMGREP_TIMEOUT="20"
```

## Environment variables for creating hyperlinks in Semgrep AppSec Platform

By default, Semgrep AppSec Platform autodetects values such as the name of your repository, which Semgrep uses to generate hyperlinks (URLs) to the specific repository code that generated the finding. These hyperlinks are in the [Findings](/docs/semgrep-code/findings) page.

Set any as needed or all of the following environment variables to troubleshoot and override autodetected CI environment values.

### `SEMGREP_BRANCH`

Set `SEMGREP_BRANCH` to define the branch name for the scan, if the branch name is not auto-detected or you want to override it. The branch name is used in the following ways:

* To track findings in the same branch over time
* To show in which branches a finding was identified (including links to the branch in the [Findings](/docs/semgrep-code/findings) page)

To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

Examples:

Within a Bash environment:

```bash
# This is a hardcoded value and must be changed to scan other branches.
export SEMGREP_BRANCH="juice-shop-1"
```

Within a Buildkite configuration file:

```yaml
- label: ":semgrep: Semgrep"
commands:
  # Use a Buildkite environment variable.
  # It automatically sets the current branch the job is scanning.
  - export SEMGREP_BRANCH=${BUILDKITE_BRANCH}
  ...
```

Semgrep AppSec Platform normalizes the branch prefix `refs/heads/` for findings, so the branch value `refs/heads/develop` is treated the same way as `develop`.

### `SEMGREP_COMMIT`

Set `SEMGREP_COMMIT` to define the commit hash for the URL used to generate hyperlinks in the [Findings](/docs/semgrep-code/findings) page. To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

Examples:

Within a Bash environment:

```bash
# This is a hardcoded value and must be changed to scan other branches.
export SEMGREP_COMMIT="e0802db56318803b09e1023955d4f4767fc934ed"
```

Within a Bitbucket Pipelines configuration file:

```yaml
image: atlassian/default-image:latest

pipelines:
  default:
    - parallel:
      - step:
        name: 'Run Semgrep scan with current branch'
        script:
          # Use a Bitbucket Pipelines environment variable.
          # It automatically sets the current commit the job is scanning.
          - export SEMGREP_COMMIT=$BITBUCKET_COMMIT
          ...
```

### `SEMGREP_REPO_NAME`

Set `SEMGREP_REPO_NAME` to create a repository name when scanning with a [CI provider that Semgrep doesn't provide explicit support for](/deployment/add-semgrep-to-other-ci-providers/). For hyperlinks and PR comments to work, this name should be the same as the repository name understood by your CI provider.

To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

Semgrep automatically detects `SEMGREP_REPO_NAME` if your [provider is listed in Semgrep AppSec Platform](/deployment/add-semgrep-to-other-ci-providers). In this case, there is no need to set the variable.

Examples:

Within a Bash environment:

```bash
# This is a hardcoded value and must be changed to scan other repositories.
export SEMGREP_REPO_NAME="corporation/s_juiceshop"
```

Within a CircleCI environment:

```yaml
jobs:
  semgrep-scan:
    environment:
      ...
      # Use a CircleCI environment variable.
      # It automatically sets the current repository name the job is scanning.
      SEMGREP_REPO_NAME: '$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME'
      ...

```

### `SEMGREP_REPO_DISPLAY_NAME`

Set `SEMGREP_REPO_DISPLAY_NAME` to define the name displayed for the project in Semgrep AppSec Platform. By default, `SEMGREP_REPO_DISPLAY_NAME` has the same value as `SEMGREP_REPO_NAME`. This allows you to use a different name for your project than the repository name, while retaining hyperlink and PR/MR comment functionality. It can also be used when [scanning a monorepo in parts](/kb/semgrep-ci/scan-monorepo-in-parts) to display each part as a separate project in Semgrep AppSec Platform.

:::info
This environment variable only works with Semgrep versions 1.61.1 and later.
:::

Setting `SEMGREP_REPO_DISPLAY_NAME` only changes the project that scan results are reported to. The scan still uses the configuration information (such as [project ignores](https://semgrep.dev/docs/ignoring-files-folders-code#define-ignored-files-and-folders-in-semgrep-appsec-platform)) from the repo name detected by Semgrep or set by `SEMGREP_REPO_NAME`.

### `SEMGREP_REPO_URL`

Set `SEMGREP_REPO_URL` to define the repository URL used to generate hyperlinks in the [Findings](/docs/semgrep-code/findings) page. To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

Examples:

Within a Bash environment:

```bash
# This is a hardcoded value and must be changed to scan other repositories.
export SEMGREP_REPO_URL="https://github.com/corporation/s_juiceshop"
```

Within a CircleCI environment:

```yaml
jobs:
  semgrep-scan:
    environment:
      ...
      # Use a CircleCI environment variable.
      # It automatically sets the current repository URL.
      SEMGREP_REPO_URL: << pipeline.project.git_url >>
      ...
```

## Environment variable for creating comments in pull or merge requests

The following environment variable enables Semgrep AppSec Platform to create comments within your source code management (SCM) tool when Semgrep scans a pull or merge request. These comments can include code suggestions to fix a finding.

<!-- Commented out SEMGREP_JOB_URL for now as it's not being used for any direct functionality
### `SEMGREP_JOB_URL`

:::info
The following environment variable can only be set within a CI environment.
:::

Set `SEMGREP_JOB_URL` to enable Semgrep to leave PR or MR comments in your SCM. Check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

The following example uses Jenkins declarative syntax:

```javascript
pipeline {
  agent any
      environment {
      SEMGREP_JOB_URL="${BUILD_URL}"
      ...
``` -->

### `SEMGREP_PR_ID`

Set `SEMGREP_PR_ID` to enable Semgrep to leave PR or MR comments in your SCM. Check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job.

The following example uses Azure Pipelines:

```yaml
...
steps:
  - script: |
    ...
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
    ...
```

## Environment variable for creating comments in Bitbucket pull requests


### `BITBUCKET_TOKEN`

**Optional**: If you're not receiving PR comments or your code hyperlinks aren't displaying in Semgrep AppSec Platform, try setting the `BITBUCKET_TOKEN` environment variable. The value of this environment variable must be a Personal Access Token (PAT) generated from Bitbucket Cloud. See [Bitbucket PR comments](/semgrep-appsec-platform/bitbucket-cloud-pr-comments) for instructions.

Example:

```yaml
- export BITBUCKET_TOKEN=$PAT
```
