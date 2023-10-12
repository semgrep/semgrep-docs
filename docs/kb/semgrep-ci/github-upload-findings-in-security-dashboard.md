---
description: To prevent "resource not accessible by integration" error when running job to upload findings to GitHub's Advanced Security Dashboard
tags:
  - Semgrep CI
  - GitHub
---

# Why aren't findings populating in the GitHub Advanced Security Dashboard after running Semgrep in CI?

When scanning with Semgrep in CI, findings automatically populate in Semgrep Cloud Platform. To show findings in the GitHub Advanced Security Dashboard, run an alternate job that uploads findings to the dashboard in the form of a `SARIF` file. See [Sample GitHub Actions configuration file](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) for an example.

If you run the alternate job and it fails with a "resource not accessible by integration" error, there are two possible causes.

## Your repository is private

Findings from Semgrep can only populate in the GitHub Advanced Security Dashboard if the repository is public. Otherwise, the job does not have sufficient permissions to write to the dashboard regardless of any permissions set at the workflow or job level.

## The workflow permissions in your repository's Actions settings are set to read-only

Workflow permissions are set to `read-only` (default) unless they've previously been changed. The job requires `write` permissions to be successful.

To change permissions:
1. Navigate to your organization or repository in GitHub.
2. Click **Settings > Actions > General > Workflow permissions**.

![image info](/img/kb/github-default-workflow-permissions.png)
Target permissions

:::info 
Changing the repository's default workflow permissions changes the permissions for all workflows in that repository. For more granular permissions, set the `permissions` key at the workflow or job level in the `semgrep.yml` workflow file. Learn more about the `permissions` key at [Assigning permissions to jobs](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs#setting-the-github_token-permissions-for-all-jobs-in-a-workflow), or review the example workflow-level permissions below.
:::

### Example job configuration with `permissions` key

This job only requires `write` permissions for `security-events`.

```yml
name: Semgrep

on:
  pull_request: {}
  workflow_dispatch: {}
  push:
    branches: ["master", "main"]
  schedule:
    - cron: '20 17 * * *' # Sets Semgrep to scan every day at 17:20 UTC.
    
permissions: 
    security-events: write
jobs:
  semgrep:
    name: semgrep/ci 
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: returntocorp/semgrep

    if: (github.actor != 'dependabot[bot]')

    steps:
      - uses: actions/checkout@v3
      - run: semgrep ci --sarif --output=semgrep.sarif
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}

      - name: Upload SARIF file for GitHub Advanced Security Dashboard
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: semgrep.sarif
        if: always()
```
