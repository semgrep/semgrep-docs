---
description: Understand how rule severity is determined.
tags:
 - Rules
 - Semgrep Registry
---

# How does Semgrep assign severity levels to rules?

## Semgrep Code and Secrets

Semgrep Code and Secrets rules have one of three severity levels: `ERROR` (High), `WARNING` (Medium), or `INFO` (Low). The severity indicates how critical the issues that a rule potentially detects are.

The rule author assigns the rule severity. The severity assignment of custom and third-party rules is the source of truth.

As a best practice, severity for Semgrep Registry rules in the `security` category should be assigned by evaluating the combination of [likelihood](/docs/contributing/contributing-to-semgrep-rules-repository/#likelihood) and [impact](/docs/contributing/contributing-to-semgrep-rules-repository/#impact). 

## Semgrep Supply Chain 

Semgrep Supply Chain rules have one of four severity levels: Critical, High, Medium, or Low. The score assigned to the CVE using the [Common Vulnerability Scoring System (CVSS) score](https://nvd.nist.gov/vuln-metrics/cvss), or the severity value set by the GitHub Advisory Database, determines the severity in Semgrep Supply Chain. For example, a vulnerability is assigned Critical if it is given a CVSS score of 9.0 or higher.

In addition to severity, Supply Chain displays an [Exploit prediction scoring system (EPSS) probability](https://www.first.org/epss/) for findings. The EPSS score represents the likelihood that the vulnerability will be exploited in the wild in the next 30 days. Its values range from 0% to 100%. The higher the score, the greater the probability the vulnerability will be exploited. Semgrep groups probabilities as follows:

* <b>High</b>: 50 - 100%
* <b>Medium</b>: 10 - &#60;50%
* <b>Low</b>: &#60;10%