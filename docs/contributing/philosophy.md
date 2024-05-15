---
slug: semgrep-philosophy
description: "As you think about contributing to Semgrep, consider these design principles that have guided Semgrep CLI’s development so far."
---

# Semgrep OSS philosophy

[Semgrep](https://semgrep.dev/) is a lightweight static analysis tool for many languages. It can find bug variants with patterns that look like source code.

As you think about contributing to the Semgrep CLI, consider these design principles that have guided Semgrep's development so far:

1. **Free**<br/>
“If a developer has to convince their manager to spend a few million dollars on advanced security tools each time they change jobs, the future is bleak.” — see our [introductory blog post](https://semgrep.dev/blog/2020/introducing-semgrep-and-r2c/) for more. It’s important to us (and the community) that Semgrep, Inc. is able to develop a sustainable business around Semgrep to support its development, but we strongly believe the tooling itself must always be free.

1. **Open-source software**<br/>
Semgrep is [LGPL](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)) and powered not just by [Semgrep, Inc.](https://semgrep.dev/) but also by community of brilliant external contributors. We welcome feedback and contributions and strive to be a welcoming community for new developers.

1. **Fast**<br/>
High sloc/sec scanning speed and low startup cost. We’ll never be as fast as ripgrep but we want to get as close as we can.

1. **Code never leaves your machine**<br/>
Semgrep by default runs entirely locally (unless you set it up yourself in a server/client mode). Code never leaves your machine to be analyzed.

1. **Support every programming language**<br/>
“If grep supports it, we will too!” This even includes those that aren’t thought of as programming languages, like Bash or Docker.

1. **Run anywhere**<br/>
Semgrep is small (&lt;100MB), has minimal runtime dependencies, and should be easily installable via your programming language or operating system package manager. 

1. **Keep easy things easy, and hard things possible.**<br/>
Using Semgrep to scan your code, and writing rules with which to scan, should be easy. Semgrep also smooths the process with delightful defaults and support every step of the way. But it’s also adaptable, and we welcome you using Semgrep in your own custom way. Hey, there are even [examples of scanning cat pictures out there](https://youtu.be/ybWB2Vf2V50?t=1182).

1. **Beginner-friendly**<br/>
You shouldn’t need a PhD in program analysis, or even to understand what an AST is, in order to be effective with Semgrep. A novice programmer should be able to write their first Semgrep rule in 60 seconds.

1. **Human-readable rules**<br/>
Rules should look like code and be easy to read and reason about — hopefully easier than if they were written in grep or a native linter.

1. **Self-contained rule files**<br/>
You shouldn’t need an additional plugin, dependency, or internet access to run a YAML rule. It should just work.

1. **Deterministic (implies reproducible, idempotent)**<br/>
Given the same input, Semgrep gives the same output.

1. **Runs offline**<br/>
Semgrep can run without internet access so developers can write code from airplanes or beaches.

1. **Rules are safe to run no matter where they came from**<br/>
Rules shouldn’t have the capability to run arbitrary code on your system, only to act as a function that produces a deterministic output message.

1. **Single-file analysis**<br/>
To stay fast and limit complexity, we draw a line at crossing file boundaries during analysis. We lose the ability to detect certain complex cross-function (interprocedural) issues, but that’s an explicit tradeoff we make.<br/><br/>
Our goal is to catch what a senior engineer would catch in code review: Semgrep isn’t designed to find a crazy issue that’s 300 calls from start to finish and evaded the team for 20 years. Instead, it’s designed for enforcing best-practices and automating the code review tasks that an excellent senior engineer would be capable of. For a discussion of why expressive creativity is better than a powerful engine, [see this excellent blog post by Devdatta Akhawe](https://devd.me/log/posts/static-analysis/).<br/><br/>
As a corollary: if you design your codebase so that code in a file is safe today, it's still safe after a colleague makes a change twenty function calls away in another file.

1. **Designed to run while code is being written**<br/>
Semgrep is optimized for running in the IDE, git commit hooks, or CI—not for at the tail-end of a release process.

1. **A platform for program analysis**<br/>
We will expose stable internals so that researchers and engineers can develop novel program analysis work off of APIs like Semgrep’s generic AST.
