---
slug: choose-oss-pro
append_help_link: true
title: Choose between Semgrep Pro and Semgrep OSS
hide_title: true
description: tk
tags:
  - Semgrep OSS
  - Semgrep Team & Enterprise Tier
---

# Semgrep Pro versus Semgrep OSS

You can use both Semgrep Pro and Semgrep OSS Engine to scan your code. Semgrep uses (explain rules and scanner) This document outlines  key differences between the two product lines.

The terms used in this document are defined as follows:

<dl>
<dt>Semgrep OSS</dt>
<dd>Refers to Semgrep offerings with an open-source license, primarily the Semgrep OSS Engine, a fast and customizable static application security testing (SAST) scanner. To run Semgrep completely on OSS, use rules in the <a href=" https://semgrep.dev/r/"><i class="fas fa-external-link fa-xs"></i> Semgrep Registry</a> with an open source license, or write your own custom rules.</dd>
<dt>Semgrep Pro</dt>
<dd>Refers to proprietary product offerings from Semgrep, Inc. These include:<ul>
<li>Semgrep Code - a SAST scanner that uses cross-file (interfile) analysis for improved results. Semgrep Code includes premium rules, known as Pro rules, that </li>
<li>Semgrep Supply Chain - a software composition analysis (SCA) </li>
<li>Semgrep Secrets (beta)</li>
<li>Semgrep Cloud Platform</li>
</ul>
</dd>
</dl>


## 🧾 Licenses and tiers

<table>
    <thead>
        <tr>
            <th>Product line</th>
            <th>License</th>
            <th>Tiers</th>
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
            <td>Various; dependent on author</td>
            <td>--</td>
        </tr>
    </tbody>
</table>

See [<i class="fa-regular fa-file-lines"></i> Licensing](/licensing/#semgrep-registry-license) for more details.

## 🔎 Core scanning features

The following tables describe Semgrep's essential scanning and findings management capabilities.

### SAST (Static Application Security Testing)

| Feature                                                                               | Semgrep OSS | Semgrep Pro |
| ------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| Intrafile (single-file) analysis                                                      | ✔️          | ✔️                     |
| Cross-file (across multiple files or interfile) analysis                              | --          | ✔️                     |
| [Single-file taint](/writing-rules/data-flow/data-flow-overview/) (dataflow) analysis | ✔️          | ✔️                     |
| [Cross-file taint](/semgrep-code/semgrep-pro-engine-intro/) (dataflow) analysis       | --          | ✔️                     |

### SCA (Software composition analysis)

| Feature                                                         | Semgrep OSS | Semgrep Pro |
| --------------------------------------------------------------- | ----------- | ------------------------------ |
| Reachability analysis for direct dependencies                   | --          | ✔️                             |
| [License compliance](/semgrep-supply-chain/license-compliance/) | --          | ✔️                             |
| [Dependency search](/semgrep-supply-chain/dependency-search)    | --          | ✔️                             |
| SBOM export                                                     | --          | ✔️                             |

## 💬 Scan management and monitoring

The following table displays various notification channels and reporting features.

| Feature                                                                                                         | Semgrep OSS | Semgrep Pro |
| --------------------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| [Centralized management of scan results (triage, remediation, fine-tuning noisy rules)](/semgrep-code/policies) | --          | ✔️                |
| [Notifications and reports (Slack, email, webhooks, and API)](/semgrep-cloud-platform/notifications/)           | --          | ✔️                |
| Send scan results to GitLab SAST and GitHub Advanced Security                                                   | --          | ✔️                |
| [Findings dashboard](/semgrep-cloud-platform/dashboard/)                                                        | --          | ✔️                |
| Findings retention                                                                                              | --          | 5 years           |

## 🧰 Scan customization features

The following table displays customization features and tools that enhance Semgrep's core scanning capabilities. These features can increase true-positive rate and provide deeper insights into remediation.

| Feature                                                      | Semgrep OSS                                     | Semgrep Pro                            |
| ------------------------------------------------------------ | ----------------------------------------------- | -------------------------------------------- |
| Write your own rules                                         | ✔️                                              | ✔️                                           |
| Private rules\*                                              | n/a                                             | ✔️                                           |
| [Community-contributed rule registry](https://semgrep.dev/r) | ✔️                                              | ✔️                                           |
| Proprietary rule registry                                    | --                                              | ✔️                                           |
| [Policy-based workflows†](/semgrep-code/policies/)           | --                                              | ✔️                                           |
| Rule-writing environment                                     | ✔️ [Playground](https://semgrep.dev/playground) | ✔️ Playground and Editor for logged-in users |

\*Private rules refer to rules that are guaranteed a private access scope in the cloud. This scope of access does not apply to Semgrep OSS, as it is purely CLI-based.<br />
† Policy-based workflows provide security teams a means to block merges, leave PR/MR comments, or silently monitor for potential issues based on the presence of a finding.

### 🤖 Developer experience

The following table lists tools to enable developers to resolve their own code.

| Feature                   | Semgrep OSS | Semgrep Pro |
| ------------------------- | ----------- | ----------------- |
| VS Code extension         | ✔️          | ✔️                |
| Autofix                   | ✔️          | ✔️                |
| Autofix in PR/MR comments | --          | ✔️                |
| Autofix AI                | --          | ✔️                |
| `pre-commit`‡             | ✔️          | ✔️                |

‡`pre-commit` requires some manual set-up.

### 🏢 User and organization management

| Feature                                                                                                       | Semgrep OSS | Semgrep Pro |
| ------------------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| [Role-based access control (RBAC)](/semgrep-cloud-platform/user-management/#controlling-access-through-roles) | --          | ✔️                |
| [Personal and organizational accounts](/semgrep-cloud-platform/user-management/)                              | --          | ✔️                |
| [SSO, OpenID, or OAuth2 authentication](/semgrep-cloud-platform/sso/)                                         | --          | ✔️                |

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
</table>
