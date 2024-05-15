---
tags:
  - Git
  - Semgrep in CI
---



# Failed to run a git command during a pull or merge request scan

When running Semgrep in CI with a pull or merge request as the triggering event, Semgrep runs some additional `git` commands to determine the behavior for the scan. The scan exits with an error if these commands fail. A message like the following shows in the output:

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

In addition to the potential reasons included in the message, there are a few other common reasons for git command failure:

## Clone depth is too shallow

If a shallow git clone of the repository is used to fetch code, and the branch to be scanned has had many commits added since it was branched off the base branch, Semgrep may not be able to identify the base branch commit to compare the current pull or merge request branch with. In this case, the command that failed is typically:

<pre class="language-bash"><code>git merge-base --all <span className="placeholder">SHA</span> FETCH_HEAD</code></pre>

Semgrep uses the merge-base command to compare the tip of the pull or merge request branch with the base branch and determine where it branched off, so that it can accurately scan for changes made in the merge request rather than in the base branch.

If there isn't enough history to identify the branch point, this comparison can fail. This is most common if the git clone performed is shallow by default, or if the depth has been set to a small value via command line argument `--depth` or environment variable `GIT_DEPTH`.

To resolve this issue, increase the clone depth to a larger value. A value such as 20 or 50 is sufficient to capture the information needed for most merge-base calculations.

For GitLab CI, see [Limit the number of changes fetched during clone](https://docs.gitlab.com/ee/ci/pipelines/settings.html#limit-the-number-of-changes-fetched-during-clone) for instructions on configuring this value.

### GitHub Actions clone behavior

Semgrep has built-in behavior in GitHub Actions to fetch additional commits if the initial clone does not provide sufficient information, so GitHub Actions rarely encounter failures of the `git merge-base` command.

However, if Semgrep is showing findings in GitHub pull requests that were not introduced by the pull request, you can set the variable [`SEMGREP_GHA_MIN_FETCH_DEPTH`](https://semgrep.dev/docs/semgrep-ci/ci-environment-variables/#semgrep_gha_min_fetch_depth) to a higher value to improve the accuracy of the merge-base calculation. This value is the starting value used for fetching additional commits. The default is 0.

## Commit or branch not included in the checkout

As with clone depth, which refs are checked out can vary depending on the CI environment and configuration. If the branch or ref to scan, or the related baseline ref, is not cloned or not checked out, the command that failed is typically:

<pre class="language-bash"><code>git cat-file -e <span className="placeholder">REF</span></code></pre>

with the message `Not a valid object name REF`. This is more common when:

* You are using a standalone CI service, rather than one connected to your SCM.
* You have manually set `--baseline-commit` or `SEMGREP_BASELINE_REF` to a commit hash or branch name.

To resolve this issue, ensure that you have set the baseline ref to a valid ref, and that the ref to scan is checked out in the CI environment.

## Unable to use `--merge-base` option to `git diff` in git versions before 2.30

When running diff scans against a baseline, Semgrep executes the `git diff` command with a `--merge-base` option to correctly calculate the desired diff based on where the current tree branched from the baseline. This option was added to the `git diff` command in git 2.30. If you are running an earlier version of `git`, this command may fail.

To run the scan successfully:

* If possible, update your git version.
* If that's not possible, consider executing the scan using the Semgrep Docker container, which includes a recent version of git.
