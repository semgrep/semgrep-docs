---
id: overview
displayed_sidebar: rulewritingSidebar
description: >-
  Learn how to use Semgrep’s intuitive syntax to write rules specific to your codebase. You can write and share rules directly from your browser using the Semgrep Playground, or write rules in your terminal and run them on the command line.
---

# Writing rules

### Tutorial

If you want the best introduction to writing Semgrep rules, use the interactive, example-based [Semgrep rule tutorial](https://semgrep.dev/learn).

### Do it live!

Write and share rules directly from the [Playground](https://semgrep.dev/editor). You can also write rules in your terminal and run them with the Semgrep command line tool.

You can write rules that:

- Automate code review comments
- Identify secure coding violations
- Scan configuration files
- See more use cases in [Rule ideas](rule-ideas.md).

This rule detects the use of `is` when comparing Python strings. `is` checks reference equality, not value equality, and can exhibit nondeterministic behavior.

<iframe title="Semgrep example Python is comparison" src="https://semgrep.dev/embed/editor?snippet=Ppde" width="100%" height="432px" frameBorder="0"></iframe>

### Next steps

The following articles guide you through rule writing basics or can provide you with needed references:

- [Pattern syntax](/writing-rules/pattern-syntax/) describes what Semgrep patterns can do in detail, and provides example use cases of the ellipsis operator, metavariables.
- [Rule syntax](rule-syntax.md) describes Semgrep YAML rule files, which can have multiple patterns, detailed output messages, and autofixes. The syntax allows the composition of individual patterns with boolean operators.
- [Contributing rules](/contributing/contributing-to-semgrep-rules-repository/) gives you an overview of where and how you can contribute to Semgrep Registry rules. This document also provides some information about tests and appropriate metadata information you may use for your rules.

Looking for ideas on what rules to write? See [Rule ideas](/writing-rules/rule-ideas/) for common use cases and prompts to help you start writing rules from scratch.
