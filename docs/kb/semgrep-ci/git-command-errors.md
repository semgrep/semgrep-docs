---
tags:
  - Git
  - Semgrep in CI
---

import MoreHelp from "/src/components/MoreHelp"

# Failed to run a git command during a pull or merge request scan

When running Semgrep in CI with a pull or merge request as the triggering event, Semgrep runs some additional `git` commands in order to determine the behavior for the scan. The scan will exit with an error if these commands fail. A message like the following will show in the output:

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

`git merge-base --all SHA FETCH_HEAD`

Semgrep uses the merge-base command to compare the tip of the pull or merge request branch with the base branch and determine where it branched off, so that it can accurately scan for changes made in the merge request rather than in the base branch. 

If there isn't enough history to identify the branch point, this comparison can fail. This is most common if the git clone performed is shallow by default, or if the depth has been set to a small value via command line argument `--depth` or environment variable `GIT_DEPTH`.

To resolve this issue, increase the clone depth to a larger value. A value such as 20 or 50 is sufficient to capture the information needed for most merge-base calculations.

For GitLab CI, see [Limit the number of changes fetched during clone](https://docs.gitlab.com/ee/ci/pipelines/settings.html#limit-the-number-of-changes-fetched-during-clone) for instructions on configuring this value.

## Commit or branch is not included in the checkout

As with clone depth, which refs are checked out can vary with the environment. If the branch or ref to scan is not cloned or not checked out, the failed command will usually look like:

`git cat-file -e REF`

with the message `Not a valid object name test-branch`. This is more common if you are using a standalone CI service, or if you have manually set `--baseline-commit` or `SEMGREP_BASELINE_REF` to a commit hash or branch name.

To resolve this issue, ensure that you have set the baseline ref to a valid ref, and that the ref is checked out in the CI environment.

<MoreHelp />


