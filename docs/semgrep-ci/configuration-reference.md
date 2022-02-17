---
slug: configuration-reference
description: "Reference for running Semgrep CI in your CI job or on the command line using semgrep-agent. Learn how to select rules to scan with, enable diff-aware scanning, connect to Semgrep App, and more."
---

import MoreHelp from "/src/components/MoreHelp"

# CI configuration reference

Configure Semgrep CI by passing these environment variables in your CI job.

:::info
While environment variables are the preferred way to configure Semgrep CI, any of these options can be passed as command-line options. Refer to the output of `semgrep-agent --help` to find the corresponding flags.
:::


## Select rules to scan with (`SEMGREP_RULES`)

```sh
SEMGREP_RULES="p/security-audit p/secrets"
```

## Diff-aware scanning (`SEMGREP_BASELINE_REF`)

For [diff-aware scans](overview.md#features), set this variable to compare to a baseline. This option limits scan results to those introduced after the git commit, in a branch, or tag. For example, you have a repository with 10 commits. You set the commit number 8 as the baseline. Consequently, Semgrep only returns scan results introduced by changes in commits 9 and 10.

NOTE: It is recommended to perform baseline scans on branches other than your `main` branch. The Semgrep App keeps track of which findings have been fixed on a given branch. If you configure baseline scans on your main branch comparing the latest main commit to the penultimate commit, Semgrep mistakenly considers all findings except those added in the latest commit as fixed.
 
### Examples of `SEMGREP_BASELINE_REF`

To only report findings newly added
since branching off from your `main` branch, set the following:
```sh
SEMGREP_BASELINE_REF=$(git merge-base main HEAD)
```

To only report findings newly added
after a specific commit, set the following:
<pre class="language-bash"><code>SEMGREP_BASELINE_REF=<span class="token-line" style="color: blue;"><i>GIT_COMMIT_HASH</i></span>
</code></pre>

## Connect to Semgrep App (`SEMGREP_APP_TOKEN`)

Instead of `SEMGREP_RULES`, configure which rules to run with Semgrep App.
Get your token from [Semgrep App > Settings](https://semgrep.dev/manage/settings).

```
SEMGREP_APP_TOKEN=secret
```

## Get hyperlinks in Semgrep App

Set these variables to hyperlink to the correct repositories, files, and PRs
in the Semgrep App UI & notifications.

```sh
SEMGREP_REPO_URL="https://github.com/foo/bar"
SEMGREP_BRANCH="feature/add-new-bugs"
SEMGREP_JOB_URL="https://ci-server.com/jobs/1234"
SEMGREP_REPO_NAME="foo/bar"
SEMGREP_COMMIT="a52bc1ef"
SEMGREP_PR_ID="44"
```

## Collect findings silently (`SEMGREP_AUDIT_ON`)

Set this to never fail the build due to findings when scanning.
Instead, just collect findings for [Semgrep App > Findings](https://semgrep.dev/manage/findings).

```
SEMGREP_AUDIT_ON="unknown"
```

## Configure a job timeout (`SEMGREP_TIMEOUT`)

To change the job timeout from the default of 1800 seconds. Set to 0 to disable job timeout.

```sh
SEMGREP_TIMEOUT="300"
```

<MoreHelp />
