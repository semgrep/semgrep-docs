---
slug: supported-languages
id: supported-languages
append_help_link: true
description: >-
  Semgrep supports more than two dozen languages. Learn about generally available, beta, and experimentally supported languages.
hide_title: true
tags:
    - Semgrep Supply Chain 
    - Semgrep OSS Engine
    - Team & Enterprise Tier
title: Supported languages
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import SscIntro from "/src/components/concept/_ssc-intro.md"
import MoreHelp from "/src/components/MoreHelp"
import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Supported languages

This document provides information about supported languages and language maturity definitions for the following products:

* Semgrep Code
* Semgrep Supply Chain

## Semgrep Code 

Semgrep Code is a static application security testing (SAST) tool that detects security issues and helps enforce coding standards in your first-party code.

Use Semgrep Code to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

You can choose between two different engines to scan with:

<!-- 

Secure your code quickly and continuously by scanning with Semgrep Code, a SAST (Static Application Security Testing) product, powered by Semgrep OSS Engine and Semgrep Pro Engine. The Semgrep OSS Engine is the foundation of Semgrep, it's our [open-source engine](https://github.com/semgrep/semgrep), designed for fast code analysis. The Semgrep Pro Engine is designed for advanced code analysis, designed to catch complex vulnerabilities and reduce false positives. Use Semgrep Code to quickly find and fix vulnerabilities in your code base. 

-->

| Engine | Description | Analysis | Language support |
| -------  | ------ | ------ | ------ |
| [<i class="fas fa-external-link fa-xs"></i> OSS Engine](https://github.com/semgrep/semgrep) | Fast, static analysis engine.  |<ul><li>Single-function analysis</li><li>Single-file analysis</li></ul> | +30 languages |
| Pro Engine | Proprietary static analysis engine that can perform more complex code analyses, resulting in a higher true positive rate than the OSS engine, though scans take longer to complete. |<ul><li>All analyses in the OSS Engine</li><li>Cross-file (interfile) analysis</li><li>Cross-function (interprocedural) analysis</li></ul>      | 10 languages |

### Language maturity

Semgrep Code supports over 30 languages and counting! 🚀 

<SupportedLanguagesTable />

### Maturity levels

#### Language maturity factors

Semgrep Code languages can be classified into four maturity levels:

* Generally available (GA) 
* Beta
* Experimental 
* Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of **Experimental** languages, but ongoing development from Semgrep has stopped. Users can still access community rules or write their own rules.

Their differences are outlined in the following table:

| Feature  | GA | Beta | Experimental
|----------|---------------|------------------| ----- |
| Parse Rate  | 99%+ | 95%+ | 90%+ | 
| Number of rules  | 10+ | 5+ | 0+. Query the [Registry](https://semgrep.dev/r) to see if any rules exist for your language. | 
| Semgrep syntax | Regexp, equivalence, deep expression operators, types and typing. All features supported in Beta. | Complete metavariable support, metavariable equality. All features supported in Experimental. | Syntax, ellipsis operator, basic metavariable functionality.|
| Support | Highest quality support by the Semgrep team. Reported issues are resolved promptly. | Supported by the Semgrep team. Reported issues are fixed after GA languages. | There are limitations to this language's functionality. Reported issues are tracked and prioritized with best effort.|


### More information
Visit the cheat sheet generation script and associated semgrep-core test files to learn more about each feature:
* [Generation script](https://github.com/semgrep/semgrep/blob/develop/scripts/generate_cheatsheet.py)
* [`semgrep-core` test files](https://github.com/semgrep/semgrep/tree/develop/tests)

Visit the Semgrep public language dashboard to see the parse rates for each language
* See [Parse rates by language](https://dashboard.semgrep.dev/).

<!-- coupling: If you modify the features in the levels below, change also 
     /semgrep/blob/develop/tests/Test.ml and its maturity level regression testing code.
-->

## Semgrep Supply Chain

<SscIntro/>

Semgrep Supply Chain parses **lockfiles** for dependencies, then scans your codebase for reachable findings based on the lockfiles. Some languages, such as Java, have several lockfiles, depending on your repository's package manager. For some languages, such as JavaScript and Python, a manifest file is also parsed to determine [transitivity](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency).

<table>
<thead><tr>
    <th>Language</th>
    <th>Supported package managers</th>
    <th>Lockfile</th>
    <th>Reachability support level‡</th>
    <th>License detection support</th>
    <th>Time period of reachability rule coverage for CVEs/GHSAs</th>
</tr></thead>
<tbody>
<tr>
   <td>C#</td>
   <td>NuGet</td>
   <td><code>packages.lock.json</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
   <td rowspan="12">Since May 2022</td>
</tr>
<tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.mod</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
  </tr>
<tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
  </tr>
  <tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
  </tr>
  <tr>
   <td rowspan="3">JavaScript or TypeScript</td>
   <td>npm (Node.js)</td>
   <td><code>package-lock.json</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
  </tr>
  <tr>
   <td>Yarn, Yarn 2, Yarn 3</td>
   <td><code>yarn.lock</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>--</td>
  </tr>
  <tr>
   <td>pnpm</td>
   <td><code>pnpm-lock.yaml</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>--</td>
  </tr>
  <tr>
   <td rowspan="4">Python</td>
   <td>pip</td>
   <td><code>requirements.txt</code>†† (generated by e.g. <code>pip freeze</code>)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td rowspan="4">✔️ (PyPI packages only)</td>
  </tr>
  <tr>
   <td>pip-tools</td>
   <td><code>requirements.txt</code></td>
   <td style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>Pipenv</td>
   <td><code>Pipfile.lock</code></td>
   <td style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>Poetry</td>
   <td><code>poetry.lock</code></td>
   <td style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>Ruby</td>
   <td>RubyGems</td>
   <td><code>Gemfile.lock</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✔️</td>
  </tr>
  <tr>
   <td>Rust</td>
   <td>Cargo</td>
   <td><code>cargo.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>✔️</td>
   <td rowspan="5">Not applicable due to reachability support level</td>
</tr>
<tr>
   <td>Dart</td>
   <td>Pub</td>
   <td><code>pubspec.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
   <td>Kotlin</td>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
   <td>PHP</td>
   <td>Composer</td>
   <td><code>composer.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
   <td>Scala</td>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
  </tbody>
</table>

_*Semgrep Supply Chain scans transitive dependencies for **all supported languages** but does **not** perform reachability analysis on transitive dependencies._ <br />
_**‡Reachability support level** refers to the level of support for reachability analysis for the language. At the minimum, Semgrep Supply Chain uses **lockfile-only** rules, which check a package's version against versions with known vulnerabilities._ <br />
_**††**Semgrep Supply Chain supports `requirements.txt` when it is used as a **lockfile**. This means that `requirements.txt` must be set to exact versions (pinned dependencies) and the file must be generated automatically._

<AdmonitionSotCves />

:::info Transitivity support
For more information on transitivity, see [Transitive dependencies and reachability analysis](/docs/semgrep-supply-chain/overview/#transitive-dependencies-and-reachability-analysis).
:::

### Maturity levels

Semgrep Supply Chain has two maturity levels:

* General Availability (GA)
* Beta

Their differences are outlined in the following table:

<table>
  <tr>
   <td><strong>Feature</strong>
   </td>
   <td><strong>GA</strong>
   </td>
   <td><strong>Beta</strong>
   </td>
  </tr>
  <tr>
   <td>Number of reachability rules
   </td>
   <td>10+
   </td>
   <td>1+
   </td>
  </tr>
  <tr>
   <td>Semgrep, Inc. rule-writing support
   </td>
   <td>Quickly release new rules for all critical and high vulnerabilities based on the latest <a href="https://nvd.nist.gov/vuln">security advisories</a>.
   </td>
   <td>No commitment for new rules based on the latest security advisories.
   </td>
  </tr>
  <tr>
   <td>Semgrep OSS Engine <a href='/docs/supported-languages#semgrep-oss-engine'>language support</a>
   </td>
   <td>Semgrep OSS Engine support is GA.
   </td>
   <td>Semgrep OSS Engine support is at least Beta.
   </td>
  </tr>
</table>

:::info Feature and product maturity levels
* The detailed specifications previously provided apply only to language support. Language maturity levels differ from feature and product maturity levels.
* Semgrep features and products documented as experimental, beta, or GA generally follow the definitions in a [Software release life cycle](https://en.wikipedia.org/wiki/Software_release_life_cycle).
:::

<MoreHelp />
