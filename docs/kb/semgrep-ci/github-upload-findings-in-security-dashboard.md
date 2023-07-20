---
description: To prevent "resource not accessible by integration" error when running job to upload findings to GitHub's Advanced Security Dashboard
tags:
  - Semgrep CI
  - GitHub
---

# Why aren't findings populating in the GitHub Advanced Security Dashboard after running Semgrep in CI?

When scanning with Semgrep in CI, findings automatically populate in Semgrep Cloud Platform. To show findings in the GitHub Advanced Security Dashboard, you must first run an alternate job that uploads findings in the form of a `SARIF` file to the dashboard. See  [Sample GitHub Actions configuration file](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) for an example.

Once you run the alternate job, the job may fail and return a "resource not accessible by integration" error which has two possible causes:

## Your repository is private

Third-party code scanning findings can only populate in the Advanced Security Dashboard if the repo is public/open source. Otherwise, the job will not have sufficient permissions to write to the dashboard regardless of any permissions set at the workflow or job level.

**2. The default workflow permissions in your repo are set to read only**

Permissions typically default to more restrictive scopes, therefore, your workflow permissions will be set to read only unless changed manually.

`org/repo -> Settings -> Actions -> General -> Workflow permissions`

![image info](/img/kb/github-default-workflow-permissions.png)

Bear in mind that changing the repo’s default workflow permissions changes the permissions for all workflows in your repo. So, for more granular permissions, utilize the `permissions` key either at the workflow or job level in the `semgrep.yml` workflow file. Learn more about the `permissions` key [here](https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs#setting-the-github_token-permissions-for-all-jobs-in-a-workflow), and check out our example of workflow level permissions below. Note that it only requires `security-events` write permissions to be successful.

## Example configuration of job to upload findings to Advanced Security Dashboard with permissions key

```
# Name of this GitHub Actions workflow.
name: Semgrep

on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Scan mainline branches and report all findings:
  push:
    branches: ["master", "main"]
  # Schedule the CI job (this method uses cron syntax):
  schedule:
    - cron: '20 17 * * *' # Sets Semgrep to scan every day at 17:20 UTC.
    # It is recommended to change the schedule to a random time.
    
permissions: 
    security-events: write
jobs:
  semgrep:
    # User definable name of this GitHub Actions job.
    name: semgrep/ci 
    # If you are self-hosting, change the following `runs-on` value: 
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: returntocorp/semgrep

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      # Fetch project source with GitHub Actions Checkout.
      - uses: actions/checkout@v3
      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci --sarif --output=semgrep.sarif
        env:
          # Connect to Semgrep Cloud Platform through your SEMGREP_APP_TOKEN.
          # Generate a token from Semgrep Cloud Platform > Settings
          # and add it to your GitHub secrets.
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}

      - name: Upload SARIF file for GitHub Advanced Security Dashboard
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: semgrep.sarif
        if: always()
```
