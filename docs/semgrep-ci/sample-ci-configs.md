---
slug: sample-ci-configs
append_help_link: true
description: "View sample configuration files to run Semgrep with various CI/CD providers such as GitHub, GitLab, Jenkins, Buildkite, CircleCI, and more."
title: Sample CI configurations
hide_title: true
tags:
    - Semgrep in CI
    - Community Tier
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
import GhaSemgrepAppStandalone from "/src/components/code_snippets/_gha-semgrep-app-standalone.mdx"
import GhaSemgrepAppSastDash from "/src/components/code_snippets/_gha-semgrep-app-sast-dash.mdx"
import GhaSemgrepAppStandaloneDash from "/src/components/code_snippets/_gha-semgrep-app-standalone-dash.mdx"
import GhaSemgrepAppSsc from "/src/components/code_snippets/_gha-semgrep-app-ssc.mdx"

<!-- GLCICD -->
import GlcicdSemgrepAppSast from "/src/components/code_snippets/_glcicd-semgrep-app-sast.mdx"
import GlcicdSemgrepAppStandalone from "/src/components/code_snippets/_glcicd-semgrep-app-standalone.mdx"
import GlcicdSemgrepAppSastDash from "/src/components/code_snippets/_glcicd-semgrep-app-sast-dash.mdx"
import GlcicdSemgrepAppStandaloneDash from "/src/components/code_snippets/_glcicd-semgrep-app-standalone-dash.mdx"
import GlcicdSemgrepAppSsc from "/src/components/code_snippets/_glcicd-semgrep-app-ssc.mdx"

<!-- Jenkins -->
import JenkinsSemgrepAppSast from "/src/components/code_snippets/_jenkins-semgrep-app-sast.mdx"
import JenkinsSemgrepAppSsc from "/src/components/code_snippets/_jenkins-semgrep-app-ssc.mdx"
import JenkinsSemgrepAppStandalone from "/src/components/code_snippets/_jenkins-semgrep-app-standalone.mdx"

<!--BitBucket Pipelines -->
import BitbucketSemgrepAppSast from "/src/components/code_snippets/_bitbucket-semgrep-app-sast.mdx"
import BitbucketSemgrepAppSsc from "/src/components/code_snippets/_bitbucket-semgrep-app-ssc.mdx"
import BitbucketSemgrepAppStandalone from "/src/components/code_snippets/_bitbucket-semgrep-app-standalone.mdx"

<!-- Buildkite -->
import BuildkiteSemgrepAppSast from "/src/components/code_snippets/_buildkite-semgrep-app-sast.mdx"
import BuildkiteSemgrepAppSsc from "/src/components/code_snippets/_buildkite-semgrep-app-ssc.mdx"
import BuildkiteSemgrepAppStandalone from "/src/components/code_snippets/_buildkite-semgrep-app-standalone.mdx"

<!-- CircleCI -->
import CircleCiSemgrepAppSast from "/src/components/code_snippets/_circleci-semgrep-app-sast.mdx"
import CircleCiSemgrepAppSsc from "/src/components/code_snippets/_circleci-semgrep-app-ssc.mdx"
import CircleCiSemgrepAppStandalone from "/src/components/code_snippets/_circleci-semgrep-app-standalone.mdx"

<!-- Azure Pipelines -->
import AzureSemgrepAppSast from "/src/components/code_snippets/_azure-semgrep-app-sast.mdx"
import AzureSemgrepAppSsc from "/src/components/code_snippets/_azure-semgrep-app-ssc.mdx"
import AzureSemgrepAppStandalone from "/src/components/code_snippets/_azure-semgrep-app-standalone.mdx"

# Sample continuous integration (CI) configurations

This document provides sample configuration snippets to run Semgrep CI on various continuous integration (CI) providers.

## Feature support

Support for certain features of Semgrep App depend on your CI provider or source code management tool (SCM). The following table breaks down the features and their availability:

| Feature | GitHub | GitLab | BitBucket | CI Provider support |
| ------- | -------- | ------- | -------- | ---------------- |
| **Diff-aware scanning** | ✅ Yes | ✅ Yes | ✅ Yes  | ✅ Available (may need additional set up) | 
| **Hyperlinks** | ✅ Yes | ✅ Yes | ✅ Yes  |  ✅ Available (may need additional set up) |
| **SCM security dashboard** |  ✅ GitHub Advanced Security Dashboard |  ✅ GitLab SAST Dashboard | ❌ No | ❗ Only GitHub Actions and GitLab CI/CD |
| **PR or MR comments in Semgrep App** |  ✅ Yes | ✅ Yes | ❌ No | ✅ CI provider agnostic; feature support is dependent on SCM |

*Table 1.* List of features and supported SCMs and CI providers.

<dl>
    <dt>Diff-aware scanning</dt>
    <dd>Semgrep can scan changes in files when running on a pull or merge request (PR or MR). This keeps the scan fast and reduces finding duplication.</dd>
    <dt>Receiving results (findings) as PR or MR comments</dt>
    <dd>This feature enables you to receive <a href="/docs/semgrep-app/notifications/#enabling-github-pull-request-comments">PR or MR comments</a> from Semgrep App on the lines of code that generated a finding.</dd>
    <dt>Hyperlinks to code</dt>
    <dd>Semgrep App collects findings in a Findings page. In this page, you can click on a finding to view the lines of code in your repository that generated the finding.</dd>
    <dt>SCM security dashboard</dt>
    <dd>Send Semgrep findings to your SCM's security dashboard.</dd>
</dl>

<!-- The list is not alphabetized. It is ranked based on popularity. -->
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
    {label: 'CI with Semgrep App', value: 'gha-semgrep'},
    {label: 'Stand-alone CI job', value: 'gha-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'gha-ssc'},
    ]}
>

<TabItem value='gha-semgrep'>

<GhaSemgrepAppSast />

</TabItem>

<TabItem value='gha-standalone'>

<GhaSemgrepAppStandalone />

</TabItem>

<TabItem value='gha-ssc'>

<GhaSemgrepAppSsc />

</TabItem>

</Tabs>

<details><summary>Alternate job that uploads findings to GitHub Advanced Security Dashboard</summary>

<Tabs
    defaultValue="gha-semgrep-dash"
    values={[
    {label: 'CI with Semgrep App', value: 'gha-semgrep-dash'},
    {label: 'Stand-alone CI job', value: 'gha-standalone-dash'},
    ]}
>

<TabItem value='gha-semgrep-dash'>

<GhaSemgrepAppSastDash />

</TabItem>

<TabItem value='gha-standalone-dash'>

<GhaSemgrepAppStandaloneDash />

</TabItem>
</Tabs>

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
    {label: 'CI with Semgrep App', value: 'glcicd-semgrep'},
    {label: 'Stand-alone CI job', value: 'glcicd-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'glcicd-ssc'},
    ]}
>

<TabItem value='glcicd-semgrep'>

<GlcicdSemgrepAppSast />

</TabItem>

<TabItem value='glcicd-standalone'>

<GlcicdSemgrepAppStandalone />

</TabItem>
<TabItem value='glcicd-ssc'>

<GlcicdSemgrepAppSsc />

</TabItem>
</Tabs>

<details><summary>Alternate job that uploads findings to GitLab SAST Dashboard</summary>

<Tabs
    defaultValue="glcicd-semgrep-dash"
    values={[
    {label: 'CI with Semgrep App', value: 'glcicd-semgrep-dash'},
    {label: 'Stand-alone CI job', value: 'glcicd-standalone-dash'},
    ]}
>

<TabItem value='glcicd-semgrep-dash'>

<GlcicdSemgrepAppSastDash />

</TabItem>

<TabItem value='glcicd-standalone-dash'>

<GlcicdSemgrepAppStandaloneDash />

</TabItem>
</Tabs>

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
    {label: 'CI with Semgrep App', value: 'jenkins-semgrep'},
    {label: 'Stand-alone CI job', value: 'jenkins-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'jenkins-ssc'},
    ]}
>

<TabItem value='jenkins-semgrep'>

<JenkinsSemgrepAppSast />

</TabItem>

<TabItem value='jenkins-standalone'>

<JenkinsSemgrepAppStandalone />

</TabItem>

<TabItem value='jenkins-ssc'>

<JenkinsSemgrepAppSsc />

</TabItem>
</Tabs>

## Bitbucket Pipelines

To add a Semgrep configuration snippet into BitBucket Pipelines:

1. Create or edit your `bitbucket-pipelines.yml` file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample BitBucket Pipelines configuration snippet](#sample-bitbucket-pipelines-configuration-snippet), and then paste it to your `bitbucket-pipelines.yml`.
3. Commit the updated `bitbucket-pipelines.yml` configuration file.
4. The Semgrep job starts automatically upon detecting the committed `bitbucket-pipelines.yml` file. You can also view the job through BitBucket's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can also be performed through BitBucket's UI wizard. This UI wizard can be accessed through **BitBucket > your repository > Pipelines > Create your first pipeline**.
:::

### Sample BitBucket Pipelines configuration snippet

<Tabs
    defaultValue="bitbucket-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'bitbucket-semgrep'},
    {label: 'Stand-alone CI job', value: 'bitbucket-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'bitbucket-ssc'},
    ]}
>

<TabItem value='bitbucket-semgrep'>

<BitbucketSemgrepAppSast />

</TabItem>

<TabItem value='bitbucket-standalone'>

<BitbucketSemgrepAppStandalone />

</TabItem>

<TabItem value='bitbucket-ssc'>

<BitbucketSemgrepAppSsc />

</TabItem>
</Tabs>


## Buildkite

To add Semgrep into your Buildkite pipeline:

1. Create or edit a `pipeline.yml` configuration file to add a Semgrep command as part of your pipeline. Refer to the [BuildKite code snippet](#buildkite-code-snippet). This configuration file can also be stored within Buildkite.
2. Copy the relevant code snippet provided in [Sample Buildkite configuration snippet](#sample-buildkite-configuration-snippet).
3. If you are using Buildkite to store the configuration, save the updated file. Otherwise, commit the updated configuration file into the `/.buildkite` folder within the target repository.
4. The Semgrep job starts automatically upon detecting the committed `pipeline.yml` file. You can also view the job through BitBucket's interface, by clicking **your repository > Pipelines**. 
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided within the code snippet.

:::note
These steps can be performed from within Buildkite's interface. From Buildkite's main page, click **Pipelines > ➕ button** to perform these steps within Buildkite's UI.
:::

### Sample Buildkite configuration snippet

<Tabs
    defaultValue="buildkite-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'buildkite-semgrep'},
    {label: 'Stand-alone CI job', value: 'buildkite-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'buildkite-ssc'},
    ]}
>

<TabItem value='buildkite-semgrep'>

<BuildkiteSemgrepAppSast />

</TabItem>

<TabItem value='buildkite-standalone'>

<BuildkiteSemgrepAppStandalone />

</TabItem>

<TabItem value='buildkite-ssc'>

<BuildkiteSemgrepAppSsc />

</TabItem>
</Tabs>

## CircleCI

To add Semgrep into your CircleCI pipeline:

1. Create or edit your `config.yml` configuration file in the repository you want to scan.
2. Copy the relevant code snippet provided in [Sample CircleCI configuration snippet](#sample-circleci-configuration-snippet).
3. Commit the updated `config.yml` configuration file into the `/.circleci` folder in the target repository.
4. The Semgrep job starts automatically upon detecting the `config.yml` update.
5. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-3 and uncommenting the `SEMGREP_BASELINE_REF` definition provided in the code snippet.

<!-- 

Note: CircleCI snippet does NOT set the SEMGREP_APP_TOKEN in the config file.
From CSE: 
It gets set from in the UI in the repository settings and automatically 
gets put into the pipeline at runtime.

-->

### Sample CircleCI configuration snippet

<Tabs
    defaultValue="circleci-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'circleci-semgrep'},
    {label: 'Stand-alone CI job', value: 'circleci-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'circleci-ssc'},
    ]}
>

<TabItem value='circleci-semgrep'>
<CircleCiSemgrepAppSast /> 

</TabItem>
<TabItem value='circleci-standalone'>

<CircleCiSemgrepAppStandalone /> 

</TabItem>

<TabItem value='circleci-ssc'>

<CircleCiSemgrepAppSsc /> 

</TabItem>
</Tabs>

## Azure Pipelines

To add Semgrep into Azure Pipelines:

1. Access the YAML pipeline editor within Azure Pipelines by following the [YAML pipeline editor](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/yaml-pipeline-editor?view=azure-devops#edit-a-yaml-pipeline) guide.
2. Copy the relevant code snippet provided in [Sample Azure Pipelines configuration snippet](#sample-azure-pipelines-configuration-snippet) into the Azure Pipelines YAML editor.
3. Save the code snippet.
4. Set [environment variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables).
5. Group the environment variables as a [variable group](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/variable-groups?view=azure-devops&tabs=classic).
6. Optional: Create a separate CI job for diff-aware scanning, which scans only changed files in PRs or MRs, by repeating steps 1-4 and and adding `SEMGREP_BASELINE_REF` as an environment variable. 

### Sample Azure Pipelines configuration snippet

<Tabs
    defaultValue="azure-semgrep"
    values={[
    {label: 'CI with Semgrep App', value: 'azure-semgrep'},
    {label: 'Stand-alone CI job', value: 'azure-standalone'},
    {label: 'CI with Semgrep Supply Chain', value: 'azure-ssc'},
    ]}
>

<TabItem value='azure-semgrep'>

<AzureSemgrepAppSast /> 

</TabItem>

<TabItem value='azure-standalone'>

<AzureSemgrepAppStandalone /> 

</TabItem>

<TabItem value='azure-ssc'>

<AzureSemgrepAppSsc /> 

</TabItem>
</Tabs>

## Azure

```yaml
# trigger:
#  - master

pool:
  vmImage: ubuntu-latest
# variables:
# - group: Semgrep app token group

steps: 

- script: |
    python -m pip install --upgrade pip
    pip install semgrep
    semgrep ci --config auto
  env: 
    SEMGREP_PR_ID: $(System.PullRequest.PullRequestNumber)
```

### Feature support

| Feature | Status |
| --- | --- |
| **diff-aware scanning** | ✅ [configure manually](configuration-reference.md#diff-aware-scanning-semgrep_baseline_ref) |
| **hyperlinks in Semgrep App** | ✅ [configure manually](configuration-reference.md#get-hyperlinks-in-semgrep-cloud) |
| **results in native dashboard** | 💢 not applicable |
| **results in pull request comments** | ❌ not available |
| **automatic CI setup** | ❌ not available |

## Other providers

To run Semgrep CI on any other provider, use the `returntocorp/semgrep` image, and run the `semgrep ci` command with `SEMGREP_BASELINE_REF` set for diff-aware scanning.

**Note**: If you need to use a different image than docker, install Semgrep CI by `pip install semgrep`.

Using the [configuration reference](../configuration-reference/), you can run Semgrep in the following CI providers:

- AppVeyor
- Bamboo 
- Bitrise
- Buildbot
- Codeship
- Codefresh
- Drone CI
- TeamCity CI
- Travis CI

Is your CI provider missing? Let us know by [filing an issue](https://github.com/returntocorp/semgrep/issues/new?assignees=&labels=&template=feature_request.md&title=).

<MoreHelp />
