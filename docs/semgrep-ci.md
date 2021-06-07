---
append_help_link: true
meta_description: |-
  Semgrep CI is a wrapper around Semgrep CLI that adds convenient features for use in CI environments, such as in GitHub Actions or GitLab CI/CD. Rapidly scan every commit and get started despite existing bugs with Semgrep CI.
---

# Semgrep CI

[TODO] - Image of Semgrep, Semgrep CI, CI Environments (GitHub, GitLab, etc.), and optional App connection with external integrations (i.e. illustative "architecture" diagram)

[Semgrep CI](https://github.com/returntocorp/semgrep-action) (aka Semgrep Action or `semgrep-agent`) is a specialized Docker image for running Semgrep in CI environments. It can be used stand-alone or authenticated with [Semgrep App](https://semgrep.dev/login) for centralized rule and findings management.

- **Scan every commit**. Semgrep CI rapidly scans modified files on pull and merge requests, with longer full project scans configurable on merges to specific branches. Quick scans protect developer productivity.
- **Block new bugs**. You shouldn't have to fix existing bugs just to adopt a tool. Semgrep CI reports newly introduced issues on pull and merge requests, scanning them at their base and HEAD commits to compare findings. Developers are signficantly more likely to fix the issues they introduced themselves on PRs and MRs.
- **Get findings where you work**. Semgrep CI can authenticate to [Semgrep App](https://semgrep.dev/login) to surface findings in Slack, on PRs and MRs via inline comments, email, and other 3rd party services.

!!! note
    Semgrep CI runs fully in your build environment: code is never sent anywhere.

# Table of contents

[TOC]

# Getting started

Semgrep CI behaves like other static analysis and linting tools: it runs a set of user-configured rules and returns a non-zero exit code if there are findings, resulting in its job showing a ✅ or ❌.

[TODO image - GitHub Action + GitLab CI/CD checkmark]

Start by copying the below relevant template for your CI provider. Read through the comments in the template to adjust when and what Semgrep CI scans, selecting pull and merge requests, merges to branches, or both.

Once Semgrep CI is running, explore the [Semgrep Registry](TODO) to find and add more project-specific rules.

See [Advanced Configuration](TODO) for further customizations, such as ignoring files and tuning performance.

## GitHub Actions

!!! note
    You can add Semgrep CI automatically to a GitHub repository by clicking "Set up" on the [Projects page](https://semgrep.dev/manage/projects) of Semgrep App. You'll be able to adjust pull request and  merge behavior before Semgrep App asks to commit a workflow file to your repository.

To manually add Semgrep CI to GitHub Actions, add a `.github/workflows/semgrep.yml` file to your repository. Follow the [workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions). See this [example GitHub Actions workflow configuration](sample-ci-configs.md#github-actions) for Semgrep CI.

## GitLab CI/CD

!!! info
    Automatic setup is coming to GitLab CI/CD soon, where Semgrep App can commit Semgrep CI configurations to your projects. [Sign up for the beta here](TODO)!

To add Semgrep CI to GitLab CI/CD, add a `.gitlab-ci.yml` file to your repository if not already present. Add a block to run the Semgrep CI job in your pipeline, following [GitLab’s configuration guide for the .gitlab-ci.yml file](https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html). See this [example GitLab CI/CD configuration](sample-ci-configs.md#gitlab-ci) for Semgrep CI.

## Other CI providers

To add Semgrep CI to any CI environment, use the [`returntocorp/semgrep-agent:v1`](https://hub.docker.com/r/returntocorp/semgrep-agent) Docker image directly:

For full project scans:

```sh
$ docker run -v $(pwd):/src --workdir /src returntocorp/semgrep-agent:v1 semgrep-agent --config p/ci --config <other rule or rulesets>

# [TODO make less app specific, specify configs???]
```

For pull or merge request scans that return only newly introduced issues, set the `--baseline-ref` flag to the git ref (branch name, tag, or commit hash) to use as a baseline. Semgrep will determine the files that have been modified since this reference point and return only newly introduced issues. For example, to report findings newly added since branching off from your `main` branch, run

```sh
semgrep-agent --baseline-ref main
```

To connect your Semgrep CI scans to Semgrep App, you can optionally provide the following environment variables:

<details><summary>Environment Variables</summary>
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
</details>
</br>
These instructions have been used on the following providers by the community:

[ TODO ] - Add small svg icons before references to CI/CD systems? Make sure sample configs aren't app-specific

| CI Providers         |                       |  
|:---------- |:---------------------------|
| Bitbucket Pipelines | Codeship |
| Bitrise | GitHub Actions [(sample configuration)](sample-ci-configs.md#github-actions) |
| Buildbot | GitLab CI [(sample configuration)](sample-ci-configs.md#gitlab-ci) |
| Buildkite [(sample configuration)](sample-ci-configs.md#buildkite) | Jenkins |
| CircleCI [(sample configuration)](sample-ci-configs.md#circleci) | TeamCity CI |
| Codefresh | Travis CI |

# Reviewing Findings

## Scan output

Semgrep CI exits with exit code 1 if the scan returned any findings.
This will cause your CI provider to show a ❌ next to the job.
You can find a description of the findings in the log output.

<details>
<summary>Click for an example of Semgrep CI's job output</summary>
```text

=== looking for current issues in 1 file
| 1 current issue found
=== looking for pre-existing issues in 1 file
| No pre-existing issues found

python.flask.security.injection.os-system-injection.os-system-injection
     > flask_todomvc/todos.py:30
     ╷
   30│   os.system(id)
     ╵
     = User data detected in os.system. This could be vulnerable to a command
       injection and should be avoided. If this must be done, use the
       'subprocess' module instead and pass the arguments as a list.

=== exiting with failing status

```

</details>
</br>

!!! note
    Rules are 'blocking' by default and behave as described above.
    When connected to Semgrep App, you can also add non-blocking rules to your scans.
    Non-blocking rules return non-blocking findings which notify you via an [integration](#integrations)
    but do not show up in log output,
    and do not cause jobs to fail with a ❌.

## Integrations

Semgrep CI comes with many integrations with other services,
to get you results in the workflow you're already used to,
whether you're a developer or part of a security team.

### Notifications

<p style="text-align: center; font-size: 12px">
    <img width="600px" src="../img/slack-notification.png" alt="Screenshot of a Slack notification describing the details of a finding"/><br/>
    A Slack notification triggered by new findings in a pull request
</p>

You can get notified about new findings via:

- [GitHub pull request comments](integrations.md#pull-request-comments)
- GitLab merge request comments (private beta TODO: apply here)
- [Slack messages](integrations.md#slack)
- [emails](integrations.md#email)
- [webhooks (paid feature)](integrations.md#webhooks)

Notifications require connection to Semgrep App. To set up notifications:

1. Follow the links above to create a notification channel
2. [Add the created channel to one or more policies](managing-policy/#changing-policy-actions)
as a policy action. Only the rules in these policies will trigger notifications.

!!! note
    Notifications will be sent only the first time a given finding is seen.

    Because of Semgrep CI's diff-awareness, you will not be notified
    when a pull request has a finding that existed on the base branch already,
    even if that line is moved or re-indented.

    Semgrep App also keeps track of notifications that have already been sent,
    so consecutive scans of the same changes in the same pull request
    won't send duplicate notifications either.

### Security Dashboards

<p style="text-align: center; font-size: 12px">
    <img width="600px" src="../img/semgrep-app-overview.png" alt="Screenshot of Semgrep App's findings dashboard showing a bar chart of findings over time, and a list of the most recent findings"/><br/>
    Semgrep App's findings overview page
</p>

A security dashboard gives you an overview of all your findings organization-wide.
You can review Semgrep CI's findings via:

- [GitLab SAST Security Dashboard](https://docs.gitlab.com/ee/user/application_security/security_dashboard/) (requires GitLab Ultimate subscription)
- [GitHub Advanced Security Dashboard](https://docs.github.com/en/github/getting-started-with-github/learning-about-github/about-github-advanced-security) (requires GitHub Enterprise subscription)
- [Semgrep App](https://semgrep.dev/manage) (free)

# Advanced Configuration

## Registry rules and rulesets

!!! info
    These instructions apply to stand-alone Semgrep CI use. For use with Semgrep App please use the "Add to policy" button next to any registry rule or ruleset, or visit [Dashboard > Policies](https://semgrep.dev/manage/policies).

Semgrep CI accepts a list of rules and rulesets to run on each scan. To add from the [Semgrep Registry](https://semgrep.dev/explore), just include the rule or ruleset identifier in your CI workflow file. Identifiers take the form `p/<ruleset-id>` and `r/<rule-id>`. These identifiers can be copied directly for any rule or ruleset directly from the Registry, and run locally using the `--config <identifier>` flag with the [Semgrep command-line tool](TODO).

For example, in GitLab CI/CD:

```yaml
# ...
 variables:
    SEMGREP_RULES: >-
      p/security-audit
      p/secrets
# ...
```

Key names and configuration format for specific CI providers are available in the [Getting Started templates](#getting-started).

## Custom rules

!!! info
    See [Writing rules](writing-rules/overview.md) to learn how to write custome rules.

Your own custom rules can be added to your Semgrep CI configuration just like [Registry rules](#registry-rules-and-rulesets) by:

1. Including their [Playground](https://semgrep.dev/editor) share ID (e.g. `s/susan:named-rule`)
2. Adding the directory or file path to the local file containing the rule
3. Adding the rule to a `.semgrep/` directory, which is included by default

For example, in GitLab CI/CD:

```yaml
# ...
 variables:
    SEMGREP_RULES: >-
      s/dlukeomalley:translation-of-non-string  # Playground share ID
      no-exec.yml                               # File containing one or more rules
      .semgrep/                                 # Directory containing rule yaml files 
# ...
```

If configuration is provided and no `.semgrep.yml` or `.semgrep/` directory exists, Semgrep CI will exit with a non-zero error code.

[ TODO - QA this and make sure the logic is right]

## Ignoring files

Semgrep CI supports a `.semgrepignore` file that follows the `.gitignore` syntax and is used to skip files and directories during scanning. This is commonly used to avoid vendored and test related code. For a complete example, see the [.semgrepignore file on Semgrep’s source code](https://github.com/returntocorp/semgrep/blob/develop/.semgrepignore).

!!! warning
    `.semgrepignore` is only used by Semgrep CI and is not honored by the Semgrep command-line tool or by integrations like [GitLab's Semgrep SAST Analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep).

By default Semgrep CI skips files and directories such as `tests/`, `node_modules/`, and `vendor/`. The full list of ignored items is in [the `.semgrepignore` template file](https://github.com/returntocorp/semgrep-action/blob/v1/src/semgrep_agent/templates/.semgrepignore), which is used by Semgrep CI when no explicit `.semgrepignore` file is found in the root of your project.

For information on ignoring individual findings in code, see the [ignoring findings page](ignoring-findings.md).

## Audit scans

Disable blocking on a specific CI event.

If you want to see findings from your whole repository instead of just the files changed by a pull request, you’d normally set up scans on pushes to your main branch. This can prove difficult when you already have existing issues that Semgrep finds on the main branch—you probably don’t want CI to fail all builds on the main branch until every single finding is addressed. For this case, try using audit mode. In audit mode, Semgrep will collect findings data for you to review, but will never fail the build due to findings.

!!! info
    In GitHub Actions, the most common event names are `push` and `pull_request`. To enable audit mode on branch pushes in GitHub Actions, set the option `auditOn: push` in your workflow file.

    <!-- In GitLab, set `allow_failure: true` for the Semgrep CI job in your `.gitlab-ci.yml` file.  TODO: confirm GitLab behavior and vars -->

    For other CI providers, look for the correct event name in CI environment’s log output.

## Exit behavior

[TODO]

## Semgrep App authentication

To use your Semgrep App account, set `--publish-deployment` and `--publish-token`. These act as your username and password for authentication. You can find the right values for these variables on the [Dashboard > Settings](https://semgrep.dev/manage/settings) page.

### Ignoring specific rules in a ruleset or policy

You can customize the ruleset you're using to ignore some of its rules by [editing the Semgrep App policy](managing-policy.md#editing-a-policy) used for your scans.

### Getting notifications instead of blocking builds

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

<!-- # Usage outside CI

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
    that `semgrep` itself understands. -->
