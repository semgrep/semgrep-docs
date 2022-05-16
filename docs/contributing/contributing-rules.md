---
slug: contributing-to-semgrep-rules-repository
description: "This article outlines how to contribute to Semgrep rules repository.."
---

# Contributing to Semgrep rules

## Two ways how to contribute

We welcome your contributions to Semgrep rules! There are two ways in which you can contribute to Semgrep rules repository:

For users of Semgrep App
Contribute to the Semgrep rules repository through Semgrep App. This workflow is recommended. See [TODO link in markdown] Contributing with rules through Semgrep App section for more information. This workflow creates the necessary pull request for you and streamlines the whole process.
For contributors to the repository through GitHub [TODO, change this to a description list] 
Contribute to the Semgrep [rules repository](https://github.com/returntocorp/semgrep-rules) through your own pull request. See [TODO link in markdown] Contributing through GitHub for detailed information.

### Contributing through Semgrep App (recommended)

To contribute to the Semgrep rules repository through Semgrep App, follow these steps:
1. Go to [Semgrep App Editor](https://semgrep.dev/orgs/-/editor).
2. Click **Create New Rule**.
3. Make one of the following steps:
    a. Create a new rule and test code, and then click **Save**. Note: The test file must contain at least one positive and one negative test case in order to get approved!
    b. Select a rule from a category in **Semgrep Registry**. Modify the rule or test code, click **Save**, and then **Fork**.
4. Click **Share**.
This workflow automatically creates a pull request in GitHub [rules repository](https://github.com/returntocorp/semgrep-rules).

### Contributing through GitHub

Feel free to fork our repository and make a pull request; we'll contact you about signing our CLA. Make a pull request to the  [TODO, change this to a description list] [rules repository](https://github.com/returntocorp/semgrep-rules) with two files:
1. The semgrep pattern (.yml)
2. The test file (with the file extension of the language or framework). The test file must contain at least one positive and one negative test case in order to get approved!

See an example of a [pull request](https://github.com/returntocorp/semgrep-rules/pull/1728/files) to the rules repository.
Pull requests require approval of at least one maintainer and successfully passed [CI jobs](https://github.com/returntocorp/semgrep-rules/actions).

#### Installing pre-commit


Install pre-commit if you are contributing to the rules repository through GitHub but you are **not** contributing through sharing your rule in Semgrep App.
1. Install [pre-commit](https://pre-commit.com/) by issuing the following command:
    ```sh
    python -m pip install pre-commit
    ```
2. Install the pre-commit hooks:
    ```sh
    pre-commit install
    ```
To check if `pre-commit` is working as expected, run the following command:
    ```sh
    pre-commit run --all
    ```
Once `pre-commit` is set up you may commit code and create pull requests.

## Rule writing

### Understanding rules repository file structure

The namespacing format for contributing rules in the [rules repository](https://github.com/returntocorp/semgrep-rules) is `<language>/<framework>/<category>/$MORE`. If the rule does not belong to a particular framework, add it to the language directory instead.

### Rule messages

A good rule message includes:
1. A description of the pattern. For example: missing parameter, dangerous flag, out-of-order function calls.
2. A description of why this pattern was detected. For example: logic bug, introduces a security vulnerability, bad practice.
3. An alternative that resolves the issue. For example: use another function, validate data first, and discard the dangerous flag.

For an example of a good rule message, see [this rule for Django's mark_safe()](https://github.com/returntocorp/semgrep-rules/blob/develop/python/django/security/audit/avoid-mark-safe.yaml).

:::note
'mark_safe()' is used to mark a string as *safe* for HTML output. This disables escaping and may expose the content to XSS attacks. Use 'django.utils.html.format_html()' to build HTML for rendering instead.
:::

### Rule quality checker

When you contribute rules to the rules repository, our quality checkers (linters) evaluate if the rule conforms to r2c standards. Use Semgrep to [scan semgrep-rules](https://r2c.dev/blog/2021/how-we-made-semgrep-rules-run-on-semgrep-rules/)! The `semgrep-rule-lints` job runs linters on a new rule submission to check for mistakes, performance problems, and best practices for submitting to the Semgrep rules repository.

### Including additional details with rule metadata

Rules require a `metadata` key where you can specify a category of the rule, the technology which a rule is targeting, and give additional information as references. See the following example of a rule with all metadata fields [check-dynamic-render-local-file-include](https://semgrep.dev/orgs/adamkvitek/editor/s/returntocorp:check-dynamic-render-local-file-include).

Include the following keys under `metadata` field:
- Include `category` field. Choose one of the following values for the `category` metadata field
    - `security` - If you use this value, include include `owasp` and `cwe` fields as well. See the [example rule](https://semgrep.dev/orgs/-/editor/s/returntocorp:check-dynamic-render-local-file-include) to see their use. See [common weaknesses](https://cwe.mitre.org/) and [OWASP categories](https://owasp.org/www-project-top-ten/) as well for more details. If a `security` rule is detecting the use of a bad pattern, append an `audit` to your namespace. This distinguishes the rule from a `security` rule that is aiming to detect a vulnerability.
    - `best-practice`
    - `correctness`
    - `maintainability`
    - `performance`
- Include `technology` field. This is usually the library or framework the rule is targeting, for example `django`. If it's for the language itself, use only the language name, for example `python`.
- Include `references` field. References can provide additional context to users of the rule. It is good practice to include at least one reference for each rule.
- The use of the YAML multiline string operator `>-` when rule messages span multiple lines. This presents the best-looking rule message in the command-line.

Some examples:
- [python.lang.security.deserialization.avoid-pyyaml-load.yaml](https://semgrep.dev/orgs/-/editor/r/python.lang.security.deserialization.avoid-pyyaml-load.avoid-pyyaml-load)
- [python/flask/security/dangerous-template-string.yaml](https://semgrep.dev/orgs/-/editor/r/python/flask/security/dangerous-template-string.yaml)
- [python/flask/security/audit/render-template-string.yaml](https://semgrep.dev/orgs/-/editor/r/python/flask/security/audit/render-template-string.yaml)
- [javascript/lang/best-practice/assigned-undefined.yaml](https://semgrep.dev/orgs/-/editor/r/javascript/lang/best-practice/assigned-undefined.yaml)
- [java/rmi/security/server-dangerous-class-deserizaliation.yaml](https://semgrep.dev/orgs/-/editor/r/javascript/lang/best-practice/assigned-undefined.yaml)

## Tests

Include a test file to accompany new rules. A good test file includes the following:
- At least one test where the rule detects a true positive finding. This is called a true positive finding.
- At least one test where the rule does **not** detect a finding. This is called a true negative finding.

See an example of this approach in the [Semgrep App](https://semgrep.dev/orgs/-/editor/s/returntocorp:aws-provider-static-credentials).

Test file names must match the rule file name, except for the file extension. For example, if the rule is in `my-rule.yaml`, name the test `my-rule.js`. (With any valid extension for the target language.)

In the test file, mark what is demonstratively expected to be a finding. See the examples of rule and test file below:

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
