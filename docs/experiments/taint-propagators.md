---
slug: taint-propagators
append_help_link: true
description: "Taint propagators allow you to customize how taint is propagated."
---

# Taint propagators

Taint propagators allow you to customize how taint is propagated. TODO

## Taint propagator example use

Consider the following Python code:

```python
def test(s):
    x = user_input
    s = set([])
    s.add(x)
    #ruleid: test
    sink(s.pop())
```

Code description: An unsafe `user_input` is stored into a `set` data structure.
A random element from `set` is then passed into a `sink` function. This random
element can be `user_input` itself, leading to an injection vulnerability!

Let's use the following rule to find the above-described issue: 

```yaml
mode: taint
pattern-sources:
- pattern: user_input
pattern-sinks:
- pattern: sink(...)
```

Semgrep only propagates taint through assignments. As a consequence, 
Semgrep cannot find the issue using the rule displayed above.

The use of **taint propagators** enables Semgrep to propagate taint in these scenarios.
Taint propagators are specified under the `pattern-propagators` key:

```yaml
pattern-propagators:
- pattern: $X.add($Y)
  from: $Y
  to: $X
```

In the example above, whenever Semgrep finds the pattern `$X.add($Y)`, it checks if
`$Y` is tainted. If `$Y` is tainted, Semgrep propagates that taint to `$X`. 
Thus, adding tainted data to a set marks the set itself as tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=7lNe" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Requirements of taint propagator rules

A taint propagator rules necessitate:
- Any arbitrary pattern that must bind two metavariables of your choice.
- You must specify the `from` and the `to` metavariables. TODO
