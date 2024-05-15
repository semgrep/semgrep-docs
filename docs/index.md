---
slug: /
hide_title: true
id: Docs home
displayed_sidebar: topLevelSidebar
toc_max_heading_level: 2
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

Semgrep is an AppSec suite for finding bugs, detecting dependency vulnerabilities, and enforcing code standards. <!-- Semgrep analyzes code locally on your computer or in your build environment: **code is never uploaded**. --> Its rules look like the code you already write -- no abstract syntax trees, regex wrestling, or painful DSLs. 

The following code editor shows a rule for finding Python `print()` statements. Run it by clicking the [▸] button:
<!-- Here's a rule for finding Python `print()` statements. Run it by clicking the [▸] button: -->
<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=KPzL" width="100%" height="432px" frameBorder="0"></iframe>
<br />

<!-- [Get started →](/getting-started/quickstart) -->

<!-- The Semgrep ecosystem includes the following products:-->

The Semgrep ecosystem includes:

- [Semgrep AppSec Platform](https://semgrep.dev/login) - Deploy, manage, and monitor Code, Supply Chain, and Secrets at scale. Semgrep integrates with continuous integration (CI) providers such as GitHub, GitLab, CircleCI, and more.
- [Semgrep Code](https://semgrep.dev/products/semgrep-code) - Scan your code with Semgrep to find OWASP Top 10 vulnerabilities and protect against critical security risks specific to your organization.
- [Semgrep Secrets](https://semgrep.dev/products/semgrep-secrets) - Detect and validate leaked credentials in your codebase.
- [Semgrep Supply Chain (SSC)](https://semgrep.dev/products/semgrep-supply-chain) - A high-signal dependency scanner to reachable vulnerabilities in open source third-party libraries and functions.

Semgrep AppSec Platform, Code, and Supply Chain are **free** for up to 10 contributors. [Get started →](/getting-started/quickstart)


<!-- 
Support and be supported by the Semgrep community through:

* [Semgrep Playground](https://semgrep.dev/editor) - An online interactive tool for writing and sharing rules.
* [Semgrep Registry](https://semgrep.dev/explore) - 2,000+ community-driven rules covering security, correctness, and dependency vulnerabilities.

Semgrep is developed and commercially supported by [Semgrep, Inc](https://semgrep.dev) a software security company.

<p align="center">
  <a href="/docs/getting-started/quickstart">Get started →</a>
</p>
-->

<h2>Language support</h2>

| Product | Language support |
| - | - |
| Semgrep Code | Semgrep Code [supports over 30 languages and counting](/supported-languages#semgrep-code)! 🚀 |
| Semgrep Secrets | Semgrep Secrets can scan repositories using any programming language. |
| Semgrep Supply Chain | Semgrep Supply Chain supports C#, Go, Java, JavaScript and Typescript, Python, and Ruby, as well as a [variety of package managers and lockfiles](/supported-languages#semgrep-supply-chain). 🛡️ |

<!--
<h2>Environments</h2>

The following table lists environments in which you can run various Semgrep products.

| Product              | Local CLI | Remote CI |
| -------------------- | --------- | --------- |
| Semgrep OSS Engine  |  ✅  [Run locally with Semgrep Engine](/getting-started/quickstart)  |   ✅  Can send findings to [Semgrep AppSec Platform](/deployment/core-deployment) or run [stand-alone CI jobs](/deployment/oss-deployment) |
| Semgrep Code         |  ✅  Log in to access [Pro Engine](semgrep-code/semgrep-pro-engine-intro) and [Pro rules](semgrep-code/pro-rules) (Team and Enterprise tier) |   ✅  Best used with [Semgrep AppSec Platform](getting-started/quickstart) |
| Semgrep Supply Chain |  ✅  Log in to access [Supply Chain](/semgrep-supply-chain/overview) rules (Team and Enterprise tier)  |   ✅  Best used with [Semgrep AppSec Platform](/getting-started/quickstart) |

:::info
Semgrep AppSec Platform is a hosted web application (SaaS) and as such is excluded from the table.
:::
-->

<!--
## History

Semgrep is an evolution of [pfff](https://github.com/semgrep/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Coccinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). [Semgrep, Inc](https://semgrep.dev/about) revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company. [Read more in the blog post "Semgrep: A static analysis journey"](https://semgrep.dev/blog/2021/semgrep-a-static-analysis-journey/)

## Semgrep development philosophy

See the [Semgrep OSS Engine Philosophy](contributing/semgrep-philosophy/) for details about why Semgrep is free, our goals for development, and the designed capabilities and limits of the static analysis engine.
-->