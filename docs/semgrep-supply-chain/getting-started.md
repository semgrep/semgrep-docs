---
slug: getting-started
append_help_link: true
description: "Scan your project with Semgrep Supply Chain."
tags:
 - Semgrep Supply Chain
title: Third-party dependencies
hide_title: true
---

<!-- vale off -->

import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DetectGhRepos from "/src/components/procedure/_detect-gh-repos.md"

<!-- vale on -->

# Scan third-party dependencies

This article walks you through the setup needed to scan your project with Semgrep Supply Chain and its configuration and customization options. Once you enable Semgrep Supply Chain, it automatically scans repositories that you have added to Semgrep AppSec Platform, but your repository must first meet the requirements for a successful scan.

## Project directory structure

To scan your project with Semgrep Supply Chain, it must have a manifest file or lockfile and use [supported package managers and filenames](/docs/supported-languages#semgrep-supply-chain).

Semgrep Supply Chain can correctly parse code files, manifest files, and lockfiles in subfolders as well. Code files that use the dependencies in the manifest file or lockfile must be nested in the same directory as the manifest file or lockfile. Manifest files and lockfiles must all use supported file names.

In the following example, Semgrep Supply Chain assumes that all code files using the dependencies in `my-project/running/lockfile.json` are nested in `my-project/running/` or deeper directories.

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

If you have code files in `my-project/biking,` Semgrep Supply Chain does not associate them with the dependencies in `my-project/running/lockfile.json.` If there is another manifest file or lockfile in `my-project/running`, such as `my-project/running/uphill/lockfile.json`, then this overrides the original `my-project/running/lockfile.json` for all code files in `my-project/running/uphill/` or deeper directories.

:::info Apache Maven
To run a Semgrep Supply Chain scan, generate a [dependency tree for Apache Maven](/semgrep-supply-chain/setup-maven).
:::

## Enable Semgrep Supply Chain

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **[Settings > General > Supply Chain](https://semgrep.dev/orgs/-/settings/general/supplyChain)**.
1. Click the **<i class="fa-solid fa-toggle-large-on"></i> Supply Chain scans** toggle if it is not already enabled.

## Scan frequency

You can modify your CI configuration so that Semgrep Supply Chain scans your code at a specified frequency or whenever a specific event occurs, such as opening a pull request or merge request.

### Rule updates
Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates, adjust the frequency with which Semgrep Supply Chain scans your codebase.

If a rule is updated, findings generated against the revised rule are considered **new findings**, even if the previous version generated a finding. The new finding is not affected by any triage actions on findings related to the prior version of the rule. Because the finding is new, you'll also receive notifications through the channels you've set up, such as Slack.

### Schedule scans

<CiScheduling />

### Event-triggered scans

You can configure your CI/CD system to trigger a Semgrep Supply Chain scan whenever one of the following events occurs:

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

## Scan a project without lockfiles (beta)

:::info
To participate in this beta, reach out to [support@semgrep.com](mailto:support@semgrep.com).
:::

Semgrep Supply Chain can scan projects without the need for lockfiles. This simplifies the configuration of Supply Chain scans. This feature is available for the following languages:

- C#
- Java projects built using Maven or Gradle Wrapper
- Kotlin
- Python

1. Ensure that the environment where you run Semgrep scans has installed all of the dependencies required to build your project, such as Java and Maven or Python and pip.
2. Initiate a Semgrep scan, ensuring that you include the `--allow-local-builds` flag:
    ```console
    semgrep ci --allow-local-builds
    ```
    For existing CI jobs, you may have to edit your configuration file to include this flag.
    Semgrep builds the project, using the build information included in the `pom.xml` or `build.gradle` file to determine the set of dependencies used by the project. 

:::info
- Semgrep Managed Scanning can't determine the dependencies in a project when there is no manifest file or lockfile, so Supply Chain scans don't return any findings.
- By default, Semgrep doesn't surface errors generated during a scan. To view errors in the CLI output, include the `--verbose` when initiating your scan:
    ```console
    semgrep ci --allow-local-builds --verbose
    ```
:::
## Run a scan using the CLI

You can start a stand-alone Semgrep Supply Chain scan by running the following command in the CLI:

```console
semgrep ci --supply-chain
```

Semgrep prints a list of findings directly to the CLI, including the finding's reachability determination, severity level, a brief description, and suggested remediation.

You can also view your results in Semgrep AppSec Platform. It displays all of the information displayed in the CLI, but it also offers you the ability to:

* [See additional finding details](/semgrep-supply-chain/view-export), such as whether the finding is always reachable or if it's reachable if certain conditions are met, and its transitivity status
* Use the [dependency search](/semgrep-supply-chain/dependency-search) feature
* Use the [license compliance](/semgrep-supply-chain/license-compliance) feature

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. As outlined in [Project directory structure](#project-directory-structure), findings are grouped by directory based on the [manifest file or lockfile](/semgrep-supply-chain/glossary/#manifest-file) present in the monorepo.

## Block pull requests or merge requests

You can comment on or potentially block pull requests or merge requests by defining a [Supply Chain Policy](/semgrep-supply-chain/policies).
