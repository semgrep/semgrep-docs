---
tags:
  - Azure Pipelines
description: Run Semgrep on self-hosted Ubuntu runners in Azure DevOps.
---
# Semgrep with self-hosted Ubuntu runners in Azure Pipelines

Semgrep provides a [sample configuration for Azure-hosted runners](/docs/semgrep-ci/sample-ci-configs#azure-pipelines). If you use self-hosted Ubuntu Linux runners, you have significantly more control over their configuration, but as a result, they require additional preparation and configuration to run Semgrep.

This guide adds two approaches to configuring self-hosted runners that use Ubuntu (the default self-hosted option for Azure DevOps Linux runners):

* [Using pipx](#using-pipx)
* [Using pip with a virtual environment](#using-pip-with-a-virtual-environment)

## Using pipx

While the sample configuration uses `pip`, this approach uses `pipx`, which avoids issues with system-managed Python vs user-installed Python.

### Prepare your runner

Access the runner and execute the following commands:

```bash
$ sudo apt update
$ sudo apt install pipx
$ pipx ensurepath
```

After completing the commands:

1. Start a new shell session, so that the changes from `pipx ensurepath` are available.
2. Ensure the [Azure DevOps agent](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/linux-agent?view=azure-devops) is set up and running.

### Create your configuration

1. Set the necessary [variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables?view=azure-devops&tabs=yaml%2Cbash), including `SEMGREP_APP_TOKEN` as an environment variable.
2. Group the variables as a [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=azure-pipelines-ui%2Cclassic#create-a-variable-group) called `Semgrep_Variables`.

Add the following snippet to the `azure-pipelines.yml` for the repository.

:::info Customizing the configuruation
* If your self-hosted runner [agent pool](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/pools-queues?view=azure-devops&tabs=yaml%2Cbrowser) has a different name, update the `name` key under `pool` to match the desired agent pool.
* If your default branch is not called `master`, update the references to `master` to match the name of your default branch.
:::

```yaml
variables:
- group: Semgrep_Variables

pool:
  name: Default

steps:
- checkout: self
  clean: true
  fetchDepth: 20
  persistCredentials: true
- script: |
    pipx install semgrep
    if [ $(Build.SourceBranchName) = "master" ]; then
        echo "Semgrep full scan"
        semgrep ci
    elif [ $(System.PullRequest.PullRequestId) -ge 0 ]; then
        echo "Semgrep diff scan"
        git fetch origin master:origin/master
        export SEMGREP_PR_ID=$(System.PullRequest.PullRequestId)
        export SEMGREP_BASELINE_REF='origin/master'
        semgrep ci
    fi
```

### Run a scan

On adding or editing the `azure-pipelines.yml` file, the Semgrep scan job should run on the desired runner pool. Verify that the scan is successful.

## Using pip with a virtual environment

### Prepare your runner

This approach uses built-in Azure DevOps tasks, including `UsePythonVersion` and `Bash`, and uses a virtual environment to install `pip`, another approach that prevents issues with system-managed Python vs user-installed Python.

1. Ensure you have a pre-installed and configured compatible version of Python 3, following [the instructions for UsePythonVersion for self-hosted runners](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/use-python-version-v0?view=azure-pipelines#how-can-i-configure-a-self-hosted-agent-to-use-this-task).
2. Ensure the [Azure DevOps agent](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/linux-agent?view=azure-devops) is set up and running.

### Create your configuration

Add the following snippet to the `azure-pipelines.yml` for the repository.

:::info Customizing the configuration
* If your self-hosted runner [agent pool](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/pools-queues?view=azure-devops&tabs=yaml%2Cbrowser) has a different name, update the `name` key under `pool` to match the desired agent pool.
* If your default branch is not called `master`, update the references to `master` to match the name of your default branch.
:::

```yaml
variables:
- group: Semgrep_Variables

pool:
  name: Default

steps:
  - checkout: self
    clean: true
    persistCredentials: true
  - task: UsePythonVersion@0
    displayName: 'Use Python 3.12'
    inputs:
      versionSpec: 3.12
  - task: Bash@3
    env:
      SEMGREP_APP_TOKEN: $(SEMGREP_APP_TOKEN)
    inputs:
      targetType: 'inline'
      script: |
        python3 -m venv .venv
        source .venv/bin/activate
        python3 -m pip install --upgrade pip
        pip install semgrep

        if [ $(Build.SourceBranchName) = "master" ]; then
          export SEMGREP_BRANCH=$(Build.SourceBranchName)
          echo "Semgrep full scan of master"
          semgrep ci
      elif [ $(System.PullRequest.PullRequestId) -ge 0 ]; then
          echo "Semgrep diff scan"
          git fetch origin master:origin/master
          export SEMGREP_PR_ID=$(System.PullRequest.PullRequestId)
          export SEMGREP_BASELINE_REF='origin/master'
          semgrep ci
```
