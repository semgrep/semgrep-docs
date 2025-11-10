---
append_help_link: true
slug: testing-rules
description: "Semgrep provides a testing mechanism for your rules. You can write code and provide annotations to let Semgrep know where you are or aren't expecting findings."
tags:
  - Rule writing
---


import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"

# Test rules

Semgrep provides a testing mechanism for your rules. You can write code and provide annotations to let Semgrep know where you are or aren't expecting findings. Semgrep provides the following annotations:

- `ruleid: <rule-id>` for protecting against false negatives
- `ok: <rule-id>` for protecting against false positives
- `todoruleid: <rule-id>` for future "positive" rule improvements
- `todook: <rule-id>` for future "negative" rule improvements

When writing tests, remember that:

1. The `--test` flag tells Semgrep to run tests in the specified directory.
2. Annotations are specified as a comment immediately preceeding the offending line.
3. Semgrep looks for tests based on the rule filename and the languages
   specified in the rule. In other words, `path/to/rule.yaml` searches for
   `path/to/rule.py`, `path/to/rule.js`, and similar, based on the languages specified in the rule.

:::info
The `.test.yaml` file extension can also be used for test files. This is necessary when testing YAML language rules.
:::

## Test rules with autofix

Semgrep's testing mechanism also provides a way to test the behavior of any `fix` values defined in the rules.

To define a test for autofix behavior:

1. Create a new **autofix test file** with the `.fixed` suffix before the file type extension. For example, name the autofix test file of a rule with test code in `path/to/rule.py` as `path/to/rule.fixed.py`.
1. Within the autofix test file, enter the expected result of applied autofix rule to the test code.
2. Run `semgrep --test` to verify that your autofix test file is correctly detected.

When you use `semgrep --test`, Semgrep applies the autofix rule to the original test code (`path/to/rule.py`), then verifies whether this matches the expected outcome defined in the autofix test file (`path/to/rule.fixed.py)`. If there is a mismatch, the line diffs are printed.

:::info
**Hint**: Creating an autofix test for a rule with autofix can take less than a minute with the following flow of commands:
```sh
cp rule.py rule.fixed.py
semgrep --config rule.yaml rule.fixed.py --autofix
```

These commands apply the autofix of the rule to the test code. After Semgrep delivers a fix, inspect whether the outcome of this fix is as expected (for example, using `vimdiff rule.py rule.fixed.py`).
:::

## Example

Consider the following rule:

```yaml
rules:
- id: insecure-eval-use
  patterns:
  - pattern: eval($VAR)
  - pattern-not: eval("...")
  fix: secure_eval($VAR)
  message: Calling 'eval' with user input
  languages: [python]
  severity: MEDIUM
```

If the filename with the preceeding rule is `rules/detect-eval.yaml`, you can create `rules/detect-eval.py`:

```python
from lib import get_user_input, safe_get_user_input, secure_eval

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
semgrep --test rules/
```

This produces the following output:

```sh
1/1: ✓ All tests passed
No tests for fixes found.
```

Semgrep tests automatically avoid failing on lines marked with `# todoruleid` or `# todook`.

## Store rules and test targets in different directories

Creating different directories for rules and tests helps you manage a growing library of custom rules. To store rules and test targets in different directories, use the `--config` option.

For example, in the directory with the following structure:

```sh
$ tree tests

tests
├── rules
│   └── python
│       └── insecure-eval-use.yaml
└── targets
    └── python
        └── insecure-eval-use.py

4 directories, 2 files
```

Use of the following command

```sh
semgrep --test --config tests/rules/ tests/targets/
```

Produces the same output as in the previous example.

The subdirectory structure of these two directories must be the same for Semgrep to correctly find the associated files.

To test the autofix behavior, add the autofix test file `rules/detect-eval.fixed.py` to represent the expected outcome of applying the fix to the test code:

```python
from lib import get_user_input, safe_get_user_input, secure_eval

user_input = get_user_input()
# ruleid: insecure-eval-use
secure_eval(user_input)

# ok: insecure-eval-use
eval('print("Hardcoded eval")')

totally_safe_eval = eval
# todoruleid: insecure-eval-use
totally_safe_eval(user_input)

# todook: insecure-eval-use
secure_eval(safe_get_user_input())
```

So that the directory structure is printed as the following:

```sh
$ tree tests

tests
├── rules
│   └── python
│       └── insecure-eval-use.yaml
└── targets
    └── python
        └── insecure-eval-use.py
        └── insecure-eval-use.fixed.py

4 directories, 2 files
```

Use of the following command:

```sh
semgrep --test --config tests/rules/ tests/targets/
```

Results in the following outcome:

```sh
1/1: ✓ All tests passed
1/1: ✓ All fix tests passed
```

If the fix does not behave as expected, the output prints a line diff.
For example, if you replace `secure_eval` with `safe_eval`, you can see that lines 5 and 15 do not render as expected.

```sh
1/1: ✓ All tests passed
0/1: 1 fix tests did not pass:
--------------------------------------------------------------------------------
	✖ targets/python/detect-eval.fixed.py <> autofix applied to targets/python/detect-eval.py

	---
	+++
	@@ -5 +5 @@
	-safe_eval(user_input)
	+secure_eval(user_input)
	@@ -15 +15 @@
	-safe_eval(safe_get_user_input())
	+secure_eval(safe_get_user_input())

```

## Validating rules

You can run `semgrep --validate --config [filename]` to verify the rule's configuration. This command runs a combination of Semgrep rules and OCaml checks against your rules to search for issues such as duplicate patterns and missing fields. All rules submitted to the Semgrep Registry are validated.

The semgrep rules are pulled from `p/semgrep-rule-lints`.

This feature is still experimental and under active development. Your feedback is welcomed!

## Enabling autofix in Semgrep Code

<EnableAutofix />
