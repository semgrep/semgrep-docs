---
slug: taint-propagators
append_help_link: true
description: "Taint propagators allow you to customize how taint is propagated."
---

# Taint propagators

The default configuration of taint mode in Semgrep sometimes misses specific tainted structures. Taint propagators allow you to specify additional structures through which taint propagates. This results in taint mode rules with taint propagators that are more efficient in detecting tainted structures. 

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

A taint propagator rule must contain:
- Any arbitrary pattern that must bind two metavariables of your choice.
- The `from` and `to` metavariables. The `from` indicates the starting variable from which the tainted source passes through to propagate the taint. The `to` specifies what additional object or structure is tainted as a result.
