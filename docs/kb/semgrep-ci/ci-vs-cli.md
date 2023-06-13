---
description: How to align your scan results between CI and CLI and understand differences.
tags:
  - Semgrep CI
  - Semgrep CLI
---

# Semgrep in CI vs CLI: align your scan results and understand differences

When configuring Semgrep, it can be helpful to run it both locally (CLI) and in Continuous Integration (CI) in order to review findings behavior.

However, the two methods of running Semgrep have somewhat different behavior by default, so the findings may not be directly comparable. If you're seeing different results with a local CLI scan as compared to a run in CI, here are some possible reasons.

## Rule config

If you use Semgrep with Semgrep Cloud Platform, `semgrep ci` with no additional arguments will execute a scan using your organization's [rule board](https://semgrep.dev/docs/semgrep-code/rule-board/) or policy configuration. Findings will be determined by the rules present in different [policies](/docs/semgrep-code/policies/), and rules in the Blocking policy will cause the scan to exit with code 1. If you have any organization-specific rules in your policies, those will be included.

On the other hand, `semgrep --config auto` or `semgrep scan` will execute a scan using rules from the Semgrep registry, without respecting a particular configuration or including organization-specific rules from Semgrep Cloud Platform.

To address this discrepancy, consider running `semgrep scan` with a more specific set of rules that closely matches your rule board policies. For example, if your rule board contains the "default" ruleset in Monitor, running:

```
semgrep --config "p/default"
```

would give similar results to `semgrep ci`.

## Blocking findings and errors

If you use Semgrep in CI without Semgrep Cloud Platform, `semgrep ci` exits with code 1 if there any findings, since there is no way to distinguish blocking from non-blocking findings. Review [Configuring blocking findings and errors in continuous integration (CI)](/docs/semgrep-ci/configuring-blocking-and-errors-in-ci/) to change this behavior.

The local `semgrep scan` exits with 0 by default as long as the scan is able to complete, even if there are findings. To exit with code 1 on any findings, use the `--error` flag.

## Diff-aware scans

When running Semgrep in CI, if the triggering event is a pull request or merge request, the recommended configuration runs a [diff-aware scan](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning), so only findings identified in the changed code are reported. Therefore, not all findings will be reported in these scans.