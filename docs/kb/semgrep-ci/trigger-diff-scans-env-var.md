---
title: How to trigger diff-aware scans
toc_max_heading_level: 2
description: Learn how to run a diff-aware scan.
---

# How to trigger diff-aware scans

When working with a CI provider, you can set Semgrep to run **[diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans)** as well as full scans. Diff-aware scans run on your code before and after some baseline, and only report findings newly introduced in the commits after that baseline.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="github"
    values={[
      {label: 'Azure DevOps', value: 'azure'},
      {label: 'Bitbucket', value: 'bitbucket'},
      {label: 'GitHub', value: 'github'},
      {label: 'GitLab', value: 'gitlab'},
      {label: 'Jenkins', value: 'jenkins'},
      {label: 'Other CI providers', value: 'other'}
    ]}
>


<TabItem value='azure'>

To add this configuration in Azure Pipelines, follow the general instructions provided in [Sample CI configurations: Azure Pipelines](/docs/semgrep-ci/sample-ci-configs#azure-pipelines). If your repository's default branch is not `main`, change the references to `main` to the name of your default branch.

```yaml
steps:
- checkout: self
  clean: true
  fetchDepth: 20
persistCredentials: true
- script: |
    python -m pip install --upgrade pip
    pip install semgrep
    if [ $(System.PullRequest.PullRequestId) -ge 0 ]; then
      echo "Pull Request Scan from branch: $(Build.SourceBranchName)"
      git fetch origin main:origin/main
      export SEMGREP_PR_ID=$(System.PullRequest.PullRequestId)
      export SEMGREP_BASELINE_REF='origin/main'
      semgrep ci
```

If you are also running full scans for the repository (recommended) you can either use if clauses or define separate templates for full scans and [diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans) in Azure Pipelines. Diff-aware scans require the use of the  `SEMGREP_PR_ID` and `SEMGREP_BASELINE_REF` variables, while full scans do not. Full scans would typically be run on the condition `if [ $(Build.SourceBranchName) = "main" ]`.

</TabItem>

<TabItem value='bitbucket'>

In the Bitbucket Pipelines configuration file, set [`SEMGREP_BASELINE_REF`](/semgrep-ci/ci-environment-variables#semgrep_baseline_ref) to enable diff-aware scanning:

```yaml
image: semgrep/semgrep:latest

pipelines:
  ...
  pull-requests:
    '**':
      - step:
        name: Semgrep scan on PR
        script:
          - export SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN
          - export BITBUCKET_TOKEN=$PAT # Necessary for PR comments
          # Change to your default branch if different from main
          - export SEMGREP_BASELINE_REF="origin/main"
          - git fetch origin "+refs/heads/*:refs/remotes/origin/*"
          - semgrep ci
```

</TabItem>

<TabItem value='github'>

Include the following definition in your GitHub Actions configuration file to enable diff-aware scanning:

```yaml
on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}
```

### Example

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep

on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}

jobs:
  semgrep:
    # User definable name of this GitHub Actions job.
    name: semgrep/ci
    # If you are self-hosting, change the following `runs-on` value:
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: semgrep/semgrep

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      # Fetch project source with GitHub Actions Checkout. Use either v3 or v4.
      - uses: actions/checkout@v4
      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci
        env:
          # Connect to Semgrep AppSec Platform through your SEMGREP_APP_TOKEN.
          # Generate a token from Semgrep AppSec Platform > Settings
          # and add it to your GitHub secrets.
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

</TabItem>
<TabItem value='gitlab'>

Set up your `.gitlab-ci.yml` conditions (usually `rules`) to run a scan if `$CI_MERGE_REQUEST_IID` is defined. Semgrep automatically runs a diff-aware scan if the variable is present, as it is in merge request pipelines:

```yaml
rules:
  # Scan changed files in MRs, (diff-aware scanning):
  - if: $CI_MERGE_REQUEST_IID
```
### Example

```yaml
semgrep:
  # A Docker image with Semgrep installed.
  image: semgrep/semgrep
  # Run the "semgrep ci" command on the command line of the docker image.
  script: semgrep ci

  rules:
    # Scan changed files in MRs, (diff-aware scanning):
    - if: $CI_MERGE_REQUEST_IID

  variables:
    # Connect to Semgrep AppSec Platform through your SEMGREP_APP_TOKEN.
    # Generate a token from Semgrep AppSec Platform > Settings
    # and add it as a variable in your GitLab CI/CD project settings.
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN

    # Optional variable to receive MR comments. Setup instructions:
    # https://semgrep.dev/docs/semgrep-appsec-platform/gitlab-mr-comments
    # GITLAB_TOKEN: $PAT
```

</TabItem>
<TabItem value='jenkins'>

Jenkins is highly configurable and there are multiple approaches to setting up diff-aware scans.

See the following articles for detailed guides:

* [Set up Jenkins pipeline projects for Bitbucket repositories](/docs/kb/semgrep-ci/bitbuket-jenkins-pipeline-projects)
* [Full and diff-aware scans with GitHub and Jenkins](/docs/kb/semgrep-ci/jenkins-diff-scans)

</TabItem>
<TabItem value='other'>

Set [`SEMGREP_BASELINE_REF`](/semgrep-ci/ci-environment-variables#semgrep_baseline_ref) to enable diff-aware scanning:

```console
export SEMGREP_BASELINE_REF="main"
```

You may need to perform additional `git checkout` steps to ensure that the configured baseline ref is available in the scan environment along with the source branch.

</TabItem>
</Tabs>
