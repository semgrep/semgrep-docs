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

import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import AdmonitionSotCves from "/src/components/reference/_admonition-sot-cves.md"



# Supported languages

This document provides information about supported languages and language maturity definitions for the following products:

* Semgrep Code
* Semgrep OSS
* Semgrep Supply Chain

## Semgrep Code and OSS: Overview

Semgrep OSS is a fast, lightweight program analysis tool that can help you detect security issues in your code. It makes use of Semgrep's LGPL 2.1 open source engine. These languages are supported by the Semgrep community, at best effort.
 

Semgrep Code is a static application security testing (SAST) solution that makes use of proprietary Semgrep analyses, such as cross-file (interfile) and cross-function (intrafile) data flow, in addition to Semgrep OSS. This results in a [higher true positive rate than Semgrep OSS](/semgrep-code/java). Semgrep Code provides the highest quality support by the Semgrep team: reported issues are resolved promptly.	

Use either tool to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

### Semgrep Code and Semgrep OSS: Language support

Semgrep Code supports over 30 languages and counting! 🚀

<table>
    <thead><tr>
        <td><strong>Languages</strong></td>
        <td><strong>🚀 Semgrep Code:</strong> <a href="https://semgrep.dev/pricing">Free for small teams</a></td>
        <td><strong>🌱 Semgrep OSS  </strong></td>
    </tr></thead>
    <tbody>
    <tr>
      <td>C / C++</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-file dataflow analysis<br />
         • 150+ Pro rules </td>
      <td> Community Supported <br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>C#</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-file dataflow analysis<br />
         • Supports up to C# 13 (latest)<br />
         • 40+ Pro rules </td>
      <td>Community Supported <br />
         • Limited to single-function analysis<br />
         • Only supports up to C# 4.0 ⚠️ <br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Go</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-file dataflow analysis<br />
         • 60+ Pro rules </td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Java</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 160+ Pro rules </td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Javascript</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 70+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Kotlin</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-file dataflow analysis<br />
         • 60+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>[Python](/docs/semgrep-code/supported-languages-python)</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 300+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Typescript</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-file dataflow analysis<br />
         • Framework-specific control flow analysis<br />
         • 70+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Ruby</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • 20+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
     <tr>
      <td>Rust</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • 40+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>JSX</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • 70+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules</td>
    </tr>
    <tr>
      <td>PHP</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • 20+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
     <tr>
      <td>Scala</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • Community rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Swift</td>
      <td><strong>✅ Generally Available </strong><br />
         • Cross-function dataflow analysis<br />
         • 50+ Pro rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules </td>
    </tr>
    <tr>
      <td>Terraform</td>
      <td><strong>✅ Generally Available</strong><br />
         • Cross-function dataflow analysis<br />
         • Community rules</td>
      <td>Community Supported<br />
         • Limited to single-function analysis<br />
         • Community rules</td>
    </tr>
    <tr>
      <td>Generic</td>
      <td><strong>✅ Generally Available </strong></td>
      <td>Community Supported</td>
    </tr>
    <tr>
      <td>JSON</td>
      <td><strong>✅ Generally Available </strong></td>
      <td>Community Supported</td>
    </tr>
    <tr>
      <td>APEX</td>
      <td><strong>Beta</strong></td>
      <td>Not Available</td>
    </tr>
    <tr>
      <td>Elixir</td>
      <td><strong>Beta</strong></td>
      <td>Not Available</td>
    </tr>
   </tbody>
</table>


<details>
 <summary>Click to view experimental languages.</summary>
- Bash
- Cairo
- Circom
- Clojure
- Dart
- Dockerfile
- Hack
- HTML
- Jsonnet
- Julia
- Lisp
- Lua
- Move on Aptos
- Move on Sui
- Ocaml
- R
- Scheme
- Solidity
- YAML
- XML
</details>




### Language maturity levels
Semgrep Code languages can be classified into four maturity levels:

* Generally available 
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
   <td>✅</td>
   <td rowspan="12">Since May 2022</td>
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
   <td>Swift-generated <code>Package.resolved</code> file. (See <a href="https://www.swift.org/documentation/package-manager/">Swift documentation </a> for instructions.)</td>
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