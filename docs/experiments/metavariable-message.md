---
slug: metavariable-message
append_help_link: true
description: "Display values of matched metavariables in rule messages. Add a metavariable to the rule message (for example `Found $X!`) and Semgrep replaces it with the value of the detected metavariable."
---

# Displaying matched metavariable in rule message

Display values of matched metavariables in rule messages. Add a metavariable to the rule message (for example `Found $X!`) and Semgrep replaces it with the value of the detected metavariable.

For example, see the following rule message and part of a Semgrep rule (formula): 

```yaml
- message: >-
  Creating a buffer using $X
- pattern: |
   byte[] buf = new byte[$X];
```

Use the formula displayed above against the following code:

```java
byte[] buf = new byte[size];
```

The resulting message is:

```
Creating a buffer using size
```

Semgrep substitutes the $X with the value detected within the metavariable. In this case, the value was `size`.

However, in some cases, the matched value of the metavariable is not the real value you were looking for. See the following formula and testing code:

Part of a Semgrep rule (formula):

```yaml
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

If the rule message states `Creating a buffer using $X`, the resulting message output is not helpful in this particular case: `Creating a buffer using size`. This is caused by the value of `$X` within the code, which is `size`. However, the underlying value of `size` is `512`. The goal of the rule message is to access this underlying value in our message.

To retrieve the correct value in the case described above, use `value($X)` in the rule message (for example (`Creating a buffer using value($X)`). Semgrep replaces the `value($X)` with the underlying propagated value of the metavariable `$X` if it computes one (otherwise, Semgrep uses the matched value).

Run the following example in Semgrep Playground to see the message (click **Open in Editor**, and then **Run**, unroll the **1 Match** to see the message):

<iframe title="Metavariable value in message example" src="https://semgrep.dev/embed/editor?snippet=returntocorp:value-in-message-example" width="100%" height="432" frameborder="0"></iframe>