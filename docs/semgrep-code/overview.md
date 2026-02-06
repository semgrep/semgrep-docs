---
slug: overview
append_help_link: true
title: Overview
hide_title: true
description: Learn about Semgrep Code, a static application security testing (SAST) tool |
    that finds security vulnerabilities in your first-party code.
tags:
  - Semgrep Code
---


import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"

# Semgrep Code overview

Semgrep Code is a static application security testing (SAST) tool that detects security vulnerabilities in your first-party code.

You can use Semgrep Code to scan local repositories or integrate it into your CI/CD pipeline to automate the continuous scanning of your code.


## Rules

<SemgrepScan />

Semgrep performs SAST scans using rules that define which patterns to detect in your code. 

Rules used by the Semgrep Pro Engine are available in the [Registry](https://semgrep.dev/r). Additionally, you can [write custom rules](/docs/writing-rules/overview) to determine what Semgrep Code should detect in your repositories. 

Whether you use pre-existing rules or write custom rules, knowing *which* rules Semgrep Code runs can help you understand how it detects security issues.

Semgrep Code is transparent; you can configure the rules it runs and inspect its syntax to understand how the finding was detected. You can also customize the content of a rule to improve the true positive rate of a rule or have Semgrep send a relevant message to developers.

## AI-powered detection (beta)

Some security issues, such as insecure direct object reference (IDORs), broken authentication, and other business logic flaws, are hard to detect with static rules alone. Semgrep’s Multi-Modal SAST Engine combines deterministic precision with AI to understand the context of your code and expose OWASP Top 10 vulnerabilities as well as complex business-logic flaws.

LLMs excel at understanding code context: variable names, class structures, function intent, and even comments. By pairing that reasoning power with structured scanning, Semgrep can:
- Enumerate key attack surfaces, such as routes or controllers.
- Check for missing safeguards, such as authentication, role checks, and permissions.
- Flag potential logic gaps for review before attackers ever find them.

==Semgrep's Multi-Modal SAST Engine== analyzes your code to understand its structure, API surfaces, and data flows. Based on that understanding, Semgrep generates targeted rules for your application with improved signal quality while keeping findings transparent.

If Semgrep Assistant is enabled, the AI-powered detection scan is available by default. Learn how to run an [AI-powered detection scan](/docs/deployment/add-ai-to-scans). 

## Findings

Semgrep AppSec Platform displays Semgrep Code's findings. Additionally, the platform allows you to:

* Triage findings
* Send alerts and notifications or create tickets to track findings identified by Semgrep Code
* Customize how Semgrep Code scans your repositories
* Manage your users and facilitate team collaboration in remediating security issues

## Semgrep Community Edition (CE) versus Semgrep Code analysis

By default, Semgrep Code can analyze interactions beyond a single function but within a single file, a process known as **cross-function or interprocedural analysis**. This smaller scope of analysis makes it faster and easier to integrate into developer workflows.

Semgrep CE can only analyze interactions within a single function, known as intraprocedural or single-function analysis. However, this means that Semgrep CE is slightly faster than Semgrep Code. <!-- can we have a stat for this -->

Semgrep Code also supports **[cross-file analysis](/semgrep-code/semgrep-pro-engine-intro/)** (interfile) analysis. These scans produce fewer false positives and more true positives, but take longer to complete.

## Enable Semgrep Code

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Go to **[Settings > General > Code](https://semgrep.dev/orgs/-/settings/general/code)**.
1. Click the **<i class="fa-solid fa-toggle-large-on"></i> Code scans** toggle if it is not already enabled.

Subsequent scans now include Code scans.

### Run Semgrep Code scans with single-function analysis

In some cases, you may want to scan using Semgrep CE's single-function analysis. To do this, edit your `semgrep ci` command in your CI provider's configuration file with either the `--pro-languages` or `--oss-only` flags:

```yaml
# Preferred; includes support for all Semgrep Code languages
semgrep ci --pro-languages

# Does not include all Semgrep Code language features
semgrep ci --oss-only
```

## Augment Semgrep Code with Semgrep Assistant

[Semgrep Assistant](/semgrep-assistant/overview) provides AI-powered security recommendations to help you review, triage, and remediate your Semgrep findings. More specifically, Assistant can:

- Provide [remediation advice](/semgrep-assistant/overview#remediation) and autofixes, or suggested fixes, for Semgrep Code findings. This information is displayed in Semgrep AppSec Platform.
- Provide [remediation guidance](/semgrep-assistant/overview#guidance) with step-by-step instructions on how to remediate the finding identified by Semgrep Code in every pull request or merge request comment Semgrep pushes.
  - Assistant supports the tailoring of its remediation guidance using [Memories](/semgrep-assistant/overview#memories).
- [Tag your findings](/semgrep-assistant/overview#component-tags) in Semgrep AppSec Platform to help identify high-priority issues.
- [Auto-triage findings](/semgrep-assistant/overview#auto-triage) and suggest whether a finding can safely be ignored.
- [Filter out potential false positives](/semgrep-assistant/overview#noise-filtering-beta) to help increase developer velocity.

## Next steps

- [View your findings](/semgrep-code/findings).
- Customize how Semgrep Code scans your repository by modifying the [default rules set](https://semgrep.dev/p/default) or [writing your own rules](/semgrep-code/editor/#write-a-new-rule-by-forking-an-existing-rule).
- Enable [autofix](/writing-rules/autofix) so that Semgrep can push code suggestions to GitHub or GitLab to help your developers resolve findings.
- Enable [cross-file scanning](/semgrep-code/semgrep-pro-engine-intro/).

## Further reading

- Read the [Trail of Bits Automated Testing Handbook](https://appsec.guide/) to learn about configuring and optimizing security tools, including Semgrep.
