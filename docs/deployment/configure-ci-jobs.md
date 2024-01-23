---
slug: configure-ci-jobs 
title: Configure CI jobs 
hide_title: true
description: tk
tags:
  - tk
---

import DiffAwareScanning from "/src/components/reference/_diff-aware-scanning.mdx"
import CiScheduling from "/src/components/reference/_ci-scheduling.mdx"

# Configure your CI job

:::note Your deployment journey
- You have [<i class="fa-regular fa-file-lines"></i> created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [<i class="fa-regular fa-file-lines"></i> connected your source code manager](/deployment/connect-scm).
- Optionally, you have [<i class="fa-regular fa-file-lines"></i> set up SSO](/deployment/sso).
- You have successfully added a Semgrep job to your CI workflow.
:::
Configure a job's parameters to achieve the following goals: 

* **Run Semgrep on a schedule**. Run full scans on mainline branches at the least intrusive time on developer teams.
* **Run Semgrep with custom rules**. Apply rules specific to your organization's business goals and coding conventions.
* **Run Semgrep when an event triggers**. Run Semgrep when a pull or merge request (PR or MR) is created. These event triggers or event hooks are dependent on your CI provider. 
* **Run Semgrep on relevant files and blocks of code**. Configure Semgrep to ignore files and folders such as test files, configuration files, and files from other vendors.
<!-- * **Configure a Semgrep CI job to pass even when any finding is detected**. By default, stand-alone configurations fail when any finding is detected. You can also configure Semgrep to pass CI jobs when findings are reported. -->
* **Output, export, or save findings to a file**. Semgrep can save to a number of file formats, including SARIF and JSON.

## Set up diff-aware scans

:::info
This section only applies to the following CI providers:
- Azure Pipelines
- Jenkins
- CI providers not listed in Semgrep Cloud Platform
:::

<DiffAwareScanning />

To configure a diff-aware scan:

1. Create a separate CI job following the steps in [Add Semgrep to CI through Semgrep Cloud Platform](#add-semgrep-to-ci-through-semgrep-cloud-platform).
1. Set the `SEMGREP_BASELINE_REF` variable in your CI configuration file. The value of this environment variable is typically your trunk branch, such as `main` or `master`.

## Set a scan schedule

<CiScheduling />

## Set a custom timeout

By default, Semgrep times out after 30 minutes. To **set a custom timeout** for the Semgrep job, set the `SEMGREP_TIMEOUT` environment variable in seconds. For example:

```sh
SEMGREP_TIMEOUT="300"
```

