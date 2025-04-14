---
slug: gitlab-mr-comments
append_help_link: true
title: GitLab MR comments
hide_title: true
toc_max_heading_level: 4
description: "Enable merge request (MR) comments in your GitLab repositories to display Semgrep findings to developers."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

<!-- vale off -->

import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
import DisplayTaintedDataIntro from "/src/components/concept/_semgrep-code-display-tainted-data.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import PrCommentsInSecrets from "/src/components/procedure/_pr-comments-in-secrets.mdx"
import DefineConnectionVariables from "/src/components/reference/_define-connection-variables.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import ReceiveCommentsScm from "/src/components/procedure/_receive-comments-scm.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import CommentsInSupplyChain from "/src/components/concept/_comments-in-supply-chain.md"

<!-- vale on -->

# Set up GitLab merge request comments

<DeploymentJourney />

Semgrep can create **merge request (MR) comments** in your GitLab repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on GitLab merge requests are displayed as follows:

![Semgrep GitLab MR comment](/img/gl-mr-comment.png#md-width)
**Figure** An inline GitLab merge request comment.

## Conditions for MR comment creation

MR comments appear for the following types of scans under these conditions:

<CommentTriggers comment_type="MR"/>

## Steps to set up MR comments

### Prerequisites

In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.

### Connect your GitLab organization to Semgrep AppSec Platform

To enable MR comments, connect your GitLab organization to Semgrep AppSec Platform:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login?return_path=/manage/projects).
1. Go to **Settings > Source code managers**.
1. Click **Add connection** and select **GitLab**.
3. Create a GitLab personal access token (PAT) with `api` scope:
   1. Log in to your GitLab account, and go to [<i class="fas fa-external-link fa-xs"></i> Profile > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens).
   2. Add a token with `api` scope.
   3. Copy the generated token.
4. Return to Semgrep AppSec Platform, and in the **Add connection** form:
   1. Enter the **Name of your GitHub Organization**.
   2. Paste the PAT you created in **Access token**.
   3. Click **Connect**.

Once connected, Semgrep automatically posts comments to your merge requests without any additional CI/CD configuration.

### Configure comments for Semgrep Code

<PrCommentsInSast name="GitLab" comment_type="MR" />

### Configure comments for Semgrep Secrets

<PrCommentsInSecrets name="GitLab" comment_type="MR" />

### Configure comments for Semgrep Supply Chain

<CommentsInSupplyChain />

### Receive comments in your VPN or on-premise SCM

:::info
Ensure that you've [onboarded all of your GitLab groups](/semgrep-appsec-platform/gitlab-mr-comments#mr-comments-with-multiple-gitlab-groups) to Semgrep.
:::

<ReceiveCommentsScm />

You've set up MR comments! Enable optional features provided in the following sections, or see [Next steps](#next-steps).

## Optional features

### Enable autofix in GitLab repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

### Dataflow traces in MR comments

![Screenshot of a GitLab MR comment with dataflow traces](/img/dataflow-traces-mr-comments.png)
_**Figure**. An inline GitLab pull request comment with dataflow traces._

<DisplayTaintedDataIntro />

#### View the path of tainted data in MR comments

To enable dataflow traces in your CI pipeline, fulfill the following prerequisites:

:::info Prerequisites
- Set up Semgrep to post GitLab merge request comments, as described on this page.
- To obtain meaningful results of dataflow traces in MR comments, use cross-file analysis while scanning your repositories. To enable cross-file analysis, see [<i class="fa-regular fa-file-lines"></i> Perform cross-file analysis](/semgrep-code/semgrep-pro-engine-intro).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset, such as the **default ruleset** added in your **[Policies](https://semgrep.dev/orgs/-/policies)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policy**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).
:::

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
