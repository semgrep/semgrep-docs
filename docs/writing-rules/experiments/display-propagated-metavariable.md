---
slug: display-propagated-metavariable
append_help_link: true
description: "This document provides information about experimental syntax addition to [Displaying matched metavariable in rule message](/writing-rules/pattern-syntax/#display-matched-metavariable-in-rule-message). Semgrep enables you to display values of matched metavariables in rule messages. However, in some cases, the matched value of the metavariable is not the real value you were looking for."
---

# Displaying propagated value of metavariables

This document provides information about experimental syntax supplement to [Display matched metavariables in rule messages](/writing-rules/pattern-syntax#display-matched-metavariables-in-rule-messages). Semgrep enables you to display values of matched metavariables in rule messages. However, in some cases, the matched value of the metavariable is not the real value you were looking for.

See the following rule message and part of a Semgrep rule (formula):

```yaml
- message: >-
  Creating a buffer using $X
- patterns:
   - pattern: byte[] buf = new byte[$X];
   - metavariable-comparison:
        metavariable: $X
        comparison: $X < 2048
```

Testing code:

```java
int size = 512;
byte[] buf = new byte[size];
```

Semgrep matches this code because it performs constant propagation. Therefore, Semgrep recognizes that the value of `size` is `512`. Consequently, Semgrep evaluates that the buffer size is less than `2048`. But what is the value of `$X`?

If the rule message states `Creating a buffer using $X`, the resulting message output is not helpful in this particular case:

```
Creating a buffer using size
```

This is caused by the value of `$X` within the code, which is `size`. However, the underlying value of `size` is `512`. The goal of the rule message is to access this underlying value in our message.

To retrieve the correct value in the case described above, use `value($X)` in the rule message (for example (`Creating a buffer using value($X)`). Semgrep replaces the `value($X)` with the underlying propagated value of the metavariable `$X` if it computes one (otherwise, Semgrep uses the matched value).

:::info
Regular Semgrep syntax for displaying matched metavariables in rule messages is for example `$X`. For specific propagated values, use experimental syntax `value($X)` instead. For more information about the standard syntax, see [Displaying matched metavariables in rule messages](/writing-rules/pattern-syntax/#displaying-matched-metavariables-in-rule-messages).
:::

Run the following example in Semgrep Playground to see the message (click **Open in Editor**, and then **Run**, unroll the **1 Match** to see the message):

<iframe title="Metavariable value in message example" src="https://semgrep.dev/embed/editor?snippet=Dr0G" width="100%" height="432" frameborder="0"></iframe>
