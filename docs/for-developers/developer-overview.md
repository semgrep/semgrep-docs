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

:::tip Developer and AppSec roles
If you are a developer responsible for your **own** security program in personal projects, see the **Quickstart** and **Core deployment** docs.
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or Semgrep (**sem**antic **grep**), is a software suite for implementing and tracking security programs. AppSec engineers use Semgrep to detect, triage, and remediate findings.


Developers primarily use Semgrep to scan for issues in their code. Issues detected by Semgrep are called **findings**. Semgrep performs static analysis and several other analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

## How Semgrep scans your code

Semgrep enables you to:

- Search for code semantically
- Codify those search parameters as a **rule**
- Run the rule on every keystroke, commit, pull request, and merge

Semgrep is **deterministic** and **transparent**.

- Semgrep uses rules to establish what should match (for example, `==`) and what shouldn't match. Rules are written in YAML.
- A rule has a **confidence level** to indicate the likelihood it is a true positive.
- A rule includes a **message** to help you remediate or fix.

### Rule examples

#### Simple syntax-based example

For example, you may want to ban the use of `==` in JavaScript and instead require `===` to avoid **type coercion** when evaluating expressions, a common standard enforced in popular JavaScript linters. This is a simple find and replace in many text editors, because the ban is enforced for **all** usages of `==`. In Semgrep, you can create a rule codifying this find and replace operation to share or enforce this standard.

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=5rUdbO1" width="100%" height="432px" frameBorder="0"></iframe>

This simple rule is highly accurate because it only requires the syntax defined in `pattern` to match, not the semantics. The **metavariables** $A and $B always evaluate to some expression on the left and right hand side of the `==` operator, and that is all that matters, not the meaning of $A and $B.

#### Complex syntax-based example

#### Semantic taint analysis example
A more complex example is detecting if unsanitized data is flowing from some source to a sink without sanitization.

### Comparing grep, Semgrep, and linters



The following features ensure that Semgrep scans are fast and accurate:

Semgrep is deterministic and transparent


### Semgrep is customizable

### Semgrep's approach to security: secure guardrails

Your interactions with Semgrep may vary depending on your organization's deployment of Semgrep.
