---
slug: multiple-focus-metavariables
append_help_link: true
description: "With this rule, Semgrep matches all pieces of code captured by the focus metavariables."
---

# Include multiple focus metavariables using set union semantics

Semgrep matches all pieces of code captured by focus metavariables when you specify them in a rule. Specify the metavariables you want to focus on in a YAML list format.

:::info
This feature is using `focus-metavariable`, see [`focus-metavariable`](/writing-rules/rule-syntax/#focus-metavariable) documentation for more information.
:::

There are two ways in which you can include multiple focus metavariables:

- **Set union**: Experimental feature described below in the section [Set union](#set-union). This feature returns the union of all matches of the specified metavariables.
- **Set intersection**: Only matches the overlapping region of all the focused code. For more information, see [Including more focus metavariables using set intersection semantics](/writing-rules/rule-syntax/#including-multiple-focus-metavariables-using-set-intersection-semantics).

## Set union

For example, there is a pattern that binds several metavariables. You want to produce matches focused on two or more of these metavariables. If you specify a list of metavariables under `focus-metavariable`, each focused metavariable matches code independently of the others.

```yaml
    patterns:
      - pattern: foo($X, ..., $Y)
      - focus-metavariable: 
        - $X
        - $Y
```

This syntax enables Semgrep to match these metavariables regardless of their position in code. See the following example:

<iframe src="https://semgrep.dev/embed/editor?snippet=D602" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>

:::tip
Among many use cases, the **set union** syntax allows you to simplify taint analysis rule writing. For example, see the following rule:
<iframe src="https://semgrep.dev/embed/editor?snippet=w6Qx" border="0" frameBorder="0" width="100%" height="432" loading="lazy"></iframe>
:::

<!-- Once this feature is no longer experimental, move the text under the ### `focus-metavariable` to docs/writing-rules/rule-syntax.md and change the # Using multiple focus metavariables header to level 4 (####) -->
