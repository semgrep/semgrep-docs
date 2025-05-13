---
slug: go
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Go support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: Go
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Go support

<LangCallout name="Go" />

## Semgrep Code analyses

* Interfile analysis (cross-file)
* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep CE](#go-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

Some examples of rules include:

- [<i class="fas fa-external-link fa-xs"></i> CWE-89: SQL injection. Don't use user input to manually construct an SQL string](https://semgrep.dev/playground/r/go.aws-lambda.security.tainted-sql-string.tainted-sql-string?editorMode=advanced)
- [<i class="fas fa-external-link fa-xs"></i> CWE-943: Improper neutralization of special elements in data query. Avoid NoSQL Injection in Mongo with Gin](https://semgrep.dev/playground/r/go.gin.nosql.gin-mongo-nosql-taint.gin-mongo-nosqli-taint?editorMode=advanced)

## Go support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following Go package manager:

- Go modules (`go.mod`)

### Analyses and features

The following analyses and features are available for Go:

<LangSscFeatures />

## Go support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following Go rule sets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
- [<i class="fas fa-external-link fa-xs"></i> `p/golang`](https://semgrep.dev/p/golang)
- [<i class="fas fa-external-link fa-xs"></i> `p/gosec`](https://semgrep.dev/p/gosec)

<!-- config
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)
-->
Sample usage:

```bash
semgrep scan --config p/golang
```
