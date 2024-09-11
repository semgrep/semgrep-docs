---
slug: reduce-false-positives
title: Reduce false positives
hide_title: true
description: Learn different strategies to reduce false positives in your Semgrep OSS scans.
tags:
  - Semgrep Code
  - Semgrep OSS
---

# Reduce false positives in `semgrep scan`

The `semgrep scan` command can be used to quickly perform SAST scans. However, you may encounter false positives as you work through your findings. This document presents different strategies to reduce false positives and increase true positives in your scans.

## Customize your rules

If you notice that a specific Semgrep Community rule generates a high rate of false positives, the rule is said to be **noisy**. You can:

- Fork and customize that rule to improve its performance
- Remove the rule from the scan

### Set up local rules

To have more granular control over the rules in a ruleset, you must add the ruleset to your machine, then configure Semgrep to use those local rules.

1. Navigate to the [<i class="fas fa-external-link fa-xs"></i> Semgrep community rules repository](https://github.com/semgrep/semgrep-rules).
1. Fork or clone the repository to create a local copy of all the rules.
  1. To clone, click **Code** then copy and run the cloning command in your CLI. This creates a `semgrep-rules` repository.
  1. To fork, click **Fork** and follow the steps provided by GitHub. You must also clone the forked repository to your machine.
1. In your CLI, navigate to your `semgrep-rules` repository.
1. Find and copy the rules you want to use in a folder within your target codebase. Give the folder a descriptive name, such as `semgrep-rules`.
1. To use the local rules, run the following command:
<pre>semgrep scan --config='<span class="placeholder">SEMGREP_RULES_FOLDER/'</span></pre>

### Customize a rule from a Semgrep Community ruleset

1. Edit the noisy rule to improve its performance.
1. Test your rule improvements by entering:
<pre>semgrep scan --config='<span class="placeholder">SEMGREP_RULES_FOLDER</span>/<span class="placeholder">NAME_OF_IMPROVED_RULE</span>.yaml'</pre>

### Remove the rule from the scan

Delete the rule from the folder containing your Semgrep rules.

## Use advanced analyses and Pro rules

Optimizing rules can be a time-consuming process. Often, rules are not necessarily noisy, but lack additional analysis to detect true positives while ignoring false positives.

Semgrep AppSec Platform provides cross-function (interprocedural) and cross-file (interfile) analyses. These analyses both reduce false positives and detect true positives that Semgrep OSS can't find.

For some languages and frameworks, such as Java or the Python Django framework, Semgrep also provides advanced analyses that take into account the language's characteristics, framework-specific dataflows, and the like. These analyses are available by default.

To enable these analyses, you must create and sign in to a Semgrep account.

### Sign in to Semgrep

You need a GitHub or GitLab account to sign in to Semgrep.

1. Enter the following command:
    ```
    semgrep login
    ```
1. Follow the steps to create an account and proceed.
1. Optional: Enter `semgrep ci` to run a scan. By default, these scans use Semgrep Pro rules, cross-function analysis, and language-specific improvements.

:::tip
The `--config` option is not compatible with `semgrep ci` once you are logged in. To use your custom rules, add them to Semgrep AppSec Platform.
:::

#### Analyses and improvements available by default

##### Pro rules

Semgrep Pro rules are high-confidence, professionally maintained rules provided exclusively by Semgrep.

Click to view languages with Pro rules coverage

The goal of Pro rules is to provide a set of well-supported rules with improved coverage across languages and vulnerability types. Semgrep Pro rules are written using Semgrep’s latest features and, in general, target users who are looking to produce accurate, actionable findings.

##### Cross-function analysis

##### Language-specific improvements

Languages such as Java and frameworks such as Django, FastAPI, and Flask

### Enable cross-file analysis

By default, CLI scans using `semgrep ci` include cross-function analysis. Semgrep can also perform cross-file analysis.
