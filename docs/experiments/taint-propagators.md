---
slug: taint-propagators
append_help_link: true
description: "Taint propagators allow you to customize how taint is propagated."
---

# Taint propagators

The default configuration of taint mode in Semgrep sometimes misses specific tainted structures. Taint propagators allow you to specify additional structures through which taint propagates. This enables you to create and use taint mode rules with taint propagators that are more efficient in detecting tainted structures. 

The following video provides a quick overview of taint propagators:
<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/6MxMhFPkZlU?start=175" frameborder="0" allowfullscreen></iframe>

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
1. A `pattern` containing **two** metavariables. These two metavariables specify where taint is propagated **from** and **to**. For example, pattern `$X.add($Y)` includes two metavariables `$X` and `$Y`. Then specify which metavariable falls under `from` and which falls under `to` (see more information below).
2. The `to` and `from` metavariables. These metavariables can contain either a **variable** or an **expression**.
    - The `from` metavariable specifies the entry point of the taint.
    - The `to` metavariable specifies where the tainted data is propagated to, typically an object or data structure.
