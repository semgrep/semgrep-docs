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

## Discover and detect vulnerabilities

Semgrep Supply Chain detects [security
vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase introduced by open source dependencies using high-signal rules, which are instructions Semgrep uses detect patterns in code, to determine the vulnerability's %%reachability|reachability%%.

To do this, Supply Chain first determines the list of dependencies and versions in the code, then scans your codebase using rules that specify the following information:

* The dependency versions that contain a vulnerability
* The pattern for the vulnerable code that Semgrep compares against your code
* The severity of the vulnerability

The following diagram shows the relationship between a Supply Chain rule, the codebase scanned, and in this case, a lockfile:

![Relationship between a Supply Chain rule, manifest file or lockfile, CVE record, and codebase](/img/sc-reachability-analysis.png)
_**Figure**. Relationship between a Supply Chain rule, manifest file or lockfile, CVE record, and codebase._

<AdmonitionSotCves />

### Types of Supply Chain findings

Supply Chain generates a **finding** whenever it determines that your codebase uses or imports a package containing a vulnerability. In addition, Semgrep supports **reachability** for [generally available (GA) languages](/supported-languages):

* **GA languages**: Semgrep writes rules for all critical and high CVE severity levels for GA languages. That means Supply Chain can flag all your critical/high-severity findings as either reachable or unreachable.
  * If there's a code pattern in the codebase that matches the vulnerability definition, the finding is flagged as **reachable**.
      * A finding is **always reachable** if the only way to fix the vulnerability is to upgrade the dependency. Semgrep strongly recommends upgrading the dependencies involved in these findings.
      * A finding is **conditionally reachable** if the vulnerability can be exploited when specific conditions are met. The finding is reachable if, in addition to the dataflow reachability in code, additional factors, such as the use of a specific operating system, are met. Semgrep cannot determine whether such factors are true, so conditionally reachable findings require manual review.
  * If Supply Chain determines that you don't use the vulnerable library package imported or you don't use the vulnerable piece of code of the library or package imported, the finding is flagged as **unreachable**.
  * If Supply Chain determines that you use a vulnerable version of a dependency, but Supply Chain doesn't have a relevant reachability rule, it flags the finding as **no reachability analysis**.
* For **languages where Supply Chain doesn't currently offer %%reachability rules|reachability_rules%%** languages, Supply Chain's performance is comparable to that of [GitHub's Dependabot](https://github.com/dependabot). Supply Chain generates these findings by checking the dependency's version against a list of versions with known vulnerabilities, but it does not run reachability analysis. Because Supply Chain doesn't run reachability analysis, it can't determine whether the vulnerability is reachable. Such vulnerabilities are, therefore, flagged as **no reachability analysis**.

Specific dependency and code match findings are called **usages**. Semgrep AppSec Platform groups all usages together by vulnerability. For each vulnerability, the UI also displays a CVE number corresponding to the [CVE program record](https://www.cve.org/About/Overview).

#### Transitive dependencies and reachability analysis

A %%transitive dependency|transitive_or_indirect_dependency%%, also known as an indirect dependency, is a dependency of a dependency. Supply Chain scans transitive dependencies for [all supported languages](/supported-languages#semgrep-supply-chain), looking for security vulnerabilities, but it does *not* perform reachability analysis. This means that Supply Chain doesn't check the source code of your project's dependencies to determine if their dependencies produce a reachable finding in your code.

However, some dependencies are vulnerable simply through their inclusion in a codebase; in such cases, Supply Chain generates reachable findings involving these dependencies, even if they're transitive, not direct, dependencies.

Some package ecosystems allow the use of a transitive dependency as if it were a direct dependency. Though this feature is uncommon, Supply Chain can scan for such usages and flag vulnerabilities in transitive dependencies as unreachable if not used directly.

## Triage and fix vulnerabilities

Once Supply Chain has identified vulnerabilities in your code and generated findings, you can take the following actions:

- **Review provisionally ignored findings**: Provisionally ignored findings are those identified by Semgrep as unreachable. These types of findings are flagged so that you can prioritize attention to them based on the priority of competing demands.
- **Ignore findings**: If the finding is a false positive, or if your company's business policies deem the use of the dependency an acceptable risk, you can choose to ignore the finding.
- **Remediate true positives**: If the finding is one that you must address, you can:
  - **Remove dependencies and refactor code**: You can remediate true positives identified by Supply Chain by updating the dependency to a safe version or removing the dependency, then refactoring all usages of that dependency in your project.
  - **Use upgrade guidance and Autofix**: If the remediation for a finding is to upgrade the package, **Upgrade guidance** uses program analysis and AI to analyze the results of your Semgrep scans to see if you can safely and reliably update a vulnerable package or dependency to a fixed version. Semgrep can also create a pull request (PR) or merge request (MR) that updates the version used by your repository and guide the developer on any breaking changes in the PR or MR description.
  - **Open a pull request or merge request with fixes**: Semgrep can open a pull request (PR) or merge request (MR) that updates the vulnerable version used by your repository and guide the developer on any breaking changes in the PR or MR description.

## Policies

Policies allow you to choose the rules and rulesets used for your Supply Chain scans and define what happens to a finding after identification, such as whether a finding is monitored, generates a pull request (PR) or merge request (MR) comment, or blocks a PR or MR.

## Malware detection and response

Semgrep can [detect malicious dependencies](/semgrep-supply-chain/malicious-dependencies), which are treated as critical severity findings. If you have set up your [policies](/semgrep-supply-chain/policies) to block critical severity findings, Semgrep prevents developers from merging pull requests or merge requests with malicious dependencies.

Supply Chain's [dependency search](/semgrep-supply-chain/dependency-search) feature allows you to query for dependencies in your codebase; it can detect direct and transitive dependencies in any repository on which you have run a full scan. The results list the dependency, along with all of the repositories that use the dependency.

### Dependency paths

Supply Chain's dependency paths feature allows you to view dependency paths for all transitive dependencies introduced in a project, up to seven layers of depth. This provides information on how a transitive dependency was introduced and how deeply the transitive dependency is nested in the dependency tree.

## License compliance

The [license compliance](/semgrep-supply-chain/license-compliance) feature ensures that you're only using open source packages whose licensing meets your organization's requirements.

## Reporting

### Reports through the Semgrep API

The Semgrep API allows you to obtain project and dependency information, as well as generate an SBOM. The following endpoints are available to you:

- [List dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_ListDependencies)
- [List repositories with dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_ListRepositoriesForDependencies)
- [List lockfiles in a given repository with dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_ListLockfilesForDependencies)
- [Create a new SBOM export job](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_CreateSbomExport)
- [Get the status of a SBOM export job](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/SupplyChainService_GetSbomExport)

### Software bill of materials

Supply Chain can [generate a software bill of materials (SBOM)](/semgrep-supply-chain/sbom), a complete inventory of your third-party or open source components, to assist you with your auditing procedures.

## Next steps

Supply Chain automatically scans repositories that you have added to Semgrep AppSec Platform. Once your first scan is completed:

* [View, triage, and remediate](/semgrep-supply-chain/triage-and-remediation) your Supply Chain findings.
  * [Customize Supply Chain to ignore files and dependencies](/semgrep-supply-chain/ignoring-dependencies) to support your security and business goals.
* [Generate a software bill of materials (SBOM)](/semgrep-supply-chain/sbom).
* Query for dependencies in your codebase using [dependency search](/semgrep-supply-chain/dependency-search).
* Ensure that you're only [using open source packages whose licensing meets your organization's requirements](/semgrep-supply-chain/license-compliance).
