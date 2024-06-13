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

# Configure blocking findings and errors

This article documents how Semgrep pipelines handle blocking findings and errors in its default setup. This article also provides three configuration options you can use to change or revert to the default behavior.

## Default configuration of blocking findings and error suppression

Semgrep can help block pull requests (PRs) or merge requests (MRs). Semgrep returns exit code `1`, and you can use this result to set up additional checks to enforce a block on a PR or MR when it matches a blocking finding. This action applies to both full scans and [diff-aware scans](/semgrep-code/glossary#diff-aware-scan).

Blocking findings can be defined as:

- Findings defined in the [Policies page](https://semgrep.dev/orgs/-/policies) of Semgrep AppSec Platform. Avoid blocking findings by removing rules from the **Block** rule mode of the [Policies page](https://semgrep.dev/orgs/-/policies).
- If you do **not** use Semgrep AppSec Platform with Semgrep in CI (that is, you are using a **stand-alone setup**), blocking findings encompass all Semgrep findings. Any finding in this setup blocks your PRs or MRs.

By default, Semgrep does not block your pipeline when it encounters an internal error. Semgrep suppresses all errors and does not surface them to the CI provider. In case of an internal error, Semgrep sends an anonymous crash report to a crash-reporting server and does not block your CI pipeline. To change the default configuration, see the sections below.

## Configuration options for blocking findings and errors

Configure, change or revert to the default setup of blocking findings and errors in your CI pipeline using the following options in CI configuration file:

| CI option                                      | Description                         |
|------------------------------------------------|-------------------------------------|
| `semgrep ci` or `semgrep ci --suppress-errors` | Default: CI **fails** on blocking findings, CI **passes** on internal errors.  |
| `semgrep ci --no-suppress-errors`              | CI **fails** on blocking findings, CI **fails** on internal errors.            |
| <code>semgrep ci &vert;&vert; true</code>      | CI **passes** on blocking findings, CI **passes** on internal errors.          |

To change this configuration, insert one of the configuration options (flags) after the following keys in CI YAML configuration file of Semgrep:
- On GitHub, insert the flag after the `run` key (for example, `run: semgrep ci --suppress-errors` to state the default option).
- On GitLab, insert the flag after the `script` key (for example, `script: semgrep ci --suppress-errors` to state the default option).
- Insert these flags in an equivalent key in configuration files of other CI providers.

See the [Examples of blocking findings and errors configuration](#examples-of-blocking-findings-and-errors-configuration) below.

:::info
- For more information about specific Semgrep exit codes, see [CLI reference](/cli-reference#exit-codes).
:::

To find more details about some of these configuration options, see the following list:

- `semgrep ci` - The default state. Semgrep in CI **fails** on blocking findings, CI **passes** on internal errors. If Semgrep encounters an internal error, it sends an anonymous crash report to a crash-reporting server and exits with exit code `0` (success). Consequently, Semgrep in CI does not report other statuses than `0` or `1` by default (success or a blocking finding). Optional: Define this setting explicitly using the `--suppress-errors` flag.
- `semgrep ci --no-suppress-errors` - Semgrep in CI **fails** on blocking findings, CI **fails** on internal errors. If you use this flag, all exit codes, including internal errors, surface to the CI provider.
- `semgrep ci || true` - Semgrep in CI **passes** on blocking findings, CI **passes** on internal errors.

## Examples of blocking findings and errors configuration

<BlockFindingsErrorsConfigs />
