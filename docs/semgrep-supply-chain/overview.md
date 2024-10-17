---
slug: overview
append_help_link: true
description: "Learn how Semgrep leverages its engine to scan open source dependencies with high-signal rules."
tags:
 - Semgrep Supply Chain
title: Overview
hide_title: false
---

import SscIntro from "/src/components/concept/_ssc-intro.md"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"

<SscIntro />

![Semgrep Supply Chain Vulnerabilities page](/img/sc-vulns.png)
_**Figure**. Semgrep Supply Chain Vulnerabilities page._

## Open source security vulnerabilities

Semgrep Supply Chain detects [security
vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase introduced by open source dependencies using high-signal rules, which are instructions Semgrep uses detect patterns in code, to determine the vulnerability's [reachability](/semgrep-supply-chain/glossary/#reachability).

To do this, Semgrep Supply Chain parses **lockfiles** for a list of dependencies, then scans your codebase using rules that specify the following information:

* The dependency versions that contain a vulnerability
* The pattern for the vulnerable code that Semgrep compares against your code
* The severity of the vulnerability

The following diagram shows the relationship between a Semgrep Supply Chain rule, the codebase scanned, and its lockfile:

![Relationship between a Semgrep Supply Chain rule, lockfile, CVE record, and codebase](/img/sc-reachability-analysis.png)
_**Figure**. Relationship between a Supply Chain rule, lockfile, CVE record, and codebase._

<AdmonitionSotCves />

### Types of Semgrep Supply Chain findings

Semgrep Supply Chain generates a **finding** whenever it determines that your codebase uses or imports a package containing a vulnerability. In addition, Semgrep
Supply Chain offers two levels of support for reachability analysis, [depending on your language](/supported-languages#maturity-levels):

* **Generally available (GA) languages**: Semgrep writes rules for all critical and high CVE severity levels for GA languages. That means Semgrep Supply Chain can flag all your critical/high-severity findings as either reachable or unreachable.
  * If there's a code pattern in the codebase that matches the vulnerability definition, the finding is flagged as **reachable**.
      * A finding is **always reachable** if the only way to fix the vulnerability is to upgrade the dependency. Semgrep strongly recommends upgrading the dependencies involved in these findings.
      * A finding is **conditionally reachable** if the vulnerability can be exploited when specific conditions are met. The finding is reachable if, in addition to the dataflow reachability in code, additional factors, such as the use of a specific operating system, are met. Semgrep cannot determine whether such factors are true, so conditionally reachable findings require manual review.
  * If Semgrep Supply Chain determines that you don't use the vulnerable library package imported or you don't use the vulnerable piece of code of the library or package imported, the finding is flagged as **unreachable**.
  * If Semgrep Supply Chain determines that you use a vulnerable version of a dependency, but Semgrep Supply Chain doesn't have a relevant reachability rule, it flags the finding as **no reachability analysis**.
* **lockfile-only languages**: For **[lockfile-only](/semgrep-supply-chain/glossary/#lockfile-only-rules)** languages, Semgrep Supply Chain's performance is comparable to that of [GitHub's Dependabot](https://github.com/dependabot). Semgrep Supply Chain generates these findings by checking the dependency's version listed in your lockfile or manifest against a list of versions with known vulnerabilities, but it does not run reachability analysis. Because Semgrep Supply Chain doesn't run reachability analysis, it can't determine whether the vulnerability is reachable. Such vulnerabilities are, therefore, flagged as **no reachability analysis**.

Specific dependency and code match findings are called **usages**. Semgrep AppSec Platform groups all usages together by vulnerability. For each vulnerability, the UI also displays a CVE number corresponding to the [CVE program record](https://www.cve.org/About/Overview).

### Transitive dependencies and reachability analysis

A [transitive dependency](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency), also known as an indirect dependency, is a dependency of a dependency. Semgrep Supply Chain scans transitive dependencies for [all supported languages](/supported-languages#semgrep-supply-chain), looking for security vulnerabilities, but it does *not* perform reachability analysis. This means that Semgrep Supply Chain doesn't check the source code of your project's dependencies to determine if their dependencies produce a reachable finding in your code.

However, some dependencies are vulnerable simply through their inclusion in a codebase; in such cases, Semgrep Supply Chain generates reachable findings involving these dependencies, even if they're transitive, not direct, dependencies.

Some package ecosystems allow the use of a transitive dependency as if it were a direct dependency. Though this feature is uncommon, Semgrep Supply Chain can scan for such usages and flag transitive dependencies as unreachable if not used directly.

## Software bill of materials

Semgrep Supply Chain can [generate a software bill of materials (SBOM)](/semgrep-supply-chain/sbom), a complete inventory of your third-party or open source components, to assist you with your auditing procedures.

## Dependency search

Semgrep Supply Chain's [dependency search](/semgrep-supply-chain/dependency-search) feature allows you to query for dependencies in your codebase; it can detect direct and transitive dependencies in any repository on which you have run a full scan. The results list the dependency, along with all of the repositories that use the dependency.

## License compliance

The [license compliance](/semgrep-supply-chain/license-compliance) feature ensures that you're only using open source packages whose licensing meets your organization's requirements.

## Next steps

Semgrep Supply Chain automatically scans repositories that you have added to Semgrep AppSec Platform. Once your first scan is completed:

* [View, triage, and remediate](/semgrep-supply-chain/triage-and-remediation) your findings.
  * [Customize Semgrep Supply Chain to ignore files and dependencies](/semgrep-supply-chain/ignoring-lockfiles-dependencies) to support your security and business goals.
* [Generate a software bill of materials (SBOM)](/semgrep-supply-chain/sbom).
* Query for dependencies in your codebase using [dependency search](/semgrep-supply-chain/dependency-search).
* Ensure that you're only [using open source packages whose licensing meets your organization's requirements](/semgrep-supply-chain/license-compliance).
