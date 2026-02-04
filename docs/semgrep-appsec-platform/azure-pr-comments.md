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

import CustomComments from "/src/components/procedure/_customize_pr_mr_comments.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import PrCommentsInSecrets from "/src/components/procedure/_pr-comments-in-secrets.mdx"
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

#### Triage through PR comments

Developers can triage Semgrep findings without leaving Azure DevOps by responding to the PR comments authored by Semgrep. To turn this feature on, you must update your source code manager (SCM) connection to use a personal access token that grants **Full Access**. This is because Semgrep requires webhooks for the triage through PR comments feature.

To update your connection between Semgrep and Azure DevOps:

1. Log into Azure DevOps using an account assigned with either the **Owner** or **Project Collection Administrator** role for your organization.
2. [Create an access token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat). When selecting the **Scopes** for the token, ensure that you select **Full access**.
3. Return to Semgrep and [<i class="fas fa-external-link fa-xs"></i> sign in](https://semgrep.dev/login).
4. Go to **<i class="fa-solid fa-gear"></i> Settings > Source code managers**, and find your Azure DevOps connection.
5. Click **Update access token**.
6. In the **Update access token** dialog that appears, provide the token you created. Click **Update** to save and proceed.
7. Toggle the **Incoming webhooks** setting on.

Once you've successfully enabled webhooks and the **Triage via code review comments** toggle is on, you can change the token you provide to Semgrep to one that's more restrictive. The token scopes required for the more restrictive token are:

- `Code: Status`
- `Member Entitlement Management: Read`
- `Project and Team: Read & write`
- `Pull Request Threads: Read & write`

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
    fetchDepth: 20
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

### Configure comments for Semgrep Secrets

<PrCommentsInSecrets name="Azure" comment_type="PR" />

### Configure comments for Semgrep Code

<PrCommentsInSast name="Azure" comment_type="PR" />

### Configure comments for Semgrep Supply Chain

<CommentsInSupplyChain />

## Customize PR comments

<CustomComments comment_type="PR" link_type="HTML, Markdown, and plaintext" />

## Optional features

### Enable Autofix in Azure repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

### Dataflow traces in MR comments

With **dataflow traces**, Semgrep Code provides you a visualization of the path of tainted, or untrusted, data in specific findings. This path can help you track the sources and sinks of the tainted data as they propagate through the body of a function or a method. For general information about taint analysis, see [Taint tracking](/writing-rules/data-flow/taint-mode/overview).

When running Semgrep Code from the command line, you can pass in the flag `--dataflow-traces` to use this feature.

You can view dataflow traces in the PR comments created by Semgrep Code.

#### View the path of tainted data in MR comments

To enable dataflow traces in your MR comments, fulfill the following prerequisites:

- Set up Semgrep to post Azure DevOps pull request comments, as described on this page.
- To get the most meaningful results of dataflow traces in PR comments, use cross-file analysis while scanning your repositories. To enable cross-file analysis, see [<i class="fa-regular fa-file-lines"></i> Perform cross-file analysis](/semgrep-code/semgrep-pro-engine-intro).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset such as the **default ruleset** added to your **[Policies](https://semgrep.dev/orgs/-/policies)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policy**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
