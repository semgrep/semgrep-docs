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

Semgrep Assistant uses API permissions to access code on your pre-selected GitHub or GitLab repositories.

* Semgrep Assistant logs and stores AI prompts and responses for the sake of performance evaluation, which includes source code snippets.
* Semgrep Assistant sends relevant lines of code to our AI subprocessors. Currently, "relevant lines of code" means lines that are part of the Semgrep finding, plus the minimum number of lines of code required to provide enough context to produce accurate results. Semgrep, Inc. is likely to expand this, potentially to the entire file, as we learn how to pass more useful context.
* Semgrep stores and retains AI responses based on these code snippets for up to 6 months. Semgrep, Inc. will update you with at least a 30-day notice if we make any changes to the retention policy.<!-- markdown-link-check-disable -->
* Semgrep, Inc. uses two subprocessors as model vendors for AI results: OpenAI and Amazon Bedrock. Semgrep has Data Protection Agreements with each subprocessor (provided upon request by [contacting support](/docs/support)).<!-- markdown-link-check-enable -->
  * Semgrep is actively enrolled in OpenAI's zero data retention feature and has a zero data retention agreement with Amazon Bedrock. This means that zero data retention is applied to all requests from Semgrep, ensuring that no customer data is retained.
* Semgrep, Inc. takes the following steps to protect data that is processed by AI since Assistant requires the sharing of code snippets with a third party:
  * Semgrep only shares the code necessary to enlist the help of the AI subprocessor in automating the resolution of each specific alert.
  * Semgrep only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* When using Semgrep Assistant, source code **does** leave your repository; Assistant submits part of the file with a finding to the AI subprocessor for processing by an AI model. The AI subprocessor is not allowed to use the submitted code to train its models.
* Regarding your data privacy, none of your personal information is shared with the AI subprocessor as a part of the Semgrep Assistant feature.
* Semgrep, Inc. and its AI subprocessors do not obtain any rights to your source code. Your source code remains yours, and Semgrep and its AI subprocessors access it to the limited extent necessary to provide the Semgrep Assistant service. Once the results are returned to you, Semgrep Assistant deletes the shared snippets.
* Because Semgrep Assistant accesses OpenAI's services through the API, OpenAI does not use any of the code provided to them to improve their services (see Section 3(c) of their Terms of Use). AWS Bedrock also [doesn't use customer data to improve base models](https://aws.amazon.com/bedrock/security-compliance/).
* To a limited extent, using Semgrep Assistant changes the terms of your agreement with Semgrep, Inc. Specifically, sharing code snippets with Semgrep Assistant as part of this feature expands the scope of the data to which you grant Semgrep, Inc. a limited license to provide services to you (see Section 5.1 of our Subscriber Agreement).

For more details, see the [Semgrep Assistant FAQ](https://get.semgrep.dev/assistant).
