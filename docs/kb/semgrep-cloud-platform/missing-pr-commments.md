---
description: Use this reference to check why you may not be receiving comments on PRs/MRs.
tags:
  - Semgrep CI
  - PR Comments
  - Rule Board
---

# Why am I not receiving PR/MR comments?

If you have configured Semgrep in CI and Semgrep Cloud Platform to create comments when a rule generates a finding in a PR or MR, but you are not seeing those comments, check the following possibilities.

## Are comments supported on your SCM?

PR/MR Comments are currently supported for GitHub, GitLab, and Bitbucket. If you are using another SCM, comments are not yet supported. Bitbucket Data Center is also not supported yet.

If you are using a self-hosted version of GitHub (GitHub Enterprise) or GitLab (GitLab Self-Managed), see [Integrating Semgrep Cloud Platform with self-hosted enterprise repositories](/docs/semgrep-cloud-platform/scm/) for more details on configuration.

## Have you configured permissions and tokens correctly?

### GitHub

GitHub relies on the Semgrep GitHub app to make comments on code. To receive comments on a project, you must [onboard](/docs/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) the project to Semgrep Cloud Platform, or ensure that your GitHub app is configured with permissions for all repositories. See [Enabling GitHub pull request comments](/docs/semgrep-cloud-platform/github-pr-comments/) for details.

### GitLab and Bitbucket

For MR comments on GitLab and PR comments on Bitbucket, you must:

* configure a token with appropriate permissions to comment on MRs or PRs
* add the token as a variable in your project or workspace configuration
* add the token value to your CI configuration

The GitLab token should have `api` scope and be added to the project's CI/CD settings. See [Enabling GitLab merge request comments](/docs/semgrep-cloud-platform/gitlab-mr-comments/) for details.

The Bitbucket token should be a repository access token (or workspace access token, for Bitbucket Cloud Premium only). See [Enabling Bitbucket pull request comments](/docs/semgrep-cloud-platform/bitbucket-pr-comments/) for details.

## Have you placed the rule in Comment or Block?

In order to receive comments, the rule must be placed in a policy that will generate comments: Comment or Block. If the rule is in a Monitor policy, it will not generate comments.

## Is this the first time this finding has been identified?

PR/MR comments are generated when a finding is new. If a finding is [not new](/docs/semgrep-code/findings/#deduplicating-findings) (if it was seen in a previous Semgrep [scan](/docs/semgrep-code/getting-started/#performing-a-scan)) then a comment will not be generated.

This prevents repeated comments on findings that have already notified developers.

## If you're still having trouble

If you've addressed these issues but are still not seeing comments, please [reach out for help](docs/support/), and provide information on what you've tried so far.

