---
slug: bitbucket-pr-comments 
append_help_link: true
title: BitBucket PR comments 
hide_title: true
description: "Enable PR comments in your BitBucket repositories to display Semgrep findings to developers."
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

### Enabling BitBucket pull request comments

:::info Prerequisites
* You must have a a BitBucket Cloud Free, Standard, or Premium plan. BitBucket Data Center is not supported. 
* BitBucket PR comments can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up Slack notifications.
* To receive alerts and notifications, you must [add or onboard the project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

There are two ways in which you can integrate Semgrep comments into Bitbucket Cloud depending on the Bitbucket plan you use:

- **Workspace access token**: If you use the Bitbucket Cloud Premium plan, you can create a workspace access token. This option saves time because you can create one access token for all repositories in the workspace. With one workspace access token, you can bulk-onboard more repositories at once from a whole workspace. See [Creating a workspace access token](/semgrep-code/notifications/#creating-and-adding-a-workspace-access-token). However, you can also use the option of a repository access token to onboard repositories one by one.
- **Repository access token**: If you do **not** have the Bitbucket Cloud Premium plan, create a separate repository access token for each repository where you want to use Semgrep. This configuration option is also useful if you have the Bitbucket Cloud Premium plan, but prefer to onboard repositories one by one instead of bulk onboarding. See [Creating a repository access token](/semgrep-code/notifications/#creating-and-adding-a-repository-access-token).

<Tabs
    defaultValue="workspace-token"
    values={[
    {label: 'Creating and adding a workspace access token', value: 'workspace-token'},
    {label: 'Creating and adding a repository access token', value: 'repository-token'},
    ]}
>

<TabItem value="workspace-token">

#### Creating and adding a workspace access token

:::info Prerequisites
- **BitBucket Cloud Premium** plan. If you do not have a BitBucket Cloud Premium plan, create a repository access token.
:::

Create a workspace access token in Bitbucket (only available if you have a Bitbucket Cloud Premium plan). Fulfill these general steps to create a workspace access token:

1. Create a workspace access token in Bitbucket with **Read** and **Write** permissions for pull requests. Follow the instructions in [Create a workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-workspace-access-token/) in Bitbucket documentation.
1. Add the workspace access token as a workspace variable with the **Secured** option.

To complete the configuration, follow the [Enabling PR comments in BitBucket Cloud](#enabling-pr-comments-in-bitbucket-cloud) section.

</TabItem>

<TabItem value="repository-token">

#### Creating and adding a repository access token

:::note
This section helps you to configure PR comments if you do **not** have a Bitbucket Cloud Premium plan. You can create a separate repository access token for each repository where you want to use Semgrep. This configuration option is also useful if you have the Bitbucket Cloud Premium plan, but prefer to onboard repositories one by one instead of bulk onboarding.
:::

Fulfill these general steps to create a repository access token:

1. Create a repository access token in Bitbucket with **Read**, and **Write** permissions for pull requests. Follow the instructions in [Create a repository Access Token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-repository-access-token/) in Bitbucket documentation.
1. Add the repository access token as a repository variable with the **Secured** option.

To complete the configuration, follow the [Adding Semgrep to your Bitbucket CI pipeline for PR comments](/semgrep-code/notifications/#bitbucket-ci-pipelines-yaml-file-for-pr-comments) section.

</TabItem>

</Tabs>

#### Enabling PR comments in BitBucket Cloud

:::info Prerequisite
* You must have a BitBucket Cloud [workspace access token](/semgrep-code/notifications/#creating-and-adding-a-workspace-access-token) or a [repository access token](/semgrep-code/notifications/#creating-and-adding-a-repository-access-token).
:::

To enable PR comments, define the `BITBUCKET_TOKEN` environment variable in your CI config file. Its syntax and placement in your CI config file depends on your CI provider. For example, in BitBucket Pipelines, its syntax is the following:

```
- export BITBUCKET_TOKEN=$PAT
```

Refer to the following samples to define `BITBUCKET_TOKEN`:

<Tabs
    defaultValue="jenkins"
    values={[
    {label: 'Sample Jenkins snippet', value: 'jenkins'},
    {label: 'Sample BitBucket Pipelines snippet', value: 'pipelines'},
    ]}
>

<TabItem value='jenkins'>

```javascript
pipeline {
  agent any
    environment {

      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
      // Define BITBUCKET_TOKEN to receive PR comments for BitBucket Cloud
      BITBUCKET_TOKEN = credentials('BITBUCKET_PAT')

      // ... Other configuration variables
    }
    stages {
      stage('Semgrep-Scan') {
        steps {
          sh 'pip3 install semgrep'
          sh 'semgrep ci'
      }
    }
  }
}
```
</TabItem>

<TabItem value='pipelines'>

```yaml
image: atlassian/default-image:latest

pipelines:
  branches:
    main:
        - step:
            name: 'Run Semgrep full scan with main branch'
            image: returntocorp/semgrep
            script:
              - export SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN
              - semgrep ci
  pull-requests:
    '**':
      - step:
          name: 'Run Semgrep diff scan with PR branch'
          image: returntocorp/semgrep
          script:
            # Set SEMGREP Variables
            - export SEMGREP_APP_TOKEN=$SEMGREP_APP_TOKEN
            - export SEMGREP_BASELINE_REF="origin/main"
            - git fetch origin "+refs/heads/*:refs/remotes/origin/*"
            - export BITBUCKET_TOKEN=$PAT
            - semgrep ci
```
Substitute the placeholder <code><span className="placeholder">$PAT</span></code> according to your workspace or repository settings.

</TabItem>

</Tabs>

After defining the `BITBUCKET_TOKEN`, you have successfully set up PR comments in BitBucket Cloud.

:::info
Only rules in the **Comment** and **Block** columns of your [Rule board](https://semgrep.dev/orgs/-/board) create PR comments.
:::

