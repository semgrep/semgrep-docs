---
description: How to scan a monorepo in parts for better CI performance and clearer findings organization
tags:
  - monorepo
  - performance
  - Semgrep in CI
---

# Scanning a monorepo in parts

With default CI configurations, monorepos will be scanned as a single project in Semgrep. However, monorepos very often contain a large amount of code and the code is usually divided into to different components or modules.

As such, it can be helpful to scan a monorepo in parts for multiple reasons:

* To improve scan performance in CI and reduce CI run times
* To logically split the monorepo to simplify managing findings

## How to configure Semgrep in CI to split up a monorepo

When scanning a repo with Semgrep in CI, the base command is `semgrep ci`. To understand this default setup for your source code manager (SCM) and CI provider, see [Getting started with Semgrep in continuous integration (CI)](/deployment/add-semgrep-to-ci).

There are two features provided by Semgrep to split up a repo. Consider a monorepo named `monorepo` with four main modules

    /src/moduleA
    /src/moduleB
    /src/moduleC
    /src/moduleD

The easiest way to split this monorepo up is into four separate scans, one for each module. To do this, use the `--subdir` (see `semgrep ci --help`) flag with the relevant path to only scan files in that module's code path:

    semgrep ci --subdir /src/moduleA/*

In addition to scanning `/src/moduleA/*`, this command sends the results to a project called `monorepo/src/moduleA`. If you want to change the project name, set the `SEMGREP_REPO_DISPLAY_NAME` environment variable, available since Semgrep version 1.61.1.

For example:

    SEMGREP_REPO_DISPLAY_NAME=monorepo/moduleA semgrep ci --subdir /src/moduleA/*

It is important that scans of different versions never have the same `SEMGREP_REPO_DISPLAY_NAME`. This is necessary to ensure findings have a consistent status and is helpful for developers and security engineers to understand which findings pertain to the module that they are responsible for.

To scan the entire monorepo, trigger one scan for each module.

:::info
You must only change `SEMGREP_REPO_DISPLAY_NAME`. Ensure that `SEMGREP_REPO_NAME` is still properly set (either automatically if using a [supported SCM and CI provider](/docs/semgrep-ci/sample-ci-configs#feature-support) or [explicitly](/docs/semgrep-ci/ci-environment-variables#semgrep_repo_name)) as with any Semgrep scan, in order to retain hyperlink and PR/MR comment functionality.
:::

The `--subdir` flag takes, as input, only a single folder. If you want to scan multiple folders as part of one scan, you will have to use `--include` and `--exclude` ([see CLI reference](/docs/cli-reference)) to instruct Semgrep what paths to include. This performs file targeting across the whole monorepo. but only analyzes the included files.

Unlike `--subdir`, `--include` and `--exclude` don't automatically direct results to a corresponding project, so you always have to set `SEMGREP_REPO_DISPLAY_NAME`.

Here's an example using `--include`.

    SEMGREP_REPO_DISPLAY_NAME=monorepo/moduleAB semgrep ci --include=/src/moduleA/* --include=/src/moduleB/*

:::info
WARNING: if `--include` and `--exclude` are used in a `semgrep ci` scan without setting `SEMGREP_REPO_DISPLAY_NAME`, `semgrep ci` might close findings that aren't detected in those scans.
:::

### Examples using GitHub Actions

Below, you will find an example GitHub Actions workflow file. This is 1 of 4 workflow files you would need for this specific example, all placed in the monorepo's `.github/workflows/` folder. Each workflow file corresponds to a module of the monorepo you would like to scan and treat as a separate project in Semgrep AppSec Platform. 

You can name each workflow file whatever you like, but it may be helpful to name it after the module it corresponds to. In this example, something like `semgrep_moduleA.yml` would be ideal.

#### With --subdir

```yaml
# Name of this GitHub Actions workflow.
name: Semgrep - moduleA

on:
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Scan changed files in PRs (diff-aware scanning):
  pull_request:
    # Restrict the workflow to only run for files changed in a PR at the desired module path:
    paths:
      - 'src/moduleA/**'
  # Run a full scan when the Semgrep workflow file is changed:
  push:
    paths:
      - '.github/workflows/semgrep_moduleA.yml'
  # Schedule a daily full scan CI job (this method uses cron syntax):
  schedule:
    - cron: '20 17 * * *' # Sets Semgrep to scan every day at 17:20 UTC.
    # It is recommended to change the schedule to a random time.

jobs:
  semgrep:
    # User definable name of this GitHub Actions job.
    name: semgrep/ci
    # If you are self-hosting, change the following `runs-on` value:
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: semgrep/semgrep

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      # Fetch project source with GitHub Actions Checkout. Use either v3 or v4.
      - uses: actions/checkout@v4
      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci --subdir=src/moduleA/
        env:
          # Connect to Semgrep AppSec Platform through your SEMGREP_APP_TOKEN.
          # Generate a token from Semgrep AppSec Platform > Settings
          # and add it to your GitHub secrets.
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```


#### With --include


```yaml
# Name of this GitHub Actions workflow.
name: Semgrep - moduleA

on:
  # Scan on-demand through GitHub Actions interface:
  workflow_dispatch: {}
  # Scan changed files in PRs (diff-aware scanning):
  pull_request:
    # Restrict the workflow to only run for files changed in a PR at the desired module path:
    paths:
      - 'src/moduleA/**'
  # Run a full scan when the Semgrep workflow file is changed:
  push:
    paths:
      - '.github/workflows/semgrep_moduleA.yml'
  # Schedule a daily full scan CI job (this method uses cron syntax):
  schedule:
    - cron: '20 17 * * *' # Sets Semgrep to scan every day at 17:20 UTC.
    # It is recommended to change the schedule to a random time.

jobs:
  semgrep:
    # User definable name of this GitHub Actions job.
    name: semgrep/ci
    # If you are self-hosting, change the following `runs-on` value:
    runs-on: ubuntu-latest

    container:
      # A Docker image with Semgrep installed. Do not change this.
      image: semgrep/semgrep

    # Skip any PR created by dependabot to avoid permission issues:
    if: (github.actor != 'dependabot[bot]')

    steps:
      # Fetch project source with GitHub Actions Checkout. Use either v3 or v4.
      - uses: actions/checkout@v4
      # Run the "semgrep ci" command on the command line of the docker image.
      - run: semgrep ci --include=src/moduleA/**
        env:
          # Connect to Semgrep AppSec Platform through your SEMGREP_APP_TOKEN.
          # Generate a token from Semgrep AppSec Platform > Settings
          # and add it to your GitHub secrets.
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
          # Set the display name of the project in Semgrep AppSec Platform
          SEMGREP_REPO_DISPLAY_NAME: semgrep/monorepo/moduleA
```
