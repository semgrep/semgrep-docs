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

import CustomComments from "/src/components/procedure/_customize_pr_mr_comments.mdx"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"
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

Semgrep can create **merge request (MR) comments** in your GitLab repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards, to help their fellow developers write safe and standards-compliant code.

Automated comments on GitLab merge requests are displayed as follows:

![Semgrep GitLab MR comment](/img/gl-mr-comment.png#md-width)
**Figure** An inline GitLab merge request comment.

## Conditions for MR comment creation

MR comments appear for the following types of scans under these conditions:

<CommentTriggers comment_type="MR"/>

## Steps to set up MR comments

### Prerequisites

In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.

### Confirm your Semgrep account's connection

PR comments are enabled by default for users who have connected their GitLab group to Semgrep AppSec Platform. Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your GitLab group exists and is correct.

#### Triage through MR comment

Developers can triage Semgrep findings without leaving GitLab by responding to the MR comments authored by Semgrep. To turn this feature on, you must update your source code manager (SCM) connection to use an access token with an elevated role. This allows you to enable webhooks, which Semgrep requires for the triage through MR comment feature.

To update your connection between Semgrep and GitLab:

1. Ensure that you're using one of the following GitLab plans:
   - GitLab Premium
   - GitLab Ultimate
   - GitLab Self Managed
2. Log in to GitLab, and create an access token with one of the following roles assigned:
   - `Maintainer`
   - `Owner`
   - `Admin`
3. Return to Semgrep and [<i class="fas fa-external-link fa-xs"></i> sign in](https://semgrep.dev/login).
4. Go to **<i class="fa-solid fa-gear"></i> Settings > Source code managers**, and find your GitLab connection.
5. Click **Update access token**.
6. In the **Update access token** dialog that appears, provide the new token you created. Click **Update** to save and proceed.
7. Toggle the **Incoming webhooks** setting on.

Once you've successfully turned on the triage by PR comment feature, you can change the token you provide to Semgrep to one that's more restrictive. You can downgrade the role assigned to the token to `Developer`.

### Configure comments for Semgrep Code

<PrCommentsInSast name="GitLab" comment_type="MR" />

### Configure comments for Semgrep Secrets

<PrCommentsInSecrets name="GitLab" comment_type="MR" />

### Configure comments for Semgrep Supply Chain

<CommentsInSupplyChain />

### Receive comments in your VPN or on-premise SCM

<ReceiveCommentsScm />

You've set up MR comments! Enable optional features provided in the following sections, or see [Next steps](#next-steps).

## Optional features

### Enable autofix in GitLab repositories

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings.

<EnableAutofix />

### Dataflow traces in MR comments

With **dataflow traces**, Semgrep Code provides you a visualization of the path of tainted, or untrusted, data in specific findings. This path can help you track the sources and sinks of the tainted data as they propagate through the body of a function or a method. For general information about taint analysis, see [Taint tracking](/writing-rules/data-flow/taint-mode/overview).

When running Semgrep Code from the command line, you can pass in the flag `--dataflow-traces` to use this feature.

You can view dataflow traces in the MR comments created by Semgrep Code running in your CI/CD system.

#### View the path of tainted data in MR comments

To enable dataflow traces in your CI pipeline, fulfill the following prerequisites:

- Set up Semgrep to post GitLab merge request comments, as described on this page.
- To obtain meaningful results of dataflow traces in MR comments, use cross-file analysis while scanning your repositories. To enable cross-file analysis, see [<i class="fa-regular fa-file-lines"></i> Perform cross-file analysis](/semgrep-code/semgrep-pro-engine-intro).
- Not all Semgrep rules or rulesets make use of taint tracking. Ensure that you have a ruleset, such as the **default ruleset** added in your **[Policies](https://semgrep.dev/orgs/-/policies)**. If this ruleset is not added, go to [https://semgrep.dev/p/default](https://semgrep.dev/p/default), and then click **Add to Policy**. You can add rules that use taint tracking from [Semgrep Registry](https://semgrep.dev/explore).

### Customize MR comments

<CustomComments comment_type="MR" link_type="HTML, Markdown, and plaintext" />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
