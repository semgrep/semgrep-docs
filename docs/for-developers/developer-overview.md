---
slug: developer-overview
title: Semgrep for developers
hide_title: true
displayed_sidebar: scanSidebar
description: tk
tags:
  - tk
---

# Semgrep for developers

This guide is for developers who are using Semgrep in a team or organizational setting. Use Semgrep to:

- Lint your code
- Triage security issues
- Automate code reviews among your peers
- Follow security practices set by security engineers

This guide provides an overview of how Semgrep works for you to better understand how Semgrep may integrate into your workflows.

:::note Developer and AppSec roles
If you are a developer responsible for your **own** security program in personal projects, see the **Quickstart** and **Core deployment** docs.
tk links
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or Semgrep (**sem**antic **grep**), is a software suite for implementing and tracking security programs. AppSec engineers use Semgrep to detect, triage, and remediate findings.

Developers primarily use Semgrep to scan for issues in their code. Issues detected by Semgrep are called **findings**. Semgrep performs static analysis and several other analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

### How Semgrep affects your workflows

You can run Semgrep as part of your day-to-day coding workflow in the following environments:

-  IDEs (VS Code and IntelliJ)
-  CLI
-  `pre-commit`

Your AppSec team is likely to have guidelines about Semgrep scans in these environments. Depending on your org guidelines, you may perform scans in some or none of these environments.

In the broader organizational context, Semgrep is typically integrated into your CI and automatically runs on every pull request or merge request you open. These scans are **diff-aware** and only affect the scope of your PR, which keeps the scan speed fast. Your security engineer may configure Semgrep to display certain **blocking** or **non-blocking** findings to you, which you can resolve or ignore.

:::tip Noise in your PR or MR?
Your security engineers are in full control of what findings are displayed to you. If you notice a high rate of false positives, tell your security engineers so that they can tune your scans. 
:::

## `grep`, linters, and Semgrep

tk

## How Semgrep scans your code

Semgrep enables you to:

- Search for code semantically
- Codify those search parameters as a **rule**
- Run the rule on every keystroke, commit, pull request, and merge

### Transparency and determinism 

Semgrep is transparent because you can inspect the rules and analyses that are run on your code. Rules establish what should match (for example, `==`) and what shouldn't match. They have the following characteristics:

- Rules are written in YAML. By having a single schema for all supported programming languages, you can write rules for any programming language tha Semgrep supports.
  - In contrast, linters vary in customizability. Linters that let you write your own rules require to you learn that linter's rule schema, which can only be applied to that linter's programming language.
- A rule has a **confidence level** to indicate the likelihood it is a true positive.
- A rule includes a **message** to help you remediate or fix.

Semgrep is deterministic; given the same set of inputs, such as your code and rules, and the same analyses, Semgrep always finds the same findings.

### Rule examples

<details>
<summary>Simple syntax-based example: ban the use of `==` in JavaScript</summary>

#### Simple syntax-based example

For example, you may want to ban the use of `==` in JavaScript and instead require `===` to avoid **type coercion** when evaluating expressions, a common standard enforced in popular JavaScript linters. This is a simple find and replace in many text editors, because the ban is enforced for **all** usages of `==`. In Semgrep, you can create a rule codifying this find and replace operation to share or enforce this standard.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=5rUdbO1" width="100%" height="432px" frameBorder="0"></iframe>

This simple rule is highly accurate because it only requires the syntax defined in `pattern` to match, not the semantics. The **metavariables** $A and $B always evaluate to some expression on the left and right hand side of the `==` operator, and that is all that matters, not the meaning of $A and $B.
</details>

#### Complex syntax-based example

#### Semantic taint analysis example
A more complex example is detecting if unsanitized data is flowing from some source to a sink without sanitization.




### Semgrep is customizable

### Semgrep's approach to security: secure guardrails

Your interactions with Semgrep may vary depending on your organization's deployment of Semgrep.
