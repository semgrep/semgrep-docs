---
description: To prevent duplicated findings, perform full scans only on the main branch of your repository.
tags:
  - Semgrep CI
  - Semgrep Cloud Platform
---

# Why are duplicate findings appearing after running Semgrep in CI?

When scanning with Semgrep in CI, there are two types of scans you can perform: full scans and [**diff-aware scans**](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning).

For full scans, the same rule and code produces a finding for every branch it is found on. If you are performing full scans on all branches, [the same finding appears for each branch](/docs/semgrep-code/findings/#deduplicating-findings).

To prevent duplication, Semgrep recommends performing full scans only on the main branch of your repository and performing diff-aware scans on other branches in PRs or MRs. Diff-aware scans compare findings on the current Git ref to findings on the base branch, allowing deduplication of findings not introduced in the PR/MR branch.

For more on setting up diff-aware scanning, see:

* [Running Semgrep in CI with Semgrep Cloud Platform: Diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning)
* [Running Semgrep in CI without Semgrep Cloud Platform: Diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform/#diff-aware-scanning)
* [CI environment variables: SEMGREP_BASELINE_REF](/docs/semgrep-ci/ci-environment-variables/#semgrep_baseline_ref)


