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

:::tip Developer and AppSec role
- If you are a developer responsible for your **own** security program in personal projects, see the **Quickstart** and **Core deployment** docs.
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or Semgrep (**sem**antic **grep**), is a software suite for implementing and tracking security programs. AppSec engineers use Semgrep to detect, triage, and remediate findings.

Developers primarily use Semgrep to scan for issues in their code. Issues detected by Semgrep are called **findings**. Semgrep performs static analysis and several other analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

Semgrep scans can be run in various environments, including popular IDEs, on your local machine, and in CI.

## How Semgrep scans code

Semgrep enables you to:

- Search for code semantically
- Codify those search parameters as a **rule**
- Run the rule on every keystroke, commit, pull request, and merge

Semgrep uses various program analyses to generate findings, similar to a linter.

### Syntactic and semantic examples

For example, you may want to ban the use of `==` in JavaScript and instead require `===` to avoid **type coercion**.


A more complex example is detecting if unsanitized data is flowing from some source to a sink without sanitization.





The following features ensure that Semgrep scans are fast and accurate:

Semgrep is deterministic and transparent


### Semgrep is customizable

### Semgrep's approach to security: secure guardrails

Your interactions with Semgrep may vary depending on your organization's deployment of Semgrep.
