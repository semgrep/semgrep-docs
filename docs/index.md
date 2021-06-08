</br>
<p align="center">
  <a href="https://semgrep.dev">
    <img src="https://raw.githubusercontent.com/returntocorp/semgrep/develop/semgrep.svg" style="height: 150px" alt="Semgrep logo"/>
  </a>
</p>
<h3 align="center">Static analysis at ludicrous speed<br />Find bugs and enforce code standards</h3>

---
# Overview

Semgrep is a fast, open-source, static analysis tool for finding bugs and enforcing code standards at editor, commit, and CI time. [Get started  →.](getting-started.md)

Semgrep runs fully on your computer or build environment: **your code is never sent anywhere**. 

Its rules look like the code you’re searching; no more traversing abstract syntax trees or wrestling with regexes. Here's a quick rule for finding Python `print()` statements, try it by clicking the [▸] button:

<iframe title="Semgrep example no prints" src="https://semgrep.dev/embed/editor?snippet=ievans:print-to-logger" width="100%" height="432px" frameborder="0"></iframe>
</br>
    
The Semgrep ecosystem encompasses:

* [Semgrep](getting-started.md) - the open-source command-line tool at the heart of everything
* [Semgrep CI](semgrep-ci.md) - a specialized Docker image for running Semgrep in CI
* [Semgrep App](https://semgrep.dev/manage) - hosted app with free and paid tiers to:
    * Choose from 1,000+ rules written by the community and [r2c](https://r2c.dev) to find security, correctness, and performance bugs.
    * Deploy Semgrep in CI with the click of a button
    * Centrally manage policies across all your projects
    * See results where you want them
    * Measure the efficacy of code policies
    * Save, share, and run custom rules
### History

Semgrep is an evolution of [pfff](https://github.com/returntocorp/pfff/), which began at [Facebook](https://github.com/facebookarchive/pfff) in 2009, which itself was an evolution of the Linux refactoring tool [Coccinelle](https://en.wikipedia.org/wiki/Coccinelle_(software)). [r2c](https://r2c.dev/team) revitalized the project after its original author, [Yoann Padioleau](https://github.com/aryx), joined the company.

# Language support

Some supported languages are in alpha or beta; a data-driven approach that evaluates the parse rate of the language on a wide corpus determines when to promote a language to general availability (GA). For more details, see [the breakdown of all supported languages](status.md).

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
