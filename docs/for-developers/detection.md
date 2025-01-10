---
slug: detection
title: How Semgrep works
hide_title: true
description: An introduction for developers about how Semgrep works.
tags:
  - Developer education
---

import ScanSpeedScope from "/src/components/reference/_scan-speed-scope.md"

# How Semgrep works

Semgrep enables you to:

- Search for code semantically
- Codify those search parameters as a **rule**
- Run the rule on every keystroke, commit, pull request, and merge

## `grep`, linters, and Semgrep

![A summary of differences between grep, linters, and Semgrep.](/img/linters-semgrep-comparison.png)
_**Figure**. A summary of differences between grep, linters, and Semgrep._

In addition to being a security tool, once customized, Semgrep can be used as a linter to help you and your team codify and follow best practices and to detect code smells.

You only need to learn a single rule-writing schema to write rules for many programming languages, rather than having to learn a new schema for each linter.

## Transparency and determinism

Semgrep is **transparent** because you can inspect the rules and analyses that are run on your code. Rules establish what should match (for example, you may want to look for and ban usages of `==` in JavaScript) and what shouldn't match. They have the following characteristics:

- Rules are written in YAML. By having a single schema for all supported programming languages, you can write rules for any programming language that Semgrep supports.
  - In contrast, linters vary in customizability. Linters that let you write your own rules require to you learn that linter's rule schema, which can only be applied to that linter's programming language.
- A rule has a **confidence level** to indicate the likelihood it is a true positive.
- A rule includes a **message** to help you remediate or fix.

Semgrep is **deterministic**; given the same set of inputs, such as your code and rules, and the same analyses, Semgrep always finds the same findings.

## Speed, scope and analysis

Semgrep can perform several types of analyses on a given scope, which affects its scan speed. The following table breaks down expected runtimes in each developer interface.

<ScanSpeedScope />

### Rule examples

Click the following boxes to learn about Semgrep's pattern matching mechanisms and analyses. Or, continue to [Resolve findings with Semgrep](/for-developers/resolve-findings) to learn common developer workflows with Semgrep.

<details>
<summary>Simple syntax-based example: ban the use of `==` in JavaScript</summary>

#### Simple syntax-based example

You may want to ban the use of `==` in JavaScript and instead require `===` to avoid **type coercion** when evaluating expressions. This is a common standard enforced in popular JavaScript linters. This is a simple find and replace in many text editors, because the ban is enforced for **all** usages of `==`. In Semgrep, you can create a rule codifying this find and replace operation to share or enforce this standard.

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

It is a common convention either to ban all uses of some language feature in user-facing code, such as `console.log()`, or to permit `console.log()` internally but not externally.

Semgrep enables you to create a custom best practices set of rules around cases like this.

<iframe title="Ban console.log external or user-facing functions" src="https://semgrep.dev/embed/editor?snippet=1AP5" width="100%" height="432px" frameBorder="0"></iframe>
_**Figure**. Ban `console.log` in external-facing functions. Click **<i class="fa-solid fa-play"></i> Run** to view the findings._

Notice that only **line 4** matches. This is because only line 4 has a `console.log()` function within `someExternalFunction()`.

This example defines both what matches within the external-facing function, and the external-facing function itself. This is achieved through the use of `pattern` and `pattern-inside`. The `...` **ellipsis** operator tells Semgrep to accept any number of arguments or values in `someExternalFunction()` and `console.log()`, thus capturing all possible variations of the functions.


</details>

<details>
<summary>Semantic taint analysis: detecting unsanitized data from source to sink</summary>

#### Semantic taint analysis example

A more complex example is detecting if **unsanitized data** is flowing from some **source**, such as saved form data, to a **sink**, without sanitization.

The following example is a simplified Semgrep rule that detects possible cross-site scripting vulnerabilities:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=zdD4Z" width="100%" height="432px" frameBorder="0"></iframe>
_**Figure**. Prevent possible cases of cross-site scripting due to unsanitized data. Click **<i class="fa-solid fa-play"></i> Run** to view the findings._

In this example, **lines 11 and 18** are the only two true positives.
- **Line 7** is not a match because `hash` has been sanitized through `sanitize(hash)`.
- **Line 9** stores the hash as a number, and the rule has defined this as a sanitizer as well.

Semgrep defines the `pattern-sources`, `pattern-sinks`, and `pattern-sanitizers` to make sure that the rule is accurate and contains no false positives or false negatives by including every possible way this type of XSS can occur and **excluding** those cases where the data has been sanitized. View the rule in its entirety to see how the rule catches all possible cases. 
</details>
