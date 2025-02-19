---
slug: wiz
append_help_link: true
title: Wiz
hide_title: true
description: "Learn how to view Semgrep findings in Wiz's Security Graph."
tags:
 - Wiz
 - Semgrep AppSec Platform
---

# View Semgrep findings in Wiz's Security Graph

Send Semgrep Code findings for inclusion in the Wiz Security Graph.

## Prerequisites and requirements

To send Semgrep Code findings to Wiz:

- You must have a license for Wiz Code
- You must have a Wiz service account that provides Semgrep with the following scopes: `create:external_data_ingestion`, `read:system_activities`, and `read:resources`. If you don't have a service account:
    1. Create a [Wiz service account](https://docs.wiz.io/wiz-docs/docs/service-accounts-settings?lng=en). When prompted to select the **Type** of the service account, select 
    2. Copy the Client ID and Client Secret provided. You must provide this information to Semgrep at a later stage.
- You must have a Wiz user account with sufficient permissions to create a service account, if needed, and integrations.

## Limitations

Currently, Semgrep supports the sending of Semgrep Code findings originating from full scans. Semgrep doesn't send data originating from diff-aware scans.

Semgrep sends data to Wiz every 24 hours. You can choose the data that Semgrep sends:

  - **Default**: Only high severity SAST findings for all repos in your org
  - **Custom**: Sends findings for any severity selected and for repos chosen

Findings previously sent but not included in submissions are marked as fixed in Wiz.

## Configure the Semgrep integration with Wiz

1. Sign in to [Semgrep](https://semgrep.dev/login).
1. In the navigation bar, click **Settings**.
2. Navigate to **Integrations**, and click **+ Add > Wiz**. 
3. In the dialog that appears, provide the following information. You can obtain the API Endpoint URL and the Authentication URL from Wiz in [Tenant Info](https://app.wiz.io/tenant-info/general), while Wiz provides the Client ID and Client Secret when you set up a service account.
   1. API Endpoint URL
   2. Authentication URL
   3. Client ID
   4. Client Secret
4. Click **Connect**.
5. If Semgrep successfully creates the connection, a dialog pops up that says, "Wiz credential created successfully." Semgrep also lists Wiz as an integration; you can verify the connection again by clicking **Test connection**.

## Edit the integration

1. Sign in to [Semgrep](https://semgrep.dev/login).
1. In the navigation bar, click **Settings**.
1. Navigate to **Integrations**, and find the **Wiz** integration.
1. Click **Edit**, and update the information required by Wiz as needed.
1. Click **Save changes**.

TODO: Choose what gets sent?

## Delete the integration

1. Sign in to [Semgrep](https://semgrep.dev/login).
1. In the navigation bar, click **Settings**.
1. Navigate to **Integrations**, and find the **Wiz** integration.
1. Click the **<i class="fa-solid fa-trash"></i> trash can** icon.
1. Click **Delete** to confirm.

## Configure Wiz

<!-- If the user has to do anything from the Wiz end, e.g., set up an integration, include the steps here. -->
