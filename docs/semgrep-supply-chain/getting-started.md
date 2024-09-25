---
slug: getting-started
append_help_link: true
description: "Customize how Semgrep Supply Chain scans your codebase's open source dependencies."
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

This article walks you through the Semgrep Supply Chain configuration and customization options available.

:::info Apache Maven
- To run a Semgrep Supply Chain scan, you must generate a [dependency tree for Apache Maven](/semgrep-supply-chain/setup-maven).
:::

## Project directory structure

Semgrep Supply Chain requires a [lockfile](/semgrep-supply-chain/glossary/#lockfile). Your code must use [supported lockfile ecosystems and filenames](/docs/supported-languages#semgrep-supply-chain). 

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

If you have code files in `my-project/biking`, Semgrep Supply Chain does not associate them to the dependencies in `my-project/running/lockfile.json`. If there is another lockfile in `my-project/running`, such as `my-project/running/uphill/lockfile.json`, then this overrides the original `my-project/running/lockfile.json` for all code files in `my-project/running/uphill/` or deeper directories.

## Enable Semgrep Supply Chain

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. In the **Deployment** tab, click the **<i class="fa-solid fa-toggle-large-on"></i> Supply Chain scans** toggle if it is not already enabled.

## Scan frequency

By adjusting your CI configuration, you can configure your scans so that Semgrep Supply Chain scans your code at a different frequency or when a specific event occurs.

### Schedule scans

Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates, adjust the frequency with which Semgrep Supply Chain scans your codebase.

<CiScheduling />

:::note Rule updates

If a rule is updated, findings generated against the updated rule are considered **new findings**, even if the previous version of the rule generated a finding. The new finding is not affected by any triage actions on findings related to the previous version of the rule. Because the finding is new, you'll also receive notifications through the channels you've set up, such as Slack.
:::

### Event-triggered scans

Depending on how your CI/CD system is configured, you can trigger a Semgrep Supply Chain scan whenever one of the following events occurs:

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

## Run a scan using the CLI

You can run a stand-alone Semgrep Supply Chain scan via the CLI using:

```console
semgrep ci --supply-chain
```

Semgrep prints a list of findings directly to the CLI, including the finding's reachability determination, severity level, a brief description, and suggested remediation.

Additionally, you can view your results in Semgrep AppSec Platform. It displays all of the information displayed in the CLI, but it also offers you the ability to:

* See additional finding details, such as whether the finding is always reachable or if it's reachable if certain conditions are met, and its transitivity status
* Use the [dependency search](/semgrep-supply-chain/dependency-search) feature
* Use the [license compliance](/semgrep-supply-chain/license-compliance) feature

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. As outlined in [Project directory structure](#project-directory-structure), findings are grouped by directory based on the [lockfiles](/semgrep-supply-chain/glossary/#lockfile) or manifest files present in the monorepo.

## Block pull or merge requests

Semgrep can be used to block pull requests (PRs) or merge requests (MRs) when it matches a blocking finding. When one or more findings is blocking, Semgrep returns exit code `1`, and you can use this result to set up additional checks to enforce a block in your CI/CD pipeline, such as not allowing merge of the PR/MR. This action applies to both full scans and [diff-aware scans](/semgrep-code/glossary#diff-aware-scan).

Semgrep Supply Chain versions **v0.122.0** and earlier automatically aided in blocking pull/merge requests if it discovered reachable findings in the code, but later versions do not do this. You can, however, configure Semgrep Supply Chain to help block scans whenever all of the following conditions are met:

* It detects reachable findings in direct dependencies
* The reachable findings are of critical or high severity
* There is an upgrade available for the affected dependency; this is to prevent blocking when there is no resolution for the vulnerability

To enable **Scan Blocking**:

1. Sign in to Semgrep AppSec Platform.
2. Go to **Settings > Deployment** and navigate to the **Supply Chain (SCA)** section.
3. Click **<i class="fa-solid fa-toggle-large-on"></i> Scan Blocking**.

Alternatively, you can configure your version control system to prevent merging if Semgrep Supply Chain identifies reachable findings.

## Ignore lockfiles and dependencies

See [Ignore lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) for information on how to flag specific findings to be ignored by Semgrep Supply Chain using `semgrepignore`.
