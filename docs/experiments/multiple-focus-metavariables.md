---
slug: multiple-focus-metavariables
append_help_link: true
description: "With this rule, Semgrep matches all pieces of code captured by the focus metavariables."
---

# Using multiple focus metavariables using set union semantics

Semgrep matches all pieces of code captured by focus metavariables when you specify them in a rule. Include the metavariables that you want to focus on by specifying each in a YAML list. 

:::info
This feature is using `focus-metavariable`, see [`focus-metavariable`](/writing-rules/rule-syntax/#focus-metavariable) documentation for more information.  
:::

There are two ways in which you can include multiple focus metavariables:

- **Set union**: Experimental feature described below in section [Set union](#set-union). This syntax matches metavariables regardless of their position in code.
- **Set intersection**: Only matches the overlapping region of all the focused code. For more information, see [Including more focus metavariables using set intersection semantics](writing-rules/rule-syntax/#including-more-focus-metavariables-using-set-intersection-semantics).

## Set union

For example, there is a pattern that is binding several metavariables. You want to produce matches focused on two or more of these metavariables. If you specify a list of metavariables under `focus-metavariable`, each focused metavariable matches the code independently of the others.

For example, there is a pattern that is binding several metavariables. You want to produce matches focused on two or more of these metavariables. If you specify a list of metavariables under `focus-metavariable`, each focused metavariable matches code independently of the others.

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

<!-- Once this feature is no longer experimental, move the text under the ### `focus-metavariable` to docs/writing-rules/rule-syntax.md and change the # Using multiple focus metavariables header to level 4 (####) -->
