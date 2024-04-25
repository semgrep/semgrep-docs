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

import MoreHelp from "/src/components/MoreHelp"
import SemgrepScan from "/src/components/concept/_semgrep-scan.mdx"

# Semgrep Code overview

Semgrep Code is a static application security testing (SAST) tool that detects security vulnerabilities in your first-party code.

You can use Semgrep Code to scan local repositories or integrate it into your CI/CD pipeline to automate the continuous scanning of your code.

## Rules

<SemgrepScan />

In addition to rules available in the [Registry](https://semgrep.dev/r), you can write custom rules to determine what Semgrep Code detects in your repositories. Whether you use pre-existing rules or write custom rules, knowing *which* rules Semgrep Code runs can help you understand how it detects security issues.

Semgrep Code is transparent; you can configure the rules it runs and inspect its syntax to understand how the finding was detected. You can also customize the content of a rule to improve the true positive rate of a rule or have Semgrep send a relevant message to developers.

## Findings

Semgrep AppSec Platform displays Semgrep Code's findings. Additionally, Semgrep AppSec Platform allows you to:

* Triage findings
* Send alerts and notifications or create tickets to track findings identified by Semgrep Code
* Customize how Semgrep Code scans your repositories
* Manage your users and facilitate team collaboration in remediating security issues

## OSS versus Semgrep Code analysis

By default, Semgrep Code can analyze interactions beyond a single function but within a single file, a process known as **cross-function or interprocedural analysis**. This smaller scope of analysis makes it faster and easier to integrate into developer workflows.

Semgrep OSS can only analyze interactions within a single function, known as intraprocedural or single-function analysis. However, this means that Semgrep OSS is slightly faster than Semgrep Code. <!-- can we have a stat for this -->

Semgrep Code also supports **[cross-file analysis](/semgrep-code/semgrep-pro-engine-intro/)** (interfile) analysis. These scans produce fewer false positives and more true positives, but take longer to complete.

## Enable Semgrep Code

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login).
1. Click **[Settings](https://semgrep.dev/orgs/-/settings)**.
1. In the **Deployment** tab, click the **<i class="fa-solid fa-toggle-large-on"></i> Code scans** toggle if it is not already enabled.

Subsequent scans now include Code scans.

### Run Semgrep Code scans with single-function analysis

In some cases, you may want to scan using Semgrep OSS's single-function analysis. To do this, edit your `semgrep ci` command in your CI provider's configuration file with either the `--pro-languages` or `--oss-only` flags:

```yaml
# Preferred; includes support for all Semgrep Code languages
semgrep ci --pro-languages

# Does not include all Semgrep Code language features
semgrep ci --oss-only
```
## Next steps

- [View your findings](/semgrep-code/findings).
- Customize how Semgrep Code scans your repository by modifying the [default rules set](https://semgrep.dev/p/default) or [writing your own rules](/semgrep-code/editor/#jumpstart-rule-writing-using-existing-rules).
- Enable [autofix](/writing-rules/autofix) so that Semgrep can push code suggestions to GitHub or GitLab to help your developers resolve findings.
- Enable [cross-file scanning](/semgrep-code/semgrep-pro-engine-intro/).

## Further reading

- Read the [Trail of Bits Automated Testing Handbook](https://appsec.guide/) to learn about configuring and optimizing security tools, including Semgrep.


<MoreHelp />
