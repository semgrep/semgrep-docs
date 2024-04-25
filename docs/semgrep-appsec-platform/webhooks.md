---
slug: webhooks 
append_help_link: true
title: Webhooks 
hide_title: true
description: "Create webhooks to receive Semgrep findings in your endpoints."
tags:
    - Semgrep AppSec Platform
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

Webhooks are a generic method for Semgrep AppSec Platform to post JSON-formatted findings after each scan to your URL endpoint.

Semgrep AppSec Platform sends two types of JSON objects:

<dl>
<dt><code>semgrep_scan</code> JSON object</dt>
<dd> A <code>semgrep_scan</code> object contains information about the CI job and other scan parameters, such as ignored files. Semgrep AppSec Platform sends a single <code>semgrep_scan</code> object <strong>every time a scan is run</strong>. This includes diff-aware scans, full scans, and scans that have no findings.</dd>
<dt><code>semgrep_finding</code> JSON object</dt>
<dd>A <code>semgrep_finding</code> object is a single record of a new finding. Semgrep AppSec Platform sends new <code>semgrep_finding</code> objects based on how you have configured your notifications in Policies. See <a href="#setting-up-webhooks">Setting up webhooks</a> to learn more.</dd>
</dl>

## Setting up webhooks

Perform these steps in Semgrep AppSec Platform to set up webhooks:

1. Create a webhook integration:
    1. On the navigation menu, click **<i class="fa-solid fa-gear"></i> Settings > Integrations > Add Integration.**
    2. Click **Webhook**.
    3. In the **Name** field, enter a name for the integration.
    4. In the **Webhook URL** field, enter the target webhook URL for the integration.
    5. Optional: To ensure that Semgrep can post to your URL, click **Test**. The following screenshot displays the result of a successful webhook integration.
    ![Successful webhook integration test](/img/webhook-successful-test.png)
    6. Click **Save.**
2. Turn notifications on:
    1. Click **Rules > Policies > <i class="fa-solid fa-gear"></i> Rule Modes**.
    2. Click the **Edit** button of the Rule Mode for which you want to receive webhook notifications. For example, if you want to be notified of all blocking findings through webhooks, click the **Edit** button of the **Block** mode.
    3. Repeat the previous step for all Rule Modes that you want to receive notifications for.

## Findings

The following is an example of a `semgrep_finding` object:

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

## Scans

The following is an example of a `semgrep_scan` object:

```json
{
  "semgrep_scan": {
    "deployment_id": 1,
    "started_at": "2021-09-21T23:49:17.480929+00:00",
    "completed_at": null,
    "exit_code": null,
    "repository": "semgrep/semgrep-app",
    "ci_job_url": "https://github.com/semgrep/semgrep-app/actions/runs/1236121005",
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
