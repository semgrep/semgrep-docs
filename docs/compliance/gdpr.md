---
slug: gdpr
title: GDPR compliance
hide_title: true
description: Learn how Semgrep helps organizations meet GDPR compliance requirements for data protection and privacy.
tags:
  - Compliance
---

# GDPR compliance


**Disclaimer:** *Semgrep provides security tooling that can support compliance efforts, but does not guarantee compliance. Organizations remain responsible for meeting all compliance requirements. Consult with your compliance team and auditors to determine how Semgrep fits into your compliance program.*

**Last updated:** November 2025

GDPR (General Data Protection Regulation) governs how organizations collect, store, and process personal data of EU residents. Organizations must implement appropriate technical and organizational measures to protect personal data and demonstrate compliance with supervisory authorities.

**Important:** Personal data should not exist in code repositories. Semgrep scans code repositories, not production systems or databases containing customer data. EU resident personal data is typically absent from code repositories.

Semgrep helps reduce GDPR violation risk:

**Article 25 (data protection by design and by default):** [Policy enforcement](https://semgrep.dev/docs/semgrep-code/policies) demonstrates that security is built into your development process from the start. When properly configured with CI/CD systems, Semgrep can enforce secure coding practices at the pull request level. For details about proper configuration, please chat with the [Semgrep team](https://semgrep.dev/docs/support/).

**Article 32 (security of processing):** [SAST scanning](https://semgrep.dev/docs/semgrep-code/overview) detects injection flaws, broken authentication, and insecure configurations that attackers exploit to access databases containing customer personal data. [Secrets detection](https://semgrep.dev/docs/semgrep-secrets/conceptual-overview) stops hardcoded API keys, database credentials, or access tokens that could provide unauthorized access to systems processing EU resident data. [Audit logs](https://semgrep.dev/docs/semgrep-code/findings) provide documented evidence of technical measures to protect personal data.

**Articles 44-50 (data transfers to third countries):** Deployment flexibility allows you to meet data residency requirements. CLI and on-premises CI/CD keep code in your environment. For cloud deployments, you can choose EU-region CI/CD providers. For AI Assistant, you can bring your own API keys with EU-based providers. Semgrep provides Data Processing Agreements with Standard Contractual Clauses for trans-Atlantic transfers.

Not finding what you need in this doc? Ask questions in our [Community Slack group](https://go.semgrep.dev/slack), or see [Support](https://semgrep.dev/docs/support/) for other ways to get help.
