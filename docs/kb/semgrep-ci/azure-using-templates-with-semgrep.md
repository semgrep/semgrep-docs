---
tags:
  - Azure Pipelines
  - Templates
description: Running Semgrep commands in Azure Pipelines templates.
---
# Running Semgrep using templates in Azure Pipelines

## Motivation

Complex CI configs can take a lot of work to maintain and modify. It can therefore be a good practice to encapsulate some functionalities into external templates. By referencing these external templates, you are able to reuse functionalities more concisely and without having to define them again.

The primary goal of Azure templates is to extract some functionalities defined in large YAML config files and place them into their own separate [templates](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops). This improves a pipeline's readability and maintainability. This guide explains how to:

* Create template files to run various Semgrep commands.
* Include or call templates in your Azure Pipeline.

You can then reuse the template files in as many pipelines as you need.

## Defining Semgrep commands in a template file

To add Semgrep commands in a YAML template file:

 1. Create a `templates` folder in the repository you want to run Semgrep in.
 2. Commit the following two templates: 
	
	Example for Semgrep full scan in a template yaml file:

	```yaml
	steps:
	- script: |
	    echo "Semgrep full scan"
	    python -m pip install --upgrade pip
	    pip install semgrep
	    semgrep ci
	```
 
	Example for Semgrep pull request scan in a template yaml file:

	```yaml
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
	```
 
	:::note
	You must define two separate templates for full scans and [diff-aware scans](/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/#diff-aware-scanning). This is because there are different environment variables used depending on the type of scan such as `SEMGREP_PR_ID` and `SEMGREP_BASELINE_REF` in the template for diff-aware scans.
	:::

## Referencing templates in an Azure Pipeline

Now with your templates defined,  you can reference them in other Azure Pipelines like this:

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
:::tip
You can even define your templates in a centralized repo and [reference them in other repos](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops#use-other-repositories).
:::
## Conclusion

Using templates in Azure pipelines is a good practice to simplify your Pipelines configuration file and improve readability and maintainability.
> Adding these templates and the semgrep pipeline itself to all the repositories in an organization is something that we can definitively automate to speed up the onboarding process. 
   
