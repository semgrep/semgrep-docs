---
slug: data-flow-overview
append_help_link: true
description: >-
  Semgrep can run data-flow analyses on your code, this is used for constant propagation and for taint tracking.
---

import DataFlowStatus from "/src/components/concept/_data-flow-status.mdx"

# Data-flow analysis engines overview

Semgrep provides intra-procedural data-flow analysis engines that open various Semgrep capabilities. See the following data-flow analysis tools:
- [Constant propagation](../constant-propagation/) allows Semgrep to, for example, match `return 42` against `return x` when `x` can be reduced to `42` by constant folding. There is also a specific experimental feature of [Constant propagation](../constant-propagation/), called [Symbolic propagation](/experiments/symbolic-propagation/).
- [Taint tracking (known also as taint mode)](../taint-mode/) enables you to write simple rules that catch complex [injection bugs](https://owasp.org/www-community/Injection_Flaws), such as those that can result in [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

In principle, all features related data-flow are available for any of Semgrep's [supported languages](/supported-languages/). DeepSemgrep also supports data-flow analysis. For more details, see [DeepSemgrep](/docs/deepsemgrep/) documentation.

:::info
Ensure that you understand the [design trade-offs](#design-trade-offs) and limitations of the data-flow engine. For further details, see also the [data-flow status](#data-flow-status). 
:::

Semgrep provides no user-friendly way of specifying a new data-flow analysis, but please [let us know if you have suggestions](https://github.com/returntocorp/semgrep/issues/new/choose). If you can code in OCaml, your contribution is welcome to [contribute](/docs/contributing/contributing/).

## Design trade-offs

Semgrep strives for simplicity and delivers a lightweight, and fast static analysis. In addition to being intra-procedural, here are some other trade-offs:

- No path sensitivity: All _potential_ execution paths are considered, despite that some may not be feasible.
- No pointer or shape analysis: _Aliasing_ that happens in non-trivial ways may not be detected, such as through arrays or pointers. Individual elements in arrays or other data structures are not tracked. There is also no proper field sensitivity at present, but this may be developed in the future.
- No soundness guarantees: Semgrep ignores the effects of `eval`-like functions on the program state. It doesn’t make worst-case sound assumptions, but rather "reasonable" ones.

Expect both false positives and false negatives. You can remove false positives in different ways, for example, using [pattern-not](../../rule-syntax/#pattern-not) and [pattern-not-inside](../../rule-syntax/#pattern-not-inside). We want to provide you with a way of eliminating false positives, so please [let file an issue if run into some](https://github.com/returntocorp/semgrep/issues/new/choose). We are happy to trade false negatives for simplicity and fewer false positives, but you are welcome to open a feature request if Semgrep misses some difficult bug you want to catch.

## Data-flow status

<DataFlowStatus />
