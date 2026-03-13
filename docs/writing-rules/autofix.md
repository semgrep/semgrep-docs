---
append_help_link: true
slug: rule-defined-fix
tags:
 - Rule writing
description: Learn how to use Semgrep rules' autofix key to provide suggested fixes for matched patterns through pull request or merge request comments.
---

# Rule-defined fix

Rule-defined fix is a Semgrep feature that lets you add suggested fixes to rules. 

Semgrep's rule format supports a `fix:` key that supports the replacement of metavariables and regex matches with potential fixes. When rules that include a Rule-defined fix are triggered, Semgrep suggests these fixes in your pull request or merge request comments. You can view and easily resolve the findings as part of your code review workflow. 


You can apply the Rule-defined fix directly to the file using the `--autofix` flag. To test the fix before applying it, use both the `--autofix` and `--dryrun` flags.

:::tip
Rule-defined fixes are deterministic and user-defined. Related AI-powered features include [Semgrep Assistant's Suggested fix](/semgrep-assistant/overview#autofix), which identifies code that needs to be fixed, and Semgrep Autofix, which can automatically generate a fix PR with a single click.
:::

## Example Rule-defined fix snippet

Sample Rule-defined fix (view in [Playground](https://semgrep.dev/s/R6g)):

```yaml
rules:
- id: use-sys-exit
  languages:
  - python
  message: |
    Use `sys.exit` over the python shell `exit` built-in. `exit` is a helper
    for the interactive shell and is not available on all Python implementations.
    https://stackoverflow.com/a/6501134
  pattern: exit($X)
  fix: sys.exit($X)
  severity: MEDIUM
```

## Create Rule-defined fix rules

See how to create a Rule-defined fix in the **Transforming code with Semgrep's Rule-defined fix** video:

<iframe class="yt_embed" width="100%" height="432px" loading="lazy" src="https://www.youtube.com/embed/8jfjWixmtvo" frameborder="0" allowfullscreen></iframe>

## Rule-defined fix with regular expression replacement

A variant of the `fix` key is `fix-regex`, which applies regular expression replacements (similar to `sed`) to matches found by Semgrep.

`fix-regex` has two required fields:

- `regex` specifies the regular expression to replace within the match found by Semgrep
- `replacement` specifies what to replace the regular expression with.

`fix-regex` also takes an optional `count` field, which specifies how many occurrences of `regex` to replace with `replacement`, from left-to-right and top-to-bottom. By default, `fix-regex` will replace all occurrences of `regex`. If `regex` does not match anything, no replacements are made.

The replacement behavior is identical to the `re.sub` function in Python. See these [Python docs](https://docs.python.org/3/library/re.html#re.sub) for more information.

An example rule with `fix-regex` is shown below. `regex` uses a capture group to greedily capture everything up to the final parenthesis in the match found by Semgrep. `replacement` replaces this with everything in the capture group (`\1`), a comma, `timeout=30`, and a closing parenthesis. Effectively, this adds `timeout=30` to the end of every match.

```yaml
rules:
- id: python.requests.best-practice.use-timeout.use-timeout
  patterns:
  - pattern-not: requests.$W(..., timeout=$N, ...)
  - pattern-not: requests.$W(..., **$KWARGS)
  - pattern-either:
    - pattern: requests.request(...)
    - pattern: requests.get(...)
    - pattern: requests.post(...)
    - pattern: requests.put(...)
    - pattern: requests.delete(...)
    - pattern: requests.head(...)
    - pattern: requests.patch(...)
  fix-regex:
    regex: '(.*)\)'
    replacement: '\1, timeout=30)'
  message: |
    'requests' calls default to waiting until the connection is closed.
    This means a 'requests' call without a timeout will hang the program
    if a response is never received. Consider setting a timeout for all
    'requests'.
  languages: [python]
  severity: MEDIUM
```

## Remove a code detected by a rule

Improve your code quality by cleaning up stale code automatically. To remove code idetified by a Rule-defined fix, add the `fix` key with an empty string `""`.

For example:

```yaml
 - id: python-typing
   pattern: from typing import $X
   fix: ""
   languages: [ python ]
   message: found one
   severity: ERROR
```

When you apply this Rule-defined fix, the detected code is removed.
