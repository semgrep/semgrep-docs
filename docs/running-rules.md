---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

## Introduction

Rules are specific patterns based on which Semgrep reports findings in code. These findings may help you to catch issues of security, performance, correctness, and other bugs. Rules are stored in open-source [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) that enables you to scan code without need to write anything custom.

You can run existing and custom Semgrep rules locally with the Semrgep command line interface (Semgrep CLI) or continuously with Semgrep in CI.

The following diagram displays a current number of Semgrep rules:
<div className="lang-container" style={{marginBottom: '20px'}}>
  <iframe width="900" height="400" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep-rules.num/graph"></iframe>
</div>


## Running registry rules

This section explains how to run [Semgrep Registry](https://semgrep.dev/explore) rules locally. See the following examples of how you may test Semgrep rules:

1. Test how Semgrep automatically surveys languages and frameworks and run recommended rules for your source code:
    ```sh
    semgrep --config=auto path/to/src
    ```
1. Explore the [Semgrep Registry](https://semgrep.dev/explore) and select a rule you would like to run.
1. On the page of the rule, click **Run Locally**.
1. Copy the code for local install, and then add the path to the source code you want to check:
    <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" <span className="placeholder">path/to/src</span></code></pre>
1. Optional: Run registry rules simultaneously with local rules:
   <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">path/to/yml path/to/src</span></code></pre>

When you use the Semgrep Registry, Semgrep collects [usage metrics](../metrics).

Add rulesets to Semgrep in CI scans using their "Add to Policy" button on Semgrep Community and Semgrep Team tiers.

## Writing your own rule file

To make your own local rule file, follow these steps:

1. Create a `rule.yaml` file.
2. Below is a simple example rule for Python which you can paste into your `rule.yaml` file.
    ```yaml
    rules:
    - id: is-comparison
      languages:
        - python
      message: The operator 'is' is for reference equality, not value equality! Use
      `==` instead!
      pattern: $SOMEVAR is "..."
      severity: ERROR
    ```
3. Run the following command to run local YAML rule files:
    ```sh
    semgrep --config path/to/rule.yaml
    ```

For more information, see [Getting started](../writing-rules/overview/).

### Ephemeral rules

Use the `-e` or `--pattern` flags in your terminal for ephemeral rules that are used once.

For example: Check for Python `==` where the left and right sides are the same (often a bug):
```sh
semgrep -e '$X == $X' --lang=py path/to/src
```

:::info
Both local rule.yaml and ephemeral rules are called *local rules*.
:::

### Running multiple rules simultaneously

To run multiple rules simultaneously, use `--config` before every YAML URL, or Semgrep registry entry name. See the following code example (substitute the colored values as necessary):

<pre class="language-bash"><code>semgrep --config <span className="placeholder">p/python</span> --config <span className="placeholder">myrules/myrule.yaml</span></code></pre>

## Findings

* See [Managing findings](../managing-findings/) for information on Semgrep findings.
* See [Ignoring findings](../ignoring-files-folders-code/) for details on suppressing rule output.

## Next steps

Contribute to the registry by writing your own rules and adding them to the <a href="https://github.com/returntocorp/semgrep-rules" target="_blank">Semgrep rules repository</a>.

<MoreHelp />
