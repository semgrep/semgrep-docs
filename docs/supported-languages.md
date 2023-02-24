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

* Semgrep OSS Engine
* Semgrep Supply Chain
* Semgrep Pro Engine

## Semgrep OSS Engine

Semgrep OSS Engine offers a fast static analysis solution for finding bugs and enforcing code standards.

### Language maturity

<SupportedLanguagesTable />

### Maturity definitions

#### Language maturity factors

Language maturity is determined by 3 factors in the Semgrep ecosystem:

<dl>
    <dt>Parse rate</dt>
    <dd>How well Semgrep OSS Engine can parse code in a given language.</dd>
    <dt>Feature support</dt>
    <dd>What <a href='/writing-rules/pattern-syntax/'>Semgrep features</a> are implemented for a given language.</dd>
    <dt>Ruleset count</dt>
    <dd>Number of <a href='https://semgrep.dev/explore/'>Semgrep rule groupings</a> in Semgrep Registry.</dd>
</dl>

#### Levels of maturity

Semgrep OSS Engine defines 3 maturity levels: 

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
     /semgrep/blob/develop/tests/Test.ml and its maturity level regression testing code.
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
* [`semgrep-core` test files](https://github.com/returntocorp/semgrep/tree/develop/tests)

:::info Feature and product maturity levels
* The detailed specifications given above apply only to language support. Language maturity levels differ from feature and product maturity levels.
* Semgrep features and products documented as experimental, beta, or GA generally follow the definitions in a [Software release life cycle](https://en.wikipedia.org/wiki/Software_release_life_cycle).
:::

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
    <th>Scans transitive dependencies*</th>
    <th>Identifies transitive dependencies†</th>
    <th>Rule coverage for CVEs/GHSAs‡</th>
</tr></thead>
<tbody><tr>
   <td>Go</td>
   <td>Go modules (<code>go mod</code>)</td>
   <td><code>go.sum</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>❌ No</td>
   <td>May 2022</td>
  </tr>
  <tr>
   <td rowspan="2">JavaScript / TypeScript</td>
   <td>npm (Node.js)</td>
   <td><code>package-lock.json</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td rowspan="2">May 2022</td>
  </tr>
  <tr>
   <td>Yarn, Yarn 2, Yarn 3</td>
   <td><code>yarn.lock</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
  </tr>
  <tr>
   <td rowspan="3">Python</td>
   <td rowspan="2">pip</td>
   <td><code>Pipfile.lock</code> (generated by <code>pipenv</code>)</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td rowspan="3">May 2022</td>
  </tr>
  <tr>
   <td><code>requirements.txt</code>†† (generated by <code>pip-tools</code>, <code>pipreqs</code>, and so on).</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
  </tr>
  <tr>
   <td>Poetry</td>
   <td><code>poetry.lock</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
  </tr>
  <tr>
   <td>Ruby</td>
   <td>RubyGems</td>
   <td><code>Gemfile.lock</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td>May 2022</td>
  </tr>
<tr rowspan="2">
   <td rowspan="2">Java</td>
   <td>Gradle</td>
   <td><code>gradle.lockfile</code></td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td rowspan="2">May 2022</td>
  </tr>
  <tr>
   <td>Maven</td>
   <td>Maven-generated dependency tree (See <a href="/docs/semgrep-sc/scanning-open-source-dependencies/#apache-maven-java">Setting up SSC scans for Apache Maven</a> for instructions.)</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
   <td style={{"text-align": "center"}}>✔️ Yes</td>
  </tr></tbody>
</table>

_*****Semgrep Supply Chain scans transitive dependencies but does **not** perform reachability analysis on them._ <br />
_**†**Refers to functionality in Semgrep Cloud Platform to indicate through a badge if a package is a transitive or direct dependency. This does not affect reachability analysis for any language._<br />
_**‡**The month and year that Semgrep Supply Chain has begun writing rules to detect vulnerabilities listed in GHSA and the CVE program._<br />
_**††**Semgrep Supply Chain supports `requirements.txt` when it is used as a **lockfile**. This means that `requirements.txt` must be set to exact versions (pinned dependencies) and the file must be generated automatically._


:::info Transitivity support

For more information on transitivity, see [Transitive dependencies and reachability analysis](/docs/semgrep-sc/semgrep-supply-chain-overview/#transitive-dependencies-and-reachability-analysis).
:::

### Beta

Semgrep Supply Chain has no languages in Beta status.

<!-- This table provides information about the beta level of support for languages, specific package managers, and their lockfiles in Semgrep Supply Chain -->

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
   <td>Semgrep OSS Engine <a href='/docs/supported-languages#semgrep-oss-engine'>language support</a>
   </td>
   <td>Semgrep OSS Engine support is GA.
   </td>
   <td>Semgrep OSS Engine support is at least Beta.
   </td>
  </tr>
</table>

## Semgrep Pro Engine

<DeepSemgrepIntroduction />

Semgrep Pro Engine offers support for the following languages:

|  Language   |  Analysis type  | Support level |
|-------------|-----------------|---------------|
| Apex        | Interprocedural | Experimental  |
| Java        |    Interfile    |     Beta      |
| JavaScript  |    Interfile    |     Beta      |
| TypeScript  |    Interfile    |     Beta      |

To install and run Semgrep Pro Engine, see [Semgrep Pro Engine overview](/deepsemgrep/deepsemgrep-introduction/).

<MoreHelp />
