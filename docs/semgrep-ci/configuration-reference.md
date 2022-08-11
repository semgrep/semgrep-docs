---
slug: configuration-reference
description: "Reference for running Semgrep CI in your CI job or on the command line. Learn how to select rules to scan with, enable diff-aware scanning, connect to Semgrep App, and more."
---

import MoreHelp from "/src/components/MoreHelp"
import BlockFindingsErrorsConfigs from '/src/components/modules/reference-modules/_block-findings-errors-configs.mdx'

# Continuous Integration (CI) configuration reference

This section documents how Semgrep blocks your CI pipeline in the default setup and which configuration options you can use to change blocking behavior.

:::info
While environment variables are the preferred way to configure Semgrep CI, pass any of these options as command-line options. Refer to the output of `semgrep ci --help` to find the corresponding flags.
:::

## Select rules to scan with (`SEMGREP_RULES`)

```sh
SEMGREP_RULES="p/security-audit p/secrets"
```

## Configuring blocking findings and errors

This section documents how Semgrep can block your CI pipeline in the default setup and which configuration options you may use to change blocking behavior.

### Default configuration of blocking findings and error suppression

In the default setup, Semgrep blocks the pull requests (PRs) or merge requests (MRs) only when it matches a blocking finding. 

Blocking findings are the following:

- Findings defined in [Rule Board](https://semgrep.dev/orgs/-/board) of Semgrep App. Avoid blocking findings, by removing rules from the **Block** column of the [Rule Board](https://semgrep.dev/orgs/-/board).
- If you do **not** use Semgrep App with Semgrep in CI (**stand-alone** setup), blocking findings encompass **all** Semgrep findings. Any finding in this setup blocks your PRs or MRs.

When Semgrep encounters an internal error, it does not block your pipeline because errors are by default suppressed and not surfaced to the CI provider. In case of an internal error, Semgrep sends an anonymous crash report to a crash-reporting server and does not block your CI pipeline. This configuration can be changed.

### Configuration options for blocking findings and errors

Configure, change or revert to the default setup of blocking findings and errors in your CI pipeline using the following options in your YAML configuration file:

- `semgrep ci` - The default state. Semgrep in CI **fails** on blocking findings, CI **passes** on internal errors. If Semgrep encounters an internal error, it sends an anonymous crash report to a crash-reporting server and exits with exit code `0` (success). Consequently, Semgrep in CI does not report other statuses than `0` or `1` by default (success or a blocking finding). Optional: Define this setting explicitly using the `--suppress-errors` flag (see examples below).
- `semgrep ci --no-suppress-errors` - Semgrep in CI **fails** on blocking findings, CI **fails** on internal errors. If you use this flag, all exit codes, including internal errors, surface to the CI provider.
- `semgrep ci || true` - Semgrep in CI **passes** on blocking findings, CI **passes** on internal errors.

See the following table that summarizes these configuration options:
 
| CI option                                 | Description                         |
|-------------------------------------------|-------------------------------------|
| `semgrep ci`                              | Default: CI **fails** on blocking findings, CI **passes** on internal errors.  |
| `semgrep ci --no-suppress-errors`         | CI **fails** on blocking findings, CI **fails** on internal errors.            |
| <code>semgrep ci &vert;&vert; true</code> | CI **passes** on blocking findings, CI **passes** on internal errors.          |
 
To change this configuration, insert one of the configuration options after the following keys in Semgrep in CI YAML configuration files:
- On GitHub, use one of the options after the `run` key (for example, `run: semgrep ci --suppress-errors` to state the default option).
- On GitLab, use one of the options after the `script` key (for example, `script: semgrep ci --suppress-errors` to state the default option).
- Insert these options in an equivalent key in configuration files of other CI providers.
 
See the [Examples of blocking findings and errors configuration](#examples-of-blocking-findings-and-errors-configuration) below.
 
:::info
- For more information about specific Semgrep exit codes, see [CLI reference](../../cli-reference/#exit-codes).
- This functionality replaces the audit mode `SEMGREP_AUDIT_ON` (collecting findings silently for [Semgrep App > Findings](https://semgrep.dev/manage/findings)).
:::
 
### Examples of blocking findings and errors configuration

<BlockFindingsErrorsConfigs />

## Diff-aware scanning (`SEMGREP_BASELINE_REF`)

For [diff-aware scans](overview.md#features), this option filters scan results to those introduced after the git commit, in a branch, or tag. For example, you have a repository with 10 commits. You set the commit number 8 as the baseline. Consequently, Semgrep only returns scan results introduced by changes in commits 9 and 10.

:::note
It is recommended to perform baseline scans on other branches than your `main` branch. The Semgrep App keeps track of which findings have been fixed on a given branch. If you configure baseline scans on your main branch, and compare the last commit to the penultimate commit, Semgrep wrongly considers all findings as fixed. In this case, Semgrep only reports findings that appear in the last commit.
:::
 
### Examples of `SEMGREP_BASELINE_REF`

To only report findings newly added
since branching off from your `main` branch, set the following:
<pre class="language-bash"><code>SEMGREP_BASELINE_REF=<span className="placeholder">TOPIC-BRANCH-NAME</span></code></pre>

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
