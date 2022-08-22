---
slug: scm 
append_help_link: true
title: Integrating Semgrep into source code management (SCM) tools
description: "Integrate Semgrep into self-hosted and custom SCM tools such as GitHub Enterprise and GitLab Self Hosted."
hide_title: true
---

import MoreHelp from "/src/components/MoreHelp"

# Integrating Semgrep into source code management (SCM) tools

Semgrep App's Team and Enterprise tiers support repositories hosted on **GitHub Enterprise (GHE)** and **GitLab Self Managed (GLSM)** plans. When referring to SCM tools, this term means explicitly GHE or GLSM plans in this document.

:::note
This document covers the enablement of features for GitHub Enterprise **self-hosted** plans. For users of GitHub Enterprise **Cloud** plans, see [Getting started with Semgrep App](/docs/semgrep-app/getting-started-with-semgrep-app).
:::

## Prerequisites

You need the following permissions to integrate Semgrep into GHE Server or GLSM servers:


* Permission to create a **personal access token (PAT)** for the repository to scan with Semgrep. This PAT is used to enable Semgrep App to create pull request (PR) or merge request (MR) comments for findings. These comments provide a description of the issue detected by Semgrep and may offer possible solutions.
* Permission to add **CI/CD secrets** into your [GitHub](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or [GitLab](https://docs.gitlab.com/ee/ci/secrets/) environments.

### Table of required scopes for PATs

Semgrep App requires PATs with assigned scopes. These scopes grant necessary permissions to the PAT and vary depending on the user's SCM.

| GitHub Enterprise Self-Hosted          | GitLab Self-Managed        |
|:---------------------------|:---------------------------|
| <ul><li>`public_repo`</li> <li>`repo:status`</li> <li>`user:email`</li> <li>`write:discussion`</li></ul> | `api` |



## Integrating Semgrep into GitHub Enterprise or GitLab Self Managed 

Integrate Semgrep into these custom source code management (SCM) tools by following the steps below:

1. Sign in to [Semgrep App](https://semgrep.dev/login).
2. Click **Settings** > **SCM management** > **Configure new SCM**.

<div class = "bordered">

![Screenshot of SCM configuration tab](/img/app-scm.png)

</div>

3. Select your SCM provider.
4. For **GitHub Enterprise Self-Hosted**, follow these steps:
    1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.github.com/en/enterprise-server@3.1/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Ensure that the PAT is **[created with the required scopes](../scm/#table-of-required-scopes-for-pats)**.
    2. Enter the personal access token generated into the **Access Token** field.
    3. Enter your GHE Self-Hosted base URL into the **SCM Base URL**.
5. For **GitLab Self Managed**, follow these steps:
    1. Create a PAT by following the steps outlined in this [guide to creating a PAT](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). Ensure that the PAT is **[created with the required scopes](../scm/#table-of-required-scopes-for-pats)**.
    2. Enter the personal access token generated into the **Access Token** field.
    3. Enter your GLSM base URL into the **SCM Base URL** field.
6. Ensure that your SCM integration successfully detects repositories by following the steps below:
    1. Click **Projects > Setup New Project**.
    2. Select your CI provider.
    3. Semgrep App detects repositories from your SCM integration.
7. Add a new repository by following the steps in [Adding a project](../getting-started-with-semgrep-app/#adding-a-project).

## Receiving PR or MR comments in your VPN or on-premise SCM

PR or MR comments are comments or suggestions made by Semgrep App in your source code management tool. These comments provide a description of the issue detected by Semgrep and may offer possible solutions. These comments are a means for security teams (or any team responsible for creating standards) to help their fellow developers write safe and standards-compliant code.

To enable this feature within self-hosted SCMs behind firewalls or VPNs (Virtual Private Networks), follow the steps below.

 1. Add the IP address `52.34.175.113` to your VPN's allowlist. This IP address is **static and outbound**.
 2. Test that you are able to receive findings by manually triggering a scan through your CI provider.

:::tip
Receiving PR or MR comments may require additional steps depending on the custom configuration of your VPN or SCM (for example, if you use a static IP without a hostname). Reach out to Semgrep support through the [r2c Community Slack](https://r2c.dev/slack) or send an email to [support@r2c.dev](mailto:support@r2c.dev) for any concerns.
:::

## Additional references
* [Semgrep's May 2022 updates: DeepSemgrep, New Playground, and Self Managed GitHub and GitLab support](https://r2c.dev/blog/2022/semgreps-may-2022-updates/)


<MoreHelp />
