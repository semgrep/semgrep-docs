---
tags:
  - Github
  - Reusable workflows
description: Setting up GitHub reusable workflows for Semgrep scans.
---

# GitHub reusable workflows and Semgrep

## Motivation

An organization can have hundreds or thousands of repositories. Reusable workflow comes to simplify the file: `.github/workflows/semgrep.yml` for each repository in your organization because you can call a workflow (such as semgrep scans) from there, which avoids code duplication and gives one centralized configuration.

## Setting up a reusable workflow

We can follow the next steps:

1. Create a new repository with the reusable workflow:

![image info](/img/kb/reusable-workflows-image-1.png)

> Note: semgrep.yml file must be in the folder `.github/workflows/`

2. The content of the file can be copied from Semgrep [documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file)

But some changes need to be made in the `on:` statement (basically, the conditions to trigger the job must be in the caller, not here). So we can define the file as follow:

![image info](/img/kb/reusable-workflows-image-2.png)

3. In each repository, you can call to the reusable workflow as shown in the next example:

![image info](/img/kb/reusable-workflows-image-3.png)

> Note: Secrets can be inherited and passed to the reusable workflow.

## Running a scan

Now if a developer commits a change and provokes a push or pull request (or a scheduled event is triggered), then the reusable workflow will be called, in this case, the semgrep workflow:

![image info](/img/kb/reusable-workflows-image-4.png)

## Benefits

1. As GitHub [says](https://docs.github.com/en/actions/using-workflows/reusing-workflows#overview): “Reusing workflows avoids duplication. This makes workflows easier to maintain and allows you to create new workflows more quickly by building on the work of others, just as you do with actions”.
2. It works very well for push, pull requests and schedule events.
    
## Drawbacks

1. Reusable workflows don’t avoid the creation of file `.github/workflows/semgrep.yml` for each repo. You need to create it to insert the call to the reusable workflow.
