# CI configuration reference

Configure Semgrep CI by passing these environment variables in your CI job.

!!! note
    While environment variables are the preferred way to configure Semgrep CI,
    any of these options can be passed as command line options as well.
    Refer to the output of `semgrep-agent --help` to find the corresponding flags.

[TOC]

## Select rules to scan with (`SEMGREP_RULES`)

```sh
SEMGREP_RULES="p/security-audit p/secrets"
```

## Diff-aware scanning (`SEMGREP_BASELINE_REF`)

For [diff-aware scans](overview.md#features), set this variable
to the git ref (branch name, tag, or commit hash) to use as a baseline.
For example, to report findings newly added
since branching off from your `main` branch, set

```sh
SEMGREP_BASELINE_REF=main
```

## Connect to Semgrep App (`SEMGREP_APP_TOKEN`)

Instead of `SEMGREP_RULES`, you can use rules set in Semgrep App.
Get your credentials from [Semgrep App > Settings](https://semgrep.dev/manage/settings).

```
SEMGREP_APP_DEPLOYMENT_ID=0
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
