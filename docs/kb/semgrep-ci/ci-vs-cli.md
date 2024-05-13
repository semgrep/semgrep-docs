---
description: How to align your scan results between CI and CLI and understand differences in behavior.
tags:
  - Semgrep CI
  - Semgrep CLI
---

# Semgrep in CI vs CLI: align your SAST scan results and understand differences

When configuring Semgrep, it can be helpful to run it both using the command-line interface (CLI) and in continuous integration (CI) to review findings behavior.

However, the two methods of running Semgrep have somewhat different behavior by default, so the findings may not be directly comparable. If you're seeing different findings with a CLI scan as compared to a scan in CI, here are some possible reasons.

## Installation methods and versioning

When comparing Semgrep scans in CI and CLI, ensure that you are running the same version of Semgrep on the CLI as in CI, and that it is [installed](/getting-started/cli) in the same way as it is in CI.

If you use Semgrep's Docker image in CI and are running the CLI scan locally, the best options are:

* Use the Docker container locally.
* Install Semgrep using `brew` (Mac only).

## Branches and diff-aware scans

When comparing findings, ensure that the scans were run on the same code. To compare results for an entire repository, the best option is to scan the latest commit to the default branch.

When running Semgrep in CI, if the triggering event is a pull request or merge request, the recommended configuration runs a [diff-aware scan](/deployment/customize-ci-jobs#set-up-diff-aware-scans), so only findings identified in the changed code are reported. Therefore, not all findings are reported in these scans.

## Rule configuration

If you use Semgrep with Semgrep AppSec Platform, `semgrep ci` with no additional arguments executes a scan using your organization's [policies](/docs/semgrep-code/policies) configuration. Findings are determined by the rules present in different policies. If you have any organization-specific rules in your policies, those are included as well.

Findings on rules in the Blocking policy cause the scan to finish with exit code 1. See also [Blocking findings and errors](#blocking-findings-and-errors).

On the other hand, `semgrep --config auto` executes a scan using relevant rules from the [Semgrep Registry](https://semgrep.dev/explore), without using a particular configuration. It does not include organization-specific rules from Semgrep AppSec Platform.

To address this difference, run `semgrep scan` with specific rules or rulesets that closely match your policies. For example, if your policies include only the "default" ruleset in the Monitor column, running:

```bash
semgrep --config "p/default"
```

would give similar results to `semgrep ci`.

## Pro analysis

When using `semgrep ci` with Semgrep AppSec Platform, the Semgrep scan reflects the Pro Engine options configured in Semgrep AppSec Platform at https://semgrep.dev/orgs/-/settings. If Pro Engine is enabled, and the scanned code includes [supported Pro languages](/docs/supported-languages/#semgrep-pro-engine), then interfile and interprocedural analysis is performed.

If Pro Engine is not enabled in Semgrep AppSec Platform, [Pro rules](/docs/semgrep-code/pro-rules) are used, but they are run as OSS rules, using only intrafile and intraprocedural analysis.

To perform a CLI scan using Pro Engine, ensure you've [installed Pro Engine](/docs/semgrep-code/semgrep-pro-engine-intro/#installing-semgrep-pro-engine-in-cli), and include `--pro` in your command:

```bash
semgrep --config auto --pro
```

To scan without Pro Engine in CI, even if it is enabled in Semgrep AppSec Platform, use:

```bash
semgrep ci --oss-only
```

## Blocking findings and errors

If you use Semgrep in CI without Semgrep AppSec Platform, `semgrep ci` finishes with exit code 1 if there are any findings, since there is no way to distinguish blocking from non-blocking findings. Review [Configuring blocking findings and errors in continuous integration (CI)](/docs/semgrep-ci/configuring-blocking-and-errors-in-ci) to change this behavior.

The CLI command `semgrep scan` finishes with exit code 0 by default as long as the scan is able to complete, even if there are findings. To finish with exit code 1 on any findings, use the `--error` flag.
