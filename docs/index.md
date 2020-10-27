</br>
<p align="center">
    <a href="https://semgrep.dev"><img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" height="100" alt="Semgrep logo"/></a>
</p>
<h3 align="center">Find bugs and enforce code standards.</h3>

Explore the Semgrep docs and join an amazing community of engineering and security teams already using Semgrep to enforce their code standards 🚀

- [Getting started](getting-started.md)
- [Writing rules](writing-rules/overview.md)
- [Running rules](running-rules.md)
- [Managing CI policy](managing-policy.md)
- [Integrations](integrations.md)
- [Experiments](experiments.md)

---

# Overview

Semgrep is a lightweight, offline, open-source static analysis tool for many languages. It excells at expressing code standards — without complicated queries — and surfacing bugs early in the development flow.

Semgrep has several components:

Semgrep CLI - the [open-source](https://github.com/returntocorp/semgrep) command-line tool at the heart of everything</br>
Semgrep CI - a git and diff-aware Semgrep [wrapper](https://github.com/returntocorp/semgrep-action) for running Semgrep as part of continuous integration</br>
[Semgrep.dev](https://semgrep.dev/) - write and share rules and manage Semgrep CI across many projects

Semgrep rules generally look like the code you’re searching for. For example, if you want to find calls to a function named `foo`, search for `foo()`. You can find function calls, class or method definitions, and more without having to understand abtract syntax trees or wrestle with regexes.

The [Semgrep registry](https://semgrep.dev/explore) has 900+ rules written by the Semgrep team as well as community contributors covering security, correctness, and performance bugs. No need to DIY unless you want to.

Semgrep is an evolution of [pfff](https://github.com/returntocorp/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Concinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). r2c revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company.

# Language support

Some supported languages are in alpha or beta; we take a data-driven approach that evaluates the parse rate of the language on a wide corpus before we promote it to general availability (GA). For more details, see [our breakdown of all supported languages](status.md).

<div class="lang-container">
  <iframe width="600" height="700" frameBorder="0" src="https://dashboard.semgrep.dev/languages/table"></iframe>
</div>
