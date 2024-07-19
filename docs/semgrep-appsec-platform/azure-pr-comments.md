---
slug: azure-pr-comments
title: Bitbucket PR comments
hide_title: true
description: "Enable PR comments in your Azure DevOps repositories to display Semgrep findings to developers."
tags:
    - Deployment
    - Semgrep AppSec Platform
---

import DeploymentJourney from "/src/components/concept/_deployment-journey.mdx"
import CommentTriggers from "/src/components/reference/_comment-triggers.mdx"

# Enable Azure pull request comments

<DeploymentJourney />

Semgrep can create **pull request (PR) comments** in your Azure DevOps repository. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams, or any team responsible for creating standards to help their fellow developers write safe and standards-compliant code.

Automated comments on Azure DevOps pull requests are displayed as follows:

![Semgrep Azure DevOps PR comment](/img/bb-pr-comment.png#md-width)
**Figure** An inline Azure DevOps pull request comment.

## Conditions for PR comment creation

PR comments appear for the following types of scans under these conditions:

<CommentTriggers />

