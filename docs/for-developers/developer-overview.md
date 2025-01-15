---
slug: /for-developers/overview
title: Overview
hide_title: true
displayed_sidebar: devSidebar
description: An overview of Semgrep for developers. Learn the basics of Semgrep and how it integrates into your coding workflows and environment.
tags:
  - Guides for developers
---

import PartsOfComment from "/src/components/reference/_parts-of-comment.md"

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
If you are a developer responsible for your **own** security program in personal projects, see the [Quickstart](/getting-started/quickstart) and [Core deployment](/deployment/core-deployment) documentation.
:::

## Semgrep AppSec Platform

Semgrep AppSec Platform, or simply **Semgrep**, is a software suite for implementing and tracking security programs.

**AppSec engineers** use Semgrep to detect, triage, and remediate findings across an entire organization's codebases.

**Developers** primarily interact with Semgrep when Semgrep scans a project, then notifies users of issues in their code. Issues detected by Semgrep are called **findings**. The pattern-matching logic by which Semgrep detects a finding is encapsulated in a **rule**. Semgrep performs various static analyses to detect bugs, vulnerabilities in dependencies, and leaked secrets.

## How developers use Semgrep

Your interactions with Semgrep vary depending on your organization's deployment of it.

Semgrep is almost always integrated into your CI and source code manager (SCM) and automatically runs on every pull request or merge request you open. These scans are **diff-aware** and only affect the scope of your PR, which keeps the scan speed fast. Your security engineer may configure Semgrep to display PR or MR comments about certain **blocking** or **non-blocking** findings to you, which you can resolve or ignore from within your SCM.

![A PR comment detecting a hardcoded secret](/img/guardrails-secrets.png)
_**Figure**. A PR comment detecting a hardcoded secret._

It is less frequent, but still common, for developers to run Semgrep as part of their day-to-day coding workflow in the following environments:

-  IDEs (VS Code and IntelliJ)
-  CLI, including `pre-commit`

Your AppSec team is likely to have guidelines about Semgrep scans in these environments.

:::tip Noise in your pull requests or merge requests?
Your security engineers are in full control of what findings are displayed to you. If you notice a high rate of false positives, tell your security engineers so that they can tune your scans. 
:::

## Semgrep findings in your PR or MR

<PartsOfComment />

### Type of findings by resolution

<dl>
<dt>Code finding</dt> 
<dd>This type of finding is typically resolved by refactoring your code. This finding typically catches bugs, security issues, or violations of best practices.</dd>
<dt>Dependency finding</dt> 
<dd>Semgrep found that you're using a vulnerable version of a dependency. It can also detect if you're using the vulnerable function or code of the dependency.</dd>
<dt>License finding</dt>
<dd>Semgrep has found that you're using a dependency with a <strong>license</strong> that may violate the guidelines set by your organization.</dd>
<dt>Secrets finding</dt>
<dd>Semgrep has detected a leaked secret. Rotate the secret to resolve this finding.</dd>
</dl>

![Summary of findings by resolution, assuming that the finding is a true positive.](/img/finding-by-resolution.jpg#md-width)
_**Figure**. Summary of findings by resolution, assuming that the finding is a true positive._

