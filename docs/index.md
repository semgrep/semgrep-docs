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
      Enforce your organization’s coding standards with custom rules.
    </CardBody>
    </div>
  </Card>
</div>

<h3>Supported languages</h3>

<!-- *************************************************************************
ARE YOU EDITING THE SUPPORTED LANGUAGES IN ANY WAY? ADDING A FEATURE? ETC?

Don't forget to update:
- table at Semgrep CE vs Semgrep
- the individual language's page
- the supported languages page
*************************************************************************** -->

| Product | Languages |
| :-------  | :------ |
| Semgrep Code      |  **Generally available (GA)**<br />C and C++ • C# • Generic • Go • Java • JavaScript • JSON • Kotlin • Python • TypeScript • Ruby • Rust • JSX • PHP • Scala • Swift • Terraform <br /><br />**Beta**<br />APEX • Elixir<br /><br />**Experimental**<br />Bash • Cairo • Circom • Clojure • Dart • Dockerfile • Hack • HTML • Jsonnet • Julia • Lisp • Lua • Move on Aptos • Move on Sui • OCaml• R • Scheme • Solidity • YAML • XML |
| Semgrep Supply Chain | **Generally available reachability**<br />C# • Go • Java • JavaScript and TypeScript • Kotlin • PHP • Python • Ruby • Rust • Scala • Swift <br /><br />**Languages without support for reachability analysis**<br />Dart • Elixir |
| Semgrep Secrets | Language-agnostic; can detect 630+ types of credentials or keys. |

See the [Supported languages](/supported-languages#language-maturity-summary) documentation for more details.
<!-- Please don't delete the whole Enhance... section, as we may resurrect --> <!--
<h3>Enhance your Semgrep experience</h3>

<div class = "col-3-fixed">
  <Card link='/semgrep-multimodal/overview'>
    <div class="card__copy">
    <CardHeader>Semgrep Multimodal</CardHeader>
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

<h3>March 2026 release notes summary</h3>
<!-- 5-7 bullets across the product suite; keep in sync with release-notes/march-2026.md -->

- Semgrep's **AI-powered detection** is now available in beta. With AI-powered detection, you can automatically identify complex business logic flaws, such as insecure direct object references (IDORs) and broken authorization.
- **Click to Fix** has been renamed to **Autofix**
- Autofix is now in beta for Semgrep Code, extending AI-generated draft pull requests to Code findings in addition to Supply Chain findings.
- **Semgrep Assistant** is renamed **Semgrep Multimodal** to better reflect all its AI-powered capabilities.
- Semgrep is available as a **Cursor** and **Claude Code** plugin for scanning as files change.

[See the latest release notes <i class="fa-solid fa-arrow-right"></i>](/release-notes)

<div style={{textAlign: 'right'}}>[<i class="fa-solid fa-rss"></i> Subscribe to RSS feed ](https://semgrep.dev/docs/release-notes/rss.xml)</div> 
