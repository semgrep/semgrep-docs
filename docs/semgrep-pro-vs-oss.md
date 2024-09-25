---
slug: semgrep-pro-vs-oss
append_help_link: true
title: Semgrep Pro versus Semgrep OSS
hide_title: true
description: "Learn about the features and differences of Semgrep OSS and Semgrep Pro."
tags:
  - Support
  - Semgrep AppSec Platform
---

# Semgrep AppSec Platform versus Semgrep OSS

You can use Semgrep AppSec Platform or Semgrep OSS to scan your code for security issues, bugs, and compliance to coding standards. However, there are key differences between the two offerings.

## Semgrep OSS

**Semgrep OSS** is comprised of an open source, lightweight SAST scanner and rules in the <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs"></i> Semgrep Registry</a> with <strong>open source licenses</strong>. You can also write your own custom rules for use with Semgrep OSS. By itself, it does not provide comprehensive finding triage or remediation. You can, however, output findings to various common formats, such as JSON and SARIF.

Semgrep OSS is best for small teams or personal projects.

### Deployment and CI integration 

Semgrep OSS primarily runs in your local machine's CLI. It can also scan a remote repository by running a CI job. However, you must write and configure the CI job for each repository. The results can then be passed to an AppSec Posture Management software, such as DefectDojo, or GitHub Advanced Security.

### Analysis

Semgrep OSS provides single-function, single-file analysis. This makes it fast, at the cost of coverage and precision. It can't trace data beyond a single function or file and may find more false positives.

### AppSec workflows, AI, notifications, and reports

You must manually set up workflows to import Semgrep OSS findings into other tools to perform common AppSec workflows, such as triage.

## Semgrep AppSec Platform

**Semgrep AppSec Platform** is a software suite tailored to support AppSec engineers through the entire software development life cycle (SDLC). It uses a proprietary engine that provides additional static analyses and improved semantic comprension.

### Products 

- Proprietary SAST, SCA, and secret scanners.
- Greater parsing support for all languages supported by Semgrep OSS.
  - Some languages are exclusive to Semgrep AppSec Platform.
- More types of static analyses, such as cross-function (interprocedural) and cross-file (interfile) taint analyses.
- Professionally maintained rules and rule maintenance for many languages.
- Support for scanning in a variety of environments and source code managers (SCMs) such as GitHub, GitLab, BitBucket, and Azure.
- PR or MR scans.
- Scan customization features.
- Scan results (findings) management

Features for AppSec workflows include:

- Deployment at scale.
- Secure guardrail deployment
- Findings management, including triage and remediation.
- User and repository (project) management
- AppSec triage and remediation workflows
- SBOM export, reporting, and license detection
- LLM (large language model) AI integration

## Product terms

The terms used in this document are defined as follows:

<dl>
  <dt>Semgrep OSS</dt>
  <dd>
    Refers to Semgrep offerings with an open source license, primarily the Semgrep OSS Engine, a fast and customizable static application security testing (SAST) scanner. To run Semgrep completely on OSS, use the OSS Engine and rules in the <a href="https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs"></i> Semgrep Registry</a> with <strong>open source licenses</strong>, or write your own custom rules.
  </dd>
  <dt>Semgrep AppSec Platform</dt>
  <dd>
    <p style={{marginBottom: '0.5rem'}}>Refers to proprietary offerings from Semgrep, Inc. These include the following products:</p>
    <dl style={{marginTop: '0px'}}>
      <dt>Semgrep Code</dt><dd>A SAST scanner that uses cross-file (interfile) and cross-function (interprocedural) analysis for improved results over Semgrep OSS. Semgrep Code includes premium rules, known as <strong>Pro rules</strong>, that use the cross-file analysis to reduce false positives.</dd>
      <dt>Semgrep Supply Chain</dt><dd>A high-signal dependency scanner that detects reachable vulnerabilities in open source third-party libraries and functions across the software development life cycle (SDLC).</dd>
      <dt>Semgrep Secrets</dt><dd>A secrets scanner that, in addition to detecting secrets, validates these leaked secrets on a variety of services to help you prioritize active secrets.</dd>
    </dl>
  </dd>
</dl>

:::tip
All Semgrep Pro products are free for up to 10 contributors.
:::

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
