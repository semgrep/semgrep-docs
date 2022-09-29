---
slug: supply-chain-supported-languages 
append_help_link: true
description: ""
tags:
    - Semgrep Supply Chain 
    - Team & Enterprise Tier
title: Supported languages 
hide_title: true
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Semgrep Supply Chain supported languages

:::info
This document provides information about supported languages in Semgrep Supply Chain. For supported languages in **Semgrep**, see [Supported Languages](/supported-languages).
:::

Detect recently discovered [security vulnerabilities](https://nvd.nist.gov/vuln/full-listing) in your codebase's open-source dependencies using Semgrep Supply Chain. Leverage Semgrep's code-scanning capabilities to run high-signal rules that determine a vulnerability's [reachability](https://docs.google.com/document/d/1u8J9klICqDr7NS0x-_nf2paROEOL3XRc9nRkG8Pchs8/edit). Semgrep Supply Chain evaluates dependencies based on their version and use in your codebase.

Semgrep Supply Chain parses **lockfiles** for dependencies, then scans your codebase for reachable findings based on the lockfiles. Some languages, such as Java, have several lockfiles, depending on your repository's package manager. For some languages, such as Javascript and Python, a manifest file is also parsed.

The following table lists lockfiles, their package manager and language, and their support levels.


## General Availability

<table>
<thead><tr>
    <th>Language</th>
    <th>Supported package managers</th>
    <th>Lockfile</th>
</tr></thead>
<tbody><tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.sum</code></td>
  </tr>
  <tr>
   <td rowspan="2">Javascript / Typescript</td>
   <td>npm</td>
   <td><code>package-lock.json</code></td>
  </tr>
  <tr>
   <td>Yarn</td>
   <td><code>yarn.lock</code></td>
  </tr>
  <tr>
   <td rowspan="2">Python</td>
   <td>pip</td>
   <td><code>Pipfile.lock</code></td>
  </tr>
  <tr>
   <td>Poetry</td>
   <td><code>poetry.lock</code></td>
  </tr>
  <tr>
   <td>Ruby</td>
   <td>RubyGems</td>
   <td><code>Gemfile.lock</code></td>
  </tr></tbody>
</table>

## Beta

<table>
  <thead><tr>
   <th>Language</th>
   <th>Supported package managers</th>
   <th>Lockfile</th>
  </tr></thead>
  <tbody><tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
  </tr>
  <tr>
   <td>Maven (single-file configurations)</td>
   <td><code>pom.xml</code>*</td>
  </tr></tbody>
</table>


_* `pom.xml` is not a lockfile, however Semgrep Supply Chain parses `pom.xml` as the source of truth for dependencies in Maven projects in conjunction with `MANIFEST.mf`._


## Maturity levels

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
   <td>Rule count
   </td>
   <td>10+
   </td>
   <td>1+
   </td>
  </tr>
  <tr>
   <td>r2c rule-writing support
   </td>
   <td>Quickly release new rules for all critical and high vulnerabilities based on the latest <a href="https://nvd.nist.gov/vuln">security advisories</a>.
   </td>
   <td>No commitment for new rules based on the latest security advisories.
   </td>
  </tr>
  <tr>
   <td>Semgrep SAST language support
   </td>
   <td>Semgrep SAST support is GA.
   </td>
   <td>Semgrep SAST support is at least Beta.
   </td>
  </tr>
</table>
