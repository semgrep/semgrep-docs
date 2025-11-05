---
slug: csharp
append_help_link: true
description: >-
  Detailed documentation for Semgrep's C# support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
    - c
title: C#
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# C# support

<LangCallout name="C#" />

## Semgrep Code analyses

* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep Community Edition (CE)](#c-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

Some examples of rules include:

- [<i class="fas fa-external-link fa-xs"></i> CWE-89: SQL injection. Don't use formatted strings in SQL statements; prefer prepared statements](https://semgrep.dev/playground/r/csharp.lang.security.sqli.csharp-sqli.csharp-sqli?editorMode=advanced)
- [<i class="fas fa-external-link fa-xs"></i> CWE-90: LDAP injection. Avoid LDAP queries constructed dynamically on user-controlled input](https://semgrep.dev/playground/r/csharp.dotnet.security.audit.ldap-injection.ldap-injection?editorMode=advanced)
- [<i class="fas fa-external-link fa-xs"></i> CWE-347: Improper verification of cryptographic signature. Use signed security tokens](https://semgrep.dev/playground/r/csharp.lang.security.cryptography.unsigned-security-token.unsigned-security-token?editorMode=advanced)

## C# support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following C# package manager:

- NuGet

### Analyses and features

The following analyses and features are available for C#:

<LangSscFeatures />

:::tip No need for lockfiles
C# projects can be scanned **without** the need for lockfiles. See [Scan a project without lockfiles (beta)](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).
:::

## C# support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following  C# rule sets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
- [<i class="fas fa-external-link fa-xs"></i> `p/csharp`](https://semgrep.dev/p/csharp)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)

<!-- config
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)
-->
Sample usage:

```bash
semgrep scan --config p/csharp
```
