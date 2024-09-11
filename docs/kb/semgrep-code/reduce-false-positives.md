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
1. Test that the customizations improve the rule performance by entering:
<pre>semgrep scan --config='<span class="placeholder">SEMGREP_RULES_FOLDER</span>/<span class="placeholder">NAME_OF_IMPROVED_RULE</span>.yaml'</pre>

### Remove the rule from the scan

Delete the rule from the folder containing your Semgrep rules.

## Use advanced analyses

Semgrep AppSec Platform provides cross-function (interprocedural) and cross-file (interfile) analyses. These analyses both reduce false positives and detect true positives that Semgrep OSS can't find.

To enable these analyses, you must create a Semgrep account.

### Sign in to Semgrep

To create a Semgrep Account You need a GitHub or GitLab account
1. Enter the following command:
    ```
    semgrep login
    ```
1. Follow the steps to create an account and proceed.

### Use Pro rules


### Enable

<!--
due to the following:

- The lack of additional SAST analyses, such as cross-file (interfile) taint.
- The lack of Semgrep community rule coverage for your language.

-->
