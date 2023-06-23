---
slug: semgrep-assistant 
append_help_link: true
title: semgrep-assistant 
hide_title: true
description: Enable Semgrep Assistant (beta) in your PR comments to provide tips for triage and remediation of Semgrep findings. 
tags:
  - Semgrep Code
---

# Semgrep Assistant


Receive GPT-4-powered security recommendations designed to reduce the time spent when reviewing Semgrep Code findings. Semgrep Assistant can leave comments in pull requests (PRs) and Slack notifications. These comments provide recommendations for triage and code remediation, such as assessing if a finding is a true or false positive.

[screenshot]

This document provides an overview of the following:

* Feature availability, support, and maturity
* Privacy and legal aspects
* How to enable Semgrep Assistant and receive notifications or comments from Semgrep Assistant


:::info Feature maturity 
* This feature is in private beta. If you’d like to join the waitlist, visit: https://get.semgrep.dev/Assistant-Beta-Request.html 
* You or your developers may encounter rough edges. This includes inaccurate recommendations or broken text. Please leave feedback on the PR comments from Semgrep Assistant to help the Semgrep team improve Semgrep Assistant.
::: 

## Feature support and availability

### Source code management
* This feature is available only to users of GitHub Cloud. We do not support GitHub Enterprise Server (self-hosted).

### Semgrep products

* Semgrep Assistant is available for any Semgrep Cloud Platform user. This includes users who are using Semgrep Cloud Platform for free.
* Semgrep Assistant is not available on Semgrep CLI.
* Semgrep Assistant works exclusively on Semgrep Code findings.

### Language support

Semgrep Assistant supports all the same languages as Semgrep Code. See Supported languages for more information.

## Privacy and legal considerations

Semgrep gets API permissions to access code on your pre-selected GitHub repositories.

* Semgrep Inc. logs & stores the GPT prompts and responses for the sake of performance evaluation, which include source code snippets.
* Semgrep Inc. sends relevant lines of code to OpenAI's API, where currently, the 'relevant lines of code' means lines that are part of the Semgrep finding, plus 10 lines of context on each side. Semgrep Inc. is likely to expand this, potentially to the entire file as we learn how to pass more useful context.
* Semgrep Inc stores and retains these code snippets for up to 6 months. Semgrep Inc. will update you with at least a 30-day notice, if we make any changes to the retention policy.
* Semgrep Inc is a paying customer of OpenAI and has a Data Protection Agreement signed with them (provided upon request by contacting [email]). The code snippets we upload will be persisted by OpenAI temporarily, per their data usage policies at [Open AI API data Usage Policies](https://openai.com/policies/api-data-usage-policies) 
* For more details, see the [Semgrep Assistant FAQ](https://get.semgrep.dev/assistant).


<MoreHelp />
