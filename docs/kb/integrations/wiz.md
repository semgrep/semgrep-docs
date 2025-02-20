---
slug: wiz
append_help_link: true
title: View Semgrep findings in Wiz's Security Graph
hide_title: true
description: "Learn how to view Semgrep findings in Wiz's Security Graph."
tags:
 - Wiz
 - Semgrep AppSec Platform
---

# View Semgrep findings in Wiz's Security Graph

Semgrep integrates with Wiz by calling Wiz’s GraphQL API endpoints and uploading your SAST vulnerability findings to a dedicated s3 bucket. Your Semgrep SAST vulnerability findings are mapped to the same correlated repository scanned by Wiz, and further enriched by any available inventory and runtime-related data, such as clusters, pods, containers, cloud configurations, and more. Our goal is to give you a holistic view of your code and infrastructure security so that you can focus on what matters most, first. This integration is available for users with both a [Semgrep Code license](https://semgrep.dev/products/semgrep-code/) and a [Wiz Code Security license](https://www.wiz.io/platform/wiz-code). 

## Prerequisites and requirements

To send Semgrep Code findings to Wiz:

- You must have a license for Wiz Code
- You must have a Wiz service account that provides Semgrep with the following scopes: `create:external_data_ingestion`, `read:system_activities`, and `read:resources`. If you don't have a service account:
    1. Create a [Wiz service account](https://docs.wiz.io/wiz-docs/docs/service-accounts-settings?lng=en). When prompted to select the **Type** of the service account, select **'Custom Integration (GraphQL API**)'.
    2. Copy the Client ID and Client Secret provided. You must provide this information to Semgrep at a later stage.
- You must have a Wiz user account with sufficient permissions to create a service account, if needed, and integrations.
- You must add the [Semgrep integration](https://app.wiz.io/settings/automation/integrations) from the Wiz Integration Network and save the following:
   1. API Endpoint URL
   2. Authentication URL
   3. Client ID
   4. Client Secret

## Limitations

Currently, Semgrep supports the sending of Semgrep Code findings from default branches originating from full scans. Semgrep doesn't send data originating from diff-aware scans.

Semgrep sends data to Wiz after every successful full scan, which Wiz will batch and sync once every 24 hours. By default, the Code findings that Semgrep sends are:

  - Only high severity
  - Only from full scans
  - Only from the default branch of each repo
  - From all repositories in the organization

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

![image info](/img/kb/wiz-semgrep-integration.png)

## Edit the integration

1. Sign in to [Semgrep](https://semgrep.dev/login).
2. In the navigation bar, click **Settings**.
3. Navigate to **Integrations**, and find the **Wiz** integration.
4. Click **Edit**, and update the information required by Wiz as needed.
5. Click **Save changes**.

## Delete the integration

1. Sign in to [Semgrep](https://semgrep.dev/login).
2. In the navigation bar, click **Settings**.
3. Navigate to **Integrations**, and find the **Wiz** integration.
4. Click the **<i class="fa-solid fa-trash"></i> trash can** icon.
5. Click **Delete** to confirm.

## Configure Wiz

1. Sign in to [Wiz](https://app.wiz.io/login).
2. Ensure you have the `create:integrations` access scope.
3. In the top right, click **Add Integration**.
4. Find the Semgrep integration card and click add.
5. Follow the remaining steps provided by Wiz to connect Semgrep.
6. Save the following information: 
   1. API Endpoint URL
   2. Authentication URL
   3. Client ID
   4. Client Secret


<!-- If the user has to do anything from the Wiz end, e.g., set up an integration, include the steps here. -->
