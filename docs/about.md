# Semgrep Code and Semgrep OSS Engine

The following table shows differences between Semgrep Code and Semgrep OSS Engine:

| Feature                | Description | Semgrep OSS Engine | Semgrep Code |
| -------                | ---   | -----------------  | ------------ |
| Semgrep CLI            | Run local scans. | ✔️  | ✔️  |
| Semgrep CI             | Run scans on remote repositories. | ✔️  | ✔️  | 
| Custom rules           | Write your own rules tailored to your organization's needs. | ✔️  | ✔️  |
| Community rules        | Make use of community-contributed rules. | ✔️  | ✔️  |
| Semgrep Cloud Platform | Manage findings, rules, and alerts in a centralized location. | ❌ | ✔️  |
| Semgrep Pro Engine     | Run Semgrep with cross-function (interprocedural) and cross-file (interfile) analysis. | ❌ | ✔️ * |
| Semgrep Pro rules      | Rules leveraging Semgrep Pro Engine to detect hardcoded secrets, XXE injections, deserialization issues, and more. | ❌ | ✔️ * |
| Findings retention     | Keep track of when a finding is created and resolved. | ❌ | ✔️  |
| Alerts & notifications | Receive alerts to catch issues before they reach live servers. | ❌ | ✔️  |
| Findings management    | Filter and sort findings in bulk. | ❌ | ✔️  |
| API and webhooks       | Query and receive scan data for your custom infrastructure. |❌ | ✔️  |
_*These features require a Team-tier license or above*._