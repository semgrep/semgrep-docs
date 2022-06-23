---
slug: contributing-to-semgrep-rules-repository
description: "This article outlines how to contribute to Semgrep rules repository."
---

# Contributing to Semgrep rules

## Introduction

There are two ways in which you can contribute to the Semgrep rules repository:

<dl>
    <dt>For users of Semgrep App</dt>
    <dd>Contribute to the Semgrep rules repository through Semgrep App. This workflow is recommended. See <a href="#contributing-through-semgrep-app-recommended"> Contributing through Semgrep App (recommended)</a>. This workflow creates the necessary pull request for you and streamlines the whole process.
</dd>
    <dt>For contributors to the repository through GitHub</dt>
    <dd>Contribute to the Semgrep rules repository through a pull request. See the <a href="#contributing-through-github"> Contributing through GitHub</a> section for detailed information.</dd>
</dl>

### Contributing through Semgrep App (recommended)

To contribute to the Semgrep rules repository through Semgrep App, follow these steps:
1. Go to [Semgrep App Editor](https://semgrep.dev/orgs/-/editor).
2. Click **Create New Rule**.
3. Make one of the following steps:
    - Create a new rule and test code, and then click **Save**. Note: The test file must contain at least one true positive and one true negative test case to be approved. See the [Tests](#tests) section of this document for more information.
    - Select a rule from a category in **Semgrep Registry**. Modify the rule or test code, click **Save**, and then **Fork**.
4. Click **Share**.

This workflow automatically creates a pull request in the GitHub [rules repository](https://github.com/returntocorp/semgrep-rules). Find more about the rules repository by reading the [Rule writing](#rule-writing) and [Tests](#tests) sections.

### Contributing through GitHub

Fork our repository and make a pull request; we'll contact you about signing our Contributor License Agreement (CLA). Install pre-commit (see [installing pre-commit](#installing-pre-commit)) and make a pull request to the [rules repository](https://github.com/returntocorp/semgrep-rules) with two files:
1. The semgrep pattern (as YAML file).
2. The test file (with the file extension of the language or framework). The test file must contain at least one true positive and one true negative test case to be approved. See the [Tests](#tests) section of this document for more information.

See an example of a [pull request](https://github.com/returntocorp/semgrep-rules/pull/1728/files) to the rules repository. Pull requests require the approval of at least one maintainer and successfully passed [CI jobs](https://github.com/returntocorp/semgrep-rules/actions).

Find more about the rules repository by reading the [Rule writing](#rule-writing) and [Tests](#tests) sections.

#### Installing `pre-commit`

If you are contributing to the rules repository through GitHub but you are **not** contributing through sharing your rule in Semgrep App, install `pre-commit`. Follow [pre-commit installation documentation](https://pre-commit.com/#installation). Once `pre-commit` is set up you may commit code and create pull requests to rules repository.

## Rule writing

### Understanding rule namespacing

The namespacing format for contributing rules in the [rules repository](https://github.com/returntocorp/semgrep-rules) is `<language>/<framework>/<category>/$MORE`. If the rule does not belong to a particular framework, add it to the language directory, which uses the word `lang` in place of the `<framework>`.

### Rule messages

A well-written rule message includes:

1. Description of the pattern. For example: missing parameter, dangerous flag, out-of-order function calls.
2. Description of why this pattern was detected. For example: logic bug, introduces a security vulnerability, bad practice.
3. An alternative that resolves the issue. For example: Use another function, validate data first, and discard the dangerous flag.

For an example of a good rule message, see: [this rule for Django's mark_safe](https://semgrep.dev/r?q=python.django.security.audit.avoid-mark-safe.avoid-mark-safe).

Use the YAML multiline string operator `>-`. Write the rule message as just one long line or multiple lines, they are interpreted as one line. This presents the best-looking rule message on the command-line.

```yaml
message: >-
  This is one line
  of text. Also, when
  we say that "quotes
  are only quotes".
  they are just quotes. 
```

The command-line output will be similar to the following:

```
This is one line of text. Also, when we say that "quotes are only quotes" they are just quotes.
```

:::info
`mark_safe()` is used to mark a string as *safe* for HTML output. This disables escaping and may expose the content to XSS attacks. Instead, use `django.utils.html.format_html()` to build HTML for rendering.
:::

### Rule quality checker

When you contribute rules to the rules repository, our quality checkers (linters) evaluate if the rule conforms to r2c standards. The `semgrep-rule-lints` job runs linters on a new rule to check for mistakes, performance problems, and best practices for submitting to the Semgrep rules repository. To improve your rule writing, use Semgrep itself to [scan semgrep-rules](https://r2c.dev/blog/2021/how-we-made-semgrep-rules-run-on-semgrep-rules/).

### Including additional details with rule metadata

Rules require a `metadata` key where you can specify a category of the rule, the technology which a rule is targeting, and give additional information as references. See the following example of a rule with all metadata fields [check-dynamic-render-local-file-include](https://semgrep.dev/orgs/adamkvitek/editor/s/returntocorp:check-dynamic-render-local-file-include).

Include the following keys under the `metadata` field:
- Include `category` field, and then choose one of the following values for this field:
    - `security` - If you use this value, include `owasp` and `cwe` fields as well. To see these fields in use, check the [example rule](https://semgrep.dev/orgs/-/editor/s/returntocorp:check-dynamic-render-local-file-include), and [Common Weakness Enumeration](https://cwe.mitre.org/) (CWE) and [OWASP categories](https://owasp.org/www-project-top-ten/) for more details. If a `security` rule is detecting the use of a bad pattern, append an `audit` to your namespace. This distinguishes the rule from a `security` rule that is aiming to detect a vulnerability.
    - `best-practice`
    - `correctness`
    - `maintainability`
    - `performance`
- Include the `technology` field. This is usually the library or framework the rule is targeting, for example `django`. If it's for the language itself, use only the language name, for example `python`.
- Include the `references` field. References can provide additional context to users of the rule. It is good practice to include at least one reference for each rule.

Rule examples:
- [python.lang.security.deserialization.avoid-pyyaml-load.yaml](https://semgrep.dev/orgs/-/editor/r/python.lang.security.deserialization.avoid-pyyaml-load.avoid-pyyaml-load)
- [python/flask/security/dangerous-template-string.yaml](https://semgrep.dev/orgs/-/editor/r/python/flask/security/dangerous-template-string.yaml)
- [python/flask/security/audit/render-template-string.yaml](https://semgrep.dev/orgs/-/editor/r/python/flask/security/audit/render-template-string.yaml)
- [javascript/lang/best-practice/assigned-undefined.yaml](https://semgrep.dev/orgs/-/editor/r/javascript/lang/best-practice/assigned-undefined.yaml)
- [java/rmi/security/server-dangerous-class-deserizaliation.yaml](https://semgrep.dev/orgs/-/editor/r/javascript/lang/best-practice/assigned-undefined.yaml)

## Tests

Include a test file to accompany new rules. A good test file includes the following:

- At least one test where the rule detects a finding. This is called a true positive finding.
- At least one test where the rule does **not** detect a finding. This is called a true negative finding.

See an example of this approach in the [Semgrep App](https://semgrep.dev/orgs/-/editor/s/returntocorp:aws-provider-static-credentials).

Test file names must match the rule file name, except for the file extension. For example, if the rule is in `my-rule.yaml`, name the test `my-rule.js`. (You can use any valid extension for the target language.)

In the test file, mark what is demonstratively expected to be a finding. See the examples of the rule and test file below:

Rule file:
```yaml
rules:
- id: my-rule
  pattern: var $X = "...";
  …
```

Test file:
```js
// ruleid: my-rule
var strdata = "hello";
// ok: my-rule
var numdata = 1;
```

For more information, visit [Testing rules](https://semgrep.dev/docs/writing-rules/testing-rules/).
