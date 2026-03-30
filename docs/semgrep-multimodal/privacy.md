---
slug: privacy
title: Privacy policy and legal considerations
hide_title: true
description: Learn about the privacy and legal considerations involved when using Semgrep Multimodal.
tags:
  - Deployment
  - Semgrep Multimodal
---

# Data privacy and legal considerations

Semgrep Multimodal uses API permissions to access code in your selected GitHub or GitLab repositories. To provide AI-powered functionality, varying portions of source code will be processed by Semgrep's AI model vendors.

Semgrep is designed to minimize data exposure and retention while maintaining product functionality.

Semgrep Multimodal's data privacy and legal considerations apply to the following features:
- Rule-based scans
- Rule-based scans with Memories
- AI-powered detection scans

## Overview of data flow

When using Semgrep AI features:

- Semgrep accesses repository code on a file-by-file basis
- Data may be sent to AI subprocessors for analysis
- AI subprocessors return results to Semgrep
- Semgrep stores limited data to support functionality

Semgrep supports AI subprocessors from the following model vendors:

- OpenAI
- Anthropic
- Amazon Bedrock

All subprocessors operate under zero data retention agreements.


## What data is sent to AI subprocessors

The type and amount of data sent to AI subprocessors depends on the feature being used.

The following table summarizes the information stored for each feature:

| Feature                | Data scope sent to AI                    |
| ---------------------- | ---------------------------------------- |
| [Rule-based scans](#semgrep-multimodal)  | Findings & code snippets for minimal context  |
| [Rule-based scans with Memories](#memories)               | User-provided text, findings, & code snippets      |
| [AI-powered detection scans](#ai-powered-detection-scans)   | Full code & any uploaded context docs           |


### Semgrep Multimodal with rule-based scan

When you enable Semgrep Multimodal for triage and remediation guidance for rule-based findings, Semgrep sends only the minimum data required to generate accurate results. Data sent may include:
- Lines of code associated with a Semgrep finding
- The minimal surrounding context needed for accuracy


### Semgrep Multimodal with rule-based scan and Memories
When Memories are used as part of Semgrep Multimodal, data sent to AI subporciess may additionally include:

- User-defined Memory content (stored as text)
- Small code snippets included in the Memory

External documentation, such as third-party documentation, is stored as user-provided text within the Memory. Semgrep Multimodal does not retrieve or sync data from external systems. Memories may also be included in prompts to improve AI responses.


### Semgrep Multimodal with AI-powered detection scans

Semgrep Code scans with AI-powered detection requires broader access to your GitHub or GitLab repositories. Data sent may include:

- Repository access: Time-limited access to the full source code to enable analysis.
- Uploaded context documentation: Any context documentation you upload to enhance AI-powered detection scans is persistently stored in a Semgrep-managed Amazon S3 bucket and reused in future scans.
- Scan reports: AI-powered scan reports are stored in a Semgrep-managed Amazon S3 bucket. These reports may contain metadata such as file names and, in some cases, code snippets included in issue descriptions.

Key characteristics:

Enables deeper analysis across entire files
May involve temporary access to full repository contents
Context documentation may be reused across scans (see storage section)

:::warning
The data privacy policy for [AI-powered detection](/docs/deployment/add-ai-to-scans) scans differs from the policy outlined for Semgrep Multimodal in the following ways:
- **Repository access**: AI-powered detection requires access to code in your GitHub or GitLab repositories. This includes time-limited access to the full source code to enable analysis.
- **Uploaded context documentation**: Any context documentation you upload to enhance AI-powered detection scans is persistently stored in a Semgrep-managed Amazon S3 bucket and reused in future scans. 
- **Scan reports**: AI-powered scan reports are stored in a Semgrep-managed Amazon S3 bucket. These reports may contain metadata such as file names and, in some cases, code snippets included in issue descriptions.
:::


## Zero Data Retention from model vendors
* Semgrep Multimodal logs and stores AI prompts, Memories, and responses for the sake of performance evaluation, which includes source code snippets.
* Semgrep Multimodal sends relevant lines of code to our AI subprocessors. Currently, "relevant lines of code" means lines that are part of the Semgrep finding, Memories, plus the minimum number of lines of code required to provide enough context to produce accurate results. For AI detection scans, Semgrep may process and store the contents of the entire file, as described above.
* Semgrep stores and retains AI responses based on these code snippets for up to 6 months. Semgrep, Inc. will provide at least 30 days' notice if Semgrep makes any changes to the retention policy.<!-- markdown-link-check-disable -->
* Semgrep, Inc. uses OpenAI, Anthropic, and Amazon Bedrock subprocessors as model vendors for AI results. Semgrep has Data Protection Agreements with each subprocessor. If you are a current Semgrep customer, you can request the Data Protection Agreements through Semgrep's [trust portal](https://trust.semgrep.dev). Otherwise, please reach out to your account contact to request a copy of these DPAs.
  * Semgrep is actively enrolled in OpenAI's zero data retention feature and has a zero data retention agreement with Amazon Bedrock. This means that zero data retention is applied to all requests from Semgrep, ensuring that no customer data is retained.
* Semgrep, Inc. takes the following steps to protect data that is processed by AI, since Multimodal requires the sharing of code snippets with a third party:
  * Semgrep only shares the code necessary to enlist the help of the AI subprocessor in automating the resolution of each specific alert.
  * Semgrep only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* When using Semgrep Multimodal, source code **does** leave your repository; Multimodal submits part of the file with a finding to the AI subprocessor for processing by an AI model. The AI subprocessor is not allowed to use the submitted code to train its models.
* There is strong isolation between Semgrep deployments. Data and code from one customer is never co-mingled with another customer.
* Regarding your data privacy, none of your personal information is shared with the AI subprocessor as part of the Semgrep Multimodal feature.
* Semgrep, Inc. and its AI subprocessors do not obtain any rights to your source code. Your source code remains yours, and Semgrep and its AI subprocessors access it to the limited extent necessary to provide the Semgrep Multimodal service. Once the results are returned to you, Semgrep Multimodal deletes the shared snippets.
* Because Semgrep Multimodal accesses OpenAI's services through the API, OpenAI does not use any of the code provided to them to improve their services (see Section 3(c) of their Terms of Use). AWS Bedrock also [doesn't use customer data to improve base models](https://aws.amazon.com/bedrock/security-compliance/).
* To a limited extent, using Semgrep Multimodal may change the terms of your agreement with Semgrep, Inc. Specifically, sharing code snippets with Semgrep Multimodal as part of this feature expands the scope of the data to which you grant Semgrep, Inc. a limited license to provide services to you (see Section 5.1 of our Subscriber Agreement).

## Semgrep Multimodal minimal data retention policy (optional)

If you wish to limit data retention for Multimodal further, [contact support](/docs/support) and enroll in Semgrep's minimal data retention policy. 

As part of the additional protections offered by the minimal data retention policy, customer data related to Semgrep Multimodal, including code and prompts:
- Are **not** logged or captured by logging or observability tools.
- Are **not** stored in any external storage system, such as Amazon S3. 

Please note the following **exceptions** for AI-powered detection scans:
  - If you upload context documentation to enhance AI-powered detection scans, these files are persistently stored in a Semgrep-managed Amazon S3 bucket to enable reuse across future AI-powered detection scans.
  - AI-powered scan reports are stored in a Semgrep-managed Amazon S3 bucket. These reports may contain metadata such as file names and, in some cases, code snippets included in issue descriptions.

Responses from Semgrep's AI model vendors are stored in the Semgrep database solely for providing Multimodal functionality. For instance, AI-generated remediation advice is stored so users can access it in the Semgrep AppSec Platform. However, code snippets are never retained to improve future prompts. 

Any stored data can be deleted upon customer request. Semgrep, Inc. will provide at least 30 days' notice before making any changes to the retention policy.

For more details, see [<i class="fas fa-external-link fa-xs"></i> Data Privacy Overview - Semgrep Multimodal](https://drive.google.com/file/d/19a9m67TS4lRaRusMmsNlIjttTY5b1lEf/view)



