# Integrations

Semgrep integrates into the development flow end-to-end, from code conception in the IDE to code review and beyond in pull requests, Slack, over email, and more. Everyone's workflow is a little different and Semgrep is meant to adapt to yours.

[TOC]

# Continuous integration (CI)

The following instructions use [Semgrep CI](https://github.com/returntocorp/semgrep-action) and require a free [Semgrep Community](https://semgrep.dev/manage) or paid Semgrep Team account. `SEMGREP_DEPLOYMENT_ID` and `SEMGREP_APP_TOKEN` information is available at [Manage > Settings](https://semgrep.dev/manage/settings) after login.


!!! danger
    `SEMGREP_APP_TOKEN` is a secret value: DO NOT HARDCODE IT AND LEAK CREDENTIALS. Use your CI provider's secret or environment variable management feature to store it. 

## Supported integrations

Semgrep can seamlessly integrate into your CI pipeline using GitHub Actions or GitLab CI.

<details><summary>GitHub Actions</summary>
<p>

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
      - uses: actions/checkout@v1
      
      # Scan code using project's configuration on https://semgrep.dev/manage
      - uses: returntocorp/semgrep-action@v1

        # Set GITHUB_TOKEN to leave inline comments on your pull requests.
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

</p>
</details>
<details><summary>GitLab CI</summary>
<p>

```yaml
include:
  - template: 'Workflows/MergeRequest-Pipelines.gitlab-ci.yml'

semgrep:
  image: returntocorp/semgrep-agent:v1
  script:
    - python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>
</details>
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

# Run semgrep_agent
$ python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>

Buildkite and CircleCI can be configured as follows, though some features such as deduplication of results may not work as expected:

<details><summary>Buildkite</summary>
<p>

```yaml
- label: ":semgrep: Semgrep"
  command: python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID" --publish-token $SEMGREP_APP_TOKEN
  expeditor:
    executor:
      docker:
        image: returntocorp/semgrep-agent:v1
        workdir: /<repo_name>
```

</p>
</details>
<details><summary>CircleCI</summary>
<p>

```yaml
version: 2
jobs:
    build:
        docker:
            - image: returntocorp/semgrep-agent:v1
        steps:
            - checkout
            - run: python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

</p>
</details>
<br />

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

### Inline PR Comments (beta)

!!! info
    This feature is currently only available for GitHub.

To get inline PR comments on your pull requests, set the `GITHUB_TOKEN` environment variable in your workflow file to `secrets.GITHUB_TOKEN`, which is the GitHub app installation access token.
You can see an example of this environment variable set (commented out) in the above example workflow file.
Comments are left when Semgrep CI finds a result that blocks CI.
Note that this feature is experimental; please reach out to support@r2c.dev to report any issues.


# Editor

Semgrep supports Microsoft Visual Studio Code with the [semgrep-vscode](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep) extension.

# Git hook

The [pre-commit framework](https://pre-commit.com/) can run `semgrep` at commit-time. [Install `pre-commit`](https://pre-commit.com/#install) and add the following to `.pre-commit-config.yaml`:

```
repos:
- repo: https://github.com/returntocorp/semgrep
  rev: 'v0.32.0'
  hooks:
    - id: semgrep
      # See semgrep.dev/rulesets to select a ruleset and copy its URL
      args: ['--config', '<SEMGREP_RULESET_URL>', '--error']
```

# Notifications

Semgrep provides integrations with 3rd party services like Slack, Jira, Defect Dojo, and others. To configure these and learn more, visit [Manage > Notifications](https://semgrep.dev/manage/notifications).

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
