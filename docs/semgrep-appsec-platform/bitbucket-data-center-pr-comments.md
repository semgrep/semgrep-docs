---
slug: bitbucket-data-center-pr-comments
append_help_link: true
title: Bitbucket Data Center
hide_title: true
description: "Enable PR comments in your Bitbucket Data Center repositories to display Semgrep findings to developers."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

<!-- vale off -->

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import ReceiveCommentsScm from "/src/components/procedure/_receive-comments-scm.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import DisableComments from "/src/components/procedure/_disable_ssc_pr_mr_comments.mdx"

<!-- vale on -->

# Enable Bitbucket Data Center pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Bitbucket repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on Bitbucket pull requests are displayed as follows:

![Semgrep Bitbucket PR comment](/img/bb-pr-comment.png#md-width)
**Figure** An inline Bitbucket pull request comment.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Bitbucket tokens

To integrate Semgrep comments into Bitbucket Data Center, you must provide a workspace access token.

## Create and add a workspace access token

1. Create a workspace access token in Bitbucket with **Read** and **Write** permissions for pull requests. Follow the instructions in [Create a workspace Access Token](https://support.atlassian.com/bitbucket-cloud/docs/create-a-workspace-access-token/) in Bitbucket documentation.
2. Add the workspace access token as a workspace variable with the **Secured** option.

Continue setting up Bitbucket PR comments by finishing the rest of this guide.

## Enable PR comments in Bitbucket

### Prerequisites

- In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.
- You must have a Bitbucket Cloud **workspace access token** or a **repository access token**.


### Confirm your Semgrep account's connection

Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your Bitbucket project exists and is correct.

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

:::info
Only rules set to the **Comment** and **Block** rule modes in the [Policies page](https://semgrep.dev/orgs/-/policies) create PR comments.
:::

## Disable PR comments for Supply Chain findings

<DisableComments />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
