---
description: Learn how to set up required GitHub workflows for Semgrep scans.
tags:
  - Github
  - Required workflows
---

# Set up required GitHub workflows for Semgrep scans
 
If you have a large number of repositories, you can simplify the process of setting up automated scanning of each repository by Semgrep use [GitHub's required workflows](https://docs.github.com/en/actions/using-workflows/required-workflows).

Required workflows allow you to declare a workflow in a centralized repository called by other repositories instead of configuring the `.github/workflows/semgrep.yml` file in each repository where you want Semgrep to run. This simplifies the process of setting up *and* maintaining your integration.

## Set up a required workflow

1. Create a new repository to hold your new workflow, and add a `.github/workflows/semgrep.yml` file. If this is your first Semgrep workflow, you can start with a [sample configuration file](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file) and customize it as necessary to support your security and business goals.

2. Go to **Settings** > **Actions** > **General**.

3. To the right of **Required Workflows**, click **Add workflow**. Select the repository that contains the workflow, then enter the path to the workflow in the text field. 

## Run a workflow when creating a pull request

When you create a pull request for a repository, GitHub will run the Semgrep scan required workflow, even if the repository is missing a `.github/workflows/semgrep.yml` file. The required workflow will block the pull request if the scan doesn't end successfully.

## Caveat

* Because pull request events trigger required workflows, Semgrep runs a diff scan, not a full scan, on the current branch. To run a full scan to get a complete picture of the project, you can either:
    * Create workflows that are [manually triggered with the `workflow_dispatch` event](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/)
    * Create custom scripts that clone the repository, then run Semgrep
