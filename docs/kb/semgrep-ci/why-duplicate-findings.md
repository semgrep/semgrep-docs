---
description: To prevent duplicated findings, perform full scans only on the main branch of your repository.
tags:
  - Semgrep in CI
  - Semgrep AppSec Platform
---

# Why are duplicate findings appearing after running Semgrep in CI?

When scanning with Semgrep in CI, there are two types of scans you can perform: full scans and [**diff-aware scans**](/deployment/customize-ci-jobs#set-up-diff-aware-scans).

For full scans, the same rule and code produces a finding for every branch it is found on. If you are performing full scans on all branches, [the same finding appears for each branch](/semgrep-code/remove-duplicates).

To prevent duplication, Semgrep recommends performing full scans only on the main branch of your repository and performing diff-aware scans on other branches in PRs or MRs. Diff-aware scans compare findings on the current Git ref to findings on the base branch, allowing deduplication of findings not introduced in the PR/MR branch.

For more on setting up diff-aware scanning, see:

* [Customize CI jobs > Set up diff-aware scans](/deployment/customize-ci-jobs#set-up-diff-aware-scans)
* [CI environment variables: SEMGREP_BASELINE_REF](/docs/semgrep-ci/ci-environment-variables/#semgrep_baseline_ref)
