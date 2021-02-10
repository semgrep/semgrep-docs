# Continuous Integration (CI) Providers

The following instructions show how to setup [Semgrep CI](https://github.com/returntocorp/semgrep-action) on your CI provider. Note that these examples require a [Semgrep App](https://semgrep.dev/manage) account. `SEMGREP_DEPLOYMENT_ID` and `SEMGREP_APP_TOKEN` information is available at [Manage > Settings](https://semgrep.dev/manage/settings) after login.

[TOC]

!!! danger
    `SEMGREP_APP_TOKEN` is a secret value: DO NOT HARDCODE IT AND LEAK CREDENTIALS. Use your CI provider's secret or environment variable management feature to store it.

# Supported CI Providers

Semgrep can seamlessly integrate into your CI pipeline using GitHub Actions or GitLab CI.

## GitHub Actions

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

## GitLab CI
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

# Standalone providers

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


# Other Ways to Run Semgrep

## Editor

Semgrep supports Microsoft Visual Studio Code with the [semgrep-vscode](https://marketplace.visualstudio.com/items?itemName=semgrep.semgrep) extension.

## Pre-commit

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



# Semgrep as an engine

Many other tools have functionality powered by Semgrep.
Add yours [with a pull request](https://github.com/returntocorp/semgrep-docs)!

* [nodejsscan](https://github.com/ajinabraham/nodejsscan)
* [libsast](https://github.com/ajinabraham/libsast)
* [DefectDojo](https://github.com/DefectDojo/django-DefectDojo/pull/2781)
* [Dracon](https://github.com/thought-machine/dracon)
* [SALUS](https://github.com/coinbase/salus/blob/master/docs/scanners/semgrep.md)

