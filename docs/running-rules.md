---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

Existing and custom Semgrep rules can be run locally via the Semrgep command line tool or continuously with Semgrep CI. See [Getting started](../getting-started/) for their respective installation and setup.


## Run registry rules

Explore the [Semgrep Registry](https://semgrep.dev/explore) and run rules and rulesets via:

```sh
# Run a ruleset with rules for many languages using --config
$ semgrep --config=<ruleset-id> path/to/src
$ semgrep --config p/ci path/to/src

# Run simultaneously with Registry rulesets and local rules
$ semgrep --config=<ruleset-id> --config=path/to/yml path/to/src
```

Rulesets can be added to Semgrep CI scans using their "Add to Policy" button on Semgrep Community and Semgrep Team.

## Run local rules

:::tip
See [Writing rules > Getting started](../writing-rules/overview/) to learn how to write rules.
:::

Local rules can be ephemeral using the `-e` or `--pattern` flag or run from YAML rule files conforming to the [Rule syntax](../writing-rules/rule-syntax/) schema.

Check for Python `==` where the left and right hand sides are the same (often a bug): 

```sh
semgrep -e '$X == $X' --lang=py path/to/src
```

Run local YAML rule files:
```sh
semgrep --config path/to/yaml
```

We are working on optimizations to improve Semgrep's performance, which necessitates changing how rules are processed. If you are using v0.55.0 or later and you encounter an unexpected metavariable binding or missing result, try running with `--optimizations none` to use the original code path. 

You may find that some files that were previously parsed are now skipped; this will happen if Semgrep can confirm the rule will not match the file without parsing it. You can similarly run with `--optimizations none` to avoid this.

## Findings

* See [Managing findings](../managing-findings/) for information on Semgrep findings.
* See [Ignoring findings](../ignoring-findings/) for details on suppressing rule output.

<MoreHelp />