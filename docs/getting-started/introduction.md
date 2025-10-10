---
slug: introduction
append_help_link: true
title: Introduction to Semgrep
hide_title: false
description: Learn what Semgrep has to offer
displayed_sidebar: scanSidebar
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

* **Community Edition** (CE, open source): the core scanner supporting over programming languages. 
* **Semgrep AppSec Platform** (Pro): managed scanning at org scale, pro rules, supply-chain analysis, secrets detection, PR comments, and AI-assisted triage/fixes, and more. The Semgrep AppSec Platform supports over 35 programming languages, with new ones added regularly.

![](/img/appsecplatform-intro.png)

[Learn more](/docs/semgrep-pro-vs-oss) about the differences between the two offerings and the features that distinguish them.


## The analysis workflow

Semgrep's analysis workflow can be divided into three stages:

### Deployment 
Deployment is the process of integrating Semgrep into your developer and infrastructure workflows. Completing the deployment process provides you with the Semgrep features that meet your security program's needs. Semgrep does not require code access to complete the core deployment process. Your code is **not** sent anywhere.

Learn more about [Semgrep deployment](/docs/deployment/core-deployment)

### Scan

Semgrep offers three products for scanning your code for security vulnerabilities:

* Semgrep Code: a static application security testing (SAST) tool that detects security vulnerabilities in your **first-party code**. You can use it to scan local repositories or integrate it into your CI/CD pipeline to automate the continuous scanning of your code. [Learn more](/docs/semgrep-code/overview)

* Semgrep Supply Chain Analysis: a software composition analysis (SCA) tool that detects security vulnerabilities in your codebase introduced by open source dependencies. [Learn more](/docs/semgrep-supply-chain/overview)

* Semgrep Secrets: scans code to detect exposed API keys, passwords, and other credentials. [Learn more](/docs/semgrep-secrets/conceptual-overview)



### Triage and remidiation

After each scan, your findings are displayed in Semgrep AppSec Platform's Secrets page. The filters provided allow you to manage and triage your findings. Additionally, Semgrep Assistant provides AI-powered security recommendations to help you review, triage, and remediate your Semgrep findings.


## Ways to incorporate Semgrep into your development workflow

### Semgrep managed scans (SMS) via the AppSec Platform Dashboard
[Semgrep managed scans](/docs/deployment/managed-scanning/overview) help teams adopt SAST, SCA, and secret detection security tools across their entire organization without the need for complex infrastructure investment and configuration. This method is an alternative to adding Semgrep in CI. SMS enables enterprises to deploy or modify code scanning tools rapidly. Managed scans are run automatically on our cloud infrastructure and the findings are handed back to users in the AppSec Platform dahsboard. 

Features of managed scans:
  * Minimal code, can be configured using the AppSec Platform
  * Can scan multiple repositories with a single integration
  * Intigrates into workflows through PR comments
  * Available for all products (Code, Secrets, Supple Chain Analysis)
  * Easy to set up 
  * Scans automatically, every two weeks
  * No adding to or changing CI workflows


### Add Semgrep to CI

Semgrep can be integrated into CI environments (e.g., GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, Azure Pipelines, Bitbucket, and Buildkite) by creating a job that the CI provider runs. After a scan, findings are sent to the Semgrep AppSec Platform for triage and remediation. [Learn more](/docs/deployment/add-semgrep-to-ci).



While this method is still enabled, SMS is the recommended path to adding Semgrep to CI. 

## Run Semgrep locally
## Add Semgrep to IDE



* Diff-aware CI scans and configurable PR/MR comment modes reduce noise and keep focus in the developer workflow. 
* Learn more about how Semgrep can be [incorporated into your development workflow](/docs/learn/security-foundations/security-testing-workflow#integration-into-developer-workflows).


## Why Semgrep beats typical competitors (practical differences)

* No build prerequisite for most languages: easier to run on any repo; CodeQL generally requires a buildable environment and its own query DSL. 
* Faster rule authoring and iteration: patterns mirror code; fewer context switches than writing QL queries. 
* Immediate PR/MR feedback with organization-tuned policies: developers fix or ignore in review; less triage churn. 
* Clear path to deeper analysis without leaving the workflow (cross-file/taint, reachability, secrets/SCA) when using the platform features. 

**Net effect** -- Lower setup friction, fewer false positives in code review, simpler custom rules, and a tighter loop between security and developers.