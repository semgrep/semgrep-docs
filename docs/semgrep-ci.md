# Semgrep CI

[Semgrep CI](https://github.com/returntocorp/semgrep-action) is a wrapper around [Semgrep](https://github.com/returntocorp/semgrep) for running as a GitHub Action, in GitLab, and in other CI providers and interfacing with [Semgrep App](https://semgrep.dev). See [CI Providers](providers.md) to see how to setup Semgrep CI in the provider you already use.

Semgrep CI adds a layer of git-awareness on top of Semgrep. Whenever a new commit is added to a pull request, Semgrep CI reviews only the changed files and reports only issues that are newly introduced in that pull request.

## Technical details

Semgrep CI scans files in the current directory with [semgrep](https://github.com/returntocorp/semgrep), and exits with a return code of 1 if blocking issues are found.

Findings are blocking by default. They can be set to non-blocking by changing the action in Semgrep App [Manage → Policy](https://semgrep.dev/manage/policy).

Semgrep-action has the option to report only new issues, added since a specific commit.
When run in a continuous integration (CI) pipeline, semgrep-action determines the base commit from [environment variables](https://github.com/returntocorp/semgrep-action/blob/develop/src/semgrep_agent/meta.py), as set by GitHub, GitLab, Travis CI or CircleCI. The base commit can also be passed on the command line using the option `--baseline-ref`.

Semgrep-action determines new issues by [scanning only modified files](https://github.com/returntocorp/semgrep-action/blob/develop/src/semgrep_agent/targets.py), and scanning twice. It scans the current commit, checks out the base commit and scans that, and removes previously existing findings from the scan result. [Findings are compared](https://github.com/returntocorp/semgrep-action/blob/develop/src/semgrep_agent/findings.py) on identifier, file path, code and count. If the identifier of a rule is modified in the Semgrep configuration, or if the file containing the issues is renamed, all findings are considered new. Changing code that is matched by a rule will thus result in a new finding, even though the finding was previously present and the change did not introduce it.

When running in Github or GitLab, Semgrep CI is able to determine the base commit using environment variables set by the CI provider. For other providers Semgrep CI will need to be explicitly told the base commit. See [setup instruction for other providers](providers.md#standalone-providers) for more information.


## Commit history

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
