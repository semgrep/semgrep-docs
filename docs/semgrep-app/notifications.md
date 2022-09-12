---
slug: notifications
append_help_link: true
title: Notifications
hide_title: true
description: "Semgrep CI integrates with 3rd party services when connected to Semgrep App. Learn how to get Slack or email alerts about findings and failures, how to get merge or pull request comments in your CI/CD pipeline, or how to integrate using webhooks."
tags:
    - Semgrep App
    - Community Tier
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"
import ProcedureIntegrateSlack from "/src/components/procedure/_integrate-slack.mdx"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>

# Notifications

Semgrep CI integrates with 3rd party services when connected to Semgrep App.
When integrations are configured, you can receive notifications about Semgrep CI findings and failures.

## De-duplication

Notifications are sent only the first time a given finding is seen.

Because of Semgrep CI's diff-awareness, you will not be notified
when a pull request has a finding that existed on the base branch already,
even if that line is moved or re-indented.

Semgrep App also keeps track of notifications that have already been sent,
so consecutive scans of the same changes in the same pull request
won't send duplicate notifications.

## Adding notification channels

### Slack

<ProcedureIntegrateSlack />

### Email

To receive email notifications about Semgrep findings on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations) and select 'Add integration' or 'Setup First Integration,' and then choose 'Email'. Enter your email address, give the channel a name of your choosing, and then click 'Save'.

On each scan that has at least one finding, you will receive one email from Semgrep with a summary of all of the findings from that scan.

### Enabling GitHub pull request comments

Pull request comments are created when:

1. Semgrep finds a result in CI.
2. The Semgrep GitHub App has permissions to post inline PR comments.

Automated comments on GitHub pull requests are displayed as follows:

![Screenshot of a GitHub PR comment](/img/semgrep-pull-request.png)
<br />
An inline GitHub pull request comment.

Note that [Semgrep App](https://semgrep.dev/manage) uses the permissions requested by [the Semgrep GitHub App](https://github.com/marketplace/semgrep-dev) to leave PR comments. You can verify that you have granted these permissions by visiting either `https://github.com/organizations/<your_org_name>/settings/installations` or `https://github.com/organizations/<your_org_name>/<your_repo_name>/settings/installations`.

If you are using GitHub Actions to run Semgrep, no extra changes are needed to get PR comments. If you are using another CI provider, in addition to the environment variables you set after following [sample CI configurations](/semgrep-ci/sample-ci-configs/) you need to ensure that the following environment variables are correctly defined:

- `SEMGREP_PR_ID` is set to the PR number of the pull request on Github (for example, `2901`)
- `SEMGREP_REPO_NAME` is set to the repo name (for example, `returntocorp/semgrep`)
- `SEMGREP_REPO_URL` is set to the repository URL where your project is viewable online (for example, `https://github.com/returntocorp/semgrep`)

### Enabling GitLab merge request comments

This section documents how to enable Semgrep App to post comments on merge requests.

Automated comments on GitLab merge requests are displayed as follows:

<img width="600" src="/do/img/gitlab-mr-comment.png" alt="Screenshot of a GitLab MR comment" /><br />
An inline GitLab merge request comment left by a custom Semgrep rule

To enable GitLab merge request comments, follow these steps: 

1. Log into Semgrep's [Settings](https://semgrep.dev/manage/settings) to obtain your deployment ID and an API token.
2. Create an API token in GitLab by going to [Profile > Access Tokens](https://gitlab.com/-/profile/personal_access_tokens) and adding a token with `api` scope.
3. Copy the token created in the previous step.
4. Navigate to your repository's Settings > CI/CD, scroll down to 'Variables', and click 'Expand'. The URL of the page where you are ends with: /username/project/-/settings/ci_cd.
5. Click to **Add variable**, give the new variable the key `PAT` and use the token you copied in step 3 as the value. And then, select **mask variable** and **UNSELECT "protect variable"**.
6. Update your `.gitlab-ci.yml` file with variable `GITLAB_TOKEN` and value `$PAT`. See the example below:
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

For more config options, see [GitLab CI Sample](https://semgrep.dev/docs/semgrep-ci/sample-ci-configs/#gitlab-ci).

:::note
GitLab MR comments are only available to logged-in Semgrep users, as they require a Semgrep API token.
:::

### Automatically fix your findings through pull or merge requests

[Autofix](../experiments/overview.md/#autofix) is a Semgrep feature in which rules contain suggested fixes to resolve findings. Either metavariables or regex matches are replaced with a potential fix. Due to their complexity, not all rules make use of autofix, but for rules that use this feature, autofix allows you to quickly resolve findings as part of your code review workflow. Semgrep App can suggest these fixes through PR or MR comments within GitHub or GitLab, thus integrating seamlessly with your review environment.

Autofix is free to use for all tiers.

In the following screenshot, Semgrep detects the use of a native Python XML library, which is vulnerable to XML external entity (XXE) attacks. The PR comment automatically suggests a fix by replacing `import xml` to `import defusedxml`.

![Screenshot of a sample autofix PR suggestion](/img/notifications-github-suggestions.png)


#### Enabling autofix for your GitLab or GitHub code repository

Autofix requires PR or MR comments to be enabled for your repository or organization. Follow the steps in [GitHub pull request comments](#github-pull-request-comments) or [GitLab merge request comments](#gitlab-merge-request-comments) to enable this feature.

To enable autofix:

1. Sign in to your [Semgrep App account](https://semgrep.dev/login).
2. Click **Projects** from the **App sidebar**.
3. Click the name of the project for which to enable autofix.
4. Click the toggle for **Autofix (beta)**.
![Screenshot of autofix toggle](/img/notifications-enable-autofix.png)

All scans performed after enabling autofix generate inline PR or MR comments with code suggestions for applicable rules.

### Webhooks

Webhook notifications are a paid feature in the Semgrep Team tier.

To receive webhook notifications on pull requests and code pushes, visit [Dashboard > Integrations](https://semgrep.dev/manage/integrations) and select 'Add integration' or 'Setup First Integration,' and then choose 'Webhook'. Enter a target URL, give the notification channel a name of your choosing, and then click 'Save'.

#### Findings

Semgrep App will send a POST request containing an array of all the scan's findings.

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

#### Scan

Semgrep App will send a POST request containing information about the scan.

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

<MoreHelp />
