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

# Supported languages

The following table lists all **Generally available (GA)** and **Beta** languages for [Semgrep Code (SAST)](/docs/semgrep-code/overview) and [Semgrep Supply Chain (SCA)](/docs/semgrep-supply-chain/overview). Languages are arranged by feature completeness from most to least. 

**Cross-file (interfile)** analysis for Semgrep Code and **reachability** analysis for Semgrep Supply Chain are the most advanced analyses that Semgrep provides. See [Feature definitions](/references/feature-definitions) for more details.

<!-- *************************************************************************
ARE YOU EDITING THE SUPPORTED LANGUAGES IN ANY WAY? ADDING A FEATURE? ETC?

Don't forget to update:
- table at Semgrep CE vs Semgrep
- the individual language's page
- and most importantly, the index!!
*************************************************************************** -->

<SupportedLanguagesTable />


## More information

* Visit the [Language maturity page](/docs/references/language-maturity-levels#semgrep-supply-chain) for definitions of the maturity levels shown on language support pages.
* Visit the [Feature definitions page](/docs/references/feature-definitions) to understand the analysis features referenced in language support pages.

Visit the cheat sheet generation script and associated semgrep-core test files to learn more about each feature:
* [Generation script](https://github.com/semgrep/semgrep/blob/develop/scripts/generate_cheatsheet.py)
* [`semgrep-core` test files](https://github.com/semgrep/semgrep/tree/develop/tests)

<!-- coupling: If you modify the features in the levels below, change also
     /semgrep/blob/develop/tests/Test.ml and its maturity level regression testing code.
-->


<!-- markdown for easy visualization
| Language                 | Reachability | License detection | Malicious dependency detection |
| -------                  | ------       | ------            | ------                         |
| C#                       | ✅           | ✅                | ✅                             |
| Go                       | ✅           | ✅                | ✅                             |
| Java                     | ✅           | ✅                | --                             |
| JavaScript or TypeScript | ✅           | ✅                | ✅                             |
| Kotlin                   | ✅           | ✅                | --                             |
| Python                   | ✅           | ✅ For PyPi only  | ✅                             |
| Ruby                     | ✅           | ✅                | ✅                             |
| Scala                    | ✅           | ✅†               | --                             |
| Swift                    | ✅           | ✅                | --                             |
| Rust                     | --           | ✅                | ✅                             |
| Dart                     | --           | --                | --                             |
| Elixir                   | --           | --                | --                             |
| PHP                      | --           | --                | --                             |
-->
