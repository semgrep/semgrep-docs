---
id: overview
displayed_sidebar: rulewritingSidebar
description: >-
  Learn how to use Semgrep’s intuitive syntax to write rules specific to your codebase. You can write and share rules directly from your browser using the Semgrep Editor, or you can write rules in your terminal and run them on the command line.
title: Overview
hide_title: true
tags:
  - Rule writing
---

# Write rules

You can write rules that:

- Automate code review comments.
- Identify secure coding violations.
- Scan configuration files.

See more use cases in [Rule ideas](rule-ideas.md).

## Get started

For an introduction to writing Semgrep rules, use the interactive, example-based [Semgrep rule tutorial](https://semgrep.dev/learn).

You can write rules in your terminal and run them with the Semgrep command line tool, or you can write and test using the [Semgrep Editor](https://semgrep.dev/editor).

For example, the following sample rule detects the use of `is` when comparing Python strings. `is` checks reference equality, not value equality, and can exhibit nondeterministic behavior.

<iframe title="Semgrep example Python is comparison" src="https://semgrep.dev/embed/editor?snippet=Ppde" width="100%" height="432px" loading="lazy" frameBorder="0"></iframe>

### Next steps

The following articles guide you through rule-writing basics and act as references:

- [Pattern syntax](/writing-rules/pattern-syntax) describes what Semgrep patterns can do in detail and provides sample use cases.
- [Rule syntax](rule-syntax.md) describes Semgrep YAML rule files, which can have multiple patterns, detailed output messages, and autofixes. The syntax allows the composition of individual patterns with Boolean operators.
- [Contributing rules](/contributing/contributing-to-semgrep-rules-repository) gives you an overview of how you can contribute to Semgrep Registry rules. This document also provides information about tests and metadata fields that you can use for your rules.

Need rule ideas? See [Rule ideas](/writing-rules/rule-ideas) for everyday use cases and prompts to help you start writing rules from scratch.
