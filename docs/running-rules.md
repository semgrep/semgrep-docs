---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

## Introduction

Rules are specific patterns based on which Semgrep reports findings in code. These findings may help you to catch issues of security, performance, correctness, and other bugs. Rules are stored in an open-source [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) that enables you to scan code without need to write anything custom. The list below covers different kinds of Semgrep rules:

- Use existing [Semgrep Registry rules](#running-semgrep-registry-rules) or add new rules to Semgrep Registry and run them. See [Contributing to Semgrep rules](https://semgrep.dev/docs/contributing/contributing-to-semgrep-rules-repository/) to find out how to add new rules.
- Local rules:
  - Create and run one-off [ephemeral rules](#ephemeral-rules) in the command line.
  - Create and run [YAML-defined rules in a file](#creating-and-using-yaml-defined-rules-file).
- Run your [local rules simultaneously with Semgrep Registry rules](#running-multiple-rules-simultaneously). 

You can run all rules on your local code or continuously in your Source Code Management (SCM) service (such as GitHub or GitLab) with Semgrep in CI. For more information, see [Semgrep CI overview](semgrep-ci/overview.md).

## Running Semgrep Registry rules locally

Try to run the following example of [Semgrep Registry](https://semgrep.dev/explore) rules:

1. Test how Semgrep automatically surveys languages and frameworks and run recommended rules for your source code:
    ```sh
    semgrep --config=auto path/to/src
    ```
2. Explore the [Semgrep Registry](https://semgrep.dev/explore) and choose a rule.
3. On the page of the rule, click **Run Locally**.
4. Copy the code for local install, and then add the path to the source code you want to check:
    <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" <span className="placeholder">PATH/TO/SRC</span></code></pre>
5. Optional: Run registry rules simultaneously with local rules:
   <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">PATH/TO/YML PATH/TO/SRC</span></code></pre>

:::note
* `--config auto` sends your repository's project URL to [Semgrep Registry](https://semgrep.dev/r) to find rules configured for your repository and as a key for cached rule recommendations.
* When Semgrep Registry is used, [usage metrics](../metrics) are collected by default.
:::

Add rulesets to Semgrep in CI scans using their **Add to Policy** button on Semgrep Community and Semgrep Team tiers.

## Using local rules

Local rules can be either:

- Ephemeral rules with the `-e` or `--pattern` flags for use in a single command.
- Configured in YAML rule files that conform to the [Rule syntax](../writing-rules/rule-syntax/) schema.

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
Both local yaml files and ephemeral rules are called *local rules*.
:::

### Creating and using YAML-defined rules file

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

## Running multiple rules simultaneously

To run multiple rules simultaneously, use `--config` before every YAML URL, or Semgrep registry entry name. This option let's you include your local rules as well as Semgrep Registry rules. See the following code example (substitute the colored values as necessary):

<pre class="language-bash"><code>semgrep --config <span className="placeholder">p/python</span> --config <span className="placeholder">MYRULES/MYRULE.YAML</span></code></pre>

## Findings

* See [Managing findings](../managing-findings/) for information on Semgrep findings.
* See [Ignoring findings](../ignoring-files-folders-code/) for details on suppressing rule output.

## Next steps

Contribute to the registry by writing your own rules and adding them to the <a href="https://github.com/returntocorp/semgrep-rules" target="_blank">Semgrep rules repository</a>. Find out how to contribute to Semgrep rules repository by reading [Contributing to Semgrep rules](contributing/contributing-rules.md) guide.

## Number of Semgrep rules

The following diagram displays the current number of Semgrep rules:
<div className="lang-container" style={{marginBottom: '20px'}}>
  <iframe width="900" height="400" frameBorder="0" src="https://dashboard.semgrep.dev/metric/semgrep-rules.num/graph"></iframe>
</div>

<MoreHelp />
