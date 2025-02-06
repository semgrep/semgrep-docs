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

<h3>January 2025 release notes summary</h3>
<!-- 5-7 bullets across the product suite -->
- The [Policy Management API](https://semgrep.dev/api/v1/docs/#tag/PoliciesService) is now generally available. The Policy Management API allows you to automate tasks such as:
  - Add, update, and disable rules across multiple policies.
  - Apply rules in different modes, such as monitor, comment, block, or disable, to align with security workflows.
  - Integrate policy management into CI/CD pipelines to ensure consistent enforcement during software development.
- [Semgrep Managed Scans](/deployment/managed-scanning/azure) for repositories hosted by **Azure DevOps** is now in public beta.
- [Dependency Paths](/semgrep-supply-chain/dependency-search#view-the-dependency-path) are now available in public beta for the following languages and package managers:
  - **JavaScript**: npm, pnpm, and Yarn are supported.
  - **Python**: Only Poetry is supported.
- Semgrep now ingests CVE information from [<i class="fas fa-external-link fa-xs"></i> Electron release notes](https://releases.electronjs.org/releases/stable). This information is used to generate rules that can detect if you're affected by CVEs from this source.
- [Noise filtering](/semgrep-assistant/overview#noise-filtering-beta) is now in public beta. With Noise Filtering, Assistant evaluates each Semgrep Code finding to determine if it's a true positive using additional context and prevents a PR comment from being posted in the developer workflow if it's not.
- [Auto-triage Memories](/semgrep-assistant/getting-started#add-memory-during-triage) is now in public beta. With this feature, you can identify findings that are safe to ignore and write triage notes indicating why this is so. Assistant then stores this information as a memory and uses it to assess whether similar findings are shown to developers in the future. Assistant also takes that memory, reanalyzes similar findings in your backlog, and suggests issues that may be safe to close.

[See the latest release notes <i class="fa-solid fa-arrow-right"></i>](/release-notes/latest)
