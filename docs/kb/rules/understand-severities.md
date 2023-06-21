---
description: Understand how rule severity is determined.
tags:
  - Rules
  - Semgrep Registry
---

# How does Semgrep assign severities to rules?

## Semgrep Code

Semgrep Code rules have one of three severity levels: ERROR (High), WARNING (Medium), or INFO (Low). The severity indicates how critical the issues are that a rule potentially detects.

The severity of a given rule is assigned by the rule author. For custom and third-party rules, the rule author's assignment is the source of truth.

As a best practice, severity for Semgrep Registry rules in the `security` category should be assigned by evaluating the combination of [likelihood](/docs/contributing/contributing-to-semgrep-rules-repository/#likelihood) and [impact](/docs/contributing/contributing-to-semgrep-rules-repository/#impact). 

## Semgrep Supply Chain 

Semgrep Supply Chain rules have one of four severity levels: Critical, High, Medium or Low. The score assigned to the CVE using the Common Vulnerability Scoring System (CVSS) score, or the severity value set by the GitHub Advisory Database, determines the severity in Semgrep Supply Chain. If a vulnerability is given a 9.0 or higher it is assigned CRITICAL.