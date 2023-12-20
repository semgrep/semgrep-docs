---
description: How to scan a monorepo in parts for better CI performance and clearer findings organization
tags:
  - monorepo
  - performance
  - Semgrep in CI
---

# Scanning a monorepo in parts

Monorepos very often contain a large amount of code. The code is usually divided into to different components or modules, even though it's all stored in the same repository.

As such, it can be helpful to scan a monorepo in parts for multiple reasons:

1. Improving scan performance in CI and reducing CI run times
2. Logically splitting up the monorepo into multiple components to help with managing findings

## How to configure Semgrep in CI to split up a monorepo

When scanning a repo with Semgrep in CI, the base command is `semgrep ci`. To understand this default setup for your source code manager (SCM) and CI provider, see [Getting started with Semgrep in continuous integration (CI)](/docs/semgrep-ci/overview/).

To split up your monorepo, you need to first decide *how* you want to logically split up the code. For example, if your monorepo has four main modules and their paths are:

    /src/moduleA
    /src/moduleB
    /src/moduleC
    /src/moduleD

Then it would logically make sense to split this into four separate scans in CI, one for each module.

To actually achieve this, you would use the `--include` flag ([see CLI reference](/docs/cli-reference/)) to only scan files in each module's code path:

    semgrep ci --include=/src/moduleA/*

Now, Semgrep is only scanning files under that path and the entire CI run will take less time, since less code is being scanned. Of course, you will now have to run multiple CI runs for the remaining three modules to get full monorepo coverage, but you have more flexibility on how and when you perform those runs.

Now that you've successfully configured your monorepo to be scanned in parts, you also have to configure the findings from each part or module to show up as their own project in Semgrep Cloud Platform (SCP).

Typically, findings from a single repository are associated to a single project in SCP. However you can change this by manually setting the `SEMGREP_REPO_NAME` environment variable ([see CI environment variables reference](/docs/semgrep-ci/ci-environment-variables/#semgrep_repo_name)).

For example, if your monorepo is located at `https://github.com/sina/monorepo` the `SEMGREP_REPO_NAME` would typically be set to `sina/monorepo`. So to split it up into the four modules we referenced above, for each CI run of a module we need to manually set it like so before running Semgrep:

    export SEMGREP_REPO_NAME="sina/monorepo/moduleA"

And then running Semgrep as demonstrated above:

    semgrep ci --include=/src/moduleA/*

Now, the findings from this CI run will show up in their own project in SCP named `sina/monorepo/moduleA`. This is not only necessary when splitting up a monorepo but also helpful in terms of organizing findings into separate projects so that devs and security engineers can have a clearer understanding of which findings pertain to the module that they are actually responsible for.

:::info
Due to how we determine hyperlinks for findings in SCP, changing the `SEMGREP_REPO_NAME` to anything other than the actual `<org>/<repo name>` format may adversely affect and break hyperlinks. This is a tradeoff of splitting up one single repo into multiple projects.
:::
