---
slug: checklist
append_help_link: true
title: Pre-deployment checklist
description: tk
tags:
  - Deployment
---

Before starting the deployment setup, use this checklist to ensure that:

- You have **access** to the resources needed to carry out the deployment.
- You and your organization agree on the **scope** of the deployment.

## Permissions and access 

Ensure that you and your deployment team have sufficient permissions to:

- Add or make changes to CI jobs.
- Create access tokens, such as CI/CD secrets, in your source code manager.
- Commit files to all repositories you want Semgrep to scan.
- For GitHub: Install GitHub apps.
- For self-hosted repositories:
    - Edit your firewall or VPN configuration's allowlist.
    - Add CI/CD secrets into your SCM.
        - [<i class="fas fa-external-link fa-xs"></i> GitHub guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
        - [<i class="fas fa-external-link fa-xs"></i> GitLab guide](https://docs.gitlab.com/ee/ci/secrets/)
- For SSO: View SSO configurations.
- For notifications: Set up channels in your chosen notification method (Slack, email, or webhooks).

tk to edit in
For GitHub or GitLab SaaS users: A GitHub or GitLab SaaS repository associated with your account.
For BitBucket SaaS users: A BitBucket repository and sufficient permissions to edit a BitBucket Pipeline and add repository variables.

## Resources

Ensure that you have met all the [<i class="fa-regular fa-file-lines"></i> Prerequisites](/getting-started/prerequisites) for Semgrep.

Ensure that you and your deployment team agree on:

- What roles or departments will use Semgrep.
- The number of repositories you will scan with Semgrep.


## Processes

Determine the following:

- When you want to run a scan; common options include:
    - On a recurring schedule, such as daily or weekly. It is recommended to run Semgrep daily.
    - On certain events, such as a pull or merge request.
- On what branches you want to run a scan:
    - Feature branches.
    - Main or trunk branches.

## Roles

- Establish the administrators (admins) that own the Semgrep deployment.
