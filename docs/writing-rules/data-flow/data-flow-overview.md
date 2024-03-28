---
slug: data-flow-overview
append_help_link: true
description: >-
  Semgrep can run data-flow analyses on your code, this is used for constant propagation and for taint tracking.
sidebar_label: Engine overview
---

import DataFlowStatus from "/src/components/concept/_data-flow-status.mdx"

# Data-flow analysis engine overview

Semgrep provides an intra-procedural data-flow analysis engine that opens various Semgrep capabilities. Semgrep provides the following data-flow analyses:
- [Constant propagation](/docs/constant-propagation) allows Semgrep to, for example, match `return 42` against `return x` when `x` can be reduced to `42` by constant folding. There is also a specific experimental feature of [Constant propagation](/writing-rules/data-flow/constant-propagation), called [Symbolic propagation](/writing-rules/experiments/symbolic-propagation).
- [Taint tracking (known also as taint mode)](/docs/taint-mode/) enables you to write simple rules that catch complex [injection bugs](https://owasp.org/www-community/Injection_Flaws), such as those that can result in [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

In principle, all data-flow related features are available for any of Semgrep's [supported languages](/supported-languages). Semgrep Pro Engine also supports data-flow analysis. For more details, see [Semgrep Pro Engine overview](/semgrep-code/semgrep-pro-engine-intro) documentation.

:::info
Ensure that you understand the [design trade-offs](#design-trade-offs) and limitations of the data-flow engine. For further details, see also the [data-flow status](#data-flow-status). 
:::

Semgrep provides no user-friendly way of specifying a new data-flow analysis. Please [let us know if you have suggestions](https://github.com/semgrep/semgrep/issues/new/choose). If you can code in OCaml, your contribution is welcome. See [Contributing](/contributing/contributing) documentation for more details.

## Design trade-offs

Semgrep strives for simplicity and delivers a lightweight, and fast static analysis. In addition to being intra-procedural, here are some other trade-offs:

- No path sensitivity: All _potential_ execution paths are considered, despite that some may not be feasible.
- No pointer or shape analysis: _Aliasing_ that happens in non-trivial ways may not be detected, such as through arrays or pointers. Individual elements in arrays or other data structures are not tracked. The dataflow engine supports limited field sensitivity for taint tracking, but not yet for constant propagation.
- No soundness guarantees: Semgrep ignores the effects of `eval`-like functions on the program state. It doesn’t make worst-case sound assumptions, but rather "reasonable" ones.

Expect both false positives and false negatives. You can remove false positives in different ways, for example, using [pattern-not](/docs/rule-syntax/#pattern-not) and [pattern-not-inside](/docs/rule-syntax/#pattern-not-inside). We want to provide you with a way of eliminating false positives, so [create an issue](https://github.com/semgrep/semgrep/issues/new/choose) if run into any problems. We are happy to trade false negatives for simplicity and fewer false positives, but you are welcome to open a feature request if Semgrep misses some difficult bug you want to catch.

## Data-flow status

<DataFlowStatus />
