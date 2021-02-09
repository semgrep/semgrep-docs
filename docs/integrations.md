# Integrations

Semgrep integrates into the development flow end-to-end, from code conception in the IDE to code review and beyond in pull requests, Slack, over email, and more. Everyone's workflow is a little different and Semgrep is meant to adapt to yours.

[TOC]

# Continuous integration (CI)

The following instructions use [Semgrep CI](https://github.com/returntocorp/semgrep-action) and require a [Semgrep App](https://semgrep.dev/manage) account. `SEMGREP_DEPLOYMENT_ID` and `SEMGREP_APP_TOKEN` information is available at [Manage > Settings](https://semgrep.dev/manage/settings) after login.

!!! danger
    `SEMGREP_APP_TOKEN` is a secret value: DO NOT HARDCODE IT AND LEAK CREDENTIALS. Use your CI provider's secret or environment variable management feature to store it.

## Supported integrations

Semgrep can seamlessly integrate into your CI pipeline using GitHub Actions or GitLab CI.

### GitHub Actions

```yaml
name: Semgrep

on:
  # Run on all pull requests. Returns the results introduced by the PR.
  pull_request: {}

  # Run on merges. Returns all results.
  #push:
  #    branches: ["master", "main"]

jobs:
  semgrep:
    name: Scan
    runs-on: ubuntu-latest
    steps:
      # Checkout project source
      - uses: actions/checkout@v2
      
      # Scan code using project's configuration on https://semgrep.dev/manage
      - uses: returntocorp/semgrep-action@v1

        # Set GITHUB_TOKEN to leave automatic comments on your pull requests.
        #env:
        #  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        with:
          publishToken: ${{ secrets.SEMGREP_APP_TOKEN }}
          publishDeployment: ${{ secrets.SEMGREP_DEPLOYMENT_ID }}

          # Generate a SARIF file for GitHub's code scanning feature. See the next step.
          #generateSarif: "1"

      # Upload SARIF file generated in previous step
      #- name: Upload SARIF file
      #  uses: github/codeql-action/upload-sarif@v1
      #  with:
      #    sarif_file: semgrep.sarif
      #  if: always()
```

<a name="inline-pr-comments-beta"></a>
<br />

#### Automatic PR Comments (beta)

!!! info
    This feature is currently only available for GitHub.

To get inline PR comments on your pull requests, set the `GITHUB_TOKEN` environment variable in your workflow file to `secrets.GITHUB_TOKEN`, which is the GitHub app installation access token and takes the form of this snippet:

```
uses: returntocorp/semgrep-action@v1
        env: # Optional environment variable for automatic PR comments (beta)
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

See a complete example of this workflow file including this environment variable (commented out) in the [above example workflow file](#github-actions). 

!!! info
    There’s no need to create `secrets.GITHUB_TOKEN` yourself because it’s automatically set by GitHub. It only needs to be passed to the action via the workflow file.

Comments are left when Semgrep CI finds a result that blocks CI.
Note that this feature is experimental; please reach out to [support@r2c.dev](mailto:support@r2c.dev) to report any issues.
<br /><br />
### GitLab CI
<p>

```yaml
include:
  - template: "Workflows/MergeRequest-Pipelines.gitlab-ci.yml"

semgrep:
  image: returntocorp/semgrep-agent:v1
  script:
    - python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>
</br>

## Standalone providers

Although not fully supported, these instructions are here to help you integrate with your CI provider of choice.

The following commands can be run by your CI provider (or on the commandline):

<p>

```sh
# Set additional environment variables
$ SEMGREP_JOB_URL=https://example.com/me/myjob
$ SEMGREP_REPO_URL=https://gitwebsite.com/myrepository
$ SEMGREP_BRANCH=mybranch
$ SEMGREP_REPO_NAME=myorg/myrepository

# Run semgrep_agent
$ python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>

For diff-aware scans, include the flag `--baseline-ref` set to a git ref (branch name, tag, or commit hash) to use as a baseline. This will prompt Semgrep to ignore findings that were already present in the codebase, and only show findings that were introduced by modifications to the baseline.

Using the instructions above, Semgrep should be able to integrate into the following CI providers, with some limitations:

- AppVeyor
- Bamboo
- Bitbucket Pipelines
- Bitrise
- Buildbot
- Buildkite
- CircleCI
- Codeship
- Codefresh
- Jenkins
- TeamCity CI
- Travis CI

For example, Buildkite and CircleCI can be configured as follows, though some features such as deduplication of results may not work as expected:

<details><summary>Buildkite</summary>
<p>

```yaml
- label: ":semgrep: Semgrep"
  command: python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID" --publish-token $SEMGREP_APP_TOKEN
    plugins:
      - docker#v3.7.0:
          image: returntocorp/semgrep-agent:v1
          workdir: /<org_name>/<repo_name>
          environment:
            - "SEMGREP_JOB_URL=${BUILDKITE_BUILD_URL}"
            - "SEMGREP_BRANCH=${BUILDKITE_BRANCH}"
            - "SEMGREP_REPO_NAME=<org_name>/<repo_name>"
            - "SEMGREP_REPO_URL=<github_url>"
```

</p>
</details>
<details><summary>CircleCI</summary>
<p>

```yaml
version: 2.1
jobs:
  semgrep-scan:
    parameters:
      repo_path:
        type: string
        default: myorg/semgrep-test-repo
      default_branch:
        type: string
        default: main
      semgrep_deployment_id:
        type: integer
        default: *my deployment id*
    environment:
      SEMGREP_REPO_NAME: << parameters.repo_path >>
      SEMGREP_REPO_URL: << pipeline.project.git_url >>
      SEMGREP_BRANCH: << pipeline.git.branch >>
    docker:
      - image: returntocorp/semgrep-agent:v1
    steps:
      - checkout
      - run:
          name: "Semgrep scan"
          command: |
            python -m semgrep_agent \
              --publish-deployment << parameters.semgrep_deployment_id >> \
              --publish-token $SEMGREP_APP_TOKEN \
              --baseline-ref << parameters.default_branch >>
workflows:
  main:
    jobs:
      - semgrep-scan
```

</p>
</details>
<br />

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).


# Editor

Semgrep supports Microsoft Visual Studio Code with the [semgrep-vscode](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep) extension.

# Git hook

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`:

```
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'v0.39.1'
  hooks:
    - id: semgrep
      # See semgrep.dev/rulesets to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error']
```

# Notifications

Semgrep provides integrations with 3rd party services like Slack, Jira, DefectDojo, and others. To configure these and learn more, visit [Manage > Notifications](https://semgrep.dev/manage/notifications).

# Commit history

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


# Semgrep as an engine

Many other tools have functionality powered by Semgrep.
Add yours [with a pull request](https://github.com/returntocorp/semgrep-docs)!

* [nodejsscan](https://github.com/ajinabraham/nodejsscan)
* [libsast](https://github.com/ajinabraham/libsast)
* [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
* [Dracon](https://github.com/thought-machine/dracon)
* [SALUS](https://github.com/coinbase/salus/blob/master/docs/scanners/semgrep.md)

<!-- # Output

This document describes `semgrep` output and the information provided after
running the program. By default output is sent to `stdout` in a user-readable
format.

## Default

By default, `semgrep` outputs results to `stdout`. The output looks like:

```
<finding-file-path>
rule:<rule-id>: <rule-message>
<finding-line-number>: <finding-line-code>
```

The `<rule-id>` and `<rule-message>` should be familiar from the [configuration
file fields](../writing-rules/configuration.md#schema). The `<finding-file>`,
`<finding-line-number>`, and `<finding-line-code>` are included to conveniently
describe the context around the finding.

The following is example output from an [r2c rule](https://github.com/returntocorp/semgrep-rules):

```
node.py
rule:python.deadcode.eqeq-is-bad: useless comparison operation `node.id == node.id` or `node.id != node.id`.
3:        if node.id == node.id:  # Oops, supposed to be 'node_id'
```

## JSON

JSON output can be specified with the `--json` flag. This is useful for hooking
`semgrep`'s findings into other programs or tools. This form of output is much
more verbose and provides the full context around a finding.

JSON output looks like:

```json
{
  "results": [
    {
      "check_id": <rule-id>,
      "path": <finding-file-path>,
      "extra": {
        "lines": <finding-line-code>,
        "message": <rule-message>,
        "metadata": {},
        "metavars": {
          <metavariable-name>: {
            "abstract_content": <metavariable-content>,
            "start": {
              "col": <finding-line-column-start>,
              "line": <finding-line-number-start>,
              "offset": <finding-byte-offset-start>
            },
            "end": {
              "col": <finding-line-column-end>,
              "line": <finding-line-number-end>,
              "offset": <finding-byte-offset-end>
            },
            "unique_id": {
              "md5sum": <finding-unique-idenfier>,
              "type": "AST"|"id"
            }
          }
        },
        "severity": "WARNING"|"ERROR"
      },
      "start": {
        "col": <finding-line-column-start>,
        "line": <finding-line-number-start>
      },
      "end": {
        "col": <finding-line-column-end>,
        "line": <finding-line-number-end>
      }
    },
    {
      "check_id": <rule-id>,
      ...
    },
    ...
  ],
  "errors": [
    {
      "message": "SemgrepCoreRuntimeErrors",
      "data": <error-data>
    },
    ...
  ]
}
```

The following is example output from an [r2c rule](https://github.com/returntocorp/semgrep-rules):

```json
{
  "results": [
    {
      "check_id": "python.deadcode.eqeq-is-bad",
      "path": "targets/basic/test.py",
      "extra": {
        "lines": "    return a + b == a + b",
        "message": "useless comparison operation `a+b == a+b` or `a+b != a+b`; if testing for floating point NaN, use `math.isnan`, or `cmath.isnan` if the number is complex.",
        "metadata": {},
        "metavars": {
          "$X": {
            "abstract_content": "a+b",
            "start": {
              "col": 12,
              "line": 3,
              "offset": 55
            },
            "end": {
              "col": 17,
              "line": 3,
              "offset": 60
            },
            "unique_id": {
              "md5sum": "07d71d85769e594dba9d7ae3d295c01f",
              "type": "AST"
            }
          }
        },
        "severity": "ERROR"
      },
      "start": {
        "col": 12,
        "line": 3
      },
      "end": {
        "col": 26,
        "line": 3
      }
    }
  ],
  "errors": []
}
```

## SARIF (JSON)

You can set the `--sarif` flag to request output as SARIF-compliant JSON.
[SARIF](https://docs.oasis-open.org/sarif/sarif/v2.1.0/cs01/sarif-v2.1.0-cs01.html)
is a standard for representing static analysis results as JSON.
We recommend using the regular `--json` formatting flag
unless you want integrate with a tool that gathers results
from multiple SARIF-compatible static analysis tools.

The following is example output from an [r2c rule](https://github.com/returntocorp/semgrep-rules):

```json
{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "results": [
    {
      "locations": [
        {
          "physicalLocation": {
            "artifactLocation": {
              "uri": "targets/basic/test.py",
              "uriBaseId": "%SRCROOT%"
            },
            "region": {
              "endColumn": 26,
              "endLine": 3,
              "startColumn": 12,
              "startLine": 3
            }
          }
        }
      ],
      "message": {
        "text": "useless comparison operation `a+b == a+b` or `a+b != a+b`; possible bug?"
      },
      "ruleId": "rules.eqeq-is-bad"
    }
  ],
  "tool": {
    "driver": {
      "name": "semgrep",
      "rules": [
        {
          "defaultConfiguration": {
            "level": "error"
          },
          "fullDescription": {
            "text": "useless comparison operation `$X == $X` or `$X != $X`; possible bug?"
          },
          "id": "rules.eqeq-is-bad",
          "name": "rules.eqeq-is-bad",
          "properties": {
            "precision": "very-high",
            "tags": []
          },
          "shortDescription": {
            "text": "useless comparison operation `$X == $X` or `$X != $X`; possible bug?"
          }
        }
      ],
      "semanticVersion": "0.17.0"
    }
  },
  "version": "2.1.0"
}
``` -->
