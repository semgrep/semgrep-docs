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

Memory usage is a common issue with scans, especially in memory-constrained environments such as continuous integration (CI) providers. Semgrep may exit with code -11 (or -9), which are the POSIX signals raised to cause the crash.

* Try increasing the memory available if you are working in a container or managed instance where you can manage the amount of memory.
* Use the `--max-memory LIMIT` option for your Semgrep run. This option stops a rule/file scan if it reaches the set limit, and moves to the next rule / file.
* Run Semgrep in single-threaded mode with `--jobs 1`. This reduces the amount of memory used compared to running multiple jobs.
* Try increasing your stack limit, if a limit is set for the context where you invoke Semgrep (`ulimit -s [limit]`).

## Slow scans

The first step to improving Semgrep's speed is limiting its run to only the files you care about. You can do this by adding a `.semgrepignore` file. See [how to ignore files & directories in Semgrep CI](/ignoring-files-folders-code/).

After addressing files to ignore:

* If you suspect the presence of a large file slowing Semgrep's analysis, decrease the maximum size of files scanned with `--max-target-bytes BYTES`. The default is 1000000 bytes (~1 MB).
* Run Semgrep with the `--time` flag. This outputs a list of the rules and files that took the longest.
  * Identify the slowest files from the list. You may find that you can add some of those files to your ignore list as well.
  * Identify the slowest rules from the list. You may find that some of them don't apply to your codebase and can be skipped.

## 401 error when scanning with Semgrep Registry rules

If you receive a 401 when scanning using registry rules (for example, with `--config auto`), try the following:

1. Run `semgrep logout`.
2. Attempt the scan again.

If this is successful, your stored local token was invalid. Use `semgrep login` to log in again and receive a fresh token.

## Scan failures with analysis errors

Analysis or parsing errors usually only affect a particular rule, file, or language. If your scan encounters an analysis issue, using verbose logging can provide you with helpful error details, such as:

```
metavariable-pattern failed because we lack range info for $X, please file a bug report
```

If the error you receive is not that specific, try one of these options:

1. Use `--exclude-rule` to exclude a rule from the scan. This allows isolating the problem to the particular rule.
2. Use `--exclude` to exclude a file or files from the scan. You can use wildcards in file exclusions to exclude files matching particular patterns.
3. Use `--include` with a pattern specifying an extension for a particular language, to limit the scan to primarily files in that language.

## Reporting crashes or analysis errors

Once you have isolated the issue:

1. Identify the rule, file and lines (if available) where Semgrep encountered the error.
2. Determine whether you can share a minimal example of the code or rule that is causing the issue.
  * If the issue occurs with Semgrep Pro Engine, or the code is internal or sensitive and cannot be sufficiently redacted, [reach out for help](/docs/support), and include what you've determined so far.
  * Otherwise, share the issue details and related code with Semgrep via https://github.com/returntocorp/semgrep/issues.

If you are encountering memory usage issues, please include in your report:

* the total size of the files
* the number of files being scanned
* the maximum memory used by Semgrep (an estimate from `top` is fine)
* the system specifications
