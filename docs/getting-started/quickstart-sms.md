---
slug: quickstart-managed-scans
append_help_link: true
title: "Quickstart: Managed Scans"
hide_title: true
description: Set up Semgrep Managed Scans when you sign in to Semgrep for the first time.
tags:
  - Quickstart
  - Semgrep AppSec Platform
---

# Quickstart for Semgrep Managed Scans

Semgrep Managed Scans (beta) is the fastest method to scan repositories at scale with Semgrep. Instead of adding Semgrep to your CI/CD pipeline, which requires a configuration file for each repository, Semgrep handles the scan process for all of the repositories you add.

## Supported source code managers

Semgrep Managed Scans is available for **GitHub-hosted (GitHub.com) and GitHub Enterprise Server** plans.

Semgrep Managed Scans is in private beta for users with GitLab Cloud and GitLab self-managed plans. Contact your Semgrep account executive or email the Support team at [support@semgrep.com](mailto:support@semgrep.com) to obtain access.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="gh"
    values={[
    {label: 'GitHub', value: 'gh'},
    {label: 'GitLab', value: 'gl'},
    ]}
>

<TabItem value='gh'>

## Requirements

To enable and use this feature, you must grant Semgrep **Read access** to your code. Steps are provided in [Add repositories to Semgrep Managed Scans](#add-repositories-to-semgrep-managed-scans).

Read access is permitted through a private Semgrep app that you create and register yourself. See [Managed Scans > Security](/deployment/managed-scanning#security) for more information on how Semgrep handles your code.

## Prerequisites

Admin access to your GitHub organization.

## Add repositories to Semgrep Managed Scans

<!-- vale off -->
<!-- Our in-product text reads "repos" -->

1. Navigate to [Semgrep AppSec Platform](https://semgrep.dev/login), and sign up by clicking on **Sign in with GitHub**. Follow the on-screen prompts to [grant Semgrep the necessary permissions](/deployment/checklist/#permissions) and proceed.
1. Provide the **Organization display name** you'd like to use, then click **Create new organization**.
1. When asked **Where do you want to scan?** click **GitHub**.
1. Follow the steps in the **Connect GitHub to Semgrep** page. These steps install a public GitHub app, which handles PR comments, and a private GitHub app, which handles code access. You are able to select which repositories these apps have access to, and have full control over removing them or revoking their permissions.
1. Click **Set up projects**. You are taken to the **Enable Managed Scans for repos** page.
1. Select all the repositories you want to add to Semgrep Managed Scans for scanning.
1. Click **Enable Managed Scans**. You are taken to the **Projects** page as your scans begin.

<!-- vale on -->

</TabItem>
<TabItem value='gl'>

## Requirements

Read access is granted through an access token that you generate on GitLab. You can provide this token by [adding GitLab as a source code manager](/deployment/connect-scm).

## Prerequisites

Admin access to your GitLab organization.

## Add repositories to Semgrep Managed Scans

<!-- vale off -->
1. Navigate to [Semgrep AppSec Platform](https://semgrep.dev/login), and sign up by clicking on **Sign in with GitLab**. Follow the on-screen prompts to proceed.
2. When prompted, click **Scan new project > Semgrep Managed Scan**.
4. In the **Enable Managed Scans for repos** page, select the repositories you want to add to Semgrep Managed Scans.
5. Click **Enable Managed Scans**. The **Enable Managed Scans** dialog appears. By default, Semgrep runs both full and diff-aware scans.
6. Click **Enable**. You are taken to the **Projects** page as your scans begin.
<!-- vale on -->

</TabItem>
</Tabs>

You have finished setting up a Semgrep managed scan.

Here are some behaviors and characteristics of a managed scan:

- After enabling Managed Scans, Semgrep performs a full scan in batches on all the repositories that have been added to it.
- Once a repository has been added to Semgrep AppSec Platform, it becomes a **project**. A project in Semgrep AppSec Platform includes all the findings, history, and scan metadata of that repository.
- Projects scanned through Managed Scans are tagged with `managed-scan`.

## Next steps

Once a scan has finished, you can view your findings by clicking any of the following on the navigation menu:

- [<i class="fas fa-external-link fa-xs"></i>  Code](https://semgrep.dev/orgs/-/findings?tab=open&primary=true) for SAST findings
- [<i class="fas fa-external-link fa-xs"></i> Secrets](https://semgrep.dev/orgs/-/secrets?tab=open&validation_state=confirmed_valid,validation_error,no_validator) for secrets findings
- [<i class="fas fa-external-link fa-xs"></i> Supply Chain](https://semgrep.dev/orgs/-/supply-chain/vulnerabilities?primary=true&tab=open) for SCA findings

To learn more about how Semgrep manages your scans, read the in-depth [Semgrep Managed Scans documentation](/deployment/managed-scanning).
