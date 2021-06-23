---
append_help_link: true
description: >-
  Semgrep supports over a dozen languages. Learn about generally available, beta, and experimentally supported languages.
---

# Supported languages

[TOC]

# Language maturity

<div class="languages-table">
  <iframe width="100%" height="1000" border=0 frameBorder=0 src="https://dashboard.semgrep.dev/languages/table"></iframe>
</div>

# Language parse rate

<div class="stats-graph-container">
  <div class="lang-container">
    <h2>Go parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.go.parse.pct/number"></iframe>
  </div>
  
  <div class="lang-container">
    <h2>Java parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.java.parse.pct/number"></iframe>
  </div>
  
  <div class="lang-container">
    <h2>JavaScript parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.javascript.parse.pct/number"></iframe>
  </div>
  
  <div class="lang-container">
    <h2>Python parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.python.parse.pct/number"></iframe>
  </div>

  <div class="lang-container">
    <h2>Ruby parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.ruby.parse.pct/number"></iframe>
  </div>
  
  <div class="lang-container">
    <h2>TypeScript parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.typescript.parse.pct/number"></iframe>
  </div>
  
  <div class="lang-container">
    <h2>TSX parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.tsx.parse.pct/number"></iframe>
  </div>

  <div class="lang-container">
    <h2>OCaml parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.ocaml.parse.pct/number"></iframe>
  </div>

  <div class="lang-container">
    <h2>PHP parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.php.parse.pct/number"></iframe>
  </div>

  <div class="lang-container">
    <h2>C parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.c.parse.pct/number"></iframe>
  </div>

  <div class="lang-container">
    <h2>C# parse rate</h2>
    <iframe width="450" height="150" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep.core.c-sharp.parse.pct/number"></iframe>
  </div>
</div>

# Support expectations

* **Alpha**: experimental support with many known bugs.
    * Looking for dedicated users to help us improve these languages.
    * Expect limited support responses, as these languages will be lowest priority.
* **Beta**: supported language with known bugs.
    * Looking for beta users to report bugs and rapidly iterate with our team.
    * Expect best-effort support responses when there are no higher priority requests being handled.
* **GA**: production-level support with few known bugs.
    * Looking for bug reports and feedback from users.
    * Expect timely and thorough support responses, generally within 24 hours.

# Maturity definitions

Language maturity is determined by 3 factors in the Semgrep ecosystem:

1. **Parse rate** - how well Semgrep can parse code in a given language.
1. **Feature support** - what [Semgrep features](writing-rules/pattern-syntax.md) are implemented for a given language.
1. **Ruleset count** - number of [Semgrep rule groupings](https://semgrep.dev/explore) in the cloud app.

There are 3 levels of maturity: **alpha**, **beta**, and **generally available (GA)**. Each of these maturity levels are combined with a threshold of the factors above. When a language meets the maturity threshold for each of the factors then it’s moved into that maturity level.

The following thresholds define each maturity level:

* **Alpha**
    * Parse rate: 90%+
    * Rulesets: 0+ (10+ rules)
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
    * Rulesets: 1+ (10+ rules)
    * Features:
        * All in alpha
        * `metavar_class_def`
        * `metavar_func_def`
        * `metavar_cond`
        * `metavar_equality_expr`
        * `metavar_equality_stmt`
        * `metavar_import`
        * `metavar_stmt`
* **Generally Available (GA)**
    * Parse rate: 99.9%+
    * Rulesets: 2+ (10+ rules)
    * Features:
        * All in alpha
        * All in beta
        * `deep_expr_operator`
        * `equivalence_constant_propagation`
        * `equivalence_eq`
        * `equivalence_naming_import` (language dependent)
        * `metavar_anno` (language dependent)
        * `metavar_key_value`
        * `metavar_typed` (language dependent)
        * `regexp_string`

Generally speaking, the features-by-maturity level are roughly: **alpha)** syntax support, ellipsis operator support, and basic metavariable support, **beta)** everything prior and nearly complete metavariable support and metavariable equality, **GA)** everything prior and all advanced features like regexp, equivalence, deep expression operator, typing, etc.

Visit the cheat sheet generation script and associated semgrep-core test files to learn more about each feature:

* [https://github.com/returntocorp/semgrep/blob/develop/scripts/generate_test_matrix.py](https://github.com/returntocorp/semgrep/blob/develop/scripts/generate_test_matrix.py)
* [https://github.com/returntocorp/semgrep/tree/develop/semgrep-core/tests](https://github.com/returntocorp/semgrep/tree/develop/semgrep-core/tests)
