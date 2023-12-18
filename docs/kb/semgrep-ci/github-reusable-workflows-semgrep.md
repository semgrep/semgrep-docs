---
tags:
  - Github
  - Reusable workflows
description: Learn how to set up reusable GitHub workflows for Semgrep scans.
---

# Set up reusable GitHub workflows for Semgrep scans

An organization may have hundreds or thousands of repositories. Reusable workflows simplify the `.github/workflows/semgrep.yml` file in each of the repositories by allowing you to define the workflow once and then reuse it in other workflows. This [prevents duplication](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview) and provides a single centralized Semgrep configuration.

Reusable workflows can be triggered by several types of events, such as a push, pull request, or schedule, making them relatively flexible compared to required workflows. Required workflows or checks for branch protection rulesets can only be triggered by pull request events.

## Setting up a reusable workflow

1. Create a new repository and add the `.github/workflows/semgrep.yml` file.

![image info](/img/kb/reusable-workflows-image-1.png)

2. Add the desired job configuration to the `semgrep.yml` under `jobs:`. This can be the [recommended snippet](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) or your current job configuration.

3. Under the `on:` key, add `workflow_call`. This defines the condition to trigger the job described in the re-usable workflow: it's triggered by being called in other repositories.

![image info](/img/kb/reusable-workflows-image-2.png)

3. Then, in each repository, create or update the `semgrep.yml` to call the reusable workflow by modifying the `jobs:` key to use the reusable workflow. The easiest way to configure the `SEMGREP_APP_TOKEN` secret is to add it in the re-usable workflow and provide `secrets: inherit` in the calling workflow, as shown in the following example.

![image info](/img/kb/reusable-workflows-image-3.png)

## Running a scan

Now, when a developer commits a change or makes a pull request (or otherwise in any way triggers the caller workflow), the reusable Semgrep workflow is called:

![image info](/img/kb/reusable-workflows-image-4.png)

## Limitations

You still need to create a `.github/workflows/semgrep.yml` file for each repository to call the reusable workflow.
