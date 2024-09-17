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
<h1>&nbsp;Semgrep docs</h1>
</div>

<h5 style={{margin: '0px 0px 8px 0px'}}>Find bugs and reachable dependency vulnerabilities in code.<br />Enforce your code standards on every commit.</h5>

<h3>Scan with Semgrep AppSec Platform</h3>

<h5>Deploy static application security testing (SAST), software composition analysis (SCA), and secrets scans from one platform.</h5>

<div class = "col-2-fixed">
        <Card>
          <CardHeader>
            <h6>Get started</h6>
          </CardHeader>
          <CardBody>
            Run your first Semgrep scan. 
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h6>Deploy Semgrep</h6>
          </CardHeader>
          <CardBody>
            Deploy Semgrep to your organization quickly and at scale.
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h6>Triage and remediate</h6>
          </CardHeader>
          <CardBody>
            Triage and remediate findings; fine-tune guardrails for developers.
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h6>Write rules</h6>
          </CardHeader>
          <CardBody>
            Create custom rules to enforce your organization's coding standards.
          </CardBody>
        </Card>
</div>


Semgrep is an AppSec suite for finding bugs, detecting dependency vulnerabilities, and enforcing code standards. Its rules look like the code you already write -- no abstract syntax trees, regex wrestling, or painful DSLs.

The following code editor shows a rule for finding Python `print()` statements. Run it by clicking the [▸] button:
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=KPzL" width="100%" height="432px" frameBorder="0"></iframe>
<br />

The Semgrep ecosystem includes:

- [Semgrep AppSec Platform](https://semgrep.dev/login) - Deploy, manage, and monitor Code, Supply Chain, and Secrets at scale. Semgrep integrates with continuous integration (CI) providers such as GitHub, GitLab, CircleCI, and more.
- [Semgrep Code](/semgrep-code/overview) - Scan your code with Semgrep to find OWASP Top 10 vulnerabilities and protect against critical security risks specific to your organization.
- [Semgrep Secrets](/semgrep-secrets/conceptual-overview) - Detect and validate leaked credentials in your codebase.
- [Semgrep Supply Chain (SSC)](/semgrep-supply-chain/overview) - A high-signal dependency scanner to reachable vulnerabilities in open source third-party libraries and functions.

Semgrep AppSec Platform, Code, and Supply Chain are **free** for up to 10 contributors. [Get started →](/getting-started/quickstart)

<h2>Language support</h2>

| Product | Language support |
| - | - |
| Semgrep Code | Semgrep Code [supports over 30 languages and counting](/supported-languages#semgrep-code-and-oss)! 🚀 |
| Semgrep Secrets | Semgrep Secrets detects API keys, hardcoded passwords, authentication tokens, and more in your repositories. |
| Semgrep Supply Chain | Semgrep Supply Chain supports C#, Go, Java, JavaScript and TypeScript, Python, and Ruby, as well as a [variety of package managers and lockfiles](/supported-languages#semgrep-supply-chain). 🛡️ |
