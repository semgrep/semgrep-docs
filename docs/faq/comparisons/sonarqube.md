---
slug: sonarqube
append_help_link: true
hide_table_of_contents: true
displayed_sidebar: aboutSidebar
tags:
  - Support
description: >-
  See how Semgrep compares to SonarQube.
---

import TOCInline from "@theme/TOCInline"

# Comparing Semgrep to SonarQube

<TOCInline toc={toc} />

Both Semgrep and SonarQube use static analysis to find bugs, but there are a few differences:

- Extending Semgrep with custom rules is simple since Semgrep rules look like the source code you’re writing. Writing custom rules with SonarQube is [<i class="fas fa-external-link fa-xs"></i> restricted to a handful of languages](https://docs.sonarqube.org/latest/extend/adding-coding-rules/) and requires familiarity with Java and abstract syntax trees (ASTs).
- Semgrep supports user-defined autofixes; SonarQube does not.
- Semgrep focuses on speed and ease-of-use, making analysis possible at up to 20K-100K loc/sec per rule. SonarQube authors [report approximately 0.4K loc/sec for rulesets in production](https://web.archive.org/web/20221109203440/https://community.sonarsource.com/t/performance-guide-for-large-project-analysis/148/2).
- Semgrep supports scanning only changed files (differential analysis), SonarQube does not.
- Both have publicly available rules
- Semgrep has an online, hosted free plan for up to ten contributors to private repositories; both have a hosted paid plan.

See [the Semgrep development philosophy](/contributing/semgrep-philosophy) for more about what makes Semgrep different.
