---
slug: hipaa-hitrust
title: HIPAA/HITRUST compliance
hide_title: true
description: Learn how Semgrep helps organizations meet HIPAA/HITRUST compliance requirements for information security management systems (ISMS).
tags:
  - Compliance
sidebar_label: HIPAA/HITRUST
displayed_sidebar: aboutSidebar
---
# HIPAA/HITRUST compliance

**Disclaimer:** *Semgrep provides security tooling that can support compliance efforts, but does not guarantee compliance. Organizations remain responsible for meeting all compliance requirements. Consult with your compliance team and auditors to determine how Semgrep fits into your compliance program.*

**Last updated:** November 2025

HIPAA (Health Insurance Portability and Accountability Act) establishes national standards for protecting medical records and health information. HITRUST CSF v11 (Common Security Framework) is a certifiable framework that harmonizes multiple security and privacy standards including HIPAA requirements.

:::warning
Protected Health Information (PHI) should not exist in code repositories. Semgrep scans code repositories, not production systems or databases containing PHI data. PHI data is typically absent from code repositories.
:::

Semgrep may help address HIPAA Security Rule requirements and HITRUST CSF v11 control families:

- **HIPAA Technical Safeguard 164.312(a)(1) and HITRUST control 01.m (access control):** SAST scanning detects SQL injection, authentication bypasses, and broken authorization that attackers exploit to access PHI databases. Policy enforcement blocks these vulnerabilities at the pull request level before code reaches production systems handling PHI. Audit logs create timestamped records showing when access control vulnerabilities were detected and fixed.

- **HIPAA Technical Safeguard 164.312(a)(2)(i) and HITRUST control 01.q (unique user identification):** [Secrets detection helps prevent hardcoded database credentials](https://semgrep.dev/docs/semgrep-secrets/conceptual-overview), API keys, authentication tokens, and service account passwords from reaching production code that accesses PHI. Custom rules can enforce that all authentication uses centralized identity providers rather than hardcoded credentials.

- **HIPAA Administrative Safeguard 164.308(a)(8) and HITRUST control 10.m (evaluation of security):** Policy enforcement demonstrates active preventive controls. When configured with CI/CD systems, Semgrep blocks vulnerable code at the PR level. Audit logs document policy enforcement activity showing security controls ran on every code change and blocked violations.

- **HIPAA Technical Safeguard 164.312(b) and HITRUST control 10.k (audit controls):** Audit logs document every scan execution, security finding, remediation action, and status change with timestamps and user attribution. Exportable logs provide compliance evidence for auditor review showing continuous monitoring and systematic remediation over the audit period.

- **HIPAA Administrative Safeguard 164.308(a)(1)(ii)(A) and HITRUST control 03.a (risk management):** [Jira integration](https://semgrep.dev/docs/semgrep-appsec-platform/jira) creates documented remediation workflows with timestamps, assignments, priority levels, and resolution timelines. This provides evidence that security findings are systematically identified, tracked, prioritized, and resolved according to risk management procedures.

- **HIPAA Technical Safeguard 164.312(c)(1) and HITRUST control 01.o (integrity):** SAST rules detect code patterns that could allow data tampering, unauthorized modification of PHI records, or integrity violations. [Custom rules](https://semgrep.dev/docs/semgrep-code/editor) can enforce data validation requirements and detect missing integrity checks in code that modifies PHI.

- **HIPAA Technical Safeguard 164.312(e)(1) and HITRUST control 09.n (transmission security):** Custom SAST rules enforce TLS requirements for PHI transmission, detect insecure HTTP usage in healthcare applications, and flag missing encryption for data in transit. Rules can verify that all PHI transmission uses appropriate cryptographic protocols.

- **Supply Chain Security for Healthcare:** [SBOM generation](https://semgrep.dev/docs/semgrep-supply-chain/sbom) provides visibility into third-party components used in healthcare applications including medical device software, connected health platforms, and patient portals. Supply Chain scanning detects vulnerabilities in healthcare-specific libraries such as HL7 parsers, FHIR implementations, and DICOM handlers. Reachability analysis shows which vulnerable dependencies actually process or access PHI, helping security teams prioritize remediation for components in the PHI data path.

