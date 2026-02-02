---
tags:
  - TITO
  - Integrations
  - Threat Modeling
description: How to integrate Semgrep findings into TITO for automated threat modeling
---

# How to integrate Semgrep with TITO

[TITO (Threat In, Threat Out)](https://github.com/Leathal1/TITO) is an open-source threat modeling tool that ingests Semgrep SAST findings and enriches them with STRIDE-LM threat classification, MITRE ATT&CK technique mapping, and multi-step attack path analysis.

By integrating Semgrep with TITO, security teams can:

- **Map SAST findings to threat categories**: Each Semgrep finding is classified across STRIDE-LM (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege, Lateral Movement, Malware).
- **Enrich with MITRE ATT&CK**: Findings are mapped to ATT&CK technique IDs for standardized threat intelligence.
- **Chain findings into attack paths**: Individual vulnerabilities are linked into realistic multi-step attack scenarios.
- **Generate interactive visualizations**: D3.js data flow diagrams and 3D threat model visualizations.

## Prerequisites

- [Semgrep CLI](https://semgrep.dev/docs/getting-started/) installed
- [TITO CLI](https://github.com/Leathal1/TITO/releases) installed (`go install github.com/Leathal1/TITO/cmd/tito@latest`)

## Integration

TITO calls Semgrep as a subprocess during its scan. No additional configuration is needed beyond having both tools installed.

### Basic usage

Run TITO with Semgrep integration enabled:

```bash
tito scan \
  --repo /path/to/your/project \
  --semgrep \
  --mitre \
  --output threat-model.html
```

TITO automatically:
1. Invokes `semgrep` against the target repository
2. Parses the JSON findings
3. Maps each finding to STRIDE-LM threat categories
4. Enriches with MITRE ATT&CK technique IDs
5. Chains findings into attack paths
6. Generates an interactive HTML report

### Full analysis with MAESTRO (AI/Agent threats)

For repositories containing AI agents or LLM-based systems:

```bash
tito scan \
  --repo /path/to/your/project \
  --semgrep \
  --maestro \
  --mitre \
  --attack-paths \
  --3d \
  --output threat-model.html
```

### CI/CD with GitHub Actions

TITO is available as a [GitHub Action](https://github.com/marketplace/actions/tito-threat-model) that includes Semgrep integration:

```yaml
name: Threat Model
on: [pull_request]

jobs:
  threat-model:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Leathal1/TITO@v2
        with:
          semgrep: true
          maestro: true
          mitre: true
          attack-paths: true
```

This comments a threat model diff on each pull request, showing how code changes affect the security posture.

## Environment variables

Set `SEMGREP_INTEGRATION_NAME` to `tito` when using TITO with Semgrep:

```bash
export SEMGREP_INTEGRATION_NAME=tito
```

## How findings are mapped

| Semgrep Rule Category | STRIDE-LM Category | Example ATT&CK Technique |
|---|---|---|
| `security.auth` | Spoofing, Elevation of Privilege | T1078 (Valid Accounts) |
| `security.injection` | Tampering | T1190 (Exploit Public-Facing App) |
| `security.crypto` | Information Disclosure | T1557 (Adversary-in-the-Middle) |
| `security.deserialization` | Tampering, Elevation of Privilege | T1059 (Command & Scripting) |
| `security.secrets` | Information Disclosure | T1552 (Unsecured Credentials) |

## Resources

- [TITO GitHub repository](https://github.com/Leathal1/TITO)
- [TITO documentation](https://github.com/Leathal1/TITO#readme)
- [STRIDE-LM framework](https://github.com/Leathal1/TITO#stride-lm)
- [CSA MAESTRO framework](https://cloudsecurityalliance.org/artifacts/maestro-multi-agent-security-threat-and-risk-ontology)
