---
slug: kotlin
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Kotlin support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: Kotlin
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Kotlin support

<LangCallout name="Kotlin" />

## Semgrep Code analyses

* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep CE](#kotlin-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

The following is an example of a Kotlin rule:

- [<i class="fas fa-external-link fa-xs"></i> CWE-327: Use of a broken or risky cryptographic algorithm. NullCipher does not encrypt anything; avoid](https://semgrep.dev/playground/r/kotlin.lang.security.no-null-cipher.no-null-cipher?editorMode=advanced)

Many, but not all Kotlin rules require a Semgrep account. Sign in to Semgrep AppSec Platform to view this rule:

- [<i class="fas fa-external-link fa-xs"></i> CWE-776: XML entity expansion. Securely configure your XML parser](https://semgrep.dev/orgs/-/editor/r/kotlin.xxe.xmlreader-xxe.xmlreader-xxe?editorMode=advanced)

## Kotlin support in Semgrep Supply Chain

<LangDefSsc />

:::tip No need for lockfiles
Kotlin projects can be scanned **without** the need for lockfiles. See [Scan a project without lockfiles (beta)](/semgrep-supply-chain/getting-started#scan-a-project-without-lockfiles-beta).
:::

### Supported package managers

Semgrep supports the following Kotlin package manager:

- Gradle
- Maven

### Analyses and features

The following analyses and features are available for Kotlin:

<dl>
<dt>Reachability analysis</dt>
<dd>
Reachability refers to whether or not a vulnerable code pattern from a dependency is used in the codebase that imports it. In Semgrep Supply Chain, both a dependency's vulnerable version and code pattern must match for a vulnerability to be considered reachable.
</dd>
<dt>License detection</dt>
<dd>
Semgrep Supply Chain's **license compliance** feature enables you to explicitly allow or disallow (block) a package's use in your repository based on its license. For example, your company policy may disallow the use of packages with the Creative Commons Attribution-NonCommercial (CC-BY-NC) license.
</dd>
<dt>SBOM generation</dt>
<dd>
Semgrep enables you to generate a software bill of materials (SBOM) to assess your third-party dependencies and comply with auditing procedures. Semgrep Supply Chain (SSC) can generate an SBOM for each repository you have added to Semgrep AppSec Platform.
</dd>
</dl>

## Kotlin support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following Kotlin rule sets (many rules require a Semgrep account):

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
- [<i class="fas fa-external-link fa-xs"></i> `p/kotlin`](https://semgrep.dev/p/kotlin)

<!-- config
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)
-->
Sample usage:

```bash
semgrep scan --config p/kotlin
```
