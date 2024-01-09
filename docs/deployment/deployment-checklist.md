---
slug: checklist
append_help_link: true
title: Pre-deployment checklist
description: tk
tags:
  - Deployment
---

Before starting the deployment set-up, use this checklist to ensure that:

- You have **access** to the resources needed to carry out the deployment.
- You and your organization agree on the **scope** of the deployment.

## Permissions and  access 

Ensure that you and your deployment team have sufficient permissions to:

- Add or make changes to CI jobs.
- Create access tokens in your source code manager.
- Commit files to all repositories you want Semgrep to scan.
- (Optional) View SSO configurations.
- (Optional) Set up channels in your chosen notification method (Slack, email, or webhooks).
- (For self-hosted repositories) Edit your firewall or VPN configuration's allowlist.

## Resources

Determine the following:

- What roles or departments will use Semgrep.
- The number of repositories you will scan with Semgrep.

## Processes

Determine the following:

- When you want to run a scan:
    - On a recurring schedule, such as daily or weekly. It is recommended to run Semgrep daily.
    - On certain events, such as a pull or merge request.
- On what branches you want to run a scan:
    - Feature branches.
    - Main or trunk branches.
