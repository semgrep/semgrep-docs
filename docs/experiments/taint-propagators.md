---
slug: taint-propagators
append_help_link: true
description: "Taint propagators allow you to customize how taint is propagated."
---

# Taint propagators

Consider the following Python code:

```python
def test(s):
    x = user_input
    s = set([])
    s.add(x)
    #ruleid: test
    sink(s.pop())
```

Here, an unsafe `user_input` is stored into a set data-structure, and then we take
a random element from that set and pass it into a `sink` function. Of course, this
random element could be `user_input` itself, leading to an injection vulnerability!

If we try to find this issue with this rule:

```yaml
mode: taint
pattern-sources:
- pattern: user_input
pattern-sinks:
- pattern: sink(...)
```

It will not find it. This is because, by itself, Semgrep only propagates taint
through assignments.

Using _taint propagators_ you can tell Semgrep how to propagate taint in these
scenarios. Taint propagators are specified under the `pattern-propagators` key:

```yaml
pattern-propagators:
- pattern: $X.add($Y)
  from: $Y
  to: $X
```

A propagator consists of any arbitrary pattern, that must bind two metavariables
of your choice. Then you must specify the `from` and the `to` metavariables.
In our example, whenever Semgrep finds the pattern `$X.add($Y)`, it will check if
`$Y` is tainted and, if it is, then it will propagate that taint to `$X`. Thus,
adding tainted data to a set will mark the set itself as tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=7lNe" border="0" frameBorder="0" width="100%" height="432"></iframe>
