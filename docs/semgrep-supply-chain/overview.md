---
slug: overview
append_help_link: true
description: "Learn how Semgrep leverages its engine to scan open source dependencies with high-signal rules."
tags:
    - Semgrep Supply Chain
    - Team & Enterprise Tier
title: Overview
hide_title: false
---

import MoreHelp from "/src/components/MoreHelp"
import SscIntro from "/src/components/concept/_ssc-intro.md"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

<SscIntro />

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_Figure 1_. Semgrep Supply Chain Vulnerabilities page.

## Identify open source security vulnerabilities

Semgrep Supply Chain detects [security
vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase
introduced by open-source dependencies using high-signal rules, which are
instructions Semgrep uses detect patterns in code, to determine the
vulnerability's [reachability](/semgrep-supply-chain/glossary/#reachability).

To do this, Semgrep Supply Chain parses **lockfiles** for a list of dependencies,
then scans your codebase using rules that specify the
following information:

* The dependency versions that contain a vulnerability
* The pattern for the vulnerable code that Semgrep compares against your code
* The severity of the vulnerability

The following diagram shows the relationship between a Semgrep Supply Chain
rule, the codebase scanned, and its lockfile:

![Relationship between a Semgrep Supply Chain rule, lockfile, CVE record, and codebase](/img/sc-reachability-analysis.png)
_Figure 2_. Relationship between a Supply Chain rule, lockfile, CVE record, and codebase.

### Types of Semgrep Supply Chain findings

Semgrep Supply Chain generates a **finding** any time it determines that your
codebase uses or imports a package containing a vulnerability. In addition, Semgrep
Supply Chain offers two levels of support for reachability analysis, [depending
on your language](/supported-languages#maturity-levels):

* **GA**: Semgrep writes rules for all critical and high CVE
severity levels for GA languages. That means Semgrep Supply Chain can flag all
your critical/high-severity findings as either reachable or unreachable.
  * If there's a code pattern in the codebase that matches the vulnerability
    definition, the finding is flagged as **reachable**.
  * If you don't use the vulnerable piece of code of the library or package
  imported, the finding is flagged as **unreachable**.
  * If Semgrep Supply Chain determines that you use a vulnerable version of a
  dependency, but Semgrep Supply Chain doesn't have a relevant reachability rule, it flags the finding as **undetermined**; this is most common with
  vulnerabilities discovered before May 2022 or vulnerabilities with lower
  severity levels.

* **lockfile-only languages**: For **[lockfile-only](/semgrep-supply-chain/glossary/#lockfile-only-rules)** languages, Semgrep Supply Chain's performance is comparable to that of [GitHub's Dependabot](https://github.com/dependabot). Semgrep Supply Chain generates these findings by checking the dependency's version listed in your lockfile or manifest against a list of versions with known vulnerabilities, but it does not run reachability analysis. Because Semgrep Supply Chain doesn't run reachability analysis, it can't determine whether the vulnerability is reachable. Such vulnerabilities are, therefore, flagged as **undetermined**.

Specific dependency and code match findings are called **usages**. Semgrep AppSec Platform groups
all usages together by vulnerability. For each vulnerability, the UI also displays
a CVE number corresponding to the [CVE program record](https://www.cve.org/About/Overview).

### Transitive dependencies and reachability analysis

A [transitive
dependency](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency),
also known as an indirect dependency, is a dependency of a dependency. Semgrep
Supply Chain scans transitive dependencies for security vulnerabilities, but it
does *not* perform reachability analysis. This means that Semgrep Supply Chain
doesn't check the source code of your project's dependencies to determine if
their dependencies produce a reachable finding in your code.

However, some dependencies are vulnerable simply through their inclusion in a
codebase; in such cases, Semgrep Supply Chain generates reachable findings
involving these dependencies, even if they're transitive, not direct,
dependencies.

Some package ecosystems allow the use of a transitive dependency as if it were a
direct dependency. Though this feature is uncommon, Semgrep Supply Chain can
scan for such usage and flag transitive dependencies as unreachable if not used
directly.

## Software bill of materials

Semgrep Supply Chain can [generate a software bill of materials
(SBOM)](/semgrep-supply-chain/sbom), a complete inventory of your
third-party or open source components to assist you with your auditing procedures.

## Dependency search

Semgrep Supply Chain's dependency search feature allows you to query for
dependencies in your codebase; it can detect direct and transitive dependencies
in any repository on which you have run a full scan. The results list the dependency, along
with all of the repositories that use the dependency.

## License compliance

The [license compliance](/semgrep-supply-chain/license-compliance) feature
ensures that you're only using open source packages whose licensing meets your
organization's requirements.

## Next steps

Semgrep Supply Chain automatically scans repositories that you have added to Semgrep AppSec Platform.

* After every scan, you can view your findings by [logging in to Semgrep AppSec
  Platform](https://semgrep.dev/login) and navigating to [**Supply
  Chain**](https://semgrep.dev/orgs/-/supply-chain).
* To support your security and business goals, you can [customize how Semgrep
  Supply Chain scans your dependencies](/semgrep-supply-chain/getting-started).
* [Triage and remediate](/semgrep-supply-chain/triage-and-remediation) your findings.

### Further reading

* [Software supply chain security is
  hard](https://semgrep.dev/blog/2022/software-supply-chain-security-is-hard/)
* [The best free, open-source supply-chain security tool? The
  lockfile](https://semgrep.dev/blog/2022/the-best-free-open-source-supply-chain-tool-the-lockfile/)

<MoreHelp />
