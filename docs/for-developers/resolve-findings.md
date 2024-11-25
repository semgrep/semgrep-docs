---
slug: resolve-findings
title: Resolve findings
hide_title: true
description: Learn to resolve or triage findings with Semgrep in developer-native interfaces.
tags:
  - Developer education
---

import TriageStatuses from "/src/components/reference/_triage-states.mdx"

# Resolve findings with Semgrep

Findings resolution involves the assessment of a finding, then either fixing or triaging (ignoring) it. You can fix or triage findings from your source code manager (SCM) or from Semgrep AppSec Platform.

## Assess the finding

Many factors affect whether or not a finding should be fixed: whether it is a true or false positive, if the fix can be applied within deadlines, if the finding is easily exploitable, the degree of the finding's severity, and so on.

Here are some of the most common Semgrep rule attributes used to quickly assess findings:

- **Severity**. Prioritize fixing critical and high severity findings.
- **Confidence**. Higher confidence rules indicate a higher chance of true positives. 
- **Exploit prediction scoring system (EPSS) score**. For SCA findings, higher EPSS scores should be fixed.
- **Reachability**. Prioritize updating dependencies or refactoring code to patch reachable dependency vulnerabilities.

## Triage or resolve the finding through your SCM

### Autofix and remediation guidance

Some Semgrep rules provide an **autofix**. If your SCM supports it, the fix can be committed automatically.


_**Figure**. GitHub enables you to commit the suggestion from Semgrep directly, fixing the finding._

## Triage or resolve the finding in Semgrep AppSec Platform




## Appendix

#### Triage statuses

<TriageStatuses />


## Review and triage process

The triage process refers to prioritizing and determining what actions to take to address a finding.

### Validate the finding

To validate a finding is to ensure that it is a true positive and to decide on whether or it should be fixed.

### Review remediation steps 

## Triage actions

### Ignore findings

It is recommended to ignore findings from within your source code manager (SCM), such as GitHub or GitLab, as it is tracked in Semgrep AppSec Platform.

#### Ignore findings by posting a PR or MR comment

For false positive

#### Ignore findings through IDE extensions

You can ignore findings in the IDE, but IDE scans are performed locally. Findings 

### Remediate the finding
