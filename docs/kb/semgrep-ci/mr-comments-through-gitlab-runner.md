---
append_help_link: true
title: Receive Semgrep MR comments through a GitLab runner
hide_title: true
description: tk
tags:
  - Semgrep in CI
---

# Receive Semgrep MR comments through a GitLab runner

Generally, Semgrep recommends using the [<i class="fas fa-external-link fa-xs"></i> GitLab merge request pipeline](https://docs.gitlab.com/ee/ci/pipelines/merge_request_pipelines.html) to receive MR comments. This method is used in the default [Semgrep GitLab config file](/semgrep-ci/sample-ci-configs/#sample-github-actions-configuration-file).

However, you can also receive comments through your own [<i class="fas fa-external-link fa-xs"></i> GitLab runner](https://docs.gitlab.com/runner/) by setting the following variables in your CI job:

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

Replace magenta-colored placeholders in the preceding code snippet with your specific values (for example <code><span className="placeholder">USERNAME</span></code>).

For more information on all of these variables see GitLab documentation [Predefined variables reference](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html).

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
