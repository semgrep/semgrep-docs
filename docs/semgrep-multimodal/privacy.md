---
slug: privacy
title: Data privacy and legal considerations
hide_title: true
description: Learn about the privacy and legal considerations involved when using Semgrep Multimodal.
tags:
  - Deployment
  - Semgrep Multimodal
---

# Data privacy and legal considerations for Semgrep Multimodal

Semgrep Multimodal uses API permissions to access code in your selected GitHub or GitLab repositories. To provide AI-powered functionality, portions of the source code are processed by Semgrep's AI model vendors.

Semgrep Multimodal’s data privacy and legal considerations apply across the following **AI-assisted features**, which build on one another:
- **Triage and remediation** of findings
- **Memories**: Adds reusable Memories to enhance triage and remediation.
- **AI-powered detection scans**: Adds AI-driven vulnerability detection on top of triage, remediation, and Memories.

## Overview of data flow

When using Semgrep AI features:

1. Semgrep accesses repository code on a file-by-file basis. In limited cases, broader repository access may be required.
1. Relevant data, including portions of source code, are sent outside your repository to AI subprocessors for analysis. Semgrep supports AI subprocessors from the following model vendors:
    - OpenAI (default)
    - Amazon Bedrock (default)
    - Anthropic (BYOK; not available for AI-powered detection scans)
    - Azure OpenAI (BYOK; not available for AI-powered detection scans)
    - Google Gemini (BYOK; not available for AI-powered detection scans)
    - xAI Grok (BYOK; not available for AI-powered detection scans)
1. AI subprocessors return results to Semgrep.
1. Semgrep stores limited data to support product functionality, in accordance with its [data retention policies](#data-retention-and-storage-by-semgrep).


## Data sent to AI subprocessors

The type and amount of data sent to AI subprocessors depend on the feature being used. The following table summarizes the data transmitted to AI subprocessors:

| Feature | Data sent to AI |
|--------|----------------|
| [Triage and remediation](#triage-and-remediation) | Code associated with a finding and the minimal surrounding context |
| [Memories](#memories) | Code associated with a finding, minimal surrounding context, and user-provided Memory content, including code snippets |
| [AI-powered detection scans](#ai-powered-detection-scans) | Full file contents, uploaded context documentation, and scan-related metadata |

Semgrep **does not** intentionally send personal data to AI subprocessors.

## Data retention and storage by Semgrep's AI vendors

All Semgrep AI subprocessors operate under **zero data retention** agreements by default. Under the zero data retention agreements, AI subprocessors do not retain or use your data to train their models.

Semgrep maintains Data Protection Agreements (DPAs) with all AI subprocessors. Customers can request these through the Semgrep [trust portal](https://trust.semgrep.dev/). Alternatively, contact your Semgrep account manager to request copies of these DPAs.

## Data retention and storage by Semgrep

Semgrep stores a limited amount of your data to support product functionality and performance evaluation. The type of data stored depends on the feature being used.

### Triage and remediation

Data stored may include:

- AI prompts and responses
- Code snippets associated with findings
- Minimal surrounding context required for accurate results

### Memories

Includes all data from triage and remediation, and adds:

- User-defined Memory content that is stored as text
- Code snippets included in Memories

Semgrep does not retrieve or access external data sources referenced in Memories.

### AI-powered detection scans

Data stored may include:

- AI prompts and responses
- Code snippets and, where required, full file contents
- Uploaded context documentation
- Scan reports, including metadata such as file names and, in some cases, code snippets


Storage details:

Uploaded context documentation and scan reports are persistently stored in a Semgrep-managed Amazon S3 bucket. Context documentation may be reused across scans.


### Retention period
Stored data is retained for up to 6 months, unless otherwise noted. Semgrep will provide at least 30 days’ notice before making changes to retention policies.

### Purpose of storage

Stored data is used to:

- Provide Semgrep Multimodal functionality
- Enable access to prior results, for example, to provide remediation guidance
- Support internal performance evaluation
- Support troubleshooting and debugging

## Data handling and protections
- Customer data is logically isolated and never commingled across tenants
- Semgrep does not intentionally send personal data to AI subprocessors
- Semgrep and its subprocessors do not obtain ownership rights to your source code
- Data sent to AI subprocessors is deleted after processing in accordance with zero data retention agreements


## Minimal data retention policy (optional)

If you want to further limit data retention for Semgrep Multimodal, you can contact [support](/support) to enroll in the minimal data retention policy.

AI responses are still stored as required to provide functionality.

> **When should I use this?**  
> Use this policy if your organization requires stricter data handling controls and reduced persistence of code and prompts within Semgrep systems, where possible.

### Key differences from default behavior

When the minimal data retention policy is enabled:

- AI prompts and code are **not logged or captured** by observability tools  
- Data is **not stored in external storage systems**, such as Amazon S3  
- Stored data is limited to what is strictly required to provide functionality  

### Exceptions for AI-powered detection scans

Under the minimal data retention policy, the following behavior remains unchanged for AI-powered detection scans:

- If you upload context documentation to enhance AI-powered detection scans, these files are persistently stored in a Semgrep-managed Amazon S3 bucket to enable reuse across future AI-powered detection scans.
- AI-powered scan reports are stored in a Semgrep-managed Amazon S3 bucket. These reports may contain metadata such as file names and, in some cases, code snippets included in issue descriptions.

Responses from Semgrep's AI model vendors are stored in the Semgrep database solely for providing Multimodal functionality. For instance, AI-generated remediation advice is stored so users can access it in the Semgrep AppSec Platform. However, code snippets are never retained to improve future prompts.

Any stored data can be deleted upon customer request. Semgrep, Inc. will provide at least 30 days' notice before making any changes to the retention policy.

## Default vs minimal data retention

The table below compares default data handling with the minimal data retention policy. All stored data is handled by Semgrep or Semgrep-managed systems, not its AI vendors.


| Category | Default behavior | Minimal data retention policy |
|----------|----------------|-------------------------------|
| AI prompts and code | May be logged and stored to support functionality and performance evaluation | Not logged or captured by observability tools; not stored in external systems; persistence is limited to what is required for functionality |
| AI responses | Stored for up to 6 months to provide functionality and access to prior results | Stored only as required to provide functionality, with reduced persistence |
| Memories | Stored within Semgrep-managed systems and may include user-provided content and small code snippets | Stored within Semgrep-managed systems (no change) |
| AI-powered detection data | Full file analysis, context documentation, and scan reports may be stored and reused | Context documentation and scan reports remain stored in S3 (no change) |
| External storage (Semgrep-managed S3) | Used for certain data | Not used, except for AI-powered detection context documents and scan reports |
| Data deletion | Available upon request | Available upon request |
