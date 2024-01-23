---
slug: customization
append_help_link: true
title: Customization
hide_title: true
description: TODO
tags:
  - Semgrep Secrets
---

## Receiving findings in GitHub through PR comments

This section describes how to set up PR or MR comments from Semgrep. 

:::info
After enabling this feature, only **valid** (active) secrets-related findings leave a PR or MR comment.
:::

![Semgrep Secrets finding in a PR comment](/img/secrets-pr-comment.png#bordered)
**_Figure._** Semgrep Secrets finding in a PR comment.

### Findings in GitHub pull requests

Perform the following steps to receive Secrets findings as comments in GitHub PRs:

1. Follow the steps in [<i class="fa-regular fa-file-lines"></i> GitHub PR comments](/semgrep-cloud-platform/github-pr-comments/).
2. Inform [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) that you want to enable this feature.

<!--### Findings in GitLab merge requests

Perform the following steps to receive Secrets findings as comments in GitLab MRs:

1. Follow the steps in [<i class="fa-regular fa-file-lines"></i> GitLab MR comments](/semgrep-cloud-platform/gitlab-mr-comments/).
2. Inform [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) that you want to enable this feature.
-->

## Further customization 

* Create tickets in Jira, Linear, or Asana for secrets-related findings. See [<i class="fa-regular fa-file-lines"></i> Ticketing](semgrep-cloud-platform/ticketing/).
* See [<i class="fas fa-external-link fa-xs"></i> Secrets API documentation](https://semgrep.dev/api/v1/docs/#tag/SecretsService).