---
slug: data-flow-overview
append_help_link: true
description: >-
  Semgrep can run dataflow analyses on your code, this is used for constant propagation and for taint tracking.
sidebar_label: Engine overview
tags:
  - Rule writing
---

import DataFlowStatus from "/src/components/concept/_data-flow-status.mdx"

# Dataflow analysis engine overview

Semgrep provides an intraprocedural dataflow analysis engine that opens various up Semgrep capabilities, including:

- [Constant propagation](/writing-rules/data-flow/constant-propagation), which allows Semgrep to, for example, match `return 42` against `return x` when `x` can be reduced to `42` by constant folding. There is also an experimental feature of [Constant propagation](/writing-rules/data-flow/constant-propagation), called [Symbolic propagation](/writing-rules/experiments/symbolic-propagation).
- [Taint tracking (also known as taint analysis)](/writing-rules/data-flow/taint-mode/), which enables you to write simple rules that catch complex [injection bugs](https://owasp.org/www-community/Injection_Flaws), such as those that can result in [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

All dataflow-related features are available for Semgrep's [supported languages](/supported-languages). Interfile (cross-file) analysis also supports dataflow analysis. For more details, see [<i class="fa-regular fa-file-lines"></i> Perform cross-file analysis](/semgrep-code/semgrep-pro-engine-intro).

:::info
Ensure that you understand the [design trade-offs](#design-trade-offs) and limitations of the dataflow engine. For further details, see [dataflow status](#data-flow-status).
:::

If you are interested in requesting a new dataflow analysis, please [let us know](https://github.com/semgrep/semgrep/issues/new/choose). If you can code in OCaml, your contribution is welcome. See [Contributing](/contributing/contributing) for more details.

## Design trade-offs

Semgrep strives for simplicity and offers lightweight and fast static analyses. In addition to being intraprocedural, here are some other trade-offs:

- No path sensitivity: All _potential_ execution paths are considered, even though some may not be feasible.
- No pointer or shape analysis: _Aliasing_ that happens in non-trivial ways may not be detected, such as through arrays or pointers. Individual elements in arrays or other data structures are not tracked. The dataflow engine supports limited field sensitivity for taint tracking, but not for constant propagation.
- No soundness guarantees: Semgrep ignores the effects of `eval`-like functions on the program state. It doesn’t make worst-case sound assumptions, but rather "reasonable" ones.

Expect both false positives and false negatives. You can remove false positives in different ways, such as using [pattern-not](/writing-rules/rule-syntax#pattern-not) and [pattern-not-inside](/writing-rules/rule-syntax#pattern-not-inside). If you encounter any problems, [create an issue](https://github.com/semgrep/semgrep/issues/new/choose) to open a feature request if Semgrep misses a difficult bug you want to catch.

## Dataflow status

<DataFlowStatus />
