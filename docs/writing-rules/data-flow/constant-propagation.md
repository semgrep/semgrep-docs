---
slug: constant-propagation
append_help_link: true
description: >-
  Semgrep performs flow-sensitive constant folding and this information is used by the matching engine.
tags:
    - Rule writing
---

# Constant propagation

This analysis tracks whether a variable _must_ carry a constant value at a given point in the program. Semgrep then performs constant folding when matching literal patterns. Semgrep can track Boolean, numeric, and string constants.

Semgrep AppSec Platform supports interprocedural (cross function), interfile (cross file) constant propagation. Semgrep Community Edition (CE) supports intrafile (single file) constant propagation.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Gw7z" border="0" frameBorder="0" width="100%" height="432"></iframe>

## `metavariable-comparison`

Using constant propagation, the [`metavariable-comparison`](/writing-rules/rule-syntax/#metavariable-comparison) operator works with any constant variable, instead of just literals.

For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=Dyzd" border="0" frameBorder="0" width="100%" height="432"></iframe>

## Mutable objects

In general, Semgrep assumes that constant objects are immutable and won't be modified by function calls. This may lead to false positives, especially in languages where strings are mutable such as C and Ruby.

The only exceptions are method calls whose returning value is ignored. In these cases, Semgrep assumes that the method call may be mutating the callee object. This helps reducing false positives in Ruby. For example:

<iframe src="https://semgrep.dev/embed/editor?snippet=08yB" border="0" frameBorder="0" width="100%" height="432"></iframe>

If constant propagation doesn't seem to work, consider whether the constant may be unexpectedly mutable. For example, given the following rule designed to taint the `REGEX` class variable:

```yaml
rules:
  - id: redos-detection
    message: Potential ReDoS vulnerability detected with $REGEX
    severity: ERROR
    languages:
      - java
    mode: taint
    options:
      symbolic_propagation: true
    pattern-sources:
      - patterns:
          - pattern: $REDOS
          - metavariable-analysis:
              analyzer: redos
              metavariable: $REDOS
    pattern-sinks:
      - pattern: Pattern.compile(...)
```

Semgrep fails to match its use in `Test2` when presented with the following code:

```java
import java.util.regex.Pattern;

public String REGEX = "(a+)+$";

public class Test2 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile(REGEX);
    }
}
```

However, if you change the variable from `public` to `private`, Semgrep does return a match:

```java
import java.util.regex.Pattern;

private String REGEX = "(a+)+$";

public class Test2 {
    public static void main(String[] args) {
        Pattern pattern = Pattern.compile(REGEX);
    }
}
```

Because `REGEX` is public in the first code snippet, Semgrep doesn't propagate its value to other classes on the assumption that it could have mutated. However, in the second example, Semgrep understands that `REGEX` is private and is only assigned to once. Therefore, Semgrep assumes it to be immutable.

The rule would also work with:

```java
...
public final String REGEX = "(a+)+$";
...
```

## Disable constant propagation

You can disable constant propagation in a per-rule basis using rule [`options:`](/writing-rules/rule-syntax/#options) by setting `constant_propagation: false`.

<iframe src="https://semgrep.dev/embed/editor?snippet=jwvn" border="0" frameBorder="0" width="100%" height="432"></iframe>
