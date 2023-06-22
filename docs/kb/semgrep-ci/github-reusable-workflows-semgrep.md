---
tags:
  - Github
  - Reusable workflows
description: Setting up GitHub reusable workflows for Semgrep scans.
---

# GitHub reusable workflows and Semgrep

## Motivation

An organization can have hundreds or thousands of repositories. Reusable workflows can simplify the `.github/workflows/semgrep.yml` file in each of your repositories by allowing you to define the workflow once and then referencing it more simply in other workflows, which avoids code duplication and gives one centralized configuration.

## Setting up a reusable workflow

1. Create a new repository with the reusable workflow:

![image info](/img/kb/reusable-workflows-image-1.png)

> Note: the semgrep.yml file must be in the `.github/workflows/` folder

2. The content of the file can be copied from the Semgrep [documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) but some changes need to be made in the `on:` statement. Basically, the condition to trigger the job must be in the caller, not here. So we can create the file as follows:

![image info](/img/kb/reusable-workflows-image-2.png)

3. Then, in each repository, you can call the reusable workflow as shown here:

![image info](/img/kb/reusable-workflows-image-3.png)

> Note: Secrets can be inherited from the reusable workflow and passed to the caller workflow.

## Running a scan

Now, if a developer commits a change or makes a pull request (or otherwise in any way triggers the caller workflow), then the reusable Semgrep workflow will be called:

![image info](/img/kb/reusable-workflows-image-4.png)

## Benefits

1. As GitHub [says](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview): “Reusing workflows avoids duplication. This makes workflows easier to maintain and allows you to create new workflows more quickly by building on the work of others, just as you do with actions”.
2. A reusable workflow can be triggered by several types of events, such as a push, pull_request, or schedule. In contrast, a required workflow can only be triggered by pull_request events.
    
## Drawbacks

1. Reusable workflows don’t avoid the creation of a `.github/workflows/semgrep.yml` file for each repo. You still need to create one to then insert a call to the reusable workflow.
