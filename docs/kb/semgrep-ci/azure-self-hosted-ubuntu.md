---
tags:
  - Azure Pipelines
description: Run Semgrep on self-hosted Ubuntu runners in Azure DevOps.
---
import AzureVariables from "/src/components/procedure/_set-env-vars-azure.mdx"

# Semgrep with self-hosted Ubuntu runners in Azure Pipelines

Semgrep provides a [sample configuration for Azure-hosted runners](/docs/semgrep-ci/sample-ci-configs#azure-pipelines). If you use self-hosted Ubuntu Linux runners, you have significantly more control over their configuration, but as a result, they require additional preparation and configuration to run Semgrep.

This guide adds two approaches to configuring self-hosted runners that use Ubuntu (the default self-hosted option for Azure DevOps Linux runners):

* [Using pipx](#using-pipx)
* [Using uv](#using-uv)

Both `pipx` and `uv` install Semgrep into an isolated environment, which avoids issues with system-managed Python vs user-installed Python.

## Using pipx

[`pipx`](https://pipx.pypa.io/stable/) installs standalone Python applications into isolated environments. This is the recommended approach for installing Semgrep on a self-hosted runner.

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

1. Follow the steps provided in the [sample configuration for Azure-hosted runners](/docs/semgrep-ci/sample-ci-configs#azure-pipelines).
2. Add the following snippet to the `azure-pipelines.yml` for the repository.

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
  env:
    SEMGREP_APP_TOKEN: $(SEMGREP_APP_TOKEN)
```

:::info Customizing the configuration
* If your self-hosted runner [agent pool](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/pools-queues?view=azure-devops&tabs=yaml%2Cbrowser) has a different name, update the `name` key under `pool` to match the desired agent pool.
* If your default branch is not called `master`, update the references to `master` to match the name of your default branch.
:::

<AzureVariables />

## Using uv

### Prepare your runner

[`uv`](https://docs.astral.sh/uv/) is a fast Python package and project manager. Its `uv tool install` command installs standalone Python applications into isolated environments, similar to `pipx`.

Access the runner and install `uv` following [Astral's installation instructions](https://docs.astral.sh/uv/getting-started/installation/), for example:

```bash
$ curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installing, ensure the [Azure DevOps agent](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/linux-agent?view=azure-devops) is set up and running.

### Create your configuration

Add the following snippet to the `azure-pipelines.yml` for the repository.


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
    uv tool install semgrep
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
  env:
    SEMGREP_APP_TOKEN: $(SEMGREP_APP_TOKEN)
```

:::info Customizing the configuration
* If your self-hosted runner [agent pool](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/pools-queues?view=azure-devops&tabs=yaml%2Cbrowser) has a different name, update the `name` key under `pool` to match the desired agent pool.
* If your default branch is not called `master`, update the references to `master` to match the name of your default branch.
:::

<AzureVariables />
