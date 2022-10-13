---
slug: multiple-focus-metavariables
append_help_link: true
description: "With this rule, Semgrep matches all pieces of code captured by the focus metavariables."
---

# Using multiple focus metavariables

Semgrep matches all pieces of code captured by focus metavariables when you specify them in a rule. Include the metavariables that you want to focus on by specifying each in a YAML list or by including more focus-metavariables. 

:::info
This feature is using `focus-metavariable`, see [`focus-metavariable`](/writing-rules/rule-syntax/#focus-metavariable) documentation for more information.  
:::

There are two methods of focusing Semgrep on multiple metavariables. Each of them can lead to different results:

## Set union

Include `focus-metavariable` with more metavariables directly under the `patterns` key to match these metavariables regardless of their position in code.

```yaml
    patterns:
      - pattern: foo($X, ..., $Y)
      - focus-metavariable: 
        - $X
        - $Y
```

This syntax enables Semgrep to match these metavariables regardless of their position in code. See the following example:

<iframe src="https://semgrep.dev/embed/editor?snippet=D602" border="0" frameBorder="0" width="100%" height="432"></iframe>

:::tip
Among many use cases, the **set union** syntax allows you to simplify taint analysis rule writing. For example, see the following rule:
<iframe src="https://semgrep.dev/embed/editor?snippet=w6Qx" border="0" frameBorder="0" width="100%" height="432"></iframe>
:::

## Set intersection

Include more `focus-metavariable` keys with different metavariables under the `pattern` to match results **only** for the overlapping region of all the focused code:

```yaml
    patterns:
      - pattern: foo($X, ..., $Y)
      - focus-metavariable: $X
      - focus-metavariable: $Y
```

See the following example:
<iframe src="https://semgrep.dev/embed/editor?snippet=AqJw" border="0" frameBorder="0" width="100%" height="432"></iframe>

<!-- Once this feature is no longer experimental, move the text under the ### `focus-metavariable` to docs/writing-rules/rule-syntax.md and change the # Using multiple focus metavariables header to level 4 (####) -->
