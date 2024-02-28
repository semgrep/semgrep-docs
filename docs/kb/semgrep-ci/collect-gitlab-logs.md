---
description: Collect logs from GitLab to troubleshoot Semgrep CI scans.
tags:
  - GitLab
  - Semgrep in CI
---

# Context

When executing a GitLab job that collects `verbose` or `debug` level Semgrep logs, you may see the following error message:

```console
Job's log exceeded limit of 4194304 bytes.
Job execution will continue but no more output will be collected.
```

## Solution: Save the log as an artifact

You can bypass GitLab's log limits [using `artifacts` to create a job
artifact](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html). To do so,
define the `.gitlab-ci.yml` as follows:

```yml
semgrep:
  image: semgrep/semgrep
  script:
    - semgrep ci --debug > semgrep.log 2>&1
  rules:
    - if: $CI_MERGE_REQUEST_IID
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  variables:
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
  artifacts:
    paths:
      - semgrep.log
```

You can [download the full log](https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html#download-job-artifacts) from the artifacts option in the job.