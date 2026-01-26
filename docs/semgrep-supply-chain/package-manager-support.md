---
slug: sca-package-manager-support
append_help_link: true
title: Package manager support
hide_title: true
description: Supported package managers and lockfiles for Semgrep Supply Chain
    scans.
tags:
  - Semgrep Supply Chain
---

# Package manager support

Semgrep Supply Chain (SCA) scans dependencies by parsing manifest files or
lockfiles. This page lists the supported package managers and file types.

For language-level coverage and feature maturity, see
[Supported languages](/supported-languages).

For some languages, a lockfile or manifest file is parsed to determine
[transitivity](/semgrep-supply-chain/glossary/#transitive-or-indirect-dependency).
See
[Transitive dependencies and reachability analysis](/semgrep-supply-chain/overview/#transitive-dependencies-and-reachability-analysis)
for more information.

## Package manager support

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
