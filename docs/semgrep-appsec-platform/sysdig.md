---
slug: sysdig
append_help_link: true
title: Sysdig
hide_title: true
description: "Ingest runtime context from your Sysdig account to prioritize Semgrep findings based on deployment status."
tags:
 - Semgrep AppSec Platform
---

# View runtime context from Sysdig

The Semgrep Sysdig integration can ingest runtime context from your Sysdig account into the Semgrep AppSec Platform. This allows you to prioritize findings based on deployment status.

## Prerequisites

Before proceeding, ensure that:

- You have a license for **Semgrep Supply Chain**
- You have the following tools and integrations set up in your Sysdig account:
  - [<i class="fas fa-external-link fa-xs"></i> Sysdig Secure](https://docs.sysdig.com/en/docs/sysdig-secure/)
  - [<i class="fas fa-external-link fa-xs"></i> Sysdig Shield](https://docs.sysdig.com/en/sysdig-secure/install-shield-kubernetes/), [<i class="fas fa-external-link fa-xs"></i> Host Shield](https://docs.sysdig.com/en/sysdig-secure/install-host-shield/), or [<i class="fas fa-external-link fa-xs"></i> Agentless Scanning](https://docs.sysdig.com/en/sysdig-secure/scanning-usecases/#agentless-host-scanning-tech-preview)
  - The [<i class="fas fa-external-link fa-xs"></i> Semgrep Sysdig integration](https://docs.sysdig.com/en/docs/sysdig-secure/integrations-for-sysdig-secure/software-composition-analysis/#semgrep)
    - Ensure that you've [<i class="fas fa-external-link fa-xs"></i> completed the steps to link source to runtime by adding a Docker label](https://docs.sysdig.com/en/docs/sysdig-secure/integrations-for-sysdig-secure/software-composition-analysis/#prerequisite-linking-source-to-runtime)
- You have set up a connection between [Semgrep and your source code manager (SCM)](/deployment/connect-scm).

## Enable the Sysdig integration

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [**Settings** > **Integrations**](https://semgrep.dev/orgs/-/settings/integrations).
3. Go to **Integrations**, and click **+ Add > Sysdig**.
![Add Sysdig Integration with No Integration](/img/sysdig_add_integration_new.png##sm-width)
_**Figure.** Add a new Sysdig integration._
![Add Sysdig Integration with Existing Integration](/img/sysdig_add_integration_existing.png##sm-width)
_**Figure.** Add Sysdig as an additional integration._
4. In the dialog that appears, provide the following information:
   1. **URL**: The Sysdig Platform URL for your account.
   2. **API token**: The Sysdig API token associated with your account. See [<i class="fas fa-external-link fa-xs"></i> Retrieve the Sysdig API Token](https://docs.sysdig.com/en/administration/retrieve-the-sysdig-api-token/) for more information on how to retrieve your token.
![Add Sysdig Setup Modal](/img/sysdig_configure_integration.png##sm-width)
_**Figure.** Configure the Sysdig integration._

5. Click **Connect**.
![Successful Sysdig Integration](/img/sysdig_enabled_integration.png##md-width)
_**Figure.** Successfully configured Sysdig integration._

6. Within several hours, you should see the **Deployment** status for each project on the project's settings page.
![Sysdig Data In Project Settings](/img/sysdig_cnapp_data.png##md-width)
_**Figure.** Sysdig data in Project Settings._

## Limitations

- Each Semgrep deployment can only have **one Sysdig integration**.
- The runtime context data is only synced for Semgrep projects that:
  - Are connected to SCMs
  - Have been scanned within the previous 30 days
  - Have Supply Chain findings
- The integration syncs your data every 24 hours, but it may take up to 1 day for Semgrep to reflect any changes to your repositories and infrastructure.


## Troubleshooting

### If you see a **Connection Error** message under your Sysdig integration

If you see the **Connection Error** message under your Sysdig integration, there was an issue establishing a connection or running a sync job for a provider you have connected. Check your connection settings to verify that your configuration is correct.

If the connection settings are correct, [contact Support](/support) for further assistance.

### If you're not seeing data in your project settings page

If you're not seeing data for your project in the project settings page:

- Wait for one day for your data to sync.
- Confirm that an image of the project has been deployed in your infrastructure that Sysdig has access to
- If, after one day, you're still not seeing data, ensure that you meet the integration's prerequisites.
- If, after one day, you meet the integration's prerequisites and confirmed deployment, [contact Support](/support) for further assistance.
