---
append_help_link: true
---

# Ignoring findings

[TOC]

# Inline comments

Semgrep allows for ignoring findings in code by specifying a `nosemgrep` comment on the first line of a finding. Comments take the form of `nosemgrep` or `nosemgrep: <rule-id>`. This functionality works across languages. Previously this was implemented with the comment `nosem`, and lines with these comments will continue to be ignored.

A stand-alone `nosemgrep` comment ignores all Semgrep findings for the line on which it appears. A `nosemgrep` comment specifying a specific rule ID only ignores the specified rule. Multiple rules can be ignored using a comma-delimited list.

For example, in JavaScript:

```javascript
bad_func(); // nosemgrep
bad_func(); // nosemgrep: rule-id-1
bad_func(); // nosemgrep: rule-id-1, rule-id-2
bad_func(   // nosemgrep: rule-id-1
  arg
);
```

For example, in Python:

```python
bad_func()  # nosemgrep: rule-id-1
```

!!! note
    The space (` `) before `nosemgrep` is required for Semgrep to detect this annotation.


# File paths

!!! note
    Semgrep will respect the presence of a `.gitignore` in the project and will not scan any paths present in that file. This behavior can be disabled by using the flag `--no-git-ignore`.

Semgrep CI users can also [use a `.semgrepignore` file](semgrep-ci.md#ignoring-files).

If you're directly running the Semgrep command line tool, use the `--exclude <pattern>` flag.
# Disabling rules

If you are using Semgrep in CI with a managed policy, you can disable individual rules within a ruleset on [Dashboard > Policies](https://semgrep.dev/manage/policies). See [Editing a policy](managing-policy.md#editing-a-policy) for details.
