---
slug: configuration-reference
description: "Reference for running Semgrep CI in your CI job or on the command line. Learn how to select rules to scan with, enable diff-aware scanning, connect to Semgrep App, and more."
---

import MoreHelp from "/src/components/MoreHelp"
import BlockFindingsErrorsConfigs from '/src/components/modules/reference-modules/_block-findings-errors-configs.mdx'

# Continuous Integration (CI) configuration reference

Configure Semgrep CI by passing various environment variables in your Continuous Integration (CI) jobs.

:::info
While environment variables are the preferred way to configure Semgrep CI, pass any of these options as command-line options. Refer to the output of `semgrep ci --help` to find the corresponding flags.
:::

## Selecting rules to scan with (`SEMGREP_RULES`)

```sh
SEMGREP_RULES="p/security-audit p/secrets"
```

## Configuring blocking findings and errors

This section documents how Semgrep in CI pipelines handles blocking findings and errors in its default setup. This section also provides three configuration options you can use to change or revert to the default behavior.

### Default configuration of blocking findings and error suppression

Semgrep blocks the pull requests (PRs) or merge requests (MRs) in its default configuration only when it matches a blocking finding. 

Blocking findings can be defined as:

- Findings defined in [Rule Board](https://semgrep.dev/orgs/-/board) of Semgrep App. Avoid blocking findings by removing rules from the **Block** column of the [Rule Board](https://semgrep.dev/orgs/-/board).
- If you do **not** use Semgrep App with Semgrep in CI (stand-alone setup), blocking findings encompass all Semgrep findings. Any finding in this setup blocks your PRs or MRs.

By default, Semgrep does not block your pipeline when it encounters an internal error. Semgrep suppresses all errors and does not surface them to the CI provider. In case of an internal error, Semgrep sends an anonymous crash report to a crash-reporting server and does not block your CI pipeline. To change the default configuration, see the sections below.

### Configuration options for blocking findings and errors

Configure, change or revert to the default setup of blocking findings and errors in your CI pipeline using the following options in CI configuration file:

| CI option                                      | Description                         |
|------------------------------------------------|-------------------------------------|
| `semgrep ci` or `semgrep ci --suppress-errors` | Default: CI **fails** on blocking findings, CI **passes** on internal errors.  |
| `semgrep ci --no-suppress-errors`              | CI **fails** on blocking findings, CI **fails** on internal errors.            |
| <code>semgrep ci &vert;&vert; true</code>      | CI **passes** on blocking findings, CI **passes** on internal errors.          |
 
To change this configuration, insert one of the configuration options (flags) after the following keys in in CI YAML configuration file of Semgrep:
- On GitHub, insert the flag after the `run` key (for example, `run: semgrep ci --suppress-errors` to state the default option).
- On GitLab, insert the flag after the `script` key (for example, `script: semgrep ci --suppress-errors` to state the default option).
- Insert these flags in an equivalent key in configuration files of other CI providers.
 
See the [Examples of blocking findings and errors configuration](#examples-of-blocking-findings-and-errors-configuration) below.
 
:::info
- For more information about specific Semgrep exit codes, see [CLI reference](../../cli-reference/#exit-codes).
- This functionality replaces the audit mode `SEMGREP_AUDIT_ON` (collecting findings silently for [Semgrep App > Findings](https://semgrep.dev/manage/findings)).
:::

To find more details about some of these configuration options, see the following list:

- `semgrep ci` - The default state. Semgrep in CI **fails** on blocking findings, CI **passes** on internal errors. If Semgrep encounters an internal error, it sends an anonymous crash report to a crash-reporting server and exits with exit code `0` (success). Consequently, Semgrep in CI does not report other statuses than `0` or `1` by default (success or a blocking finding). Optional: Define this setting explicitly using the `--suppress-errors` flag.
- `semgrep ci --no-suppress-errors` - Semgrep in CI **fails** on blocking findings, CI **fails** on internal errors. If you use this flag, all exit codes, including internal errors, surface to the CI provider.
- `semgrep ci || true` - Semgrep in CI **passes** on blocking findings, CI **passes** on internal errors.

### Examples of blocking findings and errors configuration

<BlockFindingsErrorsConfigs />

## Diff-aware scanning (`SEMGREP_BASELINE_REF`)

There are two ways to run a semgrep scan:

<dl>
    <dt>Full scan</dt>
    <dd>A full scan will scan your entire codebase and report every finding in the codebase. It is recommended to perform a full scan of your <code>main</code> branch at a regular cadence, such as every night or every week, depending on your own needs. This ensures that Semgrep App has a full list of all findings in your code base, regardless of when they were introduced. To run a full scan, simply run <code>semgrep ci</code> without setting <code>SEMGREP_BASELINE_REF</code> environment variable.</dd>
    <dt>Diff-aware scan</dt>
    <dd>A diff-aware scan runs on your code before and after some "baseline" and only reports findings that are newly introduced in the commits after that baseline. For example, imagine you have a repository with 10 commits and you set commit number 8 as the baseline. Consequently, Semgrep only returns scan results introduced by changes in commits 9 and 10. This is how <code>semgrep ci</code> should be run in pull requests and merge requests, since it will report only the findings that are created by those code changes. To run a diff-aware scan, use <code>SEMGREP_BASELINE_REF=<span class="placeholder">REF</span> semgrep ci</code> where <span class="placeholder">REF</span> can be a commit hash, branch name, or other git ref.</dd>
</dl>

:::note
* Do not perform diff-aware scans on your `main` branch. The Semgrep App keeps track of which findings have been fixed on a given branch. If you configure diff scans on your main branch, and compare the last commit to the penultimate commit, Semgrep wrongly considers all findings from before the penultimate commit to be fixed.
* Do not perform full scans on non-mainline or non-trunk branches. Performing full scans on every branch will slow down your CI jobs, show developers findings they didn't introduce, and result in many duplicated findings in the Semgrep App, resulting in poorer experience there as well.
:::
 
### Examples of `SEMGREP_BASELINE_REF`

To only report findings newly added
since branching off from your `main` branch, set the following:
<pre class="language-bash"><code>SEMGREP_BASELINE_REF=<span className="placeholder">main</span></code></pre>

To only report findings newly added
after a specific commit, set the following:
<pre class="language-bash"><code>SEMGREP_BASELINE_REF=<span className="placeholder">INSERT_GIT_COMMIT_HASH</span></code></pre>

## Semgrep App token

You can configure which rules to run also with Semgrep App.
Get your token from [Semgrep App > Settings](https://semgrep.dev/manage/settings).

<pre class="language-bash"><code>SEMGREP_APP_TOKEN=<span className="placeholder">TOKEN_VALUE</span></code></pre>

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

## Configure a job timeout (`SEMGREP_TIMEOUT`)

To change the job timeout from the default of 1800 seconds. Set to 0 to disable job timeout.

```sh
SEMGREP_TIMEOUT="300"
```

## Enabling GitLab MR comments (non-standard CI configuration)

The configuration provided in this section is not needed for a standard Semgrep in CI setup. Use this configuration only when you are using GitLab runners to provide MR comments while you are not using GitLab MR job. In the code snippet below, magenta-colored values are placeholders that you can substitute. Set up the following environment variables within your command line to allow Semgrep to create MR comments in GitLab:

<pre class="language-bash"><code>
export GITLAB_CI='true'<br/>
export CI_PROJECT_PATH='<span className="placeholder">USERNAME</span>/<span className="placeholder">PROJECTNAME</span>'<br/>
export CI_MERGE_REQUEST_PROJECT_URL='https://gitlab.com/<span className="placeholder">USERNAME</span>/<span className="placeholder">PROJECTNAME</span>'<br/>
export CI_PROJECT_URL="$CI_MERGE_REQUEST_PROJECT_URL"<br/>
export CI_COMMIT_SHA='<span className="placeholder">COMMIT-SHA-VALUE</span>'<br/>
export CI_COMMIT_REF_NAME='<span className="placeholder">REF</span>'<br/>
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME='<span className="placeholder">BRANCH_NAME</span>'<br/>
export CI_JOB_URL='<span className="placeholder">JOB_URL</span>'<br/>
export CI_PIPELINE_SOURCE='merge_request_event'<br/>
export CI_MERGE_REQUEST_IID='<span className="placeholder">REQUEST_IID</span>'<br/>
export CI_MERGE_REQUEST_DIFF_BASE_SHA='<span className="placeholder">SHA</span>'<br/>
export CI_MERGE_REQUEST_TITLE='<span className="placeholder">MERGE_REQUEST_TITLE</span>'<br/>
</code></pre>

Replace magenta-colored placeholders in the code snippet above with your specific values (for example <code><span className="placeholder">USERNAME</span></code>). For more information on all of these variables see GitLab documentation [Predefined variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html). You can find an exhaustive example with sample values in [List all environment variables](https://docs.gitlab.com/ee/ci/variables/index.html#list-all-environment-variables).

Example with sample values:
```sh
export GITLAB_CI='true'
export CI_PROJECT_PATH="gitlab-org/gitlab-foss"
export CI_MERGE_REQUEST_PROJECT_URL="https://example.com/gitlab-org/gitlab-foss"
export CI_PROJECT_URL="$CI_MERGE_REQUEST_PROJECT_URL"
export CI_COMMIT_SHA="1ecfd275763eff1d6b4844ea3168962458c9f27a"
export CI_COMMIT_REF_NAME="main"
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME="main"
export CI_JOB_URL="https://gitlab.com/gitlab-examples/ci-debug-trace/-/jobs/379424655"
export CI_PIPELINE_SOURCE='merge_request_event'
export CI_MERGE_REQUEST_IID="1"
export CI_MERGE_REQUEST_DIFF_BASE_SHA="1ecfd275763eff1d6b4844ea6874447h694gh23d"
export CI_MERGE_REQUEST_TITLE="Testing branches"
```

<MoreHelp />
