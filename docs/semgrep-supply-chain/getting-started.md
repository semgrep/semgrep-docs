---
slug: getting-started 
append_help_link: true
description: "Customize how Semgrep Supply Chain scans your codebase's open source dependencies."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Customization
hide_title: false
---

import MoreHelp from "/src/components/MoreHelp"

import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DetectGhRepos from "/src/components/procedure/_detect-gh-repos.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

This article walks you through the Semgrep Supply Chain configuration and customization options available.

## Scan frequency

By default, Semgrep Supply Chain scans your code once per day. However, you can change this so Semgrep Supply Chain scans your code at a different frequency or when a specific event occurs.

### Schedule scans

Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates and increase the frequency with which Semgrep Supply Chain scans your codebase.

<CiScheduling />

:::info Rules updates

If a rule is updated, findings generated against the updated rule are considered **new findings**, even if the previous version of the rule generated a finding. Furthermore, because the finding is new, you'll receive notifications through the channels you've set up (e.g., Slack, email).
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

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. It treates each of the monorepo's subdirectories as an individual repository. Findings are then grouped by the repositories based on the [lockfile](/semgrep-supply-chain/glossary/#lockfile) or manifest file present in the monorepo.


## Block pull or merge requests

Though Semgrep Supply Chain **v0.122.0** and earlier automatically blocked pull/merge requests if it discovered reachable findings in the code, it no longer does this. You can, however, configure your version control system to prevent merging if Semgrep Supply Chain identifies reachable findings.

## Next steps

* Learn how to [set up Semgrep Supply Chain in your CI/CD System](/semgrep-supply-chain/setup-infrastructure).

* See [Ignore lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) for information on how to flag specific findings to be ignored by Semgrep Supply Chain using `semgrepignore`

<MoreHelp />
