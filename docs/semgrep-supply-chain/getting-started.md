---
slug: getting-started 
append_help_link: true
description: "Scan your codebase's open source dependencies with Semgrep Supply Chain's high-signal rules that determine a vulnerability's reachability."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Scan your dependencies
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

Semgrep Supply Chain (SSC) is a software composition analysis (SCA) tool that detects [security vulnerabilities](https://nvd.nist.gov/vuln/full-listing) introduced by your codebase's open source dependencies. Semgrep Supply Chain also flags vulnerabilities as [reachable](/semgrep-supply-chain/glossary#reachability) or not to help you triage your findings. 

## Your first scan

Semgrep Supply Chain is automatically enabled for all [repositories that you scan with Semgrep Code](/semgrep-code/getting-started). At the completion of every scan, you can view your results by [logging in to your Semgrep account](https://semgrep.dev/login) and navigating to [**Supply Chain**](https://semgrep.dev/orgs/-/supply-chain).

:::caution Semgrep Supply Chain findings not appearing in Semgrep Cloud Platform
Certain package management software or CI providers may require additional set up (e.g., generating a lockfile that Semgrep Supply Chain is capable of parsing). See [Setting up SSC for your infrastructure](/semgrep-supply-chain/setup-infrastructure) for more information.
:::

### Scan your monorepo's dependencies

Semgrep Supply Chain the scanning of monorepos; it treates each of the monorepo's subdirectories as its own repository. Findings are then grouped by these repositories based on the [lockfile](/semgrep-supply-chain/glossary/#lockfile) or manifest file present in the monorepo.

## Event-triggered Semgrep Supply Chain scans

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

## Schedule scans

Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates and increase the frequence with which Semgrep Supply Chain scans your codebase (by default, Semgrep Supply Chain scans your code once per day). See the following table for assistance in modifying your scan schedules:

<CiScheduling />

If a rule is updated, findings generated against the updated rule are considered **new findings**, even if the previous version of the rule generated a finding. Furthermore, because the finding is new, you'll receive notifications through the channels you've set up (e.g., Slack, email).

## Work with findings

Semgrep Supply Chain enables developers to triage and remediate findings through Semgrep Cloud Platform's **[Vulnerabilities](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities)** page. More specifically, the Vulnerabilities page allows you to:

* View the specific lines of code where the dependency is declared and the vulnerable lines of code for a reachable finding to evaluate the threat;
* Triage a finding;
* Attach a pull request, merge request, or Jira ticket to the finding;
* Upgrade the dependency that generated the finding to a safe version. A safe version is any newer version of the dependency that does not contain the vulnerability. This resolves the finding.

For more information, see [Triaging and remediating findings](/docs/semgrep-supply-chain/triage-and-remediation).

### Block a pull/merge request

Though Semgrep Supply Chain v0.122.0 and earlier blocked pull/merge requests if it discovered reachable findings in the code, it no longer does this.

## Next steps

To customize the way Semgrep Supply Chain scans your code for open source dependencies, see:

* [Ignore lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) on how to flag specific findings as ones Semgrep should ignore using `semgrepignore`
* [Triage and remediate dependency findings](/semgrep-supply-chain/triage-and-remediation) for information on what to do once Semgrep Supply Chain has identified security vulnerabilities in you code

<MoreHelp />
