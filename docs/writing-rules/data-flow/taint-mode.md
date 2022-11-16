---
slug: taint-mode
append_help_link: true
description: >-
  Taint mode allows you to write simple rules that catch complex injection bugs.
---

# Taint tracking

Semgrep supports intra-procedural [taint tracking](https://en.wikipedia.org/wiki/Taint_checking). This data-flow analysis tracks the flow of untrusted (**tainted**) data throughout a program. If tainted data are not transformed or checked accordingly (**sanitized**), taint analysis reports a finding whenever tainted data reach a vulnerable function (**sink**).

The following video provides a quick overview of taint mode:
<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/6MxMhFPkZlU" frameborder="0" allowfullscreen></iframe>

Taint tracking rules must specify `mode: taint`, which enables the following operators:

- `pattern-sources` (required)
- `pattern-sinks` (required)
- `pattern-sanitizers` (optional)

These operators (which act as `pattern-either` operators) take a list of patterns that specify what is to be considered a source, a sink, or a sanitizer. Note that you can use _any_ pattern operator and you have the same expressive power as in a `mode: search` rule.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=P8oz" border="0" frameBorder="0" width="100%" height="432"></iframe>

Here Semgrep tracks the data returned by `get_user_input()`, which is the source of taint. Think of Semgrep running the pattern `get_user_input(...)` on your code, finding all places where `get_user_input` gets called, and labeling them as tainted. That is exactly what is happening under the hood!

The rule specifies the sanitizer `sanitize_input(...)`, so any expression that matches that pattern will be considered sanitized. In particular, the expression `sanitize_input(data)` will be labeled as sanitized. Even if `data` is tainted, as it occurs inside a piece of sanitized code, it will not produce any findings.

Finally, the rule specifes that anything matching either `html_output(...)` or `eval(...)` should be regarded as a sink. There are two calls `html_output(data)` and both are labeled as sinks. The first one in `route1` is not reported because `data` gets sanitized, whereas the second one in `route2` is reported because `data` is tainted.

You can find more examples of taint rules in the [Semrep Registry](https://semgrep.dev/r?owasp=injection%2Cxss), for instance: [express-sandbox-code-injection](https://semgrep.dev/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection).

:::info
[Metavariables](../../pattern-syntax/#metavariables) used in `pattern-sources` are considered _different_ from those used in `pattern-sinks`, even if they have the same name! See [Metavariables, rule message, and unification](#metavariables-rule-message-and-unification) for further details.
:::

Field sensitivity
-----------------

The taint engine provides basic field sensitivity support:

- Track `x.a.b` as tainted, while you can specify that `x` and `x.a` are not tainted. If `x.a.b` is tainted, any extension of `x.a.b` (such as `x.a.b.c`) is also considered tainted.
- If `x.a` is tainted, and later `x.a.b` is sanitized, the engine detects that `x.a.b` is not tainted but `x.a` or `x.a.c` are still tainted.
- Taint tracking is **not** index sensitive, if `x.a[i]` is tainted, Semgrep considers `x.a` itself also as tainted. However, if `x.a[i]` is sanitized, then `x.a` is also sanitized.

:::note
The taint engine does track taint **per variable** and not **per object in memory**. The taint engine does not perform alias analysis at present.
:::
Minimizing false positives via sanitizers
-----------------------------------------

Since taint mode is intra-procedural, it does not know what other functions do, and Semgrep is careful to assume that taint could propagate through other functions, for example:

<iframe src="https://semgrep.dev/embed/editor?snippet=XO6q" border="0" frameBorder="0" width="100%" height="432"></iframe>

Here, `some_safe_function` receives tainted data as input and, to be on the safe side, Semgrep assumes that it will also return tainted data as output. Therefore Semgrep produces a finding.

In some codebases this assumption may produce too many false positives—in this example, `some_safe_function` may not be returning tainted data after all. If that is the case, you could first consider enumerating such functions as sanitizers (which in a sense they are):

<iframe src="https://semgrep.dev/embed/editor?snippet=jwey" border="0" frameBorder="0" width="100%" height="432"></iframe>

If this is too cumbersome, then you can easily "turn it around" and instead assume that every function call is a sanitizer by default:

<iframe src="https://semgrep.dev/embed/editor?snippet=y1jZ" border="0" frameBorder="0" width="100%" height="432"></iframe>

For convenience, Semgrep has a special kind of _not-conflicting_ sanitizer for this purpose, declared with `not_conflicting: true`. A pattern like `$F(...)` matches every function call. If it were acting as a regular sanitizer, it would also apply to any source or sink that had the same function-call shape. In this example, this would sanitize all calls to `sink` and [Semgrep would produce no findings at all](https://semgrep.dev/s/rYrj).

If you use this approach, you instead have to enumerate your taint propagators—with `pattern-not`—if there are any:

<iframe src="https://semgrep.dev/embed/editor?snippet=9rJ2" border="0" frameBorder="0" width="100%" height="432"></iframe>

Semgrep also considers that indexing an array with a tainted index leads to tainted data. Again, it is easy to disable this via sanitizers:

```javascript
pattern-sanitizers:
  - patterns:
    - pattern-inside: $ARRAY[$INDEX]
    - pattern: $INDEX
```

Mini cookbook
-------------

Again, keep in mind that sources, sanitizers and sinks are given by arbitrary patterns, so they can be anything that you can match with Semgrep. You can get very creative!

### Function argument as a source

Taint may come from specific functions that read user input such as `window.prompt()` but it is also easy to specify that taint comes from anywhere else, such as, for example, a specific argument within a function definition:

```javascript
pattern-sources:
  - patterns:
    - pattern-inside: function ($REQ, ...) {...}
    - pattern: $REQ
```

### Function argument as a sink

If you specify a sink such as `sink(...)` then any tainted data passed to sink, through any of its arguments, will result in a match. You can narrow it down to a specific parameter this way: 

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $S = new Sandbox(); ...
    - pattern-inside: $S.run($SINK, ...)
    - pattern: $SINK
```

This rule causes Semgrep to only annotate the first parameter passed to `$S.run` as the sink, rather than the method `$S.run` itself. If taint goes into any other parameter of `$S.run`, then that will not be considered a problem.

Remember, anything can be a sink, even the index of an array access:

```javascript
pattern-sinks:
  - patterns:
    - pattern-inside: $ARRAY[$SINK]
    - pattern: $SINK
```

This way we tell Semgrep that we do not want arrays to be accessed with tainted indexes.

### Sanitized by side-effect

Typically a sanitizer will be some function that gets tainted data and returns untainted one. But it does not need to be that way. Sometimes data gets sanitized via side-effect, and taint mode can handle this too, for example:

```javascript
pattern-sanitizers:
  - patterns:
    - pattern-inside: |
        $JWT.verify($TOKEN, ...)
        ...
    - pattern: $TOKEN
```

This example just annotates as sanitized all the occurrences of a `$TOKEN` that happen after calling `verify` on it.

You can also use the presence of (for example) an  if conditional as a sanitizer:

```javascript
pattern-sanitizers:
  - patterns:
    - pattern-inside: |
        if !strings.HasPrefix($PATH, <... $TARGET ...>, ...) {...}
        ...
    - pattern: $PATH
```

Metavariables, rule message, and unification
--------------------------------------------

The patterns specified by `pattern-sources` and `pattern-sinks` (and `pattern-sanitizers`) are all independent of each other. If a metavariable used in `pattern-sources` has the same name as a metavariable used in `pattern-sinks`, these are still different metavariables.

In the message of a taint-mode rule, you can refer to any metavariable bound by `pattern-sinks`, as well as to any metavariable bound by `pattern-sources` that does not conflict with a metavariable bound by `pattern-sinks`.

Semgrep can also treat metavariables with the same name as the _same_ metavariable, simply set `taint_unify_mvars: true` using rule `options`. Unification enforces that whatever a metavariable binds to in each of these operators is, syntactically speaking, the **same** piece of code. For example, if a metavariable binds to a code variable `x` in the source match, it must bind to the same code variable `x` in the sink match. In general, unless you know what you are doing, avoid metavariable unification between sources and sinks.

The following example demonstrates the use of source and sink metavariable unification:

<iframe src="https://semgrep.dev/embed/editor?snippet=obRd" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::info
Semgrep used to have a different behavior, for more information, see [release notes for version 0.87.0](/release-notes/april-2022/#semgrep-cli-and-semgrep-in-ci).
:::
