---
slug: semgrep-pro-vs-oss
append_help_link: true
title: Semgrep AppSec Platform versus Semgrep OSS
hide_title: true
description: "Learn about the features and differences of Semgrep AppSec Platform and Semgrep OSS."
tags:
  - Support
  - Semgrep AppSec Platform
---

import Link from '@docusaurus/Link'

# Semgrep AppSec Platform versus Semgrep OSS

You can use Semgrep AppSec Platform or Semgrep OSS to scan your code for security issues, bugs, and compliance to coding standards. However, there are key differences between the two offerings.

:::tip 
Refer to the [appendix](#appendix) to skim all features of both offerings.
:::

## Product terms

The offerings in this document are defined as follows:

<dl>
  <dt>Semgrep OSS</dt>
  <dd>
    Includes an open source, lightweight SAST scanner and rules in the <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs"></i> Semgrep Registry</a> with <strong>open source licenses</strong>. You can also write your own custom rules for use with Semgrep OSS. Semgrep OSS is best for small teams or personal projects.
  </dd>
  <dt>Semgrep AppSec Platform (Semgrep)</dt>
  <dd>
    <p style={{marginBottom: '0.5rem'}}>Refers to a proprietary software suite tailored to support AppSec engineers through the entire software development life cycle (SDLC). Best for deploying security programs throughout their organization. Many of Semgrep's features support the deployment of <Link to ='/secure-guardrails/secure-guardrails-in-semgrep'>secure guardrails</Link>. Semgrep includes the following products:</p>
    <dl style={{marginTop: '0px'}}>
      <dt>Semgrep Code</dt><dd>A SAST scanner that uses cross-file (interfile) and cross-function (intrafile) analysis for improved results over Semgrep OSS. Semgrep Code includes rules written by Semgrep's Security Research team, called <strong>Pro Rules</strong>. These rules use cross-file analysis to reduce false positives.</dd>
      <dt>Semgrep Supply Chain</dt><dd>A high-signal dependency scanner that detects reachable vulnerabilities in open source third-party libraries and functions across the software development life cycle (SDLC).</dd>
      <dt>Semgrep Secrets</dt><dd>A secrets scanner that, in addition to detecting secrets, validates these leaked secrets on a variety of services to help you prioritize active secrets.</dd>
    </dl>
  </dd>
</dl>

:::note
Semgrep Code and Semgrep Supply Chain are free for up to 10 contributors.
:::

## Comparison by core workflows

![Scope of each offering by core workflows](/img/security-program-workflows.svg) <br />
_**Figure**. A typical AppSec security program's core workflows and the scope of out-of-the-box Semgrep OSS and Semgrep AppSec Platform features._

### Deployment

_The process of integrating Semgrep into your developer and infrastructure workflows._

<div class="col-2-grid" >
<div> 

##### Semgrep OSS

Semgrep OSS runs in your local machine's CLI through the `semgrep scan` command.

Deploying in bulk or at scale is a manual task. Semgrep OSS can scan a remote repository by running as part of a CI job but you must write and configure the CI job for each repository. 

<!-- Environments are omitted due to differences in licensing -
`semgrep scan` can be run in IDE atm but the extension is proprietary -->

</div>
<div>

##### Semgrep AppSec Platform 

Semgrep AppSec Platform can scan in the following environments:

- CI
- Web app (for Managed Scans)
- CLI
- IDE
- `pre-commit`

Your scan configuration, such as rules and policies, and scan analysis (SAST, SCA, or secrets) are preserved across all environments.

Users comfortable with granting Semgrep code access can quickly deploy Semgrep to thousands of repositories through [Managed Scans](/deployment/managed-scanning).

AppSec Platform supports various CI providers and source code managers (SCMs) such as GitHub, GitLab, Bitbucket, and Azure.

</div>
</div>

### Scanning and analyses

_The process of analyzing source code for findings. This section explains the analyses available to both product offerings._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

Semgrep OSS provides the following SAST analyses:

- Single file, cross function constant propagation
- Single function taint analysis 
- Semantic analysis

The limited scope makes it fast, at the cost of coverage and precision.

It can't track data beyond a single function or file and may find more false positives.

</div>
<div>

##### Semgrep AppSec Platform 

Semgrep AppSec Platform supports SAST, SCA, and secret scans as listed in [Product terms](#product-terms). You can run these **scan types** across all of your environments, preserving any configuration you have made.

<details>
<summary>Click to view Semgrep Code analyses (SAST)</summary>
- Cross file, cross function constant propagation
- Cross file, cross function taint analysis 
- Framework and language-specific semantic analysis
- **Semgrep Assistant** (AI-assisted) post-processing analysis:
    - Reduces noise by 20%
    - Adds contextual remediation guidance
</details>

<details>
<summary>Click to view Semgrep Supply Chain analyses and functions (SCA)</summary>
- Reachability analysis
- Open source license enforcement
- Dependency search
</details>


<details>
<summary>Click to view Semgrep Secrets analyses and functions</summary>
- Validation of active, leaked secrets
- Entropy
- Historical scanning
</details>

Additionally, the Semgrep team maintains and contributes to premium rules, known as Pro rules, that specifically make use of the advanced analyses listed here.

</div>
</div>

<br />

:::tip
Certain languages, such as Apex, are available only on Semgrep AppSec Platform.
:::

The following diagrams summarize the differences between the two:

![Semrep OSS scan process](/img/scan-process-oss.svg#full) <br />
_**Figure**. Semgrep OSS scan process._

<br />

![Semgrep AppSec Platform scan process](/img/scan-process-sap.svg#full) <br />
_**Figure**. Semgrep AppSec Platform scan process._

### Triage and remediation

_Triage is the process of reviewing findings and determining if a finding is a true or false positive, and whether to fix the finding or not. Remediation refers to the steps taken to resolve the finding._

_**Ticketing and notification integrations** are included in this workflow to inform developers of fixes and remediation guidance they may need to take to close the finding._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

###### Triage

There are no out-of-the-box features in Semgrep OSS for triaging findings.

However, you can output findings to JSON and SARIF then send those findings to an AppSec Posture Management (ASPM) software such as DefectDojo.

</div>
<div>

##### Semgrep AppSec Platform

###### Triage

Semgrep AppSec Platform tracks a single finding throughout its lifetime from its initial creation, when its status is **Open**, to various triage states such as **Ignored**, or **Reviewing**.

Developers and AppSec engineers are able to provide reasons for a finding's status, such as **Acceptable risk** or **False positive** for **Ignored** findings.

Semgrep AppSec Platform provides AI-assisted triage through Semgrep Assistant, which can analyze all your findings to suggest which findings it thinks are false positives.

<details>
<summary>Click to view Semgrep Assistant analyses and functions</summary>
- Step-by-step remediation
- Can be viewed by developers and AppSec engineers in their preferred environment
- Ability to learn your preferred libraries and functions through **Assistant Memories**

[<i class="fas fa-external-link fa-xs"></i> Learn more about Semgrep Assistant's accuracy.](https://semgrep.dev/blog/2023/assistant-public-beta)
</details>

Lastly, Semgrep supports the creation of tickets in Jira and various notification channels such as Slack and webhooks.

</div>
</div>

### Tuning and prevention

_Tuning refers to the improvement of Semgrep's engine, rules, and policies to improve such metrics as the true positive rate, net new findings, and findings fixed before they enter production._

_Tuning assists in the prevention of vulnerabilities from entering production._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

Tuning is not supported in Semgrep OSS, but you can customize the rules you run on your scans.

Semgrep OSS does not provide any metrics that may inform you of potential performance improvements you can make.

</div>
<div>

##### Semgrep AppSec Platform

The [Policies](/semgrep-code/policies) feature manages rules, helps block PRs or MRs from entering production, and configures which findings are presented to developers. This feature is available for both Semgrep Code and Secrets.

You can test a rule's performance by first **monitoring** its performance (and showing it only in AppSec environments), then changing its mode to leave comments or help block a PR or MR from merging.

You can also write custom SAST and Secrets rules and share these rules to the rest of your organization.

</div>
</div>

### Reporting

_Track the success of your security program and trends over time by generating reports._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

Semgrep OSS does not include any reporting features.

</div>
<div>

##### Semgrep AppSec Platform

Semgrep AppSec Platform's dashboard provides filters to create multiple views over different periods of time. 

It is optimized to show progress towards the adoption of a **secure guardrails** approach to AppSec through the following key metrics:

- Findings shown to developers
- Findings fixed before backlog (before entering production)
- Most findings by project

Semgrep Supply Chain can export SBOMs (software bills of materials) for you to keep track of all of a codebase's dependencies.

</div>
</div>
<br />

![Dashboard page](/img/dashboard-fold.png)
_**Figure**. The dashboard page. Hover over the charts to view data for that point in time._

## Appendix

### Deployment

<div class="col-2-grid">
<div> 

##### Semgrep OSS

- [Local scans](/getting-started/cli-oss)
- [Manual CI job set up](/deployment/oss-deployment)
- [IDE plugins](/extensions/overview)
- [`pre-commit`](/extensions/overview#pre-commit)

</div>
<div>

##### Semgrep AppSec Platform

- [Local scans](/getting-started/cli)
- [Automated set up with various CI providers](/deployment/add-semgrep-to-ci) through the web app
    - [Manual configuration options](/deployment/add-semgrep-to-other-ci-providers) for other providers
- [IDE plugins](/extensions/overview) with persistent settings across your organization
- [`pre-commit` with persistent settings](/extensions/overview#pre-commit) across your organization
- Connects to [GitHub, GitLab, Bitbucket, and Azure DevOps repositories](/deployment/connect-scm)
- Secure access between your private network and Semgrep through the [Network Broker](docs/semgrep-ci/network-broker)
- Single tenancy
- [Managed scans](/deployment/managed-scanning)
- [SSO](/deployment/sso) and managed authentication through GitHub or GitLab
- [Project (repository) management](/deployment/manage-projects), such as tagging, setting of a primary branch, and so on
- [Team management](/deployment/teams)

</div>
</div>

### Scanning and analyses

<div class="col-2-grid">
<div> 

##### Semgrep OSS

Semgrep OSS provides cross function constant propagation and single function taint analysis.
<br />

###### Semgrep OSS (SAST)

- [30+ Community supported languages](/supported-languages#semgrep-code-and-oss)
- [<i class="fas fa-external-link fa-xs"></i> Community rules](https://semgrep.dev/r?visib=Community+%28Public%29)

</div>
<div>

##### Semgrep AppSec Platform

All AppSec Platform products make use of cross file, cross function taint analysis and more.

###### Semgrep Code (SAST)

- [35+ supported languages](/supported-languages#semgrep-code-and-oss)
- [<i class="fas fa-external-link fa-xs"></i> Pro (professionally written and maintained)](https://semgrep.dev/r?visib=Pro+%28Login%29) and Community rules
- Framework-specific and language-specific analysis—see [Java examples](/semgrep-code/java) and [Python frameworks coverage](/semgrep-code/supported-languages-python)
- [Code search](/semgrep-code/editor#code-search-beta)

###### Semgrep Supply Chain (SCA)

- [10+ supported languages](/supported-languages#semgrep-supply-chain)
- [Lockfile and reachability](/semgrep-supply-chain/overview#open-source-security-vulnerabilities) analysis
- 100% of High and Critical CVEs covered for supported languages since May 2022

###### Semgrep Secrets

- [Entropy, semantic analysis, and validation](/semgrep-secrets/conceptual-overview) ensure that detected keys are actually active and leaked
- 630+ credentials or keys detected by Semgrep Secrets
- [Historical scans](/semgrep-secrets/historical-scanning)

</div>
</div>

### Triage and remediation

<div class="col-2-grid">
<div> 

##### Semgrep OSS

- You must manually set up Semgrep OSS to send findings to an ASPM.

</div>
<div>

##### Semgrep AppSec Platform

- AppSec Platform tracks triage states and enables triage from findings in any supported environment (CLI, CI, IDE, your PR or MR). See [Code > Findings](/docs/semgrep-code/findings) for more information.
- Filtering by severity, confidence, and many other attributes assist in managing volume.
- AI-assisted triage and remediation
- AI-assisted [component tagging](/semgrep-assistant/overview#component-tags)
- AI-assisted [Memories](/semgrep-assistant/overview#memories-beta), which enable you to tell the AI organization specific libraries to suggest when guiding developers
- [PR comments or MR comments](/category/pr-or-mr-comments) can be sent to developers in their native environment (GitHub, GitLab, Azure DevOps, Bitbucket) and developers can triage in their native development through triage commands
- Slack, email, and webhook [notification channels](/semgrep-appsec-platform/notifications)
- [Creation of Jira tickets](/semgrep-appsec-platform/jira) and customizable mapping of attributes

</div>
</div>

### Tuning and prevention

<div class="col-2-grid">
<div> 

##### Semgrep OSS

Minimal customization options to tune your scans:
- Customize SAST scans through the rules you run in the CLI
- Write custom SAST rules

</div>

<div>

##### Semgrep AppSec Platform

- Customize SAST and Secrets scans through rule selection in [policies](/semgrep-code/triage-remediation)
- Write, save, manage, and fork custom SAST and Secrets detection rules in the [Editor](/semgrep-code/editor)
- [AI assistance for rule writing](/semgrep-assistant/getting-started#write-custom-rules-beta)
- Store rules in Semgrep AppSec Platform and deploy to your organization
- Policy-based workflows: Semgrep can perform workflow actions such as failing a CI job or leaving a PR comment based on user-defined policies for SAST and Secrets scans
- Semgrep Code: [Code search](/semgrep-code/editor#code-search-beta)
- Semgrep Supply Chain:
    - [License compliance](/semgrep-supply-chain/license-compliance)
    - [Dependency search](/semgrep-supply-chain/dependency-search)

</div>
</div>

### Reporting

<div class="col-2-grid">
<div> 

##### Semgrep OSS

- You must manually set up Semgrep OSS to send findings to an ASPM.

</div>

<div>

##### Semgrep AppSec Platform

- [Dashboard](/semgrep-appsec-platform/dashboard)
- [SBOM Export](/docs/semgrep-supply-chain/sbom)

</div>
</div>

