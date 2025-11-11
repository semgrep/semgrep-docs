---
slug: opengrep
append_help_link: true
hide_table_of_contents: true
displayed_sidebar: aboutSidebar
tags:
  - Support
description: >-
  See how Semgrep compares to Opengrep.
---

import TOCInline from "@theme/TOCInline"

# Compare Semgrep to Opengrep

<TOCInline toc={toc} />

To resolve confusion within security and developer communities when trying to choose between Semgrep and Opengrep, this page highlights some of the key distinctions to help with decision-making.

## What is Semgrep Community Edition?

[Semgrep Community Edition](/products/community-edition/) (CE) is the collective name for the open source Semgrep engine (previously known as Semgrep OSS) and the collection of rules published and maintained by the Semgrep community and Semgrep, Inc. 

The open source project repository is here: https://github.com/semgrep/semgrep 

## What is Opengrep?

Opengrep is a fork of the Semgrep Community Edition (CE) engine, previously known as Semgrep OSS (Semgrep Open Source).

## How Are Semgrep and Opengrep Licenses Different?

- The Semgrep Community Edition engine is licensed under LGPL 2.1. ([LICENSE](https://github.com/semgrep/semgrep/blob/develop/LICENSE))
- The Opengrep engine is licensed under LGPL 2.1. ([LICENSE](https://github.com/opengrep/opengrep/blob/main/LICENSE))

The LGPL 2.1 license is an open source license that means any copies of the Semgrep or Opengrep engine must include a copy of the full license text and the original copyright notice, must make available the source code when a derivative work is distributed, and such derivative works must be licensed under the same or later version of the LGPL.

## Is Semgrep CE Open Source?

Yes, Semgrep CE is open source. This license for the engine has remained unchanged since Semgrep, Inc. began development in early 2020.

Semgrep maintains a collection of rules written by the community and Semgrep, Inc., and they are licensed under the [Semgrep Rules License](https://semgrep.dev/legal/rules-license/). This license limits their use to internal, non-competing, and non-SaaS contexts, and explicitly limits certain commercial usage. This applies to all rules authored by Semgrep and those contributed to our public repositories.

## What changed with Semgrep’s licensing in December, 2024?

The license for Semgrep's CE engine remains unchanged: LGPL 2.1.

It was shared in [Important updates to Semgrep OSS](https://semgrep.dev/blog/2024/important-updates-to-semgrep-oss/) that licensing for Semgrep-maintained rules would change from Commons Clause w/ LGPL 2.1 to the Semgrep Rules License. This change limits certain commercial usage of the rules authored by Semgrep and contributed to our public repositories.

## Are Semgrep and Opengrep Actively Maintained Projects?

Yes, both projects are actively adding new features and bug fixes.

## How do the Command Line Interfaces Differ Between Opengrep and Semgrep?

The Command Line Interface (CLI) for both projects have similar command usage.

Individual arguments to these commands may have diverged over time.

## Does Semgrep CE Support the Same Features as Opengrep?

In many cases the answer is yes.

Semgrep has a large community of users including major enterprises and service providers that depend on reliability from Semgrep CE. When introducing new features, it is important to see benchmarks that give confidence that regressions or a degradation of performance can be avoided when rolling out new capabilities.

Please reach out to our team if there is a feature missing or you have any questions.

## Does Semgrep CE Support Windows?

Yes, Semgrep can be used natively cross-platform including Windows. Previously, it was necessary to install Windows Subsystem for Linux (WSL) or run Semgrep inside a container or VM. That is no longer the case. The Semgrep Command-line Interface (CLI) can run directly from a Windows Prompt or PowerShell environment. Semgrep CE can also be used with plugins such as for VS Code, IntelliJ, or Cursor.

You can read more about Windows support from the blog post: [Five Considerations When Building Cross-Platform Tools for Windows and macOS](https://semgrep.dev/blog/2025/five-considerations-when-building-cross-platform-tools-for-windows-and-macos)

## Does Semgrep CE Support Multicore?

Yes, the Semgrep CE engine is implemented with **Multicore OCaml** which supports shared-memory parallel processing through the mechanism known as multicore. This allows the Semgrep engine to leverage multiple threads with shared memory in order to more efficiently use processing resources.

Read more about this from our blog post: [Boosting Security Scan Performance for Monorepos with Multicore Parallel Processing](https://semgrep.dev/blog/2025/boosting-security-scan-performance-for-monorepos-with-multicore-parallel-processing/)

## Is Semgrep CE or Opengrep Faster?

Performance and speed claims rely heavily upon a number of factors and often come with trade-offs. You may be able to optimize one particular use case at the expense or performance in another. Our solutions and support teams can help with evaluation and a proof of value for your specific use cases.

Read more about how Semgrep CE thinks about performance from the open source blog post: [Benchmarking Semgrep Community Edition Performance Improvements](https://semgrep.dev/blog/2025/benchmarking-semgrep-performance-improvements/).

## What is the Difference Between Semgrep CE and Semgrep Pro?

Semgrep CE is the open source version of the [Semgrep Pro](https://semgrep.dev/products/pro-engine) engine. 

Visit [Pricing](https://semgrep.dev/pricing) for a comparison of various features.

### Does Semgrep Support Interfile Taint Analysis?

Semgrep Community Edition does not support inter-file taint analysis but this is a feature of Semgrep Pro. This includes all the many variations of data flow across supported language and environments including class inheritance, nested functions, type inference, constant propagation, typed metavariable, alias variables, loop mutations, and much more.

