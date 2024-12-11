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

To scan your project with Semgrep Supply Chain, it must have a lockfile and use [supported lockfile ecosystems and filenames](/docs/supported-languages#semgrep-supply-chain).

Semgrep Supply Chain can correctly parse code files and lockfiles in subfolders as well. Code files that use the dependencies in the lockfile must be nested in the same directory as the lockfile. Lockfiles must all use the supported lockfile names.

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

If you have code files in `my-project/biking,` Semgrep Supply Chain does not associate them with the dependencies in `my-project/running/lockfile.json.` If there is another lockfile in `my-project/running`, such as `my-project/running/uphill/lockfile.json`, then this overrides the original `my-project/running/lockfile.json` for all code files in `my-project/running/uphill/` or deeper directories.

:::info Apache Maven
To run a Semgrep Supply Chain scan, generate a [dependency tree for Apache Maven](/semgrep-supply-chain/setup-maven).
:::

## Enable Semgrep Supply Chain

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. In the **Deployment** tab, navigate to **Supply Chain (SCA)**, and click the **<i class="fa-solid fa-toggle-large-on"></i> Supply Chain scans** toggle if it is not already enabled.

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
 <td>Pull or merge request</td>
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
Semgrep does not support managed scans of projects without lockfiles.
:::

Semgrep Supply Chain can scan Java projects built using Maven or Gradle Wrapper without the need for lockfiles.

1. Ensure that the environment where you run Semgrep scans has installed all of the dependencies required to build your project, such as Java and Maven.

2. Initiate a Semgrep scan, ensuring that you include the `--allow-local-builds` flag:
    ```console
    semgrep ci --allow-local-builds
    ```
    For existing CI jobs, you may have to edit your configuration file to include this flag.
    Semgrep builds the project, using the build information included in the `pom.xml` or `build.gradle` file to determine the set of dependencies used by the project. 

The `build.gradle` or `pom.xml` file used by Semgrep to build the project is listed in the Scan Summary after the scan completes successfully.

![Supply Chain scan summary](/img/ssc-scan-summary.png#md-width)
_**Figure**. Supply Chain scan summary listing a manifest file._

:::info
By default, Semgrep doesn't surface errors generated during a scan. To view errors in the CLI output, include the `--verbose` when initiating your scan:

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

* [See additional finding details](/semgrep-supply-chain/triage-and-remediation#view-open-source-security-findings), such as whether the finding is always reachable or if it's reachable if certain conditions are met, and its transitivity status
* Use the [dependency search](/semgrep-supply-chain/dependency-search) feature
* Use the [license compliance](/semgrep-supply-chain/license-compliance) feature

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. As outlined in [Project directory structure](#project-directory-structure), findings are grouped by directory based on the [lockfiles](/semgrep-supply-chain/glossary/#lockfile) or manifest files present in the monorepo.

## Block pull or merge requests

Semgrep can help block pull requests (PRs) or merge requests (MRs) when it matches a blocking finding. When one or more findings is blocking, Semgrep returns exit code `1`, and you can use this result to set up additional checks to enforce a block in your CI/CD pipeline, such as not allowing merge of the PR/MR. This action applies to full and [diff-aware scans](/semgrep-code/glossary#diff-aware-scan).

Semgrep Supply Chain versions **v0.122.0** and earlier automatically aided in blocking pull/merge requests if it discovered reachable findings in the code, but later versions do not do this. You can, however, configure Semgrep Supply Chain to help block scans whenever all of the following conditions are met:

* It detects reachable findings in direct dependencies
* The reachable findings are of critical or high severity
* There is an upgrade available for the affected dependency; this is to prevent blocking when there is no resolution for the vulnerability

To enable **Scan Blocking**:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Settings > Deployment** and navigate to the **Supply Chain (SCA)** section.
3. Click **<i class="fa-solid fa-toggle-large-on"></i> Scan Blocking**.

Alternatively, you can configure your version control system to prevent merging if Semgrep Supply Chain identifies reachable findings.
