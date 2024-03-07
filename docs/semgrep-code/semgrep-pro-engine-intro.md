---
slug: semgrep-pro-engine-intro
append_help_link: true
description: "This article introduces Semgrep Pro Engine, guides you through installation, and provides some additional information."
hide_title: true
title: Enabling interfile analysis with Pro Engine 
---

import MoreHelp from "/src/components/MoreHelp"
import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Semgrep Pro Engine overview

<SemgrepProEngineIntroduction extended/>

<br />
<br />

:::info Language support
Refer to [<i class="fa-regular fa-file-lines"></i> Supported languages](/supported-languages/#semgrep-pro-engine) to see languages supported by Semgrep Pro Engine.
:::

## Using and running Semgrep Pro Engine

This section guides you through the Pro Engine installation and helps you to scan your projects both in CLI and with Semgrep Cloud Platform (SCP).

### Running Semgrep Pro Engine in Semgrep Cloud Platform

:::info Prerequisite
You have completed a [Semgrep core deployment](/deployment/core-deployment).
:::

This is the preferred method to run Semgrep Pro Engine. It enables you to view and triage your findings from a centralized location. Code is not uploaded.

To run Semgrep Pro Engine in the Semgrep Cloud Platform, follow these steps:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
1. Click **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. Ensure that the <i class="fa-solid fa-toggle-large-on"></i> **Pro Engine beta** toggle is enabled.
1. Ensure that you have the **default ruleset** added in your **[Policies page](https://semgrep.dev/orgs/-/policies)**. If this ruleset is **not** added, go to [<i class="fas fa-external-link fa-xs"></i> Semgrep Registry - Default ruleset page](https://semgrep.dev/p/default), then click **Add to Policy**. For best results, set this ruleset to the **Monitor** rule mode.

Full scans now include Semgrep Pro Engine. You can trigger a full scan through your CI provider. Note that it does **not** support scanning on diff-aware (pull or merge request) scans. 

:::tip Testing Semgrep Pro Engine
To test Semgrep Pro Engine on a purposefully vulnerable repository, fork the [<i class="fas fa-external-link fa-xs"></i> juice-shop](https://github.com/juice-shop/juice-shop) repository, and then add it to Semgrep Cloud Platform.
:::

### Running Semgrep Pro Engine in CLI

:::info Prerequisite
- Local installation of Semgrep CLI. See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep](/getting-started/quickstart/) to install Semgrep CLI.
:::

To run Pro Engine in the CLI, perform the following steps.

1. [Sign up or sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
1. For first-time users, click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
1. Click **<i class="fa-solid fa-gear"></i> Settings > Pro Engine**.
![DESCRIPTION](/img/pro-engine-toggle.png#md-width)
1. Ensure that you are in the **root directory** of the repository you want to scan.
1. In your CLI, log in to your Semgrep Cloud Platform account and run a scan:
```sh
semgrep login && semgrep ci
```

#### Updating Semgrep Pro Engine in CLI

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
    # ensure that you have Python 3.8 or later installed
    # on WSL before proceeding
    
    python3 -m pip install --upgrade semgrep
    ```

    </TabItem>

    <TabItem value='Docker'>

    ```bash
    docker pull semgrep/semgrep:latest
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


### Creating rules that analyze across files and functions 

To create rules that analyze across files and functions, add `interfile: true` under the `options` key when defining a rule. This key signals to Semgrep Pro Engine to use the rule for both cross-function and cross-file analysis.

#### Pro Engine cross-function example

The following example shows how to define the `interfile` key (see the **Rule** pane) and the resulting cross-function analysis in the **Test code** pane.

<iframe title="Interfile key example" src="https://semgrep.dev/embed/editor?snippet=lRZ5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

Click **<i class="fa-solid fa-play"></i> Run** to see the true positive in lines 27-30.

The Pro Engine performed cross-function analysis as the `userInput()` source was called in `main()` while the `exec()` sink was called in the `DockerCompose` class.

Interact with the rule widget to compare Semgrep OSS and Semgrep Pro Engine. In the **Rule** pane, you can remove the lines:

```yaml
options:
  interfile: true
```

This results in a failure to detect the true positive, because Semgrep did not perform cross-function analysis.

## Known limitations of Semgrep Pro Engine

### CommonJS

Currently Semgrep Pro Engine does not handle specific cases of CommmonJS where you define a function and assign it to an export later, Semgrep Pro Engine does not track the code below:

```js
function get_user() {
    return get_user_input("example")
  }

module.exports = get_user
```

### Regressions in Semgrep Pro

For cross-file (interfile) analysis, Semgrep Pro Engine resolves names differently than Semgrep OSS. Consequently, rules with `interfile: true` may produce different results than Semgrep OSS Engine. Some instances could be regarded as regressions; if you encounter them, please file a bug report. When you need to report a bug in Semgrep Pro Engine, go through [Semgrep Support](/docs/support/). You can also contact us through [Semgrep Community Slack group](https://go.semgrep.dev/slack).

## Additional information

### Types of Semgrep Pro Engine analysis

<dl>
    <dt>Cross-file (interfile) analysis</dt>
    <dd><ul><li>Cross-file analysis finds patterns spanning multiple files to help security engineers deeply understand their organization's security issues. This analysis reduces noise and detects issues that Semgrep OSS Engine can't find.</li>
    <li>Cross-file analysis runs on full scans. These scans may take longer to complete and can use more memory than Semgrep OSS Engine scans. See the available languages for cross-file analysis in <a href="/docs/supported-languages/#semgrep-pro-engine"><i class="fa-regular fa-file-lines"></i> Supported languages</a>.</li>
    <li>In Semgrep Pro Engine, cross-file analysis includes cross-function analysis as well.</li></ul></dd>
    <dt>Cross-function (interprocedural) analysis</dt>
    <dd><ul><li>Cross-function analysis finds patterns within a single file spanning code blocks and functions.</li>
    <li>See an example of cross-function analysis in <a href="#pro-engine-cross-function-example"> Pro Engine cross-function example</a>.</li>
    <li>See the available languages for cross-function analysis in <a href="/docs/supported-languages/#semgrep-pro-engine"><i class="fa-regular fa-file-lines"></i> Supported languages</a>.</li></ul>
    </dd>
</dl>

#### Semgrep Pro Engine CI scan issues

To provide reliably completed scans, Semgrep Pro Engine can **fall back** to the use of Semgrep OSS Engine. This ensures that in the vast majority of cases, scans run successfully.

If a scan uses more than 5&nbsp;GB of memory during pre-processing, the scan uses Semgrep OSS Engine to ensure lower memory consumption. Similarly, if the Pro Engine scan doesn't complete after 3 hours, the Pro Engine times out and Semgrep OSS rescans the repository. Typically, this is because the repository is very large.

If 1-2 repositories cause CI scan issues, modify your config file to use `semgrep ci --oss-only`. This overrides the Semgrep CI settings for these repositories, and always runs these scans with Semgrep OSS. 

If many repositories cause scan issues:
1. Disable the <i class="fa-solid fa-toggle-large-on"></i> **Pro Engine beta** toggle in the **[Settings](https://semgrep.dev/orgs/-/settings)** page of your organization.
1. Contact the Semgrep team in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a> so we can help you to fix the issue and create a plan for your organization.

### Difference between Semgrep Pro Engine and join mode

Semgrep Pro Engine is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform cross-file analyses by letting you join on the metavariable matches in separate rules. Join mode is an experimental feature which is not actively developed or maintained. You may encounter many issues while using join mode.

### Feedback for Semgrep Pro Engine

The team at Semgrep is excited to hear what’s on your mind. As you explore Semgrep Pro Engine, we want to know what you'd like to be able to capture with it. We believe that this deeper analysis helps users find more vulnerabilities, build trust with developers, and enforce code standards quickly. Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.

<MoreHelp />
