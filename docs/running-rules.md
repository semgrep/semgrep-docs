# Running rules

Existing and custom Semgrep rules can be run locally via the CLI or continuously in CI. See [Getting started](getting-started.md) for their respective installation and setup.

[TOC]

# Run registry rules

Explore the [Semgrep Registry](https://semgrep.dev/explore) and run rules and rulesets via:

```sh
# Run a ruleset with rules for many languages using --config
$ semgrep --config=<ruleset-url> path/to/src
$ semgrep --config "https://semgrep.dev/p/r2c-ci" path/to/src
```

Rulesets can be added to Semgrep CI scans using their "Add to Policy" button on Semgrep.dev.

# Run local rules

!!! info
    See [Writing rules > Getting started](writing-rules/overview.md) to learn how to write rules.

Local rules can be ephemeral using the `-e` or `--pattern` flag or run from YAML rule files conforming to the [Rule syntax](writing-rules/pattern-logic.md) schema.

```sh
# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src

# Run local YAML rule files
$ semgrep --config path/to/yaml
```

# Managing findings

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
