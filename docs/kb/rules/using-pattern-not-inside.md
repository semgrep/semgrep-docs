---
description: Learn how to fix issues with `pattern-not` when excluding cases in custom rules.
tags:
  - Semgrep Community Edition
  - Semgrep Rules
append_help_link: true
---

# My rule with `pattern-not` doesn't work: using `pattern-not-inside`

One common issue when writing custom rules involves the unsuccessful exclusion of cases using `pattern-not`.

If you are trying to exclude a specific case where a pattern is unacceptable unless it is accompanied by another pattern, try `pattern-not-inside` instead of `pattern-not`.

## Background

In Semgrep, a pattern that's inside another pattern can mean one of two things:

* The pattern is wholly within an outer pattern
* The pattern is at the same level as another pattern, but includes less code

In other words, using `pattern-not` in your rule means that Semgrep expects the matches to be the same "size" (same amount of code), and does not match if that's not the case.

## Example

The [example rule](https://semgrep.dev/docs/writing-rules/rule-ideas/#systematize-project-specific-coding-patterns) `find-unverified-transactions` is a good example: `make_transaction($T)` is acceptable only if `verify_transaction($T)` is also present.

To successfully match the target code, the rule uses `pattern` and `pattern-not`:

<iframe src="https://semgrep.dev/embed/editor?snippet=Nr3z" title="pattern-not rule for unverified transactions" width="100%" height="432px" frameBorder="0"></iframe>

But this rule is redundant. Both pattern clauses contain:

```yml
public $RETURN $METHOD(...){
  ...
}
```

However, if you refactor the rule by pulling the container out and using `pattern-inside`, the rule doesn't work -- [try it out](https://semgrep.dev/playground/s/KZOd?editorMode=advanced) if you like!

```yml
rules:
  - id: find-unverified-transactions-inside
    patterns:
      - pattern-inside: |
          $RETURN $METHOD(...) {
            ...
          }
      - pattern: |
          ...
          make_transaction($T);
          ...
      - pattern-not: |
          ...
          verify_transaction($T);
          ...
          make_transaction($T);
          ...
```

With an understanding of how `pattern-not` operates, you can see that this rule fails because the matches are not the same size. The `pattern-not` match is at the same level, but it is "larger" (contains more code).

If you switch to `pattern-not-inside`:

```yml
- pattern-not-inside: |
    ...
    verify_transaction($T);
    ...
    make_transaction($T);
    ...
```

The rule successfully matches the example code.
