---
slug: overview
append_help_link: true
description: "Run Semgrep in CI environments. Learn about different features of CI jobs connected to Semgrep Cloud Platform and stand-alone Semgrep jobs."
tags:
    - Semgrep in CI
    - Team & Enterprise Tier
title: Semgrep in CI 
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"
import ScanTargets from "/src/components/reference/_scan-targets.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Getting started with Semgrep in continuous integration (CI)

Semgrep can be run within CI (continuous integration) environments. By integrating Semgrep into your CI environment, your development cycle benefits from the automated scanning of repositories at various events, such as:

* Push events
* Pull or merge requests (PRs or MRs)
* User-initiated events (such as GitHub Action's `workflow_dispatch`)

Semgrep is integrated into CI environments by creating a **job** (also known as an **action** for some CI providers) that is run by the CI provider. This CI job can scan the following targets:

<ScanTargets />

A Semgrep CI job can **connect to Semgrep Cloud Platform**, a centralized location for managing findings, sending notifications, and configuring Semgrep rules for scanning. Alternatively, a Semgrep CI job can be set up as a **stand-alone** job, which means it does not connect to Semgrep Cloud Platform. 

This document helps users choose which method best meets their goals in integrating Semgrep in their CI environment.

After selecting a method, refer to the links in the [Next steps](#next-steps) section for documentation on how to set up or refine your CI job.

:::info
When running in CI, Semgrep runs fully in the CI build environment. Your code is never sent anywhere.
* Semgrep Cloud Platform collects [findings data](/docs/managing-findings/#semgrep-ci), which includes the line number of the code match, but **not the code**. It is hashed using a one-way hashing function. Findings data is used to generate line-specific hyperlinks to your source code management system and support other Semgrep functions.
* CI scans that are not connected to Semgrep Cloud Platform do not send findings data to any servers.
:::

## Choosing a method

There are two methods to set up Semgrep in CI. 

* To scale and automate your scans across many repositories, **use Semgrep Cloud Platform (SCP)**. Semgrep Cloud Platform provides a centralized web application to manage findings and configure rulesets and notifications. This is the **recommended method** of integrating Semgrep in CI.
* To scan your code in a single CI pipeline, **create a stand-alone CI job or add Semgrep to a script block in your pipeline.** You can still run scans on a schedule or trigger a scan based on events, but without Semgrep Cloud Platform.

Refer to the following table to help you choose what method best meets the needs of your development.

### Feature comparison

The following table displays what features are available for manual (without Semgrep Cloud Platform) and automated (through Semgrep Cloud Platform) methods.

| Feature | Semgrep Cloud Platform setup | Stand-alone CI job setup (without Semgrep Cloud Platform) |
| :------ | :--------------------------------- | ---------------------------------------------- |
| Scan on a schedule | ✔️ | ✔️ |
| Scan with custom rules and rulesets | ✔️ | ✔️ |
| Scan mainline (trunk) and non-mainline branches | ✔️ | ✔️ |
| Trigger scans when a Pull request (PR) or merge request (MR) is created | ✔️ | ✔️ |
| Prevent vulnerable code from merging into mainline branches | ✔️ | ✔️ |
| Generate CI configuration files for [many providers](/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#ci-providers-listed-in-semgrep-cloud-platform) | ✔️ | ❌ |
| Receive PR or MR review comments in GitHub, GitLab, or BitBucket | ✔️ | ❌ |
| Manage false positives in bulk through triage | ✔️ | ❌ |
| Receive notifications in Slack and email | ✔️ | ❌ |
| Pricing | Free for up to 10 developers* | Free |

*For teams larger than 10 developers, see the paid [Team or Enterprise tiers](https://semgrep.dev/pricing/).

## Setting up a CI job with Semgrep Cloud Platform

The following video walks you through setting Semgrep in your CI through Semgrep Cloud Platform.

<iframe class="yt_embed" width="100%" height="432px" src="https://www.youtube.com/embed/ukIUM3j0gZY" frameborder="0" allowfullscreen></iframe>

## Understanding the CI job pipeline and default behavior

The Semgrep CI job is similar to other code scanning and linting jobs. You create a CI job through a configuration file following the syntax set by your CI provider. The following features are available to most CI providers for both stand-alone (without Semgrep Cloud Platform) and Semgrep Cloud Platform configurations:

* Run Semgrep on a set schedule and time.
* Trigger Semgrep to run on certain events, such as pull requests, (PR), merge requests (MR), and push events.
* Set up CI jobs on PRs or MRs to scan only changes in files. This is called **diff-aware** scanning.
* Scan with custom rules and rulesets.
* Customize Semgrep to ignore irrelevant code files and folders, such as tests.

Any number of Semgrep CI jobs can be created for a single repository.

### Additional features of Semgrep Cloud Platform

In addition to the features mentioned previously, Semgrep Cloud Platform has the following features:

<dl>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep Cloud Platform can scan only changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast, tracks when a finding is fixed, and reduces the number of duplicated findings.</dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-cloud-platform/github-pr-comments">PR or MR comments</a> from Semgrep Cloud Platform on the lines of code that generated a finding.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep Cloud Platform collects findings in a Findings page. In this page, you can click on a finding to return to your GitHub, GitLab, or BitBucket repository to view the lines of code in your repository that generated the finding.</dd>
    <dt>GitHub or GitLab security dashboard</dt>
    <dd>Send Semgrep findings to GitHub or GitLab's security dashboard.</dd>
</dl>

For more information on the features supported by CI providers and source code providers such as GitHub, GitLab, or BitBucket see [Semgrep Cloud Platform feature support](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#semgrep-cloud-platform-feature-support).

### General steps to run Semgrep in CI with Semgrep Cloud Platform

This section describes a high-level view of steps to run Semgrep continuously with Semgrep Cloud Platform. 

:::info
Semgrep Cloud Platform creates a SAST (Static Application Security Testing) job by default. To run dependency scans exclusively, refer to [Sample CI configurations](/semgrep-ci/sample-ci-configs).
:::

![High level view of steps to integrate and refine Semgrep in your CI environment with Semgrep Cloud Platform](/img/semgrep-ci-overview-app.png "High level view of steps to integrate and refine Semgrep in your CI environment with Semgrep Cloud Platform")

_Figure 1._ High level view of steps to integrate and refine Semgrep in your CI environment with SCP.

Integrating Semgrep in your CI environment through Semgrep Cloud Platform is the **recommended method** for CI providers such as GitHub Actions and GitLab CI/CD. 

The following steps outline the general procedure to automate Semgrep in many CI environments with Semgrep Cloud Platform.

1. [Sign in](https://semgrep.dev/login) to Semgrep Cloud Platform.
2. Click on **Projects** > **Scan New Project**.
3. Follow instructions in SCP. These steps vary based on your CI provider.
4. Semgrep Cloud Platform generates a `SEMGREP_APP_TOKEN` and creates a configuration file. 
5. Commit the configuration file and add `SEMGREP_APP_TOKEN` as a credential, token, or secret.
6. The scan automatically begins.
7. After the scan, Semgrep Cloud Platform reports findings (if any) into the Findings dashboard.
8. Optional: If you are not satisfied with your CI job's behavior, troubleshoot and edit the configuration file. Refer to [Sample CI configuration for Semgrep Cloud Platform](/docs/semgrep-ci/sample-ci-configs).
9. Repeat from step 2 to integrate Semgrep into remaining repositories.

#### Default behaviors of scans set up through Semgrep Cloud Platform

* Findings do not block a PR or MR. The presence of findings can be customized to block a PR or MR through [Policies](/semgrep-code/policies).
* The CI job does not fail when detecting findings, but can still fail due to other errors. See [Semgrep exit codes](/docs/cli-reference/#exit-codes).
* Scan output is presented in Semgrep Cloud Platform's Findings page, enabling users to click a link for the file and line in the code that generated the finding.

### General steps to integrate Semgrep in CI as a stand-alone job

![High level view of steps to integrate a stand-alone Semgrep job in your CI environment](/img/semgrep-ci-overview-noapp.png "High level view of steps to integrate a stand-alone Semgrep in your CI environment")
_Figure 2._ High level view of steps to integrate a stand-alone Semgrep job in your CI environment.

The following steps outline the general procedure to add Semgrep in CI as a stand-alone job.

1. Create or copy a configuration file (see [Sample CI configurations](/docs/semgrep-ci/sample-ci-configs)) following the syntax set by your CI provider.
2. Commit the configuration file into the target repository.
3. Follow any additional steps given by your CI provider to create the CI job. These steps vary based on your CI provider.
4. Run the Semgrep CI job. The interface varies based on your CI provider.
5. The CI job exits with an exit code. This exit code indicates whether findings were generated, if no findings were generated, or if an error occurred during the scan.
6. Optional: If you are not satisfied with your CI job's behavior, troubleshoot and edit the configuration file.
7. Repeat the entire process for the remaining repositories to integrate with Semgrep.

#### Default behaviors of manual Semgrep CI scans

* If a scan detects **any finding**, Semgrep exits with an exit code of 1. **This causes the job to fail. **When scanning pull or merge requests, the job's failure blocks the PR or MR from merging.
* Scan output is presented in the CI provider's logs. There are no links to click to view the code in the file itself.

:::info
A stand-alone Semgrep CI job **can be customized to enable jobs with findings to pass**, but this is not default behavior, and Semgrep cannot undertake pass or fail actions based on the severity of a finding.
:::

## Next steps

After you have chosen a method, refer to the following documents for specific steps and code samples to set up and refine your Semgrep CI job.

| Document | User goal |
| :------- | :-------  |
| [Running Semgrep in CI with Semgrep Cloud Platform](/running-semgrep-ci-with-semgrep-cloud-platform) | Set up CI with Semgrep Cloud Platform to manage findings, receive PR or MR comments in your repository, and manage scanning for many repositories |
| [Running Semgrep in CI without Semgrep Cloud Platform](/running-semgrep-ci-without-semgrep-cloud-platform) | Integrate Semgrep into a repository by committing a job configuration file. |
| [Sample CI configurations](/sample-ci-configs) | Refer to this document for different configuration files of Semgrep Cloud Platform, arranged by CI provider. |

<MoreHelp />
