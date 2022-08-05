---
slug: overview
append_help_link: true
description: >-
  Semgrep can run data-flow analyses on your code, this is used for constant propagation and for taint tracking.
---

# Engine overview

Semgrep comes with an intra-procedural data-flow analysis engine that provides it with additional capabilities. [Constant propagation](../constant-propagation/) allows Semgrep to, for example, match `return 42` against `return x` when `x` can be reduced to `42` by constant folding. [Taint tracking (aka taint mode)](../taint-mode/) allows writing simple rules that catch complex [injection bugs](https://owasp.org/www-community/Injection_Flaws), such as those that can result in [cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

In principle, all data-flow related features are available for any of our [supported languages](/supported-languages/). For further details please check the [data-flow status documentation](../status/). 

Make sure that you understand the [design trade-offs](#design-trade-offs) and limitations of the data-flow engine.

At present, Semgrep provides no user-friendly way of specifying your own data-flow analyses, but please [let us know if you have suggestions](https://github.com/returntocorp/semgrep/issues/new/choose). And, if you can code in OCaml, then you are very welcome to [contribute](/contributing/how-to-contribute/).

## Design trade-offs

Semgrep strives for simplicity and to deliver on the promise of lightweight and fast static analysis. In addition to being intra-procedural, here are some other trade-offs:

- No path sensitivity: All _potential_ execution paths are considered, despite that some may not be feasible.
- No pointer or shape analysis: _Aliasing_ that happens in non-trivial ways may not be detected, such as through arrays or pointers. Individual elements in arrays or other data structures are not tracked. There is also no proper field sensitivity at present, but this may be developed in the future.
- No soundness guarantees: Semgrep ignores the effects of `eval`-like functions on the program state. It doesn’t make worst-case sound assumptions, but rather "reasonable" ones.

You can expect both false positives and false negatives. You should be able to remove false positives in different ways, for example, using [pattern-not](../../rule-syntax/#pattern-not) and [pattern-not-inside](../../rule-syntax/#pattern-not-inside). We definitely want to provide you with a way of eliminating false positives, so please [let file an issue if run into some](https://github.com/returntocorp/semgrep/issues/new/choose). We are rather happy to trade false negatives for simplicity and fewer false positives, but you are welcome to open a feature request if Semgrep misses some important bug you would like to catch, and we will certainly consider it.