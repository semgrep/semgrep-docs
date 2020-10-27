# Integrations

Semgrep integrations exist from the beginning to the end of the development flow, from code conception in the IDE to code review and beyond in pull requests, Slack, over email, and more. Workflows vary widely between teams and their projects.

[TOC]

# Continuous integration (CI)

!!! info
    [Semgrep CI](https://github.com/returntocorp/semgrep-action) is a Git and diff-aware Semgrep wrapper that surfaces only the results introduced by a pull request. With this approach teams can enable new checks without being penalized for pre-existing issues 👏

Instructions are available at [semgrep.dev/manage](https://semgrep.dev/manage) as part of the “setup a new project” workflow. Those instructions offer provider-specific configurations for [Semgrep CI](https://github.com/returntocorp/semgrep-action) for the following products:

<details><summary>Buildkite</summary>
<p>

```yaml
hello: {}
```

</p>
</details>
<details><summary>CircleCI</summary>
<p>

```yaml
# This workflow file requires a free account on Semgrep.dev to 
# manage rules, file ignores, notifications, and more.

version: 2
jobs:
    build:
        docker:
            - image: returntocorp/semgrep-agent:v1
        steps:
            - checkout
            - run: semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>
</details>
<details><summary>GitHub Action</summary>
<p>

```yaml
# This workflow file requires a free account on Semgrep.dev to 
# manage rules, file ignores, notifications, and more.

name: Semgrep

on: 
    # Run on all pull requests. Returns the results introduced by the PR.
    pull_request: {}

    # Run on merges. Returns all results.
    #push:
    #    branches: ["master"]

jobs:
  semgrep:
    name: Scan
    runs-on: ubuntu-latest
    steps:
      # Checkout project source
      - uses: actions/checkout@v1
      
      # Scan code using project's configuration on https://semgrep.dev/manage
      - uses: returntocorp/semgrep-action@v1
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

</p>
</details>
<details><summary>GitLab Jobs</summary>
<p>

```yaml
hello: {}
```

</p>
</details>
<details><summary>Jenkins</summary>
<p>

```yaml
hello: {}
```

</p>
</details>
</br>
Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

# Editor

Semgrep supports Microsoft Visual Studio Code with the [semgrep-vscode](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep) extension.

# Git hook

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`:

```
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'v0.28.0'
  hooks:
    - id: semgrep
      # See semgrep.dev/rulesets to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error']
```

# Notifications

Semgrep provides integrations with 3rd party services like Slack, Jira, Defect Dojo, and others. To configure these and learn more, visit [semgrep.dev/manage/notifications](https://semgrep.dev/manage/notifications).

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
