---
title: How to trigger diff-aware scans using environment variables
toc_max_heading_level: 2
description: Learn how to run a diff-aware scan using set environment variables.
---

# How to trigger diff-aware scans using environment variables

When working with a CI provider, you can set Semgrep to run **[diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans)**, instead of full scans, using environment variables. Diff-aware scans run on your code before and after some baseline, and only report findings that are newly introduced in the commits after that baseline.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="github"
    values={[
      {label: 'GitHub', value: 'github'},
      {label: 'GitLab', value: 'gitlab'},
      {label: 'Other CI providers', value: 'other'}
    ]}
>

<TabItem value='github'>

Include the following definition when configuring your GitHub Action to enable diff-aware scanning:

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

Set `$CI_MERGE_REQUEST_IID` when configuring your pipeline definition to enable diff-aware scanning.

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
<TabItem value='other'>

For CI providers that are **not** GitHub Actions or GitLab CI/CD, set [`SEMGREP_BASELINE_REF`](/semgrep-ci/ci-environment-variables#semgrep_baseline_ref) to enable diff-aware scanning.

### Example

```bash
export SEMGREP_BASELINE_REF="main"
```

</TabItem>
</Tabs>
