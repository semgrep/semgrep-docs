---
tags:
  - Github
  - Required workflows
description: Setting up GitHub required workflows for Semgrep scans.
---

# GitHub Required workflows and Semgrep

## Motivation
An organization can have hundreds or thousands of repositories. Setting up semgrep in all the repositories can be a time-consuming task. Basically, add the file  `.github/workflows/semgrep.yml` in all the 
repositories.

So, automating this initial semgrep setup or having a centralized repository with the `semgrep ci` command can be helpful.

That is the reason for exploring required workflows. Since January 2023, GitHub has been providing this new feature that will allow organizations to start a workflow declared in a centralized repository 
instead of defining the semgrep workflow in all the repositories.

![image info](/img/kb/required-workflows-image-1.png)

## Setting up a required workflow

We can follow the next steps:

1.  Create a new repository with semgrep workflow:

![image info](/img/kb/required-workflows-image-2.png)

> semgrep.yml can be the snippet defined in Semgrep [documentation](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file).

2. At the Organizational level, go to **Settings->Actions->General** and add this semgrep workflow as Required Workflow and select the repositories where you want to apply semgrep workflow (you can select all).

![image info](/img/kb/required-workflows-image-3.png)

![image info](/img/kb/required-workflows-image-4.png)

## Running a pull request

If you create a pull request for a specific repository, it will launch the required workflows, in this case, the semgrep workflow, even if there is no file `.github/workflows/semgrep.yml` in this 
repository.

The required workflow will block the pull request if the job doesn’t end successfully:

![image info](/img/kb/required-workflows-image-5.png)

## Benefits

1.  Run a semgrep scan without any `.github/workflows/semgrep.yml` in the repository. It can save a lot of time.
    
2.  Centralized semgrep invocations can be helpful if we want to modify flags to the semgrep call in only one place. Example: `semgrep ci --sarif --output=semgrep.sarif`      

## Drawbacks

1.  Required workflows are triggered by pull_request events, which means it will call semgrep to run a diff scan for the current branch. So, at some point, we need to run a semgrep full scan to get the 
complete picture of the project in Semgrep App. To solve it, there are some options as:
a. [Dispatch workflows](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/)    
b.  Custom scripts that clone the repo and run semgrep.
    
2.  Required workflows can block developers if the job fails. However, it will fail only if there are blocking findings. In addition to that, turning the 'Required' nature off from the workflow is very easy 
(one button).
