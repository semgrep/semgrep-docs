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

Once Semgrep detects and notifies you of a finding, your team or security engineer may assign you to address it. For high or critical severity findings, AppSec engineers may set the Semgrep CI job to fail to prevent you from merging your pull request or merge request until you have triaged or fixed the findings.

Any of the 

## Assess the finding

Not all findings need to be **fixed**. False positives can be ignored. To help you assess findings, Semgrep provides the following information:




## Triage or resolve the finding through a comment

Most often, you'll be resolving findings in your code or source code manager (SCM).

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
