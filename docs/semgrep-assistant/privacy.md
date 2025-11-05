---
slug: privacy
title: Privacy policy and legal considerations
hide_title: true
description: Learn about the privacy and legal considerations involved when using Semgrep Assistant.
tags:
  - Deployment
  - Semgrep Assistant
---

# Privacy and legal considerations for Semgrep Assistant

Semgrep Assistant uses API permissions to access code on your pre-selected GitHub or GitLab repositories. Semgrep Assistant seeks to limit the time customer data resides with AI model vendors. The current list of subprocessors includes OpenAI and Amazon Bedrock, both of which provide zero data retention. 

## Zero Data Retention from model vendors
* Semgrep Assistant logs and stores AI prompts and responses for the sake of performance evaluation, which includes source code snippets.
* Semgrep Assistant sends relevant lines of code to our AI subprocessors. Currently, "relevant lines of code" means lines that are part of the Semgrep finding, plus the minimum number of lines of code required to provide enough context to produce accurate results. Semgrep, Inc. is likely to expand this, potentially to the entire file, as Semgrep learns how to pass more useful context.
* Semgrep stores and retains AI responses based on these code snippets for up to 6 months. Semgrep, Inc. will provide at least 30 days' notice if Semgrep make any changes to the retention policy.<!-- markdown-link-check-disable -->
* Semgrep, Inc. uses two subprocessors as model vendors for AI results: OpenAI and Amazon Bedrock. Semgrep has Data Protection Agreements with each subprocessor. If you are a current Semgrep customer, you can request the Data Protection Agreements through Semgrep's [trust portal](https://trust.semgrep.dev). Otherwise, please reach out to your account contact to request a copy of these DPAs.
  * Semgrep is actively enrolled in OpenAI's zero data retention feature and has a zero data retention agreement with Amazon Bedrock. This means that zero data retention is applied to all requests from Semgrep, ensuring that no customer data is retained.
* Semgrep, Inc. takes the following steps to protect data that is processed by AI since Assistant requires the sharing of code snippets with a third party:
  * Semgrep only shares the code necessary to enlist the help of the AI subprocessor in automating the resolution of each specific alert.
  * Semgrep only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* When using Semgrep Assistant, source code **does** leave your repository; Assistant submits part of the file with a finding to the AI subprocessor for processing by an AI model. The AI subprocessor is not allowed to use the submitted code to train its models.
* There is strong isolation between semgrep deployments. Data and code from one customer is never co-mingled with another customer.
* Regarding your data privacy, none of your personal information is shared with the AI subprocessor as part of the Semgrep Assistant feature.
* Semgrep, Inc. and its AI subprocessors do not obtain any rights to your source code. Your source code remains yours, and Semgrep and its AI subprocessors access it to the limited extent necessary to provide the Semgrep Assistant service. Once the results are returned to you, Semgrep Assistant deletes the shared snippets.
* Because Semgrep Assistant accesses OpenAI's services through the API, OpenAI does not use any of the code provided to them to improve their services (see Section 3(c) of their Terms of Use). AWS Bedrock also [doesn't use customer data to improve base models](https://aws.amazon.com/bedrock/security-compliance/).
* To a limited extent, using Semgrep Assistant may change the terms of your agreement with Semgrep, Inc. Specifically, sharing code snippets with Semgrep Assistant as part of this feature expands the scope of the data to which you grant Semgrep, Inc. a limited license to provide services to you (see Section 5.1 of our Subscriber Agreement).

## Semgrep Assistant Minimal Data Retention Policy (Optional)

If you wish to limit data retention for Assistant further, [contact support](/docs/support) and enroll in Semgrep's minimal data retention policy. 

As part of the additional protections offered by the minimal data retention policy, customer data related to Semgrep Assistant (including code and prompts):
- is **not** logged or captured by logging/observability tools.
- is **not** stored in any external storage system (e.g., Amazon S3).

Responses from Semgrep's AI model vendors are stored in the Semgrep database solely for providing Assistant functionality. For instance, AI-generated remediation advice is stored so users can access it in the Semgrep AppSec Platform. However, code snippets are never retained to improve future prompts. 

Any stored data can be deleted upon customer request. Semgrep, Inc. will provide at least 30 days' notice before making any changes to the retention policy.

For more details, see [<i class="fas fa-external-link fa-xs"></i> Data Privacy Overview - Semgrep Assistant](https://drive.google.com/file/d/19a9m67TS4lRaRusMmsNlIjttTY5b1lEf/view)

