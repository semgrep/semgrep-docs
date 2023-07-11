---
tags:
  - Semgrep Supply Chain
  - Semgrep Code
description: Troubleshoot common issues with Semgrep scans.
---

# A Semgrep scan is having a problem - what next?

If a Semgrep scan is failing or running slowly, try the following steps to investigate:

1. [Update Semgrep](/docs/upgrading/) to the latest version, if you are not currently running the latest version. Some errors result from an older version of Semgrep being used with newer rules.
2. Re-run the scan with either the `-v`/`--verbose` or `--debug` (extremely verbose) flags. These options provide more information about what is failing.
3. If you are running Semgrep Pro Engine in the scan, remove any options starting with `--pro`, or run Semgrep with `--oss-only`. This allows isolation of any issues related to Semgrep Pro Engine, and often speeds up a scan or reduces memory usage.

:::info
Semgrep verbose or debug logs can be quite lengthy. To prevent flooding your terminal and preserve the logs for analysis, you can redirect all output to a file with `semgrep [OPTIONS] [TARGETS]... > semgrep.log 2>&1`.
:::

## Memory usage issues (OOM errors)

Memory usage is a common issue with scans, especially in memory-constrained environments such as continuous integration (CI) providers. 

See [Semgrep exited with code -11 (or -9)](/docs/troubleshooting/semgrep/#semgrep-exited-with-code--11-or--9) for further troubleshooting.

## Slow scans

If you suspect the presence of a large file slowing Semgrep's analysis, decrease the maximum size of files scanned with `--max-target-bytes BYTES`. The default is 1000000 bytes (~1 MB).

Review [I just want Semgrep to run faster](/docs/troubleshooting/semgrep/#i-just-want-semgrep-to-run-faster) for additional guidance on speeding up scans.

## 401 error when scanning with Semgrep Registry rules

If you receive a 401 when scanning using registry rules (for example, with `--config auto`), try the following:

1. Run `semgrep logout`.
2. Attempt the scan again.

If this is successful, your stored local token was invalid. Use `semgrep login` to log in again and receive a fresh token.

## Scan failures with analysis errors

Analysis or parsing errors usually only affect a particular rule, file, or language. If your scan encounters an analysis issue, using verbose logging can provide you with helpful error details, such as `metavariable-pattern failed because we lack range info for $X, please file a bug report`. 

If the error you receive is not that specific, try one of these options:

1. Use `--exclude-rule` to exclude a rule from the scan. This allows isolating the problem to the particular rule.
2. Use `--exclude` to exclude a file or files from the scan. You can use wildcards in file exclusions to exclude files matching particular patterns.
3. Use `--lang` to limit the scan to a particular language, to determine if the issue is connected to rules or files for a given language.

Once you have isolated the issue:

1. Identify the file and lines (if available) where Semgrep encountered the error.
2. Determine whether you can share a minimal example of the code or rule that is causing the issue.
  * If the issue occurs with Semgrep Pro Engine, or the code is internal or sensitive and cannot be sufficiently redacted, [reach out for help](/docs/support), and include what you've determined so far.
  * Otherwise, share the issue details and related code with Semgrep via https://github.com/returntocorp/semgrep/issues.
