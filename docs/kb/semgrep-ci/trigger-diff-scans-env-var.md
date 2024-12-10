---
title: How to trigger diff-aware scans
toc_max_heading_level: 2
description: Learn how to run a diff-aware scan.
---

# How to trigger diff-aware scans

When working with a CI provider, you can set Semgrep to run **[diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans)** instead of full scans. Diff-aware scans run on your code before and after some baseline and only reports findings newly introduced in the commits after that baseline.


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

Create a `templates` folder in the repository where you want to run Semgrep. Then, commit the following template for a Semgrep diff-aware scan:

```yaml
steps:
- checkout: self
  clean: true
  fetchDepth: 10000
persistCredentials: true
- script: |
    echo "Pull Request Scan from branch: $(Build.SourceBranchName)"
    git fetch origin main:origin/main
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci
  env:
  SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
  SEMGREP_BASELINE_REF: 'origin/main'
```

You must define separate templates for full scans and [diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans) in Azure Pipelines. This is because diff-aware scans require the use of the  `SEMGREP_PR_ID` and `SEMGREP_BASELINE_REF` variables, while full scans do not.

</TabItem>

<TabItem value='bitbucket'>
In the Bitbucket Pipelines configuration file, set [`SEMGREP_BASELINE_REF`](/semgrep-ci/ci-environment-variables#semgrep_baseline_ref) to enable diff-aware scanning:

```yaml
image: semgrep/semgrep:latest

pipelines:
  ...
  pull-requests:
    '**': # This applies to pull requests for all branches
      - step:
          name: Semgrep scan on PR
          script:
            # Change to your default branch if different from main
            - export SEMGREP_BASELINE_REF="origin/main"
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

To enable diff-aware scanning, obtain the value of `$CI_MERGE_REQUEST_IID`, the unique project-level IID (internal ID) of the merge request in the `rules` section of the pipeline definition, which allows you to list the conditions to evaluate. The results of the evaluation determine the attributes of the job. If `$CI_MERGE_REQUEST_IID` exists, Semgrep runs a diff-aware scan:

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
Forthcoming
</TabItem>
<TabItem value='other'>

For all other CI providers, set [`SEMGREP_BASELINE_REF`](/semgrep-ci/ci-environment-variables#semgrep_baseline_ref) to enable diff-aware scanning.

### Example

```bash
export SEMGREP_BASELINE_REF="main"
```

</TabItem>
</Tabs>
