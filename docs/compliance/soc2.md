---
slug: soc2
title: SOC 2 compliance
hide_title: true
description: Learn how Semgrep helps organizations meet SOC 2 compliance requirements for security, availability, processing integrity, confidentiality, and privacy.
tags:
  - Compliance
sidebar_label: SOC 2 compliance
displayed_sidebar: aboutSidebar
---

# SOC 2 compliance

**Disclaimer:** *Semgrep provides security tooling that can support compliance efforts, but does not guarantee compliance. Organizations remain responsible for meeting all compliance requirements. Consult with your compliance team and auditors to determine how Semgrep fits into your compliance program.*

**Last updated:** November 2025

Organizations pursuing SOC 2 Type II certification need to demonstrate that security controls are operational and effective over time (typically 6-12 months), not just implemented at a point in time.

When Semgrep scans your code, it generates [audit logs](https://semgrep.dev/docs/semgrep-code/findings) that document every scan execution, security finding, remediation action, and status change with timestamps and user attribution. These logs provide evidence for SOC 2 Trust Services Criteria, including CC6.6 (vulnerabilities are identified and addressed), CC7.2 (system monitoring), and CC7.3 (evaluation of security events).

When properly configured with CI/CD systems, Semgrep [policy enforcement](https://semgrep.dev/docs/semgrep-code/policies) allows security teams to define [custom security rules that can block code](https://semgrep.dev/docs/semgrep-ci/configuring-blocking-and-errors-in-ci#blocking-findings) from merging when violations are detected. This demonstrates preventive controls (CC6.1, CC6.6) rather than detective controls. Auditors want to see that you stop security issues before they reach production, not just detect them afterward. Note that developers with appropriate permissions can override policy blocks when necessary. For details around proper configuration, please chat with the Semgrep team.

[Jira integration](https://semgrep.dev/docs/semgrep-appsec-platform/jira) documents your remediation workflow with timestamps and assignments, giving auditors clear evidence that security issues are identified, tracked, and resolved systematically (CC8.1 change management). [SBOM generation](https://semgrep.dev/docs/semgrep-supply-chain/sbom) provides supply chain visibility for vendor risk management controls (CC9.1).

### Deployment and certification

Semgrep Inc. is SOC 2 Type II certified. For CLI deployments, scans run on customer infrastructure (which may or may not be SOC 2 certified, depending on customer controls). For on-premises CI/CD, scans run on customer-controlled infrastructure. Cloud CI/CD providers (GitHub, GitLab, Azure DevOps, Bitbucket) are SOC 2 certified. For Semgrep Managed Scans, scans run on Semgrep's SOC 2 Type II-certified AWS infrastructure.


