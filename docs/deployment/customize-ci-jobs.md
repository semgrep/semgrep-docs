---
slug: customize-ci-jobs 
title: Customize CI jobs 
hide_title: true
description: tk
tags:
  - Deployment
---

import DiffAwareScanning from "/src/components/reference/_diff-aware-scanning.mdx"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"

# Customize your CI job

:::note Your deployment journey
- You have gained the necessary [resource access and permissions](/deployment/checklist) required for deployment.
- You have [created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [connected your source code manager](/deployment/connect-scm).
- Optionally, you have [set up SSO](/deployment/sso).
- You have successfully added a [Semgrep job](/deployment/add-semgrep-to-ci) to your CI workflow.
:::

Customize your CI job to achieve the following goals:

* **Run Semgrep on a schedule**. Run full scans on main or trunk branches at the least intrusive time on developer teams.
* **Run Semgrep when an event triggers**. Run Semgrep when a pull or merge request (PR or MR) is created. 
- **Set a timeout to increase or decrease Semgrep's overall runtime.** If scans are taking too long, or rules aren't running, customize your per-rule timeout.

<!--
* **Run Semgrep with custom rules**. Apply rules specific to your organization's business goals and coding conventions.
-->
<!--
* **Run Semgrep on relevant files and blocks of code**. Configure Semgrep to ignore files and folders such as test files, configuration files, and files from other vendors.
 * **Configure a Semgrep CI job to pass even when any finding is detected**. By default, stand-alone configurations fail when any finding is detected. You can also configure Semgrep to pass CI jobs when findings are reported. 
* **Output, export, or save findings to a file**. Semgrep can save to a number of file formats, including SARIF and JSON.-->

## Set up diff-aware scans

:::info
Follow the steps in this section only for the following CI providers:

- Jenkins
- CI providers without guidance from Semgrep Cloud Platform
:::

<DiffAwareScanning />

To configure a diff-aware scan:

1. Create a separate CI job following the steps in [Add Semgrep to CI through Semgrep Cloud Platform](/deployment/add-semgrep-to-ci/#add-semgrep-to-ci-through-semgrep-cloud-platform).
1. Set the `SEMGREP_BASELINE_REF` variable in your CI configuration file. The value of this environment variable is typically your trunk branch, such as `main` or `master`.

## Set a scan schedule

<CiScheduling />

## Set a custom timeout

By default, Semgrep spends **5 seconds** to run **per rule**. To **set a custom timeout** for the Semgrep job, set the `SEMGREP_TIMEOUT` environment variable in seconds. Decreasing this value speeds up your scans, but with the possibility of skipping some rules. Alternatively, increasing this value ensures that your most complex rules finish running. For example:

```sh
SEMGREP_TIMEOUT="3" # Sets the per-rule timeout to 3 seconds.
```

:::caution
Setting this variable to **0** removes the time limit, meaning that rules can take any amount of time to run.
:::