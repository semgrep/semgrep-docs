---
slug: add-ai-to-scans
title: Add AI-powered detection
hide_title: true
description: "Use Semgrep's Multi-Modal Engine to combine static analysis with AI"
tags:
  - Deployment
  - Semgrep AppSec Platform
displayed_sidebar: scanSidebar
---


# AI-powered detection for Multi-Modal scanning with Semgrep Code (beta feature)

## Prerequisites {#prerequisites}

To enable Semgrep Code's AI-powered detection feature, make sure the following requirements are met:

* Your projects are added to [Semgrep Managed Scans](https://semgrep.dev/docs/getting-started/quickstart-managed-scans#add-projects-to-semgrep-managed-scans) and include the `managed-scan` tag (in the Projects section of the AppSec Dashboard). You can see projects in Semgrep AppSec Platform by going to Projects.  
* You have met all the [prerequisites for Managed Scans](https://semgrep.dev/docs/getting-started/quickstart-managed-scans#prerequisites-1).  
* You have enabled the Assistant feature for your organization.  
* You are an active, paying Semgrep Code user.  
* ==You have existing findings from Managed Scans and AI triaged issues==.
* You must be on the default tenant (private tenants not supported at this time).

## Quickstart: Run the AI-powered scan

* Log in to Semgrep AppSec Platform.  
* In the **Navigation Bar**, click on **Projects**. 

Scan the default or master branch:

* Select one or more projects by checking the box next to each. This enables the **Run a new scan** dropdown menu.  
* From the dropdown box, choose **AI-powered detection**.  
* A dialog appears that tells you how many projects were selected for scanning. Click **Scan** to begin.  
  * When **Enable weekly scans** is checked, Semgrep will automatically perform an AI scan on these projects every week (similar to Managed Scans, though timing may vary)

Scan a different branch:

* Click the **Details** button for your project of interest. On this page, open the **Run a new scan** dropdown menu and choose **AI-powered detection.**  
* In the pop-up window, type the name of the branch you wish to scan.

Findings

* ==After the scan finishes, the **AI Detection findings** column on the **Projects** page shows the findings count.   
* Click that findings count to open the **AI Detection** page, or use the AI Detection option in the **Navigation bar** to navigate to your findings.   
* On the **AI Detection** page, click **Details** for any finding to see additional information and AI-powered remediation guidance==. 

## Adding additional context to AI-Powered detection scans

Semgrep’s AI-powered Multi-Modal Engine now offers context-aware analysis. By uploading project-specific context such as design documents, threat models, or instructional markdown, you can provide additional information for Semgrep to use during AI-powered scans. This enables Semgrep to surface higher-impact findings and reduce false positives based on how your application is designed.

:::info
Please note that only **Admins** can upload context documents to Semgrep Projects. Currently, each project supports up to **four** documents.
:::

To upload a project-specific context document:

* Log in to Semgrep AppSec Platform.  
* In the **Navigation Bar**, go to **Rules & Policies → Assistant Memories**.  
* Switch to the **Documents** tab and click **Add document**.
* Drag and drop a file or click **Choose a file** to upload your context document, then select a project to apply the context to.  
  * If you add a description at this step, it will be displayed in the finding's description and used as additional context for AI-powered detection scans.  
* The finding **Details** page references the uploaded context document under the finding description.


## Technical FAQs

**Q. What are business logic flaws? What can AI-powered detection uncover right now?** 

A business logic flaw is any weakness in an application’s design or workflow that makes its legitimate features vulnerable to malicious use. Semgrep’s AI-powered detection currently focuses on authorization flow gaps outside standard categories: 

* IDOR and ownership gaps: accessing another user’s resource when ownership or tenant checks are missing, misplaced, or only client-side.  
* Order and sequence mistakes: state changes or token resets happening after sensitive reads/writes, or actions allowed in the wrong state.  
* Workflow abuse (OWASP logic manipulation): skipping required steps (like shipping before checkout, refunds without a completed purchase).

**Q: Can Semgrep find IDORs and other business logic bugs without AI Detection?**

A: Traditional Semgrep SAST can be configured to catch IDORs. However, since this requires understanding how the app in question handles authorization and database access, it is hard to write generic rules that catch IDORs across all software applications. With Semgrep’s AI-powered detection, it is now possible to find IDORs and other business logic bugs without the need for extensive custom rule development. 

**Q: Which source code managers does AI-powered detection support?**

A: AI-powered detection builds on Semgrep's existing integration framework, such as GitHub, GitLab, and Bitbucket. Specific integration details are being refined in beta.

**Q: Do customers need to change their existing Semgrep setup?**

A: Customers need to have Assistant turned on and Managed Scans enabled. [See Prerequisites](#prerequisites)

**Q: What about data privacy with AI-powered detection?**

A: Semgrep Code’s AI-powered detection follows the same data privacy policy as Semgrep Assistant, with a few documented exceptions. See [Privacy and legal considerations for Semgrep Assistant](/docs/semgrep-assistant/privacy) for details. 

**Q: How many scans can I trigger?**

A: Each full AI-powered scan is one scan. Paying customers can trigger 100 scans per month. Prospective customers can trigger up to 100 scans. Please contact your Semgrep account manager or [Semgrep support](https://semgrep.dev/docs/support) to request an increase in your quota.

**Q:** **Can I use a different AI provider?**

A: You can choose between OpenAI, Anthropic, and Opengrep. Self-hosted OpenAI and Azure OpenAI are not currently supported.

**Q: The AI-powered scan detected a vulnerability, but I don’t see it on my findings page anymore. What happened to my finding?** 

==AI scans are not deterministic. You may get different results each time you scan. If a previously detected finding isn't found on a subsequent scan, it will be marked as fixed. We are working on making this behavior more deterministic.==

**Q: How are AI findings assigned a severity level?**

==A: Currently, all AI findings are assigned the same severity (”high”) and don’t have other attributes like confidence. This may change as the feature matures.== 

**Q: What are some known bugs and limitations?**

A: This feature is in beta! Here are some known issues:

**Scan limitations:**

* Full scans only. PR/diff scans are not supported yet.  
* ==There is limited support for monorepos: scans may time out or get stuck “in progress” (2-hour cap). Large monorepos may also produce fewer findings than expected.==

**Findings limitations:**

* AI findings are not included in the Reporting/Dashboard  
* Jira integration doesn’t work for AI findings  
* Custom rules are not supported for AI-powered detection in private beta  
* AI scan logs show a list of findings only. Reasoning steps are currently unavailable.


## Troubleshooting and disclaimers

For help with AI-powered detection, contact your organization’s **Semgrep account manager** or **Semgrep [support](https://semgrep.dev/docs/support)**. 

Beta program notice:

* No formal uptime guarantees; service is best-effort during beta.  
* Features, performance, and APIs may change without notice. Planned maintenance will be communicated in advance when possible.  
* ==Any stated Service Level Objective (SLO) is not a commercial Service Level Agreement (SLA) and may be revised as the product evolves.==

## Disable AI-powered detection
== Settings --> Assistant --> turn off toggle?==