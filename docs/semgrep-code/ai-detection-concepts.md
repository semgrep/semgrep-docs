---
slug: ai-powered-detection-concepts
title: "AI-powered detection overview"
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

# AI-powered detection (beta) overview

Semgrep’s AI-powered detection combines the precision of static analysis with the contextual reasoning of large language models (LLMs). With AI-powered detection, you can automatically identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization.

AI-powered detection is distinct from [Semgrep Multimodal](/docs/semgrep-multimodal/overview), which uses artificial intelligence (AI) to triage findings and provide remediation guidance.

This page covers the kinds of issues AI-powered detection is designed to uncover, known limitations during the beta period, and practical considerations such as scan quotas and data privacy. 

For step-by-step instructions on enabling and running an AI-powered scan, see [Scan with AI-powered detection](/docs/deployment/add-ai-to-scans).

## Detection and scope

### IDORs and other business logic flaws

A business logic flaw is any weakness in an application’s design or workflow that makes its legitimate features vulnerable to malicious use. Semgrep’s AI-powered detection focuses on authorization flow gaps that fall outside standard vulnerability categories: 

* **IDOR and ownership gaps**: accessing another user’s resource when ownership or tenant checks are missing, misplaced, or only client-side.  
* **Order and sequence mistakes**: state changes or token resets happening after sensitive reads/writes, or actions allowed in the wrong state.  
* **Workflow abuse, or OWASP logic manipulation**: skipping required steps, like shipping before checkout or refunds without a completed purchase.

Traditional Semgrep SAST **can** be configured to catch IDORs. However, because this requires understanding how the app in question handles authorization and database access, it is difficult to write generic rules that detect IDORs across all software applications. With Semgrep’s AI-powered detection, it is now possible to find IDORs and other business logic bugs without the need for extensive custom rule development. 

### Determinism of AI-powered detection findings

AI-powered detection findings are inherently non-deterministic. Because AI scans rely on probabilistic reasoning, repeated scans may not always produce identical results. However, Semgrep’s scanning engine helps make them more reliable. As with any automated security finding, you must review scan results carefully.

## Setup, quotas, and integrations

### SCM support and AI providers

AI-powered detection builds on Semgrep's existing integration framework, such as GitHub, GitLab, and Bitbucket. 

During beta, you can choose between OpenAI, Anthropic, and Bedrock AI providers.

### Scan limits 

Each full AI-powered scan counts as one scan. Paying customers can trigger **30 scans per month**, and free tier customers can trigger **10 scans per month**. Please contact your Semgrep account manager or [Semgrep support](/docs/support) to discuss increasing your quota.  

### Data privacy and finding severity

The data privacy policy is similar to that described in [Privacy and legal considerations for Semgrep](/docs/semgrep-multimodal/privacy), with a few exceptions.

Currently, all AI findings are assigned the same severity, which is **high**, and don’t have other attributes like confidence. 


## Known bugs and limitations

This feature is in beta. Here are some known issues:

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

