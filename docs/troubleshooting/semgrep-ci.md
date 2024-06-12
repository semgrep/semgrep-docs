---
slug: semgrep-ci
description: >-
  Get more information when Semgrep in CI hangs, crashes, times out, or runs too slow.
  Fix issues with GitLab SAST's Semgrep analyzer, such as jobs running slowly,
  not showing results, or returning errors.
title: Troubleshooting Semgrep in CI
hide_title: true
append_help_link: true
tags:
    - Deployment
---

import RetrieveGhaLogs from "/src/components/procedure/_retrieve-gha-logs.mdx"

# Troubleshooting Semgrep issues in CI

This document outlines troubleshooting steps for issues related to **Semgrep scans** in a CI environment. Refer to the following sections if you're seeing results reported on files that have not changed since the last scan, frequent timeouts, or other issues.

For issues on **deployment or CI configuration**, such as adding repositories, see the knowledge base articles in [<i class="fa-regular fa-file-lines"></i> Semgrep in CI](/kb/semgrep-ci).

## Reproducing the issue locally

To aid in debugging, you can reproduce some aspects of your Semgrep CI job locally. This enables you to inspect the logs and behavior through your terminal rather than in your CI provider's interface. Perform the following steps:

1. Run the following command in your terminal:
    ```
    semgrep login
    ```
1. After logging in, return to the CLI and run the following code: <pre class="language-bash"><code>SEMGREP_REPO_NAME=<span className="placeholder">your-organization</span>/<span className="placeholder">repository-name</span> semgrep ci</code></pre>
  For example, given a GitHub repository is `vulncorp/juice-shop`, the full command would be:
  ```
  SEMGREP_REPO_NAME=vulncorp/juice-shop semgrep ci
  ```
  When running `semgrep ci`, Semgrep fetches rules and any other configurations specific to your CI environment. Setting `SEMGREP_REPO_NAME` is optional, but ensures that: <br />
    - Results are sent to the same project (repository) in Semgrep AppSec Platform.
    - Any project-specific configurations, such as file ignores, are also respected.

## Troubleshooting GitHub

The first piece of information that the team at Semgrep uses are the **GitHub Actions logs**.

<RetrieveGhaLogs />

<!-- Commenting out this but keeping it in the docs because of the package-logs and semgrep ci --verbose steps
```yaml
name: Semgrep
on:
  workflow_dispatch: {}
  pull_request: {}
  push:
    branches:
      - main
      - master
    paths:
      - .github/workflows/semgrep.yml
  schedule:
    # random HH:MM to avoid a load spike on GitHub Actions at 00:00
    - cron: '57 2 * * *'
jobs:
  semgrep:
    name: semgrep/ci
    runs-on: ubuntu-20.04
    env:
      SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
    container:
      image: semgrep/semgrep
    if: (github.actor != 'dependabot[bot]')
    steps:
      - uses: actions/checkout@v3
      # Use this command for the verbose level of debugging.
      - run: semgrep ci --verbose &> semgrep.log
      # Use this command for the Semgrep's highest logging level, --debug.
      # This command may take longer to run.
      # - run: semgrep ci --debug &> semgrep.log
      - name: package-logs
        if: always()
        run: tar czf logs.tgz semgrep.log
      - name: upload-logs
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: logs.tgz
          path: logs.tgz
          retention-days: 1
```
-->

## Troubleshooting GitLab SAST

GitLab SAST includes and maintains a Semgrep integration called [`semgrep-sast`](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep) for vulnerability finding.

:::tip
Please visit [GitLab’s SAST troubleshooting guide](https://docs.gitlab.com/ee/user/application_security/sast/#troubleshooting) for help with general GitLab SAST issues.
:::

### The `semgrep-sast` CI job is slow

The `semgrep-sast` job should take less than a minute to scan a large project with 50k lines of Python and TypeScript code. If you see worse performance, please [reach out](/support) to the Semgrep maintainers for help with tracking down the cause. Long runtimes are typically caused by just one rule or source code file taking too long. You can also try these solutions:

#### Solution #1: Review global CI job configuration

You might be creating large files or directories in your GitLab CI config's `before_script:`, `cache:`, or similar sections. The `semgrep-sast` job scans all files available to it, not just the source code committed to Git, so if for example you have a cache configuration of

```yaml
cache:
  paths:
  - node_modules/
```

you should prevent those files from being scanned by [disabling caching](https://docs.gitlab.com/ee/ci/caching/#disable-cache-on-specific-jobs) for the `semgrep-sast` job like this:

```yaml
semgrep-sast:
  cache: {}
```

#### Solution #2: Exclude large paths

If you know which large files might be taking too long to scan, you can use [GitLab SAST's path exclusion feature](https://docs.gitlab.com/ee/user/application_security/sast/#vulnerability-filters) to skip files or directories matching given patterns.

- `SAST_EXCLUDED_PATHS: "*.py"` will ignore the paths at:
  `foo.py`, `src/foo.py`, `foo.py/bar.sh`.
- `SAST_EXCLUDED_PATHS: "tests"` will ignore
  `tests/foo.py` as well as `a/b/tests/c/foo.py`.

You can use a comma separated list to ignore multiple patterns: `SAST_EXCLUDED_PATHS: "*.py, tests"` will ignore all of the preceding paths.

### `semgrep-sast` reports false positives or false negatives

If you're not getting results where you should, or you get too many results, the problem might be with the patterns Semgrep scans for. Semgrep search patterns look just like the source code they're meant to find, so they are easy to learn and update.

You can review the search patterns in the [rules directory of the `semgrep-sast` analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep/-/tree/main/rules) and report issues to the GitLab team. Refer to the [Semgrep rule writing tutorial](https://semgrep.dev/learn) to help better understand these rule files. You can also refer to the [Semgrep Registry](https://semgrep.dev/explore) which is a collection of 2,000+ Semgrep rules curated by Semgrep, Inc.

### `semgrep-sast` crashes, fails, or is otherwise broken

Semgrep prints an error message to explain what went wrong upon crashes, and often also what to do to fix it.

The output of Semgrep is hidden by default, but [GitLab provides a way](https://docs.gitlab.com/ee/user/application_security/sast/#sast-debug-logging) to see it by setting an environment variable:

```yaml
variables:
  SECURE_LOG_LEVEL: "debug"
```

<!--

### Help us to guide Semgrep development

Semgrep is made by a small team, and you can directly guide our work by answering just one question below or on [the form page](https://form.typeform.com/to/AYAyJ4Fr).

 <div class="typeform-widget" data-url="https://form.typeform.com/to/AYAyJ4Fr?typeform-medium=embed-snippet" data-transparency="100" data-hide-headers="true" data-hide-footer="true" style="width: 100%; height: 670px; border: 2px solid #eee; margin-bottom: 40px;"></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script>
-->

### How to get help

If you’re a GitLab customer and suspect there’s an issue with GitLab, please [contact GitLab support](https://about.gitlab.com/support/) and open a support ticket. Users of GitLab’s free plans should open a thread in the [GitLab Community Forum](https://forum.gitlab.com/).
