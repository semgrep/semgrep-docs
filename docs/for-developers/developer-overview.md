---
slug: developer-overview
title: Overview
hide_title: true
displayed_sidebar: devSidebar
description: tk
tags:
  - Developers
---

# Semgrep for developers

This guide is for developers who are using Semgrep in a team or organizational setting.

Use Semgrep to:

- Lint your code
- Triage security issues
- Automate code reviews among your peers
- Follow security practices set by security engineers

This document provides an overview of **how** Semgrep scans and detects issues in your code. For a guide on triaging, remediating, and fixing issues with Semgrep, see [Resolve findings with Semgrep](/for-developers/resolve-findings).

:::note Developer and AppSec roles
If you are a developer responsible for your **own** security program in personal projects, see the [Quickstart](/getting-started/quickstart) and [Core deployment](/deployment/core-deployment) docs.
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or Semgrep (**sem**antic **grep**), is a software suite for implementing and tracking security programs. AppSec engineers use Semgrep to detect, triage, and remediate findings.

Developers primarily interact with Semgrep when Semgrep scans, then notifies users of issues in their code. Issues detected by Semgrep are called **findings**. The pattern-matching logic by which Semgrep detects a finding is encapsulated in a **rule**. Semgrep performs various static analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

### Developer workflows with Semgrep

Your interactions with Semgrep may vary depending on your organization's deployment of it. Semgrep is almost always integrated into your CI and source code manager (SCM) and automatically runs on every pull request or merge request you open. These scans are **diff-aware** and only affect the scope of your PR, which keeps the scan speed fast. Your security engineer may configure Semgrep to display PR or MR comments about certain **blocking** or **non-blocking** findings to you, which you can resolve or ignore from within your SCM.

![A PR comment detecting a hardcoded secret](/img/guardrails-secrets.png)
_**Figure**. A PR comment detecting a hardcoded secret._

It is less frequent, but still common, for developers to run Semgrep as part of their day-to-day coding workflow in the following environments:

-  IDEs (VS Code and IntelliJ)
-  CLI
-  `pre-commit`

Your AppSec team is likely to have guidelines about Semgrep scans in these environments. Your organization guidelines may require you to perform scans in some of these environments, or they may be optional.

:::tip Noise in your pull requests or merge requests?
Your security engineers are in full control of what findings are displayed to you. If you notice a high rate of false positives, tell your security engineers so that they can tune your scans. 
:::

## `grep`, linters, and Semgrep

![A summary of differences between grep, linters, and Semgrep.](/img/linters-semgrep-comparison.png)
_**Figure**. A summary of differences between `grep`, linters, and Semgrep._
## How Semgrep scans your code

Semgrep enables you to:

- Search for code semantically
- Codify those search parameters as a **rule**
- Run the rule on every keystroke, commit, pull request, and merge

### Transparency and determinism 

Semgrep is transparent because you can inspect the rules and analyses that are run on your code. Rules establish what should match (for example, `==`) and what shouldn't match. They have the following characteristics:

- Rules are written in YAML. By having a single schema for all supported programming languages, you can write rules for any programming language that Semgrep supports.
  - In contrast, linters vary in customizability. Linters that let you write your own rules require to you learn that linter's rule schema, which can only be applied to that linter's programming language.
- A rule has a **confidence level** to indicate the likelihood it is a true positive.
- A rule includes a **message** to help you remediate or fix.

Semgrep is deterministic; given the same set of inputs, such as your code and rules, and the same analyses, Semgrep always finds the same findings.

### Rule examples

Click the following boxes to learn about Semgrep's pattern matching mechanisms and analyses. Or, continue to [Resolve findings with Semgrep]((/for-developers/resolve-findings)) to learn common developer workflows with Semgrep.

<details>
<summary>Simple syntax-based example: ban the use of `==` in JavaScript</summary>

#### Simple syntax-based example

For example, you may want to ban the use of `==` in JavaScript and instead require `===` to avoid **type coercion** when evaluating expressions, a common standard enforced in popular JavaScript linters. This is a simple find and replace in many text editors, because the ban is enforced for **all** usages of `==`. In Semgrep, you can create a rule codifying this find and replace operation to share or enforce this standard.

<iframe title="Prevent type coercion in JavaScript ==" src="https://semgrep.dev/embed/editor?snippet=5rUdbO1" width="100%" height="432px" frameBorder="0"></iframe>
_**Figure**. Prevent type coercion in `==`. Click **<i class="fa-solid fa-play"></i> Run** to view the findings._

This simple rule is accurate because it only requires the syntax defined in `pattern` to match, not the semantics. The **metavariables** $A and $B always evaluate to some value on the left and right hand side of the `==` operator, and that is all that matters, not the meaning or of $A and $B themselves.

:::info Metavariables
[Metavariables](/writing-rules/pattern-syntax#metavariables) are an abstraction to match code when you don’t know the value or contents ahead of time, similar to capture groups in regular expressions.
:::
</details>

<details>
<summary>Complex syntax-based example: ban `console.log` in external or user-facing functions</summary>

#### Complex syntax-based example

It is a common convention to ban all uses of some language feature in user-facing code, such as `console.log()`, or `console.log()` may be permitted internally but not externally.

Semgrep enables you to create a custom best practices set of rules around cases like this.

<iframe title="Ban console.log external or user-facing functions" src="https://semgrep.dev/embed/editor?snippet=1AP5" width="100%" height="432px" frameBorder="0"></iframe>

tk explanation

</details>

<details>
<summary>Semantic taint analysis: detecting unsanitized data from source to sink</summary>

#### Semantic taint analysis example

A more complex example is detecting if **unsanitized data** is flowing from some **source**, such as saved form data, to a **sink** without sanitization.

```yaml
rules:
  - id: decoded-xss
    message: Untrusted input could be used to tamper with a web page rendering,
      which can lead to a Cross-site scripting (XSS) vulnerability. XSS
      vulnerabilities occur when untrusted input executes malicious JavaScript
      code, leading to issues such as account compromise and sensitive
      information leakage. To prevent this vulnerability, validate the user
      input, perform contextual output encoding or sanitize the input.
    severity: WARNING
    metadata:
      vulnerability_class:
        - Cross-Site-Scripting (XSS)
    languages:
      - javascript
      - typescript
    mode: taint
    options:
      interfile: true
      symbolic_propagation: true
    pattern-sources:
```
</details>

## Semgrep's approach to security: secure guardrails

tk


