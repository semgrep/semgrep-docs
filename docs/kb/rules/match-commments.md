---
description: Semgrep's generic pattern matching mode can match comments in code files.
tags:
  - Rules
  - Semgrep Code
---

# Match comments with Semgrep

When Semgrep rules target specific languages, they do not match comments in the targeted code files. Comments are not part of the semantic and syntactic structure of the document, so they are ignored.

However, it's sometimes useful to match comments. For example, comments can control the behavior of other linters, such as type checkers. You might also have certain formatting standards for comments, such as requiring that a `TODO` comment contains a ticket capturing the required work.

To match comments with Semgrep, use the `generic` language target to invoke [generic pattern matching](/docs/writing-rules/generic-pattern-matching).

## Example rule

Suppose that your organization requires all `TODO` comments to have an associated Jira ticket. This rule finds TODO lines with no `atlassian.net` content and identifies any lines not containing a Jira Cloud ticket link.

```yaml
rules:
  - id: no-todo-without-jira
    patterns:
      - pattern: TODO $...ACTION
      - pattern-not: TODO ... atlassian.net ...
    options:
      generic_ellipsis_max_span: 0
    message: The TODO comment "$...ACTION" does not contain a Jira ticket to resolve the issue
    languages:
      - generic
    severity: INFO
    metadata:
      category: best-practice
```

:::note
Try this pattern in the [Semgrep Playground](https://semgrep.dev/playground/s/lBDRL).
:::

This rule also includes the `generic_ellipsis_max_span` option, which [limits the ellipsis to matching on the same line](/docs/writing-rules/generic-pattern-matching/#handling-line-based-input) and prevents it from over-matching in this generic context.

## Limiting the match to certain file types

If particular types of comments are only relevant for certain files, you can use the `paths:` key to limit the rule to files of that type. For example, `mypy` [type ignores](https://mypy.readthedocs.io/en/stable/error_codes.html#silencing-errors-based-on-error-codes) are only relevant in Python files.

```yaml
...
rules:
  - id: no-mypy-ignore
    ...
    paths:
      include:
        - "*.py"
```

## Ignoring some comments in generic mode

It is possible to [ignore comments of particular types](/docs/writing-rules/generic-pattern-matching#ignoring-comments) in generic mode using the `generic_comment_style` option. For example, to ignore C-style comments but match any other style:

```yaml
rules:
  - id: css-blue-is-not-allowed
    pattern: |
      color: blue
    options:
      # ignore comments of the form /* ... */
      generic_comment_style: c
    message: |
      Blue is not allowed.
    languages:
      - generic
    severity: INFO
```

## Additional resources

* [Matching multiple tokens with ellipsis metavariables](/docs/kb/rules/ellipsis-metavariables)
* [Aliengrep experiment](/docs/writing-rules/experiments/aliengrep)
