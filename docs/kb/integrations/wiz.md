---
slug: wiz
append_help_link: true
title: View Semgrep findings in Wiz's Security Graph
hide_title: true
description: "Learn how to view Semgrep findings in Wiz's Security Graph."
unlisted: true
tags:
 - Wiz
 - Semgrep AppSec Platform
---

# View Semgrep findings in Wiz's Security Graph

Semgrep integrates with Wiz by calling Wiz’s GraphQL API endpoints and uploading your static analysis (SAST) vulnerability findings to a dedicated Amazon S3 bucket. Your Semgrep SAST vulnerability findings are mapped to the same correlated repository scanned by Wiz and enriched by any available inventory and runtime-related data, such as clusters, pods, containers, cloud configurations, and more. Semgrep's goal is to give you a holistic view of your code and infrastructure security so that you can focus on what matters most.

## Prerequisites and requirements

This integration is available for users with both a [Semgrep Code license](https://semgrep.dev/products/semgrep-code/) and a [Wiz Code Security license](https://www.wiz.io/platform/wiz-code). 

To send Semgrep Code findings to Wiz:

- You must have a Wiz service account with sufficient permissions to create a service account, if needed, and integrations. The service account must be able to provide Semgrep with the following scopes: `create:external_data_ingestion`, `read:system_activities`, and `read:resources`. If you don't have a service account:
    1. Create a [Wiz service account](https://docs.wiz.io/wiz-docs/docs/service-accounts-settings?lng=en). When prompted to select the **Type** of the service account, select **Custom Integration (GraphQL API)**.
    2. Copy the Wiz **Client ID** and **Client Secret** provided. You must provide this information to Semgrep at a later stage.
- You must add the [Semgrep integration](https://app.wiz.io/settings/automation/integrations) from the Wiz Integration Network. During this process, save the following values shown to you:
   1. API Endpoint URL
   2. Authentication URL

## Limitations

Semgrep sends data to Wiz after every successful full scan; Semgrep does not send data from diff-aware scans. Wiz batches and syncs your data once every 24 hours.

By default, the Code findings that Semgrep sends are:

- High severity
- From full scans
- From the default branch of each repository

Semgrep sends findings from all repositories in your organization. Findings previously sent but not included in submissions are marked as fixed in Wiz.

## Add the Semgrep integration from the Wiz Integration Network

To add the Semgrep integration from the Wiz Integration Network:

1. Sign in to [Wiz](https://app.wiz.io/login).
2. Ensure that the account you're using has been assigned the `create:integrations` access scope.
3. Using the navigation bar, go to **Settings > Integrations**.
4. lick **Add Integration**.
5. Find the **Semgrep** integration card and click **Add**.
6. Follow the on-screen steps provided by Wiz to complete the setup of the Semgrep integration. Ensure that you save the following information when provided by Wiz: 
   1. API Endpoint URL
   2. Authentication URL

## Configure the integration in Semgrep

Once you've added the Semgrep integration from the Wiz Integration Network, you must continue the setup process in Semgrep:

1. Sign in to [Semgrep](https://semgrep.dev/login).
1. In the navigation bar, click **Settings**.
2. Navigate to **Integrations**, and click **+ Add > Wiz**. 
3. In the dialog that appears, provide the following information:
   1. API Endpoint URL
   2. Authentication URL
   3. Client ID
   4. Client Secret
   You can obtain the API Endpoint URL and the Authentication URL from Wiz in [Tenant Info](https://app.wiz.io/tenant-info/general), while Wiz provides the Client ID and Client Secret when you set up a service account.
4. Click **Connect**.
5. If Semgrep successfully creates the connection, a dialog pops up that says, "Wiz credential created successfully." Semgrep also lists Wiz as an integration; you can verify the connection again by clicking **Test connection**.
   ![Semgrep displays a success message if you configure the integration correctly.](/img/kb/wiz-semgrep-integration.png#md-width)
   _**Figure**. Semgrep displays a success message if you configure the integration correctly._

### Edit the integration

To edit the integration:

1. Sign in to [Semgrep](https://semgrep.dev/login).
2. In the navigation bar, click **Settings**.
3. Navigate to **Integrations**, and find the **Wiz** integration.
4. Click **Edit**, and update the information required by Wiz as needed.
5. Click **Save changes**.

### Delete the integration

To delete the integration:

1. Sign in to [Semgrep](https://semgrep.dev/login).
2. In the navigation bar, click **Settings**.
3. Navigate to **Integrations**, and find the **Wiz** integration.
4. Click the **<i class="fa-solid fa-trash"></i> trash can** icon.
5. Click **Delete** to confirm.
