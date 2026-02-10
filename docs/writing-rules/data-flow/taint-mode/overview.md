---
slug: overview
title: Taint analysis
hide_title: true
description: Learn about taint mode, which allows you to write rules that catch complex injection bugs using taint analysis.
tags:
 - Rule writing
 - Dataflow analysis
 - Taint analysis
---

# Taint analysis overview

Semgrep supports [taint analysis](https://en.wikipedia.org/wiki/Taint_checking), also known as taint tracking, through taint rules. Taint rules are specified by the inclusion of `mode: taint` in your rule.

Taint analysis is a dataflow analysis that tracks the flow of untrusted, or **tainted**, data throughout the body of a function or method. Tainted data originates from tainted **sources**. If tainted data is not transformed or checked accordingly, or **sanitized**, taint analysis reports a finding whenever tainted data reaches a vulnerable function, called a **sink**. Tainted data flows from sources to sinks through **propagators**, such as assignments and function calls.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/6MxMhFPkZlU" frameborder="0" allowfullscreen></iframe>

## Create a rule

To create a taint tracking rule, include `mode: taint` in the rule's YAML definition file. This enables the following operators:

| Operator | Required? |
| - | - |
| `pattern-sources` | Yes |
| `pattern-propagators` | No |
| `pattern-sanitizers` | No |
| `pattern-sinks` | No |

These operators, which act as `pattern-either` operators, take a list of patterns that specify what is considered a source, a propagator, a sanitizer, or a sink.

> You can use **any** pattern operator and you have the same expressive power as you would with a `mode: search` rule.

### Sample rule and pattern matching

<iframe src="https://semgrep.dev/embed/editor?snippet=xG6g" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

In the preceding example, Semgrep tracks the data returned by `get_user_input()`, which is the source of tainted data. You can think of what's happening as Semgrep running the pattern `get_user_input(...)` on your code, identifying all instances where `get_user_input` is called, and labeling them as tainted.

The rule specifies the sanitizer `sanitize_input(...)`, so any expression that matches that pattern is considered sanitized. In particular, the expression `sanitize_input(data)` is labeled as sanitized. Even if `data` is tainted, as it occurs inside a piece of sanitized code, it does not produce any findings.

Finally, the rule specifies that anything matching either `html_output(...)` or `eval(...)` should be regarded as a sink. There are two calls to  `html_output(data)` that are both labeled as sinks. The first one in `route1` is not reported because `data` is sanitized before reaching the sink, whereas the second one in `route2` is reported because the `data` that reaches the sink is still tainted.

Find more examples of taint rules in the [Semgrep Registry](https://semgrep.dev/r?owasp=injection%2Cxss), including [express-sandbox-code-injection](https://semgrep.dev/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection).

:::warning
[Metavariables](/writing-rules/pattern-syntax#metavariables) used in `pattern-sources` are considered _different_ from those used in `pattern-sinks`, even if they have the same name! See [Metavariables, rule message, and unification](/writing-rules/data-flow/taint-mode/advanced#metavariables-rule-messages-and-unification) for further details.
:::

## Sources

You can specify a taint source using a pattern. Like a search-mode rule, you can start this pattern with one of the following keys:

- `pattern` 
- `patterns`
- `pattern-either`
- `pattern-regex`

Example:

```yaml
pattern-sources:
- pattern: source(...)
```

**Any** subexpression that's matched by the pattern you define is regarded as a source of tainted data.

Additionally, taint sources accept the following options:

| Option | Type | Default | Description |
| - | - | - | - |
| `exact` | {`false`, `true`} | `false` | See [Exact sources](#exact-sources).                                 |
| `by-side-effect` | {`false`, `true`, `only`} | `false` | See [Taint sources by side-effect](/writing-rules/data-flow/taint-mode/advanced#taint-sources-by-side-effect). |
| `control` (Pro) 🧪 | {`false`, `true`} | `false` | See [Track control sources](/writing-rules/data-flow/taint-mode/advanced#track-control-sources-).

### Exact sources

Given the subsequent source specification and a piece of code, such as `source(sink(x))`, the call `sink(x)` is reported as a tainted sink.

```yaml
pattern-sources:
- pattern: source(...)
```

The reason is that the pattern `source(...)` matches all of `source(sink(x))`, and that makes Semgrep consider every subexpression in that piece of code as being a source. In particular, `x` is a source, and it is being passed into `sink`.

<iframe src="https://semgrep.dev/embed/editor?snippet=eqYN8" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

You can instruct Semgrep to only consider as taint sources the "exact" matches of a source pattern by setting `exact: true`:

```yaml
pattern-sources:
- pattern: source(...)
  exact: true
```

Once the source is exact, Semgrep no longer considers subexpressions as taint sources, and `sink(x)` inside `source(sink(x))` isn't reported as a tainted sink, unless `x` is tainted in another way.

<iframe src="https://semgrep.dev/embed/editor?snippet=Zq5ow" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

For many rules, this distinction isn't meaningful because it doesn't always make sense that a sink occurs inside the arguments of a source function.

> If one of your rules relies on non-exact matching of sources, make this fact explicit with `exact: false`, even if it is the current default, so that your rule doesn't break if you change the default.

## Sanitizers

You can specify a taint sanitizer using a pattern. Like a search-mode rule, you can start the pattern with any of the following keys:

- `pattern` 
- `patterns`
- `pattern-either`
- `pattern-regex`

Example:

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
```

**Any** subexpression that is matched by this pattern is regarded as sanitized.

Additionally, taint sanitizers accept the following options:


| Option | Type | Default | Description | 
| - | - | - | - |
| `exact` | {`false`, `true`} | `false` | See [Exact sanitizers](#exact-sanitizers). | 
|`by-side-effect` | {`false`, `true`, `only`} | `false` | See [Taint sanitizers by side-effect](/writing-rules/data-flow/taint-mode/advanced#taint-sanitizers-by-side-effect). |

### Exact sanitizers

Given the sanitizer specification that follows and a piece of code, such as `sanitize(sink("taint"))`, Semgrep doesn't report the call `sink("taint")`.

```yaml
pattern-sanitizers:
- pattern: sanitize(...)
```

This is because the pattern `sanitize(...)` matches all of `sanitize(sink("taint"))`, and that makes Semgrep consider every subexpression in that piece of code as sanitized. In particular, `"taint"` is considered sanitized.

<iframe src="https://semgrep.dev/embed/editor?snippet=v83Rb" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

You can instruct Semgrep only to consider the exact matches of a sanitizer pattern as sanitized by setting `exact: true`:


```yaml
pattern-sanitizers:
- pattern: sanitize(...)
  exact: true
```

Once the source is exact, Semgrep no longer considers subexpressions as sanitized, and `sink("taint")` inside `sanitize(sink("taint"))` is reported as a tainted sink.

<iframe src="https://semgrep.dev/embed/editor?snippet=Zqz8o" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

For many rules, this distinction isn't meaningful, because it does not always make sense that a sink occurs inside the arguments of a sanitizer function.

:::note
If any of your rules rely on non-exact matches, make this explicit by setting `exact: false` in your rule definition, even if this is the default setting. This ensures that your rule doesn't break if the default changes.
:::

## Sinks

You can specify a taint sink using a pattern. Like a search-mode rule, you can start this pattern with one of the following keys:

- `pattern` 
- `patterns`
- `pattern-either`
- `pattern-regex`

Unlike sources and sanitizers, Semgrep doesn't consider the subexpressions of the matched expressions as sinks by default.

Example:

```yaml
pattern-sinks:
- pattern: sink(...)
```

Additionally, taint sinks accept the following options:

| Option | Type | Default | Description |
| - | - | - | - |
| `exact` | {`false`, `true`} | `true` | See [Non-exact sinks](#non-exact-sinks). |
| `at-exit` (Pro) 🧪 | {`false`, `true`} | `false` | See [Restrict taint to at-exit sinks](/writing-rules/data-flow/taint-mode/advanced#restrict-taint-to-at-exit-sinks-). |

### Non-exact sinks

Given the following sink specification and a piece of code, such as `sink("foo" if tainted else "bar")`, Semgrep doesn't report the code as a tainted sink.


```yaml
pattern-sources:
- pattern: sink(...)
```

Semgrep treats the argument passed to `sink` as the sink itself.  In this case, the argument is `"foo" if tainted else "bar"`, which evaluates to either `"foo"` or `"bar"`.  Since neither value is tainted, Semgrep does not flag the call.

<iframe src="https://semgrep.dev/embed/editor?snippet=KxJ17" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

You can instruct Semgrep to consider any of the subexpressions matching the sink pattern a taint sink by setting `exact: false`:

```yaml
pattern-sinks:
- pattern: sink(...)
  exact: false
```

Once the sink is non-exact, Semgrep considers subexpressions as taint sinks, and `tainted` inside `sink("foo" if tainted else "bar")` is now reported as a tainted sink.

<iframe src="https://semgrep.dev/embed/editor?snippet=qNwez" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

## Findings

Taint findings are accompanied by a taint trace that explains how the taint flows from source to sink.

<!-- <iframe src="https://semgrep.dev/embed/editor?snippet=KxJRL" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe> -->

### Deduplication of findings

Semgrep tracks all possible ways that taint can reach a sink, but it only reports one taint trace, not all the possible options. You can use the following example to visualize this behavior:

1. Click **Open in Playground**.
2. Run the example. Semgrep returns one match.
3. Expand the **Matches** section, and click **dataflow**..

Note that, even though `sink` can be tainted via `x` or via `y`, the trace will only show you one of these possibilities. If you replace `x = user_input` with `x = "safe"`, then Semgrep reports the taint trace via `y`.

<iframe src="https://semgrep.dev/embed/editor?snippet=WAYzL" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

## Propagators 🧪

:::note
Custom taint propagators is a Semgrep Pro feature.
:::

By default, tainted data automatically propagates through assignments, operators, and function calls (from inputs to output). However, there are other ways in which taint can propagate, but this requires language or library-specific knowledge that Semgrep does not have built in.

You can define a taint propagator by specifying a pattern. Like search-mode rules, you can start this pattern with any of the following keys:

- `pattern`
- `patterns`
- `pattern-either`
- `pattern-regex`

A propagator also needs to specify the origin (`from`) and the destination (`to`) of the taint to be propagated.

| Field | Type | Description |
| - | - | - |
| `from` | metavariable | Source of propagation |
| `to` | metavariable | Destination of propagation |

In addition, taint propagators accept the following options:

| Option | Type | Default | Description |
| - | - | - | - |
| `by-side-effect` | {`false`, `true`} | `true` | See [Propagate without side-effect](/writing-rules/data-flow/taint-mode/advanced#propagate-without-side-effect). |

For example, given the following propagator, if taint goes into the second argument of `strcpy`, its first argument gets the same taint:


```yaml
pattern-propagators:
- pattern: strcpy($DST, $SRC)
  from: $SRC
  to: $DST
```

:::info
Taint propagators only work intraprocedurally, that is, within a function or method. You cannot use taint propagators to propagate taint across different functions/methods. For that, use [interprocedural analysis](#interprocedural-analysis-).
:::

## Interprocedural analysis 🧪

:::info
Interprocedural taint analysis is a Semgrep Pro feature.
:::

[Semgrep](/semgrep-pro-vs-oss/) can perform interprocedural taint analysis, that is, track taint across multiple functions.

In the following example, `user_input` is passed to `foo` as input, and from there, flows to the sink at line 3 through a call chain involving three functions. Semgrep can track this flow and report the sink as tainted. Semgrep also provides an interprocedural taint trace that explains how exactly `user_input` reaches the `sink(z)` statement. To see this, click **Open in Playground**, then find the **Matches** panel and click **dataflow**.

<iframe src="https://semgrep.dev/embed/editor?snippet=PeBXv" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

Using the CLI option `--pro-intrafile` when invoking Semgrep, Semgrep performs interprocedural (across functions), _intra_-file (within one file) analysis. In other words, Semgrep tracks taint across functions, but it will not cross file boundaries. This is supported for essentially every language, and performance is very close to that of intraprocedural taint analysis.

Using the CLI option `--pro`, Semgrep will perform interprocedural (across functions) as well as *inter*-file (across files) analysis. Inter-file analysis is only supported for [a subset of languages](/supported-languages#language-maturity-summary). For a rule to run interfile, it also needs to set `interfile: true`:

```yaml
options:
  interfile: true
```

### Memory requirements for inter-file analysis

While interfile analysis is more powerful, it also demands more memory resources. The Semgrep team advises a minimum of 4 GB of memory per core, but **recommends 8 GB per core or more**. The specific amount of memory needed depends on the codebase and on the number of interfile rules being run.
