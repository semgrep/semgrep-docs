---
slug: multiple-focus-metavariables
append_help_link: true
description: "With this rule, Semgrep matches all pieces of code captured by the focus metavariables."
---

# Using multiple focus metavariables

Use multiple focus metavariables in one Semgrep rule by specifying each under a new `focus-metavariable` item in a YAML list. With this rule, Semgrep matches all pieces of code captured by the focus metavariables.

:::info
This feature is using `focus-metavariable`, see [`focus-metavariable`](/writing-rules/rule-syntax/#focus-metavariable) documentation for more information.  
:::

<iframe src="https://semgrep.dev/embed/editor?snippet=493E" border="0" frameBorder="0" width="100%" height="432"></iframe>

There are two methods of focusing on multiple metavariables. Each of them can lead to different results:

- **Recommended**: Including `focus-metavariable` with more metavariables directly under the `patterns` key returns results regardless of whether there is an overlap between these variables:
    ```yaml
        patterns:
          - pattern: foo($X, ..., $Y)
          - focus-metavariable: 
            - $X
            - $Y
    ```
    See the following example:
    TODO ADD IFRAME
- **Advanced**: Including more `focus-metavariable` keys with different metavariables under the `pattern` key lets Semgrep find **only** the overlapping region of all the focused code:
    ```yaml
        patterns:
          - pattern: foo($X, ..., $Y)
          - focus-metavariable: $X
          - focus-metavariable: $Y
    ```
    See the following example:
    <iframe src="https://semgrep.dev/embed/editor?snippet=e8OL" border="0" frameBorder="0" width="100%" height="432"></iframe>

<!-- Once this feature is no longer experimental, move the text under the ### `focus-metavariable` to docs/writing-rules/rule-syntax.md and change the # Using multiple focus metavariables header to level 4 (####) -->