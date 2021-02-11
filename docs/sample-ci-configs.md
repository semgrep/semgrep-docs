# Sample CI Configurations

The sample configuration files below
run [Semgrep CI](https://github.com/returntocorp/semgrep-action)
on various continuous integration providers.

These samples all connect to a [Semgrep App](https://semgrep.dev/manage) account.
The configurations refer to `SEMGREP_DEPLOYMENT_ID` and `SEMGREP_APP_TOKEN`,
which are essentially a username and a password.
You can find the correct values for these variables
on the [Dashboard > Settings](https://semgrep.dev/manage/settings) page.

If you don't want to use an online account,
you can remove the usages of these variables,
and instead use the `--config` flag
to set which rules to scan with.

[TOC]

!!! danger
    `SEMGREP_APP_TOKEN` is a secret value: **do not hardcode it and leak credentials!**
    Use your CI provider's secret or environment variable management feature to store it.

## GitHub Actions

Semgrep CI will [auto-detect CI context](semgrep-ci.md#features)
when running in GitHub Actions.
Scans on pull requests will report only newly added findings.

The easiest way to set up Semgrep CI integration in GitHub Actions
is via [Dashboard > Projects](https://semgrep.dev/manage/projects) in Semgrep App.
The app can generate and commit a workflow YAML file
to your project based on the settings you select.
You can also copy the file contents
and commit them to `.github/workflows/semgrep.yml` manually,
or write your own workflow file based on this sample:

<!-- TODO: move to Semgrep App docs

TODO: @luke said Taking this in a different direction, what do you think of providing problem-focused instructions that place auto project-setup instructions under something more like "Rolling out Semgrep at your org" or "Adding Semgrep to many projects"?

When you install Semgrep on a GitHub organization,
you select which repositories should be visible to Semgrep.
The ones you select will appear on the [Projects page](https://semgrep.dev/manage/projects).

!!! info
    You can update this list of selected repositories at any time
    through your organization's settings page on GitHub.
    Just go to Settings > Installed GitHub Apps > semgrep.dev > Configure
    and make your changes in the 'Repository access' section.
  
To set up Semgrep CI in GitHub Actions on one of these projects,
click its "Set up" button
on the [Projects page](https://semgrep.dev/manage/projects).
You will be taken to a page where you can configure
exactly how you want the CI job to behave.
We recommend using Semgrep with the default settings.
TODO: @pablo said to link info about the defaults

Semgrep will then commit a CI workflow file to your repository.
Please temporarily disable any branch protection rules
that might block writes to your default branch.

-->

<details id="sample-github-actions-workflow"><summary>Sample GitHub Actions workflow file</summary>
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
      - uses: actions/checkout@v2

      # Scan code using project's configuration on https://semgrep.dev/manage
      - uses: returntocorp/semgrep-action@v1

        # Set GITHUB_TOKEN to leave automatic comments on your pull requests.
        #env:
        #  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

        with:
          publishToken: ${{ secrets.SEMGREP_TOKEN }}
          publishDeployment: ${{ secrets.SEMGREP_DEPLOYMENT_ID }}

          # never fail the build due to findings on pushes, but collect findings data
          #auditOn: push

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

<a name="inline-pr-comments-beta"></a>
<br />

### Pull Request Comments (beta)

<!-- TODO: Move to Semgrep App docs -->

!!! info
    This feature is currently only available for GitHub.

You can set Semgrep App policies to post inline PR comments on your pull requests.
For this to work,
you need to set the `GITHUB_TOKEN` environment variable in your workflow file to `secrets.GITHUB_TOKEN`,
which is the GitHub app installation access token and takes the form of this snippet:

```yaml
uses: returntocorp/semgrep-action@v1
        env: # Optional environment variable for automatic PR comments (beta)
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

See a complete example of this workflow file including this environment variable (commented out) in the [above sample workflow file](#sample-github-actions-workflow).

!!! info
    Unlike `secrets.SEMGREP_TOKEN`,
    there’s no need to create `secrets.GITHUB_TOKEN` yourself
    because it’s automatically set by GitHub.
    It only needs to be passed to the action via the workflow file.

Comments are left when Semgrep CI finds a result that blocks CI.
Note that this feature is experimental; please reach out to support@r2c.dev to report any issues.

## GitLab CI

Semgrep CI will [auto-detect CI context](semgrep-ci.md#features)
when running in GitHub Actions.
Scans on pull requests will report only newly added findings.

The [`template` used in this sample](https://docs.gitlab.com/ee/ci/yaml/#workflowrules-templates) configuration
will run Semgrep on pushes to merge requests, your default branch, and tags.
Feel free to replace this with another set of events you'd like to run on.

<p>

```yaml
include:
  - template: "Workflows/MergeRequest-Pipelines.gitlab-ci.yml"

semgrep:
  image: returntocorp/semgrep-agent:v1
  script:
    - python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_TOKEN
```

</p>

## Buildkite

<p>

```yaml
- label: ":semgrep: Semgrep"
  command: python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID" --publish-token $SEMGREP_TOKEN
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

## CircleCI

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
              --publish-token $SEMGREP_TOKEN \
              --baseline-ref << parameters.default_branch >>
workflows:
  main:
    jobs:
      - semgrep-scan
```

</p>

## Other providers

To run Semgrep CI on any other provider,
use the [`returntocorp/semgrep-agent:v1` Docker image](semgrep-ci.md#packaging),
and run this command in your Docker container:

```sh
python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_TOKEN
```

To get [CI context awareness](semgrep-ci.md#features),
you can optionally provide the following environment variables:

<p>

```sh
# Set additional environment variables
SEMGREP_BRANCH=mybranch
SEMGREP_COMMIT=abcd1234  # commit SHA being scanned
SEMGREP_JOB_URL=https://example.com/me/myjob  # URL to CI logs
SEMGREP_REPO_NAME=myorg/myrepository  # project name to show on Semgrep App
SEMGREP_REPO_URL=https://gitwebsite.com/myrepository
SEMGREP_PR_ID=123
SEMGREP_PR_TITLE="Added four new bugs"  # shown in Slack notifications if set

# Run semgrep_agent
python -m semgrep_agent --publish-deployment $SEMGREP_DEPLOYMENT_ID --publish-token $SEMGREP_TOKEN
```

</p>

For [diff-aware scans](semgrep-ci.md#features), set the `--baseline-ref` flag
to the git ref (branch name, tag, or commit hash) to use as a baseline.
For example, to report findings newly added
since branching off from your `main` branch, run

```sh
python -m semgrep_agent --baseline-ref main
```

Using these instructions, you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo
- Bitbucket Pipelines
- Bitrise
- Buildbot
- Buildkite [(sample configuration)](#buildkite)
- CircleCI [(sample configuration)](#circleci)
- Codeship
- Codefresh
- GitHub Actions [(sample configuration)](#github-actions)
- GitLab CI [(sample configuration)](#gitlab-ci)
- Jenkins
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue here](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).
