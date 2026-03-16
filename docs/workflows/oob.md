---
slug: oob
title: End-to-end workflow
hide_title: true
displayed_sidebar: scanSidebar
description: Learn how the default Semgrep Workflow can help you detect, triage, and fix security vulnerabilities by combining the power of SAST and AI.
tags:
  - Workflows
  - Deployment
---

# Semgrep Workflows - Default

This document explains how Semgrep's built-in, end-to-end, default workflow allows you detect, triage, and fix security vulnerabilities and logic issues.

## 1. Detect security vulnerabilities

Semgrep combines rule-based detection with AI-powered detection tim improve findings and minimize false positive results. Rule-based scans rely on defined patterns that Semgrep looks for when analyzing your code. AI-powered detection builds on rule-based scans, combining the precision of static analysis with the contextual reasoning offered by large language models (LLMs). LLMs are especially helpful for detecting vulnerabilties like IDOR, access control issues, and other logic bugs. These are issues that have been difficult to find with static analysis alone.

Semgrep can agentically understand where such risk is in your project by mapping out your application and performing automatic threat modeling. Semgrep also accepts context that you provide, which is helpful for improving its understanding of where the risk exists.

## 2. Triage security vulnerabilities

Semgrep AppSec Platform provides you with a way to visualize all of your findings across all Semgrep products: Multimodal, Supply Chain, and Secrets. However, not all findings identified by Semgrep are high priority. In addition to combining SAST and AI to better find security vulnerabilities in your project, Semgrep uses these tools to reduce noise and help developers focus on true positives. More specifically:

- Semgrep Code uses rules to identify security vulnerabilities, but AI autotriage, with additional context available, can flag issues as either **true positive** or **false positive**.
- Supply Chain reachability: Supply Chain uses static analysis to identify reachability. In addition to identifying vulnerable packages, Semgrep can flag those where your program calls vulnerable functions, reducing the number of false positives shown to your developers.

Memories is the Semgrep feature that allows you to provide additional context to how AI analyzes your scan results. You can either create memories and apply them to a specific rule or a general vulnerability class. You can also create memories based on suggested fixes -- if Semgrep proposes a change that you disagree with, you can provide your preferred remediation approaches and secure defaults for the project.

## 3. Fix security vulnerabilities

Once Semgrep has scanned your project and triaged findings so that only the most important issues are shown to your developers, it is time to fix the security issues identified.

Semgrep can provide you with the code change you need to implement to correct the issue and remove the risk posed by the vulnerability. For example, Semgrep Code can create pull requests (PRs) and merge requests (MRs) with an explanation of the issue, an explanation of the proposed changes, and the code changes required to correct a security issue. Your developer can review the PRs and MRs, then merge when appropriate.

Supply Chain also offers similar functionality, with the addition upgrade guidance. Upgrade guidance informs you of whether the suggested dependency upgrade is a breaking change.

## 4. Customize your security scans

Because no two organizations have the same security requirements, Semgrep offers an agent SDK that you can use to create custom workflows. [<i class="fa-regular fa-envelope"></i> Contact Semgrep](mailto:sales@semgrep.com) for further information.