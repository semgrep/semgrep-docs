---
slug: sample-ci-configs
append_help_link: true
description: "View sample configuration files to run Semgrep with various CI/CD providers such as GitHub, GitLab, Jenkins, Buildkite, CircleCI, and more."
title: Sample CI configurations
hide_title: true
tags:
    - Semgrep in CI
    - Team & Enterprise Tier
---

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

import MoreHelp from "/src/components/MoreHelp"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Import code snippets.
Read /src/components/code_snippets/readme to understand modular code snippet imports. -->

<!-- GHA -->
import GhaSemgrepAppSast from "/src/components/code_snippets/_gha-semgrep-app-sast.mdx"
import GhaSemgrepAppSastDash from "/src/components/code_snippets/_gha-semgrep-app-sast-dash.mdx"
import GhaSemgrepOssSast from "/src/components/code_snippets/_gha-semgrep-oss-sast.mdx"

<!-- GLCICD -->
import GlcicdSemgrepAppSast from "/src/components/code_snippets/_glcicd-semgrep-app-sast.mdx"
import GlcicdSemgrepAppSastDash from "/src/components/code_snippets/_glcicd-semgrep-app-sast-dash.mdx"

<!-- import GlcicdSemgrepOssSast from "/src/components/code_snippets/_glcicd-semgrep-oss-sast.mdx" -->

<!-- Jenkins -->
import JenkinsSemgrepAppSast from "/src/components/code_snippets/_jenkins-semgrep-app-sast.mdx"
import JenkinsSemgrepAppSsc from "/src/components/code_snippets/_jenkins-semgrep-app-ssc.mdx"
import JenkinsSemgrepAppSastDocker from "/src/components/code_snippets/_jenkins-semgrep-app-sast-docker.mdx"

<!--Bitbucket Pipelines -->
import BitbucketSemgrepAppSast from "/src/components/code_snippets/_bitbucket-semgrep-app-sast.mdx"
import BitbucketSemgrepAppSsc from "/src/components/code_snippets/_bitbucket-semgrep-app-ssc.mdx"

<!-- Buildkite -->
import BuildkiteSemgrepAppSast from "/src/components/code_snippets/_buildkite-semgrep-app-sast.mdx"
import BuildkiteSemgrepAppSsc from "/src/components/code_snippets/_buildkite-semgrep-app-ssc.mdx"

<!-- CircleCI -->
import CircleCiSemgrepAppSast from "/src/components/code_snippets/_circleci-semgrep-app-sast.mdx"
import CircleCiSemgrepAppSsc from "/src/components/code_snippets/_circleci-semgrep-app-ssc.mdx"

<!-- Azure Pipelines -->
import AzureSemgrepAppSast from "/src/components/code_snippets/_azure-semgrep-app-sast.mdx"
import AzureSemgrepAppSsc from "/src/components/code_snippets/_azure-semgrep-app-ssc.mdx"

import ScmFeatureReference from "/src/components/reference/_scm-feature-reference.md"

# Sample continuous integration (CI) configurations

This document provides sample configuration snippets to run Semgrep CI on various continuous integration (CI) providers.

## Feature support

Support for certain features of Semgrep Cloud Platform depend on your CI provider or source code management tool (SCM). The following table breaks down the features and their availability:

<ScmFeatureReference />

<!-- The following list is not alphabetized. It is ranked based on popularity. -->
<!-- Titles for tabs are based on the most recognizable product name; they don't have to be parallel -->

## GitHub Actions

To add a Semgrep configuration file in your GitHub Actions pipeline:

1. Create a `semgrep.yml` file in `.github/workflows` in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample GitHub Actions configuration file](#sample-github-actions-configuration-file).
3. Paste the relevant code snippet to `semgrep.yml` file. This is your Semgrep configuration file for GitHub Actions.
4. Commit the configuration file under <code><span className="placeholder">/REPOSITORY-ROOT-DIRECTORY/.github/workflows/semgrep.yml</span></code>.
5. The Semgrep job starts automatically upon detecting the committed `semgrep.yml` file. 

:::note
If you are self-hosting your repository, you must [use a self-hosted runner](https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job#choosing-self-hosted-runners).
:::
### Sample GitHub Actions configuration file

<Tabs
    defaultValue="gha-semgrep"
    values={[
    {label: 'Default', value: 'gha-semgrep'},
    {label: 'Semgrep OSS', value: 'gha-oss'},
    ]}
>

<TabItem value='gha-semgrep'>

The following configuration creates a CI job that runs scans depending on what products you have enabled in Semgrep Cloud Platform.

<GhaSemgrepAppSast />

You can **run specific product scans** by passing an argument, such as `--supply-chain`. View the [list of arguments](/getting-started/cli/#scan-using-specific-semgrep-products). 

</TabItem>


<TabItem value='gha-oss'>

The following configuration creates a CI job that runs Semgrep OSS SAST scans using rules configured for your programming language.

<GhaSemgrepOssSast />

You can customize the scan by entering custom rules or other rulesets to scan with. See [Scan your codebase with a specific ruleset](/getting-started/cli-oss/#scan-your-codebase-with-a-specific-ruleset).

</TabItem>

</Tabs>


:::caution
If you define both `branches` or `branches-ignore` *and* `paths` or `paths-ignore`, the workflow only runs when both filters are satisfied.

For example, if your configuration file includes the following definition, the workflow runs only if there are changes on the `development` branch to `.github/workflows/semgrep.yml` :

```yaml
push:
  branches:
    - development
  paths:
    - .github/workflows/semgrep.yml
```
:::

#### Upload findings to GitHub Advanced Security Dashboard

<details><summary>Alternate job that uploads findings to GitHub Advanced Security Dashboard</summary>

<GhaSemgrepAppSastDash />

</details>

## GitLab CI/CD

To add a Semgrep configuration snippet in your GitLab CI/CD pipeline:

1. Create or edit your `.gitlab-ci.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample GitLab CI/CD configuration snippet](#sample-gitlab-cicd-configuration-snippet), and then paste it to your `.gitlab-ci.yml` file.
3. Commit the updated `.gitlab-ci.yml` file.
4. The Semgrep job starts automatically upon detecting the committed `.gitlab-ci.yml` file. You can also view the job from your GitLab project's **CI/CD > Pipelines** page. 

### Sample GitLab CI/CD configuration snippet

<Tabs
    defaultValue="glcicd-semgrep"
    values={[
    {label: 'Default', value: 'glcicd-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'glcicd-ssc'},
    ]}
>

<TabItem value='glcicd-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<GlcicdSemgrepAppSast />

</TabItem>

<TabItem value='glcicd-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<GlcicdSemgrepAppSsc />

</TabItem>
</Tabs>

#### Upload findings to GitLab Security Dashboard

<details><summary>Alternate job that uploads findings to GitLab Security Dashboard</summary>

<GlcicdSemgrepAppSastDash />

</details>

## Jenkins

:::note
Your UI (user interface) may vary depending on your Jenkins installation. These steps use a Classic UI Jenkins interface.
:::

To add a Semgrep configuration snippet in your Jenkins pipeline:

1. Create or edit your `Jenkinsfile` configuration file in the repository you want to scan. You can also edit your `Jenkinsfile` from Jenkins's interface.
2. Copy the relevant code snippet provided in [Sample Jenkins configuration snippet](#sample-jenkins-configuration-snippet).
3. Paste the code to your `Jenkinsfile`, and then commit the file.
4. The Semgrep job starts automatically upon detecting the `Jenkinsfile` update.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

### Sample Jenkins configuration snippet

<Tabs
    defaultValue="jenkins-semgrep"
    values={[
    {label: 'Default', value: 'jenkins-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'jenkins-ssc'},
    {label: 'Default (Docker)', value: 'jenkins-semgrep-docker'},
    ]}
>

:::info
For SCA scans (Semgrep Supply Chain): users of Jenkins UI with the Git plugin must also set up their branch information. See [Setting up Semgrep Supply Chain with Jenkins UI](/semgrep-supply-chain/setup-jenkins-ui) for more information.
:::

<TabItem value='jenkins-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<JenkinsSemgrepAppSast />

</TabItem>

<TabItem value='jenkins-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<JenkinsSemgrepAppSsc />

</TabItem>

<TabItem value='jenkins-semgrep-docker'>

<JenkinsSemgrepAppSastDocker />

</TabItem>
</Tabs>

## Bitbucket Pipelines

To add a Semgrep configuration snippet into Bitbucket Pipelines:

1. Create or edit your `bitbucket-pipelines.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample Bitbucket Pipelines configuration snippet](#sample-bitbucket-pipelines-configuration-snippet), and then paste it to your `bitbucket-pipelines.yml`.
3. Commit the updated `bitbucket-pipelines.yml` configuration file.
4. The Semgrep job starts automatically upon detecting the committed `bitbucket-pipelines.yml` file. You can also view the job through Bitbucket's interface, by clicking **your repository > Pipelines**.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can also be performed through Bitbucket's UI wizard. This UI wizard can be accessed through **Bitbucket > your repository > Pipelines > Create your first pipeline**.
:::

### Sample Bitbucket Pipelines configuration snippet

<Tabs
    defaultValue="bitbucket-semgrep"
    values={[
    {label: 'Default', value: 'bitbucket-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'bitbucket-ssc'},
    ]}
>

<TabItem value='bitbucket-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<BitbucketSemgrepAppSast />

</TabItem>

<TabItem value='bitbucket-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<BitbucketSemgrepAppSsc />

</TabItem>
</Tabs>


## Buildkite

To add Semgrep into your Buildkite pipeline:

1. Create or edit a `pipeline.yml` configuration file to add a Semgrep command as part of your pipeline. Refer to the [BuildKite code snippet](#buildkite-code-snippet). This configuration file can also be stored within Buildkite.
2. Copy the relevant code snippet provided in [Sample Buildkite configuration snippet](#sample-buildkite-configuration-snippet).
3. If you are using Buildkite to store the configuration, save the updated file. Otherwise, commit the updated configuration file into the `/.buildkite` folder within the target repository.
4. The Semgrep job starts automatically upon detecting the committed `pipeline.yml` file. You can also view the job through Buildkite's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can be performed from within Buildkite's interface. From Buildkite's main page, click **Pipelines > ➕ button** to perform these steps within Buildkite's UI.
:::

### Sample Buildkite configuration snippet

<Tabs
    defaultValue="buildkite-semgrep"
    values={[
    {label: 'Default', value: 'buildkite-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'buildkite-ssc'},
    ]}
>

<TabItem value='buildkite-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<BuildkiteSemgrepAppSast />

</TabItem>

<TabItem value='buildkite-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<BuildkiteSemgrepAppSsc />

</TabItem>
</Tabs>

## CircleCI

To add Semgrep into your CircleCI pipeline:

1. Create a [context](https://circleci.com/docs/contexts/):
    1. In CircleCI web app, click **Organization Settings** > **Contexts**. 
    2. Click **Create Context**.
    3. Enter `semgrep` as the name for the context.
    4. Click **Add Environment Variable** and enter your `SEMGREP_APP_TOKEN`.
2. Create or edit your `config.yml` configuration file in the repository you want to scan.
3. Copy the relevant code snippet provided in [Sample CircleCI configuration snippet](#sample-circleci-configuration-snippet).
4. If your default branch is not `main`, change the occurrences of `main` to the name of your default branch.
4. Commit the updated `config.yml` configuration file into the `/.circleci` folder in the target repository.
5. The Semgrep job starts automatically upon detecting the `config.yml` update.

The sample configuration provides jobs for both full scanning and [diff-aware scanning](/docs/semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform/#diff-aware-scanning), which scans only changed files in PRs or MRs. You do not need to create any other jobs.

CircleCI runs the Semgrep job on all the commits for the project by default. If you want the job to scan only branches that have an associated a pull request open, you can enable the option "Only build pull requests" in **Project Settings** > **Advanced**.

:::note
For the default branch and tags, CircleCI always runs the Semgrep CI job on all commits.
:::

### Sample CircleCI configuration snippet

<Tabs
    defaultValue="circleci-semgrep"
    values={[
    {label: 'Default', value: 'circleci-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'circleci-ssc'},
    ]}
>


<TabItem value='circleci-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<CircleCiSemgrepAppSast /> 

</TabItem>

<TabItem value='circleci-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<CircleCiSemgrepAppSsc /> 

</TabItem>
</Tabs> 

## Azure Pipelines

:::info
Scanning a project with the `semgrep ci` command requires the project to be version-controlled by Git. If you have Azure Repos that are version-controlled with [Team Foundations Version Control](https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/what-is-tfvc?view=azure-devops), they must be migrated to Git to be scanned with `semgrep ci` and have results reported to the Semgrep Cloud Platform.
:::

To add Semgrep into Azure Pipelines:

1. Access the YAML pipeline editor within Azure Pipelines by following the [YAML pipeline editor](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/yaml-pipeline-editor?view=azure-devops#edit-a-yaml-pipeline) guide.
2. Copy the relevant code snippet provided in [Sample Azure Pipelines configuration snippet](#sample-azure-pipelines-configuration-snippet) into the Azure Pipelines YAML editor.
3. Save the code snippet.
4. Set [environment variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables).
5. Group the environment variables as a [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=classic).
6. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-4 and adding `SEMGREP_BASELINE_REF` as an environment variable. 

### Sample Azure Pipelines configuration snippet

<Tabs
    defaultValue="azure-semgrep"
    values={[
    {label: 'Default', value: 'azure-semgrep'},
    {label: 'Semgrep Supply Chain', value: 'azure-ssc'},
    ]}
>

<TabItem value='azure-semgrep'>

The following configuration creates a CI job that runs a SAST and SCA scan using both Semgrep Code and Semgrep Supply Chain.

<AzureSemgrepAppSast /> 

</TabItem>

<TabItem value='azure-ssc'>

The following configuration creates a CI job that runs an SCA scan using Semgrep Supply Chain.

<AzureSemgrepAppSsc /> w

</TabItem>
</Tabs>

## Other providers

To run Semgrep CI on any other provider, use the `semgrep/semgrep` image, and run the `semgrep ci` command with `SEMGREP_BASELINE_REF` set for diff-aware scanning.

**Note**: If you need to use a different image than docker, install Semgrep CI by `pip install semgrep`.

By setting various [CI environment variables](/semgrep-ci/ci-environment-variables), you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo 
- Bitrise
- Buildbot
- Codeship
- Codefresh
- Drone CI
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue](https://github.com/semgrep/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

<MoreHelp />
