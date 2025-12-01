---
slug: fedramp
title: FedRAMP compliance
hide_title: true
description: Learn how Semgrep helps organizations meet FedRAMP compliance requirements for information security management systems (ISMS).
tags:
  - Compliance
sidebar_label: FedRAMP
displayed_sidebar: aboutSidebar
---
# FedRAMP compliance

**Disclaimer:** *Semgrep provides security tooling that can support compliance efforts, but does not guarantee compliance. Organizations remain responsible for meeting all compliance requirements. Consult with your compliance team and auditors to determine how Semgrep fits into your compliance program.*

**Last updated:** November 2025

FedRAMP (Federal Risk and Authorization Management Program) provides standardized security assessment and authorization for cloud services used by federal agencies. The FedRAMP Authorization Boundary Guidance v3.0 Section 7 indicates that corporate services are outside the FedRAMP Authorization Boundary so long as they do not contain federal data. When Semgrep scans code, it collects and stores metadata about scan results. For details, see the [metrics documentation](https://semgrep.dev/docs/metrics).

:::warning
Federal data should not exist in code repositories. Semgrep scans code repositories, not production systems or databases containing federal data. Federal data is typically absent from code repositories.
:::

Semgrep may help address FedRAMP security requirements derived from NIST SP 800-53 Rev 5:

- **RA-5 (vulnerability monitoring and scanning):** SAST scanning helps provide continuous automated vulnerability detection. Semgrep identifies OWASP Top 10 vulnerabilities including SQL injection, broken authentication, and security misconfigurations before code reaches production FedRAMP systems. Audit logs help provide timestamped evidence of continuous vulnerability monitoring that 3PAO assessors can review during annual assessments.

- **IA-5 (authenticator management):** [Secrets detection](https://semgrep.dev/docs/semgrep-secrets/conceptual-overview) helps prevent AWS GovCloud API tokens, Azure Government credentials, database passwords, and private keys from being committed to source code. Custom rules enforce that authentication mechanisms use federal identity providers rather than hardcoded credentials, helping agencies meet OMB Memorandum M-22-09 requirements for phishing-resistant MFA.

- **SA-11 (developer security testing):** Policy enforcement demonstrates that security testing is mandatory in the secure software development lifecycle. When configured with CI/CD platforms, Semgrep helps block vulnerable code at the pull request level before deployment. Custom policies can enforce agency-specific secure coding standards and can be configured to match security control baselines (low, moderate, or high) required by your authorization.

- **AU-2 and AU-3 (event logging and audit record content):** Audit logs document every scan execution, security finding, policy violation, and remediation action with timestamps in UTC format. Logs are exportable in JSON format for integration with federal SIEM systems and compliance reporting tools.

- **SI-2 (flaw remediation):** SAST scanning combined with Supply Chain vulnerability detection helps provide comprehensive flaw identification across custom code and third-party dependencies. [Jira integration creates documented remediation](https://semgrep.dev/docs/semgrep-appsec-platform/jira) workflows with discovery timestamps and resolution status. Audit logs track flaw remediation timelines segmented by severity level, helping agencies meet requirements for remediating high-risk flaws within 30 days and moderate-risk flaws within 90 days.

- **SI-3 (malicious code protection):** Supply Chain scanning detects malicious packages, typosquatting attacks, dependency confusion vulnerabilities, and known malicious packages before they reach production federal systems. Reachability analysis determines whether malicious dependencies are actually invoked in your application code.

- **SA-15 and SR-3 (software supply chain security):** [SBOM generation](https://semgrep.dev/docs/semgrep-supply-chain/sbom) helps provide visibility into the federal software supply chain by documenting all third-party components in CycloneDX and SPDX formats. For agencies responding to Executive Order 14028 and OMB Memorandum M-22-18 requirements for software supply chain security, SBOMs document the composition of software deployed in FedRAMP environments. Supply Chain scanning evaluates dependencies against security criteria, identifies components with known vulnerabilities, malicious packages, and abandoned projects. Policy enforcement can block dependencies that fail supply chain risk criteria.

### Deployment considerations 

CLI and on-premises CI/CD deployments keep code entirely within agency-controlled infrastructure. For agencies using FedRAMP-authorized CI/CD platforms (GitHub Enterprise Server in GovCloud, GitLab Dedicated for Government, Azure Government DevOps), Semgrep integrates with existing workflows. [Semgrep Managed Scans](https://semgrep.dev/docs/getting-started/quickstart-managed-scans) (AWS deployed) may be acceptable for repositories without federal data per FedRAMP Authorization Boundary Guidance v3.0 Section 7, but requires a case-by-case assessment with your authorizing official.
