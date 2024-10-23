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
    Refers to Semgrep offerings with an open source license, primarily the Semgrep OSS Engine, a fast and customizable static application security testing (SAST) scanner.
  </dd>
  <dt>Semgrep AppSec Platform</dt>
  <dd>
    <p style={{marginBottom: '0.5rem'}}>Refers to proprietary offerings from Semgrep, Inc. These include the following products:</p>
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

### Deploy

_Deployment refers to the process of integrating Semgrep into your developer and infrastructure workflows._

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

Your scan configuration, such as rules and policies, or type of scan (SAST, SCA, or secrets) are preserved across all environments.

Users comfortable with granting Semgrep code access, can quickly deploy Semgrep to thousands of repositories through [Managed Scans](/deployment/managed-scanning).

AppSec Platform supports various CI providers and source code managers (SCMs) such as GitHub, GitLab, Bitbucket, and Azure.

</div>
</div>

### Scan

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
<summary>Click to view analyses for SAST scans</summary>
- Cross file, cross function constant propagation
- Cross file, cross function taint analysis 
- Framework and language-specific semantic analysis
</details>

<details>
<summary>Click to view analyses and functions for SCA scans</summary>
- Reachability analysis
- Software bill of materials (SBOM) generation
- Open source license enforcement
- Dependency search
</details>


<details>
<summary>Click to view analyses and functions for secrets scans</summary>
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

### Triage and remediate

_Triage is the process of reviewing findings and determining if a finding is a true or false positive, and whether to fix the finding or not. Remediation refers to the steps taken to resolve the finding._

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

###### Remediation

In addition to Semgrep OSS's autofix feature, Semgrep AppSec Platform provides AI-assisted remediation with the following features:

- Step-by-step remediation.
- Can be viewed by developers and AppSec engineers in their preferred environment.
- Ability to learn your preferred libraries and functions through Assistant Memories.

</div>
</div>

### Tune and prevent 

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

</div>
</div>

### Report 

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

<!-- 

**Semgrep OSS** is comprised of an open source, lightweight SAST scanner and rules in the <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs"></i> Semgrep Registry</a> with <strong>open source licenses</strong>. You can also write your own custom rules for use with Semgrep OSS. 

Semgrep OSS is best for small teams or personal projects.

### Deployment and CI integration 

Semgrep OSS primarily runs in your local machine's CLI through the `semgrep scan` command. It can also scan a remote repository by running a CI job. However, you must write and configure the CI job for each repository. 

### Scanning and analysis 

### Triage and remediation


</div>
<div>

## Semgrep AppSec Platform

**Semgrep AppSec Platform** is a software suite tailored to support AppSec engineers through the entire software development life cycle (SDLC).

### Deployment and CI

Semgrep AppSec Platform can perform scans in the following environments:

- CI
- Web app (for Managed Scans)
- CLI
- IDE
- `pre-commit`

Your scan configuration, such as rules and policies, or type of scan (SAST, SCA, or secrets) are preserved across all environments.

Users comfortable with granting Semgrep code acces, can quickly deploy Semgrep to thousands of repositories through Managed Scans. tk link

GitHub users with admin privileges to their GitHub org can also quickly deploy Semgrep in their CI pipelines through the web app. The Semgrep web app can automatically detect repositories in your org and commit a GitHub workflow file to run Semgrep.

tk get existing screenshot

### Rules, scans, and analysis

![Semgrep AppSec Platform scan process](/img/scan-process-sap.svg) <br />
_**Figure**. Semgrep AppSec Platform scan process._

Semgrep AppSec Platform supports SAST, SCA, and secret scans as listed in [Product terms](#product-terms). You can run these scan types across all of your environments, preserving any configuration you have made.


-->


## 🔎 Core scanning features

The following tables describe Semgrep's essential scanning and findings management capabilities.

### SAST (Static application security testing)

| Feature                                                                               | Semgrep OSS | Semgrep Pro |
| ------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| Single-file analysis                                                      | ✔️          | ✔️                     |
| Single-function analysis  | ✔️          | ✔️         |
| Cross-file (across multiple files or **interfile**) analysis        | --          | ✔️                     |
| Cross-function (across multiple functions or **interprocedural**) analysis     | -- | ✔️                         | --          | ✔️     |
| [Dataflow analysis (taint)](/semgrep-code/semgrep-pro-engine-intro)       | --          | ✔️                     |

### SCA (Software composition analysis)

| Feature                                                         | Semgrep OSS | Semgrep Pro |
| --------------------------------------------------------------- | ----------- | ------------------------------ |
| Reachability analysis for direct dependencies                   | --          | ✔️                             |
| [License compliance](/semgrep-supply-chain/license-compliance) | --          | ✔️                             |
| [Dependency search](/semgrep-supply-chain/dependency-search)    | --          | ✔️                             |
| SBOM export                                                     | --          | ✔️                             |

## 💬 Scan management and monitoring

The following table displays various notification channels and reporting features.

| Feature                                                                                                         | Semgrep OSS | Semgrep Pro |
| --------------------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| Send scan results to GitLab SAST and GitHub Advanced Security | ✔️ | ✔️ |
| [Centralized management of scan results (triage, remediation, fine-tuning noisy rules)](/semgrep-code/policies) | --          | ✔️                |
| [Notifications and reports (Slack, email, webhooks, and API)](/semgrep-appsec-platform/notifications)           | --          | ✔️                |
| [Findings dashboard](/semgrep-appsec-platform/dashboard)                                                        | --          | ✔️                |
| Findings retention                                                                                              | --          | [As long as account is active](/semgrep-code/findings/#data-retention)           |

## 🧰 Scan customization features

The following table displays customization features and tools that enhance Semgrep's core scanning capabilities. These features can increase true-positive rate and provide deeper insights into remediation.

| Feature                                                      | Semgrep OSS                                     | Semgrep Pro                            |
| ------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------- |
| Write your own rules                                         | ✔️                                              | ✔️                                           |
| [Community-contributed rule registry](https://semgrep.dev/r) | ✔️                                              | ✔️                                           |
| Rule-writing environment                                     | ✔️ [Playground](https://semgrep.dev/playground) | ✔️ Playground and Editor for logged-in users |
| Private rules\*                                              | --                                             | ✔️                                           |
| Proprietary rule registry                                    | --                                              | ✔️                                           |
| [Policy-based workflows†](/semgrep-code/policies)           | --                                              | ✔️                                           |

\*Private rules refer to rules that are guaranteed a private access scope in the cloud. This scope of access does not apply to Semgrep OSS, as Semgrep OSS is purely CLI-based.<br />
† Policy-based workflows provide security teams a means to block merges, leave PR/MR comments, or silently monitor for potential issues based on the presence of a finding.

### 🤖 Developer experience

The following table lists tools to enable developers to resolve findings in their own code.

| Feature                   | Semgrep OSS | Semgrep Pro       |
| ------------------------- | ----------- | ----------------- |
| VS Code extension         | ✔️           | ✔️                 |
| IntelliJ extension        | ✔️           | ✔️                 |
| `pre-commit`‡             | ✔️           | ✔️                 |
| Autofix                   | ✔️           | ✔️                 |
| Autofix in PR/MR comments | --          | ✔️                 |
| GPT-assisted autofix      | --          | ✔️                 |

‡`pre-commit` requires some manual set-up.

### 🏢 User and organization management

| Feature                                                                                                       | Semgrep OSS | Semgrep Pro |
| ------------------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| [Role-based access control (RBAC)](/deployment/teams) | --          | ✔️                |
| [Personal and organizational accounts](/deployment/teams)                              | --          | ✔️                |
| [SSO, OpenID, or OAuth 2.0 authentication](/deployment/sso)                                         | --          | ✔️                |

## 🧾 Licenses and tiers

<table>
    <thead>
        <tr>
            <th>Product line</th>
            <th>License</th>
            <th>Subscription tiers</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Semgrep Pro</td>
            <td>Proprietary</td>
            <td><ul><li>Semgrep Team</li>
            <li>Semgrep Enterprise</li></ul></td>
        </tr>
        <tr>
            <td>Semgrep OSS Engine</td>
            <td>GNU LGPL 2.1</td>
            <td>--</td>
        </tr>
        <tr>
            <td>Publicly-contributed rules</td>
            <td>Dependent on author</td>
            <td>--</td>
        </tr>
    </tbody>
</table>

See [<i class="fa-regular fa-file-lines"></i> Licensing](/licensing) for more details.

<!-- don't have a good place to put this for now.

## Differences between Semgrep Code and Semgrep Supply Chain

The following table displays differences between Semgrep Code and Semgrep Supply Chain.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Semgrep Code</th>
      <th>Semgrep Supply Chain</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type of tool</td>
      <td>Static application security testing (SAST)</td>
      <td>Software composition analysis (SCA)</td>
    </tr>
    <tr>
      <td>Scan target</td>
      <td>First-party code (your codebase or repository)</td>
      <td>Open source dependencies</td>
    </tr>
    <tr>
      <td>Triage workflow</td>
      <td>
        Findings can be categorized as:
        <ul>
          <li>Ignored (to triage false positives)</li>
          <li>Closed (resolved) by refactoring code</li>
          <li>Removed</li>
        </ul>
      </td>
      <td>
        Findings can be categorized as:
        <ul>
          <li>New</li>
          <li>In progress</li>
          <li>Fixed</li>
          <li>Ignored</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Remediation workflow</td>
      <td>Code refactoring</td>
      <td>Upgrading or removing the dependency, code refactoring</td>
    </tr>
    <tr>
      <td>Notification channels</td>
      <td>Slack, Email, Webhooks</td>
      <td>Slack</td>
    </tr>
  </tbody>
</table> -->
