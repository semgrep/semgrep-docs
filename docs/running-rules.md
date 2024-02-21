---
slug: running-rules
append_help_link: true
description: "Learn about Semgrep rules, how to add your custom rules and rules from Semgrep Registry, a community-contributed repository of rules to help enforce security."
title: Run rules
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

# Run rules

Semgrep OSS performs static application security testing (SAST) scans through the use of **rules**. Rules are instructions based on which Semgrep detects patterns in code.

When Semgrep reports code using specified rules, the detected code is called a **finding**. The process of scanning and detecting a piece of code is also called **matching**, as Semgrep matches the code using rules to report a finding.

Semgrep findings can help you find security, performance, or correctness issues, and enforce best practices. You can define custom rules through Semgrep's rule syntax or rely on rules created by the community or Semgrep, Inc.

Public rules are stored in the [Semgrep Registry](https://semgrep.dev/explore) which enables you to scan code without the need to write anything custom. Semgrep Registry is stored in an [open-source repository](https://github.com/returntocorp/semgrep-rules).

Rules can be organized in **rulesets**. Rulesets are rules related through a programming language, OWASP category, or framework. The rulesets are curated by the team at Semgrep and updated as new rules are added to the [Semgrep Registry](https://semgrep.dev/explore).

The list below covers different kinds of Semgrep rules:

- Existing [Semgrep Registry rules](#running-semgrep-registry-rules-locally). You can also contribute to the open source Semgrep Registry, see [Contributing rules](/contributing/contributing-to-semgrep-rules-repository/).
- [Local rules](#creating-and-using-local-rules):
  - One-off [ephemeral rules](#ephemeral-rules) passed into the command line.
  - [YAML-defined rules](#yaml-defined-rules).
- A combination of [local rules and Semgrep Registry rules](#running-multiple-rules-simultaneously) or a combination of multiple rules in general.

## Running Semgrep Registry rules locally

You can run a SAST scan in your git environment with pre-selected Semgrep Registry rules:

```
semgrep scan --config=auto 
```

:::info
By default, when Semgrep Registry is used, Semgrep collects [usage metrics](./metrics.md).
:::

Explore the Semgrep Registry by following these steps:

1. See the [Semgrep Registry](https://semgrep.dev/explore), click a ruleset, and then choose a rule.
2. On the page of the rule, click **Run Locally**.
3. Copy the code for local install, and then add the path to the source code you want to check in your terminal:
    <pre class="language-bash"><code>semgrep scan --config="<span className="placeholder">RULESET-ID</span>" <span className="placeholder">PATH/TO/SRC</span></code></pre>
4. Optional: Run registry rules simultaneously with local rules:
   <pre class="language-bash"><code>semgrep scan --config="<span className="placeholder">RULESET-ID</span>" --config=<span className="placeholder">PATH/TO/MYRULE.YAML PATH/TO/SRC</span></code></pre>

<!-- ### Running Semgrep Registry continuously

To use Semgrep Registry continuously in your CI/CD pipeline, see the [Semgrep in CI](/semgrep-ci/overview) documentation.

-->

## Creating and using local rules

Local rules can be either:

- [Ephemeral rules](#ephemeral-rules) with the `-e` or `--pattern` flags for use in a single command.
- Configured in [YAML rule files](#yaml-defined-rules) that conform to the [Rule syntax](/writing-rules/rule-syntax/) schema.

:::tip
See [Writing rules > Getting started](../writing-rules/overview/) to learn how to write rules.
:::

### Ephemeral rules

Use the `-e` or `--pattern` flags in your terminal for ephemeral rules that are used once.

For example: Check for Python `==` where the left and right sides are the same (often a bug):
<pre class="language-bash"><code>semgrep -e '$X == $X' --lang=py <span className="placeholder">PATH/TO/SRC</span></code></pre>
Substitute the optional placeholder <code><span className="placeholder">PATH/TO/SRC</span></code> with the path to your source code.

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
    <pre class="language-bash"><code>semgrep scan --config <span className="placeholder">PATH/TO/MYRULE.YAML</span></code></pre>

For more information, see [Getting started](../writing-rules/overview/).

## Running multiple rules simultaneously

To run multiple rules simultaneously, use `--config` before every YAML URL, or Semgrep registry entry name. This option let's you include your local rules as well as Semgrep Registry rules. See the following code example (substitute the colored values as necessary):

<pre class="language-bash"><code>semgrep scan --config <span className="placeholder">p/python</span> --config <span className="placeholder">PATH/TO/MYRULE.YAML</span></code></pre>

## Findings

See [Ignoring findings](../ignoring-files-folders-code/) for details on suppressing rule output.

## Next steps

Find out how to contribute to [Semgrep Registry](https://github.com/returntocorp/semgrep-rules) by reading the [Contributing rules](/contributing/contributing-to-semgrep-rules-repository/) guide.

## Number of Semgrep Registry rules

Semgrep supports a large number of languages and rules! Their number is continuously expanding.

<div className="lang-container" style={{marginBottom: '20px'}}>
  <iframe width="900" height="400" frameBorder="0" src="https://dashboard.semgrep.dev/metric/registry.rules.num/graph"></iframe>
</div>

<MoreHelp />
