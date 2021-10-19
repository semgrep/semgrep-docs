---
slug: status
append_help_link: true
description: >-
  The data-flow engine ...
---

# Supported languages

The data-flow based features, including taint tracking, are in beta status.

In principle, our data-flow analyses can run on any of our [supported languages](../../status.md). Internally, we tanslate the generic syntax tree into an analysis-friendly intermediate language, the _IL_, on which we run _mostly_ language-agnostic analyses. However, this translation is not fully complete. Unsupported constructs are typically specific to one or few languages.

Semgrep will not fail even if it finds a construct that is not supported. The analysis will simply continue while the construct is ignored. This may cause some false positives or negatives.

Please [report any issues](https://github.com/returntocorp/semgrep/issues/new/choose) you may encounter.