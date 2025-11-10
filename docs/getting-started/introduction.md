---
slug: /introduction
append_help_link: true
title: Introduction to Semgrep
hide_title: false
description: Learn what Semgrep has to offer
displayed_sidebar: whatsSemgrepSidebar
tags:
  - quickstart
  - introduction
  - what-is-semgrep
  - intro
---


Semgrep is a software security tool that provides static application security testing (SAST), software composition analysis (SCA), and secrets detection. It identifies vulnerabilities in source code without executing it. Semgrep integrates with IDEs and CI/CD, and can also run from the Semgrep AppSec Platform.

Semgrep uses rules written in a simple schema that match code semantically. You can use out-of-the-box rules, apply community-maintained rules, or write your own to fit your workflow.

Scan results can be triaged and remediated in the Semgrep AppSec Platform. The platform includes Semgrep Assistant, which offers remediation guidance and autofix suggestions for Semgrep Code and Secrets findings.

## Offerings

* **Community Edition** (CE): is an open source static analysis tool that can find insecure coding patterns and security vulnerabilities in source code. Semgrep CE encompasses a SAST scanning engine, community rules, and integrated development environment plugins. The core scanner supports over 30 programming languages. [Get started with CE](/docs/getting-started/quickstart-ce).

* **Semgrep AppSec Platform** (Pro): is a commercial offering recommended for enterprise use cases. It shares the command-line interface with CE and adds additional capabilities. Semgrep AppSec Platform Pro offers managed scanning at org scale, advanced (pro) rules, supply-chain analysis, secrets detection, PR comments, and AI-assisted triage/fixes, and more. It supports over 35 programming languages, with new ones added regularly.

![](/img/appsecplatform-intro.png)

[Learn more](/docs/semgrep-pro-vs-oss) about the differences between CE and Pro offerings and the features that distinguish them.


## The analysis workflow

Semgrep's analysis workflow can be divided into three stages:

### Deployment 
Deployment is the process of integrating Semgrep into your developer and infrastructure workflows. Completing the deployment process provides you with the Semgrep features that meet your security program's needs. Semgrep does not require code access to complete the core deployment process. Your code is **not** sent anywhere.

Learn more about [Semgrep deployment](/docs/deployment/core-deployment).

### Scan

Scanning is the process of analyzing your code to identify security vulnerabilities, exposed secrets, or risks introduced through dependencies. Semgrep provides three scanning tools that help you detect and address issues early in development and throughout your software lifecycle:

* Semgrep Code: a static application security testing (SAST) tool that detects security vulnerabilities in your **first-party code**. You can use it to scan local repositories or integrate it into your CI/CD pipeline to automate the continuous scanning of your code. [Learn more](/docs/semgrep-code/overview)

* Semgrep Supply Chain Analysis: a software composition analysis (SCA) tool that detects security vulnerabilities in your codebase introduced by open source dependencies. [Learn more](/docs/semgrep-supply-chain/overview)

* Semgrep Secrets: scans code to detect exposed API keys, passwords, and other credentials. [Learn more](/docs/semgrep-secrets/conceptual-overview)



### Triage and remediation

After each scan, your findings are displayed in the Semgrep AppSec Platform. The filters provided allow you to manage and triage your findings.

Triage is the process of reviewing, prioritizing, and managing findings identified during Semgrep scans. It helps security teams and developers decide which issues to address, ignore, or assign for further investigation. Within the Semgrep AppSec Platform, triage tools such as filtering, tagging, and assigning owners streamline this process and integrate seamlessly into existing workflows.

Remediation is the process of fixing security issues identified during scanning. Semgrep supports remediation by providing detailed findings, contextual code examples, and, in many cases, Autofix suggestions that can automatically or semi-automatically resolve vulnerabilities. These tools help developers quickly implement secure fixes while maintaining development speed.
Additionally, Semgrep Assistant provides AI-powered security recommendations to help you review, triage, and remediate your Semgrep findings.

Semgrep Assistant enhances this workflow by providing AI-powered security recommendations to help you understand findings, assess severity, and prioritize fixes. It can also suggest potential remediations, explain rule matches in context, and guide developers toward faster resolution of issues.

## Ways to incorporate Semgrep into your development workflow


| Goal | Recommended Option | Available In |
|------|--------------------|---------------|
| Quick local checks | Run Semgrep locally | CE & Pro |
| Catch issues before commit | IDE extension or pre-commit framework | CE & Pro |
| Integrate into builds | CI/CD integration | CE & Pro |
| Org-wide management & automation | Semgrep Managed Scans (SMS) | Pro (AppSec Platform) only |



### Run Semgrep locally

Run Semgrep directly on your machine to scan code before pushing changes. This is the quickest way to get started and experiment with rules. You can run scans manually from the command line or set up local automations. [Learn more](/docs/getting-started/quickstart).


### Use Semgrep in your IDE or before commits

Incorporate Semgrep early in your development workflow by using a [supported IDE extension](/docs/extensions/overview#official-ide-extensions) or by setting up the [pre-commit framework](/docs/extensions/pre-commit), which runs Semgrep checks automatically before code is committed. This helps you catch issues before they ever reach your repository.



### Add Semgrep to CI/CD

Integrate Semgrep into your CI/CD environment (e.g., GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, Azure Pipelines, Bitbucket, or Buildkite) by creating a job that your CI provider runs. After each scan, findings are sent to the Semgrep AppSec Platform for triage and remediation. [Learn more](/docs/deployment/add-semgrep-to-ci).

> **Note:** While CI/CD integration continues to be supported, [Semgrep Managed Scans](#semgrep-managed-scans-sms-via-the-appsec-platform-dashboard-recommended) are the recommended approach for organization-wide deployments.


### Semgrep Managed Scans (SMS) via the AppSec Platform Dashboard (Recommended)

[Semgrep Managed Scans](/docs/deployment/managed-scanning/overview) help teams adopt SAST, SCA, and secrets detection tools across their organization without complex setup. Scans are run automatically on Semgrep’s cloud infrastructure, and results appear directly in the AppSec Platform dashboard.

**Key features:**
- Minimal setup and no CI changes required  
- Configure scans through the AppSec Platform  
- Scan multiple repositories with a single integration  
- Integrate results into workflows via PR comments  
- Available for all Semgrep products (Code, Secrets, Supply Chain Analysis)  
- Automatic bi-weekly scans  



## Why Semgrep beats typical competitors (practical differences)

- **No build required for most languages:** Semgrep runs on almost any repository without complex setup. Tools like CodeQL often need a buildable environment and use their own query language.  
- **Faster rule authoring and iteration:** Semgrep patterns resemble real code, making it easier to write, test, and refine rules without switching contexts. It allows for customization and extensibility without DSLs, managing abstract syntax trees, or regex wrangling
- **Actionable feedback during code review:** Developers receive immediate PR or MR comments based on organization-defined policies, allowing them to fix or ignore findings during review and reducing triage churn.  
- **Seamless path to deeper analysis:** With Semgrep’s platform features, teams can extend scanning to include cross-file and taint analysis, reachability checks, secrets detection, and supply chain analysis within the same workflow.
- **Support for 30+ programming languages**  

Semgrep offers lower setup friction, fewer false positives in code review, simpler custom rules, and a tighter feedback loop between security and development teams.
