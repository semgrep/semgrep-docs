---
slug: semgrep-pro-engine-intro
append_help_link: true
description: "This article introduces Semgrep Pro Engine, guides you through installation and provides some additional information."
hide_title: true
title: Semgrep Pro Engine overview
---

import MoreHelp from "/src/components/MoreHelp"
import DeepSemgrepIntroduction from "/src/components/concept/_deepsemgrep-introduction.mdx"
import AddDemoProject from "/src/components/procedure/_add-demo-project.mdx"

# Semgrep Pro Engine overview

## Introduction

<DeepSemgrepIntroduction />

## Semgrep Pro engine language support

Refer to [Supported languages](/supported-languages/#semgrep-pro-engine) to see languages supported by Semgrep Pro Engine. Semgrep Cloud Platform users can also check language support on the [Settings page](https://semgrep.dev/orgs/-/settings).

## Using and running Semgrep Pro Engine

This section guides you through the Semgrep Pro Engine installation and helps you to scan your projects both in CLI and with the Semgrep Cloud Platform (SCP).

### Installing Semgrep Pro Engine in CLI

:::info Prerequisite
- Local installation of Semgrep CLI. See [Getting started with Semgrep OSS Engine](/getting-started) to install Semgrep CLI.
- [Team](https://semgrep.dev/pricing) tier or higher of Semgrep Code. If you want to try Semgrep Pro Engine, get in touch with us through our [contact page](https://semgrep.dev/contact-us).
:::

To install and run Semgrep Pro Engine in the CLI, follow these steps:

1. Log in to Semgrep CLI with the following command:
    ```sh
    semgrep login
    ```
1. Follow the link that Semgrep CLI printed in the command line.
1. To install Semgrep Pro Engine, use the following command:
    ```sh
    semgrep install-semgrep-pro
    ```
1. Optional: To test Semgrep Pro Engine, use the following command in the root directory of the codebase to scan:
    ```bash
    semgrep --pro --config "p/default" 
    ```
1. Optional: We appreciate your help gathering data as we improve Semgrep Pro Engine! If you are fine with sending r2c usage metrics, run the following command:
    ```bash
    semgrep --pro --config "p/default" --time --metrics on
    ```
    See [Semgrep Privacy Policy](/metrics) for details of what is being sent to r2c.

:::note
Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.
:::

### Enabling Semgrep Pro Engine in Semgrep Cloud Platform

:::info Prerequisite
- An existing Semgrep Cloud Platform account. See [Signing in to SCP](/semgrep-code/getting-started/#semgrep-code-with-semgrep-cloud-platform).
- [Team](https://semgrep.dev/pricing) tier or higher of Semgrep Code. If you want to try Semgrep Pro Engine, get in touch with us through our [contact page](https://semgrep.dev/contact-us).
:::

To enable Semgrep Pro Engine in the Semgrep Cloud Platform, follow these steps:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
1. Select **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. Enable the <i class="fa-solid fa-toggle-large-on"></i> **Semgrep Pro Engine beta** toggle.
1. Ensure that you have the **default ruleset** added in your **[Rule Board](https://semgrep.dev/orgs/-/board)**. In the Rule Board, the **default ruleset** is in the **Monitor column**. If this ruleset is **not** added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Rule Board**.
1. Optional: If you don't have any projects added to your organization, follow the procedures described in [Scanning a repository](/semgrep-code/getting-started/#semgrep-code-with-semgrep-cloud-platform) to scan a new project with Semgrep Pro Engine. Ensure that your project's language is supported by Semgrep Pro Engine.

:::info Testing Semgrep Pro Engine
To test Semgrep Pro Engine on a purposefully vulnerable repository, fork the [juice-shop](https://github.com/juice-shop/juice-shop) repository, and then add it to SCP by following the steps described in [Adding a repository](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-or-gitlab).
:::

### Creating interfile analysis rules

Interfile analysis rules you use in Semgrep Pro Engine require the `interfile: true` key to be included under the rule `metadata` key. See the following [example](https://semgrep.dev/s/3NZb). This key signals Semgrep Pro Engine to use the rule for interfile analysis.

Example of `interfile: true` key:
```yaml
rules:
  - id: dangerous-call-to-employees-pro-engine-example
    metadata:
      interfile: true
    patterns:
      - pattern: dangerous("Employees")
    message: Call of dangerous on employees table
    languages:
      - js
    severity: WARNING
```

## Additional information

### Types of Semgrep Pro Engine analysis  

<dl>
    <dt>Interfile analysis</dt>
    <dd>The interfile analysis gathers context across multiple files to help security engineers deeply understand their organization's security issues. Semgrep Pro Engine reduces noise and detects new vulnerabilities that Semgrep OSS Engine can't find. Interfile analysis runs on nightly scans. These scans may take longer to complete and can use more memory than Semgrep OSS Engine scans. See the available languages for interfile analysis in <a href="/docs/supported-languages/#semgrep-pro-engine">Semgrep Pro Engine supported languages</a>.</dd>
    <dt>Interprocedural analysis</dt>
    <dd>Interprocedural analysis keeps the fast scan times of Semgrep OSS Engine while also finding new vulnerabilities that cross functions within a single file. Interprocedural analysis improves results in pull requests (PRs) or merge requests (MRs) through CI scans. The interprocedural analysis is available for all languages listed as GA on the <a href="/docs/supported-languages/">Supported languages</a> page</dd>
</dl>


### Semgrep Pro Engine CI scan issues

To provide reliably completed scans, Semgrep Pro Engine can fall back to the use of Semgrep OSS Engine. This ensures that in the vast majority of cases, scans run successfully.

If a scan uses more than 5&nbsp;GB of memory during pre-processing, the scan uses Semgrep OSS Engine to ensure lower memory consumption. Similarly, if the Semgrep Pro Engine scan doesn't complete after 3 hours, the Pro Engine results in time out and Semgrep OSS rescans the repository. Typically, this is because the repository is very large.

If 1-2 repositories cause CI scan issues, modify your config file to use `semgrep ci --oss-only`. This overrides the Semgrep CI settings for these repositories, and always runs these scans with Semgrep OSS. 

If many repositories cause scan issues:
1. Disable the <i class="fa-solid fa-toggle-large-on"></i> **Semgrep Pro Engine beta** toggle in the **[Settings](https://semgrep.dev/orgs/-/settings)** page of your organization.
1. Contact r2c in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a> so we can help you to fix the issue and create a plan for your organization.

### Difference between Semgrep Pro Engine and join mode

Semgrep Pro Engine is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform interfile analyses by letting you join on the metavariable matches in separate rules.

### Future development of Semgrep Pro Engine

We’re excited to hear what’s on your mind. As users explore the limits of Semgrep Pro Engine, we want to know what they’re failing to express. We believe that this deeper analysis helps users find more vulnerabilities, build trust with developers, and enforce code standards quickly. Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.

<MoreHelp />
