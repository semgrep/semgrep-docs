---
description: Collect logs from GitLab to troubleshoot Semgrep CI scans.
tags:
  - GitLab
  - Semgrep in CI
---

# Context

When executing a GitLab job that collects detailed Semgrep logs (`verbose` or `debug` options), it could show the following message:

```console
Job's log exceeded limit of 4194304 bytes.
Job execution will continue but no more output will be collected.
```
The `artifacts` feature could help to avoid it:

## Solution: Save the log as an artifact

Define the `.gitlab-ci.yml` as follows:

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

Now, the full log can be downloaded from the artifacts option in the job.