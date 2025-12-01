---
slug: codeql
append_help_link: true
hide_table_of_contents: true
displayed_sidebar: whatsSemgrepSidebar
tags:
  - Support
description: >-
  See how Semgrep compares to CodeQL.
---

import TOCInline from "@theme/TOCInline"

# Compare Semgrep to CodeQL

<TOCInline toc={toc} />

Both Semgrep and CodeQL use static analysis to find bugs, but there are a few differences:

<!-- vale off -->
- Semgrep operates directly on source code, whereas CodeQL requires a buildable environment.
- Semgrep provides both proprietary and open source options that can be run anywhere; CodeQL is not open source and you must pay to run it on any non-open-source code.
- Semgrep focuses on speed and ease of use. and doesn’t require compiled code.
  - Semgrep Community Edition (CE) provides [intraprocedural dataflow](/writing-rules/data-flow/data-flow-overview). [Semgrep Code](/semgrep-code/overview)'s cross-file and cross-function analysis has similar capabilities as CodeQL in terms of cross-function dataflow analysis for a subset of supported languages.
- Both have publicly available rules.
- Semgrep rules look like the source code you’re writing; CodeQL has a separate domain-specific-language for writing queries.
- Semgrep has an online, hosted free plan for up to ten contributors to private repositories; both have a hosted paid plan.
<!-- vale on -->
