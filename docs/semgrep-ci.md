# Semgrep CI

[Semgrep CI](https://github.com/returntocorp/semgrep-action)
is a wrapper around
[Semgrep CLI](https://github.com/returntocorp/semgrep)
that adds convenient features for use in CI environments,
such as in GitHub Actions or GitLab CI.
See [how to set it up with your CI provider](providers.md).

## Features

- **Connect to Semgrep App**:
  [Semgrep App](https://github.com/returntocorp/semgrep)
  lets you configure policies and notification rules
  for all your projects.
  Semgrep CI can run scans with the policies you configured,
  and report findings back to Semgrep App
  so you can see them all in one place.
- **Diff-aware scans**:
  Semgrep CI is aware of Git history,
  and is able to report only the new findings
  between two revisions.
- **Auto-detection of CI context**:
  Semgrep CI detects when it's running inside GitHub Actions or GitLab CI.
  When scanning a pull request,
  it reports only findings that were newly introduced.

## Behavior

Semgrep CI scans the current working directory,
and exits with a return code of 1 if blocking findings were found.

All findings are blocking by default.
A rule can be set to generate non-blocking findings
on the [Manage → Policy](https://semgrep.dev/manage/policy) page of Semgrep App.

Semgrep CI uses environment variables
to detect what context it's running in.
When it's running on a GitHub pull request or GitLab merge request,
diff-aware mode is automatically enabled,
with the branch-off point considered the baseline.
When using other providers, you need to set environment variables
that tell Semgrep CI what it should use as the baseline commit.
Many of our [sample CI configs for various providers](providers.md#standalone-providers)
set these environment variables.
<!-- TODO: add diagram -->

In diff-aware scans,
Semgrep CI determines which findings are new
by [finding all modified files](https://github.com/returntocorp/semgrep-action/blob/develop/src/semgrep_agent/targets.py),
and running two scans on them behind the scenes.
First, it scans the current commit.
Then, it checks out the baseline commit
and scans the files that have findings currently.
Any findings that already existed in the baseline version are ignored.
Two [findings are considered identical](https://github.com/returntocorp/semgrep-action/blob/develop/src/semgrep_agent/findings.py)
if the have the same rule ID, file path, matched source code, and count within the file.
The matched source code content is compared with whitespace trimmed,
so that re-indenting code doesn't create new findings.
This means that you will get notified about new findings when
a rule's ID changes, when a file is renamed, and when the code matched by a finding changes.

## Usage outside CI

While Semgrep CI is designed
for integrating with various CI providers,
it's versatile enough to be used locally
to scan a repository with awareness of its git history.

To locally scan issues in your current branch
that are not found on the `main` branch,
run the following command:

```
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 python -m semgrep_agent --config p/ci --baseline-ref main
```

Another use case is when you want to scan only commits
from the past weeks for new issues they introduced.
This can be done by using a git command
that gets the tip of the current branch two weeks earlier:

```
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 python -m semgrep_agent --config p/ci --baseline-ref $(git rev-parse '@{2.weeks.ago}')
```

To compare two commits
and find the issues added between them,
checkout the more recent commit of the two
before running Semgrep CI:

```
git checkout $RECENT_SHA
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 python -m semgrep_agent --config p/ci --baseline-ref $OLDER_SHA
```

!!! info
    The above commands all require `docker`
    to be installed on your machine.
    They also use Docker volumes
    to make your working directory accessible to the container.
    `--config p/ci` is the Semgrep rule configuration,
    which can be changed to any value
    that `semgrep` itself understands.
