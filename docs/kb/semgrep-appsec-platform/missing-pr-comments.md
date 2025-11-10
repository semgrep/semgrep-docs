---
description: Use this reference to check why you may not be receiving Semgrep comments on PRs or MRs.
tags:
  - Semgrep in CI
  - PR comments
  - Rule management
---

# Why is my repository not receiving PR or MR comments?

If you have configured Semgrep in CI and Semgrep AppSec Platform to create comments when a rule generates a finding in a PR or MR, but you are not seeing those comments, review the following possibilities.

## Are comments supported in your source code manager (SCM)?

PR or MR comments are currently supported for:

* All GitHub plans
* All GitLab plans
* All Bitbucket plans
* Azure DevOps Cloud repositories

PR or MR comments are not supported for:

* Any other SCM or repository provider

A connection to a source code manager is required for a repository to receive PR or MR comments. If you have not done so yet, [set up a connection for your SCM organization or project](/deployment/connect-scm).

If you are using a self-hosted version of your SCM, see [Connect to on-premise orgs and projects](/deployment/connect-scm/#connect-to-on-premise-orgs-and-projects) for more details on configuration.

## Have you configured permissions and tokens correctly?

### GitHub

Semgrep relies on the Semgrep GitHub app to make comments on code. To receive comments on a project, ensure that you have performed the following steps:

* You have [onboarded](/docs/category/scan-repositories-with-the-appsec-platform) the project to Semgrep AppSec Platform.
* You have configured your GitHub app with permissions for all repositories that are scanned by Semgrep AppSec Platform. See [Enabling GitHub pull request comments](/docs/semgrep-appsec-platform/github-pr-comments) for details, or review the following examples:

  ![Semgrep GitHub app permissions: all repositories](/img/gh-app-permissions-all.png#md-width)
  _**Figure.** Grant permissions for access to all repositories._

  ![Semgrep GitHub app permissions - select repositories](/img/gh-app-permissions-select.png#md-width)
  _**Figure.** Grant permissions for access to select repositories. Ensure the repositories you have onboarded to Semgrep AppSec Platform are included here._

### Azure DevOps

See [Enable Azure pull request comments](/docs/semgrep-appsec-platform/azure-pr-comments) for token permissions and configuration guidelines.

### GitLab

The GitLab token should have `api` scope. See [Enable GitLab merge request comments](/docs/semgrep-appsec-platform/gitlab-mr-comments) for details.

The `api` scoped token must be provided to Semgrep through the SCM connection. Semgrep no longer supports tokens provided in the GitLab CI/CD pipeline.

#### Bitbucket

The Bitbucket token must be a repository access token or a workspace access token. See [Enable Bitbucket pull request comments](/category/bitbucket-pr-comments) for details.

## Are you running diff-aware scans?

In Managed Scans: Semgrep always runs diff-aware scans on pull and merge request events. Full scans run at scheduled intervals.

In GitHub Actions and GitLab CI/CD: Semgrep runs diff-aware scans on pull or merge requests by default if you are using the recommended configuration.

In other SCMs or CI systems, or with unusual pipeline configurations: diff-aware scans may require additional setup. Review the [configuration instructions](/category/pr-or-mr-comments) for your SCM or [custom configuration for your CI jobs](/deployment/customize-ci-jobs#set-up-diff-aware-scans) and ensure you have configured your scans correctly.

### Identify a diff-aware scan

Semgrep diff-aware scans are most easily identified by reviewing three items in the scan log:

* The triggering event
* The number of files scanned
* Whether a baseline scan is conducted

#### The triggering event for the scan

The triggering event for the scan in GitHub or GitLab should typically be `pull_request`. This is the easiest to find but the least reliable, since it's possible to configure diff-aware scans on other event types. In the scan log, this appears as:

```
environment - running in environment github-actions, triggering event is pull_request
```

This line indicates that a scan was triggered from a pull request, and is most likely diff-aware, whereas:

```
environment - running in environment github-actions, triggering event is schedule
```

would not typically indicate a diff-aware scan. Scheduled scans are typically full scans of all code in the repository.

#### The number of files scanned

The number of files scanned should be approximately the number of files modified in the PR, and should not include all files in the repository.

In the scan log, this appears as:

```
Scanning 2 files tracked by git with 1194 Code rules, 860 Secrets rules, 768 Supply Chain rules:
```

This would most likely be a diff-aware scan, unless you are doing a test on a very small repository.

However, if you instead see something like:

```
Scanning 1002 files tracked by git with 1971 Code rules, 858 Secrets rules, 3619 Supply Chain rules:
```

and the repository's total number of files is around 1000, then this most likely is not a diff-aware scan.

#### Whether a baseline scan is conducted

Finally, during the process of a diff-aware scan, Semgrep actually conducts two scans: one at the current tip or head of the PR, and one at the baseline ref or commit.

The following log is anonymized and truncated for clarity, and the exact format of the log may evolve over time. It shows the key item to review, the two distinct `Scan Status` entries:

```
┌────────────────┐
│ Debugging Info │
└────────────────┘

  SCAN ENVIRONMENT
  versions    - semgrep 1.76.0 on python 3.11.9
  environment - running in environment github-actions, triggering event is pull_request
Fixing git state for github action pull request
Not on head ref: fcc...d21; checking that out now.

  CONNECTION
Using 104...950 as the merge-base of f5e...1a7 and fcc...d21
  Initializing scan (deployment=testsemgrep, scan_id=29062823)
  Enabled products: Code, Supply Chain
...
┌─────────────┐
│ Scan Status │
└─────────────┘
  Scanning 52 files tracked by git with 1898 Code rules, 818 Supply Chain rules:
...
  Current version has 60 findings.

Creating git worktree from '104...950' to scan baseline.
...
┌─────────────┐
│ Scan Status │
└─────────────┘
  Scanning 4 files tracked by git with 2 Code rules, 34 Supply Chain rules:
```

The initial scan, which occurs at the current commit for the pull request `fcc...d21`, scans 52 files and identifies 60 findings. The baseline scan, which occurs at `104...950`, scans 4 files. Baseline scans typically scan fewer files than the original scan, as they only need to scan files and rules that have findings in the initial scan to determine which of those findings were present before the changes made in the pull or merge request.

This also means that baseline scans are not conducted if all findings in the current commit that are in files added by the PR or MR, because those findings could not have been present before. This information is logged as:

```
Skipping baseline scan, because all current findings are in files that didn't exist in the baseline commit.
```

If the baseline scan is skipped, the scan is still diff-aware; the baseline scan just isn't necessary.

If you review the scans that are not generating comments and find that they are not diff-aware, and you have followed the preceding guidance, feel free to [reach out to Semgrep support](/docs/support) for help.

## Have you correctly configured your policies?

### Code: The rule is in Comment or Block mode

To receive comments for a Code rule, the rule must be in the [Comment or Block policy mode](https://semgrep.dev/docs/semgrep-code/policies#block-a-pr-or-mr-through-rule-modes). Rules in Monitor mode do not generate comments.

### Secrets: The rule is in Comment or Block mode, and validation settings match

For Secrets, the rule's [policy mode](https://semgrep.dev/docs/semgrep-secrets/policies#rule-modes) must be Comment or Block. The secret must also be valid, unless you have customized your validation state policy. See [Validation state policies](https://semgrep.dev/docs/semgrep-secrets/policies#validation-state-policies) for more information.

### Supply Chain: The finding meets your criteria for commenting or blocking

Supply Chain provides flexible policy configuration based on a variety of criteria. When setting up a policy, you can choose the actions "Leave a comment" or "Block and leave a comment". These actions are similar to the Comment and Block modes of Code and Secrets policies. If a finding meets your configured criteria for commenting, then it should result in a comment on the PR or MR.

## Is this the first time this finding has been identified?

PR or MR comments are generated when a finding is new. If a finding was seen in a previous scan, it is [not new](/semgrep-code/remove-duplicates) and a comment is not generated.

This prevents repeated comments on findings that have already notified developers.

## If you're still having trouble

If you've addressed these issues but are still not seeing comments, please [reach out for help](/docs/support), and provide information on what you've tried so far.
