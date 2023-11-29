---
slug: getting-started 
append_help_link: true
description: "Scan your codebase's open source dependencies with Semgrep Supply Chain's high-signal rules that determine a vulnerability's reachability."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Semgrep Supply Chain
hide_title: true
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

# Getting started with Semgrep Supply Chain

Semgrep Supply Chain (SSC) detects recently discovered [security vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase's open source dependencies, prioritizing findings through [reachability](/semgrep-supply-chain/glossary#reachability) analysis. 

To learn more about how Semgrep Supply Chain performs reachability analysis, see [Overview of Semgrep Supply Chain](/semgrep-supply-chain/overview).


## Scanning with Semgrep Supply Chain through Semgrep Cloud Platform

Semgrep Supply Chain is **automatically enabled** for all repositories that you have onboarded or added to Semgrep Cloud Platform for scanning. If you have not onboarded any repositories for scanning, follow the steps in [Adding a repository](/semgrep-code/getting-started/) to add a repository for scanning.

When the scan finishes, Semgrep Cloud Platform displays an overview of findings in the **Supply Chain** page for further triage and remediation. See [Triaging and remediating dependency findings](/semgrep-supply-chain/triage-and-remediation).

:::info
Semgrep Supply Chain **supports monorepositories (monorepos)** by treating each subdirectory as its own repository. Findings are grouped under these repositories based on the [lockfile](/semgrep-supply-chain/glossary/#lockfile) or manifest file present in the subdirectory.
:::

:::caution Semgrep Supply Chain findings not appearing in Semgrep Cloud Platform
Certain package management software or CI providers may require additional set up. See [Setting up SSC for your infrastructure](/semgrep-supply-chain/setup-infrastructure) for more information.
:::

### Future rule updates to existing or current rules

* Semgrep rules may be updated as a vulnerability is analyzed.
* When a rule is updated, findings from the updated rule are considered **new findings**, even if the old version of the rule also generated a finding.
* You still receive notifications of the new finding through any channel that you have configured, such as Slack.

### Events that trigger a Supply Chain dependency scan

Dependency scans can be triggered by the following, depending on your CI set up:

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
   <td>diff-aware scan
   </td>
   <td>All dependency rules
   </td>
  </tr>
  <tr>
   <td>Push or scheduled event, such as a cron job
   </td>
   <td>full scan
   </td>
   <td>All dependency rules
   </td>
  </tr>
</table>

For more information on diff-aware and full scans, see [Diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning).

### Blocking a PR or MR

Both reachable and unreachable findings of Semgrep Supply Chain do **not** block a pull request or merge request.

:::info
Semgrep versions v0.122.0 and below previously blocked reachable findings.
:::

### Setting a daily scan schedule

Semgrep Supply Chain frequently releases new rules. By default, Semgrep Supply Chain scans your codebase once a day. Change your time or frequency through the following references:

<CiScheduling />

## Ignoring dependency findings through `semgrepignore`

See [Ignoring dependency findings](/docs/semgrep-supply-chain/ignoring-lockfiles-dependencies).

## Triaging and remediating dependency findings

Semgrep Supply Chain enables developers to perform triage and remediation through the **[Vulnerabilities](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities)** page. On this page you can perform the following actions:

* View specific **reachable** vulnerable lines of code in your codebase. This helps to evaluate the threat.
* View specific lines of code where your dependency is being declared.
* Triage a dependency finding.
* Attach a PR or MR, or Jira ticket to the finding.
* Upgrade the dependency that generated the finding to a safe version. A safe version is any newer version of the dependency that does not contain the vulnerability. This resolves the finding.

For more information, see [Triaging and remediating findings](/docs/semgrep-supply-chain/triage-and-remediation).

## Setting up SSC scans for specific project management or pipeline tools

Scanning third-party code with Semgrep Supply Chain may require additional steps, such as generating a lock file that it can parse in continuous integration (CI). Refer to [Setting up Semgrep Supply Chain for your infrastructure](/semgrep-supply-chain/setup-infrastructure).

<MoreHelp />
