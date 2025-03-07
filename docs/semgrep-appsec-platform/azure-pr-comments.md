---
slug: azure-pr-comments
title: Azure PR comments
hide_title: true
description: "Enable PR comments in your Azure DevOps repositories to display Semgrep findings to developers."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

<!-- vale off -->

import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import CommentsInSupplyChain from "/src/components/concept/_comments-in-supply-chain.md"
import PL from '@site/src/components/Placeholder';

<!-- vale on -->

# Enable Azure pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Azure DevOps repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards, to help their fellow developers write safe and standards-compliant code.

Automated comments on Azure DevOps pull requests are displayed as follows:

![Semgrep Azure DevOps PR comment](/img/azure-pr-comment.png#md-width)
_**Figure**. An inline Azure DevOps pull request comment._

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Steps to set up PR comments

### Prerequisites

Semgrep currently supports repositories hosted by Azure DevOps Cloud.

In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.

### Confirm your Semgrep account's connection

PR comments are enabled by default for users who have connected their Azure DevOps project to Semgrep AppSec Platform. Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your Azure DevOps project exists and is correct.

### Set up the configuration file

In the Azure Pipelines configuration file, export the `SEMGREP_REPO_URL` and `SEMGREP_REPO_NAME` variables to enable PR comments and ensure that findings and related data are accurately labeled with your project's information. Note that the namespace that's a part of the variable's value follows the format <PL>organization</PL>/<PL>project</PL>:

```
# example
export SEMGREP_REPO_URL="https://dev.azure.com/{organization}/{project}/_git/{project}"
```

<details>
<summary>Click to see a sample workflow file</summary>

```yaml
pool:
  vmImage: ubuntu-latest
variables:
  - group: Semgrep_Variables
steps:
  - checkout: self
    clean: true
    fetchDepth: 100000
    persistCredentials: true
  - script: >
      python -m pip install --upgrade pip

      pip install semgrep

      if [ $(Build.SourceBranchName) = "main" ]; then
          echo "Semgrep full scan"
          semgrep ci
      elif [ $(System.PullRequest.PullRequestId) -ge 0 ]; then
          echo "Semgrep diff scan"
          export SEMGREP_PR_ID=$(System.PullRequest.PullRequestId)
          export SEMGREP_REPO_URL="https://dev.azure.com/{organization}/${SYSTEM_TEAMPROJECT}/_git/${BUILD_REPOSITORY_NAME}"
          export SEMGREP_REPO_NAME="{organization}/${SYSTEM_TEAMPROJECT}/${BUILD_REPOSITORY_NAME}"
          export SEMGREP_BASELINE_REF='origin/main'
          export AZURE_TOKEN=$(System.AccessToken)
          git fetch origin main:origin/main
          semgrep ci 
      fi
  - task: Bash@3
    inputs:
      targetType: inline
      script: |
        # this is inline code
        env | sort
```
</details>

### Configure comments for Semgrep Code

<PrCommentsInSast name="Azure" comment_type="PR" />


### Configure comments for Semgrep Supply Chain

<CommentsInSupplyChain />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
