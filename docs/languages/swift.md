---
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Swift support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
    - swift
title: Swift
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Swift support

<LangCallout name="Swift" />

## Semgrep Code analyses

* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep Community Edition (CE)](#swift-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

Some examples of rules include:

- [<i class="fas fa-external-link fa-xs"></i> CWE-477: Use of obsolete function. `ptrace` API is forbidden from iOS applications](https://semgrep.dev/orgs/-/editor/r/swift.lang.forbidden.forbidden-ios-api.swift-forbidden-ios-apis?editorMode=advanced)
- [<i class="fas fa-external-link fa-xs"></i> CWE-327: Use of a broken or risky cryptographic algorithm. Avoid MD2](https://semgrep.dev/orgs/-/editor/r/swift.commoncrypto.insecure-hashing-algorithm-md2.insecure-hashing-algorithm-md2?editorMode=advanced)

To view these rules, sign in to Semgrep AppSec Platform.

## Swift support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following Swift package manager:

- SwiftPM

### Analyses and features

The following analyses and features are available for Swift:

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

