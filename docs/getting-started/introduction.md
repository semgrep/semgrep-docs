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


Semgrep is a software security tool that provides static application security testing (SAST), software composition analysis (SCA), and secrets detection. It integrates with IDEs and CI/CD, and can also run from the Semgrep AppSec Platform to find vulnerabilities in source code without executing it.

Semgrep uses rules written in a simple schema that match code semantically. You can use out-of-the-box Pro rules, apply community-maintained rules, or write your own to fit your workflow.

Scan results can be triaged and remediated in the Semgrep AppSec Platform. The platform includes Semgrep Assistant, which offers remediation guidance and autofix suggestions for Semgrep Code findings.

## Offerings

* Community Edition (open source): the core scanner supporting 30+ languages. 
* Semgrep AppSec Platform: managed scanning at org scale, pro rules, supply-chain reachability, secrets detection, PR comments, and AI-assisted triage/fixes. Supports 35+ languages

![](/img/appsecplatform-intro.png)

## Incorporating Semgrep into development workflows

* Runs locally and in CI; no build or heavyweight database step; fast feedback in PR/MR comments. 
* Rules resemble the source code; write and test in minutes using the in-product Editor. Lower learning curve than DSL-based systems. 
* Opt-in upload model for local scans; --dry-run keeps results local when needed. 
* Diff-aware CI scans and configurable PR/MR comment modes reduce noise and keep focus in the developer workflow. 
* Learn more about how Semgrep can be [incorporated into your development workflow](/docs/learn/security-foundations/security-testing-workflow#integration-into-developer-workflows).


## Why Semgrep beats typical competitors (practical differences)

* No build prerequisite for most languages: easier to run on any repo; CodeQL generally requires a buildable environment and its own query DSL. 
* Faster rule authoring and iteration: patterns mirror code; fewer context switches than writing QL queries. 
* Immediate PR/MR feedback with organization-tuned policies: developers fix or ignore in review; less triage churn. 
* Clear path to deeper analysis without leaving the workflow (cross-file/taint, reachability, secrets/SCA) when using the platform features. 

**Net effect** -- Lower setup friction, fewer false positives in code review, simpler custom rules, and a tighter loop between security and developers.