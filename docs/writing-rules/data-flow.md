---
id: data-flow
description: >-
  Learn how to use Semgrep’s intuitive syntax to write rules specific to your codebase. You can write and share rules directly from your browser using the Semgrep Playground, or write rules in your terminal and run them on the command line.
---

# Data-flow analysis

Semgrep can perform intra-procedural flow-sensitive analyses. The data-flow engine still has several limitations, therefore expect both false positives and false negatives. False positives could be removed by using [pattern-not](../writing-rules/rule-syntax.md#pattern-not).

A non-exhaustive list of current limitations:

- The analyses are not aware of _aliasing_.
- The analyses do not track individual elements in data structures, although there is limited support for record fields.
- `break`, `continue`, and `switch` statements are not properly handled yet.
- `try-catch-finally` is only partially supported, not all possible execution paths are considered.

Data-flow analysis is used for [constant propagation](#constant-propagation).

## Constant propagation

Semgrep supports intra-procedural constant propagation. This tracks whether a variable must carry a constant value at each point in the program.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=XLpw" border="0" frameBorder="0" width="100%" height="435"></iframe>

## Taint tracking

Semgrep supports intra-file [taint tracking](https://en.wikipedia.org/wiki/Taint_checking). Taint tracking rules must specify `mode: taint`. Additionally, the following operators are enabled:

- `pattern-sources` (required)
- `pattern-sinks` (required)
- `pattern-sanitizers` (optional)

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=P8oz" border="0" frameBorder="0" width="100%" height="435"></iframe>