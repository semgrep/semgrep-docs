---
slug: notifications
append_help_link: true
title: Alerts and notifications
hide_title: true
toc_max_heading_level: 4
description: "Learn how to receive Slack or email alerts about findings and failures, how to receive merge or pull request comments in your CI/CD pipeline, or how to integrate using webhooks."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import EnableAutofix from "/src/components/procedure/_enable-autofix.mdx"


<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Alerts and notifications

Receive notifications in various channels, such as Slack and email, through Semgrep Cloud Platform. This document guides you through setup procedures and Semgrep's deduplication behavior. This ensures that you receive high-signal notifications and alerts in your preferred channels.

Semgrep Cloud Platform can send notifications through the following channels:

| Tool                               | Tier availability |
| ----                               | ----------------  |
| [GitHub pull request (PR) comments](/semgrep-cloud-platform/github-pr-comments)  | Team & Enterprise  |
| [GitLab merge request (MR) comments](/semgrep-cloud-platform/gitlab-mr-comments) | Team & Enterprise  |
| [Bitbucket PR comments](/semgrep-cloud-platform/bitbucket-pr-comments)           | Team & Enterprise  |
| [Slack](/semgrep-cloud-platform/slack-notifications)                             | Team & Enterprise  |
| [Email](/semgrep-cloud-platform/email-notifications)                             | Team & Enterprise  |
| [Webhooks](/semgrep-cloud-platform/webhooks)                           | Team & Enterprise   |

:::info
* Alerts and notifications can only be enabled through Semgrep Cloud Platform (SCP). [Sign up or sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
* To receive alerts and notifications, you must [add or onboard the project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

## Finding available alert and notification channels

To find available [integrations for Semgrep Cloud Platform](https://semgrep.dev/orgs/-/settings/integrations), follow these steps:

1. Sign in to your [Semgrep Cloud Platform account](https://semgrep.dev/).
2. Click **Settings**.
3. Click **Integrations**.
    ![Screenshot of Semgrep's "Create New Integration Channel" menu](/img/integration-firstview.png)
4. Click **Add Integration** (or **Setup First Integration** if this is your first integration).
    ![Screenshot of Integrations page while adding the first integration.](/img/integrations.png)<br />

## Managing alerts and notifications

To view, add, remove, disable, or enable your saved channels:

1. In the **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, explore the options available for specific integrations.
2. In the **[Policies](https://semgrep.dev/orgs/-/policies)** page, click **Rule modes**. A menu appears.
3. Click the **Edit** button of the mode for which mode you want to change notifications.
4. Make any changes to the notification settings for the mode you selected.

### Semgrep Autofix

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings. Either metavariables or regex matches are replaced with a potential fix. Due to their complexity, not all rules make use of autofix, but for rules that use this feature, autofix allows you to quickly resolve findings as part of your code review workflow. Semgrep Code can suggest these fixes through PR or MR comments within GitHub or GitLab, thus integrating seamlessly with your review environment.

Autofix is free to use for all tiers.

In the following screenshot, Semgrep detects the use of a native Python XML library, which is vulnerable to XML external entity (XXE) attacks. The PR comment automatically suggests a fix by replacing `import xml` to `import defusedxml`.

![Screenshot of a sample autofix PR suggestion](/img/notifications-github-suggestions.png)

#### Enabling autofix for GitHub or GitLab 

Autofix requires PR or MR comments to be enabled for your repository or organization. Follow the steps in [GitHub pull request comments](#github-pull-request-comments) or [GitLab merge request comments](#gitlab-merge-request-comments) to enable this feature.

<EnableAutofix />

All scans performed after enabling autofix generate inline PR or MR comments with code suggestions for applicable rules.

### Jira

:::warning Deprecation notice
Creating Jira tickets from Findings page has been deprecated. This feature may be reenabled in the future.
:::

Jira integration is a feature available in Semgrep's Team tier and above.

This integration allows you to create Jira tickets directly from the **Findings** page with relevant information about a particular finding.

To set up Jira integration:

1. Sign in to your Semgrep Cloud Platform account, and then go to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**..
2. 1. On the [Integrations](https://semgrep.dev/orgs/-/settings/integrations) page, click **Add Integration** (or **Setup First Integration** if this is your first integration), and then select **Jira.**
3. Enter a **Name** of the integration.
4. Enter the **email address** used for the Atlassian account.
5. Enter your Atlassian **domain URL**.
6. Enter your **Project key**. This is the prefix for tasks created within a project. Semgrep creates issues to the project identified here.
7. Enter the **Issue type.** This is the type of issue for Semgrep findings, for example, *Bug.*
8. Enter the **API Token**.
    - Generate the API token by following instructions in the **Create an API token** section in the following documentation: [Manage API Tokens](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account).
    - Find existing API tokens in the [API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens) page.
9. Click **Save.**

## Notification and alert de-duplication

Notifications are sent only the first time a given finding is detected.

Because of Semgrep CI's diff-awareness, you will not be notified
when a pull request has a finding that existed on the base branch already,
even if that line is moved or re-indented.

Semgrep Cloud Platform also keeps track of notifications that have already been sent,
so consecutive scans of the same changes in the same pull request
won't send duplicate notifications.


<MoreHelp />
