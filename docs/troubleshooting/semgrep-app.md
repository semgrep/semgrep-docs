---
slug: semgrep-app
description: "Not seeing what you expect in Semgrep AppSec Platform? Follow these troubleshooting steps or find out how to get one-on-one help."
title: Troubleshooting
hide_title: true
tags:
    - Semgrep AppSec Platform
---

# Troubleshooting Semgrep AppSec Platform

## If a project reports the last scan "Never started"

This status means that your CI job never authenticated to Semgrep AppSec Platform.

Check your CI provider (such as GitHub Actions) for the latest Semgrep job execution.

### If you can’t find a Semgrep CI job

The issue is likely with the CI configuration.

- Make sure that the branch you committed a CI job to is included in the list of branches the job is triggered on.
- Make sure that the CI configuration file has valid syntax. Most providers have a tool for checking the syntax of configuration files.

### If a Semgrep CI job exists

Check the log output for any hints about what the issue is.

- If the logs mention a missing token or an authentication failure, you can get a new token from the [Settings page of Semgrep AppSec Platform](https://semgrep.dev/manage/settings), and set it as `SEMGREP_APP_TOKEN` in your CI provider's secret management UI.
- Alternatively, if this is the first scan after adding a new GitHub repository, and the repository is a fork, check your Actions tab to see if workflows are enabled:
  ![Screenshot of GitHub's Actions tab with workflows disabled](/img/github-workflows-disabled.png#bordered)
  - Enable workflows by clicking **I understand my workflows, go ahead and enable them** to allow Semgrep to scan.

## If a project reports the last scan 'Never finished'

This status means that your CI jobs start and authenticate correctly, but fail before completion.

Check your CI provider (such as GitHub Actions) for the log output of the latest Semgrep job execution. In most cases you will see an error message with detailed instructions on what to do.

### If the job is aborted due to taking too long

Many CI providers have a time limit for how long a job can run. Semgrep CI also aborts itself if it runs for too long. If your CI scans regularly take too long and fail to complete:

- Please [reach out](/support) to the Semgrep team for help with tracking down the cause. Semgrep scans most large projects with hundreds of rules within a few minutes, and long run times are typically caused by just one rule or source code file taking too long.
- To drastically cut run times, you can use Semgrep's diff-aware scanning to skip scanning unchanged files. For more details, see [Semgrep's behavior](/deployment/customize-ci-jobs).
- You can skip scanning large and complex source code files (such as minified JS or generated code) if you know their path by adding a `.semgrepignore` file. See [how to ignore files & directories in Semgrep CI](/ignoring-files-folders-code).
- You can increase Semgrep's own run time limit by setting a `semgrep ci --timeout <seconds>` flag, or by setting a `SEMGREP_TIMEOUT=<seconds>` environment variable. To fully disable the time limit, set this value to `0`.
