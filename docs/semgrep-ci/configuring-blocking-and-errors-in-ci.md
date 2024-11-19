---
slug: configuring-blocking-and-errors-in-ci
append_help_link: true
description: "Configure how Semgrep in CI pipelines handles errors and blocks findings."
tags:
 - Deployment
title: Configure blocking findings
hide_title: true
---

import BlockFindingsErrorsConfigs from "/src/components/reference/_block-findings-errors-configs.mdx"

# Handling blocking findings and errors

This article documents how Semgrep handles blocking findings and errors and how you can change Semgrep's default behavior.

## Blocking findings

Blocking findings are those identified by Semgrep Code using rules defined in Semgrep AppSec Platform's [Policies page](https://semgrep.dev/orgs/-/policies) and are set to **Block** mode. You can avoid blocking findings by removing rules or by switching the rule mode to **Monitor**, **Comment**, or **Disabled**.

If you do **not** use Semgrep AppSec Platform with Semgrep in CI or Semgrep Managed Scans (that is, you are using a **stand-alone setup**), all Semgrep findings are blocking findings. The existence of any findings means that Semgrep returns an exit code of `1`, which you can use to block your PRs or MRs.

## Semgrep's default behavior regarding blocking findings and errors

When Semgrep identifies one or more blocking findings, it returns exit code `1`. You can use this result to set up additional checks to enforce a block in your CI/CD pipeline, such as not allowing the merge of the PR/MR. This action applies to both full scans and [diff-aware scans](/semgrep-code/glossary#diff-aware-scan).

The process to enforce a block on a PR or MR after Semgrep exits with error code `1` is dependent on your CI provider. Review your CI provider's documentation for further information.

If Semgrep encounters an internal error, it sends an anonymous crash report to a crash-reporting server. By default, it returns exit code 0 in CI. If you would prefer to catch internal errors, review the options below and the Semgrep exit codes reference to determine how you want to handle each exit code.

:::info
See [CLI reference](/cli-reference#exit-codes) for more information about Semgrep exit codes.
:::

## Configuration options for blocking findings and errors in CI
 
You can configure, change, or revert to the default setup of blocking findings and errors in your CI pipeline by passing one of the following options in the `semgrep.yml` file used to configure and run Semgrep in your CI pipeline:

| CI option | Description |
|------------------------------------------------|-------------------------------------|
| `semgrep ci` or `semgrep ci --suppress-errors` | Default. CI **fails** on blocking findings, but **passes** on internal errors. |
| `semgrep ci --no-suppress-errors` | CI **fails** on blocking findings and internal errors. |
| <code>semgrep ci &vert;&vert; true</code> | CI **passes** on blocking findings and internal errors. |

To change Semgrep's behavior, modify your pipeline or job file, specifically the `semgrep ci` command, to the CI option that best fits your needs. For example, GitHub users should edit the `semgrep.yml` workflow file and include the following under the `run` key:

```yaml
run:
    semgrep ci --suppress-errors
```

GitLab users would include the following under the `script` key:

```yaml
script:
    semgrep ci --suppress-errors
```

If you use any other CI provider, refer to its documentation for information on where to provide this information. 
See the [Examples of blocking findings and errors configuration](#examples-of-blocking-findings-and-errors-configuration) below.


## Sample configurations for blocking findings and errors

<BlockFindingsErrorsConfigs />
