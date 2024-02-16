---
slug: managing-findings
append_help_link: true
description: "Manage findings, the core results of Semgrep's analysis. Triage findings that come from Semgrep CLI, in CI, and through Semgrep Cloud Platform."
title: Managing findings
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import TriageStatuses from "/src/components/reference/_triage-states.mdx"

# Managing findings

## Findings

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. After matching, a finding can make its way through 3 parts of the Semgrep ecosystem: [Semgrep CLI](https://github.com/semgrep/semgrep), [Semgrep in CI](/semgrep-ci/overview/), and [Semgrep Cloud Platform](https://semgrep.dev/manage).

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

## Semgrep Cloud Platform

Semgrep Cloud Platform builds on CI findings to track status and provide additional context for managing findings within your organization. A finding can occupy one of four statuses in Semgrep Cloud Platform: `OPEN`, `IGNORED`, `FIXED`, `REMOVED`.

### Finding status

You can manage finding status through triage in Semgrep Cloud Platform's **Findings** page. The finding statuses are as follows:

<TriageStatuses />

:::info
For more information, see [Getting started with Semgrep Cloud Platform](/semgrep-cloud-platform/getting-started/) and [Managing findings in Semgrep Code](/semgrep-code/findings/).
:::

<MoreHelp />
