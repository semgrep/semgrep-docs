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
Refer to the appendix to skim all features of both offerings.
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

The process of integrating Semgrep into your developer and infrastructure workflows._

<div class="col-2-grid" >
<div> 

##### Semgrep OSS

Semgrep OSS runs in your local machine's CLI through the `semgrep scan` command.

Deploying in bulk or at scale is manual: it can scan a remote repository by running a CI job but you must write and configure the CI job for each repository. 

<!-- Environments are omitted due to differences in licensing -
`semgrep scan` can be run in IDE atm but the extension is proprietary -->

</div>
<div>

##### Semgrep AppSec Platform 

Semgrep AppSec Platform can perform scans in the following environments:

- CI
- Web app (for Managed Scans)
- CLI
- IDE
- `pre-commit`

Your scan configuration, such as rules and policies, and scan analysis (SAST, SCA, or secrets) are preserved across all environments.

Users comfortable with granting Semgrep code access, can quickly deploy Semgrep to thousands of repositories through [Managed Scans](/deployment/managed-scanning).

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

The scope makes it fast, at the cost of coverage and precision.

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
</details>

<details>
<summary>Click to view Semgrep Supply Chain analyses and functions (SCA)</summary>
- Reachability analysis
- Software bill of materials (SBOM) generation
- Open source license enforcement
- Dependency search
</details>


<details>
<summary>Click to view Semgrep Secrets analyses and functions</summary>
- Validation of active, leaked secrets
- Entropy
- Historical scanning
</details>

Additionally, the Semgrep team maintains and contributes to premium rules, known as Pro rules, specifically making use of the advanced analyses listed here.

</div>
</div>

<br />

:::tip
Certain languages, such as Apex, are available only on Semgrep AppSec Platform.
:::

The following diagrams summarize the differences between the two:

![Semrep OSS scan process](/img/scan-process-oss.svg) <br />
_**Figure**. Semgrep OSS scan process._

<br />

![Semgrep AppSec Platform scan process](/img/scan-process-sap.svg) <br />
_**Figure**. Semgrep AppSec Platform scan process._

### Triage and remediation

_Triage is the process of reviewing findings and determining if a finding is a true or false positive, and whether to fix the finding or not. Remediation refers to the steps taken to resolve the finding._

_**Ticketing and notification integrations** are included in this workflow to inform developers of fixes and remediation guidance they may need to take to close the finding._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

###### Triage

There are no out-of-the-box features in Semgrep OSS for triaging findings.

However, you can output findings to JSON and SARIF then send those findings to an AppSec Posture Management (ASPM) software such as GitHub Advanced Security.

</div>
<div>

##### Semgrep AppSec Platform

###### Triage

Semgrep AppSec Platform tracks a single finding throughout its lifetime from its initial creation, when its status is **Open**, to various triage states such as **Ignored**, or **Reviewing**.

Developers and AppSec engineers are able to provide reasons for a finding's status, such as **Acceptable risk** or **False positive** for **Ignored** findings.

Semgrep AppSec Platform provides AI-assisted triage through Semgrep Assistant, which can analyze all your findings to suggest which findings it thinks are false positives. [<i class="fas fa-external-link fa-xs"></i> Learn more about Semgrep Assistant's accuracy.](https://semgrep.dev/blog/2023/assistant-public-beta)
Assistant also provides AI-assisted remediation with the following features:

- Step-by-step remediation.
- Can be viewed by developers and AppSec engineers in their preferred environment.
- Ability to learn your preferred libraries and functions through Assistant Memories.
-
Semgrep supports the creation of tickets in Jira and various notification channels such as Slack and webhooks.

</div>
</div>

### Tuning and prevention

_Tuning refers to the improvement of Semgrep's engine, rules, and policies to improve such metrics as the true positive rate, net new findings, and findings fixed before they enter production._

_Tuning assists in the prevention of vulnerabilities from entering production._

<div class="col-2-grid"> 
<div>

##### Semgrep OSS

Tuning is not supported in Semgrep OSS but you can customize the rules you run on your scans.

Semgrep OSS does not provide any metrics that may inform you of potential performance improvements you can make.

</div>
<div>

##### Semgrep AppSec Platform

The [Policies](/semgrep-code/policies) feature manages rules, helps block PRs or MRs from entering production, and configures which findings are presented to developers. This feature is available for both Semgrep Code and Secrets.

You are able to test a rule's performance by first **monitoring** its performance (and showing it only in AppSec environments), then changing its mode to leave comments or help block a PR or MR from merging.

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

- Local scans 
- Manual CI job set up
- IDE plugins
- `pre-commit`
</div>
<div>

##### Semgrep AppSec Platform

- Local scans
- Supports various CI providers from within the web app
- IDE plugins with persistent settings across the entire organization
- `pre-commit` with persistent settings across the entire organization
- Connects to GitHub, GitLab, Bitbucket, Azure Repos repositories
- Semgrep Network broker can secure access between your private network and Semgrep
- Single tenancy
- Managed scans
- SSO and managed authentication through GitHub or GitLab
- Automated onboarding, project tagging
- Team management

</div>
</div>

### Scanning and analyses

<div class="col-2-grid">
<div> 

##### Semgrep OSS

Limited cross function, limited taint analysis
<br />

###### Semgrep OSS (SAST)

- 30+ Community supported languages
- Community rules

</div>
<div>

##### Semgrep AppSec Platform

All products make use of cross file, cross function taint analysis and more

###### Semgrep Code (SAST)

- 35+ Supported languages
- Pro (professionally written and maintained) and Community rules
- Framework-specific and language-specific analysis

###### Semgrep Supply Chain (SCA)

- 10+ Supported languages
- Lockfile and reachability analysis
- High and Critical CVEs covered for supported languages since 2017

###### Semgrep Secrets

- Validation and entropy
- 500+ credentials or keys detected by Semgrep Secrets

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

- AppSec Platform tracks triage states and enables triage from findings in any supported environment (CLI, CI, IDE, your PR or MR).
- Filtering by severity, confidence, and many other attributes assist in managing volume.
- AI-assisted triage and remediation
- AI-assisted component tagging
- AI-assisted Memories, which enable you to tell the AI organization specific libraries to suggest when guiding developers.
- PR comments or MR comments can be sent to developers in their native environment (GitHub, GitLab, Azure Devops, Bitbucket) and developers can triage in their native development through triage commands.
- Slack, email, and webhook notification channels
- Creation of Jira tickets and customizable mapping of attributes

</div>
</div>

### Tuning and prevention

<div class="col-2-grid">
<div> 

##### Semgrep OSS

Minimal customization options to tune your scans:
- Customize SAST scans through rule selection 
- Write custom SAST rules

</div>

<div>

##### Semgrep AppSec Platform

- Customize SAST and Secrets scans through rule selection
- Write, save, manage, and fork custom SAST and Secrets detection rules
- AI assistance for rule writing
- Store rules in Semgrep AppSec Platform and deploy to your organization.
- Policy-based workflows: Semgrep can perform workflow actions such as failing a CI job or leaving a PR comment based on user-defined policies for SAST and Secrets scans.
- Semgrep Code: Code search
- Semgrep Supply Chain:
    - License enforcement
    - Dependency search

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

- Dashboard
- SBOM Export

</div>
</div>

