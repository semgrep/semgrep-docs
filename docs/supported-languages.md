---
slug: supported-languages
id: supported-languages
append_help_link: true
description: >-
  Semgrep supports more than two dozen languages. Learn about generally available, beta, and experimentally supported languages.
hide_title: true
tags:
    - Semgrep Supply Chain 
    - Semgrep
    - Community Tier
    - Team & Enterprise Tier
title: Supported languages
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import SscIntro from "/src/components/concept/_ssc-intro.md"
import MoreHelp from "/src/components/MoreHelp"
import DeepSemgrepIntroduction from "/src/components/concept/_deepsemgrep-introduction.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Supported languages

This document provides information about supported languages and language maturity definitions for the following products:

* Semgrep
* Semgrep Supply Chain
* DeepSemgrep

## Semgrep

Semgrep is a fast, open source, static analysis engine for finding bugs and enforcing code standards.

### Language maturity

<SupportedLanguagesTable />

### Maturity definitions

#### Language maturity factors
Language maturity is determined by 3 factors in the Semgrep ecosystem:

<dl>
    <dt>Parse rate</dt>
    <dd>How well Semgrep can parse code in a given language.</dd>
    <dt>Feature support</dt>
    <dd>What <a href='/writing-rules/pattern-syntax/'>Semgrep features</a> are implemented for a given language.</dd>
    <dt>Ruleset count</dt>
    <dd>Number of <a href='https://semgrep.dev/explore/'>Semgrep rule groupings</a> in Semgrep Registry.</dd>
</dl>

#### Levels of maturity

Semgrep defines 3 maturity levels: 

<dl>
<dt>Experimental</dt>
<dd>Experimental languages support the following:
<ul>
    <li>Syntax</li>
    <li>Ellipsis operator</li>
    <li>Basic metavariable functionality</li>
</ul>
</dd>
<dt>Beta</dt>
<dd>Beta languages support the following:
<ul>
    <li>All features supported in Experimental</li>
    <li>Complete metavariable support</li>
    <li>Metavariable equality</li>
</ul>
</dd>
<dt>Generally available</dt>
<dd>Generally available languages support all advanced features such as the following:
<ul>
<li>All features supported in Beta</li>
<li>Regexp</li>
<li>Equivalence</li>
<li>Deep expression operator</li>
<li>Types and typing</li>
</ul>
</dd>
</dl>

Each of these maturity levels are combined with a threshold of the [language maturity factors](#language-maturity-factors). When a language meets the maturity threshold for each of the factors, it’s moved into that maturity level.

The following **thresholds** define each maturity level:

<!-- coupling: If you modify the features in the levels below, change also 
     semgrep-core/tests/Test.ml and its maturity level regression testing code.
-->

* **Experimental**
    * Parse rate: 90%+
    * Rules: 0+
    * Features:
        * `concrete_syntax`
        * `deep_exprstmt`
        * `dots_args`
        * `dots_nested_stmts`
        * `dots_stmts`
        * `dots_string`
        * `metavar_arg`
        * `metavar_call`
        * `metavar_equality_var`
* **Beta**
    * Parse rate: 99%+
    * Rules: 5+
    * Features:
        * All items in Experimental
        * `metavar_class_def`
        * `metavar_func_def`
        * `metavar_cond`
        * `metavar_equality_expr`
        * `metavar_equality_stmt`
        * `metavar_import`
        * `metavar_stmt`
* **Generally Available (GA)**
    * Parse rate: 99.9%+
    * Rules: 10+
    * Features:
        * All items in Beta
        * `deep_expr_operator`
        * `dots_method_chaining`
        * `equivalence_constant_propagation`
        * `equivalence_naming_import` (language dependent)
        * `metavar_anno` (language dependent)
        * `metavar_key_value`
        * `metavar_typed` (language dependent)
        * `metavar_ellipsis_args`
        * `regexp_string`

Visit the cheat sheet generation script and associated semgrep-core test files to learn more about each feature:

* [Generation script](https://github.com/returntocorp/semgrep/blob/develop/scripts/generate_cheatsheet.py)
* [`semgrep-core` test files](https://github.com/returntocorp/semgrep/tree/develop/semgrep-core/tests)

### Language parse rates

See [Parse rates by language](https://dashboard.semgrep.dev/).

## Semgrep Supply Chain

<SscIntro/>

Semgrep Supply Chain parses **lockfiles** for dependencies, then scans your codebase for reachable findings based on the lockfiles. Some languages, such as Java, have several lockfiles, depending on your repository's package manager. For some languages, such as JavaScript and Python, a manifest file is also parsed.

### General Availability

This table provides information about fully supported (generally available or GA) languages, specific package managers, and their lockfiles in Semgrep Supply Chain:

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
   <td rowspan="2">JavaScript / TypeScript</td>
   <td>npm (Node.js)</td>
   <td><code>package-lock.json</code></td>
  </tr>
  <tr>
   <td>Yarn, Yarn 2, Yarn 3</td>
   <td><code>yarn.lock</code></td>
  </tr>
  <tr>
   <td rowspan="3">Python</td>
   <td rowspan="2">pip</td>
   <td><code>Pipfile.lock</code> (generated by <code>pipenv</code>)</td>
  </tr>
  <tr>
   <td><code>requirements.txt</code>*, <code>requirements.in</code> (generated by <code>pip-tools</code>, <code>pipreqs</code>, and so on).</td>
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

_* Semgrep Supply Chain supports `requirements.txt` when it is used as a **lockfile**. This means that `requirements.txt` must be set to exact versions (pinned dependencies) and the file is generated automatically._

### Beta

This table provides information about the beta level of support for languages, specific package managers, and their lockfiles in Semgrep Supply Chain:

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
   <td>Number of rules
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
   <td>Semgrep engine <a href='/docs/supported-languages#semgrep'>language support</a>
   </td>
   <td>Semgrep engine support is GA.
   </td>
   <td>Semgrep engine support is at least Beta.
   </td>
  </tr>
</table>

## DeepSemgrep

<DeepSemgrepIntroduction />

### Alpha support

DeepSemgrep offers **beta** support for the following languages:
- **Java**
- **JavaScript**
- **TypeScript**

<MoreHelp />
