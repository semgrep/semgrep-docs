---
slug: taint-mode
append_help_link: true
description: >-
  Taint mode allows you to write simple rules that catch complex injection bugs thanks to taint analysis.
---

# Taint analysis

Semgrep supports [taint analysis](https://en.wikipedia.org/wiki/Taint_checking) (or taint tracking) through taint rules (specified by adding `mode: taint` to your rule). Taint analysis is a data-flow analysis that tracks the flow of untrusted, or **tainted** data throughout the body of a function or method. Tainted data originate from tainted **sources**. If tainted data are not transformed or checked accordingly (**sanitized**), taint analysis reports a finding whenever tainted data reach a vulnerable function, called a **sink**. Tainted data flow from sources to sinks through **propagators**, such as assignments, or function calls.

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

Finally, the rule specifies that anything matching either `html_output(...)` or `eval(...)` should be regarded as a sink. There are two calls `html_output(data)` that are both labeled as sinks. The first one in `route1` is not reported because `data` is sanitized before reaching the sink, whereas the second one in `route2` is reported because the `data` that reaches the sink is still tainted.

You can find more examples of taint rules in the [Semgrep Registry](https://semgrep.dev/r?owasp=injection%2Cxss), for instance: [express-sandbox-code-injection](https://semgrep.dev/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection).

:::info
[Metavariables](../../pattern-syntax/#metavariables) used in `pattern-sources` are considered _different_ from those used in `pattern-sinks`, even if they have the same name! See [Metavariables, rule message, and unification](#metavariables-rule-message-and-unification) for further details.
:::

## Sources

A taint source is specified by a pattern. Like in a search-mode rule, you can start this pattern with one of the following keys: `pattern`, `patterns`, `pattern-either`, `pattern-regex`. Note that **any** subexpression that is matched by this pattern will be regarded as a source of taint.

In addition, taint sources accept the following options:

| Option            | Type                      | Default | Description                                                            |
| :-----------------|:------------------------- | :------ | :--------------------------------------------------------------------- |
| `exact`           | {`false`, `true`}         | `false` | See [_Exact sources_](#exact-sources).                                 |
| `by-side-effect`  | {`false`, `true`, `only`} | `false` | See [_Sources by side-effect_](#sources-by-side-effect).               |
| `control` (Pro) 🧪 | {`false`, `true`}         | `false` | See [_Control sources_](#control-sources-pro-).                           |

Example:

```yaml
pattern-sources:
- pattern: source(...)
```

### Exact sources

Given the source specification below, and a piece of code such as `source(sink(x))`, the call `sink(x)` is reported as a tainted sink.

```yaml
pattern-sources:
- pattern: source(...)
```

The reason is that the pattern `source(...)` matches all of `source(sink(x))`, and that makes Semgrep consider every subexpression in that piece of code as being a source. In particular, `x` is a source, and it is being passed into `sink`!

<iframe src="https://semgrep.dev/embed/editor?snippet=eqYN8" border="0" frameBorder="0" width="100%" height="432"></iframe>

This is the default for historical reasons, but it may change in the future.

It is possible to instruct Semgrep to only consider as taint sources the "exact" matches of a souce pattern by setting `exact: true`:

```yaml
pattern-sources:
- pattern: source(...)
  exact: true
```

Once the source is "exact", Semgrep will no longer consider subexpressions as taint sources, and `sink(x)` inside `source(sink(x))` will not be reported as a tainted sink (unless `x` is tainted in some other way).

<iframe src="https://semgrep.dev/embed/editor?snippet=Zq5ow" border="0" frameBorder="0" width="100%" height="432"></iframe>

For many rules this distinction is not very meaningful because it does not always make sense that a sink occurs inside the arguments of a source function.

:::note
If one of your rules relies on non-exact matching of sources, we advice you to make it explicit with `exact: false`, even if it is the current default, so that your rule does not break if the default changes.
:::

### Sources by side-effect

Consider the following hypothetical Python code, where `make_tainted` is a function that makes its argument tainted by side-effect:

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

When this option is enabled, and the source specification matches a variable (or in general, an [l-value](https://en.wikipedia.org/wiki/Value_(computer_science)#lrvalue)) exactly, then Semgrep assumes that the variable (or l-value) becomes tainted by side-effect at the precise places where the source specification produces a match.

<iframe src="https://semgrep.dev/embed/editor?snippet=5r400" border="0" frameBorder="0" width="100%" height="432"></iframe>

The matched occurrences themselves are considered tainted; that is, the occurrence of `x` in `make_tainted(x)` is itself tainted too. If you do not want this to be the case, then set `by-side-effect: only` instead.

:::note
You must use `focus-metavariable: $X` to focus the match on the l-value that you want to taint, otherwise `by-side-effect` does not work.
:::

If the source does not set `by-side-effect`, then only the very occurrence of `x` in `make_tainted(x)` will be tainted, but not the occurrence of `x` in `sink(x)`. The source specification matches only the first occurrence and, without `by-side-effect: true`, Semgrep does not know that `make_tainted` is updating the variable `x` by side-effect. Thus, a taint rule using such a specification does not produce any finding.

:::info
You could be tempted to write a source specification as the following example (and this was the official workaround before `by-side-effect`):

```yaml
pattern-sources:
- patterns:
  - pattern-inside: |
      make_tainted($X)
      ...
  - pattern: $X
```

This tells Semgrep that **every** occurrence of `$X` after `make_tainted($X)` must be considered a source.

This approach has two main limitations. First, it overrides any sanitization that can be performed on the code matched by `$X`.  In the example code below, the call `sink(x)` is reported as tainted despite `x` having been sanitized!

```python
make_tainted(x)
x = sanitize(x)
sink(x) # false positive
```

Note also that [`...` ellipses operator](/writing-rules/pattern-syntax/#ellipses-and-statement-blocks) has limitations. For example, in the code below Semgrep does not match any finding if such source specification is in use:

```python
if cond:
    make_tainted(x)
sink(x) # false negative
```

The `by-side-effect` option was added precisely [to address those limitations](https://semgrep.dev/playground/s/JDv4y). However, that kind of workaround can still be useful in other situations!
:::

### Function arguments as sources

To specify that an argument of a function must be considered a taint source, simply write a pattern that matches that argument:

```yaml
pattern-sources:
  - patterns:
    - pattern-inside: |
        def foo($X, ...):
          ...
    - focus-metavariable: $X
```

Note that the use of `focus-metavariable: $X` is very important, and using `pattern: $X` is **not** equivalent. With `focus-metavariable: $X`, Semgrep matches the formal parameter exactly. Click "Open in Playground" below and use "Inspect Rule" to visualize what the source is matching.

<iframe src="https://semgrep.dev/embed/editor?snippet=L1vJ6" border="0" frameBorder="0" width="100%" height="432"></iframe>

The following example does the same with this other taint rule that uses `pattern: $X`. The `pattern: $X` does not match the formal parameter itself, but matches all its uses inside the function definition. Even if `x` is sanitized via `x = sanitize(x)`, the occurrence of `x` inside `sink(x)` is a taint source itself (due to `pattern: $X`) and so `sink(x)` is tainted!

<iframe src="https://semgrep.dev/embed/editor?snippet=Qr3Y4" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Control sources (Pro) 🧪

**Control taint sources is a Semgrep Pro feature.**

Typically taint analysis tracks the flow of tainted _data_, but taint sources can also track the flow of tainted _control_ by setting `control: true`.

```yaml
pattern-sources:
- pattern: source(...)
  control: true
```

This is useful for checking _reachability_, that is to check if from a given code location the control-flow can reach another code location, regardless of whether there is any flow of data between them. In the following example we check whether `foo()` could be followed by `bar()`:

<iframe src="https://semgrep.dev/embed/editor?snippet=yyjrx" border="0" frameBorder="0" width="100%" height="432"></iframe>

By using a control source, you can define a context from which Semgrep detects if a call to some other code, such as a sink, can be reached.

:::note
Use [taint labels](#taint-labels-pro-) to combine both data and control sources in the same rule.
:::

## Sanitizers

A taint sanitizer is specified by a pattern. Like in a search-mode rule, you can start this pattern with one of the following keys: `pattern`, `patterns`, `pattern-either`, `pattern-regex`. Note that **any** subexpression that is matched by this pattern will be regarded as sanitized.

In addition, taint sanitizers accept the following options:

| Option            | Type                      | Default | Description                                                            |
| :-----------------|:------------------------- | :------ | :--------------------------------------------------------------------- |
| `exact`           | {`false`, `true`}         | `false` | See [_Exact sanitizers_](#exact-sanitizers).                              |
| `by-side-effect`  | {`false`, `true`, `only`} | `false` | See [_Sanitizers by side-effect_](#sanitizers-by-side-effect).         |

Example:

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
```

### Exact sanitizers

Given the sanitizer specification below, and a piece of code such as `sanitize(sink("taint"))`, the call `sink("taint")` is **not** reported.

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
```

The reason is that the pattern `sanitize(...)` matches all of `sanitize(sink("taint"))`, and that makes Semgrep consider every subexpression in that piece of code as being sanitized. In particular, `"taint"` is considered to be sanitized!

<iframe src="https://semgrep.dev/embed/editor?snippet=v83Rb" border="0" frameBorder="0" width="100%" height="432"></iframe>

This is the default for historical reasons, but it may change in the future.

It is possible to instruct Semgrep to only consider as sanitized the "exact" matches of a sanitizer pattern by setting `exact: true`:

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
  exact: true
```

Once the source is "exact", Semgrep will no longer consider subexpressions as sanitized, and `sink("taint")` inside `sanitize(sink("taint"))` will be reported as a tainted sink.

<iframe src="https://semgrep.dev/embed/editor?snippet=Zqz8o" border="0" frameBorder="0" width="100%" height="432"></iframe>

For many rules this distinction is not very meaningful because it does not always make sense that a sink occurs inside the arguments of a sanitizer function.

:::note
If one of your rules relies on non-exact matching of sanitizers, We at Semgrep advise you to make it explicit with `exact: false`, even if it is the current default, so that your rule does not break if the default changes.
:::

### Sanitizers by side-effect

Consider the following hypothetical Python code, where it is guaranteed that after `check_if_safe(x)`, the value of `x` must be a safe one.

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
When this option is enabled, and the sanitizer specification matches a variable (or in general, an l-value) exactly, then Semgrep assumes that the variable (or l-value) is sanitized by side-effect at the precise places where the sanitizer specification produces a match.

<iframe src="https://semgrep.dev/embed/editor?snippet=4bvGz" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::note
It is important to use `focus-metavariable: $X` to focus the match on the l-value that we want to sanitize, otherwise `by-side-effect` does not work as expected.
:::

If the sanitizer does not set `by-side-efect`, then only the very occurrence of `x` in `check_if_safe(x)` will be sanitized, but not the occurrence of `x` in `sink(x)`. The sanitizer specification matches only the first occurrence and, without `by-side-effect: true`, Semgrep does not know that `check_if_safe` is updating/sanitizing the variable `x` by side-effect. Thus, a taint rule using such specification does produce a finding for `sink(x)` in the example above.

:::info
You can be tempted to write a sanitizer specification as the one below (and this was the official workaround before `by-side-effect`):

```yaml
pattern-sanitizers:
- patterns:
  - pattern-inside: |
      check_if_safe($X)
      ...
  - pattern: $X
```

This tells Semgrep that **every** occurrence of `$X` after `check_if_safe($X)` must be considered santized.

This approach has two main limitations. First, it overrides any further tainting that can be performed on the code matched by `$X`.  In the example code below, the call `sink(x)` is  **not** reported as tainted despite `x` having been tainted!

```python
check_if_safe(x)
x = source()
sink(x) # false negative
```

Note also that [`...` ellipses operator](/writing-rules/pattern-syntax/#ellipses-and-statement-blocks) has limitations. For example, in the code below Semgrep still matches despite `x` having been sanitized in both branches:

```python
if cond:
    check_if_safe(x)
else
    check_if_safe(x)
sink(x) # false positive
```

The `by-side-effect` option was added precisely [to address those limitations](https://semgrep.dev/playground/s/PeB3W). However, that kind of workaround can still be useful in other situations!
:::

## Sinks

A taint sink is specified by a pattern. Like in a search-mode rule, you can start this pattern with one of the following keys: `pattern`, `patterns`, `pattern-either`, `pattern-regex`. Unlike sources and sanitizers, by default Semgrep does not consider the subexpressions of the matched expressions as sinks.

In addition, taint sinks accept the following options:

| Option    | Type              | Default | Description                                                            |
| :---------| :-----------------| :------ | :--------------------------------------------------------------------- |
| `exact`   | {`false`, `true`} | `true`  | See [_Non-exact sinks_](#non-exact-sinks).                             |
| `at-exit` (Pro) 🧪 | {`false`, `true`} | `false` | See [_At-exit sinks_](#at-exit-sinks-pro-).                   |

Example:

```yaml
pattern-sinks:
- pattern: sink(...)
```

### Non-exact sinks

Given the sink specification below, a piece of code such as `sink("foo" if tainted else "bar")` will **not** be reported as a tainted sink.

```yaml
pattern-sources:
- pattern: sink(...)
```

This is because Semgrep considers that the sink is the argument of the `sink` function, and the actual argument being passed is `"foo" if tainted else "bar"` that evaluates to either `"foo"` or `"bar"`, and neither of them are tainted.

<iframe src="https://semgrep.dev/embed/editor?snippet=KxJ17" border="0" frameBorder="0" width="100%" height="432"></iframe>

It is possible to instruct Semgrep to consider as a taint sink any of the subexpressions matching the sink pattern, by setting `exact: false`:

```yaml
pattern-sinks:
- pattern: sink(...)
  exact: false
```

Once the sink is "non-exact", Semgrep will consider subexpressions as taint sinks, and `tainted` inside `sink("foo" if tainted else "bar")` will then be reported as a tainted sink.

<iframe src="https://semgrep.dev/embed/editor?snippet=qNwez" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Function arguments as sinks

We can specify that only one (or a susbet) of the arguments of a function is the actual sink by using `focus-metavariable`:

```javascript
pattern-sinks:
  - patterns:
    - pattern: sink($SINK, ...)
    - focus-metavariable: $SINK
```

This rule causes Semgrep to only annotate the first parameter passed to `sink` as the sink, rather than the function `sink` itself. If taint goes into any other parameter of `sink`, then that is not considered a problem.

<iframe src="https://semgrep.dev/embed/editor?snippet=v83Nl" border="0" frameBorder="0" width="100%" height="432"></iframe>

Anything that you can match with Semgrep can be made into a sink, like the index in an array access:

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $ARRAY[$SINK]
    - focus-metavariable: $SINK
```

:::note
If you specify a sink such as `sink(...)` then any tainted data passed to `sink`, through any of its arguments, results in a finding.

<iframe src="https://semgrep.dev/embed/editor?snippet=OrAAe" border="0" frameBorder="0" width="100%" height="432"></iframe>
:::

### At-exit sinks (Pro) 🧪

**At-exit taint sinks is a Semgrep Pro feature.**

At-exit sinks are meant to facilitate writing leak-detection rules using taint mode. By setting `at-exit: true` you can restrict a sink specification to only match at "exit" statements, that is statements after which the control-flow will exit the function being analyzed.

```
pattern-sinks:
- pattern-either:
  - pattern: return ...
  - pattern: $F(...)
  at-exit: true
```

The above sink pattern matches either `return` statements (which are always "exit" statements), or function calls occuring as "exit" statements.

Unlike regular sinks, at-exit sinks trigger a finding if any tainted l-value reaches the location of the sink. For example, the at-exit sink specification above will trigger a finding at a `return 0` statement if some tainted l-value reaches the `return`, even if `return 0` itself is not tainted. The location itself is the sink rather than the code that is at that location.

You can use this, for example, to check that file descriptors are being closed within the same function where they were opened.

<iframe src="https://semgrep.dev/embed/editor?snippet=OrAzB" border="0" frameBorder="0" width="100%" height="432"></iframe>

The `print(content)` statement is reported because the control flow exits the function at that point, and the file has not been closed.

## Propagators (Pro)

**Custom taint propagators is a Semgrep Pro feature.**

By default, tainted data automatically propagates through assignments, operators, and function calls (from inputs to output). However, there are other ways in which taint can propagate, which can require language or library-specific knowledge that Semgrep does not have built-in.

A taint propagator requires a pattern to be specified. Like in a search-mode rule, you can start this pattern with one of the following keys: `pattern`, `patterns`, `pattern-either`, `pattern-regex`.

A propagator also needs to specify the origin (`from`) and the destination (`to`) of the taint to be propagated.

| Field      | Type                       | Description                                                            |
| :----------|:------------------------- | :--------------------------------------------------------------------- |
| `from`     | metavariable              | Source of propagation. |
| `to`       | metavariable              | Destination of propagation. |

In addition, taint propagators accept the following options:

| Option            | Type                      | Default | Description                                                            |
| :-----------------|:------------------------- | :------ | :--------------------------------------------------------------------- |
| `by-side-effect`  | {`false`, `true`} | `true` | See [_Propagation without side-effect_](#propagation-without-side-effect).               |

For example, given the following propagator, if taint goes into the second argument of `strcpy`, its first argument will get the same taint:

```yaml
pattern-propagators:
- pattern: strcpy($DST, $SRC)
  from: $SRC
  to: $DST
```

:::info
Taint propagators only work intra-procedurally, that is, within a function or method. You cannot use taint propagators to propagate taint across different functions/methods. Use [inter-procedural analysis](#inter-procedural-analysis-pro).
:::

### Understanding custom propagators

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

Note that `s` becomes tainted _by side-effect_ after `s.add(x)`, this is due to `by-side-effect: true` being the default for propagators, and because `s` is an l-value.

In general, a taint propagator must specify:
1. A pattern containing **two** metavariables. These two metavariables specify where taint is propagated **from** and **to**.
2. The `to` and `from` metavariables. These metavariables should match an **expression**.
    - The `from` metavariable specifies the entry point of the taint.
    - The `to` metavariable specifies where the tainted data is propagated to, typically an object or data structure. If option `by-side-effect` is enabled (as it is by default) and the `to` metavariable matches an l-value, the propagation is side-effectful.

In the example above, pattern `$S.add($E)` includes two metavariables `$S` and `$E`. Given `from: $E` and `to: $S`, and with `$E` matching `x` and `$S` matching `s`, when `x` is tainted then `s` becomes tainted (by side-effect) with the same taint as `x`.

Another situation where taint propagators can be useful is to specify in Java that, when iterating a collection that is tainted, the individual elements must also be considered tainted:

```yaml
pattern-propagators:
- pattern: $C.forEach(($X) -> ...)
  from: $C
  to: $X
```

### Propagation without side-effect

Taint propagators can be used in very imaginative ways, and in some cases you may not want taint to propagate by side-effect. This can be achieved by disabling `by-side-effect`, which is enabled be default.

For example:

```yaml
pattern-propagators:
  - patterns:
    - pattern: |
        if something($FROM):
          ...
          $TO()
          ...
    from: $FROM
    to: $TO
    by-side-effect: false
```

The propagator above specifies that inside an `if` block, where the condition is `something($FROM)`, we want to propagate taint from `$FROM` to any function that is being called without arguments, `$TO()`.

<iframe src="https://semgrep.dev/embed/editor?snippet=4bv6x" border="0" frameBorder="0" width="100%" height="432"></iframe>

Because the rule disables `by-side-effect`, the `sink` occurrence that is inside the `if` block is tainted, but this does not affect the `sink` occurrence outside the `if` block.

## Findings

Taint findings are accompanied by a taint trace that explains how the taint flows from source to sink.

<!-- <iframe src="https://semgrep.dev/embed/editor?snippet=KxJRL" border="0" frameBorder="0" width="100%" height="432"></iframe> -->

### Deduplication of findings

Semgrep tracks all the possible ways that taint can reach a sink, but at present it only reports one taint trace among the possible ones. Click "Open in Playground" in the example below, run the example to get one finding, and then ask the Playground to visualize the dataflow of the finding. Even though `sink` can be tainted via `x` or via `y`, the trace will only show you one of these possibiities. If you replace `x = user_input` with `x = "safe"`, then Semgrep will then report the taint trace via `y`.

<iframe src="https://semgrep.dev/embed/editor?snippet=WAYzL" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Report findings on the sources (Pro)

**Reporting findings on the source of taint is a Semgrep Pro feature.**

By default Semgrep reports taint findings at the location of the sink being matched. You must look at the taint trace to identify where the taint is coming from. It is also possible to make Semgrep report the findings at the location of the taint sources, by setting the [rule-level option](/writing-rules/rule-syntax/#options) `taint_focus_on` to `source`. Then

```yaml
options:
  taint_focus_on: source
```

<iframe src="https://semgrep.dev/embed/editor?snippet=JDPGP" border="0" frameBorder="0" width="100%" height="432"></iframe>

The [deduplication of findings](#deduplication-of-findings) still applies in this case. While Semgrep will now report all the taint sources, if a taint source can reach multiple sinks, the taint trace will only inform you about one of them.

## Minimizing false positives

The following [rule options](/writing-rules/rule-syntax/#options) can be used to minimize false positives:

| Rule option                   | Default | Description                                                            |
| :-----------------------------| :------ | :--------------------------------------------------------------------- |
| `taint_assume_safe_booleans`  | `false` | Boolean data is never considered tainted (works better with type annotations). |
| `taint_assume_safe_numbers`   | `false` | Numbers (integers, floats) are never considered tainted (works better with type annotations). |
| `taint_assume_safe_indexes`   | `false` | An index expression `I` tainted does not make an access expression `E[I]` tainted (it is only tainted if `E` is tainted). |
| `taint_assume_safe_functions` | `false` | A function call like `F(E)` is not considered tainted even if `E` is tainted. (When using Pro's [inter-procedural taint analysis](#inter-procedural-analysis-pro), this only applies to functions for which Semgrep cannot find a definition.)  |
| `taint_only_propagate_through_assignments` 🧪 | `false` | Disables all implicit taint propagation except for assignments. |

### Restrict taint by type (Pro)

By enabling `taint_assume_safe_booleans` Semgrep automatically sanitizes Boolean expressions when it can infer that the expression resolves to Boolean.

For example, comparing a tainted string against a constant string will not be considered a tainted expression:

<iframe src="https://semgrep.dev/embed/editor?snippet=6JvzK" border="0" frameBorder="0" width="100%" height="432"></iframe>

Similarly, enabling `taint_assume_safe_numbers` Semgrep will automatically sanitize numeric expressions when it can infer that the expression is numeric.

<iframe src="https://semgrep.dev/embed/editor?snippet=oqjgX" border="0" frameBorder="0" width="100%" height="432"></iframe>

You could define explicit sanitizers that clean the taint from Boolean or numeric expressions, but these options are more convenient and also more efficient. 

:::note
Semgrep Pro's ability to infer types for expressions varies depending on the language. For example, in Python type annotations are not always present, and the `+` operator can also be used to concatenate strings. Semgrep also ignores the types of functions and classes coming from third-party libraries.

<iframe src="https://semgrep.dev/embed/editor?snippet=zdjnn" border="0" frameBorder="0" width="100%" height="432"></iframe>
:::

### Assume tainted indexes are safe

By default, Semgrep assumes that accessing an array-like object with a tainted index (that is, `obj[tainted]`) is itself a tainted **expression**, even if the **object** itself is not tainted. Setting `taint_assume_safe_indexes: true` makes Semgrep assume that these expressions are safe.

<iframe src="https://semgrep.dev/embed/editor?snippet=X56pj" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Assume function calls are safe

:::note
We refer to a function call as _opaque_ when Semgrep does not have access to its definition, in order to examine it and determine its "taint behavior" (e.g., whether the function call propagates or not any taint that comes through its inputs). In Semgrep OSS, where taint analysis is intra-procedural, all function calls are opaque. In Semgrep Pro, with [inter-procedural taint analysis](#inter-procedural-analysis-pro), an opaque function could be one coming from a third-party library.
:::

By default Semgrep considers that an _opaque_ function call propagates any taint passed through any of its arguments to its output.

For example, in the code below, `some_safe_function` receives tainted data as input, so Semgrep assumes that it also returns tainted data as output. As a result, a finding is produced.

```javascript
var x = some_safe_function(tainted);
sink(x); // undesired finding here
```

This can generate false positives, and for certain rules on certain codebases it can produce a high amount of noise.

Setting `taint_assume_safe_functions: true` makes Semgrep assume that opaque function calls are safe and do not propagate any taint. If it is desired that specific functions do propagate taint, then that can be achieved via custom propagators:

<iframe src="https://semgrep.dev/embed/editor?snippet=gBD0" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Propagate only through assignments 🧪

Setting `taint_only_propagate_through_assignments: true` makes Semgrep to only propagate taint through trivial assignments of the form `<l-value> = <tainted-expression>`. It requires the user to be explicit about any other kind of taint propagation that is to be performed.

For example, neither `unsafe_function(tainted)` nor `tainted_string + "foo"` will be considered tainted expressions:

<iframe src="https://semgrep.dev/embed/editor?snippet=bwekv" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Metavariables, rule message, and unification

The patterns specified by `pattern-sources` and `pattern-sinks` (and `pattern-sanitizers`) are all independent of each other. If a metavariable used in `pattern-sources` has the same name as a metavariable used in `pattern-sinks`, these are still different metavariables.

In the message of a taint-mode rule, you can refer to any metavariable bound by `pattern-sinks`, as well as to any metavariable bound by `pattern-sources` that does not conflict with a metavariable bound by `pattern-sinks`.

Semgrep can also treat metavariables with the same name as the _same_ metavariable, simply set `taint_unify_mvars: true` using rule `options`. Unification enforces that whatever a metavariable binds to in each of these operators is, syntactically speaking, the **same** piece of code. For example, if a metavariable binds to a code variable `x` in the source match, it must bind to the same code variable `x` in the sink match. In general, unless you know what you are doing, avoid metavariable unification between sources and sinks.

The following example demonstrates the use of source and sink metavariable unification:

<iframe src="https://semgrep.dev/embed/editor?snippet=G652" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Inter-procedural analysis (Pro)

**Inter-procedural taint analysis is a Semgrep Pro feature.**

[Semgrep Pro](/semgrep-pro-vs-oss/) can perform inter-procedural taint analysis, that is, to track taint across multiple functions.

In the example below, `user_input` is passed to `foo` as input and, from there, flows to the sink at line 3, through a call chain involving three functions. Semgrep is able to track this and report the sink as tainted. Semgrep also provides an inter-procedural taint trace that explains how exactly `user_input` reaches the `sink(z)` statement (click "Open in Playground", then click on "dataflow" in the "Matches" panel).

<iframe src="https://semgrep.dev/embed/editor?snippet=PeBXv" border="0" frameBorder="0" width="100%" height="432"></iframe>

Using the CLI option `--pro-intrafile`, Semgrep will perform inter-procedural (across functions) _intra_-file (within one file) analysis. That is, it will track taint across functions, but it will not cross file boundaries. This is supported for essentially every language, and performance is very close to that of intra-procedural taint analysis.

Using the CLI option `--pro`, Semgrep will perform inter-procedural (across functions) as well as *inter*-file (across files) analysis. Inter-file analysis is only supported for [a subset of languages](/supported-languages/#semgrep-code-language-support). For a rule to run inter-file it also needs to set `interfile: true`:

```yaml
options:
  interfile: true
```

**Memory requirements for inter-file analysis:**
While interfile analysis is more powerful, it also demands more memory resources. The Semgrep team advises a minimum of 4 GB of memory per core, but **recommend 8 GB per core or more**. The amount of memory needed depends on the codebase and on the number of interfile rules being run.

## Taint mode sensitivity

### Field sensitivity

The taint engine provides basic field sensitivity support. It can:

- Track that `x.a.b` is tainted, but `x` or `x.a` is  **not** tainted. If `x.a.b` is tainted, any extension of `x.a.b` (such as `x.a.b.c`) is considered tainted by default.
- Track that `x.a` is tainted, but remember that `x.a.b` has been sanitized. Thus the engine records that `x.a.b` is **not** tainted, but `x.a` or `x.a.c` are still tainted.

:::note
The taint engine does track taint **per variable** and not **per object in memory**. The taint engine does not track aliasing at present.
:::

<iframe src="https://semgrep.dev/embed/editor?snippet=5rvkj" border="0" frameBorder="0" width="100%" height="432"></iframe>

### Index sensitivity (Pro)

**Index sensitivity is a Semgrep Pro feature.**

Semgrep Pro has basic index sensitivity support:
- Only for accesses using the built-in `a[E]` syntax.
- Works for _statically constant_ indexes that may be either integers (e.g. `a[42]`) or strings (e.g. `a["foo"]`).
- If an arbitrary index `a[i]` is sanitized, then every index becomes clean of taint.

<iframe src="https://semgrep.dev/embed/editor?snippet=GdoK6" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Taint labels (Pro) 🧪

Taint labels increase the expressiveness of taint analysis by allowing you to specify and track different kinds of tainted data in one rule using labels. This functionality has various uses, for example, when data becomes dangerous in several steps that are hard to specify through single pair of source and sink.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/lAbJdzMUR4k" frameborder="0" allowfullscreen></iframe>

To include taint labels into a taint mode rule, follow these steps:

1. Attach a `label` key to the taint source. For example, `label: TAINTED` or `label: INPUT`. See the example below:
    ```yaml
      pattern-sources:
        - pattern: user_input
          label: INPUT
    ```
    Semgrep accepts any valid Python identifier as a label.

2. Restrict a taint source to a subset of labels using the `requires` key. Extending the previous example, see the `requires: INPUT` below:
    ```yaml
        pattern-sources:
          - pattern: user_input
            label: INPUT
          - pattern: evil(...)
            requires: INPUT
            label: EVIL
    ```
    Combine labels using the `requires` key. To combine labels, use Python Boolean operators. For example: `requires: LABEL1 and not LABEL2`.

3. Use the `requires` key to restrict a taint sink in the same way as source:
    ```yaml
        pattern-sinks:
          - pattern: sink(...)
            requires: EVIL
    ```

:::info
- Semgrep accepts valid Python identifiers as labels.
- Restrict a source to a subset of labels using the `requires` key. You can combine more labels in the `requires` key using Python Boolean operators. For example: `requires: LABEL1 and not LABEL2`.
- Restrict a sink also. The extra taint is only produced if the source itself is tainted and satisfies the `requires` formula.
:::

In the example below, let's say that `user_input` is dangerous but only when it passes through the `evil` function. This can be specified with taint labels as follows:

<iframe src="https://semgrep.dev/embed/editor?snippet=PwKY" border="0" frameBorder="0" width="100%" height="432"></iframe>

<!--
TODO: For some reason the embedded editor doesn't like the rule, even though the Playground can run it.

Interestingly, you can (ab)use taint labels to write some [typestate analyses](https://en.wikipedia.org/wiki/Typestate_analysis)!

<iframe src="https://semgrep.dev/embed/editor?snippet=DYxo" border="0" frameBorder="0" width="100%" height="432"></iframe>
-->

