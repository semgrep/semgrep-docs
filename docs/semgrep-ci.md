---
append_help_link: true
---

# Semgrep CI

[Semgrep CI](https://github.com/returntocorp/semgrep-action)
is a wrapper around
[Semgrep CLI](https://github.com/returntocorp/semgrep)
that adds convenient features for use in CI environments,
such as in GitHub Actions or GitLab CI.

[TOC]

# Features

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
  between two revisions. This happens automatically in GitHub Actions or GitLab CI, and can otherwise be configured using the `--baseline-ref` flag.
- **Auto-detection of CI context**:
  Semgrep CI detects when it's running inside GitHub Actions or GitLab CI.
  When scanning a pull request,
  it reports only findings that were newly introduced.
- **Ignore files**:
  Semgrep CI will ignore files when scanning
  according to paths and patterns specified
  in your repository's `.semgrepignore` file.

# Setup

## Automatic setup

You can add Semgrep CI to a GitHub repository by clicking "Set up"
on the [Projects page](https://semgrep.dev/manage/projects) of Semgrep App

!!! info
    This page will list only the repositories
    that Semgrep has permission to see.
    You can add repositories on your organization's settings page on GitHub.
    Just go to Settings > Installed GitHub Apps > semgrep.dev > Configure
    and make your changes in the 'Repository access' section.
  
You will get a chance to configure a few settings,
such as whether you want to run on pushes, on pull requests, or on both.
We recommend using Semgrep with the pre-selected settings.
When you're done, Semgrep will commit a CI workflow file to your repository.

!!! warning
    Semgrep cannot commit this file if there are
    branch protection rules preventing pushes to your default branch.
    In this case, you can temporarily disable your branch protection rules,
    or follow the guide for manual setup.

## Manual setup

If you're using GitHub Actions,
you can generate and copy a CI configuration file on Semgrep App as above,
and then commit it manually.

If you're using any other CI provider,
you can use one of our [sample CI configuration files](sample-ci-configs.md).

# Configuration

Semgrep CI is configured through workflow files specific to the CI environment in which it runs. This is a reference for most common options,
but you can see all available settings with `--help`.

## Adding to GitHub Actions

To add Semgrep CI to GitHub Actions, add a `.github/workflows/semgrep.yml` file to your repository. Follow the [workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions). See this [example GitHub Actions workflow configuration](sample-ci-configs.md#github-actions) for Semgrep CI.

## Adding to GitLab CI/CD

To add Semgrep CI to GitLab CI/CD, add a `.gitlab-ci.yml` file to your repository if not already present. Add a block to this file to run the Semgrep CI job in your pipeline, following [GitLab’s configuration guide for the .gitlab-ci.yml file](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html). See this [example GitLab CI/CD configuration](sample-ci-configs.md#gitlab-ci) for Semgrep CI.

## Adding to other CI environments

To run Semgrep CI in other CI environments, use the [`returntocorp/semgrep-agent:v1` Docker image](semgrep-ci.md#packaging), and run this command in your Docker container:

```sh
semgrep-agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_APP_TOKEN
```

To get [CI context awareness](semgrep-ci.md#features), you can optionally provide the following environment variables:

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

For [diff-aware scans](semgrep-ci.md#features), set the `--baseline-ref` flag to the git ref (branch name, tag, or commit hash) to use as a baseline. For example, to report findings newly added since branching off from your `main` branch, run

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
- Codeship
- Codefresh
- GitHub Actions [(sample configuration)](sample-ci-configs.md#github-actions)
- GitLab CI [(sample configuration)](sample-ci-configs.md#gitlab-ci)
- Jenkins
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

## Selecting rules and rulesets

Semgrep CI lets you scan code with rules and rulesets published through the [Semgrep Registry](https://semgrep.dev/explore), individual users’ saved rules (snippets), or a combination of both. Each has an associated configuration indicator, for example:

- Rulesets use indicators like `p/security-audit` ([a popular auditing ruleset](https://semgrep.dev/p/r2c-security-audit))
- Individual rules use indicators like `r/javascript.lang.security.spawn-git-clone.spawn-git-clone` ([a rule to prevent remote `whoami` execution](https://semgrep.dev/r/javascript.lang.security.spawn-git-clone))
- User snippets saved from the [Semgrep Playground](https://semgrep.dev/editor) use indicators like `s/xYz` or `s/john:named-rule`

See the sections below to learn how to specify rules and rulesets in different CI environments. If no rule configuration is found, Semgrep CI will look for rules specified by configs in the `.semgrep.yml` file in your repository, or load all rules from the `.semgrep/` directory in your repository. If none of these provide a configuration, Semgrep CI will exit with a failing status code.

### Specifying rule configuration in GitHub Actions

In your repository’s `.github/workflows/semgrep.yml` file, use the `config:` key inside `with:` to specify a rule configuration in the job that runs Semgrep CI in your workflow. You may specify multiple configurations, each on its own `config:` line inside `with:`. See this [example GitHub Actions workflow configuration](sample-ci-configs.md#github-actions).

### Specifying rule configuration in GitLab CI/CD

In your repository’s `.gitlab-ci.yml` file, specify rule configurations using the variable `INPUT_CONFIG` inside the job that runs Semgrep CI in your pipeline. You may specify multiple configurations, each on its own line. See this [example GitLab CI/CD configuration](sample-ci-configs.md#gitlab-ci).

## Ignoring files & directories

Semgrep CI uses a default ignore list that skips common test, build, and dependency directories, including `tests/`, `node_modules/`, `vendor/`, and more. See the full list of ignored items in [the `.semgrepignore` template file](https://github.com/returntocorp/semgrep-action/blob/v1/src/semgrep_agent/templates/.semgrepignore).

To override the default ignore patterns, create a file named `.semgrepignore` and commit it to the root of your repository. It uses the same syntax as `.gitignore`. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

!!! warning
    `.semgrepignore` is picked up only by Semgrep CI, and is not honored when running Semgrep CLI manually or by the [GitLab Semgrep SAST Analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep).

For information on ignoring findings in code, see the [ignoring findings page](ignoring-findings.md).

## Audit mode: disable blocking on a specific CI event

If you want to see findings from your whole repository instead of just the files changed by a pull request, you'd normally set up scans on pushes to your main branch. This can prove difficult when you already have existing issues that Semgrep finds on the main branch — you probably don't want CI to fail all builds on the main branch until every single finding is addressed. For this case, try using audit mode. In audit mode, Semgrep will collect findings data for you to review, but will never fail the build due to findings.

To enable this, set the `--audit-on event_name` flag.

!!! info
    The most common event names on GitHub are `push` and `pull_request`. To enable audit mode on pushes in GitHub Actions, set the option `auditOn: push` in your workflow file.

    In GitLab, set `allow_failure: true` for the Semgrep CI job in your `.gitlab-ci.yml` file.

    For other CI providers, look for the correct event name in CI environment’s log output.

# Connecting to Semgrep App

To use your Semgrep App account, set `--publish-deployment` and `--publish-token`. These act as your username and password for authentication. You can find the right values for these variables on the [Dashboard > Settings](https://semgrep.dev/manage/settings) page.

## Ignoring specific rules in a ruleset or policy

You can customize the ruleset you're using to ignore some of its rules by [editing the Semgrep App policy](managing-policy.md#editing-a-policy) used for your scans.

## Getting notifications instead of blocking builds

Some rules point out hotspots that require careful review but are not certain to be insecure code. You might want to disable blocking when scanning with such rules, and instead use a [CI integration](integrations.md) to get notifications.

You can set this up by [changing the actions of the Semgrep App policy](managing-policy.md#changing-policy-actions) used for your scans.

# Technical details

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
