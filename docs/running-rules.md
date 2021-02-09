# Running rules

Existing and custom Semgrep rules can be run locally via the CLI or continuously in CI. See [Getting started](getting-started.md) for their respective installation and setup.

[TOC]

# Run registry rules

Explore the [Semgrep Registry](https://semgrep.dev/explore) and run rules and rulesets via:

```sh
# Run a ruleset with rules for many languages using --config
$ semgrep --config=<ruleset-id> path/to/src
$ semgrep --config p/r2c-ci path/to/src
```

Rulesets can be added to Semgrep CI scans using their "Add to Policy" button on Semgrep Community and Semgrep Team.

# Run local rules

!!! info
    See [Writing rules > Getting started](writing-rules/overview.md) to learn how to write rules.

Local rules can be ephemeral using the `-e` or `--pattern` flag or run from YAML rule files conforming to the [Rule syntax](writing-rules/rule-syntax.md) schema.

```sh
# Check for Python == where the left and right hand sides are the same (often a bug)
$ semgrep -e '$X == $X' --lang=py path/to/src

# Run local YAML rule files
$ semgrep --config path/to/yaml
```

# Findings

* See [Managing findings](managing-findings.md) for information on Semgrep findings.
* See [Ignoring findings](ignoring-findings.md) for details on suppressing rule output.
