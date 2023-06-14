---
slug: /
hide_title: true
id: Docs home
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

Semgrep is a fast, open source, static analysis engine for finding bugs, detecting dependency vulnerabilities, and enforcing code standards. [Get started →](getting-started/)

Semgrep analyzes code locally on your computer or in your build environment: **code is never uploaded**. 

Its rules look like the code you already write; no abstract syntax trees, regex wrestling, or painful DSLs. Here's a quick rule for finding Python `print()` statements. Run it by clicking the [▸] button:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432px" frameBorder="0"></iframe>
<br />

<!-- <EditorWidget snippetId={"ievans:print-to-logger2"} /> -->

The Semgrep ecosystem includes the following products:

* [Semgrep OSS Engine](getting-started/) - The open-source engine at the heart of everything.
* [Semgrep Cloud Platform (SCP)](semgrep-cloud-platform/getting-started) - Deploy, manage, and monitor SAST and SCA at scale using Semgrep, with [free and paid tiers](https://semgrep.dev/pricing). Integrates with continuous integration (CI) providers such as GitHub, GitLab, CircleCI, and more.
* [Semgrep Code](https://semgrep.dev/products/semgrep-code) - Scan your code with Semgrep's Pro rules and Semgrep Pro Engine to find OWASP Top 10 vulnerabilities and protect against critical security risks specific to your organization. Semgrep Code is free for up to 10 developers through its Team tier.
* [Semgrep Supply Chain (SSC)](https://semgrep.dev/products/semgrep-supply-chain) - A high-signal dependency scanner that detects reachable vulnerabilities in open source third-party libraries and functions across the software development life cycle (SDLC). Semgrep Supply Chain is available on Team (paid) tiers.

Support and be supported by the Semgrep community through:

* [Semgrep Playground](https://semgrep.dev/editor) - An online interactive tool for writing and sharing rules.
* [Semgrep Registry](https://semgrep.dev/explore) - 2,000+ community-driven rules covering security, correctness, and dependency vulnerabilities.

Semgrep is developed and commercially supported by [Semgrep, Inc](https://r2c.dev) a software security company.

<p align="center">
  <a href="/docs/getting-started">Get started →</a>
</p>

## Language support

<SupportedLanguagesTable />

To determine experimental, beta, or general availability (GA) status, Semgrep scans a wide corpus of projects and measure the parse rate of each language. For more details see [the breakdown of all supported languages](supported-languages/).

## Environments

The following table lists environments in which you can run various Semgrep products.


| Product              | Local CLI | Remote CI |
| -------------------- | --------- | --------- |
| Semgrep OSS Engine  |  ✅  [Run locally with Semgrep Engine](getting-started)  |   ✅  Can send findings to [Semgrep Cloud Platform](semgrep-ci/running-semgrep-ci-with-semgrep-cloud-platform) or run [stand-alone CI jobs](semgrep-ci/running-semgrep-ci-without-semgrep-cloud-platform) |
| Semgrep Code         |  ✅  Log in to access [Pro Engine](semgrep-code/semgrep-pro-engine-intro) and [Pro rules](semgrep-code/pro-rules) (Team and Enterprise tier) |   ✅  Best used with [Semgrep Cloud Platform](semgrep-cloud-platform/getting-started) |
| Semgrep Supply Chain |  ✅  Log in to access [Supply Chain](semgrep-supply-chain/overview) rules (Team and Enterprise tier)  |   ✅  Best used with [Semgrep Cloud Platform](semgrep-cloud-platform/getting-started) |

:::info 
Semgrep Cloud Platform is a hosted web application (SaaS) and as such is excluded from the table.
:::

## History

Semgrep is an evolution of [pfff](https://github.com/returntocorp/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Coccinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). [Semgrep, Inc](https://r2c.dev/team) revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company.

## Semgrep development philosophy

See the [Semgrep OSS Engine Philosophy](contributing/semgrep-philosophy/) for details about why Semgrep is free, our goals for development, and the designed capabilities and limits of the static analysis engine.
