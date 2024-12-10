---
slug: /
hide_title: true
id: Docs home
displayed_sidebar: topLevelSidebar
toc_max_heading_level: 2
pagination_next: getting-started/quickstart
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
  <Card className={'card-50'} link='/getting-started/quickstart'>
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
| Semgrep Supply Chain | **Generally available (GA) reachability**<br />C# • Go • Java  • JavaScript and TypeScript • Kotlin • Python • Ruby • Scala • Swift <br /><br />**Beta or lockfile-only reachability**<br />Dart • Elixir • PHP  • Rust |
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

<h3>November 2024 release notes summary</h3>
<!-- 5-7 bullets across the product suite -->
- Semgrep Supply Chain now provides reachability analysis for **Scala** and **Swift**.
- **Dashboard**:
  - You can now view **trends**, comparing the previous time period to the current one, in the following charts:
    - Production backlog
    - Secure guardrails
    - Median open finding age
  - You can now export the Dashboard as a PDF. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login), then click **Dashboard > Download > Download as PDF (report)**.
- Various improvements and fixes to Semgrep Managed Scans (SMS).
- Added **Pro rules** for JavaScript and TypeScript, including:
  - Code injection rules for the `vm`, `vm2`, and puppeteer libraries
  - NoSQL injection rules for `mongodb` and `mongoose` libraries
  - SQL injection rules for the `knex`, `mysql`, `pg`, `sequelize`, and `sqlite` libraries
  - Path traversal rules for `fs` and `fs-extra`
- **Semgrep Assistant**: Added support for Google Gemini. To integrate Semgrep Assistant with Google Gemini, reach out to [<i class="fa-regular fa-envelope"></i> support@semgrep.com](mailto:support@semgrep.com).

[See the latest release notes <i class="fa-solid fa-arrow-right"></i>](/release-notes/latest)
<!--
Semgrep AppSec Platform, Code, and Supply Chain are **free** for up to 10 contributors. [Get started →](/getting-started/quickstart)

<h2>Language support</h2>

| Product | Language support |
| - | - |
| Semgrep Code | Semgrep Code [supports over 30 languages and counting](/supported-languages#semgrep-code-and-oss)! 🚀 |
| Semgrep Secrets | Semgrep Secrets detects API keys, hardcoded passwords, authentication tokens, and more in your repositories. |
| Semgrep Supply Chain | Semgrep Supply Chain supports C#, Go, Java, JavaScript and TypeScript, Python, and Ruby, as well as a [variety of package managers and lockfiles](/supported-languages#semgrep-supply-chain). 🛡️ |

-->
