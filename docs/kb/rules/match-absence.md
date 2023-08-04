---
description: You can approximate this behavior by matching an entire file, but excluding the desired content from the match.
tags:
  - Rules
  - Semgrep Registry
  - Semgrep Code
---

# Match the absence of something in a file

Currently, Semgrep does not have a clear way to match the absence of a pattern, rather than the presence of one. However, you can approximate this behavior by matching an entire file with `pattern-regex`, and excluding a file that contains the desired content with `pattern-not-regex` or other negative patterns.

Here is a simple example:

```yml
rules:
  - id: a
    patterns:
      - pattern-regex: |
          (?s)(.*)
      - pattern-not-regex: .*YOUR PATTERN TO BLOCK
    message: match
    languages:
      - generic
    severity: ERROR
```

:::note Example
Try this pattern in the [Semgrep Playground](https://semgrep.dev/playground/s/vop8). 
:::

The regular expression pattern `(?s)(.*)` uses the `s` flag to put the match in "single-line" mode, so that the dot character matches a newline. This allows `(.*)` to match multiple lines, and therefore match an entire file.

If the file contains `YOUR PATTERN TO BLOCK`, then the match is negated and the file does not appear as a finding. If the file does not contain `YOUR PATTERN TO BLOCK`, the file is flagged as a finding. With this rule, the finding spans the whole file, starting at line 1.


