---
slug: supported-languages
id: supported-languages
append_help_link: true
description: >-
  Semgrep supports more than two dozen languages. Learn about generally available, beta, and experimentally supported languages.
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import MoreHelp from "/src/components/MoreHelp"

# Supported languages

## Language maturity

<SupportedLanguagesTable />

## Maturity definitions

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
## Language parse rates

See [parse rates by language](https://dashboard.semgrep.dev/).

<MoreHelp />
