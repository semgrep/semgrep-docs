---
slug: semgrep-pro-engine-intro
append_help_link: true
description: "This article introduces Semgrep Pro Engine, guides you through installation, and provides some additional information."
hide_title: true
title: Semgrep Pro Engine overview
---

import MoreHelp from "/src/components/MoreHelp"
import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep Pro Engine overview

## Introduction

<SemgrepProEngineIntroduction extended/>

## Semgrep Pro engine language support

Refer to [Supported languages](/supported-languages/#semgrep-pro-engine) to see languages supported by Semgrep Pro Engine.

## Using and running Semgrep Pro Engine

This section guides you through the Semgrep Pro Engine installation and helps you to scan your projects both in CLI and with the Semgrep Cloud Platform (SCP).

### Running Semgrep Pro Engine in CLI

:::info Prerequisite
- Local installation of Semgrep CLI. See [Getting started with Semgrep](/getting-started) to install Semgrep CLI.
:::

It is **recommended** to run Semgrep Pro Engine with Semgrep Cloud Platform (SCP). This enables you to view and triage your findings from a centralized location. Code is not uploaded.

1. [Sign up or sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings > Pro Engine**.
![DESCRIPTION](/img/pro-engine-toggle.png#md-width)
3. In your CLI, log in to your Semgrep Cloud Platform account and run a scan:
```sh
semgrep login && semgrep ci
```

:::note
Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.
:::

### Updating Semgrep Pro Engine in CLI

To update Semgrep Pro Engine to the latest version, follow these steps:

1. Update Semgrep OSS engine with the following command:
    <Tabs
        defaultValue="macOS"
        values={[
        {label: 'macOS', value: 'macOS'},
        {label: 'Linux', value: 'Linux'},
        {label: 'Windows Subsystem for Linux (WSL)', value: 'Windows Subsystem for Linux (WSL)'},
        {label: 'Docker', value: 'Docker'},
        ]}
    >

    <TabItem value='macOS'>

    ```bash
    brew upgrade semgrep
    ```

    Alternatively:

    ```bash
    python3 -m pip install --upgrade semgrep
    ```

    </TabItem>

    <TabItem value='Linux'>

    ```bash
    python3 -m pip install --upgrade semgrep
    ```

    </TabItem>

    <TabItem value='Windows Subsystem for Linux (WSL)'>

    ```bash
    python3 -m pip install --upgrade semgrep
    ```

    </TabItem>

    <TabItem value='Docker'>

    ```bash
    docker pull returntocorp/semgrep:latest
    ```

    </TabItem>

    </Tabs>

1. Log in to Semgrep Cloud Platform:
    ```sh
    semgrep login
    ```
1. Update the Semgrep Pro Engine:
    ```sh
    semgrep install-semgrep-pro
    ```

:::info
The command to update Semgrep Pro Engine is the same as the command to install Semgrep Pro Engine.
:::

### Enabling Semgrep Pro Engine in Semgrep Cloud Platform

:::info Prerequisite
- An existing Semgrep Cloud Platform account. See [Signing in to SCP](/semgrep-code/getting-started/#semgrep-code-with-semgrep-cloud-platform).
- [Team](https://semgrep.dev/pricing) tier or higher of Semgrep Code. If you want to try Semgrep Pro Engine, get in touch with us through our [contact page](https://semgrep.dev/contact-us).
:::

To enable Semgrep Pro Engine in the Semgrep Cloud Platform, follow these steps:

1. Sign in to [Semgrep Cloud Platform](https://semgrep.dev/login).
1. Select **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. Ensure that the <i class="fa-solid fa-toggle-large-on"></i> **Pro Engine beta** toggle is enabled.
1. Ensure that you have the **default ruleset** added in your **[Policies page](https://semgrep.dev/orgs/-/board)**. If this ruleset is **not** added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policy**. For best results, set this ruleset to the **Monitor** rule mode.
1. Optional: If you don't have any projects added to your organization, follow the procedures described in [Scanning a repository](/semgrep-code/getting-started/#semgrep-code-with-semgrep-cloud-platform) to scan a new project with Semgrep Pro Engine. Ensure that your project's language is supported by Semgrep Pro Engine.

:::info Testing Semgrep Pro Engine
To test Semgrep Pro Engine on a purposefully vulnerable repository, fork the [juice-shop](https://github.com/juice-shop/juice-shop) repository, and then add it to SCP by following the steps described in section [Adding or onboarding a new project (repository)](/semgrep-code/getting-started/#adding-or-onboarding-a-new-project-repository).
:::

### Creating rules that analyze across files

Cross-file analysis (also called interfile analysis) rules you use in Semgrep Pro Engine require the `interfile: true` key included under the rule `options` key. See the following [example](https://semgrep.dev/playground/s/lkPE). This key signals Semgrep Pro Engine to use the rule for cross-file analysis.

Example of `interfile: true` key:
```yaml
rules:
  - id: dangerous-call-to-employees-pro-engine-example
    options:
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
    <dt>Cross-file</dt>
    <dd>The cross-file analysis (also called interfile analysis) gathers context across multiple files to help security engineers deeply understand their organization's security issues. Semgrep Pro Engine reduces noise and detects new vulnerabilities that Semgrep OSS Engine can't find. Cross-file analysis runs on nightly scans. These scans may take longer to complete and can use more memory than Semgrep OSS Engine scans. See the available languages for cross-file (interfile) analysis in <a href="/docs/supported-languages/#semgrep-pro-engine">Semgrep Pro Engine supported languages</a>.</dd>
    <dt>Cross-function</dt>
    <dd>The cross-function analysis (also called interprocedural analysis) keeps the fast scan times of Semgrep OSS Engine while also finding new vulnerabilities that cross functions within a single file. Cross-function (interprocedural) analysis improves results in pull requests (PRs) or merge requests (MRs) through CI scans. The interprocedural analysis is available for all languages listed as GA on the <a href="/docs/supported-languages/">Supported languages</a> page</dd>
</dl>

### Semgrep Pro Engine CI scans

By default, when you use Semgrep Pro Engine in CI:

- PR and MR scans (triggered by opening a new PR or MR, or when a new changes are introduced to a PR or MR) use cross-function (interprocedural) analysis, limited to single files. This is a fast scan, that crosses the boundaries of individual functions in each file.
- Full scans, also called scheduled cron job or nightly scans use cross-file (interfile) and cross-function (interprocedural) analysis. This type of scan finds complex vulnerabilities that cross the boundaries of single files and functions, providing security teams with deeper analysis. This type of scan also requires more time. 

#### Semgrep Pro Engine CI scan issues

To provide reliably completed scans, Semgrep Pro Engine can fall back to the use of Semgrep OSS Engine. This ensures that in the vast majority of cases, scans run successfully.

If a scan uses more than 5&nbsp;GB of memory during pre-processing, the scan uses Semgrep OSS Engine to ensure lower memory consumption. Similarly, if the Semgrep Pro Engine scan doesn't complete after 3 hours, the Pro Engine times out and Semgrep OSS rescans the repository. Typically, this is because the repository is very large.

If 1-2 repositories cause CI scan issues, modify your config file to use `semgrep ci --oss-only`. This overrides the Semgrep CI settings for these repositories, and always runs these scans with Semgrep OSS. 

If many repositories cause scan issues:
1. Disable the <i class="fa-solid fa-toggle-large-on"></i> **Pro Engine beta** toggle in the **[Settings](https://semgrep.dev/orgs/-/settings)** page of your organization.
1. Contact the Semgrep team in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a> so we can help you to fix the issue and create a plan for your organization.

### Difference between Semgrep Pro Engine and join mode

Semgrep Pro Engine is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform cross-file (interfile) analyses by letting you join on the metavariable matches in separate rules. Join mode is an experimental feature which is not actively developed or maintained. You may encounter many issues while using join mode.

### Feedback for Semgrep Pro Engine

The team at Semgrep is excited to hear what’s on your mind. As you explore Semgrep Pro Engine, we want to know what you'd like to be able to capture with it. We believe that this deeper analysis helps users find more vulnerabilities, build trust with developers, and enforce code standards quickly. Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.

<MoreHelp />
