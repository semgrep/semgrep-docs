---
slug: csharp
append_help_link: true
description: >-
  Detailed documentation for Semgrep's C# support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: C#
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# C# support

:::tip 
Semgrep’s C# coverage leverages framework-specific analysis capabilities that are not present in OSS. As a result, many framework specific Pro rules will **fail** to return findings if run on OSS. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::

## Semgrep Code analyses

* Framework-specific control flow analysis 
* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)

## Coverage 

<LangCoverage />

## C# support in Semgrep Supply Chain

Semgrep Supply Chain is a software composition analysis (SCA) tool that detects security vulnerabilities in your codebase introduced by open source dependencies.

<LangDefSsc />

### Supported package managers

Semgrep supports the following C# package managers:

ADD tk

### Analyses and features

The following analyses and features are available for JavaScript:

<LangSscFeatures />

## C# support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following popular JavaScript rule sets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)

<!-- config
-  [<i class="fas fa-external-link fa-xs"></i> `p/javascript`](https://semgrep.dev/p/javascript)
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)

-->
Sample usage:

```bash
semgrep scan --config p/csharp
```
