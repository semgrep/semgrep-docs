---
slug: license-scanning
append_help_link: true
title: License scanning 
hide_title: true
description: "Semgrep Supply Chain can detect and list a package's license. Prevent or exempt certain packages from being used based on its license."
tags:
  - Team & Enterprise tier
  - Semgrep Supply Chain
---

# License scanning


Semgrep Supply Chain's **license scanning** feature enables you to explicitly allow or disallow (block) a package's use in your repository based on its license. For example, your company policy may disallow the use of packages with the Creative Commons Attribution-NonCommercial (CC-BY-NC) license.

![Screenshot...](/img/sc-license-scanning.png)

:::info Prerequisites
* License scanning can accessed through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up Slack notifications.
* To detect licenses, you must [add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

## Viewing licenses

To view a package's license:

1. [Sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **[Supply Chain](https://semgrep.dev/orgs/-/supply-chain)** > **Dependencies**. By default licenses are listed in the row of their respective package.
3. If you don't see any licenses:
    1. Click the Supply Chain **Settings** on the header menu. These settings are specific to Semgrep Supply Chain.
    2. Click <i class="fa-solid fa-toggle-large-on"></i> **Dependency search** if it is not already enabled.
    3. Click <i class="fa-solid fa-toggle-large-on"></i> **Show licenses** if it is not already enabled.


[TODO] add toggle icons

## Blocking, commenting, or allowing licenses 

:::tip
For GitHub Actions users, Semgrep Supply Chain blocks PRs (pull requests) by failing the CI job. Ensure that the PR is fully blocked by enforcing [branch protections](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches).
:::

Users can block packages based on the type of license or 
1. From Semgrep Supply Chain, click Settings on the top menu. click **Notify and restrict** if it is not already enabled.

[TODO]add toggle icons

The following licenses are identified by Semgrep Supply Chain:

Copyleft licenses
Permissive licenses
Uncategorized licenses


## Exempting packages



[TODO]make link from dependency search
