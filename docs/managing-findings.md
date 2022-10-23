---
slug: managing-findings
append_help_link: true
description: "A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. Learn how to interact with findings that come from running Semgrep in the command-line, in CI, and through Semgrep App."
---

import MoreHelp from "/src/components/MoreHelp"
import TriageStatuses from "/src/components/reference/_triage-states.mdx"

# Managing findings

## Findings

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. After matching, a finding can make its way through 3 parts of the Semgrep ecosystem: [Semgrep CLI](https://github.com/returntocorp/semgrep), [Semgrep CI](/semgrep-ci/overview/), and [Semgrep App](https://semgrep.dev/manage).

## Semgrep CLI

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

## Semgrep CI

[Semgrep CI](/semgrep-ci/overview/), designed to continuously scan commits and builds, improves on Semgrep findings to track the lifetime of an individual finding. When configured to perform a diff scan, it will only show new findings relative to some specified baseline commit.

In the code, a Semgrep CI finding is defined by a 4-tuple:

```
(rule ID, file path, syntactic context, index)
```

These states correspond to:

1. `rule ID`: The rule's ID within the Semgrep ecosystem.
1. `file path`: The filesystem path where the finding occurred.
1. `syntactic context`: The lines of code corresponding to the finding.
1. `index`: An index into identical findings within a file. This is used to disambiguate findings if the same `syntactic context` occurs multiple times in the same file.

## Semgrep App

Semgrep App builds on Semgrep CI findings to track status and provide additional context for managing findings within your organization. A finding can occupy 4 statuses in Semgrep App: `OPEN`, `IGNORED`, `FIXED`, `REMOVED`.

### Finding status

You can manage finding status through triage in Semgrep App's Findings page. The finding statuses are as follows:

<TriageStatuses />

:::info
For more information, see [Getting started with Semgrep App](/semgrep-app/getting-started-with-semgrep-app/) and [Managing findings in Semgrep App](/semgrep-app/findings/).
:::

<MoreHelp />
