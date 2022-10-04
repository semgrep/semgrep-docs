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

<br />
<p align="center">
  <a href="https://semgrep.dev">
    <img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" height="100" alt="Semgrep logo" />
  </a>
</p>
<h3 align="center">Code scanning at ludicrous speed.<br />Find bugs and reachable dependency vulnerabilities in code.<br />Enforce your code standards on every commit.</h3>

Semgrep is a fast, open source, static analysis engine for finding bugs, detecting dependency vulnerabilities, and enforcing code standards. [Get started →](getting-started/)

Semgrep analyzes code locally on your computer or in your build environment: **code is never uploaded**. 

Its rules look like the code you already write; no abstract syntax trees, regex wrestling, or painful DSLs. Here's a quick rule for finding Python `print()` statements. Run it by clicking the [▸] button:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432px" frameBorder="0"></iframe>
<br />

<!-- <EditorWidget snippetId={"ievans:print-to-logger2"} /> -->

The Semgrep ecosystem includes:

* [Semgrep](getting-started/) - The open-source command line tool at the heart of everything.
* [Semgrep Supply Chain](https://semgrep.dev/products/semgrep-supply-chain) - high-signal dependency scanner that detects reachable vulnerabilities in open source, third-party libraries and functions across the SDLC.
* [Semgrep App](https://semgrep.dev/manage) - Deploy, manage, and monitor Semgrep and Semgrep Supply Chain at scale with free and paid tiers. Integrates with CI providers such as GitHub, GitLab, CircleCI, and more.

and:

* [Semgrep Playground](https://semgrep.dev/editor) - An online interactive tool for writing and sharing rules.
* [Semgrep Registry](https://semgrep.dev/explore) - 2,000+ community-driven rules covering security, correctness, and dependency vulnerabilities.
* [Semgrep App](https://semgrep.dev/manage) - Deploy, manage, and monitor Semgrep at scale with free and paid tiers. Integrates with CI providers such as GitHub, GitLab, CircleCI, and more.

Semgrep is developed and commercially supported by [r2c, a software security company](https://r2c.dev).

<p align="center">
  <a href="/docs/getting-started"> Get started →</a>
</p>

:::tip
New: Semgrep Supply Chain finds reachable vulnerable dependencies in your code. [More →](https://semgrep.dev/products/semgrep-supply-chain)
:::

## Language support

<SupportedLanguagesTable />

To determine experimental, beta, or general availability (GA) status we scan a wide corpus of projects and measure the parse rate of each language. For more details see [the breakdown of all supported languages](supported-languages/).

## History

Semgrep is an evolution of [pfff](https://github.com/returntocorp/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Coccinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). [r2c](https://r2c.dev/team) revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company.

## Understanding Semgrep development philosophy

See the [Semgrep CLI Philosophy](contributing/semgrep-philosophy/) for details about why Semgrep is free, our goals for development, and the designed capabailities and limits of the static analysis engine.
