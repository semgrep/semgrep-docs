---
slug: contributing-to-semgrep-rules-repository
description: "This article outlines how to contribute to Semgrep rules repository.."
---

# Contributing to Semgrep rules repository

You can contribute to [Semgrep rules repository](https://github.com/returntocorp/semgrep-rules). This article sums up the process given in [Semgrep rules repository Readme](https://github.com/returntocorp/semgrep-rules#semgrep-rules).

## Contribution guidelines

Fork and make a pull request in the [Semgrep rules repository](https://github.com/returntocorp/semgrep-rules). r2c contacts you about signing CLA.

We're happy to help!

- Email us at [support@r2c.dev](mailto:support@r2c.dev).
- Join our [Slack](https://r2c.dev/slack).

## Development Workflow

Pull requests require approval of at least one maintainer and for [CI jobs to pass](https://github.com/returntocorp/semgrep-rules/actions).

To get a rule ready for review, the CI jobs will check for these things:
1. [Formatting applied by `pre-commit`](#pre-commit)
2. [Passing tests](#tests)
3. [Passing metalinter checks](#metalinter)

In addition, we recommend:
1. [Having a good rule message.](#rule-messages) A good message includes a 1) description of the pattern, 2) a description of why this pattern was detected, 3) and how to fix the issue.
1. [Using namespacing for your rule.](#rule-namespacing)
1. [Metadata.](#rule-metadata) Including references is very helpful!

### `pre-commit`

To install [pre-commit](https://pre-commit.com/):

```
$ python -m pip install pre-commit
```

Then, install the pre-commit hooks:

```
$ pre-commit install
```

To check if `pre-commit` is working as expected,
run the following command:

```
$ pre-commit run --all
```

Once `pre-commit` is set up you may commit code and create pull requests as you would expect.

### Tests

Test files should always accompany new rules. A good test file should include at least one test that the rule should flag on, and at least one test that the rule should not flag on. Test file names must match the rule file name, except for the extension. For example, if the rule is in `my-rule.yaml`, the tests should be in `my-rule.js` (or another valid extension for the target language). Inside the test file, expected findings should be marked with a comment that reads `ruleid: my-rule` on the line directly above. Include code that should **not** be detected with `ok: my-rule`. Use the appropriate single-line comment syntax for the target language (`#` for Python, `//` for JavaScript, etc.). An example is listed below.

```yaml
rules:
- id: my-rule
  pattern: var $X = "...";
  ...
```

```js
// ruleid: my-rule
var strdata = "hello";
// ok: my-rule
var numdata = 1;
```

For more information, visit [Testing rules](https://semgrep.dev/docs/writing-rules/testing-rules/).

### Metalinter

We use Semgrep to [scan semgrep-rules](https://r2c.dev/blog/2021/how-we-made-semgrep-rules-run-on-semgrep-rules/)! The `semgrep-rule-lints` job will run a few lints on a new rule submission to check for mistakes, performance problems, and best-practices for submitting to this repository.

We have developed a few best-practices for rules submitted to this repository based on how Semgrep CLI users want to interact with the data. The `semgrep-rule-lints` job will check for the following metadata:

- The presence of a `category` metadata field. This is one of {security, best-practice, correctness, maintainability, performance}.
- The presence of a `technology` metadata field. This is usually the library or framework the rule is targeting, e.g., `django`. If it's for the language itself, just use the language name, e.g., `python`.
- The use of the YAML multiline string operator `>-` when rule messages span multiple lines. This presents the best-looking rule message in the terminal.
- For `security` category rules, the presence of `owasp` and `cwe` metadata tags. This lets users group Semgrep results by familiar security tags. An example of an `owasp` tag is: <br>
`owasp: 'A9: Using Components with Known Vulnerabilities'` <br>
and an example of a `cwe` tag is: <br>
`cwe: 'CWE-327: Use of a Broken or Risky Cryptographic Algorithm'`

### Rule Messages

A good rule message includes:
1. A description of the pattern (e.g., missing parameter, dangerous flag, out-of-order function calls).
1. A description of why this pattern was detected (e.g., logic bug, introduces a security vulnerability, bad practice).
1. An alternative that resolves the issue (e.g., use another function, validate data first, discard the dangerous flag).

For an example of a good rule message, see [this rule for Django's `mark_safe()`](https://github.com/returntocorp/semgrep-rules/blob/develop/python/django/security/audit/avoid-mark-safe.yaml).

> 'mark_safe()' is used to mark a string as "safe" for HTML output. This disables escaping and could therefore subject the content to XSS attacks. Use 'django.utils.html.format_html()' to build HTML for rendering instead.

### Rule Namespacing

The namespacing format for contributing rules in this directory is `<language>/<framework>/<category>/$MORE`. If a `framework` isn't applicable, use the literal `lang` instead.

`category` is one of:
- security
- correctness
- best-practice
- maintainability
- performance

If a `security` rule is discouraging the use of a bad pattern (such as formatted SQL strings), we recommended appending `audit` to your namespace. This distinguishes it from a `security` rule that is specifically aiming to detect a vulnerability.

Some examples:

```txt
python/lang/security/deserialization/avoid-pyyaml-load.yaml
python/lang/security/audit/eval-detected.yaml
python/flask/security/dangerous-template-string.yaml
python/flask/security/audit/render-template-string.yaml
javascript/lang/best-practice/assigned-undefined.yaml
java/rmi/security/server-dangerous-class-deserizaliation.yaml
```

### Rule Metadata

Rules may contain a `metadata` key. You can put anything in the `metadata` section. The `metalinter` section has descriptions of the metadata keys we expect in a good rule, but here are a few more key descriptions:

### References

You can add `references` to rule metadata. References are helpful because they can provide additional context to users of the rule. It is good practice to include at least one reference for each rule.

### Security Metadata

Semgrep features security rules that target [common weaknesses](https://cwe.mitre.org/) and [OWASP categories](https://owasp.org/www-project-top-ten/). `security` rules in this repository should have metadata fields for `cwe` (and `owasp` when applicable).

### Sample rule with metadata

```yaml
rules:
- id: render-template-string
  ...
  metadata:
    cwe: "CWE-96: Improper Neutralization of Directives in Statically Saved Code ('Static Code Injection')"
    owasp: 'A01:2017 Injection'
    references:
    - https://nvisium.com/blog/2016/03/09/exploring-ssti-in-flask-jinja2.html
```



## Contributing

We welcome Semgrep rule contributions directly to this repository! Since this repo is maintained by r2c, there are some extra benefits-for example, if there are bug reports for your rule, we’ll take responsibility to help fix it. If you are submitting to the semgrep-rules repo (rather than your own, separate repository as mentioned above) we’ll ask you to make r2c a joint owner of your contributions. While you still own copyright rights to your rule, joint ownership allows r2c to license these contributions to other [Semgrep Registry](https://semgrep.dev/r) users pursuant to the LGPL 2.1 under the [Commons Clause](https://commonsclause.com/). Check out the [Contributing Guidelines](/CONTRIBUTING.md) to get started.

You can also contact us at support@r2c.dev to make Semgrep rule contributions. We will import your rules for everyone to use!

### Rulesets

Rulesets -- combined sets of rules from the Semgrep registry -- are organized in a private repository. If you want to modify existing sets or create your own, please contact us at support@r2c.dev.

If you have more questions, please see the [FAQ section in the Semgrep docs](https://semgrep.dev/docs/faq).

## Help

Join [Slack](https://r2c.dev/slack) for the fastest answers to your questions! Or contact the team at [support@r2c.dev](mailto:support@r2c.dev).

### Rule Namespacing

The namespacing format for contributing rules is `<language>.<framework>.<category>.$MORE`. If a `framework` isn't applicable, use `lang` instead.

`category` is one of:
- security
- correctness
- best-practice
- maintainability
- performance

If a `security` rule is discouraging the use of a bad pattern (such as formatted SQL strings), we recommended appending `audit` to your namespace. This distinguishes it from a `security` rule that is specifically aiming to detect a vulnerability.

<p align="center">
    <img src="https://web-assets.r2c.dev/semgrep-live-namespacing.png" alt="semgrep.live rule namespace" width="500" />
</p>

### Github Action To Run Tests

If you fork this repo or create your own, you can add a special [semgrep-rules-test](https://github.com/marketplace/actions/semgrep-rules-test) Github Action to your workflow that will automatically test your rules by running `make test` using the latest version of semgrep.

See ours [here](.github/workflows/semgrep-rules-test.yml)

### Benchmarks
The [benchmark job](https://github.com/returntocorp/semgrep-rules/actions?query=workflow%3Arule-benchmarks) runs every weekend. It uploads a few artifacts, which can be downloaded. If you download the test logs, there are two relevant pieces of information in there: the benchmark table, which roughly shows the performance of every rule that completes in under 60 seconds, and any failed tests are rules that did not complete within 60 seconds.

To run benchmark tests locally, do the following from the root of `semgrep-rules`:
```
pipenv shell
pipenv install --dev
export PYTHONPATH=.
pytest --timeout=60 --rule-directory=[path_to_rule_directory] --git-repo=[git_URL] tests/performance/test_public_repos.py
```
If you omit `--git-repo` from the pytest command, it will run the provided benchmark repo.