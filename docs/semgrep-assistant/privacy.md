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

* Semgrep Assistant logs and stores the GPT prompts and responses for the sake of performance evaluation, which includes source code snippets.
* Semgrep Assistant sends relevant lines of code to OpenAI's API. Currently, "relevant lines of code" means lines that are part of the Semgrep finding, plus the minimum number of lines of code required to provide enough context to produce accurate results. Semgrep, Inc. is likely to expand this, potentially to the entire file, as we learn how to pass more useful context.
* Semgrep stores and retains GPT's responses based on these code snippets for up to 6 months. Semgrep, Inc. will update you with at least a 30-day notice if we make any changes to the retention policy.
<!-- markdown-link-check-disable -->
* Semgrep, Inc. is a paying customer of OpenAI and has a Data Protection Agreement signed with them (provided upon request by [contacting support](/docs/support)). The code snippets we upload are persisted by OpenAI temporarily, following their data usage policies at [Enterprise privacy at OpenAI](https://openai.com/enterprise-privacy).
<!-- markdown-link-check-enable -->
* Semgrep, Inc. takes the following steps to protect data that is processed by AI since Assistant requires the sharing of code snippets with a third party:
  * Semgrep only shares the code necessary to enlist the help of GPT in automating the resolution of each specific alert.
  * Semgrep only accesses source code repositories on a file-by-file basis; it does not need or request org-level access to your codebase.
* When using Semgrep Assistant, source code **does** leave your repository; Assistant submits part of the file with a finding to OpenAI for processing by a GPT model. OpenAI is not allowed to use the submitted code to train its models.
* Regarding your data privacy, none of your personal information is shared with OpenAI as a part of the Semgrep Assistant feature.
* Semgrep, Inc. and OpenAI do not obtain any rights to your source code. Your source code remains yours, and Semgrep or OpenAI accesses it to the limited extent necessary to provide the Semgrep Assistant service. Once the results are returned to you, Semgrep Assistant deletes the shared snippets. OpenAI retains copies of the content sent to them for a maximum of 30 days to monitor for abuse, as indicated in their API Data Usage Policies.
* Because Semgrep Assistant accesses OpenAI's services through the API, OpenAI does not use any of the code provided to them to improve their services (see Section 3(c) of their Terms of Use).
* To a limited extent, using Semgrep Assistant changes the terms of your agreement with Semgrep, Inc. Specifically, sharing code snippets with Semgrep Assistant as part of this feature expands the scope of the data to which you grant Semgrep, Inc. a limited license to provide services to you (see Section 5.1 of our Subscriber Agreement).

For more details, see the [Semgrep Assistant FAQ](https://get.semgrep.dev/assistant).
