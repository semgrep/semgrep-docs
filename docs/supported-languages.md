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

import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"

# Supported languages

This document provides information about supported languages and language maturity definitions for the following products:

* Semgrep Code
* Semgrep OSS
* Semgrep Supply Chain

## Semgrep Code and OSS

Semgrep OSS is a fast, lightweight program analysis tool that can help you detect security issues in your code. It makes use of Semgrep's LGPL 2.1 open source engine.

Semgrep Code is a static application security testing (SAST) solution that makes use of proprietary Semgrep analyses, such as cross-file (interfile) and cross-function (intrafile) data flow, in addition to Semgrep OSS. This results in a [higher true positive rate than Semgrep OSS](/semgrep-code/java).

Use either tool to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

| Product | Analysis |
| -------   | ------ |
| [<i class="fas fa-external-link fa-xs"></i> Semgrep OSS](https://github.com/semgrep/semgrep) |<ul><li>Single-function analysis</li><li>Single-file analysis</li></ul> |
| Semgrep Code  |<ul><li>All analyses in the OSS Engine</li><li>Cross-file (interfile) analysis</li><li>Cross-function (interprocedural) analysis</li></ul>   |

### Language maturity levels
Semgrep Code languages can be classified into four maturity levels:

* Generally available (GA)
* Beta
* Experimental
* Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of **Experimental** languages. Users can still access community rules or write their own rules.

Their differences are outlined in the following table:

<table>
    <thead><tr>
        <td><strong>Feature</strong></td>
        <td><strong>GA</strong></td>
        <td><strong>Beta</strong></td>
        <td><strong>Experimental</strong></td>
        <td><strong>Community supported</strong></td>
    </tr></thead>
    <tbody>
    <tr>
        <td>Parse Rate</td>
        <td>99%+</td>
        <td>95%+</td>
        <td colspan="2">90%+</td>
    </tr>
    <tr>
        <td>Number of rules</td>
        <td>10+</td>
        <td>5+</td>
        <td colspan="2">0+. Query the <a href="https://semgrep.dev/r">Registry</a> to see if any rules exist for your language.</td>
    </tr>
    <tr>
        <td>Semgrep syntax</td>
        <td>Regex, equivalence, deep expression operators, types and typing. All features supported in Beta.</td>
        <td>Complete metavariable support, metavariable equality. All features supported in Experimental.</td>
        <td colspan="2">Syntax, ellipsis operator, basic metavariable functionality.</td>
    </tr>
    <tr>
        <td>Support</td>
        <td>Highest quality support by the Semgrep team. Reported issues are resolved promptly.</td>
        <td>Supported by the Semgrep team. Reported issues are fixed after GA languages.</td>
        <td>There are limitations to this language's functionality. Reported issues are tracked and prioritized with best effort.</td>
        <td>These languages are supported by the Semgrep community. While Semgrep may develop rules or engine updates for these languages, they are not prioritized.</td>
    </tr>
    </tbody>
</table>

### Semgrep Code language support

Semgrep Code supports over 30 languages and counting! 🚀

<SupportedLanguagesTable />


### Semgrep OSS language support

**All Semgrep OSS languages are community supported.** Community supported languages must meet the parse rate and syntax requirements of **experimental** support in Semgrep Code to be listed here. Semgrep OSS uses Semgrep's open source engine.

Community supported languages have varying levels of rule coverage - view the registry and filter out Pro rules to see the level of coverage for OSS.

<details>
 <summary>Click to view <strong>Semgrep OSS</strong> languages.</summary>

- Bash
- C
- C++
- C#
- Cairo
- Clojure
- Dart
- Dockerfile
- Generic
- Go
- Hack
- HTML
- Java
- JavaScript
- JSON
- Jsonnet
- Julia
- Lisp
- Lua
- Kotlin
- Ruby
- Rust
- JSX
- OCaml
- PHP
- Python
- R
- Scala
- Scheme
- Solidity
- Swift
- TypeScript
- YAML
- XML

</details>

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

Semgrep Supply Chain parses **lockfiles** for dependencies, then scans your codebase for reachable findings based on the lockfiles. Some languages, such as Java, have several supported lockfiles, depending on your repository's package manager. For a lockfile to be scanned by Semgrep Supply Chain, it must have one of the supported lockfile names.

For some languages, such as JavaScript and Python, a manifest file is also parsed to determine [transitivity](/docs/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency).

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
   <td>✅</td>
   <td rowspan="12">80% of all critical severity CVEs since 2017 and 100% of critical and high severity CVEs since May 2022</td>
</tr>
<tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.mod</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
  </tr>
<tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
   <td style={{"text-align": "center"}}>GA</td>
   <td>✅</td>
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
   <td rowspan="4">Python</td>
   <td>pip</td>
   <td><code>requirements.txt</code>†† (generated by <code>pip freeze</code> for example)</td>
   <td style={{"text-align": "center"}}>GA</td>
   <td rowspan="4">✅ (PyPI packages only)</td>
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
   <td>✅</td>
  </tr>
  <tr>
   <td>Rust</td>
   <td>Cargo§</td>
   <td><code>cargo.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>✅</td>
   <td rowspan="7">Not applicable due to reachability support level</td>
</tr>
<tr>
   <td>Dart</td>
   <td>Pub</td>
   <td><code>pubspec.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
   <td>Elixir</td>
   <td>Hex</td>
   <td><code>mix.lock</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
   <td rowspan="2">Kotlin</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile§</code></td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
<tr>
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
<tr>
   <td>Swift</td>
   <td>SwiftPM</td>
   <td><code>Package.swift</code> file and Swift-generated <code>Package.resolved</code> file. (See <a href="https://www.swift.org/documentation/package-manager/">Swift documentation </a> for instructions.)</td>
   <td style={{"text-align": "center"}}>Lockfile-only</td>
   <td>--</td>
</tr>
  </tbody>
</table>

_*Semgrep Supply Chain scans transitive dependencies for **all supported languages** but does **not** perform reachability analysis on transitive dependencies._ <br />
_**‡Reachability support level** refers to the level of support for reachability analysis for the language. At the minimum, Semgrep Supply Chain uses **lockfile-only** rules, which compare a package's version against versions with known vulnerabilities._ <br />
_**††**Semgrep Supply Chain supports `requirements.txt` when it is used as a **lockfile**. This means that `requirements.txt` must be set to exact versions (pinned dependencies) and the file must be generated automatically._ <br />
_**§** Supply Chain does not analyze the transitivity of packages for these language or lockfile combinations. All dependencies are listed as **Unknown** transitivity._

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
   <td><strong>Feature</strong></td>
   <td><strong>GA</strong></td>
   <td><strong>Beta</strong></td>
  </tr>
  <tr>
   <td>Number of reachability rules</td>
   <td>10+</td>
   <td>1+</td>
  </tr>
  <tr>
   <td>Semgrep, Inc. rule-writing support</td>
   <td>Quickly release new rules for all critical and high vulnerabilities based on the latest <a href="https://nvd.nist.gov/vuln">security advisories</a>.</td>
   <td>No commitment for new rules based on the latest security advisories.</td>
  </tr>
  <tr>
   <td>Semgrep OSS Engine <a href='/supported-languages#semgrep-oss-language-support'>language support</a></td>
   <td>Semgrep OSS Engine support is GA.</td>
   <td>Semgrep OSS Engine support is at least Beta.</td>
  </tr>
</table>

:::info Feature and product maturity levels
* The detailed specifications previously provided apply only to language support. Language maturity levels differ from feature and product maturity levels.
* Semgrep features and products documented as experimental, beta, or GA generally follow the definitions in a [Software release life cycle](https://en.wikipedia.org/wiki/Software_release_life_cycle).
:::
