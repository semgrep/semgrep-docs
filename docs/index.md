---
description: >-
  Read the documentation and get started with Semgrep.
  A fast, open-source, static analysis tool
  for finding bugs and enforcing code standards at editor, commit, and CI time.
---

</br>
<p align="center">
  <a href="https://semgrep.dev">
    <img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" style="height: 100px" alt="Semgrep logo"/>
  </a>
</p>
<h3 align="center">Static analysis at ludicrous speed<br />Find bugs and enforce code standards</h3>

---

# Overview

Semgrep is a fast, open-source, static analysis tool for finding bugs and enforcing code standards at editor, commit, and CI time. [Get started →.](getting-started.md)

Semgrep analyzes code locally on your computer or in your build environment: **code is never uploaded**.

Its rules look like the code you already write; no abstract syntax trees, regex wrestling, or painful DSLs. Here's a quick rule for finding Python `print()` statements, run it by clicking the [▸] button:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432px" frameborder="0"></iframe>
</br>

The Semgrep ecosystem includes:

* [Semgrep](getting-started.md) - the open-source command line tool at the heart of everything
* [Semgrep CI](semgrep-ci/overview.md) - a specialized Docker image for running Semgrep in CI environments
* [Semgrep Playground](https://semgrep.dev/editor) - an online interactive editor for writing and sharing rules
* [Semgrep Registry](https://semgrep.dev/explore) - 1,000+ community-driven rules covering security, correctness, and performance bugs
* [Semgrep App](https://semgrep.dev/manage) - deploy, manage, and monitor Semgrep at scale with free and paid tiers

Semgrep is developed and commercially supported by [r2c, a software security company](https://r2c.dev).

<p align="center">
  <a href="/getting-started"> Get started →. </a>
</p>

# Language support

Semgrep supports 17+ languages.

| GA         | Alpha                      | Experimental |
|:---------- |:---------------------------|:-------------|
| Go         | C                          | Kotlin       |
| Java       | C#                         | Lua          |
| JavaScript | OCaml                      | R            |
| JSON       | PHP                        | Rust         |
| JSX        | YAML                       |              |
| Python     | Generic (ERB, Jinja, etc.) |              |
| Ruby       |                            |              |
| TypeScript |                            |              |
| TSX        |                            |              |

To determine alpha, beta, or general availability (GA) status we scan a wide corpus of projects and measure the parse rate of each language. For more details see [the breakdown of all supported languages](status.md).

# History

Semgrep is an evolution of [pfff](https://github.com/returntocorp/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Coccinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). [r2c](https://r2c.dev/team) revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company.
