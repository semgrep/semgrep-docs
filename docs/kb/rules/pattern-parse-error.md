---
description: Learn how to implement rule patterns that include the targeted language's reserved words.
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---

When using a targeted language's reserved words in rules, you may see the following error:

```console
[ERROR] Pattern parse error in rule
```

## Background

Each programming language has a list of reserved words that cannot be used as identifiers, such as the names of variables or functions. If you write a rule that results in the following error when run, you are triggering a reserved word conflict:

```console
[ERROR] Pattern parse error in rule ruleName:
 Invalid pattern for JavaScript:
--- pattern ---
delete
--- end pattern ---
Pattern error: Stdlib.Parsing.Parse_error
```

## Resolution

Using a reserved word in your rule leads to parsing errors, so if you see this error, determine if the words cited in the error are reserved words. If they are, you can replace your `metavariable-pattern` with `metavariable-regex`. 

This substitution works because `metavariable-pattern` tries to match the pattern within the captured metavariable, which is going to be affected by how reserved keywords are parsed, while `metavariable-regex` runs a regex on the text range associated with the metavariable, ignoring how its content would be parsed and bypassing the issue.

### Example

The following rule would elicit the "[ERROR] Pattern parse error in rule" response:

```code
patterns:
- pattern-inside: app.$FUNC(...)
- pattern-not-regex: .(middleware.csrf.validate).
- metavariable-pattern:
       metavariable: $FUNC
patterns:
- pattern-either:
- pattern: post=
- pattern: put
- pattern: delete
- pattern: patch
```

To fix the error, replace 

```code
- metavariable-pattern:
       metavariable: $FUNC
```

with 

```code
- metavariable-regex:
    metavariable: $FUNC
    regex: ^(post|put|delete|patch)$
```
