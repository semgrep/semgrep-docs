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

import CustomComments from "/src/components/procedure/_customize_pr_mr_comments.mdx"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TroubleshootingPrLinks from "/src/components/reference/_troubleshooting-pr-links.mdx"
import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import NextAfterComments from "/src/components/procedure/_next-after-comments.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"
import ReceiveCommentsScm from "/src/components/procedure/_receive-comments-scm.mdx"
import PrCommentsInSast from "/src/components/procedure/_pr-comments-in-sast.mdx"
import PrCommentsInSecrets from "/src/components/procedure/_pr-comments-in-secrets.mdx"
import CommentsInSupplyChain from "/src/components/concept/_comments-in-supply-chain.md"

<!-- vale on -->

# Enable Bitbucket Data Center pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Bitbucket repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. They are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on Bitbucket pull requests are displayed as follows:

![Semgrep Bitbucket PR comment](/img/bbdc-pr-comments.png#md-width)
_**Figure.**_ Bitbucket Data Center pull request comments.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

## Enable PR comments in Bitbucket

### Prerequisites

In addition to finishing the previous steps in your deployment journey, it is recommended that you complete a **full scan** on your **default branch** for the repository in which you want to receive comments.
- You must have a Bitbucket Data Center HTTP access token. Ensure that the [HTTP access token that you create](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html) has been granted **Project write** permissions. You'll provide this token to your CI provider during the setup process.
- Semgrep has been tested with Bitbucket Data Center v8.19. If you are using a different version of BBDC and there are issues, please [reach out to support](/docs/support).

### Confirm your Semgrep account's connection

Confirm that you have the correct connection and access:

1. In your Semgrep AppSec Platform account, click **Settings > Source code managers**.
2. Check that an entry for your Bitbucket project exists and is correct.

#### Triage through PR comments

If you want developers to able to triage findings via their MR comments, without leaving Bitbucket, you must have:

- Bitbucket Data Center v8.8 or above
- A Bitbucket HTTP access token in the Source code manager (SCM) connection to Semgrep, created by a user with the Project Admin role.

This access token must be created with PROJECT_ADMIN permissions. Project-level webhooks are required to support triage though PR comments.

After providing a token with the appropriate role and permissions, enable the **Incoming webhooks** toggle on the SCM connection for the Bitbucket project.

### Configure comments for Semgrep Code

<PrCommentsInSast name="Bitbucket" comment_type="PR" />

### Configure comments for Semgrep Secrets

<PrCommentsInSecrets name="Bitbucket" comment_type="PR" />

### Configure comments for Semgrep Supply Chain

<CommentsInSupplyChain />

## Customize PR comments

<CustomComments comment_type="PR" link_type="Markdown and plaintext" />

## Next steps

<NextAfterComments />

## Additional references

<TroubleshootingPrLinks />
