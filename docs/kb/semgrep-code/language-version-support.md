---
slug: support-for-language-versions
title: Semgrep support for all versions of a language 
description: "Learn how Semgrep supports all versions of a programming language."
hide_title: true
tags:
    - Semgrep Code
---

# Semgrep support for all versions of a programming language

Semgrep language support has several levels of maturity. The **Generally available (GA)** maturity level means that Semgrep broadly supports all versions of that programming language.

When the Semgrep team adds support for a new language, the team creates a parser intended for the most recent or one of the most recent versions of that language. More recent versions of a programming language tend to be supersets of previous versions; they are typically backward compatible. Therefore, a parser of a more recent version generally supports previous versions as well.

If a change occurs in a language's syntax or semantics, the Semgrep Program Analysis team and Security Research team make the requisite changes to the parser and any affected [Pro rules](/semgrep-code/pro-rules) to ensure that Semgrep maintains its level of support and coverage for that language. Updates to parsers and rules are made weekly.

See [How to add support for a new language](/contributing/adding-a-language) for more information on the process of adding a language to Semgrep.

:::info
- Semgrep Pro rules are actively maintained by the Security Research team and are kept up-to-date.
- Community rules are maintained by the community and have varying levels of support. 
:::
