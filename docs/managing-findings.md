---
slug: managing-findings
append_help_link: true
description: "A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. Learn how to interact with findings that come from running Semgrep in the command-line, in CI, and through Semgrep App."
---

import MoreHelp from "/src/components/MoreHelp"
import TriageStates from "/src/components/reference/_triage-states.mdx"

# Managing findings

## Findings

A finding is the core result of Semgrep's analysis. Findings are generated when a Semgrep rule matches a piece of code. After matching, a finding can make its way through 3 parts of the Semgrep ecosystem: [Semgrep](https://github.com/returntocorp/semgrep), [Semgrep CI](../semgrep-ci/overview/), and [Semgrep App](https://semgrep.dev/manage).

## Semgrep

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

For more information on writing rules, see [Rule syntax](../writing-rules/rule-syntax/).

## Semgrep CI

[Semgrep CI](../semgrep-ci/overview/), designed to continuously scan commits and builds, improves on Semgrep findings to track the lifetime of an individual finding. A Semgrep CI finding is defined by a 4-tuple:

```
(rule ID, file path, syntactic context, index)
```

These pieces of state correspond to:

1. `rule ID`: the rule's ID within the Semgrep ecosystem.
1. `file path`: the filesystem path where the finding occurred.
1. `syntactic context`: the lines of code corresponding to the finding.
1. `index`: an index into identical findings within a file. This is used to disambiguate findings.

:::info
`syntactic context` is normalized by removing indentation, [`nosemgrep`](../ignoring-files-folders-code/#ignoring-code-through-nosemgrep) comments, and whitespace.
:::

These are hashed and returned as the syntactic identifier: `syntactic_id`. This is how Semgrep CI uniquely identifies findings and tracks them across state transitions. Semgrep CI does not store or transmit code contents. The `syntactic context` is hashed using a one-way hashing function making it impossible to recover the original contents.

## Semgrep App

Semgrep App builds on Semgrep CI findings to track state transitions and provide additional context for managing findings within your organization. A finding can occupy 4 states in Semgrep App: `OPEN`, `FIXED`, `IGNORED`, `REMOVED`.

### Finding states

Semgrep App finding states are as follows:

1. `OPEN`: The finding exists in the code and has not been muted.
1. `FIXED`: The finding existed in the code, and is no longer found.
1. `IGNORED`: The finding has been ignored by a `nosemgrep` comment or through `.semgrepignore`.
1. `REMOVED`: The finding's rule isn't enabled on the repository anymore. The rule was either removed from the used ruleset, or the rule was removed from the Rule Board.

You can manage findings through triage states in Semgrep App's Findings page. The triage states are as follows:

<TriageStates />

:::info
For more information, see [Getting started with Semgrep App](/semgrep-app/getting-started-with-semgrep-app/) and [Managing findings in Semgrep App](/semgrep-app/findings/).
:::

<MoreHelp />
