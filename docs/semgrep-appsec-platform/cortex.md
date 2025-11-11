---
slug: cortex
append_help_link: true
title: Cortex
hide_title: true
description: "Ingest exposure and runtime context from your Cortex instance to prioritize Semgrep findings."
tags:
 - Semgrep AppSec Platform
---

# View exposure and runtime context from Cortex in Semgrep AppSec Platform

The Semgrep Cortex integration can ingest exposure and runtime context from your Cortex instance. This allows you to prioritize findings based on deployment status and internet exposure status.

## Prerequisites

Before proceeding, ensure that you have:
- A Cloud Posture Security license
- The following tools and integrations set up in your Cortex instance:
  - A [<i class="fas fa-external-link fa-xs"></i> cloud service provider](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Runtime-Security-Documentation/Ingest-cloud-assets?tocId=2jhG7867R_efYTshrrusgA), such as AWS, GCP, or Azure
  - A [<i class="fas fa-external-link fa-xs"></i> version control system](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Application-Security-Posture-Management-ASPM/Onboard-version-control-systems) integration, such as GitHub or GitLab
  - A [<i class="fas fa-external-link fa-xs"></i> CI tool](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Application-Security-Posture-Management-ASPM/Integrate-CI-Tools) integration, such as Jenkins or CircleCI
    - If you use GitHub Actions for your CI/CD pipeline and you've onboarded a GitHub Cloud or GitHub Server VCS integration, you don't have to configure a GitHub Actions integration separately.
  - A [<i class="fas fa-external-link fa-xs"></i> Kubernetes connector](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Runtime-Security-Documentation/Onboard-the-Kubernetes-Connector?tocId=WsDqs1Oz8m7F0mqiWVsErA) if your resources are deployed in a Kubernetes cluster
- Generated a [<i class="fas fa-external-link fa-xs"></i> Standard API key](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Get-Started-with-Cortex-XDR-APIs) and saved the following values:
  - **API key**
  - **API key ID**
- Set up a connection between [Semgrep and your source code manager (SCM)](/deployment/connect-scm)

## Enable the Cortex integration

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [**Settings** > **Integrations**](https://semgrep.dev/orgs/-/settings/integrations).
3. Navigate to **Integrations**, and click **+ Add > Cortex**.
![Add Cortex Integration with No Integration](/img/cortex_add_integration_new.png##sm-width)
_**Figure.** Add a new Cortex integration._
![Add Cortex Integration with Existing Integration](/img/cortex_add_integration_existing.png##sm-width)
_**Figure.** Add Cortex as an additional integration._
4. In the dialog that appears, provide the following information:
   1. **FQDN**: This is the unique host and domain name associated with your Cortex tenant. It usually takes the format `https://your-tenant.xdr.your-region.paloaltonetworks.com/`.
   2. **API key ID**: This is generated when you create an API key in Cortex.
   3. **API key**: This is generated when you create an API key in Cortex.
![Add Cortex Setup Modal](/img/cortex_configure_integration.png##sm-width)
_**Figure.** Configure the Cortex integration._

5. Click **Connect**.
![Successful Cortex Integration](/img/cortex_enabled_integration.png##md-width)
_**Figure.** Successfully configured Cortex integration._

6. Within several hours, you should see **Deployment** and **Exposure** status for each project on the project settings page.
![Cortex Data In Project Settings](/img/cortex_cnapp_data.png##md-width)
_**Figure.** Cortex data in Project Settings._

## Limitations

- Each Semgrep deployment can only have **one Cortex integration**.
- The exposure and runtime context data are only synced for Semgrep projects that are connected to SCMs and have been scanned within the previous 30 days.
- The integration syncs your data every 24 hours (this feature will be available soon), but it may take up to 1-2 days for Semgrep to reflect any changes to your repositories and infrastructure.
- Internet exposure detection is not supported for AWS Classic Load Balancers.

## Troubleshooting

### If you see a **Connection Error** message under your Cortex integration

If you see the **Connection Error** message under your Cortex integration, there was an issue establishing a connection or running a sync job for a provider you have connected. Check your connection settings to verify that your configuration is correct.

If the connection settings are correct, [contact Support](/support) for further assistance.

![Cortex Connection Error](/img/cortex_error_integration.png##md-width)
_**Figure.** Erro with the Cortex integration._


### If you're not seeing data in your project settings page

If you're not seeing data for your project in the project settings page:

- Wait for one day for your data to sync.
- If, after one day, you're still not seeing data, ensure that you meet the integration's prerequisites.
- If, after one day, you meet the integration's prerequisites, [contact Support](/support) for further assistance.