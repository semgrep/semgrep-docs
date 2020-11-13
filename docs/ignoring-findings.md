# Ignoring findings

[TOC]

# Ignoring findings via inline comments

Semgrep allows for ignoring, or whitelisting, findings in code by specifying a `nosem` comment on the first line of a finding. Comments take the form of `nosem` or `nosem: <rule-id>`. This functionality works across languages.

A stand-alone `nosem` comment will ignore all Semgrep findings on the line it appears. A `nosem` comment specifying a specific rule ID will only ignore the specified rule. Multiple rules can be ignored using a comma-delimited list.

For example, in JavaScript:

```javascript
bad_func(); // nosem
bad_func(); // nosem: rule-id-1
bad_func(); // nosem: rule-id-1, rule-id-2
bad_func(   // nosem: rule-id-1
  arg
);
```

For example, in Python:

```python
bad_func()  # nosem: rule-id-1
```

!!! note
    The space (` `) before `nosem` is required for Semgrep to detect this annotation.


# Ignoring findings via project ignores

!!! danger
    Note that `.semgrepignore` is only used by Semgrep CI, and will not be honored when running the regular `semgrep` on the command-line.

Semgrep CLI will respect the presence of a .gitignore in the project and will not scan any paths present in the git ignore. This behavior can be disabled by using the flag `--no-git-ignore`.

If there are files that you want to track in Git but have Semgrep ignore, Semgrep CI (but _not_ the CLI) will respect a `.semgrepignore` file that follows a similar convention to the `.gitignore`. Eg:

```
.git/
:include .gitignore
semgrep-core/tests/
```

For a complete example, see [the .semgrepignore on the Semgrep source code itself](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

If there's no `.semgrepignore` file in your repository, Semgrep CI will use a default ignore list that skips common test and dependency directories, including `tests/`, `node_modules/`, and `vendor/`. You can find the full list in the [`.semgrepignore` template file](https://github.com/returntocorp/semgrep-action/blob/v1/src/semgrep_agent/templates/.semgrepignore). To override these default ignore patterns, commit your own `.semgrepignore`.

