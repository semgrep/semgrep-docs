---
slug: add-ai-to-scans
title: Add AI-powered detection
hide_title: true
description: "Use Semgrep's multi-modal detection to combine static analysis with AI"
keywords:
  - AI-powered detection
  - AI Detection
tags:
  - Deployment
  - Semgrep AppSec Platform
displayed_sidebar: scanSidebar
---


# Scan with AI-powered detection (beta)

Semgrep’s AI-powered detection combines the precision of static analysis with the contextual reasoning of large language models (LLMs). Together, they uncover vulnerabilities that traditional tools and workflows often miss, such as IDORs, broken authorization, and other business logic flaws. 

This feature is distinct from [Semgrep Assistant](/docs/semgrep-assistant/overview), which uses artificial intelligence (AI) to triage findings and provide remediation guidance. 

For details on what AI-powered detection can uncover, known limitations, and beta considerations, see [AI-powered detection: concepts and FAQs](/docs/semgrep-code/ai-powered-detection-concepts).

## Prerequisites {#prerequisites}

To run Semgrep Code's [AI-powered detection](/docs/semgrep-code/overview#ai-powered-detection-beta-feature) (beta feature), ensure that you meet the following requirements:

* You have added your projects to [Semgrep Managed Scans](https://semgrep.dev/docs/getting-started/quickstart-managed-scans#add-projects-to-semgrep-managed-scans). Look for the `managed-scan` tag in the [**Projects** section of the Semgrep AppSec Platform](https://semgrep.dev/orgs/-/projects/scanning). 
* You have enabled Semgrep Assistant for your organization.

## Enable or disable AI-powered detection

This feature is enabled by default for all Semgrep Assistant users. 

To enable or disable AI-powered detection, go to **Settings** > **Code** and then toggle AI-powered detection on or off. 

## Scan with AI-powered detection

* Log in to Semgrep AppSec Platform.  
* In the **navigation bar**, click on **Projects**. 

To scan the default or main branch:

1. Choose the projects by selecting the checkboxes next to their names.This enables the **Run a new scan** dropdown menu.  
1. Click **Run a new scan > AI-powered detection**.
1. A dialog appears that displays the number of projects that were selected for scanning. Click **Scan** to begin.  
  * If you would like Semgrep to automatically perform an AI scan on these projects every week, select **Enable weekly scans**.

To scan a non-default branch:

1. Click **Details** for your project of interest. On the project's **Details** page, click **Run a new scan** and choose **AI-powered detection.**  
1. In the dialogue, enter the name of the branch you want to scan.

## View findings

* After the scan finishes, the **AI Detection findings** column on the **Projects** page shows the findings count.   
* Click that findings count to open the **AI Detection** page, or use the AI Detection option in the **navigation bar** to navigate to your findings.   
* On the **AI Detection** page, click **Details** for any finding to see additional information, including AI-powered triage and remediation guidance. 

## Add additional context to AI-Powered detection scans

By uploading project-specific context such as design documents, threat models, or instructional markdown, you can provide additional information for Semgrep to use during AI-powered scans. This enables Semgrep to show higher-impact findings and reduce false positives based on how your application is designed and used.

:::info
Only **Admins** can upload context documents to Semgrep Projects.
:::

To upload a project-specific context document:

1. Log in to Semgrep AppSec Platform.  
1. In the **navigation bar**, go to **Rules & Policies → Assistant Memories**.  
1. Go to the **Documents** tab and click **Add document**.
1. Drag the document to the **File upload** box or click **Choose a file** to select and upload your context document.   
  * Optionally: Add a **Description** of the document. This information will be used as additional context for AI-powered detection scans.  

The finding **Details** page references the uploaded context document under the finding description.



To understand how AI-powered detection works under the hood, see [AI-powered detection: concepts, limitations, and FAQs](/docs/semgrep-code/ai-powered-detection-concepts).


