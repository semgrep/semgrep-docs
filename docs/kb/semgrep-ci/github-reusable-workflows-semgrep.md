---
tags:
  - GitHub
  - Reusable workflows
  - Semgrep CI
description: Learn how to set up reusable GitHub workflows for Semgrep scans.
---

# Set up reusable GitHub workflows for Semgrep scans

Reusable workflows allow you to simplify the process of configuring `.github/workflows/semgrep.yml` files for each of your repositories. You define a workflow once, then reuse it in other workflows. In addition to having a single, centralized Semgrep configuration that makes maintenance easier, you [ also avoid duplication](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview).

Reusable workflows can be triggered by events such as opening a pull request or pushing to a pull request, or you can schedule to run at specified times.

## Set up a reusable workflow

1. Create a new repository to hold your reusable workflow, and add a `.github/workflows/semgrep.yml` file.
   ![image info](/img/kb/reusable-workflows-image-1.png)
2. Add the job configuration to `semgrep.yml` under `jobs:`. You can use either the [recommended snippet](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) or your current job configuration.
3. Under the `on:` key, add `workflow_call`. This defines the condition to trigger the job described in the re-usable workflow: when another repository calls it.
   ![image info](/img/kb/reusable-workflows-image-2.png)
4. In each repository where you want your reusable workflow called, create or update the `semgrep.yml` file to call the reusable workflow. To do this, modify the `jobs:` key. 

  You will need to configure the `SEMGREP_APP_TOKEN` secret in the *reusable* workflow, then add it to the *calling* workflow under the `secrets: inherit` key:

  ![image info](/img/kb/reusable-workflows-image-3.png)

## Run a scan

Once you've configured the workflows for your repositories, the reusable workflow is called whenever a developer opens a pull request or commits a change.

![image info](/img/kb/reusable-workflows-image-4.png)
