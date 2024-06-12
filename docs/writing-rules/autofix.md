---
append_help_link: true
tags:
  - Rule writing
---

# Autofix

Autofix is a Semgrep feature where rules contain suggested fixes to resolve findings.

Semgrep's rule format supports a `fix:` key that supports the replacement of metavariables and regex matches with potential fixes. This allows for value capture and rewriting. With rules that make use of the autofix capability, you can resolve findings as part of your code review workflow. Semgrep suggests these fixes through GitHub PR or GitLab MR comments.

You can apply the autofix directly to the file using the `--autofix` flag. To test the autofix before applying it, use both the `--autofix` and `--dryrun` flags.

## Example autofix snippet

Sample autofix (view in [Playground](https://semgrep.dev/s/R6g)):

```yaml
rules:
- id: use-sys-exit
  languages:
  - python
  message: |
    Use `sys.exit` over the python shell `exit` built-in. `exit` is a helper
    for the interactive shell and is not be available on all Python implementations.
    https://stackoverflow.com/a/6501134
  pattern: exit($X)
  fix: sys.exit($X)
  severity: WARNING
```

## Create autofix rules

See how to create an autofix rule in **Transforming code with Semgrep autofixes** video:

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/8jfjWixmtvo" frameborder="0" allowfullscreen></iframe>

## Autofix with regular expression replacement

A variant on the `fix` key is `fix-regex`, which applies regular expression replacements (think `sed`) to matches found by Semgrep.

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
  severity: WARNING
```

## Remove a code detected by a rule

Improve your code quality by cleaning up stale code automatically. Remove code that an autofix rule detected by adding the `fix` key with `""`, an empty string.

For example:

```yaml
 - id: python-typing
   pattern: from typing import $X
   fix: ""
   languages: [ python ]
   message: found one
   severity: ERROR
```

When an autofix is applied, this rule removes the detected code.
