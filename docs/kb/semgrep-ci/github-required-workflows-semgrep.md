---
tags:
  - Github
  - Required workflows
description: Setting up GitHub required workflows for Semgrep scans.
---

# GitHub required workflows and Semgrep

## Motivation
An organization can have hundreds or thousands of repositories. Setting up Semgrep (basically adding the `.github/workflows/semgrep.yml` file) in all repositories can be a time-consuming task. 
So, automating the initial Semgrep setup or having a centralized repository with a single Semgrep config file can be helpful.

This can be accomplished using required workflows. Since January 2023, GitHub has been providing this new feature that will allow organizations to start a workflow declared in a centralized repository instead of defining the Semgrep workflow in all repositories.

![image info](/img/kb/required-workflows-image-1.png)

## Setting up a required workflow

1.  Create a new repository with the Semgrep workflow file:

![image info](/img/kb/required-workflows-image-2.png)

> semgrep.yml can be the snippet defined in the Semgrep [documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file).

2. At the Organizational level, go to **Settings->Actions->General** and add this Semgrep workflow as a Required Workflow and select the repositories where you want to the workflow to apply (you can select all).

![image info](/img/kb/required-workflows-image-3.png)

![image info](/img/kb/required-workflows-image-4.png)

## Verify by creating a pull request

Now, if you create a pull request in a repository with this required workflow, it will launch the required Semgrep workflow even if there is no `.github/workflows/semgrep.yml` file in this specific repository.

The required workflow will block the pull request if the job doesn’t end successfully:

![image info](/img/kb/required-workflows-image-5.png)

## Benefits

1.  Running a Semgrep scan without having to define a `.github/workflows/semgrep.yml` file in the repository. This can save a lot of time.
    
2.  Centralized Semgrep invocations can be helpful if we want to modify the Semgrep call across all repos, only needing to modify the central required workflow file. Example: `semgrep ci --sarif --output=semgrep.sarif`      

## Drawbacks

1.  Required workflows are only triggered by `pull_request` events, meaning only a diff scan is performed. At some point, we need to run a full Semgrep scan to get findings for all code in the repository. To do this, you can utilize [dispatch workflows](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/).
    
2.  Required workflows can block developers if the job fails. However, it will fail only if there are blocking findings. Additionally, turning the 'Required' nature off from the workflow is very easy 
(one button).
