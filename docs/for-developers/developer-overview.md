---
slug: developer-overview
title: Overview
hide_title: true
displayed_sidebar: devSidebar
description: An overview of Semgrep for developers. Learn the basics of Semgrep and how it integrates into your coding workflows and environment.
tags:
  - Guides for developers
---

import ScanSpeedScope from "/src/components/reference/_scan-speed-scope.md"

# Semgrep for developers

This guide is for developers who are using Semgrep in a team or organizational setting.

Use Semgrep to:

- Triage security issues
- Follow best practices set by your organization
- Automate code reviews among your peers
- Lint your code

This document provides an overview of how developers work with Semgrep to resolve the issues it detects.

<!-- move to another doc
By understanding how Semgrep works, you are able to customize Semgrep to better suit your needs.

-->

<!-- tk figure out where to put this
- To learn about and set up a Semgrep account, see [Sign in and install Semgrep](/for-developers/developer-signin).
- For a guide on triaging, remediating, and fixing issues with Semgrep, see [Resolve findings with Semgrep](/for-developers/resolve-findings). -->

:::note Developer and AppSec roles
If you are a developer responsible for your **own** security program in personal projects, see the [Quickstart](/getting-started/quickstart) and [Core deployment](/deployment/core-deployment) docs.
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or simply **Semgrep**, is a software suite for implementing and tracking security programs.

**AppSec engineers** use Semgrep to detect, triage, and remediate findings across an entire organization's codebases.

**Developers** primarily interact with Semgrep when Semgrep scans a project, then notifies users of issues in their code. Issues detected by Semgrep are called **findings**. The pattern-matching logic by which Semgrep detects a finding is encapsulated in a **rule**. Semgrep performs various static analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

## Type of findings by resolution

You can receive several types of findings with different ways of resolving them. 

Code finding - refactor your code 
Dependency finding - upgrade or change the library 
License finding - change the library 
Secrets finding - rotate the secret

## How developers use Semgrep

Your interactions with Semgrep vary depending on your organization's deployment of it.

Semgrep is almost always integrated into your CI and source code manager (SCM) and automatically runs on every pull request or merge request you open. These scans are **diff-aware** and only affect the scope of your PR, which keeps the scan speed fast. Your security engineer may configure Semgrep to display PR or MR comments about certain **blocking** or **non-blocking** findings to you, which you can resolve or ignore from within your SCM.

![A PR comment detecting a hardcoded secret](/img/guardrails-secrets.png)
_**Figure**. A PR comment detecting a hardcoded secret._

It is less frequent, but still common, for developers to run Semgrep as part of their day-to-day coding workflow in the following environments:

-  IDEs (VS Code and IntelliJ)
-  CLI
    - `pre-commit`

Your AppSec team is likely to have guidelines about Semgrep scans in these environments.

:::tip Noise in your pull requests or merge requests?
Your security engineers are in full control of what findings are displayed to you. If you notice a high rate of false positives, tell your security engineers so that they can tune your scans. 
:::

## Semgrep findings in your PR or MR

Semgrep findings are typically posted in your PR or MR. The following image displays the parts of a Semgrep PR comment in GitHub; this example appears in a similar form in GitLab and other SCMs:

_**Figure**. An example of a PR comment._

- **A - Block indicator**. This appears if a finding fails the CI job. Organizations typically block PRs or MRs with failed jobs.
- **B - Finding description**. A human-written description always appears in a PR or MR comment, describing why your code is flagged.
- **C - References**. References may appear to help you learn more about the finding.
- **D - Resolution section**. Various options are provided to help your resolve the finding. Depending on the type of finding, resolution options may vary.
