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

## Defining Semgrep snippets in a template file

Adding semgrep commands in a yaml template is a simple task. In the example, we will create two templates, one for Semgrep full scan and one for Semgrep pull request scans.

Example for Semgrep full scan in a template yaml file:
``````
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

> Note that we split semgrep scans (full and pull request) as there are some essential differences in setting environment variables such as SEMGREP_PR_ID and SEMGREP_BASELINE_REF in the pull request template.

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
   
