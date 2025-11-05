---
tags:
  - GitHub
  - Reusable workflows
  - Semgrep in CI
description: Learn how to set up reusable GitHub workflows for Semgrep scans.
append_help_link: true
---

# Set up reusable GitHub workflows for Semgrep scans

Reusable workflows allow you to simplify the process of configuring `.github/workflows/semgrep.yml` files for each of your repositories. You define a workflow once in a central repository, then reuse it in workflows in other repositories. This [avoids duplication](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview) and makes maintenance easier.

Reusable workflows can be triggered by several types of events, including push, pull request, and schedule. This makes them relatively flexible compared to repository rulesets. Repository rulesets or branch protection rules can only be triggered by pull request event types.

## Set up a reusable workflow

1. Create a new repository to hold your reusable workflow, and add a `.github/workflows/semgrep.yml` file.
   ![image info](/img/kb/reusable-workflows-image-1.png)
2. Add the job configuration to `semgrep.yml` under `jobs:`. You can use the job definition from the [recommended snippet](/docs/semgrep-ci/sample-ci-configs#sample-github-actions-configuration-file) or your current job configuration.
3. Under the `on:` key, add `workflow_call`. This defines the condition to trigger the job described in the reusable workflow: when another repository calls it. Other keys under `on:` are optional for the reusable workflow.
   ![image info](/img/kb/reusable-workflows-image-2.png)
4. In each repository where you want your reusable workflow called, create or update the `semgrep.yml` file to call the reusable workflow. To do this, include `uses` under the `jobs:` key as shown in the following sample configuration.

```
name: Semgrep
on:
  # Scan changed files in PRs (diff-aware scanning):
  pull_request: {}
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Schedule the CI job (this method uses cron syntax):
  schedule:
    # Please change the cron schedule to a random time to avoid load spikes on GHA.
    - cron: '24 13 * * *' # Sets Semgrep to scan every day at 13:24 UTC.
jobs:
  call-semgrep:
    uses: {ORG}/{REPO}/.github/workflows/semgrep.yml@main
    secrets: inherit
```

When using this sample configuration, be sure to update the schedule under `on` to a random time, and set repository details and path for the reusable workflow under `jobs` to match where you stored your reusable workflow.

The `secrets: inherit` line passes the secrets from the calling workflow to the called workflow, so each calling repository must also have a `SEMGREP_APP_TOKEN` secret added. GitHub [does not currently support](https://github.com/github/roadmap/issues/636) passing secrets from a central reusable workflow (the called workflow) to the calling workflows.

## Run a scan

Once you've configured the workflows for your repositories, the reusable workflow is called whenever a triggering event occurs, such as when a developer opens a pull request or commits a change.

![image info](/img/kb/reusable-workflows-image-4.png)

## Limitations

As described in [Set up a reusable workflow](#set-up-a-reusable-workflow), you must create a `.github/workflows/semgrep.yml` file for each repository to call the reusable workflow **and** add a `SEMGREP_APP_TOKEN` secret to the repository. This is in contrast to [repository rulesets](/docs/kb/semgrep-ci/github-repository-rulesets-semgrep), which only require the central workflow file to be added.
