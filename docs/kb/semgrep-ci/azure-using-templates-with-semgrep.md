---
tags:
  - Azure Pipelines
  - Templates
description: Running Semgrep commands in Azure Pipelines templates.
---
# Running Semgrep commands in Azure Pipelines templates 

## Motivation

Complex code can take more work to maintain and modify. It is a good programming practice to encapsulate some functionalities in external files. By referencing these external files, you are able to reuse a particular functionality.
The primary goal of Azure templates is to extract some functionalities defined in a big yaml file and place these into an external file (the [template](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops)). This improves a pipeline's readability and maintainability.
This guide explains the following procedures:

* Creating template files which run Semgrep commands.
* Including or calling templates into your Azure Pipeline.

You can then reuse the template files in as many Pipelines as you need.
## Defining Semgrep code snippets in a template file


To add Semgrep commands in a YAML template file:

 1. Create a `templates` folder in the repository you want to run Semgrep in.
 2. Commit the following two templates: 

    Example for Semgrep full scan in a template yaml file:
    1. Template for Semgrep full scans:
    ```yaml
steps:
- script: |
    echo "Semgrep full scan"
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci
``````

Example for Semgrep pull request scan in a template yaml file:
``````
steps:
- checkout: self
  clean: true
  fetchDepth: 10000
- script: |
    echo "Pull Request Scan from branch: $(Build.SourceBranchName)"
    git fetch origin master:origin/master
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci
  env:
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
    SEMGREP_BASELINE_REF: 'origin/master'
``````

Note that you must use two separate templates for full scans and [diff-aware scans](/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/#diff-aware-scanning). This is because there are different environment variables used depending on the type of scan such as SEMGREP_PR_ID and SEMGREP_BASELINE_REF in the template for diff-aware scans.


## Including templates in an Azure Pipeline

Now we can add these templates in the repo, for example, in a folder called templates.
Then the Semgrep pipeline can look like this:

``````
pool:
  vmImage: ubuntu-latest

variables:
- group: Semgrep_Variables

jobs:
- job: Semgrep_Full_Scan
  condition: eq(variables['Build.SourceBranchName'], 'master')
  steps:
  - template: templates/full_scan_semgrep.yml

- job: Semgrep_PR_Scan
  condition: ne(variables['Build.SourceBranchName'], 'master')
  steps:
  - template: templates/pr_scan_semgrep.yml
``````

## Conclusion

Using templates in Azure pipelines is a good practice to simplify pipelines code and improve readability and maintainability.
> Adding these templates and the semgrep pipeline itself to all the repositories in an organization is something that we can definitively automate to speed up the onboarding process. 
   
