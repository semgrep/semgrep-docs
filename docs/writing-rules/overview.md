# Getting started

### Tutorial

If you want the best introduction to writing Semgrep rules, use the interactive, example-based [Semgrep rule tutorial](https://semgrep.dev/learn).

### Do it live!
You can write and share rules directly from the [live editor](https://semgrep.dev/editor). You can also write rules in your terminal and run them with the Semgrep command line tool.

You can write rules that do things like:

- Automate code review comments
- Identify secure coding violations
- Scan configuration files
- And more! Check out more use cases [here](rule-ideas.md).

This rule detects the use of `is` when comparing Python strings. `is` checks reference equality, not value equality, and can exhibit nondeterministic behavior.

<iframe title="Semgrep example Python is comparison" src="https://semgrep.dev/embed/editor?snippet=Ppde" width="100%" height="432px" frameborder="0"></iframe>

### Reference material

- [Pattern syntax](pattern-syntax.md) describes what Semgrep patterns can do
in detail, and provides example use cases of the ellipsis
operator, metavariables, and more.<br/>
- [Rule syntax](rule-syntax.md) describes Semgrep YAML rule files, which can have multiple patterns, detailed output messages, and autofixes. The syntax allows the composition of individual patterns with boolean operators.

Looking for ideas on what rules to write? See [Rule examples](rule-ideas.md) for common use cases and prompts to help you start writing rules from scratch.
