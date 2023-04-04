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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import PlatformSigninIntro from "/src/components/concept/_platform-signin-intro.md"
import PlatformSigninGithub from "/src/components/procedure/_platform-signin-github.md"
import PlatformSigninGitlab from "/src/components/procedure/_platform-signin-gitlab.md"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DetectGhRepos from "/src/components/procedure/_detect-gh-repos.md"
import AdmonitionSscLicense from "/src/components/reference/_admonition-ssc-license.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep Supply Chain

Semgrep Supply Chain detects recently discovered [security vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase's open source dependencies, prioritizing findings through [reachability](/semgrep-sc/sc-glossary#reachability) analysis. 

This document walks you through the process of setting up open-source dependency scanning with Semgrep Supply Chain.

To learn more about how Semgrep Supply Chain performs reachability analysis, see [Overview of Semgrep Supply Chain](/semgrep-sc/semgrep-supply-chain-overview).

:::info
Semgrep Supply Chain **supports monorepositories (monorepos)** by treating each subdirectory as its own repository. Findings are grouped under these repositories based on the [lockfile](/semgrep-sc/sc-glossary/#lockfile) or manifest file present in the subdirectory.
:::

## Scanning with Semgrep Supply Chain through Semgrep Cloud Platform

<AdmonitionSscLicense />

Semgrep Supply Chain is **automatically enabled** for all repositories that you have onboarded or added to Semgrep Cloud Platform for scanning. If you have not onboarded any repositories for scanning, follow the steps in [Adding a repository](/semgrep-code/getting-started-with-semgrep-code/#adding-or-onboarding-a-new-project-repository) to add a repository for scanning.

When the scan finishes, Semgrep Cloud Platform displays an overview of findings in the **Supply Chain** page for further triage and remediation. See [Triaging and remediating dependency findings](/semgrep-sc/triaging-and-remediating-vulnerabilities).

### Running rules with historical coverage (parity or ecosystem rules)

Historical coverage rules, also referred to as parity or ecosystem rules, are rules that do not perform reachability analysis. These rules only check a package's version against versions with known vulnerabilities. These rules produce vulnerabilities similar to Dependabot's results, but have a higher false positive rate.

To turn these rules on:

1. Sign in to your Semgrep Cloud Platform account.
2. Click **[Projects](https://semgrep.dev/orgs/-/projects)**, and then click <i class="fa-solid fa-gear"></i> **gear** icon of the repository on which to run historical coverage rules.
3. Click <i class="fa-solid fa-toggle-large-on"></i> **Supply Chain historical coverage**. Historical coverage rules are included in your next scan, that occurs based on your CI setup, such as schedules and events configuration (push, pull, and merge requests).
4. Optional: Some CI providers enable you to start workflows manually. To start a dependency scan immediately, go to your CI provider's interface and manually begin the Semgrep workflow or job.

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

See [Ignoring dependency findings](/docs/semgrep-sc/ignoring-lockfiles-dependencies).

## Triaging and remediating dependency findings

Semgrep Supply Chain enables developers to perform triage and remediation through the **[Vulnerabilities](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities)** page. On this page you can perform the following actions:

* View specific **reachable** vulnerable lines of code in your codebase. This helps to evaluate the threat.
* View specific lines of code where your dependency is being declared.
* Triage a dependency finding.
* Attach a PR or MR, or Jira ticket to the finding.
* Upgrade the dependency that generated the finding to a safe version. A safe version is any newer version of the dependency that does not contain the vulnerability. This resolves the finding.

For more information, see [Triaging and remediating findings](/docs/semgrep-sc/triaging-and-remediating-vulnerabilities).

## Appendix: Setting up SSC scans for specific project management tools

### Apache Maven (Java)

Semgrep Supply Chain does not read `pom.xml` files to parse Maven projects. Instead it parses a dependency tree generated by Maven (`mvn`). Perform the following steps to enable Semgrep Supply Chain to correctly parse Maven projects:

<ol>
    <li>Generate a file outlining the project's dependency tree by adding the following command to your build pipeline:<br />
    <pre class="language-bash">mvn dependency:tree -DoutputFile=maven_dep_tree.txt</pre>
    For specific steps to add the command into your build pipeline, refer to your CI provider's documentation.</li>
    <li>For each <code>pom.xml</code> file with dependencies you want to scan, create additional dependency trees in their respective directories. Semgrep Supply Chain can detect and parse them all.</li>
    <li>Run the Semgrep workflow, action, or step after the dependency tree or trees have been generated.</li>
</ol>

:::caution
* Ensure that Maven is installed in the build environment that is used to generate the dependency trees.
* Ensure that you generate dependency trees before running Semgrep.
:::

You can run the above commands in a local environment to test its behavior. The following screenshot displays the commands running in a local environment:


![Screenshot of Maven dependency tree generated in a local environment](/img/ssc-maven-local.png)

<MoreHelp />
