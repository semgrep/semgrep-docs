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

## Semgrep

[Intro TODO]

### Language maturity

<SupportedLanguagesTable />

### Maturity definitions

Language maturity is determined by 3 factors in the Semgrep ecosystem:

1. **Parse rate** - how well Semgrep can parse code in a given language.
1. **Feature support** - what [Semgrep features](writing-rules/pattern-syntax.mdx) are implemented for a given language.
1. **Ruleset count** - number of [Semgrep rule groupings](https://semgrep.dev/explore) in the cloud app.

There are 3 levels of maturity: **experimental**, **beta**, and **generally available (GA)**. Each of these maturity levels are combined with a threshold of the factors above. When a language meets the maturity threshold for each of the factors then it’s moved into that maturity level.

Generally speaking, the features-by-maturity level are roughly: **experimental)** syntax support, ellipsis operator support, and basic metavariable support, **beta)** everything prior and nearly complete metavariable support and metavariable equality, **GA)** everything prior and all advanced features like regexp, equivalence, deep expression operator, typing, etc.

The following thresholds define each maturity level:

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
        * All in experimental
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
        * All in experimental
        * All in beta
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

* [generation script](https://github.com/returntocorp/semgrep/blob/develop/scripts/generate_cheatsheet.py)
* [semgrep-core test files](https://github.com/returntocorp/semgrep/tree/develop/semgrep-core/tests)

### Language parse rates

See [parse rates by language](https://dashboard.semgrep.dev/).

## Semgrep Supply Chain

<SscIntro/>

Semgrep Supply Chain parses **lockfiles** for dependencies, then scans your codebase for reachable findings based on the lockfiles. Some languages, such as Java, have several lockfiles, depending on your repository's package manager. For some languages, such as Javascript and Python, a manifest file is also parsed.

The following tables list lockfiles, their package manager and language, and their support levels.

### General Availability

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

### Beta

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
   <td>Semgrep engine language support
   </td>
   <td>Semgrep engine support is GA.
   </td>
   <td>Semgrep engine support is at least Beta.
   </td>
  </tr>
</table>
<MoreHelp />
