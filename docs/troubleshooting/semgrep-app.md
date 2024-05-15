---
slug: semgrep-app
description: "Not seeing what you expect in Semgrep AppSec Platform? Follow these troubleshooting steps or find out how to get one-on-one help."
title: Troubleshooting
hide_title: true
tags:
    - Semgrep AppSec Platform
    - Team & Enterprise Tier

---



<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>


# Troubleshooting Semgrep AppSec Platform

## If a project reports the last scan 'never started'

This status means that your CI job never authenticated to Semgrep AppSec Platform.

Check your CI provider (such as GitHub Actions) for the latest Semgrep job execution.

### …and you can’t find a Semgrep CI job

The issue is likely with the CI configuration.

- Make sure that the branch you committed a CI job to is included in the list of branches the job is triggered on.
- Make sure that the CI configuration file has valid syntax. Most providers have a tool for checking the syntax of configuration files.

### …and a Semgrep CI job exists

Check the log output for any hints about what the issue is.

- If the logs mention a missing token or an authentication failure, you can get a new token from the [Settings page of Semgrep AppSec Platform](https://semgrep.dev/manage/settings), and set it as `SEMGREP_APP_TOKEN` in your CI provider's secret management UI.
- Alternatively, if this is the first scan after adding a new GitHub repository, and the repository is a fork, check your Actions tab to see if workflows are enabled:

![Screenshot of GitHub's Actions tab with workflows disabled](/img/github-workflows-disabled.png)<br />

* Enable workflows to allow Semgrep to scan.

## If a project reports the last scan 'never finished'

This status means that your CI jobs start and authenticate correctly, but fail before completion.

Check your CI provider (such as GitHub Actions) for the log output of the latest Semgrep job execution. In most cases you will see an error message with detailed instructions on what to do.

### …and the job is aborted due to taking too long

Many CI providers have a time limit for how long a job can run. Semgrep CI also aborts itself if it runs for too long. If your CI scans regularly take too long and fail to complete:

<!-- TODO: explain self-serve benchmarking -->

- Please [reach out](/support) to the Semgrep maintainers for help with tracking down the cause. Semgrep scans most large projects with hundreds of rules within a few minutes, and long run times are typically caused by just one rule or source code file taking too long.
- To drastically cut run times, you can use Semgrep's diff-aware scanning to skip scanning unchanged files. For more details, see [Semgrep's behavior](/deployment/customize-ci-jobs).
- You can skip scanning large and complex source code files (such as minified JS or generated code) if you know their path by adding a `.semgrepignore` file. See [how to ignore files & directories in Semgrep CI](/ignore-oss).
- You can increase Semgrep's own run time limit by setting a `semgrep ci --timeout <seconds>` flag, or by setting a `SEMGREP_TIMEOUT=<seconds>` environment variable. To fully disable the time limit, set this value to `0`.

## If you're unable to comment on Semgrep Registry pages

Our comments are powered by an external service called [utteranc.es](https://utteranc.es/).
If you aren't able to authenticate to leave comments,
please make sure you don't have an ad blocker interrupting requests to their domain.
