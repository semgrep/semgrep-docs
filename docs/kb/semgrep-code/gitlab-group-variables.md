---
tags:
  - Gitlab
  - Semgrep Code
description: This may be occurring because SEMGREP_APP_TOKEN is set as a group variable.
---

# My GitLab pipeline says that the token is invalid, but it is valid

If you've checked your GitLab variable setup for `SEMGREP_APP_TOKEN` and are sure that the value is valid, this may be occurring because the variable is set as a group variable, and your configuration is explicitly referencing `SEMGREP_APP_TOKEN` in the `variables` section.

There is a [known issue with GitLab](https://gitlab.com/gitlab-org/gitlab/-/issues/199741) where group variables are accessible to projects, but are not resolved by GitLab's runners.

The [default configuration](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#gitlab-cicd) for GitLab CI/CD includes this setting, and recommends setting the variable as a project/repo variable, which will be successful. 

However, if you prefer to use a group variable, the fix is straightforward: remove the explicit reference to `SEMGREP_APP_TOKEN` from your `.gitlab-ci.yml` config. For example, the default configuration would look like this after the change:

```yml
semgrep:
  image: returntocorp/semgrep
  script: semgrep ci
  rules:
  - if: $CI_PIPELINE_SOURCE == "web"  # allow triggering a scan manually from the gitlab UI
  - if: $CI_MERGE_REQUEST_IID
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

Without the explicit reference failing to resolve, the correct value will be found and used automatically!