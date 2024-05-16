---
slug: /
hide_title: true
id: Docs home
displayed_sidebar: topLevelSidebar
toc_max_heading_level: 2
pagination_next: null
description: >-
  Read the documentation and get started with Semgrep.
  A fast, open-source, static analysis engine
  for finding bugs, detecting dependency vulnerabilities, and enforcing code standards at editor, commit, and CI time.
---

import SupportedLanguagesTable from '/src/components/reference/_supported-languages-table.mdx'
import MoreHelp from "/src/components/MoreHelp"
import ThemedImage from '@theme/ThemedImage'

<!---
Substitute the "dark:" logo path in case a new dark logo is made.
The code is kept here for easy maintenance.
-->

<br />
<p align="center">
  <a href="https://semgrep.dev">
    <ThemedImage
      alt="Semgrep themed logo"
      height="105px"
      sources={{
        light: ('img/semgrep.svg'),
        dark: ('img/semgrep.svg'),
      }} />
  </a>
</p>
<h3 align="center">Code scanning at ludicrous speed.<br />Find bugs and reachable dependency vulnerabilities in code.<br />Enforce your code standards on every commit.</h3>

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
| Semgrep Code | Semgrep Code [supports over 30 languages and counting](/supported-languages#semgrep-code)! 🚀 |
| Semgrep Secrets | Semgrep Secrets can scan repositories using any programming language. |
| Semgrep Supply Chain | Semgrep Supply Chain supports C#, Go, Java, JavaScript and TypeScript, Python, and Ruby, as well as a [variety of package managers and lockfiles](/supported-languages#semgrep-supply-chain). 🛡️ |
