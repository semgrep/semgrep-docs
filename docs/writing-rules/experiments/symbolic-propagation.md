---
slug: symbolic-propagation
append_help_link: true
description: "Symbolic propagation allows Semgrep to perform matching modulo variable assignments."
---

# Symbolic propagation

Symbolic propagation allows Semgrep to perform matching modulo variable assignments. Consider the following Python code:

```python
import pandas

def test1():
    # ruleid: test
    pandas.DataFrame(x).index.set_value(a, b, c)

def test2():
    df = pandas.DataFrame(x)
    ix = df.index
    # ruleid: test
    ix.set_value(a, b, c)
```

If we tried to match the pattern `pandas.DataFrame(...).index.set_value(...)` against the above code, Semgrep would normally match `test1` but not `test2`. It does not match `test2` because there are intermediate assignments, and Semgrep does not know that `ix` is equals to `df.index` or that `df` is equals to `pandas.DataFrame(x)`. If we wanted Semgrep to match such code, we had to be explicit about it.

Symbolic propagation is a generalization of [constant propagation](/writing-rules/data-flow/constant-propagation/) that addresses this limitation. It enables Semgrep to perform matching modulo variable assignments. Thus, Semgrep is then able to match both `test1` and `test2` with the same simple pattern. This feature needs to be enabled explicitly via rule `options:` by setting `symbolic_propagation: true`.

<iframe src="https://semgrep.dev/embed/editor?snippet=JeBP" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Limitations of symbolic propagation

Currently, symbolic propagation does not cross branching boundaries, such as `if` clauses or loops. Consider the following Python code, adapted from the example shown above:

```python
import pandas

def test1():
    # ruleid: test
    pandas.DataFrame(x).index.set_value(a, b, c)

def test2():
    if (x < 5):
        df = pandas.DataFrame(x)
        pass
    ix = df.index
    # ruleid: test
    ix.set_value(a, b, c)
```

In this case, even if `symbolic_propagation: true` is used, Semgrep does not match `test2`, because the assignment of `df` to `pandas.DataFrame(x)` is not propagated over the conditional to the final two lines.