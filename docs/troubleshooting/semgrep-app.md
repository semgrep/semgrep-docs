# Troubleshooting Semgrep App

[TOC]

# If a project reports the last scan 'never started'

This status means that your CI job never authenticated to Semgrep App.

Check your CI provider (such as GitHub Actions) for the latest Semgrep job execution.

## …and you can’t find a Semgrep CI job

The issue is likely with the CI configuration.

- Make sure that the branch you committed a CI job to
  is included in the list of branches the job is triggered on.
- Make sure that the CI configuration file has valid syntax.
  Most providers have a tool for checking the syntax of configuration files.

## …and a Semgrep CI job exists

Check the log output for any hints about what the issue is.

- If the logs mention a missing token or an authentication failure,
  you can get a new token from the
  [Settings page of Semgrep App](https://semgrep.dev/manage/settings),
  and set it as `SEMGREP_APP_TOKEN` in your CI provider's secret management UI.

# If a project reports the last scan 'never finished'

This status means that your CI jobs start and authenticate correctly, but fail before completion.

Check your CI provider (such as GitHub Actions) for the log output of the latest Semgrep job execution.
In most cases you will see an error message with detailed instructions on what to do.

## …and the job is aborted due to taking too long

Many CI providers have a time limit for how long a job can run.
Semgrep CI also aborts itself if it runs for too long.
If your CI scans regularly take too long and fail to complete:

<!-- TODO: explain self-serve benchmarking -->

- Please [reach out](../support.md) to the Semgrep maintainers for help with tracking down the cause.
  Semgrep scans most large projects with hundreds of rules within a few minutes,
  and long runtimes are typically caused by just one rule or source code file taking too long.
- To drastically cut run times,
  you can use Semgrep CI's diff-aware scanning to skip scanning unchanged files.
  For more details, see [Semgrep CI's behavior](../semgrep-ci.md#behavior).
- You can skip scanning large and complex source code files (such as minified JS or generated code)
  if you know their path by adding a `.semgrepignore` file.
  See [how to ignore files & directories in Semgrep CI](../semgrep-ci.md#ignoring-files-directories).
- You can increase Semgrep CI's own run time limit
  by setting a `semgrep-agent --timeout <seconds>` flag,
  or by setting a `SEMGREP_TIMEOUT=<seconds>` environment variable.
  To fully disable the time limit, set this value to `0`.

# How to get help

Please check the [Support](../support.md) page to get help from the Semgrep maintainers & community,
via Slack, GitHub, email, or phone.
