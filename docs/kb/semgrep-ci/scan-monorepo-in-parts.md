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

To split up your monorepo, you need to make two changes. First, use the `--include` flag to determine *how* you want to logically split up the code. Second, update the `SEMGREP_REPO_DISPLAY_NAME` environment variable to assign findings to separate projects in Semgrep AppSec Platform. 

For example, if the monorepo has four main modules and their paths are:

    /src/moduleA
    /src/moduleB
    /src/moduleC
    /src/moduleD

Then splitting its scans into four separate scans, one for each module, would provide a logical separation for findings.

After choosing a logical split, use the `--include` flag ([see CLI reference](/docs/cli-reference)) with the relevant path to only scan files in that module's code path:

    semgrep ci --include=/src/moduleA/*

Now, Semgrep is only scanning files under that path and the CI run will take less time, since less code is being scanned.

For the other modules, the commands look similar. For module B:

    semgrep ci --include=/src/moduleB/*

You will then have the flexibility to trigger each one on appropriate events or frequencies.

Now that you understand how to configure your monorepo to be scanned in parts, you also have to understand how to configure the findings from each part or module to show up as their own project in Semgrep AppSec Platform.

To assign findings from the module to their own project in Semgrep Appsec Platform, you must explicitly set the `SEMGREP_REPO_DISPLAY_NAME` environment variable ([see CI environment variables reference](/docs/semgrep-ci/ci-environment-variables#semgrep_repo_display_name)).

:::info
Ensure that `SEMGREP_REPO_NAME` ([see reference](/docs/semgrep-ci/ci-environment-variables#semgrep_repo_name)) is still properly set as with any Semgrep scan, to ensure that hyperlink and PR/MR comment functionality is retained.
:::

For example, if your monorepo is located at `https://github.com/semgrep/monorepo` the `SEMGREP_REPO_DISPLAY_NAME` would default to the value of `SEMGREP_REPO_NAME`, which in this case would be `semgrep/monorepo`. To split the monorepo into four projects corresponding to the logical modules, set `SEMGREP_REPO_NAME` as you normally would while setting `SEMGREP_REPO_DISPLAY_NAME` to something relevant before running Semgrep:

    export SEMGREP_REPO_DISPLAY_NAME="semgrep/monorepo/moduleA"

And then run Semgrep as demonstrated earlier:

    semgrep ci --include=/src/moduleA/*

Now, the findings from this CI run will show up in their own project in Semgrep AppSec Platform named `semgrep/monorepo/moduleA`. This is not only necessary to ensure findings have a consistent status, but also helpful so that developers and security engineers can have a clearer understanding of which findings pertain to the module that they are responsible for.
