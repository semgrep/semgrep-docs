---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

## Introduction

Rules are instructions based on which Semgrep detects patterns in code. When Semgrep reports a code using mentioned rules, the detected code is called a finding. The process of scanning and detecting a piece of code is sometimes called matching, as Semgrep matches the code using rules to report a finding. Such findings can help you catch issues of security, performance, correctness, and best practices. You can define custom rules through Semgrep's rule syntax or you can rely on rules created by the community or r2c. Rules are stored in an open-source [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) that enables you to scan code without the need to write anything custom. The list below covers different kinds of Semgrep rules:

- Existing [Semgrep Registry rules](#running-semgrep-registry-rules) or [rules contributed to the Semgrep Registry by you](https://semgrep.dev/docs/contributing/contributing-to-semgrep-rules-repository/) to find out how to add new rules.
- [Local rules](#creating-and-using-local-rules):
  - One-off [ephemeral rules](#ephemeral-rules) passed into the command line.
  - [YAML-defined rules](#yaml-defined-rules).
- A combination of [local rules and Semgrep Registry rules](#running-multiple-rules-simultaneously). 

You can run all rules on your code completely locally or continuously in your Source Code Management (SCM) service (such as GitHub or GitLab) with Semgrep in CI. For more information, see [Semgrep CI overview](semgrep-ci/overview.md).

## Running Semgrep Registry rules locally

You can test Semgrep Registry rules with the following command (substitute the `PATH/TO/SRC` with the path to your source code):
<pre class="language-bash"><code>semgrep --config=auto <span className="placeholder">PATH/TO/SRC</span></code></pre>

:::info
* `--config auto` sends your repository's project URL to [Semgrep Registry](https://semgrep.dev/r) to find rules configured for your repository and as a key for cached rule recommendations.
* When Semgrep Registry is used, [usage metrics](metrics.md) are collected by default.
:::

Explore the Semgrep Registry by following these steps:

1. See the [Semgrep Registry](https://semgrep.dev/explore) and choose a rule.
2. On the page of the rule, click **Run Locally**.
3. Copy the code for local install, and then add the path to the source code you want to check in your terminal:
    <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" <span className="placeholder">PATH/TO/SRC</span></code></pre>
4. Optional: Run registry rules simultaneously with local rules:
   <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">PATH/TO/MYRULE.YAML PATH/TO/SRC</span></code></pre>

:::info
Try Semgrep [Rule Board](semgrep-app/rule-board.md) to determine which rules Semgrep uses and what action Semgrep undertakes when it generates a finding.
:::

### Running Semgrep Registry continuously

To use Semgrep Registry continuously in your CI/CD pipeline, see the [Semgrep in CI](https://semgrep.dev/docs/semgrep-ci/overview) documentation.

## Creating and using local rules

Local rules can be either:

- [Ephemeral rules](#ephemeral-rules) with the `-e` or `--pattern` flags for use in a single command.
- Configured in [YAML rule files](#yaml-defined-rules) that conform to the [Rule syntax](../writing-rules/rule-syntax/) schema.

:::tip
See [Writing rules > Getting started](../writing-rules/overview/) to learn how to write rules.
:::

### Ephemeral rules

Use the `-e` or `--pattern` flags in your terminal for ephemeral rules that are used once.

For example: Check for Python `==` where the left and right sides are the same (often a bug):
```sh
semgrep -e '$X == $X' --lang=py path/to/src
```

:::info
Both local `rule.yaml` files and ephemeral rules are called *local rules*.
:::

### YAML-defined rules

To create a local YAML file where you define your own rules and run them with Semgrep, follow these steps:

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

## Running multiple rules simultaneously

To run multiple rules simultaneously, use `--config` before every YAML URL, or Semgrep registry entry name. This option let's you include your local rules as well as Semgrep Registry rules. See the following code example (substitute the colored values as necessary):

<pre class="language-bash"><code>semgrep --config <span className="placeholder">p/python</span> --config <span className="placeholder">MYRULES/MYRULE.YAML</span></code></pre>

## Findings

* See [Managing findings](../managing-findings/) for information on Semgrep findings.
* See [Ignoring findings](../ignoring-files-folders-code/) for details on suppressing rule output.

## Next steps

Contribute to the registry by writing your own rules and adding them to the <a href="https://github.com/returntocorp/semgrep-rules" target="_blank">Semgrep rules repository</a>. Find out how to contribute to Semgrep rules repository by reading [Contributing to Semgrep rules](contributing/contributing-rules.md) guide.

## Number of Semgrep rules

Semgrep supports a large number of languages and rules! Their number is continuously expanding.
<div className="lang-container" style={{marginBottom: '20px'}}>
  <iframe width="900" height="400" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep-rules.num/graph"></iframe>
</div>

<MoreHelp />
