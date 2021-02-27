# Ignoring findings

[TOC]

# Ignoring findings via inline comments

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


# Ignoring findings via project ignores

!!! danger
    Note that `.semgrepignore` is only used by Semgrep CI. It isn’t honored when running `semgrep` on the command line.

Semgrep CLI will respect the presence of a .gitignore in the project and will not scan any paths present in the git ignore. This behavior can be disabled by using the flag `--no-git-ignore`.

If there are files that you want to track in Git but have Semgrep ignore, Semgrep CI (but _not_ the CLI) respects a `.semgrepignore` file that follows a similar convention to the `.gitignore`. For example:

```
.git/
:include .gitignore
semgrep-core/tests/
```

For a complete example, see  the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

If there's no `.semgrepignore` file in your repository, Semgrep CI uses a default ignore list that skips common test and dependency directories, including `tests/`, `node_modules/`, and `vendor/`. You can find the full list in the [`.semgrepignore` template file](https://github.com/returntocorp/semgrep-action/blob/v1/src/semgrep_agent/templates/.semgrepignore). To override these default ignore patterns, commit your own `.semgrepignore`.

# Ignoring findings via disabled rules

If you are using Semgrep in CI with a managed policy, you can disable individual rules within a ruleset on [Dashboard > Policies](https://semgrep.dev/manage/policy). See [Editing a policy](managing-policy.md#editing-a-policy) for details.