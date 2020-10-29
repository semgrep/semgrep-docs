# Testing rules

Semgrep CLI provides a convenient testing mechanism for your rules. You can
simply write code in your corresponding programming language and provide a few
annotations to let Semgrep know where you are/aren't expecting findings. Semgrep
provides the following annotations:

- `ruleid: <rule-id>`, for protecting against false negatives
- `ok: <rule-id>` for protecting against false positives
- `todoruleid: <rule-id>` for future "positive" rule improvements
- `todook: <rule-id>` for future "negative" rule improvements

Other than annotations there are three things to remember when creating tests:

1. The `--test` flag tells Semgrep to run tests in the specified directory.
2. Annotations are specified as a comment above the offending line.
3. Semgrep will look for tests based on the rule filename and the languages
   specified in the rule. In other words, `path/to/rule.yaml` will look for
   `path/to/rule.py`, `path/to/rule.js`, etc, based on the languages specified
   in the rule.

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

If this is `rules/detect-eval.yaml` let's create `rules/detect-eval.py`:

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

We can then run the tests with the following:

```sh
$ python -m semgrep --quiet --test rules/
1 yaml files tested
check id scoring:
================================================================================
(TODO: 2) rules/detect-eval.yaml
	✖ insecure-eval-use                                  TP: 1 TN: 2 FP: 1 FN: 1
	test: rules/detect-eval.py, expected lines: [5, 12], reported lines: [5, 15]
================================================================================
final confusion matrix: TP: 1 TN: 2 FP: 1 FN: 1
================================================================================
```

- True positives (`TP`) correspond to `ruleid`
- True negatives (`TN`) correspond to `ok`
- False positives (`FP`) correspond to `todook`
- False negatives (`FN`) correspond to `todoruleid`

If you would like to avoid failing on TODOs you can specify `--test-ignore-todo`:

```sh
$ python -m semgrep --quiet --test --test-ignore-todo rules/
1 yaml files tested
check id scoring:
================================================================================
(TODO: 2) rules/detect-eval.yaml
	✔ insecure-eval-use                                  TP: 1 TN: 1 FP: 0 FN: 0
================================================================================
final confusion matrix: TP: 1 TN: 1 FP: 0 FN: 0
================================================================================
```
