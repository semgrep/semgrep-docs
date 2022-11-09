---
slug: contributing-to-semgrep-rules-repository
description: "This article outlines how to contribute to Semgrep Registry."
hide_title: true
---

# Contributing rules

## Introduction

Publish rules in the open-source Semgrep Registry and share them with the Semgrep community to help others benefit from your rule-writing efforts and contribute to the field of software security. There are two ways in which you can contribute rules to the Semgrep Registry:

<dl>
    <dt>For users of Semgrep App</dt>
    <dd>Contribute rules to the Semgrep Registry through Semgrep App. This workflow is recommended. See <a href="#contributing-through-semgrep-app-recommended"> Contributing through Semgrep App (recommended)</a>. This workflow creates the necessary pull request for you and streamlines the whole process.
</dd>
    <dt>For contributors to the repository through GitHub</dt>
    <dd>Contribute rules to the Semgrep Registry through a pull request. See the <a href="#contributing-through-github"> Contributing through GitHub</a> section for detailed information.</dd>
</dl>

### Contributing through Semgrep App (recommended)

To contribute and publish rules to the Semgrep Registry through Semgrep App, follow these steps:

1. Go to [Playground](https://semgrep.dev/playground/new).
2. Click <i className="fa-solid fa-file-plus-minus inline_svg"></i> **Create New Rule**.
3. Choose one of the following:
    - Create a new rule and test code by clicking <i class="fa-solid fa-circle-plus"></i>, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**. Note: The test file must contain at least one true positive and one true negative test case to be approved. See the [Tests](#tests) section of this document for more information.
    - In the <i class="fa-solid fa-server"></i> **Library** panel, select a rule from a category in **Semgrep Registry**. Click <i className="fa-solid fa-code-branch inline_svg"></i> **Fork**,
    modify the rule or test code, and then click <i className="fa-solid fa-floppy-disk inline_svg"></i> **Save**.
4. Click <i className="fa-solid fa-earth-americas inline_svg"></i> **Share**.
5. Click <i className="fa-solid fa-cloud-arrow-up inline_svg"></i> **Publish to Registry**.
6. Fill in the required and optional fields.
7. Click <i className="fa-solid fa-circle-check inline_svg"></i> **Continue**, and then click <i className="fa-solid fa-code-pull-request inline_svg"></i> **Create PR**.

This workflow automatically creates a pull request in the GitHub [Semgrep Registry](https://github.com/returntocorp/semgrep-rules). Find more about the Semgrep Registry by reading the [Rule writing](#rule-writing) and [Tests](#tests) sections.

You can also publish rules to the Semgrep Registry as private rules. See the [Private rules](/docs/writing-rules/private-rules.md) documentation for more information.

### Contributing through GitHub

Fork our repository and make a pull request; we'll contact you about signing our Contributor License Agreement (CLA). Install pre-commit (see [installing pre-commit](#installing-pre-commit)) and make a pull request to the [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) with two files:
1. The semgrep pattern (as YAML file).
2. The test file (with the file extension of the language or framework). The test file must contain at least one true positive and one true negative test case to be approved. See the [Tests](#tests) section of this document for more information.

See an example of a [pull request](https://github.com/returntocorp/semgrep-rules/pull/1728/files) to the Semgrep Registry. Pull requests require the approval of at least one maintainer and successfully passed [CI jobs](https://github.com/returntocorp/semgrep-rules/actions).

Find more about the Semgrep Registry by reading the [Rule writing](#rule-writing) and [Tests](#tests) sections.

## Writing a rule for Semgrep Registry

### Tests

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

### Understanding rule namespacing

The namespacing format for contributing rules in the [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) is `<language>/<framework>/<category>/$MORE`. If the rule does not belong to a particular framework, add it to the language directory, which uses the word `lang` in place of the `<framework>` - `<language>/<lang>`.

### Rule messages

Include a rule message that provides details about the matched pattern and informs how to mitigate any related issues. Provide the following information in a rule message:

1. Description of the pattern. For example: missing parameter, dangerous flag, out-of-order function calls.
2. Description of why this pattern was detected. For example: logic bug, introduces a security vulnerability, bad practice.
3. An alternative that resolves the issue. For example: Use another function, validate data first, and discard the dangerous flag.

Use the YAML multiline string operator `>-` when rule messages span multiple lines. This presents the best-looking rule message on the command-line without having to worry about line wrapping or escaping the quote or backslash characters.

For an example of a good rule message, see: [this rule for Django's mark_safe](https://semgrep.dev/r?q=python.django.security.audit.avoid-mark-safe.avoid-mark-safe).

:::info Rule message example
`mark_safe()` is used to mark a string as *safe* for HTML output. This disables escaping and may expose the content to XSS attacks. Instead, use `django.utils.html.format_html()` to build HTML for rendering.
:::

### Including additional details with rule metadata

Rules in the Semgrep Registry require specific metadata fields that ensure consistency across the ecosystem in both Semgrep App and Semgrep CLI. These fields help users of Semgrep to identify rules in different categories such as:

- High confidence security rules for CI pipelines.
- OWASP Top 10 or CWE Top 25 rule packs.
- Technology. For example `react` so it is easy to find `p/react` rule packs.
- Audit rules with lower confidence intended for code auditors.

Nest these metadata under the `metadata` key. The following metadata are required:

<table>
  <thead><tr>
   <th>Metadata field</th>
   <th>Possible values</th>
   <th>Example use</th>
  </tr></thead>
  <tbody>
  <tr>
   <td>CWE</td>
   <td>A <a href="https://cwe.mitre.org/index.html">Comment Weakness Enumeration (CWE)</a>.</td>
   <td><code>cwe: "CWE-502: Deserialization of Untrusted Data"</code></td>
  </tr>
  <tr>
   <td>Confidence</td>
   <td><code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code></td>
   <td><code>confidence: MEDIUM</code></td>
  </tr>
  <tr>
   <td>Likelihood</td>
   <td><code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code></td>
   <td><code>likelihood: MEDIUM</code></td>
  </tr>
  <tr>
   <td>Impact</td>
   <td><code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code></td>
   <td><code>impact: HIGH</code></td>
  </tr>
  <tr>
   <td>Subcategory</td>
   <td><code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code></td>
   <td><code>impact: HIGH</code></td>
  </tr>
  <tr>
   <td>References</td>
   <td><code>HIGH</code>, <code>MEDIUM</code>, <code>LOW</code></td>
   <td><code>impact: HIGH</code></td>
  </tr>
  </tbody>
</table>

Examples of rules with full list of required metadata:

- [High confidence JavaScript/TypeScript rule](https://semgrep.dev/playground/r/javascript.express.security.audit.express-open-redirect.express-open-redirect)
- [Medium confidence Python rule](https://semgrep.dev/playground/r/python.lang.security.dangerous-system-call.dangerous-system-call)
- [Low confidence C# rule](https://semgrep.dev/playground/r/csharp.lang.security.ssrf.rest-client.ssrf)

```
  metadata:
    technology:
      - STRING
    references:
      - https://STRING
    cwe:
      - "CWE-NUMBER: STRING"
    category: security
    subcategory:
      - STRING
    likelihood: STRING
    impact: STRING
    confidence: STRING
```
Details of each field are provided in subsections below with examples:

#### CWE

Include the appropriate <a href="https://cwe.mitre.org/index.html">Comment Weakness Enumeration (CWE)</a>. CWE can explain what vulnerability is your rule trying to find. Examples:

If you write an SQL Injection rule, use the following:
```yaml
cwe:                
  - 'CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')'
```

If you write an XSS rule, use the following:
```yaml
cwe: 
  - 'CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')'
```

#### Confidence

Indicate confidence of the rule to detect true positives. See the possible options below:

- **HIGH** - Security concern, with high true positives. Useful in CI/CD pipelines.
- **MEDIUM** - Security concern, but some false positives. Useful in CI/CD pipelines.
- **LOW** - Expect a fair amount of false positives, similar to audit style rules. These rules can detect many false positives.

##### HIGH

HIGH confidence rules can use Semgrep advanced features such as `metavariable-comparison` or `taint mode`, to detect true positives. See examples below:

- https://semgrep.dev/orgs/-/editor/r/go.lang.security.audit.crypto.use_of_weak_rsa_key.use-of-weak-rsa-key
- https://semgrep.dev/playground/r/javascript.express.security.audit.express-open-redirect.express-open-redirect
- https://semgrep.dev/playground/r/javascript.jose.security.jwt-hardcode.hardcoded-jwt-secret?editorMode=advanced

```
confidence: HIGH 
```

##### MEDIUM

MEDIUM confidence rules can use Semgrep advanced features such as `metavariable-comparison` or `taint mode`, but with some false positives. See examples below:

- https://semgrep.dev/playground/r/javascript.express.security.audit.express-ssrf.express-ssrf
- https://semgrep.dev/playground/r/javascript.express.security.express-xml2json-xxe.express-xml2json-xxe?editorMode=advanced

```
confidence: MEDIUM 
```

##### LOW

Low confidence rules generally find something which appears to be dangerous while reporting a lot of false positives. See examples below:

- https://semgrep.dev/playground/r/php.lang.security.eval-use.eval-use
- https://semgrep.dev/playground/r/javascript.browser.security.dom-based-xss.dom-based-xss?editorMode=advanced

```
confidence: LOW 
```

#### Likelihood

Specify how likely it is that an attacker can exploit the issue that has been found. The possible values are `LOW`, `MEDIUM`, `HIGH`.

##### HIGH

HIGH likelihood rules specify a very high concern that the vulnerability can be exploited. Examples:

- The use of weak encryption: https://semgrep.dev/playground/r/go.lang.security.audit.crypto.use_of_weak_rsa_key.use-of-weak-rsa-key?editorMode=advanced
- Disabled security feature in a configuration
- Hardcoded secrets that use `"..."`: https://semgrep.dev/playground/r/javascript.jose.security.jwt-hardcode.hardcoded-jwt-secret?editorMode=advanced
- `taint mode sources` which reach a `taint mode sink` with `taint mode sanitizers`

```
likelihood: HIGH 
```

##### MEDIUM

MEDIUM likelihood rules detect a vulnerability in most circumstances. Although it can be hard for an attacker to exploit them. Also, these rules can detect part of a problem, but not the whole issue. Examples:

- `taint mode sources` which reach a `taint mode sink`  but the source is something which can only be vulnerable in certain conditions e.g. OS Environment Variables, or loading from disk: https://semgrep.dev/playground/r/python.aws-lambda.security.dangerous-spawn-process.dangerous-spawn-process?editorMode=advanced
- `taint mode sources` with a `taint mode sink` but is missing a `taint mode sanitizer` which can introduce more false positives: https://semgrep.dev/playground/r/javascript.express.security.express-puppeteer-injection.express-puppeteer-injection?editorMode=advanced

```
likelihood: MEDIUM 
```

##### LOW

LOW likelihood rules tend to find something dangerous, but are not evaluating whether something is truly vulnerable, for example:

- `taint mode sources` such as function arguments which may or may not be tainted which reach a `taint mode sink`: https://semgrep.dev/playground/r/typescript.react.security.audit.react-href-var.react-href-var?editorMode=advanced
- A rule which uses `search mode` to find the use of a dangerous function for example: `trustAsHTML`, `bypassSecurityTrust()`, `eval()`, or `innerHTML`: https://semgrep.dev/playground/r/javascript.browser.security.dom-based-xss.dom-based-xss?editorMode=advanced

```
likelihood: LOW 
```

#### Impact

Indicate how much damage can a vulnerability cause. Use LOW, MEDIUM, and HIGH.


##### HIGH

HIGH impact rules can detect extremely damaging vulnerabilities, such as injection vulnerabilities. Examples:

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection
- https://semgrep.dev/playground/r/ruby.rails.security.audit.xxe.xml-external-entities-enabled.xml-external-entities-enabled?editorMode=advanced

```
impact: HIGH 
```

##### MEDIUM

MEDIUM impact rules are issues that are less likely to lead to full system compromise but still are fairly damaging. Examples:

- https://semgrep.dev/playground/r/python.flask.security.injection.raw-html-concat.raw-html-format?editorMode=advanced
- https://semgrep.dev/playground/r/python.flask.security.injection.ssrf-requests.ssrf-requests?editorMode=advanced

```
impact: MEDIUM 
```

##### LOW

LOW impact rules are rules which are a security issue, but the impact is not too damaging to the application if discovered. 

- https://semgrep.dev/playground/r/go.gorilla.security.audit.session-cookie-missing-secure.session-cookie-missing-secure?editorMode=advanced
- https://semgrep.dev/playground/r/javascript.browser.security.raw-html-join.raw-html-join?editorMode=advanced

```
impact: LOW 
```

#### Subcategory

Include subcategory to explain what is the type of the rule. See the subsections below for more details.

##### vuln

A vulnerability rule is something that developers certainly want to resolve. For example, an SQL Injection rule which uses taint mode. Example:

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection

```
subcategory:          
  - vuln
```

##### audit

An audit rule is useful for code auditors. For example, an SQL rule which finds all uses of `database.exec(...)` that can be problematic. Example:

- https://semgrep.dev/playground/r/generic.html-templates.security.unquoted-attribute-var.unquoted-attribute-var?editorMode=advanced

```
subcategory:          
  - audit
```

##### guardrail

A guardrail rule, is useful for companies writing custom rules. For example, finding all usages to non-standard XML parsing libraries within the company. The rule can also bring a message that a developer can use only a company-approved library.

```
subcategory:          
  - guardrail
```

#### References

References help to define specific rule packs for languages, libraries, and frameworks which are available on our <a href="https://semgrep.dev/explore">Semgrep Registry</a>.

For example, writing a rule to find an issue in react, you can include:
- https://semgrep.dev/playground/r/typescript.react.security.audit.react-href-var.react-href-var?editorMode=advanced
```
references: 
  - react
```

Another example, writing a rule to find an issue in Express, you can include:

- https://semgrep.dev/playground/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection

```
references: 
  - express
```

### Rule quality checker

When you contribute rules to the Semgrep Registry, our quality checkers (linters) evaluate if the rule conforms to r2c standards. The `semgrep-rule-lints` job runs linters on a new rule to check for mistakes, performance problems, and best practices for submitting to the Semgrep Registry. To improve your rule writing, use Semgrep itself to [scan semgrep-rules](https://r2c.dev/blog/2021/how-we-made-semgrep-rules-run-on-semgrep-rules/).
