---
append_help_link: true
slug: testing-rules
description: "Semgrep provides a convenient testing mechanism for your rules. You can simply write code and provide a few annotations to let Semgrep know where you are or aren't expecting findings."
---

import MoreHelp from "/src/components/MoreHelp"

# Testing rules

Semgrep provides a convenient testing mechanism for your rules. You can
simply write code and provide a few
annotations to let Semgrep know where you are or aren't expecting findings. Semgrep
provides the following annotations:

- `ruleid: <rule-id>`, for protecting against false negatives
- `ok: <rule-id>` for protecting against false positives
- `todoruleid: <rule-id>` for future "positive" rule improvements
- `todook: <rule-id>` for future "negative" rule improvements

Other than annotations there are three things to remember when creating tests:

1. The `--test` flag tells Semgrep to run tests in the specified directory.
2. Annotations are specified as a comment above the offending line.
3. Semgrep looks for tests based on the rule filename and the languages
   specified in the rule. In other words, `path/to/rule.yaml` will look for
   `path/to/rule.py`, `path/to/rule.js`, etc., based on the languages specified
   in the rule.

:::info
The `.test.yaml` file extension can also be used for test files. This is necessary when testing YAML language rules.
:::

## Example

Consider the following rule:

```yaml
rules:
- id: insecure-eval-use
  patterns:
  - pattern: eval(...)
  - pattern-not: eval("...")
  message: Calling 'eval' with user input
  languages: [python]
  severity: WARNING
```

Given the above is named `rules/detect-eval.yaml`, you can create `rules/detect-eval.py`:

```python
from lib import get_user_input, safe_get_user_input

user_input = get_user_input()
# ruleid: insecure-eval-use
eval(user_input)

# ok: insecure-eval-use
eval('print("Hardcoded eval")')

totally_safe_eval = eval
# todoruleid: insecure-eval-use
totally_safe_eval(user_input)

# todook: insecure-eval-use
eval(safe_get_user_input())
```

Run the tests with the following:

```sh
$ python -m semgrep --quiet --test rules/
1 yaml files tested
check id scoring:
--------------------------------------------------------------------------------
(TODO: 2) rules/detect-eval.yaml
	✖ insecure-eval-use                                  TP: 1 TN: 2 FP: 1 FN: 1
	test: rules/detect-eval.py, expected lines: [5, 12], reported lines: [5, 15]
--------------------------------------------------------------------------------
final confusion matrix: TP: 1 TN: 2 FP: 1 FN: 1
--------------------------------------------------------------------------------
```

- True positives (`TP`) correspond to `ruleid`
- True negatives (`TN`) correspond to `ok`
- False positives (`FP`) correspond to `todook`
- False negatives (`FN`) correspond to `todoruleid`

You can also test a single file with:

```sh
$ python -m semgrep --test --config cookie-missing-httponly.yaml
running 1 rules...
ran 1 rules on 1 files: 3 findings
1 yaml files tested
check id scoring:
--------------------------------------------------------------------------------
(TODO: 0) cookie-missing-httponly.yaml
	✔ cookie-missing-httponly                                      TP: 3 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
final confusion matrix: TP: 3 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
```

You can specify a folder or file of rules to be tested on a separate directory or file of example code with:

```sh
$ python -m semgrep --test --config command-injection-formatted-runtime-call.yaml test
running 1 rules...
ran 1 rules on 1 files: 2 findings
1 yaml files tested
check id scoring:
--------------------------------------------------------------------------------
(TODO: 0) command-injection-formatted-runtime-call.yaml
	✔ command-injection-formatted-runtime-call                     TP: 2 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
final confusion matrix: TP: 2 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
```

To avoid failing on TODOs you can specify `--test-ignore-todo`:

```sh
$ python -m semgrep --quiet --test --test-ignore-todo rules/
1 yaml files tested
check id scoring:
--------------------------------------------------------------------------------
(TODO: 2) rules/detect-eval.yaml
	✔ insecure-eval-use                                  TP: 1 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
final confusion matrix: TP: 1 TN: 1 FP: 0 FN: 0
--------------------------------------------------------------------------------
```

To store rules and test targets in different directories you can specify `--config`:

```sh
$ tree tests
tests
├── rules
│   └── python
│       └── test.yaml
└── targets
    └── python
        └── test.py

4 directories, 2 files
```

```sh
$ python -m semgrep --quiet --test --config /tmp/tests/rules/ /tmp/tests/targets/
1 yaml files tested
check id scoring:
--------------------------------------------------------------------------------
(TODO: 0) /tmp/tests/rules/python/test.yaml
	✔ eqeq-is-bad                                        TP: 1 TN: 0 FP: 0 FN: 0
--------------------------------------------------------------------------------
final confusion matrix: TP: 1 TN: 0 FP: 0 FN: 0
--------------------------------------------------------------------------------
```

The subdirectory structure of these two directories must be the same for Semgrep to
correctly find the associated files.

<MoreHelp />
