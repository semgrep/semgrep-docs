---
slug: semgrep-ce-languages
title: Supported languages
hide_title: true
description: 
  Semgrep CE supports more than two dozen languages. Learn about the language support differences between Semgrep CE and Semgrep Multimodal.
tags:
  - Semgrep CE
  - Semgrep Multimodal
---

import SupportedLanguagesCe from '/src/components/reference/_supported-languages-ce.md'
import LanguageMaturityCode from '/src/components/reference/_language-maturity-code.md'

# Supported languages for Semgrep Community Edition (CE)

This document provides information about supported languages for Semgrep Multimodal and Semgrep CE.

## Semgrep Multimodal and CE

Semgrep CE is a fast, lightweight program analysis tool that can help you detect bugs in your code. It makes use of Semgrep's LGPL 2.1 open source engine. These languages are supported by the Semgrep community, at best effort.

Semgrep Multimodal is a static application security testing (SAST) solution designed to detect complex security vulnerabilities. It makes use of proprietary Semgrep analyses, such as cross-file (interfile) dataflow analysis and framework specific analyses, in addition to Semgrep CE. This results in a [**higher true positive rate than Semgrep CE**](/semgrep-pro-vs-oss). Semgrep Multimodal provides the highest quality support by the Semgrep team: reported issues are resolved promptly.

Use either tool to scan local code or integrate it into your CI/CD pipeline to automate the continuous scanning of your repositories.

<SupportedLanguagesCe />

## Language maturity definitions

Semgrep Multimodal languages can be classified into four maturity levels:

* Generally available (GA)
* Beta
* Experimental
* Community supported\*

\*Community supported languages meet the parse rate and syntax requirements of **Experimental** languages. Users can still access community rules or write their own rules.

<LanguageMaturityCode />
