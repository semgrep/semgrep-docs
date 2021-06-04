---
append_help_link: true
meta_description: |-
  Semgrep CI is a wrapper around Semgrep CLI that adds convenient features for use in CI environments, such as in GitHub Actions or GitLab CI/CD. Rapidly scan every commit and get started despite existing bugs with Semgrep CI.
---

# Semgrep CI

[Semgrep CI](https://github.com/returntocorp/semgrep-action) (aka Semgrep Action or `semgrep-agent`) is a specialized Docker image for running Semgrep in CI environments. It can be used stand-alone or authenticated with [Semgrep App](https://semgrep.dev/login) for centralized rule and result management.

- **Scan every commit**. Semgrep CI rapidly scans modified files on pull and merge requests, with longer full project scans configurable on merges to specific branches. Quick scans protect developer productivity.
- **Find bugs moving forward**. You shouldn't have to fix existing bugs just to adopt a tool. Semgrep CI reports newly introduced issues on pull and merge requests, scanning them at their base and HEAD commits to compare results. Developers are signficantly more likely to fix the issues they introduced themselves on PRs and MRs.
- **Integrate with your existing workflow**. Semgrep CI can authenticate to [Semgrep App](https://semgrep.dev/login) for use with Slack, inline PR and MR comments, email, and other 3rd party services.

[TODO] - Image of Semgrep, Semgrep CI, CI Environment, and optional App connection (i.e. illustative "architecture" diagram)

[TOC]

# Getting started

## GitHub Actions

### Automatic setup

You can add Semgrep CI to a GitHub repository by clicking "Set up" on the [Projects page](https://semgrep.dev/manage/projects) of Semgrep App.

!!! info
    This page will list only the repositories that Semgrep App has permission to see. You can add repositories on your organization's settings page on GitHub. Just go to Settings > Installed GitHub Apps > semgrep.dev > Configure and make your changes in the 'Repository access' section.

You’ll get a chance to configure a few settings, such as whether you want to run on pushes, on pull requests, or on both. Some settings are pre-selected for convenience. When you're done, Semgrep App will commit a CI workflow file to your repository.

!!! warning
    Semgrep App cannot commit this file if there are branch protection rules preventing pushes to your default branch. In this case, temporarily disable your branch protection rules or follow the guide for manual setup.

### Manual setup

To manually add Semgrep CI to GitHub Actions, add a `.github/workflows/semgrep.yml` file to your repository. Follow the [workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions). See this [example GitHub Actions workflow configuration](sample-ci-configs.md#github-actions) for Semgrep CI.
## GitLab CI/CD

To add Semgrep CI to GitLab CI/CD, add a `.gitlab-ci.yml` file to your repository if not already present. Add a block to run the Semgrep CI job in your pipeline, following [GitLab’s configuration guide for the .gitlab-ci.yml file](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html). See this [example GitLab CI/CD configuration](sample-ci-configs.md#gitlab-ci) for Semgrep CI.

## Using Docker with other CI environments

To run Semgrep CI in other CI environments, use the [`returntocorp/semgrep-agent:v1` Docker image](https://hub.docker.com/r/returntocorp/semgrep-agent), and run this command in your Docker container:

```sh
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

To get CI context awareness, you can optionally provide the following environment variables:

```sh
# Set additional environment variables
SEMGREP_BRANCH=mybranch
SEMGREP_COMMIT=abcd1234  # commit SHA being scanned
SEMGREP_JOB_URL=https://example.com/me/myjob  # URL to CI logs
SEMGREP_REPO_NAME=myorg/myrepository  # project name to show on Semgrep App
SEMGREP_REPO_URL=https://gitwebsite.com/myrepository
SEMGREP_PR_ID=123
SEMGREP_PR_TITLE="Added four new bugs"  # shown in Slack notifications if set
SEMGREP_TIMEOUT=1800  # Maximum Semgrep run time in seconds, or 0 to disable timeouts

# Run semgrep_agent
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

For diff-aware scans, set the `--baseline-ref` flag to the git ref (branch name, tag, or commit hash) to use as a baseline. For example, to report findings newly added since branching off from your `main` branch, run

```sh
semgrep-agent --baseline-ref main
```

Using these instructions you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo
- Bitbucket Pipelines
- Bitrise
- Buildbot
- Buildkite [(sample configuration)](sample-ci-configs.md#buildkite)
- CircleCI [(sample configuration)](sample-ci-configs.md#circleci)
- Codefresh
- Codeship
- GitHub Actions [(sample configuration)](sample-ci-configs.md#github-actions)
- GitLab CI [(sample configuration)](sample-ci-configs.md#gitlab-ci)
- Jenkins
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

# Results

[TODO]

## Job output

[TODO]

## Integrations

[TODO]

# Configuration

## Registry rules and rulesets

Semgrep CI lets you scan code with rules and rulesets published through the [Semgrep Registry](https://semgrep.dev/explore). Use them by adding the ruleset’s or rule’s identifier to your CI workflow file. Identifiers look like `p/security-audit` or `r/javascript.lang.security.spawn-git-clone.spawn-git-clone`.

For GitHub Actions, if you’re using Semgrep App to manage your configuration, use the “Add to policy” button next to any registry rule or ruleset to add it to a policy.

If you manually added Semgrep CI to your repository using a `.github/workflows/semgrep.yml` file, use the `config:` key inside `with:` to specify a rule configuration in the job that runs Semgrep CI in your workflow. You may specify multiple configurations, each on its own `config:` line inside `with:`. See this [example GitHub Actions workflow configuration](sample-ci-configs.md#github-actions).

For GitLab CI/CD, in your repository’s `.gitlab-ci.yml` file you can specify rule configurations indented within the variable `INPUT_CONFIG` inside the job that runs Semgrep CI in your pipeline. You may specify multiple configurations, each on its own indented line within `INPUT_CONFIG`. See this [example GitLab CI/CD configuration](sample-ci-configs.md#gitlab-ci).

## Custom rules

Run custom rules by using their identifiers (e.g., `s/susan:named-rule`) in the same manner as done for registry rules and rulesets. 

If no rule configuration is found in a GitHub Action workflow or GitLab CI/CD file, Semgrep CI will look for rules specified by configs in the `.semgrep.yml` file in your repository, or load all rules from the `.semgrep/` directory in your repository. If none of these provide a configuration, Semgrep CI will exit with a failing status code.

## Merge and pull requests

For GitHub Actions, to scan only for issues introduced by a branch at pull request time, trigger the Semgrep workflow on a pull request event by adding the following to the Semgrep workflow file:

```yaml
on: pull_request
```

Refer to GitHub’s documentation for information on using [multiple events with activity types or configuration](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#example-using-multiple-events-with-activity-types-or-configuration).

For GitLab CI/CD, to only scan for issues introduce by a branch at merge request time, add the following to the Semgrep job in your CI/CD pipeline:

```yaml
rules:
  - if: $CI_MERGE_REQUEST_IID
```

!!! info
    The `$CI_MERGE_REQUEST_IID` variable is only available when the GitLab pipeline is a merge request pipeline and the merge request is open.

## Branch scanning

For GitHub Actions, you can run Semgrep CI when code is pushed to any branch by using `on: push`. To run Semgrep CI on all push events to only certain branches (in this example, `main` and `other-branch`), use the following in the Semgrep job:

```yaml
on:
  push:
    branches: ["main", "other-branch"]
```

For GitLab CI/CD, you can run Semgrep CI when code is pushed to any branch by using:

```yaml
rules:
  if: $CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH
```

To run Semgrep CI on all push events to only certain branches (in this example, `main` and `other-branch`), use the following in the Semgrep job:

```yaml
rules:
  if: ($CI_COMMIT_BRANCH == "main" || $CI_COMMIT_BRANCH == "other-branch")
```

[TODO: verify the above GitLab configs]

## Audit mode: disable blocking on a specific CI event

If you want to see findings from your whole repository instead of just the files changed by a pull request, you’d normally set up scans on pushes to your main branch. This can prove difficult when you already have existing issues that Semgrep finds on the main branch—you probably don’t want CI to fail all builds on the main branch until every single finding is addressed. For this case, try using audit mode. In audit mode, Semgrep will collect findings data for you to review, but will never fail the build due to findings.

!!! info
    In GitHub Actions, the most common event names are `push` and `pull_request`. To enable audit mode on branch pushes in GitHub Actions, set the option `auditOn: push` in your workflow file.

    <!-- In GitLab, set `allow_failure: true` for the Semgrep CI job in your `.gitlab-ci.yml` file.  TODO: confirm GitLab behavior and vars -->

    For other CI providers, look for the correct event name in CI environment’s log output.

## File ignores

Semgrep CI uses a default ignore list that skips common test, build, and dependency directories, including `tests/`, `node_modules/`, `vendor/`, and more. See the full list of ignored items in [the `.semgrepignore` template file](https://github.com/returntocorp/semgrep-action/blob/v1/src/semgrep_agent/templates/.semgrepignore).

To override the default ignore patterns, create a file named `.semgrepignore` and commit it to the root of your repository. It uses the same syntax as `.gitignore`. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

!!! warning
    `.semgrepignore` is picked up only by Semgrep CI, and is not honored when running Semgrep CLI manually or by the [GitLab Semgrep SAST Analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep).

For information on ignoring findings in code, see the [ignoring findings page](ignoring-findings.md).
## Exit behavior

[TODO]

# Semgrep App authentication

To use your Semgrep App account, set `--publish-deployment` and `--publish-token`. These act as your username and password for authentication. You can find the right values for these variables on the [Dashboard > Settings](https://semgrep.dev/manage/settings) page.

## Ignoring specific rules in a ruleset or policy

You can customize the ruleset you're using to ignore some of its rules by [editing the Semgrep App policy](managing-policy.md#editing-a-policy) used for your scans.

## Getting notifications instead of blocking builds

Some rules point out hotspots that require careful review but are not certain to be insecure code. You might want to disable blocking when scanning with such rules, and instead use a [CI integration](integrations.md) to get notifications.

You can set this up by [changing the actions of the Semgrep App policy](managing-policy.md#changing-policy-actions) used for your scans.

<!-- # Technical details

## Packaging

Semgrep CI is published under the name `semgrep-agent`.

- The [`semgrep_agent` Python package](https://github.com/returntocorp/semgrep-action/tree/develop/src/semgrep_agent) uses this name.
- The [`semgrep-agent` Docker image](https://hub.docker.com/r/returntocorp/semgrep-agent) also uses this name.
- The [semgrep-action](https://github.com/marketplace/actions/semgrep-action) GitHub Marketplace listing
  runs the above Docker image.
- The [semgrep-action repository](https://github.com/returntocorp/semgrep-action)
  holds the code for Semgrep CI, the Docker image, and the GitHub Marketplace manifest.

New versions of Semgrep CI and the Docker image above are released by Semgrep maintainers on a regular basis. To run all jobs with the latest releases, use `returntocorp/semgrep-action@v1` in your GitHub Actions workflow, or the `returntocorp/semgrep-agent:v1` Docker image with other providers.

!!! info
    The Python package itself is not published to PyPI,
    or any other package index,
    but you can still use it by cloning the GitHub repository.

## Behavior

Semgrep CI scans the current working directory,
and exits with a return code of 1 if blocking findings were found.

All findings are blocking by default.
A rule can be set to generate non-blocking findings
on the [Dashboard > Policies](https://semgrep.dev/manage/policies) page of Semgrep App.

Semgrep CI uses environment variables
to detect what context it's running in.
When it's running on a GitHub pull request or GitLab merge request,
diff-aware mode is automatically enabled,
with the branch-off point considered the baseline.
When using other providers, you need to set environment variables
that tell Semgrep CI what it should use as the baseline commit.
Many of our [sample CI configs for various providers](sample-ci-configs.md)
set these environment variables.


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
a rule's ID changes, when a file is renamed, and when the code matched by a finding changes. -->

# Usage outside CI

While Semgrep CI is designed
for integrating with various CI providers,
it's versatile enough to be used locally
to scan a repository with awareness of its git history.

To locally scan issues in your current branch
that are not found on the `main` branch,
run the following command:

```sh
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 semgrep-agent --config p/ci --baseline-ref main
```

Another use case is when you want to scan only commits
from the past weeks for new issues they introduced.
This can be done by using a git command
that gets the tip of the current branch two weeks earlier:

```sh
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 semgrep-agent --config p/ci --baseline-ref $(git rev-parse '@{2.weeks.ago}')
```

To compare two commits
and find the issues added between them,
checkout the more recent commit of the two
before running Semgrep CI:

```sh
git checkout $RECENT_SHA
docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 semgrep-agent --config p/ci --baseline-ref $OLDER_SHA
```

!!! info
    The above commands all require `docker`
    to be installed on your machine.
    They also use Docker volumes
    to make your working directory accessible to the container.
    `--config p/ci` is the Semgrep rule configuration,
    which can be changed to any value
    that `semgrep` itself understands.
