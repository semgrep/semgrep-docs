---
slug: getting-started
append_help_link: true
description: "Customize how Semgrep Supply Chain scans your codebase's open source dependencies."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Scan third-party dependencies
hide_title: true
---

<!-- vale off -->
import MoreHelp from "/src/components/MoreHelp"

import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DetectGhRepos from "/src/components/procedure/_detect-gh-repos.md"

<!-- vale on -->

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Scan third-party dependencies

This article walks you through the Semgrep Supply Chain configuration and customization options available.

:::info Apache Maven
- To run a Semgrep Supply Chain scan, you must generate a [dependency tree for Apache Maven](/semgrep-supply-chain/setup-maven).
:::

## Project directory structure

Semgrep Supply Chain requires a [lockfile](/semgrep-supply-chain/glossary/#lockfile). Code files that use the dependencies in the lockfile must be nested in the same directory as the lockfile. Semgrep Supply Chain can correctly parse code files in subfolders as well.

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

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
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
   <td><strong>Event</strong>
   </td>
   <td><strong>Scope of scan</strong>
   </td>
   <td><strong>Dependency rule set</strong>
   </td>
  </tr>
  <tr>
   <td>Pull or merge request
   </td>
   <td><a href="/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning">Diff-aware scan</a>
   </td>
   <td>All dependency rules
   </td>
  </tr>
  <tr>
   <td>Push or scheduled event, such as a cron job
   </td>
   <td>Full scan
   </td>
   <td>All dependency rules
   </td>
  </tr>
</table>

## Run a scan using the CLI

You can run a stand-alone Semgrep Supply Chain scan via the CLI using:

```console
semgrep ci --supply-chain
```

Semgrep prints a list of findings directly to the CLI, including the finding's reachability determination, severity level, a brief description, and suggested remediation.

Additionally, you can view your results in Semgrep Cloud Platform (SCP). SCP displays all of the information displayed in the CLI, but it also offers you the ability to:

* See additional finding details, such as whether the finding is always reachable or if it's reachable if certain conditions are met, and its transitivity status
* Use the [dependency search](/semgrep-supply-chain/dependency-search) feature
* Use the [license compliance](/semgrep-supply-chain/license-compliance) feature

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. As outlined in [Project directory structure](#project-directory-structure), findings are grouped by directory based on the [lockfiles](/semgrep-supply-chain/glossary/#lockfile) or manifest files present in the monorepo.

## Block pull or merge requests

Semgrep Supply Chain versions **v0.122.0** and earlier automatically blocked pull/merge requests if it discovered reachable findings in the code, but later versions do not do this. You can, however, configure Semgrep Supply Chain to block on pull request scans that detect reachable findings in direct dependencies with high or critical severity.

1. Log in to Semgrep Cloud Platform.
2. Click **Supply Chain** > **Settings** on the header menu.
3. Click **<i class="fa-solid fa-toggle-large-on"></i> PR Blocking**.

Alternatively, you can configure your version control system to prevent merging if Semgrep Supply Chain identifies reachable findings.

## Ignore lockfiles and dependencies

See [Ignore lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) for information on how to flag specific findings to be ignored by Semgrep Supply Chain using `semgrepignore`.

<MoreHelp />
