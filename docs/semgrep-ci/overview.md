---
slug: overview
append_help_link: true
description: "Semgrep can run CI environments. It can either be used stand-alone or connected with Semgrep App for centralized rule and findings management."
hide_title: true
title: Getting started with Semgrep in CI 
---

import MoreHelp from "/src/components/MoreHelp"

# Getting started with Semgrep in continuous integration (CI)

Semgrep can be run within CI (continuous integration) environments. By integrating Semgrep into your CI environment, your development cycle benefits from the automated scanning of repositories at every push event, pull or merge request (PR or MR).

Semgrep is integrated into CI environments by creating a **job** (also known as an **action** for some CI providers) that is run by the CI provider.

A Semgrep CI job can be automated through Semgrep App, or set up manually.

This document aims to help users choose which method best meets their goals in integrating Semgrep in their CI environment. This document provides: 

* An overview of two methods (through Semgrep App or through a stand-alone CI job) to integrate Semgrep in CI.
* A comparison between those two methods.
* A table of CI providers that are supported in Semgrep App.
* A guide to the general workflow to set up and refine your CI configuration.

After selecting a method, refer to the links in the [Next steps](/#next-steps) section for documentation on how to set up or refine your Semgrep in CI job.

:::info
When running in CI, Semgrep runs fully in your build environment. Your code is never sent anywhere.
* Semgrep App collects [findings data](/docs/managing-findings/#semgrep-ci), which includes the line number of the code match, **not the code**. It is hashed using a one-way hashing function. Findings data is used to generate hyperlinks and support other Semgrep functions.
* CI scans that are not connected to Semgrep App do not send findings data to any servers.
:::

## Choosing a method

There are two methods to set up Semgrep in CI. 

* To scale and automate your scans across many repositories, **use Semgrep App. **Semgrep App provides a centralized web application to manage findings and configure rulesets and notifications. This is the **recommended method** of integrating Semgrep in CI.
* To scan your code in a single CI pipeline, **create a stand-alone CI job or add Semgrep to a script block in your pipeline.** This means continuously scanning on a schedule or to trigger a scan upon the creation of a PR (pull request) or MR (merge request). This method does not require Semgrep App.

Refer to the following tables to help you choose what method best meets the needs of your development.

### Feature comparison

The following table displays what features are available for manual (without Semgrep App) and automated (through Semgrep App) methods.


<table>
  <tr>
   <td><strong>Feature</strong>
   </td>
   <td><strong>Semgrep App (Community Tier) setup</strong>
   </td>
   <td><strong>Stand-alone CI job setup (without Semgrep App)</strong>
   </td>
  </tr>
  <tr>
   <td>Scan on a schedule
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Scan with custom rules and rulesets
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Scan mainline (trunk) and non-mainline branches
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Trigger scans when a Pull request (PR) or merge request (MR) is created
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Automate CI set up process for [many providers]()TODOFIX
   </td>
   <td>✔️
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Receive PR or MR review comments in your source code management (SCM) tool
   </td>
   <td>✔️
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Manage false positives in bulk through triage
   </td>
   <td>✔️
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Receive notifications in Slack and email
   </td>
   <td>✔️
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Prevent vulnerable code from merging into mainline branches
   </td>
   <td>✔️
   </td>
   <td>✔️
   </td>
  </tr>
  <tr>
   <td>Pricing
   </td>
   <td>Free for up to 20 developers*
   </td>
   <td>Free
   </td>
  </tr>
</table>


*For teams larger than 20 developers, see the [Team or Enterprise tiers](../pricing-and-billing).

## Setting up a CI job with Semgrep App in two minutes

The following video walks you through setting Semgrep in your CI through Semgrep App.

## Understanding the CI job pipeline and default behavior

The Semgrep CI job is similar to other static analysis and linting jobs. You create a CI job through a configuration file following the syntax set by your CI provider. The following features are available to most CI providers for both stand-alone (without Semgrep App) and Semgrep App configurations:

* Run Semgrep on a set schedule and time.
* Trigger Semgrep to run on certain events, such as pull requests, (PR), merge requests (MR), and push events.
* Scan with custom rules and rulesets.
* Customize Semgrep to ignore irrelevant code files and folders, such as tests.

Any number of Semgrep CI jobs can be created for a single repository.

In addition to the features mentioned previously, Semgrep App also has the following features:

TODO


The following sections describe a high-level view of steps to integrate Semgrep both manually and through Semgrep App.


<!-- ![alt_text](images/image1.png "image_tooltip") -->


_Figure 2. High level view of steps to integrate and refine Semgrep in your CI environment through Semgrep App._

Integrating Semgrep in your CI environment through Semgrep App is the recommended method for CI providers such as GitHub Actions and GitLab CI/CD. 

The following steps outline the general procedure to automate Semgrep in many CI environments through Semgrep App.



1. [Sign in](https://semgrep.dev/login) to Semgrep App.
2. Click on **Projects > Scan New Project**.
3. Follow instructions in the App. These steps vary based on your CI provider.
4. Semgrep App generates a `SEMGREP_APP_TOKEN` and creates a configuration file. 
5. For certain CI providers, Semgrep App can commit the file and `SEMGREP_APP_TOKEN` to the target repository and SCM (source code management) tool. Otherwise, users must commit the file and `SEMGREP_APP_TOKEN` themselves.
6. Semgrep App starts the scan.
7. After the scan, Semgrep App reports findings (if any) into the Findings dashboard.
8. Optional: If you are not satisfied with your CI job's behavior, troubleshoot and edit the configuration file. Refer to [Sample CI configuration for Semgrep App](semgrep-ci/sample-ci-configs).
9. Repeat from step 2 to integrate Semgrep into remaining repositories.


#### Default behaviors of scans set up through Semgrep App



* Findings do not block a PR or MR. The presence of findings can be customized to block a PR or MR through the [Rule Board].
* The CI job does not fail when detecting findings, but can still fail due to other errors. See [Semgrep error codes](../cli-reference/#error-codes).
* Scan output is presented in Semgrep App's Findings page, enabling users to click a link for the file and line in the code that generated the finding.


### General steps to integrate Semgrep in CI manually




<!-- ![alt_text](images/image2.png "image_tooltip") -->


_Figure 1. High level view of steps to integrate and refine Semgrep in your CI environment manually._

The following steps outline the general procedure to add Semgrep in CI manually.



1. Create or copy a configuration file (see Semgrep CI sample configurations) following the syntax set by your CI provider.
2. Commit the configuration file into the target repository.
3. Follow any additional steps given by your CI provider to create the CI job. These steps vary based on your CI provider.
4. Run the Semgrep CI job. The interface varies based on your CI provider.
5. The CI job exits with an exit code. This exit code indicates whether findings were generated, if no findings were generated, or if an error occurred during the scan.
6. Optional: If you are not satisfied with your CI job's behavior, troubleshoot and edit the configuration file. Refer to [Sample CI configuration for Semgrep App](semgrep-ci/sample-ci-configs).
7. Repeat the entire process for the remaining repositories to integrate with Semgrep.

For a detailed guide to manually adding Semgrep for your CI provider, see [Manually integrating Semgrep in various CI providers](/semgrep-ci/manually-integrating-semgrep-in-ci).


#### Default behaviors of manual Semgrep CI scans



* If a scan detects **any finding**, Semgrep exits with an exit code of 1. **This causes the job to fail. **When scanning pull or merge requests, the job's failure blocks the PR or MR from merging.
* Scan output is presented in the CI provider's logs. There are no links to click to view the code in the file itself.

**NOTE**

A manually configured Semgrep CI job **can be customized to enable jobs with findings to pass,** but this is not default behavior, and Semgrep cannot undertake pass or fail actions based on the severity of a finding.


## Next steps

After you have chosen a method, refer to the following documents for specific steps and code samples to set up and refine your Semgrep CI job.
# OLD

## Reviewing Findings

### Scan output

Semgrep CI exits with exit code 1 if the scan returned any findings.
This causes your CI provider to show a ❌ next to the job,
preventing the pull request from being merged. 
You can find a description of the findings in the log output.

<details>
<summary>Click for an example of Semgrep CI's job output</summary>

```sh
Scanning across multiple languages:
         python | 127 rules × 1 file 
    <multilang> |   3 rules × 1 file 
  Current version has 2 findings.
Switching repository to baseline commit 'f74fdbb855f179d2858c487ae25871ef65d2fb09'.
  Will report findings introduced by these commits:
    * a833b40 Update server.py
Scanning 1 file with 2 python rules.
Findings:
  src/server.py 
     python.lang.security.audit.dangerous-system-call.dangerous-system-call
        Found dynamic content used in a system call. This is dangerous if external data can reach
        this function call because it allows a malicious actor to execute commands. Use the
        'subprocess' module instead, which is easier to use without accidentally exposing a command
        injection vulnerability.
        Details: https://sg.run/vzKA
         10┆ os.system(cmd)
Some files were skipped.
  Scan was limited to files changed since baseline commit.
Ran 371 rules on 1 file: 1 finding.
Ran 371 blocking rules, 0 audit rules, and 0 internal rules used for rule recommendations.
Reporting findings to semgrep.dev ...
Success.
Has findings for blocking rules so exiting with code 1
```

</details>
<br />

:::note
Rules are *blocking* by default and behave as described above.
When connected to Semgrep App, you can also add non-blocking rules to your scans.
Non-blocking rules return [non-blocking findings](#getting-notifications-instead-of-blocking-builds) which notify you via an integration but do not show up in log output, and do not cause jobs to fail with a ❌.
:::

### Integrations

For users of Semgrep App, you can integrate Semgrep CI with many other services, to get you results in the workflow you're already used to, whether you're a developer or part of a security team.

#### Notifications

![Screenshot of a Slack notification describing the details of a finding](/img/slack-notification.png)<br />
A Slack notification triggered by new findings in a pull request

Notifications require connection to Semgrep App. You can get notified about new findings via:

- [GitHub pull request comments](/semgrep-app/notifications/#github-pull-request-comments)
- GitLab merge request comments ([sign up for the beta here](https://go.r2c.dev/join-gitlab-beta))
- [Slack messages](/semgrep-app/notifications/#slack)
- [emails](/semgrep-app/notifications/#email)
- [webhooks](/semgrep-app/notifications/#webhooks) (paid feature in Semgrep App)

To set up notifications, see [Notifications document](/semgrep-app/notifications) for more information.

:::note
Notifications are sent only the first time a given finding is seen. [See how notifications are de-duplicated](/semgrep-app/notifications/#de-duplication)
:::

#### Security dashboards

![Screenshot of Semgrep App's findings dashboard showing a bar chart of findings over time, and a list of the most recent findings](/img/semgrep-app-overview.png)<br />
Semgrep App's findings overview page

The dashboards give you an overview of all your findings organization-wide.
You can review Semgrep CI's findings through the following security dashboards:

- [GitLab SAST Security Dashboard](https://docs.gitlab.com/ee/user/application_security/security_dashboard/) (requires GitLab Ultimate subscription)
- [GitHub Advanced Security Dashboard](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security) (requires GitHub Enterprise subscription)
- [Semgrep App](https://semgrep.dev/manage) (free and paid tiers available)

## Advanced Configuration

### Registry rules and rulesets

:::info
These instructions apply to using Semgrep CI directly in your CI environment. For use with Semgrep App please use the "Add to policy" button next to any registry rule or ruleset, or visit [Dashboard > Policies](https://semgrep.dev/manage/policies).
:::

Semgrep CI accepts a list of rules and rulesets to run on each scan. To add from the [Semgrep Registry](https://semgrep.dev/explore), just include the rule or ruleset identifier in your CI workflow file. Identifiers take the form `p/<ruleset-id>` and `r/<rule-id>`. These identifiers can be copied directly for any rule or ruleset directly from the Registry, and run locally using the `--config <identifier>` flag with the [Semgrep command line tool](/getting-started/#run-semgrep-locally).

For example, in GitLab CI/CD:

```yaml
# ...
 variables:
    SEMGREP_RULES: >-
      p/security-audit
      p/secrets
# ...
```

Key names and configuration format for specific CI providers are available in the [sample CI configurations](../sample-ci-configs/).

### Custom rules

:::info
See [Writing rules](/writing-rules/overview/) to learn how to write custom rules.
:::

Your own custom rules can be added to your Semgrep CI configuration just like [Registry rules](#registry-rules-and-rulesets/) by:

1. Including their [Playground](https://semgrep.dev/editor) share ID (e.g. `s/susan:named-rule`)
2. Adding the directory or file path to the local file containing the rule
3. Adding the rule to a `.semgrep/` directory, which is included by default

For example, in GitLab CI/CD:

```yaml
# ...
 variables:
    SEMGREP_RULES: >-
      s/dlukeomalley:translation-of-non-string  # Playground share ID
      no-exec.yml                               # File containing one or more rules
      .semgrep/                                 # Directory containing rule yaml files 
# ...
```

If no configuration is provided and no `.semgrep.yml` or `.semgrep/` directory exists, Semgrep CI will exit with a non-zero error code.

### Ignoring files

Semgrep CI supports a `.semgrepignore` file that follows the `.gitignore` syntax and is used to skip files and directories during scanning. This is commonly used to avoid vendored and test related code. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

:::caution
`.semgrepignore` is only used by Semgrep CI and the Semgrep command line tool. It is not honored by integrations like [GitLab's Semgrep SAST Analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep).
:::

By default Semgrep CI skips files and directories such as `tests/`, `node_modules/`, and `vendor/`. It uses the same default `.semgrepignore` as the CLI, which can be found in the [CLI Reference](https://semgrep.dev/docs/cli-reference/#ignoring-files). This is used by Semgrep CI when no explicit `.semgrepignore` file is found in the root of your project.

For information on ignoring individual findings in code, see the [ignoring findings page](/ignoring-findings/).

### Audit scans

Semgrep CI has an audit mode that can be enabled to suppress non-zero exit codes when findings are found during branch scans. These scans are not differential in nature and by default pre-existing findings will fail the build. With audit mode enabled, even though findings will not cause non-zero exit codes, internal Semgrep errors and exception will still fail the build.

This behavior is beneficial for those who want to ensure every merge to a branch is fully scanned but who don't want to interfere with the development process because of pre-existing issues. In this mode, [security dashboards](#security-dashboards) can still be kept up to date and [notifications](#notifications) can be received.

In GitHub Actions, the most common event names are `push` and `pull_request`. To enable audit mode on branch pushes in GitHub Actions, set the option `auditOn: push` in your workflow file.

In providers other than GitHub Actions and GitLab CI, Semgrep CI doesn't infer an event name from the environment. Therefore, all scan run on an event named `unknown`.

### Exit codes

| Exit code | Meaning |
| --- | --- |
| **0** | Scan successful and found no blocking findings. By default, internal errors are not blocking the pipeline (CI always results in status `0`), but blocking findings block the pipeline (status `1`). To change the default behavior, see [Configuring blocking findings and errors](/semgrep-ci/configuration-reference.md/#configuring-blocking-findings-and-errors). |
| **1** | Scan completed successfully and found blocking findings |
| **2** | Scan failed (error suppression mentioned in **`0`** description above is disabled). Semgrep in CI prints the error details. |

[Non-blocking findings](#getting-notifications-instead-of-blocking-builds) do not affect the exit code.

### Appendix

#### Ignoring specific rules in a ruleset or policy

You can customize the ruleset you're using to ignore some of its rules by [editing the Semgrep App Rule Board](/semgrep-app/rule-board).

#### Getting notifications instead of blocking builds

Some rules point out hotspots that require careful review but are not certain to be insecure code. You might want to disable blocking when scanning with such rules, and instead use a [CI integration](/semgrep-app/notifications/) to get notifications.

You can set this up through the [Rule Board](/semgrep-app/rule-board).

<MoreHelp />
>>>>>>> main
