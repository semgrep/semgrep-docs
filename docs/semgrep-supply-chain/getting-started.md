---
slug: getting-started
append_help_link: true
description: "Scan your project with Semgrep Supply Chain."
tags:
 - Semgrep Supply Chain
title: Configuration
hide_title: true
---

<!-- vale off -->

import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DetectGhRepos from "/src/components/procedure/_detect-gh-repos.md"

<!-- vale on -->

# Supply Chain configuration

This article explains how to set up and use Semgrep Supply Chain, including its configuration and customization options. Once you turn on Supply Chain, it automatically scans projects added to Semgrep AppSec Platform as shown in [Quickstart](/getting-started/quickstart-managed-scans). However, your projects must meet Semgrep's required criteria before your scans succeed.

## Project directory structure

To scan your project with Supply Chain, it must use a [supported package manager and include a lockfile or manifest file with a supported file name](/semgrep-supply-chain/requirements-and-feature-support).

Supply Chain can correctly parse code files, manifest files, and lockfiles in subfolders as well. Code files that use the dependencies in the manifest file or lockfile must be nested in the same directory as the manifest file or lockfile. Manifest files and lockfiles must all use supported file names.

In the following example, Supply Chain assumes that all code files using the dependencies in `my-project/running/lockfile.json` are nested in `my-project/running/` or deeper directories.

```
/my-project
├───/running
│   ├───lockfile.json
│   ├───bar.js
│   └───/uphill
│       ├───lockfile.json
│       └────foo.js
├───/biking
```

If you have code files in `my-project/biking,` Supply Chain does not associate them with the dependencies in `my-project/running/lockfile.json.` If there is another manifest file or lockfile in `my-project/running`, such as `my-project/running/uphill/lockfile.json`, then this overrides the original `my-project/running/lockfile.json` for all code files in `my-project/running/uphill/` or deeper directories.

## Enable Supply Chain

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **[Settings > General > Supply Chain](https://semgrep.dev/orgs/-/settings/general/supplyChain)**.
1. Click the **<i class="fa-solid fa-toggle-large-on"></i> Supply Chain scans** toggle if it is not already enabled.

## Set the scan frequency

You can modify your CI configuration so that Supply Chain scans your code at a specified frequency or whenever a specific event occurs, such as opening a pull request or merge request.

### Rule updates

Supply Chain frequently [receives rule updates](/semgrep-supply-chain/overview#new-cves-and-rule-updates). To take advantage of these updates, adjust the frequency with which Supply Chain scans your codebase.

If a rule is updated, findings generated against the revised rule are considered **new findings**, even if the previous version generated a finding. The new finding is not affected by any triage actions on findings related to the prior version of the rule. Because the finding is new, you'll also receive notifications through the channels you've set up, such as Slack.

### Schedule scans

<CiScheduling />

### Event-triggered scans

You can configure your CI/CD system to trigger a Supply Chain scan whenever one of the following events occurs:

<table>
 <tr>
 <td><strong>Event</strong></td>
 <td><strong>Scope of scan</strong></td>
 <td><strong>Dependency rule set</strong></td>
 </tr>
 <tr>
 <td>Pull request or merge request</td>
 <td><a href="/docs/deployment/customize-ci-jobs#set-up-diff-aware-scans">Diff-aware scan</a></td>
 <td>All dependency rules</td>
 </tr>
 <tr>
 <td>Push or scheduled event, such as a cron job</td>
 <td>Full scan</td>
 <td>All dependency rules</td>
 </tr>
</table>

## Dynamic Dependency Resolution (beta)

:::info
This feature is currently in beta. Please contact [Semgrep Support](/support) for more information.
:::

Supply Chain can use **Dynamic Dependency Resolution** to scan projects without lockfiles or with incomplete lockfiles. This simplifies the configuration of Supply Chain scans. See [Feature support](/semgrep-supply-chain/requirements-and-feature-support#features-for-supported-languages) for more information.

### CLI and self-managed CI scans

To run a scan on the CLI, including scans with self-managed CI systems, using Dynamic Dependency Resolution:

1. Ensure that the environment where you run Semgrep scans has all of the dependencies required to build your project installed, such as Java and Maven or Python and pip.
2. Initiate a Semgrep scan, ensuring that you include the `--allow-local-builds` flag to enable Semgrep to invoke package managers on the system:
    ```console
    semgrep ci --allow-local-builds
    ```
    For existing CI jobs, you may have to edit your configuration file to include this flag.
    
    This flag allows Semgrep to build the project, if needed, to dynamically resolve dependencies. Semgrep uses the build information included in the `pom.xml` or `build.gradle` file to determine the set of dependencies used by the project. 

### Semgrep Managed Scans

1. [Configure private
   registry credentials](/semgrep-supply-chain/triage-and-remediation#connect-a-private-registry-to-semgrep) in Semgrep AppSec Platform in **Settings > Integrations**. Note that only Maven registries are currently supported for Managed Scans.
2. Contact [Semgrep Support](/support) to enable Dynamic Dependency Resolution for the necessary repositories.
   
## Run a scan using the CLI

You can start a stand-alone Supply Chain scan by running the following command in the CLI:

```console
semgrep ci --supply-chain
```

Semgrep prints a list of findings directly to the CLI, including the finding's reachability determination, severity level, a brief description, and suggested remediation. You can also view your results in Semgrep AppSec Platform. It displays all of the information displayed in the CLI, but it also offers you the ability to:

* [See additional finding details](/semgrep-supply-chain/findings), such as whether the finding is always reachable or if it's reachable if certain conditions are met, and its transitivity status
* Use the [dependency search](/semgrep-supply-chain/dependency-search) feature
* Use the [license compliance](/semgrep-supply-chain/license-compliance) feature

## Scan a monorepo's dependencies

Supply Chain supports the scanning of monorepos. As outlined in [Project directory structure](#project-directory-structure), findings are grouped by directory based on the %%manifest file|manifest_file%% or %%lockfile|lockfile%% present in the monorepo.
