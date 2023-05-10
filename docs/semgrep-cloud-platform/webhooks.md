---
slug: webhooks 
append_help_link: true
title: Webhooks 
hide_title: true
description: "Create webhooks to receive Semgrep findings in your endpoints."
tags:
    - Semgrep Cloud Platform
    - Team & Enterprise Tier
---

import MoreHelp from "/src/components/MoreHelp"

<ul id="tag__badge-list">
{
Object.entries(frontMatter).filter(
    frontmatter => frontmatter[0] === 'tags')[0].pop().map(
    (value) => <li class='tag__badge-item'>{value}</li> )
}
</ul>


# Enabling webhooks

:::info Prerequisites
* A Team or Enterprise account.
* Webhooks can only be enabled through Semgrep Cloud Platform (SCP). [Create an account](/semgrep-code/getting-started/#signing-in-to-semgrep-cloud-platform) to set up webhooks.
* To receive alerts and notifications, you must [add or onboard a project](/semgrep-code/getting-started/#option-b-adding-a-repository-from-github-gitlab-or-bitbucket) (repository) to Semgrep Cloud Platform for scanning.
:::

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
    "commit_author_email": "support@semgrep.com",
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
