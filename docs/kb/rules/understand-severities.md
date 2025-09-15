---
description: Understand how rule severity and confidence is determined.
tags:
 - Rules
 - Semgrep Registry
---

# How does Semgrep assign severity levels to rules?

All Semgrep rules have one of four severity levels: Critical, High, Medium, or Low. The levels `ERROR`, `WARNING` and `INFO` used in existing rules are older values that correspond to High, Medium, and Low, respectively.

## Semgrep Code and Secrets

For Semgrep Code and Secrets rules, the severity indicates how critical the issues are that a rule detects.

The rule author assigns the rule severity. The author's severity assignment for custom and third-party rules is the source of truth.

As a best practice, severity for Semgrep Registry rules in the `security` category should be assigned by evaluating the combination of [likelihood](/docs/contributing/contributing-to-semgrep-rules-repository/#likelihood) and [impact](/docs/contributing/contributing-to-semgrep-rules-repository/#impact). 

## Semgrep Supply Chain 

Semgrep Supply Chain rule severity reflects the score assigned to the CVE using the [Common Vulnerability Scoring System (CVSS) score](https://nvd.nist.gov/vuln-metrics/cvss), or the severity value set by the GitHub Advisory Database. For example, a vulnerability is assigned Critical if it is given a CVSS score of 9.0 or higher.

In addition to severity, Supply Chain displays an [Exploit prediction scoring system (EPSS) probability](https://www.first.org/epss/) for findings. The EPSS score represents the likelihood that the vulnerability will be exploited in the wild in the next 30 days. Its values range from 0% to 100%. The higher the score, the greater the probability the vulnerability will be exploited. Semgrep groups probabilities as follows:

* <b>High</b>: 50 - 100%
* <b>Medium</b>: 10 - &#60;50%
* <b>Low</b>: &#60;10%

# How are confidence levels assigned to rules?

Confidence level is also set by the rule author, but it is intended to describe the rule, not the vulnerability the rule catches.

The confidence level reflects how confident the rule writer is that the rule patterns capture the vulnerability without generating too many false positive findings. The rule author manually sets the appropriate confidence level. Rules that have more targeted and detailed patterns, such as advanced taint mode rules, are typically given `HIGH` confidence.
