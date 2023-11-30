---
slug: overview
append_help_link: true
title: Overview
hide_title: false
description: Learn about Code, a static application security testing (SAST) tool |
    designed to find security vulnerabilities in your applications.
tags:
  - code
---

import MoreHelp from "/src/components/MoreHelp"
import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"

Semgrep Code is a static application security testing (SAST) tool that inspects your application for security vulnerabilities.
You can use Semgrep Code to scan local repositories or integrate it into your CI/CD pipeline to automate continuous scanning of your code.

## Rules

<SemgrepScan />

In addition to the default rules (available in the [Registry](https://semgrep.dev/r)), you can write custom rules to determine how Semgrep scans your code. Whether you use Semgrep's default rules or write custom rules, knowing *which* rules Semgrep ran against your code helps you understand how Code detected security issues.

## Findings

Semgrep displays findings identified by Code in the Cloud Platform, where you can manage everything in one place. The Cloud Platform allows you to:

* Triage findings;
* Send alerts and notifications or create tickets to track findings identified by Code;
* Customize the way Semgrep scans your projects;
* Manage your users and facilitate team collaboration in remediating security issues.

## OSS vs. Pro Engine

By default, Code is powered by Semgrep's OSS engine. It can analyze interactions within a single function (this process is known as intraprocedural analysis), and its smaller scope of analysis makes it faster and easier to integrate into developer workflows.

However, if you would like cross-file analysis and cross-function analysis (also known as interfile analysis and interprocedural analysis, respectively), please consider using the [Pro engine](/semgrep-code/semgrep-pro-engine-intro/).

## Next steps

[Scan your codebase](/semgrep-code/getting-started): Learn how to scan your project by integrating Code into your CI/CD pipeline or how to scan projects available locally on your machine.

<MoreHelp />
