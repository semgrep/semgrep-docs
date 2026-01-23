---
slug: sca-language-support
append_help_link: true
title: Supported languages
hide_title: true
description: Learn which languages Semgrep Supply Chain supports and the
    features available for each language.
tags:
  - Semgrep Supply Chain
---

import SscIntro from "/src/components/concept/_ssc-intro.md"

# Semgrep Supply Chain supported languages

Semgrep Supply Chain (SCA) supports a broad set of languages, with different
feature coverage across each language.

For Semgrep Code language support, see
[Semgrep Code supported languages](/semgrep-code/code-language-support).

## Language maturity levels

Semgrep Supply Chain has two language maturity levels:

* Generally available
* Beta

::::tip
See [Supported languages](/supported-languages) for the complete, up-to-date list
of supported languages and coverage details.
::::

## Semgrep Supply Chain feature support

<SscIntro/>

For projects with lockfiles, Semgrep parses lockfiles for dependencies, then scans
your codebase for reachable findings based on the lockfiles. For a lockfile to be
scanned by Semgrep Supply Chain, it must have one of the supported lockfile names.

For some languages, a lockfile or manifest file is parsed to determine
[transitivity](/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency).
See
[Transitive dependencies and reachability analysis](/semgrep-supply-chain/overview/#transitive-dependencies-and-reachability-analysis)
for more information.

Additionally, Semgrep offers beta support for the scanning of projects written in
the following languages **without lockfiles**:

- C#
- Java
- Kotlin
- Python
- Ruby

### Package manager support

The following table lists all Semgrep-supported package managers for each language.
Languages with **reachability** support are listed first.

<div class="language-support-table">

<table>
<thead><tr>
    <th>Language</th>
    <th>Supported package managers</th>
    <th>Manifest file or lockfile</th>
</tr></thead>
<tbody>
<tr>
   <td>C#</td>
   <td>NuGet</td>
   <td><code>packages.lock.json</code></td>
</tr>
<tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.mod</code></td>
</tr>
<tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
  </tr>
  <tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
  </tr>
  <tr>
   <td rowspan="3">JavaScript or TypeScript</td>
   <td>npm</td>
   <td><code>package-lock.json</code></td>
  </tr>
  <tr>
   <td>Yarn</td>
   <td><code>yarn.lock</code></td>
  </tr>
  <tr>
   <td>pnpm</td>
   <td><code>pnpm-lock.yaml</code></td>
  </tr>
  <tr>
   <td rowspan="2">Kotlin</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
</tr>
<tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
</tr>
  <tr>
   <td rowspan="5">Python</td>
   <td>pip</td>
   <td rowspan="2">Any of the following: <ul><li>`*requirement*.txt` or `*requirement*.pip`</li><li>Any manifest file in a requirements folder, such as `**/requirements/*.txt` or `**/requirements/*.pip`</li></ul> The file must be generated automatically and have values set to exact versions (pinned dependencies).</td>
  </tr>
  <tr>
   <td>pip-tools</td>
  </tr>
  <tr>
   <td>Pipenv</td>
   <td><code>Pipfile.lock</code></td>
  </tr>
  <tr>
   <td>Poetry</td>
   <td><code>poetry.lock</code></td>
  </tr>
  <tr>
   <td>uv</td>
   <td><code>uv.lock</code></td>
  </tr>
  <tr>
   <td>Ruby</td>
   <td>RubyGems</td>
   <td><code>Gemfile.lock</code></td>
  </tr>
<tr>
   <td>Scala</td>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-supply-chain/setup-maven/">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
</tr>
<tr>
   <td>Swift</td>
   <td>SwiftPM</td>
   <td><code>Package.swift</code> file and Swift-generated <code>Package.resolved</code> file. (See <a href="https://www.swift.org/documentation/package-manager/">Swift documentation </a> for instructions.)</td>
</tr>
  <tr>
   <td>Rust</td>
   <td>Cargo*</td>
   <td><code>cargo.lock</code></td>
</tr>
<tr>
   <td>Dart</td>
   <td>Pub</td>
   <td><code>pubspec.lock</code></td>
</tr>
<tr>
   <td>Elixir</td>
   <td>Hex</td>
   <td><code>mix.lock</code></td>
</tr>
<tr>
   <td>PHP</td>
   <td>Composer</td>
   <td><code>composer.lock</code></td>
</tr>
  </tbody>
</table>
</div>

_<strong>*</strong>Supply Chain does not analyze the transitivity of packages for
these language and manifest file or lockfile combinations. All dependencies are
listed as **No Reachability Analysis.**_<br />

### Feature support

For feature coverage across supported languages, see
[Supply Chain feature support](/semgrep-supply-chain/feature-support).
