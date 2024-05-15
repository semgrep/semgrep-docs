---
tags:
  - GitHub
  - Reusable workflows
  - Semgrep CI
description: Learn how to set up reusable GitHub workflows for Semgrep scans.
append_help_link: true
---



# Set up reusable GitHub workflows for Semgrep scans

Reusable workflows allow you to simplify the process of configuring `.github/workflows/semgrep.yml` files for each of your repositories. You define a workflow once, then reuse it in other workflows. In addition to having a single, centralized Semgrep configuration that makes maintenance easier, you [also avoid duplication](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview).

Reusable workflows can be triggered by several types of events, including push, pull request, and schedule. This makes them relatively flexible compared to repository rulesets. Repository rulesets or branch protection rules can only be triggered by pull request event types.

## Set up a reusable workflow

1. Create a new repository to hold your reusable workflow, and add a `.github/workflows/semgrep.yml` file.
   ![image info](/img/kb/reusable-workflows-image-1.png)
2. Add the job configuration to `semgrep.yml` under `jobs:`. You can use either the [recommended snippet](/docs/semgrep-ci/sample-ci-configs#sample-github-actions-configuration-file) or your current job configuration.
3. Under the `on:` key, add `workflow_call`. This defines the condition to trigger the job described in the reusable workflow: when another repository calls it.
   ![image info](/img/kb/reusable-workflows-image-2.png)
4. In each repository where you want your reusable workflow called, create or update the `semgrep.yml` file to call the reusable workflow. To do this, modify the `jobs:` key.

Configure the `SEMGREP_APP_TOKEN` secret in the *reusable* workflow, then add it to the *calling* workflow under the `secrets: inherit` key:

![image info](/img/kb/reusable-workflows-image-3.png)

## Run a scan

Once you've configured the workflows for your repositories, the reusable workflow is called whenever a triggering event occurs, such as when a developer opens a pull request or commits a change.

![image info](/img/kb/reusable-workflows-image-4.png)

## Limitations

As described in [Set up a reusable workflow](#set-up-a-reusable-workflow), you still need to create a `.github/workflows/semgrep.yml` file for each repository to call the reusable workflow. This is in contrast to [repository rulesets](/docs/kb/semgrep-ci/github-repository-rulesets-semgrep), which only require the central workflow file to be added.
