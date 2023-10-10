---
slug: /semgrep-secrets/getting-started
append_help_link: true
title: Getting started with Semgrep Secrets
hide_title: true
description: tk
tags:
  - Semgrep Secrets
---

# Getting started with Semgrep Secrets

Detect and triage leaked secrets and credentials by scanning with Semgrep Secrets.

Save time by prioritizing which secrets to rotate based on whether they are valid (active and in-use) or not.

This document guides you through the following:

* Enabling Semgrep Secrets
* Receiving findings in GitHub PR comments
* Triaging findings

To learn about how Semgrep Secrets detects secrets, see [<i class="fa-regular fa-file-lines"></i> Conceptual overview of Semgrep Secrets](/docs/semgrep-secrets/conceptual-overview).

:::info Feature maturity
* This feature is in public beta.
* You or your developers may encounter rough edges. For issues, reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com).
:::

:::tip Sign-up
To gain access to this feature, fill out the [<i class="fas fa-external-link fa-xs"></i> Semgrep Secrets Beta](https://get.semgrep.dev/secrets-beta-request.html) form.
:::

## Supported developer environments and features

This section lists the source code managers (SCMs) that Semgrep Secrets supports.

| Source code manager                                     | Semgrep Secrets | PR or MR comments for valid secrets findings |
| -------------------                                     | --------------- | ----------------------------------------------   |
| GitHub - Free and Team                                  | ✔️               | ✔️                                                |
| GitHub - Enterprise Cloud                               | ✔️               | ✔️                                                |
| GitHub - Enterprise Server                              | ✔️               | ?                                                |
| GitLab.com (hosted plans) - Free, Premium, and Ultimate | ✔️               | ✔️                                                |
| GitLab - Self-Managed plans                             | ✔️               | ?                                                |

## Enabling Semgrep Secrets

:::info Prerequisites
* Semgrep Secrets can only be enabled through Semgrep Cloud Platform (SCP). [<i class="fas fa-external-link fa-xs"></i> Create an account](https://semgrep.dev/login) to enable Semgrep Secrets.
* You have added or onboarded at least one repository to Semgrep Cloud Platform for scanning. See Starting a SAST and SCA scan on a remote repository.
:::

1. [<i class="fas fa-external-link fa-xs"></i> Sign in to Semgrep Cloud Platform](https://semgrep.dev/login).
2. Click **<i class="fa-solid fa-gear"></i> Settings**.
3. In the Products section, click the **<i class="fa-solid fa-toggle-large-on"></i> Secrets** toggle.
4. Optional: After enabling Semgrep Secrets, you can trigger a full scan manually through your CI provider or wait for your scheduled Semgrep full scan, typically daily.

## Scanning environments

A scan can be triggered in the following environments:

* You can start a scan **manually** from your CI provider if your CI provider supports running CI jobs on-demand. Refer to your CI provider's documentation for details.
* You can start a scan **from your CLI**. It is recommended to run CLI scans on non-mainline branches, such as feature branches.
* When you **open a PR or MR**, Semgrep automatically scans the branch.

### Scanning for secrets through a CI job

After following the steps in [Enabling Semgrep Secrets](#enabling-semgrep-secrets), all Semgrep scans in your CI jobs include secret scanning. There are no additional steps to take.

After each scan, your findings are displayed in **Semgrep Cloud Platform > Secrets**.

:::caution Troubleshooting
If you do not receive any secrets findings in your scans after enabling Semgrep Secrets, check the following:

* Check the job's log in your CI provider.
    * Search for the following line or similar to ensure that a secrets scan was included as part of the scan: `Enabled products: Semgrep Code, Semgrep Supply Chain, Semgrep Secrets`
    * If the log does not include the line, your CI job may be running an out-of-date Semgrep version or the wrong semgrep command. Ensure that your Docker image or custom runner is up-to-date, and ensure that you are running `semgrep ci`.
* Feel free to contact [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) for additional assistance.
* If a secrets scan ran successfully, it is unlikely but possible that there are no findings.
:::

### Scanning for secrets in your local development machine (CLI)

:::info Prerequisites
* An up-to-date installation of the Semgrep CLI tool. Semgrep Secrets does not work on older versions of Semgrep. See [<i class="fa-regular fa-file-lines"></i> Getting started](https://semgrep.dev/docs/getting-started/#installing-and-running-semgrep-locally).
* An existing Semgrep Cloud Platform account.
* An existing Semgrep organization.
* Semgrep Secrets must be enabled in Semgrep Cloud Platform.
:::

You can scan for secrets from your local development machine by using the Semgrep CLI tool. 


1. Ensure you are logged in to Semgrep:
```
semgrep login
```
2. Run a scan:
```
semgrep ci
```
3. Once the scan has completed, you can view that repository's findings in Semgrep Cloud Platform by logging in then clicking **Projects**, then the number of Secrets findings under <span className="placeholder">REPOSITORY_NAME</span>. <br />
![The number of Secrets findings can be seen in the Projects page.](/img/secrets-projects.png#md-width)

Findings from local scans are differentiated from their remote counterparts through their slugs. Remote repositories are identified as <span className="placeholder">  ACCOUNT_NAME/REPOSITORY_NAME</span>, while local repositories are identified as <span className="placeholder">REPOSITORY_NAME</span>.

## Receiving findings in GitHub or GitLab through PR or MR comments

This section describes how to set up PR or MR comments from Semgrep. 


:::info
After enabling this feature, only **valid** (active) secrets-related findings leave a PR or MR comment.
:::
### Findings in GitHub pull requests
<!-- For support folks: this is currently gated for the beta, and there's no UI toggle for it yet. (As of Oct 5, 2023; see resolved comments in GDoc.) -->

Perform the following steps to receive Secrets findings as comments in GitHub PRs:

1. Follow the steps in [<i class="fa-regular fa-file-lines"></i> GitHub PR comments](/semgrep-cloud-platform/github-pr-comments/).
2. Inform [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) that you want to enable this feature.

### Findings in GitLab merge requests

Perform the following steps to receive Secrets findings as comments in GitLab MRs:

1. Follow the steps in [<i class="fa-regular fa-file-lines"></i> GitLab MR comments](/semgrep-cloud-platform/gitlab-mr-comments/).
2. Inform [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com) that you want to enable this feature.

## Receiving other notifications and alerts

You can receive findings notifications through the following channels:

* [<i class="fa-regular fa-file-lines"></i> Slack](/semgrep-cloud-platform/slack-notifications)
* [<i class="fa-regular fa-file-lines"></i> Email](/semgrep-cloud-platform/email-notifications)
* [<i class="fa-regular fa-file-lines"></i> Webhooks](/semgrep-cloud-platform/webhooks)

## Triaging secrets in Semgrep Cloud Platform

Triage secrets-related findings in the Secrets page. By default, all findings are displayed. A common triage workflow includes the following tasks:

1. Filtering for a particular characteristic of a finding, such as its **Validation status**, its **Repository or Branch**, or its **Type**.
2. Analyzing if the findings are true or false positives.
3. Applying a **triage state** to the filtered findings based on the analysis in step 2.
    1. Setting a finding as **Ignored** means that no action is undertaken and the finding is closed. Subsequent scans won't include this finding.
    1. Setting or retaining a finding as **Open** means that the finding is a true positive and needs to be fixed or resolved.
        1. Optional: You can create a ticket for **Linear, Jira, or Asana** to assign a developer to fix **Open** findings.
4. When commits are added to the PR or MR, Semgrep re-scans the PR or MR and detects if a finding is fixed. The finding is resolved automatically upon scanning. Users do not need to set a finding as **Fixed** manually.

### Common filtering use cases

Find and perform bulk operations through filtering. Perform all filter operations in the **Secrets** page.

| Task | Steps |
| ---- | ----- |
| Viewing valid findings | Under **Validation**, click **⚠️Confirmed valid**. |
| View findings in a specific project or branch |1. Under **Projects**, select a repository from the drop-down menu. <br /> 2. Under **Branches**, select a branch from the drop-down menu. |
| View findings of a specific type of secret, such as **personal token** or **password**. | Under **Type**, select a type of secret.
| View findings of a specific severity | Under **Severity**, select a value. |

![Secrets page and relevant triaging elements.](/img/secrets-triage.png#bordered)

**_Figure._** Secrets page and relevant triaging elements: (a) All available filters; (b) Bulk selection toggle; (c) Bulk triage button.

Triage findings in bulk by performing the following steps:

1. Begin by ensuring that you display all **Open** findings.
2. Apply filters with as much specificity as possible. You may have to perform bulk triage several times. By starting with the most specific cases, and closing the findings from those specific cases, you are able to narrow down findings as you work from specific to broad filter criteria.
3. Click the bulk select check box.
4. Click **Triage**, then your selected triage state, typically **Ignore**.
5. Optional: Repeat this procedure to triage all open findings.

### Complete Secrets page filter reference

This section describes what filters are available to quickly sort through findings and perform operations on filtered findings.

#### Triage Status

Severity
Refers to the impact of a leaked secret that has been detected.

High
[Wait for reviewer feedback]
Medium
[Wait for reviewer feedback]
Low
[Wait for reviewer feedback]

#### Validation
Refers to whether or not a secret is active and can be used to grant resources or authentication, or if a secret is inactive.

Confirmed valid
Semgrep Secrets has made an API call using the secret and it returned successfully and granted authentication or similar.

Confirmed invalid
Semgrep Secrets has made an API call using the Secret and it returned successfully but did not grant resources or authentication.

Validation error
A validation error, such as a timeout, has occurred. [what can the user do in this case  - run the validator function on their own? re-run the scan?]

No validator
Semgrep does not perform any validation on this finding. You must manually review the finding.

:::tip
Honeypot tokens are categorized under No validator.
:::

#### Repository visibility
Refers to whether or not the repository is a public repository or private. This is detected through your source code manager.

:::tip
Semgrep supports visibility detection only for GItHub repositories of any plan.
:::

Public
Repository access doesn't require authentication; at a minimum, it can be viewed by anyone.

Private
Repository access requires authentication. 

Unknown
Semgrep Secrets is unable to detect your repository visibility. This is typically assigned to:
* Scans from local developer machines.
* Scans from any non-GitHub source code manager, such as GitLab.

#### Type
<!-- Is there a specific file where I can view all the types? -->

Private Key
	(Wait for more information from reviewer)
Google Cloud

Connection URI

Unknown

#### Project
A repository that's been onboarded to Semgrep for scanning.

#### Branch
A branch of any Project.

## Creating tickets in Jira, Linear, or Asana for secrets-related findings

[This hasn't been pushed to staging yet (Oct 5)]
## Semgrep Secrets API

See [↗️Secrets API documentation](https://semgrep.dev/api/v1/docs/#tag/SecretsService). This API is able to expose a findings validation status.



