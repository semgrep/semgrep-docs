---
slug: semgrep-pro-engine-intro
append_help_link: true
description: "This article introduces cross-file (interfile) analysis, guides you through installation, and provides some additional information."
hide_title: true
title: Perform cross-file analysis
---

import MoreHelp from "/src/components/MoreHelp"
import SemgrepProEngineIntroduction from "/src/components/concept/_semgrep-pro-engine-introduction.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Perform cross-file analysis 

<SemgrepProEngineIntroduction />


:::note Language support
Refer to [<i class="fa-regular fa-file-lines"></i> Supported languages](/supported-languages/#semgrep-pro-engine) to see languages supported by Semgrep Code.
:::

## Run cross-file analysis

This section guides you through installing the proprietary cross-file (interfile) analysis binary and helps you to scan your projects both in CLI and with Semgrep Cloud Platform (SCP).

### Run cross-file analysis with Semgrep Cloud Platform

:::info Prerequisite
You have completed a [Semgrep core deployment](/deployment/core-deployment).
:::

This is the preferred method to run cross-file analysis. It enables you to view and triage your findings from a centralized location. Your source code is not uploaded.

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
1. Click **<i class="fa-solid fa-gear"></i> [Settings](https://semgrep.dev/orgs/-/settings)**.
1. In the **Deployment** tab, click the <i class="fa-solid fa-toggle-large-on"></i> **Cross-file analysis** toggle.
1. Ensure that you have the **default ruleset** added in your **[Policies page](https://semgrep.dev/orgs/-/policies)**. If this ruleset is **not** added, go to [<i class="fas fa-external-link fa-xs"></i> Semgrep Registry - Default ruleset page](https://semgrep.dev/p/default), then click **Add to Policy**. For best results, set this ruleset to the **Monitor** rule mode.

**Full scans** now include cross-file analysis. You can trigger a full scan through your CI provider. Note that cross-file analysis does **not** currently run on diff-aware (pull or merge request) scans. 

### Run cross-file analysis in the CLI

:::info Prerequisite
- Local installation of Semgrep CLI. See [<i class="fa-regular fa-file-lines"></i> Getting started with Semgrep](/getting-started/quickstart/) to install Semgrep CLI.
:::

1. Sign up or sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep Cloud Platform](https://semgrep.dev/login).
1. For first-time users, click **Create an organization**. Note that you can further integrate organizations (orgs) with GitLab accounts and GitHub accounts, including personal and org accounts, after you complete this procedure.
1. Click **<i class="fa-solid fa-gear"></i> [Settings](https://semgrep.dev/orgs/-/settings)**.
1. In the **Deployment** tab, click the <i class="fa-solid fa-toggle-large-on"></i> **Cross-file analysis** toggle.
1. Ensure that you are in the **root directory** of the repository you want to scan.
1. In your CLI, log in to your Semgrep Cloud Platform account and run a scan:
```sh
semgrep login && semgrep ci
```

#### Update cross-file analysis in the CLI

Cross-file analysis uses a separate `semgrep` binary. To update to the latest version, follow these steps:

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
1. Update the Semgrep cross-file binary:
    ```sh
    semgrep install-semgrep-pro
    ```


### Write rules that analyze across files and functions 

To create rules that analyze across files and functions, add `interfile: true` under the `options` key when defining a rule. This key tells Semgrep to use the rule for both cross-function and cross-file analysis.

#### Cross-function example

The following example shows how to define the `interfile` key (see the **Rule** pane) and the resulting cross-function analysis in the **Test code** pane.

<iframe title="Interfile key example" src="https://semgrep.dev/embed/editor?snippet=lRZ5" width="100%" height="432px" frameBorder="0"></iframe>
<br />

Click **<i class="fa-solid fa-play"></i> Run** to see the true positive in lines 27-30.

Semgrep Code performed cross-function analysis as the `userInput()` source was called in `main()` while the `exec()` sink was called in the `DockerCompose` class.

Interact with the rule widget to compare Semgrep OSS and Semgrep Code. In the **Rule** pane, you can remove the lines:

```yaml
options:
  interfile: true
```

This results in a failure to detect the true positive, because Semgrep did not perform cross-function analysis.

## Known limitations of cross-file analysis

### CommonJS

Currently Semgrep's cross-file analysis does not handle specific cases of CommmonJS where you define a function and assign it to an export later. Cross-file analysis does not track the code below:

```js
function get_user() {
    return get_user_input("example")
  }

module.exports = get_user
```

### Regressions in cross-file analysis

Cross-file analysis resolves names differently than Semgrep OSS's analysis. Consequently, rules with `interfile: true` may produce different results than Semgrep OSS. Some instances could be regarded as regressions; if you encounter them, please file a bug report. When you need to report a bug in Semgrep's cross-file analysis, go through [Semgrep Support](/docs/support/). You can also contact us through [Semgrep Community Slack group](https://go.semgrep.dev/slack).

## Appendix

### Types of Semgrep Code analysis

<dl>
    <dt>Cross-file (interfile) analysis</dt>
    <dd><ul><li>Cross-file analysis finds patterns spanning multiple files to help security engineers deeply understand their organization's security issues. This analysis reduces noise and detects issues that Semgrep OSS can't find.</li>
    <li>Cross-file analysis runs on full scans. These scans may take longer to complete and can use more memory than Semgrep OSS scans. See the available languages for cross-file analysis in <a href="/docs/supported-languages/#semgrep-pro-engine"><i class="fa-regular fa-file-lines"></i> Supported languages</a>.</li>
    <li>In Semgrep Code, cross-file analysis includes cross-function analysis as well.</li></ul></dd>
    <dt>Cross-function (interprocedural) analysis</dt>
    <dd><ul><li>Cross-function analysis finds patterns within a single file spanning code blocks and functions.</li>
    <li>Semgrep Code scans run cross-function analysis by default.</li>
    <li>See an example of cross-function analysis in <a href="#pro-engine-cross-function-example"> Semgrep Code cross-function example</a>.</li>
    <li>See the available languages for cross-function analysis in <a href="/docs/supported-languages/#semgrep-pro-engine"><i class="fa-regular fa-file-lines"></i> Supported languages</a>.</li></ul>
    </dd>
</dl>

#### Semgrep Code cross-file CI scan issues

To provide reliably completed scans, Semgrep Code can **fall back** to the use of Semgrep OSS Engine. This ensures that in the vast majority of cases, scans run successfully.

By default, if a scan uses more than **5GB** of memory during cross-file pre-processing, the scan uses single-function analysis to ensure lower memory consumption. Similarly, if a cross-file scan doesn't complete after 3 hours, the analysis times out and Semgrep rescans the repository using single-function analysis. Typically, this happens because the repository is very large.

If 1-2 repositories cause CI scan issues and scanning these repositories with interfile analysis is not critical, modify your config file to use `semgrep ci --oss-only`. This overrides the Semgrep Cloud Platform setting for these repositories, and always runs these scans with single-function analysis.

If many repositories cause scan issues, or you have critical repositories you are unable to scan with Semgrep's interfile analysis:
1. Disable the <i class="fa-solid fa-toggle-large-on"></i> **Cross-file analysis** toggle in the **[Settings](https://semgrep.dev/orgs/-/settings)** page of your organization.
1. Review scan troubleshooting guides such as [A Semgrep scan is having a problem - what next?](/docs/kb/semgrep-code/semgrep-scan-troubleshooting/) or [Troubleshooting "You are seeing this because the engine was killed"](/docs/kb/semgrep-code/scan-engine-kill/).
1. If you need additional guidance, [contact Semgrep Support](/docs/support), or reach out to the Semgrep team in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a> so we can help you resolve the issue and create a plan for your organization.

### Difference between cross-file analysis and join mode

Cross-file analysis is different from [join mode](/writing-rules/experiments/join-mode/overview/), which also allows you to perform cross-file analyses by letting you join on the metavariable matches in separate rules. Join mode is an experimental feature which is not actively developed or maintained. You may encounter many issues while using join mode.

### Feedback for Semgrep Code's advanced analyses

The team at Semgrep is excited to hear what’s on your mind. As you explore these features, we want to know what you'd like to be able to capture with it. We believe that this deeper analysis helps users find more vulnerabilities, build trust with developers, and enforce code standards quickly. Let us know what you think about the results in the <a href="https://go.semgrep.dev/slack">Semgrep Community Slack</a>.

<MoreHelp />
