---
slug: scala
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Scala support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: Scala
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Scala support

<LangCallout name="Scala" />

## Semgrep Code analyses

* Interprocedural analysis (cross-function)

## Coverage 

<LangCoverage />

Some examples of rules include:

tk

## Scala support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following Scala package manager:

- Maven

### Analyses and features

The following analyses and features are available for Scala:

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

## Scala support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following Scala rule sets:

tk
- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
- [<i class="fas fa-external-link fa-xs"></i> `p/csharp`](https://semgrep.dev/p/csharp)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)

<!-- config
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)
-->
Sample usage:

```bash
semgrep scan --config p/scala
```
