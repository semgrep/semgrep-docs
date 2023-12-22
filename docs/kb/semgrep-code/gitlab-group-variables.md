---
description: This may be occurring because SEMGREP_APP_TOKEN is set as a group variable.
tags:
  - GitLab
  - Semgrep Code
append_help_link: true
---

import MoreHelp from "/src/components/MoreHelp"

# My GitLab pipeline says that the token is invalid, but it is valid

If you've checked the value of your `SEMGREP_APP_TOKEN` and have confirmed that it is valid, you may still see invalid token errors if both of the following are true:

* Your variable is set as a group variable.
* Your configuration explicitly references `SEMGREP_APP_TOKEN` in the `variables` section.

There is a [known issue](https://gitlab.com/gitlab-org/gitlab/-/issues/199741) where group variables are accessible to projects but are not resolved by GitLab's runners.

Semgrep's [default configuration](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#gitlab-cicd) recommends setting the variable as a project or repo variable. Project variables are properly resolved by GitLab's runners.

If you prefer to use a group variable, remove the explicit reference to `SEMGREP_APP_TOKEN` from your `.gitlab-ci.yml` file. For example, the default configuration would look like this after the change:

```yml
semgrep:
  image: returntocorp/semgrep
  script: semgrep ci
  rules:
  - if: $CI_PIPELINE_SOURCE == "web"  # allow triggering a scan manually from the gitlab UI
  - if: $CI_MERGE_REQUEST_IID
  - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

Without the explicit reference failing to resolve, GitLab's runners identify and use the correct value.

<MoreHelp />
