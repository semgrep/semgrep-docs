---
slug: taint-mode
append_help_link: true
description: >-
  Taint mode allows you to write simple rules that catch complex injection bugs.
---

# Taint tracking

Semgrep supports intra-procedural [taint tracking](https://en.wikipedia.org/wiki/Taint_checking). This is a kind of data-flow analysis that tracks the flow of untrusted (aka "tainted") data throughout a program. The analysis produces a finding whenever such data goes into a vulnerable function (aka "sink"), without first having been checked or transformed accordingly (aka "sanitized").

Taint tracking rules must specify `mode: taint`, which enables the following operators:

- `pattern-sources` (required)
- `pattern-sinks` (required)
- `pattern-sanitizers` (optional)

These operators (which act as `pattern-either` operators) take a list of patterns that specify what is to be considered a source, a sink, or a sanitizer. Note that you can use _any_ pattern operator and you have the same expressive power as in a `mode: search` rule.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=P8oz" border="0" frameBorder="0" width="100%" height="435"></iframe>

Here Semgrep tracks the data returned by `get_user_input()`, which is the source of taint. Think of Semgrep running the pattern `get_user_input(...)` on your code, finding all places where `get_user_input` gets called, and labeling them as tainted. That is exactly what is happening under the hood!

The rule specifies the sanitizer `sanitize_input(...)`, so any expression that matches that pattern will be considered sanitized. In particular, the expression `sanitize_input(data)` will be labeled as sanitized. Even if `data` is tainted, as it occurs inside a piece of sanitized code, it will not produce any findings.

Finally, the rule specifes that anything matching either `html_output(...)` or `eval(...)` should be regarded as a sink. There are two calls `html_output(data)` and both are labeled as sinks. The first one in `route1` is not reported because `data` gets sanitized, whereas the second one in `route2` is reported because `data` is tainted.

You can find more examples of taint rules in the [Semrep Registry](https://semgrep.dev/r?owasp=injection%2Cxss), for instance: [express-sandbox-code-injection](https://semgrep.dev/editor?registry=javascript.express.security.express-sandbox-injection.express-sandbox-code-injection).

:::info
Note that if a [metavariable](../../pattern-syntax/#metavariables) such as `$X` is specified in both `pattern-sources:` and `pattern-sinks:`, it is considered to be the _same_ metavariable. This means that any finding requires not only that a _source_'s taint goes into a _sink_, but also that `$X` matches the same code in both the source and the sink. The same applies to metavariables used in `pattern-sources:` and `pattern-sanitizers:`. In general, it is safer to avoid reusing the same metavariable across these operators, unless you have a specific purpose in mind. See section on [Metavariable unification](#metavariable-unification) for examples.
:::

Minimizing false positives via sanitizers
-----------------------------------------

Since taint mode is intra-procedural, it does not know what other functions do, and Semgrep is careful to assume that taint could propagate through other functions, for example:

<iframe src="https://semgrep.dev/embed/editor?snippet=XO6q" border="0" frameBorder="0" width="100%" height="435"></iframe>

Here, `some_safe_function` receives tainted data as input and, to be on the safe side, Semgrep assumes that it will also return tainted data as output. Therefore Semgrep produces a finding.

In some codebases this assumption may produce too many false positives—in this example, `some_safe_function` may not be returning tainted data after all. If that is the case, you could first consider enumerating such functions as sanitizers (which in a sense they are):

<iframe src="https://semgrep.dev/embed/editor?snippet=jwey" border="0" frameBorder="0" width="100%" height="435"></iframe>

If this is too cumbersome, then you can easily "turn it around" and instead assume that every function call is a sanitizer by default:

<iframe src="https://semgrep.dev/embed/editor?snippet=y1jZ" border="0" frameBorder="0" width="100%" height="435"></iframe>

For convenience, Semgrep has a special kind of _not-conflicting_ sanitizer for this purpose, declared with `not_conflicting: true`. A pattern like `$F(...)` matches every function call. If it were acting as a regular sanitizer, it would also apply to any source or sink that had the same function-call shape. In this example, this would sanitize all calls to `sink` and [Semgrep would produce no findings at all](https://semgrep.dev/s/rYrj).

If you use this approach, you instead have to enumerate your taint propagators—with `pattern-not`—if there are any:

<iframe src="https://semgrep.dev/embed/editor?snippet=9rJ2" border="0" frameBorder="0" width="100%" height="435"></iframe>

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

Metavariable unification
------------------------

A metavariable that is used in both `pattern-sources:` and `pattern-sinks:` is considered the _same_ metavariable. Thus, a finding will only happen if there is taint going from a _source_ to a _sink_, *and* if the metavariables associated with both the source and the sink can be unified. Unification requires that whatever a metavariable binds to in each of these operators is, syntactically speaking, the "same" piece of code; e.g., if a metavariables binds to a code variable `x` in the source match, it must bind to the same code variable `x` in the sink match. The same applies to metavariables that are common to `pattern-sources:` and `pattern-sanitizers:`, sanitization only happens if the metavariables can be unified. This restriction is necessary for both coherence, and so that these metavariables can be used to compose the rule's message.

However, you typically do not want to use the same metavariable across these different operators, since it may have unintended consequences! Unless you have a specific goal in mind, you should probably use different metavariables when matching sources, sanitizers, and sinks.

In the following example, whatever object goes into `make_tainted` becomes tainted by side-effect, and we want to check that these tainted objects never go into a `sink` function. If we use the same metavariable `$TAINTED` in both the source and the sink specification, it does not work as expected:

<iframe src="https://semgrep.dev/embed/editor?snippet=Q64P" border="0" frameBorder="0" width="100%" height="435"></iframe>

For it to work, we must use different metavariables:

<iframe src="https://semgrep.dev/embed/editor?snippet=Pg8q" border="0" frameBorder="0" width="100%" height="435"></iframe>
