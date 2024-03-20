---
tags:
  - Azure Pipelines
  - Templates
description: Running Semgrep commands in Azure Pipelines templates.
---
# Running Semgrep using templates in Azure Pipelines

## Motivation

Complex CI configurations housed in large YAML files take a lot of work to maintain and modify. Azure [templates](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops) extract chunks of logic from larger configurations and encapsulate them in external template files. The template can then be referenced in multiple configurations, keeping pipelines more readable and maintainable.

This guide explains how to:

* Create template files to run various Semgrep commands.
* Include or call templates in your Azure Pipeline.

You can then reuse the template files in as many pipelines as you need.

## Defining Semgrep commands in a template file

To add Semgrep commands in a YAML template file:

1. Create a `templates` folder in the repository you want to run Semgrep in.
2. Commit the following templates: 

    Example YAML template file for a Semgrep full scan:

	  ```yaml
	  steps:
	  - script: |
	      echo "Semgrep full scan"
	      python -m pip install --upgrade pip
	      pip install semgrep
	      semgrep ci
	   ```
 
     Example YAML template file for a Semgrep pull request scan:

	   ```yaml
	   steps:
	   - checkout: self
	     clean: true
	     fetchDepth: 10000
		 persistCredentials: true
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
You must define separate templates for full scans and [diff-aware scans](/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/#diff-aware-scanning). This is because there are different environment variables used in the template for diff-aware scans, such as `SEMGREP_PR_ID` and `SEMGREP_BASELINE_REF`.
:::

## Referencing templates in an Azure Pipeline

With the templates defined, reference them in other Azure Pipelines like this:

```
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
```

:::tip
You can even define your templates in a centralized repository and [reference them in other repositories](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/templates?view=azure-devops#use-other-repositories).
:::

## Conclusion

Using templates in Azure Pipelines is a good practice to simplify pipeline configuration files, improving both readability and maintainability. Pipeline templates can also speed up the Semgrep onboarding process for repositories by allowing you to reuse the same template in each repository.
