---
slug: managing-findings
append_help_link: true
description: "Manage findings, the core results of Semgrep's analysis."
title: Manage findings
hide_title: true
---

<!-- deprecating - it feels as though the content here should be about testing rules; once we removed the CI stuff, this doc didn't hold enough unique info to differentiate it from the common CLI / CI commands  -->

import MoreHelp from "/src/components/MoreHelp"

# Manage findings

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code.

Semgrep command line findings are produced by a specific rule matching a piece of code. Multiple rules can match the same piece of code, even if they are effectively the same rule. For example, consider the following rule and code snippet:

```yaml
rules:
- id: finding-test
  pattern: $X == $X
  message: Finding test 1
  languages: [python]
  severity: WARNING
- id: finding-test
  pattern: $X == $X
  message: Finding test 2
  languages: [python]
  severity: WARNING
```

```
print(1 == 1)
```

Running Semgrep

```sh
semgrep --quiet --config test.yaml test.py
```
Running Semgrep produces the following findings:

```sh
test.py
severity:warning rule:finding-test: Finding test 1
1:print(1 == 1)
--------------------------------------------------------------------------------
severity:warning rule:finding-test: Finding test 2
1:print(1 == 1)
```

For more information on writing rules, see [Rule syntax](/writing-rules/rule-syntax/).


-->

<MoreHelp />
