---
slug: status
append_help_link: true
description: >-
  The status of the data-flow analyses.
---

# Data-flow status

In principle, the data-flow analysis may run on any language [supported by Semgrep](/docs/supported-languages.md). However, compared to the regular Semgrep matching engine, the data-flow analysis engine may still not work as expected for some languages. Please, report any issue you encounter in our [Semgrep GitHub](https://github.com/returntocorp/semgrep/issues/new/choose).

:::caution
When Semgrep performs an analysis of the code, it creates an **abstract syntax tree** (AST) which is then translated into an analysis-friendly **intermediate language** (IL). Subsequently, Semgrep runs mostly language-agnostic analysis on IL. However, this translation is not fully complete. There can be features of some languages that Semgrep does not analyze correctly. In such a case, Semgrep does not fail even if it finds an unsupported construct. The analysis continues while the construct is ignored. This can result in Semgrep not matching some code that should be matched (false negatives) or matching a code that should not be matched (false positives).
:::

Please [report any issues](https://github.com/returntocorp/semgrep/issues/new/choose) you encounter.
