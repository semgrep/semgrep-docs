---
slug: taint-mode
append_help_link: true
description: >-
  Taint mode allows you to write simple rules that catch complex injection bugs.
---

# Taint tracking

Semgrep supports intra-procedural [taint analysis](https://en.wikipedia.org/wiki/Taint_checking). This data-flow analysis feature tracks the flow of untrusted (**tainted**) data throughout the body of a function or method. Tainted data originate from tainted **sources**. If tainted data are not transformed or checked accordingly (**sanitized**), taint analysis reports a finding whenever tainted data reach a vulnerable function (called **sink**). Tainted data flow from sources to sinks through **propagators** (such as assignments, or function calls).

The following video provides a quick overview of taint mode:
<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/6MxMhFPkZlU" frameborder="0" allowfullscreen></iframe>

## Getting started

Taint tracking rules must specify `mode: taint`, which enables the following operators:

- `pattern-sources` (required)
- `pattern-propagators` (optional)
- `pattern-sanitizers` (optional)
- `pattern-sinks` (required)

These operators (which act as `pattern-either` operators) take a list of patterns that specify what is considered a source, a propagator, a sanitizer, or a sink. Note that you can use **any** pattern operator and you have the same expressive power as in a `mode: search` rule.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=xG6g" border="0" frameBorder="0" width="100%" height="432"></iframe>

Here Semgrep tracks the data returned by `get_user_input()`, which is the source of taint. Think of Semgrep running the pattern `get_user_input(...)` on your code, finding all places where `get_user_input` gets called, and labeling them as tainted. That is exactly what is happening under the hood!

The rule specifies the sanitizer `sanitize_input(...)`, so any expression that matches that pattern is considered sanitized. In particular, the expression `sanitize_input(data)` is labeled as sanitized. Even if `data` is tainted, as it occurs inside a piece of sanitized code, it does not produce any findings.

Finally, the rule specifies that anything matching either `html_output(...)` or `eval(...)` should be regarded as a sink. There are two calls `html_output(data)` that are both labeled as sinks. The first one in `route1` is not reported because `data` is sanitized before reaching the sink, whereas the second one in `route2` is reported because `data` that reaches the sink is still tainted.

You can find more examples of taint rules in the [Semgrep Registry](https://semgrep.dev/r?owasp=injection%2Cxss), for instance: [express-sandbox-code-injection](https://semgrep.dev/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection).

:::info
[Metavariables](/writing-rules/pattern-syntax#metavariables) used in `pattern-sources` are considered _different_ from those used in `pattern-sinks`, even if they have the same name! See [Metavariables, rule message, and unification](#metavariables-rule-message-and-unification) for further details.
:::

## Field sensitivity

The taint engine provides basic field sensitivity support, it can:

- Track that `x.a.b` is tainted, but `x` or `x.a` is  **not** tainted. If `x.a.b` is tainted, any extension of `x.a.b` (such as `x.a.b.c`) is considered tainted by default.
- Track that `x.a` is tainted, but remember that `x.a.b` has been sanitized. Thus the engine records that `x.a.b` is **not** tainted, but `x.a` or `x.a.c` are still tainted.

Taint tracking is **not** index sensitive, if `x.a[i]` is tainted, Semgrep considers the entire `x.a` as tainted. If `x.a[i]` is sanitized, then `x.a` is also sanitized.

:::note
The taint engine does track taint **per variable** and not **per object in memory**. The taint engine does not perform alias analysis at present.
:::

Sources
-------

A taint source is specified by a pattern. **Any** subexpression that this pattern matches is regarded as a source of taint.

:::note
Given the source specification below, and a piece of code such as `source(sink(x))`, the call `sink(x)` is reported as a tainted sink.
The reason is that the pattern `source(...)` matches all of `source(sink(x))`, and that makes Semgrep label every subexpression in that piece of code as being a source. In particular, `x` is a source, and it is being passed into `sink`!

```yaml
pattern-sources:
- pattern: source(...)
```
:::

### Function arguments as sources

To specify that an argument of a function must be considered a taint source, simply write a pattern that matches that argument:

```javascript
pattern-sources:
  - patterns:
    - pattern-inside: function ($REQ, ...) {...}
    - focus-metavariable: $REQ
```

### Sources by side-effect

Consider the following hypothetical Python code where we call a `make_tainted` function that makes its argument tainted by side-effect:

```python
def make_tainted(a_set):
  a_set.add(tainted)

make_tainted(my_set)
sink(my_set)
```

Using the source specification below, the pattern formula only matches the occurrence of `x` that is the actual parameter of `make_tainted`, but it does not affect the occurrence of `x` that is passed to `sink`. Both are the same variable but in different occurrences. Only the first one is matched by the source specification. At the same time, Semgrep does not know that `make_tainted` is updating the variable `x` by side-effect. Thus, a taint rule using such specifications does not produce any finding.

```yaml
pattern-sources:
- patterns:
  - pattern: make_tainted($X)
  - focus-metavariable: $X
```

**Deprecated workaround**: The previously recommended workaround was to write a source specification such as the one specified below. This instructs Semgrep that **every** occurrence of `$X` after `make_tainted($X)` must be considered a source.

```yaml
pattern-sources:
- patterns:
  - pattern: |
      make_tainted($X)
      ...
  - pattern: $X
```

This approach had two main limitations. First, it overrides any sanitization that can be performed on the code matched by `$X`.  In the example code below, the call `sink(x)` is reported as tainted despite `x` was re-assigned to a fresh set!

```python
make_tainted(x)
x = set([])
sink(x) # false positive
```

Note also that [`...` ellipses operator](/writing-rules/pattern-syntax/#ellipses-and-statement-blocks) has limitations. For example, in the code below Semgrep does not match any finding if such source specification is in use:

```python
if cond:
    make_tainted(x)
sink(x) # false negative
```

It is now recommended to set `by-side-effect: true`, where `by-side-effect` is an option available for each individual source in a taint rule. When this option is enabled, and the source specification matches a variable (or in general, an l-value) exactly, then Semgrep assumes that the variable (or l-value) becomes tainted by side-effect at the precise places where the source specification produces a match.

The following code specifies how to `make_tainted` updates its argument making future occurrences tainted:

<iframe src="https://semgrep.dev/embed/editor?snippet=eRvy" border="0" frameBorder="0" width="100%" height="432"></iframe>

There are also [sanitizers by side effect](#sanitizers-by-side-effect). For a good example of the use of both sources and sanitizers by side-effect, take a look at rule [`c.lang.security.use-after-free.use-after-free`](https://semgrep.dev/playground/r/c.lang.security.use-after-free.use-after-free).

## Propagators

By default, tainted data automatically propagates through assignments, operators, and function calls (from inputs to output). However, there are other ways in which taint can propagate, which can require language or library-specific knowledge that Semgrep does not have built-in.

Consider the following Python code where an unsafe `user_input` is stored into a `set` data structure. A random element from `set` is then passed into a `sink` function. This random element can be `user_input` itself, leading to an injection vulnerability!

```python
def test(s):
    x = user_input
    s = set([])
    s.add(x)
    #ruleid: test
    sink(s.pop())
```

The following rule cannot find the above-described issue. The reason is that Semgrep is not aware that executing `s.add(x)` makes `x` one of the elements in the set data structure `s`.

```yaml
mode: taint
pattern-sources:
- pattern: user_input
pattern-sinks:
- pattern: sink(...)
```

The use of **taint propagators** enables Semgrep to propagate taint in this and other scenarios.
Taint propagators are specified under the `pattern-propagators` key:

```yaml
pattern-propagators:
- pattern: $S.add($E)
  from: $E
  to: $S
```

In the example above, Semgrep finds the pattern `$S.add($E)`, and it checks whether the code matched by `$E` is tainted. If it is tainted, Semgrep propagates that same taint to the code matched by `$S`. Thus, adding tainted data to a set marks the set itself as tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=dGRE" border="0" frameBorder="0" width="100%" height="432"></iframe>

Another situation where taint propagators can be useful is to specify in Java that, when iterating a collection that is tainted, the individual elements must also be considered tainted:

```yaml
pattern-propagators:
- pattern: $C.forEach(($X) -> ...)
  from: $C
  to: $X
```

In general, a taint propagator must specify:
1. A pattern containing **two** metavariables. These two metavariables specify where taint is propagated **from** and **to**.
2. The `to` and `from` metavariables. These metavariables should match a **variable** or an **expression**.
    - The `from` metavariable specifies the entry point of the taint.
    - The `to` metavariable specifies where the tainted data is propagated to, typically an object or data structure.

:::note
When the `to` metavariable matches a variable (or in general, an l-value), the taint is propagated _by side-effect_.
See [Sources by side effect](#sources-by-side-effect) for an explanation of what this means.
:::

For example, pattern `$S.add($E)` includes two metavariables `$S` and `$E`. Given `from: $E` and `to: $S`, and with `$E` matching `x` and `$S` matching `s`, when `x` is tainted then `s` becomes tainted (by side-effect) with the same taint as `x`.

## Sanitizers

A sanitizer is specified by a pattern, and **any** subexpression that is matched by this pattern is regarded as sanitized.

:::note
Given the sanitizer specification below, and a piece of code such as `sanitize(sink(source))`, the call `sink(source)` is **not** reported.
The reason is that the pattern `sanitize(...)` matches all of `sanitize(sink(source))`, and that makes Semgrep label every subexpression in that piece of code as being sanitized. In particular, `source` is considered to be sanitized!

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
```
:::

### Sanitizers by side-effect

Consider the following hypothetical Python code where we sanitize some tainted data by checking whether the data is safe to use, and raising an exception otherwise. It is then guaranteed that after `check_if_safe(x)`, the value of `x` must be a safe one.

```python
def check_if_safe(x):
  if not it_is_safe(x):
    raise Exception("unsafe")

x = tainted
check_if_safe(x)
sink(x)
```

**Deprecated workaround**: The previously recommended workaround was to write a sanitizer specification such as the one below. This instructs Semgrep that **every** occurrence of `$X` after `check_if_safe($X)` must be considered safe.

```yaml
pattern-sanitizers:
- patterns:
  - pattern: |
      check_if_safe($X)
      ...
  - pattern: $X
```

This has the same limitations as documented in [sources by side effect](#sources-by-side-effect). It is now recommended to set `by-side-effect: true` for the sanitizer in question. Enabling `by-side-effect` for a given sanitizer instructs Semgrep that whenever that sanitizer matches a variable (in general, an l-lvalue) exactly, then sanitization happens by side-effect. 

## Sinks

A sink is specified by a pattern but, unlike for sources and sanitizers, Semgrep finds the best match for the sink.

### Function argument as a sink

If you specify a sink such as `sink(...)` then any tainted data passed to sink, through any of its arguments, results in a match. You can narrow it down to a specific parameter this way: 

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $S = new Sandbox(); ...
    - pattern: $S.run($SINK, ...)
    - focus-metavariable: $SINK
```

This rule causes Semgrep to only annotate the first parameter passed to `$S.run` as the sink, rather than the method `$S.run` itself. If taint goes into any other parameter of `$S.run`, then that is not considered a problem.

Remember, anything can be a sink, even the index of an array access:

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $ARRAY[$SINK]
    - focus-metavariable: $SINK
```

This way we tell Semgrep that we do not want arrays to be accessed with tainted indexes.

## Minimizing false positives

Since taint mode is intra-procedural, it does not recognize what other functions do. By default, Semgrep assumes that taint can always propagate through other functions.

For example, in the code below, `some_safe_function` receives tainted data as input, and to be on the safe side, Semgrep assumes that it also returns tainted data as output. As a result, a finding is produced.

```javascript
var x = some_safe_function(tainted);
sink(x);
```

In some codebases, this conservative assumption can generate too many false positives. If that is the case, consider enumerating such functions as sanitizers:

```yaml
pattern-sanitizers:
- pattern: some_safe_function(...)
```

If this is too cumbersome, then set Semgrep to assume that functions are safe by default. This is done by setting `taint_assume_safe_functions: true` under the rule [`options`](/writing-rules/rule-syntax/#options) key. If you use this approach, you have to enumerate your taint propagators:

<iframe src="https://semgrep.dev/embed/editor?snippet=gBD0" border="0" frameBorder="0" width="100%" height="432"></iframe>

Similarly, by default, Semgrep assumes that indexing an array with a tainted index (that is, `array[tainted]`) is a tainted expression, even if the array itself is not tainted. Set `taint_assume_safe_indexes: true` to instead assume that these expressions are safe.

If you want to have very fine-grained control over how taint is propagated, set `taint_only_propagate_through_assignments: true`, and then Semgrep only propagates taint through trivial assignments of the form `x = tainted`. In this case, you need to specify taint propagators for any other expression that can act as a taint propagator. For example, with this setting `x = taint_propagator(tainted)` or `x = tainted + "foo"` do not propagate any taint from `tainted` to `x` unless it is explicitly specified, whereas by default taint would propagate implicitly.

:::note
Previously, the use of so-called **not conflicting sanitizers** was recommended. This feature is now deprecated and no longer recommended.
:::

## Metavariables, rule message, and unification

The patterns specified by `pattern-sources` and `pattern-sinks` (and `pattern-sanitizers`) are all independent of each other. If a metavariable used in `pattern-sources` has the same name as a metavariable used in `pattern-sinks`, these are still different metavariables.

In the message of a taint-mode rule, you can refer to any metavariable bound by `pattern-sinks`, as well as to any metavariable bound by `pattern-sources` that does not conflict with a metavariable bound by `pattern-sinks`.

Semgrep can also treat metavariables with the same name as the _same_ metavariable, simply set `taint_unify_mvars: true` using rule `options`. Unification enforces that whatever a metavariable binds to in each of these operators is, syntactically speaking, the **same** piece of code. For example, if a metavariable binds to a code variable `x` in the source match, it must bind to the same code variable `x` in the sink match. In general, unless you know what you are doing, avoid metavariable unification between sources and sinks.

The following example demonstrates the use of source and sink metavariable unification:

<iframe src="https://semgrep.dev/embed/editor?snippet=G652" border="0" frameBorder="0" width="100%" height="432"></iframe>
