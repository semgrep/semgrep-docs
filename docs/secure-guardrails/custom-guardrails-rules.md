---
slug: custom-guardrails-rules
title: Custom rules
hide_title: true
description: Create custom rules for deployment as secure guardrails.
tags:
  - Secure guardrails
---

# Custom rules for secure guardrails

You can create custom Semgrep rules and deploy them as guardrails to enforce your organization's secure coding conventions.

## Prerequisites

- An understanding of [secure guardrails](/secure-guardrails/secure-guardrails-in-semgrep).
- Knowledge of the basic Semgrep rule structure is helpful. See [Rule syntax](/writing-rules/rule-syntax) and [Pattern syntax](/writing-rules/pattern-syntax) documentation.
- Enabling [Code search (beta)](/semgrep-code/editor#code-search-beta/) is useful in verifying that your rule matches what you want it to match within your repositories.

## General steps

1. Create a custom Semgrep rule.
1. Verify and test that the rule matches the code you want to detect.
1. Optional: Set the custom Semgrep rule as a secure default.
1. Deploy the rule as a guardrail in the following developer interfaces: IDE, PR or MR comments, or `pre-commit`.

The following table lists the relevant documentation for each step:

| Steps | References and notes |
| -------  | ------ |
| Create a custom rule | In addition to the **[required fields](/writing-rules/rule-syntax#required)** of a Semgrep rule, the following metadata fields are useful: <ul><li>`category`</li><li>`confidence`</li><li>`likelihood`</li><li>`impact`</li><li>`subcategory`</li></ul>Filling out `confidence` and `impact` in particular is useful for filtering rules within the Semgrep web app.<br /><br />Read the [metadata reference documentation](/contributing/contributing-to-semgrep-rules-repository#including-fields-required-by-security-category). |
| Verify that the rule matches as intended         |  <ul><li>See [Testing rules](/writing-rules/testing-rules).</li><li>Enable [Code search (beta)](/semgrep-code/editor#code-search-beta/) to test the rule on live repositories.</li></ul>      |
| Optional: Set the rule as a secure default        | When creating a custom secure default, you must use `category: security` and `subcategory: secure default` values in your rule (see [Secure default snippet](#secure-default-snippet)). |
| Deploy the rule as a guardrail         |  For PR or MR comments: <ul><li>[Ensure that PR or MR comments have been set up correctly.](/category/pr-or-mr-comments)</li><li>Set the rule to [Comment or Block mode](/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes).</li></ul><p>For IDEs: Require developers to install the [Semgrep extension for their IDE](/extensions/overview).</p><p>For `pre-commit`: [Install and configure Semgrep for `pre-commit`](/extensions/overview#pre-commit).</p> |


### Secure default snippet

When creating a custom secure default, you must use `category: security` and `subcategory: secure default`  values in your rule:

```yaml
rules:
  - id: some-custom-default
    ...
    metadata:
      category: security
      subcategory:
        - secure default
    ...
```
