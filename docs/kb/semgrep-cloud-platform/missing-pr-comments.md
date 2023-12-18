---
description: Use this reference to check why you may not be receiving Semgrep comments on PRs or MRs.
tags:
  - Semgrep CI
  - PR comments
  - Rule management
---

# Why am I not receiving PR or MR comments?

If you have configured Semgrep in CI and Semgrep Cloud Platform to create comments when a rule generates a finding in a PR or MR, but you are not seeing those comments, review the following possibilities.

## Are comments supported in your source code manager (SCM)?

PR or MR comments are currently supported for:

* All GitHub plans
* All GitLab plans
* Bitbucket Cloud

PR or MR comments are not supported for:

* Bitbucket Data Center
* Azure Repos
* Any other SCM or repository provider

If you are using a self-hosted version of GitHub (GitHub Enterprise) or GitLab (GitLab Self-Managed), see [Integrating Semgrep Cloud Platform with self-hosted enterprise repositories](/docs/semgrep-cloud-platform/scm/) for more details on configuration.

## Have you configured permissions and tokens correctly?

### GitHub

GitHub relies on the Semgrep GitHub app to make comments on code. To receive comments on a project, ensure that you have performed the following steps:

* You have [onboarded](/docs/semgrep-code/getting-started/) the project to Semgrep Cloud Platform.
* You have configured your GitHub app with permissions for all repositories that are scanned by Semgrep Cloud Platform. See [Enabling GitHub pull request comments](/docs/semgrep-cloud-platform/github-pr-comments/) for details.

### GitLab and Bitbucket

For MR comments on GitLab and PR comments on Bitbucket, ensure that you have performed the following steps:

* You have configured a token with appropriate permissions to comment on MRs or PRs.
* You have added the token as a variable in your project or workspace configuration.
* You have added the token value to your CI configuration.

#### GitLab

The GitLab token should have `api` scope and be added to the project's CI/CD settings. See [Enabling GitLab merge request comments](/docs/semgrep-cloud-platform/gitlab-mr-comments/) for details.

#### Bitbucket

The Bitbucket token should be a repository access token (or workspace access token, for Bitbucket Cloud Premium only). See [Enabling Bitbucket pull request comments](/docs/semgrep-cloud-platform/bitbucket-pr-comments/) for details.

## Have you placed the rule in Comment or Block?

In order to receive comments, the rule must be placed in a policy that can generate comments:

* Comment
* Block

If the rule is in a Monitor policy, it does not generate comments.

## Is this the first time this finding has been identified?

PR or MR comments are generated when a finding is new. If a finding is was seen in a previous scan, it is [not new](/docs/semgrep-code/findings/#deduplicating-findings) and a comment is not generated.

This prevents repeated comments on findings that have already notified developers.

## If you're still having trouble

If you've addressed these issues but are still not seeing comments, please [reach out for help](/docs/support/), and provide information on what you've tried so far.

