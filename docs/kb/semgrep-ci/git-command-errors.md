---
tags:
  - Git
  - Semgrep in CI
---

import MoreHelp from "/src/components/MoreHelp"

# Failed to run a git command during a pull or merge request scan

When running Semgrep in CI with a pull or merge request as the triggering event, Semgrep runs some `git` commands in order to determine the behavior for the scan. The scan will exit with an error if these commands fail. A message like the following will show in the output:

```
[ERROR] Command failed with exit code: 128
-----
Command failed with output:
fatal: Not a valid object name master


Failed to run 'git <command-details>'. Possible reasons:

- the git binary is not available
- the current working directory is not a git repository
- the current working directory is not marked as safe
    (fix with `git config --global --add safe.directory $(pwd)`)

Try running the command yourself to debug the issue.
```

In addition to the potential reasons included in the message, there are two other common reasons for git command failure:

## Clone depth is too shallow

If a shallow git clone of the repository is used to fetch code, and the branch to be scanned has had many commits added since it was branched off the base branch, Semgrep may not be able to identify the base branch commit to compare the current pull or merge request branch with. In this case, the command that failed will usually look like:

`git merge-base --all 606...57587 FETCH_HEAD`

Semgrep uses the merge-base command to compare the tip of the pull or merge request branch with the base branch and determine where it branched off, so that it can accurately scan for changes made in the merge request rather than in the base branch. If there isn't enough history for the base branch, this comparison can fail. This is most common if the git clone performed is shallow by default (as is the case in GitLab CI) or if the depth has been set via command line argument `--depth` or environment variable `GIT_DEPTH`.

To resolve this issue, increase the clone depth to a larger value. Typically, a value such as 20 or 50 is sufficient to capture the information needed for most merge-base calculations.

## Commit or branch is not included in the checkout

As with clone depth, which refs are checked out can vary with the environment. Seeing a message such as `Not a valid object name test-branch` indicates that the branch is not present or is not properly checked out. This is more common if you are using a standalone CI service, or if you have manually set `--baseline-commit` or `SEMGREP_BASELINE_REF` to a commit hash or branch.

To resolve this issue, ensure that you have set the baseline ref to a valid ref, and that the ref is checked out in the CI environment.

<MoreHelp />


