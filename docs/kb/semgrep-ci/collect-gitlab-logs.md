---
description: Collect verbose logs from GitLab to troubleshoot Semgrep CI scans.
tags:
  - GitLab
  - Semgrep in CI
---

# GitLab "Job's log exceeded limit" error

When executing a GitLab job that collects verbose (`-v`) or debug (`--debug`)
logs from Semgrep, you may see the following error message:

```console
Job's log exceeded limit of 4194304 bytes.
Job execution will continue but no more output will be collected.
```

GitLab normally limits CI job logs to around 4 MB in size, and verbose Semgrep logs can exceed this size limit, leading to the error.

## Solution: Save the log as an artifact

You can save larger log files [using `artifacts` to create a job artifact](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html) from the log file. 

To do that:

1. Update the `semgrep ci` command to redirect logs to a file: `semgrep ci --debug &> semgrep.log`.
2. Add the resulting log file to the `artifacts` section of the CI configuration.

Here is an example based on the [sample GitLab CI/CD configuration](/docs/semgrep-ci/sample-ci-configs/#sample-gitlab-cicd-configuration-snippet):

```yml
semgrep:
  image: semgrep/semgrep
  script:
    - semgrep ci --debug &> semgrep.log
  rules:
    - if: $CI_MERGE_REQUEST_IID
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  variables:
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
  artifacts:
    paths:
      - semgrep.log
```

You can [download the full log](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html#download-job-artifacts) from several locations, including the "Job artifacts" area in the job.
