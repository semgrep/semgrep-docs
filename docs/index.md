---
slug: /
hide_title: true
id: Docs home
displayed_sidebar: topLevelSidebar
toc_max_heading_level: 2
pagination_next: getting-started/quickstart
description: >-
  Read the documentation and get started with Semgrep.
  A fast, open-source, static analysis engine
  for finding bugs, detecting dependency vulnerabilities, and enforcing code standards at editor, commit, and CI time.
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import ThemedImage from '@theme/ThemedImage'

<!-- vale off -->

<!---
Substitute the "dark:" logo path in case a new dark logo is made.
The code is kept here for easy maintenance.
-->

<div style={{display: 'inline-flex', paddingTop: '32px'}}>
<a href="https://semgrep.dev">
  <ThemedImage
    alt="Semgrep themed logo"
    height="48px"
    sources={{
      light: ('img/semgrep.svg#no-shadow'),
      dark: ('img/semgrep.svg#no-shadow'),
    }} />
</a>
<h1>&nbsp;Semgrep <span style={{color: "#624DEF"}}>docs</span></h1>
</div>

<h5 class='home' style={{margin: '0px 0px 8px 0px'}}>Find bugs and reachable dependency vulnerabilities in code.<br />Enforce your code standards on every commit.</h5>

<h3>Scan with Semgrep AppSec Platform</h3>

<h5 class='home'>Deploy static application security testing (SAST), software composition analysis (SCA), and secrets scans from one platform.</h5>

<div class = "col-2-fixed">
  <Card>
    <CardImage cardImageUrl='https://a.storyblok.com/f/151984/41x41/cc044329c8/code-icon-complex200100.svg' />
    <div class="card__copy">
        <CardHeader>Get started</CardHeader>
        <CardBody>
          Run your first Semgrep scan. 
        </CardBody>
    </div>
  </Card>
  <Card>
    <CardHeader>Deploy Semgrep</CardHeader>
    <CardBody>
      Deploy Semgrep to your organization quickly and at scale.
    </CardBody>
  </Card>
  <Card>
    <CardHeader>Triage and remediate</CardHeader>
    <CardBody>
      Triage and remediate findings; fine-tune guardrails for developers.
    </CardBody>
  </Card>
  <Card>
    <CardHeader>Write rules</CardHeader>
    <CardBody>
      Create custom rules to enforce your organization's coding standards.
    </CardBody>
  </Card>
</div>

<h3>Enhance your Semgrep experience</h3>

<div class = "col-3-fixed">
  <Card link='/docs/getting-started/quickstart'>
    <CardHeader>Semgrep Assistant</CardHeader>
    <CardBody>
      AI for triage, remediation, and institutional memory. 
    </CardBody>
  </Card>
  <Card>
    <CardHeader>Secure guardrails</CardHeader>
    <CardBody>
      Help developers write secure code in their environment.
    </CardBody>
  </Card>
  <Card>
    <CardHeader>Managed Scans</CardHeader>
    <CardBody>
      Onboard thousands of repositories to Semgrep.
    </CardBody>
  </Card>
</div>

<!--
Semgrep AppSec Platform, Code, and Supply Chain are **free** for up to 10 contributors. [Get started →](/getting-started/quickstart)

<h2>Language support</h2>

| Product | Language support |
| - | - |
| Semgrep Code | Semgrep Code [supports over 30 languages and counting](/supported-languages#semgrep-code-and-oss)! 🚀 |
| Semgrep Secrets | Semgrep Secrets detects API keys, hardcoded passwords, authentication tokens, and more in your repositories. |
| Semgrep Supply Chain | Semgrep Supply Chain supports C#, Go, Java, JavaScript and TypeScript, Python, and Ruby, as well as a [variety of package managers and lockfiles](/supported-languages#semgrep-supply-chain). 🛡️ |

-->
