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

This document provides information about supported languages and language maturity definitions for Semgrep Code.

## Semgrep Code 

Semgrep Code is a static application security testing (SAST) tool that detects security issues and helps enforce coding standards in your first-party code.

Use Semgrep Code to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

You can choose between two different engines to scan with:

<!-- 

Secure your code quickly and continuously by scanning with Semgrep Code, a SAST (Static Application Security Testing) product, powered by Semgrep OSS Engine and Semgrep Pro Engine. The Semgrep OSS Engine is the foundation of Semgrep, it's our [open-source engine](https://github.com/semgrep/semgrep), designed for fast code analysis. The Semgrep Pro Engine is designed for advanced code analysis, designed to catch complex vulnerabilities and reduce false positives. Use Semgrep Code to quickly find and fix vulnerabilities in your code base. 

-->

| Engine | Description | Analysis | Language support |
| -------  | ------ | ------ | ------ |
| [<i class="fas fa-external-link fa-xs"></i> OSS Engine](https://github.com/semgrep/semgrep) | Fast, static analysis engine.  |<ul><li>Single-function analysis</li><li>Single-file analysis</li></ul> | +30 languages |
| Pro Engine | Proprietary static analysis engine that can perform more complex code analyses, resulting in a higher true positive rate than the OSS engine, though scans take longer to complete. |<ul><li>All analyses in the OSS Engine</li><li>Cross-file (interfile) analysis</li><li>Cross-function (interprocedural) analysis</li></ul>      | 10 languages |

### Language maturity

Semgrep Code supports over 30 languages and counting! 🚀 

<SupportedLanguagesTable />

### Maturity levels

#### Language maturity factors

Semgrep Code languages can be classified into four maturity levels:

* Generally available (GA) 
* Beta
* Experimental 
* Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of **Experimental** languages, but ongoing development from Semgrep has stopped. Users can still access community rules or write their own rules.

Their differences are outlined in the following table:

| Feature  | GA | Beta | Experimental
|----------|---------------|------------------| ----- |
| Parse Rate  | 99%+ | 95%+ | 90%+ | 
| Number of rules  | 10+ | 5+ | 0+. Query the [Registry](https://semgrep.dev/r) to see if any rules exist for your language. | 
| Semgrep syntax | Regexp, equivalence, deep expression operators, types and typing. All features supported in Beta. | Complete metavariable support, metavariable equality. All features supported in Experimental. | Syntax, ellipsis operator, basic metavariable functionality.|
| Support | Highest quality support by the Semgrep team. Reported issues are resolved promptly. | Supported by the Semgrep team. Reported issues are fixed after GA languages. | There are limitations to this language's functionality. Reported issues are tracked and prioritized with best effort.|

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
