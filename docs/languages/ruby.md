---
slug: ruby
append_help_link: true
description: >-
  Detailed documentation for Semgrep's Ruby support. 
hide_title: true
tags:
    - Semgrep Code
    - Semgrep Supply Chain
title: Ruby
---

import LangCallout from "/src/components/concept/_lang-callout.md"
import LangCoverage from "/src/components/concept/_lang-coverage.md"
import LangDefCode from "/src/components/concept/_lang-def-code.md"
import LangDefSsc from "/src/components/concept/_lang-def-ssc.md"
import LangCeIntro from "/src/components/concept/_lang-ce-intro.md"
import LangSscFeatures from "/src/components/concept/_lang-ssc-features.md"

# Ruby support

<LangCallout name="Ruby" />

## Semgrep Code analyses

* Interprocedural analysis (cross-function)
* All analyses performed by [Semgrep Community Edition (CE)](#ruby-support-in-semgrep-ce)

## Coverage 

<LangCoverage />

Some examples of rules include:

- [<i class="fas fa-external-link fa-xs"></i> CWE-502: Deserialization of untrusted data. Using `load` and `object_load` can cause remote code execution; use JSON securely instead](https://semgrep.dev/playground/r/ruby.lang.security.bad-deserialization.bad-deserialization?editorMode=advanced)
- [<i class="fas fa-external-link fa-xs"></i> CWE-185: Incorrect regular expression. Incorrectly-bounded regex should be terminated correctly](https://semgrep.dev/playground/r/ruby.rails.security.brakeman.check-validation-regex.check-validation-regex?editorMode=advanced)

## Ruby support in Semgrep Supply Chain

<LangDefSsc />

### Supported package managers

Semgrep supports the following Ruby package manager:

- RubyGems

### Analyses and features

The following analyses and features are available for Ruby:

<LangSscFeatures />

## Ruby support in Semgrep CE

<LangCeIntro />

The Semgrep Registry provides the following Ruby rulesets:

- [<i class="fas fa-external-link fa-xs"></i> `p/default`](https://semgrep.dev/p/default)
- [<i class="fas fa-external-link fa-xs"></i> `p/ruby`](https://semgrep.dev/p/ruby)
- [<i class="fas fa-external-link fa-xs"></i> `p/brakeman`](https://semgrep.dev/p/brakeman)

<!-- config
- [<i class="fas fa-external-link fa-xs"></i> `p/trailofbits`](https://semgrep.dev/p/trailofbits)
- [<i class="fas fa-external-link fa-xs"></i> `p/gitlab`](https://semgrep.dev/p/gitlab)
-->
Sample usage:


```bash
semgrep scan --config p/ruby
```
