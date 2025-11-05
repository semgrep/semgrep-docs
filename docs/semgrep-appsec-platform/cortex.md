---
slug: cortex
append_help_link: true
title: Cortex
hide_title: true
displayed_sidebar: scanSidebar
description: "Ingest exposure and runtime context from your Cortex instance to prioritize Semgrep findings."
tags:
 - Semgrep AppSec Platform
---

# Cortex integration

The Semgrep Cortex integration can ingest exposure and runtime context from your Cortex instance. This allows you to prioritize findings based on deployment status and internet exposure status.

## Prerequisites

- **License required by Cortex**: Cloud Posture Security license with Application Security add-on.
- The following tools and integrations must be set up in your Cortex instance:
  - [<i class="fas fa-external-link fa-xs"></i> Cloud service provider](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Runtime-Security-Documentation/Ingest-cloud-assets?tocId=2jhG7867R_efYTshrrusgA) (e.g. AWS, GCP, Azure)
  - [<i class="fas fa-external-link fa-xs"></i> Version control system](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Application-Security-Posture-Management-ASPM/Onboard-version-control-systems) integration (e.g. GitHub, GitLab)
  - [<i class="fas fa-external-link fa-xs"></i> CI tool](https://docs-cortex.paloaltonetworks.com/r/Cortex-Cloud-Posture-Management/Application-Security-Posture-Management-ASPM/Integrate-CI-Tools) integration (e.g. Jenkins, CircleCI)
    - If GitHub Actions is used for your CI/CD pipeline, and if you've onboarded a GitHub Cloud/GitHub Server VCS integration, you don't have to configure a GitHub Actions integration separately.
  - [<i class="fas fa-external-link fa-xs"></i> Kubernetes connector](https://docs-cortex.paloaltonetworks.com/r/Cortex-CLOUD/Cortex-Cloud-Runtime-Security-Documentation/Onboard-the-Kubernetes-Connector?tocId=WsDqs1Oz8m7F0mqiWVsErA) (if your resources are deployed in a Kubernetes cluster)
- Ensure that you've generated a [<i class="fas fa-external-link fa-xs"></i> Standard API key](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR-REST-API/Get-Started-with-Cortex-XDR-APIs) and saved the following values:
  - API key
  - API key ID
- Ensure that you have set up a connection between [Semgrep and your source code manager (SCM)](/deployment/connect-scm).

## Enable the Cortex integration

To enable the Cortex integration, follow these steps:

1. Sign in to [Semgrep AppSec Platform](https://semgrep.dev/login).
2. Navigate to [**Settings** > **Integrations**](https://semgrep.dev/orgs/-/settings/integrations).
3. Navigate to **Integrations**, and click **+ Add > Cortex**.
4. In the dialog that appears, provide the following information:
   1. **FQDN**: This is the unique host and domain name associated with your Cortex tenant. It usually is in the format of `https://your-tenant.xdr.your-region.paloaltonetworks.com/`.
   2. **API key ID**: This is generated when you create an API key in Cortex.
   3. **API key**: This is generated when you create an API key in Cortex.
5. Click **Connect**.
6. Within several hours you should see Deployment and Exposure status for each project on the project settings page.

## Limitations

- Each Semgrep deployment can only have **one Cortex integration**.
- The exposure and runtime context data is only synced for Semgrep projects that are connected to SCMs and have been scanned within the previous 30 days.
- The integration syncs your data every 24 hours (this feature will be available soon), but it may take up to 1-2 days for Semgrep to reflect any changes to your repositories and infrastructure.
- Internet exposure detection is not supported for AWS classic load balancers.


## FAQ
- Why do I have a `Connection Error` under my Cortex integration? 
-- There was an error with establishing a connection or running a sync job for a provider which you have conneted. Try
checking your connection settings to and verify that your configurations are correct. 
-- If the connection is working as expected please reach out to our team so we can investigate further.
- Why am I not seeing data for my project in the project settings page? 
-- Try to wait a day for the data to catch up and sync. 
-- If you are still not seeing data after a day, check that you meet the prerequesites that are needed in order to run the application.
-- If you are all set up there then please reach out to our team so we can investigate further. 