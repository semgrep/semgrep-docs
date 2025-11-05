---
slug: sysdig
append_help_link: true
title: Sysdig
hide_title: true
displayed_sidebar: scanSidebar
description: "Ingest runtime context from your Sysdig account to prioritize Semgrep findings based on deployment status."
tags:
 - Semgrep AppSec Platform
---

# Sysdig integration

The Semgrep Sysdig integration can ingest runtime context from your Sysdig account. This allows you to prioritize findings based on deployment status.

## Prerequisites

- You must have a license for **Semgrep Supply Chain**.
- You must have the following tools and integrations set up in your Sysdig account:
  - [<i class="fas fa-external-link fa-xs"></i> Sysdig Secure](https://docs.sysdig.com/en/docs/sysdig-secure/)
  - [<i class="fas fa-external-link fa-xs"></i> Sysdig Shield](https://docs.sysdig.com/en/sysdig-secure/install-shield-kubernetes/), [<i class="fas fa-external-link fa-xs"></i> Host Shield](https://docs.sysdig.com/en/sysdig-secure/install-host-shield/), or [<i class="fas fa-external-link fa-xs"></i> Agentless Scanning](https://docs.sysdig.com/en/sysdig-secure/scanning-usecases/#agentless-host-scanning-tech-preview)
  - [<i class="fas fa-external-link fa-xs"></i> Semgrep integration](https://docs.sysdig.com/en/docs/sysdig-secure/integrations-for-sysdig-secure/software-composition-analysis/#semgrep)
    - [<i class="fas fa-external-link fa-xs"></i> Ensure that you've completed the steps to link source to runtime by adding a Docker label](https://docs.sysdig.com/en/docs/sysdig-secure/integrations-for-sysdig-secure/software-composition-analysis/#prerequisite-linking-source-to-runtime)
- Ensure that you have set up a connection between [Semgrep and your source code manager (SCM)](/deployment/connect-scm).

## Enable the Sysdig integration

To enable the Sysdig integration, follow these steps:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [**Settings** > **Integrations**](https://semgrep.dev/orgs/-/settings/integrations).
3. Navigate to **Integrations**, and click **+ Add > Sysdig**.
4. In the dialog that appears, provide the following information:
   1. **URL**: The Sysdig Platform URL for your account.
   2. **API token**: The Sysdig API token associated with your account. Follow [<i class="fas fa-external-link fa-xs"></i> these instructions](https://docs.sysdig.com/en/administration/retrieve-the-sysdig-api-token/) on how to retrieve your token.
5. Click **Connect**.
6. Within several hours, you should see the **Deployment** status for each project on the project's settings page.

## Limitations

- Each Semgrep deployment can only have **one Sysdig integration**.
- The runtime context data is only synced for Semgrep projects that:
  - Are connected to SCMs
  - Have been scanned within the previous 30 days
  - Have Supply Chain findings
- The integration syncs your data every 24 hours, but it may take up to 1 day for Semgrep to reflect any changes to your repositories and infrastructure.


## FAQ
- Why do I have a `Connection Error` under my Sydig integration? 
-- There was an error with establishing a connection or running a sync job for a provider which you have conneted. Try
checking your connection settings to and verify that your configurations are correct. 
-- If the connection is working as expected please reach out to our team so we can investigate further.
- Why am I not seeing data for my project in the project settings page? 
-- Try to wait a day for the data to catch up and sync. 
-- If you are still not seeing data after a day, check that you meet the prerequesites that are needed in order to run the application.
-- If you are all set up there then please reach out to our team so we can investigate further. 