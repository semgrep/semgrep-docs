---
slug: advanced
title: Advanced techniques for taint analysis
hide_title: true
description: Learn advanced techniques for taint mode, which allows you to write rules to catch complex injection bugs.
tags:
 - Rule writing
 - Dataflow analysis
 - Taint analysis
---

# Advanced taint analysis techniques

This page covers advanced taint analysis techniques for use when writing rules to catch complex injection bugs. If you are new to writing taint mode rules, begin with [Overview](/writing-rules/data-flow/taint-mode/overview).

## Taint by side effect

### Taint sources by side effect

Consider the following Python code, where `make_tainted` is a function that makes its argument tainted by side effect:

```python
make_tainted(my_set)
sink(my_set)
```

This kind of source can be specified by setting `by-side-effect: true`:

```yaml
pattern-sources:
 - patterns:
    - pattern: make_tainted($X)
    - focus-metavariable: $X
   by-side-effect: true
```

When `by-side-effect: true` is enabled and the source specification matches a variable, or more generally, an [l-value](https://en.wikipedia.org/wiki/Value_(computer_science)#lrvalue) exactly, then Semgrep assumes that the variable, or l-value, becomes tainted by side effect at the places where the source specification produces a match.

<iframe src="https://semgrep.dev/embed/editor?snippet=5r400" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

The matched occurrences themselves are considered tainted; that is, the occurrence of `x` in `make_tainted(x)` is itself tainted too. If you do not want this to be the case, then set `by-side-effect: only` instead.

:::note
You must use `focus-metavariable: $X` to focus the match on the l-value that you want to taint; otherwise, `by-side-effect` does not work.
:::

If the source doesn't set `by-side-effect`, then only the very occurrence of `x` in `make_tainted(x)` will be tainted, not the occurrence of `x` in `sink(x)`. The source specification matches only the first occurrence, and without `by-side-effect: true`, Semgrep does not recognize that `make_tainted` updates the variable `x` by side effect. Thus, a taint rule using such a specification does not produce any finding.

<details>
<summary>Original implementation for tainting variables by side effect</summary>

Before the implementation of `by-side-effect`, the following example was the official workaround to obtain similar behavior:

```yaml
pattern-sources:
- patterns:
   - pattern-inside: |
      make_tainted($X)
      ...
   - pattern: $X
```

This definition says that **every** occurrence of `$X` after `make_tainted($X)` must be considered a source. However, this approach has two main limitations:

1. It overrides any sanitization that can be performed on the code matched by `$X`. In the example code below, the call `sink(x)` is reported as tainted despite `x` having been sanitized!

 ```python
    make_tainted(x)
    x = sanitize(x)
    sink(x) # false positive
 ```

2. The [`...` ellipses operator](/writing-rules/pattern-syntax/#ellipses-and-statement-blocks) has limitations. For example, in the code below, Semgrep does not match any finding if such a source specification is in use:

 ```python
    if cond:
     make_tainted(x)
    sink(x) # false negative
 ```
</details>

### Taint sanitizers by side-effect

Consider the following Python code, where it is guaranteed that, after `check_if_safe(x)`, the value of `x` must be a safe one.

```python
x = source()
check_if_safe(x)
sink(x)
```

This kind of sanitizer can be specified by setting `by-side-effect: true`:

```yaml
pattern-sanitizers:
   - patterns:
      - pattern: check_if_safe($X)
      - focus-metavariable: $X
     by-side-effect: true
```

If you enable `by-side-effect` and the sanitizer specification matches a variable, or more generally, an l-value, exactly, Semgrep assumes that the variable or l-value is sanitized by side effect at the places where the sanitizer specification produces a match.

<iframe src="https://semgrep.dev/embed/editor?snippet=4bvGz" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

If the sanitizer doesn't set by side effect, then only the very occurrence of `x` in `check_if_safe(x)` is sanitized and *not* the occurrence of `x` in `sink(x)`. The sanitizer specification matches only the first occurrence, and without `by-side-effect: true`, Semgrep doesn't know that `check_if_safe` updates and sanitizes the variable `x` by side effect. Thus, a taint rule using such a specification does produce a finding for `sink(x)` in the preceding example.

:::note
Ensure that you use `focus-metavariable: $X` to focus the match on the l-value that you want to sanitize. Otherwise, `by-side-effect` does not work as expected.
:::

<details>
<summary>Original implementation for tainting sanitizers by side effect</summary>

Before the implementation of `by-side-effect`, the following example was the official workaround to obtain similar behavior:

```yaml
pattern-sanitizers:
- patterns:
   - pattern-inside: |
      check_if_safe($X)
      ...
   - pattern: $X
```

This specification tells Semgrep that **every** occurrence of `$X` after `check_if_safe($X)` must be considered sanitized.

This approach has two main limitations:

1. It overrides any further tainting that can be performed on the code matched by `$X`. In the following example, the call `sink(x)` is **not** reported as tainted despite `x` having been tainted:
 ```python
    check_if_safe(x)
    x = source()
    sink(x) # false negative
 ```
2. The [`...` ellipses operator](/writing-rules/pattern-syntax/#ellipses-and-statement-blocks) has limitations. For example, in the following code, Semgrep still returns matches despite `x` having been sanitized in both branches:
 ```python
    if cond:
     check_if_safe(x)
    else
     check_if_safe(x)
    sink(x) # false positive
 ```

</details>

## Taint function arguments

### Taint function arguments as sources

To specify that an argument of a function must be considered a taint source, you can write a pattern that matches the argument:

```yaml
pattern-sources:
   - patterns:
      - pattern-inside: |
         def foo($X, ...):
         ...
      - focus-metavariable: $X
```

Note that the use of `focus-metavariable: $X` is essential, and using `pattern: $X` is **not** equivalent. With `focus-metavariable: $X`, Semgrep matches the formal parameter exactly. Click "Open in Playground" below and use "Inspect Rule" to visualize what the source is matching.

<iframe src="https://semgrep.dev/embed/editor?snippet=L1vJ6" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

The subsequent example defines the same behavior with a taint rule that uses `pattern: $X`. The `pattern: $X` does not match the formal parameter itself, but matches all its uses inside the function definition. Even if `x` is sanitized via `x = sanitize(x)`, the occurrence of `x` inside `sink(x)` is a taint source itself (due to `pattern: $X`) and so `sink(x)` is tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=Qr3Y4" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

### Taint function arguments as sinks

You can specify that only one, or a subset, of the arguments of a function is the actual sink by using `focus-metavariable`:

```javascript
pattern-sinks:
  - patterns:
    - pattern: sink($SINK, ...)
    - focus-metavariable: $SINK
```


This rule causes Semgrep only to annotate the first parameter passed to `sink` as the sink, rather than the function `sink` itself. If taint goes into any other parameter of `sink`, then that is not considered a problem.

<iframe src="https://semgrep.dev/embed/editor?snippet=v83Nl" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

Anything that you can match with Semgrep can be made into a sink, such as the index in an array access:

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $ARRAY[$SINK]
    - focus-metavariable: $SINK
```


:::note
If you specify a sink such as `sink(...)`, then any tainted data passed to `sink`, through any of its arguments, results in a finding.

<iframe src="https://semgrep.dev/embed/editor?snippet=OrAAe" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>
:::

## Custom propagators

To better understand custom propagators, consider the following Python code where an unsafe `user_input` is stored in a `set` data structure. A random element from `set` is then passed into a `sink` function. This random element can be `user_input` itself, leading to an injection vulnerability.


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

The use of **taint propagators** enables Semgrep to propagate taint in this scenario and others.

Taint propagators are specified under the `pattern-propagators` key:

```yaml
pattern-propagators:
- pattern: $S.add($E)
  from: $E
  to: $S
```

In the preceding example, Semgrep finds the pattern `$S.add($E)`, and it checks whether the code matched by `$E` is tainted. If it is tainted, Semgrep propagates that same taint to the code matched by `$S`. Thus, adding tainted data to a set marks the set itself as tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=dGRE" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

Note that `s` becomes tainted _by side effect_ after `s.add(x)`. This is due to `by-side-effect: true` being the default for propagators, and because `s` is an l-value.

In general, a taint propagator must specify the following requirements:

1. A pattern containing **two** metavariables. These two metavariables specify where taint is propagated **from** and **to**.
2. The `to` and `from` metavariables. These metavariables must match an **expression**.
    - The `from` metavariable specifies the entry point of the taint.
    - The `to` metavariable specifies where the tainted data is propagated to, typically an object or data structure. If option `by-side-effect` is enabled (as it is by default) and the `to` metavariable matches an l-value, the propagation is side-effectful.

In the preceding example, pattern `$S.add($E)` includes two metavariables `$S` and `$E`. Given `from: $E`, `to: $S`, `$E` matching `x`, and `$S` matching `s`, when `x` is tainted, then `s` becomes tainted by side-effect with the same taint as `x`.

Another situation where taint propagators are useful is specifying in Java that, when iterating a collection that is tainted, the individual elements must also be considered tainted:


```yaml
pattern-propagators:
- pattern: $C.forEach(($X) -> ...)
  from: $C
  to: $X
```

### Propagate without side-effect

Taint propagators can be used in many different ways, and in some cases, you might not want taint to propagate by side effect. You can avoid this behavior by disabling `by-side-effect`, which is enabled by default.


```yaml
pattern-propagators:
  - pattern: |
       if something($FROM):
          ...
          $TO()
          ...
    from: $FROM
    to: $TO
    by-side-effect: false
```

The preceding propagator definition specifies that inside an `if` block, where the condition is `something($FROM)`, we want to propagate taint from `$FROM` to any function that is being called without arguments, `$TO()`.

<iframe src="https://semgrep.dev/embed/editor?snippet=4bv6x" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

Because the rule turns off `by-side-effect`, the `sink` occurrence that is inside the `if` block is tainted, but this does not affect the `sink` occurrence outside the `if` block.

## Minimize false positives

The following [rule options](/writing-rules/rule-syntax/#options) can be used to minimize false positives:

| Rule option | Default | Description |
| - | - | - |
| `taint_assume_safe_booleans` | `false` | Boolean data is never considered tainted (works better with type annotations). |
| `taint_assume_safe_numbers` | `false` | Numbers (integers, floats) are never considered tainted (works better with type annotations). |
| `taint_assume_safe_indexes` | `false` | An index expression `I` tainted does not make an access expression `E[I]` tainted (it is only tainted if `E` is tainted). |
| `taint_assume_safe_functions` | `false` | A function call like `F(E)` is not considered tainted even if `E` is tainted. Note: When using Pro's [interprocedural taint analysis](/writing-rules/data-flow/taint-mode/overview#interprocedural-analysis-), this only applies to functions for which Semgrep cannot find a definition. |
| `taint_only_propagate_through_assignments` 🧪 | `false` | Disables all implicit taint propagation except for assignments. |

### Restrict taint by type 🧪

Semgrep automatically sanitizes Boolean expressions when it can infer that the expression resolves to a Boolean if you enable the `taint_assume_safe_booleans` option.

For example, comparing a tainted string against a constant string isn't considered a tainted expression:

<iframe src="https://semgrep.dev/embed/editor?snippet=6JvzK" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

Similarly, by enabling `taint_assume_safe_numbers`, Semgrep automatically sanitizes numeric expressions when it can infer that the expression is numeric.

<iframe src="https://semgrep.dev/embed/editor?snippet=oqjgX" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

You could define explicit sanitizers that clean the taint from Boolean or numeric expressions, but these options are more convenient and also more efficient.

:::note
Semgrep Pro's ability to infer types for expressions varies depending on the language. For example, in Python, type annotations are not always present, and the `+` operator can also be used to concatenate strings. Semgrep also ignores the types of functions and classes coming from third-party libraries.

<iframe src="https://semgrep.dev/embed/editor?snippet=zdjnn" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>
:::


### Assume tainted indexes are safe

By default, Semgrep assumes that accessing an array-like object with a tainted index (that is, `obj[tainted]`) is itself a tainted **expression**, even if the **object** itself is not tainted. Setting `taint_assume_safe_indexes: true` makes Semgrep assume that these expressions are safe.

<iframe src="https://semgrep.dev/embed/editor?snippet=X56pj" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

### Assume function calls are safe

:::note
A function call is referred to as _opaque_ when Semgrep doesn't have access to its definition, which is necessary to examine it and determine its taint behavior. For example, with an opaque function, Semgrep cannot determine whether a function call propagates any taint that comes through its inputs.

In Semgrep Community Edition (CE), where taint analysis is intraprocedural, all function calls are opaque. In Semgrep Pro, with [interprocedural taint analysis](/writing-rules/data-flow/taint-mode/overview#interprocedural-analysis-), an opaque function could originate from a third-party library.
:::

By default, Semgrep assumes that an _opaque_ function call propagates any taint passed through any of its arguments to its output.

For example, in the following code snippet, `some_safe_function` receives tainted data as input, so Semgrep assumes that it also returns tainted data as output. As a result, a finding is produced.


```javascript
var x = some_safe_function(tainted);
sink(x); // undesired finding here
```

This rule can generate false positives, and in some cases, it produces a high level of noise. Setting `taint_assume_safe_functions: true` makes Semgrep assume that opaque function calls are safe and do not propagate any taint. If you'd like specific functions to propagate taint without generating a finding, you can do so using custom propagators:

<iframe src="https://semgrep.dev/embed/editor?snippet=gBD0" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

### Propagate only through assignments 🧪

Setting `taint_only_propagate_through_assignments: true` makes Semgrep propagate taint through trivial assignments of the form `<l-value> = <tainted-expression>` only. It requires the user to be explicit about any other kind of taint propagation that is to be performed.

For example, neither `unsafe_function(tainted)` nor `tainted_string + "foo"` will be considered tainted expressions:

<iframe src="https://semgrep.dev/embed/editor?snippet=bwekv" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

## Metavariables, rule messages, and unification

The patterns specified by `pattern-sources` and `pattern-sinks` (and `pattern-sanitizers`) are all independent of each other. If a metavariable used in `pattern-sources` has the same name as a metavariable used in `pattern-sinks`, these are considered to be different metavariables.

In the message of a taint-mode rule, you can refer to any metavariable bound by `pattern-sinks`, as well as to any metavariable bound by `pattern-sources` that does not conflict with a metavariable bound by `pattern-sinks`.

Semgrep can also treat metavariables with the same name as the _same_ metavariable; to turn this behavior on, set `taint_unify_mvars: true` using rule `options`. Unification enforces the behavior where whatever a metavariable binds to in each of these operators is, syntactically speaking, the **same** piece of code. For example, if a metavariable binds to a code variable `x` in the source match, it must bind to the same code variable `x` in the sink match. In general, unless you know what you are doing, avoid metavariable unification between sources and sinks.

The following example demonstrates the use of source and sink metavariable unification:

<iframe src="https://semgrep.dev/embed/editor?snippet=G652" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>


## Taint mode sensitivity

### Field sensitivity

The taint engine provides basic field sensitivity support. It can:
- Track that `x.a.b` is tainted, but `x` or `x.a` is  **not** tainted. If `x.a.b` is tainted, any extension of `x.a.b` (such as `x.a.b.c`) is considered tainted by default.
- Track that `x.a` is tainted, but remember that `x.a.b` has been sanitized. Thus, the engine records that `x.a.b` is **not** tainted, but `x.a` or `x.a.c` are still tainted.

:::note
The taint engine tracks taint **per variable**, *not* **per object in memory**. The taint engine does not track aliasing.
:::

<iframe src="https://semgrep.dev/embed/editor?snippet=5rvkj" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

### Index sensitivity 🧪

:::note
Index sensitivity is a Semgrep Pro feature.
:::

Semgrep Pro has basic index sensitivity support:

- This feature is only for access using the built-in `a[E]` syntax.
- This feature works for _statically constant_ indexes that are integers, such as `a[42]` or strings, such as `a["foo"]`.
- If an arbitrary index `a[i]` is sanitized, then every index becomes clean of taint.

<iframe src="https://semgrep.dev/embed/editor?snippet=GdoK6" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

## Report findings on the source 🧪

:::note
Reporting findings on the source of taint is a Semgrep Pro feature.
:::

By default, Semgrep reports taint findings at the location of the sink being matched. You must examine the taint trace to identify the source of the taint. However, you can also have Semgrep report the findings at the location of the taint sources by setting the [rule-level option](/writing-rules/rule-syntax/#options) `taint_focus_on` to `source`:

```yaml
options:
  taint_focus_on: source
```

<iframe src="https://semgrep.dev/embed/editor?snippet=JDPGP" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

The [deduplication of findings](/writing-rules/data-flow/taint-mode/overview#deduplication-of-findings) still applies in this case. While Semgrep reports all the taint sources, the taint trace only informs you of one sink if a taint source can reach multiple sinks.

## Restrict taint to at-exit sinks 🧪

:::note
At-exit taint sinks is a Semgrep Pro feature.
:::

At-exit sinks are meant to facilitate writing leak-detection rules using taint mode. By setting `at-exit: true`, you can restrict a sink specification to only match at exit statements, or statements after which the control-flow will exit the function being analyzed.

```yaml
pattern-sinks:
- pattern-either:
   - pattern: return ...
   - pattern: $F(...)
   at-exit: true
```

The preceding sink pattern matches either `return` statements, which are always exit statements, or function calls occurring as exit statements.

Unlike regular sinks, at-exit sinks trigger a finding if any tainted l-value reaches the location of the sink. For example, the preceding at-exit sink specification triggers a finding at a `return 0` statement if some tainted l-value reaches the `return`, even if `return 0` itself is not tainted. The location itself is the sink, rather than the code that is located there.

You can use behavior, for example, to check that file descriptors are being closed within the same function where they were opened.

<iframe src="https://semgrep.dev/embed/editor?snippet=OrAzB" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

The `print(content)` statement is reported because the control flow exits the function at that point, and the file has not been closed.

## Track control sources 🧪

:::note
Control taint sources is a Semgrep Pro feature.
:::

Typically, taint analysis tracks the flow of tainted _data_, but taint sources can also track the flow of tainted _control_ by setting `control: true`.

```yaml
pattern-sources:
- pattern: source(...)
  control: true
```

This is useful for checking reachability, that is, to determine if control flow from a given code location can reach another code location, regardless of whether there is any data flow between them. In the following example, SEmgrep checks whether `foo()` could be followed by `bar()`:

<iframe src="https://semgrep.dev/embed/editor?snippet=yyjrx" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

By using a control source, you can define a context from which Semgrep detects if a call to some other code, such as a sink, can be reached.

:::note
Use [taint labels](#taint-labels-) to combine both data and control sources in the same rule.
:::

## Taint labels 🧪

Taint labels increase the expressiveness of taint analysis by allowing you to specify and track different kinds of tainted data in one rule using labels. This functionality is helpful for more complex use cases, such as when data becomes dangerous in several steps that are hard to specify through a single pair of source and sink.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/lAbJdzMUR4k" frameborder="0" allowfullscreen></iframe>

To include taint labels in a taint mode rule, follow these steps:


1. Attach a `label` key to the taint source, such as `label: TAINTED` or `label: INPUT`:
 ```yaml
pattern-sources:
   - pattern: user_input
         label: INPUT
 ```
 Semgrep accepts any valid Python identifier as a label.

2. Restrict a taint source to a subset of labels using the `requires` key. The following sample extends the previous example with `requires: INPUT`:
 ```yaml
pattern-sources:
   - pattern: user_input
     label: INPUT
   - pattern: evil(...)
     requires: INPUT
     label: EVIL
 ```
 Combine labels using the `requires` key. To do so, use Python's Boolean operators, such as `requires: LABEL1 and not LABEL2`.

3. Use the `requires` key to restrict a taint sink in the same way as source:
 ```yaml
        pattern-sinks:
     - pattern: sink(...)
            requires: EVIL
 ```
 The extra taint is only produced if the source itself is tainted and satisfies the `requires` formula.

In the following example, assume that `user_input` is dangerous, but only when it passes through the `evil` function. This can be specified with taint labels as follows:

<iframe src="https://semgrep.dev/embed/editor?snippet=PwKY" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>


<!--
TODO: For some reason the embedded editor doesn't like the rule, even though the Playground can run it.

Interestingly, you can (ab)use taint labels to write some [typestate analyses](https://en.wikipedia.org/wiki/Typestate_analysis)!

<iframe src="https://semgrep.dev/embed/editor?snippet=DYxo" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>
-->

### Multiple `requires` expressions in taint labels

You can assign an independent `requires` expression to each metavariable matched by a sink. Given `$OBJ.foo($ARG)`, you can require that `$OBJ` has label `XYZ` and `$ARG` has label TAINTED, and `focus-metavariable: $ARG`:

```
pattern-sinks:
- patterns:
   - pattern: $OBJ.foo($SINK, $ARG)
   - focus-metavariable: $SINK
  requires:
   - $SINK: BAD
   - $OBJ: AAA
   - $ARG: BBB
```
