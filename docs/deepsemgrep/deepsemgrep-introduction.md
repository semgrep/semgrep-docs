---
slug: deepsemgrep-introduction
append_help_link: true
description: "This article introduces DeepSemgrep, guides you through installation and provides some additional information."
---

import MoreHelp from "/src/components/MoreHelp"

# DeepSemgrep overview

## Introduction

Improve your scan results for entire codebases with interfile coding paradigms using DeepSemgrep instead of Semgrep's regular intrafile (within-a-single-file) approach. DeepSemgrep empowers you to easily scan whole repositories that have object-oriented programming paradigms with classes in different files to find vulnerabilities in your code. DeepSemgrep is a proprietary extension of free and open source Semgrep which leverages global analysis tools, and uses the same rules as Semgrep. 

This document demonstrates the utility of DeepSemgrep through use cases, guiding you through examples of Semgrep rules. Both Semgrep rules and code on which rules are tested are marked as code snippets and introduced always, as a rule, code, or file used to illustrate the capabilities of DeepSemgrep.

## DeepSemgrep language support

DeepSemgrep now offers alpha support for Java, JavaScript, and TypeScript.

## Installing DeepSemgrep

To enable DeepSemgrep installation, schedule a product demo by following these steps:

1. Submit your email using the [DeepSemgrep beta form](https://semgrep.dev/deep-semgrep-beta).
1. Follow the steps and instructions in the email you receive from the Semgrep team and schedule a product demo.

After your product demo, you'll get access to a new ruleset! Follow the instructions below to get your findings.

:::info Prerequisite
- Local installation of Semgrep CLI. See [Getting started with Semgrep CLI](/getting-started) to install Semgrep CLI.
:::

To install DeepSemgrep, follow these steps:

1. Log in to Semgrep CLI with the following command:
    ```sh
    semgrep login
    ```
1. Follow the link that Semgrep printed in the command line.
1. To install DeepSemgrep, use the following command:
    ```sh
    semgrep install-deep-semgrep
    ```
1. To test DeepSemgrep, use the following command in the root directory of the codebase to scan:
    ```bash
    semgrep --deep --config "p/deepsemgrep" --dataflow-traces
    ```
    The `p/deepsemgrep` is a DeepSeemgrep-specific ruleset to which you gained access after your product demo.
1. Optional: We appreciate your help gathering data as we improve DeepSemgrep! If you are fine with sending r2c usage metrics, run the command with `--time --metrics on`:
    ```bash
    semgrep --deep --config "p/deepsemgrep" --dataflow-traces --time --metrics on
    ```
    See [Semgrep Privacy Policy](/metrics) for details of what is being sent to r2c.

:::note
Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.
:::

## Additional information

### Difference between DeepSemgrep and join mode

DeepSemgrep is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform interfile analyses by letting you join on the metavariable matches in separate rules.

### Future development of DeepSemgrep

We’re excited to hear what’s on your mind. As users explore the limits of DeepSemgrep, we want to know what they’re failing to express. We believe that interfile type inference, constant propagation, and taint tracking combined allow users to express most restrictions on a program and enforce them quickly. Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.

<MoreHelp />