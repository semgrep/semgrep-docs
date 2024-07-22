---
slug: semgrep
description: "Get more information when Semgrep hangs, crashes, times out, or runs very slowly."
title: Troubleshooting the CLI
hide_title: true
append_help_link: true
tags:
  - Troubleshooting
  - CLI
---

# Troubleshooting Semgrep CLI

## Semgrep exited with code -11 (or -9)

This can happen when Semgrep crashes, usually as a result of memory exhaustion. `-11` and `-9` are the POSIX signals raised to cause the crash.

Review troubleshooting steps for memory exhaustion at [Semgrep scan troubleshooting: Memory usage issues](/docs/kb/semgrep-code/semgrep-scan-troubleshooting/#memory-usage-issues-oom-errors).

## Semgrep is too slow

Semgrep records runtimes for each file and rule. This information is displayed when you include the `--time` flag when running Semgrep. How you choose to interact with the `--time` output depends on your goals.

### I want Semgrep to run faster

Review troubleshooting steps for slow scans at [Semgrep scan troubleshooting: Slow scans](/docs/kb/semgrep-code/semgrep-scan-troubleshooting/#slow-scans).

### I am a contributor who wants to improve Semgrep's engine

Thank you! Check out the [Contributing docs](/docs/contributing/contributing) to get started.

The section [Exploring results from a slow run of Semgrep](/docs/contributing/semgrep-core-contributing/#exploring-results-from-a-slow-run-of-semgrep) is helpful if you haven't previously investigated Semgrep performance.
