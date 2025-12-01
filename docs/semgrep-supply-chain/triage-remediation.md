---
slug: triage-and-remediation
append_help_link: true
description: "Perform triage and remediation of dependency vulnerabilities through Semgrep Supply Chain."
tags:
 - Semgrep Supply Chain
 - Semgrep AppSec Platform
title: Triage and remediation
hide_title: true
---

import ViewDetailsSsc from "/src/components/procedure/_view-details-ssc.md"

# Triage and remediate Supply Chain findings

:::info Prerequisite
At least one repository that scans for dependencies through Semgrep Supply Chain. See [Scan third-party dependencies](/semgrep-supply-chain/getting-started).
:::

Once Semgrep Supply Chain successfully scans your repository and you've [viewed your results](/semgrep-supply-chain/findings), you can assess, triage, and remediate the findings presented in Semgrep AppSec Platform using the **Supply Chain** page. Semgrep provides the following methods to help you evaluate your findings:

| Assessment action | Method |
| - | - |
| Filter findings. | Click any filter on the **Supply Chain** page. |
| View specific CVE entries in <a href="https://www.cve.org/">cve.org</a>. | Click the finding's <strong>CVE badge</strong>. |
| View specific pattern matches in your codebase. | View the Supply Chain finding's **Details** page. |
| View the [dependency path for a transitive dependency](/semgrep-supply-chain/dependency-search#dependency-paths-beta). | View the Supply Chain finding's **Details** page. |
| View safe versions to upgrade your dependencies. |  View the Supply Chain finding's **Details** page. |

Once you've assessed the findings, the following actions are available to you.

## Remediate true positives

Remediate (or resolve) true positives in Semgrep Supply Chain by:

* Updating the dependency to a safe version that does not contain the vulnerability.
* Removing the dependency and refactoring all usages in the codebase.

## Review provisionally ignored findings

If you have Semgrep Assistant enabled, review the findings that have been **provisionally ignored**. These are findings that Semgrep Assistant has flagged as false positives. For each finding, you can change the status to **Ignored** if you agree with Assistant's assement. Otherwise, you can change the status to **To fix** if you disagree.

Findings with a status of **provisionally ignored** block pull requests and merge requests if the matching rule is included in a blocking policy. 

### Remove the dependency and refactor the code

Removing dependencies and refactoring code are other methods to remediate vulnerabilities. Upon merging any dependency removals, Semgrep Supply Chain scans the pull request or merge request, detects changes to your manifest file or lockfile, and updates the status to **Fixed**.

## Upgrade guidance and click-to-fix pull requests

If the remediation for a finding is to upgrade the package, **upgrade guidance** uses program analysis and AI to analyze the results of your Semgrep scans to see if you can safely and reliably update a vulnerable package or dependency to a fixed version. From there, you can choose to:

- Have Semgrep open a pull request (PR) that updates the version used by your repository and guide the developer on the breaking changes in the PR description
- Create a Jira ticket
- Set the finding's triage status as **To fix**

Semgrep's dependency upgrade guidance can determine if the package upgrade needed to remediate the finding causes breaking changes. Semgrep can then create a PR to upgrade the package, offering a one-click solution to you.

### Supported languages and package managers

- **Go** projects using the `gomod` package manager
- **Python** codebases with the following package managers:
  - `pip`
  - `pip-tools`
  - `pipenv`
  - `poetry`
  - `uv`
- GitHub Cloud
  - This **includes** projects added to Semgrep through Semgrep Managed Scans 

### Prerequisites

To access all upgrade guidance and click-to-fix features, you must have:

- At least one repository that [scans for dependencies through Semgrep Supply Chain](/semgrep-supply-chain/getting-started).
- Semgrep Assistant [enabled](/semgrep-assistant/getting-started).
- The **private** GitHub for Semgrep installed.
  - The app must have [**Read and write** access on the **Contents** permission](#grant-read-and-write-access-to-a-private-github-semgrep-app).
- Optionally: if you have [a private registry, connect it to Semgrep](#connect-a-private-registry-to-semgrep). Currently, Semgrep supports only private Python registries.

### Features and permissions required

The following table summarizes the features available to you depending on the prerequisites you meet:

| Semgrep features available | [Read and write `Content` permission granted](#grant-read-and-write-access-to-a-private-github-semgrep-app) | [Code access granted to Semgrep through installation of the private GitHub app](/deployment/managed-scanning/github#permissions) | [Semgrep Assistant enabled](/semgrep-assistant/getting-started) | [Private registry connected to Semgrep](#connect-a-private-registry-to-semgrep) |
| - | - | - | - | - |
| All click to fix and upgrade guidance features, including:<ul><li>Upgrade filter for Findings</li><li>Upgrade guidance on the Finding Details page</li><li>Coupled or blocked upgrade information shown on the Finding Details page</li><li>Ability to open a PR to upgrade</li></ul> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> |
| All click to fix and upgrade guidance features, but <b>not for dependencies in a private registry</b>:<ul><li>Upgrade filter for Findings</li><li>Upgrade guidance on the Finding Details page</li><li>Coupled or blocked upgrade information shown on the Finding Details page</li><li>Ability to open a PR to upgrade</li></ul> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-triangle-exclamation"></i> The private registry is not connected to Semgrep |
| Click to fix, but <b>not for dependencies in a private registry</b>: <ul><li>Ability to open a PR to upgrade</li></ul> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-ban"></i> | <i class="fa-solid fa-triangle-exclamation"></i> The private registry is not connected to Semgrep |
| All upgrade guidance features, including:<ul><li>Upgrade filter for Findings</li><li>Upgrade guidance on the Finding Details page</li><li>Coupled or blocked upgrade information shown on the Finding Details page</li></ul> | <i class="fa-solid fa-ban"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> |
| All upgrade guidance features, but <b>not for dependencies in a private registry</b>:<ul><li>Upgrade filter for Findings</li><li>Upgrade guidance on the Finding Details page</li><li>Coupled or blocked upgrade information shown on the Finding Details page</li></ul> | <i class="fa-solid fa-ban"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-check"></i> | <i class="fa-solid fa-triangle-exclamation"></i> The private registry is not connected to Semgrep |

### How this works

After enabling upgrade guidance, Semgrep performs post-scan analysis and marks applicable findings as **Safe to upgrade** or with **Breaking changes**.

- This analysis is performed every **two hours** on the latest **full scan**.
- Only findings whose dependencies have **fixed versions** that resolve the vulnerability are marked by Semgrep as **Safe to upgrade** or with **Breaking changes**.
- Findings without any fixed versions have no badge; instead, they say **no patch available**.

The following chart illustrates the steps Semgrep performs, from scanning to analysis, and the actions you can take based on the advice it provides.

![Flowchart explaining how Semgrep provides upgrade guidance and possible actions to take based on its advice.](/img/upgrade-guidance-flowchart.png)

### Review a finding's upgrade guidance 

<ViewDetailsSsc />

<dl>
<dt>A - Upgrade badge</dt>
<dd>Indicates if an upgrade is safe or may break your codebase.</dd>
<dt>B - The line of code (LOC) of the finding</dt>
<dd>This shows the LOC that caused the finding; this does <strong>not</strong> show the LOC where the breaking changes occur.</dd>
<dt>C - Link to change list drawer</dt>
<dd>Click this link to display the LOC where a breaking change may occur.</dd>
<dt>D - Open fix PR button</dt>
<dd>Click this button to open a PR with the code to upgrade the dependency to a safe version, if any.</dd>
</dl>

### Create a pull request with fixes

1. Navigate to the **Details** page of the finding for which you want to make a pull request.
1. Click **Fix** > **Open fix PR**.

A pull request includes:

- The manifest and/or lockfile changes necessary to upgrade the dependency
- The context necessary for developers to fix potentially breaking changes

The following context is included in the pull request description:

- Summary
  - Severity and reachability of the finding
  - The specific version of the dependency that the PR upgrades to
- Vulnerability details
  - A description of the vulnerability and links to its CVE references
- Upgrade guidance
  - All the pieces of code, typically files and functions, which make use of the dependency
  - Unchanged (safe) pieces of code
  - Potentially breaking pieces of code
- Dependency references
  - Release notes, changelogs, and commits of the dependency, which may be helpful to resolve the breaking changes

## Ignore findings

The **Supply Chain** tab allows you to identify reachable true positives so you can fix or resolve the related issues. However, you can ignore any false positives, acceptable risks, or deprioritized findings due to some factor. To do this:

1. In Semgrep AppSec Platform, go to [**Supply Chain**](https://semgrep.dev/orgs/-/supply-chain).
2. Select one or more findings.
3. Click **Triage > Ignored**.
4. Provide **Comments** to describe why you're ignoring the selected findings.
5. Click **Submit**.

## Block pull request or merge requests

To prevent security vulnerabilities from being merged into your codebase, see [Supply Chain Policies](/semgrep-supply-chain/policies) for information on how to:

- Block pull requests or merge requests with security vulnerabilities
- Leave comments on pull requests or merge requests with security vulnerabilities

## Appendix

### Grant **Read and write** access to a private GitHub Semgrep app

<details>
<summary>Expand for instructions on granting read and write access to a private GitHub Semgrep app</summary>

If you are an **existing** Semgrep user and you need to change your Semgrep app's permissions:

1. Navigate to the settings page of your private Semgrep GitHub app; refer to [<i class="fas fa-external-link fa-xs"></i> Changing the permissions of a GitHub app](https://docs.github.com/en/apps/maintaining-github-apps/modifying-a-github-app-registration#changing-the-permissions-of-a-github-app) for instructions.
1. In the **Repository permissions** section, search for `Contents`.
1. Click the drop-down menu and select **Read and write**.
:::
</details>

### Connect a private registry to Semgrep

<details>
<summary>Expand to learn how to connect a private registry to Semgrep</summary>

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to **Settings > Integrations**.
3. Click **Add**, then select **Registry**.
4. In the dialog that appears, provide the following information:
   1. The **Name** of your registry.
   2. Select the **Package manager**.
   3. Select the **Authentication method**. If none is required, select **None (public registry)**.
      1. If you select **Username and password**, provide the required **Username** and **Password**.
      2. If you select **API token**, provide the required token value.
5. Click **Connect** to save your changes and proceed.

:::info
Semgrep currently supports integrations with private Maven package registries for [scans without lockfiles](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).
:::
</details>

### Troubleshooting: Semgrep is not displaying any upgrade guidance or click-to-fix functionality

<details>
<summary>Expand for information on troubleshooting if Semgrep is not displaying any upgrade guidance or click to fix functionality</summary>

If you can't see any **Breaking changes** or **Safe to upgrade** badges or findings, this may be due to the following reasons:

- Your language or package ecosystem isn't supported
- Your source code manager isn't supported
- Your you have not set **Read and write** access for the **Contents** permission; see [Grant read and write access](#grant-read-and-write-access-to-a-private-github-semgrep-app)
- Your findings don't have safe versions to upgrade to yet
- You have no findings within the supported scope of this feature

</details>
