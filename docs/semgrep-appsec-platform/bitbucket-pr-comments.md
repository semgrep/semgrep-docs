---
slug: bitbucket-pr-comments 
append_help_link: true
title: Bitbucket PR comments 
hide_title: true
description: "Enable PR comments in your Bitbucket repositories to display Semgrep findings to developers."
tags:
    - Semgrep AppSec Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import ReceiveCommentsScm from "/src/components/procedure/_receive-comments-scm.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Enabling Bitbucket pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Bitbucket repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on Bitbucket pull requests are displayed as follows:

![Semgrep Bitbucket PR comment](/img/bb-pr-comment.png#md-width)
**Figure** An inline Bitbucket pull request comment.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Supported Bitbucket plans

- Any of the following Bitbucket plans are supported: 
    - Cloud Free
    - Standard
    - Premium
- Bitbucket Data Center is not supported.

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

## Creating and adding a workspace access token

:::info Prerequisite
- **Bitbucket Cloud Premium** plan. If you do not have a Bitbucket Cloud Premium plan, create a repository access token.
:::

Create a workspace access token in Bitbucket (only available if you have a Bitbucket Cloud Premium plan). Fulfill these general steps to create a workspace access token:

1. Create a workspace access token in Bitbucket with **Read** and **Write** permissions for pull requests. Follow the instructions in [Create a workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-workspace-access-token/) in Bitbucket documentation.
1. Add the workspace access token as a workspace variable with the **Secured** option.

To complete the configuration, follow the [Enabling PR comments in Bitbucket Cloud](#enable-pr-comments-in-bitbucket) section.

</TabItem>

<TabItem value="repository-token">

## Creating and adding a repository access token

:::note
This section helps you to configure PR comments if you do **not** have a Bitbucket Cloud Premium plan. You can create a separate repository access token for each repository where you want to use Semgrep. This configuration option is also useful if you have the Bitbucket Cloud Premium plan, but prefer to onboard repositories one by one instead of bulk onboarding.
:::

Fulfill these general steps to create a repository access token:

1. Create a repository access token in Bitbucket with **Read**, and **Write** permissions for pull requests. Follow the instructions in [Create a repository Access Token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-repository-access-token/) in Bitbucket documentation.
1. Add the repository access token as a repository variable with the **Secured** option.

To complete the configuration, follow the [Adding Semgrep to your Bitbucket CI pipeline for PR comments](/semgrep-code/notifications/#bitbucket-ci-pipelines-yaml-file-for-pr-comments) section.

</TabItem>

</Tabs>

## Enable PR comments in Bitbucket 

### Prerequisites

- In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.
- You must have a Bitbucket Cloud [workspace access token](/semgrep-code/notifications/#creating-and-adding-a-workspace-access-token) or a [repository access token](/semgrep-code/notifications/#creating-and-adding-a-repository-access-token).


### Confirm your Semgrep account's connection

Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your GitHub org exists and is correct.

### Define the `BITBUCKET_TOKEN` environment variable

To enable PR comments, define the `BITBUCKET_TOKEN` environment variable in your CI configuration file. Its syntax and placement in your CI configuration file depends on your CI provider. For example, in Bitbucket Pipelines, its syntax is the following:

```
- export BITBUCKET_TOKEN=$PAT
```

The following snippet is a sample with `BITBUCKET_TOKEN` defined in a `bitbucket-pipelines.yml` file:

<!-- 
<Tabs
    defaultValue="jenkins"
    values={[
    {label: 'Sample Jenkins snippet', value: 'jenkins'},
    {label: 'Sample Bitbucket Pipelines snippet', value: 'pipelines'},
    ]}
>

<TabItem value='jenkins'>

```javascript
pipeline {
  agent any
    environment {

      SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
      // Define BITBUCKET_TOKEN to receive PR comments for Bitbucket Cloud
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

-->
```yaml
image: atlassian/default-image:latest

pipelines:
  branches:
    main:
      # ...
  pull-requests:
    '**':
      - step:
          name: 'Run Semgrep diff scan with PR branch'
          image: semgrep/semgrep
          script:
            # ...
            - export BITBUCKET_TOKEN=$PAT
```

<!--
</TabItem>

</Tabs>
-->

### Configure comments for Semgrep Code

<PrCommentsInSast name="Bitbucket" comment_type="PR" />

### Receive comments in your VPN or on-premise SCM

Bitbucket Premium provides [<i class="fas fa-external-link fa-xs"></i> access control features](https://support.atlassian.com/bitbucket-cloud/docs/control-access-to-your-private-content/) for content that your individual account owns. If you use this feature, you need to add several IP addresses into your allowlist.

<ReceiveCommentsScm />

:::info
Only rules set to the **Comment** and **Block** rule modes in the [Policies page](https://semgrep.dev/orgs/-/policies) create PR comments.
:::

## Next steps

<NextAfterComments />

## Additional references 

<TroubleshootingPrLinks />

<MoreHelp />
