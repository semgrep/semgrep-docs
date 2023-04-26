---
slug: configuration-reference
description: "Configure Semgrep in CI by setting various environment variables. Enable diff-aware scanning, connect to Semgrep Cloud Platform, and more."
tags:
    - Semgrep in CI
    - Community Tier
    - Team & Enterprise Tier
title: CI environment variables 
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import BlockFindingsErrorsConfigs from '/src/components/reference/_block-findings-errors-configs.mdx'

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Continuous Integration (CI) environment variables

Use this reference to configure Semgrep's behavior in CI environments by setting environment variables. You can set these variables within a CI configuration file or your CI provider's interface. Refer to your CI provider's documentation for the correct syntax. Examples are written for a Bash environment unless otherwise stated.  

:::tip Testing environment variables locally
You can also set many of these environment variables within your local development environment. Set these variables in your command line then run `semgrep ci --config p/default` while logged out of Semgrep CLI to test these environment variables locally. 
:::

## Environment variables for configuring scan behavior

These environment variables configure various aspects of your CI job, such as a job's timeout or source of rules.

### `SEMGREP_APP_TOKEN`

:::info Prerequisites
* You must have a Semgrep Cloud Platform account to use this environment variable.
* You must have a Semgrep Cloud Platform token. To generate a token, see [Creating a `SEMGREP_APP_TOKEN`](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#creating-a-semgrep_app_token).
:::

Set `SEMGREP_APP_TOKEN` to send findings to Semgrep Cloud Platform and use rules from the Rule Board. `SEMGREP_APP_TOKEN` is incompatible with `SEMGREP_RULES`.

Example:

```bash
export SEMGREP_APP_TOKEN="038846a866f19972ba435754cab85d6bd926ca51107029249eb88441271341ad"
```
:::caution
Do not set `SEMGREP_RULES` environment variable within the same CI job as `SEMGREP_APP_TOKEN`.
:::


### `SEMGREP_BASELINE_REF`

Set `SEMGREP_BASELINE_REF` to enable **[diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning)** for CI providers that are **not** GitHub Actions or GitLab CI/CD. `SEMGREP_BASELINE_REF` refers to your codebase's default or trunk branch, such as `main` or `master`.

Example:

```bash
export SEMGREP_BASELINE_REF="main"
```

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

Set `SEMGREP_TIMEOUT` to define a custom timeout. The value must be in seconds. The default value is 30 seconds. This timeout refers to the maximum amount of time Semgrep spends scanning a single file. By default, it attempts to scan each file with this timeout three times; you can control this using `--timeout-threshold`.

Example:

```bash
export SEMGREP_TIMEOUT="20"
```

## Environment variables for creating hyperlinks in Semgrep Cloud Platform

By default, Semgrep Cloud Platform autodetects values such as the name of your repository, which Semgrep uses to generate hyperlinks (URLs) to the specific repository code that generated the finding. These hyperlinks are in the [Findings](/docs/semgrep-code/findings) page.

Set any as needed or all of the following environment variables to troubleshoot and override autodetected CI environment values.

### `SEMGREP_BRANCH`

Set `SEMGREP_BRANCH` to define the branch name for the URL used to generate hyperlinks in the [Findings](/docs/semgrep-code/findings) page. To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job. 

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

### `SEMGREP_COMMIT`

Set `SEMGREP_COMMIT` to define the commit hash for the URL used to generate hyperlinks in the [Findings](/docs/semgrep-code/findings) page. To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job. 

Examples:

Within a Bash environment:

```bash
# This is a hardcoded value and must be changed to scan other branches.
export SEMGREP_COMMIT="juice-shop-1"
```

Within a BitBucket Pipelines configuration file:

```yaml
image: atlassian/default-image:latest

pipelines:
  default:
    - parallel:
      - step:
        name: 'Run Semgrep scan with current branch'
        script:
          # Use a BitBucket Pipelines environment variable.
          # It automatically sets the current commit the job is scanning.
          - export SEMGREP_COMMIT=$BITBUCKET_COMMIT 
          ...
```

### `SEMGREP_REPO_NAME`

Set `SEMGREP_REPO_NAME` to define the repository name for the URL used to generate hyperlinks in the [Findings](/docs/semgrep-code/findings) page. To avoid hardcoding this value, check your CI provider's documentation for available environment variables that can automatically detect the correct values for every CI job. 

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
      ..

```

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

The following environment variable enables Semgrep Cloud Platform to create comments within your source code management (SCM) tool when Semgrep scans a pull or merge request. These comments can include code suggestions to fix a finding.

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
  - env:
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
    ...
```

## Environment variable for creating comments in BitBucket pull requests


### `BITBUCKET_TOKEN`

Set `BITBUCKET_TOKEN` to enable Semgrep to leave PR or MR comments in Bitbucket Cloud. The value of this environment variable must be a Personal Access Token (PAT) generated from Bitbucket Cloud. See [Bitbucket PR comments](semgrep-cloud-platform/bitbucket-pr-comments) for instructions.

Example:

```yaml
- export BITBUCKET_TOKEN=$PAT
```


## Environment variables to enable GitLab MR comments for non-standard CI configurations

<pre class="language-bash"><code>
export GITLAB_CI='true'<br/>
export CI_PROJECT_PATH='<span className="placeholder">USERNAME</span>/<span className="placeholder">PROJECTNAME</span>'<br/>
export CI_MERGE_REQUEST_PROJECT_URL='https://gitlab.com/<span className="placeholder">USERNAME</span>/<span className="placeholder">PROJECTNAME</span>'<br/>
export CI_PROJECT_URL="$CI_MERGE_REQUEST_PROJECT_URL"<br/>
export CI_COMMIT_SHA='<span className="placeholder">COMMIT-SHA-VALUE</span>'<br/>
export CI_COMMIT_REF_NAME='<span className="placeholder">REF</span>'<br/>
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME='<span className="placeholder">BRANCH_NAME</span>'<br/>
export CI_JOB_URL='<span className="placeholder">JOB_URL</span>'<br/>
export CI_PIPELINE_SOURCE='merge_request_event'<br/>
export CI_MERGE_REQUEST_IID='<span className="placeholder">REQUEST_IID</span>'<br/>
export CI_MERGE_REQUEST_DIFF_BASE_SHA='<span className="placeholder">SHA</span>'<br/>
export CI_MERGE_REQUEST_TITLE='<span className="placeholder">MERGE_REQUEST_TITLE</span>'<br/>
</code></pre>

Replace magenta-colored placeholders in the preceding code snippet with your specific values (for example <code><span className="placeholder">USERNAME</span></code>). For more information on all of these variables see GitLab documentation [Predefined variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html). You can find an exhaustive example with sample values in [List all environment variables](https://docs.gitlab.com/ee/ci/variables/index.html#list-all-environment-variables).

Example with sample values:

```sh
export GITLAB_CI='true'
export CI_PROJECT_PATH="gitlab-org/gitlab-foss"
export CI_MERGE_REQUEST_PROJECT_URL="https://example.com/gitlab-org/gitlab-foss"
export CI_PROJECT_URL="$CI_MERGE_REQUEST_PROJECT_URL"
export CI_COMMIT_SHA="1ecfd275763eff1d6b4844ea3168962458c9f27a"
export CI_COMMIT_REF_NAME="main"
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME="main"
export CI_JOB_URL="https://gitlab.com/gitlab-examples/ci-debug-trace/-/jobs/379424655"
export CI_PIPELINE_SOURCE='merge_request_event'
export CI_MERGE_REQUEST_IID="1"
export CI_MERGE_REQUEST_DIFF_BASE_SHA="1ecfd275763eff1d6b4844ea6874447h694gh23d"
export CI_MERGE_REQUEST_TITLE="Testing branches"
```

