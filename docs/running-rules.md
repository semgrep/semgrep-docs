---
slug: running-rules
description: "Learn how to use local Semgrep rules in your scans."
title: Run rules
tags:
  - Semgrep Code
  - Semgrep CE
hide_title: true
---

# Run rules



This document explains how to use local Semgrep rules when scanning your project.

## About rules

Rules define the code patterns Semgrep looks for when scanning your project. When a rule matches code, Semgrep creates a finding. The finding can be related to security, performance, or correctness issues, or it can be used to enforce best practices. Local rules are those that are present in your local environment and accessible to you when running Semgrep using the command line.

## Types of local rules

There are two types of local rules:

- **Ephemeral rules**: Ephemeral rules are those that you use once. You can pass the rule to Semgrep through the command line as part of your `semgrep scan` command.
- **YAML-defined rules**: YAML-defined rules are [configured in YAML files](/writing-rules/overview) and conform to Semgrep's [rule syntax](/writing-rules/rule-syntax) schema.

## Ephemeral rules

Use the `-e` or `--pattern` flags for ephemeral rules that are used once:

<pre class="language-bash">semgrep scan -e '<span className="placeholder">RULE_DEFINITION</span>'</pre>

For example, to check for the Python `==` operator where the left and right sides are the same, which is often indicative of a bug, run the following command:

<pre class="language-bash"># ensure that you substitute the placeholder with the path to your project<br /><br />semgrep scan -e '$X == $X' --lang=py <span className="placeholder">PATH/TO/PROJECT</span></pre>

## YAML-defined rules

### Use the Semgrep default ruleset

To run a Semgrep scan in your local environment with the default Semgrep ruleset, use:

```bash
semgrep scan --config=auto
```

### Use a Semgrep Registry rule

The [<i class="fas fa-external-link fa-xs"></i> Semgrep Registry](https://semgrep.dev/explore) makes available public rules that you can use to scan your project. Semgrep organizes registry rules into **rulesets**. Rulesets group related rules by features such as programming language, OWASP category, or framework. The Semgrep team curates rulesets, which are updated as new rules are added to the [Semgrep Registry](https://semgrep.dev/explore).

To run rules from the Semgrep Registry locally:

1. Go to [<i class="fas fa-external-link fa-xs"></i> Semgrep Registry](https://semgrep.dev/explore).
2. Select a ruleset and choose a rule.
3. Click **Expand rule > Run locally**.
4. Copy the snippet for **local install**, and add the path to the source code you want to scan in your terminal:
    <pre class="language-bash">semgrep scan --config="<span className="placeholder">RULESET-ID</span>" <span className="placeholder">PATH/TO/SRC</span></pre>
5. Optional: run the Semgrep Registry rules simultaneously with local rules:
    <pre class="language-bash">semgrep scan --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">PATH/TO/MYRULE.YAML PATH/TO/SRC</span></pre>

:::info Rule IDs of local rules
Semgrep adds custom prefixes to IDs of local rules using these steps:

1. Get the relative path from the process's current working directory to the directory containing the rules file.
2. Replace the directory separators of the relative path with dots.
3. Remove any characters not allowed in a rule ID from the relative path.
:::

### Use a custom rule

:::tip Custom rules
See [Write rules](/writing-rules/overview/) for more information on defining custom rules.
:::

1. Create a `RULE_NAME.yaml` file, and save it in a location accessible to the CLI you're using to run Semgrep. The rule file looks similar to the following sample:
    ```yaml
        rules:
        - id: is-comparison
        languages:
            - python
        message: The operator 'is' is for reference equality, not value equality! Use
        `==` instead!
        pattern: $SOMEVAR is "..."
        severity: HIGH
    ```
2. Run the following command to scan with a local rule file:
    <pre class="language-bash">semgrep scan --config <span className="placeholder">PATH/TO/RULE_NAME.YAML</span></pre>

Semgrep processes rules from hidden directories, such as `dir/.hidden/RULE_NAME.yml`, when you use the `--config` flag.

### Use multiple rules and rulesets simultaneously

You can use the `--config` flag multiple times to run a scan using multiple rules and rulesets. For example, to scan using Semgrep's Python ruleset and a rule that you defined and saved to `RULE_NAME.YAML`:

<pre class="language-bash"><code>semgrep scan --config <span className="placeholder">p/python</span> --config <span className="placeholder">PATH/TO/RULE_NAME.YAML</span></code></pre>

Ensure that you update the placeholder values in the sample code snippet accordingly.
