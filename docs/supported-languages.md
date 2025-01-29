---
slug: supported-languages
id: supported-languages
append_help_link: true
description: >-
  Semgrep supports more than two dozen languages. Learn about generally available, beta, and experimentally supported languages.
hide_title: true
tags:
    - Deployment
title: Supported languages
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import SscIntro from "/src/components/concept/_ssc-intro.md"
import LanguageMaturityCode from '/src/components/reference/_language-maturity-code.md'
import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import DefCrossFile from "/src/components/concept/_def-cross-file.mdx"
import DefCrossFunction from "/src/components/concept/_def-cross-function.mdx"
import DefReachability from "/src/components/concept/_def-reachability.md"

# Supported languages

This document provides information about supported languages and language maturity definitions for the following products:

* **Semgrep Code (SAST)** - a static application security testing (SAST) solution designed to detect complex security vulnerabilities. 
* **Semgrep Supply Chain (SCA)** - a software composition analysis (SCA) tool that detects security vulnerabilities in your codebase introduced by open source dependencies.

Semgrep Code and Semgrep Supply Chain are free for [small teams](https://semgrep.dev/pricing).

## Language maturity summary

The following table lists all **Generally available (GA)** and **Beta** languages for Semgrep Code and Semgrep Supply Chain.

Languages are arranged by feature completeness from most to least. **Cross-file (interfile)** analysis for Semgrep Code and **reachability** analysis for Semgrep Supply Chain are the most advanced analyses that Semgrep provides; see [Feature definitions](#feature-definitions) for more details.

<SupportedLanguagesTable />

### Feature definitions

<details>
<summary>Cross-file dataflow analysis</summary>

<DefCrossFile />

Languages with cross-file support also include cross-function support.

</details>

<details>
<summary>Cross-function dataflow analysis</summary>
<DefCrossFunction />
</details>

<details>
<summary>Reachability analysis</summary>
<DefReachability />

</details>

:::tip
See [Language maturity levels](#language-maturity-levels) to learn which features define GA or beta language support.
:::

## Semgrep Supply Chain feature maturity

<SscIntro/>

For projects with lockfiles, Semgrep parses lockfiles for dependencies, then scans your codebase for reachable findings based on the lockfiles. For a lockfile to be scanned by Semgrep Supply Chain, it must have one of the supported lockfile names.

For some languages, such as JavaScript and Python, a lockfile or manifest file is parsed to determine [transitivity](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency). For more information on transitivity, see [Transitive dependencies and reachability analysis](/docs/semgrep-supply-chain/overview/#transitive-dependencies-and-reachability-analysis).

Additionally, Semgrep offers beta support for the scanning of Java projects **without lockfiles** if they're built using Maven or Gradle with the help of the Gradle Wrapper.

<div class="language-support-table">

<table>
<thead><tr>
    <th>Language</th>
    <th>Supported package managers</th>
    <th>Manifest file or lockfile</th>
    <th><a href="#reachability-support-level">Reachability</a></th>
    <th>License detection support</th>
    <th><a href="#rule-coverage-support-level">Reachability rule coverage for CVEs/GHSAs</a></th>
</tr></thead>
<tbody>
<tr>
   <td>C#</td>
   <td>NuGet</td>
   <td><code>packages.lock.json</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td style={{"text-align": "center"}}>GA</td>
</tr>
<tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.mod</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td style={{"text-align": "center"}}>GA</td>
  </tr>
<tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td rowspan="2" style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
  </tr>
  <tr>
   <td rowspan="3">JavaScript or TypeScript</td>
   <td>npm (Node.js)</td>
   <td><code>package-lock.json</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td rowspan="3" style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>Yarn, Yarn 2, Yarn 3</td>
   <td><code>yarn.lock</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
  </tr>
  <tr>
   <td>pnpm</td>
   <td><code>pnpm-lock.yaml</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
  </tr>
  <tr>
   <td rowspan="2">Kotlin</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td rowspan="2" style={{"text-align": "center"}}>GA</td>
</tr>
<tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
</tr>
  <tr>
   <td rowspan="4">Python</td>
   <td>pip</td>
   <td rowspan="2">Any of the following: <ul><li>`*requirement*.txt` or `*requirement*.pip`</li><li>Any manifest file in a requirements folder, such as `**/requirements/*.txt` or `**/requirements/*.pip`</li></ul> The file must be generated automatically and have values set to exact versions (pinned dependencies).</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td rowspan="4">(PyPI only)</td>
   <td rowspan="4" style={{"text-align": "center"}}>GA</td>
  </tr>
  <tr>
   <td>pip-tools</td>
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
   <td>✅</td>
   <td style={{"text-align": "center"}}>GA</td>
  </tr>
<tr>
   <td>Scala</td>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
   <td style={{"text-align": "center"}}>GA</td>
</tr>
<tr>
   <td>Swift</td>
   <td>SwiftPM</td>
   <td><code>Package.swift</code> file and Swift-generated <code>Package.resolved</code> file. (See <a href="https://www.swift.org/documentation/package-manager/">Swift documentation </a> for instructions.)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅<strong>†</strong></td>
   <td style={{"text-align": "center"}}>GA</td>
</tr>
  <tr>
   <td>Rust</td>
   <td>Cargo*</td>
   <td><code>cargo.lock</code></td>
   <td style={{"text-align": "center"}}>--</td>
   <td>✅</td>
   <td rowspan="4">Not applicable due to reachability support level</td>
</tr>
<tr>
   <td>Dart</td>
   <td>Pub</td>
   <td><code>pubspec.lock</code></td>
   <td style={{"text-align": "center"}}>--</td>
   <td>--</td>
</tr>
<tr>
   <td>Elixir</td>
   <td>Hex</td>
   <td><code>mix.lock</code></td>
   <td style={{"text-align": "center"}}>--</td>
   <td>--</td>
</tr>
<tr>
   <td>PHP</td>
   <td>Composer</td>
   <td><code>composer.lock</code></td>
   <td style={{"text-align": "center"}}>--</td>
   <td>--</td>
</tr>
  </tbody>
</table>
</div>
_<strong>*</strong>Supply Chain does not analyze the transitivity of packages for these language and manifest file or lockfile combinations. All dependencies are listed as **No Reachability Analysis.**_<br />
_<strong>†</strong>License detection for new packages is asynchronous and processed after the initial scan. Policies aren't applied on first detection, but are enforced in subsequent scans._

#### Reachability support level

Reachability support level refers to the level of support for reachability analysis for the language.

- GA coverage means that Semgrep provides full reachability analysis for that language.
- Beta coverage means that Semgrep Supply Chain compares a package's version against a list of versions with known vulnerabilities.

#### Rule coverage support level

**GA** coverage means that Semgrep provides coverage and rules for the following:

- 80% of all **critical** severity CVEs since **2017**
- 100% of **critical** and **high** severity CVEs since **May 2022**

## Language maturity levels

### Semgrep Code

Semgrep Code languages can be classified into four maturity levels:

* Generally available (GA)
* Beta
* Experimental
* Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of **Experimental** languages. Users can still access community rules or write their own rules.

<details>
<summary>Click to view table of definitions.</summary>

<LanguageMaturityCode />

</details>

### Semgrep Supply Chain

Semgrep Supply Chain has two language maturity levels:

* Generally available
* Beta


<details>
<summary>Click to view table of definitions.</summary>

<table>
  <tr>
   <td><strong>Feature</strong></td>
   <td><strong>Generally available</strong></td>
   <td><strong>Beta</strong></td>
  </tr>
  <tr>
   <td>Number of reachability rules</td>
   <td>10+</td>
   <td>No required number</td>
  </tr>
  <tr>
   <td>Semgrep, Inc. rule-writing support</td>
   <td>Quickly release new rules for all critical and high vulnerabilities based on the latest <a href="https://nvd.nist.gov/vuln">security advisories</a>.</td>
   <td>No commitment for new rules based on the latest security advisories.</td>
  </tr>
  <tr>
   <td>Semgrep CE <a href='/supported-languages#semgrep-oss-language-support'>language support</a></td>
   <td>Semgrep CE support is GA.</td>
   <td>Semgrep CE support is at least Beta.</td>
  </tr>
</table>

</details>

### Feature and product maturity levels

The detailed specifications previously provided apply only to language support. Language maturity levels differ from feature and product maturity levels.

## More information

Visit the cheat sheet generation script and associated semgrep-core test files to learn more about each feature:
* [Generation script](https://github.com/semgrep/semgrep/blob/develop/scripts/generate_cheatsheet.py)
* [`semgrep-core` test files](https://github.com/semgrep/semgrep/tree/develop/tests)

To see the **parse rates** for each language, visit the Semgrep [public language dashboard](https://dashboard.semgrep.dev/).

<!-- coupling: If you modify the features in the levels below, change also
     /semgrep/blob/develop/tests/Test.ml and its maturity level regression testing code.
-->
