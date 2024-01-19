---
slug: add-semgrep-to-cicd
title: Add Semgrep to CI/CD
hide_title: true
description: tk
tags:
  - Deployment
---

import MoreHelp from "/src/components/MoreHelp"

# Add Semgrep to CI/CD

:::note Your deployment journey
- You have [<i class="fa-regular fa-file-lines"></i> created a Semgrep account and organization](/deployment/create-account-and-orgs). 
- For GitHub and GitLab users: You have [<i class="fa-regular fa-file-lines"></i> connected your source code manager](/deployment/connect-scm).
- Optionally, you have [<i class="fa-regular fa-file-lines"></i> set up SSO](/deployment/sso).
:::

Semgrep is integrated into CI environments by creating a **job** (also known as an **action** for some CI providers) that is run by the CI provider. After a scan, findings are sent to Semgrep Cloud Platform for triage and remediation. 
