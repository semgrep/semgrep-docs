---
slug: ai-powered-detection-concepts
title: "AI-powered detection: concepts and FAQs"
description: "Learn how Semgrep’s AI-powered detection works, what it can find, known limitations, and beta considerations."
keywords:
  - AI-powered detection
  - Business logic vulnerabilities
  - IDOR
  - Semgrep AI
tags:
  - Deployment
  - Semgrep AppSec Platform
displayed_sidebar: scanSidebar
---

# AI-powered detection: concepts and FAQs

This page provides additional context for Semgrep’s AI-powered detection. It covers what kinds of issues the feature is designed to uncover, known limitations during the beta period, and practical considerations such as scan quotas and data privacy. 

If you’re looking for step-by-step instructions on enabling and running an AI-powered scan, see [Scan with AI-powered detection](/docs/deployment/add-ai-to-scans).

## Detection and scope FAQs

**Q: What are business logic flaws? What can AI-powered detection uncover right now?** 

A business logic flaw is any weakness in an application’s design or workflow that makes its legitimate features vulnerable to malicious use. Semgrep’s AI-powered detection currently focuses on authorization flow gaps that fall outside standard vulnerability categories: 

* **IDOR and ownership gaps**: accessing another user’s resource when ownership or tenant checks are missing, misplaced, or only client-side.  
* **Order and sequence mistakes**: state changes or token resets happening after sensitive reads/writes, or actions allowed in the wrong state.  
* **Workflow abuse, or OWASP logic manipulation**: skipping required steps, like shipping before checkout or refunds without a completed purchase.

**Q: Can Semgrep find IDORs and other business logic bugs without AI Detection?**

A: Traditional Semgrep SAST can be configured to catch IDORs. However, since this requires understanding how the app in question handles authorization and database access, it is hard to write generic rules that catch IDORs across all software applications. With Semgrep’s AI-powered detection, it is now possible to find IDORs and other business logic bugs without the need for extensive custom rule development. 

**Q: Are AI-powered detection findings deterministic?** 

Although AI scans are inherently non-deterministic, Semgrep's Multi-Modal Engine helps make them more reliable. Please continue to review and evaluate scan results carefully.

## Setup, quotas, and integrations FAQs

**Q: Which source code managers does AI-powered detection support?**

A: AI-powered detection builds on Semgrep's existing integration framework, such as GitHub, GitLab, and Bitbucket. Specific integration details are being refined in beta.

**Q: Do customers need to change their existing Semgrep setup?**

A: Customers need to have Assistant turned on and Managed Scans enabled. [See AI-detection prerequisites](/docs/deployment/add-ai-to-scans#prerequisites)

**Q: How many scans can I trigger?**

A: Paying customers can trigger 50 scans per month. Customers using the free tier can trigger up to 10 scans per month. Please contact your Semgrep account manager or [Semgrep support](https://semgrep.dev/docs/support) to request an increase in your quota. Each full AI-powered scan is one scan. 

**Q:Can I use a different AI provider?**

A: Yes. You can choose between OpenAI, Anthropic, and Bedrock keys. 


**Q: How are AI findings assigned a severity level?**

A: Currently, all AI findings are assigned the same severity, which is **high**, and don’t have other attributes like confidence. This may change as the feature matures.

**Q: How does Semgrep handle data privacy for AI-powered detection?**

A: ==Semgrep Code’s AI-powered detection follows the same data privacy policy as Semgrep Assistant, with a few documented exceptions. See [Privacy and legal considerations for Semgrep Assistant](/docs/semgrep-assistant/privacy) for details==. 

## Known bugs and limitations

This feature is in beta! Here are some known issues:

**Scan limitations:**

* Only full scans are supported. Diff-aware scanning is currently in development.

**Findings limitations:**

* AI findings are not included in the Reporting/Dashboard.  
* Jira integration doesn’t work for AI findings.  
* Custom rules are not supported for AI-powered detection.  

## Troubleshooting and disclaimers

For help with AI-powered detection, contact your organization’s **Semgrep account manager** or **Semgrep [support](https://semgrep.dev/docs/support)**. 

Beta program notice:

* No formal uptime guarantees; service is best-effort during beta.  
* Features, performance, and APIs may change without notice. Planned maintenance will be communicated in advance when possible.  
* Any stated Service Level Objective (SLO) is not a commercial Service Level Agreement (SLA) and may be revised as the product evolves.

