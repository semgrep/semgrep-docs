---
slug: /
hide_title: true
id: Docs home
displayed_sidebar: topLevelSidebar
toc_max_heading_level: 2
pagination_next: getting-started/quickstart-sms
description: >-
  Read the documentation and get started with Semgrep.
  A fast static analysis engine for finding bugs,
  detecting dependency vulnerabilities, and enforcing
  code standards at editor, commit, and CI time.
---

import ThemedImage from '@theme/ThemedImage'

<!-- vale off -->

<!---
Substitute the "dark:" logo path in case a new dark logo is made.
The code is kept here for easy maintenance.
-->

<div class='logo-index'>
  <a href="https://semgrep.dev">
    <ThemedImage
      alt="Semgrep themed logo"
      height="48px"
      sources={{
        light: ('img/semgrep.svg#no-shadow'),
        dark: ('img/semgrep.svg#no-shadow'),
      }} />
  </a>
  <h1>Semgrep <span style={{color: "#624DEF"}}>docs</span></h1>
</div>

<h5 class='home' style={{margin: '0px 0px 8px 0px'}}>Find bugs and reachable dependency vulnerabilities in code. Enforce your code standards on every&nbsp;commit.</h5>

<h3>Scan with Semgrep AppSec Platform</h3>

<p>Deploy static application security testing (SAST), software composition analysis (SCA), and secrets scans from one&nbsp;platform.</p>

<div class = "col-2-fixed">
  <Card className={'card-50'} link='/getting-started/quickstart-managed-scans'>
    <CardImage cardImageUrl='/img/icon-first-scan.svg' />
    <div class="card__copy">
        <CardHeader>Get started</CardHeader>
        <CardBody>
          Run your first Semgrep scan.<br />
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/deployment/core-deployment'>
    <CardImage cardImageUrl='/img/icon-deploy.svg' />
    <div class="card__copy">
        <CardHeader>Deploy Semgrep</CardHeader>
        <CardBody>
          Deploy Semgrep to your organization quickly and at scale.
        </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/semgrep-code/triage-remediation'>
    <CardImage cardImageUrl='/img/icon-triage.svg' />
    <div class="card__copy">
    <CardHeader>Triage and remediate</CardHeader>
    <CardBody>
      Triage and remediate findings; fine-tune guardrails for developers.
    </CardBody>
    </div>
  </Card>
  <Card className={'card-50'} link='/writing-rules/overview'>
    <CardImage cardImageUrl='/img/icon-rules.svg' />
    <div class="card__copy">
    <CardHeader>Write rules</CardHeader>
    <CardBody>
      Create custom rules to enforce your organization's coding standards.
    </CardBody>
    </div>
  </Card>
</div>

<h3>Supported languages</h3>

| Product | Languages |
| :-------  | :------ |
| Semgrep Code      |  **Generally available (GA)**<br />C and C++ • C# • Generic • Go • Java • JavaScript • JSON • Kotlin • Python • TypeScript • Ruby • Rust • JSX • PHP • Scala • Swift • Terraform <br /><br />**Beta**<br />APEX • Elixir<br /><br />**Experimental**<br />Bash • Cairo • Circom • Clojure • Dart • Dockerfile • Hack • HTML • Jsonnet • Julia • Lisp • Lua • Move on Aptos • Move on Sui • OCaml• R • Scheme • Solidity • YAML • XML |
| Semgrep Supply Chain | **Generally available reachability**<br />C# • Go • Java • JavaScript and TypeScript • Kotlin • Python • Ruby • Scala • Swift<br /><br />**Beta or languages without support for reachability analysis**<br />Dart • Elixir • PHP  • Rust |
| Semgrep Secrets | Language-agnostic; can detect 630+ types of credentials or keys. |

See the [Supported languages](/supported-languages#semgrep-code-and-oss) documentation for more details.
<!-- Please don't delete the whole Enhance... section, as we may resurrect --> <!--
<h3>Enhance your Semgrep experience</h3>

<div class = "col-3-fixed">
  <Card link='/semgrep-assistant/overview'>
    <div class="card__copy">
    <CardHeader>Semgrep Assistant</CardHeader>
    <CardBody>
      AI for triage, remediation, and institutional memory. 
    </CardBody>
    </div>
  </Card>
  <Card link='/secure-guardrails/secure-guardrails-in-semgrep'>
    <div class="card__copy">
    <CardHeader>Secure guardrails</CardHeader>
    <CardBody>
      Help developers write secure code in their environment.
    </CardBody>
    </div>
  </Card>
  <Card link='/deployment/managed-scanning/overview'>
    <div class="card__copy">
    <CardHeader>Managed Scans</CardHeader>
    <CardBody>
      Onboard thousands of repositories to Semgrep.
    </CardBody>
    </div>
  </Card>
</div>
-->

<h3>February 2025 release notes summary</h3>
<!-- 5-7 bullets across the product suite -->
- [Semgrep Managed Scans](/deployment/managed-scanning/bitbucket) for repositories hosted by **Bitbucket Cloud** is now in public beta.
- You can now manage your projects' enrollment in Semgrep Managed Scans through the [Semgrep API's `/project` and `/project/managed-scan` endpoints](https://semgrep.dev/api/v1/docs/#tag/Project).
- Added support for **Critical** severity level to denote the highest severity level for a Code or Secrets finding. You can now filter by Critical severity level in Semgrep AppSec Platform, and you can filter for and identify rules that generate critical severity findings in the Semgrep Registry.
- New rules for JavaScript and TypeScript have been added to Semgrep's default ruleset, `p/default`. The new rules cover the OWASP Top 10 and the most popular server-side frameworks, like Express, NestJS, Hapi, and Koa.
- You can now [configure policies](/semgrep-supply-chain/policies) for Supply Chain findings. These policies let you set certain conditions by which developers are notified of findings through a PR or MR comment, or potentially blocked from merging a PR or MR.
    - For example, you can create a policy to block a PR or MR from merging when a reachable finding with an available fix (upgrade) is detected.
    - Policies can have different scopes, which are the projects or project tags the policies are applied to.
- [Semgrep Assistant](/semgrep-assistant/overview) is now available for users with repositories hosted by Bitbucket Cloud and Azure DevOps.

[See the latest release notes <i class="fa-solid fa-arrow-right"></i>](/release-notes/latest)
