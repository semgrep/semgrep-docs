---
slug: supported-languages-oss
append_help_link: true
description: >-
  Semgrep supports more than two dozen languages. Learn about generally available, beta, and experimentally supported languages.
hide_title: true
title: Supported languages
tags:
    - Semgrep Supply Chain 
    - Semgrep OSS Engine
    - Team & Enterprise Tier
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
* Semgrep OSS

For commercial Semgrep offerings, check the [Semgrep Pro > Supported languages](/supported-languages) page.

## Semgrep Code and OSS

Semgrep OSS is a fast, lightweight program analysis tool that can help you detect security issues in your code. It makes use of Semgrep's LGPL 2.1 open-source engine.

Semgrep Code is a static application security testing SAST solution that uses both Semgrep OSS Engine and a proprietary Semgrep Pro engine. This engine can perform more complex code analyses, resulting in a higher true positive rate than Semgrep OSS. 

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

<<<<<<< HEAD
**All Semgrep OSS languages are community supported.** Community supported languages meet the parse rate and syntax requirements of experimental languages in Semgrep Code. Semgrep OSS uses Semgrep's open source engine.

Community supported languages have varying levels of rule coverage - check the registry and filter out Pro rules to see the level of coverage for OSS.

<details><summary>Click to view <strong>Semgrep OSS</strong> languages.</summary>

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
- Ocaml      
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

<MoreHelp />
