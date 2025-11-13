---
slug: pci-dss
title: PCI DSS compliance
hide_title: true
description: Learn how Semgrep helps organizations meet PCI DSS compliance requirements for protecting cardholder data.
tags:
  - Compliance
sidebar_label: PCI DSS compliance
displayed_sidebar: aboutSidebar
---

# PCI DSS compliance


**Disclaimer:** *Semgrep provides security tooling that can support compliance efforts, but does not guarantee compliance. Organizations remain responsible for meeting all compliance requirements. Consult with your compliance team and auditors to determine how Semgrep fits into your compliance program.*

**Last updated:** November 2025

PCI DSS (Payment Card Industry Data Security Standard) is mandatory for organizations that store, process, or transmit payment data. QSAs (Qualified Security Assessors) require documented evidence of security controls during assessments.

:::warning
Cardholder data should never exist in code repositories. Use designated test card numbers for testing. If no cardholder data exists in your code, PCI DSS does not apply to your SAST scanning.
:::

Semgrep helps address PCI DSS requirements:

- **Requirement 6.2 (ensure all systems are protected from known vulnerabilities):** [SAST scanning](https://semgrep.dev/docs/semgrep-code/overview) detects injection flaws, broken authentication, and insecure configurations that could expose cardholder data. [Audit logs](https://semgrep.dev/docs/semgrep-code/findings) provide documented evidence of vulnerability detection and remediation timelines. QSAs require quarterly validation, and Semgrep provides continuous evidence rather than point-in-time snapshots.

- **Requirement 6.3.1 (removal of custom application accounts, user IDs, and passwords before applications become active):** [Secrets detection](https://semgrep.dev/docs/semgrep-secrets/conceptual-overview) helps prevent hardcoded credentials that provide access to payment systems from reaching production.

- **Requirement 6.3.2 (secure coding practices):** QSAs expect to see evidence of vulnerability scanning, such as SAST, in the development process. When properly configured with CI/CD systems, [policy enforcement](https://semgrep.dev/docs/semgrep-code/policies) can help block risky code at the pull request level, creating a preventive control. Developers with appropriate permissions can override blocks when necessary. Every policy violation is documented for auditors. For configuration help, please contact [Semgrep](https://semgrep.dev/docs/support/).

### Deployment guidance

CLI and on-premises CI/CD keep code in customer-controlled infrastructure. Cloud CI/CD and Semgrep Managed Scans only process code repositories that should not contain cardholder data. If cardholder data is present in the code, verify that your deployment option meets your PCI scope requirements.

