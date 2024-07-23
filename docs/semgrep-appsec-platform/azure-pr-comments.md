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
import DisableComments from "/src/components/procedure/_disable_ssc_pr_mr_comments.mdx"
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"

<!-- vale on -->

# Enable Azure pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Azure DevOps repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

TODO: Automated comments on Azure DevOps pull requests are displayed as follows:

![Semgrep Azure DevOps PR comment](/img/bb-pr-comment.png#md-width)
**Figure** An inline Azure DevOps pull request comment.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Steps to set up PR comments

### Prerequisites

In addition to finishing the previous steps in your deployment journey, it is recommended to have completed a **full scan** on your **default branch** for the repository in which you want to receive comments.

### Confirm your Semgrep account's connection

PR comments are enabled by default for users who have connected their GitLab organization (org) to Semgrep AppSec Platform. Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your Azure DevOps org exists and is correct.

### Configure comments for Semgrep Code

<PrCommentsInSast name="Azure" comment_type="PR" />

:::info
Only rules set to the **Comment** and **Block** rule modes in the [Policies page](https://semgrep.dev/orgs/-/policies) create PR comments.
:::

## Disable PR comments for Supply Chain findings

<DisableComments />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
