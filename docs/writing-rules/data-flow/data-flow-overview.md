---
slug: data-flow-overview
append_help_link: true
description: >-
  Semgrep can run data-flow analyses on your code, this is used for constant propagation and for taint tracking.
---

# Data-flow analysis engines overview

Semgrep provides intra-procedural data-flow analysis engines that open various Semgrep capabilities. See the following data-flow analysis tools:
- [Constant propagation](../constant-propagation/) allows Semgrep to, for example, match `return 42` against `return x` when `x` can be reduced to `42` by constant folding. There is also a specific experimental feature of [Constant propagation](../constant-propagation/), called [Symbolic propagation](/experiments/symbolic-propagation/).
- [Taint tracking (known also as taint mode)](../taint-mode/) enables you to write simple rules that catch complex [injection bugs](https://owasp.org/www-community/Injection_Flaws), such as those that can result in [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

In principle, all data-flow related features are available for any of our [supported languages](/supported-languages/). For further details please check the [data-flow status](#data-flow-status) section.

Ensure that you understand the [design trade-offs](#design-trade-offs) and limitations of the data-flow engine.

At present, Semgrep provides no user-friendly way of specifying your own data-flow analysis, but please [let us know if you have suggestions](https://github.com/returntocorp/semgrep/issues/new/choose). If you can code in OCaml, your contribution is welcome to [contribute](/docs/contributing/contributing/).

Data-flow analysis is also supported in DeepSemgrep. For more details, see [DeepSemgrep](/docs/deepsemgrep/) documentation.

## Design trade-offs

Semgrep strives for simplicity and to deliver on the promise of lightweight and fast static analysis. In addition to being intra-procedural, here are some other trade-offs:

- No path sensitivity: All _potential_ execution paths are considered, despite that some may not be feasible.
- No pointer or shape analysis: _Aliasing_ that happens in non-trivial ways may not be detected, such as through arrays or pointers. Individual elements in arrays or other data structures are not tracked. There is also no proper field sensitivity at present, but this may be developed in the future.
- No soundness guarantees: Semgrep ignores the effects of `eval`-like functions on the program state. It doesn’t make worst-case sound assumptions, but rather "reasonable" ones.

You can expect both false positives and false negatives. You can remove false positives in different ways, for example, using [pattern-not](../../rule-syntax/#pattern-not) and [pattern-not-inside](../../rule-syntax/#pattern-not-inside). We definitely want to provide you with a way of eliminating false positives, so please [let file an issue if run into some](https://github.com/returntocorp/semgrep/issues/new/choose). We are rather happy to trade false negatives for simplicity and fewer false positives, but you are welcome to open a feature request if Semgrep misses some important bug you would like to catch, and we will certainly consider it.

## Data-flow status

In principle, the data-flow analysis may run on any language [supported by Semgrep](/docs/supported-languages.md). However, compared to the regular Semgrep matching engine, the data-flow analysis engine may still not work as expected for some languages. Please, report any issue you encounter in our [Semgrep GitHub](https://github.com/returntocorp/semgrep/issues/new/choose).

:::caution
When Semgrep performs an analysis of the code, it creates an **abstract syntax tree** (AST) which is then translated into an analysis-friendly **intermediate language** (IL). Subsequently, Semgrep runs mostly language-agnostic analysis on IL. However, this translation is not fully complete. There can be features of some languages that Semgrep does not analyze correctly. In such a case, Semgrep does not fail even if it finds an unsupported construct. The analysis continues while the construct is ignored. This can result in Semgrep not matching some code that should be matched (false negatives) or matching a code that should not be matched (false positives).
:::
