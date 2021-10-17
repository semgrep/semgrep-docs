---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

Existing and custom Semgrep rules can be run locally with the Semrgep command line tool or continuously with Semgrep CI. See [Getting started](../getting-started/) for their respective installation and setup.

## Run Registry rules

Explore the [Semgrep Registry](https://semgrep.dev/explore) and run rules and rulesets via:

```sh
# Automatically survey languages and frameworks and run recommended Registry rules
$ semgrep --config=auto path/to/src

# Run a ruleset with rules for many languages using --config
$ semgrep --config=<ruleset-id> path/to/src

# Run simultaneously with Registry rulesets and local rules
$ semgrep --config=<ruleset-id> --config=path/to/yml path/to/src
```

When the Registry is used, [usage metrics](../metrics) are collected.

Rulesets can be added to Semgrep CI scans using their "Add to Policy" button on Semgrep Community and Semgrep Team.

## Run local rules

Local rules can be either:

- Ephemeral rules with the `-e` or `--pattern` flags for use in a single command.
- Configured in YAML rule files that conform to the [Rule syntax](../writing-rules/rule-syntax/) schema.

:::tip
See [Writing rules > Getting started](../writing-rules/overview/) to learn how to write rules.
:::

### Ephemeral rules

Use the `-e` or `--pattern` flags in your terminal for ephemeral rules which are utilized only once. 

For example: Check for Python `==` where the left and right sides are the same (often a bug): 
```sh
semgrep -e '$X == $X' --lang=py path/to/src
```

### YAML-defined rules

Create a YAML rule file which you can run repeatedly.

1. Create a `rule.yaml` file.
2. Paste the following rule in `rule.yaml` file.
    ```
    rules:
    - id: is-comparison
      languages:
        - python
      message: The operator 'is' is for reference equality, not value equality! Use
      `==` instead!
      pattern: $SOMEVAR is "..."
      severity: ERROR
    ```
    See [Getting started](../writing-rules/overview/) for the full example.
3. Run the following command to run local YAML rule files:
    ```sh
    semgrep --config path/to/rule.yaml
    ```

We are working on optimizations to improve Semgrep's performance, which necessitates changing how rules are processed. If you are using v0.55.0 or later and you encounter an unexpected metavariable binding or missing result, try running with `--optimizations none` to use the original code path. 

You may find that some files that were previously parsed are now skipped; this will happen if Semgrep can confirm the rule will not match the file without parsing it. You can similarly run with `--optimizations none` to avoid this.

## Findings

* See [Managing findings](../managing-findings/) for information on Semgrep findings.
* See [Ignoring findings](../ignoring-findings/) for details on suppressing rule output.

<MoreHelp />