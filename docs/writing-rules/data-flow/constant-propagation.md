---
slug: constant-propagation
append_help_link: true
description: >-
  Semgrep performs flow-sensitive constant folding and this information is used by the matching engine.
---

Constant propagation
====================

Semgrep supports intra-procedural constant propagation. This analysis tracks whether a variable _must_ carry a constant value at a given point in the program. Semgrep then performs constant folding when matching literal patterns. For now it can track Boolean, numeric, and string constants.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Gw7z" border="0" frameBorder="0" width="100%" height="432"></iframe>

`metavariable-comparison`
-------------------------

Using constant propagation, the [`metavariable-comparison`](/writing-rules/rule-syntax/#metavariable-comparison) operator will work with any constant variable, instead of just literals.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Dyzd" border="0" frameBorder="0" width="100%" height="432"></iframe>

Mutable objects
---------------

In general, Semgrep assumes that constant objects are immutable and they will not be modified by function calls. This may lead to false positives, especially in languages where strings are mutable such as C and Ruby.

The only exceptions (for now) are method calls whose returning value is being ignored. In those cases, Semgrep assumes that the method call may be mutating the callee object. This helps reducing false positives in Ruby, for example:

<iframe src="https://semgrep.dev/embed/editor?snippet=08yB" border="0" frameBorder="0" width="100%" height="432"></iframe>


Disabling constant propagation
------------------------------

It is possible to disable constant propagation in a per-rule basis via rule [`options:`](/writing-rules/rule-syntax/#options) by setting `constant_propagation: false`.

<iframe src="https://semgrep.dev/embed/editor?snippet=jwvn" border="0" frameBorder="0" width="100%" height="432"></iframe>
