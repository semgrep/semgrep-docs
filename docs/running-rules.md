---
slug: running-rules
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# Running rules

## Introduction

Semgrep reports findings in code based on rules. These rules use specific patterns to match code. When Semgrep matches a code, it is reported as a finding. Findings may help you to catch issues of security, performance, and correctness. Rules are stored in an open-source [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) that enables you to scan code without need to write anything custom. The list below covers different kinds of Semgrep rules:

- Existing [Semgrep Registry rules](#running-semgrep-registry-rules). See [Contributing to Semgrep rules](https://semgrep.dev/docs/contributing/contributing-to-semgrep-rules-repository/) to find out how to add new rules.
- Local rules:
  - One-off [ephemeral rules](#ephemeral-rules) used in the command line.
  - The [YAML-defined rules](#creating-and-using-yaml-defined-rules-file) in a file.
- Combination of [local rules with Semgrep Registry rules](#running-multiple-rules-simultaneously). 

You can run all rules on your code locally or continuously in your Source Code Management (SCM) service (such as GitHub or GitLab) with Semgrep in CI. For more information, see [Semgrep CI overview](semgrep-ci/overview.md).

## Running Semgrep Registry rules locally

Test how Semgrep automatically surveys languages and frameworks and run recommended rules for your source code (substitute the `PATH/TO/SRC` with path to your source code):
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
   <pre class="language-bash"><code>semgrep --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">PATH/TO/YAML PATH/TO/SRC</span></code></pre>

:::info
Try Semgrep Rule Board to determine which rules Semgrep uses and what action Semgrep undertakes when it generates a finding.
:::

### Running Semgrep Registry continuously

To use Semgrep Registry continuously in your CI/CD pipeline, see the [Semgrep in CI](https://semgrep.dev/docs/semgrep-ci/overview) documentation.

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
