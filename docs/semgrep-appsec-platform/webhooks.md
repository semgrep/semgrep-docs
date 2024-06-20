---
slug: webhooks
append_help_link: true
title: Webhooks
hide_title: true
description: "Create webhooks to receive Semgrep findings in your endpoints."
tags:
    - Semgrep AppSec Platform
---

import Notifications from "/src/components/concept/_notification-deduplication.mdx"

# Enable webhooks

Webhooks are a generic method for Semgrep AppSec Platform to post JSON-formatted findings after each scan to your URL endpoint.

Semgrep sends two types of JSON objects:

<dl>
<dt><code>semgrep_scan</code> JSON object</dt>
<dd> A <code>semgrep_scan</code> object contains information about the CI job and other scan parameters, such as ignored files. Semgrep sends a single <code>semgrep_scan</code> object <strong>every time a scan is run</strong>. This includes diff-aware scans, full scans, and scans that have no findings.</dd>
<dt><code>semgrep_finding</code> JSON object</dt>
<dd>A <code>semgrep_finding</code> object is a single record of a new finding. Semgrep sends new <code>semgrep_finding</code> objects based on how you have configured your notifications in Policies. See <a href="#setting-up-webhooks">Setting up webhooks</a> to learn more.</dd>
</dl>

## Set up webhooks

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

<Notifications />

## Semgrep findings object

The following is an example of a `semgrep_finding` object sent by Semgrep:

```json
[
  {
    "semgrep_finding": {
      "check_id": "javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection",
      "column": 28,
      "commit_date": "2024-06-11T20:39:36",
      "commit_url": "https://github.com/owasp/juice-shop/commit/1bb71fff3589e51293e373274092d82c426025d2",
      "end_column": 159,
      "end_line": 10,
      "first_seen_scan_id": "j4an6ro33aJM",
      "id": "c409ef941eec3008da6e1fd347e793aa",
      "index": 0,
      "line": 10,
      "message": "Detected a sequelize statement that is tainted by user-input. This could lead to SQL injection if the variable is user-controlled and is not properly sanitized. In order to prevent SQL injection, it is recommended to use parameterized queries or prepared statements.",
      "metadata": {
        "category": "security",
        "confidence": "HIGH",
        "cwe": [
          "CWE-89: Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')"
        ],
        "cwe2021-top25": 1,
        "cwe2022-top25": 1,
        "dev.semgrep.actions": [
          "comment"
        ],
        "impact": "HIGH",
        "interfile": 1,
        "license": "Commons Clause License Condition v1.0[LGPL-2.1-only]",
        "likelihood": "HIGH",
        "owasp": [
          "A01:2017 - Injection",
          "A03:2021 - Injection"
        ],
        "references": [
          "https://sequelize.org/docs/v6/core-concepts/raw-queries/#replacements"
        ],
        "semgrep.dev": {
          "rule": {
            "origin": "community",
            "r_id": 22085,
            "rule_id": "yyU0GX",
            "rule_name": "javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection",
            "rv_id": 109973,
            "url": "https://semgrep.dev/playground/r/3ZTkQwW/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection",
            "version_id": "3ZTkQwW"
          },
          "src": "unchanged"
        },
        "semgrep.policy": {
          "id": 61271,
          "name": "Rule Board - PR Comments column",
          "slug": "rule-board-pr-comments"
        },
        "semgrep.url": "https://semgrep.dev/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection",
        "shortlink": "https://sg.run/gjoe",
        "source": "https://semgrep.dev/r/javascript.sequelize.security.audit.sequelize-injection-express.express-sequelize-injection",
        "subcategory": [
          "vuln"
        ],
        "technology": [
          "express"
        ],
        "vulnerability_class": [
          "SQL Injection"
        ]
      },
      "numeric_id": 11301071,
      "path": "data/static/codefixes/unionSqlInjectionChallenge_3.ts",
      "ref": "refs/heads/master",
      "repo_name": "owasp/juice-shop",
      "severity": 2,
      "start_date": "2023-02-12 00:50:21.552606+00:00"
    }
  }
]
```

## Semgrep scan object

The following is an example of a `semgrep_scan` object sent by Semgrep:

```json
{
  "semgrep_scan": {
    "deployment_id": 12431,
    "enabled_products": [
      "sast",
      "sca",
      "secrets"
    ],
    "exit_code": null,
    "hashed_id": "Y4QdEwR2qPgK",
    "id": 27714135,
    "meta": {
      "app_block_override": null,
      "branch": "refs/pull/7/merge",
      "ci_job_url": "https://github.com/owasp/juice-shop/actions/runs/9999999",
      "commit": "4166d6fd19ce97e65cf3278ce85afe4f444a7842",
      "commit_author_image_url": "https://avatars.githubusercontent.com/u/1274037?v=4",
      "commit_author_email": "support@semgrep.com",
      "commit_author_name": "Semgrep User",
      "commit_author_username": "semgrepuser",
      "commit_timestamp": "2024-06-11T21:25:13",
      "commit_title": "random code changes",
      "is_code_scan": 0,
      "is_full_scan": 0,
      "is_sca_scan": 0,
      "is_secrets_scan": 0,
      "on": "pull_request",
      "org_id": "1274037",
      "pull_request_author_username": "semgrepuser",
      "pull_request_author_image_url": "https://avatars.githubusercontent.com/u/29760937?s=200&v=4",
      "pull_request_id": "7",
      "pull_request_title": "random code changes",
      "renamed_paths": [],
      "repo_display_name": "owasp/juice-shop",
      "repo_id": "600593544",
      "repo_url": "https://github.com/owasp/juice-shop",
      "repository": "owasp/juice-shop",
      "scan_environment": "github-actions",
      "semgrep_version": "1.75.0",
      "version": "v1"
    },
    "repository_id": 158684,
    "started_at": "2024-06-11T21:26:22.844158+00:00",
    "completed_at": null,
    "stats": null,
    "tenant_name": "default"
  }
}
```
