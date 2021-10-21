---
slug: constant-propagation
append_help_link: true
description: >-
  Semgrep performs flow-sensitive constant folding and this information is used by the matching engine.
---

# Constant propagation

Semgrep supports intra-procedural constant propagation. This analysis tracks whether a variable _must_ carry a constant value at a given point in the program. Semgrep then performs constant folding when matching literal patterns. For now it can track Boolean, numeric, and string constants.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Gw7z" border="0" frameBorder="0" width="100%" height="435"></iframe>

## Disabling constant propagation

It is possible to disable constant propagation in a per-rule basis via rule [`options:`](../rule-syntax.md#options) by setting `constant_propagtion: false`.

<iframe src="https://semgrep.dev/embed/editor?snippet=jwvn" border="0" frameBorder="0" width="100%" height="435"></iframe>