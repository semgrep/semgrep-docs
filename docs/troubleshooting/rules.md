---
slug: rules
tags:
  - Troubleshooting
  - Rule writing
description: "Follow these troubleshooting steps when your pattern fails to parse, your rule doesn't match its intended code, and other rule writing pitfalls."
---


# Troubleshooting rules

This page intends to help rule authors fix common mistakes when writing Semgrep rules. If you have a problem while running a rule you didn't write yourself, please [open a GitHub issue in the Semgrep Registry](https://github.com/semgrep/semgrep-rules/issues/new/choose) repository.


## If your pattern can’t be parsed

This error means your pattern does not look like complete source code in the selected language.

"Complete source code" means that the Semgrep pattern must look like a valid, complete expression or statement on its own.

To illustrate with an example, Python isn't able to parse `if 4 < 5` as a line of code, because it's missing the code block on the right hand side.

```python
>>> if 4 < 5
  File "<stdin>", line 1
    if 4 < 5
            ^
SyntaxError: invalid syntax
>>>
```

To get Python to parse this, you need to add a colon and a code block:

```python
>>> if 4 < 5: print("it works!")
...
it works!
>>>
```

The same way Python's parser cannot parse partial statements or expressions, Semgrep cannot either.

The Semgrep pattern `if $X < 5` is invalid, and needs to be changed to a complete statement with a wildcard: `if $X < 5: ...`

While the most common reason for pattern parse errors is the above, other things to check would be:

- Make sure the correct language is selected
- If your pattern uses a metavariable, make sure it's all uppercase and does not start with a number. Valid metavariable names include `$X`, `$NAME`, and `$_VAR_2`. Invalid metavariable names include `$name`, `$1stvar` and `$VAR-WITH-DASHES`.

## If your rule doesn't match where it should

In general, it helps to test the patterns within your rule in isolation. If you scan for the patterns one by one and they each find what you expect, the issue is with the Boolean logic within your rule. Review the [rule syntax](/writing-rules/rule-syntax) to make sure the operators are meant to behave like you expect. If you managed to find a pattern that behaves incorrectly, continue debugging with the section below.

## If your pattern doesn't match where it should

If you isolated the issue to one specific pattern, here are some common issues to look out for:

- When referencing something imported from a module, you need to fully qualify the import path. To match `import google.metrics; metrics.send(foo)` in Python, your pattern needs to be `google.metrics.send(...)` instead of `metrics.send(...)`.
- If your pattern uses a metavariable, make sure it's all uppercase and does not start with a number. Valid metavariable names include `$X`, `$NAME`, and `$_VAR_2`. Invalid metavariable names include `$name`, `$1stvar` and `$VAR-WITH-DASHES`.

## If a regex pattern doesn't match where it should

- When using `metavariable-regex`, the regex will match against all characters of the found metavariable. This means that if the metavariable matches a `"foo"` string in your code, the `metavariable-regex` pattern will run against a five character string with the quote characters at either end.
- Note that using the pipe (`|`) character will append a newline to your regex! If you are writing `pattern-regex: |` and then a newline with the regex, you almost certainly want the `|-` operator as in `pattern-regex: |-` to remove that trailing newline.
