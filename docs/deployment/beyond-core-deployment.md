---
slug: beyond-core-deployment
title: Beyond core deployment
hide_title: true
description: A guide to common tasks after setting up core Semgrep features.
tags:
  - Deployment
---

# Beyond core deployment

Now that you've finished your Semgrep core deployment, you can either customize Semgrep's scan behavior or continue to enable additional deployment features. The following sections list common tasks after you've finished your core deployment.

## Customize Semgrep scans or triage workflow

| Concern | Guide |
| -------  | ------ |
| Semgrep Code scans irrelevant files.         | [Ignore files, folders, or code](/ignoring-files-folders-code).  |
| Semgrep Code is too noisy.         | Enable [Semgrep Pro Engine](/semgrep-code/semgrep-pro-engine-intro) or remove rules and rulesets through the [Policies page](/semgrep-code/policies).  |
| I want my developers to see certain security issues in their pull or merge requests.         | Configure [Comment mode](/semgrep-code/policies#blocking-a-pr-or-mr-through-rule-modes) in the Policies page.  |
| I want to prevent developers from using dependencies with certain licenses. | Set up [license compliance](/docs/semgrep-supply-chain/license-compliance).|
| I want to receive AI assistance when I triage findings. | Enable [Semgrep Assistant](/semgrep-assistant/overview). |
| I want to enforce my organization's coding standards. | Write a [custom rule](/writing-rules/overview) and add it to your Policies page. |

## Enable additional deployment features

| Concern | Guide |
| -------  | ------ |
| I want to receive notifications in my environment.    | Set up [notifications](/semgrep-appsec-platform/notifications).   |
| I want my developers to use Semgrep on their IDE.    | Install and set up available [IDE extensions](/extensions/overview).  |
| I'm scanning too many projects (repositories onboarded to Semgrep) and want to group them somehow.         | [Tag your projects](/docs/semgrep-appsec-platform/tags).   |
| I'd like to manage access to the resources that developers can view or change in Semgrep AppSec Platform.         | Configure [roles and users](/docs/deployment/user-management).  |
