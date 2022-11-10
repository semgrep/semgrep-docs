# Deprecated experiments

## Equivalences

:::note
This feature was deprecated in Semgrep v0.61.0.
:::

Equivalences enable defining equivalent code patterns (i.e. a commutative property: `$X + $Y <==> $Y + $X`). Equivalence rules use the `equivalences` top-level key and one `equivalence` key for each equivalence.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=jNnn" border="0" frameBorder="0" width="100%" height="432"></iframe>
