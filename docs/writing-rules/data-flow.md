---
id: data-flow
description: >-
  Learn about Semgrep’s data-flow analyses.
---

# Data-flow analysis

Semgrep comes with an intra-procedural data-flow analysis engine that powers [constant propagation](#constant-propagation) and [taint tracking](#taint-tracking). (At present you cannot write your own data-flow analyses.) Make sure that you understand the [limitations](#limitations) of the data-flow engine.

## Constant propagation

Semgrep supports intra-procedural constant propagation. This analysis tracks whether a variable _must_ carry a constant value at a given point in the program. Semgrep then performs constant folding when matching literal patterns. For now we can track Boolean, numeric, and string constants.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Gw7z" border="0" frameBorder="0" width="100%" height="435"></iframe>

:::tip
It is possible to disable constant propagation in a per-rule basis via the [`options` rule field](./rule-syntax.md#options).
:::

## Taint tracking

Semgrep supports intra-procedural [taint tracking](https://en.wikipedia.org/wiki/Taint_checking). Taint tracking rules must specify `mode: taint`. Additionally, the following operators are enabled:

- `pattern-sources` (required)
- `pattern-sinks` (required)
- `pattern-sanitizers` (optional)

Each of these operators takes a list of pattern formulas that specify what is to be considered a source, a sink, or a sanitizer. Note that you can write _any_ pattern formula, you have the same expressive power as in a `mode: search` rule.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=P8oz" border="0" frameBorder="0" width="100%" height="435"></iframe>

:::Tip
Using an _AND_ `patterns` operator, it is possible to restrict a sink to one specific argument of a function.

<iframe src="https://semgrep.dev/embed/editor?snippet=BLv7" border="0" frameBorder="0" width="100%" height="435"></iframe>
:::

:::Tip
To learn more tricks, you can look at the taint rules in our registry, for example:

<iframe src="https://semgrep.dev/embed/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection" border="0" frameBorder="0" width="100%" height="435"></iframe>
:::

## Limitations

In order to keep it simple, as well as to deliver on our promise of lightweight and fast static analysis, there are some limitations. In addition to being intra-procedural:

- We consider all _potential_ execution paths, despite some may not be feasible.
- We may not detect _aliasing_ that happens in non-trivial ways, such as through arrays or pointers. 
- We do not track invidual elements in arrays or other data structures, although there is limited support for record fields.
- We are not aware of the effects to the program state caused by functions such as `eval`.

Besides, some language constructs such as `break`, `continue`, and `switch` statements, are not properly handled yet; but we intend to handle them correctly in the future.

These design limitations can lead to both false positives and false negatives. You should be able to remove false positives using, for example, [pattern-not](../writing-rules/rule-syntax.md#pattern-not) and [pattern-not-inside](../writing-rules/rule-syntax.md#pattern-not-inside).
