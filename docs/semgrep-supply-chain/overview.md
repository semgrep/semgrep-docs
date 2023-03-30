---
slug: overview 
append_help_link: true
description: "Learn how Semgrep leverages its engine to scan open source dependencies with high-signal rules."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Semgrep Supply Chain overview
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import SscIntro from "/src/components/concept/_ssc-intro.md"
import AdmonitionSscLicense from "/src/components/reference/_admonition-ssc-license.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Overview of Semgrep Supply Chain

<SscIntro />

<AdmonitionSscLicense />

![Semgrep Supply chain overview page](/img/sc-overview.png)
_Figure 1_. Semgrep Supply Chain overview page.

Semgrep Supply Chain parses lockfiles for a list of dependencies, then scans your codebase using **rules **written with Semgrep's pattern syntax. Supply Chain rules specify the following:

* The range of versions that contain the dependency's vulnerability.
* A pattern for vulnerable code, such as passing in unsanitized data.
* The severity of the vulnerability.

Semgrep Supply Chain generates a **finding **when it detects a match. If the dependency's version is within the range and finds the matching code within your codebase, the finding is **reachable**.

A finding is **unreachable** if the dependency contains a known vulnerability, but the vulnerable matching code is not used in your codebase.

In Semgrep Cloud Platform, specific findings of a dependency and code match are called **usages**. Usages are grouped by their **vulnerability**. Vulnerabilities in Semgrep Supply Chain typically have a CVE number corresponding to the record in the [CVE Program](https://www.cve.org/About/Overview).

The following diagram displays the relationship between a Supply Chain rule, the lockfile, and the codebase being scanned:

![Relationship between a Supply Chain rule, lockfile, CVE record, and codebase](/img/sc-reachability-analysis.png)
_Figure 2_. Relationship between a Supply Chain rule, lockfile, CVE record, and codebase.

## Semgrep and Semgrep Supply Chain

The following table displays differences between Semgrep and Semgrep Supply Chain.

<table>
<thead><tr>
   <th>Feature</th>
   <th>Semgrep</th>
   <th>Semgrep Supply Chain</th>
</tr></thead>
<tbody><tr>
   <td>Type of tool</td>
   <td>Static application security testing (SAST)</td>
   <td>Software composition analysis (SCA)</td>
  </tr>
  <tr>
   <td>Scan target
   </td>
   <td>First-party code (your codebase or repository)
   </td>
   <td>Open source dependencies 
   </td>
  </tr>
  <tr>
   <td>Triage workflow
   </td>
   <td>Findings can be categorized as:
<ul>
<li>Ignored (to triage false positives)</li>
<li>Closed (resolved) by refactoring code</li>
<li>Removed</li>
</ul>
   </td>
   <td>Findings can be categorized as:
<ul>
<li>New</li>
<li>In progress</li>
<li>Fixed</li>
<li>Ignored</li>
</ul>
   </td>
  </tr>
  <tr>
   <td>Remediation workflow
   </td>
   <td>Code refactoring
   </td>
   <td>Upgrading or removing the dependency, code refactoring
   </td>
  </tr>
  <tr>
   <td>Notification channels
   </td>
   <td>Jira, Slack, Email, Webhooks
   </td>
   <td>Slack and email
   </td>
  </tr></tbody>
</table>

## Language support

Refer to [Supported languages](/docs/supported-languages#semgrep-supply-chain) to see all languages supported by Semgrep Supply Chain.

## Transitive dependencies and reachability analysis

See [SSC glossary > Transitivity](/docs/semgrep-sc/sc-glossary/#transitive-or-indirect-dependency) for a definition of a transitive dependency.

* Semgrep Supply Chain does **not** perform reachability analysis for transitive dependencies. This means we do not scan the source code of your dependencies to determine if their dependencies may produce a reachable finding in the code.
* Semgrep Supply Chain supports scanning for transitive or indirect dependencies for all of its [supported languages](/docs/supported-languages#semgrep-supply-chain). Findings are collected and displayed in **Semgrep Cloud Platform** > **Supply Chain**.
* In most cases, Semgrep Supply Chain generates **reachable findings** for **direct dependencies**. However, there are certain dependencies that are vulnerable simply through their inclusion in a codebase. Semgrep Supply Chain generates reachable findings for these types of dependencies even if they are transitive dependencies.

## Next steps: Scanning your codebase

To scan your codebase, follow the instructions in [Scanning open source dependencies](/semgrep-sc/scanning-open-source-dependencies).

## Additional references

* [Software supply chain security is hard](https://r2c.dev/blog/2022/software-supply-chain-security-is-hard/)
* [The best free, open-source supply-chain security tool? The lockfile](https://r2c.dev/blog/2022/the-best-free-open-source-supply-chain-tool-the-lockfile/)

<MoreHelp />
