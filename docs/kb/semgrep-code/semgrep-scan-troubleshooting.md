---
tags:
  - Semgrep Supply Chain
  - Semgrep Code
description: Troubleshoot common issues with Semgrep scans.
---

# A Semgrep scan is having a problem - what next?

If a Semgrep scan is failing or running slowly, try the following steps to investigate:

1. [Update Semgrep](/docs/update/) to the latest version, if you are not currently running the latest version. Some errors result from an older version of Semgrep being used with newer rules.
2. Re-run the scan with either the `-v`/`--verbose` or `--debug` (extremely verbose) flags. These options provide more information about what is failing.
3. If you are running Semgrep Pro Engine in the scan, remove any options starting with `--pro`, or run Semgrep with `--oss-only`. This allows isolation of any issues related to Semgrep Pro Engine, and often speeds up a scan or reduces memory usage.

:::info
Semgrep verbose or debug logs can be quite lengthy. To prevent flooding your terminal and preserve the logs for analysis, you can redirect all output to a file with `semgrep [OPTIONS] [TARGETS]... &> semgrep.log`. See also [How to collect logs when running Semgrep in CLI](/docs/kb/semgrep-code/collect-cli-logs).
:::

## Memory usage issues (OOM errors)

Memory usage is a common issue with scans, especially in memory-constrained environments such as continuous integration (CI) providers. Semgrep may exit with code -11 (or -9), which are the POSIX signals raised to cause the crash.

* Try increasing the memory available if you are working in a container or managed instance where you can manage the amount of memory.
* Use the `--max-memory LIMIT` option for your Semgrep run. This option stops a rule/file scan if it reaches the set limit, and moves to the next rule / file.
  - If you are running an interfile scan with the Pro Engine, this option also falls back to OSS if the interfile pre-processing stage exceeds this amount of memory.
* Run Semgrep in single-threaded mode with `--jobs 1`. This reduces the amount of memory used compared to running multiple jobs.
* Try increasing your stack limit, if a limit is set for the context where you invoke Semgrep (`ulimit -s [limit]`).

## Slow scans

The first step to improving Semgrep's speed is limiting its run to only the files you care about. Most commonly, it's limited using a `.semgrepignore` file. See [Ignoring files, folders, or parts of code](/ignoring-files-folders-code/).

After addressing files to ignore:

* If you suspect the presence of a large file slowing Semgrep's analysis, decrease the maximum size of files scanned with `--max-target-bytes BYTES`.
* Run Semgrep with the `--time` flag. This outputs a list of the rules and files that took the longest.
  * Identify the slowest files from the list. You may find that you can add some of those files to your ignore list as well.
  * Identify the slowest rules from the list. You may find that some of them don't apply to your codebase and can be skipped.

 ### Adjusting timeouts

 Semgrep also has several timeout settings that affect scan duration, and can be adjusted to optimize scan behavior:

 * `--timeout`: Similar to `--max-memory`, `--timeout` affects the behavior of the scan for a single rule-file combination. It defaults to 5 seconds. Typical values range from 3 seconds (favors faster scans, but more timeouts) to 30 seconds (slower scans, fewer timeouts). 
 * `--timeout-threshold`: The number of times to try to scan a single rule-file combination, if it times out due to the `--timeout` limit. It defaults to 3. Decreasing the value may speed up scans but cause more timeouts.
 * `--interfile-timeout`: If you are running an interfile scan with the Pro Engine, the maximum amount of time in seconds to spend on interfile analysis before falling back to OSS. Defaults to 3 hours (10800 seconds) for scans using `semgrep ci`. Otherwise the default is no limit (continue with Pro Engine until scan completes).

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
  * If you are running Semgrep in CI with Semgrep Cloud Platform, and don't need to run the rule, you can also [disable the rule](/docs/semgrep-code/policies/#disabling-rules).
2. Use `--exclude` to exclude a file or files from the scan. You can use wildcards in file exclusions to exclude files matching particular patterns.
3. Use `--include` with a pattern specifying a path or an extension for a particular language, to limit the scan to that path, or to files in that language.

## Reporting crashes or analysis errors

Once you have isolated the issue:

1. Identify the rule, file, and lines (if available) where Semgrep encountered the error.
2. Determine whether you can share a minimal example of the code or rule that is causing the issue.
  * If the issue occurs with Semgrep Pro Engine, or the code is internal or sensitive and cannot be sufficiently redacted, [reach out for help](/docs/support), and include what you've determined so far.
  * Otherwise, share the issue details and related code with Semgrep via https://github.com/semgrep/semgrep/issues.

If you are encountering memory usage issues, please include in your report:

* The total size of the files
* The number of files being scanned
* The maximum memory used by Semgrep (an estimate from `top` is fine)
* The system specifications
