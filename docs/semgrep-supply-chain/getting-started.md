---
slug: getting-started 
append_help_link: true
description: "Scan your codebase's open source dependencies with Semgrep Supply Chain's high-signal rules that determine a vulnerability's reachability."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Customize your Semgrep Supply Chain scan
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

This article will walk you through the Semgrep Supply Chain configuration and customization options available to you.

## Missing findings 

If you do not see your findings in SCP, be aware that some package managers or CI/CD providers require additional set up (e.g., generating a lockfile that Semgrep Supply Chain is capable of parsing). See [Setting up SSC for your infrastructure](/semgrep-supply-chain/setup-infrastructure) for more information.

### Advisories

SCP displays **advisories**, which provide information about all vulnerabilities covered by Semgrep Supply Chain, regardless of whether your code leverages the related dependency.

<AdmonitionSotCves />

## Work with findings

SCP's **[Vulnerabilities](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities)** page contains the following features help you manage your findings. You can:

* View the specific lines of code where the dependency is declared, as well as the lines of code where the security vulnerable can be exploited;
* Triage a finding;
* Attach a pull request, merge request, or Jira ticket to the finding;
* Upgrade the dependency that generated the finding to a safe version to resolve the finding. A safe version is any newer version of the dependency that does not contain the vulnerability.

For more information, see [Triaging and remediating findings](/docs/semgrep-supply-chain/triage-and-remediation).

## Dependency scan frequency

By default, Semgrep Supply Chain scans your code once per day. However, you can change this so Semgrep Supply Chain scans your code at a different frequency or when a specific event occurs.

:::info
Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates, you can increase the frequence with which Semgrep Supply Chain scans your codebase.

If a rule is updated, findings generated against the updated rule are considered **new findings**, even if the previous version of the rule generated a finding. Furthermore, because the finding is new, you'll receive notifications through the channels you've set up (e.g., Slack, email).
:::

### Schedule scans

Semgrep Supply Chain frequently receives rule updates. To take advantage of these updates and increase the frequence with which Semgrep Supply Chain scans your codebase. See the following table for assistance in modifying your scan schedules:

<CiScheduling />

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

:::info
Though Semgrep Supply Chain v0.122.0 and earlier blocked pull/merge requests if it discovered reachable findings in the code, it no longer does this.
:::

## Scan a monorepo's dependencies

Semgrep Supply Chain supports the scanning of monorepos. It treates each of the monorepo's subdirectories as an individual repository. Findings are then grouped by the repositories based on the [lockfile](/semgrep-supply-chain/glossary/#lockfile) or manifest file present in the monorepo.

## Next steps

* See [Ignore lockfiles and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) for information on how to flag specific findings to be ignored by Semgrep Supply Chain using `semgrepignore`
* Learn how to [Triage and remediate dependency findings](/semgrep-supply-chain/triage-and-remediation) once Semgrep Supply Chain has identified security vulnerabilities in you code
* [Set up alerts](#) for information on how to set up 
* Use [Dependency search](/semgrep-supply-chain/dependency-search) to see all of the dependencies, both direct and transitive, leveraged by your codebase.
* Explicitly [allow or disallow the use of specific packages in your code based on its license type](/semgrep-supply-chain/license-compliance).

<MoreHelp />
