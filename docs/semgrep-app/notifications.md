---
slug: notifications
append_help_link: true
title: Alerts and notifications
hide_title: true
description: "Learn how to receive Slack or email alerts about findings and failures, how to receive merge or pull request comments in your CI/CD pipeline, or how to integrate using webhooks."
tags:
    - Semgrep Cloud Platform
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import ProcedureIntegrateSlack from "/src/components/procedure/_integrate-slack.mdx"
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

Semgrep Cloud Platform provides support for the following channels:

| Tool                               | Tier availability |
| ----                               | ----------------  |
| Slack                              | Community (Free)  |
| Email                              | Community (Free)  |
| GitHub pull request (PR) comments  | Community (Free)  |
| GitLab merge request (MR) comments | Community (Free)  |
| Webhooks                           | Team/Enterprise   |

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

1. In the **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)** page, explore the options available for specific integration.
2. In the **[Rule board](https://semgrep.dev/orgs/-/board)**, click the <i class="fa-solid fa-gear"></i> **gear** icon to enable or disable an integration.
    ![Screenshot of Semgrep's Rule board integration modal](/img/rule-board-integrations.png)

## Adding notification channels

### Slack

<ProcedureIntegrateSlack />

#### Additional resources
* https://api.slack.com/apps
* https://api.slack.com/messaging/webhooks#enable_webhooks

### Email

Receive Semgrep findings via email.

To set up email integration:

1. In **Integrations,** click **Add Integration.**
2. Click on **Email**.
3. Enter a **Name** for the integration.
4. Enter the **Email address** that will receive Semgrep findings.
5. Click **Save.**
6. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear** icon, and then click the <i class="fa-solid fa-toggle-large-on"></i> **toggle** next to the name of the integration.

![Screenshot of Semgrep Cloud Platform email with findings ](/img/integrations-email-findings.png#bordered)
*Figure 2.* Sample of an email sent from Semgrep with findings.

:::note Number of emails
On each scan that has at least one finding, you will receive **one email** from Semgrep with a summary of all of the findings from that scan.
:::

### GitHub pull request comments

Pull request comments are created when:

1. Semgrep finds a result in CI.
2. The Semgrep GitHub App has permissions to post inline PR comments.

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/semgrep-pull-request.png#bordered)
*Figure 3.* An inline GitHub pull request comment.

[Semgrep Cloud Platform](https://semgrep.dev/manage) uses the permissions requested by [the Semgrep GitHub App](https://github.com/marketplace/semgrep-dev) to leave PR comments. You can verify that you have granted these permissions by visiting either `https://github.com/organizations/<your_org_name>/settings/installations` or `https://github.com/organizations/<your_org_name>/<your_repo_name>/settings/installations`.

If you are using GitHub Actions to run Semgrep, no extra changes are needed to get PR comments. If you are using another CI provider, in addition to the environment variables you set after following [sample CI configurations](/semgrep-ci/sample-ci-configs/) you need to ensure that the following environment variables are correctly defined:

- `SEMGREP_PR_ID` is set to the PR number of the pull request on Github (for example, `2901`)
- `SEMGREP_REPO_NAME` is set to the repo name (for example, `returntocorp/semgrep`)
- `SEMGREP_REPO_URL` is set to the repository URL where your project is viewable online (for example, `https://github.com/returntocorp/semgrep`)

### GitLab merge request comments

This section documents how to enable Semgrep Cloud Platform to post comments on merge requests.

Automated comments on GitLab merge requests are displayed as follows:

![Semgrep GitLab MR comment](/img/gitlab-mr-comment.png)
*Figure 4.* An inline GitLab merge request comment.

To enable GitLab merge request comments, follow these steps: 

1. Log into Semgrep's [Settings](https://semgrep.dev/manage/settings) to obtain your deployment ID and an API token.
2. Create an API token in GitLab by going to [Profile > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens) and adding a token with `api` scope.
3. Copy the token created in the previous step.
4. Navigate to **your repository >  Settings > CI/CD > Variables** and click **Expand**. The URL of the page where you are ends with: `/username/project/-/settings/ci_cd`.
5. Click **Add variable**.
6. Enter `PAT` for the `key` field and use the token you copied in step 3 as the value. 
7. Select **mask variable** and unselect **protect variable**.
8. Update your `.gitlab-ci.yml` file with variable `GITLAB_TOKEN` and value `$PAT`. Refer to the following example:
```yaml
semgrep:
  image: returntocorp/semgrep
  script:
    - semgrep ci
  rules:
  - if: $CI_MERGE_REQUEST_IID

  variables:
    SEMGREP_APP_TOKEN: $SEMGREP_APP_TOKEN
    GITLAB_TOKEN: $PAT
```

For more config options, see [GitLab CI Sample](/semgrep-ci/sample-ci-configs/#gitlab-ci).

:::note
GitLab MR comments are only available to logged-in Semgrep users, as they require a Semgrep API token.
:::

### Semgrep Autofix

[Autofix](/writing-rules/autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings. Either metavariables or regex matches are replaced with a potential fix. Due to their complexity, not all rules make use of autofix, but for rules that use this feature, autofix allows you to quickly resolve findings as part of your code review workflow. Semgrep Code can suggest these fixes through PR or MR comments within GitHub or GitLab, thus integrating seamlessly with your review environment.

Autofix is free to use for all tiers.

In the following screenshot, Semgrep detects the use of a native Python XML library, which is vulnerable to XML external entity (XXE) attacks. The PR comment automatically suggests a fix by replacing `import xml` to `import defusedxml`.

![Screenshot of a sample autofix PR suggestion](/img/notifications-github-suggestions.png)

#### Enabling autofix for your GitLab or GitHub code repository

Autofix requires PR or MR comments to be enabled for your repository or organization. Follow the steps in [GitHub pull request comments](#github-pull-request-comments) or [GitLab merge request comments](#gitlab-merge-request-comments) to enable this feature.

<EnableAutofix />

All scans performed after enabling autofix generate inline PR or MR comments with code suggestions for applicable rules.

### Webhooks

Webhooks are a feature available in Semgrep's Team tier and above.

Webhooks are a generic method for Semgrep to post JSON-formatted findings after each scan to your URL endpoint. To set up a webhook:

1. Go to **Settings** > **[Integrations](https://semgrep.dev/orgs/-/settings/integrations)**, and then click **Add Integration**.
2. Click **Webhook**.
3. Enter a **Name** for the integration.
4. Enter the **Webhook URL**.
5. To ensure that Semgrep can post to your URL, click **Test**. 
![Successful webhook integration test](/img/webhook-successful-test.png)<br />
6. Click **Save.**
7. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear** icon, then click the <i class="fa-solid fa-toggle-large-on"></i> **toggle** next to the name of the integration.
To receive webhook notifications on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations) and select 'Add integration' or 'Setup First Integration,' and then choose 'Webhook'. Enter a target URL, give the notification channel a name of your choosing, and then click 'Save'.

#### Findings

```json
[
  {
    "semgrep_finding": {
      "id": "241dbe518caf15f800131d2d0c70bf08",
      "ref": "refs/pull/2658/merge",
      "start_date": "None",
      "check_id": "log-exc-info",
      "path": "server/semgrep_app/handlers/registry.py",
      "line": 185,
      "column": 9,
      "message": "Error messages should be logged with `exc_info=True` in order to propagate\nstack information to Sentry. Either change the logging level or raise an Exception.\n",
      "severity": 1,
      "index": 0,
      "end_line": 187,
      "end_column": 10,
      "commit_date": "2021-06-07T15:26:35+03:00",
      "first_seen_scan_id": "xnkPGY8VL20o",
      "category": "security",
      "cwe": "CWE-319: Cleartext Transmission of Sensitive Information",
      "license": "Commons Clause License Condition v1.0[LGPL-2.1-only]",
      "owasp": "A3: Sensitive Data Exposure",
      "references": ["https://tomcat.apache.org/tomcat-5.5-doc/servletapi/"],
      "source": "https://semgrep.dev/r/java.servlets.security.cookie-issecure-false.cookie-issecure-false",
      "technology": ["servlet",  "tomcat"],
      "vulnerability": "Insecure Transport",
      "metadata": {
        "dev.semgrep.actions": [],
        "semgrep.policy": {
          "id": 8168,
          "name": "Web Apps Notify Only",
          "slug": "web-apps-notify-only"
        },
        "semgrep.url": "https://semgrep.dev/s/johndoe:log-exc-info"
      }
    }
  }
]
```

#### Scans

Semgrep Cloud Platform can send a POST request containing information about the scan.

```json
{
  "semgrep_scan": {
    "deployment_id": 1,
    "started_at": "2021-09-21T23:49:17.480929+00:00",
    "completed_at": null,
    "exit_code": null,
    "repository": "returntocorp/semgrep-app",
    "ci_job_url": "https://github.com/returntocorp/semgrep-app/actions/runs/1236121005",
    "environment": "",
    "commit": "e22f08e8e871bde8c100b3a4a6f8e9387d651223",
    "commit_committer_email": "",
    "commit_timestamp": "",
    "commit_author_email": "support@r2c.dev",
    "commit_author_name": "Semgrep User",
    "commit_author_username": "semgrepuser",
    "commit_author_image_url": "https://avatars.githubusercontent.com/u/29760937?s=200&v=4",
    "commit_authored_timestamp": "",
    "commit_title": "fixup",
    "config": "",
    "on": "pull_request",
    "branch": "refs/pull/3483/merge",
    "pull_request_timestamp": "",
    "pull_request_author_username": "semgrepuser",
    "pull_request_author_image_url": "https://avatars.githubusercontent.com/u/29760937?s=200&v=4",
    "pull_request_id": "3483",
    "pull_request_title": "test bad commit",
    "ignored_files": ["/server/semgrep_app/templates/"],
    "id": "xnkPGY8VL20o"
  }
}
```

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

<!--- Commented out as this feature is no longer available TODO add and edit this section when Jira integration is back.

To create a Jira ticket in Semgrep Cloud Platform:

1. In **Findings**, click on the **three-dot icon** of the entry to create a Jira ticket for the finding.
![Creating a Jira ticket from the Findings page](/img/jira-findings-page.png)<br />
2. Select **Create issue with `[YOUR_INTEGRATION_NAME]`**.
![Output of Jira integration](/img/jira-template.png)
--->

## Notification and alert de-duplication

Notifications are sent only the first time a given finding is detected.

Because of Semgrep CI's diff-awareness, you will not be notified
when a pull request has a finding that existed on the base branch already,
even if that line is moved or re-indented.

Semgrep Cloud Platform also keeps track of notifications that have already been sent,
so consecutive scans of the same changes in the same pull request
won't send duplicate notifications.

<!--- Deprecated
### Amazon S3

1. In **Integrations,** click **Add Integration**.
2. Click **AWS S3**.
3. Enter the AWS 3 **Channel name**. This is where Semgrep will post findings.
4. Optional: Select the **Inventory** check box to receive notifications about Code Asset Inventory findings.
5. To ensure that Semgrep can post to your channel, click **Test**.
6. Click **Save.**
7. Turn notifications on by going to the **Rule board**, clicking on the <i class="fa-solid fa-gear"></i> **gear** icon, then click the <i class="fa-solid fa-toggle-large-on"></i> **toggle** next to the name of the integration.
--->

<MoreHelp />
